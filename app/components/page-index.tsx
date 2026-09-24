import { element, OpenElement, property } from '@openelement/element';
import { indexPageStyles } from './page-index-styles.ts';

@element('home-page', { root: 'shadow-open' })
export default class HomePage extends OpenElement {
  static override styles = indexPageStyles;

  @property({ reflect: false, attribute: false })
  latest: Array<{
    key: string;
    href: string;
    date: string;
    title: string;
    excerpt: string;
    tag0: string;
    tag0Hidden: boolean;
    tag1: string;
    tag1Hidden: boolean;
    tag2: string;
    tag2Hidden: boolean;
  }> = [];

  @property({ reflect: false, attribute: false })
  featured: Array<{
    key: string;
    href: string;
    status: string;
    title: string;
    summary: string;
  }> = [];

  @property({ reflect: false, attribute: false })
  topics: Array<{ key: string; name: string }> = [];

  render() {
    return (
      <div class='page'>
        <section class='hero'>
          <div class='hero-inner'>
            <p class='kicker'>Web Standards / DSD / LessJS</p>
            <h1>Zheng Zhi Field Notes</h1>
            <p class='lede'>
              A personal technical magazine and project lab for standards, components, and small
              frameworks built for real use.
            </p>
            <div class='actions'>
              <a class='button primary' href='/blog'>Read Notes</a>
              <a class='button' href='/projects'>Project Lab</a>
            </div>
          </div>
          <div class='scroll'>
            Scroll<span></span>
          </div>
        </section>

        <section class='section intro'>
          <div>
            <p class='eyebrow'>Editorial knowledge lab</p>
            <h2>Writing, projects, and standards notes in one place.</h2>
          </div>
          <p>
            Blog posts capture decisions and failure modes. Projects show the implementation
            evidence. Topics connect the long-running map across DSD, Web Components, LessJS, and
            release gates.
          </p>
        </section>

        <section class='section split'>
          <div>
            <div class='section-head'>
              <h2>Latest Writing</h2>
              <a href='/blog'>All writing</a>
            </div>
            <div class='writing'>
              {this.latest.map((post) => (
                <a class='post' href={post.href} key={post.key}>
                  <time>{post.date}</time>
                  <span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span class='tags'>
                      <span class='tag' hidden={post.tag0Hidden}>{post.tag0}</span>
                      <span class='tag' hidden={post.tag1Hidden}>{post.tag1}</span>
                      <span class='tag' hidden={post.tag2Hidden}>{post.tag2}</span>
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <aside class='lab'>
            <p class='eyebrow'>Project Lab</p>
            <h2>Active systems</h2>
            {this.featured.map((project) => (
              <a class='project' href={project.href} key={project.key}>
                <span class='status'>{project.status}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </a>
            ))}
          </aside>
        </section>

        <section class='section'>
          <div class='section-head'>
            <h2>Topics</h2>
            <a href='/topics'>Knowledge map</a>
          </div>
          <div class='topics'>
            {this.topics.map((topic) => (
              <a class='topic' href='/topics' key={topic.key}>{topic.name}</a>
            ))}
          </div>
        </section>
      </div>
    );
  }
}
