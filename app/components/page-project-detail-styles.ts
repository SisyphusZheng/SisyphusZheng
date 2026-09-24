import { StyleSheet, type StyleSheetLike } from '@openelement/element';

const sheet = new StyleSheet();
sheet.replaceSync(`
  :host { display: block; }

  .wrap {
    width: min(1120px, calc(100% - 36px));
    margin: 0 auto;
    padding: 64px 0 0;
  }

  .back {
    color: var(--rust);
    font-weight: 800;
    text-decoration-thickness: 1px;
    text-underline-offset: 5px;
  }

  .hero {
    display: grid;
    grid-template-columns: 1fr 310px;
    gap: 54px;
    align-items: end;
    padding: 36px 0 48px;
    border-bottom: 1px solid var(--line-strong);
  }

  .status {
    width: max-content;
    border-radius: 999px;
    padding: 5px 10px;
    color: var(--signal);
    background: color-mix(in srgb, var(--signal), transparent 88%);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 800;
  }

  h1 {
    margin: 16px 0 16px;
    font-family: var(--font-serif);
    font-size: clamp(4rem, 9vw, 8rem);
    line-height: 0.86;
    letter-spacing: 0;
  }

  .thesis {
    max-width: 680px;
    margin: 0;
    color: var(--muted);
    font-size: 1.2rem;
    line-height: 1.65;
  }

  .facts {
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 20px;
    background: var(--panel);
    color: var(--muted);
  }

  .facts h2 {
    margin: 0 0 14px;
    color: var(--ink);
    font-family: var(--font-mono);
    font-size: 0.82rem;
    text-transform: uppercase;
  }

  .facts p {
    margin: 10px 0;
    font-family: var(--font-mono);
    font-size: 0.78rem;
  }

  .body {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 54px;
    padding-top: 42px;
  }

  .content {
    color: var(--muted);
    font-family: var(--font-serif);
    font-size: 1.14rem;
    line-height: 1.8;
  }

  .content h2,
  .side h2 {
    color: var(--ink);
    font-family: var(--font-sans);
    letter-spacing: 0;
  }

  .content h2 {
    margin: 2.2em 0 0.7em;
    font-size: 1.6rem;
  }

  .content p {
    margin: 0 0 1.1em;
  }

  .side {
    position: sticky;
    top: 120px;
    align-self: start;
    display: grid;
    gap: 22px;
  }

  .box {
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 18px;
    background: var(--panel);
  }

  .box h2 {
    margin: 0 0 12px;
    font-size: 1.1rem;
  }

  .box a,
  .box span {
    display: block;
    margin: 9px 0;
    color: var(--muted);
    text-decoration: none;
  }

  .box a:hover {
    color: var(--rust);
  }

  @media (max-width: 900px) {
    .hero,
    .body {
      grid-template-columns: 1fr;
    }

    .side {
      position: static;
    }
  }
`);

export const projectDetailPageStyles: StyleSheetLike = sheet;
