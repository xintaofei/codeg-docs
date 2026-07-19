---
title: MCP Servers
description: Give your agents extra tools and data sources with Model Context Protocol servers — add them from a registry or by hand, and choose which agents get each one, all from one place in Codeg.
---

# MCP Servers

**Model Context Protocol (MCP)** is the open standard for handing a coding agent extra tools and data — a GitHub server, a Postgres connection, a headless browser, your company's internal API. Any of the agents Codeg drives can use MCP servers; the catch is that each one keeps its MCP setup in its *own* config file, in its own format. Codeg is the single place to manage them all: add a server once, tick which agents should have it, and Codeg writes it into each of their configs for you.

Codeg doesn't run the tools — MCP is the *agent's* feature, and the server talks to the agent, not to Codeg. What Codeg gives you is the management layer on top: a scan of what's already installed, a searchable registry to add more, and a per-agent switch for every server, so you're never hand-editing a different file for each CLI.

## Where MCP servers are managed

Open **Settings → MCP**. It's a two-pane screen. The left pane has two tabs — **Local** (the servers already on your machine) and **Market** (a registry to install from) — and the right pane is the detail and editor for whatever you've selected.

## What a server looks like to Codeg

Every server is an **id** plus a **spec** (a small JSON object) plus the set of **agents** it's turned on for. Specs come in two shapes:

- **stdio** — a local command your agents launch and talk to over stdin/stdout:
  ```json
  {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": { "GITHUB_TOKEN": "ghp_…" }
  }
  ```
- **remote** — an **HTTP** or **SSE** endpoint the agents connect to:
  ```json
  {
    "type": "http",
    "url": "https://mcp.example.com/sse",
    "headers": { "Authorization": "Bearer …" }
  }
  ```

A rule of thumb the editor enforces: **`env` belongs on stdio servers**, where it sets the launched process's environment. A remote server carries its secrets in `headers` instead — put `env` on an HTTP/SSE spec and Codeg warns you.

## Install from a registry

The **Market** tab searches a marketplace. Two are built in:

- **Official MCP Registry** — `registry.modelcontextprotocol.io`, the canonical index.
- **Smithery** — a large community catalog.

Pick a provider, search, and select a result to see its detail — description, homepage, protocols it supports, version, and whether it's verified. Hit **Install** and Codeg walks you through:

1. **Protocol** — a server may offer more than one way to run (say stdio *or* a hosted HTTP endpoint); choose one.
2. **Parameters** — fill in what that option needs: API keys, endpoints, flags. Required fields are marked, secrets are masked, and each has its own type (text, number, boolean, a fixed set of choices, or JSON).
3. **Target apps** — tick which agents get the server.

Confirm, and Codeg writes the finished spec into each chosen agent's config.

## Add one by hand

Know exactly what you want? On the **Local** tab, click **New MCP**, give it an id, paste the spec JSON, and choose the agents. It lands right alongside the registry-installed ones. This is the path for a server that isn't in any catalog — an internal tool, something you're developing, a one-off.

## Scan what's already there

The **Local** tab doesn't only show what you added *in* Codeg — it **scans your agents' own config files** and lists every MCP server it finds. So a server you set up by hand-editing `~/.claude.json`, or one another tool installed, shows up here too, ready to edit, remove, or switch on for *more* agents. **Refresh** re-runs the scan.

## Choose which agents get a server

Each server's detail pane has an **Enabled apps** row — a checkbox per agent. Codeg writes the server into the native MCP config of every agent you tick, and takes it back out when you untick:

| Agent | Where Codeg writes it |
| ----- | --------------------- |
| **Claude Code** | `~/.claude.json` (`mcpServers`) |
| **Codex** | Codex's `config.toml` (`[mcp_servers.*]`) |
| **Gemini** | `~/.gemini/settings.json` |
| **OpenCode**, **Cline**, **Hermes**, **CodeBuddy**, **Kimi Code**, **Grok**, **Cursor** | each agent's own MCP config |

That's **ten of the twelve agents** — every one except **OpenClaw** and **Pi**. OpenClaw doesn't accept MCP servers at all (it's the one agent that opts out), so it's not offered as a target; Pi isn't in the list either. → [How agents differ](/guide/supported-agents#how-agents-differ)

::: tip Changes apply on the next session
Because a server lives in the agent's config, the agent reads it when it **starts a session**. Add or change a server and it takes effect for new conversations; for one that's already open, **Reconnect to apply** picks up the new config without losing your history. → [Configure an agent](/guide/agents#configure-an-agent)
:::

## Good to know

- **Secrets sit in the agents' config files.** An API key you type into a server's `env`, `headers`, or an install parameter is written into each assigned agent's own config on disk — the same files those agents already keep their settings in — not encrypted at rest. Treat access to your machine as the boundary, exactly as for [agent credentials](/guide/authentication#where-credentials-are-stored).
- **stdio servers need their command available.** `npx`, `uvx`, a binary — whatever the spec launches has to be on the PATH the agent runs with, or the server won't start.
- **It works the same on a server.** The MCP screen is in the browser build too; a remote server just needs the machine Codeg runs on to reach the endpoint.
- **Removing a server** takes it out of every agent it was enabled for at once — you don't have to clean up each config by hand.

## Next steps

- [**Skills**](/guide/skills) — the other way to extend an agent: reusable instruction packs, enabled per agent, invoked with a `/command`.
- [**Supported Agents**](/guide/supported-agents#how-agents-differ) — which agents take MCP servers, and how they otherwise differ.
- [**Working with Agents**](/guide/agents#configure-an-agent) — reconnect a running session to apply config changes.
