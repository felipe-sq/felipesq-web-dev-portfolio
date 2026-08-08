import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import SEO from "../../next-seo.config";
import siteConfig from "../../site.config";

// Satori, which renders this card, reads ttf/otf/woff and not woff2 — so the
// card cannot reuse the variable woff2 that styles/fonts.js ships to browsers.
// These are the same typeface in a format it can parse. Two static faces rather
// than one variable file because Satori picks a face per weight; it does not
// instance a variable axis, which is why `fontWeight: 700` below did nothing
// while the bundled default face was the only one loaded.
const FONT_DIR = path.join(process.cwd(), "styles", "fonts");

// Read once per warm instance, not once per scrape.
let fontsPromise;

const loadFonts = () => {
  fontsPromise ??= Promise.all([
    readFile(path.join(FONT_DIR, "inter-regular.ttf")),
    readFile(path.join(FONT_DIR, "inter-bold.ttf")),
  ]).then(([regular, bold]) => [
    { name: "Inter", data: regular, weight: 400, style: "normal" },
    { name: "Inter", data: bold, weight: 700, style: "normal" },
  ]);

  return fontsPromise;
};

// 1200x630 is the aspect ratio every major platform crops toward. Content stays
// clear of the edges because Slack, LinkedIn and X each crop differently.
const SIZE = { width: 1200, height: 630 };

// "Name | Tagline" -> "Tagline". Derived from next-seo.config.js so the card
// cannot drift from the page metadata; the name is already the headline.
const tagline = SEO.description.split("|").pop().trim();

// Colors are the repo's own: Chakra gray.800/gray.400 for the surface and body
// text, and the accent from safari-pinned-tab.svg.
const BACKGROUND = "#1a202c";
const MUTED = "#a0aec0";
const ACCENT = "#4a9885";

// Pages Router API routes run on Node and write to `res`, so the streamed
// ImageResponse is buffered here rather than returned. next/og resolves to its
// Node build unless NEXT_RUNTIME is "edge", so no edge runtime is needed.
const handler = async (_req, res) => {
  const image = new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 100px",
        background: BACKGROUND,
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          width: 88,
          height: 8,
          marginBottom: 48,
          background: ACCENT,
        }}
      />
      <div
        style={{
          fontSize: 84,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          color: "#ffffff",
        }}
      >
        {SEO.title}
      </div>
      <div style={{ fontSize: 38, marginTop: 28, color: MUTED }}>{tagline}</div>
      <div style={{ fontSize: 28, marginTop: 64, color: ACCENT }}>
        {siteConfig.siteHost}
      </div>
    </div>,
    { ...SIZE, fonts: await loadFonts() },
  );

  res.setHeader("Content-Type", "image/png");
  // The card only changes when this file does, so let the CDN keep it and spare
  // every scraper a render.
  res.setHeader("Cache-Control", "public, s-maxage=31536000, max-age=3600");
  res.send(Buffer.from(await image.arrayBuffer()));
};

export default handler;
