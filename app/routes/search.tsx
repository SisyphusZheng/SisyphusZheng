import { DsdElement } from '@lessjs/core';
import { StyleSheet } from '@lessjs/style-sheet';
import { posts } from '@lessjs/generated/blog-data';
import { projects } from '@site/generated/projects';
import type { BlogPost, Project } from '../lib/types.ts';
import '../components/site-shell.tsx';
import '../islands/site-search.tsx';

export const tagName = 'search-page';
export const meta = { section: 'Main', label: 'Search', order: 6 };

const styles = new StyleSheet();
styles.replaceSync(`
  :host { display: block; }

  .wrap {
    width: min(960px, calc(100% - 36px));
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
    margin: 12px 0 28px;
    font-family: var(--font-serif);
    font-size: clamp(3.4rem, 8vw, 7.2rem);
    line-height: 0.9;
  }

  input {
    width: 100%;
    height: 58px;
    border: 1px solid var(--line-strong);
    border-radius: 8px;
    padding: 0 18px;
    background: var(--panel);
    color: var(--ink);
    font: 700 1rem var(--font-sans);
    outline: none;
  }

  input:focus {
    border-color: var(--rust);
  }

  .results {
    display: grid;
    gap: 12px;
    margin-top: 28px;
  }

  .result {
    display: grid;
    gap: 8px;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 18px;
    background: var(--panel);
    color: inherit;
    text-decoration: none;
  }

  .result span {
    color: var(--teal);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .result strong {
    font-size: 1.35rem;
  }

  .result small {
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.6;
  }
`);

function records() {
  return [
    ...(posts as BlogPost[]).map((post) => ({
      title: post.frontmatter.title,
      body: post.frontmatter.excerpt ?? '',
      href: `/blog/${post.slug}`,
      type: 'Writing',
      tags: post.frontmatter.tags ?? [],
    })),
    ...(projects as Project[]).map((project) => ({
      title: project.frontmatter.title,
      body: project.frontmatter.summary,
      href: `/projects/${project.slug}`,
      type: 'Project',
      tags: project.frontmatter.tags ?? [],
    })),
  ];
}

export default class SearchPage extends DsdElement {
  static override styles = styles;

  override render() {
    return (
      <site-shell surface='paper'>
        <section class='wrap'>
          <p class='kicker'>Search</p>
          <h1>Find notes and project evidence.</h1>
          <site-search data-records={JSON.stringify(records())}>
            <input type='search' placeholder='Search LessJS, DSD, standards...' autofocus />
            <div class='results' data-results></div>
          </site-search>
        </section>
      </site-shell>
    );
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, SearchPage);
}
