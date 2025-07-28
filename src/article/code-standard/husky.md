# Husky

[Husky](https://github.com/typicode/husky) 是一个 Git Hooks 工具，用于管理 Git 的生命周期。

## 安装

```sh
npm install -D husky
```

## 初始化

```sh
npx husky init
```

会在项目根目录下生成 `.husky` 目录，并生成 `.husky/pre-commit` 文件（文件内可能会有一条`npm test`命令，不需要**可删除**）。
`pre-commit` 是一个钩子，在每次 `git commit` 提交前执行里面的命令（例如执行 Eslint、Stylelint、Prettier 等命令）。

同时会在 `package.json` 中添加如下脚本，用于安装依赖时自动初始化 husky 确保可用。

::: code-group

```json [package.json]
"scripts": {
  // [!code ++]
  "prepare": "husky"
}
```

## 选项

| 选项                | 示例            | 说明         |
| :------------------ | :-------------- | :----------- |
| `-n`, `--no-verify` | `git commit -n` | 跳过钩子检查 |

:::
