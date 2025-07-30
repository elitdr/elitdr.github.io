# dotenv

[dotenv](https://github.com/motdotla/dotenv) 是一个零依赖的模块，可将环境变量从 `.env` 文件加载到 `process.env` 中。

## 安装

```bash
npm install dotenv
```

## 使用方法

### 创建 .env 文件

在项目根目录创建 `.env` 文件：

```env
# 数据库配置
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3
DB_NAME=myapp

# API 密钥
API_KEY=1234567890

# 服务端口
PORT=3000

# 环境标识
NODE_ENV=development
```

### 在代码中加载环境变量

在应用程序入口文件顶部添加以下代码：

```javascript
require("dotenv").config();
```

或者使用 ES6 语法：

```javascript
import dotenv from "dotenv";
dotenv.config();
```

### 使用环境变量

加载后，可以在代码中通过 `process.env` 访问这些变量：

```javascript
const dbHost = process.env.DB_HOST;
const apiKey = process.env.API_KEY;
const port = process.env.PORT || 3000;
```

## .env 文件语法

### 注释

使用 `#` 开头的行是注释：

```env
# 这是一条注释
DB_HOST=localhost
```

### 导出变量

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3
```

### 空白行

空白行会被忽略：

```env
DB_HOST=localhost
DB_USER=root

DB_PASS=s1mpl3
```

### 嵌套变量

使用 `${VAR}` 语法嵌套变量：

```env
DB_HOST=localhost
DB_URL=mysql://${DB_HOST}/myapp
```

### 默认值

使用 `${VAR:-default}` 语法设置默认值：

```env
DB_HOST=localhost
DB_PORT=${DB_PORT:-3306}
```

## 配置选项

### 自定义路径

```javascript
require("dotenv").config({ path: "/custom/path/to/your/env/file" });
```

### 自定义编码

```javascript
require("dotenv").config({ encoding: "latin1" });
```

### 调试模式

```javascript
require("dotenv").config({ debug: true });
```

### 覆盖现有变量

```javascript
require("dotenv").config({ override: true });
```

## 最佳实践

### 不同环境的配置文件

可以根据不同环境创建不同的 `.env` 文件：

- `.env` - 默认环境变量
- `.env.local` - 本地变量（除测试外都会加载）
- `.env.development` - 开发环境变量
- `.env.production` - 生产环境变量
- `.env.test` - 测试环境变量

### 添加到 .gitignore

确保将 `.env` 文件添加到 `.gitignore` 中，避免敏感信息泄露：

```gitignore
# dotenv environment variables file
.env
.env*.local
```

### 验证必需的环境变量

```javascript
const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_PASS", "API_KEY"];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`环境变量 ${envVar} 未定义`);
  }
});
```

## 常见问题

### 为什么环境变量是 undefined？

确保在访问环境变量之前调用 `dotenv.config()`，并且 `.env` 文件位于正确位置。
