---
title: Upgrade Codeg
description: What's new in Codeg 0.40.0, how to update desktop and server installations, and how to back up your data before a database migration.
---

# Upgrade Codeg

**Codeg 0.40.0**, released on **October 24, 2026**, brings an activity timeline to conversations. This page covers the changes and the steps to update an existing installation. For a first install, see [Download and install](/getting-started/installation).

::: warning Back up before upgrading to 0.40.0
The first start of 0.40.0 updates Codeg's database. **0.39.0 cannot start on that updated data.** The server's **Roll back** button and reinstalling an older desktop app restore the program, but do not undo that database migration. Keep a copy of the data directory made **before the new version starts** if you may need to return to 0.39.0. The same restriction applies when returning from 0.39.0 to 0.38.0.
:::

## What's new in 0.40.0 {#whats-new-in-0-40-0}

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
| Docker | Stop the old container, back up its persistent data, pull or build the 0.40.0 image, and recreate the container with the same mounts and environment. An in-place update alone is lost when a container is recreated. → [Docker](/getting-started/deployment#docker) |

Since **0.39.0**, Windows also waits for **Restart to update** after downloading. An update **from 0.38.0** still closes the app and installs immediately after the download, because the installed version controls that step.

After the restart, check the version in Settings and reopen a conversation to confirm its history is present. Reload an already-open browser tab if Codeg reports that the client and server versions differ.

## If you need to go back {#if-you-need-to-go-back}

1. Stop the new version and its supervisor or service manager.
2. Preserve its current data directory separately, so work done since the upgrade is not overwritten.
3. Restore the **complete pre-upgrade copy** to the instance's configured data location.
4. Install or select the matching older program or Docker image, then start it against that restored copy.

Work recorded only after the upgrade will not appear in the older snapshot. Without a pre-upgrade copy, keep 0.40.0 on the migrated data; switching the binary back to 0.39.0 will not make that database compatible. Do not edit SQLite migration records to force an older version to start.

## Next steps {#next-steps}

- [**Conversations**](/guide/conversations) — use the activity timeline, inspect edits and answer permission prompts.
- [**Deployment**](/getting-started/deployment#keep-your-server-up-to-date) — server updates, supervision and container persistence.
- [**Data & sync**](/reference/settings/system#backup-restore) — export backups and restore data.
