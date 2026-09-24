import { definePage } from '@openelement/router';
import { projects } from '@site/generated/projects';
import ZhProjectsPage from '../../components/page-zh-projects.tsx';
import type { Project } from '../../lib/types.ts';

export const meta = { section: 'Main', label: '项目', order: 9 };

export default definePage(ZhProjectsPage, {
  head: {
    title: '可检查的项目档案 — Zheng Zhi Field Notes',
    description:
      'Chinese project lab: implementation boundaries, commands and verifiable outcomes for each project dossier.',
  },
  props: () => ({
    projects: (projects as Project[]).map((project) => ({
      slug: project.slug,
      href: `/projects/${project.slug}`,
      status: project.frontmatter.status,
      title: project.frontmatter.title,
      summary: project.frontmatter.summary,
    })),
  }),
});
