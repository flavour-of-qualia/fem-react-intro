import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */

export default [
  js.configs.recommended,
  {
    ...reactPlugin.configs.flat.recommended, // flat configs
    settings: {
      react: {
        version: "detect", // for some reason this is not default, but it is essential to figure out which version of react to use
      },
    },
  },
  reactPlugin.configs.flat("jsx-runtime"), // this allows skipping importing react in every single file
  {
    files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "react/no-unescaped-entities": "off", // ' $apos
      "reac/prop-types": "off",
    },
  },
  prettier,
];
