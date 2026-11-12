---
title: Upgrade Codeg
description: What's new in Codeg 0.43.0 and the releases since 0.41.1, compatibility notes, desktop and server updates, and how to back up and restore your data.
---

# Upgrade Codeg

**Codeg 0.43.0**, released on **November 12, 2026**, lets you move conversations between folders, counts background work above the composer, puts the Web Service in the status bar, shows CI status on pull requests, and lets the agent draft the comment that goes back to an issue. It follows seven smaller releases since 0.41.1, which added CNB support, system instructions, several issues per task, and native mid-turn steering for Codex. This page covers the changes and the steps to update an existing installation. For a first install, see [Download and install](/getting-started/installation).

::: warning Back up before upgrading from 0.42.3 or earlier
This release adds a to-do database migration, and **0.42.1** added another. **0.42.3 and earlier cannot start on data opened by 0.43.0**, and **0.42.0 and earlier cannot start on data opened by 0.42.1 or later**. The server's **Roll back** button and reinstalling an older desktop app restore the program, but do not undo database migrations. Keep a copy of the complete data directory made **before the new version starts** if you may need to downgrade. Earlier migrations also prevent returning from 0.41.1 to 0.40.0, from 0.40.0 to 0.39.0, or from 0.39.0 to 0.38.0, without restoring the corresponding data.
:::

## What's new in 0.43.0 {#whats-new-in-0-43-0}

- **Move conversations between folders.** Right-click a conversation and choose **Move to**, or move several from **Manage conversations**. History, tags and open tabs come along; a conversation that belongs to a to-do, or that an agent is busy with, stays put. → [Move a conversation](/guide/workspace#move-a-conversation-to-another-folder)
- **See what's still running.** The row above the composer counts background tasks, sub-agents and delegations, including work that outlives the reply; click it to open, follow or stop them. It replaces the strip above the transcript. → [Background work](/guide/conversations#activity-timeline)
- **A redesigned Session Details.** The running message comes first in Message navigation, with a live clock, and each message's sub-agents and changed files are grouped with their own diffs. *Extension ID* is now **Session Index**. → [Session details](/guide/side-panel#session-details)
- **Start and stop the desktop app's Web Service from the status bar**, and choose **This computer only** to keep it off your network, behind a reverse proxy or Tailscale Serve. → [Web Service](/reference/settings/web-service#listen-on)
- **CI status on pull requests.** Rows show whether checks passed, with counts on GitHub and Gitea, and a GitHub pull request from a fork can have its held workflows approved in the panel. → [CI at a glance](/guide/repository#ci-at-a-glance)
- **The agent drafts the reply to the issue.** With commenting on, the comment posted back can include a reply the agent drafted, which you review and edit when you accept the task, plus an optional Codeg footer. → [The comment that goes back](/guide/repository#the-comment-that-goes-back)
- **Agents attach files to the to-dos they create**, such as screenshots and logs. → [Let an agent write one](/guide/automations#let-an-agent-write-one)

Codex's sub-agent steps open as timeline rows with a link to the child conversation, Codex MCP screenshots preview in chat, and question cards show full question text and option descriptions. File search keeps open projects' results current with less memory, and long sessions retain less memory overall. See the [full 0.43.0 release notes](https://github.com/spacering-net/codeg/releases/tag/v0.43.0).

### Coming from 0.41.1 {#coming-from-0-41-1}

- **CNB joins the forges** (0.42.0): issues, merge requests, auto-processing on a schedule, and delivery as a merge request, through a new **CNB accounts** card. → [Repository Panel](/guide/repository)
- **Handle several issues as one task** (0.42.1), delivered as one pull request that closes the issues you choose. → [Several issues](/guide/repository#handle-several-issues-as-one-task)
- **Edit an agent's global instructions** in its settings pane (0.42.0) — `CLAUDE.md`, `AGENTS.md` and their equivalents, for sixteen agents. → [System instructions](/guide/agents#system-instructions)
- **Respond to a waiting task** (0.42.0): a task waiting for a permission, an answer or a plan approval leads with **Respond**, and carries on once you've answered. → [When a task needs you](/guide/tasks#when-a-task-needs-you)
- **Codex takes mid-turn messages and suggests the next prompt** (0.41.3), as Claude Code does. → [Talk to an agent mid-turn](/guide/conversations#talk-to-an-agent-mid-turn)
- **Quieter notifications** (0.42.0): **Top-level sessions only** keeps delegated sub-sessions' completions and errors out of chat channels and webhooks, and webhook payloads name the conversation and agent. → [Chat Channels](/guide/chat-channels#approve-and-follow-along)
- **Background work survives closing a tab** (0.42.1): closing or switching panes, or refreshing the web page, no longer stops background commands, Remote Control or running sub-agents.

Also: Claude Code's thinking-summary switch and Fable 5.2, inline `$…$` math, pasting copied files by path on the desktop, ZCode's Coding Plan API keys and `/rename`, OpenCode's percentage compaction reserve, workspace backgrounds up to 64 MB, and PowerShell terminals that load your profile. See the release notes for [0.41.2](https://github.com/spacering-net/codeg/releases/tag/v0.41.2) through [0.42.3](https://github.com/spacering-net/codeg/releases/tag/v0.42.3).

### Compatibility checks {#compatibility-checks}

- **Claude Code starts new sessions in Auto** since 0.42.1, unless you've picked another mode or set `permissions.defaultMode`. Behind an API gateway that can't answer Auto's checks, the commands Auto would review are refused without a permission card; switch to **Manual**. Command-line reviews that shouldn't edit files need `--mode default`. → [Claude Code](/guide/agent-setup#claude-code)
- **OpenCode requires 2.0 or later**; Codeg recommends **2.2.7**. OpenCode 2 cannot use **SSE** MCP servers — switch a server to streamable HTTP or leave OpenCode out of its assignments. Its `/goal`, `/init` and `/review` commands still show no progress. → [OpenCode](/guide/agent-setup#opencode)
- **Hermes 0.23** can't connect the MCP servers in its own `config.yaml` while Codeg's are attached, and on some systems disconnecting one Hermes conversation can interrupt the others. → [Hermes](/guide/agent-setup#hermes)
- **ZCode 3.18 and later** store encrypted credentials, which only the bridge Codeg pins in 0.43.0 can read; on an older bridge every turn fails. → [ZCode](/guide/agent-setup#zcode)

### Coming from 0.40 or earlier {#whats-new-in-0-41-1}

The [0.41.1 release](https://github.com/spacering-net/codeg/releases/tag/v0.41.1) added [Tabs follow folder](/guide/workspace#tabs-follow-folder), [HTML previews in replies](/guide/conversations#html-previews-in-replies), [MiniMax Code](/guide/agent-setup#minimax-code), [models fetched from your provider](/guide/authentication#fetch-models-from-your-provider), delivery of [any reviewed task as a pull request](/guide/tasks#deliver-as-a-pull-request), and ZCode skills in Settings. It also moved OpenCode to 2.0, and a **macOS standalone server** updating from an older build needs Full Disk Access and other privacy permissions granted again once.

### Coming from 0.39 or earlier {#whats-new-in-0-40-0}

- **Follow the agent's work on one timeline.** Thoughts, commands, file lookups, edits, plans and sub-agent tasks appear as steps. The **Activity** header shows the step count, elapsed time and failures; click it to fold the intermediate work, or click an unresolved failure to jump to its step. → [Activity timeline](/guide/conversations#activity-timeline)
- **Review commands and edits in place.** Command details show the complete command or script and its output, with separate copy buttons. File edits offer inline and side-by-side comparison, synchronized horizontal scrolling, and a file header that opens the file in the workspace.
- **Keep permission decisions with the conversation.** Tool rows retain **approved once**, **always allowed** or **declined** after you reopen the session. These records describe earlier decisions; the agent's permission settings still govern later calls.
- **Keep track of sub-agents.** Task rows show the assignment, completed steps, current work and latest result. Running tasks remain visible when the parent reply is folded. → [Watch the team work](/guide/multi-agent#watch-the-team-work)

Long conversations and streaming replies also scroll more smoothly. Expanded thoughts keep their line breaks and lists, command exit codes are read more reliably, and Codex shows context compaction while it is running. See the [full 0.40.0 release notes](https://github.com/spacering-net/codeg/releases/tag/v0.40.0).

### Coming from 0.38 or earlier {#coming-from-0-38-or-earlier}

The [0.39.0 release](https://github.com/spacering-net/codeg/releases/tag/v0.39.0) also added [agent-written commit messages](/guide/git#generate-a-commit-message), saved commands that [run on your own computer from a remote folder](/guide/workspace#run-a-saved-command), and optional [proxy sign-in](/getting-started/configuration#sign-in-through-an-identity-aware-proxy) for `codeg-server`. The sidebar's **Recent** section now sorts by last activity, ten conversations at a time.

## Before you update {#before-you-update}

1. **Finish active work.** Let agent turns, CLI runs, automations and to-do tasks reach a stopping point. Restarting Codeg ends its running agents and terminals.
2. **Find the data directory of the instance you are updating.** Use `CODEG_DATA_DIR` if you set it; otherwise use the defaults below. On Docker, back up the host directory or named volume mounted at `/data`. For a remote workspace, back up the server's data on that server.
3. **Stop Codeg before copying its data.** Quit the desktop app fully, or stop the server/container and its supervisor or service manager. Copy the **whole data directory** to a separate location, retaining `codeg.db` and all the files beside it. Keep the copy outside the live directory and container. Copying only an open SQLite database can miss recent writes.
4. **Keep project files and agent history separately.** The data directory does not contain your repositories or every agent CLI's own transcript store. If you need those too, back them up separately. You can also export a [`.codegbak` archive](/reference/settings/system#backup) before stopping Codeg, with **Include conversation content** enabled when needed; for a version downgrade, retain the stopped data-directory copy as well.

| Platform | Desktop app | Standalone server |
| --- | --- | --- |
| macOS | `~/Library/Application Support/app.codeg` | `~/Library/Application Support/codeg` |
| Linux | `~/.local/share/app.codeg` | `~/.local/share/codeg` |
| Windows | `%APPDATA%\app.codeg` | `%APPDATA%\codeg` |

These are the default platform paths; custom OS data locations and `CODEG_DATA_DIR` take precedence. `~/.codeg/preferences.json` is a desktop preferences file, **not** the main database. A backup can contain credentials, so store it privately. → [Data locations](/getting-started/configuration#where-codeg-stores-its-data)

## Update your installation {#update-your-installation}

| Installation | How to update |
| --- | --- |
| Desktop app | Open **Settings → System → Software Update**, download the update, then choose **Restart to update**. You can also install the matching package from [Downloads](/getting-started/installation). |
| Standalone server on Linux/macOS | With your backup ready, start your existing server and use **Settings → Software Update**, or replace the installation with the matching [server archive](/getting-started/deployment#prebuilt-binaries). Keep the same data directory and environment settings. |
| Standalone server on Windows | Stop the server, replace the binaries and bundled web files from the Windows server archive, then start it with the same data directory and environment settings. In-place self-update is unavailable on Windows. |
| Docker | Stop the old container, back up its persistent data, pull or build the 0.43.0 image, and recreate the container with the same mounts and environment. An in-place update alone is lost when a container is recreated. → [Docker](/getting-started/deployment#docker) |

Since **0.39.0**, Windows also waits for **Restart to update** after downloading. An update **from 0.38.0** still closes the app and installs immediately after the download, because the installed version controls that step.

After the restart, check the version in Settings and reopen a conversation to confirm its history is present. Reload an already-open browser tab if Codeg reports that the client and server versions differ.

## If you need to go back {#if-you-need-to-go-back}

1. Stop the new version and its supervisor or service manager.
2. Preserve its current data directory separately, so work done since the upgrade is not overwritten.
3. Restore the **complete pre-upgrade copy** to the instance's configured data location.
4. Install or select the matching older program or Docker image, then start it against that restored copy.

Work recorded only after the upgrade will not appear in the older snapshot. Without a pre-upgrade copy, keep the new version on the migrated data; switching the binary back to an earlier version will not make that database compatible. Do not edit SQLite migration records to force an older version to start.

## Next steps {#next-steps}

- [**Conversations**](/guide/conversations) — use the activity timeline, inspect edits and answer permission prompts.
- [**Deployment**](/getting-started/deployment#keep-your-server-up-to-date) — server updates, supervision and container persistence.
- [**Data & sync**](/reference/settings/system#backup-restore) — export backups and restore data.
