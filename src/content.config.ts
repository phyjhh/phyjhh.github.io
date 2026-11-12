import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDatetime: z.coerce.date(),
    modDatetime: z.coerce.date().optional().nullable(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    /** e.g. "A. Author, B. Author, phyj" */
    authors: z.string().optional(),
    journal: z.string(),
    pubDatetime: z.coerce.date(),
    doi: z.string().url().optional(),
    /** Link to a PDF or arXiv page. */
    pdf: z.string().url().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, publications };
