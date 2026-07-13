# Architecture

Codeg is a Next.js frontend over a shared Rust core, reached either through Tauri IPC (desktop) or HTTP + WebSocket (server). A transport abstraction lets the same UI drive both.

```text
Next.js 16 (Static Export) + React 19
        |
        | invoke() (desktop) / fetch() + WebSocket (web)
        v
  ┌─────────────────────────┐
  │   Transport Abstraction  │
  │  (Tauri IPC or HTTP/WS)  │
  └─────────────────────────┘
        |
        v
┌─── Tauri Desktop ───┐    ┌─── codeg-server ───┐
│  Tauri 2 Commands    │    │  Axum HTTP + WS    │
│  (window management) │    │  (standalone mode) │
└──────────┬───────────┘    └──────────┬─────────┘
           └──────────┬───────────────┘
                      v
            Shared Rust Core
              |- AppState
              |- ACP Manager
              |- Parsers (conversation ingestion)
              |- Chat Channels
              |- Git / File Tree / Terminal
              |- MCP marketplace + config
              |- Office Tools (officecli) + Automations
              |- SeaORM + SQLite
                      |
              ┌───────┼───────┐
              v       v       v
  Local Filesystem  Git   Chat Channels
    / Git Repos    Repos  (Telegram, Lark, iLink)
```

## Layers

- **Frontend** — Next.js 16 (static export) + React 19, served identically on desktop and web.
- **Transport abstraction** — the UI calls `invoke()` on desktop (Tauri IPC) or `fetch()` + WebSocket on the server; the rest of the app is unaware which is in use.
- **Shared Rust core** — one codebase powering both the Tauri desktop commands and the Axum HTTP/WS server: app state, the ACP manager, conversation parsers, chat channels, Git/file-tree/terminal, MCP marketplace + config, Office Tools and Automations, all persisted through SeaORM + SQLite.
- **Edges** — the core talks to the local filesystem and Git repos, and out to chat channels (Telegram, Lark, iLink).

Codeg's multi-agent connectivity is built on [ACP — the Agent Client Protocol](https://agentclientprotocol.com).
