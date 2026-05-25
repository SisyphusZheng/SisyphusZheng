import { DsdElement, html, signal } from '@lessjs/core';
import { StyleSheet } from '@lessjs/core';

export const tagName = 'theme-toggle';

const styles = new StyleSheet();
styles.replaceSync(`
  :host {
    display: inline-flex;
    align-items: center;
  }

  button {
    background: none;
    border: 1px solid var(--border, #e8e6dc);
    border-radius: 8px;
    cursor: pointer;
    padding: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary, #555555);
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    line-height: 0;
  }

  button:hover {
    background: var(--bg-hover, rgba(0,0,0,0.05));
    color: var(--text-primary, #1a1a1a);
  }

  button:focus-visible {
    outline: 2px solid var(--accent, #d97757);
    outline-offset: 2px;
  }

  .icon {
    width: 20px;
    height: 20px;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .icon.rotating {
    transform: rotate(360deg);
  }

  .sun-icon, .moon-icon {
    display: none;
  }

  :host([data-theme="dark"]) .sun-icon {
    display: block;
  }

  :host([data-theme="dark"]) .moon-icon {
    display: none;
  }

  :host(:not([data-theme="dark"])) .moon-icon {
    display: block;
  }

  :host(:not([data-theme="dark"])) .sun-icon {
    display: none;
  }
`);

export default class ThemeToggle extends DsdElement {
  static override styles = styles;

  isDark = signal(false);

  override connectedCallback() {
    super.connectedCallback?.();
    this.initTheme();
  }

  private initTheme() {
    const stored = typeof localStorage !== 'undefined'
      ? localStorage.getItem('theme')
      : null;
    const prefersDark = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;

    const dark = stored === 'dark' || (!stored && prefersDark);
    this.isDark.value = dark;
    this.applyTheme(dark);
  }

  private applyTheme(dark: boolean) {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    }
    if (dark) {
      this.setAttribute('data-theme', 'dark');
    } else {
      this.removeAttribute('data-theme');
    }
  }

  private toggleTheme() {
    const newDark = !this.isDark.value;
    this.isDark.value = newDark;
    this.applyTheme(newDark);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', newDark ? 'dark' : 'light');
    }
  }

  override render() {
    return html`
      <button
        @click=${() => this.toggleTheme()}
        aria-label="Toggle theme"
        title="Toggle dark mode"
      >
        <svg class="icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <svg class="icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
    `;
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, ThemeToggle);
}
