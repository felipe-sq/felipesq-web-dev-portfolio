import { theme as chakraTheme } from "@chakra-ui/react";

import { inter } from "./fonts";

const theme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    // `inter.style.fontFamily` is the hashed family name next/font generates
    // plus its metric-adjusted fallback, so the bare "Inter" that used to lead
    // this stack is gone — nothing declares that name any more. The system
    // stack stays on as the last resort.
    body: `${inter.style.fontFamily},-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
};

export default theme;
