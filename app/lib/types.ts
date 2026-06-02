export type BlogPost = {
  slug: string;
  html: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt?: string;
    tags?: string[];
    relatedProjects?: string[];
  };
};

export type Project = {
  slug: string;
  html: string;
  frontmatter: {
    title: string;
    status: string;
    thesis: string;
    summary: string;
    order?: number;
    featured?: boolean;
    tags?: string[];
    stack?: string[];
    links?: Record<string, string>;
    relatedPosts?: string[];
    timeline?: string[];
  };
};
