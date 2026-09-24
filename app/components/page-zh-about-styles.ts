import { StyleSheet, type StyleSheetLike } from '@openelement/element';

const sheet = new StyleSheet();
sheet.replaceSync(`
  :host { display: block; }
  .wrap {
    width: min(1120px, calc(100% - 36px));
    margin: 0 auto;
    padding: 72px 0 0;
  }
  .kicker {
    color: var(--teal);
    font-family: var(--font-mono);
    font-size: 0.76rem;
    font-weight: 800;
    text-transform: uppercase;
  }
  h1 {
    margin: 12px 0 24px;
    font-family: var(--font-serif);
    font-size: clamp(4rem, 8vw, 7.4rem);
    line-height: 0.9;
  }
  p, li {
    max-width: 780px;
    color: var(--muted);
    font-size: 1.08rem;
    line-height: 1.8;
  }
  .section {
    border-top: 1px solid var(--line-strong);
    margin-top: 42px;
    padding-top: 22px;
  }
`);

export const zhAboutPageStyles: StyleSheetLike = sheet;
