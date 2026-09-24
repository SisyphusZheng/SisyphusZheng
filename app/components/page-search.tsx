import { element, OpenElement, property } from '@openelement/element';
import { searchPageStyles } from './page-search-styles.ts';

@element('search-page', { root: 'shadow-open' })
export default class SearchPage extends OpenElement {
  static override styles = searchPageStyles;

  @property({ reflect: false, attribute: false })
  records = '';

  render() {
    return (
      <section class='wrap'>
        <p class='kicker'>Search</p>
        <h1>Find notes and project evidence.</h1>
        <site-search
          records={this.records}
          placeholder='Search LessJS, DSD, standards...'
        >
        </site-search>
      </section>
    );
  }
}
