import { definePage } from '@openelement/router';
import { posts } from '@site/generated/blog-data';
import type { BlogPost } from '../../lib/types.ts';
import { formatDate } from '../../lib/format.ts';
import BlogIndexPage from '../../components/page-blog-index.tsx';

export const meta = { section: 'Main', label: 'Writing', order: 2 };

export default definePage(BlogIndexPage, {
  head: {
    title: 'Writing — Zheng Zhi Field Notes',
    description:
      'A running archive of implementation notes, design decisions, and framework observations.',
  },
  props: () => {
    const chips = ['LessJS', 'DSD', 'Web Components', 'Standards', 'Build'].map((label) => ({
      key: label,
      label,
    }));

    const rows = (posts as BlogPost[])
      .filter((post) => post.frontmatter)
      .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date))
      .map((post) => {
        const tags = post.frontmatter.tags ?? [];
        // The compiled page's row template carries three chip slots (a nested
        // list Region is outside the item-template grammar); refuse to project
        // rather than silently drop a tag the archive grows.
        if (tags.length > 3) {
          throw new Error(
            `[blog-index] post "${post.slug}" has ${tags.length} tags; the row template carries 3 ` +
              'chip slots. Widen BlogIndexRow/page-blog-index.tsx before adding a 4th tag.',
          );
        }
        return {
          slug: post.slug,
          href: `/blog/${post.slug}`,
          date: formatDate(post.frontmatter.date),
          title: post.frontmatter.title,
          excerpt: post.frontmatter.excerpt ?? '',
          tag0: tags[0] ?? '',
          tag1: tags[1] ?? '',
          tag2: tags[2] ?? '',
          tag0Hidden: tags.length < 1,
          tag1Hidden: tags.length < 2,
          tag2Hidden: tags.length < 3,
        };
      });

    return { chips, rows };
  },
});
