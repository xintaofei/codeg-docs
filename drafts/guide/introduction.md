# What is Codeg?

Codeg (Code Generation) is a **multi-agent coding workspace**. It brings multiple coding agents — Claude Code, Codex CLI, OpenCode, Gemini CLI, OpenClaw, Cline, Hermes Agent, CodeBuddy, Kimi Code, Pi, Grok Build, and more — into one workspace, with conversation aggregation and multi-agent collaboration, available as a desktop install plus server/Docker deployment.

![Codeg](/images/gallery.svg)

## Highlights

- **Conversation Aggregation** — import sessions from all supported agents into one unified workspace
- **Multi-Agent Collaboration** — within a single session, the main agent delegates to sub-agents of different types (e.g. Claude Code calling Codex, Gemini) to jointly complete a task, each running as an independent session
- **Parallel development** with built-in `git worktree` flows
- **Project Boot** — visually scaffold new projects with live preview
- **Office Documents** — create, analyze, proofread, and edit `.docx` / `.xlsx` / `.pptx` through the bundled `officecli` toolset, with live in-tab preview that refreshes as the agent edits
- **Scientific Research** — bundled science skills (hypothesis generation, experimental design, statistics, visualization, critical appraisal, literature search) any agent can invoke, managed per-agent
- **Automations** — save a composer setup as a reusable automation that runs headlessly, on a cron schedule or on demand
- **Chat Channels** — connect Telegram, Lark (Feishu), iLink (Weixin) and more to your coding agents for real-time notifications, full session interaction, and remote task control
- **MCP management** — local scan plus registry search and install
- **Skills management** — global and project scope
- **Git remote account management** — GitHub and other Git servers
- **Web service mode** — access Codeg from any browser for remote work
- **Standalone server deployment** — run `codeg-server` on any Linux/macOS server, access via browser
- **Docker support** — `docker compose up` or `docker run`, with custom token, port, and volume mounts for data persistence and project directories
- **Runtime Logs** — a live in-app log viewer with filtering and per-module log levels
- **Integrated engineering loop** — file tree, diff, git changes, commit, terminal

## Next steps

- [Getting Started](/guide/getting-started) — install Codeg and run your first session
- [Supported Agents](/guide/supported-agents) — see which agents Codeg can aggregate
- [Features](/features/) — explore what Codeg can do
- [Deployment](/deployment/) — desktop, server, and Docker options
