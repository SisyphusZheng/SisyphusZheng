import { element, OpenElement, property } from '@openelement/element';
import { zhTopicsPageStyles } from './page-zh-topics-styles.ts';

type TopicItem = {
  name: string;
};

@element('zh-topics-page', { root: 'shadow-open' })
export default class ZhTopicsPage extends OpenElement {
  static override styles = zhTopicsPageStyles;

  @property({ reflect: false, attribute: false })
  topics: TopicItem[] = [
    { name: 'LessJS' },
    { name: 'DSD' },
    { name: 'Web Components' },
    { name: 'Standards' },
    { name: 'Build Notes' },
  ];

  render() {
    return (
      <section class='wrap'>
        <p class='kicker'>Topics</p>
        <h1>标准、组件和发布门禁的知识地图。</h1>
        <div class='map'>
          {this.topics.map((topic) => <div class='topic' key={topic.name}>{topic.name}</div>)}
        </div>
      </section>
    );
  }
}
