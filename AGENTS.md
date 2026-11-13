# 给 agent 的发布规范 · Publishing guide for agents

这个仓库是 <https://phyjhh.github.io/> 的源码。人和 agent 一起完成的文章、论文、项目，按本文的约定提交，就能自动检查并上线。

This repository builds https://phyjhh.github.io/. Follow this guide to publish posts, publications and projects; content-only pull requests are checked and merged automatically.

## 怎么发布

1. 从最新的 `main` 新建分支，命名为 `agent/<简短主题>`，例如 `agent/kitaev-chain-notes`。
2. 只新增或修改下面「内容目录」里的文件，提交。
3. 开 Pull Request，目标分支 `main`。
4. CI 会构建网站并检查内容（见「发布前检查」）。全部通过，并且 PR **只新增或修改了内容目录里的文件**，就会自动合并、自动部署，`agent/` 分支随后删除。
5. 其它情况都不会自动合并，要等仓库主人处理：改了代码、样式、工作流、后台配置、`src/data/profile.json`，或者删除、重命名了文件，或者 PR 是草稿。

不要直接推送到 `main`。

## 内容目录

| 内容            | 位置                                   | 格式规则                           |
| --------------- | -------------------------------------- | ---------------------------------- |
| 博客文章 / 笔记 | `src/content/blog/<文件名>.md`         | `schemas/blog.schema.json`         |
| 论文            | `src/content/publications/<文件名>.md` | `schemas/publications.schema.json` |
| 项目            | `src/content/portfolio/<文件名>.md`    | `schemas/portfolio.schema.json`    |
| 图片            | `public/images/<文件名>`               | 引用为 `/images/<文件名>`          |
| PDF 与其它附件  | `public/files/<文件名>`                | 引用为 `/files/<文件名>`           |

文件名用小写英文、数字和连字符最稳妥，例如 `2026-11-13-kitaev-chain.md`。文件名决定网址：`/blog/2026-11-13-kitaev-chain/`。

**更新已有文章**：修改原文件，不要另建新文件，否则会出现两篇。改的时候把 `modDatetime` 设为当前时间。

## 博客文章的格式信息（front matter）

```md
---
title: Kitaev 链中的 Majorana 零模
pubDatetime: 2026-11-13T09:00:00Z
modDatetime: 2026-11-14T10:00:00Z # 可选，更新时填
description: 一句话摘要，显示在文章列表里 # 可选
tags: [拓扑超导, Majorana] # 可选
attachments: # 可选，显示在文末
  - file: /files/kitaev-slides.pdf
    label: 报告幻灯片 # 可选，默认用文件名
    show: true # PDF 是否直接显示在页面上，默认 true
draft: false # true 则不上线
---

正文……
```

- 必填：`title`，`pubDatetime`（ISO 8601，带 `Z` 的 UTC 时间）。
- 论文必填 `title`、`journal`、`pubDatetime`；可选 `authors`、`doi`、`pdf`（`/files/...` 或完整网址）、`citation`、`description`。
- 项目必填 `title`、`pubDatetime`；可选 `description`、`link`、`image`、`tags`。
- 未知字段会被忽略。缺 `title` 或 `pubDatetime` 的博客文章会在构建时自动补上（标题取第一个 `# 标题`），但 agent 应自己写全。

## 正文写法

- Markdown（CommonMark + GFM 表格）。中文标点旁的 `**加粗**` 可以正常使用。
- 公式由 KaTeX 渲染：行内 `$...$`，独立公式 `$$...$$`。只能用 KaTeX 支持的命令（<https://katex.org/docs/supported>）；不支持的命令会让检查失败。
- 图片：先把文件放进 `public/images/`，再写 `![说明](/images/文件名.png)`。**不要**用相对路径（`./img.png`）或 Obsidian 的 `![[img.png]]`。
- 站内链接写成 `/blog/<文件名>/` 这样的绝对路径，链接目标必须存在。
- 写一个名为 `Table of contents` 的标题，会自动生成可折叠的目录。

## 发布前检查

CI 在每个 PR 上运行这些检查，本地也可以先跑一遍：

```bash
pnpm install
pnpm build              # 类型与格式信息检查，并构建网站
pnpm check:content      # 内容检查，见下
pnpm schemas --check    # schemas/ 是否与 src/content.config.ts 一致
```

`pnpm check:content` 会让 PR 失败的情况：

- 公式无法渲染，或用了 KaTeX 不认识的命令
- 站内链接、图片、附件指向不存在的文件
- 本地图片路径或 Obsidian 嵌入
- 手机号、身份证号、各类 API 密钥或私钥，以及网站上没有公开过的邮箱地址
- 单个上传文件超过 25 MB

只给警告、不阻止合并：正文里留下的 TODO、FIXME、待补；超过 10 MB 的文件。

**隐私**：发布前确认正文里没有对话记录中的私人信息、未公开的数据或他人的联系方式。检查只能发现一部分。

## 来源

提交信息里请写明协作的模型或 agent，例如在末尾加一行 `Co-Authored-By: <agent 名称> <联系方式>`，方便以后追溯。
