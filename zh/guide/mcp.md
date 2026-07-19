---
title: MCP 服务器
description: 用 Model Context Protocol 服务器为你的智能体提供额外的工具和数据源——从注册表添加它们或手动添加，并选择哪些智能体获得每一个，一切都在 Codeg 中的同一处完成。
---

# MCP 服务器

**Model Context Protocol（MCP）**是一项开放标准，用于向编码智能体交付额外的工具和数据——一个 GitHub 服务器、一个 Postgres 连接、一个无头浏览器、你公司的内部 API。Codeg 驱动的任何智能体都可以使用 MCP 服务器；问题在于，每一个智能体都用它*各自*的配置文件、各自的格式保存自己的 MCP 设置。Codeg 是统一管理它们的唯一入口：只需添加一次服务器，勾选哪些智能体应当拥有它，Codeg 就会替你把它写入它们各自的配置中。

Codeg 并不运行这些工具——MCP 是*智能体*的功能，服务器与智能体通信，而非与 Codeg 通信。Codeg 提供给你的是其上的管理层：对已安装内容的扫描、一个可搜索的、用于添加更多服务器的注册表，以及针对每个服务器的按智能体开关，这样你就再也无需为每个 CLI 手动编辑不同的文件。

## MCP 服务器在何处管理 {#where-mcp-servers-are-managed}

打开**设置 → MCP**。这是一个双栏界面。左栏有两个标签页——**本地**（已在你机器上的服务器）和**市场**（可从中安装的注册表）——右栏则是你所选内容的详情与编辑器。

## 在 Codeg 眼中服务器是什么样的 {#what-a-server-looks-like-to-codeg}

每个服务器都是一个 **id** 加上一个 **spec**（一个小的 JSON 对象），再加上它被启用的**智能体**集合。spec 有两种形态：

- **stdio**——你的智能体启动并通过 stdin/stdout 与之通信的本地命令：
  ```json
  {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": { "GITHUB_TOKEN": "ghp_…" }
  }
  ```
- **remote**——智能体连接到的 **HTTP** 或 **SSE** 端点：
  ```json
  {
    "type": "http",
    "url": "https://mcp.example.com/sse",
    "headers": { "Authorization": "Bearer …" }
  }
  ```

编辑器强制执行的一条经验法则：**`env` 属于 stdio 服务器**，在那里它用于设置所启动进程的环境。而 remote 服务器则改用 `headers` 携带其密钥——若你把 `env` 放到 HTTP/SSE 的 spec 上，Codeg 会警告你。

## 从注册表安装 {#install-from-a-registry}

**市场**标签页会搜索一个市场。内置了两个：

- **官方 MCP 注册表**——`registry.modelcontextprotocol.io`，权威索引。
- **Smithery**——一个庞大的社区目录。

选择一个提供方，搜索，然后选中一个结果以查看它的详情——描述、主页、它支持的协议、版本，以及它是否已验证。点击**安装**，Codeg 会引导你完成：

1. **协议**——一个服务器可能提供不止一种运行方式（比如 stdio *或*一个托管的 HTTP 端点）；选择其一。
2. **参数**——填写该选项所需的内容：API 密钥、端点、标志。必填字段会被标记，密钥会被遮蔽，且每一项都有自己的类型（文本、数字、布尔值、一组固定的选项，或 JSON）。
3. **目标应用**——勾选哪些智能体获得该服务器。

确认后，Codeg 会把完成的 spec 写入每个选定智能体的配置中。

## 手动添加一个 {#add-one-by-hand}

明确知道你想要什么？在**本地**标签页，点击**新建 MCP**，为它指定一个 id，粘贴 spec JSON，并选择智能体。它会与那些从注册表安装的服务器并列出现。对于任何不在任何目录中的服务器——内部工具、你正在开发的东西、一次性的用途——都走这条路。

## 扫描已有的内容 {#scan-what-s-already-there}

**本地**标签页不仅显示你*在* Codeg 中添加的内容——它还会**扫描你的智能体自己的配置文件**，并列出它找到的每一个 MCP 服务器。因此，你通过手动编辑 `~/.claude.json` 设置的服务器，或另一个工具安装的服务器，也会显示在这里，随时可以编辑、移除，或为*更多*智能体开启。**刷新**会重新运行扫描。

## 选择哪些智能体获得某个服务器 {#choose-which-agents-get-a-server}

每个服务器的详情面板都有一行**已启用应用**——每个智能体一个复选框。Codeg 会把服务器写入你所勾选的每个智能体的原生 MCP 配置中，并在你取消勾选时将其移除：

| 智能体 | Codeg 将它写入何处 |
| ----- | --------------------- |
| **Claude Code** | `~/.claude.json`（`mcpServers`） |
| **Codex** | Codex 的 `config.toml`（`[mcp_servers.*]`） |
| **Gemini** | `~/.gemini/settings.json` |
| **OpenCode**、**Cline**、**Hermes**、**CodeBuddy**、**Kimi Code**、**Grok**、**Cursor** | 各智能体自己的 MCP 配置 |

这就是**十二个智能体中的十个**——除 **OpenClaw** 和 **Pi** 之外的每一个。OpenClaw 根本不接受 MCP 服务器（它是唯一选择不参与的智能体），因此不会作为目标提供；Pi 也不在列表中。→ [智能体之间有何不同](/zh/guide/supported-agents#how-agents-differ)

::: tip 更改在下一个会话生效
因为服务器存在于智能体的配置中，智能体会在它**启动会话**时读取它。添加或更改服务器后，它会对新的对话生效；对于一个已经打开的对话，**重新连接以应用**会在不丢失你历史的情况下加载新配置。→ [配置智能体](/zh/guide/agents#configure-an-agent)
:::

## 须知 {#good-to-know}

- **密钥位于智能体的配置文件中。** 你输入到某个服务器的 `env`、`headers` 或某个安装参数中的 API 密钥，会被写入每个被分配智能体在磁盘上各自的配置里——也就是那些智能体本就用来保存设置的同一批文件——并未加密存储。请把对你机器的访问权当作边界，正如对待[智能体凭据](/zh/guide/authentication#where-credentials-are-stored)一样。
- **stdio 服务器需要其命令可用。** `npx`、`uvx`、某个二进制文件——凡是 spec 所启动的东西，都必须位于智能体运行时所用的 PATH 上，否则服务器不会启动。
- **在服务器上运作方式相同。** MCP 界面同样在浏览器版本中；一个 remote 服务器只需要 Codeg 运行所在的机器能够访问该端点。
- **移除一个服务器**会一次性把它从所有曾启用它的智能体中删除——你无需逐一手动清理每份配置。

## 后续步骤 {#next-steps}

- [**技能**](/zh/guide/skills)——扩展智能体的另一种方式：可复用的指令包，按智能体启用，用一个 `/command` 调用。
- [**支持的智能体**](/zh/guide/supported-agents#how-agents-differ)——哪些智能体接受 MCP 服务器，以及它们在其他方面有何不同。
- [**使用智能体**](/zh/guide/agents#configure-an-agent)——重新连接一个正在运行的会话以应用配置更改。
