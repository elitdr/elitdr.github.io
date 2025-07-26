# Eslint

[Eslint](https://github.com/eslint/eslint) 是一个用于检查和修复 JavaScript 代码错误的工具。

## 初始化

```sh
npm init @eslint/config@latest
```

按照项目的语言、风格、框架等进行选择，生成 `eslint.config.mjs` 配置文件。

```sh
√ What do you want to lint? · javascript # 选择 JavaScript
√ How would you like to use ESLint? · problems # 选择检查错误
√ What type of modules does your project use? · esm # 选择 ES Module
√ Which framework does your project use? · vue # 选择 Vue
√ Does your project use TypeScript? · no / yes # 选择 TypeScript
√ Where does your code run? · browser # 选择浏览器
The config that you've selected requires the following dependencies:

eslint, @eslint/js, globals, typescript-eslint, eslint-plugin-vue
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · npm
```

## 配置

### eslint-config-prettier

使用 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) 配置防止与 Prettier 规则冲突。

```sh
npm install -D eslint-config-prettier
```

在 `eslint-config.mjs` 中添加如下配置。

::: code-group

```js [eslint-config.mjs]
// [!code ++]
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default [
  // [!code ++]
  eslintConfigPrettier, // 确保将其放在最后，以便有机会覆盖其他配置
];
```

:::

## 插件

### eslint-plugin-simple-import-sort

[eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort) 是一个用于自动排序导入导出的 Eslint 插件。

```sh
npm install -D eslint-plugin-simple-import-sort
```

在 `eslint-config.mjs` 中添加如下配置。

::: code-group

```js [eslint-config.mjs]
// [!code ++]
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  // [!code ++]
  {
    // [!code ++]
    plugins: {
      // [!code ++]
      "simple-import-sort": simpleImportSort,
      // [!code ++]
    },
    // [!code ++]
    rules: {
      // [!code ++]
      "simple-import-sort/imports": [
        // [!code ++]
        "error",
        // [!code ++]
        {
          // [!code ++]
          groups: [
            // [!code ++]
            ["^node:"], // Node.js 内置模块
            // [!code ++]
            ["^@?\\w"], // 第三方包（如 `react`、`lodash`）
            // [!code ++]
            ["^"], // 绝对路径（如 `src/components`）
            // [!code ++]
            ["^\\."], // 相对路径（如 `./utils`）
            // [!code ++]
            ["^\\u0000"], // 副作用导入（如 `import 'style.css'`）
            // [!code ++]
          ],
          // [!code ++]
        },
        // [!code ++]
      ],
      // [!code ++]
      "simple-import-sort/exports": "error",
      // [!code ++]
    },
    // [!code ++]
  },
];
```

:::

## 集成到 Husky

后续通过 [lint-staged](lint-staged) 集成到 Husky 中。
