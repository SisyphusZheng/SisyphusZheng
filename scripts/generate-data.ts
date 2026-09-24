// Data generator for the site's build-time content modules.
//
// Self-contained: the blog pipeline below no longer calls @lessjs/content. It is a
// behavioral port of @lessjs/content@0.28.5 (src/blog/markdown.ts, src/blog/routes.ts,
// src/blog/blog-data.ts) on top of gray-matter + marked, so app/data/_generated-blog-data.ts
// keeps the exact shape, field order, slug derivation, sort order and HTML the old loader produced.
//
// Note: the old loader rendered markdown through sanitize-html with an allow-list; that step is
// kept (same allow-list, same rel="noopener noreferrer" link transform) so raw HTML in a future
// post is stripped here exactly as it was before.
//
// deno task generate:data runs this file.

import matter from 'gray-matter';
import { marked } from 'marked';
// @deno-types="npm:@types/sanitize-html@^2"
import sanitizeHtml from 'npm:sanitize-html@^2.17.4';

/** Directory holding blog markdown, relative to the repo root. */
const CONTENT_DIR = 'content/blog';
/** Public base path for blog routes. */
const BASE_PATH = '/blog';

/** Blog post frontmatter — same fields the old loader emitted, in the same order. */
type BlogPostFrontmatter = {
  /** Post title (falls back to the slug). */
  title: unknown;
  /** gray-matter parses `date: YYYY-MM-DD` into a Date; JSON.stringify turns it into an ISO string. */
  date: unknown;
  /** Drafts are filtered out of the generated module. */
  draft: boolean;
  /** Frontmatter tags, `[]` when absent. */
  tags: unknown;
  /** Short excerpt; `undefined` when absent (JSON.stringify then omits the key). */
  excerpt: unknown;
  /** Optional post type discriminator. */
  type: unknown;
};

/** A fully parsed blog post. */
type BlogPost = {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
  html: string;
};

/**
 * Allow-list HTML sanitizer, copied from @lessjs/content@0.28.5.
 * content files are developer-controlled; this is build-time defense-in-depth
 * against raw HTML in markdown.
 */
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'p',
    'a',
    'code',
    'pre',
    'ul',
    'ol',
    'li',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'strong',
    'em',
    'b',
    'i',
    's',
    'del',
    'ins',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'br',
    'hr',
    'img',
    'figure',
    'figcaption',
    'details',
    'summary',
    'sup',
    'sub',
    'abbr',
    'input',
  ],
  allowedAttributes: {
    '*': ['class', 'id'],
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    td: ['colspan', 'rowspan'],
    th: ['colspan', 'rowspan'],
    code: ['language', 'data-language'],
    input: ['type', 'disabled', 'checked'],
    abbr: ['title'],
  },
  allowedSchemes: ['http', 'https', 'mailto', '#', 'relative'],
  disallowedTagsMode: 'discard',
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
  },
};

/** Derive a URL-safe slug from a filename: "2026-05-07-hello-world.md" -> "hello-world". */
function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

/** Frontmatter date fallback: the `YYYY-MM-DD` prefix of the filename, if any. */
function dateFromFilename(filePath: string): string | undefined {
  const filename = filePath.replace(/\\/g, '/').split('/').pop() ?? filePath;
  return filename.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1];
}

function existsSync(path: string): boolean {
  try {
    Deno.statSync(path);
    return true;
  } catch {
    return false;
  }
}

/** Parse one markdown file into a blog post: frontmatter + raw content + rendered HTML. */
async function parseMarkdownFile(
  filePath: string,
  fileContent: string,
  slug: string,
): Promise<BlogPost> {
  const { data, content } = matter(fileContent);

  const frontmatter: BlogPostFrontmatter = {
    title: data.title ?? slug,
    date: data.date ?? dateFromFilename(filePath) ?? new Date().toISOString().split('T')[0],
    draft: data.draft ?? false,
    tags: data.tags ?? [],
    excerpt: data.excerpt,
    type: data.type,
  };

  const html = sanitizeHtml(await marked(content, { async: true }), SANITIZE_OPTIONS);

  return { slug, frontmatter, content, html };
}

/** Scan the content directory: every `.md` file, newest first (reverse-sorted filenames). */
async function scanPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];

  if (!existsSync(CONTENT_DIR)) {
    console.warn(`[blog] Content directory not found: ${CONTENT_DIR}`);
    return posts;
  }

  const files = [...Deno.readDirSync(CONTENT_DIR)]
    .map((entry) => entry.name)
    .filter((name) => name.endsWith('.md'))
    .sort()
    .reverse(); // newest first

  for (const file of files) {
    const filePath = `${CONTENT_DIR}/${file}`;
    const content = await Deno.readTextFile(filePath);
    posts.push(await parseMarkdownFile(filePath, content, slugFromFilename(file)));
  }

  return posts;
}

/** Load blog posts from disk. Mirrors loadBlogData(): drafts are excluded from the output. */
async function loadBlogData(): Promise<{ posts: BlogPost[]; basePath: string }> {
  const posts = await scanPosts();
  return { posts: posts.filter((post) => !post.frontmatter.draft), basePath: BASE_PATH };
}

/**
 * Render the generated TypeScript module for `posts`.
 * Same exports and same serialization as @lessjs/content's writeBlogDataModule().
 */
function writeBlogDataModule(posts: BlogPost[]): string {
  return [
    '// Auto-generated by scripts/generate-data.ts — do not edit',
    '// deno-lint-ignore no-explicit-any',
    `export const posts: any[] = ${JSON.stringify(posts, null, 2)};`,
    '',
    '// deno-lint-ignore no-explicit-any',
    'export function getPostBySlug(slug: string): any {',
    '  // deno-lint-ignore no-explicit-any',
    '  return posts.find((p: any) => p.slug === slug);',
    '}',
    '',
    'export function getBlogOptions() {',
    `  return { contentDir: "${CONTENT_DIR}", basePath: "${BASE_PATH}" };`,
    '}',
  ].join('\n') + '\n';
}

await Deno.mkdir('app/data', { recursive: true });

const blog = await loadBlogData();
await Deno.writeTextFile('app/data/_generated-blog-data.ts', writeBlogDataModule(blog.posts));

type Project = {
  slug: string;
  html: string;
  frontmatter: Record<string, unknown>;
};

const projects: Project[] = [];
for await (const entry of Deno.readDir('content/projects')) {
  if (!entry.isFile || !entry.name.endsWith('.md')) continue;
  const raw = await Deno.readTextFile(`content/projects/${entry.name}`);
  const parsed = matter(raw);
  const slug = String(parsed.data.slug || entry.name.replace(/\.md$/, ''));
  projects.push({
    slug,
    html: await marked.parse(parsed.content),
    frontmatter: parsed.data,
  });
}

projects.sort((a, b) =>
  String(a.frontmatter.order ?? '99').localeCompare(String(b.frontmatter.order ?? '99'))
);

const projectModule = [
  '// Auto-generated project data - do not edit',
  '// deno-lint-ignore no-explicit-any',
  `export const projects: any[] = ${JSON.stringify(projects, null, 2)};`,
  '',
  '// deno-lint-ignore no-explicit-any',
  'export function getProjectBySlug(slug: string): any {',
  '  // deno-lint-ignore no-explicit-any',
  '  return projects.find((project: any) => project.slug === slug);',
  '}',
].join('\n') + '\n';

await Deno.writeTextFile('app/data/_generated-project-data.ts', projectModule);
console.log(`Generated data: ${blog.posts.length} post(s), ${projects.length} project(s)`);
