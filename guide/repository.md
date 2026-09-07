---
title: Repository Panel
description: Hand a GitHub, GitLab or Gitea issue or pull request straight to an agent — it works in its own worktree, you review the result on the board, and the outcome goes back to the thread it came from.
---

# Repository Panel

Most agent work starts with someone reading an issue and retyping it into a prompt. The **Repository panel** removes that step: it lists a folder's **GitHub, GitLab or Gitea** issues and pull requests inside Codeg, and hands the one you pick to an agent as a [to-do task](/guide/tasks) — its own worktree, its own session, and the same review gate before anything lands.

It shipped in **0.27.0** behind a **Beta** mark, which came off in **0.30.0** once the panel could do the whole loop: read a change through tabs, comment on it, open and close issues, and merge — without a browser. **Gitea** joined in **0.30.4**, and with it **Forgejo**: Forgejo is a fork of Gitea serving the same `/api/v1`, so the client that talks to one talks to the other and there's no separate setting for it.

::: tip Where it fits
The panel is a *front door* to To-dos, not a parallel system. Everything it creates is an ordinary task on the ordinary board, with one extra fact recorded: which item it came from. That provenance is what unlocks the delivery step at the end — and what makes the [auto-merge rule](#the-rules-that-do-not-bend) different.
:::

## Open it

**Repository panel** sits in the left sidebar beneath To-dos, and in the status bar's [quick actions](/guide/workspace#the-layout) under *Navigation*. Like Automations and To-dos it takes over the main area, with a **back arrow** in the top-right corner to return to your conversations.

Two buttons join the window's top-right cluster while it's open: **Refresh**, which reloads the whole list rather than narrowing it, and **Panel settings**. Refresh greys out until a repository is actually loaded; settings never does, since there's always a global row to change.

## Before you start, an account

The panel reads through the same credentials git does, under [**Settings → Version Control**](/reference/settings/version-control). Pick a project folder and Codeg looks at its `origin` remote:

- **A host that is none of the three** — say a Gitee or Bitbucket remote. The panel says **only GitHub, GitLab and Gitea are supported** and names the host, rather than falling back to GitHub and reporting whatever the wrong API answered, which used to come out as "no GitHub account for gitee.com" or a raw API failure. **Add an account** is still offered, because that's the other way in for a self-hosted instance.
- **A remote, but no account for that host** — the empty state names the provider and the host and offers **Add an account**, which takes you straight to the settings screen.

Reaching that verdict costs a probe rather than a guess. A host Codeg doesn't recognise by name is **asked what it is**, cheapest question first:

1. **Gitea**, at `GET {origin}/api/v1/version`. It goes first because it's the only question here needing no credential *and* answering in its body — every Gitea serves that endpoint publicly and replies with a version object. A blanket gateway returning 200 to everything doesn't produce that shape, so ruling one out costs nothing extra. Neither GitHub Enterprise (`/api/v3`) nor GitLab (`/api/v4`) mounts `/api/v1` at all.
2. **GitLab**, at `GET {origin}/api/v4/version` — which GitLab answers 200 with a token and 401 without, while GitHub Enterprise 404s. Neither answer decides anything on its own, because an authenticating gateway in front of a GitHub Enterprise can produce either one for every request. So a JSON 200 or 401 is only a *candidate*, and Codeg confirms it against a path nothing routes: real GitLab 404s there, a blanket gateway answers the same as before, and Codeg declines to conclude rather than breaking a setup that works.

What gets remembered is a **conclusive** answer, for the rest of the session. A host that's unreachable, or whose server returns a transient error, leaves the question open and is asked again next time — so a Gitea that happened to be restarting doesn't get written off until Codeg has actually heard from it. (A transient answer from the Gitea probe doesn't stop the GitLab one: if that resolves conclusively, that verdict stands.)

Which forge you're talking to is **derived from the remote on Codeg's side**, never claimed by the client — because that choice is what picks the credentials. A GitLab token is never spent on a GitHub call, and a GitHub Enterprise host on its own domain resolves by its URL rather than by its name.

GitLab has its own accounts panel since **0.27.0** and Gitea since **0.30.4**; a GitLab token needs the **api** scope, a Gitea one **write:repository**, **write:issue** and **read:user**. → [Version Control](/reference/settings/version-control#gitea-accounts)

## Find the item

The list is a triage surface, not a browser bookmark. Across the top:

- **Issues** and **Pull requests** — or **Merge requests**, because a GitLab user doesn't have pull requests and being told they do reads like the wrong tool answered. Each tab shows a count for the state you're filtered to, and which one you were on is **remembered across sessions**, next to the page size and for the same reason: it says which list you work in.
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

The thread is fetched **when you open the panel**, not with the list: folding it into the list would spend a request per row to draw a page whose reader opens at most one of them. On GitLab, the housekeeping events — *changed the milestone*, *assigned to* — are filtered out, so what you read is the conversation and matches the comment count on the row. A thread with hundreds of comments opens quickly because only what's on screen is drawn, the rest arriving as you scroll.

A row whose item already has a task shows that instead of **Start** — a status chip that takes you to the board, plus a small **re-trigger** link where starting another run makes sense.

### A change opens as three tabs

An issue is one scroll, because a one-tab bar says nothing. A **pull or merge request** is three, with the branch pair kept in the header where it stays readable from all of them:

- **Conversation** — the description and the thread, same as an issue.
- **Checks** — CI, with the **worst state as a glyph on the tab** so a red build is visible without opening it. Three answers are kept apart rather than blurred: green, *nothing configured*, and *this account can't look* — and on GitHub a fourth, half-readable, because check runs and commit statuses sit behind two different permissions.
- **Files changed** — the file list, each row opening onto its own diff, with the **count on the tab** where the forge gives an exact one (GitLab reports a truncated `1000+` on very large changes, and a count that isn't a number isn't shown).

Opening a file's diff **costs no extra request**: both forges already ship the hunks with the file page and Codeg was throwing them away. A row with nothing to open isn't clickable. On GitHub it says which of two reasons applies — binary content, or a diff withheld for being too large while its lines were still counted. On GitLab an empty diff is reported as binary either way, so read that as *no diff available* rather than as a statement about the file.

### Act on it without leaving

Reading was the whole story until **0.29.0**. The panel now writes as well:

- **Comment.** A composer under the thread, posting as the account that reads the panel.
- **Close or reopen.** One button, which **confirms first** — unlike the composer it writes to somebody else's repository on a single click with nothing typed.
- **File a new issue.** Title and body. It opens straight away, and drops into the list without a manual refresh **when the list you're looking at could contain it** — the Issues tab, first page, sorted newest or recently-updated, no search term, not *Assigned to me*, not closed-only, and carrying every label you've filtered to. Anywhere else it opens in the detail panel and the list is left alone, rather than showing you a row that doesn't belong on the page you're on.

Both writes **take the forge's answer as the truth rather than assuming their own worked**. A posted comment comes back carrying the id the thread de-duplicates on, the author your token actually resolved to, and its permalink. A state change comes back as the row the forge now serves — which is how a pull request somebody merged in the browser a minute ago lands as **merged** instead of the *closed* you asked for.

### Merge it from here

An open change can be merged without a browser. The merge box sits between the discussion and the composer and shows what you need to decide: **whether the branches conflict**, and **what CI says** — that last only when there's an actual verdict to report, so a repository with no checks configured, or one this account can't read, simply shows nothing there rather than a reassuring green.

The button is a split button, and its menu is **the repository's own settings** — merge commit, squash, rebase, each offered only where that repository allows it. A repo that has squash-only turned on shows you squash only, rather than an option that would fail on submit. If those settings can't be read, Codeg falls back to offering a plain merge, which the forge may still refuse.

::: tip This is not the same as merging a task
The **Merge** you press on a [to-do](/guide/tasks#merge-it) lands an agent's branch in *your* checkout, and may need an agent to resolve conflicts. This one merges a pull request **on the forge**, the way the web UI would. Different button, different place, different meaning — a task sourced from a pull request still can't be merged locally at all. → [The rules that do not bend](#the-rules-that-do-not-bend)
:::

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
- **Push to the pull request** — for a task that came *from* a pull request. It pushes the commits onto that same head branch, forks included. **Nothing new is opened**; the review that's already there receives the work. When that push fails, **git's own reason** is what you get: until **0.30.4** every failure came back as *"pushing to a fork needs its author to allow edits from maintainers"*, which sent people looking at repository permissions when git had actually said the branch was out of date.

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
- **Self-hosted works.** GitHub Enterprise, self-managed GitLab, and a Gitea or Forgejo instance all resolve by their server URL, including on a non-default port or plain `http://`, and links back to the item are built from that same origin. Asking the instance what it is, rather than guessing from its hostname, arrived for **GitLab in 0.30.0** — which is what used to fail as a bare `410` — and the **Gitea and Forgejo** question was added in **0.30.4**.
- **A host you configured is always attempted, whatever it's called.** A provider-less account is ambiguous by construction — the plain-git credential dialog writes the same bytes a legacy GitHub Enterprise account does — so Codeg tries rather than refusing a panel that would have worked.

## Next steps

- [**To-dos**](/guide/tasks) — the board every item lands on, and everything about how a task runs, reviews and merges.
- [**Version Control**](/reference/settings/version-control) — the GitHub, GitLab and Gitea accounts this panel reads through.
- [**Privacy & Security**](/reference/privacy#text-from-strangers-in-a-prompt) — what happens to text written by someone you've never met.
- [**Git & Worktrees**](/guide/git) — the worktree each task gets, and how to clean up after one.
