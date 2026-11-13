#!/usr/bin/env node
/**
 * Checks run before content goes live (CI on every pull request).
 * Run after `pnpm build`, since some checks read the built site in dist/.
 *
 * Errors (fail the check):
 *   - a formula KaTeX could not render, or an unknown LaTeX command in one
 *   - a link, image or attachment on the site pointing at a missing file
 *   - a local image reference in Markdown (./img.png, ![[img.png]])
 *   - personal data or secrets: phone / ID numbers, API keys, private keys,
 *     e-mail addresses other than the ones already public on the site
 *   - an uploaded file over 25 MB
 * Warnings (reported, don't fail): TODO / FIXME / 待补 left in a post,
 * uploaded files over 10 MB.
 *
 * Usage: node scripts/check-content.mjs
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const DIST = "dist";
const CONTENT = "src/content";
const UPLOADS = ["public/images", "public/files"];
const MB = 1024 * 1024;

const errors = [];
const warnings = [];
const inCI = Boolean(process.env.GITHUB_ACTIONS);

function report(list, level, file, line, message) {
  list.push({ file, line, message });
  if (inCI) {
    const where = line ? `file=${file},line=${line}` : `file=${file}`;
    process.stdout.write(`::${level} ${where}::${message}\n`);
  }
}
const error = (file, line, msg) => report(errors, "error", file, line, msg);
const warn = (file, line, msg) => report(warnings, "warning", file, line, msg);

function walk(dir, keep) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory()
      ? walk(path, keep)
      : keep(path)
        ? [path]
        : [];
  });
}

const lineOf = (text, index) => text.slice(0, index).split("\n").length;

// ---------------------------------------------------------------------------
// 1. The built site: formulas and internal links.
// ---------------------------------------------------------------------------
if (!existsSync(DIST)) {
  process.stderr.write("dist/ not found: run `pnpm build` first.\n");
  process.exit(2);
}

/** Does a site path like /blog/x/ or /files/a%20b.pdf exist in dist/? */
function existsOnSite(url) {
  let path = url.split(/[?#]/)[0];
  try {
    path = decodeURIComponent(path);
  } catch {
    return false;
  }
  const local = join(DIST, path);
  return (
    (existsSync(local) && statSync(local).isFile()) ||
    existsSync(join(local, "index.html")) ||
    existsSync(`${local}.html`)
  );
}

for (const page of walk(DIST, p => p.endsWith(".html"))) {
  const html = readFileSync(page, "utf8");
  const where = relative(DIST, page);

  for (const m of html.matchAll(/class="katex-error"[^>]*title="([^"]*)"/g)) {
    error(where, 0, `Formula could not be rendered: ${m[1]}`);
  }
  // KaTeX shows an unknown command (e.g. \badcommand) in red inside an
  // otherwise rendered formula instead of failing the whole formula.
  const unknown = new Set(
    [...html.matchAll(/<mstyle mathcolor="#cc0000"><mtext>([^<]+)<\/mtext>/g)].map(
      m => m[1]
    )
  );
  for (const cmd of unknown) {
    error(where, 0, `Unknown LaTeX command in a formula: ${cmd}`);
  }

  const seen = new Set();
  for (const m of html.matchAll(/\s(?:href|src|data-src)="(\/[^"/][^"]*)"/g)) {
    const url = m[1].replace(/&amp;/g, "&");
    if (seen.has(url) || url.startsWith("/_astro/")) continue;
    seen.add(url);
    if (!existsOnSite(url)) error(where, 0, `Link to a missing file: ${url}`);
  }
}

// ---------------------------------------------------------------------------
// 2. Markdown sources: local images, personal data, leftovers.
// ---------------------------------------------------------------------------
const profile = JSON.parse(readFileSync("src/data/profile.json", "utf8"));
const publicEmails = new Set(
  JSON.stringify(profile)
    .match(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g)
    ?.map(e => e.toLowerCase()) ?? []
);
const exampleDomain = /@(example\.(com|org|net)|users\.noreply\.github\.com)$/i;

const patterns = [
  [/(?<![\d.])1[3-9]\d{9}(?![\d.])/g, "Looks like a phone number"],
  [/(?<!\d)\d{17}[\dXx](?!\d)/g, "Looks like an ID card number"],
  [/\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}/g, "GitHub token"],
  [/\bgithub_pat_[A-Za-z0-9_]{30,}/g, "GitHub token"],
  [/\bsk-[A-Za-z0-9_-]{20,}/g, "API key"],
  [/\bAKIA[0-9A-Z]{16}\b/g, "AWS access key"],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/g, "Private key"],
];

for (const file of walk(CONTENT, p => /\.(md|mdx)$/.test(p))) {
  const text = readFileSync(file, "utf8");

  for (const m of text.matchAll(/!\[\[([^\]]+)\]\]/g)) {
    error(
      file,
      lineOf(text, m.index),
      `Obsidian embed ![[${m[1]}]] won't show on the site. Upload the image to public/images/ and link it as ![](/images/${m[1]})`
    );
  }
  for (const m of text.matchAll(/!\[[^\]]*\]\(\s*<?([^)\s>]+)/g)) {
    const src = m[1];
    if (/^(https?:|\/|data:|#)/.test(src)) continue;
    error(
      file,
      lineOf(text, m.index),
      `Local image path "${src}" won't work on the site. Upload it to public/images/ and link it as /images/<name>`
    );
  }
  for (const m of text.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    if (/^(https?:|\/|data:)/.test(m[1])) continue;
    error(file, lineOf(text, m.index), `Local image path "${m[1]}" won't work on the site`);
  }

  for (const [re, label] of patterns) {
    for (const m of text.matchAll(re)) {
      error(file, lineOf(text, m.index), `${label}: remove it before publishing`);
    }
  }
  for (const m of text.matchAll(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g)) {
    const email = m[0].toLowerCase();
    if (publicEmails.has(email) || exampleDomain.test(email)) continue;
    error(
      file,
      lineOf(text, m.index),
      `E-mail address ${m[0]} isn't one already public on the site`
    );
  }

  for (const m of text.matchAll(/\b(TODO|FIXME|TBD)\b|待补|待完善/g)) {
    warn(file, lineOf(text, m.index), `"${m[0]}" left in the text`);
  }
}

// ---------------------------------------------------------------------------
// 3. Uploaded files: size.
// ---------------------------------------------------------------------------
for (const file of UPLOADS.flatMap(dir => walk(dir, () => true))) {
  const size = statSync(file).size;
  const human = `${(size / MB).toFixed(1)} MB`;
  if (size > 25 * MB) error(file, 0, `File is ${human}; the limit is 25 MB`);
  else if (size > 10 * MB && extname(file) !== ".pdf") {
    warn(file, 0, `File is ${human}; consider compressing it`);
  } else if (size > 10 * MB) warn(file, 0, `PDF is ${human}; it may load slowly`);
}

// ---------------------------------------------------------------------------
const show = (list, label) =>
  list
    .map(
      ({ file, line, message }) =>
        `  ${label} ${file}${line ? `:${line}` : ""}  ${message}\n`
    )
    .join("");

process.stdout.write(show(warnings, "warning") + show(errors, "error"));
process.stdout.write(
  `Content check: ${errors.length} error(s), ${warnings.length} warning(s)\n`
);
process.exit(errors.length > 0 ? 1 : 0);
