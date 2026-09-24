# SOP: Build and Preview

```powershell
deno fmt --check
deno task build
deno task preview
```

`deno task build` runs `scripts/generate-data.ts` first, then the openElement router build CLI. No
task name changed in the migration; the framework version is pinned exactly in `deno.json`, so a
framework upgrade means editing that pin and re-running the release checklist.

`deno task dev` serves the site through Vite with the openElement router plugin.

`deno task preview` runs the static preview server in `scripts/preview.ts` on
`127.0.0.1:4173` against `dist/`. Pass a port argument to override it.
