import { StyleSheet, type StyleSheetLike } from '@openelement/element';

// The `theme-toggle button` / `theme-toggle svg` rules of the retired shell
// stylesheet. They used to reach the button because the button was a light-DOM
// child of `<theme-toggle>` inside the shell's shadow tree; now the button lives
// in this island's own shadow root, so the island owns the rules. The retired
// selectors were dropped from app-shell-styles.ts rather than carried over: a
// shadow boundary is not crossed by selectors, so against the built artifact the
// shell's shadow root matches none of them — they could only ever be dead CSS.
//
// The shell still owns the colours, through the one channel that does cross a
// shadow boundary: inherited custom properties. Its header groups set
// `--toggle-fg` / `--toggle-bg` / `--toggle-border` — cinematic translucent-dark
// chip with light text on the home group, `var(--ink)` / `var(--panel)` /
// `var(--line)` on the paper group and on the sub-760px header. The paper values
// are repeated here as `var()` fallbacks, so this button is paper-styled by
// default and only turns light over the hero when the header hands it the home
// variables.
//
// `--toggle-border-hover` rides the same channel. The home group (the base
// `header` rule) sets the retired hover hairline `rgba(255, 255, 255, 0.46)`;
// the paper group sets it to `var(--line)` — the same value it gives
// `--toggle-border` — so on a reading page the hairline does not change on
// hover. That is the retired behaviour, not an approximation: the retired paper
// group `:host([surface="paper"]) theme-toggle button` (specificity 0-2-2)
// outranked `theme-toggle button:hover` (0-1-2), so a paper hover kept the idle
// `rgba(22, 22, 22, 0.14)` hairline while the retired `transform` still lifted
// the chip. The sub-760px header group leaves the token undeclared and so keeps
// the home value, again matching the retired sheet (see app-shell-styles.ts).
// Both surface groups therefore define the token explicitly — the base
// `header` rule for the home side, `header[data-surface="paper"]` for the
// reading side — and every toggle this site renders sits inside one of them
// (app/islands/app-shell.tsx), so the `var()` fallback on the `button:hover`
// `border-color` declaration below is purely defensive and unreachable here.
const sheet = new StyleSheet();
sheet.replaceSync(`
  :host {
    display: inline-flex;
  }

  button {
    width: 42px;
    height: 42px;
    display: inline-grid;
    place-items: center;
    border: 1px solid var(--toggle-border, var(--line));
    border-radius: 999px;
    color: var(--toggle-fg, var(--ink));
    background: var(--toggle-bg, var(--panel));
    text-decoration: none;
    backdrop-filter: blur(16px);
    cursor: pointer;
  }

  button:hover {
    border-color: var(--toggle-border-hover, rgba(22, 22, 22, 0.14));
    transform: translateY(-1px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`);

export const themeToggleStyles: StyleSheetLike = sheet;
