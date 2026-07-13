# Automations

Turn a fully-configured prompt into a reusable **Automation** that runs on a schedule or on demand — headless, in the background — creating real sessions you can open later.

Open the **Automations** page from the sidebar.

## Create an automation

1. Sidebar → **Automations** → **New** (or pick from the onboarding screen when you have none).
2. Choose a **template** — code-review, dependency-updates, test-coverage, todo-sweep, ci-triage, release-notes, security-audit — or start blank.
3. Fill in the editor and **Save**.

The editor embeds the same composer you use for a new conversation, so the **prompt** supports `@`-mentions (files, agents, sessions, commits, skills), `/` commands, and `$` skills.

## What an automation captures

| Field | Default | Notes |
| ----- | ------- | ----- |
| **Name** | — | Required |
| **Agent** | Claude Code | The agent type to run |
| **Prompt** | — | Required; the composer content replayed at run time |
| **Target folder** | first workspace folder | Required |
| **Isolation** | Worktree per run | **Worktree per run** (fresh git worktree + branch each run) or **Shared in root** (runs in the folder itself) |
| **Branch** | — | For "Shared in root" only |
| **Trigger** | Schedule | Schedule or Manual |
| **Cron** | `0 9 * * 1-5` | 5-field cron; required for scheduled |
| **Timezone** | your device's | Read-only; drives the next-run preview |
| **Agent mode / model / options** | the agent's current values | Probed live from the agent |

## Scheduling

Automations use standard **5-field cron** in your device's timezone. The editor offers quick presets — **Hourly** `0 * * * *`, **Daily** `0 9 * * *`, **Weekdays** `0 9 * * 1-5` — and a visual **Cron Builder** (every-N-minutes / hourly / daily / weekdays / weekly / monthly / custom) with a live "next run" preview. The scheduler checks for due automations about every 30 seconds.

## Run now & isolation

- **Run now** triggers a manual run immediately.
- Two runs of the same automation never overlap — a second trigger while one is running is recorded as **skipped**.
- **Worktree per run** creates a branch/directory named `automation/<id>/run-<n>`.
- **Shared in root** refuses to run if the working tree is dirty — commit or stash first, or switch to a per-run worktree.

## Results

Every run creates a **conversation** in the target folder (or that run's worktree) and surfaces it in the sidebar immediately. The automation's **Run History** lists each run with its status — running / succeeded / failed / cancelled / skipped — and duration, with **View conversation** to open it. History is pruned after 30 days.

::: tip
Pair automations with [Chat Channels](/features/chat-channels) to trigger and monitor headless runs from your phone.
:::
