import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^node:"], // Node.js 内置模块
            ["^@?\\w"], // 第三方包（如 `react`、`lodash`）
            ["^"], // 绝对路径（如 `src/components`）
            ["^\\."], // 相对路径（如 `./utils`）
            ["^\\u0000"], // 副作用导入（如 `import 'style.css'`）
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  eslintConfigPrettier, // 确保将其放在最后，以便有机会覆盖其他配置
]);
