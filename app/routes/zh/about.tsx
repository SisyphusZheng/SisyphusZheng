import { definePage } from '@openelement/router';
import ZhAboutPage from '../../components/page-zh-about.tsx';

export const meta = { section: 'Main', label: '关于', order: 11 };

export default definePage(ZhAboutPage, {
  head: {
    title: '关于 — Zheng Zhi Field Notes',
    description:
      'Chinese edition of the about page: DSD-first rendering, Web Components and static content systems, with the current focus areas of this site.',
  },
});
