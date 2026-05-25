import { DsdElement, StyleSheet } from '@lessjs/core';
// Side-effect import: triggers customElements.define for nested DSD
import "../components/site-header.ts";

export const tagName = 'about-page';

const styles = new StyleSheet();
styles.replaceSync(`
  :host { display: block; min-height: 100dvh; }

  .page-wrapper { display: flex; flex-direction: column; min-height: 100dvh; }

  .page-content {
    flex: 1; max-width: 720px; margin: 0 auto; padding: 0 1.5rem; width: 100%; box-sizing: border-box;
  }

  .about-header { padding: 4rem 0 2rem; }

  .about-header h1 {
    font-family: var(--font-heading, "Playfair Display", Georgia, serif);
    font-size: 2.5rem; font-weight: 700;
    color: var(--text-primary, #1a1a1a);
    margin: 0 0 1rem; letter-spacing: -0.02em;
  }

  .about-header .tagline {
    font-size: 1.15rem; color: var(--text-secondary, #555555); line-height: 1.7;
  }

  .section { margin-bottom: 3rem; }

  .section h2 {
    font-family: var(--font-heading, "Playfair Display", Georgia, serif);
    font-size: 1.5rem; font-weight: 600;
    color: var(--text-primary, #1a1a1a);
    margin: 0 0 1rem; padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border, #e8e6dc);
  }

  .section p { font-size: 1rem; color: var(--text-secondary, #555555); line-height: 1.8; margin: 0; }

  .tech-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }

  .tech-tag {
    background: var(--bg-code, #f5f3ee);
    color: var(--accent, #d97757);
    padding: 0.3rem 0.75rem; border-radius: 6px;
    font-size: 0.85rem; font-weight: 500;
    border: 1px solid var(--border, #e8e6dc);
  }

  .contact-list { list-style: none; margin: 0; padding: 0; }

  .contact-list li {
    font-size: 0.95rem; color: var(--text-secondary, #555555);
    padding: 0.5rem 0; border-bottom: 1px solid var(--border, #e8e6dc);
  }

  .contact-list li:last-child { border-bottom: none; }

  .contact-list .label { font-weight: 600; color: var(--text-primary, #1a1a1a); margin-right: 0.5rem; }

  .contact-list a {
    color: var(--accent, #d97757); text-decoration: none; transition: color 0.2s;
  }

  .contact-list a:hover { color: var(--accent-hover, #c46544); text-decoration: underline; }

  @media (max-width: 768px) {
    .about-header { padding: 2rem 0 1.5rem; }
    .about-header h1 { font-size: 2rem; }
  }
`);

export default class AboutPage extends DsdElement {
  static override styles = styles;

  override render() {
    return `
      <div class="page-wrapper">
        <site-header>
          <theme-toggle slot="theme-toggle"></theme-toggle>
          <less-search slot="header-actions"></less-search>
        </site-header>

        <main class="page-content">
          <div class="about-header">
            <h1>About</h1>
            <p class="tagline">Frontend Developer · Web Standards Enthusiast · Open Source Contributor</p>
          </div>

          <div class="section">
            <h2>Who I Am</h2>
            <p>我是郑治（SisyphusZheng），前端工程师，热爱 Web 标准和开源。Deno Fresh 框架 Top 10 贡献者，Preact 中文文档主要维护者。目前专注于 Web Components、Declarative Shadow DOM 和 Islands 架构。</p>
          </div>

          <div class="section">
            <h2>Open Source</h2>
            <p><strong>Deno Fresh</strong> (13K ⭐) — Top 10 贡献者，合并 PR 17+，关闭 Issue 10+。负责 Tailwind CSS v4 兼容性改造、框架迁移测试、工具函数重构、插件维护等工作。</p>
            <p><strong>Preact</strong> (37.5K ⭐) — 中文文档主要贡献者，在官方博客拥有署名。</p>
            <p><strong>个人项目</strong> — fresh-plugin-screenshot (JSR)，7 篇技术博客收录于松山湖开发者社区与开放原子基金会社区。</p>
          </div>

          <div class="section">
            <h2>Education</h2>
            <p><strong>爱尔兰利莫瑞克大学</strong> — 软件工程硕士 (2026.01)</p>
            <p>主修：软件质量、软件进化、HCI、项目管理、软件架构</p>
            <p><strong>重庆大学城市科技学院</strong> — 软件工程本科 (2018-2022)</p>
            <p>编程技术 92%、算法分析 97%、Linux 基础 91%、高级编程技术 91%</p>
          </div>

          <div class="section">
            <h2>Tech Stack</h2>
            <div class="tech-tags">
              <span class="tech-tag">TypeScript</span>
              <span class="tech-tag">React</span>
              <span class="tech-tag">Preact</span>
              <span class="tech-tag">Deno</span>
              <span class="tech-tag">Fresh</span>
              <span class="tech-tag">Node.js</span>
              <span class="tech-tag">Web Components</span>
              <span class="tech-tag">LessJS</span>
              <span class="tech-tag">Linux</span>
              <span class="tech-tag">Express</span>
            </div>
          </div>

          <div class="section">
            <h2>Certifications</h2>
            <p>Meta Frontend Developer Professional Certificate</p>
            <p>重庆市优秀毕业生 · 利莫瑞克大学优秀硕士录取奖学金</p>
          </div>

          <div class="section">
            <h2>Contact</h2>
            <ul class="contact-list">
              <li><span class="label">Email</span>zhizheng@z-js.dev</li>
              <li><span class="label">GitHub</span><a href="https://github.com/SisyphusZheng" target="_blank" rel="noopener noreferrer">@SisyphusZheng</a></li>
              <li><span class="label">Blog</span><a href="https://zhi.deno.dev" target="_blank" rel="noopener noreferrer">zhi.deno.dev</a></li>
            </ul>
          </div>
        </main>

        <site-footer></site-footer>
      </div>
    `;
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, AboutPage);
}
