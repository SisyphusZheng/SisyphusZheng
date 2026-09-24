import { defineConfig } from '@openelement/router';

export default defineConfig({
  head: {
    title: 'Zheng Zhi Field Notes',
    description: 'Personal field notes of Zheng Zhi — writing, projects and topics.',
    scripts: [{ src: '/theme-init.js' }],
  },
  viewTransition: true,
  speculation: true,
});
