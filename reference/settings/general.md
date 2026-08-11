---
title: General
description: The General settings screen — default terminal shell, Windows rendering acceleration, notification sounds, and the switches that decide which codeg-mcp tools your agents get — delegation, live feedback, ask-a-question, session lookup, and creating automations and to-dos from chat.
---

# General

**Settings → General** is the catch-all screen: a little app behavior — which shell new terminals open, on Windows how the window is drawn, and whether an agent event makes a sound — followed by the switches that decide **which extra tools Codeg hands your agents**.

Two save styles share this screen. **Default Terminal**, **Rendering** and **Notification sounds** apply the moment you change them (rendering then asks for a restart). The two panels below them — **Multi-Agent Collaboration** and **In-conversation tools** — each carry their own **Save** button, and nothing in either takes effect until you press it.

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

## Notification sounds

Off by default. Turn it on and an agent event plays a short tone, so you can leave a long turn running in another window and still know when it wants you.

The five events are exactly the ones the [chat channels](/guide/chat-channels) push — the same triggers, a different sink; a channel message leaves the machine, a sound doesn't:

| Event | Default tone |
| ----- | ------------ |
| **Turn complete** | Chime |
| **Permission request** | Alert |
| **Agent question** | Ding |
| **Agent error** | Descending |
| **Message sent** | Silent |

Seven tones to choose from — *Chime, Ding, Blip, Pop, Alert, Descending*, and **Silent** to skip an event without turning the rest off — each with a **preview** button. *Message sent* starts silent because it fires on your own action, which is the least useful cue of the five.

Two settings govern all of them: a **volume** slider, and **Only when the window is not focused** — stay quiet while you're actually looking at Codeg.

::: info Sounds are per device
This is the one part of the screen kept in the browser or app you set it in, not in Codeg's database. Audio output is a property of the machine you're at: a phone browser attached to the same server has no business beeping because your desktop was configured to. It also means sounds play in the **workspace window** of that device only.
:::

## Multi-Agent Collaboration

The switch that lets an active agent hand sub-tasks to other agents — Codeg's **delegation** feature. Two tabs:

- **General** — **Enable delegation** (off by default; when off, the `delegate_to_agent` tool is hidden from the agent's tool catalog), **Maximum delegation depth** (1–8, default **1** — how deep a chain of agents-spawning-agents may recurse), and **Completed-result cache (MB)** (default 512 — how much finished sub-agent output is held in memory while the lead session runs; `0` = unlimited).
- **Agent defaults** — per-agent overrides (mode and config) applied when a delegation call spawns that agent as a worker. The tabs are built from the live agent registry, so a [custom agent](/guide/custom-agents) gets one too, and the options come from a live probe of each agent — what you pick is exactly what it will accept.

Press **Save** to apply. This panel is the control surface; the how-to — writing delegation prompts, watching the team, turning a workflow into a skill — lives in **[Working with Multiple Agents](/guide/multi-agent)**.

::: info The target list follows your enable toggles
`delegate_to_agent` advertises only the agents you can actually launch, re-read each time an agent starts: a built-in you've disabled in **Settings → Agents** is struck from its list of targets, an enabled custom agent is added to it, and a disabled one is simply never offered. So switching an agent off hides it from the lead as well as from the composer picker.
:::

## In-conversation tools

One card, five switches, one **Save** — *"extra tools Codeg gives an agent inside a conversation. Each is injected when the agent starts, so a change applies to agents started afterwards."*

| Switch | Default | What the agent gains |
| ------ | ------- | -------------------- |
| **Live Feedback** | Off | Take notes and corrections from you *while it's working* — see below |
| **Ask user question** | On | Pause and put a multiple-choice question to you, rendered as a card above the conversation input. The agent blocks until you answer or skip |
| **Get session info** | On | Resolve a session you referenced — a badge like `codeg://session/<id>` — into its title, agent, status, workspace, token usage, and recent messages. Read-only |
| **Create automations** | Off | Save the conversation as an [automation](/guide/automations) that runs on a schedule |
| **Create to-do tasks** | Off | Queue a card on the [to-do board](/guide/tasks) from the conversation |

The first three are read-only or ask-only. **The last two write app state**, which is why they start off and why they're checked again at the moment the tool is called, not only when the agent started: switching one off stops even a session that is already running from using it.

**Get session info** spells out to the agent what a session badge *means*: mentioning a session is you pointing at it deliberately, so the agent looks it up without being asked to, once per session mentioned. That mirrors how an `@agent` mention is treated as an instruction to delegate. → [Pick up where another session left off](/guide/multi-agent#pick-up-where-another-session-left-off)

### How live feedback reaches a running agent

There are two channels, and which one you get depends on the agent:

- **Pushed straight into the turn.** With an agent whose adapter supports instant steering — **Claude Code on adapter 0.65.0 or newer** — your note is inserted into the work already in flight, and the agent sees it right away. The composer's **+** menu offers *Insert into current turn*, and the dialog says as much.
- **Pulled by the agent.** Everyone else is handed a tool and has to volunteer a call to it. Those agents typically only check when you mention it, so add something like *"check my live feedback regularly"* to your prompt.

A note that can't be pushed isn't lost — it's **queued instead, and sent with the next turn**, and Codeg tells you that's what happened. Attachments always take the queue; only text can be steered into a running turn.

## Good to know

- **Two save styles.** Terminal, rendering and notification sounds apply on change; the delegation and in-conversation-tools panels each need their own **Save** — and rendering additionally needs a restart.
- **Tool switches apply the next time an agent starts.** Each adds or removes a tool "for agents started after this is turned on" — an agent that's connected right now won't gain or lose the capability mid-flight. It needn't be a brand-new conversation, though: any conversation picks the change up whenever its agent next launches, including an existing one you return to after its connection ended. A new conversation is simply the surest way. (The two *create* switches are the exception, and are re-checked at call time.)
- **These are the codeg-mcp tools.** Delegation and all five in-conversation tools are served by the [`codeg-mcp` companion](/reference/architecture); the switches here decide which appear in each agent's catalog. Not *every* companion tool is governed here, though — an agent running a [to-do](/guide/tasks) also gets `task_progress` and `task_complete`, injected by the task engine rather than by anything on this screen.
- **An agent that refuses MCP gets none of them.** A [custom agent](/guide/custom-agents) with its **MCP support** switch turned off is connected without the companion at all, so nothing on this screen reaches it.
- **Rendering is Windows-only.** The section is simply absent everywhere else.

## Related

- [Working with Multiple Agents](/guide/multi-agent) — the full how-to behind the Multi-Agent Collaboration toggle.
- [The Workspace](/guide/workspace) — the terminal the default-shell setting feeds.
- [Architecture](/reference/architecture) — the `codeg-mcp` companion that provides these agent tools.
- [Reference overview](/reference/) — the full 14-screen Settings map.
