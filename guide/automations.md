---
title: Automations
description: Save an agent task once and let Codeg run it for you — on a cron schedule or on demand — each run landing as a normal conversation, isolated in its own git worktree.
---

# Automations

An **automation** is an agent task you set up once and let Codeg run on its own — on a schedule, or at the press of a button. You compose it exactly like a normal message (a prompt, an agent, a folder, a mode), hand it a cadence, and from then on Codeg fires it **headlessly**: each run spins up the agent, does the work, and lands as an ordinary conversation you can open and read. Nobody has to be at the keyboard.

It's the hands-off counterpart to [Chat Channels](/guide/chat-channels): a chat channel lets you drive Codeg from your phone, while an automation runs with nobody driving at all. Reach for it for the routine agent work you'd rather not kick off by hand — a nightly code review, a weekly dependency bump, CI triage, a recurring security sweep.

## Where automations live

Automations are their own view, opened from **Automations** in the left sidebar (the ⚡ item, right by your conversations). It's a two-pane screen: the list of your automations on the left, the selected one's detail on the right. If a scheduled run ever fails, the sidebar item carries a small badge so you notice — it clears when you open the view.

The first time in, there's nothing to show, so you land on a gallery of **templates** to start from.

## Create one — from a template or from scratch

Hit **New automation** and either pick a template or start blank. Codeg ships seven templates, each a ready-to-edit starting prompt:

| Template | What it does |
| -------- | ------------ |
| **Code review** | Review recent changes for bugs, regressions, and quality issues |
| **Dependency updates** | Find outdated dependencies and apply safe upgrades |
| **Test coverage** | Write tests for the highest-value gaps |
| **Security audit** | Sweep for injection, auth gaps, secret handling, and more |
| **CI triage** | Investigate failing checks and propose fixes |
| **TODO sweep** | Collect and prioritize `TODO`/`FIXME` comments |
| **Release notes** | Summarize changes since the last release tag |

A template just seeds the editor — a suggested prompt and cadence you then tweak. The editor itself is **the same composer you use for a normal conversation**: a rich prompt box with `@`-mentions for files, agents, sessions, commits, and [skills](/guide/skills), the `/` command menu, an agent picker, and the mode-and-options bar. Whatever you'd set up for a one-off message, you capture here as a reusable launch. Give it a name, write the prompt, and the rest is *where* and *when*.

## Point it at a folder — and isolate the run

Under **Target**, pick the workspace folder the automation runs in, and choose how it isolates its work:

- **New worktree per run** *(default)* — every run mints a fresh [git worktree](/guide/git#work-in-parallel-with-worktrees), so it never touches your working tree and repeated runs never collide with each other. This is what you want for anything that writes files.
- **Run in the folder** — the run works directly in the folder's tree, optionally on a **branch** you choose. It shares your uncommitted changes, so it can collide with work in progress — Codeg says as much right there. (A remote-only branch needs the worktree option; the shared mode can't track one.)

## Schedule it — or keep it manual

Under **Trigger**, choose **On a schedule** or **Manual only**.

For a schedule, you don't have to hand-write cron. There are one-tap presets — **Hourly**, **Daily 9am**, **Weekdays 9am** — a raw cron field if you want it, and a visual **Schedule builder** (pick a frequency — every N minutes, hourly, daily, weekdays, weekly on a weekday, monthly on a day — and it writes the expression). A live **Next run** line shows exactly when it'll fire next, in your device's auto-detected **timezone**, computed by the very same evaluator the scheduler uses — so the preview never lies.

If you do write cron by hand, it's the standard five fields:

```text
┌─ minute (0–59)
│ ┌─ hour (0–23)
│ │ ┌─ day of month (1–31)
│ │ │ ┌─ month (1–12)
│ │ │ │ ┌─ day of week (0–6, Sun–Sat)
│ │ │ │ │
0 9 * * 1-5     # 09:00, Monday–Friday
0 * * * *       # every hour, on the hour
*/30 * * * *    # every 30 minutes
```

**Manual only** automations never fire on their own — they sit until you press **Run now**.

## What a run actually does

Whether it fires on schedule or you hit **Run now**, a run is a real, live session:

- It spawns the agent headlessly and **produces a normal conversation** that appears in your sidebar the moment it starts. Open it to watch the work stream in, or to step in.
- It **replays the mode you saved**, so how far it goes on its own is exactly the mode you picked in the editor. A run is a genuine agent session: if the agent stops to ask permission or a question, that surfaces in the produced conversation. For a truly unattended cadence, pick a mode that doesn't pause for approvals, or keep the task read-only — the analysis templates are deliberately written to *not* change files.
- **One run at a time, per automation.** If a run is still going when the next one comes due, the new one is recorded as **Skipped** rather than piling on top.

The detail pane's **Run history** is a timeline of every run — its status (**Running**, **Succeeded**, **Failed**, **Cancelled**, or **Skipped**), when it started and how long it took, a one-line summary or the error, a **View conversation** link to jump into what it produced, and a **Cancel** button while it's still going.

::: tip Runs happen while Codeg is running
The scheduler lives inside Codeg — desktop app or [server](/getting-started/deployment). A schedule that comes due while Codeg is closed fires **once** the next time it's open and due, not once for every slot it missed. And if Codeg quits mid-run, that run is marked **Failed** on the next start (never faked as done) — the automation simply fires again on its next schedule.
:::

## Manage them

Each row — via the **⋯** menu or a right-click — gives you **Run now**, **Enable/Disable**, **Edit**, and **Delete**; the same actions sit on the detail pane. **Disabling** pauses an automation's schedule without deleting it. When you have more than a couple, filter the list by folder or by enabled state.

## Good to know

- **It works the same on a server.** The engine runs in both the desktop app and the standalone server, so automations fire wherever Codeg is running. (If a desktop app and a server ever share one data directory, only one of them drives the automations — they won't double-fire.)
- **Every run is a full agent session** — its own token cost, its own entry in your history. A frequent schedule multiplies both.
- **Worktree runs leave folders behind.** Each per-run worktree is a real folder Codeg tracks; the same [worktree tools](/guide/git#work-in-parallel-with-worktrees) clean them up. Older run history is pruned automatically over time.

## Next steps

- [**Chat Channels**](/guide/chat-channels) — the other way to run Codeg hands-off: drive it from Telegram, Lark, or WeChat.
- [**Git & Worktrees**](/guide/git#work-in-parallel-with-worktrees) — how per-run isolation works, and how to manage the worktrees runs create.
- [**Working with Agents**](/guide/agents) — the agents and modes an automation replays.
- [**Skills**](/guide/skills) — bottle a repeatable workflow into a `/command` and drop it into an automation's prompt.
