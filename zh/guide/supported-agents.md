---
title: 支持的智能体
description: Codeg 通过 ACP 驱动的十二个编程智能体——每一个是什么、需要什么运行环境，以及它把会话保存在磁盘的什么位置——以及如何注册一个不在名单上的智能体。
---

# 支持的智能体

Codeg 驱动**十二个编程智能体**，一旦其中一个开始运行，它们的使用感受都是一样的——同一个 composer、同样的 diff、同样的 git 和终端——因为 Codeg 通过 **Agent Client Protocol（ACP）**与每一个通信。不同之处在底层：智能体由谁构建、它在你的机器上需要什么运行时，以及它把自己的历史保存在哪里。本页就是这张地图。

启用一个智能体、它的预检健康检查，以及开启一个会话，都在[使用智能体](/zh/guide/agents)中介绍；登录和选择模型则在[认证与模型](/zh/guide/authentication)中。这里我们只专注于名单本身——以及在页面末尾，[如何为它添加新成员](#beyond-the-twelve)。

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

## ACP 适配器 {#acp-adapters}

Codeg 与智能体之间只说一种语言：**ACP**。十二个里有十个不需要为此付出什么，因为 Codeg 安装的那个包*本身就是*厂商自己的 CLI——Gemini、OpenClaw、OpenCode、Cline、Hermes、CodeBuddy、Kimi Code、Pi、Grok 和 Cursor 都自带这个协议，所以你手动装过的那一份，Codeg 会直接认出来。

**Claude Code 和 Codex 是仅有的两个例外。** Anthropic 的 `claude` CLI 和 OpenAI 的 `codex` CLI 并不会说 ACP。所以 Codeg 为这两个条目装的根本不是厂商 CLI，而是一个独立的 **ACP 适配器**：一个由 Agent Client Protocol 官方组织（该项目最初由 Zed 团队发起）维护的 npm 包，它把厂商的智能体包裹起来，翻译成这个协议。

| Codeg 里的条目 | 实际安装的包 | 可执行命令 | 上游仓库 |
| -------------- | ------------ | ---------- | -------- |
| **Claude Code** | `@agentclientprotocol/claude-agent-acp` | `claude-agent-acp` | [agentclientprotocol/claude-agent-acp](https://github.com/agentclientprotocol/claude-agent-acp) |
| **Codex** | `@agentclientprotocol/codex-acp` | `codex-acp` | [agentclientprotocol/codex-acp](https://github.com/agentclientprotocol/codex-acp) |

这张表回答的，正是本页最常见的那句困惑：**"我终端里明明有 `claude`，Codeg 却说没装。"** 这句话的两半其实都没错。Codeg 找的是 `claude-agent-acp` 而不是 `claude`，是 `codex-acp` 而不是 `codex`。它们不是同一个东西的两种叫法，而是两个不同的包、两个不同的可执行命令——有没有其中一个，说明不了另一个的情况。

从 **0.23** 起，应用会在你真正撞上这件事的地方把它讲清楚，而不再全靠本页：这两个智能体在**设置 → 智能体**中的名称旁带有一个 **ACP adapter** 徽章，其预检的第一行会解释这个区别——包括它是否找到了你自己的 CLI、在哪里找到的——并带有一个直接跳到这里的**了解更多**链接。

装适配器不会动你已有的 CLI。它是一个用着自己名字的独立包，不会覆盖、升级或卸载你的 `claude` 和 `codex`。它也并不*需要*它们：每个适配器都自带运行时，`claude-agent-acp` 依赖 `@anthropic-ai/claude-agent-sdk`，`codex-acp` 依赖 `@openai/codex`，安装时一并带下来。所以在一台从没装过厂商 CLI 的机器上，这两个智能体照样能跑。

适配器真正与 CLI 共用的是配置——登录状态也在其中。Claude Code 读的是 `~/.claude`（用 `CLAUDE_CONFIG_DIR` 可以改），Codex 读的是 `~/.codex`（用 `CODEX_HOME` 可以改）：正是两个 CLI 各自使用的目录，也正是 Codeg 的设置面板所写入的那两个文件——`~/.claude/settings.json` 和 `~/.codex/config.toml`。你在终端里登录过一次，适配器就沿用那个账号，不必再登录一遍。历史记录也遵循同样的规则，仍留在厂商自己的目录里，[见下方的表格](#where-each-agent-keeps-its-sessions)。

::: tip 让 Codex 适配器改用你指定的可执行文件
在 Codex 智能体的**环境变量**中设置 `CODEX_PATH`，`codex-acp` 就会运行你指定的那个可执行文件，而不是它自带的那一份——如果你手头留着某个特定的 `codex` 构建版本，这会很有用。→ [使用智能体](/zh/guide/agents#configure-an-agent)
:::

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

[自定义智能体](/zh/guide/custom-agents)在这张表里没有对应的行，因为它通常不会留下 Codeg 能读取的存储。对于这类智能体，Codeg 会自己写下历史——在 `acp-transcripts/<registry-id>/`（默认位于 `~/.codeg/`）下为每个会话保存一份只追加的 JSONL 对话记录——并像读取原生存储一样把它读回来。由于它属于 Codeg 自己的数据，它跟随 `CODEG_HOME`（或 `CODEG_DATA_DIR`）迁移，而不是跟随任何智能体的变量。

## 智能体之间有何不同 {#how-agents-differ}

界面是完全一样的，但有几处会因智能体而异——值得了解，以免有什么让你措手不及：

- **模型和模式来自智能体，而非 Codeg。** 模型下拉菜单和模式下拉菜单（计划优先、接受编辑等）列出的是所连接智能体通过 ACP 报告的任何内容。两个智能体会提供不同的模型和不同的模式——那是智能体在说话，而不是 Codeg 的某项设置。→ [认证与模型](/zh/guide/authentication)
- **登录方式也不同。** 有些智能体用它们自己的订阅或 OAuth 登录，另一些则接受提供商 API 密钥或自定义端点。每个智能体的详情面板只显示适用于它的选项。→ [认证与模型](/zh/guide/authentication)
- **OpenClaw 不参与 MCP。** 它是唯一一个不接受 Model Context Protocol 服务器的智能体，因此你添加的 MCP 服务器不会到达 OpenClaw 会话——Codeg 不会向它转发任何一个。大多数其他智能体会正常接收你的 MCP 服务器。→ [MCP 服务器](/zh/guide/mcp)

## 十二个之外 {#beyond-the-twelve}

上面的名单是 Codeg **手工适配**的那一批——其中每个智能体都获得了针对其会话文件的解析器、自己的设置面板，以及应对其种种怪癖所需的各种小改动。正是这些工作才换来表中的一席之地。

不过，这并不是 Codeg 能驱动的边界。ACP 是一项开放标准，所以从 **0.22** 起，你可以注册任何其他会说这门语言的智能体：从该协议的公开注册表中挑一个，或粘贴它的 distribution JSON。Codeg 会安装它、运行同样的预检、替它记录历史，并在其余各处都把它当作内置智能体对待——选择器、状态栏、搜索和委派。→ [自定义智能体](/zh/guide/custom-agents)

## 后续步骤 {#next-steps}

- [**使用智能体**](/zh/guide/agents)——启用其中一个，运行它的预检，然后开启一个会话。
- [**自定义智能体**](/zh/guide/custom-agents)——添加一个不在这份名单上的兼容 ACP 的智能体。
- [**认证与模型**](/zh/guide/authentication)——为你所选的智能体登录并挑选一个模型。
- [**对话聚合**](/zh/guide/aggregation)——从上面列出的存储中导入会话。
