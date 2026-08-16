---
title: Token Usage
description: The dashboard behind the session counter — how many tokens your agents actually spent, broken down by day, folder, agent and model, with a cache-hit reading and a share card.
---

# Token Usage

Most agents record what they spent, and each one keeps that number in its own transcript, in its own format, in its own directory. **Token Usage** is the one place they're added up: a full report of what your agents have actually consumed, across every folder and every agent, over any window you choose.

It answers the questions you can't answer from a single conversation. Which project is expensive. Whether that new model is really cheaper. How much of your context is being served from cache instead of billed fresh. When, in an average week, you actually build.

## Open it

The **session counter in the status bar** — the *"N conversations"* along the bottom edge — is the way in. Click it and Codeg opens the report. Nothing else needs configuring.

On a brand-new install the page says **Nothing counted yet** and offers **Count my sessions**: Codeg has to read your agents' transcripts once before it has anything to add up. After that it keeps itself current as you work.

The headline session count is built to **reconcile with that status-bar number** — set the range to *All time* and the two agree, rather than leaving you to wonder which one is lying.

## What it counts

Codeg doesn't estimate anything. It reads the **usage each agent wrote down itself** — input, output, cache write and cache read, per turn — out of that agent's own transcript, and stores one row per turn so a report doesn't have to re-parse gigabytes of history to draw a chart.

That sync is incremental: a conversation is re-parsed only when its record has moved since the last pass, which includes the moment an [imported session](/guide/aggregation) comes back into view after growing in the agent's own CLI. An empty parse never erases usage that was already recorded.

A few consequences worth knowing:

- **The numbers are the agents' numbers.** Codeg is doing arithmetic, not metering — so what you see here is what your provider saw, subject to what the agent chose to report.
- **An agent that records nothing contributes no tokens.** **Cursor** writes no token counts anywhere, so its sessions add nothing to the totals, the breakdowns, or the heaviest-sessions list — reporting a confident zero would be worse than reporting nothing. They do still count as **sessions**, since the headline session number follows your workspace list rather than the token table, which is what keeps it agreeing with the status bar. So if Cursor is a real part of your rotation, read the per-session averages knowing they're divided by sessions that couldn't contribute.
- **It's not a bill.** There are no prices anywhere on the page. Tokens are tokens; what they cost depends on your plan, and Codeg doesn't guess at it.
- **Dimensions are read live.** Folder, agent and deletion state are joined from the conversation itself, so moving a folder or deleting a session lands in the report without a re-sync.
- **Hermes reports per session, not per turn.** Its per-message rows carry no input/output split, so counting only per-turn usage would report those conversations as zero — a confident wrong number. Instead the session total is written as a single entry, filed at the session's last turn. Right for every total and breakdown; coarse only on the time axis.

## Narrow the view

One toolbar row sits above the report:

| Control | What it offers |
| ------- | -------------- |
| **Time range** | **7 / 30 / 90 days** as segments, with **This month**, **This year**, **All time** and **Custom** folded behind **More** |
| **Group by** | **Day**, **Week**, or **Month** — each range preset suggests its natural bucket until you pick one yourself |
| **Folders · Agents · Models** | Searchable pickers, all-inclusive by default; **Reset filters** clears them together. A folder reads *alias [ name ]*, so an alias leads its real directory name instead of replacing it |
| **⋯** | **Refresh** (with the time it last ran), **Rebuild all**, and **Share** |

**Custom** opens a two-month calendar anchored a month back, so the second pane isn't all future and greyed out. Clicking into a range you've already finished starts a new one rather than dragging whichever end you didn't mean to touch.

Both the range and the buckets speak **your local calendar days**, end to end — a day is a day where you are, not where the database is.

## Read the report

**The headline** is total tokens for the range, with two things beside it: the change **vs. the previous period** of the same length, and a **cache-hit ring**. The ring is the one worth learning to read — it says how much of the context your agents worked with came out of cache instead of being computed fresh, and spells out what re-sending it at full price would have amounted to.

Under it, four tiles, each carrying an average as its subtitle:

| Tile | And beneath it |
| ---- | -------------- |
| **Sessions** | Average tokens per session |
| **Turns** | Average turns per session |
| **Active days** | Your longest unbroken streak |
| **Generation time** | Average per active day |

Then the panels:

- **Usage over time** — a stacked bar per bucket, splitting **cache read** from **fresh compute**, with the turn and session counts on each bar's tooltip. Beside it, the busiest bucket in the range and your peak hour of the day.
- **What the tokens were** — the same total broken four ways: **input** (what you sent), **output** (what the model wrote), **cache write**, and **cache read** (context you didn't pay full price for).
- **When you build** — a weekday-by-hour heatmap of your own local time, which tends to be the panel people screenshot. It names the hour your work is densest around.
- **Usage distribution** — the same range grouped **by folder**, **by agent**, or **by model**, ranked. **Click a row to filter the whole report by it**, which is how you get from *"Claude is most of my spend"* to *"…and almost all of it is this one repository"* in two clicks.
- **Heaviest sessions** — the individual conversations that cost the most, with their folder, agent and total.

::: info A range large enough to be flagged
Ask for something pathological — a decade of continuous heavy use — and the report says so: *"This range is very large, the numbers cover only the most recent slice of it."* Rows are read newest-first, so what you keep is the recent history the dashboard is mostly about.
:::

## Share it

**Share** renders the view you're looking at as a poster card — *My AI coding stats* — with the range, the total, your top models and top projects, and an **archetype** picked from what the numbers actually say: *Night Owl*, *Early Bird*, *Weekend Warrior*, *Cache Master*, *Marathoner*, *Polyglot*, *Laser Focus*, *Deep Diver*, *Steady Builder*.

The card follows your **current theme** rather than pinning a palette of its own, so a card exported from a light gray theme doesn't come back purple. **Save image** writes a PNG; **Copy image** puts it on the clipboard.

The card is a snapshot of the range and filters in front of you — so filter first, then share, if you want to post one project rather than all of them.

## Refresh and rebuild

Two entries in the **⋯** menu, and the difference matters:

- **Refresh** — the incremental pass. It re-reads only the conversations whose records moved, shows a progress count while it works, and reports how many it counted. This is what runs on its own; you rarely need to press it.
- **Rebuild all** — re-parses every transcript from scratch, whether or not it looks stale. The escape hatch for a session that **grew outside Codeg** — you kept working in the agent's own CLI — and Codeg had no reason to look at it again. It doesn't wipe first: each conversation's rows are swapped one transaction at a time, so the dashboard is never briefly empty, and a transcript that happens to be unreadable right now keeps the numbers it already had instead of being erased and stamped as counted.

Only one sync runs at a time. A second one doesn't queue up behind the first; it's simply told one is already running, since re-parsing the same files twice buys nothing.

::: tip Your history was rebuilt once, on upgrade
The stored rows carry the version of the accounting that produced them. When a release changes **how** tokens are counted — as 0.23.3 did, fixing Claude API calls being counted twice, Codex tool-calling rounds being missed, and Claude sub-agent usage being left out — the next sync rebuilds everything rather than trusting stamps that only ever tracked whether the *transcript* had moved. Otherwise the dashboard would serve a mix of old wrong numbers and new right ones indefinitely.
:::

## Good to know

- **Each turn is filed under its own timestamp.** A session that runs past midnight is split across both days, turn by turn — it isn't attributed wholesale to the day you started it. (Hermes is the exception, since its one session-wide entry has only one instant to sit at.)
- **It's all local.** The facts live in Codeg's own database beside your conversations, computed from files already on your machine. Nothing is sent anywhere to produce this page. → [Privacy & Security](/reference/privacy)
- **The status bar is the only entry point.** There's no sidebar row for it — the counter you were already looking at is the button.
- **A task costs a session.** Every [to-do](/guide/tasks) that runs is a full agent session with its own transcript, so four running at once show up here as four sessions' worth.
- **Context usage is a different number.** The ring beside the composer tracks how full *this conversation's* context window is right now; this page is cumulative spend across everything. → [The Workspace](/guide/workspace#start-a-session-—-the-composer)

## Next steps

- [**The Workspace**](/guide/workspace) — the status bar this page opens from, and the per-conversation context ring.
- [**Conversation Aggregation**](/guide/aggregation) — how sessions you ran in an agent's own CLI get here in the first place.
- [**Authentication & Models**](/guide/authentication) — the models the *by model* breakdown is naming.
- [**Privacy & Security**](/reference/privacy) — what stays on your machine, this dashboard included.
