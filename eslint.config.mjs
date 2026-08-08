import { defineConfig, globalIgnores } from "eslint/config";
import next from "eslint-config-next/core-web-vitals";

export default defineConfig([
  globalIgnores([
    ".next/**",
    "out/**",
    "node_modules/**",
    // Legacy static site kept alongside the Next.js app (jQuery bundles, etc.)
    "assets/**",
    "images/**",
    "public/**",
  ]),
  ...next,
  {
    files: ["next.config.js", "scripts/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        __dirname: "readonly",
        module: "writable",
        require: "readonly",
      },
    },
  },
]);
