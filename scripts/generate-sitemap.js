const fs = require("fs");
const path = require("path");

const prettier = require("prettier");

const { siteUrl } = require("../site.config");

// Pages that must never appear in a sitemap.
const EXCLUDED_ROUTES = new Set(["/404", "/500"]);

const SITEMAP_PATH = "public/sitemap.xml";

// Collect page routes the same way the previous globby pattern did:
// 'pages/**/*{.js,.mdx}', excluding 'pages/_*.js' and 'pages/api'.
const collectPages = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return entry.name === "api" ? [] : collectPages(entryPath);
    }

    if (entry.name.startsWith("_")) {
      return [];
    }

    return /\.(js|mdx)$/u.test(entry.name) ? [entryPath] : [];
  });
};

// 'pages/index.js' -> '/', 'pages/projects.js' -> '/projects',
// 'pages/blog/index.js' -> '/blog'.
const toRoute = (pagePath) => {
  const route = `/${path
    .relative("pages", pagePath)
    .split(path.sep)
    .join("/")
    .replace(/\.(js|mdx)$/u, "")
    .replace(/(^|\/)index$/u, "")}`;

  return route === "/" ? route : route.replace(/\/$/u, "");
};

(async () => {
  // Resolve config the way Prettier itself does — from the file being
  // formatted, walking up for any .prettierrc/package.json "prettier" key. The
  // previous './.prettierrc.js' named a file the repo does not have, so this
  // always returned null and the output silently used Prettier's defaults.
  const prettierConfig = await prettier.resolveConfig(SITEMAP_PATH);
  const routes = collectPages("pages")
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
                    `,
              )
              .join("")}
        </urlset>
    `;

  // prettier.format() returns a Promise as of Prettier 3.
  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  fs.writeFileSync(SITEMAP_PATH, formatted);
})();
