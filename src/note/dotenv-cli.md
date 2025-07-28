# dotenv-cli

[dotenv-cli](https://github.com/entropitor/dotenv-cli) 是一个命令行工具，允许您在执行命令时从 `.env` 文件加载环境变量。这对于在不同环境（开发、测试、生产）中运行脚本特别有用。

## 安装

```bash
npm install -g dotenv-cli
```

或者作为项目依赖安装：

```bash
npm install -D dotenv-cli
```

## 基本使用

### 执行命令时加载默认 .env 文件

```bash
dotenv command
```

例如：

```bash
dotenv node server.js
```

### 指定特定的环境文件

```bash
dotenv -e .env.production -- node server.js
```

### 加载多个环境文件

```bash
dotenv -e .env.local -e .env -- node server.js
```

## 常用选项

| 选项               | 描述                            |
| ------------------ | ------------------------------- |
| `-e`, `--env`      | 指定要加载的环境文件路径        |
| `-v`, `--variable` | 设置特定的环境变量（key=value） |

## 实际应用示例

### 在 package.json 中使用

```json
{
  "scripts": {
    "dev": "dotenv node server.js",
    "start": "dotenv -e .env.production -- node server.js"
  }
}
```

## 最佳实践

1. 根据环境创建不同的 `.env` 文件：
   - `.env.development`
   - `.env.staging`
   - `.env.production`

2. 在 `package.json` 脚本中使用 dotenv-cli 简化命令：

```json
{
  "scripts": {
    "dev": "dotenv -e .env.development -- node index.js",
    "staging": "dotenv -e .env.staging -- node index.js",
    "prod": "dotenv -e .env.production -- node index.js"
  }
}
```

3. 确保将 `.env` 文件添加到 `.gitignore` 中以保护敏感信息：

```gitignore
# dotenv environment variables files
.env*
!.env.example
```

## 故障排除

### 环境变量未加载

确保 `.env` 文件格式正确，并且在执行命令前没有其他进程占用了环境变量。
