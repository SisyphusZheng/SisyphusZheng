# Changelog

## Unreleased

- Migrated the site from LessJS 0.28.5 to openElement 1.0.0-alpha.4, with the framework version
  pinned exactly in `deno.json`.
- Replaced the `@lessjs/ui/less-layout` alias workaround with the framework's
  `app/islands/app-shell.tsx` convention shell; `app/components/less-layout.tsx` and
  `app/components/site-shell.tsx` are retired.
- Moved the frozen global stylesheet into the framework's `app/head.tsx` convention, served from
  `app/styles/legacy-head.css`.
- Kept the `zh` route tree hand-maintained; no i18n build is configured.
- Deferred PWA, sitemap, and RSS output (no replacement surface exists for the retired `pwa` and
  `content.sitemap` config blocks).
- Superseded ADR-0002 with ADR-0005.
- Updated the build and release SOPs for the openElement task names and the `<route>/index.html`
  output layout.

## 0.1.0

- Rebuilt the repository as a LessJS personal technical magazine.
- Added full-viewport oil-painting hero direction.
- Added blog archive, article pages, project lab, project dossiers, topics, and about pages.
- Added custom AppShell and LessJS layout override.
- Added ADR, design, asset, SOP, changelog, and release-note documentation.
