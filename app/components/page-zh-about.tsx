import { element, OpenElement } from '@openelement/element';
import { zhAboutPageStyles } from './page-zh-about-styles.ts';

@element('zh-about-page', { root: 'shadow-open' })
export default class ZhAboutPage extends OpenElement {
  static override styles = zhAboutPageStyles;

  render() {
    return (
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
    );
  }
}
