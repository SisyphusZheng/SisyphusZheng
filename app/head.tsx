import legacyCss from './styles/legacy-head.css?raw';

// Structural document head (app/head.tsx convention): the frozen legacy
// stylesheet first, then the one head entry no other channel owns, then the
// Google Fonts links.
//
// Site-level metadata is owned by `openelement.config.ts` as the single source:
// the framework's headFragmentsFor() already emits `og:title`, `og:site_name`,
// `og:description` and `og:type` from `head.title` / `head.description`, and
// every route's own `head.description` supplies `<meta name="description">`.
// Hand-writing those here produced two conflicting sets in the output.
// `og:image` is kept because that generator emits it (plus `twitter:card`)
// only when `head.ogImage` is configured, which it currently is not.
export default [
  { style: legacyCss },
  { meta: { property: 'og:image', content: '/assets/hero-oil-still-life.png' } },
  { link: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
  { link: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' } },
  {
    link: {
      rel: 'stylesheet',
      href:
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&family=Source+Serif+4:wght@500;600;700;800&display=swap',
    },
  },
];
