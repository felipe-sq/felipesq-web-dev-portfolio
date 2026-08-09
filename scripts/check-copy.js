// Fails the build when user-facing copy drifts back toward reading as
// machine-written. The rules it enforces live in ~/ai-os/context/voice.md; this
// script is the mechanical half of them, so the two are meant to be kept in step.
//
// The rules were promoted out of felipesq-master-context.md §13a during the ai-os
// consolidation, because the tell travels with the writing rather than with one
// website. voice.md is the source now; §13a no longer exists.
//
// Two things are checked, over two different kinds of source:
//
//   1. data/projects.js is require()d and walked, so every card description and
//      case-study paragraph is inspected as an exact string. That is the bulk of
//      the site's prose and the place drift showed up first.
//   2. The page and component files are read as text with comments stripped.
//      Comments are not user-facing, and holding them to prose rules would only
//      teach people to phrase code notes oddly.
//
// This file is deliberately not in the scanned set. It contains the banned-word
// list, so scanning it would fail on every run.

const fs = require("fs");
const path = require("path");

const { projects } = require("../data/projects");

// Files carrying prose a visitor actually reads: page copy and SEO metadata.
const PROSE_FILES = [
  "pages/index.js",
  "pages/projects.js",
  "pages/projects/[id].js",
  "components/Footer.js",
  "components/Nav.js",
  "site.config.js",
];

// Density, not presence, is what reads as generated. Zero is the current state
// and the easiest line to hold; raise this if a dash is genuinely the right mark
// somewhere, and say where in a comment rather than letting the number creep.
const MAX_EM_DASHES = 0;

// From voice.md. Each entry is [label, regex]. Kept as word-boundary matches so
// "landscape" fires and "landscapes.png" does not.
const BANNED = [
  [
    "buzzword",
    /\b(delve|leverage|seamless|robust|landscape|realm|tapestry|showcase|boasts|underscore|testament|crucial|vital|elevate|unlock|harness)\b/i,
  ],
  ["antithesis", /\bnot (just|merely|only)\b[^.!?]*?,\s*(it'?s|it is|but)\b/i],
  ["filler transition", /\b(Moreover|Furthermore|Additionally|That said),/i],
  ["rhetorical question", /\bThe result\?/i],
  // Sentence-initial only, and case-sensitive on "In". The tell is the opener
  // "In today's world…"; "lands in today's column" is ordinary English.
  //
  // The apostrophe has four spellings across these files: straight in the data,
  // curly when typed, and &apos; or &#39; once it reaches JSX. Matching only the
  // straight one silently passes the other three.
  // `^\s*` rather than `^`: the page files are scanned a line at a time and
  // every line of JSX prose is indented, so a bare `^` never matches there.
  [
    "dated opener",
    /(^\s*|[.!?]\s+)In (today(['’]|&apos;|&#39;)?s|the modern)\b/u,
  ],
];

const findings = [];

function inspect(where, text) {
  for (const [label, pattern] of BANNED) {
    const hit = text.match(pattern);
    if (hit) findings.push({ where, label, detail: hit[0] });
  }
}

// ── 1. The project data, walked as structured strings ────────────────────
let emDashes = 0;
let stringCount = 0;

const walk = (where, value) => {
  if (typeof value !== "string") return;
  stringCount += 1;
  const dashes = (value.match(/—/gu) || []).length;
  if (dashes) {
    emDashes += dashes;
    findings.push({
      where,
      label: "em-dash",
      detail: `${dashes} in "${value.slice(0, 60)}…"`,
    });
  }
  inspect(where, value);
};

for (const project of projects) {
  walk(`${project.id}.description`, project.description);
  if (!project.caseStudy) continue;
  for (const [section, value] of Object.entries(project.caseStudy)) {
    [].concat(value).forEach((paragraph, index) => {
      walk(`${project.id}.${section}[${index}]`, paragraph);
    });
  }
}

// ── 2. The page files, read as text with comments removed ────────────────
// Block comments first, then line comments. Neither is user-facing, and a URL
// containing '//' is not something these files carry outside a string.
const stripComments = (source) =>
  source.replace(/\/\*[\s\S]*?\*\//gu, "").replace(/^\s*\/\/.*$/gmu, "");

for (const file of PROSE_FILES) {
  const full = path.join(__dirname, "..", file);
  if (!fs.existsSync(full)) continue;

  const lines = stripComments(fs.readFileSync(full, "utf8")).split("\n");
  lines.forEach((line, index) => {
    const dashes = (line.match(/—/gu) || []).length;
    if (dashes) {
      emDashes += dashes;
      findings.push({
        where: `${file}:${index + 1}`,
        label: "em-dash",
        detail: line.trim().slice(0, 70),
      });
    }
    inspect(`${file}:${index + 1}`, line);
  });
}

// ── Report ───────────────────────────────────────────────────────────────
const overBudget = emDashes > MAX_EM_DASHES;
const banned = findings.filter((f) => f.label !== "em-dash");

if (!overBudget && banned.length === 0) {
  console.log(
    `check-copy: clean. ${emDashes} em-dashes across ${stringCount} project strings and ${PROSE_FILES.length} prose files.`,
  );
  process.exit(0);
}

console.error("check-copy: user-facing copy needs attention.\n");

if (overBudget) {
  console.error(`  ${emDashes} em-dashes found, budget is ${MAX_EM_DASHES}.`);
  console.error(
    "  Pick the mark the sentence wants rather than one substitute everywhere:",
  );
  console.error("    a colon when the second half explains the first");
  console.error("    parentheses for an aside the sentence survives without");
  console.error("    a full stop when the clause stands alone");
  console.error("    a comma for a short appositive\n");
  for (const f of findings.filter((x) => x.label === "em-dash")) {
    console.error(`    ${f.where}: ${f.detail}`);
  }
  console.error("");
}

for (const f of banned) {
  console.error(`  ${f.label} at ${f.where}: "${f.detail}"`);
}

console.error(
  "\n  Rules and rationale: ~/ai-os/context/voice.md",
);
process.exit(1);
