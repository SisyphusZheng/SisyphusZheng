import { StyleSheet, type StyleSheetLike } from '@openelement/element';

const sheet = new StyleSheet();
sheet.replaceSync(`
  :host { display: block; }
  .wrap {
    width: min(960px, calc(100% - 36px));
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
    margin: 12px 0 28px;
    font-family: var(--font-serif);
    font-size: clamp(3.4rem, 8vw, 7.2rem);
    line-height: 0.9;
  }
`);

export const zhSearchPageStyles: StyleSheetLike = sheet;
