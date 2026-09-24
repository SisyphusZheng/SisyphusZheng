import { definePage, notFound } from '@openelement/router';
import { trustedHtml } from '@openelement/element';
import { getProjectBySlug, projects } from '@site/generated/projects';
import { posts } from '@site/generated/blog-data';
import type { BlogPost, Project } from '../../lib/types.ts';
import ProjectDetailPage from '../../components/page-project-detail.tsx';

export function getStaticPaths(): Array<Record<string, string>> {
  return (projects as Project[]).map((project) => ({ slug: project.slug }));
}

export default definePage(ProjectDetailPage, {
  head: ({ params }) => {
    const project = getProjectBySlug(params.slug) as Project | undefined;
    return {
      title: project ? project.frontmatter.title + ' — Zheng Zhi Field Notes' : 'Not Found',
      description: project?.frontmatter.summary,
    };
  },
  props: ({ params }) => {
    const project = getProjectBySlug(params.slug) as Project | undefined;
    if (!project) notFound('Project not found: ' + params.slug);

    const related = (posts as BlogPost[]).filter((post) =>
      (project.frontmatter.relatedPosts ?? []).includes(post.slug)
    );

    return {
      projectStatus: project.frontmatter.status,
      projectTitle: project.frontmatter.title,
      projectThesis: project.frontmatter.thesis,
      projectStack: (project.frontmatter.stack ?? []).join(', '),
      projectHtml: trustedHtml(project.html),
      links: Object.entries(project.frontmatter.links ?? {}).map(([label, href]) => ({
        key: label,
        label,
        href,
      })),
      related: related.map((post) => ({
        key: post.slug,
        href: `/blog/${post.slug}`,
        title: post.frontmatter.title,
      })),
      timeline: (project.frontmatter.timeline ?? []).map((item, index) => ({
        key: `${index}:${item}`,
        label: item,
      })),
    };
  },
});
