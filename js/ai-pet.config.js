window.BlogAIPetConfig = {
  enabled: true,
  endpoint: "",
  method: "POST",
  requestTimeoutMs: 12000,
  initialMessage: "你好，我是你的网站桌宠。想聊点什么呢。",
  placeholder: "输入你想问的问题...",
  welcomeByPath: {
    "/": "欢迎来到首页，今天想学点什么？",
    "/about/": "这是关于页，我可以帮你快速了解站点内容。",
    "/archives/": "这里是归档页，我可以帮你按主题找文章。"
  },
  quickActions: [
    "给我推荐 3 篇 Java 文章",
    "最近有哪些 LLM 相关内容",
    "我想快速入门机器学习"
  ],
  avatarImage: "/image/BlogCover/sakura.PNG",
  petName: "小樱",
  localFallback: true
};
