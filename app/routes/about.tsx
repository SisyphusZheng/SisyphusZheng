import { DsdElement } from '@lessjs/core';
import { StyleSheet } from '@lessjs/style-sheet';
import '../components/site-shell.tsx';

export const tagName = 'about-page';
export const meta = { section: 'Main', label: 'About', order: 5 };

const styles = new StyleSheet();
styles.replaceSync(`
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

export default class AboutPage extends DsdElement {
  static override styles = styles;

  override render() {
    return (
      <site-shell surface='paper'>
        <section class='wrap'>
          <div>
            <p class='kicker'>About</p>
            <h1>Zheng Zhi</h1>
            <p class='lead'>
              Technical writing, standards, and small frameworks built for real use. This site is a
              place to connect architecture notes with working projects and release evidence.
            </p>
            <div class='section'>
              <h2>Current Focus</h2>
              <p>
                DSD-first rendering, Web Components ergonomics, static content systems, and the
                LessJS architecture needed to make standards-aligned sites feel dependable.
              </p>
            </div>
            <div class='section'>
              <h2>Principles</h2>
              <ul>
                <li>Prefer platform-aligned abstractions over framework spectacle.</li>
                <li>Keep writing tied to commands, artifacts, and verifiable outcomes.</li>
                <li>Use design to clarify technical structure, not hide it.</li>
              </ul>
            </div>
          </div>
          <aside>
            <h2>Contact</h2>
            <span>Writing / Projects / Standards</span>
            <a href='/blog'>Writing archive</a>
            <a href='/projects'>Project Lab</a>
            <a href='/topics'>Knowledge Map</a>
          </aside>
        </section>
      </site-shell>
    );
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, AboutPage);
}
