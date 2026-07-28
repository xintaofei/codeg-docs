---
title: Working with Agents
description: Enable a coding agent, make sure it's healthy with a preflight check, and start your first session — the same workspace whichever agent you run.
---

# Working with Agents

Codeg doesn't ship its own model. It's a workspace *for* agents — it connects to the coding-agent CLIs you already run, like Claude Code, Codex, and Gemini, and gives every one of them the same surface: the same composer, the same files and diffs, the same git and terminal. You choose which agent handles a conversation, and everything around it stays the same.

This page covers the essentials — enabling an agent, making sure it's ready to run, and starting a session. Three neighbours go deeper: [Supported Agents](/guide/supported-agents) is the full roster, [Custom Agents](/guide/custom-agents) is how to add one that isn't on it, and [Authentication & Models](/guide/authentication) covers signing in and picking a model.

## How agents work

Each agent is a separate command-line program. When you start a session, Codeg launches that program as a background process and talks to it over the **Agent Client Protocol (ACP)** — the shared language that lets one workspace drive many different agents. That's why the experience is consistent no matter which one you pick.

Codeg supports **twelve agents** out of the box, delivered three ways — and it installs and updates them for you:

- Most run through **npx** (an npm package), so they need Node.js on your machine.
- **OpenCode** and **Cursor** are native **binaries** Codeg downloads for your platform (Cursor bundles its own runtime, so it needs no Node.js either).
- **Hermes** runs through **uv**, a Python tool runner.

Because ACP is an open protocol, the twelve aren't a limit: you can **register any other ACP-compatible agent** yourself, from the protocol's public registry or from its distribution JSON, and Codeg drives it the same way. → [Custom Agents](/guide/custom-agents)

Two things are tracked separately for each agent: whether it's **enabled** (allowed to appear in Codeg) and whether it's **installed** (actually present on your machine). They're independent — you can enable an agent before installing it, and Codeg will help you install it when the time comes.

## Enable an agent

Agents are managed in **Settings → Agents** (titled *Agent SDK Management*). The **Agent List** on the left holds every supported agent; select one to see its details on the right. **All agents are enabled by default**, so there's usually nothing to switch on — but the enable toggle in each agent's header lets you hide the ones you don't use. A **+ Add custom agent** button in the top-right corner is how you extend the list beyond the built-in twelve. → [Custom Agents](/guide/custom-agents)

Only **enabled** agents appear in the composer's agent picker. Disable the ones you'll never touch to keep that list short; if you ever disable everything, the composer just prompts you to *Open Agents settings* and turn one back on. The toggle reaches past the picker, too: an agent you've switched off is also dropped from the targets another agent can [delegate](/guide/multi-agent) to.

## Check it's ready — preflight

Open Settings → Agents and Codeg runs a **preflight check** on each agent — a quick health report, so you know it'll actually run before you rely on it. You'll see a **Version Status** line (the latest version versus what's installed locally, or *Not installed*) followed by a short checklist, each item marked **PASS**, **WARN**, or **FAIL**.

What it checks depends on how the agent is delivered:

- **npx agents** — that **Node.js** and **npm** are installed and new enough (each agent sets a minimum Node version).
- **OpenCode** and **Cursor** — that your platform is supported and the binary is downloaded (OpenCode also fetches its plugins).
- **Hermes** — that the **uv** runtime is available.

Every failing check comes with a **fix button** right beside it — *Install Node.js*, *Install uv*, *Install Plugins*, and so on — and the version row offers **Install**, **Upgrade**, or **Uninstall** as needed. Changed something outside Codeg? **Refresh check** re-runs the preflight.

**Installed an agent's CLI yourself?** Codeg counts that. Where it has no managed install of its own, it probes your system for the command — an `npx` package via `npm list -g`, a binary on your `PATH`, or the plain `--version` convention — and reports the real version instead of *Not installed*. Since a session already preferred whatever was on your `PATH`, this just means the version row now agrees with what actually runs.

::: tip Preflight checks the plumbing, not the login
Preflight confirms the runtime, version, and install — not whether you're signed in. Getting an agent authenticated (its own subscription, an API key, or a custom endpoint) is a separate step. → [Authentication & Models](/guide/authentication)
:::

### When Codeg and your terminal disagree

Sometimes an agent runs fine in your terminal but Codeg insists it isn't installed. That's almost always a **PATH gap**: a desktop app launched from the dock doesn't inherit the shell setup that a terminal does, so a Node installed by `nvm`, `fnm`, or Homebrew can be invisible to it.

**Diagnose** — beside the preflight list, and on the banner you get when a session is blocked — runs **Environment diagnostics** to find out. It probes how *the app* resolves things, not your shell: the Node and npm it sees, the npm global prefix, where it looked for the agent's executable, any version-manager directories, and — the useful part — a **comparison against your login shell**, listing the PATH entries your terminal has that the app doesn't. It finishes with a plain verdict, like *"The command resolves in your terminal but not in the app — a GUI PATH gap"*, and often a concrete fix such as fully restarting the app. **Copy all** puts the whole report on your clipboard for a bug report.

Preflight runs on its own every time you open the screen; Diagnose is the deeper probe you run yourself when preflight and reality disagree.

## Configure an agent

Most agents work the moment they're installed, but each one's detail pane has plenty you can tune — and there are two ways to do it: **visual controls** for the everyday settings, or the agent's **raw config file** for anything the UI doesn't expose.

- **Visual settings.** The pane surfaces the common options as ordinary form controls — sign-in, model selection, custom endpoints, reasoning effort, and each agent's own switches — so you rarely need to hand-edit anything. Signing in and choosing models are covered in [Authentication & Models](/guide/authentication).
- **Environment Variables.** `KEY=value` pairs passed to the agent when it launches.
- **Config Management.** Edit the agent's own native config file (its *Native JSON Config*) directly from Codeg, for the settings the visual controls don't reach.
- **Drag to reorder.** The order of the Agent List doubles as a preference — the first enabled agent is the one Codeg reaches for when nothing else is specified (more on that below).

Change a setting while a session is open and that session keeps running on its old configuration — Codeg won't interrupt you mid-task. Instead, a bar appears at the **top of the conversation** noting it's still on the previous config; click **Reconnect to apply** and the session reloads with the new settings while **keeping its full history**. No need to close and reopen anything.

### Codex: sandbox and approvals

Codex's pane has a **Sandbox & approvals** group — the two questions of how much it can touch and when it stops to ask:

- **Approval policy** — how readily Codex asks permission: **On request** (it decides when to ask), **Untrusted** (only known-safe read-only commands run unattended), **Never** (no prompts at all), or **Granular**, which breaks it down per prompt type — shell escalations, policy rules, skill scripts, permission requests, and MCP prompts — each of which is either shown to you or auto-rejected. Left alone it follows Codex's own default of asking on request.
- **Sandbox mode** — what it can write: **Read-only**, **Workspace write**, or **Full access (no sandbox)**. Workspace write adds **Extra writable folders** (absolute paths, one per line), plus switches for **network access** and whether to exclude **TMPDIR** and **/tmp** — all off by default.

Two things to know: these go into your global `~/.codex/config.toml`, so the `codex` CLI and its IDE sessions pick them up too; and they're **thread defaults** — they govern the turns Codex starts by itself, while ordinary prompts follow the composer's own approval preset. Restart a session to apply a change. On Windows, workspace write falls back to read-only unless you've enabled Codex's experimental Windows sandbox.

### Claude Code: attribution and telemetry

Claude Code's pane carries two switches that Codeg deliberately ships opposite to Claude Code's own defaults:

- **Send attribution/billing identifier to the API** — **off**, so Codeg doesn't add the identifying header.
- **Disable telemetry or redundant network requests** — **on**, so non-essential traffic stays off.

Codeg writes both explicitly rather than leaving them implied, so what the pane shows is what's applied. Flip either back if your setup needs it — a managed account that bills by attribution header, say. → [Privacy](/reference/privacy)

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
- [**Custom Agents**](/guide/custom-agents) — register an ACP-compatible agent that isn't on that roster.
- [**Authentication & Models**](/guide/authentication) — sign in with a subscription, an API key, or a custom endpoint, and choose your model.
- [**Multi-Agent Collaboration**](/guide/multi-agent) — let one agent delegate parts of a task to others.
