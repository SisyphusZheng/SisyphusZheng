import { lessjs } from '@lessjs/app';
import { defineConfig } from 'vite';

const googleFontsLink =
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">';

const colorTokensStyle =
  '<style>' +
  /* Light mode variables (default) */
  ':root {' +
  '--bg:#faf9f5;' +
  '--bg-card:#ffffff;' +
  '--bg-header:rgba(250,249,245,0.85);' +
  '--bg-hover:rgba(0,0,0,0.04);' +
  '--bg-code:#f5f3ee;' +
  '--text-primary:#1a1a1a;' +
  '--text-secondary:#555555;' +
  '--text-muted:#9a9890;' +
  '--border:#e8e6dc;' +
  '--accent:#d97757;' +
  '--accent-hover:#c46544;' +
  '--auxiliary:#6a9bcc;' +
  '--font-heading:"Playfair Display",Georgia,serif;' +
  '--font-body:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;' +
  '--font-mono:"JetBrains Mono","Fira Code",monospace;' +
  '--radius-sm:6px;' +
  '--radius-md:8px;' +
  '--radius-lg:12px;' +
  '}' +

  /* Dark mode variables */
  '[data-theme="dark"] {' +
  '--bg:#141413;' +
  '--bg-card:#1e1e1d;' +
  '--bg-header:rgba(20,20,19,0.85);' +
  '--bg-hover:rgba(255,255,255,0.06);' +
  '--bg-code:#252524;' +
  '--text-primary:#e8e6dc;' +
  '--text-secondary:#9a9890;' +
  '--text-muted:#6a6860;' +
  '--border:#2e2d2c;' +
  '--accent:#e8926d;' +
  '--accent-hover:#d97757;' +
  '--auxiliary:#8ab8e0;' +
  '}' +

  /* Global resets and base styles */
  'body{margin:0;background:var(--bg);color:var(--text-primary);font-family:var(--font-body);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;transition:background-color 0.3s,color 0.3s}' +
  'a{color:inherit}' +
  '*{box-sizing:border-box}' +
  '</style>';

export default defineConfig({
  plugins: [lessjs({
    island: {
      upgradeStrategy: 'load',
    },
    html: { title: 'Zheng Zhi - Frontend Developer' },
    packageIslands: ['@lessjs/ui'],
    ssr: {
      noExternal: ['@lessjs/ui'],
    },
    inject: {
      headFragments: [googleFontsLink, colorTokensStyle],
    },
    content: {
      blog: {
        contentDir: 'content/blog',
        basePath: '/blog',
      },
      nav: {
        routesDir: 'app/routes',
        headerNav: [
          { href: '/', label: 'Home' },
          { href: '/blog', label: 'Blog' },
          { href: '/about', label: 'About' },
        ],
      },
    },
    i18n: {
      locales: ['en', 'zh'],
      defaultLocale: 'zh',
    },
  })],
});
