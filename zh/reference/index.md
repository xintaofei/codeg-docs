---
title: 参考
description: 参考手册 —— 逐屏梳理 Codeg 的设置界面、应用的构建方式、它如何处理你的数据，以及如何从源码构建它。
---

# 参考

[指南](/zh/guide/)讲的是*怎么做* —— 如何运行智能体、接入频道、生成文档。而本节讲的是*是什么*：逐屏带你了解 Codeg 的**设置**、应用的**构建方式**、它如何对待你的**数据**，以及如何**从源码**构建它。当你盯着某个具体的开关、想确切知道它的作用时，就来查阅这里。

Codeg 的一些设置界面足够复杂，因而在指南中拥有各自的操作教程 —— MCP、技能、智能体。其余的则是你设置一次便可忘记的配置。下面的地图涵盖了**全部**界面，让你总能找到某个界面在何处有文档说明，然后直接跳转过去。

## 设置全貌 {#the-settings-surface}

Codeg 将每一项偏好都汇集到同一个**设置**窗口中（其侧边栏标题为*偏好设置*）。以下是完整的全貌，按应用列出的顺序排列，并标明每个界面的文档所在位置：

| 设置界面 | 控制内容 | 文档位置 |
| --------------- | ---------------- | ------------- |
| **Appearance** | 主题模式与配色、窗口缩放、字体、桌面宠物 | [外观](/zh/reference/settings/appearance) |
| **General** | 默认终端、渲染、桌面通知与提示音，以及协作与反馈开关 | [通用](/zh/reference/settings/general) |
| **MCP** | Model Context Protocol 服务器 —— 添加、扫描、按智能体启用 | [指南 → MCP 服务器](/zh/guide/mcp) |
| **Skills** | 编写和编辑你自己的智能体技能 | [指南 → 技能](/zh/guide/skills) |
| **Skill Packs** | 精选合集 —— Experts、Science、Office | [指南 → 技能](/zh/guide/skills#enable-a-curated-skill-pack) |
| **Agents** | 智能体 CLI —— 连接、配置、运行预检，以及[注册你自己的](/zh/guide/custom-agents) | [指南 → 使用智能体](/zh/guide/agents) |
| **Model Providers** | 智能体使用的 API 提供商凭据 | [指南 → 认证与模型](/zh/guide/authentication) |
| **Quick Messages** | 供 composer 使用的可复用消息片段 | [快捷消息](/zh/reference/settings/quick-messages) |
| **Shortcuts** | 键盘快捷键 | [快捷键](/zh/reference/settings/shortcuts) |
| **Version Control** | Git 可执行文件、GitHub、GitLab 及其他 Git 账户 | [版本控制](/zh/reference/settings/version-control) |
| **Chat Channels** | 用于通知和远程控制的 IM 机器人 | [指南 → 聊天频道](/zh/guide/chat-channels) |
| **Web Service** | 将 Codeg 暴露给浏览器 —— 端口、令牌、二维码 *（仅桌面应用）* | [Web 服务](/zh/reference/settings/web-service) |
| **Runtime Logs** | 诊断日志 —— 级别、实时查看器、文件 | [运行日志](/zh/reference/settings/logs) |
| **System** | 更新、开机自启、网络代理、语言、备份与恢复 | [系统](/zh/reference/settings/system) |

打开设置后，你会首先看到 **Appearance**。无论你运行桌面应用还是通过浏览器访问 Codeg，每个界面都完全相同 —— 只有一个例外：**Web Service** 仅在桌面应用中出现，因为正是这个界面*开启*了浏览器访问。

::: tip 六个界面在指南中有完整的操作教程
MCP、Skills、Skill Packs、Agents、Model Providers 和 Chat Channels 是你要*使用*的功能，而不仅仅是你调整的设置 —— 因此它们被写成了任务型指南。其余八个界面在这里以参考形式介绍。
:::

## 架构与安全 {#architecture-security}

Codeg 是如何构建的，以及它如何处理你所交付的内容。

- [**架构**](/zh/reference/architecture) —— 一个 Rust 核心，三个二进制文件：`codeg` 桌面应用、独立的 `codeg-server`，以及驱动委派的 `codeg-mcp` 伴生程序。各部分如何组合在一起，以及它们如何通过 ACP 驱动外部智能体 CLI。
- [**隐私与安全**](/zh/reference/privacy) —— 哪些内容留在你的机器上、网络何时才真正被使用，以及智能体凭据和 Web 服务令牌如何被处理。

## 贡献 {#contributing}

- [**开发**](/zh/reference/development) —— 环境要求、每个二进制文件的构建命令，以及从源码构建 Codeg 的开发流程。

---

这里的一切描述的都是你实际运行的应用 —— 桌面应用或[服务器](/zh/getting-started/deployment)。至于项目本身 —— Codeg 背后的人、社区以及许可证 —— 请参见[关于](/zh/about)。
