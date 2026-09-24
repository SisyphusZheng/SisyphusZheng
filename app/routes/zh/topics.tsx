import { definePage } from '@openelement/router';
import ZhTopicsPage from '../../components/page-zh-topics.tsx';

export const meta = { section: 'Main', label: '主题', order: 10 };

export default definePage(ZhTopicsPage, {
  head: {
    title: '主题 — Zheng Zhi Field Notes',
    description:
      'Chinese knowledge map linking standards, Web Components and release-gate topics across this site.',
  },
});
