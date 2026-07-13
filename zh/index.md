---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Codeg
  text: 多智能体编程工作区
  tagline: 在一处运行每一个 AI 编程智能体——并让它们协同工作。
  image:
    src: /icon.svg
    alt: Codeg
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/getting-started/installation
    - theme: alt
      text: 什么是 Codeg？
      link: /zh/getting-started/
    - theme: alt
      text: 在 GitHub 上查看
      link: https://github.com/xintaofei/codeg

features:
  - icon: 📥
    title: 对话聚合
    details: 将每个受支持智能体的会话导入统一、可搜索的工作区——无论出自哪种工具，都汇聚成同一条时间线。
    link: /zh/guide/aggregation
    linkText: 了解更多
  - icon: 🤝
    title: 多智能体协作
    details: 主智能体将任务委派给不同类型的子智能体（Claude Code 调用 Codex、Gemini……）共同完成，每个子智能体作为独立会话运行。
    link: /zh/guide/multi-agent
    linkText: 了解更多
  - icon: 🚀
    title: 项目引导
    details: 通过实时预览的分屏可视化地脚手架新项目，然后直接在工作区中打开。
    link: /zh/guide/project-boot
    linkText: 了解更多
  - icon: 💬
    title: 聊天频道
    details: 从 Telegram、飞书（Lark）和 iLink（微信）驱动你的智能体——创建任务、审批权限、获取实时回复。
    link: /zh/guide/chat-channels
    linkText: 了解更多
  - icon: 📄
    title: Office 文档
    details: 通过内置的 officecli 创建、分析、校对和编辑 .docx / .xlsx / .pptx，并支持标签页内实时预览。
    link: /zh/guide/office
    linkText: 了解更多
  - icon: 🔬
    title: 科学研究
    details: 内置科研技能——假设、实验设计、统计、可视化——任何智能体都可调用。
    link: /zh/guide/research
    linkText: 了解更多
  - icon: ⚡
    title: 自动化
    details: 将一套 composer 配置保存为可复用的自动化，以无头方式按 cron 计划或按需运行。
    link: /zh/guide/automations
    linkText: 了解更多
  - icon: 🖥️
    title: 桌面、服务器与 Docker
    details: 以 Tauri 桌面应用、面向浏览器的独立 codeg-server，或通过 docker compose up 运行。
    link: /zh/getting-started/deployment
    linkText: 部署
---

## 一览 Codeg {#see-codeg-in-action}

<div class="light-only">

![Codeg 主界面](/images/main-light.png)

</div>

<div class="dark-only">

![Codeg 主界面](/images/main-dark.png)

</div>

<div class="cta-row">
  <a class="cta cta--brand" href="/zh/getting-started/installation">获取桌面应用 →</a>
  <a class="cta" href="/zh/getting-started/deployment">运行服务器</a>
  <a class="cta" href="/zh/guide/">浏览指南</a>
</div>
