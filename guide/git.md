---
title: Git & Worktrees
description: Review diffs, commit and push, branch and merge, resolve conflicts, and run several agents in parallel with git worktrees — all inside the Codeg workspace.
---

# Git & Worktrees

Codeg has a full git client built into the workspace, so reviewing what an agent wrote and landing it are part of the same loop as prompting — no jumping out to a separate git tool. Everything sits in panels you already have open: the **Changes** and **Commits** tabs on the right, and the **branch menu** — the branch chip just below the composer — for everything else. The integrated [terminal](/guide/workspace#the-terminal) is always there for the odd command, but you'll rarely need it.

## Review your changes

Open the **Changes** tab in the right panel to see your working tree at a glance, split into **Tracked changes** and **Untracked files**. Each tracked file shows its git status (`M` modified, `A` added, `D` deleted, `R` renamed…) and a running **`+`/`−`** line count. Click any file to open its diff.

Those diffs are **read-only** — side by side, **HEAD** on the left and your **Working Tree** on the right, with Prev/Next to step through each change. They're for reading what changed, whether you or the agent made it; you decide what to keep when you commit, not by editing the diff.

Right-click a file — or a folder, to act on several at once — for the rest:

- **View Diff** / **Open File** — review the change, or open the real file to edit it.
- **Add to session** — hand the file to the agent as context.
- **Rollback** — discard a file's changes and restore it to the last commit. Destructive, and it asks first.
- **Delete** — for an untracked file, remove it from disk. Also destructive, also confirmed.

There's **no separate staging step** — Codeg doesn't make you `git add` before committing. You just tick the files you want when you commit (below). New files start untracked; **Add to VCS** begins tracking one if you'd like it in git before then.

::: tip Not a repository yet?
If the folder isn't under git, the Changes tab says so — choose **Initialize Git repository** from the branch menu to start one.
:::

## Commit

When you're ready to save work, **Commit code** — from the branch menu, the Changes tab, or a file's menu — opens a dedicated **Commit** window. Tick the files to include (tracked files come pre-selected, untracked ones don't), click any name to preview its diff, write a message, and commit.

The commit button doubles as a menu: **Commit** records the selected files, and **Commit and Push** sends them to your remote in the same step. Codeg stamps each commit with the author identity from your [git account](#git-accounts) for that remote, so your commits are attributed correctly without you setting `user.name` and `user.email` in every project.

## Branch, merge, and rebase

The **branch menu** — the [branch chip below the composer](/guide/workspace#branch-and-run-git) — is your branch switcher and the home for most git operations. It lists your **local** and **remote** branches, folding shared prefixes like `feature/…` into collapsed groups and marking the checked-out one **Current**; pick a branch for its actions — **Switch to this branch**, **merge** it into the current branch, **rebase** the current branch onto it, or **delete** it. **New branch…** creates one from where you are and checks it out. A single search box at the top filters branches *and* operations together, so you can type `stash` or part of a branch name and get straight to it.

There's one chip per conversation, so when you [tile several sessions](/guide/workspace#tile-several-sessions-side-by-side) each one shows and switches its own branch.

Switching uses a plain checkout, so Codeg won't move your uncommitted changes for you — **commit or stash first** if git would refuse. For stashing, **Stash changes** tucks your work away (optionally keeping the index staged), and **Unstash** lists your stashes to **apply** or **drop**.

## Push, pull, and remotes

- **Pull code** fetches and merges your upstream; if the merge conflicts, Codeg opens the conflict tool (below) rather than leaving you at a half-finished merge.
- **Fetch remote branches** refreshes everything from your remotes without touching your working tree.
- **Push** opens a window listing the commits you haven't pushed yet, so you see exactly what's about to go out before it does. In the **Commits** tab, every commit is tagged with its push state: a cloud with a check for **Pushed to remote**, a crossed-out cloud for **Not pushed to remote**, and — once you've filtered to a local branch with no upstream — a question mark for **Push status unknown**.
- **Manage Remotes** lets you add, edit, or remove the remotes a repo points at.

## Read the history — the Commits tab

The **Commits** tab in the right panel is the project's full history, not just a recent page: it's a timeline that keeps loading older commits as you scroll. Each row carries its push state, the commit subject, the author, when it landed, and its short hash.

Two pills at the top narrow what you're looking at, and **Codeg remembers both per project**, so a repo reopens on the view you left it in:

- **Branch** — every branch at once by default. Open it to search and pick one; local and remote branches are grouped, the checked-out one is tagged **Current**, and an ✕ clears the filter.
- **Author** — your own commits are one click away (your git identity is listed first, badged **you**), recent choices are kept for reuse, and typing searches every author in the repo.

**Click a commit to expand it** and you get the full picture without leaving the panel: the complete hash and message (both copyable, with a **Show more** toggle when the message is long), the author and exact timestamp, every file it touched with `+`/`−` counts — click a file for its diff at that commit — and chips for the branches that contain it.

**Right-click a commit** for the actions:

- **View Diff** — the whole commit as one diff, in an editor tab.
- **New branch…** — branch from that commit; Codeg creates it *and* switches you to it.
- **Reset to Here** — move the current branch to that commit, choosing the mode: **`--soft`**, **`--mixed`** *(the default)*, **`--hard`**, or **`--keep`**, each explained in the dialog. It's available only while you're viewing the current branch, and Codeg says so when it isn't.
- **Refresh** and **Push…**

## Sign in to push — git accounts {#git-accounts}

Pushing over HTTPS needs credentials, and Codeg manages them for you as **git accounts** so you're not re-entering a token every push. Add one under **Settings → Version Control**:

- A **GitHub account** — a personal access token, with a link straight to GitHub's token page with the right scopes preselected.
- A **Git account** for GitLab, Bitbucket, or a self-hosted server — server URL, username, and token.

Accounts are matched to a remote by its host, with one marked **Default** to break ties, and the token lives in your OS keyring, never in plain text. Once an account is set:

- **Your pushes and pulls just work** — Codeg supplies the credentials to git automatically.
- **So do the agent's.** When an agent runs its own `git push` in the terminal, it authenticates through the same account — no separate setup.
- **Commits are attributed** to that account's identity.

If a git operation ever hits an auth wall, Codeg prompts inline, validates what you enter, and saves it as an account so it won't ask again. SSH remotes keep using your own SSH keys, so they don't need an account here.

→ [Version Control & Git](/reference/settings/version-control) covers every field in these settings.

## Resolve conflicts

When a merge, rebase, or pull runs into conflicts, Codeg catches it and offers a **Merge Conflicts** prompt: **abort** and back out, or **Open Merge Tool**. The tool is a three-pane editor — **Local (Ours)** on the left, **Remote (Theirs)** on the right, and an editable **Result** in the middle.

Work through each conflict by accepting a side — **Accept Local** or **Accept Remote** on the hunk — or by typing the resolution straight into the Result pane; this is the one diff in Codeg you *can* edit. Header buttons apply a whole side, or every non-conflicting hunk, at once. When a file's clean, **Mark Resolved** and Codeg stages it and moves you to the next. Once every file is resolved, **Complete Merge** finishes the operation — or **Abort** unwinds the whole thing.

## Work in parallel with worktrees

A **git worktree** is a second working copy of the same repository, checked out on its own branch in its own directory. Codeg builds parallel development around them: instead of one agent at a time on one branch, you can have **several agents working at once**, each in its own worktree on its own branch — no stepping on each other's files, no half-finished changes bleeding between tasks.

Create one from the branch menu → **New worktree**. Codeg pre-fills a new branch name and a sibling directory next to your repo (both editable), runs `git worktree add`, and — the good part — **opens a fresh conversation rooted in that worktree**. Start a task there and the agent works entirely inside it.

In the sidebar, a repo's worktrees group under it, so a project's parallel branches stay together. Switching to a branch that lives in a worktree takes you *to* that worktree instead of checking out over your current one. The payoff: [tile a few sessions side by side](/guide/workspace#tile-several-sessions-side-by-side), each in its own worktree, and watch a fleet of agents build different features at the same time — the natural companion to [multi-agent collaboration](/guide/multi-agent).

[Automations](/guide/automations) lean on the same mechanism: each run can execute in its own throwaway worktree, so a scheduled task never collides with your working tree.

::: warning Worktrees are yours to clean up
Codeg creates worktrees but doesn't delete them. Removing a worktree's folder from the workspace closes its tabs but **leaves the worktree and its branch on disk** — tidy up finished ones yourself with `git worktree remove` (and delete the branch if you no longer need it).
:::

## Next steps

- [**The Workspace**](/guide/workspace) — the panels the Changes, Commits, and branch tools live in.
- [**Multi-Agent Collaboration**](/guide/multi-agent) — put those parallel worktrees to work with a team of agents.
- [**Automations**](/guide/automations) — run tasks headlessly, each in its own isolated worktree.
