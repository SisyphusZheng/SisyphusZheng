import { DsdElement } from '@lessjs/core';
import { StyleSheet } from '@lessjs/style-sheet';
import '../../components/site-shell.tsx';

export const tagName = 'zh-home-page';
export const meta = { section: 'Main', label: '中文', order: 7 };

const styles = new StyleSheet();
styles.replaceSync(`
  :host { display: block; }
  .hero {
    min-height: 100dvh;
    display: grid;
    align-items: end;
    color: white;
    background:
      linear-gradient(90deg, rgba(7, 7, 7, 0.9), rgba(7, 7, 7, 0.38), rgba(7, 7, 7, 0.72)),
      linear-gradient(180deg, rgba(7, 7, 7, 0.18), rgba(7, 7, 7, 0.76)),
      url('/assets/hero-oil-still-life.png') center / cover no-repeat;
  }
  .inner {
    width: min(1180px, calc(100% - 36px));
    margin: 0 auto;
    padding: 28vh 0 92px;
  }
  .kicker {
    color: var(--brass);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 800;
    text-transform: uppercase;
  }
  h1 {
    max-width: 920px;
    margin: 18px 0 0;
    font-family: var(--font-serif);
    font-size: clamp(4rem, 10vw, 9rem);
    line-height: 0.86;
  }
  p {
    max-width: 650px;
    color: rgba(255, 250, 240, 0.78);
    font-size: 1.18rem;
    line-height: 1.75;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 28px;
  }
  a {
    min-height: 46px;
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 0 18px;
    color: white;
    background: var(--rust);
    text-decoration: none;
    font-weight: 800;
  }
  a.secondary {
    border: 1px solid rgba(255, 255, 255, 0.24);
    background: rgba(255, 255, 255, 0.12);
  }
`);

export default class ZhHomePage extends DsdElement {
  static override styles = styles;

  override render() {
    return (
      <site-shell language='zh'>
        <section class='hero'>
          <div class='inner'>
            <p class='kicker'>Web Standards / DSD / LessJS</p>
            <h1>郑智技术札记</h1>
            <p>一个把技术写作、项目证据、标准研究和发布记录放在一起的个人博客。</p>
            <div class='actions'>
              <a href='/zh/blog'>阅读文章</a>
              <a class='secondary' href='/zh/projects'>项目实验室</a>
            </div>
          </div>
        </section>
      </site-shell>
    );
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, ZhHomePage);
}
