import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/** Treat `field: ""` (or `~`) in frontmatter the same as leaving the field out. */
const optional = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(
    v => (v === "" || v === null ? undefined : v),
    schema.optional()
  );

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: optional(z.string()),
    pubDatetime: z.coerce.date(),
    modDatetime: optional(z.coerce.date()),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    /** e.g. "A. Author, B. Author, phyj" */
    authors: optional(z.string()),
    journal: z.string(),
    pubDatetime: z.coerce.date(),
    doi: optional(z.string().url()),
    /** Link to a PDF or arXiv page. */
    pdf: optional(z.string().url()),
    /** Shown as "Recommended citation"; generated from the fields when empty. */
    citation: optional(z.string()),
    description: optional(z.string()),
    draft: z.boolean().default(false),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/portfolio" }),
  schema: z.object({
    title: z.string(),
    description: optional(z.string()),
    pubDatetime: z.coerce.date(),
    /** External project page, e.g. a GitHub repository. */
    link: optional(z.string().url()),
    /** Teaser image path, e.g. /images/project.png */
    image: optional(z.string()),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, publications, portfolio };
