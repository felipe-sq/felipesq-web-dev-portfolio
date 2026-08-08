const fs = require('fs');
const path = require('path');

const prettier = require('prettier');

const { siteUrl } = require('../site.config');

// Pages that must never appear in a sitemap.
const EXCLUDED_ROUTES = new Set(['/404', '/500']);

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

// 'pages/index.js' -> '/', 'pages/projects.js' -> '/projects',
// 'pages/blog/index.js' -> '/blog'.
const toRoute = (pagePath) => {
  const route = `/${path
    .relative('pages', pagePath)
    .split(path.sep)
    .join('/')
    .replace(/\.(js|mdx)$/u, '')
    .replace(/(^|\/)index$/u, '')}`;

  return route === '/' ? route : route.replace(/\/$/u, '');
};

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const routes = collectPages('pages')
    .map(toRoute)
    .filter((route) => !EXCLUDED_ROUTES.has(route))
    .sort();

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${routes
              .map(
                (route) => `
                        <url>
                            <loc>${`${siteUrl}${route}`}</loc>
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
