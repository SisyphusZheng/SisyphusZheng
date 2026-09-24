import { defineIslandConfig } from '@openelement/router';
import { computed, element, OpenElement, property } from '@openelement/element';
import { siteSearchStyles } from '../components/site-search-styles.ts';

// Compiled island replacing the retired vanilla `HTMLElement` version. The
// retired island owned only the filtering and expected the `<input>` and the
// results container as light-DOM children written by each page; a compiled
// island renders its own DOM, so the input, the results container and the rows
// are all part of this program now (the zh page's former children are dropped,
// and its Chinese placeholder arrives through the `placeholder` property).
//
// The retired `innerHTML` string concatenation is gone: rows render through a
// list Region, so every record value is escaped by the serializer instead of
// being interpolated into markup.
export const openElement = defineIslandConfig({ hydrate: 'load', ssr: true, dsd: true });

interface SearchRecord {
  title: string;
  body: string;
  href: string;
  type: string;
  tags: string[];
}

@element('site-search', { root: 'shadow-open' })
export default class SiteSearch extends OpenElement {
  static override styles = siteSearchStyles;

  /** Serialized search records; the page supplies them as a host attribute. */
  @property({ reflect: false })
  records = '';

  /** Localized input placeholder; the page supplies its language's copy. */
  @property({ reflect: false })
  placeholder = 'Search LessJS, DSD, standards...';

  /** Live input value; the retired island read it back off the <input> node. */
  @property({ reflect: false, attribute: false })
  query = '';

  // The retired #render()'s filter, expressed as a derived field: a compiled
  // render() is a single static return, so the work happens here and the
  // template reads the result through a list Region. The value-typed
  // annotation matches what a read yields (the facade unwraps the derived
  // signal); the cast documents that contract.
  @property({ reflect: false, attribute: false })
  results: SearchRecord[] = computed(() =>
    ((records: string, query: string) => {
      const parsed = JSON.parse(records || '[]') as SearchRecord[];
      const needle = query.trim().toLowerCase();
      const matches = needle === ''
        ? parsed
        : parsed.filter((record) =>
          [record.title, record.body, record.type, ...record.tags].join(' ').toLowerCase().includes(
            needle,
          )
        );
      return matches.slice(0, 12);
    })(this.records, this.query)
  ) as unknown as SearchRecord[];

  onQuery(event: Event) {
    const target = event.target as HTMLInputElement | null;
    this.query = target?.value ?? '';
  }

  render() {
    return (
      <div class='search'>
        <input type='search' placeholder={this.placeholder} autofocus onInput={this.onQuery} />
        <div class='results'>
          {this.results.map((record) => (
            <a class='result' href={record.href} key={record.href}>
              <span>{record.type}</span>
              <strong>{record.title}</strong>
              <small>{record.body}</small>
            </a>
          ))}
        </div>
      </div>
    );
  }
}
