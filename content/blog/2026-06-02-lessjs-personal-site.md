---
title: Rebuilding a Personal Blog on LessJS
date: 2026-06-02
excerpt: A compact build note on turning a blank repository into a LessJS personal blog with DSD pages, generated data, and a local framework source map.
tags:
  - LessJS
  - DSD
  - Build Notes
relatedProjects:
  - field-notes
  - lessjs
---

## AppShell

The site uses a custom `less-layout` override so the default framework shell does not leak into the
product surface. The actual shell is a site-owned DSD component with a fixed cinematic header on the
homepage and a sticky editorial header on reading pages.

## Generated Data

Blog content lives in `content/blog`. Project dossiers live in `content/projects`. A generation step
writes TypeScript modules before LessJS builds the route graph, so the SSG pass can discover dynamic
blog and project paths.

## Release Gates

The minimum local gate is formatting, static build, generated HTML inspection, preview checks, and
screenshots across the homepage, archive, project lab, and article page.
