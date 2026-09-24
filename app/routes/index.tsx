import { definePage } from '@openelement/router';
import { posts } from '@site/generated/blog-data';
import { projects } from '@site/generated/projects';
import { formatDate } from '../lib/format.ts';
import type { BlogPost, Project } from '../lib/types.ts';
import HomePage from '../components/page-index.tsx';

export const meta = { section: 'Main', label: 'Home', order: 1 };

const HOME_TOPICS = ['LessJS', 'DSD', 'Web Components', 'Standards', 'Build Notes'];

/**
 * The compiled list Region renders one flat item template per entry, so each
 * post's up-to-three tags are projected into fixed slots plus a per-slot
 * hidden flag (the compiler's item grammar has no nested map or conditional).
 */
function tagSlots(tags: string[]) {
  const three = tags.slice(0, 3);
  return {
    tag0: three[0] ?? '',
    tag0Hidden: three.length < 1,
    tag1: three[1] ?? '',
    tag1Hidden: three.length < 2,
    tag2: three[2] ?? '',
    tag2Hidden: three.length < 3,
  };
}

export default definePage(HomePage, {
  head: {
    title: 'Home — Zheng Zhi Field Notes',
    description:
      'A personal technical magazine and project lab connecting standards notes, project evidence, and release gates.',
  },
  props: () => ({
    latest: (posts as BlogPost[])
      .filter((post) => post.frontmatter)
      .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date))
      .slice(0, 3)
      .map((post) => ({
        key: post.slug,
        href: `/blog/${post.slug}`,
        date: formatDate(post.frontmatter.date),
        title: post.frontmatter.title,
        excerpt: post.frontmatter.excerpt ?? '',
        ...tagSlots(post.frontmatter.tags ?? []),
      })),
    featured: (projects as Project[])
      .filter((project) => project.frontmatter.featured)
      .slice(0, 3)
      .map((project) => ({
        key: project.slug,
        href: `/projects/${project.slug}`,
        status: project.frontmatter.status,
        title: project.frontmatter.title,
        summary: project.frontmatter.summary,
      })),
    topics: HOME_TOPICS.map((name) => ({ key: name, name })),
  }),
});
