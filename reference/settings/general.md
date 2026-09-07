---
title: General
description: The General settings screen — default terminal shell, hardware-accelerated rendering, desktop notifications and notification sounds, and the switches that decide which codeg-mcp tools your agents get — delegation, live feedback, ask-a-question, session lookup, and creating automations and to-dos from chat.
---

# General

**Settings → General** is the catch-all screen: a little app behavior — which shell new terminals open, how the window is drawn, and how Codeg gets your attention when an agent wants you — followed by the switches that decide **which extra tools Codeg hands your agents**.

Two save styles share this screen. **Default Terminal**, **Disable hardware acceleration**, **Desktop notifications** and **Notification sounds** apply the moment you change them (rendering then asks for a restart). The two panels below them — **Multi-Agent Collaboration** and **In-conversation tools** — each carry their own **Save** button, and nothing in either takes effect until you press it.

## Default Terminal

Chooses the shell Codeg launches when you open a new terminal tab from the terminal bar or the file tree. The **Default shell** dropdown is built by probing your machine, so it lists what you actually have:

- **System default** — whatever your OS hands out. The line beneath the dropdown shows the shell this currently resolves to.
- **Named shells** — on Windows, *PowerShell 7 (pwsh)*, *Windows PowerShell*, and *Command Prompt (cmd)*; a shell that isn't installed still appears, marked *not installed*.
- **Custom path** — type an absolute path (or a name resolvable on `PATH`), then **Save**. If the path doesn't exist on this host, Codeg warns you but still lets you save it.

Picking a named option saves immediately; a custom path waits for the Save button beside it.

The terminal this shell feeds is the one in [the workspace](/guide/workspace). Since **0.25** it isn't only that terminal: when an **agent** asks Codeg to run a whole command line, that runs through this shell too. Left on *System default* nothing changes from before.

::: warning A non-POSIX shell may reject what agents write
Agents emit **POSIX syntax** — `&&`, `2>&1`, `$(…)`. Your interactive shell is your business, but naming one that doesn't read POSIX means an agent's command line can fail with a syntax error rather than doing anything. **fish**, **nushell** and **Windows PowerShell 5.1** are the ones this bites; PowerShell 7 and cmd are handled with their own calling conventions.
:::

## Disable hardware acceleration

A single switch, named for what it does rather than for the category it belongs to — turning it *on* is what turns acceleration *off*. Reach for it if the app shows a black screen or rendering glitches: certain AMD GPUs and Intel integrated graphics on Windows, and the proprietary NVIDIA driver on Linux. It changes how the underlying webview draws, so Codeg saves the choice and then asks you to **Restart now** for it to take hold — and since **0.30.3**, turning it back off takes effect on that restart too, instead of the setting being inherited by the new process and looking stuck.

The section appears in a **local Windows or Linux desktop window**, which is where there's a knob to turn: WebView2 and WebKitGTK each expose one the app can flip at startup. macOS's WKWebView exposes none, so no switch is shown there rather than one that would do nothing; a browser session has none either; and a desktop window **attached to a remote workspace** hides it too, since the webview it would redraw is the local one and the settings you're editing are the remote host's.

## Desktop notifications

Codeg raises an **OS notification** when an agent wants you — the other half of the same idea as sounds, and adjacent to them on purpose: one leaves the window, one doesn't.

**It's on by default**, unlike the sounds below it, and the asymmetry is deliberate: desktop notifications already worked before this screen existed, so the release that gave them switches couldn't be the release that silently stopped delivering them. Sounds were genuinely new, and a quiet install had to stay quiet. So the defaults here are the old behaviour written down — everything on, delivered only while the window is out of sight. The section starts folded either way; switching the master toggle on unfolds it, since that's a request to see what it does.

Four controls:

- **Permission** — whether this browser or machine will actually show them, said plainly rather than assumed. **Allowed**, **Blocked** (only the browser's own site settings can undo that — a page cannot ask again), **Not requested**, with an **Allow notifications** button, or **Unavailable**, which means the page isn't in a secure context: reach the server over HTTPS or on localhost. The desktop app is the honest special case — it posts through the system notification centre, which **doesn't report back** whether Codeg is allowed, so it says *Managed by the system* and offers **Send a test** and **Open system settings** instead of a status it would be guessing at.
- **Delivered as** — which app the system is filing these under. Normally Codeg; if its own identifier couldn't be claimed, the row names the app whose switches apply instead, and says that installing Codeg to your Applications folder restores its identity.
- **Notify when** — **Always**, **Window is not focused**, or **Window is not visible**. The last is the default and the strictest, and is what Codeg did before this setting existed. It's also the answer to *"I never get notifications"*: a window sitting open on a second monitor is **visible**, so *not visible* never fires for it. Pick *not focused* if that's you.
- **Hide notification contents** — replace the body with a generic line so agent output never reaches the notification centre, which keeps its payload outside the app after you've closed the conversation. The title still names the folder, so you can still tell which window to go back to.

Then a switch per event, six of them: **Turn complete**, **Permission request**, **Agent question**, **Agent error**, **Background task** and **Work task**. Repeats of the same event within a few seconds collapse into one notification.

::: info The event list isn't the sound list
Sounds mirror the five triggers the [chat channels](/guide/chat-channels) push. Notifications mirror what the app actually notifies about, which is a different set: it **adds** a settled [background task](/guide/workspace) and a [work task](/guide/tasks) reaching review or failing — two app-level events the agent protocol has no envelope for — and **drops** *Message sent*, an echo of your own keystroke that has no business in a notification centre.
:::

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

Like desktop notifications, this section **starts folded** — the two of them together used to fill the page before anything below them.

::: info Both are per device
Notifications and sounds are the two parts of this screen kept in the browser or app you set them in, not in Codeg's database. Where an alert lands is a property of the machine you're at: a phone browser attached to the same server has no business beeping — or buzzing — because your desktop was configured to. For sounds it also means they play in the **workspace window** of that device only.
:::

## Multi-Agent Collaboration

The switch that lets an active agent hand sub-tasks to other agents — Codeg's **delegation** feature. Two tabs:

- **General** — **Enable delegation** (off by default; when off, the `delegate_to_agent` tool is hidden from the agent's tool catalog), **Maximum delegation depth** (1–8, default **1** — how deep a chain of agents-spawning-agents may recurse), and **Completed-result cache (MB)** (default 512 — how much finished sub-agent output is held in memory while the lead session runs; `0` = unlimited).
- **Agent defaults** — per-agent overrides (mode and config) applied when a delegation call spawns that agent as a worker. The tabs are built from the live agent registry, so a [custom agent](/guide/custom-agents) gets one too, and the options come from a live probe of each agent — what you pick is exactly what it will accept.

Press **Save** to apply. This panel is the control surface; the how-to — writing delegation prompts, watching the team, turning a workflow into a skill — lives in **[Working with Multiple Agents](/guide/multi-agent)**.

One thing switched on here can still be withheld elsewhere, so the panel says so: a warning under **Enable delegation** **names any agent whose per-agent [Let the agent handle files and commands](/guide/agents#let-the-agent-handle-its-own-files-and-commands) switch is on**, because that switch takes the delegation tools away deliberately. The list is read from the policy the backend actually resolved, not guessed from the agent's environment — so it agrees with what the agent will really be handed.

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

There are two channels, and which one you get depends on the agent. The wording you see changes with it, deliberately, because they promise different things:

- **Pushed straight into the turn** — *Insert into current turn*. With an agent whose adapter supports instant steering, your note goes into the work already in flight and the agent sees it right away. That is **Claude Code on adapter 0.65.0 or newer**, and the floor is checked against the adapter actually running rather than the version Codeg would have installed — launch prefers a copy already on your `PATH`, so the pin alone wouldn't prove it.
- **Pulled by the agent** — *Send note for next check*. Any other session whose agent was handed the `check_user_feedback` tool **when it launched** — so not one that can't take MCP at all, and not one you switched this on for mid-session. Having the tool, the agent still has to volunteer a call to it, and those agents typically only check when you mention it: add something like *"check my live feedback regularly"* to your prompt.

A pulled note simply **waits** for the agent's next check. What gets rerouted is a note that couldn't be recorded at all — the turn ended while you were submitting — which is **queued instead, and sent with the next turn**, with Codeg saying so. Attachments follow the same principle from the other side: on the push channel a draft carrying **images and file references travels whole**, and on the pull channel it travels whole too, but by taking the queue rather than being stripped down to its text.

Since **0.30.3** the same two channels drive the composer's **mid-turn send** — the split Send button that appears while the agent is working — so the note doesn't have to go through the **+** menu's dialog. → [Talk to an agent mid-turn](/guide/workspace#talk-to-an-agent-mid-turn)

## Good to know

- **Two save styles.** Terminal, rendering, desktop notifications and notification sounds apply on change; the delegation and in-conversation-tools panels each need their own **Save** — and rendering additionally needs a restart.
- **Tool switches apply the next time an agent starts.** Each adds or removes a tool "for agents started after this is turned on" — an agent that's connected right now won't gain or lose the capability mid-flight. It needn't be a brand-new conversation, though: any conversation picks the change up whenever its agent next launches, including an existing one you return to after its connection ended. A new conversation is simply the surest way. (The two *create* switches are the exception, and are re-checked at call time.)
- **These are the codeg-mcp tools.** Delegation and all five in-conversation tools are served by the [`codeg-mcp` companion](/reference/architecture); the switches here decide which appear in each agent's catalog. Not *every* companion tool is governed here, though — an agent running a [to-do](/guide/tasks) also gets `task_progress` and `task_complete`, injected by the task engine rather than by anything on this screen.
- **An agent that refuses MCP gets none of them.** A [custom agent](/guide/custom-agents) with its **MCP support** switch turned off is connected without the companion at all, so nothing on this screen reaches it.
- **The rendering switch needs a webview knob to turn.** It shows only in a **local** Windows or Linux desktop window, and is absent on macOS, in the browser, and in a desktop window attached to a remote workspace — in each case because there'd be nothing behind it.
- **The status bar carries these same switches.** All six of them: the [codeg-mcp popover](/guide/multi-agent#the-service-from-the-status-bar) has delegation and every in-conversation tool. Flip one there with this page open and the form converges on it rather than sending its stale value back on the next Save.

## Related

- [Working with Multiple Agents](/guide/multi-agent) — the full how-to behind the Multi-Agent Collaboration toggle.
- [The Workspace](/guide/workspace) — the terminal the default-shell setting feeds.
- [Architecture](/reference/architecture) — the `codeg-mcp` companion that provides these agent tools.
- [Reference overview](/reference/) — the full 14-screen Settings map.
