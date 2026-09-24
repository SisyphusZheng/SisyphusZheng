import { openElement } from '@openelement/router/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@site/generated/blog-data': new URL('./app/data/_generated-blog-data.ts', import.meta.url)
        .pathname,
      '@site/generated/projects': new URL('./app/data/_generated-project-data.ts', import.meta.url)
        .pathname,
    },
  },
  esbuild: { jsx: 'automatic', jsxImportSource: '@openelement/element' },
  plugins: [...openElement()],
});
