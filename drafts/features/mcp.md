# MCP Servers

Codeg manages Model Context Protocol (MCP) servers for your agents — scan what's already installed, browse marketplaces, and add or edit servers. Manage them under **Settings → MCP**, which has two tabs: **Local MCP** and **MCP Marketplace**.

## Local scan

Opening the page scans every supported agent's on-disk config and dedupes the results into one **Local** list. Each entry shows its server ID and a spec summary. Select one to edit it, right-click to **Uninstall**, or hit **Refresh** to re-scan.

## Add a server manually

Click **New MCP** and provide:

- **Server ID** — a unique name (duplicates are rejected).
- **Enabled apps** — which agents receive this server (see [Scope](#scope-which-agents-get-a-server)).
- **Config JSON** — the server spec, starting from a stdio template:
  ```json
  { "type": "stdio", "command": "", "args": [] }
  ```

Spec rules:

- **stdio** — requires `command`; optional `args`, `env`, `cwd`.
- **http / sse** — requires `url`; optional `headers`. (`streamable-http` is accepted as an alias for `http`.)

## Install from a marketplace

The **MCP Marketplace** tab searches two registries — the **Official MCP Registry** and **Smithery**:

1. Pick a provider, type a query, and **Search**.
2. Select a result to see its details, homepage, and an editable install config.
3. In the install dialog, choose the install option, fill any per-parameter inputs (text, secret, number, boolean, enum, or JSON), pick the **target apps**, and **Confirm**.

The new server then appears in your Local list.

## Scope: which agents get a server

Codeg's MCP scope is **per agent, not per project** — the **Enabled apps** / **Target apps** checkboxes decide which agents receive a server. Every change is written to that agent's user-global config file (for example `~/.claude.json`, `~/.codex/config.toml`, `~/.gemini/settings.json`).

Target agents: Claude Code, Codex, Gemini, OpenCode, Cline, Hermes, CodeBuddy, Kimi Code, Grok. (OpenClaw doesn't accept MCP over the wire.)

::: warning
Codex can't host an `sse` server (only stdio + streamable-HTTP). If you assign an `sse` server to Codex it's skipped for that agent; if every selected agent is excluded, the operation fails rather than writing a broken entry.
:::

At least one target app is required on every save or install.
