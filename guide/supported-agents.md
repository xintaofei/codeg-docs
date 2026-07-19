---
title: Supported Agents
description: The twelve coding agents Codeg drives over ACP — what each one is, the runtime it needs, and where it keeps its sessions on disk.
---

# Supported Agents

Codeg drives **twelve coding agents**, and once one is running they all feel the same — same composer, same diffs, same git and terminal — because Codeg talks to each over the **Agent Client Protocol (ACP)**. What differs is underneath: who builds the agent, what runtime it needs on your machine, and where it keeps its own history. This page is the map.

Enabling an agent, its preflight health check, and starting a session are covered in [Working with Agents](/guide/agents); signing in and choosing a model are in [Authentication & Models](/guide/authentication). Here we stick to the roster itself.

## The roster

Codeg installs, pins, and updates every one of these for you — you never fetch one by hand. What you *do* need on your machine is the runtime each agent runs on:

| Agent | What it is | Runs on |
| ----- | ---------- | ------- |
| **Claude Code** | Anthropic's Claude coding agent | Node.js |
| **Codex** | OpenAI's coding-assistant CLI | Node.js |
| **Gemini** | Google's official Gemini CLI | Node.js |
| **OpenClaw** | A personal AI assistant you self-host | Node.js |
| **OpenCode** | An open-source coding agent | Bundled binary |
| **Cline** | An autonomous coding-agent CLI | Node.js |
| **Hermes** | Nous Research's self-improving agent | Python (uv) |
| **CodeBuddy** | Tencent Cloud's AI coding assistant | Node.js |
| **Kimi Code** | Moonshot AI's CLI coding assistant | Node.js |
| **Pi** | A self-extensible coding agent | Node.js |
| **Grok** | xAI's coding agent and CLI | Node.js |
| **Cursor** | Anysphere's Cursor coding agent | Bundled binary |

Three delivery routes sit behind that last column:

- **Node.js (npm).** Nine of the twelve ship as npm packages that Codeg runs with `npx`, so they need Node.js installed. Codeg pins a known-good version of each and upgrades it for you.
- **Bundled binary.** **OpenCode** and **Cursor** are native binaries Codeg downloads for your exact platform — nothing else to install. Cursor's download is larger because it carries its own Node runtime and tools, so it doesn't need Node.js on your machine either.
- **Python (uv).** **Hermes** runs through `uv`, the Python tool runner; Codeg launches it with a pinned Python, so you don't manage the environment.

The order above is the **default Agent List order** in Settings → Agents. It's a preference, not a ranking — drag agents to reorder them, and the first enabled one becomes Codeg's fallback when nothing else has picked the agent for a conversation. → [Working with Agents](/guide/agents#start-a-session)

## Where each agent keeps its sessions

Every agent stores its own conversation history in its own place and format, long before Codeg is in the picture. That's exactly what [Conversation Aggregation](/guide/aggregation) reads when it imports your past work: Codeg looks in each agent's native store for sessions you ran in the folder you're importing, and lists what it finds.

Here's where "each agent's native store" actually lives:

| Agent | Default location | Format | Relocate with |
| ----- | ---------------- | ------ | ------------- |
| **Claude Code** | `~/.claude/projects/` | JSONL | `CLAUDE_CONFIG_DIR` |
| **Codex** | `~/.codex/sessions/` | JSONL | `CODEX_HOME` |
| **Gemini** | `~/.gemini/` | JSON files | `GEMINI_CLI_HOME` |
| **OpenClaw** | `~/.openclaw/agents/` | JSONL | — |
| **OpenCode** | `~/.local/share/opencode/opencode.db` | SQLite | `XDG_DATA_HOME` |
| **Cline** | `~/.cline/data/` | JSON files | `CLINE_DIR` |
| **Hermes** | `~/.hermes/state.db` | SQLite | `HERMES_HOME` |
| **CodeBuddy** | `~/.codebuddy/projects/` | JSONL | `CODEBUDDY_CONFIG_DIR` |
| **Kimi Code** | `~/.kimi-code/sessions/` | JSONL | `KIMI_CODE_HOME` |
| **Pi** | `~/.pi/agent/sessions/` | JSONL | `PI_CODING_AGENT_SESSION_DIR` |
| **Grok** | `~/.grok/sessions/` | JSONL | `GROK_HOME` |
| **Cursor** | `~/.cursor/chats/` | SQLite (blob store) | `CURSOR_CONFIG_DIR` |

Most agents write a **JSONL transcript** — a plain-text log, one event per line — while OpenCode and Hermes keep everything in a single **SQLite** database, Cursor stores each conversation as its own SQLite blob file, and Gemini and Cline use their own JSON files. Codeg reads each format natively; you never convert anything.

::: tip Moved a store? Codeg follows the same variable.
Point an agent at a non-default location with one of the environment variables above and Codeg honors it too — so a relocated history still imports — as long as Codeg sees that variable in its own environment. OpenClaw is the exception: its store isn't relocatable.
:::

## How agents differ

The surface is identical, but a few things vary by agent — worth knowing so nothing catches you off guard:

- **Models and modes come from the agent, not Codeg.** The model dropdown and the mode dropdown (plan-first, accept-edits, and the like) list whatever the connected agent reports over ACP. Two agents will offer different models and different modes — that's the agent talking, not a Codeg setting. → [Authentication & Models](/guide/authentication)
- **Sign-in differs too.** Some agents log in with their own subscription or OAuth, others take a provider API key or a custom endpoint. Each agent's detail pane shows only the options that apply to it. → [Authentication & Models](/guide/authentication)
- **OpenClaw opts out of MCP.** It's the one agent that doesn't accept Model Context Protocol servers, so an MCP server you've added won't reach an OpenClaw session — Codeg forwards none to it. Most other agents receive your MCP servers normally. → [MCP Servers](/guide/mcp)

## Next steps

- [**Working with Agents**](/guide/agents) — enable one of these, run its preflight, and start a session.
- [**Authentication & Models**](/guide/authentication) — sign in and pick a model for the agent you chose.
- [**Conversation Aggregation**](/guide/aggregation) — import the sessions from the stores listed above.
