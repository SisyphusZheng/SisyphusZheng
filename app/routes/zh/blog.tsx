import { DsdElement } from '@lessjs/core';
import { StyleSheet } from '@lessjs/style-sheet';
import { posts } from '@lessjs/generated/blog-data';
import type { BlogPost } from '../../lib/types.ts';
import { formatDate } from '../../lib/format.ts';
import '../../components/site-shell.tsx';

export const tagName = 'zh-blog-page';
export const meta = { section: 'Main', label: '写作', order: 8 };

const styles = new StyleSheet();
styles.replaceSync(`
  :host { display: block; }
  .wrap {
    width: min(1120px, calc(100% - 36px));
    margin: 0 auto;
    padding: 72px 0 0;
  }
  .kicker {
    color: var(--teal);
    font-family: var(--font-mono);
    font-size: 0.76rem;
    font-weight: 800;
    text-transform: uppercase;
  }
  h1 {
    margin: 12px 0 42px;
    font-family: var(--font-serif);
    font-size: clamp(3.6rem, 8vw, 7.2rem);
    line-height: 0.9;
  }
  .item {
    display: grid;
    grid-template-columns: 132px 1fr;
    gap: 28px;
    border-top: 1px solid var(--line);
    padding: 28px 0;
    color: inherit;
    text-decoration: none;
  }
  time {
    color: var(--faint);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 800;
  }
  h2 {
    margin: 0 0 10px;
    font-size: clamp(1.55rem, 3vw, 2.35rem);
  }
  p {
    max-width: 680px;
    margin: 0;
    color: var(--muted);
    line-height: 1.65;
  }
  @media (max-width: 820px) {
    .item { grid-template-columns: 1fr; }
  }
`);

export default class ZhBlogPage extends DsdElement {
  static override styles = styles;

  override render() {
    const sorted = (posts as BlogPost[])
      .filter((post) => post.frontmatter)
      .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));

    return (
      <site-shell surface='paper' language='zh'>
        <section class='wrap'>
          <p class='kicker'>Writing</p>
          <h1>文章与构建记录</h1>
          {sorted.map((post) => (
            <a class='item' href={`/blog/${post.slug}`}>
              <time>{formatDate(post.frontmatter.date)}</time>
              <span>
                <h2>{post.frontmatter.title}</h2>
                <p>{post.frontmatter.excerpt ?? ''}</p>
              </span>
            </a>
          ))}
        </section>
      </site-shell>
    );
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, ZhBlogPage);
}
