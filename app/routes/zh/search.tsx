import { definePage } from '@openelement/router';
import { posts } from '@site/generated/blog-data';
import { projects } from '@site/generated/projects';
import ZhSearchPage from '../../components/page-zh-search.tsx';
import type { BlogPost, Project } from '../../lib/types.ts';

export const meta = { section: 'Main', label: '搜索', order: 12 };

export default definePage(ZhSearchPage, {
  head: {
    title: '搜索 — Zheng Zhi Field Notes',
    description:
      'Chinese search page: find writing and project evidence across this site by keyword.',
  },
  props: () => ({
    records: JSON.stringify([
      ...(posts as BlogPost[]).map((post) => ({
        title: post.frontmatter.title,
        body: post.frontmatter.excerpt ?? '',
        href: `/blog/${post.slug}`,
        type: '文章',
        tags: post.frontmatter.tags ?? [],
      })),
      ...(projects as Project[]).map((project) => ({
        title: project.frontmatter.title,
        body: project.frontmatter.summary,
        href: `/projects/${project.slug}`,
        type: '项目',
        tags: project.frontmatter.tags ?? [],
      })),
    ]),
  }),
});
