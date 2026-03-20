import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";

type PostEntry =
  | CollectionEntry<"blog">
  | CollectionEntry<"notes">
  | CollectionEntry<"publications">;

const getBasePath = (collection: PostEntry["collection"]) => {
  if (collection === "blog") return "/posts";
  if (collection === "notes") return "/notes";
  return "/publications";
};

export default function getPath(post: PostEntry, includeBase = true) {
  const slug = post.id.split("/").pop() ?? "";
  const base = includeBase ? getBasePath(post.collection) : "";
  return `${base}${base ? "/" : ""}${slugifyStr(slug)}`;
}
