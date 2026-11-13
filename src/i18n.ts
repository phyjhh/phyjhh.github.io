/** A piece of interface text in both languages. */
export type Bi = { zh: string; en: string };

/** Interface strings. Your own writing (posts, papers) is never translated. */
export const UI = {
  about: { zh: "关于", en: "About" },
  aboutMe: { zh: "关于我", en: "About me" },
  blog: { zh: "博客", en: "Blog Posts" },
  publications: { zh: "论文", en: "Publications" },
  portfolio: { zh: "项目", en: "Portfolio" },
  cv: { zh: "简历", en: "CV" },
  menu: { zh: "菜单", en: "Menu" },
  follow: { zh: "关注", en: "Follow" },
  researchInterests: { zh: "研究兴趣", en: "Research Interests" },
  recentPosts: { zh: "最近文章", en: "Recent Posts" },
  selectedPublications: { zh: "论文", en: "Publications" },
  allPosts: { zh: "全部文章 →", en: "All posts →" },
  allPublications: { zh: "全部论文 →", en: "All publications →" },
  noPosts: { zh: "还没有文章。", en: "No posts yet." },
  noPublications: { zh: "暂无论文。", en: "No publications yet." },
  noPortfolio: { zh: "暂无项目。", en: "No projects yet." },
  publishedIn: { zh: "发表于", en: "Published in" },
  published: { zh: "发布于：", en: "Published:" },
  updated: { zh: "更新于", en: "Updated:" },
  tags: { zh: "标签：", en: "Tags:" },
  attachments: { zh: "附件", en: "Attachments" },
  pdfLoading: { zh: "加载中…", en: "Loading…" },
  openPdf: { zh: "新窗口打开", en: "Open" },
  download: { zh: "下载", en: "Download" },
  citation: { zh: "推荐引用：", en: "Recommended citation:" },
  downloadPaper: { zh: "下载论文", en: "Download Paper" },
  projectPage: { zh: "项目主页", en: "Project page" },
  previous: { zh: "上一篇", en: "Previous" },
  projectLink: { zh: "项目链接", en: "Direct Link" },
  next: { zh: "下一篇", en: "Next" },
  downloadCv: { zh: "下载 PDF 版简历", en: "Download CV (PDF)" },
  notFound: { zh: "页面不存在", en: "Page not found" },
  notFoundHint: { zh: "回到主页 →", en: "Go to the home page →" },
  switchLang: { zh: "EN", en: "中文" },
  builtWith: {
    zh: "基于 Astro 构建，设计参考",
    en: "Built with Astro; design adapted from",
  },
} satisfies Record<string, Bi>;

/** "阅读约 3 分钟" / "3 minute read" */
export const readTime = (minutes: number): Bi => ({
  zh: `阅读约 ${minutes} 分钟`,
  en: minutes <= 1 ? "1 minute read" : `${minutes} minute read`,
});
