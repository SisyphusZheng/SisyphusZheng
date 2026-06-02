import { DsdElement } from '@lessjs/core';
import { StyleSheet } from '@lessjs/style-sheet';
import { getProjectBySlug, projects } from '@site/generated/projects';
import { posts } from '@lessjs/generated/blog-data';
import type { BlogPost, Project } from '../../lib/types.ts';
import '../../components/site-shell.tsx';

export const tagName = 'project-detail-page';

export function getStaticPaths(): Array<Record<string, string>> {
  return (projects as Project[]).map((project) => ({ slug: project.slug }));
}

const styles = new StyleSheet();
styles.replaceSync(`
  :host { display: block; }

  .wrap {
    width: min(1120px, calc(100% - 36px));
    margin: 0 auto;
    padding: 64px 0 0;
  }

  .back {
    color: var(--rust);
    font-weight: 800;
    text-decoration-thickness: 1px;
    text-underline-offset: 5px;
  }

  .hero {
    display: grid;
    grid-template-columns: 1fr 310px;
    gap: 54px;
    align-items: end;
    padding: 36px 0 48px;
    border-bottom: 1px solid var(--line-strong);
  }

  .status {
    width: max-content;
    border-radius: 999px;
    padding: 5px 10px;
    color: var(--signal);
    background: color-mix(in srgb, var(--signal), transparent 88%);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 800;
  }

  h1 {
    margin: 16px 0 16px;
    font-family: var(--font-serif);
    font-size: clamp(4rem, 9vw, 8rem);
    line-height: 0.86;
    letter-spacing: 0;
  }

  .thesis {
    max-width: 680px;
    margin: 0;
    color: var(--muted);
    font-size: 1.2rem;
    line-height: 1.65;
  }

  .facts {
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 20px;
    background: var(--panel);
    color: var(--muted);
  }

  .facts h2 {
    margin: 0 0 14px;
    color: var(--ink);
    font-family: var(--font-mono);
    font-size: 0.82rem;
    text-transform: uppercase;
  }

  .facts p {
    margin: 10px 0;
    font-family: var(--font-mono);
    font-size: 0.78rem;
  }

  .body {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 54px;
    padding-top: 42px;
  }

  .content {
    color: var(--muted);
    font-family: var(--font-serif);
    font-size: 1.14rem;
    line-height: 1.8;
  }

  .content h2,
  .side h2 {
    color: var(--ink);
    font-family: var(--font-sans);
    letter-spacing: 0;
  }

  .content h2 {
    margin: 2.2em 0 0.7em;
    font-size: 1.6rem;
  }

  .content p {
    margin: 0 0 1.1em;
  }

  .side {
    position: sticky;
    top: 120px;
    align-self: start;
    display: grid;
    gap: 22px;
  }

  .box {
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 18px;
    background: var(--panel);
  }

  .box h2 {
    margin: 0 0 12px;
    font-size: 1.1rem;
  }

  .box a,
  .box span {
    display: block;
    margin: 9px 0;
    color: var(--muted);
    text-decoration: none;
  }

  .box a:hover {
    color: var(--rust);
  }

  .missing {
    padding: 72px 0;
  }

  @media (max-width: 900px) {
    .hero,
    .body {
      grid-template-columns: 1fr;
    }

    .side {
      position: static;
    }
  }
`);

export default class ProjectDetailPage extends DsdElement {
  static override styles = styles;
  slug = '';

  override render() {
    const project = getProjectBySlug(this.slug) as Project | undefined;
    if (!project) {
      return (
        <site-shell surface='paper'>
          <section class='wrap missing'>
            <a class='back' href='/projects'>Back to Projects</a>
            <h1>Project not found</h1>
          </section>
        </site-shell>
      );
    }
    const related = (posts as BlogPost[]).filter((post) =>
      (project.frontmatter.relatedPosts ?? []).includes(post.slug)
    );

    return (
      <site-shell surface='paper'>
        <section class='wrap'>
          <a class='back' href='/projects'>Back to Projects</a>
          <div class='hero'>
            <div>
              <span class='status'>{project.frontmatter.status}</span>
              <h1>{project.frontmatter.title}</h1>
              <p class='thesis'>{project.frontmatter.thesis}</p>
            </div>
            <aside class='facts'>
              <h2>Status</h2>
              <p>{project.frontmatter.status}</p>
              <h2>Stack</h2>
              <p>{(project.frontmatter.stack ?? []).join(', ')}</p>
            </aside>
          </div>
          <div class='body'>
            <div class='content' innerHTML={project.html} rawHtml={true}></div>
            <aside class='side'>
              <div class='box'>
                <h2>Links</h2>
                {Object.entries(project.frontmatter.links ?? {}).map(([label, href]) => (
                  <a href={href}>{label}</a>
                ))}
              </div>
              <div class='box'>
                <h2>Related Writing</h2>
                {related.map((post) => <a href={`/blog/${post.slug}`}>{post.frontmatter.title}</a>)}
              </div>
              <div class='box'>
                <h2>Timeline</h2>
                {(project.frontmatter.timeline ?? []).map((item) => <span>{item}</span>)}
              </div>
            </aside>
          </div>
        </section>
      </site-shell>
    );
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, ProjectDetailPage);
}
