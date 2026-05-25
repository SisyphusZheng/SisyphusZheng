import { DsdElement, StyleSheet } from '@lessjs/core';

export const tagName = 'site-header';

// CSS for the site-header component
const SITE_HEADER_CSS = `
  .site-header-wrapper {
    display: block;
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--bg-header, rgba(250, 249, 245, 0.85));
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border, #e8e6dc);
    transition: background-color 0.3s, border-color 0.3s;
  }

  .header-inner {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-family: var(--font-heading, "Playfair Display", Georgia, serif);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary, #1a1a1a);
    text-decoration: none;
    letter-spacing: -0.02em;
    transition: color 0.2s;
  }
  .logo:hover { color: var(--accent, #d97757); }

  .nav { display: flex; align-items: center; gap: 2rem; }

  .nav-links {
    display: flex; gap: 1.75rem; list-style: none; margin: 0; padding: 0;
  }

  .nav-links a {
    color: var(--text-secondary, #555555);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.2s;
    position: relative;
  }

  .nav-links a::after {
    content: ''; position: absolute; bottom: -4px; left: 0;
    width: 0; height: 2px;
    background: var(--accent, #d97757);
    transition: width 0.2s;
  }

  .nav-links a:hover { color: var(--text-primary, #1a1a1a); }
  .nav-links a:hover::after { width: 100%; }

  .nav-right { display: flex; align-items: center; gap: 1rem; }
  .theme-toggle-slot { display: flex; align-items: center; }

  .hamburger, #menuToggle { display: none; }

  .hamburger-label {
    display: none; background: none; border: none;
    cursor: pointer; padding: 0.25rem;
    color: var(--text-primary, #1a1a1a); line-height: 0;
  }

  .hamburger-label svg { width: 24px; height: 24px; }

  .mobile-nav {
    display: none; flex-direction: column;
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--border, #e8e6dc);
    background: var(--bg-header, rgba(250, 249, 245, 0.95));
  }

  .mobile-nav a {
    color: var(--text-secondary, #555555);
    text-decoration: none;
    font-size: 1rem; font-weight: 500;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border, #e8e6dc);
    transition: color 0.2s;
  }

  .mobile-nav a:last-child { border-bottom: none; }
  .mobile-nav a:hover { color: var(--accent, #d97757); }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hamburger-label { display: flex; }
    #menuToggle:checked ~ .mobile-nav { display: flex; }
  }
`;

// Shared HTML generator: produces site-header markup with optional slot content.
function renderSiteHeader(slotContent = ''): string {
  return `<div class="site-header-wrapper">
    <input type="checkbox" id="menuToggle" class="hamburger" aria-label="Toggle navigation" />
    <div class="header-inner">
      <a class="logo" href="/">郑治</a>
      <nav class="nav">
        <ul class="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/about">About</a></li>
        </ul>
        <div class="nav-right">
          <span class="theme-toggle-slot">${slotContent}</span>
          <slot name="header-actions"></slot>
          <label for="menuToggle" class="hamburger-label">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </label>
        </div>
      </nav>
    </div>
    <div class="mobile-nav">
      <a href="/">Home</a>
      <a href="/blog">Blog</a>
      <a href="/about">About</a>
    </div>
  </div>`;
}

const styles = new StyleSheet();
styles.replaceSync(SITE_HEADER_CSS);

export default class SiteHeader extends DsdElement {
  static override styles = styles;

  override render() {
    return renderSiteHeader('<slot name="theme-toggle"></slot>');
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, SiteHeader);
}
