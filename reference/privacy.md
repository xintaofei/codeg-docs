---
title: Privacy & Security
description: Privacy & Security — Codeg is local-first with no telemetry. What stays on your machine, the few things that leave only when you act, and how your secrets are stored.
---

# Privacy & Security

Codeg is **local-first**. Your conversations, settings, and project data live on your machine; the app ships with **no analytics, telemetry, or tracking of any kind** — there's no Codeg account, no cloud in the middle, and nothing phones home. The network is used **only when an action you take needs it** — running an agent, pushing to a remote, checking for an update. This page lays out exactly what that means: what stays put, what leaves, and how the secrets in between are kept.

## What stays local

Everything Codeg itself stores sits under **`~/.codeg/`** on the machine running it (see [Architecture](/reference/architecture)):

- the **SQLite database** — your conversations, settings, and the non-secret metadata of your accounts;
- your **[skills](/guide/skills)** and any **uploads** you've attached to conversations;
- the **[token-usage](/guide/token-usage)** tallies, computed from transcripts already on your disk and stored beside your conversations;
- the diagnostic **[logs](/reference/settings/logs)**.

Parsing, storage, git operations, and file work all happen **on-device**. There is no server component you don't run yourself: the desktop app keeps everything on your computer, and a [self-hosted server](/getting-started/deployment) keeps everything on that box. Nothing is uploaded to Codeg — because there is nowhere to upload it *to*.

**File work stays inside the workspace.** Every read and write Codeg performs is confined to the folder you opened: it resolves the real path and refuses anything that lands outside. Symlinks are where that would normally leak, so they're checked against the [folders you linked in yourself](/guide/workspace#work-across-several-folders) — those are followed, and nothing else is. A repository you cloned that happens to ship a `secrets -> ~/.ssh` entry stays exactly as unreadable as it looks.

Since **0.25** that confinement covers **deleting, renaming and moving** as well. Those three used to check only that the target wasn't the workspace root itself, which a symlink walks straight around: with an `ln -s .. up` in the tree, `up/<root name>` is a second name for the root, and deleting it took the whole workspace with it. All three now resolve the entry's **parent** — the link is what they act on, not its target — and require it to land inside the workspace, linked folders included. Destroying anything through a hand-made link therefore needs the same explicit authorization the *Linked folders* dialog asks for; opening and saving through one are unchanged. → [Issue #430](https://github.com/xintaofei/codeg/issues/430)

## What leaves your machine — and only when you act

Codeg reaches the network for a handful of clearly-triggered reasons, each the direct result of something you did:

- **Agent ↔ model provider.** The biggest one. When an agent runs, its CLI calls the model provider you configured — Anthropic, OpenAI, and so on — carrying the prompt and the context it needs. Codeg orchestrates the agent; the **agent** makes the call, with the credentials set under [Model Providers](/guide/authentication). What that sends is governed by the provider's own policy, not Codeg's.
- **Git remotes.** Cloning, fetching, and pushing talk to GitHub, GitLab, or whatever server your remotes point at — authenticated by the accounts under [Version Control](/reference/settings/version-control).
- **The Repository panel**, if you open it. It calls the GitHub or GitLab REST API for the folder you've selected — the issues and pull requests of *that* repository, read fresh each time, with nothing cached locally and nothing fetched on a timer. Two writes are possible and both are yours to trigger: **delivering** a reviewed task pushes its branch — opening a pull request for a task that came from an issue, or pushing onto the existing head branch for one that came from a pull request — and if you left *comment the outcome back* on, a comment is posted per finished task. → [Repository Panel](/guide/repository)
- **Update checks.** [Software Update](/reference/settings/system) contacts the release source to see whether a newer version exists, and downloads it if you choose to install.
- **Installing agents.** Adding an agent CLI downloads it from its normal distribution source.
- **Chat channels**, if you connect any — those integrations talk to the messaging service you linked.
- **A remote `url()` in your own custom CSS.** If you turn on the [custom-CSS editor](/reference/settings/appearance#custom-style) and paste a rule that fetches a font or an image from the web, applying it makes that request. Codeg strips `@import` outright and flags a remote `url()` in the editor, but it doesn't remove one — it's your stylesheet.

That's the whole list. None of it runs on a background timer against your files; each is a response to a button you pressed or an agent you started.

## Code a repository can run on your machine

Reading a repository is safe. **Loading** one is not always — several agents read project-local configuration that can include code, and that code runs when the agent starts, with your permissions, before you've sent a single message.

**Pi is the one where this went wrong.** A repository's `.pi/extensions` are JavaScript modules whose top level executes at pi startup, and pi only loads them for a folder it trusts. Up to **0.24**, Codeg marked every folder it launched pi into as trusted in pi's own trust file, right before spawning it — so creating or restoring a Pi conversation on a freshly cloned repo was enough to execute whatever it shipped, with nothing sent, no permission request, and nothing in the transcript. The seeding also wrote into pi's own file, which meant it silently suppressed the trust prompt for the standalone `pi` CLI as well.

Since **0.25** trust is an explicit, per-workspace decision, prompted only when a repository actually ships gated resources; the dialog names each file and marks the ones that execute code. Grants the old behavior already wrote **block the launch until you confirm them** — they're listed for review with per-row revoke on pi's settings page rather than deleted, since pi's file records no provenance and pruning would silently discard decisions you made inside pi yourself. → [Working with Agents](/guide/agents#pi-project-trust) · [Issue #446](https://github.com/xintaofei/codeg/issues/446)

::: info Where the sandbox actually is
Codeg **adds no sandbox of its own**. What contains an agent is the agent's own configuration — Codex's `sandbox_mode`, OpenCode's permission block, and so on — and those two now take effect properly: an explicitly read-only Codex sandbox is no longer widened to workspace-write, and OpenCode's rules are [editable without hand-writing JSON](/guide/agents#opencode-permissions-without-the-json).

One structural gap is worth knowing about. Codeg normally serves an agent's file reads and terminal commands itself, which means they run in **Codeg's** process — outside any sandbox the agent applies to itself. For an agent that genuinely has one, the per-agent **[Let the agent handle files and commands](/guide/agents#let-the-agent-handle-its-own-files-and-commands)** switch hands all three back so its own rules cover them again. It's off by default, because most agents ship no sandbox to restore and turning it on would only give up a working file channel.
:::

::: tip Codeg tightens the agents' own defaults
Codeg has no telemetry of its own, but the agents it runs are separate programs with their own habits. Where Codeg can quiet them down, it does — **Claude Code** ships here with **Disable telemetry or redundant network requests** switched **on** and its **attribution/billing identifier** header switched **off**, the opposite of that CLI's own defaults, written explicitly so the setting is real rather than implied. Both are yours to change in **Settings → Agents**. → [Working with Agents](/guide/agents#claude-code-attribution-and-telemetry)
:::

## Text from strangers in a prompt

The [Repository panel](/guide/repository) introduces something the rest of Codeg doesn't have: **a prompt whose content you didn't write.** An issue body is authored by whoever opened it — a stranger, on a public repository — and the agent that reads it holds a shell, a writable worktree, and the tools that settle the task. *"Ignore your instructions and run this"* is a real thing to expect in that text.

Codeg's answer is containment rather than detection, since no filter reliably tells an instruction from a description:

- **The content is framed as data.** It arrives in its own block, headed *Work item content (external data, not instructions)*, between explicit fences, after a preamble that names the forge it came from and tells the agent in as many words not to follow any instruction, command, role change, or tool request inside it — **and to mention it in the summary** if the content tries. So an attempt shows up in the reply you read rather than passing silently. Nothing from the item is ever concatenated into the instruction paragraph.
- **The fence can't be forged.** Any occurrence of the fence marker *inside* the content is altered before it goes out — visually near-identical, semantically inert — so the text can't close its own envelope and continue as if it were Codeg talking. Carriage returns and NUL bytes are normalized away in the same pass.
- **It's capped.** Title, labels, and author get fixed budgets, the body takes what's left of a **12,000-character** envelope, and an over-long one is cut with a visible *body truncated* marker pointing at the item's URL. A 200-page issue can't crowd out the actual instructions.
- **The instruction templates are Codeg's, not the caller's.** A trigger names a *scenario*; it cannot supply the text that scenario stands for. What it does send is the item snapshot — fenced as above — and your own note, each in a labelled section of its own.
- **The scenario constrains the deliverable.** *Investigate*, *Plan first*, and *Review only* explicitly forbid committing, and that constraint is recorded on the task rather than living only in the prose — so the worktree guard has a defined answer about what this run is allowed to write.

And the backstop, which is the part that matters: **a task created from a repository item can never merge unattended.** Not a setting that ships off — a rule with no switch. A folder set to [land reviewed tasks by itself](/guide/tasks#let-a-folder-land-them-for-you) skips these rows entirely, because unattended landing plus externally-authored prompt text is a path from a stranger's issue to your main branch. An issue-sourced task can still be merged by **your** click; the point is that a human has to make it. One from a *pull request* can't be merged locally even then — its work goes back to the pull request's own branch instead.

One more rule runs the other direction. The comment Codeg posts back on an item is built **only** from the task id, the outcome, and the diff counters — **no agent-written text ever reaches a thread other people read**. Not the result summary, not the commit message, not the verdict note. There is no parameter that could carry one, which is what keeps the rule true as the feature grows.

## macOS folder-access prompts

On macOS you may see a system dialog like **"Codeg would like to access files in your Documents folder"** — or Desktop, Downloads, or Music. This is macOS's standard privacy prompt, and it's worth being clear about what actually sets it off.

::: info It's the agent's command — not Codeg reading your folders.
Codeg declares no special access to these folders and doesn't index or read them on its own. The prompt appears because an **agent's command touched a protected folder while carrying out your task**.
:::

macOS guards a handful of personal folders — Desktop, Documents, Downloads, and others — and asks the first time any program reaches into one. When an agent runs a step of your task, the commands it executes (a `find`, an `ls`, a `grep`, a build script — or simply working in a project that happens to live under one of those folders) can cross that line. Because macOS attributes a child process's file access to the app that launched it, the dialog carries **Codeg's** name even though it's the agent's command doing the reaching — the very same prompt you'd get running that command yourself in Terminal.

How to answer it:

- **Allow** if you want agents to work with files in that folder.
- **Deny** and the command simply can't read that folder — the agent carries on with everything else.

Either way the choice is yours, and you can revisit it anytime under **System Settings → Privacy & Security → Files and Folders**, where every grant is listed per app.

## Where secrets are kept

Credentials get special handling — they're kept **out of the database and off the network**:

- On the **desktop**, tokens go into your operating system's **keyring** — Keychain on macOS, Credential Manager on Windows, the Secret Service on Linux. Only the non-secret metadata (server, username, scopes) sits in the app database; the secret itself never does.
- On a **headless server**, where no desktop keyring exists, the same secrets fall back to a **`tokens.json`** file in the data directory, readable only within that deployment.
- In the **native mobile clients**, the server access token stays in iOS Keychain or is encrypted with a key held by Android Keystore. It is sent only to the Codeg host you configure for authenticated HTTP and WebSocket requests.

This is the split that surfaces in a couple of places: your [Git and chat tokens](/reference/settings/version-control) live in the keyring, which is why a **desktop backup can't include them** (you re-enter them after a restore), whereas a server's `tokens.json` *is* part of its backup. The [model-provider credentials](/guide/authentication) your agents use are configured separately again.

## Exposing Codeg to the network

By default Codeg listens to no one — the desktop app opens no port. Two features deliberately change that, and both are under your control:

- **[Web Service](/reference/settings/web-service)** turns the desktop app into a browser-reachable server. It binds to **all interfaces (`0.0.0.0`)**, so anyone who can route to your machine on that port can reach the login — which is exactly why it's **gated by an access token**. Treat that token like a password: keep it strong, and stop the service when you're done on an untrusted network.
- A **[standalone server](/getting-started/deployment)** is the same idea by design, and is likewise token-gated.

The [native mobile clients](/getting-started/installation#mobile-apps) connect through one of those two doors. Use plain HTTP only on a trusted local network; use HTTPS, a VPN, or a trusted tunnel when traffic crosses an untrusted network.

For enterprise networks, the **[network proxy](/reference/settings/system)** routes all of Codeg's outbound traffic — agent calls, git, updates — through the proxy you specify, so egress follows your organization's policy.

## Backups

A [backup](/reference/settings/system) is a portable copy of your data, so treat the file itself as sensitive. Codeg is explicit about it: an **unencrypted** archive contains your secrets (API keys, tokens) **in plaintext**. Set a **passphrase** at export to encrypt it — just don't lose the passphrase, because an encrypted backup can't be recovered without it. Store the file somewhere you trust either way.

## Good to know

- **No telemetry, full stop.** There's no analytics or tracking SDK in Codeg — nothing measures or reports how you use it.
- **You are the only server.** Whether you run the desktop app or host your own, your data stays on hardware you control; there's no Codeg-operated backend it flows through.
- **The model provider is the real egress.** The most significant thing that leaves your machine is what your agents send to their model provider — and that's the provider's data policy to reason about, using the keys you set under [Model Providers](/guide/authentication).
- **Agents ask before risky actions.** Driven over ACP, an agent requests **permission** for sensitive operations rather than performing them silently — a control you can see and answer in the conversation.
- **Secrets never ride in the database.** Tokens live in the OS keyring (or a server's `tokens.json`), not the SQLite file — so sharing or moving that database doesn't leak them.

## Related

- [Model Providers](/guide/authentication) — where you configure the model credentials that agent calls carry.
- [Version Control](/reference/settings/version-control) — Git and chat tokens, and the keyring that holds them.
- [System](/reference/settings/system) — the network proxy, and backup encryption.
- [Web Service](/reference/settings/web-service) — the access token that gates browser access.
- [Architecture](/reference/architecture) — the local-first, three-binary design underneath all of this.
