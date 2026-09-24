import { definePage } from '@openelement/router';
import { posts } from '@site/generated/blog-data';
import ZhBlogPage from '../../components/page-zh-blog.tsx';
import { formatDate } from '../../lib/format.ts';
import type { BlogPost } from '../../lib/types.ts';

export const meta = { section: 'Main', label: '写作', order: 8 };

export default definePage(ZhBlogPage, {
  head: {
    title: '文章与构建记录 — Zheng Zhi Field Notes',
    description:
      'Chinese archive of writing and build records: DSD rendering, Web Components, standards research and release notes.',
  },
  props: () => ({
    posts: (posts as BlogPost[])
      .filter((post) => post.frontmatter)
      .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date))
      .map((post) => ({
        slug: post.slug,
        href: `/blog/${post.slug}`,
        date: formatDate(post.frontmatter.date),
        title: post.frontmatter.title,
        excerpt: post.frontmatter.excerpt ?? '',
      })),
  }),
});
