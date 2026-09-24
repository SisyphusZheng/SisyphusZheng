import {
  element,
  OpenElement,
  property,
  type TrustedHtml,
  trustedHtml,
} from '@openelement/element';
import { projectDetailPageStyles } from './page-project-detail-styles.ts';

@element('project-detail-page', { root: 'shadow-open' })
export default class ProjectDetailPage extends OpenElement {
  static override styles = projectDetailPageStyles;

  @property({ reflect: false, attribute: false })
  projectStatus = '';

  @property({ reflect: false, attribute: false })
  projectTitle = '';

  @property({ reflect: false, attribute: false })
  projectThesis = '';

  @property({ reflect: false, attribute: false })
  projectStack = '';

  @property({ type: Object, reflect: false, attribute: false })
  projectHtml: TrustedHtml = trustedHtml('');

  // Structural types kept inline: the compiled-element transform drops local
  // interface/type declarations from the emitted module, so a named alias here
  // would leave a dangling reference in the compiled output.
  @property({ reflect: false, attribute: false })
  links: Array<{ key: string; label: string; href: string }> = [];

  @property({ reflect: false, attribute: false })
  related: Array<{ key: string; href: string; title: string }> = [];

  @property({ reflect: false, attribute: false })
  timeline: Array<{ key: string; label: string }> = [];

  render() {
    return (
      <section class='wrap'>
        <a class='back' href='/projects'>Back to Projects</a>
        <div class='hero'>
          <div>
            <span class='status'>{this.projectStatus}</span>
            <h1>{this.projectTitle}</h1>
            <p class='thesis'>{this.projectThesis}</p>
          </div>
          <aside class='facts'>
            <h2>Status</h2>
            <p>{this.projectStatus}</p>
            <h2>Stack</h2>
            <p>{this.projectStack}</p>
          </aside>
        </div>
        <div class='body'>
          <div class='content' innerHTML={this.projectHtml} trustedHtml></div>
          <aside class='side'>
            <div class='box'>
              <h2>Links</h2>
              {this.links.map((link) => <a key={link.key} href={link.href}>{link.label}</a>)}
            </div>
            <div class='box'>
              <h2>Related Writing</h2>
              {this.related.map((post) => <a key={post.key} href={post.href}>{post.title}</a>)}
            </div>
            <div class='box'>
              <h2>Timeline</h2>
              {this.timeline.map((entry) => <span key={entry.key}>{entry.label}</span>)}
            </div>
          </aside>
        </div>
      </section>
    );
  }
}
