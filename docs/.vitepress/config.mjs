import { defineConfig } from 'vitepress'

// 部署基础路径
const base = process.env.BASE || '/dao-docs/'

export default defineConfig({
  title: "德傲", // 网站标题
  description: "知识学习 | 日积月累", // 网站描述
  base: base, // 站点前缀
  head: [
    ['meta', { name: 'keywords', content: '德傲' }],
    ['link', { rel: 'shortcut icon', type: 'image/png', href: `${base}logo.png` }],
    // ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: `${base}favicon.ico` }],
    // ['link', { rel: 'shortcut icon', type: 'image/svg+xml', href: `${base}logo.svg` }],
    // ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }],
  ], // 添加网站图标
  themeConfig: { // 网站样式
    logo: '/logo.png',
    // 顶部导航栏配置
    nav: [
      { text: '首页', link: '/' },
      { text: '框架梳理', link: '/tools/vitepress/vitepress' },
      { text: '编程语言', link: '/tools/vitepress/vitepress' },
      { text: '数据库知识', link: '/tools/vitepress/vitepress' },
      { text: '德傲博客', link: '/tools/vitepress/vitepress' },
      {
        text: '关于作者',
        items: [
          { text: '自我介绍', link: '/about/about' },
          { text: 'gitee', link: 'https://gitee.com/starvv_w/dao-docs' },
          { text: 'github', link: 'https://github.com/dao-666' },
        ]
      },
    ],
    // 左侧导航栏配置
    sidebar: {
      '/': [
        {
          text: '首页',
          link: '/',
        },
      ],
      '/about/': [
        {
          text: '自我介绍',
          link: '/about/about',
        },
      ],
      '/database/': [
        {
          text: '数据库知识',
          link: '/database/database',
        },
        {
          text: 'mysql',
          link: '/database/mysql/mysql',
        },
        {
          text: 'oracle',
          link: '/database/oracle/oracle',
        },
        {
          text: 'postgresql',
          link: '/database/postgresql/postgresql',
        },
        {
          text: 'redis',
          link: '/database/redis/redis',
        },
        {
          text: 'sqlite',
          link: '/database/sqlite/sqlite',
        },
        {
          text: 'taos',
          link: '/database/taos/taos',
        },
      ],
      '/feifan/': [
        {
          text: '非凡项目实施',
          collapsed: true,
          items: [
            { text: '环境搭建', link: '/feifan/install' },
            { text: '数据备份', link: '/feifan/backup' }
          ]
        },
        {
          text: '非凡新人培训',
          collapsed: true,
          items: [
            { text: '环境搭建', link: '/feifan/111' },
            { text: '数据备份', link: '/feifan/222' }
          ]
        },
      ],
      '/program/': [
        {
          text: 'uniapp',
          collapsed: true,
          items: [
            { text: 'uniapp', link: '/program/uniapp/uniapp' },
            { text: 'unicloud', link: '/program/uniapp/unicloud' }
          ]
        },
        {
          text: 'amis',
          collapsed: true,
          items: [
            { text: 'amis', link: '/program/amis/amis' },
          ]
        },
        {
          text: 'vitepress',
          collapsed: true, // 设置侧边栏默认折叠 
          items: [
            { text: '知识点', link: '/tools/vitepress/vitepress' },
            { text: 'Runtime API Examples', link: '/api-examples' }
          ]
        },
      ]
    },
    // 顶部右侧 外部链接
    // socialLinks: [
    //   // { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    // ],
    // 开启搜索
    search: {
      provider: 'local'
    },
    // 前后翻页
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    // 页脚
    footer: {
      message: '欢迎来到德傲的小网站~~',
      copyright: '<span style="padding: 0 10px">@2024-版权所有</span><a href="http://beian.miit.gov.cn/" style="color: var(--vp-c-brand)">冀ICP备2021009994号</a>'
    },
    // 上次更新时间是否开启
    lastUpdated: {
      text: '上次更新',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short'
      }
    },
    // 右侧锚点导航
    outline: {
      level: [1, 6], //h1到h6
      label: '目录'
    },
    // 广告，需配合Carbon Ads
    // carbonAds: {
    //     code: 'your-carbon-code',
    //     placement: 'your-carbon-placement'
    // }
  },
  markdown: {
    lineNumbers: true, //代码显示行号
    image: {
      lazyLoading: true, // 开启图片懒加载
    },
  }
})
