import { definePage } from '@openelement/router';
import { projects } from '@site/generated/projects';
import type { Project } from '../../lib/types.ts';
import ProjectsIndexPage from '../../components/page-projects-index.tsx';

export const meta = { section: 'Main', label: 'Projects', order: 3 };

export default definePage(ProjectsIndexPage, {
  head: {
    title: 'Projects — Zheng Zhi Field Notes',
    description:
      'Project lab: implementation evidence where architectural notes, standards ideas and release gates become something checkable.',
  },
  props: () => {
    const all = projects as Project[];
    const featured = all[0]?.frontmatter;

    const rows = all.map((project) => {
      const tags = project.frontmatter.tags ?? [];
      // The compiled page's project row carries three chip slots (a nested list
      // Region is outside the item-template grammar); refuse to project rather
      // than silently drop a tag the dossiers grow.
      if (tags.length > 3) {
        throw new Error(
          `[projects-index] project "${project.slug}" has ${tags.length} tags; the row template ` +
            'carries 3 chip slots. Widen ProjectsIndexItem/page-projects-index.tsx before adding a 4th tag.',
        );
      }
      return {
        key: project.slug,
        href: `/projects/${project.slug}`,
        status: project.frontmatter.status,
        title: project.frontmatter.title,
        summary: project.frontmatter.summary,
        tag0: tags[0] ?? '',
        tag1: tags[1] ?? '',
        tag2: tags[2] ?? '',
        tag0Hidden: tags.length < 1,
        tag1Hidden: tags.length < 2,
        tag2Hidden: tags.length < 3,
      };
    });

    return {
      projects: rows,
      featuredTitle: featured?.title ?? 'Project',
      featuredThesis: featured?.thesis ?? '',
      featuredStatus: featured?.status ?? 'Active',
      featuredStack: (featured?.stack ?? []).slice(0, 3).join(', '),
      featuredRelatedCount: (featured?.relatedPosts ?? []).length,
    };
  },
});
