import { definePage } from '@openelement/router';
import ZhHomePage from '../../components/page-zh-index.tsx';

export const meta = { section: 'Main', label: '中文', order: 7 };

export default definePage(ZhHomePage, {
  head: {
    title: '郑智技术札记 — Zheng Zhi Field Notes',
    description:
      'Chinese edition of Zheng Zhi Field Notes: technical writing, project dossiers, standards research and release logs in one place.',
  },
});
