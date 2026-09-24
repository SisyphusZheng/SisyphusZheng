import { definePage } from '@openelement/router';
import { posts } from '@site/generated/blog-data';
import { projects } from '@site/generated/projects';
import type { BlogPost, Project } from '../lib/types.ts';
import TopicsPage from '../components/page-topics.tsx';

export const meta = { section: 'Main', label: 'Topics', order: 4 };

const TOPICS = ['LessJS', 'DSD', 'Web Components', 'Standards', 'Build Notes'];

export default definePage(TopicsPage, {
  head: {
    title: 'Topics — Zheng Zhi Field Notes',
    description:
      'The knowledge map for standards, components, and release gates: writings and projects grouped by topic.',
  },
  props: () => ({
    topics: TOPICS.map((name) => {
      const writings = (posts as BlogPost[])
        .filter((post) => (post.frontmatter.tags ?? []).includes(name))
        .length;
      const projectCount = (projects as Project[])
        .filter((project) => (project.frontmatter.tags ?? []).includes(name))
        .length;
      // Precomposed because the compiled item template drops whitespace-only
      // text around dynamic children, which would collapse "1 writings / 2".
      return {
        key: name,
        name,
        label: `${writings} writings / ${projectCount} projects`,
      };
    }),
    relatedWriting: (posts as BlogPost[]).slice(0, 4).map((post) => ({
      key: post.slug,
      href: `/blog/${post.slug}`,
      title: post.frontmatter.title,
    })),
    relatedProjects: (projects as Project[]).map((project) => ({
      key: project.slug,
      href: `/projects/${project.slug}`,
      title: project.frontmatter.title,
    })),
  }),
});
