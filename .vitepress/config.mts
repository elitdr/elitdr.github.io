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
    search: {
      provider: "local",
    },
    nav: [
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
            { text: "Eslint", link: "/article/code-standard/eslint" },
            { text: "Prettier", link: "/article/code-standard/prettier" },
            {
              text: "Stylelint",
              link: "/article/code-standard/stylelint",
            },
            { text: "Husky", link: "/article/code-standard/husky" },
            {
              text: "commitlint",
              link: "/article/code-standard/commitlint",
            },
            {
              text: "lint-staged",
              link: "/article/code-standard/lint-staged",
            },
            {
              text: "VSCode",
              link: "/article/code-standard/vscode",
            },
          ],
        },
      ],
    },
    outline: {
      level: [2, 3],
      label: "页面导航",
    },
    socialLinks: [{ icon: "github", link: "https://github.com/elitdr" }], // 社交链接
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short",
      },
    }, // 最后更新时间
  },
  markdown: {
    container: {
      tipLabel: "提示：",
      warningLabel: "警告：",
      dangerLabel: "危险：",
      infoLabel: "信息：",
      detailsLabel: "详情：",
    },
    lineNumbers: true, // 显示行号
    image: {
      lazyLoading: true, // 图片懒加载
    },
    config(md) {
      md.use(groupIconMdPlugin); // 图标插件
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin(), // 图标插件
    ],
  },
});
