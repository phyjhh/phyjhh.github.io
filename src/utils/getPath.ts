import { slugifyStr } from "./slugify";

/**
 * Get full path of a blog post
 * @param id - id of the blog post (aka slug)
 * @param filePath - the blog post full file location
 * @param includeBase - whether to include base path in return value
 * @param basePath - the base path prefix (e.g., "/posts", "/notes", "/publications")
 * @returns blog post path
 */
export function getPath(
  id: string,
  filePath: string | undefined,
  includeBase = true,
  basePath = "/posts"
) {
  const CONTENT_PATH = "src/content";
  
  const pathSegments = filePath
    ?.replace(CONTENT_PATH, "")
    .split("/")
    .filter(path => path !== "") // remove empty string in the segments
    .filter(path => !path.startsWith("_")) // exclude directories start with underscore
    .slice(1, -1) // remove collection name (first) and filename (last)
    .map(segment => slugifyStr(segment));

  const base = includeBase ? basePath : "";

  // Making sure `id` does not contain the directory
  const blogId = id.split("/");
  const slug = blogId.length > 0 ? blogId.slice(-1) : blogId;

  // If not inside the sub-dir, simply return the file path
  if (!pathSegments || pathSegments.length < 1) {
    return [base, slug].join("/");
  }

  return [base, ...pathSegments, slug].join("/");
}
