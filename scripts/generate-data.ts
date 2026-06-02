import matter from 'gray-matter';
import { marked } from 'marked';
import { loadBlogData, writeBlogDataModule } from '@lessjs/content/blog-data';

await Deno.mkdir('app/data', { recursive: true });

const blog = await loadBlogData({ contentDir: 'content/blog', basePath: '/blog' });
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
