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

## Admin panel (`/admin/`)

Open <https://phyjhh.github.io/admin/> to write posts, add publications and edit your profile/CV in the browser. It is [Sveltia CMS](https://github.com/sveltia/sveltia-cms), configured in `public/admin/config.yml`. Every save is a commit to `main`, so the site redeploys a minute or two later.

**Sign in** with a GitHub token (one-time setup):

1. GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token.
2. Repository access: **Only select repositories** → `phyjhh/phyjhh.github.io`.
3. Repository permissions: **Contents → Read and write**.
4. Copy the token and paste it into “使用访问令牌登录” on the admin page. The browser remembers it.

On a desktop Chrome/Edge with a local clone, “使用本地仓库” edits the files on your disk instead; commit and push them yourself.

Notes: the body editor is plain Markdown, so LaTeX is saved exactly as typed; its preview shows formulas as source. New posts are named `YYYY-MM-DD-title.md`. Uploaded images go to `public/images/`.

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
