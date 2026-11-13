import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import remarkMath from "remark-math";
import remarkCjkFriendly from "remark-cjk-friendly";
import rehypeKatex from "rehype-katex";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    // Old /notes/ links only redirect, so keep them out of the sitemap.
    sitemap({ filter: page => !page.includes("/notes/") }),
  ],
  markdown: {
    remarkPlugins: [
      // Lets **bold** work next to Chinese punctuation, e.g. **模型：**如何
      remarkCjkFriendly,
      remarkMath,
      remarkToc,
      [remarkCollapse, { test: "Table of contents" }],
    ],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      wrap: false,
    },
  },
});
