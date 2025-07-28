# Next.js

## 工具简介和核心作用

[Next.js](https://github.com/vercel/next.js) 是一个用于构建全栈 Web 应用程序的 React 框架。它提供了服务器端渲染（SSR）、静态站点生成（SSG）、API 路由、基于文件系统的路由等强大功能，可以帮助开发者轻松构建高性能的 React 应用。

Next.js 的核心作用包括：

- **服务器端渲染（SSR）**：提升 SEO 效果并改善首屏加载速度
- **静态站点生成（SSG）**：构建时生成静态 HTML，确保快速加载和良好的可扩展性
- **API 路由**：无需额外后端，即可轻松构建无服务器 API
- **智能文件路由系统**：文件系统即路由，简化路由配置
- **完善的工程化机制**：提供良好的开发和构建性能

## 安装方法

### 环境要求

- Node.js 12.22.0 或更高版本
- macOS、Windows（包括 WSL）和 Linux 均被支持

### 创建新项目

使用 create-next-app 创建新的 Next.js 项目：

```bash
npx create-next-app@latest my-next-app
# 或
yarn create next-app my-next-app
# 或
pnpm create next-app my-next-app
```

进入项目目录并启动开发服务器：

```bash
cd my-next-app
npm run dev
```

## 使用方法和配置示例

### 页面路由

Next.js 使用基于文件系统的路由系统。在 `pages` 目录中创建的文件会自动成为路由：

```jsx
// pages/index.js
export default function Home() {
  return <h1>Hello, Next.js!</h1>
}

// pages/about.js
export default function About() {
  return <h1>About Page</h1>
}
```

### 动态路由

创建动态路由只需在文件名中使用方括号：

```jsx
// pages/posts/[id].js
import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  return <p>Post: {id}</p>;
}
```

### 数据获取

Next.js 提供了多种数据获取方法：

1. `getStaticProps` - 用于静态生成页面时获取数据
2. `getStaticPaths` - 用于静态生成动态路由页面
3. `getServerSideProps` - 用于服务器端渲染时获取数据

```jsx
// pages/posts/[id].js
export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await getPostPaths();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.id);
  return { props: { post } };
}
```

### API 路由

在 `pages/api` 目录下创建 API 路由：

```js
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: "Hello from Next.js API!" });
}
```

### 样式处理

Next.js 支持多种样式解决方案：

```jsx
// 全局样式 - pages/_app.js
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

CSS Modules:

```jsx
// styles/Button.module.css
.button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}

// components/Button.js
import styles from '../styles/Button.module.css'

export default function Button({ children }) {
  return <button className={styles.button}>{children}</button>
}
```

## 常见使用场景

1. **企业级 Web 应用**：需要 SEO 优化和良好性能的复杂应用
2. **博客和内容网站**：需要静态生成和服务器端渲染的内容驱动网站
3. **电子商务网站**：需要快速加载和良好用户体验的在线商店
4. **仪表板应用**：需要数据获取和实时更新的后台管理系统
5. **静态网站**：需要高性能和低成本部署的展示型网站

## 工具优势分析

| 优势     | 说明                                          |
| -------- | --------------------------------------------- |
| 高性能   | 通过 SSR 和 SSG 提升页面加载速度和 SEO 效果   |
| 开发体验 | 热重载、自动代码分割、内置 CSS 支持等         |
| 灵活部署 | 支持静态导出、服务器端渲染等多种部署方式      |
| 丰富生态 | 与 React 生态系统无缝集成，拥有大量插件和工具 |
| 易于学习 | 对 React 开发者友好，文档完善，社区活跃       |

## 注意事项

1. **学习曲线**：对于初学者来说，Next.js 的概念较多，需要时间掌握
2. **项目大小**：对于简单项目，Next.js 可能过于复杂
3. **部署要求**：某些功能（如 SSR）需要 Node.js 服务器环境
4. **配置复杂性**：高级自定义配置可能比较复杂

## 环境变量

Next.js 内置了对环境变量的支持，可以在构建时和运行时使用环境变量。Next.js 通过在项目根目录下创建 `.env.local` 文件来定义环境变量。

Next.js 中环境变量的工作原理：

- 在构建时，Next.js 会将 `NEXT_PUBLIC_` 前缀的环境变量内联到客户端 JavaScript bundle 中
- 不带 `NEXT_PUBLIC_` 前缀的环境变量只能在服务器端代码中访问
- 环境变量在服务器端代码中通过 `process.env` 对象访问

### 创建环境变量文件

在项目根目录创建以下文件之一：

- `.env` - 默认环境变量
- `.env.local` - 本地环境变量（会被 git 忽略）
- `.env.production` - 生产环境变量
- `.env.development` - 开发环境变量

### 环境变量示例

```
# .env.local
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
NEXT_PUBLIC_API_URL=https://api.example.com
```

### 在代码中使用环境变量

```js
// 在服务器端代码中（如 API 路由、getServerSideProps 等）
export default function handler(req, res) {
  const dbHost = process.env.DB_HOST;
  const dbUser = process.env.DB_USER;
  const dbPass = process.env.DB_PASS;

  // 连接数据库的逻辑...

  res.status(200).json({ message: "Connected to database" });
}

// 在客户端代码中（只能访问 NEXT_PUBLIC_ 前缀的变量）
function MyComponent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div>
      <p>API URL: {apiUrl}</p>
    </div>
  );
}
```

### 安全性考虑

1. **敏感信息保护**：
   - 永远不要将敏感信息（如 API 密钥、数据库密码）提交到版本控制系统
   - 只有 `NEXT_PUBLIC_` 前缀的变量会暴露给客户端，其他变量仅在服务器端可用

2. **访问控制**：
   - 确保敏感环境变量只在服务器端代码中使用
   - 避免在客户端代码中打印或暴露环境变量

3. **加密存储**：
   - 在生产环境中，考虑使用云服务提供商的密钥管理服务（如 AWS Secrets Manager、Azure Key Vault）

4. **传输安全**：
   - 确保在生产环境中使用 HTTPS 传输数据

5. **定期轮换**：
   - 定期更换敏感的环境变量值，如 API 密钥和密码

### 故障排除

| 问题                                 | 可能原因                 | 解决方案                                   |
| ------------------------------------ | ------------------------ | ------------------------------------------ |
| 环境变量未生效                       | 文件名错误或位置不正确   | 确保文件名为 `.env.local` 并位于项目根目录 |
| 客户端无法访问环境变量               | 缺少 `NEXT_PUBLIC_` 前缀 | 为需要在客户端使用的变量添加前缀           |
| 环境变量在构建时未替换               | 变量在构建后更改         | 重新构建应用以使更改生效                   |
| 环境变量在本地工作但在生产环境不工作 | 生产环境未正确设置变量   | 检查生产环境的环境变量配置                 |

## 部署

### 打包

配置 `standalone` 导出模式。

::: code-group

```js [next.config.js]
const nextConfig = {
  // [!code ++]
  output: "standalone",
};
```

:::

### Dockerfile

不使用 Docker 时只需要将对应的文件拷贝出来即可。

```Dockerfile
FROM node:18

WORKDIR /app

COPY ./public .
COPY ./.next/standalone .
COPY ./.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
```
