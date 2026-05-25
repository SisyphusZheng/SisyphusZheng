import { DsdElement, StyleSheet } from '@lessjs/core';

export const tagName = 'site-footer';

const styles = new StyleSheet();
styles.replaceSync(`
  :host {
    display: block;
    border-top: 1px solid var(--border, #e8e6dc);
    padding: 2rem 1.5rem;
    text-align: center;
    margin-top: auto;
    transition: border-color 0.3s;
  }

  .footer-inner {
    max-width: 900px;
    margin: 0 auto;
    font-size: 0.85rem;
    color: var(--text-secondary, #555555);
  }

  .footer-inner a {
    color: var(--accent, #d97757);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-inner a:hover {
    color: var(--accent-hover, #c46544);
    text-decoration: underline;
  }

  .separator {
    margin: 0 0.5rem;
    opacity: 0.4;
  }
`);

export default class SiteFooter extends DsdElement {
  static override styles = styles;

  override render() {
    return `
      <div class="footer-inner">
        <span>&copy; 2026 郑治</span>
        <span class="separator">&middot;</span>
        <a href="https://github.com/SisyphusZheng" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span class="separator">&middot;</span>
        <span>Built with <a href="https://github.com/lessjs-run/lessjs" target="_blank" rel="noopener noreferrer">LessJS</a></span>
      </div>
    `;
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, SiteFooter);
}
