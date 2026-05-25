import { DsdElement, StyleSheet } from '@lessjs/core';
// Side-effect import: triggers customElements.define for nested DSD
import "../../components/site-header.ts";
import { posts, getPostBySlug } from 'virtual:less-blog-data';

export const tagName = 'blog-post-page';

export function getStaticPaths(): Array<Record<string, string>> {
  return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

const styles = new StyleSheet();
styles.replaceSync(`
  :host { display: block; min-height: 100dvh; }

  .page-wrapper { display: flex; flex-direction: column; min-height: 100dvh; }

  .page-content {
    flex: 1; max-width: 720px; margin: 0 auto; padding: 0 1.5rem; width: 100%; box-sizing: border-box;
  }

  .back-link {
    display: inline-flex; align-items: center; gap: 0.4rem;
    color: var(--accent, #d97757); text-decoration: none;
    font-weight: 500; font-size: 0.9rem;
    margin-top: 2rem; margin-bottom: 1.5rem;
    transition: color 0.2s;
  }

  .back-link:hover { color: var(--accent-hover, #c46544); }

  .post-header { margin-bottom: 2.5rem; }

  .post-header .date {
    font-size: 0.85rem; color: var(--text-muted, #9a9890);
    font-variant-numeric: tabular-nums; margin-bottom: 0.75rem;
  }

  .post-header h1 {
    font-family: var(--font-heading, "Playfair Display", Georgia, serif);
    font-size: 2.5rem; font-weight: 700;
    color: var(--text-primary, #1a1a1a);
    margin: 0; letter-spacing: -0.02em; line-height: 1.2;
  }

  .post-header .subtitle {
    font-size: 1.05rem; color: var(--text-secondary, #555555);
    margin-top: 0.5rem; line-height: 1.6;
  }

  .article-content {
    font-size: 1rem; line-height: 1.8; color: var(--text-secondary, #555555); max-width: 65ch;
  }

  .article-content h2 {
    font-family: var(--font-heading, "Playfair Display", Georgia, serif);
    font-size: 1.75rem; font-weight: 600;
    color: var(--text-primary, #1a1a1a);
    margin: 2.5rem 0 1rem; padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border, #e8e6dc); line-height: 1.3;
  }

  .article-content h3 {
    font-family: var(--font-heading, "Playfair Display", Georgia, serif);
    font-size: 1.35rem; font-weight: 600;
    color: var(--text-primary, #1a1a1a);
    margin: 2rem 0 0.75rem; line-height: 1.4;
  }

  .article-content p { margin: 0 0 1.25rem; }

  .article-content a {
    color: var(--accent, #d97757); text-decoration: none;
    border-bottom: 1px solid var(--accent, #d97757);
    transition: color 0.2s, border-color 0.2s;
  }

  .article-content a:hover { color: var(--accent-hover, #c46544); border-color: var(--accent-hover, #c46544); }

  .article-content code {
    font-family: var(--font-mono, "JetBrains Mono", "Fira Code", monospace);
    background: var(--bg-code, #f5f3ee); padding: 0.15rem 0.4rem;
    border-radius: 4px; font-size: 0.88em;
  }

  .article-content pre {
    background: var(--bg-code, #f5f3ee); border: 1px solid var(--border, #e8e6dc);
    border-radius: 8px; padding: 1.25rem 1.5rem; overflow-x: auto;
    margin: 1.5rem 0; font-size: 0.88em; line-height: 1.6;
  }

  .article-content pre code { background: none; padding: 0; border-radius: 0; }

  .article-content ul, .article-content ol { padding-left: 1.5rem; margin: 0 0 1.25rem; }

  .article-content li { margin-bottom: 0.35rem; }

  .article-content blockquote {
    border-left: 3px solid var(--accent, #d97757); margin: 1.5rem 0;
    padding: 0.75rem 1.25rem; color: var(--text-muted, #9a9890);
    background: var(--bg-code, #f5f3ee); border-radius: 0 8px 8px 0;
  }

  .article-content strong { color: var(--text-primary, #1a1a1a); font-weight: 600; }

  .article-content hr { border: none; border-top: 1px solid var(--border, #e8e6dc); margin: 2rem 0; }

  .article-content img { max-width: 100%; border-radius: 8px; margin: 1.5rem 0; }

  .post-footer { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border, #e8e6dc); }

  .post-footer a {
    color: var(--accent, #d97757); text-decoration: none;
    font-weight: 500; font-size: 0.9rem; transition: color 0.2s;
  }

  .post-footer a:hover { color: var(--accent-hover, #c46544); text-decoration: underline; }

  .not-found { text-align: center; padding: 4rem 1rem; color: var(--text-muted, #9a9890); }

  @media (max-width: 768px) {
    .post-header h1 { font-size: 1.85rem; }
    .article-content { font-size: 0.95rem; }
  }
`);

export default class BlogPostPage extends DsdElement {
  static override styles = styles;
  slug = '';

  override render() {
    const post = getPostBySlug(this.slug);

    if (!post) {
      return `
        <div class="page-wrapper">
          <site-header>
            <theme-toggle slot="theme-toggle"></theme-toggle>
          <less-search slot="header-actions"></less-search>
          </site-header>
          <main class="page-content">
            <div class="not-found">
              <h1>404</h1>
              <p>文章未找到</p>
              <a href="/blog">&larr; 返回博客</a>
            </div>
          </main>
          <site-footer></site-footer>
        </div>`;
    }

    return `
      <div class="page-wrapper">
        <site-header>
          <theme-toggle slot="theme-toggle"></theme-toggle>
          <less-search slot="header-actions"></less-search>
        </site-header>

        <main class="page-content">
          <a class="back-link" href="/blog">&larr; Back to Blog</a>

          <div class="post-header">
            <div class="date">${post.frontmatter.date}</div>
            <h1>${post.frontmatter.title}</h1>
            ${post.frontmatter.excerpt ? `<p class="subtitle">${post.frontmatter.excerpt}</p>` : ''}
          </div>

          <div class="article-content">${post.html}</div>

          <div class="post-footer">
            <a href="/blog">&larr; Back to Blog</a>
          </div>
        </main>

        <site-footer></site-footer>
      </div>`;
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, BlogPostPage);
}
