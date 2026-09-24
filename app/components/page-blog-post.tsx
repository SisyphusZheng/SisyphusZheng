import {
  element,
  OpenElement,
  property,
  type TrustedHtml,
  trustedHtml,
} from '@openelement/element';
import { blogPostPageStyles } from './page-blog-post-styles.ts';

interface BlogTag {
  key: string;
  label: string;
}

@element('blog-post-page', { root: 'shadow-open' })
export default class BlogPostPage extends OpenElement {
  static override styles = blogPostPageStyles;

  @property({ reflect: false, attribute: false })
  date = '';

  @property({ reflect: false, attribute: false })
  postTitle = '';

  @property({ reflect: false, attribute: false })
  excerpt = '';

  @property({ reflect: false, attribute: false })
  excerptHidden = true;

  @property({ reflect: false, attribute: false })
  tags: BlogTag[] = [];

  @property({ type: Object, reflect: false, attribute: false })
  articleHtml: TrustedHtml = trustedHtml('');

  render() {
    return (
      <article>
        <div>
          <a class='back' href='/blog'>Back to Writing</a>
          <time>{this.date}</time>
          <h1>{this.postTitle}</h1>
          <p class='excerpt' hidden={this.excerptHidden}>{this.excerpt}</p>
          <div class='tags'>
            {this.tags.map((tag) => <span class='tag' key={tag.key}>{tag.label}</span>)}
          </div>
          <div class='content' innerHTML={this.articleHtml} trustedHtml></div>
        </div>
        <aside>
          <h2>Contents</h2>
          <a href='#app-shell'>AppShell</a>
          <a href='#generated-data'>Generated Data</a>
          <a href='#release-gates'>Release Gates</a>
        </aside>
      </article>
    );
  }
}
