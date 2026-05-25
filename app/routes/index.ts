import { DsdElement, StyleSheet } from '@lessjs/core';
// Side-effect import: triggers customElements.define for nested DSD rendering
import '../components/site-header.ts';
import "../islands/less-search.ts";

export const tagName = 'home-page';

const styles = new StyleSheet();
styles.replaceSync(`
  :host {
    display: block;
    min-height: 100dvh;
  }

  .page-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }

  .page-content {
    flex: 1;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1.5rem;
    width: 100%;
    box-sizing: border-box;
  }

  .hero {
    padding: 5rem 0 3rem;
    text-align: left;
  }

  .hero h1 {
    font-family: var(--font-heading, "Playfair Display", Georgia, serif);
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--text-primary, #1a1a1a);
    margin: 0 0 0.75rem;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }

  .hero .subtitle {
    font-size: 1.2rem;
    color: var(--text-secondary, #555555);
    margin: 0;
    line-height: 1.6;
    font-weight: 400;
  }

  .hero .accent-dot {
    color: var(--accent, #d97757);
  }

  .section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .section-header h2 {
    font-family: var(--font-heading, "Playfair Display", Georgia, serif);
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary, #1a1a1a);
    margin: 0;
  }

  .section-header a {
    font-size: 0.9rem;
    color: var(--accent, #d97757);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .section-header a:hover {
    color: var(--accent-hover, #c46544);
    text-decoration: underline;
  }

  .post-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 4rem;
  }

  .post-card {
    background: var(--bg-card, #ffffff);
    border: 1px solid var(--border, #e8e6dc);
    border-radius: 12px;
    padding: 1.5rem;
    text-decoration: none;
    color: inherit;
    display: block;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s;
  }

  .post-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border-color: var(--accent, #d97757);
  }

  .post-card .date {
    font-size: 0.8rem;
    color: var(--text-muted, #9a9890);
    margin-bottom: 0.5rem;
    font-variant-numeric: tabular-nums;
  }

  .post-card h3 {
    font-family: var(--font-heading, "Playfair Display", Georgia, serif);
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--text-primary, #1a1a1a);
    margin: 0 0 0.5rem;
    line-height: 1.4;
  }

  .post-card .desc {
    font-size: 0.9rem;
    color: var(--text-secondary, #555555);
    margin: 0;
    line-height: 1.6;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .post-card:nth-child(1) { animation: fadeInUp 0.5s ease both; animation-delay: 0.1s; }
  .post-card:nth-child(2) { animation: fadeInUp 0.5s ease both; animation-delay: 0.2s; }
  .post-card:nth-child(3) { animation: fadeInUp 0.5s ease both; animation-delay: 0.3s; }

  @media (max-width: 768px) {
    .hero { padding: 3rem 0 2rem; }
    .hero h1 { font-size: 2.5rem; }
    .hero .subtitle { font-size: 1.05rem; }
    .post-cards { grid-template-columns: 1fr; }
  }
`);

export default class HomePage extends DsdElement {
  static override styles = styles;

  override render() {
    return `
      <div class="page-wrapper">
        <site-header>
          <theme-toggle slot="theme-toggle"></theme-toggle>
          <less-search slot="header-actions"></less-search>
        </site-header>

        <main class="page-content">
          <div class="hero">
            <h1>郑治</h1>
            <p class="subtitle">Frontend Developer<span class="accent-dot">.</span> Deno Fresh Top 10 Contributor<span class="accent-dot">.</span> Web Standards</p>
          </div>

          <div class="section-header">
            <h2>Recent Posts</h2>
            <a href="/blog">View all &rarr;</a>
          </div>

          <div class="post-cards">
            <a class="post-card" href="/blog/web-components-future">
              <div class="date">2026-05-25</div>
              <h3>Web Components 的未来</h3>
              <p class="desc">探讨 Web Components 生态的发展方向，从 Declarative Shadow DOM 到自定义元素的最佳实践。</p>
            </a>
            <a class="post-card" href="/blog/design-system">
              <div class="date">2026-05-25</div>
              <h3>构建你的设计系统</h3>
              <p class="desc">从 CSS 变量到组件库，如何一步步构建可维护、可扩展的设计系统。</p>
            </a>
            <a class="post-card" href="/blog/getting-started">
              <div class="date">2026-05-24</div>
              <h3>LessJS 快速上手</h3>
              <p class="desc">5 分钟了解 LessJS 的核心概念：项目结构、DSD、响应式岛屿。</p>
            </a>
          </div>
        </main>

        <site-footer></site-footer>
      </div>
    `;
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, HomePage);
}
