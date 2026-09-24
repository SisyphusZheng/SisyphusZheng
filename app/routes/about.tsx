import { definePage } from '@openelement/router';
import AboutPage from '../components/page-about.tsx';

export const meta = { section: 'Main', label: 'About', order: 5 };

export default definePage(AboutPage, {
  head: {
    title: 'About — Zheng Zhi Field Notes',
    description:
      'Technical writing, standards, and small frameworks built for real use: the focus and principles behind Zheng Zhi Field Notes.',
  },
});
