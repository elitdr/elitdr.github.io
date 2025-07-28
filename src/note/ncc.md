# ncc

[ncc](https://github.com/vercel/ncc) 是由 Vercel 提供的命令行工具，可将 Node.js 项目及其全部依赖打包成一个单一的 JavaScript 文件，类似 gcc 编译语言的体验。它支持 TypeScript、ES 模块、动态 require、原生 Node 二进制模块等，并强调零配置使用。

## 安装方式

```sh
npm install -g @vercel/ncc
```

## 基本命令：

- `ncc build <入口文件>`：将入口文件及其依赖编译打包为单文件。
- `ncc run <入口文件>`：编译并执行，带源码映射支持，便于调试。
- `ncc cache clean|dir|size`：管理缓存。
- `ncc help / ncc version`：帮助与版本信息。

## 常用选项：

| 选项                       | 含义                      | 说明                                           |
| :------------------------- | :------------------------ | :--------------------------------------------- |
| `-o, --out [dir]`          | 输出目录                  | 指定构建输出目录，默认为 `dist`                |
| `-m, --minify`             | 压缩输出                  | 使用 terser 等工具压缩最终生成的代码           |
| `-C, --no-cache`           | 跳过构建缓存              | 构建时不使用或更新缓存                         |
| `-s, --source-map`         | 生成 source map           | 输出 sourcemap 文件，用于调试                  |
| `--no-source-map-register` | 不注入 source‑map‑support | 避免自动引入支持库，减少构建体积               |
| `-a, --asset-builds`       | 构建嵌套 JS 资源          | 用于 Worker 等场景，递归打包作为资源的 JS 文件 |
| `-e, --external [mod]`     | 排除模块不打包            | 多次使用可指定多个模块外部化                   |
| `-q, --quiet`              | 安静模式                  | 只显示错误日志，隐藏构建摘要信息               |
| `-w, --watch`              | 监听构建                  | 文件变动时自动重新构建                         |
| `-t, --transpile-only`     | 仅转译 TS，不进行类型检查 | 使用 ts-loader 的 transpileOnly 模式           |
| `--v8-cache`               | 输出 V8 编译缓存          | 提升启动速度，利用 V8 的编译缓存               |
| `--license [file]`         | 插入许可协议文本文件      | 将 license 信息写入输出目录                    |
| `--stats-out [file]`       | 输出 webpack 统计 JSON    | 生成打包统计结果 JSON 便于分析                 |
| `--target [es]`            | 设置 ECMAScript 目标版本  | 控制输出 JS 的兼容性，默认 `es2015`            |
| `-d, --debug`              | 显示调试日志              | 显示详细调试信息，有助于排查问题               |

## 使用限制

在使用 ncc 打包 Node.js 项目时，需要注意以下限制：

### 1. 不能使用 `fs.readdirSync(__dirname)`

由于 ncc 会将所有代码打包成单个文件，因此在运行时 `__dirname` 的行为会发生变化。在打包后的代码中，`__dirname` 将指向输出文件所在的目录，而不是原始源代码的目录，因此使用 `fs.readdirSync(__dirname)` 可能无法按预期工作。

如果需要访问文件系统中的资源，建议使用以下替代方案：

- 使用 `__dirname` 的相对路径，如 `path.join(__dirname, '../assets')`
- 将资源作为模块导入，利用 webpack 的资源处理能力
- 使用 `process.cwd()` 获取当前工作目录（但需注意运行时环境）

### 2. 幽灵依赖问题

ncc 依赖于项目的 package.json 来解析依赖关系。如果代码中直接使用了未在 dependencies 中声明的模块（即幽灵依赖），ncc 可能无法正确打包这些依赖，导致运行时错误。

为避免此问题：

- 定期检查并安装所有实际使用的依赖：`npm install <package-name>`
- 使用工具如 `depcheck` 检测项目中的依赖使用情况
- 确保所有使用的第三方库都正确添加到 dependencies 中
- 注意区分 dependencies 和 devDependencies，确保运行时依赖正确声明
