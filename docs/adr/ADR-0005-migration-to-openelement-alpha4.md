# ADR-0005: Migration to openElement 1.0.0-alpha.4

## Status

Accepted

## Decision

The site builds against `@openelement/element` and `@openelement/router` at the exact version
`1.0.0-alpha.4`, replacing `@lessjs` 0.28.5.

- Every `@openelement/*` import map entry names the exact version, with no range operator. Bumping
  the alpha is a deliberate edit to `deno.json`, not a floating resolution.
- The shell uses the framework's `app/islands/app-shell.tsx` convention (`@element('app-shell')`)
  instead of overriding the framework layout module.
- The Chinese tree stays hand-maintained under `app/routes/zh`; no i18n build is configured.
- Global CSS is injected through the `app/head.tsx` convention, which loads the frozen
  `app/styles/legacy-head.css`.
- PWA (manifest and service worker), sitemap XML, and RSS are deferred, not migrated.

## Rationale

The retired import map resolved `@lessjs/*` from JSR at `^0.28.5`. The framework changed both its
name and its distribution channel, so keeping that map would freeze the site on a package line that
no longer matches the code being validated. Migrating is the only way the build keeps proving the
current framework shape against a real consumer.

The alpha removes the reason for the ADR-0002 workaround. `appShell` is now a first-class convention
(`app/islands/app-shell.tsx`, registered under the tag `app-shell`), so no `resolve.alias` entry and
no site-owned copy of a framework layout module is needed. The head channel is likewise structured
and cannot carry a raw HTML string, which is why the frozen global stylesheet moved to the
`app/head.tsx` convention.

Exact pinning is a deliberate trade. Alpha releases can change behavior between patches, so a caret
range would let a rebuild silently pick up a different runtime than the one that passed the release
checklist. `deno.json` also sets `"minimumDependencyAge": 0` so a freshly published alpha resolves
without waiting out the dependency-age gate; that setting is only safe together with an exact pin.

Deferring PWA, sitemap, and RSS is a gap acknowledged, not a gap hidden. The retired `vite.config.ts`
declared a `pwa` block (name, short name, theme colour, background colour) and a `content.sitemap`
hostname, and RSS had no generator on the 0.28.5 line. The alpha's configuration surface (`renderer`,
`dirs`, `appShell`, `packageIslands`, `head`, `styles`, `i18n`, `viewTransition`, `speculation`,
`build`, `middleware`) has no PWA or sitemap channel, and the migrated build emits neither a web
manifest nor a service worker nor a sitemap. Hand-rolling three generators against an alpha would add
unvalidated build surface during a migration whose point is to validate the framework; returning them
is a new decision, not a restored config block.

## Consequences

`vite.config.ts` no longer aliases `@lessjs/ui/less-layout`, and `app/components/less-layout.tsx`
plus `app/components/site-shell.tsx` are gone. ADR-0002 is superseded by this ADR.

Task names are unchanged. `deno task build` runs `scripts/generate-data.ts` and then the
`npm:@openelement/router@1.0.0-alpha.4/cli/build` CLI in place of
`jsr:@lessjs/adapter-vite/cli/build`; `deno task dev` and `deno task preview` keep their names and
entry points.

Upgrading the pin means re-validating by hand: a real build plus the release checklist. There is no
range to absorb an alpha bump.

Section indexes now emit as `<route>/index.html` (`dist/blog/index.html`, `dist/projects/index.html`,
`dist/zh/index.html`) instead of the earlier flat `dist/blog.html`, `dist/projects.html`, and
`dist/zh.html`. `scripts/preview.ts` resolves both shapes, so local preview is unaffected.

`scripts/preview.ts` still maps `.webmanifest` and `.xml` content types for outputs the build does
not produce. Those entries are leftovers; they are not evidence that PWA or sitemap output exists.

Until PWA, sitemap, and RSS are re-decided, the release checklist must not claim them. See
`docs/sop/release-checklist.md` for what is actually gated today, and `scripts/verify-dist.ts` for
the build-output smoke test.
