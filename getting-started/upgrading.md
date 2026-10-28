---
title: Upgrade Codeg
description: What's new in Codeg 0.41.1, OpenCode 2 compatibility, desktop and server updates, and how to back up and restore your data.
---

# Upgrade Codeg

**Codeg 0.41.1**, released on **October 28, 2026**, adds folder-specific tabs and split layouts, HTML previews in replies, MiniMax Code, OpenCode 2 integration, and more flexible model selection and task delivery. This page covers the changes and the steps to update an existing installation. For a first install, see [Download and install](/getting-started/installation).

::: warning Back up before upgrading from 0.40.0 or earlier
This release adds a task-delivery database migration. **0.40.0 and earlier cannot start on the updated data.** The server's **Roll back** button and reinstalling an older desktop app restore the program, but do not undo database migrations. Keep a copy of the complete data directory made **before the new version starts** if you may need to downgrade. Earlier migrations also prevent returning from 0.40.0 to 0.39.0, or from 0.39.0 to 0.38.0, without restoring the corresponding data.
:::

## What's new in 0.41.1 {#whats-new-in-0-41-1}

- **Switch projects with their tabs and layout.** Turn on **View options → Tabs follow folder** in the sidebar to keep each folder's conversations, files and splits together. Drafts, unsaved edits and running conversations stay available when you switch. → [Tabs follow folder](/guide/workspace#tabs-follow-folder)
- **Preview HTML in replies.** Enable **Settings → Appearance → Chat HTML rendering** for static HTML/CSS cards and diagrams alongside Markdown, with **Preview** and **Code** views. → [HTML previews](/guide/conversations#html-previews-in-replies)
- **Use MiniMax Code directly.** Connect your installed `mcode`, reuse its login and provider configuration, and use MCP tools and multi-agent delegation. → [MiniMax Code setup](/guide/agent-setup#minimax-code)
- **Choose models from the provider.** Supported model fields now offer fetch, search, refresh and retry controls. Codex has a unified model-list section with built-in or provider sources and automatic refresh. → [Models from your provider](/guide/authentication#fetch-models-from-your-provider)
- **Deliver any reviewed task as a pull request.** GitHub, GitLab and Gitea/Forgejo delivery also works for tasks without an issue. Keep a task in review to continue working and update the same request. → [Deliver as a pull request](/guide/tasks#deliver-as-a-pull-request)
- **Manage ZCode skills in Settings.** Enable bundled skills, edit your own, or import them through the same skill screens used by other agents. Experts also updates to **Superpowers v7.0.1**, including session diagnostics. → [Skills](/guide/skills)

The activity timeline has clearer command outcomes and a bottom collapse control. Usage filters include custom agents, TRAE CLI totals include native sub-agent consumption, and recorded usage and duration survive reopening more reliably. See the [full 0.41.1 release notes](https://github.com/spacering-net/codeg/releases/tag/v0.41.1).

### Compatibility checks {#compatibility-checks}

- **OpenCode requires 2.0 or later.** Codeg recommends **2.2.0**. Upgrade an existing 1.x installation before opening conversations and use plugins compatible with OpenCode 2. Its new provider, permission and plugin editors preserve JSONC comments. → [OpenCode](/guide/agent-setup#opencode)
- **OpenCode 2 cannot use SSE MCP servers.** Switch a server to **streamable HTTP** (`http`) if it supports that transport, or remove OpenCode from its assignments. → [MCP transports](/guide/mcp#choose-which-agents-get-a-server)
- **macOS standalone server permissions need one new grant.** When updating from an older build, grant Full Disk Access and other required privacy permissions again. The server's new signing setup retains those grants across future updates.

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
| Docker | Stop the old container, back up its persistent data, pull or build the 0.41.1 image, and recreate the container with the same mounts and environment. An in-place update alone is lost when a container is recreated. → [Docker](/getting-started/deployment#docker) |

Since **0.39.0**, Windows also waits for **Restart to update** after downloading. An update **from 0.38.0** still closes the app and installs immediately after the download, because the installed version controls that step.

After the restart, check the version in Settings and reopen a conversation to confirm its history is present. Reload an already-open browser tab if Codeg reports that the client and server versions differ.

## If you need to go back {#if-you-need-to-go-back}

1. Stop the new version and its supervisor or service manager.
2. Preserve its current data directory separately, so work done since the upgrade is not overwritten.
3. Restore the **complete pre-upgrade copy** to the instance's configured data location.
4. Install or select the matching older program or Docker image, then start it against that restored copy.

Work recorded only after the upgrade will not appear in the older snapshot. Without a pre-upgrade copy, keep the new version on the migrated data; switching the binary back to 0.40.0 or earlier will not make that database compatible. Do not edit SQLite migration records to force an older version to start.

## Next steps {#next-steps}

- [**Conversations**](/guide/conversations) — use the activity timeline, inspect edits and answer permission prompts.
- [**Deployment**](/getting-started/deployment#keep-your-server-up-to-date) — server updates, supervision and container persistence.
- [**Data & sync**](/reference/settings/system#backup-restore) — export backups and restore data.
