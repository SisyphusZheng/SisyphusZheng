import { StyleSheet, type StyleSheetLike } from '@openelement/element';

const sheet = new StyleSheet();
sheet.replaceSync(`
  :host { display: block; }

  .wrap {
    width: min(1120px, calc(100% - 36px));
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 60px;
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
    font-size: clamp(3.8rem, 8vw, 7.4rem);
    line-height: 0.88;
  }

  .lead {
    max-width: 720px;
    color: var(--muted);
    font-size: 1.2rem;
    line-height: 1.7;
  }

  .section {
    border-top: 1px solid var(--line-strong);
    margin-top: 46px;
    padding-top: 22px;
  }

  h2 {
    margin: 0 0 14px;
    font-size: 1.35rem;
  }

  p,
  li {
    color: var(--muted);
    line-height: 1.7;
  }

  aside {
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 22px;
    background: var(--panel);
    box-shadow: var(--shadow);
  }

  aside h2 {
    font-family: var(--font-mono);
    font-size: 0.82rem;
    text-transform: uppercase;
  }

  aside a,
  aside span {
    display: block;
    border-top: 1px solid var(--line);
    padding: 12px 0;
    color: var(--muted);
    text-decoration: none;
  }

  @media (max-width: 850px) {
    .wrap {
      grid-template-columns: 1fr;
    }
  }
`);

export const aboutPageStyles: StyleSheetLike = sheet;
