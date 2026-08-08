// Single source of truth for the site's public origin.
//
// Consumed by next-seo.config.js, pages/_app.js, pages/projects.js and
// scripts/generate-sitemap.js. Written as CommonJS so the sitemap script can
// require() it while Next.js imports it as a default export.
//
// Override per environment with NEXT_PUBLIC_SITE_URL (e.g. to point preview
// deployments at their own URL). The NEXT_PUBLIC_ prefix is required so the
// value is inlined into the client bundle at build time.
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.felipesq.dev"
).replace(/\/$/u, "");

const siteHost = siteUrl.replace(/^https?:\/\//u, "");

// Hostnames Fathom counts pageviews for: the canonical host plus the apex it
// redirects from. Fathom expects bare hostnames, not URLs.
const analyticsDomains = [siteHost, siteHost.replace(/^www\./u, "")].filter(
  (domain, index, all) => all.indexOf(domain) === index,
);

module.exports = { siteUrl, siteHost, analyticsDomains };
