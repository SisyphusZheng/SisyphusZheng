import { StyleSheet, type StyleSheetLike } from '@openelement/element';

// Moved from the retired shell component's stylesheet (its StyleSheet text is
// preserved declaration-for-declaration). One deliberate adaptation: the
// convention shell cannot set an attribute on its own host, so the former
// `:host([surface="paper"])` groups that used to style reading pages are keyed
// on the marker the shell renders on the header itself instead
// (`<header data-surface="home|paper">` in app/islands/app-shell.tsx — 'home'
// is the cinematic default over the full-viewport hero, 'paper' the reading
// surface). The base `header` group is kept verbatim ahead of them, exactly as
// the paper override used to sit after it, so the paper declarations still win
// by source order.
//
// One channel had to be added on top of the verbatim text: the theme-toggle
// button now lives in the island's own shadow root (app/islands/theme-toggle.tsx),
// so the retired `theme-toggle button` / `theme-toggle svg` rules were dropped
// instead of carried over — selectors do not cross a shadow boundary, and
// against the built artifact the shell's shadow root matches none of them, so
// they would have been dead CSS. (`theme-toggle { display: inline-flex }` is
// kept: that one targets the host element, which does live in this shadow tree.)
// Only inherited custom properties cross a shadow boundary, so each header group
// also sets `--toggle-fg` / `--toggle-bg` / `--toggle-border` /
// `--toggle-border-hover`, and theme-toggle-styles.ts consumes those with the
// paper values as `var()` fallbacks. The base `header` group carries the
// cinematic home values (the retired base group's translucent dark chip over the
// hero, `rgba(17, 17, 17, 0.34)` background and a `rgba(255, 255, 255, 0.22)`
// hairline, with the label a near-white `rgba(255, 255, 255, 0.92)` rather than
// the retired pure `white` inherited from `--header-color`, and the retired
// hover hairline `rgba(255, 255, 255, 0.46)`). The paper group redefines them to
// `var(--ink)` / `var(--panel)` / `var(--line)` and sets `--toggle-border-hover`
// to that same `var(--line)`, so a reading page keeps the paper button and its
// hairline holds steady on hover — and because both sides read the theme-driven
// `var(--line)` rather than a literal, "hover == idle" holds in the dark theme
// too. The home group's literal `rgba(255, 255, 255, 0.46)` is deliberately left
// alone: that channel is the cinematic chip over the hero, which does not change
// with the theme. The retired paper group
// `:host([surface="paper"]) theme-toggle button` (specificity 0-2-2) outranked
// `theme-toggle button:hover` (0-1-2), and the paper group matches at every
// width, so that held at any viewport size.
//
// The sub-760px `header` group deliberately does *not* declare
// `--toggle-border-hover`, even though it paper-izes the idle tokens. Its
// retired counterpart paper-ized the button the same way (`.mark, .icon-link,
// .lang, theme-toggle button` inside the media query, 0-0-2 for the button) and
// still lost to `theme-toggle button:hover` (0-1-2), so a sub-760px *home*
// header kept the `rgba(255, 255, 255, 0.46)` hover hairline over its
// sticky paper bar. Leaving the token undeclared lets the base group's value
// inherit through and reproduces that; declaring `var(--line)` here would
// silently change the retired behaviour at that one breakpoint.
const sheet = new StyleSheet();
sheet.replaceSync(`
  :host {
    display: block;
    min-height: 100dvh;
    background:
      radial-gradient(circle at 15% 0%, color-mix(in srgb, var(--brass), transparent 86%), transparent 28rem),
      var(--paper);
    color: var(--ink);
  }

  header {
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 22px clamp(18px, 4vw, 56px);
    color: var(--header-color, white);
    --toggle-fg: rgba(255, 255, 255, 0.92);
    --toggle-bg: rgba(17, 17, 17, 0.34);
    --toggle-border: rgba(255, 255, 255, 0.22);
    --toggle-border-hover: rgba(255, 255, 255, 0.46);
    pointer-events: none;
  }

  .brand,
  nav,
  .tools {
    pointer-events: auto;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 11px;
    color: inherit;
    text-decoration: none;
    font-weight: 800;
  }

  .mark,
  .icon-link,
  .lang {
    width: 42px;
    height: 42px;
    display: inline-grid;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 999px;
    color: inherit;
    background: rgba(17, 17, 17, 0.34);
    text-decoration: none;
    backdrop-filter: blur(16px);
  }

  .mark {
    box-shadow: 0 12px 34px rgba(0, 0, 0, 0.18);
  }

  .mark svg {
    width: 27px;
    height: 27px;
  }

  nav {
    display: inline-flex;
    align-items: center;
    gap: clamp(14px, 3vw, 30px);
    padding: 12px 16px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 999px;
    background: rgba(17, 17, 17, 0.24);
    backdrop-filter: blur(18px);
  }

  nav a {
    color: inherit;
    text-decoration: none;
    font-size: 0.88rem;
    font-weight: 760;
    opacity: 0.86;
  }

  nav a:hover,
  .icon-link:hover,
  .lang:hover {
    opacity: 1;
    color: var(--brass);
  }

  .tools {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .lang {
    font-family: var(--font-mono);
    font-size: 0.74rem;
    font-weight: 800;
  }

  theme-toggle {
    display: inline-flex;
  }

  main {
    min-height: calc(100dvh - 112px);
  }

  footer {
    border-top: 1px solid var(--line);
    margin-top: 76px;
  }

  .footer-inner {
    width: min(1120px, calc(100% - 36px));
    min-height: 96px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin: 0 auto;
    color: var(--muted);
    font-size: 0.94rem;
  }

  .footer-inner a {
    color: var(--rust);
    text-underline-offset: 4px;
  }

  header[data-surface="paper"] {
    --header-color: var(--ink);
    --toggle-fg: var(--ink);
    --toggle-bg: var(--panel);
    --toggle-border: var(--line);
    --toggle-border-hover: var(--line);
    position: sticky;
    background: color-mix(in srgb, var(--paper), transparent 12%);
    border-bottom: 1px solid var(--line);
    backdrop-filter: blur(18px);
  }

  header[data-surface="paper"] nav,
  header[data-surface="paper"] .mark,
  header[data-surface="paper"] .icon-link,
  header[data-surface="paper"] .lang {
    border-color: var(--line);
    background: var(--panel);
    color: var(--ink);
  }

  @media (max-width: 760px) {
    header {
      position: sticky;
      color: var(--ink);
      --toggle-fg: var(--ink);
      --toggle-bg: var(--panel);
      --toggle-border: var(--line);
      background: color-mix(in srgb, var(--paper), transparent 8%);
      border-bottom: 1px solid var(--line);
      backdrop-filter: blur(16px);
      padding: 14px 16px;
      flex-wrap: wrap;
    }

    nav {
      order: 3;
      width: 100%;
      justify-content: space-between;
      border-color: var(--line);
      background: var(--panel);
      color: var(--ink);
      padding: 10px 12px;
    }

    .mark,
    .icon-link,
    .lang {
      border-color: var(--line);
      background: var(--panel);
      color: var(--ink);
    }

    footer {
      margin-top: 48px;
    }

    .footer-inner {
      min-height: 130px;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      padding: 24px 0;
    }
  }
`);

export const appShellStyles: StyleSheetLike = sheet;
