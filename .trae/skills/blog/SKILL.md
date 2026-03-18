---
name: "blog"
description: "根据本地文件自动上传到 GitHub 仓库的对应分类文件夹。当用户发出 '使用blog推送 比如,1.md' 相关命令时触发。"
---

# Blog 推送技能

## 功能

该技能可以：
1. 分析本地 Markdown 文件的路径和内容
2. 根据文件路径或内容自动判断分类（blog、notes、publications）
3. 自动上传文件到 GitHub 仓库 `https://github.com/phyjhh/phyjhh.github.io` 的对应分类文件夹
4. 支持将文件上传到 `src/content/` 下的对应分类目录

## 使用方法

### 基本语法
```
使用blog推送 [文件路径]
```

### 示例

#### 示例 1：推送 notes 文件夹下的文件
```
使用blog推送 notes/1.md
```
- 分析：文件位于 `notes/` 目录下
- 操作：上传到 `src/content/notes/1.md`

#### 示例 2：推送根目录下的文件
```
使用blog推送 2024-01-01-my-post.md
```
- 分析：根据文件内容判断分类
- 操作：上传到对应分类的文件夹

## 分类判断逻辑

1. **基于路径判断**（优先级最高）：
   - 如果文件路径包含 `notes/` → 分类为 `notes`
   - 如果文件路径包含 `publications/` → 分类为 `publications`
   - 其他情况 → 分类为 `posts`

2. **基于内容判断**（路径判断失败时）：
   - 检查文件是否包含 `journal:` 字段 → 分类为 `publications`
   - 检查文件是否包含 `doi:` 字段 → 分类为 `publications`
   - 其他情况 → 分类为 `posts`

## 技术实现

1. 读取本地文件内容
2. 分析文件路径和内容确定分类
3. 构建 GitHub API 请求
4. 上传文件到对应分类文件夹
5. 返回上传结果

## 注意事项

- 文件必须是 Markdown 格式（.md 文件）
- 文件内容需要包含基本的 frontmatter 信息
- 上传前会自动检查文件是否存在
- 支持覆盖已存在的文件

## 错误处理

- 如果文件不存在：返回错误信息
- 如果 GitHub API 调用失败：返回错误信息
- 如果分类无法确定：默认分类为 `posts`