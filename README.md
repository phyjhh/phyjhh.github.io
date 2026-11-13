# phyjhh.github.io

Academic personal homepage built with [Astro](https://astro.build/), deployed to GitHub Pages on every push to `main`. The layout (top navigation, author sidebar, archive lists) is adapted from [AcademicPages](https://github.com/academicpages/academicpages.github.io) (MIT); icons are [Font Awesome Free](https://fontawesome.com/license/free) (CC BY 4.0).

## Where things live

| What                                                     | File                            |
| -------------------------------------------------------- | ------------------------------- |
| Sidebar (avatar, bio, location, links), About page, CV   | `src/data/profile.json`         |
| Blog posts / notes (Markdown, LaTeX)                     | `src/content/blog/*.md`         |
| Publications                                             | `src/content/publications/*.md` |
| Portfolio projects                                       | `src/content/portfolio/*.md`    |
| Images (avatar, uploads) → link as `/images/x.png`       | `public/images/`                |
| Interface text (nav, buttons) in zh / en                 | `src/i18n.ts`                   |
| Site title, time zone, number of posts on the About page | `src/config.ts`                 |
| Styles and colours (light / dark)                        | `src/styles/global.css`         |

The header has a 中文 / English switch and a light / dark switch (default: follow the system). Posts, papers and projects are shown as written.

## Admin panel (`/admin/`)

Open <https://phyjhh.github.io/admin/> to write posts, add publications and edit your profile/CV in the browser. It is [Sveltia CMS](https://github.com/sveltia/sveltia-cms), configured in `public/admin/config.yml`. Every save is a commit to `main`, so the site redeploys a minute or two later.

**Sign in** with a GitHub token (one-time setup):

1. GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token.
2. Repository access: **Only select repositories** → `phyjhh/phyjhh.github.io`.
3. Repository permissions: **Contents → Read and write**.
4. Copy the token and paste it into “使用访问令牌登录” on the admin page. The browser remembers it.

On a desktop Chrome/Edge with a local clone, “使用本地仓库” edits the files on your disk instead; commit and push them yourself.

Notes: the body editor is plain Markdown, so LaTeX is saved exactly as typed; its preview shows formulas as source. New posts are named `YYYY-MM-DD-title.md`. Uploaded images go to `public/images/`; PDFs uploaded for a paper or the CV, and files attached to a blog post (listed at the end of the post; PDFs are shown page by page with pdf.js unless “在文章中直接显示” is turned off), go to `public/files/` and are linked as `/files/<name>`.

## Publishing a Markdown file as a post

Upload a finished `.md` file (from Typora, Obsidian, …) straight into `src/content/blog/`: on GitHub, open that folder and choose **Add file → Upload files**. No front matter is needed. Before each build, `scripts/frontmatter.mjs` adds what is missing:

- `title`: the first `# Heading` (removed from the body when it opens the file), otherwise the file name
- `pubDatetime`: an existing `date` / `created` property, otherwise the time the file was committed

The deploy workflow commits these additions back, so the date stays fixed; edit them later in the admin panel if you like. Images referenced by local paths (`![](./img.png)`, Obsidian `![[img.png]]`) are not uploaded with the file: upload them to `public/images/` and link them as `/images/img.png`.

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
pdf: /files/my-paper.pdf # a file in public/files/, or a URL such as https://arxiv.org/abs/xxxx.xxxxx
---

Optional abstract. If there is text here the title links to its own page.
```

## Adding a portfolio project

Create `src/content/portfolio/my-project.md`:

```md
---
title: Project name
description: One-line summary shown in the list
pubDatetime: 2026-01-01T00:00:00Z
link: https://github.com/phyjhh/my-project
image: /images/my-project.png
draft: false
---

Optional details. With text here the project gets its own page; without it the title links to `link`.
```

## Commands

```bash
pnpm install
pnpm dev          # local preview at http://localhost:4321
pnpm build        # type-check and build into dist/
pnpm lint && pnpm format:check
```
