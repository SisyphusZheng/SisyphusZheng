export const tagName = 'theme-toggle';

export default class ThemeToggle extends HTMLElement {
  override connectedCallback() {
    this.addEventListener('click', this.toggle);
  }

  override disconnectedCallback() {
    this.removeEventListener('click', this.toggle);
  }

  private toggle = () => {
    const html = document.documentElement;
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = next;
    localStorage.setItem('field-notes-theme', next);
  };
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, ThemeToggle);
}
