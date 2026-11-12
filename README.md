# phyjhh.github.io

Personal homepage built with [Astro](https://astro.build/), deployed to GitHub Pages on every push to `main`.

## Where things live

| What                                      | File                                     |
| ----------------------------------------- | ---------------------------------------- |
| Name, intro, links, CV (both languages)   | `src/data/profile.json`                  |
| Blog posts / notes (Markdown, LaTeX)      | `src/content/blog/*.md`                  |
| Publications                              | `src/content/publications/*.md`          |
| Images used in posts                      | `public/notes/` → link as `/notes/x.png` |
| Interface text (nav, buttons) in zh / en  | `src/i18n.ts`                            |
| Site title, time zone, home page settings | `src/config.ts`                          |
| Styles                                    | `src/styles/global.css`                  |

The interface switches between 中文 and English with the button in the header. Posts and papers are shown as written.

## Writing a post

Create `src/content/blog/my-post.md`:

```md
---
title: 文章标题
pubDatetime: 2026-11-12T10:00:00Z
description: 一句话简介（可选）
tags: [拓扑超导]
draft: false
---

正文，支持公式 $E = mc^2$ 和

$$H = \sum_k \psi_k^\dagger h(k) \psi_k$$
```

A heading named `Table of contents` gets an auto-generated, collapsible table of contents.

## Adding a publication

Create `src/content/publications/paper.md`:

```md
---
title: Paper title
authors: A. Author, phyj
journal: Physical Review B
pubDatetime: 2026-01-01T00:00:00Z
doi: https://doi.org/10.1103/xxxx
pdf: https://arxiv.org/abs/xxxx.xxxxx
---

Optional abstract. If there is text here the title links to its own page.
```

## Commands

```bash
pnpm install
pnpm dev          # local preview at http://localhost:4321
pnpm build        # type-check and build into dist/
pnpm lint && pnpm format:check
```
