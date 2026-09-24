import { element, OpenElement, property } from '@openelement/element';
import { topicsPageStyles } from './page-topics-styles.ts';

@element('topics-page', { root: 'shadow-open' })
export default class TopicsPage extends OpenElement {
  static override styles = topicsPageStyles;

  @property({ reflect: false, attribute: false })
  topics: Array<{ key: string; name: string; label: string }> = [];

  @property({ reflect: false, attribute: false })
  relatedWriting: Array<{ key: string; href: string; title: string }> = [];

  @property({ reflect: false, attribute: false })
  relatedProjects: Array<{ key: string; href: string; title: string }> = [];

  render() {
    return (
      <section class='wrap'>
        <p class='kicker'>Topics</p>
        <h1>Knowledge map for standards, components, and release gates.</h1>
        <div class='map'>
          {this.topics.map((topic) => (
            <div class='topic' key={topic.key}>
              <h2>{topic.name}</h2>
              <span>{topic.label}</span>
            </div>
          ))}
        </div>
        <div class='related'>
          <div class='panel'>
            <h2>Related Writing</h2>
            {this.relatedWriting.map((post) => <a href={post.href} key={post.key}>{post.title}</a>)}
          </div>
          <div class='panel'>
            <h2>Related Projects</h2>
            {this.relatedProjects.map((project) => (
              <a href={project.href} key={project.key}>{project.title}</a>
            ))}
          </div>
        </div>
      </section>
    );
  }
}
