import { DsdElement } from '@lessjs/core';
import { StyleSheet } from '@lessjs/style-sheet';
import '../../components/site-shell.tsx';

export const tagName = 'zh-about-page';
export const meta = { section: 'Main', label: '关于', order: 11 };

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
    margin: 12px 0 24px;
    font-family: var(--font-serif);
    font-size: clamp(4rem, 8vw, 7.4rem);
    line-height: 0.9;
  }
  p, li {
    max-width: 780px;
    color: var(--muted);
    font-size: 1.08rem;
    line-height: 1.8;
  }
  .section {
    border-top: 1px solid var(--line-strong);
    margin-top: 42px;
    padding-top: 22px;
  }
`);

export default class ZhAboutPage extends DsdElement {
  static override styles = styles;

  override render() {
    return (
      <site-shell surface='paper' language='zh'>
        <section class='wrap'>
          <p class='kicker'>About</p>
          <h1>郑智</h1>
          <p>
            关注 DSD-first 渲染、Web Components、静态内容系统和
            LessJS。这个站点用于把架构判断、实现证据和发布门禁放到同一个可检查的界面里。
          </p>
          <div class='section'>
            <h2>当前重点</h2>
            <ul>
              <li>让个人博客不只是展示页，而是技术证据库。</li>
              <li>用项目页沉淀实现边界、命令和结果。</li>
              <li>用主题页连接长期研究线索。</li>
            </ul>
          </div>
        </section>
      </site-shell>
    );
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, ZhAboutPage);
}
