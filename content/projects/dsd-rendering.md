---
title: DSD Rendering
slug: dsd-rendering
status: Research
order: 4
featured: false
thesis: A focused track for static Shadow DOM rendering and island boundaries.
summary: Notes and experiments around DSD output, hydration strategy, and readable static pages.
tags:
  - DSD
  - Web Components
stack:
  - Declarative Shadow DOM
  - Islands
  - SSG
links:
  Related Note: /blog/dsd-rendering-notes
relatedPosts:
  - dsd-rendering-notes
timeline:
  - Static route rendering
  - Theme toggle island
  - Reading page DSD audit
---

## Overview

DSD Rendering tracks how far static pages can go before they need client JavaScript.

## Architecture Notes

The site keeps interactive behavior narrow and intentionally visible, so the DSD output remains easy
to inspect.
