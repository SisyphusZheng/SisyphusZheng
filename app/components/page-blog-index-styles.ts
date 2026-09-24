import { StyleSheet, type StyleSheetLike } from '@openelement/element';

const sheet = new StyleSheet();
sheet.replaceSync(`
  :host { display: block; }

  .wrap {
    width: min(1120px, calc(100% - 36px));
    margin: 0 auto;
    padding: 72px 0 0;
  }

  .hero {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 48px;
    align-items: end;
    padding-bottom: 52px;
    border-bottom: 1px solid var(--line-strong);
  }

  .kicker,
  .filter-title {
    color: var(--teal);
    font-family: var(--font-mono);
    font-size: 0.76rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  h1 {
    max-width: 760px;
    margin: 12px 0 0;
    font-family: var(--font-serif);
    font-size: clamp(3.4rem, 8vw, 7.2rem);
    line-height: 0.88;
    letter-spacing: 0;
  }

  .intro {
    margin: 22px 0 0;
    max-width: 640px;
    color: var(--muted);
    font-size: 1.1rem;
    line-height: 1.7;
  }

  .filters {
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 18px;
    background: var(--panel);
  }

  .filter-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
  }

  .chip {
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 6px 10px;
    color: var(--rust);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 800;
  }

  .list {
    display: grid;
    border-top: 1px solid var(--line);
  }

  .item {
    display: grid;
    grid-template-columns: 132px 1fr;
    gap: 28px;
    border-bottom: 1px solid var(--line);
    padding: 28px 0;
    color: inherit;
    text-decoration: none;
  }

  time {
    color: var(--faint);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 800;
    white-space: nowrap;
  }

  h2 {
    margin: 0 0 10px;
    font-size: clamp(1.55rem, 3vw, 2.35rem);
    line-height: 1.08;
    letter-spacing: 0;
  }

  p {
    max-width: 680px;
    margin: 0;
    color: var(--muted);
    line-height: 1.65;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 15px;
  }

  .tag {
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 4px 8px;
    color: var(--teal);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 800;
  }

  @media (max-width: 820px) {
    .hero,
    .item {
      grid-template-columns: 1fr;
    }
  }
`);

export const blogIndexPageStyles: StyleSheetLike = sheet;
