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
    max-width: 820px;
    margin: 12px 0 34px;
    font-family: var(--font-serif);
    font-size: clamp(3.6rem, 8vw, 7.2rem);
    line-height: 0.9;
  }
  .map {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;
  }
  .topic {
    min-height: 220px;
    display: flex;
    align-items: end;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 18px;
    background: var(--panel);
    font-weight: 800;
  }
  @media (max-width: 900px) {
    .map { grid-template-columns: 1fr; }
  }
`);

export const zhTopicsPageStyles: StyleSheetLike = sheet;
