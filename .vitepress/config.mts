import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src", // 源目录
  title: "elitdr 的个人主页",
  description: "记笔记、写文章和分享案例",
  head: [["link", { rel: "icon", href: "/avatar.png" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/avatar.png",

    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/article/markdown-examples" },
      { text: "代码规范", link: "/article/code-standard/husky" },
    ],

    sidebar: {
      "/": [
        {
          text: "Examples",
          items: [
            { text: "Markdown Examples", link: "/article/markdown-examples" },
            { text: "Runtime API Examples", link: "/article/api-examples" },
          ],
        },
      ],
      "/article/code-standard/": [
        {
          text: "代码规范",
          items: [
            { text: "Husky", link: "/article/code-standard/husky" },
            { text: "commitlint", link: "/article/code-standard/commitlint" },
            { text: "Prettier", link: "/article/code-standard/prettier" },
            { text: "Eslint", link: "/article/code-standard/eslint" },
            { text: "Stylelint", link: "/article/code-standard/stylelint" },
            { text: "lint-staged", link: "/article/code-standard/lint-staged" },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/elitdr" }],
  },
  markdown: {
    lineNumbers: true, // 显示行号
    image: {
      lazyLoading: true, // 图片懒加载
    },
  },
  lastUpdated: true, // 最后更新时间
});
