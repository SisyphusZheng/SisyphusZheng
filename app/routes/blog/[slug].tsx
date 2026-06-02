import { DsdElement } from '@lessjs/core';
import { StyleSheet } from '@lessjs/style-sheet';
import { getPostBySlug, posts } from '@lessjs/generated/blog-data';
import type { BlogPost } from '../../lib/types.ts';
import { formatDate } from '../../lib/format.ts';
import '../../components/site-shell.tsx';

export const tagName = 'blog-post-page';

export function getStaticPaths(): Array<Record<string, string>> {
  return (posts as BlogPost[]).map((post) => ({ slug: post.slug }));
}

const styles = new StyleSheet();
styles.replaceSync(`
  :host { display: block; }

  article {
    width: min(1120px, calc(100% - 36px));
    display: grid;
    grid-template-columns: minmax(0, 780px) 250px;
    gap: 70px;
    margin: 0 auto;
    padding: 64px 0 0;
  }

  .back {
    display: inline-flex;
    margin-bottom: 30px;
    color: var(--rust);
    font-weight: 800;
    text-decoration-thickness: 1px;
    text-underline-offset: 5px;
  }

  time {
    color: var(--faint);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 800;
    white-space: nowrap;
  }

  h1 {
    margin: 14px 0 20px;
    font-family: var(--font-serif);
    font-size: clamp(3rem, 7vw, 6.2rem);
    line-height: 0.9;
    letter-spacing: 0;
  }

  .excerpt {
    max-width: 720px;
    margin: 0 0 22px;
    color: var(--muted);
    font-size: 1.16rem;
    line-height: 1.72;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 52px;
  }

  .tag {
    border-radius: 999px;
    background: color-mix(in srgb, var(--teal), transparent 88%);
    color: var(--teal);
    padding: 5px 9px;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 800;
  }

  .content {
    color: var(--muted);
    font-family: var(--font-serif);
    font-size: 1.18rem;
    line-height: 1.84;
  }

  .content h2,
  .content h3 {
    color: var(--ink);
    font-family: var(--font-sans);
    line-height: 1.2;
    letter-spacing: 0;
  }

  .content h2 {
    margin: 2.5em 0 0.7em;
    font-size: 1.55rem;
  }

  .content h3 {
    margin: 2em 0 0.55em;
    font-size: 1.18rem;
  }

  .content p {
    margin: 0 0 1.15em;
  }

  .content a {
    color: var(--rust);
    text-underline-offset: 4px;
  }

  .content ul,
  .content ol {
    padding-left: 1.25em;
    margin: 0 0 1.25em;
  }

  .content li {
    margin: 0.35em 0;
  }

  .content blockquote {
    margin: 1.6em 0;
    padding: 0.2em 0 0.2em 1em;
    border-left: 3px solid var(--rust);
    color: var(--ink);
  }

  .content pre {
    overflow-x: auto;
    margin: 1.5em 0;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 16px;
    background: color-mix(in srgb, var(--paper-strong), transparent 10%);
    font-family: var(--font-mono);
    font-size: 0.9rem;
    line-height: 1.55;
  }

  .content code {
    font-family: var(--font-mono);
    font-size: 0.9em;
  }

  .content :not(pre) > code {
    border-radius: 5px;
    padding: 0.1em 0.35em;
    background: color-mix(in srgb, var(--paper-strong), transparent 8%);
    color: var(--ink);
  }

  aside {
    position: sticky;
    top: 120px;
    align-self: start;
    border-left: 1px solid var(--line);
    padding-left: 22px;
    color: var(--muted);
  }

  aside h2 {
    margin: 0 0 14px;
    color: var(--ink);
    font-size: 0.86rem;
    font-family: var(--font-mono);
    text-transform: uppercase;
  }

  aside a {
    display: block;
    margin: 10px 0;
    color: inherit;
    text-decoration: none;
  }

  .missing {
    width: min(720px, calc(100% - 36px));
    margin: 0 auto;
    padding: 72px 0;
  }

  @media (max-width: 960px) {
    article {
      grid-template-columns: 1fr;
    }

    aside {
      position: static;
      border-left: 0;
      border-top: 1px solid var(--line);
      padding: 22px 0 0;
    }
  }
`);

export default class BlogPostPage extends DsdElement {
  static override styles = styles;
  slug = '';

  override render() {
    const post = getPostBySlug(this.slug) as BlogPost | undefined;
    if (!post) {
      return (
        <site-shell surface='paper'>
          <section class='missing'>
            <a class='back' href='/blog'>Back to Writing</a>
            <h1>Post not found</h1>
          </section>
        </site-shell>
      );
    }

    return (
      <site-shell surface='paper'>
        <article>
          <div>
            <a class='back' href='/blog'>Back to Writing</a>
            <time>{formatDate(post.frontmatter.date)}</time>
            <h1>{post.frontmatter.title}</h1>
            {post.frontmatter.excerpt ? <p class='excerpt'>{post.frontmatter.excerpt}</p> : null}
            <div class='tags'>
              {(post.frontmatter.tags ?? []).map((tag) => <span class='tag'>{tag}</span>)}
            </div>
            <div class='content' innerHTML={post.html} rawHtml={true}></div>
          </div>
          <aside>
            <h2>Contents</h2>
            <a href='#app-shell'>AppShell</a>
            <a href='#generated-data'>Generated Data</a>
            <a href='#release-gates'>Release Gates</a>
          </aside>
        </article>
      </site-shell>
    );
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, BlogPostPage);
}
