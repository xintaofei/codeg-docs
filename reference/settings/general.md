---
title: General
description: The General settings screen — default terminal shell, Windows rendering acceleration, and the four toggles that decide which codeg-mcp tools your agents get — delegation, live feedback, ask-a-question, and session lookup.
---

# General

**Settings → General** is the catch-all screen: a little app behavior — which shell new terminals open, and, on Windows, how the window is drawn — followed by four toggles that decide **which extra tools Codeg hands your agents**. The app sums it up as *"centralized preferences for the default terminal, rendering acceleration, and multi-agent delegation."*

Two save styles share this screen. **Default Terminal** and **Rendering** apply the moment you change them (rendering then asks for a restart). The four tool panels below them each carry their own **Save** button — nothing there takes effect until you press it.

## Default Terminal

Chooses the shell Codeg launches when you open a new terminal tab from the terminal bar or the file tree. The **Default shell** dropdown is built by probing your machine, so it lists what you actually have:

- **System default** — whatever your OS hands out. The line beneath the dropdown shows the shell this currently resolves to.
- **Named shells** — on Windows, *PowerShell 7 (pwsh)*, *Windows PowerShell*, and *Command Prompt (cmd)*; a shell that isn't installed still appears, marked *not installed*.
- **Custom path** — type an absolute path (or a name resolvable on `PATH`), then **Save**. If the path doesn't exist on this host, Codeg warns you but still lets you save it.

Picking a named option saves immediately; a custom path waits for the Save button beside it.

The terminal this shell feeds is the one in [the workspace](/guide/workspace).

## Rendering *(Windows desktop only)*

A single checkbox — **Disable hardware acceleration**. Turn it on if the app shows a black screen or rendering glitches, common on certain AMD GPUs or Intel integrated graphics. It changes how the underlying webview draws, so Codeg saves the choice and then asks you to **Restart now** for it to take hold.

This section appears only on the **Windows desktop build** — it's hidden on macOS, on Linux, and in any browser session, where it would have no effect.

## Multi-Agent Collaboration

The switch that lets an active agent hand sub-tasks to other agents — Codeg's **delegation** feature. Two tabs:

- **General** — **Enable delegation** (off by default; when off, the `delegate_to_agent` tool is hidden from the agent's tool catalog), **Maximum delegation depth** (1–8, default **1** — how deep a chain of agents-spawning-agents may recurse), and **Completed-result cache (MB)** (default 512 — how much finished sub-agent output is held in memory while the lead session runs; `0` = unlimited).
- **Agent defaults** — per-agent overrides (mode and config) applied when a delegation call spawns that agent as a worker. The options come from a live probe of each agent, so what you pick is exactly what it will accept.

Press **Save** to apply. This panel is the control surface; the how-to — writing delegation prompts, watching the team, turning a workflow into a skill — lives in **[Working with Multiple Agents](/guide/multi-agent)**.

## Live Feedback

**Enable live feedback** (off by default) lets you send notes and corrections to an agent *while it's working*. With it on, agents can be handed a tool to check for your mid-turn feedback, and conversations show a note-input bar during a running turn.

One catch worth knowing: agents usually only look for feedback when you ask them to — add something like *"check my live feedback regularly"* to your prompt so the agent knows to pull it.

## Ask user question

**Enable ask user question** (on by default) lets an agent pause and put a multiple-choice question to you, rendered as a card above the conversation input. The agent blocks until you answer or skip. Turning it on adds the `ask_user_question` tool to agents.

## Get session info

**Enable get session info** (on by default) lets an agent resolve a session you reference in the composer — a session badge like `codeg://session/<id>` — into its title, agent, status, workspace, token usage, and recent messages. It's read-only, and adds the `get_session_info` tool to agents.

## Good to know

- **Two save styles.** Terminal and rendering apply on change; each of the four tool panels needs its own **Save** button — and rendering additionally needs a restart.
- **Tool toggles apply to *new* sessions.** Each of the four adds or removes a tool "for agents started after this is turned on" — a session already running won't gain or lose the capability mid-flight. Start a fresh session to pick up the change.
- **These are the codeg-mcp tools.** Delegation, live feedback, ask-a-question, and session lookup are all served by the [`codeg-mcp` companion](/reference/architecture); the toggles here decide which appear in each agent's catalog.
- **Rendering is Windows-only.** The section is simply absent everywhere else.

## Related

- [Working with Multiple Agents](/guide/multi-agent) — the full how-to behind the Multi-Agent Collaboration toggle.
- [The Workspace](/guide/workspace) — the terminal the default-shell setting feeds.
- [Architecture](/reference/architecture) — the `codeg-mcp` companion that provides these agent tools.
- [Reference overview](/reference/) — the full 14-screen Settings map.
