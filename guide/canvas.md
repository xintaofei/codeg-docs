---
title: Infinite Conversations
description: An infinite board that lays your workspace out in space — regions for folders and agents, cards that expand into real working conversations, and sticky notes for the thinking in between.
---

# Infinite Conversations

The tab strip is a good way to hold one conversation and a poor way to hold twelve. **Infinite Conversations** is the other answer: a board with no edges where your workspace is laid out *in space* — a region per folder, a region per agent, cards you can pin anywhere — and where a card **expands into a real conversation** you can type into. Several agents run side by side on one board instead of one tab at a time.

It arrived in **0.30.0**. The route is a full page like To-dos and the Repository panel, and like them it can be switched off if it isn't how you work.

::: tip Mostly a view of your workspace, not a copy of it
A conversation card *is* one of your conversations and a folder region *is* one of your folders — delete a conversation and its cards go with it, rename it and the card renames. What the board adds for those is **position**, plus the freedom to have one conversation sitting in three places at once.

Two things on the board *are* the board's own: a **Collection**'s membership, and a **sticky note**'s text. Those exist nowhere else, which is why deleting them is treated differently below.
:::

The board carries **root conversations only**. A sub-agent session — anything a delegation or a loop spawned — is sub-structure of the conversation that owns it rather than a peer to lay out, so it never becomes a card of its own. A card does show a badge counting the sub-agents underneath it. → [Multi-Agent Collaboration](/guide/multi-agent)

## Open it

**Infinite Conversations** is the last row in the left sidebar's navigation block, beneath the Repository panel, and it's in the status bar's [quick actions](/guide/workspace#the-layout) under *Navigation*. If you don't want the row, switch it off under the sidebar's [navigation items](/guide/workspace#choose-which-navigation-rows-you-see) — quick actions still reaches it.

## Fill it

A new board is empty, and offers the one-click way out: **Generate from current workspace** builds the whole thing from what you already have open — a region per folder, the conversations inside them, laid out for you. It's the fastest way to see what the board is *for*, and you can rearrange everything afterwards.

The deliberate way is **Add to canvas**, which places one thing at a time. Its first entry is **New conversation** — a blank card in the workspace's active folder, which becomes a real conversation on your first message. Below it, the six things you can lay out:

| What you add | What it does |
| --- | --- |
| **Folder region** | Mirrors one open folder and shows every conversation in it, worktree children merged in |
| **Folder group region** | Mirrors a [sidebar folder group](/guide/workspace#group-your-folders) — every folder in the group, in one band |
| **Agent region** | Every conversation running on one agent, across folders |
| **Custom region** | A **Collection**: nothing automatic, just what you drag into it |
| **Conversation card** | One conversation, pinned wherever you drop it. Searchable picker |
| **Sticky note card** | Text. For the reasoning that doesn't belong in anyone's transcript |

The first three are **bound** — they follow their folder, group or agent, so a new conversation appears in them by itself. A Collection is **yours**: it holds exactly what you put in it and nothing arrives uninvited.

## Curate it by dragging

The board's whole editing model is drag-and-drop, and the two directions mean different things:

- **Drag a card out of a region** onto open board and it becomes a pinned card. Out of a **Collection** that's a **move**; out of a **bound** region it's a **copy**, because a folder region has no say in which conversations exist — removing the card wouldn't remove it from the folder.
- **Drag a card into a Collection** to collect it.

One conversation can sit in **any number** of regions at once, which is the point of the copy rule. Select a card and its twins elsewhere on the board light up too, so you can see where else it lives.

Beyond that: **rename** a region, **collapse** it, **resize** it, give anything a **colour** (regions, cards and notes alike; a card inside a region wears the region's colour), and set a region's member grid to a fixed number of **columns** or **rows** or leave it **Auto**. A region with more members than fit shows **+N more**, with **Show all conversations** / **Show fewer**. **Auto-arrange** packs the board back into order when it has sprawled, and **Export as PNG** takes a picture of it — capped at 4096×4096, so a board spread far enough apart is cropped rather than shrunk indefinitely.

Marquee-select several things and the toolbar offers **Group into a region** — the fastest way to make a Collection, since you gather first and name it after.

::: warning Deleting a selection asks about notes you've written in
A conversation card is a *view*: remove it and the conversation is untouched. A **sticky note** is not — its text exists nowhere else. So a delete that includes notes **with something written in them** confirms first and says how many, while a selection of pure cards, or of notes you never typed into, just goes.
:::

## A card is a real conversation

This is what separates the board from a map. **Expand** a pinned card and you get a working conversation: the transcript, the composer, the model picker, and the permission, question and plan dialogs — everything you need to actually run a turn without leaving the board. A **new conversation** card additionally offers the **agent** picker, since that's the one moment the choice is still open; an existing conversation keeps the agent it was started with, exactly as it does in a tab.

A few things live in the tab view and deliberately don't come along: the **message queue**, the [**mid-turn send**](/guide/workspace#talk-to-an-agent-mid-turn), and **export**. The board is for running several conversations side by side, not for replacing the single-conversation surface where those belong.

**A file link in a card opens beside it.** The workspace's file column is off screen while the board covers the page, so clicking a file badge, a Markdown link or **view diff** in a card's transcript opens a read-only viewer in a side panel next to the conversation, with **Open in workspace** one click away. For a plain file it's the same workspace file tab underneath — the panel is a view of it — so nothing is lost by reading it there. Before **0.30.3** those clicks opened a tab in a column you couldn't see, which looked like nothing happening at all. The [To-dos board](/guide/tasks) does the same, for the same reason.

A card inside a region has to be **moved out to the canvas first** before it can expand — a full conversation surface is far bigger than a region's member grid slot, so it gets pinned before it grows.

::: tip Opening the board doesn't start every agent on it
The rule is about not **spawning** agents, not about refusing one that's already there. A card whose conversation is **dormant** draws its transcript straight away but doesn't connect until you first click it — otherwise walking onto a board with a dozen cards would bring up a dozen agent CLIs at once. A card whose agent is **already running** comes back live, because leaving it asleep would show you a disconnected card while its turn streams into it.

Once a card *is* live it holds on to its connection: panning it off the screen can't quietly unmount it into a disconnect. And a card for a conversation you already have open in a tab attaches as a **viewer** — the tab keeps the connection, the card watches.
:::

## Find your way around

The board is bigger than the window by design, so the bottom corner carries the navigation: **zoom in / out**, **reset zoom to 100%**, **fit view**, and a **map** of the whole board above them. The map can be hidden, and whether it's up is remembered per device.

The board keeps **its own zoom**, remembered between visits and separate from the app's [interface zoom](/reference/settings/appearance#window-zoom). That separation is deliberate: making the board bigger is the corner control's job, so a card's size doesn't shift under you when you scale the interface. The dock, the map and the menus are window chrome and do still follow the app's zoom.

A conversation that's currently running **pulses**, and a region counts how many of its members are running — so a glance at a collapsed region tells you whether anything in it is working. A card carrying sub-agents badges how many.

## Good to know

- **The board is stored with your data, not in the browser.** It's the same board in the desktop app and in a [server](/getting-started/deployment) sharing that data directory, and edits from one show up in the other.
- **Closing a folder doesn't break its region.** The board resolves against every folder Codeg knows about, not just the ones currently open in the sidebar, so a region keeps working after you close its folder. *Folder unavailable* is for a folder that's genuinely gone — deleted or missing — and a deleted folder group leaves the same kind of tombstone.
- **A conversation that's gone reads as *Conversation removed*.** Remove the card when you see it; nothing else needs cleaning up.
- **The row can be hidden.** If the board isn't for you, switch **Infinite Conversations** off in the sidebar's navigation items.

## Next steps

- [**The Workspace**](/guide/workspace) — the tab-based surface this is an alternative to, and where folder groups are set up.
- [**Multi-Agent Collaboration**](/guide/multi-agent) — the other way to have several agents working at once, where they talk to *each other* rather than to you.
- [**To-dos**](/guide/tasks) — for work you want run unattended and reviewed later, rather than watched side by side.
