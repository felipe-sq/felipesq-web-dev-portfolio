import siteConfig from "./site.config";

const title = "Felipe Slaughter-Quintero";
// The OG card in pages/api/og.js renders everything after the "|" as its
// tagline, so keep that half short enough to wrap in two lines at 38px.
const description =
  "Felipe Slaughter-Quintero | Software Engineer — React, Next.js, TypeScript, AI integrations, and Shopify e-commerce.";

const SEO = {
  title,
  description,
  canonical: siteConfig.siteUrl,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    title,
    description,
    images: [
      {
        // Generated at request time by pages/api/og.js from `title` and
        // `description` below, so the card cannot drift from the metadata.
        url: `${siteConfig.siteUrl}/api/og`,
        alt: title,
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
};

export default SEO;
