---
title: LessJS 快速上手
date: 2026-05-24
description: 5 分钟了解 LessJS 的核心概念
---

## 项目结构

```
blog/
├── app/
│   ├── routes/          # 页面路由（文件即路由）
│   └── islands/         # 交互组件（按需加载）
├── content/
│   └── blog/            # Markdown 博客文章
├── deno.json            # 依赖和任务
└── vite.config.ts       # LessJS 配置
```

## 核心概念

### 1. 文件约定路由

`app/routes/index.ts` → `/`
`app/routes/about.ts` → `/about`
`app/routes/blog.ts` → `/blog`

每个文件导出一个 Web Component，LessJS 自动完成 SSR 和路由。

### 2. Declarative Shadow DOM

```typescript
export default class HomePage extends DsdElement {
  render() {
    return `<h1>Hello</h1><p>这是服务端渲染的 HTML</p>`;
  }
}
```

`render()` 返回的字符串直接进入 SSR 输出，浏览器无需 JS 即可渲染。

### 3. 响应式岛屿

```typescript
count = signal(0);
render() {
  return html`<button @click=${() => this.count.value++}>
    ${this.count}
  </button>`;
}
```

需要交互的部分标记为 Island，独立打包，按需水合。

## 下一步

- 阅读 [LessJS 文档](https://lessjs.com/guide/getting-started)
- 查看 `docs/sop/v0.21.x/` 了解框架硬化路线
- 用 `deno task dev` 启动开发服务器
