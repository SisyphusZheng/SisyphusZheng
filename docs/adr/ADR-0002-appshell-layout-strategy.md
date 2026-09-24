# ADR-0002: AppShell and Layout Strategy

## Status

Superseded by ADR-0005

## Decision

The project overrides `@lessjs/ui/less-layout` with `app/components/less-layout.tsx` and renders a
site-owned `site-shell` inside route components.

## Rationale

LessJS currently hardcodes the SSG shell around `<less-layout>`. A custom alias keeps the framework
renderer intact while preventing default LessJS branding from leaking into this personal blog.

## Consequences

`vite.config.ts` must keep an explicit alias for `@lessjs/ui/less-layout`. Future framework support
for configurable AppShells should replace this workaround.
