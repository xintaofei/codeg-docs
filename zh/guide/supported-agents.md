---
title: 支持的智能体
description: Codeg 通过 ACP 驱动的十二个编程智能体——每一个是什么、需要什么运行环境，以及它把会话保存在磁盘的什么位置。
---

# 支持的智能体

Codeg 驱动**十二个编程智能体**，一旦其中一个开始运行，它们的使用感受都是一样的——同一个 composer、同样的 diff、同样的 git 和终端——因为 Codeg 通过 **Agent Client Protocol（ACP）**与每一个通信。不同之处在底层：智能体由谁构建、它在你的机器上需要什么运行时，以及它把自己的历史保存在哪里。本页就是这张地图。

启用一个智能体、它的预检健康检查，以及开启一个会话，都在[使用智能体](/zh/guide/agents)中介绍；登录和选择模型则在[认证与模型](/zh/guide/authentication)中。这里我们只专注于名单本身。

## 名单 {#the-roster}

Codeg 会为你安装、固定版本并更新其中的每一个——你从不需要手动去获取。你*确实*需要在机器上准备的，是每个智能体所运行的运行时：

| 智能体 | 是什么 | 运行环境 |
| ----- | ---------- | ------- |
| **Claude Code** | Anthropic 的 Claude 编程智能体 | Node.js |
| **Codex** | OpenAI 的编程助手 CLI | Node.js |
| **Gemini** | Google 官方的 Gemini CLI | Node.js |
| **OpenClaw** | 可自托管的个人 AI 助手 | Node.js |
| **OpenCode** | 一个开源编程智能体 | 捆绑二进制文件 |
| **Cline** | 一个自主编程智能体 CLI | Node.js |
| **Hermes** | Nous Research 的自我改进智能体 | Python（uv） |
| **CodeBuddy** | 腾讯云的 AI 编程助手 | Node.js |
| **Kimi Code** | Moonshot AI 的 CLI 编程助手 | Node.js |
| **Pi** | 一个可自我扩展的编程智能体 | Node.js |
| **Grok** | xAI 的编程智能体与 CLI | Node.js |
| **Cursor** | Anysphere 的 Cursor 编程智能体 | 捆绑二进制文件 |

最后一列背后有三条交付路径：

- **Node.js（npm）。** 十二个中有九个以 npm 包的形式交付，Codeg 用 `npx` 运行它们，因此它们需要安装 Node.js。Codeg 会为每一个固定一个已知可用的版本，并为你升级它。
- **捆绑二进制文件。** **OpenCode** 和 **Cursor** 是原生二进制文件，Codeg 会为你确切的平台下载它们——无需安装其他任何东西。Cursor 的下载体积更大，因为它自带 Node 运行时和工具，所以它同样不需要你的机器上有 Node.js。
- **Python（uv）。** **Hermes** 通过 `uv`（Python 工具运行器）运行；Codeg 会用一个固定版本的 Python 启动它，因此你无需管理环境。

上面的顺序是设置 → 智能体中**默认的智能体列表顺序**。它是一种偏好设置，而非排名——拖动智能体即可重新排序，而当没有其他方式为一段对话选定智能体时，第一个已启用的智能体就成为 Codeg 的后备选择。→ [使用智能体](/zh/guide/agents#start-a-session)

## 每个智能体把会话保存在何处 {#where-each-agent-keeps-its-sessions}

早在 Codeg 出现之前，每个智能体就以自己的位置和格式存储着自己的对话历史。这正是[对话聚合](/zh/guide/aggregation)在导入你过往工作时所读取的内容：Codeg 会在每个智能体的原生存储中查找你在所导入文件夹里运行过的会话，并列出它找到的内容。

以下就是"每个智能体的原生存储"实际所在的位置：

| 智能体 | 默认位置 | 格式 | 重定位变量 |
| ----- | ---------------- | ------ | ------------- |
| **Claude Code** | `~/.claude/projects/` | JSONL | `CLAUDE_CONFIG_DIR` |
| **Codex** | `~/.codex/sessions/` | JSONL | `CODEX_HOME` |
| **Gemini** | `~/.gemini/` | JSON 文件 | `GEMINI_CLI_HOME` |
| **OpenClaw** | `~/.openclaw/agents/` | JSONL | — |
| **OpenCode** | `~/.local/share/opencode/opencode.db` | SQLite | `XDG_DATA_HOME` |
| **Cline** | `~/.cline/data/` | JSON 文件 | `CLINE_DIR` |
| **Hermes** | `~/.hermes/state.db` | SQLite | `HERMES_HOME` |
| **CodeBuddy** | `~/.codebuddy/projects/` | JSONL | `CODEBUDDY_CONFIG_DIR` |
| **Kimi Code** | `~/.kimi-code/sessions/` | JSONL | `KIMI_CODE_HOME` |
| **Pi** | `~/.pi/agent/sessions/` | JSONL | `PI_CODING_AGENT_SESSION_DIR` |
| **Grok** | `~/.grok/sessions/` | JSONL | `GROK_HOME` |
| **Cursor** | `~/.cursor/chats/` | SQLite（blob 存储） | `CURSOR_CONFIG_DIR` |

大多数智能体写入一份 **JSONL 对话记录**——一种纯文本日志，每行一个事件——而 OpenCode 和 Hermes 把一切保存在单个 **SQLite** 数据库中，Cursor 把每段对话存为各自的 SQLite blob 文件，Gemini 和 Cline 则使用它们自己的 JSON 文件。Codeg 会原生读取每一种格式；你从不需要转换任何东西。

::: tip 移动过存储位置？Codeg 会跟随同一个变量。
用上面某个环境变量把智能体指向一个非默认位置，Codeg 也会遵从它——因此重定位后的历史仍能导入——只要 Codeg 在它自己的环境中能看到那个变量。OpenClaw 是例外：它的存储无法重定位。
:::

## 智能体之间有何不同 {#how-agents-differ}

界面是完全一样的，但有几处会因智能体而异——值得了解，以免有什么让你措手不及：

- **模型和模式来自智能体，而非 Codeg。** 模型下拉菜单和模式下拉菜单（计划优先、接受编辑等）列出的是所连接智能体通过 ACP 报告的任何内容。两个智能体会提供不同的模型和不同的模式——那是智能体在说话，而不是 Codeg 的某项设置。→ [认证与模型](/zh/guide/authentication)
- **登录方式也不同。** 有些智能体用它们自己的订阅或 OAuth 登录，另一些则接受提供商 API 密钥或自定义端点。每个智能体的详情面板只显示适用于它的选项。→ [认证与模型](/zh/guide/authentication)
- **OpenClaw 不参与 MCP。** 它是唯一一个不接受 Model Context Protocol 服务器的智能体，因此你添加的 MCP 服务器不会到达 OpenClaw 会话——Codeg 不会向它转发任何一个。大多数其他智能体会正常接收你的 MCP 服务器。→ [MCP 服务器](/zh/guide/mcp)

## 后续步骤 {#next-steps}

- [**使用智能体**](/zh/guide/agents)——启用其中一个，运行它的预检，然后开启一个会话。
- [**认证与模型**](/zh/guide/authentication)——为你所选的智能体登录并挑选一个模型。
- [**对话聚合**](/zh/guide/aggregation)——从上面列出的存储中导入会话。
