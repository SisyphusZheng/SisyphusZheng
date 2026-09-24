import { StyleSheet, type StyleSheetLike } from '@openelement/element';

// The interactive-search widget rules that used to live in the search pages'
// own stylesheets (`page-search-styles.ts` / `page-zh-search-styles.ts`).
// They moved here because the widget — input, results container and rows — is
// now rendered inside this island's shadow root, where page stylesheets cannot
// reach. The two page stylesheets agreed on all of these except two details;
// the English page's fuller set is kept (`.result small` keeps its
// `font-size: 0.95rem` and `input:focus` exists for both languages now).
const sheet = new StyleSheet();
sheet.replaceSync(`
  :host {
    display: block;
  }

  input {
    width: 100%;
    height: 58px;
    border: 1px solid var(--line-strong);
    border-radius: 8px;
    padding: 0 18px;
    background: var(--panel);
    color: var(--ink);
    font: 700 1rem var(--font-sans);
    outline: none;
  }

  input:focus {
    border-color: var(--rust);
  }

  .results {
    display: grid;
    gap: 12px;
    margin-top: 28px;
  }

  .result {
    display: grid;
    gap: 8px;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 18px;
    background: var(--panel);
    color: inherit;
    text-decoration: none;
  }

  .result span {
    color: var(--teal);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .result strong {
    font-size: 1.35rem;
  }

  .result small {
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.6;
  }
`);

export const siteSearchStyles: StyleSheetLike = sheet;
