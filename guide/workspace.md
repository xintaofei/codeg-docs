---
title: The Workspace
description: A tour of the Codeg workspace — the conversation, files, diffs, git changes, and terminal that make up its integrated engineering loop, and how to link several folders into one of them.
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

- **Conversations (far left).** Every session across every folder you've opened — your history, and where you start new ones. They're grouped by project, each with a live status dot: *In Progress*, *Review*, *Completed*. The strip on top holds **new chat**, collapse-all, and view options, and beneath it sit the navigation rows: **automations**, **[To-dos](/guide/tasks)**, the **[Repository panel](/guide/repository)**, and **[Infinite Conversations](/guide/canvas)**. Automations and To-dos each carry their own badge — a failed run for one, a count of tasks waiting on you for the other — so a queue that needs attention says so from wherever you are.
- **Conversation (center-left).** The agent's transcript, with the composer docked at the bottom. Its tabs sit on top, and a slim **detail header** below shows the folder breadcrumb and the conversation's title.
- **Files (center-right).** The editor, diffs, and live previews for the files you open — right next to the conversation, so you can watch changes land as the agent makes them. It has its own tab strip and a file-path detail header.
- **Aux panel (far right).** A tabbed panel — **Session Details · Files · Changes · Commits** — holding session info, the project tree, your working-tree changes, and commit history. When the panel is narrow, the four tabs fold into a single dropdown.

The **terminal** opens beneath the two center columns, and a **status bar** along the bottom shows your conversation count, update notices, and the [command launcher](#run-a-saved-command). Attached to a remote workspace, its name shows there too. **Click the conversation count** and it opens [Token Usage](/guide/token-usage) — the full report of what your agents have spent, by day, folder, agent and model.

The status bar's leading edge — the window's bottom-left corner — holds **Quick actions**, a menu of everything that's otherwise reachable only through something that can disappear. Three groups:

| Group | What's in it |
| ----- | ------------ |
| **Workspace** | Open folder, clone a repository, [Project Boot](/guide/project-boot), and remote workspaces |
| **Navigation** | [Automations](/guide/automations), [To-dos](/guide/tasks), [Repository panel](/guide/repository), [Infinite Conversations](/guide/canvas) — with the same badges their sidebar rows carry |
| **More** | The desktop pet |

There was a **Sessions** group until **0.30.0**. Its two rows acted on a single folder, which is exactly what a launcher in the status bar doesn't have — and both already live in the folder's own context menu and on the Folders header, so the group was removed rather than left to act on a guess.

The point isn't new capability — every entry has a home elsewhere. It's that the status bar **never unmounts**, so with the sidebar collapsed this is still a way in. Remote workspaces and the pet are desktop-only. **Search is deliberately absent**, because its own home doesn't disappear either — see below.

When a newer Codeg is out, the status bar says so itself rather than waiting to be found in Settings: a **New v…** badge appears, and clicking it opens a popover with the version, the full **What's new** release notes, and the buttons to act on it — the same **Download → Install → Restart** sequence as the settings panel, plus **Later** to wave it off. Dismissing a release quiets it in every open window, and leaves a plain grey icon behind so you can still get back to it; the next release lights the badge up again. → [Settings → System](/reference/settings/system#software-update)

There's no full-width title bar — instead, the window chrome lives in two **corner clusters** that stay put as panels open and close: top-left toggles the sidebar and opens **Search**, top-right holds **Terminal**, **Auxiliary Panel**, and **Settings**. Search moved up here in **0.27** for exactly the reason quick actions exists: it used to be a row inside the sidebar, which unmounts when you collapse it, leaving **⌘K** as the only way in. The chrome never unmounts, and the button is tooltipped with your live ⌘K binding. (Mobile gets the same button in its title bar, where there's no shortcut at all.) The **remote-workspace picker** it displaced moved to the sidebar list's right-click menu, in a group of its own — every row above it acts on this machine; that one leaves for another host. Every panel resizes by dragging, and the side panels and terminal collapse away when you want room — **⌘B** (conversations), **⌘E** (aux panel), **⌘J** (terminal). On a phone or a narrow browser window, the side panels become slide-in sheets.

[To-dos](/guide/tasks), [automations](/guide/automations), the [Repository panel](/guide/repository) and [Token Usage](/guide/token-usage) take over that whole area, so while one of them is open the top-right cluster swaps its terminal and panel toggles — which would have nothing to act on — for a **back arrow** to your conversations. It's the way out when the sidebar is collapsed and there's no conversation on screen to click, and it changes nothing else: whatever tab you were on comes back exactly as you left it. A page that has controls of its own puts them in those freed slots: To-dos parks its view toggle and settings button there, the Repository panel its refresh and settings.

### Panels slide in beside your work

Since **0.28** every sliding panel — the mobile sidebar, the aux panel, the terminal, the settings navigation, a skill's details, a [task's](/guide/tasks) details, a [repository item's](/guide/repository) details — is an **inset drawer** rather than a dialog: it sits slightly in from the window edge with an edge of its own, and **nothing behind it is dimmed or frozen**. The page underneath stays live, which is the point — these are panels you consult *while* working, not modals you dismiss to get back to what you were doing. Escape, the close button, and a swipe still close one; the four mobile navigation drawers additionally close when you tap the strip of page they leave showing, because that's how you put a panel away on a phone.

**Session viewers stack.** A delegated [sub-agent's](/guide/multi-agent) transcript, a to-do's session, a Grok child run — all three nest into each other, since a sub-agent's transcript carries its own delegation cards with their own *view session*. They used to be centred dialogs with no stacking relationship, so opening the second simply buried the first. Now each opens *inside* the one that spawned it, all at the same width so nothing juts out underneath.

Two consequences you'd otherwise notice as bugs are gone with it: a viewer **no longer closes when the card that opened it scrolls out of view**, and one left open behind a full-page route or a backgrounded tab no longer paints over whatever replaced it — it's hidden and restored, so switching back finds it where you left it.

## Folders and the sidebar

The left sidebar is your home base: every **folder** you've opened — a project directory — with its conversations grouped beneath it. Open a project folder to add one (**⌘O**). Right-click a folder's header (or click its **⋯**) for everything you can do with it:

- **Set default agent.** Choose the agent a folder should use, and every new conversation you start there opens with it preselected. Pick **No default (use global)** to fall back to your global choice. It sets the agent only — model and mode still come from that agent once it connects.
- **Change color.** Give a folder an accent color so its section stands out when you're juggling several projects. The color tints the folder and its conversations in the sidebar; it doesn't carry into the tabs.
- **Set alias.** Give the folder a friendlier display name without touching anything on disk — it shows as *alias [ folder ]* in the sidebar and the conversation header. Leave the field empty to clear it and fall back to the plain name.
- **Import local sessions.** Open the import window with this project's past sessions preselected, to pull your agents' own history into the workspace — Codeg's conversation aggregation in action. → [Conversation Aggregation](/guide/aggregation) covers what it sweeps and how it matches.
- **Manage conversations.** Bulk-select conversations to change their status or delete them. It opens from a folder, but it isn't **locked** to one: a search row runs the full width, and four filters sit beneath it, coarse to fine — **folder, branch, agent, status** — so you can sweep the whole workspace from wherever you opened it. Branches fold by shared prefix, `task/49` and `task/50` under one `task/` with a count, and every row shows the branch its conversation was started on.
- **Linked folders.** Bring other directories into this workspace as subdirectories, so one agent can work across all of them. → [Work across several folders](#work-across-several-folders)
- **Open in.** Reveal the folder in Finder / Explorer / your file manager, drop into a terminal there, or — since **0.29.0** — open it in **VS Code** (desktop only). The VS Code entry is on directories and individual files too, not just the folder header.
- **Remove from workspace.** Take the folder out of Codeg — its tabs and terminals close, but nothing on disk is touched.

The folder's real name is always its on-disk directory name — that never changes — but **Set alias** gives it a friendlier label, and color and grouping help you tell projects apart at a glance.

**Import local sessions** isn't only on the folder menu. Right-click the empty space *around* the list for the same entry, and on a workspace with nothing in it yet the button sits right there on the empty state — next to *Open folder* and *Project boot* — since importing what you already have is usually the fastest way to make a fresh Codeg feel populated. That same empty-space menu is where the **remote-workspace picker** lives, in a group of its own below the local entries.

Right-clicking a **conversation** row offers **Add to session**, which drops it into the composer as a mention badge — the same badge the `@` panel and the file tree produce. It lands at your cursor, and clicking it twice doesn't add it twice. It's the shortest route to *"look at what happened in that session"* without going through `@` and typing the name.

The number beside a folder counts **what's running in it right now** — sessions actively working, worktrees included — and disappears when nothing is. It's a live workload indicator, not a total, so a glance down the sidebar tells you where your agents actually are. The expand/collapse chevron only appears on hover; the folder icon already says whether it's open.

**Rest the pointer on a conversation row** and a card floats out beside it with what the row itself has no space for: more of the title (up to three lines — the point is to reveal it, not to unfold an essay), the agent and the model where one is recorded, the **folder** — alias-aware, and badged when it's a worktree — its absolute path, and the branch. If the session was re-parented out of a worktree that's since been removed, it names the original path too. There's deliberately no status on it: the row you're pointing at already badges the two states worth flagging. It costs no request; everything on it is already in memory. Before **0.29.0** the only way to get any of this was the Session Details dialog, which didn't carry the folder or its path at all — and with several worktrees of one repo open, two rows genuinely read identically.

### Group your folders

A workspace with a dozen repositories in it is a long flat list. **Folder groups** are named, optionally coloured bands that hold folders — and they and your loose folders **share one order**, so the two interleave rather than groups being herded to one end.

Drag a folder onto a group's heading to put it in; drag it to the trailing zone to take it out; drag the group itself to move the whole band. While you're dragging a folder every group opens up, collapsed ones included, so nothing is unreachable. **Move to group** in a folder's context menu is the same thing without the pointer.

A group heading carries a **running-session badge summed across everything inside it**, so a collapsed group still tells you whether one of its projects has an agent working. Members indent exactly the way worktree children do, rails and conversations shifting together, because it's the same machinery underneath.

### Three sections, in the order you want

The sidebar has three top-level sections:

- **Folders** — your projects, conversations nested under each.
- **Chat** — folderless conversations, the ones you started in [Chat mode](#start-a-session-—-the-composer).
- **Recent** — one flat list of the conversations you can currently reach, folder-bound and chat alike, in whichever order **Sort by** is set to. Nothing is nested and nothing is grouped; it's the answer to *"what was I just doing?"* without expanding anything. It follows the same view options as the rest of the sidebar — a closed folder's conversations, a completed one while *Show completed* is off, and anything already in **Pinned** stay out of it. It shows **15 rows** at a time with a **Show more** footer that reveals another page per click, while the section's own count badge reports the full total. Since **0.28.2** that footer also folds it back: once you've expanded past the first page, a reset appears on the same row, so a list you opened up to find one thing doesn't stay long for the rest of the session, pushing the sections below it off screen. It's offered only when more than a page is actually showing. Its header carries a new-conversation button, like Chat's.

All three can be **reordered** from the view-options menu — one row per section with move-up and move-down controls (or Alt+Arrow on the focused row) — and **Recent can be switched off** entirely if you'd rather not have it.

### Tidy the list — view options

Three buttons at the top of the sidebar keep a long history manageable. **Locate Active Conversation** jumps to the session you're in, expanding whatever it's hidden behind. **Expand/collapse all** is its own button beside it, because it acts on the list rather than storing a preference — and it folds *everything*, the flat **Chat**, **Recent** and **Pinned** headers included, not just the folder groups inside them. Collapsed bottoms out at four header rows with nothing under them; expanding again restores the folders underneath exactly as they were, since section collapse and per-folder collapse are remembered separately.

The third is an **eye** — not a funnel, since nothing in the menu filters the list down to matches — and it opens **View options**, in four labelled groups:

- **Conversation list** *(submenu)* — **Show completed conversations**, **off** by default, so finished work stays out of the way and the list is what's still live; **Show worktree folders**, **on** by default; and **Show Recent group**, **on** by default.
- **Navigation items** *(submenu)* — see [below](#choose-which-navigation-rows-you-see).
- **Sort by** — **Created time** (the default) or **Updated time**.
- **Section order** — the reorder list described above.

The two inventories sit behind hover-opened submenus so that Sort by and Section order — the two people come back for — aren't at the bottom of a fifteen-row menu. The other two stay inline: a pair of radios and a ranked list read wrong behind another hop, and the order rows need the menu's full width. Flipping a toggle **dismisses neither the submenu nor the menu**, so changing two settings costs one visit.

About **Show worktree folders**: with it on, each [worktree](/guide/git#work-in-parallel-with-worktrees) sits under its repo as its own group, with its own count and color. Its header reads the same *alias [ name ]* pair a project header does — `task/49 [ codeg-task-49 ]`, the branch checked out there in front and the directory it lives in behind — so several worktrees of one repo are tellable apart at a glance. Since **0.30.0** the repository's *own* row is labelled the same way — `main [ root ]`, lined up with its worktree siblings — instead of a bare "root" that said nothing about which branch it was on. Existing ones are labeled at startup, and a name you set yourself is never overwritten. Switch it off to merge them into the parent folder as a single list.

### Choose which navigation rows you see

The **Navigation items** submenu switches the sidebar's four full-page rows on and off individually: **Automations**, **To-dos**, the **Repository panel**, and **Infinite Conversations**. If you don't use the forge integration, that row doesn't have to sit there.

Hiding one costs you nothing permanent — every route stays reachable from the status bar's [quick actions](#the-layout), which is why it's safe to hide them at all. The setting is per device, and a row you've never touched is shown, so a route added in a future release arrives visible rather than silently off.

## Work across several folders

A workspace doesn't have to be one directory. Since **0.23.1** you can **link other folders in as subdirectories** of it — a sibling service, a shared library, the docs repo — and the agent reads and edits across all of them from the one conversation. The file tree shows them, workspace search covers them, and `@`-mentions reach into them.

It takes one gesture: **right-click the folder in the sidebar → Linked folders**, then **Add folders** and pick as many as you like. (Opening a brand-new folder offers the same step right after you choose the root, so you can assemble a workspace as you create it.)

### What it's for

The point isn't really "more directories." It's that the root stops having to be *the* project and becomes the place you **assemble** one — for as long as the work needs it, and no longer.

- **A frontend and a backend that live in separate repos.** Link `api` next to `web` and one turn can change an endpoint and the code that calls it, with both sides of the contract in front of the agent instead of one side and a guess.
- **Whichever microservices this week's change actually spans.** Link the two or three involved, do the work, unlink them, link a different set next week. The workspace becomes a *view over* your services rather than a checkout you have to maintain.
- **An empty root that owns no code at all.** Make a directory purely to compose things — `~/work/current-task` — and link whatever the job needs into it. Nothing to tidy up afterwards, because there was never anything there.
- **Code beside its documentation.** Link the docs repo into the code repo and a change plus the page describing it land in the same session, in the same review. (This is how these docs are kept in step with Codeg itself.)
- **A library you'd rather fix at the source.** Link the shared package into the app that depends on it, and the agent can fix the bug where it actually lives instead of papering over it in the caller.
- **Reference you have no intention of changing.** A design-system repo, an API spec, another team's service. The agent works from the real interface rather than from what it can infer about it.
- **An old repo and its replacement, side by side**, while you port code across — the one case where having both trees open is the entire job.
- **Sample data you deliberately keep out of the repo.** Link a directory of fixtures or real-world input files so the agent can run against them without any of it being committed.

### How it works underneath

The links are **real filesystem links** on disk, and that's a deliberate choice: agent CLIs run with their working directory set to the workspace root, so a merge that existed only in Codeg's UI would be invisible to them. Because it's a real directory entry, everything else follows — `ls` finds it, the agent's own file tools find it, your terminal finds it.

On macOS and Linux that's a symlink. On **Windows** it's a symlink too where Windows allows one, but creating one needs a privilege an ordinary process only has with **Developer Mode** on — so Codeg falls back to a **directory junction**, which needs no privilege and behaves the same for the local absolute paths it links. If both fail you'll be told to turn on Developer Mode or run Codeg as administrator.

Each linked folder appears under the name of its own directory, marked in the file tree as a **linked folder**. If that name is already taken in the root, Codeg disambiguates to `api-2` rather than overwriting anything — case-insensitively, since macOS and Windows treat `API` and `api` as the same entry.

### Manage them later

Reopen **Linked folders** on the same menu and each link shows its current state:

| State | What happened | What to do |
| ----- | ------------- | ---------- |
| **Linked** | Working normally | — |
| The link is gone from this folder | Something deleted the symlink | **Recreate link** |
| Another entry now uses this name | A real file or folder took the name | **Rename**, then recreate |
| The linked folder no longer exists | The target moved or was deleted | Re-link it at its new path |

**Rename** changes only how it appears inside the workspace — the directory it points at keeps its own name. **Remove link** deletes the symlink and nothing else; the linked folder itself is never touched.

A switch on that screen — on by default — **keeps links out of `git status`** by writing the link name into the repository's `.git/info/exclude`. That file is local to your clone and never committed, so nobody else's checkout learns about your linking habits.

It applies when the workspace folder is a git repository, and it's best-effort: if the rule can't be written, the only consequence is a noisier `git status`, never a failed link. Two gaps worth knowing — a workspace that isn't a repository has nowhere to put the rule, and **renaming a link doesn't carry its rule across**, so the new name will show up as untracked until you exclude it yourself.

Some picks it simply refuses, telling you which: the workspace folder **itself**, a folder that **contains** the workspace, something **already inside** it (no link needed — it's already reachable), and something **already linked**.

::: tip Only the links you made are followed
Codeg confines every file operation to the workspace root, and that guard doesn't just wave symlinks through — it consults the list of links *you* created. So a repository you cloned that happens to ship `secrets -> ~/.ssh` stays exactly as unreadable as it was before you linked anything. → [Privacy & Security](/reference/privacy)
:::

::: warning What a link doesn't extend
Two things still follow the workspace root only. **Live file watching** — edits an agent makes inside a linked folder won't refresh the tree on their own; reopen or refresh it. And the **Changes** and **Commits** panels track the root's repository, so a linked repo's own working-tree changes and history aren't shown there. Open that repo as its own folder when you want to review and commit its changes.
:::

## Start a session — the composer

Everything begins in the **composer**, the input at the bottom of the conversation. Choose an agent, model, and mode, point it at a working folder, type a prompt, and send.

- **Agent and model.** Pick from your enabled agents and the models that agent offers. (The agent picker appears when you start a new conversation.) The row fits the width it's given: as many pills as there's room for, and the rest behind a **More agents** button — with the **selected** agent never among them, so the one pill that names your choice is always on screen and always readable.
- **Mode, and the agent's own options.** The dropdown lists the modes the connected agent provides — a plan-first mode, an accept-edits mode, and so on. Beside it sit whatever **session options** that agent advertises: a picker where it offers a list of values, a **toggle chip** where it offers a switch (Cline's *auto approve*, for one). All of it comes from the agent itself, so what you see depends on which one you're running — and an option whose kind this build of Codeg doesn't understand is quietly left out rather than being allowed to break the session.
- **Working folder & branch.** A row just below the box shows where the agent will work: a **folder chip** and a **branch chip**. The folder chip is switchable while the conversation is still a draft (its list shows folder aliases and searches them, and a pinned **Chat mode** row runs folderless for a quick chat); once a conversation is bound to a folder, the chip stays as a label. The branch chip is the full git menu — see [Branch and run git](#branch-and-run-git).
- **Context and connection.** At the right of that same row, a small ring tracks how much of the model's **context window** you've used — click it for the token breakdown (input, output, cache) — and a heart icon shows the agent's **connection status**: connected, connecting, error, or disconnected. That heart is a **button** — see [below](#when-the-connection-looks-wrong).
- **The + menu.** Attach files, insert a saved **quick message**, leave **live feedback** while the agent is working, run a **slash command**, or drop in a **skill** from the Experts, Office Work, or Scientific Research packs. Live feedback opens a dialog for a note to the agent that's already running — the same channel the composer's mid-turn send rides, described [below](#talk-to-an-agent-mid-turn). → [Settings → General](/reference/settings/general#in-conversation-tools)
- **Rich input.** Type **@** to mention a file, agent, past session, or commit; type **/** for slash commands — the match is fuzzy, so `rvw` finds `review`. Long messages you've sent fold up with a **show more** toggle so the transcript stays readable.
- **Both panels behave like panels.** The `@` list takes the **composer's own width and edges** and opens above it, exactly as `/` does, instead of a narrow box pinned to the cursor — the extra room goes to the description, which used to be cut off. It stays with the composer it belongs to, so one left open while you switch to To-dos doesn't float over the new page. And **`/` works while the agent is still connecting**: slash commands only exist once the agent is up, so typing `/` early used to do nothing at all; now the panel opens with a loading row and fills in when they arrive, with no need to retype.
- **`@` after CJK text, and on a phone.** The mention panel used to trigger only after an ASCII space — which Chinese, Japanese and Korean don't write — and refused to open mid-composition on a soft keyboard. Both are fixed, and it keeps clear of the on-screen keyboard.
- **Send, queue, stop.** **Enter** sends; **Shift+Enter** makes a newline. While the agent is working, Send turns into a red **Cancel** button — and once you have typed something on a session that can take a message mid-turn, a **split send** appears beside it: its button is **Queue message**, which is what Enter has always done there, and its chevron holds the one action that doesn't wait. Either way, type ahead and your messages queue until the agent is ready for them. → [Talk to an agent mid-turn](#talk-to-an-agent-mid-turn)

::: tip Approvals come from the agent
Codeg has no global "auto-approve everything" switch. How freely an agent acts is governed by the **mode** you pick plus the **permission prompts** it raises mid-task (below) — so control stays with the agent's own safety model.
:::

## Follow along — the conversation

As the agent works, its **transcript** streams in: replies as formatted Markdown (code, math, and diagrams included), its reasoning, and a live **plan** checklist for multi-step tasks. A plan long enough to bury the rest of the turn caps its height and offers **show more** / **show less**, the same way a long message you sent already does.

- **Every reply sits under a header.** It reads **Working…** while the agent writes and **Worked for 1m 9s** once the turn settles — which is where the per-turn duration lives now, rather than in the footer stats row. Clicking the header folds away the reply's **intermediate work** — the tool calls and reasoning it went through — and **keeps the final answer on screen**, which is the part you came back for. **Sending your next message folds the work above it**, and that's also the state a conversation opens in when you return to it. A reply with nothing to fold away is a plain label rather than a button: one that stopped on a tool call, or whose answer *is* a card, stays open, because folding it would leave a lone header where the substance was.
- **Fork from here.** A finished reply offers a fork in its stats row: the new session inherits the conversation and the original is untouched, live or reopened alike. Since **0.30.2** this is the whole feature — the composer's old *Fork & Send* shortcut is gone, a redundant second door to the same thing that couldn't say *which* reply it branched from. The action appears on a connected session whose agent **advertises** forking, read off the handshake rather than a fixed list — so the set grows as adapters adopt it, and already reaches past the ones below. Where it forks *from* is the part worth knowing, and that part **is** a fixed list: **Claude Code**, **Codex** and **DeepSeek Harness** can name the individual reply, so the fork lands exactly there — DeepSeek since **0.30.2**, and Claude since **0.30.4** even when the reply you picked sits on a branch an earlier fork abandoned. Everywhere else, and on any turn carrying nothing to name it by, the fork lands at the **end of the conversation** instead of failing.
- **When a fork isn't offered, it says why.** The button greys out with a tooltip instead of vanishing: *Can't fork while a turn is running*, because naming a message the agent is still writing can't mean anything; and *Can't fork from this reply just yet — try again in a moment* for a reply Codeg streamed but hasn't finished re-reading, where forking would quietly land at the end of the conversation instead of where you pointed. You hit the second one on the half of a reply that came before a [mid-turn message](#talk-to-an-agent-mid-turn). It usually clears in a second or two, when the re-read names the turn — though a turn you steered right at its end can leave the reply short of the thread's tail with no name ever arriving, and there it stays greyed.
- **Tool calls** appear as collapsible cards tagged with status — *Awaiting Approval*, *Running*, *Completed*, *Denied*. Shell commands stream their output live; repeated actions fold into a single summary like "Ran 3 commands."
- **A result with no card of its own** — an MCP tool Codeg has never seen, say — renders as a **collapsible tree** rather than a wall of JSON: small payloads open fully, large ones show just their outline, and long strings fold to one line. **Show raw JSON** switches back to the plain text whenever you want it.
- **What the agent touched** is summarized at the end of each reply, in two groups: **New files** (shown by default) and **Files changed** (folded up, with a count and `+`/`−` totals). Click a card to open that file in the editor, or use its **View Diff** button to see just what this reply did to it — and on the desktop, **Show in file manager** to reveal it on disk. Deleted files are listed too, marked **Remove**.
- **File names are live.** A file the agent mentions — and any file you attached with `@` — renders as a **badge** you can click to open in the file pane. **Right-click** it for the same actions the file tree offers: reveal it in **Finder / Explorer / your file manager**, **Copy relative path**, or **Copy absolute path**. (The reveal option is hidden where it couldn't work — in the browser, or a desktop window attached to a remote workspace — and the relative form is greyed out for a file outside the current folder.)
- **Permission prompts.** When the agent needs the go-ahead — to run a command, apply an edit, follow a plan — a card docks just above the composer: *"Agent requests permission to continue this turn."* Its buttons are the agent's own choices (Allow, Reject, and the like). A separate card handles multiple-choice questions the agent asks you. An agent that asks for **several at once** — Codex does this routinely — gets a **queue**: one card at a time, with a **+*n* waiting** count beside it, and the next one arrives as you answer. So a batch of approvals reads as a batch rather than as a hang.
- **What each option grants.** Where the agent tells Codeg — **Claude Code** and **Codex** do — a panel above those buttons spells out what each choice would actually allow, and each line is tagged with how long it lasts: **This run**, **This session**, **Saved to user settings**, **Saved to project settings**, **Saved to local project settings**, or **Saved permanently**. It's the difference between waving a command through once and writing a rule into a file your teammates will inherit, said before you press anything. Since **0.30.1** Claude Code's own buttons carry it too — *this session* versus *always in this project* — so the scope is on the thing you click, not only in the panel above it.
- **An empty reply says why.** If a turn ends with nothing in it, the alert doesn't just tell you to check your configuration — it names which of three things happened: the agent genuinely produced no response, it produced output Codeg couldn't parse (usually an agent/protocol version mismatch), or it sent only status updates (plan, mode, usage) and no reply. The agent's own output — its error tail, scrubbed of anything that looks like a credential — sits behind a **collapsed disclosure in the status bar's Alerts**, which is the one surface with room for it.
- **Context compaction.** When an agent compacts its context — because it ran out of room, or because you asked it to — Codeg marks the spot: a **divider drawn across the conversation**, sitting between turns rather than folding into the reply above it, because a boundary is what it is and not a tool call. It reports **tokens before → after** where the agent supplies them, says whether it was **manually or automatically triggered**, and is **still there when you reopen the conversation**. How much of that label you get depends on the adapter: Claude Code from **0.75.0** supplies the whole set, live and in history alike. DeepSeek reconstructs what its log happens to carry, so a count or a duration can be missing — a compaction that failed omits the counts by design — and older shapes carry counts alone. On **Claude Code** a compaction also **resets the context ring** beside the composer to what's left, which used to go on measuring a window that no longer existed. A compaction that fails says *failed* rather than sitting at *in progress* forever.
- **Goals.** `/goal` on **Claude Code** and **Codex** renders as a card carrying the objective, the status, and the tokens, budget, remaining and elapsed counters — live, and still there when you reopen the conversation later. Its controls are whatever that agent actually implements, so Codex offers **Pause** and **Clear** while Claude Code offers **Clear** alone. Both genuinely stop the work: they used to only take effect at the agent's next idle point, which meant a paused goal kept running and a cleared one kept continuing itself.
- **Delegated work.** When one agent hands off to another, a **Sub-agents** overlay tracks the delegated sessions — the heart of [Multi-Agent Collaboration](/guide/multi-agent).
- Each turn ends with its **model and token** stats — the duration having moved up to the reply's own header — and you can **export** a whole conversation to image, Markdown, or HTML. **While** a turn is running, the row above the composer adds its **output speed in tokens per second** beside the elapsed time and the file count — an estimate covering the text and the thinking. It shows on conversation tabs too, and in the read-only transcripts — a [to-do](/guide/tasks)'s session, a sub-agent's — where you're watching work you didn't start.
- **Turn a message into a task.** Beside the copy button — on your own messages and on finished replies alike — sits a checklist icon: **Create task from message**. It takes that text over to [To-dos](/guide/tasks), pre-filled with the project folder, for the follow-up you noticed but don't want to do now.
- **Select part of a message.** Highlight text anywhere in the transcript and a small toolbar pops up over the selection with three actions: **Copy**; **Quote**, which appends it to your draft as a Markdown blockquote — so replying to one paragraph of a long answer doesn't mean copying, pasting, and adding the `>` yourself; and **Ask**. Blockquotes render with a proper quote rule now, in the composer and in the agent's own replies. The bubble follows the selection as the thread scrolls and reflows, flips below it when there's no room above, and stays inside a narrow tiled column. Read-only transcripts get **Copy** alone, since there's no composer to quote into.
- **Ask about a passage, without derailing the thread.** **Ask** swaps the bubble's buttons for a question box; type and submit, and Codeg opens a **new conversation** carrying the quoted passage followed by your question. It starts on **this conversation's agent** and in the same split group, so the answer comes from the same agent that produced the passage rather than whichever one a blank conversation would have defaulted to — and *"why this approach?"* about one paragraph doesn't cost you the thread you were reading. From a folder conversation the new one opens on that folder and working directory; from a [Chat-mode](#start-a-session-—-the-composer) one it starts as a fresh folderless chat, since chat conversations don't share a folder.
- **Copy an image out.** Right-click a picture for **Copy image** — in the transcript, in the blown-up preview, and since **0.28.2** on one you've staged in the composer but not sent yet. On the desktop this used to fail outright for JPEG, WebP and GIF; all three work now.
- **Mermaid diagrams get a viewer of their own.** A `mermaid` fence renders as a diagram with its own controls: zoom from **0.2× to 8×**, drag to pan, **reset view**, and **fullscreen**. It stays sharp the whole way up, because zooming re-lays-out the drawing at its real size rather than stretching a picture of it. The palette follows your interface theme, and switching theme redraws what's already on screen. Take it with you via **Copy source** or download it as **SVG**, **PNG** or **`.mmd`**. A diagram that fails to render says so and offers **Show source** and **Retry**, rather than leaving a blank where a diagram should be.
- **A system message shows a preview.** Claude Code's post-`/compact` summary used to be a shut accordion you had to open to learn anything. It renders clamped instead, with a toggle only when there's more underneath.
- **Background work gets a strip you can watch.** When an agent kicks off work that outlives the turn — Claude Code's background tasks, and since **0.30.3** the long-running commands **Codex** pushes to the background, badged *Background* in the transcript — a strip pins itself **above the transcript**, one row per task that's **running or paused**: the tool it last ran, what it has cost in tokens, a **Stop** button, and an **Output** link opening the task's log in a file tab — each of those appearing once the task actually reports one, so a row can start out as little more than a name. Only *unfinished* tasks are listed; a task that settles leaves the strip at once, because its outcome belongs in the transcript and a permanent list of finished jobs would just grow all session. Stopping needs a live connection you own, and a stop that's declined says so — a successful one announces itself by the row disappearing, and silence would look the same as a click that did nothing.

### Talk to an agent mid-turn

Watching an agent go the wrong way and having no way to say so until it finishes is the oldest annoyance in this kind of tool. Since **0.30.3** any session with a **delivery channel** offers a way in: type into the composer while the agent is working, and the split send's chevron holds one extra action beside the ordinary **Queue message**.

There are two channels, and Codeg words the action differently for each because they promise genuinely different things:

- **Insert into current turn** ⚡ — the note goes **into the work already running** and the agent sees it right away. This is **Claude Code alone**, on adapter **0.65.0 or newer**, and that floor is a policy decision rather than a version pin: Codeg checks the adapter that's actually running, not the one it would have installed.
- **Send note for next check** 🕐 — the note is **recorded and waits**. The agent picks it up the next time it checks, which is the honest description of a tool the agent has to volunteer a call to. This is any other session whose agent was handed the `check_user_feedback` tool when it launched — Codex, Grok, Gemini, OpenCode and the rest, given the [companion](/guide/multi-agent) and **Live feedback** switched on *before* the agent started. Turning the switch on mid-session can't retrofit the tool onto an agent already running. Because those agents typically only check when prompted to, adding *"check my live feedback regularly"* to your original message is what makes the channel reliable.

A session with neither keeps the plain **Cancel**-only form it always had.

**Attachments come along.** A draft holding an image or an `@`-mentioned file steers as the same block list a normal send uses, so nothing is silently stripped — and the image shows on the message inside the running turn rather than only after you reopen the conversation. On a *note* session the backend won't take blocks, so the **whole draft, attachment included, goes to the queue** instead.

**Sent notes show as rows above the composer** — **waiting** until the agent reads one, then **received**. On the **push** channel a note is also a real message: it lands in the transcript as its own turn, the agent's answer to it starts a new turn rather than running into the previous answer mid-paragraph, and once the transcript has adopted it that way its row goes, since showing both would print the same thing twice. On the **note** channel there's no turn to adopt — the row is the whole of it until the agent's next check picks the text up.

Two ways it can miss, both of which say so:

- **The turn ended while you were typing.** The draft is **queued instead** and sent with the next turn — announced, not silently rerouted.
- **The agent finished without reading it.** The rows survive their turn instead of vanishing, saying *"The agent finished before reading your feedback"*, and each offers **Send as message** or **Dismiss**. Notes that *were* read retire with the turn — they did their job — and your next message clears the rest.

The **+** menu's *Live feedback* entry opens a dialog onto the same channel, for a note you'd rather write somewhere other than the composer. → [How live feedback reaches a running agent](/reference/settings/general#how-live-feedback-reaches-a-running-agent)

### When a turn fails, it says what kind of failure

A turn that dies used to leave you with a generic error and a guess. **Claude Code** and **Codex** now report failures **by kind**, and Codeg docks each one as a strip under the composer, naming what went wrong — a **connection issue**, an **access issue**, a **limit reached**, a **request rejected**, or a **service issue**, falling back to a plain *session issue* for a kind it doesn't recognize — with the agent's own message below it.

The buttons are the agent's suggestion, not Codeg's guess, so a strip carries only what would actually help. Three are understood:

- **Retry** resends the message the failed turn was working on. (If there's nothing to resend, it says so rather than doing nothing.)
- **Sign in** takes you to that agent's settings page.
- **New session** starts a fresh conversation.

The distinction that matters most is between a failure and a **wobble**. When the agent is retrying on its own, the strip is **amber and carries no buttons** — there's nothing for you to do while it works through it — and it clears **the moment the agent produces output again**, rather than waiting for the turn to end cleanly. What's left is a single muted **Recovered** line, which takes itself off after ten seconds instead of sitting over the chat for the rest of the session announcing a hiccup that's already over.

None of them stack. A long turn that reconnected three times used to leave three amber rows permanently docked above the composer; several at once now **collapse into one strip with a *+N more* count**, and **every** strip — the Recovered line included — has a close button. A strip also clears when you send your next message, and a problem that comes back raises itself again rather than reusing the old, settled one. In a read-only viewer — a [to-do](/guide/tasks) transcript, a sub-agent's session — you see the strips without the buttons.

Opening an **old** session doesn't replay any of this: a dropped image or a failed compaction from last week stays history instead of surfacing as a live alert and a desktop notification.

### When the connection looks wrong

The **connection heart** below the composer is a button. Click it for what Codeg actually knows about that session: the agent, its **real** state — *Responding…* is told apart from a resting *Connected* — the working directory, the session id, and any error.

At the bottom sits **Reconnect**, and it works in **every** state, including the stuck *connecting* you'd be clicking it from precisely because it's stuck. It **resumes** the session rather than starting a fresh one, so your history comes back with it.

When a session genuinely can't be reloaded, a banner says which of the known reasons it is rather than the generic *"Failed to load session, starting new"* — and one of them comes with the fix. A Codex session you've run `codex archive` on names the exact **`codex unarchive <id>`** command with the id filled in, and one click copies it. Before **0.29.0** that case fell outside the recognized failures, so a conversation whose history was one command away from returning was silently orphaned.

**Signing out of Claude while a session is open ends that turn and nothing more.** Since **0.30.3** the turn stops with *"Claude Code needs you to sign in again before it can run this turn"* and the session stays where it is — sign in from Settings and send the message again. It used to take the whole connection down with it and leave the conversation reading as *cancelled*, which said nothing about the actual cause. A [delegated sub-agent](/guide/multi-agent) in the same state reports **needs sign-in** rather than an unrecognized failure.

### Long conversations open fast

A conversation that has been going for weeks doesn't make you wait for all of it. Codeg loads the **last 120 turns** — nudged back to start on one of your own messages, so a window never opens mid-exchange — and pages in another 120 as you scroll up, **without the view jumping** under you: the position you were reading holds while the earlier turns are prepended above it. Responses from a server or a remote workspace are compressed on the wire as well.

The window is a display concern only. **Exporting still takes the whole transcript**, and so does anything else that reads the conversation as a document.

::: tip A session that fails to load keeps what you can see
If loading a conversation errors, the failure now docks as a small notice above the composer with **Reload** and **New session**, instead of replacing everything with a full-page error. The transcript you already had stays on screen and stays readable.
:::

## Work with files — editor, diffs, and previews

The **Files** tab in the right panel is your project tree, rooted at the workspace; click any file to open it in the center file pane. **Drag** an entry to rearrange the project or feed the agent: drop a file or folder onto another folder (or the workspace root) to **move it on disk**, or drop it into the composer to **attach it** as a file reference for your next message — the drop target decides which, with no modifier keys. The tree also takes the keyboard: **↑/↓** move, **→** opens a folder or steps into it, **←** closes it or jumps to the parent, **Home/End** go to the ends, and **Enter** opens a file or toggles a folder. Every row carries a **⋯** button opening the same menu right-click and long-press do — a visible way in on a touch screen, where a row is also draggable and a long press can be ambiguous.

- **Editing.** Files open in a full editor. There's **no Save button** — Codeg saves on **⌘/Ctrl+S**, when the editor loses focus, and automatically a few seconds after you stop typing; an unsaved file shows a **`*`** in its tab. Send a file, or just a selection, to the agent with **⌘L**.
- **Diffs.** The agent's edits open as **read-only diffs** — side by side (**HEAD ↔ Working Tree**) or as an inline unified diff, one file at a time, with change counts and prev/next navigation. Diffs are for *review*; you commit from the git panel (below), not by accepting individual lines.
- **The smaller diff cards read side by side too.** The compact previews — a diff inside a reply, the one a permission prompt shows you before you approve an edit, a [to-do](/guide/tasks)'s changed files, and a **View Diff** opened as its own tab — gained an **inline ⇄ side-by-side** toggle in their top-right corner in **0.28.2**. **Inline stays the default**, and the choice is remembered and shared: set it on one and every other preview follows. A file that is purely *new* stays single-column, having no old side to show.
- **Live previews** open in the same pane: **Office** documents (`.docx`, `.xlsx`, `.pptx`) render and refresh as the agent edits them; **Markdown** and **HTML** get a **Preview ⇄ Edit Source** toggle (HTML runs scripts only if you opt in); images zoom and pan. → [Office Documents](/guide/office)

::: tip Merge conflicts get their own editor
Resolving a conflict opens a three-pane merge editor — **Local**, **Result**, **Remote** — where you *can* accept changes hunk by hunk. It's the one place with per-hunk controls; everywhere else, diffs stay read-only.
:::

## Session details

The aux panel opens on **Session Details** — an at-a-glance readout of the conversation you're in: its title and ids, the agent and model running it, status and current git branch, and live **token usage** (input, output, cache, and context-window totals) with timing and timestamps. Every field has a copy button; with nothing focused it just reads *No active session*. It's a readout, not a control panel — the same view is available from the conversation header's **⋮** menu.

## Branch and run git

The **branch chip** below the composer is first of all a *branch picker*, and there's one per conversation, so [tiled sessions](#tile-several-sessions-side-by-side) each show their own branch. Click it and a searchable menu opens with two halves:

- **Operations**, at the top — the short list that acts on the branch you're on: **Pull code**, **Fetch remote branches**, **Commit code…**, **Push…**, **New branch…**, and **New worktree…**
- **Your branches**, below: **Local branches** and **Remote branches**, with shared prefixes (`feature/…`) folded into collapsed groups and the checked-out one marked **Current**. Click any other branch for its actions — **Switch to this branch**, **Merge** it into the current one, **Rebase** onto it, **Delete branch**, or **Update** / **Push** it without checking it out. A branch a worktree has checked out also offers **Delete worktree** and **Delete worktree and branch**.

The long-tail operations aren't here: **stash and unstash** live in the aux panel's **Changes** tab with the rest of the working-tree actions, and **Manage Remotes** in its **Commits** tab.

One search box filters both halves at once, so typing `push` finds the operation and typing part of a branch name finds the branch. In [Chat mode](#start-a-session-—-the-composer) there's no chip at all; in a folder that isn't a git repository it reads **No branch** and offers **Initialize Git repository**.

→ [Git & Worktrees](/guide/git) covers the whole workflow.

## Run a saved command

The **status bar** carries a launcher for the commands you run over and over — a dev server, a test watcher. Codeg seeds the list from your project's `package.json` scripts, so it usually has something the first time you look; until then it reads **Add Command**. Pick one from the menu and the ▶ button runs it in a terminal, turning into ■ to stop it. **Manage Commands…** lets you add, edit, reorder, and delete them, and your selection is remembered per folder.

## Review and commit

Two right-panel tabs put version control a glance away:

- **Changes** lists your working-tree edits — tracked and untracked, with per-file line counts. From here you can open a file's diff, discard an edit (**Rollback**), or start a commit.
- **Commits** is your whole history, as a timeline that loads more as you scroll. Two filter pills narrow it — **Branch** (every branch by default) and **Author** — and Codeg remembers both per project. Click a commit to expand it: the full message, the files it touched with their `+`/`−` counts (click one for its diff), and which branches contain it. Right-click for **View Diff**, **New branch…**, **Reset to Here**, or **Push…**

The Branch pill has a **HEAD** entry above the branch list — *follows the current branch* — which is the one to pick when you're hopping between branches. Naming a branch pins the view to that branch; **HEAD** re-resolves on every query, so the history follows you through each checkout and keeps working even on a detached HEAD.

The Changes tab commits directly: type a message in its toolbar and press Enter for a quick commit of the tracked files, or open the full **Commit** window to tick exactly what you want, write a message, and choose **Commit** or **Commit and Push**. Its menu also holds pull, fetch, push, stash and unstash. Branch switching, merging and worktrees are the [branch chip's](#branch-and-run-git) job.

Parallel development with worktrees, remote accounts, and the full git workflow have their own page. → [Git & Worktrees](/guide/git)

## The terminal

Press **⌘J** for an integrated terminal in your working folder — a real shell, not a sandbox. Open as many as you need in tabs. It's there for the commands you'd rather run yourself: starting a dev server, inspecting output, running a one-off script alongside the agent.

**Ctrl+Shift+C** copies the selection, Git Bash on Windows included, and the terminal keeps focus afterwards — the plain Ctrl+C stays what it has always been, the interrupt.

**In a narrow window — a phone, or anything under 768 px — a virtual key bar** sits above the soft keyboard, since a touch keyboard has none of the keys a shell needs: **ESC**, **TAB**, `/`, `-`, the four arrows, **HOME**, **END**, **PGUP** and **PGDN**. **CTRL** and **ALT** are *latches* rather than held keys, and mutually exclusive — tap one and it lights up, then the next thing you type is wrapped and the latch releases, so Ctrl+C is two taps and works with letters from the soft keyboard as well as with the bar's own keys. The latch is spent either way: press it before something it has no encoding for and that character goes through unchanged. The bar collapses from the terminal's tab bar, and the collapsed state is remembered for that browser or app.

## Tabs and multitasking

The center area is **tabbed**, so several sessions stay open at once:

- **Conversation tabs** reorder by dragging and **pin** with a double-click. **⌘T** opens a new conversation, **⌘W** closes a tab, **⌘Tab** cycles between them.
- **File tabs** track the files, diffs, and previews you've opened in the file pane.
- **Unsent drafts survive a restart.** A conversation you started but never sent comes back where it was — with whatever you'd typed in the composer still in it. Each draft keeps its own text, so two of them side by side no longer overwrite each other.

### Split the conversation view into groups

One tab strip isn't always enough. **Right-click any conversation tab** and you can split the conversation area into **tab groups** — the same idea as an editor's split panes, with no fixed limit on how many:

- **Split Right** / **Split Down** — divide the current group in two. The new group opens on a **fresh draft**, because a conversation can't be open in two groups at once.
- **Split and Move Right** / **Split and Move Down** — same split, except *this* tab moves into the new group.

Every group is a complete workspace of its own: its own tab strip, its own conversation header underneath, and its own **new-conversation** button that inherits that group's folder. Only one conversation is *active* at a time — the one the composer and shortcuts act on — so splitting never leaves you guessing where a keystroke landed.

Once you're split, the same right-click menu manages the layout:

- **Move to Opposite Group**, or **Move to Group *n*** when there are several (each listed with the conversation it's showing).
- **Change Splitter Orientation** — flip a side-by-side pair into a stacked one, or back.
- **Unsplit** dissolves the current group into its neighbour; **Unsplit All** collapses everything back to one.

You can also just **drag a tab across** — onto another group's strip, or anywhere in its pane — and a floating chip follows the cursor while a drop indicator shows where it will land. **Drag the divider** between two groups to change how the space is shared. Splits mix freely: split right, then split one of those halves downward, and you get a grid.

Your layout is remembered **per workspace**, drafts included — reopen Codeg and the split comes back, with the same conversations in the same groups.

Two small rules keep this predictable. A **draft stays in the group that spawned it** (it has nothing on the server to move yet), so its move items and cross-group drag are withheld — reordering it inside its own group still works. And **moving a tab between groups doesn't interrupt it**: the session keeps its connection and keeps streaming while it changes home.

### Tile several sessions side by side

Splitting shows one conversation per group. **Tile Display** does the opposite — it shows *all* of a group's tabs at once. Right-click a conversation tab and choose it to lay that group's conversations out next to each other: not a fixed two-up split, but **one pane per open tab**, side by side, scrolling horizontally when they don't all fit. This is how you run a fleet of agents at once: start a task in one, a different task in another, and watch every transcript stream in parallel without switching tabs.

- **Panes are your tabs.** Open another conversation (⌘T or the sidebar) to add a pane; close a tab to remove one. You need at least two conversations in the group for tiling to take effect.
- **Mix projects freely.** Tiled panes aren't tied to one folder — put sessions from different projects side by side.
- **One pane is active.** The active pane — the one the composer and shortcuts act on — is outlined with a flowing gradient border. Click any other pane to focus it.
- **It's per group.** Tiling and splitting compose: tile one group into a wall of transcripts and leave the group beside it on a single conversation.
- **Leave anytime.** Right-click → **Exit Tile** returns that group to the single-tab view.

Tiling is a great companion to [multi-agent collaboration](/guide/multi-agent): tile the lead session beside the sub-agent sessions it spawns and watch the whole team work.

## The welcome screen

Before a session starts, the conversation pane asks **"What would you like to do today?"** and offers **Quick Actions** in three tabs — **Code Development**, **Office Work**, and **Scientific Research**. Each card drops a ready-made skill (and, for Office and Research, a prompt template) into the composer with one click; anything not yet enabled for your chosen agent shows a lock that links to where you turn it on. Below it sit the agent picker and a rotating tip.

The row of skill shortcuts under the quick actions **stops at its ends** rather than drifting on its own: an arrow at each end moves it, and each arrow is live exactly while there's somewhere left to go.

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
- [**Token Usage**](/guide/token-usage) — what the conversation counter in the status bar opens.
- [**Multi-Agent Collaboration**](/guide/multi-agent) — delegate parts of a task to other agents.
