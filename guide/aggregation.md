---
title: Conversation Aggregation
description: Pull the sessions you've already run — across every coding agent — into one workspace, and resume any of them right where you left off.
---

# Conversation Aggregation

Every coding agent keeps its own history. Claude Code writes transcripts under `~/.claude`, Codex under `~/.codex`, OpenCode in a local database — each in its own place, in its own format, invisible to the others. **Conversation Aggregation** pulls all of it into one workspace: point Codeg at a project and it sweeps every agent's store for sessions you ran there, then lists them right alongside your Codeg-native conversations.

And nothing you import is a dead archive. Open any of these sessions and keep going — the original agent picks up the thread with its full history intact. A conversation you started last week in a terminal continues in Codeg's workspace as if it never left.

## How to import

Aggregation is a single action, and it's always yours to trigger. In the Conversations sidebar, right-click a **folder** (or open its **⋯** menu) and choose **Import local sessions**. Codeg scans your installed agents for sessions that ran in that folder and adds them to the list — you'll see a toast like *"Imported 12 sessions, skipped 3"* when it's done.

- **It's per folder.** Each import covers one project. Open another folder and run it again there — there's no "import everything, everywhere" switch.
- **It's on demand.** Codeg never sweeps in the background or watches your agents' files. Sessions appear only when you ask, so importing is always a deliberate step.
- **It's local.** Import reads the agents' own files on your machine — nothing is uploaded, and the agents' original sessions are left untouched.

## What Codeg matches

A sweep looks at **every agent Codeg supports** — even the ones you haven't enabled in Codeg. For each, it reads that agent's native session store (Claude Code's `~/.claude/projects`, Codex's `~/.codex/sessions`, OpenCode's local database, and so on) and keeps the sessions whose working directory matches the folder you imported into.

That path match is the whole rule: **a session shows up if you ran it in this project's directory.** So importing a folder gives you every agent's history *for that project*, gathered in one list — and an agent you set up long before Codeg still surfaces its past work, as long as its files are on disk.

→ [Supported Agents](/guide/supported-agents) lists where each agent keeps its sessions.

::: tip Moved a project?
Sessions are matched by the directory path they ran in. If you've since renamed or moved the project folder, its older sessions still point at the *old* path — so they won't match the folder in its new home. Open the original location as a folder to bring them in.
:::

## Imported, updated, skipped

The toast after a sweep breaks down into three numbers, and together they tell you exactly what happened:

- **Imported** — brand-new sessions added to the list.
- **Updated** — a session already in Codeg whose **title** caught up. Many agents name a session only after it's been running a while, so a later import picks up that name. Nothing else about the session changes.
- **Skipped** — sessions already present with nothing to update.

Because of that split, **re-importing is always safe.** Run it again after a work session and you'll pull in what's new without disturbing what's there: Codeg won't duplicate a session, overwrite a title you set yourself, or reshuffle your list. Make it a habit whenever you've been working outside Codeg and want the workspace to catch up.

## Pick up where you left off

Here's what makes aggregation more than a history viewer: **imported sessions are live.** Open one and it looks like any other conversation — the full transcript, read straight from the agent's own file. Type a prompt and the original agent reconnects to that very session, continuing with everything that came before as its context.

- **The original agent handles it.** An imported Codex session resumes with Codex, a Claude Code session with Claude Code — Codeg hands each agent back its own session by id, so no context is lost in translation.
- **History comes from disk.** Codeg re-reads the agent's transcript every time you open the session, so what you see is always the real thing, never a stale copy. That's also why import is quick: it records where each session lives, not a second copy of it.
- **When a session can't be reopened** — the agent has since expired or deleted it on its side — Codeg tells you and offers to **reload** or start a **new conversation** in its place, rather than leaving you stranded.

Imported conversations carry no special badge — they sit in your history sorted by recency, turn up in search (**⌘K**), and behave exactly like the ones you started in Codeg.

## Reference a past session

Because an imported session is just another conversation, you can hand its history to a *new* task. Type **@** in the composer and pick a **session** to pull it in as context — so a fresh conversation can build on an old one without you re-explaining what happened. It's a natural fit for aggregation: sweep in last month's work, then reference the relevant thread the next time a related task comes up.

## Next steps

- [**The Workspace**](/guide/workspace) — where your aggregated conversations live and how the sidebar is organized.
- [**Supported Agents**](/guide/supported-agents) — the full roster, and where each agent stores the sessions this feature imports.
- [**Working with Agents**](/guide/agents) — enable an agent so it can resume the sessions you bring in.
