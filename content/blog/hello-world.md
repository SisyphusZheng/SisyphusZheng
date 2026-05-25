---
title: Hello, LessJS Blog
date: 2026-05-24
description: 我的第一篇 LessJS 博客文章
---

## 欢迎来到我的博客

这是使用 **LessJS** 框架搭建的个人博客。LessJS 是一个 DSD-first Web Components 框架，支持：

- **文件约定路由** — 在 `app/routes/` 下创建 `.ts` 文件自动生成路由
- **Markdown 博客** — 在 `content/blog/` 下放置 `.md` 文件，自动生成博客页面
- **Declarative Shadow DOM** — 标准 Web Components，零运行时 JS 的 SSR
- **暗色/亮色主题** — 使用 CSS Custom Properties，一键切换

## 为什么选 LessJS

传统的博客框架要么太重（Next.js），要么太老（Jekyll），要么学起来成本高（Astro + 各种模板语法）。

LessJS 用的是标准 Web Components + Markdown，写博客只需要：
1. 写 Markdown 文章
2. 改几行 TypeScript 配置
3. `deno task build` 生成静态站点

没有魔法，没有黑盒。
