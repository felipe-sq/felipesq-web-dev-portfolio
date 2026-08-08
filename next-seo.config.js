import siteConfig from "./site.config";

const title = "Felipe Slaughter-Quintero";
const description =
  "Felipe Slaughter-Quintero | Web Developer, UI Design and Content Creator";

const SEO = {
  title,
  description,
  canonical: siteConfig.siteUrl,
  openGraph: {
    type: "website",
    locale: "en_IE",
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
