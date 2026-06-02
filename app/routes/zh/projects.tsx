import { DsdElement } from '@lessjs/core';
import { StyleSheet } from '@lessjs/style-sheet';
import { projects } from '@site/generated/projects';
import type { Project } from '../../lib/types.ts';
import '../../components/site-shell.tsx';

export const tagName = 'zh-projects-page';
export const meta = { section: 'Main', label: '项目', order: 9 };

const styles = new StyleSheet();
styles.replaceSync(`
  :host { display: block; }
  .wrap {
    width: min(1120px, calc(100% - 36px));
    margin: 0 auto;
    padding: 72px 0 0;
  }
  .kicker {
    color: var(--teal);
    font-family: var(--font-mono);
    font-size: 0.76rem;
    font-weight: 800;
    text-transform: uppercase;
  }
  h1 {
    max-width: 860px;
    margin: 12px 0 42px;
    font-family: var(--font-serif);
    font-size: clamp(3.6rem, 8vw, 7.2rem);
    line-height: 0.9;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }
  .project {
    min-height: 220px;
    display: grid;
    align-content: space-between;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 20px;
    background: var(--panel);
    color: inherit;
    text-decoration: none;
  }
  h2 { margin: 0; font-size: 2rem; }
  p { color: var(--muted); line-height: 1.65; }
  span {
    color: var(--signal);
    font-family: var(--font-mono);
    font-size: 0.74rem;
    font-weight: 800;
  }
  @media (max-width: 760px) {
    .grid { grid-template-columns: 1fr; }
  }
`);

export default class ZhProjectsPage extends DsdElement {
  static override styles = styles;

  override render() {
    return (
      <site-shell surface='paper' language='zh'>
        <section class='wrap'>
          <p class='kicker'>Project Lab</p>
          <h1>可检查的项目档案</h1>
          <div class='grid'>
            {(projects as Project[]).map((project) => (
              <a class='project' href={`/projects/${project.slug}`}>
                <span>{project.frontmatter.status}</span>
                <h2>{project.frontmatter.title}</h2>
                <p>{project.frontmatter.summary}</p>
              </a>
            ))}
          </div>
        </section>
      </site-shell>
    );
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, ZhProjectsPage);
}
