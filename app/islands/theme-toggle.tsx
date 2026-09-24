import { defineIslandConfig } from '@openelement/router';
import { element, OpenElement, property } from '@openelement/element';
import { themeToggleStyles } from '../components/theme-toggle-styles.ts';

// Compiled island replacing the retired vanilla `HTMLElement` version: the
// button now belongs to this island's render instead of being shell-authored
// light DOM, so the island also owns the button styles. `label` is the one
// addition to the retired surface (the shell passes its localized
// 'Toggle theme' / '切换主题' copy, which the island cannot derive because it
// has no route context); everything else is the old button markup.
export const openElement = defineIslandConfig({ hydrate: 'load', ssr: true, dsd: true });

@element('theme-toggle', { root: 'shadow-open' })
export default class ThemeToggle extends OpenElement {
  static override styles = themeToggleStyles;

  /** Accessible name for the button; the shell supplies the localized copy. */
  @property({ reflect: false })
  label = 'Toggle theme';

  /**
   * The theme this island last applied. Not rendered and not attribute-backed:
   * `document.documentElement` stays the single source of truth, exactly as in
   * the retired implementation.
   */
  @property({ reflect: false, attribute: false })
  theme = '';

  toggle() {
    const html = document.documentElement;
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = next;
    localStorage.setItem('field-notes-theme', next);
    this.theme = next;
  }

  render() {
    return (
      <button type='button' aria-label={this.label} title={this.label} onClick={this.toggle}>
        <svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path
            d='M21 12.6A8.6 8.6 0 0 1 11.4 3a7.5 7.5 0 1 0 9.6 9.6Z'
            stroke='currentColor'
            stroke-width='1.8'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      </button>
    );
  }
}
