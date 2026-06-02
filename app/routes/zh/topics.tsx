import { DsdElement } from '@lessjs/core';
import { StyleSheet } from '@lessjs/style-sheet';
import '../../components/site-shell.tsx';

export const tagName = 'zh-topics-page';
export const meta = { section: 'Main', label: '主题', order: 10 };

const topics = ['LessJS', 'DSD', 'Web Components', 'Standards', 'Build Notes'];

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
    max-width: 820px;
    margin: 12px 0 34px;
    font-family: var(--font-serif);
    font-size: clamp(3.6rem, 8vw, 7.2rem);
    line-height: 0.9;
  }
  .map {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;
  }
  .topic {
    min-height: 220px;
    display: flex;
    align-items: end;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 18px;
    background: var(--panel);
    font-weight: 800;
  }
  @media (max-width: 900px) {
    .map { grid-template-columns: 1fr; }
  }
`);

export default class ZhTopicsPage extends DsdElement {
  static override styles = styles;

  override render() {
    return (
      <site-shell surface='paper' language='zh'>
        <section class='wrap'>
          <p class='kicker'>Topics</p>
          <h1>标准、组件和发布门禁的知识地图。</h1>
          <div class='map'>{topics.map((topic) => <div class='topic'>{topic}</div>)}</div>
        </section>
      </site-shell>
    );
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, ZhTopicsPage);
}
