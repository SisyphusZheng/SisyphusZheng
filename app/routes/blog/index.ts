import { DsdElement, StyleSheet } from '@lessjs/core';
// Side-effect import: triggers customElements.define for nested DSD
import "../../components/site-header.ts";
import { posts } from 'virtual:less-blog-data';

export const tagName = 'blog-list-page';

const styles = new StyleSheet();
styles.replaceSync(`
  :host { display: block; min-height: 100dvh; }

  .page-wrapper { display: flex; flex-direction: column; min-height: 100dvh; }

  .page-content {
    flex: 1; max-width: 720px; margin: 0 auto; padding: 0 1.5rem; width: 100%; box-sizing: border-box;
  }

  .page-header { padding: 3rem 0 1.5rem; }

  .page-header h1 {
    font-family: var(--font-heading, "Playfair Display", Georgia, serif);
    font-size: 2.5rem; font-weight: 700;
    color: var(--text-primary, #1a1a1a);
    margin: 0; letter-spacing: -0.02em;
  }

  .post-list { list-style: none; margin: 0; padding: 0 0 4rem; }

  .post-item {
    display: block; padding: 1.5rem 0;
    border-bottom: 1px solid var(--border, #e8e6dc);
    text-decoration: none; color: inherit;
    transition: padding-left 0.2s;
  }

  .post-item:hover { padding-left: 0.5rem; }

  .post-item:first-child { border-top: 1px solid var(--border, #e8e6dc); }

  .post-item .date {
    font-size: 0.8rem; color: var(--text-muted, #9a9890); margin-bottom: 0.25rem;
  }

  .post-item h2 {
    font-family: var(--font-heading, "Playfair Display", Georgia, serif);
    font-size: 1.35rem; font-weight: 600;
    color: var(--text-primary, #1a1a1a);
    margin: 0 0 0.4rem; line-height: 1.3;
    transition: color 0.2s;
  }

  .post-item:hover h2 { color: var(--accent, #d97757); }

  .post-item .excerpt {
    font-size: 0.9rem; color: var(--text-secondary, #555555);
    line-height: 1.6; margin: 0;
  }

  @media (max-width: 768px) {
    .page-header h1 { font-size: 2rem; }
    .post-item h2 { font-size: 1.15rem; }
  }
`);

export default class BlogListPage extends DsdElement {
  static override styles = styles;

  override render() {
    const items = (posts as Array<{ slug: string; frontmatter: { title: string; date: string; excerpt?: string } }>)
      .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date))
      .map(post => `
          <a class="post-item" href="/blog/${post.slug}">
            <div class="date">${post.frontmatter.date}</div>
            <h2>${post.frontmatter.title}</h2>
            <p class="excerpt">${post.frontmatter.excerpt || ''}</p>
          </a>
        `).join('');

    return `
      <div class="page-wrapper">
        <site-header>
          <theme-toggle slot="theme-toggle"></theme-toggle>
          <less-search slot="header-actions"></less-search>
        </site-header>

        <main class="page-content">
          <div class="page-header">
            <h1>文章</h1>
          </div>
          <div class="post-list">
            ${items}
          </div>
        </main>

        <site-footer></site-footer>
      </div>
    `;
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, BlogListPage);
}
