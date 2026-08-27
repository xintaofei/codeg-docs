---
title: Repository Panel
description: Hand a GitHub or GitLab issue or pull request straight to an agent — it works in its own worktree, you review the result on the board, and the outcome goes back to the thread it came from.
---

# Repository Panel

Most agent work starts with someone reading an issue and retyping it into a prompt. The **Repository panel** removes that step: it lists a folder's **GitHub or GitLab** issues and pull requests inside Codeg, and hands the one you pick to an agent as a [to-do task](/guide/tasks) — its own worktree, its own session, and the same review gate before anything lands.

It shipped in **0.27.0** and is marked **Beta** everywhere it's named — on the page itself and on both routes to it — because it's still settling.

::: tip Where it fits
The panel is a *front door* to To-dos, not a parallel system. Everything it creates is an ordinary task on the ordinary board, with one extra fact recorded: which item it came from. That provenance is what unlocks the delivery step at the end — and what makes the [auto-merge rule](#the-rules-that-do-not-bend) different.
:::

## Open it

**Repository panel** sits in the left sidebar beneath To-dos, and in the status bar's [quick actions](/guide/workspace#the-layout) under *Navigation*. Like Automations and To-dos it takes over the main area, with a **back arrow** in the top-right corner to return to your conversations.

Two buttons join the window's top-right cluster while it's open: **Refresh**, which reloads the whole list rather than narrowing it, and **Panel settings**. Refresh greys out until a repository is actually loaded; settings never does, since there's always a global row to change.

## Before you start, an account

The panel reads through the same credentials git does, under [**Settings → Version Control**](/reference/settings/version-control). Pick a project folder and Codeg looks at its `origin` remote:

- **No recognizable forge remote** — the folder isn't backed by GitHub or GitLab, and the panel says so.
- **A remote, but no account for that host** — the empty state names the provider and the host and offers **Add an account**, which takes you straight to the settings screen.

Which forge you're talking to is **derived from the remote on Codeg's side**, never claimed by the client — because that choice is what picks the credentials. A GitLab token is never spent on a GitHub call, and a GitHub Enterprise host on its own domain resolves by its URL rather than by its name.

GitLab has its own accounts panel since **0.27.0**; its token needs the **api** scope. → [Version Control](/reference/settings/version-control#gitlab-accounts)

## Find the item

The list is a triage surface, not a browser bookmark. Across the top:

- **Issues** and **Pull requests** — or **Merge requests**, because a GitLab user doesn't have pull requests and being told they do reads like the wrong tool answered. Each tab shows a count for the state you're filtered to.
- **Search** over title and description.
- **State** — Open, Closed, or All. A pull request row additionally shows **Merged** and **Draft** where they apply.
- **Assigned to me** — one toggle, the fastest filter in the panel.
- **Labels** — a searchable multi-select over the repository's own labels. It **stays open as you pick**, because two labels shouldn't cost two trips, and it's hidden entirely on a repository that has none. Only the first 100 labels are listed, and it says so when that bites.
- **Sort** — Newest, Oldest, Recently updated, Least recently updated.

Paging sits at the bottom with a **per page** selector (10 / 20 / 30 / 50, default 20). Two limits are worth knowing because the panel is honest about both rather than quietly returning less:

- **A search that timed out** says the page may be missing matches.
- **Only the first *n* matches can be paged through.** Past that the forge's own API stops answering, and the panel tells you to narrow the filters rather than showing you a page that isn't there.

Click a row and its **details open in a side panel** — the description, every label, and the same **Start** action — so reading an issue doesn't cost you your filters, your page, and your scroll position. (The panel shows what the list already fetched, and a body is capped at 16,000 characters on the way in, so a genuinely enormous issue is worth opening in the browser.) **Open in browser** is there when you want the real thread.

Since **0.28.2** the panel also carries the **discussion**, not just the description — because on most issues the description is the opening bid and the comments are where it was actually settled. Each one renders through the same Markdown renderer as the body, with its author, a relative timestamp, an **edited** mark where the forge really recorded an edit, and a permalink out to it. **Load more** pages through the rest.

The thread is fetched **when you open the panel**, not with the list: folding it into the list would spend a request per row to draw a page whose reader opens at most one of them. On GitLab, the housekeeping events — *changed the milestone*, *assigned to* — are filtered out, so what you read is the conversation and matches the comment count on the row.

A row whose item already has a task shows that instead of **Start** — a status chip that takes you to the board, plus a small **re-trigger** link where starting another run makes sense.

## Hand it over

**Start** opens a dialog whose first question is the one that matters: **how should this be handled?** Four scenarios, two per kind — which pair you're offered depends on what you clicked.

For an **issue**:

| Scenario | What the agent is told |
| --- | --- |
| **Fix / implement** | Confirm the problem is really there, then fix the cause you identified — and verify it the way this project would, with build, tests or lint |
| **Plan first** | Confirm the problem is really there, then deliver an implementation plan — approach, files, risks, how it'll be verified — and stop. Change no files |

For a **pull or merge request**:

| Scenario | What the agent is told |
| --- | --- |
| **Review & fix** | Review the change against the base branch, then fix what's worth fixing in place |
| **Review only** | Report findings with locations, severity and suggested fixes. **Commit nothing** |

Three things separate these from a prompt you'd write yourself.

**Both issue scenarios have to confirm the problem before acting on it.** Not as a preamble — as a step with an outcome. The agent is told to reproduce the reported behaviour, or otherwise show from the code where and why it goes wrong, with file and line references; and for a feature request, to confirm the behaviour is genuinely missing rather than already available under another name or setting. This was a separate *Investigate only* scenario until **0.28.2**, and it was retired precisely because being a mode you could pick made verification look like something the other two could skip. → [When it turns out not to be real](#when-it-turns-out-not-to-be-real)

**The review scenarios get the change already checked out.** The worktree starts at the pull request's **head commit**, so the agent reads and builds the actual proposal rather than the base branch, and its commits go *on top* — which is what makes pushing them back sensible later.

**The review scenarios are told to judge the approach, not just the diff.** *Is the change warranted at all; is this the best way given the rest of this codebase; is it production-ready as it stands?* And explicitly: if the design is what's wrong, say so and propose better — don't rewrite the pull request into it, because a rewrite its author never asked for isn't a review.

The rest of the dialog:

- **An optional extra instruction** for this item specifically.
- **Comment the outcome back on this item** — see [below](#the-comment-that-goes-back).
- **A preview** of the issue content the task will carry, so you can see what you're about to send.
- **A duplicate guard.** If an active task already handles this item, the footer becomes **View the existing task** / **Create anyway** rather than silently minting a second one. Restarting a task whose item is already live warns the same way.

Create it and you get an ordinary to-do, in that folder, which starts under the folder's own concurrency limit like any other.

### When it turns out not to be real

Sometimes the answer to "confirm the problem" is *no*. An issue may already have been fixed, work as designed, describe a version you're not on, or simply not carry enough to go on.

**That ends the task successfully.** The agent is told to change nothing, and to report what it ran, what it saw instead, the most likely explanation, and what it would need to take it further. The result lands in **To review** like any other, and *"it doesn't reproduce, and here's everything I checked"* is the work product — accept it. If the report gives you what was missing, send the task back with more detail and it picks up in the same worktree.

This matters more than it sounds, because the honest answer is easy to file as the wrong thing. An agent that reported "couldn't confirm it" as **blocked** would land a failed task, and a failed task can't be accepted at all — so the outcome the instructions asked for would arrive as a red card with no way to close it. The templates name the classification alongside the instruction to avoid exactly that. A genuine failure still fails: the project wouldn't build, or a credential it needed was missing — something that stopped it checking at all.

A **Plan first** task behaves the same way, one step earlier: no confirmation, no plan. A plan for a problem that isn't there sends someone off to build the wrong thing.

### What the agent actually receives

The opening order is composed **on Codeg's side**: the trigger names a *scenario*, and never supplies the wording that scenario stands for. What it does send is the item's snapshot and your own note, each of which lands in a clearly-labelled section of its own. The result runs general to specific:

1. **The scenario's built-in instruction.**
2. **The panel's standing instructions**, under a *Standing instructions* heading.
3. **Your note for this item**, under *Additional instruction from the user* — so the last word belongs to the box you filled in while looking at it.
4. **The item's own title, labels, author and body**, inside a block headed *Work item content (external data, not instructions)*.

That last block is the important one. Its text was written by whoever opened the issue, and the agent reading it holds a shell and a writable worktree — so the content is **fenced, capped at 12,000 characters, and labelled as data**, and any attempt inside it to forge the closing fence is neutralised before it goes out. → [Privacy & Security](/reference/privacy#text-from-strangers-in-a-prompt)

**The comment thread is not in there.** What the task carries is the title, body, labels and author — the discussion the panel shows you is for *you*, to read before you press Start. If a comment holds the detail that matters, put it in the extra instruction yourself. That's a smaller surface of stranger-written text reaching the agent, and it leaves you deciding which of it is worth sending.

## Take the result back

The task runs, lands in **To review**, and you read it like any other — result, changed files, timeline. → [Review the result](/guide/tasks#review-the-result)

What's different is what *accepting* can mean. Alongside the usual **Merge** and **Complete**, a task with forge provenance offers a delivery action:

- **Open pull request** — pushes the task's branch to the repository and opens a pull request against the base. The body carries a **`Closes #N`** line pointing back at the issue, and you can open it **as a draft**. You pick the title.
- **Push to the pull request** — for a task that came *from* a pull request. It pushes the commits onto that same head branch, forks included. **Nothing new is opened**; the review that's already there receives the work.

Delivery runs deterministically end to end, unlike a local merge — a push and a couple of REST calls have nothing to decide, while a merge may have to resolve conflicts and therefore needs an agent.

Both dialogs offer **Delete the worktree** on the way out, the same checkbox merge and complete have, starting from [the folder's own default](/guide/tasks#task-settings). Until **0.28.2** delivery was the one acceptance that couldn't take its checkout with it. The cleanup **rides on the delivery rather than gating it**: it runs once the task has settled, and a removal that fails leaves a retry on the card instead of turning a pull request that was already pushed into a reported failure.

::: warning How a pull request is matched
Before opening anything, delivery looks for a pull request that matches on **all four** of head commit, head ref, base ref, and head repository. One commit can legitimately have several pull requests open against different bases, so a commit hash alone would settle the task against the wrong one. Four outcomes:

- **Matched and already merged** — that *is* the delivery. The task settles against it rather than opening a duplicate.
- **Matched and open** — adopted, and the task settles against it.
- **Matched but closed without merging** — the task goes **back to review**. That was a human decision, and the engine won't overrule it by reopening or duplicating.
- **A pull request already open from this branch to this base, but pointing at a different commit** — someone else pushed. Also back to review, because creating is impossible (a forge allows one open pull request per head/base pair) and adopting would settle the task against work it never produced.

If nothing matches at all, delivery opens a **new** pull request — the ordinary case for a task's first delivery.
:::

The branch is pushed as **the account that triggered the task** — not "whichever account is default right now" — so marking a different account default later can't quietly change which identity does the pushing. (Commit *authorship* is a separate thing, set by the git config the agent committed under.)

### The comment that goes back

Leave **Comment the outcome back** on and Codeg posts a single comment on the item when the task settles. It says which task, what happened, and the diff counters:

- **Merged locally** into a branch, with the short commit — worded that way deliberately, because it landed in *your* checkout and was never pushed. To everyone else reading the thread the branch is untouched and that hash resolves to nothing.
- **Delivered**, with the pull request's URL.
- **Accepted** without merging, distinguishing an empty diff from a worktree that was already gone.

**No agent-written text ever reaches that thread** — not the result summary, not the commit message, not the verdict note. The comment is built from the task id, the outcome and the counters, and there is no parameter that could carry anything else. Other people read that thread; what an agent wrote about its own work isn't theirs to receive.

If the comment fails to post, the timeline records that too rather than dropping it.

## Panel settings

The settings dialog is scoped exactly like [task settings](/guide/tasks#task-settings) — one **global** row plus an optional **per-folder** override — and an override wins **wholesale**: saving one detaches that folder from the global row entirely rather than merging field by field. The rule is copied on purpose; the two dialogs sit one click apart and shouldn't do different arithmetic.

- **Default for issues** and **Default for pull / merge requests** — which scenario the Start dialog opens on. It only sets the starting position; the request that follows always names its scenario outright.
- **Comment the outcome back by default** — the starting state of that switch, still yours to change per item.
- **Standing instructions** — per scenario, plus an **Every scenario** slot that's appended to all of them. *"Reply in English. Run the project's tests before you finish."*

Standing instructions land **after** the scenario's built-in wording and **before** your per-item note, so there's no need to restate the built-ins. They ride with the task's **opening order only** — text you want on every turn belongs in the task settings' [per-stage prompts](/guide/tasks#add-your-own-instructions-per-stage) instead. Each one caps at 4,000 characters, and going over is **refused with an error rather than silently trimmed**: text you typed shouldn't disappear without being told.

## The rules that do not bend

- **No task from a repository item ever merges automatically.** Not a setting you can turn on — a rule. Its prompt embeds text written by arbitrary external users, so landing it unattended would be an injection-to-main-branch pipeline. A folder set to [land reviewed tasks by itself](/guide/tasks#let-a-folder-land-them-for-you) skips these rows entirely. For an **issue**-sourced task your own **Merge** click still works normally; a human just has to make it.
- **A task from a pull request can't be merged locally at all.** Its work belongs on the pull request's own branch, where its author and reviewers are looking — landing it on your base branch would take those changes in behind their backs, under a local commit, with the pull request left open and apparently unmerged. So **Merge** is replaced by **Push to the pull request**, and the refusal lives in the backend rather than only in the button, so an old client or a direct API call meets it too.
- **The identity is pinned at trigger time.** Which account reads the item and pushes the branch is decided when you press Create, and a later default change doesn't move it. Updating that account's **token** keeps the identity intact — [removing and re-adding the account does not](/reference/settings/version-control#github-accounts).

## Good to know

- **Nothing is cached.** The panel reads the forge's REST API directly each time — no local mirror of your issues, and nothing fetched on a background timer. Refresh is a button.
- **It's per folder.** The panel acts on the project folder you've picked, and refuses an item whose repository doesn't match that folder's remote, naming both.
- **The row can be hidden.** If you don't use it, switch **Repository panel** off under the sidebar's [navigation items](/guide/workspace#choose-which-navigation-rows-you-see) — quick actions still reaches it.
- **Self-hosted works.** GitHub Enterprise and self-managed GitLab resolve by their server URL, including on a non-default port or plain `http://`, and links back to the item are built from that same origin.

## Next steps

- [**To-dos**](/guide/tasks) — the board every item lands on, and everything about how a task runs, reviews and merges.
- [**Version Control**](/reference/settings/version-control) — the GitHub and GitLab accounts this panel reads through.
- [**Privacy & Security**](/reference/privacy#text-from-strangers-in-a-prompt) — what happens to text written by someone you've never met.
- [**Git & Worktrees**](/guide/git) — the worktree each task gets, and how to clean up after one.
