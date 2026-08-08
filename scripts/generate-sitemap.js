const fs = require('fs');
const path = require('path');

const prettier = require('prettier');

// Collect page routes the same way the previous globby pattern did:
// 'pages/**/*{.js,.mdx}', excluding 'pages/_*.js' and 'pages/api'.
const collectPages = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return entry.name === 'api' ? [] : collectPages(entryPath);
    }

    if (entry.name.startsWith('_')) {
      return [];
    }

    return /\.(js|mdx)$/u.test(entry.name) ? [entryPath] : [];
  });
};

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = collectPages('pages');
  // NOTE: <loc> is hard-coded to the same URL for every page. This mirrors the
  // existing behaviour and is almost certainly unfinished - the per-page route
  // is computed by Next from the file path but never used here.
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map(
                () => `
                        <url>
                            <loc>${`https://github.com/felipe-sq`}</loc>
                        </url>
                    `
              )
              .join('')}
        </urlset>
    `;

  // prettier.format() returns a Promise as of Prettier 3.
  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  });

  fs.writeFileSync('public/sitemap.xml', formatted);
})();
