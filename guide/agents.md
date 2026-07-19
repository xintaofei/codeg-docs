---
title: Working with Agents
description: Enable a coding agent, make sure it's healthy with a preflight check, and start your first session — the same workspace whichever agent you run.
---

# Working with Agents

Codeg doesn't ship its own model. It's a workspace *for* agents — it connects to the coding-agent CLIs you already run, like Claude Code, Codex, and Gemini, and gives every one of them the same surface: the same composer, the same files and diffs, the same git and terminal. You choose which agent handles a conversation, and everything around it stays the same.

This page covers the essentials — enabling an agent, making sure it's ready to run, and starting a session. Two neighbours go deeper: [Supported Agents](/guide/supported-agents) is the full roster, and [Authentication & Models](/guide/authentication) covers signing in and picking a model.

## How agents work

Each agent is a separate command-line program. When you start a session, Codeg launches that program as a background process and talks to it over the **Agent Client Protocol (ACP)** — the shared language that lets one workspace drive many different agents. That's why the experience is consistent no matter which one you pick.

Codeg supports **twelve agents** today, delivered three ways — and it installs and updates them for you:

- Most run through **npx** (an npm package), so they need Node.js on your machine.
- **OpenCode** and **Cursor** are native **binaries** Codeg downloads for your platform (Cursor bundles its own runtime, so it needs no Node.js either).
- **Hermes** runs through **uv**, a Python tool runner.

Two things are tracked separately for each agent: whether it's **enabled** (allowed to appear in Codeg) and whether it's **installed** (actually present on your machine). They're independent — you can enable an agent before installing it, and Codeg will help you install it when the time comes.

## Enable an agent

Agents are managed in **Settings → Agents** (titled *Agent SDK Management*). The **Agent List** on the left holds every supported agent; select one to see its details on the right. **All agents are enabled by default**, so there's usually nothing to switch on — but the enable toggle in each agent's header lets you hide the ones you don't use.

Only **enabled** agents appear in the composer's agent picker. Disable the ones you'll never touch to keep that list short; if you ever disable everything, the composer just prompts you to *Open Agents settings* and turn one back on.

## Check it's ready — preflight

Open Settings → Agents and Codeg runs a **preflight check** on each agent — a quick health report, so you know it'll actually run before you rely on it. You'll see a **Version Status** line (the latest version versus what's installed locally, or *Not installed*) followed by a short checklist, each item marked **PASS**, **WARN**, or **FAIL**.

What it checks depends on how the agent is delivered:

- **npx agents** — that **Node.js** and **npm** are installed and new enough (each agent sets a minimum Node version).
- **OpenCode** and **Cursor** — that your platform is supported and the binary is downloaded (OpenCode also fetches its plugins).
- **Hermes** — that the **uv** runtime is available.

Every failing check comes with a **fix button** right beside it — *Install Node.js*, *Install uv*, *Install Plugins*, and so on — and the version row offers **Install**, **Upgrade**, or **Uninstall** as needed. Changed something outside Codeg? **Refresh check** re-runs the preflight.

::: tip Preflight checks the plumbing, not the login
Preflight confirms the runtime, version, and install — not whether you're signed in. Getting an agent authenticated (its own subscription, an API key, or a custom endpoint) is a separate step. → [Authentication & Models](/guide/authentication)
:::

## Configure an agent

Most agents work the moment they're installed, but each one's detail pane has plenty you can tune — and there are two ways to do it: **visual controls** for the everyday settings, or the agent's **raw config file** for anything the UI doesn't expose.

- **Visual settings.** The pane surfaces the common options as ordinary form controls — sign-in, model selection, custom endpoints, reasoning effort, and each agent's own switches — so you rarely need to hand-edit anything. Signing in and choosing models are covered in [Authentication & Models](/guide/authentication).
- **Environment Variables.** `KEY=value` pairs passed to the agent when it launches.
- **Config Management.** Edit the agent's own native config file (its *Native JSON Config*) directly from Codeg, for the settings the visual controls don't reach.
- **Drag to reorder.** The order of the Agent List doubles as a preference — the first enabled agent is the one Codeg reaches for when nothing else is specified (more on that below).

Change a setting while a session is open and that session keeps running on its old configuration — Codeg won't interrupt you mid-task. Instead, a bar appears at the **top of the conversation** noting it's still on the previous config; click **Reconnect to apply** and the session reloads with the new settings while **keeping its full history**. No need to close and reopen anything.

## Start a session

Start a new conversation and the composer shows an **agent picker** — a row of pills, one per enabled agent. Click one and Codeg connects to it; from there, choose a **model** and a **mode** in the composer. Both of those lists come from the **agent itself**, not Codeg, so what's on offer depends on which agent you're running. Your choice of agent locks in once you send the first message — a conversation stays with the agent that started it.

**Which agent by default?** Codeg picks in this order:

1. The folder's **default agent**, if you've set one (folder menu → *Set default agent*).
2. Otherwise, the **first agent** in your Settings → Agents order.

So a per-folder default always wins, and the list order is the fallback. → [The Workspace](/guide/workspace#folders-and-the-sidebar) covers setting a folder's default.

The first time you use an agent in a session, you'll see **Connecting…** while Codeg launches the CLI and completes its handshake. If it can't connect — the agent's disabled, not installed, unsupported on your platform, or slow to respond — Codeg raises an **alert** (the bell in the status bar) that says what went wrong and points you to Settings → Agents to fix it.

## Connection status

While you work, the **status bar** at the bottom shows the active agent and its state — *Connecting…*, *Connected*, *Responding…*, or *Disconnected* — with the agent's icon pulsing while it's busy.

Sessions you're not looking at may disconnect after a few idle minutes to free up resources, but the tab you're actively in stays connected, and Codeg **reconnects automatically** when you come back to a session.

## Next steps

- [**Supported Agents**](/guide/supported-agents) — the full roster, and where each agent keeps its sessions.
- [**Authentication & Models**](/guide/authentication) — sign in with a subscription, an API key, or a custom endpoint, and choose your model.
- [**Multi-Agent Collaboration**](/guide/multi-agent) — let one agent delegate parts of a task to others.
