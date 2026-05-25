---
title: 构建你的设计系统
date: 2026-05-25
description: 从 CSS 变量到组件库，如何一步步构建可维护、可扩展的设计系统
---

## 为什么需要设计系统

当你维护一个超过 10 个页面的项目时，你会发现颜色、间距、字体大小开始失控。一个按钮在这个页面是蓝色，在另一个页面变成了深蓝。行高时而是 1.5，时而是 1.8。

设计系统不是大公司的专利。即使是个人项目，一套自洽的设计 token 也能节省大量调试时间。

## 从 CSS 变量开始

最轻量的设计系统就是一组 CSS Custom Properties：

```css
:root {
  --accent: #d97757;
  --text-primary: #1a1a1a;
  --text-secondary: #555;
  --bg: #faf9f5;
  --border: #e8e6dc;
  --radius: 12px;
  --font-heading: "Playfair Display", Georgia, serif;
  --font-body: system-ui, sans-serif;
}
```

关键原则：**语义化命名**。不要叫 `--blue-500`，叫 `--accent`。未来换色时只需改一处。

## 暗色模式是必须的

用 `[data-theme="dark"]` 选择器覆盖变量：

```css
[data-theme="dark"] {
  --accent: #e8926d;
  --text-primary: #e8e6dc;
  --bg: #141413;
}
```

不用 `prefers-color-scheme` 媒体查询作为唯一方案 — 用户需要手动切换的能力。

## 组件化封装

在 Shadow DOM 中使用 CSS 变量，组件自然继承主题：

```typescript
const styles = new StyleSheet();
styles.replaceSync(`
  :host {
    color: var(--text-primary);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }
`);
```

CSS 变量穿透 Shadow DOM 边界，是 Web Components 主题化的最佳路径。

## 间距与排版

设计系统的核心不是颜色，是节奏：

- 间距使用 4px 的倍数：4, 8, 12, 16, 24, 32, 48
- 排版尺度：0.8rem, 0.85rem, 0.9rem, 1rem, 1.15rem, 1.25rem, 1.5rem, 1.75rem, 2.5rem
- 行高：正文 1.8，标题 1.2-1.4
- 最大宽度：文章 `65ch`，列表页 `900px`

## 小结

设计系统的价值不在于完美，而在于一致。从 CSS 变量开始，逐步扩展到组件 token、间距系统和排版规范。每一次新增页面都是验证系统的好机会。
