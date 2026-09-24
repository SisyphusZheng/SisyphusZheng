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
    grid-template-columns: 1fr 300px;
    gap: 48px;
    align-items: end;
    padding-bottom: 48px;
    border-bottom: 1px solid var(--line-strong);
  }

  .kicker {
    margin: 0 0 12px;
    color: var(--teal);
    font-family: var(--font-mono);
    font-size: 0.76rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-family: var(--font-serif);
    font-size: clamp(3.8rem, 9vw, 8rem);
    line-height: 0.86;
    letter-spacing: 0;
  }

  .intro {
    margin: 22px 0 0;
    max-width: 660px;
    color: var(--muted);
    font-size: 1.1rem;
    line-height: 1.7;
  }

  .status-rail {
    display: grid;
    gap: 10px;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 18px;
    background: var(--panel);
  }

  .status-rail span {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--line);
    padding-bottom: 10px;
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 800;
  }

  .grid {
    display: grid;
    grid-template-columns: 170px 1fr 310px;
    gap: 34px;
    padding-top: 42px;
  }

  .rail {
    position: sticky;
    top: 120px;
    align-self: start;
    display: grid;
    gap: 10px;
  }

  .rail a {
    border-left: 2px solid var(--line);
    padding: 8px 0 8px 14px;
    color: var(--muted);
    text-decoration: none;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 800;
  }

  .rail a:first-child {
    border-color: var(--signal);
    color: var(--signal);
  }

  .list {
    display: grid;
    border-top: 1px solid var(--line);
  }

  .project {
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 24px;
    border-bottom: 1px solid var(--line);
    padding: 28px 0;
    color: inherit;
    text-decoration: none;
  }

  .status {
    width: max-content;
    height: max-content;
    border-radius: 999px;
    padding: 5px 9px;
    color: var(--signal);
    background: color-mix(in srgb, var(--signal), transparent 88%);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 800;
  }

  h2 {
    margin: 0 0 10px;
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    line-height: 1.06;
    letter-spacing: 0;
  }

  p {
    margin: 0;
    color: var(--muted);
    line-height: 1.65;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
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

  .preview {
    position: sticky;
    top: 120px;
    align-self: start;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 20px;
    background: var(--panel);
    box-shadow: var(--shadow);
  }

  .preview h2 {
    font-size: 1.55rem;
  }

  .facts {
    display: grid;
    gap: 10px;
    margin-top: 20px;
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 0.76rem;
  }

  @media (max-width: 980px) {
    .hero,
    .grid {
      grid-template-columns: 1fr;
    }

    .rail,
    .preview {
      position: static;
    }
  }

  @media (max-width: 620px) {
    .project {
      grid-template-columns: 1fr;
    }
  }
`);

export const projectsIndexPageStyles: StyleSheetLike = sheet;
