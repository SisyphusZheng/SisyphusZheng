import { element, OpenElement, property } from '@openelement/element';
import { zhSearchPageStyles } from './page-zh-search-styles.ts';

@element('zh-search-page', { root: 'shadow-open' })
export default class ZhSearchPage extends OpenElement {
  static override styles = zhSearchPageStyles;

  @property({ reflect: false, attribute: false })
  records: string = '[]';

  render() {
    return (
      <section class='wrap'>
        <p class='kicker'>Search</p>
        <h1>搜索文章和项目证据。</h1>
        <site-search records={this.records} placeholder='搜索 LessJS、DSD、标准...'></site-search>
      </section>
    );
  }
}
