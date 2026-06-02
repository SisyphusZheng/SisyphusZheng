import deno from '@deno/vite-plugin';
import { lessjs } from '@lessjs/app';
import { openPropsTokenSheet } from '@lessjs/ui/open-props-tokens';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const appLayoutPath = fileURLToPath(new URL('./app/components/less-layout.tsx', import.meta.url));
const projectDataPath = fileURLToPath(
  new URL('./app/data/_generated-project-data.ts', import.meta.url),
);

const tokenCss = [...openPropsTokenSheet.cssRules]
  .map((rule) => rule.cssText)
  .join('\n')
  .replace(/:host\s*\{/g, ':root, :host {')
  .replace(
    /:host\(\[data-theme="dark"\]\)\s*\{/g,
    'html[data-theme="dark"], :host([data-theme="dark"]) {',
  );

const globalCss = `
:root {
  color-scheme: light;
  --paper: #f3eadc;
  --paper-strong: #fffaf0;
  --ink: #161616;
  --muted: #625a51;
  --faint: #918679;
  --panel: rgba(255, 250, 240, 0.86);
  --line: rgba(22, 22, 22, 0.14);
  --line-strong: rgba(22, 22, 22, 0.28);
  --charcoal: #111111;
  --teal: #2f6f6b;
  --rust: #b95d3e;
  --brass: #c09643;
  --signal: #65a66f;
  --cyan: #4aa3b8;
  --shadow: 0 24px 90px rgba(20, 16, 12, 0.18);
  --font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-serif: "Source Serif 4", Georgia, "Times New Roman", serif;
  --font-mono: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
}

html[data-theme="dark"] {
  color-scheme: dark;
  --paper: #10100f;
  --paper-strong: #171614;
  --ink: #f7efe2;
  --muted: #c8bcae;
  --faint: #928779;
  --panel: rgba(24, 23, 21, 0.82);
  --line: rgba(247, 239, 226, 0.14);
  --line-strong: rgba(247, 239, 226, 0.3);
  --charcoal: #080808;
  --teal: #75b8ad;
  --rust: #df8461;
  --brass: #deb765;
  --signal: #9ed19f;
  --cyan: #84d3e4;
  --shadow: 0 24px 90px rgba(0, 0, 0, 0.42);
}

body {
  margin: 0;
  min-width: 320px;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

* { box-sizing: border-box; }
a { color: inherit; }
img { max-width: 100%; display: block; }
::selection {
  background: color-mix(in srgb, var(--brass), transparent 45%);
  color: var(--ink);
}
`;

export default defineConfig({
  base: '/',
  build: {
    chunkSizeWarningLimit: 800,
  },
  resolve: {
    alias: {
      '@lessjs/ui/less-layout': appLayoutPath,
      '@site/generated/projects': projectDataPath,
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: '@lessjs/core',
  },
  plugins: [
    {
      name: 'virtual-passthrough',
      enforce: 'pre',
      resolveId(id) {
        if (id.startsWith('virtual:')) return '\0' + id;
        return null;
      },
    },
    deno(),
    lessjs({
      routesDir: 'app/routes',
      islandsDir: 'app/islands',
      componentsDir: 'app/components',
      island: { upgradeStrategy: 'load' },
      html: {
        title: 'Zheng Zhi Field Notes',
      },
      pwa: {
        name: 'Zheng Zhi Field Notes',
        shortName: 'Field Notes',
        themeColor: '#111111',
        backgroundColor: '#f3eadc',
      },
      viewTransition: true,
      speculation: true,
      inject: {
        scripts: [{ src: '/theme-init.js' }],
        headFragments: [
          '<meta name="description" content="A personal technical magazine and project lab for Web Standards, DSD, LessJS, and small frameworks built for real use.">',
          '<meta property="og:site_name" content="Zheng Zhi Field Notes">',
          '<meta property="og:type" content="website">',
          '<meta property="og:title" content="Zheng Zhi Field Notes">',
          '<meta property="og:description" content="Editorial technical writing and project dossiers around LessJS, DSD, and Web Standards.">',
          '<meta property="og:image" content="/assets/hero-oil-still-life.png">',
          '<link rel="preconnect" href="https://fonts.googleapis.com">',
          '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
          '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&family=Source+Serif+4:wght@500;600;700;800&display=swap" rel="stylesheet">',
          `<style>${tokenCss}${globalCss}</style>`,
        ],
      },
      content: {
        blog: {
          contentDir: 'content/blog',
          basePath: '/blog',
        },
        nav: {
          routesDir: 'app/routes',
          headerNav: [
            { href: '/blog', label: 'Writing' },
            { href: '/projects', label: 'Projects' },
            { href: '/topics', label: 'Topics' },
            { href: '/about', label: 'About' },
          ],
        },
        sitemap: {
          hostname: 'https://example.com',
        },
      },
    }),
  ],
});
