#!/usr/bin/env node
/**
 * Keeps schemas/*.schema.json (front matter rules for agents and editors) in
 * step with src/content.config.ts. Astro writes them to .astro/collections/
 * during `astro sync` / `pnpm build`.
 *
 *   node scripts/schemas.mjs          copy them into schemas/
 *   node scripts/schemas.mjs --check  fail if schemas/ is out of date
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FROM = ".astro/collections";
const TO = "schemas";
const check = process.argv.includes("--check");

if (!existsSync(FROM)) {
  process.stderr.write(`${FROM} not found: run \`pnpm build\` (or \`pnpm astro sync\`) first.\n`);
  process.exit(2);
}

mkdirSync(TO, { recursive: true });
const stale = [];
for (const name of readdirSync(FROM).filter(n => n.endsWith(".schema.json"))) {
  const fresh = `${JSON.stringify(JSON.parse(readFileSync(join(FROM, name), "utf8")), null, 2)}\n`;
  const target = join(TO, name);
  const current = existsSync(target) ? readFileSync(target, "utf8") : "";
  if (current === fresh) continue;
  if (check) stale.push(target);
  else writeFileSync(target, fresh);
}

if (stale.length > 0) {
  process.stderr.write(
    `Out of date (run \`node scripts/schemas.mjs\` and commit):\n${stale.map(s => `  ${s}\n`).join("")}`
  );
  process.exit(1);
}
process.stdout.write(check ? "Schemas are up to date.\n" : `Schemas written to ${TO}/.\n`);
