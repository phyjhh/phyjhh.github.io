import { getCollection, type CollectionEntry } from "astro:content";
import { SITE } from "@/config";

/** Posts dated a little in the future still go out with the build that is running. */
const MARGIN_MS = 15 * 60 * 1000;

const isPublished = (data: { draft: boolean; pubDatetime: Date }) =>
  !data.draft &&
  (import.meta.env.DEV || data.pubDatetime.getTime() <= Date.now() + MARGIN_MS);

const newestFirst = <T extends { data: { pubDatetime: Date } }>(a: T, b: T) =>
  b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime();

export async function getPosts() {
  const posts = await getCollection("blog", ({ data }) => isPublished(data));
  return posts.sort(newestFirst);
}

export async function getPublications() {
  const pubs = await getCollection("publications", ({ data }) =>
    isPublished(data)
  );
  return pubs.sort(newestFirst);
}

export async function getPortfolio() {
  const items = await getCollection("portfolio", ({ data }) =>
    isPublished(data)
  );
  return items.sort(newestFirst);
}

/** YYYY-MM-DD in the site's time zone. */
export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-CA", { timeZone: SITE.timezone });

export const yearOf = (date: Date) => formatDate(date).slice(0, 4);

/**
 * Reading time in minutes: ~400 Chinese characters or ~200 English words a
 * minute. Formulas and code are left out of the count.
 */
export function readingMinutes(markdown = "") {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\$\$[\s\S]*?\$\$/g, " ")
    .replace(/\$[^$\n]*\$/g, " ");
  const cjk = (text.match(/[\u3400-\u9fff\uf900-\ufaff]/g) ?? []).length;
  const words = text
    .replace(/[\u3400-\u9fff\uf900-\ufaff]/g, " ")
    .split(/\s+/)
    .filter(w => /[A-Za-z0-9]/.test(w)).length;
  return Math.max(1, Math.round(cjk / 400 + words / 200));
}

/** True when an entry has Markdown text worth its own page. */
export const hasBody = (entry: { body?: string }) =>
  Boolean(entry.body?.trim());

/** "Authors (2025). Title. Journal." when no citation was written. */
export const citationOf = ({ data }: CollectionEntry<"publications">) =>
  data.citation ??
  [
    data.authors ? `${data.authors} (${yearOf(data.pubDatetime)}).` : null,
    `"${data.title}."`,
    `${data.journal}${data.authors ? "" : `, ${yearOf(data.pubDatetime)}`}.`,
  ]
    .filter(Boolean)
    .join(" ");
