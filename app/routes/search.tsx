import { definePage } from '@openelement/router';
import { posts } from '@site/generated/blog-data';
import { projects } from '@site/generated/projects';
import type { BlogPost, Project } from '../lib/types.ts';
import SearchPage from '../components/page-search.tsx';

export const meta = { section: 'Main', label: 'Search', order: 6 };

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

export default definePage(SearchPage, {
  head: {
    title: 'Search — Zheng Zhi Field Notes',
    description: 'Search every note and project dossier: filter writings and projects by keyword.',
  },
  props: () => ({ records: JSON.stringify(records()) }),
});
