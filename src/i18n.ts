/** A piece of interface text in both languages. */
export type Bi = { zh: string; en: string };

/** Interface strings. Your own writing (posts, papers) is never translated. */
export const UI = {
  home: { zh: "主页", en: "Home" },
  blog: { zh: "博客", en: "Blog" },
  publications: { zh: "论文", en: "Publications" },
  cv: { zh: "简历", en: "CV" },
  recentPosts: { zh: "最近文章", en: "Recent posts" },
  allPosts: { zh: "全部文章 →", en: "All posts →" },
  noPosts: { zh: "还没有文章。", en: "No posts yet." },
  noPublications: { zh: "暂无论文。", en: "No publications yet." },
  updated: { zh: "更新于", en: "Updated" },
  downloadCv: { zh: "下载 PDF 版简历", en: "Download CV (PDF)" },
  notFound: { zh: "页面不存在", en: "Page not found" },
  notFoundHint: { zh: "回到主页 →", en: "Go to the home page →" },
  switchLang: { zh: "EN", en: "中文" },
} satisfies Record<string, Bi>;
