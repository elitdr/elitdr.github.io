# VSCode

## 配置

在 `.vscode/settings.json` 文件中添加如下配置。

::: code-group

```json [.vscode/settings.json]
{
  // [!code ++]
  "editor.formatOnSave": true,
  // [!code ++]
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // [!code ++]
  "editor.codeActionsOnSave": {
    // [!code ++]
    "source.fixAll.eslint": "always",
    // [!code ++]
    "source.fixAll.stylelint": "always",
    // [!code ++]
    "source.removeUnusedImports": "always"
    // [!code ++]
  },
  // [!code ++]
  "stylelint.validate": ["css", "scss", "vue"]
}
```

:::
