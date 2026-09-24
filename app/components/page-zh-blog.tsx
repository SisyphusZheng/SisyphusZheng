import { element, OpenElement, property } from '@openelement/element';
import { zhBlogPageStyles } from './page-zh-blog-styles.ts';

type BlogListItem = {
  slug: string;
  href: string;
  date: string;
  title: string;
  excerpt: string;
};

@element('zh-blog-page', { root: 'shadow-open' })
export default class ZhBlogPage extends OpenElement {
  static override styles = zhBlogPageStyles;

  @property({ reflect: false, attribute: false })
  posts: BlogListItem[] = [];

  render() {
    return (
      <section class='wrap'>
        <p class='kicker'>Writing</p>
        <h1>文章与构建记录</h1>
        {this.posts.map((post) => (
          <a class='item' key={post.slug} href={post.href}>
            <time>{post.date}</time>
            <span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </span>
          </a>
        ))}
      </section>
    );
  }
}
