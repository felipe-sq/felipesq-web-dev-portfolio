# Migration Summary

This document covers two phases of modernization work:

- **Phase 1** — React 18 + Next.js 16 + Chakra UI v2 + Emotion v11 migration.
- **Phase 2** — npm standardization, dead-dependency removal, and reaching
  **0 known vulnerabilities**. See
  [Phase 2](#phase-2-npm-standardization--dependency-cleanup) below, which
  supersedes Phase 1's "Remaining Vulnerabilities" and install instructions.

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
