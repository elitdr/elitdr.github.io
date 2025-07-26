# Stylelint

[Stylelint](https://github.com/stylelint/stylelint) 是一个用于检查和修复 JavaScript 代码错误的工具。

## 初始化

```sh
npm init stylelint
```

## 配置

在 `.stylelintrc.json` 中添加如下配置。

::: code-group

```json [.stylelintrc.json]
{
  // [!code ++]
  "rules": {
    // [!code ++]
    "no-duplicate-selectors": null, // 允许重复选择器
    // [!code ++]
    "custom-property-empty-line-before": null, // 允许自定义属性前空行
    // [!code ++]
    "value-no-vendor-prefix": null, // 允许值前缀
    // [!code ++]
    "media-feature-range-notation": "prefix", // 允许使用带前缀的媒体特性范围符号
    // [!code ++]
    "selector-class-pattern": null // 不限制类选择器的命名模式
    // [!code ++]
  }
}
```

:::

#### stylelint-config-standard-scss（按需选择）

使用 [stylelint-config-standard-scss](https://github.com/stylelint/stylelint-config-standard-scss) 官方配置。

```sh
npm install -D stylelint-config-standard-scss
```

在 `.stylelintrc.json` 中添加如下配置。

::: code-group

```json [.stylelintrc.json]
"extends": [
  // [!code ++]
  "stylelint-config-standard-scss"
]
```

:::

## 插件

### stylelint-order

[stylelint-order](https://github.com/hudochenkov/stylelint-order) 是一个用于自动排序 Css 的 Stylelint 插件。

```sh
npm install -D stylelint-order
```

在 `.stylelintrc.json` 中添加如下配置。

::: code-group

```json [.stylelintrc.json]
{
  // [!code ++]
  "plugins": [
    // [!code ++]
    "stylelint-order"
    // [!code ++]
  ]
}
```

:::

## 集成到 Husky

后续通过 [lint-staged](lint-staged) 集成到 Husky 中。
