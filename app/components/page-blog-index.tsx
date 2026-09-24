import { element, OpenElement, property } from '@openelement/element';
import { blogIndexPageStyles } from './page-blog-index-styles.ts';

interface BlogIndexChip {
  key: string;
  label: string;
}

interface BlogIndexRow {
  slug: string;
  href: string;
  date: string;
  title: string;
  excerpt: string;
  tag0: string;
  tag1: string;
  tag2: string;
  tag0Hidden: boolean;
  tag1Hidden: boolean;
  tag2Hidden: boolean;
}

@element('blog-index-page', { root: 'shadow-open' })
export default class BlogIndexPage extends OpenElement {
  static override styles = blogIndexPageStyles;

  @property({ reflect: false, attribute: false })
  chips: BlogIndexChip[] = [];

  @property({ reflect: false, attribute: false })
  rows: BlogIndexRow[] = [];

  render() {
    return (
      <section class='wrap'>
        <div class='hero'>
          <div>
            <p class='kicker'>Writing</p>
            <h1>Essays and Build Notes</h1>
            <p class='intro'>
              A running archive of implementation notes, design decisions, and framework
              observations.
            </p>
          </div>
          <aside class='filters'>
            <span class='filter-title'>Search notes</span>
            <div class='filter-list'>
              {this.chips.map((chip) => <span class='chip' key={chip.key}>{chip.label}</span>)}
            </div>
          </aside>
        </div>

        <div class='list'>
          {
            /* The compiled list-item grammar admits item values and intrinsic
              elements, but no nested list Region inside an item template: one
              row cannot map its own tag array. Each row therefore carries three
              chip slots — the widest tag list the archive holds — and a slot
              with no tag is emitted hidden, which is layout-identical to
              omitting the chip. The route's props projector refuses to project
              a row with a 4th tag instead of dropping it silently. */
          }
          {this.rows.map((row) => (
            <a class='item' key={row.slug} href={row.href}>
              <time>{row.date}</time>
              <span>
                <h2>{row.title}</h2>
                <p>{row.excerpt}</p>
                <span class='tags'>
                  <span class='tag' hidden={row.tag0Hidden}>{row.tag0}</span>
                  <span class='tag' hidden={row.tag1Hidden}>{row.tag1}</span>
                  <span class='tag' hidden={row.tag2Hidden}>{row.tag2}</span>
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>
    );
  }
}
