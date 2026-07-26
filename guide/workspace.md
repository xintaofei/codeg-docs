---
title: The Workspace
description: A tour of the Codeg workspace — the conversation, files, diffs, git changes, and terminal that make up its integrated engineering loop.
---

# The Workspace

The workspace is where you actually get work done in Codeg. It puts four things on one screen — the agent's **conversation**, your project's **files**, its **git changes**, and a **terminal** — so the whole loop of prompting, reviewing, and committing happens in one place, with no tab-switching between an editor, a diff tool, and a shell.

<div class="light-only">

![The Codeg workspace](/images/main-light.png)

</div>

<div class="dark-only">

![The Codeg workspace](/images/main-dark.png)

</div>

## The layout

The desktop workspace is **four columns** side by side, each with its own header strip and divided by draggable hairlines that run from the top edge to the bottom:

- **Conversations (far left).** Every session across every folder you've opened — your history, and where you start new ones. They're grouped by project, each with a live status dot: *In Progress*, *Review*, *Completed*. The strip on top holds **new chat**, **search**, **automations**, and view options.
- **Conversation (center-left).** The agent's transcript, with the composer docked at the bottom. Its tabs sit on top, and a slim **detail header** below shows the folder breadcrumb and the conversation's title.
- **Files (center-right).** The editor, diffs, and live previews for the files you open — right next to the conversation, so you can watch changes land as the agent makes them. It has its own tab strip and a file-path detail header.
- **Aux panel (far right).** A tabbed panel — **Session Details · Files · Changes · Commits** — holding session info, the project tree, your working-tree changes, and commit history. When the panel is narrow, the four tabs fold into a single dropdown.

The **terminal** opens beneath the two center columns, and a **status bar** along the bottom shows your conversation count (click it for a per-agent breakdown), running background tasks, update notices, and the [command launcher](#run-a-saved-command). Attached to a remote workspace, its name shows there too.

There's no full-width title bar — instead, the window chrome lives in two **corner clusters** that stay put as panels open and close: top-left toggles the sidebar and switches remote workspace, top-right holds **Terminal**, **Auxiliary Panel**, and **Settings**. Every panel resizes by dragging, and the side panels and terminal collapse away when you want room — **⌘B** (conversations), **⌘E** (aux panel), **⌘J** (terminal). On a phone or a narrow browser window, the side panels become slide-in sheets.

## Folders and the sidebar

The left sidebar is your home base: every **folder** you've opened — a project directory — with its conversations grouped beneath it. Open a project folder to add one (**⌘O**). Right-click a folder's header (or click its **⋯**) for everything you can do with it:

- **Set default agent.** Choose the agent a folder should use, and every new conversation you start there opens with it preselected. Pick **No default (use global)** to fall back to your global choice. It sets the agent only — model and mode still come from that agent once it connects.
- **Change color.** Give a folder an accent color so its section stands out when you're juggling several projects. The color tints the folder and its conversations in the sidebar; it doesn't carry into the tabs.
- **Set alias.** Give the folder a friendlier display name without touching anything on disk — it shows as *alias [ folder ]* in the sidebar and the conversation header. Leave the field empty to clear it and fall back to the plain name.
- **Import local sessions.** Open the import window with this project's past sessions preselected, to pull your agents' own history into the workspace — Codeg's conversation aggregation in action. → [Conversation Aggregation](/guide/aggregation) covers what it sweeps and how it matches.
- **Manage conversations.** Bulk-select the folder's conversations to filter by agent or status, change their status, or delete them.
- **Open in.** Reveal the folder in Finder / Explorer / your file manager, or drop into a terminal there (desktop only).
- **Remove from workspace.** Take the folder out of Codeg — its tabs and terminals close, but nothing on disk is touched.

The folder's real name is always its on-disk directory name — that never changes — but **Set alias** gives it a friendlier label, and color and grouping help you tell projects apart at a glance.

### Tidy the list — view options

Two buttons at the top of the sidebar keep a long history manageable. **Locate Active Conversation** jumps to the session you're in, expanding whatever it's hidden behind. Beside it, a funnel opens **View options**:

- **Show completed conversations** — **off** by default, so finished work stays out of the way and the list is what's still live. Turn it on when you want the whole history back.
- **Show worktree folders** — **on** by default: each [worktree](/guide/git#work-in-parallel-with-worktrees) sits under its repo as its own group, with its own count and color. Switch it off to merge them into the parent folder as a single list.
- **Sort by** — **Created time** (the default) or **Updated time**.
- **Section order** — **Folders on top** (the default) or **Chat on top**.

On the desktop the same menu also expands or collapses every group at once.

## Start a session — the composer

Everything begins in the **composer**, the input at the bottom of the conversation. Choose an agent, model, and mode, point it at a working folder, type a prompt, and send.

- **Agent and model.** Pick from your enabled agents and the models that agent offers. (The agent picker appears when you start a new conversation.)
- **Mode.** The dropdown lists the modes the connected agent provides — a plan-first mode, an accept-edits mode, and so on. These come from the agent itself, so what you see depends on which one you're running.
- **Working folder & branch.** A row just below the box shows where the agent will work: a **folder chip** and a **branch chip**. The folder chip is switchable while the conversation is still a draft (its list shows folder aliases and searches them, and a pinned **Chat mode** row runs folderless for a quick chat); once a conversation is bound to a folder, the chip stays as a label. The branch chip is the full git menu — see [Branch and run git](#branch-and-run-git).
- **Context and connection.** At the right of that same row, a small ring tracks how much of the model's **context window** you've used — click it for the token breakdown (input, output, cache) — and a heart icon shows the agent's **connection status**: connected, connecting, error, or disconnected.
- **The + menu.** Attach files, insert a saved **quick message**, leave **live feedback** while the agent is working, run a **slash command**, or drop in a **skill** from the Experts, Office Work, or Scientific Research packs.
- **Rich input.** Type **@** to mention a file, agent, past session, or commit; type **/** for slash commands — the match is fuzzy, so `rvw` finds `review`. Long messages you've sent fold up with a **show more** toggle so the transcript stays readable.
- **Send, fork, stop.** **Enter** sends (**Shift+Enter** makes a newline); **Fork & Send** branches the conversation; while the agent runs, Send turns into a red **Cancel** button. Type ahead and your messages **queue** until it's ready for them.

::: tip Approvals come from the agent
Codeg has no global "auto-approve everything" switch. How freely an agent acts is governed by the **mode** you pick plus the **permission prompts** it raises mid-task (below) — so control stays with the agent's own safety model.
:::

## Follow along — the conversation

As the agent works, its **transcript** streams in: replies as formatted Markdown (code, math, and diagrams included), its reasoning, and a live **plan** checklist for multi-step tasks.

- **Tool calls** appear as collapsible cards tagged with status — *Awaiting Approval*, *Running*, *Completed*, *Denied*. Shell commands stream their output live; repeated actions fold into a single summary like "Ran 3 commands."
- **What the agent touched** is summarized at the end of each reply, in two groups: **New files** (shown by default) and **Files changed** (folded up, with a count and `+`/`−` totals). Click a card to open that file in the editor, or use its **View Diff** button to see just what this reply did to it — and on the desktop, **Show in file manager** to reveal it on disk. Deleted files are listed too, marked **Remove**.
- **Permission prompts.** When the agent needs the go-ahead — to run a command, apply an edit, follow a plan — a card docks just above the composer: *"Agent requests permission to continue this turn."* Its buttons are the agent's own choices (Allow, Reject, and the like). A separate card handles multiple-choice questions the agent asks you.
- **Delegated work.** When one agent hands off to another, a **Sub-agents** overlay tracks the delegated sessions — the heart of [Multi-Agent Collaboration](/guide/multi-agent).
- Each turn ends with its **model, token, and duration** stats, and you can **export** a whole conversation to image, Markdown, or HTML.

## Work with files — editor, diffs, and previews

The **Files** tab in the right panel is your project tree, rooted at the workspace; click any file to open it in the center file pane. **Drag** an entry to rearrange the project or feed the agent: drop a file or folder onto another folder (or the workspace root) to **move it on disk**, or drop it into the composer to **attach it** as a file reference for your next message — the drop target decides which, with no modifier keys. The tree also takes the keyboard: **↑/↓** move, **→** opens a folder or steps into it, **←** closes it or jumps to the parent, **Home/End** go to the ends, and **Enter** opens a file or toggles a folder.

- **Editing.** Files open in a full editor. There's **no Save button** — Codeg saves on **⌘/Ctrl+S**, when the editor loses focus, and automatically a few seconds after you stop typing; an unsaved file shows a **`*`** in its tab. Send a file, or just a selection, to the agent with **⌘L**.
- **Diffs.** The agent's edits open as **read-only diffs** — side by side (**HEAD ↔ Working Tree**) or as an inline unified diff, one file at a time, with change counts and prev/next navigation. Diffs are for *review*; you commit from the git panel (below), not by accepting individual lines.
- **Live previews** open in the same pane: **Office** documents (`.docx`, `.xlsx`, `.pptx`) render and refresh as the agent edits them; **Markdown** and **HTML** get a **Preview ⇄ Edit Source** toggle (HTML runs scripts only if you opt in); images zoom and pan. → [Office Documents](/guide/office)

::: tip Merge conflicts get their own editor
Resolving a conflict opens a three-pane merge editor — **Local**, **Result**, **Remote** — where you *can* accept changes hunk by hunk. It's the one place with per-hunk controls; everywhere else, diffs stay read-only.
:::

## Session details

The aux panel opens on **Session Details** — an at-a-glance readout of the conversation you're in: its title and ids, the agent and model running it, status and current git branch, and live **token usage** (input, output, cache, and context-window totals) with timing and timestamps. Every field has a copy button; with nothing focused it just reads *No active session*. It's a readout, not a control panel — the same view is available from the conversation header's **⋮** menu.

## Branch and run git

The **branch chip** below the composer is the home for most git work, and there's one per conversation, so [tiled sessions](#tile-several-sessions-side-by-side) each show their own branch. Click it and a searchable menu opens with two halves:

- **Operations**, at the top: **Pull code**, **Fetch remote branches**, **Commit code…**, **Push…**, **New branch…**, **New worktree…**, **Stash changes…**, **Unstash…**, and **Manage Remotes…**
- **Your branches**, below: **Local branches** and **Remote branches**, with shared prefixes (`feature/…`) folded into collapsed groups and the checked-out one marked **Current**. Click any other branch for its actions — **Switch to this branch**, **Merge** it into the current one, **Rebase** onto it, or **Delete branch**.

One search box filters both halves at once, so typing `push` finds the operation and typing part of a branch name finds the branch. In [Chat mode](#start-a-session-—-the-composer) there's no chip at all; in a folder that isn't a git repository it reads **No branch** and offers **Initialize Git repository**.

→ [Git & Worktrees](/guide/git) covers the whole workflow.

## Run a saved command

The **status bar** carries a launcher for the commands you run over and over — a dev server, a test watcher. Codeg seeds the list from your project's `package.json` scripts, so it usually has something the first time you look; until then it reads **Add Command**. Pick one from the menu and the ▶ button runs it in a terminal, turning into ■ to stop it. **Manage Commands…** lets you add, edit, reorder, and delete them, and your selection is remembered per folder.

## Review and commit

Two right-panel tabs put version control a glance away:

- **Changes** lists your working-tree edits — tracked and untracked, with per-file line counts. From here you can open a file's diff, discard an edit (**Rollback**), or start a commit.
- **Commits** is your whole history, as a timeline that loads more as you scroll. Two filter pills narrow it — **Branch** (every branch by default) and **Author** — and Codeg remembers both per project. Click a commit to expand it: the full message, the files it touched with their `+`/`−` counts (click one for its diff), and which branches contain it. Right-click for **View Diff**, **New branch…**, **Reset to Here**, or **Push…**

Committing opens a dedicated **Commit** window: tick the files you want, write a message, and choose **Commit** or **Commit and Push**. The **branch chip** below the composer covers the rest — pull, fetch, stash, worktrees, remotes, and switching or merging branches. → [Branch and run git](#branch-and-run-git)

Parallel development with worktrees, remote accounts, and the full git workflow have their own page. → [Git & Worktrees](/guide/git)

## The terminal

Press **⌘J** for an integrated terminal in your working folder — a real shell, not a sandbox. Open as many as you need in tabs. It's there for the commands you'd rather run yourself: starting a dev server, inspecting output, running a one-off script alongside the agent.

## Tabs and multitasking

The center area is **tabbed**, so several sessions stay open at once:

- **Conversation tabs** reorder by dragging and **pin** with a double-click. **⌘T** opens a new conversation, **⌘W** closes a tab, **⌘Tab** cycles between them.
- **File tabs** track the files, diffs, and previews you've opened in the file pane.

### Tile several sessions side by side

Right-click any conversation tab and choose **Tile Display** to lay *all* of your open conversations out next to each other in a single view. It isn't a fixed two-up split — it's **one pane per open tab**, side by side, scrolling horizontally when they don't all fit. This is how you run a fleet of agents at once: start a task in one, a different task in another, and watch every transcript stream in parallel without switching tabs.

- **Panes are your tabs.** Open another conversation (⌘T or the sidebar) to add a pane; close a tab to remove one. You need at least two open conversations for tiling to take effect.
- **Mix projects freely.** Tiled panes aren't tied to one folder — put sessions from different projects side by side.
- **One pane is active.** The active pane — the one the composer and shortcuts act on — is outlined with a flowing gradient border. Click any other pane to focus it.
- **Leave anytime.** Right-click → **Exit Tile** returns you to the single-tab view.

Tiling is a great companion to [multi-agent collaboration](/guide/multi-agent): tile the lead session beside the sub-agent sessions it spawns and watch the whole team work.

## The welcome screen

Before a session starts, the conversation pane asks **"What would you like to do today?"** and offers **Quick Actions** in three tabs — **Code Development**, **Office Work**, and **Scientific Research**. Each card drops a ready-made skill (and, for Office and Research, a prompt template) into the composer with one click; anything not yet enabled for your chosen agent shows a lock that links to where you turn it on. Below it sit the agent picker and a rotating tip.

## Desktop and browser

The workspace is the same whether you run the [desktop app](/getting-started/installation) or open [`codeg-server`](/getting-started/deployment) in a browser. A few things differ:

- **Files.** The desktop app uses native file dialogs and can *Open in Finder / Explorer / terminal*; in the browser you **upload** files or **pick a file on the server** instead.
- **Window & extras.** Custom window controls and the desktop pet are desktop-only; the browser adds a **login** (your access token) and a reconnect prompt if the connection drops.
- **Remote workspaces.** A desktop app can attach to a remote server, at which point its file operations behave like the browser's.

## Keyboard shortcuts

| Shortcut | Action |
| -------- | ------ |
| `⌘/Ctrl B` | Toggle the Conversations panel |
| `⌘/Ctrl E` | Toggle the right (Session Details / Files / Changes / Commits) panel |
| `⌘/Ctrl J` | Toggle the terminal |
| `⌘/Ctrl T` | New conversation |
| `⌘/Ctrl K` | Search conversations and files |
| `⌘/Ctrl W` | Close the current tab |
| `⌘/Ctrl Tab` | Cycle between tabs |
| `Enter` / `Shift+Enter` | Send / newline |
| `⌘/Ctrl L` | Add the current file or selection to the chat |
| `⌘/Ctrl S` | Save the current file |

These are the defaults; several can be changed.

## Next steps

- [**Working with Agents**](/guide/agents) — enable an agent and run your first session in the workspace.
- [**Conversation Aggregation**](/guide/aggregation) — how past sessions from every agent land in the Conversations list.
- [**Git & Worktrees**](/guide/git) — the full version-control workflow, including parallel development.
- [**Multi-Agent Collaboration**](/guide/multi-agent) — delegate parts of a task to other agents.
