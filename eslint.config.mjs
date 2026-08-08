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
    // eslint-config-next does not enable this, so dead imports and variables
    // inherited from the fork went unreported. `varsIgnorePattern: "^React$"`
    // keeps the redundant-but-harmless `import React` in place; it is not worth
    // a warning on every file under the modern JSX transform.
    rules: {
      "no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^React$",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ["next.config.js", "site.config.js", "scripts/**/*.js"],
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
