import { defineConfig } from "vitepress";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from "vitepress-plugin-group-icons";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src", // 源目录
  title: "elitdr 的个人主页",
  description: "记笔记、写文章和分享项目",
  head: [["link", { rel: "icon", href: "/avatar.png" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/avatar.png",

    nav: [
      { text: "首页", link: "/" },
      { text: "笔记", link: "/note/" },
      { text: "文章", link: "/article/" },
      { text: "项目", link: "/project/" },
    ],

    sidebar: {
      "/article/code-standard/": [
        {
          text: "代码规范",
          link: "/article/code-standard/",
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

    outline: {
      level: [2, 3],
      label: "页面导航",
    },

    socialLinks: [{ icon: "github", link: "https://github.com/elitdr" }], // 社交链接
  },
  markdown: {
    lineNumbers: true, // 显示行号
    image: {
      lazyLoading: true, // 图片懒加载
    },
    config(md) {
      md.use(groupIconMdPlugin); // 图标插件
    },
  },
  lastUpdated: true, // 最后更新时间
  vite: {
    plugins: [
      groupIconVitePlugin(), // 图标插件
    ],
  },
});
