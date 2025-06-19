// https://docs.expo.dev/guides/using-eslint/
import pluginQuery from "@tanstack/eslint-plugin-query";
import expoConfig from "eslint-config-expo/flat.js";
import pluginReactCompiler from "eslint-plugin-react-compiler";
import { defineConfig } from "eslint/config";

export default defineConfig([
  expoConfig,
  ...pluginQuery.configs["flat/recommended"],
  {
    ignores: ["dist/*"],
    plugins: {
      "react-compiler": pluginReactCompiler,
    },
    rules: {
      "react-compiler/react-compiler": "error",
    },
  },
]);
