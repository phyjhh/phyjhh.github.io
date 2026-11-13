#!/usr/bin/env node
/**
 * Lets a plain Markdown file become a blog post.
 *
 * Upload `My note.md` (from Typora, Obsidian, ...) into src/content/blog/
 * without any front matter, and this script, run before every build, adds
 * what the site needs:
 *
 *   title       the first `# Heading` (removed from the body when it opens
 *               the file, so it isn't shown twice), else the file name
 *   pubDatetime an existing `date` / `created` property, else the time the
 *               file was committed, else now
 *
 * Front matter that is already there is kept as written; only missing keys
 * are added, and comma-separated `tags: a, b` become a list. Files that
 * already have a title and a date are left untouched.
 *
 * Usage: node scripts/frontmatter.mjs [folder]   (default: src/content/blog)
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { parse } from "yaml";

const folder = process.argv[2] ?? "src/content/blog";

/** All .md files below the folder, skipping _drafts-style names. */
function markdownFiles(dir) {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return markdownFiles(path);
    return extname(name) === ".md" && !name.startsWith("_") ? [path] : [];
  });
}

/** Split "---\nyaml\n---\nbody" into its parts; no front matter -> null. */
function split(text) {
  const m = text.match(/^---[ \t]*\n([\s\S]*?)\n---[ \t]*(?:\n|$)/);
  return m
    ? { yaml: m[1], body: text.slice(m[0].length) }
    : { yaml: null, body: text };
}

/** The first level-1 heading, and the body without it if it opens the file. */
function firstHeading(body) {
  const atx = /^#[ \t]+(.+?)[ \t#]*$/m;
  const setext = /^(?!\s*$)([^\n]+)\n=+[ \t]*$/m;
  const lead = body.match(/^\s*/)[0].length;
  for (const re of [atx, setext]) {
    const m = body.match(re);
    if (!m) continue;
    const title = m[1].trim();
    const opensFile = m.index === lead;
    const rest = opensFile
      ? body.slice(m.index + m[0].length).replace(/^\s*\n/, "")
      : body;
    return { title, body: rest };
  }
  return null;
}

/** When git last committed the file (ISO, UTC), or null outside git. */
function commitTime(path) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", path], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out ? new Date(out) : null;
  } catch {
    return null;
  }
}

const iso = date => date.toISOString().replace(/\.\d{3}Z$/, "Z");
const quote = s => JSON.stringify(s);

const changed = [];

for (const path of markdownFiles(folder)) {
  const original = readFileSync(path, "utf8").replace(/^﻿/, "");
  const text = original.replace(/\r\n?/g, "\n");
  const { yaml, body } = split(text);

  let data = {};
  if (yaml !== null) {
    try {
      data = parse(yaml) ?? {};
    } catch {
      // Unreadable front matter: leave the file for the build to report.
      continue;
    }
  }

  const add = [];
  let newBody = body;

  if (!data.title) {
    const heading = firstHeading(body);
    if (heading) newBody = heading.body;
    const title = heading?.title ?? basename(path, ".md").trim();
    add.push(`title: ${quote(title)}`);
  }

  if (!data.pubDatetime) {
    const given = data.date ?? data.created;
    const parsed = given ? new Date(given) : null;
    const when =
      parsed && !Number.isNaN(parsed.getTime())
        ? parsed
        : (commitTime(path) ?? new Date());
    add.push(`pubDatetime: ${iso(when)}`);
  }

  let yamlText = yaml;
  if (typeof data.tags === "string") {
    // Read the raw line: in YAML "tags: a, #b" would lose "#b" as a comment.
    const raw = yaml.match(/^tags:[ \t]*(.*)$/m)?.[1] ?? data.tags;
    const tags = raw
      .split(/[,，]/)
      .map(t => t.trim().replace(/^#/, ""))
      .filter(Boolean);
    yamlText = yamlText.replace(
      /^tags:.*$/m,
      `tags: [${tags.map(quote).join(", ")}]`
    );
  }

  if (add.length === 0 && yamlText === yaml) continue;

  const head = [...add, ...(yamlText ? [yamlText] : [])].join("\n");
  writeFileSync(path, `---\n${head}\n---\n${newBody}`);
  changed.push(path);
}

if (changed.length > 0) {
  process.stdout.write(
    `Added front matter to ${changed.length} file(s):\n` +
      changed.map(p => `  ${p}\n`).join("")
  );
}
