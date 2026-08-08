# Migration Summary

This document covers three phases of modernization work:

- **Phase 1** — React 18 + Next.js 16 + Chakra UI v2 + Emotion v11 migration.
- **Phase 2** — npm standardization, dead-dependency removal, and reaching
  **0 known vulnerabilities**. See
  [Phase 2](#phase-2-npm-standardization--dependency-cleanup) below, which
  supersedes Phase 1's "Remaining Vulnerabilities" and install instructions.
- **Phase 3** — fixed the four pre-existing bugs Phase 2 cataloged but left
  alone, then wired the real deployed origin through the codebase and repaired
  the PWA manifest — uncovering three further latent bugs along the way. See
  [Phase 3](#phase-3-pre-existing-bug-fixes), which supersedes Phase 2's
  "Known issues".

---

# Phase 1: React 18 + Next.js 16 + Chakra UI v2 + Emotion v11

## Overview

Completed comprehensive upgrade path from legacy stack to modern React/Next.js ecosystem, resolving ERESOLVE dependency conflicts and reducing npm vulnerabilities from 119 → 26 (78% reduction).

## Vulnerabilities Progress

| Phase                                     | Status         | Vulnerabilities | Change |
| ----------------------------------------- | -------------- | --------------- | ------ |
| Initial                                   | ERESOLVE error | 119             | —      |
| After core migration                      | Compiled       | 63              | -56    |
| After patch-package                       | Compiled       | 59              | -4     |
| After Firebase/Firebase-Admin             | Compiled       | 35              | -24    |
| After googleapis                          | Compiled       | 27              | -8     |
| After MDX v3.x + next-mdx-enhanced v2.5.0 | **Final**      | **26**          | -1     |

## Core Package Upgrades

### Framework Stack

- **React**: 16.13.1 → **18.2.0**
- **React DOM**: 16.13.1 → **18.2.0**
- **Next.js**: 9.5.5 → **16.0.7** (Turbopack enabled by default)

### Styling & UI

- **Chakra UI**: 1.8.3 → **2.6.2**
  - Breaking changes: ThemeProvider/CSSReset/ColorModeProvider → ChakraProvider
  - Icon system: String names ("sun"/"moon") → Component imports (SunIcon/MoonIcon)
- **@emotion/core**: 10.x → Removed
- **@emotion/styled**: 10.x → Removed
- **emotion-theming**: 10.x → Removed
- **@emotion/react**: — → **11.11.0** (new)
- **@emotion/styled**: — → **11.11.0** (new)
- **framer-motion**: — → **7.0.0** (Chakra v2 Toast dependency)

### Security Upgrades

- **patch-package**: 6.2.2 → **8.0.1**
- **firebase**: 7.14.4 → **12.6.0**
- **firebase-admin**: 8.12.1 → **13.6.0**
- **googleapis**: 48.0.0 → **167.0.0**
- **@mdx-js/loader**: 1.5.8 → **3.1.1**
- **@mdx-js/react**: 1.5.8 → **3.0.0**
- **@next/mdx**: 9.4.1 → **16.0.7**
- **next-mdx-enhanced**: 2.5.0 (maintained to prevent additional vulnerabilities)

## Code Changes

### pages/\_app.js

**Change**: Migrated to Chakra v2 provider API and Emotion v11

```javascript
// Before
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { Global } from "@emotion/core";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider options={colorModeOptions}>
        <CSSReset />
        <Global styles={globalStyles} />
        {/* ... */}
      </ColorModeProvider>
    </ThemeProvider>
  );
}

// After
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Global } from "@emotion/react";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={colorModeOptions.initialColorMode} />
      <Global styles={globalStyles} />
      {/* ... */}
    </ChakraProvider>
  );
}
```

### components/Nav.js

**Change**: Updated icon usage from string names to component imports

```javascript
// Before
import { IconButton } from "@chakra-ui/react";
<IconButton icon="sun" onClick={toggleColorMode} />;

// After
import { IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
<IconButton
  icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
  onClick={toggleColorMode}
/>;
```

### styles/prism.js & styles/theme.js

**Change**: Updated imports for Emotion v11 and Chakra v2

```javascript
// Before
import { css } from "@emotion/core";
import { theme as chakraTheme } from "@chakra-ui/core";

// After
import { css } from "@emotion/react";
import { theme as chakraTheme } from "@chakra-ui/react";
```

### next.config.js

**Change**: Modernized for Next.js 16 + Turbopack

```javascript
// Added
turbopack: {},

// Removed (deprecated)
experimental: { modern: true }
```

### components/ProjectCard.js

**Change**: Added missing Heading import

```javascript
// Added to imports
import { Heading } from "@chakra-ui/react";
```

## Phase 1 outcome

All pages compiled and the production build succeeded, but the tree still
carried **26 known vulnerabilities**, and `npm install` required
`--legacy-peer-deps` because `next-seo@4.5.0` pinned `react@^16`. Both issues
were resolved in Phase 2.

---

# Phase 2: npm standardization + dependency cleanup

## Overview

Standardized the repo on npm, removed dead dependencies, and modernized the
tooling. Vulnerabilities went from **59 → 0** and the `--legacy-peer-deps`
workaround is no longer needed.

| Metric              | Before                            | After               |
| ------------------- | --------------------------------- | ------------------- |
| `npm audit`         | 59 (4 critical, 36 high)          | **0**               |
| Install flags       | `--legacy-peer-deps` required     | none                |
| Installed packages  | 700+                              | 425                 |
| Direct dependencies | 38 + 6 dev                        | 12 + 4 dev          |
| `npm run lint`      | crashed (no config found)         | passes (0 errors)   |
| Lockfiles           | `package-lock.json` + `yarn.lock` | `package-lock.json` |

## Package manager standardization

- Removed `yarn.lock`. `package-lock.json` is now the only lockfile.
- Added `"packageManager": "npm@11.11.1"` and `"engines": { "node": ">=20.9.0" }`.
- `npm test` previously shelled out to `yarn lint`; it now runs `npm run lint`.
- `npm ci` verified to install cleanly from the lockfile with no flags.

## Removed: dead MDX pipeline

`next.config.js` wired up `next-mdx-enhanced` with `layoutPath: "layouts"`, but
the repo contained **no `.mdx` files and no `layouts/` directory** — the entire
pipeline was inert. It was also the source of every critical finding.

Removed: `next-mdx-enhanced`, `mdx-prism`, `@mdx-js/loader`, `@mdx-js/react`,
`@next/mdx`, `@mapbox/rehype-prism`, `rehype`, `reading-time`,
`remark-autolink-headings`, `remark-capitalize`, `remark-code-titles`,
`remark-slug`, and `utils/title-style.js` (its only consumer).

This eliminated the critical `loader-utils` prototype pollution, the high
`prismjs` XSS/ReDoS findings, and the `cross-spawn` ReDoS chain.

## Removed: unused dependencies

Nothing in `pages/`, `components/`, `styles/`, or `scripts/` imported these:

`firebase`, `firebase-admin`, `googleapis`, `unsplash-js`, `swr`, `big.js`,
`comma-number`, `date-fns`, `react-tweet-embed`, `iframe-resizer-react`,
`start`, `babel-plugin-import-glob-array`, `patch-package`,
`postinstall-postinstall`, `globby`.

The `postinstall: patch-package` script was also dropped — there was no
`patches/` directory for it to apply.

## Upgrades

| Package           | From    | To      |
| ----------------- | ------- | ------- |
| next              | 16.0.7  | 16.3.0  |
| react / react-dom | 18.2.0  | 18.3.1  |
| @chakra-ui/react  | 2.10.9  | 2.10.10 |
| @chakra-ui/icons  | 2.0.x   | 2.2.4   |
| @emotion/react    | 11.11.0 | 11.14.0 |
| @emotion/styled   | 11.11.0 | 11.14.1 |
| framer-motion     | 7.10.3  | 12.43.0 |
| next-seo          | 4.5.0   | 6.8.0   |
| next-google-fonts | 1.1.0   | 2.2.0   |
| fathom-client     | 3.0.0   | 3.7.2   |
| sass              | 1.94.2  | 1.102.0 |
| eslint            | 6.8.0   | 9.39.5  |
| prettier          | 2.0.5   | 3.9.6   |
| lint-staged       | 10.1.2  | 17.3.0  |

## Compatibility fixes required by the upgrades

1. **`next-seo` v7 → pinned to v6.8.0.** v7 moved Pages Router support to
   `next-seo/pages` and replaced the `<NextSeo>` / `<DefaultSeo>` components
   with a `generateNextSeo()` / `generateDefaultSeo()` generator API. Adopting
   v7 would mean rewriting the SEO wiring in `_app.js` and `projects.js`.
   v6.8.0 keeps the component API byte-for-byte while still satisfying the
   React 18 / Next 16 peers, which is what removed the `--legacy-peer-deps`
   requirement.

2. **`next-google-fonts` default export removed in v2.** v2.2.0 exports only a
   named `GoogleFonts`, so `import GoogleFonts from "next-google-fonts"`
   resolved to the module object and threw React error #130 during
   prerendering. Fixed in `pages/_document.js`:
   `import { GoogleFonts } from "next-google-fonts";`

3. **Prettier 3 made `format()` async.** `scripts/generate-sitemap.js` called it
   synchronously; it now awaits the result.

4. **`globby` v12+ is ESM-only** and `generate-sitemap.js` is CommonJS. Replaced
   the glob with a small recursive `fs.readdirSync` walk that reproduces the
   original `pages/**/*{.js,.mdx}` pattern (excluding `pages/_*.js` and
   `pages/api`).

5. **ESLint 9 flat config.** The repo had **no ESLint config file at all**, so
   `npm run lint` had never worked. Added `eslint.config.mjs` extending
   `eslint-config-next/core-web-vitals`, replacing the abandoned
   `eslint-config-get-off-my-lawn` (which was installed but never referenced,
   and carried the high-severity `dot-prop` / `semver` / `tmp` findings). The
   `--ext` CLI flag no longer exists in flat config, so the script is now
   plain `eslint .`. Fixed 4 `react/no-unescaped-entities` errors in
   `pages/index.js` and `pages/404.js`.

## Intentionally held back

| Package           | Current | Latest | Why                                                                                                                                                 |
| ----------------- | ------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| @chakra-ui/react  | 2.10.10 | 3.36.1 | v3 is a breaking rewrite: `ChakraProvider`'s `theme` prop, `useColorMode`, and the styling system all change. Amounts to a redesign.                |
| react / react-dom | 18.3.1  | 19.2.8 | Chakra v2 is not officially tested against React 19. 18.3.1 is the terminal 18.x and is fully supported by Next 16. Tied to the Chakra v3 decision. |
| next-seo          | 6.8.0   | 7.3.0  | v7 requires migrating to the generator API (see above).                                                                                             |
| framer-motion     | 12.43.0 | 13.0.0 | Only present as a Chakra v2 peer; nothing imports it directly. v12 is the well-tested pairing.                                                      |
| eslint            | 9.39.5  | 10.8.1 | `eslint-config-next@16.3.0` bundles `typescript-eslint@8` and `eslint-plugin-react-hooks@7`, whose ESLint 10 support is not yet established.        |

## Repo hygiene

- `.next/` was **committed to git** (603 files). Removed from the index and
  added to `.gitignore`, along with `out/`, `.env*.local`, `.vercel`, and
  `.DS_Store`.
- Added `.prettierignore` so Prettier no longer rewrites build output or the
  legacy static site in `assets/` and `images/`.
- Dropped `git add` from the `lint-staged` config (unnecessary since
  lint-staged v10).

## Verification

```bash
npm ci          # clean install from lockfile, no flags → 0 vulnerabilities
npm audit       # found 0 vulnerabilities
npm run lint    # 0 errors, 1 advisory warning (next/image)
npm run build   # ✓ compiled; all 4 routes prerendered
npm start       # smoke-tested /, /projects, /404
```

Runtime smoke test confirmed against the production server: pages return
200/404 as expected, Emotion style blocks and the Chakra color-mode script are
present, and `DefaultSeo` emits title, description, robots, canonical, and
`og:*` tags.

## Known issues (pre-existing, not introduced here)

> **Superseded by [Phase 3](#phase-3-pre-existing-bug-fixes).** Items 1–4 are
> fixed; item 5 remains an open advisory. Kept here for the diagnosis.

1. **The Google Fonts `<link>` never reaches the document.** In
   `pages/_document.js`, `<GoogleFonts>` renders as a direct child of `<html>`
   rather than inside `<Head>`, so Next drops it. Verified against the
   previously committed build output — the Inter stylesheet was already absent
   before this work, so the site has been falling back to system fonts. Fixing
   it would visibly change typography, so it was left alone.
   `next-google-fonts` is also deprecated: Next.js optimizes Google Fonts
   automatically, so the correct fix is a plain `<link rel="stylesheet">` inside
   `<Head>` (or `next/font`) and dropping the package.

2. **Sitemap generation never runs.** `scripts/generate-sitemap.js` is invoked
   from the `webpack()` hook in `next.config.js`, but the build uses Turbopack,
   which never calls it. The script also hard-codes the same `<loc>` for every
   page, so its output would be wrong if it did run. Left as-is; moving it to a
   `prebuild` script would make it execute, which is a behavior change.

3. **`pages/404.js` uses the legacy `<Link passHref>` + `<Button as="a">`
   pattern**, which nests an `<a>` inside Next 13+'s own `<a>`. `components/Nav.js`
   was already fixed for this in commit `a082253`; `404.js` was missed. It
   builds and renders, but the markup is invalid.

4. **`package.json` metadata** still lists `author.url` as
   `https://joshjacobsonmusic.com` and `repository.url` as
   `https://github.com/fslauq/`, both leftovers from the original fork.

5. **`components/ProjectCard.js:43`** uses a raw `<img>`; ESLint advises
   `next/image`. Left as a warning since swapping it changes layout behavior.

---

# Phase 3: pre-existing bug fixes

Sections 1–4 fix items 1–4 of Phase 2's "Known issues". Item 5 (the
`next/image` advisory) is unchanged — it is a lint warning, not a bug, and
swapping the `<img>` would change layout behavior.

Sections 5 and 6 cover work that followed from those fixes: consolidating the
deployed origin (which exposed a dead `og:image` and a Fathom config that
silently dropped every pageview) and repairing the PWA manifest.

## 1. Google Fonts now actually loads

`pages/_document.js` rendered `<GoogleFonts>` as a direct child of `<html>`,
outside `<Head>`, so Next dropped it and the site silently fell back to system
fonts even though `styles/theme.js` asks for Inter.

Replaced the deprecated `next-google-fonts` wrapper with a plain stylesheet
`<link>` inside `<Head>`, alongside a `preconnect` to `fonts.googleapis.com`
(the `fonts.gstatic.com` preconnect was already there):

```javascript
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
/>
```

`next-google-fonts` was then uninstalled — nothing else imported it. Direct
dependencies: 11 + 4 dev. `npm audit` still reports 0.

**This is a visible change**: pages now render in Inter rather than the
system font stack. That is the intended behavior of `styles/theme.js`.

`next/font` was considered and skipped: with the Pages Router it means moving
font setup into `_app.js` and threading a generated CSS variable through the
Chakra theme's `fonts.body`. Worth doing later to self-host and cut the
render-blocking request, but it is a refactor rather than a bug fix.

## 2. Sitemap generation now runs, and emits one `<loc>` per page

Two separate defects:

- **It never ran.** `scripts/generate-sitemap.js` was invoked from the
  `webpack()` hook in `next.config.js`, and the build uses Turbopack, which
  never calls it. Moved to a `prebuild` npm script — npm runs `prebuild`
  automatically before `build`, so `npm run build` now regenerates the sitemap.
  The dead `webpack()` hook was removed from `next.config.js`.

- **Every `<loc>` was identical.** The generator computed the page list but
  mapped over it with `() =>`, discarding the path and hard-coding one URL.
  Added a `toRoute()` that derives the route from the file path
  (`pages/index.js` → `/`, `pages/projects.js` → `/projects`,
  `pages/blog/index.js` → `/blog`), sorts the results, and prefixes `SITE_URL`.

Error pages are now excluded (`/404`, `/500`) — they had been included by the
original glob and do not belong in a sitemap.

The base URL comes from `site.config.js` (see
[the canonical origin](#5-canonical-origin-consolidated-into-siteconfigjs)).

## 3. `pages/404.js` no longer nests `<a>` inside `<a>`

The legacy `<NextLink passHref>` + `<Button as="a">` pattern produced
`<a href="/"><a>Return Home</a></a>` under Next 13+, which renders its own
anchor.

```javascript
// Before
<NextLink href="/" passHref>
  <Button as="a" ...>Return Home</Button>
</NextLink>

// After
<Button as={NextLink} href="/" ...>Return Home</Button>
```

This is the Chakra v2 + Next 13+ idiom and yields a single element —
verified in the prerendered output:
`<a class="chakra-button css-skd8b6" href="/">Return Home</a>`.

Note this differs from the `a082253` fix applied to `components/Nav.js`, which
wraps `<Button>` in `<NextLink>` and so emits `<a><button>…</button></a>`.
That is also invalid (interactive content inside an anchor) but was left alone
as out of scope — see [Remaining](#remaining-open-items).

## 4. `package.json` metadata

| Field            | Before                          | After                                                             |
| ---------------- | ------------------------------- | ----------------------------------------------------------------- |
| `author.url`     | `https://joshjacobsonmusic.com` | `https://github.com/felipe-sq`                                    |
| `repository.url` | `https://github.com/fslauq/`    | `git+https://github.com/felipe-sq/felipesq-web-dev-portfolio.git` |
| `bugs.url`       | —                               | `…/felipesq-web-dev-portfolio/issues`                             |

`repository.url` now matches the actual `origin` remote. `author.url` and the
new `homepage` field point at the deployed site.

## 5. Canonical origin consolidated into `site.config.js`

The deployed origin is **`https://www.felipesq.dev`**. Before this, seven
places carried the placeholder `https://github.com/felipe-sq` (a GitHub profile,
not a website) or the fork's `joshjacobsonmusic.com`. New `site.config.js` is
the single source of truth:

```javascript
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.felipesq.dev"
).replace(/\/$/u, "");
```

It is CommonJS so `scripts/generate-sitemap.js` can `require()` it while the
Next.js pages import it as a default export. Setting `NEXT_PUBLIC_SITE_URL`
overrides it per environment (verified: a preview URL flows through to
`siteUrl`, `siteHost`, and `analyticsDomains`). Registered as `commonjs` in
`eslint.config.mjs` alongside `next.config.js`.

Consumers updated:

| File                          | Was                                    | Now                                 |
| ----------------------------- | -------------------------------------- | ----------------------------------- |
| `next-seo.config.js`          | `canonical` / `openGraph.url` = GitHub | `siteConfig.siteUrl`                |
| `next-seo.config.js`          | `og:image` = a GitHub **profile page** | a generated 1200×630 PNG            |
| `pages/projects.js`           | `canonical` = site root                | `${siteUrl}/projects`               |
| `pages/_app.js`               | Fathom `includedDomains` = a full URL  | `analyticsDomains` (bare hostnames) |
| `scripts/generate-sitemap.js` | local `SITE_URL` const                 | `require('../site.config')`         |
| `public/robots.txt`           | `joshjacobsonmusic.com/sitemap.xml`    | `www.felipesq.dev/sitemap.xml`      |
| `package.json`                | `author.url` = GitHub profile          | the site, plus a `homepage` field   |

Two of these were latent bugs in their own right:

- **`og:image` pointed at an HTML page**, so no social platform could render a
  preview. It now points at a generated 1200×630 card — see
  [section 7](#7-generated-ogimage-card).
- **Fathom analytics never recorded a pageview.** `includedDomains` was
  `["https://github.com/felipe-sq"]`, and Fathom matches on _bare hostnames_ —
  a URL can never match, so every pageview was filtered out. Now
  `["www.felipesq.dev", "felipesq.dev"]`, covering the apex redirect.

`public/robots.txt` is the one place the domain is still written literally; it
is a static file and cannot read the env var. Preview deployments do not need it
— Vercel serves them with `X-Robots-Tag: noindex` automatically.

`components/Footer.js` also references `https://github.com/felipe-sq`, but that
one is a genuine GitHub profile link in the social row and was left alone.

## 6. PWA manifest and Windows tile config

Both files under `public/static/favicons/` referenced their sibling images by
paths that do not exist. The favicons were generated for a site that served them
from the web root, but this repo keeps them in `/static/favicons/`, so every
`src` in the two config files 404'd:

| File                | Field                 | Was                           | Now                                           |
| ------------------- | --------------------- | ----------------------------- | --------------------------------------------- |
| `site.webmanifest`  | `icons[0].src`        | `/android-chrome-192x192.png` | `/static/favicons/android-chrome-192x192.png` |
| `site.webmanifest`  | `icons[1].src`        | `/android-chrome-512x512.png` | `/static/favicons/android-chrome-512x512.png` |
| `browserconfig.xml` | `<square150x150logo>` | `/mstile-150x150.png`         | `/static/favicons/mstile-150x150.png`         |

`site.webmanifest` also shipped with `name` and `short_name` as **empty
strings**, which is what an installed PWA or an Android "Add to Home screen"
shortcut would have been labeled with. They now carry the site title and a
short form, matching `next-seo.config.js`:

```json
"name": "Felipe Slaughter-Quintero",
"short_name": "Felipe SQ",
"start_url": "/",
```

`start_url` was absent. Browsers fall back to the URL of the document that
linked the manifest, which happens to work here but is left to the user agent;
declaring `/` makes the install target explicit.

Only paths and names changed — `theme_color`, `background_color`, `display`,
and the tile color are untouched, and no icon files were added, removed, or
regenerated.

## 7. Generated `og:image` card

Section 5 left `og:image` pointing at the square grayscale PWA icon — valid and
resolvable, but not a social card. Nothing in the repo was usable as one: the
largest assets are 200×200 project thumbnails, `images/pic0*.jpg` at 384×269,
and a square `placeholder.jpg`.

Rather than commit a hand-designed PNG, `pages/api/og.js` renders the card at
request time with `ImageResponse` from `next/og`:

```javascript
const tagline = SEO.description.split("|").pop().trim();
```

The headline and tagline are derived from `next-seo.config.js`, so the card
cannot drift from the page metadata, and the colors are the repo's own —
Chakra `gray.800`/`gray.400` for the surface and body text, plus the `#4a9885`
accent from `safari-pinned-tab.svg`.

Two things worth knowing about the implementation:

- **No edge runtime.** `next/og` resolves to its Node build unless
  `NEXT_RUNTIME` is `"edge"`, and Pages Router API routes on Node write to
  `res` rather than returning a `Response`, so the streamed `ImageResponse` is
  buffered with `arrayBuffer()` and passed to `res.send()`.
- **`Cache-Control: public, s-maxage=31536000, max-age=3600`.** The card only
  changes when the route or the metadata does, so the CDN keeps it and scrapers
  never trigger a render.

The route is excluded from the sitemap for free — `collectPages()` already skips
`pages/api` (verified: `sitemap.xml` still lists only `/` and `/projects`).

**Known limitation:** the card renders in the default font at a single weight.
`@vercel/og` bundles one Noto Sans face, so the `fontWeight: 700` on the
headline has no effect and the card is not in Inter like the rest of the site.
Fixing it means committing an Inter `.ttf` and passing it via the `fonts`
option.

## Verification

```bash
npm run lint    # 0 errors, 1 warning (the known next/image advisory)
npm run build   # prebuild ran; ✓ compiled; all 4 routes prerendered
npm start       # / → 200, /projects → 200, /nope → 404
```

Confirmed against the production server:

- The Inter stylesheet `<link>` is present in `/`, `/projects`, and `/404`.
- `/sitemap.xml` serves `200 application/xml` with `<loc>` values
  `https://www.felipesq.dev/` and `https://www.felipesq.dev/projects`, and no
  `/404` entry.
- The 404 "Return Home" button renders as exactly one `<a>`.
- `canonical` and `og:url` are `https://www.felipesq.dev` on `/` and
  `https://www.felipesq.dev/projects` on `/projects`.
- `og:image` is `${siteUrl}/api/og` on both pages, and that route returns
  `200 image/png` with a body that decodes as `PNG image data, 1200 x 630`.
- `/robots.txt` points `Sitemap:` at the real domain.
- `analyticsDomains` resolves to `["www.felipesq.dev", "felipesq.dev"]`, and to
  a single entry when `NEXT_PUBLIC_SITE_URL` overrides it.
- Every asset referenced by `site.webmanifest` and `browserconfig.xml` returns
  `200 image/png`; the two config files themselves serve as
  `application/manifest+json` and `application/xml`. The pre-fix paths (e.g.
  `/android-chrome-192x192.png`) confirm as `404`.

---

# Phase 4: open-items cleanup

Cleared every remaining open item from Phase 3 except the `og:image` font
limitation. Three of the items turned out to be stale or misstated, and closing
one of them (#5) surfaced a visible bug nobody had logged.

## 1. `components/Nav.js` no longer nests `<button>` in `<a>` (item 2)

The last instance of the invalid-nesting pattern, present on every page:

```javascript
// Before — <a href="/"><button>Home</button></a>
<NextLink href="/">
  <Button variant="ghost" p={[1, 4]}>Home</Button>
</NextLink>

// After — <a class="chakra-button" href="/">Home</a>
<Button as={NextLink} href="/" variant="ghost" p={[1, 4]}>Home</Button>
```

Same remedy as the `404.js` fix in Phase 3 §3. Both nav links were converted;
the theme-toggle `IconButton` is a real button and was left as one. Verified in
the prerendered output for `/`, `/projects`, and `/404`.

## 2. The footer social icons were rendering empty — and were also nested

Not previously logged. Closing item 5 meant opening `components/Footer.js`,
where all three social buttons rendered as `<button aria-label="GitHub"></button>`
— **no icon at all**, on every page.

The cause is a Chakra v1 leftover the Phase 1 migration missed. `styles/theme.js`
carried a `theme.icons` registry, and v1 resolved `<IconButton icon="github" />`
by looking the string up in it. Chakra v2 removed that mechanism — `icon` takes a
ReactElement — so each string resolved to nothing and rendered nothing. Phase 1
fixed exactly this in `Nav.js` (string `"sun"`/`"moon"` → `<SunIcon />`), but the
footer was missed.

Three things were wrong in the same markup:

| Problem                                                                          | Fix                                                   |
| -------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `icon="github"` string never resolved → empty buttons                            | Real icon components in the new `components/icons.js` |
| `<Link><IconButton/></Link>` → `<a><button></button></a>`                        | `IconButton as="a"` — one element                     |
| `icon="github"` also set on `<Link>`, leaking to the DOM as an invalid attribute | Removed                                               |

`components/icons.js` builds `GitHubIcon`, `LinkedInIcon`, and `MailIcon` with
`createIcon` from `@chakra-ui/icons`, reusing the **exact SVG paths** that were
already in `theme.js` — the delivery mechanism changed, the artwork did not. The
external links carry `rel="noopener noreferrer"`; the `mailto:` link correctly
does not.

**This is a visible change**: the footer now shows three icons where it showed
three blank spaces.

## 3. Dead code removed (items 3, 4, 5)

- **`components/Track.js`** — deleted. Spotify "top tracks" widget from the fork
  origin, 57 lines, no consumers.
- **`styles/theme.js` icon registry** — deleted, all 160 lines of it. Item 4
  flagged only `jj_circle_logo` (the fork owner's initials), but with the footer
  moved to real components the _entire_ registry was dead: it is a v1 API that
  v2 does not read. `theme.js` is now 17 lines — fonts and font weights, which
  is all Chakra v2 ever consumed from it. The now-unused `import React` went too.
- **`components/Footer.js` `gitFollow` iframe** — deleted along with its
  `iframe()` helper and the commented-out `dangerouslySetInnerHTML` consumer.

## 4. Unused imports, and the rule that finds them (item 6)

Added `no-unused-vars: "warn"` to `eslint.config.mjs`, configured with
`varsIgnorePattern: "^React$"` so the redundant-but-harmless `import React` does
not warn on every file.

Cleaned: `pages/projects.js` (`useState`, `useEffect`, `Input`, `InputGroup`,
`InputRightElement`, `Icon`) and `components/Container.js` (`NextLink`,
`Button`, `Box`, `IconButton`). `components/ProjectCard.js` was already clean —
its `Box`/`Icon` went out with the monogram-tile rewrite.

The new rule then found two things the item had not listed:

- `components/Container.js` defined a **second `StickyNav`** styled component,
  a copy of the one in `Nav.js`, that nothing rendered. Removed, along with the
  now-unused `styled` import.
- `components/Nav.js` computed `bgColor` and `primarytextColor` and applied
  neither.

## 5. Smaller corrections (items 8, 10, 11)

- **`pages/_document.js`** now uses `<Html>` from `next/document` instead of a
  raw `<html>`. Item 8 also called for `<Body>` — **there is no such export**;
  `next/document` provides `Html`, `Head`, `Main`, and `NextScript`, and a raw
  `<body>` is the documented form. Only the one tag changed. `lang="en"` still
  reaches the output.
- **`scripts/generate-sitemap.js`** resolved `./.prettierrc.js`, a file the repo
  does not have, so `resolveConfig` always returned `null`. It now resolves from
  the file being written, via a new `SITEMAP_PATH` constant that also replaces
  the hard-coded output path further down.
- **Prettier pass** over the repo: `pages/_document.js`,
  `scripts/generate-sitemap.js`, `README (portfolio).md`, and
  `components/ProjectCard.js`. The root `index.html` and `styles/styles.scss`
  remain non-conforming; both belong to the legacy static site and fall outside
  the `npm run prettier` globs.

## 6. US spelling

`data/projects.js`, `pages/api/og.js`, and this document used British spellings
("colour", "labelled", "catalogued") — author drift, not a repo convention.
Nothing in `CLAUDE.md`, `AGENTS.md`, `.claude/`, or the `lang="en"` document tag
specified a locale. All normalized to US spelling. The one user-visible instance
was the Simple Grocery List card copy: "colour-coded lists" → "color-coded
lists".

## Verification

```bash
npm run lint    # 0 errors, 0 warnings
npm run build   # prebuild ran; ✓ compiled; all 4 routes prerendered
npm start       # / 200, /projects 200, /nope 404, /sitemap.xml 200, /api/og 200
```

`npm run lint` is now **fully clean** — the `next/image` advisory that had been
the standing warning went away with the monogram-tile rewrite.

Confirmed in the prerendered output of `/`, `/projects`, and `/404`:

- The nav emits `<a class="chakra-button" href="/">Home</a>` — one element, no
  nested button. The theme toggle remains a standalone `<button>`.
- The footer emits three `<a>` elements, each containing a rendered `<svg>`.
- `<html lang="en">` is present.
- `/api/og` still returns `200 image/png`, decoding as `PNG image data, 1200 x 630`.
- `sitemap.xml` still lists only `/` and `/projects`.

## Remaining open items

1. **The `og:image` card is not in Inter.** The only item carried over from
   Phase 3. `@vercel/og` bundles a single Noto Sans face, so the `fontWeight: 700`
   on the headline has no effect. See the limitation in
   [section 7](#7-generated-ogimage-card). Deliberately deferred: the card
   renders correctly, and committing a font file introduces a failure mode the
   current version does not have.
2. **`next/font` is still not used.** Inter loads via a render-blocking
   stylesheet `<link>` (Phase 3 §1). Moving to `next/font` would self-host the
   face and drop the request, but with the Pages Router it means threading a
   generated CSS variable through the Chakra theme's `fonts.body` — a refactor,
   not a bug fix. Would also supply the font file item 1 needs.
3. **Prettier non-conformance in the legacy static site** — the root
   `index.html` and `styles/styles.scss`. Outside the `npm run prettier` globs
   and unrelated to the Next.js app.
