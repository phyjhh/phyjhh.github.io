import { getCollection } from "astro:content";
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

/** YYYY-MM-DD in the site's time zone. */
export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-CA", { timeZone: SITE.timezone });

export const yearOf = (date: Date) => formatDate(date).slice(0, 4);
