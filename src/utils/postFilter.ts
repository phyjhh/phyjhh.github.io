import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";

type PostEntry = CollectionEntry<"blog"> | CollectionEntry<"notes"> | CollectionEntry<"publications">;

const postFilter = ({ data }: PostEntry) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default postFilter;
