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
        // TODO: replace with a purpose-built 1200x630 social card. This is the
        // PWA icon - it resolves and is valid, but it is a square grayscale
        // logo, not a designed preview.
        url: `${siteConfig.siteUrl}/static/favicons/android-chrome-512x512.png`,
        alt: title,
        width: 512,
        height: 512,
        type: "image/png",
      },
    ],
  },
};

export default SEO;
