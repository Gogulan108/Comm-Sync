import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1. Apply JS recommended rules to all JS/TS/JSX/TSX files
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },

  // 2. Set browser globals for all JS/TS/JSX/TSX files
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },

  // 3. Add TypeScript recommended rules
  tseslint.configs.recommended,

  // 4. Add React recommended rules (flat config)
  pluginReact.configs.flat.recommended,
]);
