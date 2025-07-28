# cross-env

## 简介

[cross-env](https://github.com/kentcdodds/cross-env) 是一个跨平台设置环境变量的工具，它解决了不同操作系统设置环境变量语法不同的问题。无论你使用的是 Windows、macOS 还是 Linux，cross-env 都能确保你的 npm 脚本以相同的方式运行。

## 为什么需要 cross-env

不同操作系统设置环境变量的方式存在显著差异：

- **Unix/Linux/macOS** 系统使用：`NODE_ENV=production`
- **Windows** 系统使用：`set NODE_ENV=production`

这种差异会导致在不同平台上运行相同的 npm 脚本时出现问题。使用 cross-env 可以消除这些差异，让环境变量设置在所有平台上保持一致。

## 安装

```bash
# 安装为开发依赖
npm install -D cross-env
```

## 使用方法

### 在 package.json 中配置脚本

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development node app.js",
    "build": "cross-env NODE_ENV=production node app.js"
  }
}
```

### 常用场景示例

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack serve --config webpack.dev.js",
    "build": "cross-env NODE_ENV=production webpack --config webpack.prod.js",
    "test": "cross-env NODE_ENV=test jest"
  }
}
```

### 设置多个环境变量

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development API_URL=http://localhost:3000 node app.js"
  }
}
```

## 优势

1. **跨平台兼容性**：一次配置，到处运行
2. **简单易用**：只需在命令前加上 `cross-env`
3. **广泛支持**：适用于所有主流前端构建工具和任务运行器
4. **无副作用**：只影响当前命令的环境变量设置

## 注意事项

1. 确保正确安装 cross-env 为开发依赖
2. 在团队开发中，建议统一使用 cross-env 管理环境变量
3. 如果遇到命令找不到的问题，可以尝试删除 `node_modules` 和 `package-lock.json` 后重新安装依赖
