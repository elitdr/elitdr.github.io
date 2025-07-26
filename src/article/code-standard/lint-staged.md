# lint-staged

[lint-staged](https://github.com/lint-staged/lint-staged) 是一个用于筛选出 git 暂存区代码并执行命令的工具，可避免对整个项目执行命令影响性能（例如在 `pre-commit` 钩子中执行 Eslint、Stylelint、Prettier 等命令）。

## 安装

```sh
npm install -D lint-staged
```

## 配置

确保已完成各脚本对应的步骤（例如 [Eslint](eslint)、[Stylelint](stylelint)、[Prettier](prettier)）。

创建`.lintstagedrc`文件并添加如下配置，也可自行配置。

::: code-group

```json [.lintstagedrc]
{
  "*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}": ["eslint --fix", "prettier --write"],
  "*.{css,scss,vue}": ["stylelint --fix", "prettier --write"],
  "*.{json,md,yml,yaml,html}": ["prettier --write"],
  "*.vue": ["eslint --fix", "stylelint --fix", "prettier --write"]
}
```

:::

## 集成到 Husky

确保已完成 [Husky](husky) 的步骤，随后在`.husky/pre-commit`添加脚本。
::: code-group

```sh [.husky/pre-commit]
npx lint-staged
```

:::
