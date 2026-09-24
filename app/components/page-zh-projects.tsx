import { element, OpenElement, property } from '@openelement/element';
import { zhProjectsPageStyles } from './page-zh-projects-styles.ts';

type ProjectListItem = {
  slug: string;
  href: string;
  status: string;
  title: string;
  summary: string;
};

@element('zh-projects-page', { root: 'shadow-open' })
export default class ZhProjectsPage extends OpenElement {
  static override styles = zhProjectsPageStyles;

  @property({ reflect: false, attribute: false })
  projects: ProjectListItem[] = [];

  render() {
    return (
      <section class='wrap'>
        <p class='kicker'>Project Lab</p>
        <h1>可检查的项目档案</h1>
        <div class='grid'>
          {this.projects.map((project) => (
            <a class='project' key={project.slug} href={project.href}>
              <span>{project.status}</span>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
            </a>
          ))}
        </div>
      </section>
    );
  }
}
