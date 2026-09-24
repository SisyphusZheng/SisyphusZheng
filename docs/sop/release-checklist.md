# SOP: Release Checklist

- `deno fmt --check`
- `deno task build`
- Confirm `dist/assets/hero-oil-still-life.png` exists.
- Confirm blog dynamic routes exist.
- Confirm project dynamic routes exist.
- Confirm the `zh` route tree still builds: `dist/zh/index.html`, `dist/zh/blog/index.html`,
  `dist/zh/projects/index.html`, `dist/zh/topics/index.html`, `dist/zh/about/index.html`, and
  `dist/zh/search/index.html` all exist.
- Confirm no built page carries the framework's default shell branding: `grep -rl --include='*.html'
  -e '@lessjs' dist/` returns no files.
- Confirm the shell comes from the site, not the framework default: every file under `dist/` with an
  `.html` extension contains `<app-shell`.
- Capture homepage desktop, homepage mobile, blog, project lab, project detail, and article
  screenshots.

PWA, sitemap, and RSS are deferred (ADR-0005). Do not claim them in a release until they are
re-decided and this checklist gains a gate for them.
