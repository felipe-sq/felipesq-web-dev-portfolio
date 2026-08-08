# Fonts

Inter, licensed under the SIL Open Font License 1.1 (`LICENSE.txt`). All three
files are the Google Fonts build of Inter v20, latin subset.

| File                         | Consumer          | Why this format                                                             |
| ---------------------------- | ----------------- | --------------------------------------------------------------------------- |
| `inter-latin-variable.woff2` | `styles/fonts.js` | Smallest format browsers accept; one file covers weights 100–900.           |
| `inter-regular.ttf`          | `pages/api/og.js` | Satori (inside `next/og`) parses ttf/otf/woff — **not** woff2.              |
| `inter-bold.ttf`             | `pages/api/og.js` | Same; Satori does not instance variable axes, so bold must be its own face. |

The two `.ttf` files are read on the server and never sent to a browser, so
their size costs nothing at page load. `outputFileTracingIncludes` in
`next.config.js` pins them into the function bundle. Tracing currently also
infers this directory from the `readFile` call on its own, but that inference
depends on `FONT_DIR` staying statically analyzable — the explicit entry is what
keeps a refactor from silently shipping a function that 500s on a missing path.

To refresh, re-download from Google Fonts (`https://fonts.googleapis.com/css2?family=Inter:wght@100..900`
for the woff2; the legacy `css?family=Inter:400,700` endpoint returns the ttf
URLs) and keep the filenames.
