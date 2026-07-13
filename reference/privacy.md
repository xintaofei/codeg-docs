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
- the diagnostic **[logs](/reference/settings/logs)**.

Parsing, storage, git operations, and file work all happen **on-device**. There is no server component you don't run yourself: the desktop app keeps everything on your computer, and a [self-hosted server](/getting-started/deployment) keeps everything on that box. Nothing is uploaded to Codeg — because there is nowhere to upload it *to*.

## What leaves your machine — and only when you act

Codeg reaches the network for a handful of clearly-triggered reasons, each the direct result of something you did:

- **Agent ↔ model provider.** The biggest one. When an agent runs, its CLI calls the model provider you configured — Anthropic, OpenAI, and so on — carrying the prompt and the context it needs. Codeg orchestrates the agent; the **agent** makes the call, with the credentials set under [Model Providers](/guide/authentication). What that sends is governed by the provider's own policy, not Codeg's.
- **Git remotes.** Cloning, fetching, and pushing talk to GitHub, GitLab, or whatever server your remotes point at — authenticated by the accounts under [Version Control](/reference/settings/version-control).
- **Update checks.** [Software Update](/reference/settings/system) contacts the release source to see whether a newer version exists, and downloads it if you choose to install.
- **Installing agents.** Adding an agent CLI downloads it from its normal distribution source.
- **Chat channels**, if you connect any — those integrations talk to the messaging service you linked.

That's the whole list. None of it runs on a background timer against your files; each is a response to a button you pressed or an agent you started.

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

This is the split that surfaces in a couple of places: your [Git and chat tokens](/reference/settings/version-control) live in the keyring, which is why a **desktop backup can't include them** (you re-enter them after a restore), whereas a server's `tokens.json` *is* part of its backup. The [model-provider credentials](/guide/authentication) your agents use are configured separately again.

## Exposing Codeg to the network

By default Codeg listens to no one — the desktop app opens no port. Two features deliberately change that, and both are under your control:

- **[Web Service](/reference/settings/web-service)** turns the desktop app into a browser-reachable server. It binds to **all interfaces (`0.0.0.0`)**, so anyone who can route to your machine on that port can reach the login — which is exactly why it's **gated by an access token**. Treat that token like a password: keep it strong, and stop the service when you're done on an untrusted network.
- A **[standalone server](/getting-started/deployment)** is the same idea by design, and is likewise token-gated.

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
