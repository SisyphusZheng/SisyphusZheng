---
title: Web Components 的未来
date: 2026-05-25
description: 探讨 Web Components 生态的发展方向，从 Declarative Shadow DOM 到自定义元素的最佳实践
---

## 2026 年的 Web Components

Web Components 已经不再是实验性的技术了。随着 Declarative Shadow DOM 的广泛支持和各大框架的逐步拥抱，2026 年的 Web Components 正在进入主流。

## Declarative Shadow DOM 改变了什么

以前，Shadow DOM 必须通过 JavaScript 创建：

```typescript
const shadow = element.attachShadow({ mode: 'open' });
shadow.innerHTML = '<style>h1 { color: red; }</style><h1>Hello</h1>';
```

这意味着没有 JS 就没有渲染。SSR 需要复杂的 workaround。

Declarative Shadow DOM 允许你直接在 HTML 中声明：

```html
<template shadowrootmode="open">
  <style>h1 { color: red; }</style>
  <h1>Hello</h1>
</template>
```

浏览器原生解析，无需 JS。SSR 输出的 HTML 直接可交互。

## 自定义元素的最佳实践

### 1. 保持简单

自定义元素不是 React 组件。它不需要虚拟 DOM，不需要 diff 算法。`render()` 返回 HTML 字符串就够了。

### 2. 岛屿架构

不是每个组件都需要 JS。用 Declarative Shadow DOM 做 SSR，只在需要交互的地方水合：

```typescript
// Ocean Component — 纯 SSR，无 JS
export default class ArticlePage extends DsdElement {
  render() {
    return '<article>...</article>';
  }
}

// Island Component — 需要交互，按需加载
export default class ThemeToggle extends DsdElement {
  isDark = signal(false);
  render() {
    return html`<button @click=${() => this.toggle()}>...</button>`;
  }
}
```

### 3. CSS 变量穿透 Shadow DOM

Shadow DOM 的样式隔离是特性，不是缺陷。用 CSS Custom Properties 做主题化：

```css
/* 外部定义主题变量 */
:root { --accent: #d97757; }

/* Shadow DOM 内部使用 */
:host { color: var(--accent); }
```

## 框架互操作性

Web Components 的终极优势：框架无关。一个精心设计的 `<my-card>` 可以在 React、Vue、Svelte、甚至无框架的 HTML 中使用。

这不仅仅是技术优势，更是架构决策：**用 Web Components 做设计系统，用框架做应用逻辑**。

## 下一步

- 尝试 LessJS — 一个 DSD-first 的 Web Components 框架
- 关注 Chromium 的 View Transitions API 与 Web Components 的结合
- 阅读 Web Components 社区组的最新提案

Web Standards 的未来，就是 Web Components 的未来。
