# 代码规范

在现代前端开发中，代码规范是保证团队协作和代码质量的重要因素。通过使用一系列工具，我们可以自动化地检查和格式化代码，确保整个项目的代码风格一致。

## 工具链概览

我们使用以下工具来维护代码规范：

- [Eslint](./eslint.md) - JavaScript/TypeScript 代码检查和修复工具
- [Prettier](./prettier.md) - 代码格式化工具
- [Stylelint](./stylelint.md) - CSS/SCSS 代码检查工具
- [Husky](./husky.md) - Git Hooks 工具，用于在 Git 生命周期中执行脚本
- [Commitlint](./commitlint.md) - Git 提交信息规范检查工具
- [Lint-staged](./lint-staged.md) - 仅对 Git 暂存区文件执行检查和格式化

## 工作流程

1. **本地开发阶段**：使用 Eslint、Stylelint 和 Prettier 进行实时代码检查和格式化
2. **代码提交阶段**：通过 Husky 和 Lint-staged，在提交前自动执行代码检查
3. **提交信息规范**：通过 Commitlint 检查 Git 提交信息是否符合规范

这套工具链能够帮助我们自动化地维护代码质量，减少代码审查中的格式问题讨论，让团队成员更专注于业务逻辑的实现。

## 配置文件

项目中相关的配置文件：

- [eslint.config.mjs](../../..//eslint.config.mjs) - Eslint 配置文件
- [.prettierrc](../../..//.prettierrc) - Prettier 配置文件
- [.stylelintrc.json](../../..//.stylelintrc.json) - Stylelint 配置文件
- [commitlint.config.mjs](../../..//commitlint.config.mjs) - Commitlint 配置文件
- [.husky](../../..//.husky/) - Husky 配置目录
- [.lintstagedrc](../../..//.lintstagedrc) - Lint-staged 配置文件

详细配置和使用方法请参考各工具的具体文档。
