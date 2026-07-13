# Agent Settings

Codeg works with 11 coding agents — Claude Code, Codex, OpenCode, Gemini CLI, OpenClaw, Cline, Hermes, CodeBuddy, Kimi Code, Pi, and Grok. Before an agent can run in a session, enable and configure it under **Settings → Agents** ("Agent SDK Management").

The Agents page is a two-pane layout:

- **Left — the agent list.** Each row shows the agent's icon and name, a green dot when it's enabled, and a **preflight status badge** (Pass / Warn / Fail / Unchecked). Rows are **drag-to-reorder** — the order you set here is the order agents appear in the composer.
- **Right — the detail panel** for the selected agent.

## Enable and set up an agent

1. **Select** the agent in the left list.
2. **Toggle Enable** at the top of the detail panel. Enabling/disabling takes effect immediately.
3. **Run preflight.** Codeg checks that the agent's SDK is installed and runnable. Each item offers a one-click fix — **Install**, **Upgrade**, **Uninstall**, or **Custom install** — and streams the install log live.
4. **Check the version line** — "Not installed", "Upgrade available", or "Already latest", with a `Remote: … · Local: …` comparison.
5. **Set environment variables** if the agent needs them: the **Environment Variables** editor takes `KEY=VALUE` pairs, one per line → **Save**.
6. **Configure authentication and model** under **Config Management** — see [Authentication & Models](/agents/authentication).

## How agents are installed

Each agent is delivered one of three ways, shown as a badge next to its name:

| Distribution | What it means | Examples |
| ------------ | ------------- | -------- |
| **npx**  | A pinned npm package run via `npx` | Gemini CLI, OpenClaw |
| **binary** | A per-platform binary Codeg downloads (Install / Upgrade / Uninstall actions) | agents shipping native binaries |
| **uvx** | A Python agent run via `uv` / `uvx`, with a `PATH` command fallback | Hermes |

## Model providers

**Claude Code**, **Codex**, and **Gemini CLI** can bind a reusable Codeg [Model Provider](/agents/model-providers). Every agent can also be pointed at a custom endpoint or its own native auth — see [Authentication & Models](/agents/authentication).

## Next

- [Authentication & Models](/agents/authentication) — auth modes and per-agent model settings
- [Model Providers](/agents/model-providers) — reusable API connections
- [Multi-Agent Delegation](/agents/delegation) — let agents call each other
