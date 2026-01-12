# Prettier

[Prettier](https://github.com/prettier/prettier) 是一个用于代码格式化的工具，它可以自动将代码格式化为一致的风格，提高代码的可读性和可维护性。

## 安装

```sh
npm install -D -E prettier
```

> `--save-exact`（简写 `-E`）锁定版本

## 配置

执行以下脚本，生成 `.prettierrc` 配置文件。

```sh
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```

## 插件

### prettier-plugin-tailwindcss

[prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) 是一个用于格式化 Tailwind Css 的 Prettier 插件，它可以自动将 Tailwind Css 类名排序并格式化，提高代码的可读性和可维护性。

```sh
npm install -D prettier-plugin-tailwindcss
```

在 `.prettierrc` 文件中添加如下配置。

::: code-group

```json [.prettierrc]
{
  // [!code ++]
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

:::
