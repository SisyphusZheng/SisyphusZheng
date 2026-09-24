// File-level smoke test for the migrated `dist/` build output.
//
// Run: deno run -A scripts/verify-dist.ts
//
// Every assertion reads local files only; the script makes no network requests
// and imports nothing outside the Deno runtime. It prints "SMOKE OK" and exits 0
// when all assertions pass, otherwise it prints each failed assertion and exits 1.

const root = new URL('../', import.meta.url);

const failures: string[] = [];

function pass(assertion: string): void {
  console.log(`PASS ${assertion}`);
}

function fail(assertion: string): void {
  failures.push(assertion);
  console.error(`FAIL ${assertion}`);
}

function check(assertion: string, ok: boolean): void {
  if (ok) pass(assertion);
  else fail(assertion);
}

async function statOrNull(relPath: string): Promise<Deno.FileInfo | null> {
  try {
    return await Deno.stat(new URL(relPath, root));
  } catch (error) {
    if (error instanceof Deno.errors.NotFound || error instanceof Deno.errors.NotADirectory) {
      return null;
    }
    throw error;
  }
}

async function isFile(relPath: string): Promise<boolean> {
  const stat = await statOrNull(relPath);
  return stat?.isFile ?? false;
}

async function readTextOrNull(relPath: string): Promise<string | null> {
  try {
    return await Deno.readTextFile(new URL(relPath, root));
  } catch (error) {
    if (error instanceof Deno.errors.NotFound || error instanceof Deno.errors.NotADirectory) {
      return null;
    }
    throw error;
  }
}

// `dist/zh.html` and `dist/zh/index.html` (likewise for other pages) are two
// on-disk shapes of the same page, so a baseline entry counts as migrated when
// either shape is present.
function htmlEquivalents(relPath: string): string[] {
  const equivalents = [relPath];
  if (relPath.endsWith('/index.html')) {
    equivalents.push(`${relPath.slice(0, -'/index.html'.length)}.html`);
  } else if (relPath.endsWith('.html')) {
    equivalents.push(`${relPath.slice(0, -'.html'.length)}/index.html`);
  }
  return equivalents;
}

// 1. Every HTML page recorded in the pre-migration baseline must still be present.
const baselineText = await readTextOrNull('.migration-baseline-dist.txt');
if (baselineText === null) {
  fail('baseline file .migration-baseline-dist.txt is readable');
} else {
  pass('baseline file .migration-baseline-dist.txt is readable');

  const baselinePaths = baselineText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
    .filter((line) => line.startsWith('dist/'));

  const skipped: string[] = [];
  for (const baselinePath of baselinePaths) {
    if (!/\.html?$/i.test(baselinePath)) {
      // Non-HTML entries (hashed css/js assets) are intentionally not asserted:
      // their file names change between builds.
      skipped.push(baselinePath);
      continue;
    }

    const equivalents = htmlEquivalents(baselinePath);
    let present: string | null = null;
    for (const candidate of equivalents) {
      if (await isFile(candidate)) {
        present = candidate;
        break;
      }
    }

    if (present === null) {
      fail(`baseline html still present: ${baselinePath} (tried: ${equivalents.join(', ')})`);
    } else if (present === baselinePath) {
      pass(`baseline html still present: ${baselinePath}`);
    } else {
      pass(`baseline html still present: ${baselinePath} (via ${present})`);
    }
  }

  if (skipped.length > 0) {
    console.log(`INFO non-html baseline entries not asserted: ${skipped.join(', ')}`);
  }
}

// 2. The English home page must exist and still deliver the migrated shell, theme
//    bootstrap, design tokens and declarative shadow DOM markup.
const indexHtml = await readTextOrNull('dist/index.html');
check('dist/index.html exists', indexHtml !== null);
if (indexHtml !== null) {
  const markers = ['app-shell', 'theme-init', '--paper', '<template shadowrootmode'];
  for (const marker of markers) {
    check(`dist/index.html contains ${JSON.stringify(marker)}`, indexHtml.includes(marker));
  }
}

// 3. The Chinese home page must exist and still mount the migrated shell.
const zhIndexHtml = await readTextOrNull('dist/zh/index.html');
check('dist/zh/index.html exists', zhIndexHtml !== null);
if (zhIndexHtml !== null) {
  check('dist/zh/index.html contains "app-shell"', zhIndexHtml.includes('app-shell'));
}

// 4. At least three blog posts must be pre-rendered with declarative shadow DOM.
const blogPosts: string[] = [];
try {
  for await (const entry of Deno.readDir(new URL('dist/blog/', root))) {
    if (!entry.isDirectory) continue;
    const relPath = `dist/blog/${entry.name}/index.html`;
    if (await isFile(relPath)) blogPosts.push(relPath);
  }
} catch (error) {
  if (!(error instanceof Deno.errors.NotFound || error instanceof Deno.errors.NotADirectory)) {
    throw error;
  }
}
blogPosts.sort();

check(`dist/blog/ has at least 3 */index.html (found ${blogPosts.length})`, blogPosts.length >= 3);
for (const relPath of blogPosts) {
  const html = (await readTextOrNull(relPath)) ?? '';
  check(
    `${relPath} contains "<template shadowrootmode"`,
    html.includes('<template shadowrootmode'),
  );
}

// 5. The island client bundle output must exist and not be empty.
const clientStat = await statOrNull('dist/client');
const clientIsDir = clientStat?.isDirectory ?? false;
check('dist/client/ exists', clientIsDir);
if (clientIsDir) {
  let entries = 0;
  for await (const _entry of Deno.readDir(new URL('dist/client/', root))) {
    entries += 1;
  }
  check(`dist/client/ is not empty (${entries} entries)`, entries > 0);
}

// 6. No leftover reference to the previous framework may survive in the pages.
const spotChecks: Array<[string, string | null]> = [
  ['dist/index.html', indexHtml],
  ['dist/zh/index.html', zhIndexHtml],
];
for (const [relPath, html] of spotChecks) {
  if (html === null) continue; // missing file already reported above
  check(`${relPath} does not contain "@lessjs"`, !html.includes('@lessjs'));
}

// ---------------------------------------------------------------------------
// Appended regression assertions (the seven-fix round). Each one pins a
// behaviour that a previous build shipped broken, so a regression fails the
// whole smoke test through the shared `failures` list and the exit 1 below.
// ---------------------------------------------------------------------------

function countOccurrences(haystack: string, needle: string): number {
  let count = 0;
  let index = haystack.indexOf(needle);
  while (index !== -1) {
    count += 1;
    index = haystack.indexOf(needle, index + needle.length);
  }
  return count;
}

// 7. Head deduplication: app/head.tsx no longer hand-writes the tags the
//    framework already emits from `openelement.config.ts` plus the route
//    `head`, so each page must carry exactly one of each tag. A second copy is
//    the "two conflicting sets in the output" regression.
const headDedupPages = ['dist/index.html', 'dist/about/index.html'];
for (const relPath of headDedupPages) {
  const html = await readTextOrNull(relPath);
  if (html === null) {
    fail(`${relPath} exists for the head-dedup assertion`);
    continue;
  }

  const headTags: Array<[string, number]> = [
    ['<meta name="description"', countOccurrences(html, '<meta name="description"')],
    ['og:description', countOccurrences(html, 'og:description')],
    ['og:title', countOccurrences(html, 'og:title')],
  ];
  for (const [needle, found] of headTags) {
    check(`${relPath} has exactly 1 ${needle} (found ${found})`, found === 1);
  }
}

// 8. Header surface mechanism (product-level). The retired shell keyed its two
//    header groups on its own host attribute; the convention shell cannot set
//    attributes on its own host, so the groups are keyed on the marker
//    `<header data-surface="...">` rendered by `app/islands/app-shell.tsx` and
//    consumed by `app/components/app-shell-styles.ts` as
//    `header[data-surface="paper"]`. What is asserted here is the built page:
//    the marker values ('home' on the two root pages, 'paper' on a reading page)
//    and the declarations the inlined shell stylesheet emits for each group. The
//    group membership is parsed out of the emitted CSS selectors, so a shell
//    source refactor alone cannot make the assertion pass — the built HTML has
//    to change with it too.
const HOME_SURFACE = 'home';
const PAPER_SURFACE = 'paper';

interface CssRule {
  selector: string;
  body: string;
  /** True when the rule sits inside an at-rule (e.g. a media query). */
  conditional: boolean;
}

// The first `<style>` element inside a given element's declarative shadow DOM
// template, i.e. the element's own stylesheet. For the shell this is
// `<app-shell>`: the DSD template emits its stylesheet before any nested island
// markup (nested islands carry later `data-oe-static-styles` blocks), so the
// first block belongs to the shell and the island blocks are found by their own
// tag names. `tagName` is always an internal literal, never page content.
function elementStyleBlock(html: string, tagName: string): string | null {
  const openTag = html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'i'));
  if (openTag === null || openTag.index === undefined) return null;
  const afterOpen = html.slice(openTag.index + openTag[0].length);
  const styleOpen = afterOpen.match(/<style\b[^>]*>/i);
  if (styleOpen === null || styleOpen.index === undefined) return null;
  const bodyStart = styleOpen.index + styleOpen[0].length;
  const styleClose = afterOpen.indexOf('</style>', bodyStart);
  if (styleClose === -1) return null;
  return afterOpen.slice(bodyStart, styleClose);
}

function appShellStyleBlock(html: string): string | null {
  return elementStyleBlock(html, 'app-shell');
}

// Flattens a stylesheet into its style rules, recursing into at-rules (a rule
// nested in `@media` is marked `conditional` so it cannot satisfy an assertion
// about the unconditional declarations of a group).
function cssRules(css: string, conditional = false): CssRule[] {
  const rules: CssRule[] = [];
  let selector = '';
  let selectorStart = 0;
  let bodyStart = 0;
  let depth = 0;

  for (let index = 0; index < css.length; index += 1) {
    const char = css[index];
    if (char === '{') {
      if (depth === 0) {
        selector = css.slice(selectorStart, index).trim();
        bodyStart = index + 1;
      }
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth <= 0) {
        depth = 0;
        const body = css.slice(bodyStart, index);
        if (selector.startsWith('@')) rules.push(...cssRules(body, true));
        else if (selector.length > 0) rules.push({ selector, body, conditional });
        selectorStart = index + 1;
      }
    }
  }

  return rules;
}

// Reads the surface group a selector's `header[data-surface="…"]` qualifier
// names, or null when the selector is unqualified.
function surfaceQualifier(selector: string): string | null {
  const match = selector.replace(/\s+/g, ' ').match(
    /header\s*\[\s*data-surface\s*=\s*["']?([^"'\]]+)["']?\s*\]/,
  );
  return match === null ? null : match[1].trim();
}

// Unqualified shell rules are the cinematic default ('home' over the
// full-viewport hero); the qualified rules are the reading ('paper') override.
function inSurfaceGroup(selector: string, group: string): boolean {
  const qualifier = surfaceQualifier(selector);
  return qualifier === null ? group === HOME_SURFACE : qualifier === group;
}

function surfaceGroupCss(rules: CssRule[], group: string, unconditionalOnly = false): string {
  return rules
    .filter((rule) =>
      (!unconditionalOnly || !rule.conditional) &&
      rule.selector.split(',').some((selector) => inSurfaceGroup(selector, group))
    )
    .map((rule) => rule.body)
    .join('\n');
}

// Reads the surface group of a selector that styles the `<header>` element
// *itself* — `header` (unqualified, the home group) or
// `header[data-surface="…"]`. Returns null for the unqualified home form,
// undefined for any selector that styles something else (`header nav`,
// `header .brand`, `theme-toggle button`, `nav a`) or is qualified by more than
// the marker. This is what makes the header assertions below immune to the
// `.brand { color: inherit }` false pass the unqualified-union helper allowed:
// only the header's own rule body is ever inspected.
function headerElementGroup(selector: string): string | null | undefined {
  const match = selector.replace(/\s+/g, ' ').trim().match(
    /^header\s*(?:\[\s*data-surface\s*=\s*["']?([^"'\]]+)["']?\s*\])?$/,
  );
  if (match === null) return undefined;
  return match[1] === undefined ? null : match[1].trim();
}

// The unconditional declaration bodies of the rules that style the header
// element itself for `group`.
function headerElementCss(rules: CssRule[], group: string): string {
  return rules
    .filter((rule) => !rule.conditional)
    .filter((rule) =>
      rule.selector.split(',').some((selector) => {
        const qualifier = headerElementGroup(selector);
        if (qualifier === undefined) return false;
        return qualifier === null ? group === HOME_SURFACE : qualifier === group;
      })
    )
    .map((rule) => rule.body)
    .join('\n');
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// `--property:` with any value.
function declaresProperty(css: string, property: string): boolean {
  return new RegExp(`${escapeRegExp(property)}\\s*:`).test(css);
}

// `--property: <value>;` with that exact value (whitespace-insensitive).
function declaresPropertyValue(css: string, property: string, value: string): boolean {
  return new RegExp(`${escapeRegExp(property)}\\s*:\\s*${escapeRegExp(value)}\\s*(?:;|$)`).test(
    css,
  );
}

// 8a. The source-level mechanism must still be in place: the shell renders the
//     marker, and the stylesheet consumes the reading marker.
const shellSource = await readTextOrNull('app/islands/app-shell.tsx');
const shellStylesSource = await readTextOrNull('app/components/app-shell-styles.ts');

if (shellSource === null) {
  fail('app/islands/app-shell.tsx is readable (surface marker source)');
} else {
  check(
    'app/islands/app-shell.tsx declares the data-surface marker',
    shellSource.includes('data-surface'),
  );
}

if (shellStylesSource === null) {
  fail('app/components/app-shell-styles.ts is readable (surface group consumer)');
} else {
  const styleGroups = [...shellStylesSource.matchAll(/header\[data-surface="([^"]+)"\]/g)].map(
    (match) => match[1],
  );
  if (styleGroups.length === 0) {
    fail('app/components/app-shell-styles.ts consumes the data-surface reading marker');
  } else {
    pass(
      `app/components/app-shell-styles.ts consumes the data-surface group(s): ${
        [...new Set(styleGroups)].join(', ')
      }`,
    );
  }
  check(
    `app/components/app-shell-styles.ts styles the "${PAPER_SURFACE}" group`,
    styleGroups.includes(PAPER_SURFACE),
  );
}

// 8b. Each page must render its header in the expected surface group.
const surfacePages: Array<[string, string]> = [
  ['dist/index.html', HOME_SURFACE],
  ['dist/zh/index.html', HOME_SURFACE],
  ['dist/about/index.html', PAPER_SURFACE],
];
const surfaceGroups = [HOME_SURFACE, PAPER_SURFACE];
for (const [relPath, expectedGroup] of surfacePages) {
  const html = await readTextOrNull(relPath);
  if (html === null) {
    fail(`${relPath} exists for the header-group assertion`);
    continue;
  }

  // Scan rendered `<header …>` tags only: the same marker also occurs as CSS
  // selector text inside the inlined DSD stylesheet
  // (`header[data-surface="paper"]`), which is present on every page and would
  // otherwise make the negative group check fail spuriously.
  const renderedGroups: string[] = [];
  for (const tagMatch of html.matchAll(/<header\b[^>]*>/gi)) {
    const attributeMatch = tagMatch[0].match(
      /data-surface\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i,
    );
    if (attributeMatch === null) continue;
    renderedGroups.push(attributeMatch[1] ?? attributeMatch[2] ?? attributeMatch[3] ?? '');
  }
  check(
    `${relPath} renders the header in the "${expectedGroup}" group (data-surface="${expectedGroup}")`,
    renderedGroups.includes(expectedGroup),
  );
  for (const otherGroup of surfaceGroups) {
    if (otherGroup === expectedGroup) continue;
    check(
      `${relPath} does not render the header in the "${otherGroup}" group`,
      !renderedGroups.includes(otherGroup),
    );
  }
}

// 8c. The built shell stylesheet of each page must carry the header treatment of
//     its group: the cinematic 'home' header is fixed and translucent/white, the
//     reading 'paper' header is sticky instead and never fixed. Inspecting the
//     emitted CSS catches the regression where the build shipped the two groups
//     swapped or dropped the fixed/sticky declaration. The position cues are read
//     from the header element's own rule body (`headerElementCss`), not from the
//     group union, so no other member of the group can stand in for the header's
//     own declaration.
for (const [relPath, group] of surfacePages) {
  const html = await readTextOrNull(relPath);
  if (html === null) {
    fail(`${relPath} exists for the shell-stylesheet assertion`);
    continue;
  }

  const styleBlock = appShellStyleBlock(html);
  if (styleBlock === null) {
    fail(`${relPath} contains the app-shell inline style block`);
    continue;
  }
  pass(`${relPath} contains the app-shell inline style block`);

  const rules = cssRules(styleBlock);
  const groupCss = surfaceGroupCss(rules, group, true);
  if (groupCss.trim().length === 0) {
    fail(
      `${relPath} shell stylesheet declares unconditional rules for the "${group}" surface group`,
    );
    continue;
  }
  pass(`${relPath} shell stylesheet declares the "${group}" surface group`);

  // Every cue below is read from the header element's own rule body — `header`
  // (the home group) or `header[data-surface="…"]` — rather than from the group
  // union. The union is satisfied by *any* rule the group membership helper
  // accepts, so an unrelated member could stand in for a header that had lost
  // its own cue: an unqualified `.zzz { position: fixed }` counts as home-group,
  // and `header[data-surface="paper"] nav { position: sticky }` counts as
  // paper-group. `headerElementCss` never returns those, so the assertion can
  // only pass on the declaration the header itself carries.
  const headerCss = headerElementCss(rules, group);

  if (group === HOME_SURFACE) {
    check(
      `${relPath} "home" header rule declares position: fixed`,
      /position\s*:\s*fixed/.test(headerCss),
    );
    // Both cues are required, and both are read from the header element's own
    // rule body only. The previous `||` form was satisfied by
    // `.brand { color: inherit }` — an unqualified rule the group union picked
    // up — so a build whose header had lost its white/translucent treatment
    // could still pass. The colour cue accepts the inherited-variable form the
    // retired stylesheet used or a literal white, but nothing else.
    check(
      `${relPath} "home" header rule carries the translucent-white cue (rgba(255…))`,
      /rgba\(\s*255/.test(headerCss),
    );
    // `(?:^|[;{\s])` keeps the match on the `color` property itself: without it
    // the pattern would also fire on the tail of `--header-color:`.
    const whiteColorCue = /(?:^|[;{\s])color\s*:\s*var\(\s*--header-color\s*,\s*white\s*\)/
      .test(headerCss) ||
      /(?:^|[;{\s])color\s*:\s*(?:#fff(?:fff)?|white\b|rgba?\(\s*255\s*,\s*255\s*,\s*255\b)/i
        .test(headerCss);
    check(
      `${relPath} "home" header rule declares the white header colour ` +
        `(color: var(--header-color, white) or equivalent)`,
      whiteColorCue,
    );
  } else {
    check(
      `${relPath} "paper" header rule declares position: sticky`,
      /position\s*:\s*sticky/.test(headerCss),
    );
    check(
      `${relPath} "paper" header rule does not declare position: fixed`,
      !/position\s*:\s*fixed/.test(headerCss),
    );
  }
}

// 9. Language switch: the shell's `langTitle` computed spells out the target
//    language, so the English home offers the Chinese label and the Chinese
//    home offers the English one (the link text stays the compact glyph).
const langTitlePages: Array<[string, string]> = [
  ['dist/index.html', '中文'],
  ['dist/zh/index.html', 'English'],
];
for (const [relPath, marker] of langTitlePages) {
  const html = await readTextOrNull(relPath);
  if (html === null) {
    fail(`${relPath} exists for the language-switch assertion`);
    continue;
  }
  check(`${relPath} contains title="${marker}"`, html.includes(`title="${marker}"`));
}

// 10. Dark selector: `app/styles/legacy-head.css` must not contain the invalid
//     `:root([` pseudo-class and must theme through the
//     `html[data-theme="dark"]` selector instead.
const legacyHeadCss = await readTextOrNull('app/styles/legacy-head.css');
if (legacyHeadCss === null) {
  fail('app/styles/legacy-head.css is readable (dark selector source)');
} else {
  check(
    'app/styles/legacy-head.css does not contain the invalid ":root([" pseudo-class',
    !legacyHeadCss.includes(':root(['),
  );
  check(
    'app/styles/legacy-head.css contains html[data-theme="dark"]',
    legacyHeadCss.includes('html[data-theme="dark"]'),
  );
}

// 11. Dead CSS: the retired `.missing` rule must be gone from the two page
//     stylesheets that used to carry it.
const deadCssFiles = [
  'app/components/page-blog-post-styles.ts',
  'app/components/page-project-detail-styles.ts',
];
for (const relPath of deadCssFiles) {
  const styles = await readTextOrNull(relPath);
  if (styles === null) {
    fail(`${relPath} is readable (dead CSS source)`);
    continue;
  }
  check(`${relPath} does not contain the dead ".missing" rule`, !styles.includes('.missing'));
}

// 12. Theme-toggle cross-shadow-boundary mechanism. The toggle button lives in
//     the theme-toggle island's own shadow root, so the shell's `header`
//     selectors cannot reach it; the island paints itself through the
//     `--toggle-*` custom properties instead (custom properties inherit through
//     shadow boundaries, selectors do not). The shell must define `--toggle-fg`
//     and the island must consume it with a fallback, so a reading page falls
//     back to its paper colours while the cinematic home header overrides them.
//     Both sources are `sheet.replaceSync(\`…\`)` stylesheets, so the
//     declarations are read from inside the template literal — a mention in a
//     comment cannot satisfy the assertion.
function stylesheetText(source: string): string | null {
  const call = source.indexOf('replaceSync(');
  if (call === -1) return null;
  const open = source.indexOf('`', call);
  if (open === -1) return null;
  const close = source.lastIndexOf('`');
  if (close <= open) return null;
  return source.slice(open + 1, close);
}

const toggleStylesSource = await readTextOrNull('app/components/theme-toggle-styles.ts');
const shellStylesheet = shellStylesSource === null ? null : stylesheetText(shellStylesSource);
const toggleStylesheet = toggleStylesSource === null ? null : stylesheetText(toggleStylesSource);

if (shellStylesSource === null) {
  fail('app/components/app-shell-styles.ts is readable (toggle custom property definition)');
} else if (shellStylesheet === null) {
  fail('app/components/app-shell-styles.ts exposes a replaceSync(`…`) stylesheet');
} else {
  check(
    'app/components/app-shell-styles.ts defines the --toggle-fg custom property',
    /--toggle-fg\s*:/.test(shellStylesheet),
  );
}

if (toggleStylesSource === null) {
  fail('app/components/theme-toggle-styles.ts is readable (toggle custom property consumer)');
} else if (toggleStylesheet === null) {
  fail('app/components/theme-toggle-styles.ts exposes a replaceSync(`…`) stylesheet');
} else {
  check(
    'app/components/theme-toggle-styles.ts consumes var(--toggle-fg, …) with a fallback',
    toggleStylesheet.includes('var(--toggle-fg,'),
  );
}

// ---------------------------------------------------------------------------
// Appended regression assertions: the theme-toggle channel in the *built*
// pages. Section 12 pins the mechanism in the source files; the assertions
// below pin the artefacts. The two can drift — a build whose home group lost the
// four `--toggle-*` declarations kept SMOKE OK while a no-JS browser painted
// the island in its paper (`var(--ink)` / `var(--panel)`) fallbacks over the
// dark full-viewport hero, i.e. dark text on a dark surface.
// ---------------------------------------------------------------------------

const TOGGLE_PROPERTIES = [
  '--toggle-fg',
  '--toggle-bg',
  '--toggle-border',
  '--toggle-border-hover',
] as const;

// 13a. The built home group must hand all four custom properties to the island.
//      `dist/index.html` is the page the regression was observed on; the
//      Chinese home page renders the same shell in the same group (section 8b),
//      so it is asserted alongside it. The declarations are read from the header
//      element's own rule — the home group under the unqualified-selector
//      convention documented above `inSurfaceGroup` — not from the group union,
//      so `nav`/`.mark` colour declarations cannot stand in for the header's.
//      `--toggle-border-hover` is the hover hairline channel: the island reads
//      it in its `button:hover` rule, and neither the artifact-level assertions
//      nor the source-level ones covered it before, so a build could have
//      dropped the declaration without failing this smoke test.
const homeTogglePages = ['dist/index.html', 'dist/zh/index.html'];
for (const relPath of homeTogglePages) {
  const html = await readTextOrNull(relPath);
  if (html === null) {
    fail(`${relPath} exists for the home toggle-variable assertion`);
    continue;
  }
  const styleBlock = appShellStyleBlock(html);
  if (styleBlock === null) {
    fail(`${relPath} contains the app-shell inline style block (home toggle variables)`);
    continue;
  }
  const homeHeaderCss = headerElementCss(cssRules(styleBlock), HOME_SURFACE);
  if (homeHeaderCss.trim().length === 0) {
    fail(`${relPath} shell stylesheet has an unconditional home-group header rule`);
    continue;
  }
  for (const property of TOGGLE_PROPERTIES) {
    check(
      `${relPath} home-group header rule declares ${property}:`,
      declaresProperty(homeHeaderCss, property),
    );
  }
}

// 13b. The consuming side must survive into the built page too. The island
//      carries its stylesheet as the first `<style>` inside `<theme-toggle>`, so
//      this reads the island's own shadow-root stylesheet — a mention elsewhere
//      on the page cannot satisfy it.
for (const relPath of homeTogglePages) {
  const html = await readTextOrNull(relPath);
  if (html === null) continue; // missing file already reported by 13a
  const islandCss = elementStyleBlock(html, 'theme-toggle');
  if (islandCss === null) {
    fail(`${relPath} contains the theme-toggle island inline style block`);
    continue;
  }
  check(
    `${relPath} theme-toggle island stylesheet consumes var(--toggle-fg)`,
    islandCss.includes('var(--toggle-fg'),
  );
  check(
    `${relPath} theme-toggle island stylesheet consumes var(--toggle-bg)`,
    islandCss.includes('var(--toggle-bg'),
  );
  // The trailing comma keeps this on the idle hairline channel: a bare
  // `var(--toggle-border` would also be satisfied by the hover declaration
  // `var(--toggle-border-hover, …)` further down the same stylesheet.
  check(
    `${relPath} theme-toggle island stylesheet consumes var(--toggle-border, …) with a fallback`,
    islandCss.includes('var(--toggle-border,'),
  );
}

// 13c. The reading page's toggle channel. `dist/about/index.html` renders its
//      header in the "paper" group, so the paper header rule has to hand the
//      island the paper colours: the base (home) `header` rule is *unqualified*,
//      which means it matches the paper header too, and the paper group's
//      `--toggle-*` declarations — not the island's `var()` fallback — are what
//      keeps a reading page off the translucent white chip.
//
//      This is a deliberate departure from the requirement as literally worded
//      ("about's app-shell styles contain no --toggle-fg"). That literal form
//      cannot hold for this build and is not achievable from this file: all 19
//      built HTML pages share one shell stylesheet (byte-identical across them)
//      in which the base `header` rule, the `header[data-surface="paper"]`
//      override *and* the sub-760px media block each declare `--toggle-fg`. The
//      assertions below pin the effect that requirement was after: a paper page
//      that does not present the cinematic chip and whose toggle inherits the
//      paper colours. The last check keeps the literal negative that does hold —
//      the shell defines these properties, only the island reads them.
const PAPER_TOGGLE_VALUES: Array<[string, string]> = [
  ['--toggle-fg', 'var(--ink)'],
  ['--toggle-bg', 'var(--panel)'],
  ['--toggle-border', 'var(--line)'],
  // Both surface groups define the hover channel explicitly — the paper group
  // gives it the same `var(--line)` as the idle hairline, so a reading page's
  // hairline does not change on hover. Pinning it here keeps a build from
  // dropping the paper declaration and silently falling back to the home
  // `rgba(255, 255, 255, 0.46)` hairline on `dist/about/index.html`.
  ['--toggle-border-hover', 'var(--line)'],
];
const aboutToggleHtml = await readTextOrNull('dist/about/index.html');
if (aboutToggleHtml === null) {
  fail('dist/about/index.html exists for the paper toggle-variable assertion');
} else {
  const styleBlock = appShellStyleBlock(aboutToggleHtml);
  if (styleBlock === null) {
    fail(
      'dist/about/index.html contains the app-shell inline style block (paper toggle variables)',
    );
  } else {
    const paperHeaderCss = headerElementCss(cssRules(styleBlock), PAPER_SURFACE);
    if (paperHeaderCss.trim().length === 0) {
      fail('dist/about/index.html shell stylesheet has the paper-group header rule');
    } else {
      check(
        'dist/about/index.html paper-group header rule does not carry the cinematic chip values (rgba(255…))',
        !/rgba\(\s*255/.test(paperHeaderCss),
      );
      for (const [property, value] of PAPER_TOGGLE_VALUES) {
        check(
          `dist/about/index.html paper-group header rule sets ${property} to the paper value ${value}`,
          declaresPropertyValue(paperHeaderCss, property, value),
        );
      }
    }
    check(
      'dist/about/index.html app-shell stylesheet defines the toggle properties without consuming them ' +
        '(the island owns the var() reads)',
      !/var\(\s*--toggle-fg/.test(styleBlock),
    );
  }
}

if (failures.length > 0) {
  console.error(`SMOKE FAILED: ${failures.length} assertion(s) failed`);
  for (const assertion of failures) {
    console.error(`  - ${assertion}`);
  }
  Deno.exit(1);
}

console.log('SMOKE OK');
Deno.exit(0);
