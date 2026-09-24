import { element, OpenElement } from '@openelement/element';
import { aboutPageStyles } from './page-about-styles.ts';

@element('about-page', { root: 'shadow-open' })
export default class AboutPage extends OpenElement {
  static override styles = aboutPageStyles;

  render() {
    return (
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
              DSD-first rendering, Web Components ergonomics, static content systems, and the LessJS
              architecture needed to make standards-aligned sites feel dependable.
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
    );
  }
}
