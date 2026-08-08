# Welcome to my Full Stack Web Dev Portfolio!

## Introduction

Howdy! My name is Felipe, and this is my portfolio. I've highlighted a few of my
projects, but this is a work-in-progress, so I will be adding to it
continuously.

## Tech stack

- [Next.js](https://nextjs.org/) 16 (Pages Router, Turbopack)
- [React](https://react.dev/) 18.3
- [Chakra UI](https://v2.chakra-ui.com/) v2 with [Emotion](https://emotion.sh/) v11
- [Sass](https://sass-lang.com/) for global styles (`styles/styles.scss`)
- [next-seo](https://github.com/garmeeh/next-seo) for metadata
- [Fathom Analytics](https://usefathom.com/) (production only)

Deployed on [Vercel](https://vercel.com/).

## Package manager

This project uses **npm**, and `package-lock.json` is the single source of
truth for dependency resolution.

There is no `yarn.lock` in this repo — it was removed so that npm and Yarn
can't drift apart and resolve different dependency trees. Please don't run
`yarn` here; use `npm` so that `package-lock.json` stays authoritative. The
expected npm version is declared via the `packageManager` field in
`package.json`.

## Requirements

- Node.js **>= 20.9.0** (see the `engines` field in `package.json`)
- npm 10 or newer (ships with Node 20+)

## Getting started

Install dependencies:

```bash
npm install
```

For a reproducible, lockfile-exact install (what CI and Vercel should use):

```bash
npm ci
```

No `--legacy-peer-deps` flag is required — all peer dependencies resolve
cleanly.

Start the development server on [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

## Available scripts

| Script             | What it does                                           |
| ------------------ | ------------------------------------------------------ |
| `npm run dev`      | Start the Next.js dev server                           |
| `npm run build`    | Create an optimized production build                   |
| `npm start`        | Serve the production build (run `npm run build` first) |
| `npm run lint`     | Lint with ESLint 9 (flat config, `eslint.config.mjs`)  |
| `npm run lint:fix` | Lint and auto-fix what can be fixed                    |
| `npm run prettier` | Format source files with Prettier 3                    |
| `npm test`         | Alias for `npm run lint`                               |

## Project structure

```
components/          Shared layout + UI (Container, Nav, Footer, ProjectCard, Track)
pages/               Routes: index.js, projects.js, 404.js, _app.js, _document.js
pages/_app.js        Chakra provider, color mode, global styles, SEO, Fathom analytics
pages/_document.js   <head> tags, favicons
pages/api/og.js      Generates the og:image card at request time
styles/              theme.js (Chakra theme), prism.js, styles.scss
styles/fonts.js      Self-hosted Inter (next/font); files in styles/fonts/
next-seo.config.js   Default SEO metadata
next.config.js       Next.js/Turbopack config
scripts/             generate-sitemap.js
eslint.config.mjs    ESLint flat config (extends eslint-config-next)
```

Everything in the repo is part of the Next.js app. The older static portfolio
that used to sit alongside it (`index.html`, `assets/`, `images/` — the Miniport
template this site started from) was removed once it had been fully superseded;
it is still in the git history if it is ever needed.

## Dependency maintenance

Check for updates and audit for vulnerabilities:

```bash
npm outdated
npm audit
```

A few packages are intentionally pinned below their latest major. See
[MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md) for the reasoning.

## License and credits

MIT — see [LICENSE](./LICENSE).

The license carries two copyright lines because this site began as a fork of
[Josh Jacobson's portfolio](https://github.com/josh-jacobson/portfolio), which
was itself MIT licensed. Parts of his code are still here — `styles/prism.js`
most plainly — and MIT asks that the notice travel with them. His README in turn
credits Lee Robinson for the original design and application structure.

Two things in the repo are **not** covered by that MIT grant:

- **Inter** (`styles/fonts/`) is licensed under the SIL Open Font License 1.1.
  Its terms are in [styles/fonts/LICENSE.txt](./styles/fonts/LICENSE.txt).
- **Site content** — the writing, project descriptions and images — is not
  offered under the MIT grant. Reuse the code, not the persona.
