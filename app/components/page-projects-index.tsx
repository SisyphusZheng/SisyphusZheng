import { element, OpenElement, property } from '@openelement/element';
import { projectsIndexPageStyles } from './page-projects-index-styles.ts';

@element('projects-index-page', { root: 'shadow-open' })
export default class ProjectsIndexPage extends OpenElement {
  static override styles = projectsIndexPageStyles;

  // Structural type kept inline: the compiled-element transform drops local
  // interface/type declarations from the emitted module, so a named alias here
  // would leave a dangling reference in the compiled output.
  @property({ reflect: false, attribute: false })
  projects: Array<{
    key: string;
    href: string;
    status: string;
    title: string;
    summary: string;
    tag0: string;
    tag1: string;
    tag2: string;
    tag0Hidden: boolean;
    tag1Hidden: boolean;
    tag2Hidden: boolean;
  }> = [];

  @property({ reflect: false, attribute: false })
  featuredTitle = 'Project';

  @property({ reflect: false, attribute: false })
  featuredThesis = '';

  @property({ reflect: false, attribute: false })
  featuredStatus = 'Active';

  @property({ reflect: false, attribute: false })
  featuredStack = '';

  @property({ reflect: false, attribute: false })
  featuredRelatedCount = 0;

  render() {
    return (
      <section class='wrap'>
        <div class='hero'>
          <div>
            <p class='kicker'>Project Lab</p>
            <h1>Active systems and research dossiers.</h1>
            <p class='intro'>
              Projects are implementation evidence: where architectural notes, standards ideas, and
              release gates become something checkable.
            </p>
          </div>
          <aside class='status-rail'>
            <span>
              Active <b>3</b>
            </span>
            <span>
              Research <b>2</b>
            </span>
            <span>
              Archived <b>0</b>
            </span>
          </aside>
        </div>
        <div class='grid'>
          <nav class='rail' aria-label='Project status'>
            <a href='/projects'>Active</a>
            <a href='/projects'>Research</a>
            <a href='/projects'>Archived</a>
          </nav>
          <div class='list'>
            {
              /* The compiled list-item grammar admits item values and intrinsic
                elements, but no nested list Region inside an item template: one
                project row cannot map its own tag array. Each row therefore
                carries three chip slots — the widest tag list the dossiers hold
                — and a slot with no tag is emitted hidden, which is
                layout-identical to omitting the chip. The route's props
                projector refuses to project a row with a 4th tag instead of
                dropping it silently. */
            }
            {this.projects.map((project) => (
              <a class='project' key={project.key} href={project.href}>
                <span class='status'>{project.status}</span>
                <span>
                  <h2>{project.title}</h2>
                  <p>{project.summary}</p>
                  <span class='tags'>
                    <span class='tag' hidden={project.tag0Hidden}>{project.tag0}</span>
                    <span class='tag' hidden={project.tag1Hidden}>{project.tag1}</span>
                    <span class='tag' hidden={project.tag2Hidden}>{project.tag2}</span>
                  </span>
                </span>
              </a>
            ))}
          </div>
          <aside class='preview'>
            <p class='kicker'>Selected</p>
            <h2>{this.featuredTitle}</h2>
            <p>{this.featuredThesis}</p>
            <div class='facts'>
              <span>Status: {this.featuredStatus}</span>
              <span>Stack: {this.featuredStack}</span>
              <span>Related Writing: {this.featuredRelatedCount}</span>
            </div>
          </aside>
        </div>
      </section>
    );
  }
}
