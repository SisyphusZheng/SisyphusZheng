/**
 * less-search — Imperative overlay on document.body (www pattern).
 * Shadow DOM only renders the trigger button. Overlay created imperatively
 * to avoid Shadow DOM position:fixed containment and signal patching issues.
 */
import { DsdElement, html, StyleSheet } from '@lessjs/core';

export const tagName = 'less-search';

const POSTS = [
  { slug: 'web-components-future', title: 'Web Components 的未来', date: '2026-05-25' },
  { slug: 'design-system', title: '构建你的设计系统', date: '2026-05-25' },
  { slug: 'getting-started', title: 'LessJS 快速上手', date: '2026-05-24' },
  { slug: 'hello-world', title: '欢迎来到我的博客', date: '2026-05-24' },
];

const sheet = new StyleSheet();
sheet.replaceSync(`
  :host { display: inline-flex; align-items: center; }
  .search-trigger {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.3rem 0.6rem;
    border: 1px solid var(--border, #e8e6dc); border-radius: 6px;
    background: transparent; color: var(--text-muted, #9a9890);
    font-size: 0.75rem; font-weight: 500; letter-spacing: 0.02em;
    cursor: pointer; transition: color 0.15s, border-color 0.15s;
  }
  .search-trigger:hover { color: var(--text-secondary, #555555); border-color: var(--accent, #d97757); }
  .search-trigger kbd {
    font-family: var(--font-mono, "JetBrains Mono", monospace);
    padding: 0.06rem 0.3rem; border: 1px solid var(--border, #e8e6dc);
    border-radius: 3px; font-size: 0.6rem; margin-left: 0.25rem;
  }
  .search-icon { width: 14px; height: 14px; }
  @media (max-width: 768px) {
    .search-trigger span, .search-trigger kbd { display: none; }
    .search-trigger { padding: 0.3rem; }
  }
`);

let _overlaySheet: CSSStyleSheet | null = null;
function getOverlaySheet(): CSSStyleSheet {
  if (!_overlaySheet) {
    _overlaySheet = new CSSStyleSheet();
    _overlaySheet.replaceSync(`
      .less-search-overlay {
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(0,0,0,0.3); display: flex;
        align-items: flex-start; justify-content: center;
        padding-top: 15vh; backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
      }
      .less-search-panel {
        background: var(--bg-card, #ffffff);
        border: 1px solid var(--border, #e8e6dc);
        border-radius: 12px; width: 90%; max-width: 480px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.15); overflow: hidden;
      }
      .less-search-input {
        width: 100%; padding: 1rem 1.25rem;
        border: none; border-bottom: 1px solid var(--border, #e8e6dc);
        font-size: 1rem; font-family: inherit;
        color: var(--text-primary, #1a1a1a);
        background: transparent; outline: none; box-sizing: border-box;
      }
      .less-search-input::placeholder { color: var(--text-muted, #9a9890); }
      .less-search-results { max-height: 360px; overflow-y: auto; padding: 0.5rem; }
      .less-search-item {
        display: block; padding: 0.75rem; text-decoration: none; color: inherit;
        border-radius: 6px; transition: background 0.15s;
      }
      .less-search-item:hover { background: var(--bg-hover, rgba(0,0,0,0.04)); }
      .less-search-title { font-size: 0.9rem; font-weight: 600; color: var(--text-primary, #1a1a1a); }
      .less-search-date { font-size: 0.75rem; color: var(--text-muted, #9a9890); margin-top: 0.1rem; }
      .less-search-empty { padding: 2rem; text-align: center; color: var(--text-muted, #9a9890); font-size: 0.85rem; }
    `);
  }
  return _overlaySheet;
}

export default class LessSearch extends DsdElement {
  static override styles = [sheet];

  private _overlayEl: HTMLDivElement | null = null;
  private _inputEl: HTMLInputElement | null = null;
  private _onKeydown_bound: ((e: KeyboardEvent) => void) | null = null;

  override connectedCallback() {
    document.querySelectorAll('.less-search-overlay').forEach(el => el.remove());
    this._overlayEl = null; this._inputEl = null;
    super.connectedCallback();
    const os = getOverlaySheet();
    if (!document.adoptedStyleSheets.includes(os)) {
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, os];
    }
    this._onKeydown_bound = this._onKeydown.bind(this);
    document.addEventListener('keydown', this._onKeydown_bound);
  }

  override disconnectedCallback() {
    if (this._onKeydown_bound) document.removeEventListener('keydown', this._onKeydown_bound);
    this._destroyOverlay();
    super.disconnectedCallback();
  }

  private _onKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      this._overlayEl ? this._destroyOverlay() : this._openOverlay();
    }
    if (e.key === 'Escape' && this._overlayEl) this._destroyOverlay();
  };

  private _openOverlay() {
    this._createOverlay();
    requestAnimationFrame(() => this._inputEl?.focus());
  }

  private _createOverlay() {
    if (this._overlayEl) return;
    const overlay = document.createElement('div');
    overlay.className = 'less-search-overlay';
    overlay.addEventListener('click', (e) => { if (e.target === overlay) this._destroyOverlay(); });

    const panel = document.createElement('div');
    panel.className = 'less-search-panel';

    const input = document.createElement('input');
    input.type = 'text'; input.className = 'less-search-input';
    input.placeholder = '搜索文章...';
    input.addEventListener('input', (e) => this._onInput(e));
    this._inputEl = input;

    const results = document.createElement('div');
    results.className = 'less-search-results';
    results.innerHTML = '<div class="less-search-empty">输入关键词搜索文章</div>';

    panel.appendChild(input); panel.appendChild(results);
    overlay.appendChild(panel); document.body.appendChild(overlay);
    this._overlayEl = overlay;
  }

  private _destroyOverlay() {
    if (this._overlayEl) { this._overlayEl.remove(); this._overlayEl = null; this._inputEl = null; }
  }

  private _onInput(e: Event) {
    const q = (e.target as HTMLInputElement).value.toLowerCase().trim();
    const resultsEl = this._overlayEl?.querySelector('.less-search-results');
    if (!resultsEl) return;
    if (!q) { resultsEl.innerHTML = '<div class="less-search-empty">输入关键词搜索文章</div>'; return; }
    const found = POSTS.filter(p => p.title.toLowerCase().includes(q));
    resultsEl.innerHTML = found.length > 0
      ? found.map(p => `<a class="less-search-item" href="/blog/${p.slug}">
           <div class="less-search-title">${p.title.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</div>
           <div class="less-search-date">${p.date}</div>
         </a>`).join('')
      : '<div class="less-search-empty">没有找到相关文章</div>';
  }

  override render() {
    return html`
      <button class="search-trigger" aria-label="Search" @click=${() => this._openOverlay()}>
        <svg class="search-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/>
        </svg>
        <span>Search</span><kbd>⌘K</kbd>
      </button>`;
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, LessSearch);
}
