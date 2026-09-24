import { definePage, notFound } from '@openelement/router';
import { trustedHtml } from '@openelement/element';
import { getPostBySlug, posts } from '@site/generated/blog-data';
import type { BlogPost } from '../../lib/types.ts';
import { formatDate } from '../../lib/format.ts';
import BlogPostPage from '../../components/page-blog-post.tsx';

export function getStaticPaths(): Array<Record<string, string>> {
  return (posts as BlogPost[]).map((post) => ({ slug: post.slug }));
}

export default definePage(BlogPostPage, {
  head: ({ params }) => {
    const post = getPostBySlug(params.slug) as BlogPost | undefined;
    return {
      title: post ? post.frontmatter.title + ' — Zheng Zhi Field Notes' : 'Not Found',
      description: post?.frontmatter.excerpt,
    };
  },
  props: ({ params }) => {
    const post = getPostBySlug(params.slug) as BlogPost | undefined;
    if (!post) notFound('Post not found: ' + params.slug);

    const excerpt = post.frontmatter.excerpt ?? '';
    return {
      date: formatDate(post.frontmatter.date),
      postTitle: post.frontmatter.title,
      excerpt,
      excerptHidden: excerpt === '',
      tags: (post.frontmatter.tags ?? []).map((tag) => ({ key: tag, label: tag })),
      articleHtml: trustedHtml(post.html),
    };
  },
});
