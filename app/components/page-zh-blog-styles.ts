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
    margin: 12px 0 42px;
    font-family: var(--font-serif);
    font-size: clamp(3.6rem, 8vw, 7.2rem);
    line-height: 0.9;
  }
  .item {
    display: grid;
    grid-template-columns: 132px 1fr;
    gap: 28px;
    border-top: 1px solid var(--line);
    padding: 28px 0;
    color: inherit;
    text-decoration: none;
  }
  time {
    color: var(--faint);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 800;
  }
  h2 {
    margin: 0 0 10px;
    font-size: clamp(1.55rem, 3vw, 2.35rem);
  }
  p {
    max-width: 680px;
    margin: 0;
    color: var(--muted);
    line-height: 1.65;
  }
  @media (max-width: 820px) {
    .item { grid-template-columns: 1fr; }
  }
`);

export const zhBlogPageStyles: StyleSheetLike = sheet;
