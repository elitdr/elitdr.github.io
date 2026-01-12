# 代码规范

在现代前端开发中，代码规范是保证团队协作和代码质量的重要因素。通过使用一系列工具，我们可以自动化地检查和格式化代码，确保整个项目的代码风格一致。

## 工具链概览

我们使用以下工具来维护代码规范：

- [Eslint](/article/code-standard/eslint) - JavaScript/TypeScript 代码检查和修复工具
- [Prettier](/article/code-standard/prettier) - 代码格式化工具
- [Stylelint](/article/code-standard/stylelint) - CSS/SCSS 代码检查工具
- [Husky](/article/code-standard/husky) - Git Hooks 工具，用于在 Git 生命周期中执行脚本
- [Commitlint](/article/code-standard/commitlint) - Git 提交信息规范检查工具
- [Lint-staged](/article/code-standard/lint-staged) - 仅对 Git 暂存区文件执行检查和格式化
- [.vscode](/article/code-standard/vscode) - VSCode 配置

## 工作流程

1. **本地开发阶段**：使用 Eslint、Stylelint 和 Prettier 进行实时代码检查和格式化
2. **代码提交阶段**：通过 Husky 和 Lint-staged，在提交前自动执行代码检查
3. **提交信息规范**：通过 Commitlint 检查 Git 提交信息是否符合规范

这套工具链能够帮助我们自动化地维护代码质量，减少代码审查中的格式问题讨论，让团队成员更专注于业务逻辑的实现。
