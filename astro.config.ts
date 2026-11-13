import type { AstroIntegration } from "astro";
import { defineConfig } from "astro/config";
import { cpSync, createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import remarkMath from "remark-math";
import remarkCjkFriendly from "remark-cjk-friendly";
import rehypeKatex from "rehype-katex";
import { SITE } from "./src/config";

/**
 * pdf.js needs its character maps (for Chinese and other CJK PDFs), standard
 * fonts and image decoders at run time. Serve them from /pdfjs/ on this site
 * instead of a CDN: copied into the build, and read from node_modules in dev.
 */
function pdfjsAssets(): AstroIntegration {
  const root = fileURLToPath(
    new URL("node_modules/pdfjs-dist/", import.meta.url)
  );
  const folders = ["cmaps", "standard_fonts", "wasm", "iccs"];
  const types: Record<string, string> = {
    ".wasm": "application/wasm",
    ".js": "text/javascript",
  };
  return {
    name: "pdfjs-assets",
    hooks: {
      "astro:server:setup": ({ server }) => {
        server.middlewares.use((req, res, next) => {
          const url = (req.url ?? "").split("?")[0];
          if (!url.startsWith("/pdfjs/")) return next();
          const file = normalize(join(root, url.slice("/pdfjs/".length)));
          if (
            !file.startsWith(root) ||
            !existsSync(file) ||
            !statSync(file).isFile()
          ) {
            return next();
          }
          res.setHeader(
            "Content-Type",
            types[extname(file)] ?? "application/octet-stream"
          );
          createReadStream(file).pipe(res);
        });
      },
      "astro:build:done": ({ dir }) => {
        for (const folder of folders) {
          cpSync(
            join(root, folder),
            fileURLToPath(new URL(`pdfjs/${folder}/`, dir)),
            {
              recursive: true,
            }
          );
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    // Old /notes/ links only redirect, so keep them out of the sitemap.
    sitemap({ filter: page => !page.includes("/notes/") }),
    pdfjsAssets(),
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
