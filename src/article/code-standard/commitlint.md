# commitlint

[commitlint](https://github.com/conventional-changelog/commitlint) 是一个用于检查 `git commit` 提交消息是否规范的工具。

## 安装

```sh
npm install -D @commitlint/cli
```

## 配置

执行以下脚本，生成 [commitlint.config.mjs](https://github.com/conventional-changelog/commitlint?tab=readme-ov-file#important-note-about-node-24) 配置文件。

```sh
echo "export default {extends: ['@commitlint/config-angular']};" > commitlint.config.mjs
```

::: warning 注意
Windows 下 echo > 创建的文件编码格式为 UTF-16LE 会导致报错，正确格式应为 UTF-8，所以请手动创建 `commitlint.config.mjs` 文件并写入配置`export default {extends: ['@commitlint/config-angular']};`。
:::

### @commitlint/config-angular

推荐使用 [@commitlint/config-angular](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-angular) 配置，也可[自行配置](https://github.com/conventional-changelog/commitlint?tab=readme-ov-file#shared-configuration)。

```sh
npm install -D @commitlint/config-angular
```

#### commit 类型

| 提交类型 |                      作用描述                       |
| :------: | :-------------------------------------------------: |
|   feat   |         新增功能或特性（触发次版本号更新）          |
|   fix    |         修复程序错误/Bug（触发修订号更新）          |
|   docs   |        文档更新（README、注释等非代码变更）         |
|  style   |    代码格式调整（空格/缩进/分号等，不改变逻辑）     |
| refactor |          代码重构（优化结构但不影响功能）           |
|   perf   |              性能优化（提升执行效率）               |
|   test   |          测试相关变更（添加/修改测试用例）          |
|  build   |     构建系统或依赖更新（Webpack/npm/Maven 等）      |
|    ci    | 持续集成配置（GitHub Actions/Jenkins/Travis CI 等） |
|  revert  |                 撤销之前的某次提交                  |

## 集成到 Husky

确保已完成 [Husky](husky) 的步骤，随后执行以下脚本后即可以使用。

```sh
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

::: warning 注意
Windows 下 echo > 创建的文件编码格式为 UTF-16LE 会导致报错，正确格式应为 UTF-8，所以请手动创建 `.husky/commit-msg` 文件并写入配置`npx --no -- commitlint --edit $1`。
:::
