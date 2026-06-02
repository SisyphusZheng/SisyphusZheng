import { DsdElement } from '@lessjs/core';
import { StyleSheet } from '@lessjs/style-sheet';
import { posts } from '@lessjs/generated/blog-data';
import { projects } from '@site/generated/projects';
import type { BlogPost, Project } from '../lib/types.ts';
import '../components/site-shell.tsx';

export const tagName = 'topics-page';
export const meta = { section: 'Main', label: 'Topics', order: 4 };

const topics = ['LessJS', 'DSD', 'Web Components', 'Standards', 'Build Notes'];

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
    max-width: 820px;
    margin: 12px 0 34px;
    font-family: var(--font-serif);
    font-size: clamp(3.5rem, 8vw, 7.2rem);
    line-height: 0.9;
  }

  .map {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;
  }

  .topic {
    min-height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 18px;
    background: var(--panel);
  }

  .topic h2 {
    margin: 0;
    font-size: 1.25rem;
  }

  .topic span {
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 0.74rem;
    font-weight: 800;
  }

  .related {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    padding-top: 54px;
  }

  .panel {
    border-top: 1px solid var(--line-strong);
    padding-top: 18px;
  }

  .panel h2 {
    margin: 0 0 16px;
    font-size: 1.4rem;
  }

  .panel a {
    display: block;
    border-bottom: 1px solid var(--line);
    padding: 12px 0;
    color: inherit;
    text-decoration: none;
  }

  .panel a:hover {
    color: var(--rust);
  }

  @media (max-width: 900px) {
    .map,
    .related {
      grid-template-columns: 1fr;
    }
  }
`);

export default class TopicsPage extends DsdElement {
  static override styles = styles;

  override render() {
    return (
      <site-shell surface='paper'>
        <section class='wrap'>
          <p class='kicker'>Topics</p>
          <h1>Knowledge map for standards, components, and release gates.</h1>
          <div class='map'>
            {topics.map((topic) => (
              <div class='topic'>
                <h2>{topic}</h2>
                <span>
                  {(posts as BlogPost[]).filter((post) =>
                    (post.frontmatter.tags ?? []).includes(topic)
                  ).length} writings / {(projects as Project[]).filter((project) =>
                    (project.frontmatter.tags ?? []).includes(topic)
                  ).length} projects
                </span>
              </div>
            ))}
          </div>
          <div class='related'>
            <div class='panel'>
              <h2>Related Writing</h2>
              {(posts as BlogPost[]).slice(0, 4).map((post) => (
                <a href={`/blog/${post.slug}`}>{post.frontmatter.title}</a>
              ))}
            </div>
            <div class='panel'>
              <h2>Related Projects</h2>
              {(projects as Project[]).map((project) => (
                <a href={`/projects/${project.slug}`}>{project.frontmatter.title}</a>
              ))}
            </div>
          </div>
        </section>
      </site-shell>
    );
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, TopicsPage);
}
