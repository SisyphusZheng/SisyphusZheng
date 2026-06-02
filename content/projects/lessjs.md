---
title: LessJS
slug: lessjs
status: Active
order: 1
featured: true
thesis: A DSD-first static framework for standards-aligned web apps.
summary: Framework source, route rendering, generated content, islands, and release gates used by this site.
tags:
  - LessJS
  - DSD
  - Web Components
stack:
  - LessJS
  - Deno
  - Vite
links:
  Docs: /blog/lessjs-personal-site
  Project Lab: /projects
relatedPosts:
  - lessjs-personal-site
  - dsd-rendering-notes
timeline:
  - 2026-06 site rebuild target
  - AppShell override validated
  - Blog and project dynamic routes generated
---

## Overview

LessJS is the local framework source used by this site. The project page exists to keep framework
decisions connected to a real consumer surface.

## Architecture Notes

The site uses LessJS routes, DSD component rendering, generated blog data, and a single client island
for theme switching. The AppShell is site-owned so the blog can carry its own visual identity.
