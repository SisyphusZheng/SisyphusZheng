import { element, OpenElement } from '@openelement/element';
import { zhIndexPageStyles } from './page-zh-index-styles.ts';

@element('zh-home-page', { root: 'shadow-open' })
export default class ZhHomePage extends OpenElement {
  static override styles = zhIndexPageStyles;

  render() {
    return (
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
    );
  }
}
