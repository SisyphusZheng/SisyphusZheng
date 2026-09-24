import { StyleSheet, type StyleSheetLike } from '@openelement/element';

const sheet = new StyleSheet();
sheet.replaceSync(`
  :host {
    display: block;
  }

  .hero {
    min-height: 100dvh;
    position: relative;
    display: grid;
    align-items: end;
    overflow: hidden;
    color: white;
    background:
      linear-gradient(90deg, rgba(7, 7, 7, 0.9) 0%, rgba(7, 7, 7, 0.68) 32%, rgba(7, 7, 7, 0.26) 68%, rgba(7, 7, 7, 0.68) 100%),
      linear-gradient(180deg, rgba(7, 7, 7, 0.2), rgba(7, 7, 7, 0.74)),
      url('/assets/hero-oil-still-life.png') center / cover no-repeat;
  }

  .hero::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 150px;
    background: linear-gradient(180deg, transparent, var(--paper));
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    width: min(1180px, calc(100% - 36px));
    margin: 0 auto;
    padding: 28vh 0 86px;
  }

  .kicker {
    margin: 0 0 20px;
    color: var(--brass);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  h1 {
    max-width: 860px;
    margin: 0;
    font-family: var(--font-serif);
    font-size: clamp(4rem, 10.8vw, 9.7rem);
    line-height: 0.84;
    letter-spacing: 0;
  }

  .lede {
    max-width: 650px;
    margin: 28px 0 0;
    color: rgba(255, 250, 240, 0.78);
    font-size: clamp(1.05rem, 1.8vw, 1.24rem);
    line-height: 1.7;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 34px;
  }

  .button {
    min-height: 46px;
    display: inline-flex;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.24);
    border-radius: 999px;
    padding: 0 18px;
    color: white;
    background: rgba(255, 255, 255, 0.12);
    text-decoration: none;
    font-weight: 800;
    backdrop-filter: blur(12px);
  }

  .button.primary {
    border-color: transparent;
    background: var(--rust);
  }

  .scroll {
    position: absolute;
    z-index: 2;
    right: clamp(18px, 4vw, 56px);
    bottom: 38px;
    display: grid;
    gap: 10px;
    justify-items: center;
    color: rgba(255, 250, 240, 0.7);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    text-transform: uppercase;
  }

  .scroll span {
    width: 1px;
    height: 58px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.1), var(--brass));
  }

  .section {
    width: min(1120px, calc(100% - 36px));
    margin: 0 auto;
    padding: 72px 0 0;
  }

  .intro {
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 48px;
    align-items: end;
  }

  .eyebrow {
    margin: 0 0 12px;
    color: var(--teal);
    font-family: var(--font-mono);
    font-size: 0.76rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  h2 {
    margin: 0;
    font-family: var(--font-serif);
    font-size: clamp(2.3rem, 5vw, 4.8rem);
    line-height: 0.96;
    letter-spacing: 0;
  }

  .intro p {
    margin: 0;
    color: var(--muted);
    font-size: 1.1rem;
    line-height: 1.72;
  }

  .split {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 390px;
    gap: 42px;
    align-items: start;
  }

  .section-head {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 24px;
  }

  .section-head h2 {
    font-size: clamp(2rem, 4vw, 3.5rem);
  }

  .section-head a {
    color: var(--rust);
    font-weight: 800;
    text-decoration-thickness: 1px;
    text-underline-offset: 5px;
  }

  .writing {
    display: grid;
    gap: 0;
    border-top: 1px solid var(--line-strong);
  }

  .post {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 28px;
    padding: 24px 0;
    border-bottom: 1px solid var(--line);
    color: inherit;
    text-decoration: none;
  }

  time,
  .meta {
    color: var(--faint);
    font-family: var(--font-mono);
    font-size: 0.76rem;
    font-weight: 700;
  }

  .post h3,
  .project h3 {
    margin: 0 0 10px;
    font-size: clamp(1.35rem, 2.4vw, 2rem);
    line-height: 1.08;
    letter-spacing: 0;
  }

  .post p,
  .project p {
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

  .lab {
    position: sticky;
    top: 118px;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 22px;
    background: var(--panel);
    box-shadow: var(--shadow);
  }

  .lab h2 {
    font-size: 2.2rem;
  }

  .project {
    display: block;
    border-top: 1px solid var(--line);
    padding: 18px 0;
    color: inherit;
    text-decoration: none;
  }

  .project:first-of-type {
    margin-top: 18px;
  }

  .status {
    display: inline-flex;
    margin-bottom: 10px;
    border-radius: 999px;
    padding: 4px 8px;
    color: var(--signal);
    background: color-mix(in srgb, var(--signal), transparent 88%);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 800;
  }

  .topics {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;
  }

  .topic {
    min-height: 130px;
    display: flex;
    align-items: end;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 16px;
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--paper-strong), transparent 24%), transparent),
      var(--panel);
    color: inherit;
    text-decoration: none;
    font-family: var(--font-mono);
    font-weight: 800;
  }

  @media (max-width: 900px) {
    .hero-inner {
      padding-top: 18vh;
    }

    .intro,
    .split {
      grid-template-columns: 1fr;
    }

    .lab {
      position: static;
    }

    .topics {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 560px) {
    .hero {
      min-height: calc(100dvh - 112px);
      background-position: center;
    }

    h1 {
      font-size: clamp(3.4rem, 17vw, 5rem);
    }

    .post {
      grid-template-columns: 1fr;
      gap: 10px;
    }

    .scroll {
      display: none;
    }
  }
`);

export const indexPageStyles: StyleSheetLike = sheet;
