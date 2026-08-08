import localFont from "next/font/local";

// Inter, self-hosted by next/font. This replaces the render-blocking
// stylesheet <link> that pages/_document.js used to carry: the @font-face rule
// and a preload for the file below are emitted at build time, and no request
// leaves the origin for fonts.googleapis.com.
//
// One variable file covers every weight the theme names (400/600/700) in 47 KB.
// The three static faces it replaces would have been ~440 KB. See
// styles/fonts/README.md for where the files come from.
//
// The .ttf siblings in styles/fonts/ are deliberately not loaded here — they
// exist only for pages/api/og.js, which renders through Satori and cannot read
// woff2.
// No `variable` option: styles/theme.js consumes `inter.style.fontFamily`
// directly, so Chakra's own --chakra-fonts-body token carries the family and a
// second CSS variable would only be declared, never read.
export const inter = localFont({
  src: "./fonts/inter-latin-variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
});
