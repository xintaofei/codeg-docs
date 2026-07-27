---
title: Architecture
description: Architecture — how Codeg fits together, from its one Rust core and shared web UI to the three binaries and the agent CLIs they drive over ACP.
---

# Architecture

Underneath, Codeg is a small number of moving parts arranged simply: **one Rust core**, **one web frontend**, and **three binaries** built from them — the desktop app, the standalone server, and a small per-agent companion. Everything a session does — driving an agent, opening a terminal, reading a file, delegating to another agent — flows through that shared core. This page is the map; the individual [Settings screens](/reference/) and [guides](/guide/) are the territory.

## The three binaries

Codeg ships **three Rust binaries from a single Cargo workspace**, all compiled from the same library crate (`codeg_lib`):

| Binary | Role |
| ------ | ---- |
| **`codeg`** | The **desktop app** — a [Tauri](https://tauri.app/) shell (native window, system tray, auto-updater) wrapping the web UI. |
| **`codeg-server`** | The **standalone server** — an HTTP + WebSocket server that serves the same UI to a browser, for headless or shared deployments. |
| **`codeg-mcp`** | The **per-launch companion** — a tiny stdio [MCP](https://modelcontextprotocol.io/) server an agent CLI runs to reach Codeg's own tools, chiefly multi-agent delegation. |

The first two are the ones you *run*; the third is spawned for you, one per agent session (more on it [below](#multi-agent-delegation-and-codeg-mcp)). Because they share `codeg_lib`, the desktop app and the server are the **same product with two front doors** — the difference is how the UI reaches the core, not what the core does.

## One core, one frontend

Two pieces do the real work, and both are reused across every binary:

- **The Rust core (`codeg_lib`)** — session and agent orchestration, the database, git, credentials, the web server, logging. It's built with [Tauri](https://tauri.app/)'s desktop features on for `codeg`, and compiled headless (no GUI) for `codeg-server` and `codeg-mcp`.
- **The web frontend** — a [Next.js](https://nextjs.org/) / React app, exported as static files. The desktop app loads them in its webview; the server serves the very same bundle to browsers.

What connects the frontend to the core is a **transport layer**, and it's the key to the two-front-doors design: the same UI code talks to the core either way, choosing its channel at runtime.

- In the **desktop app**, the UI calls the core directly through **Tauri's IPC** — in-process, no network.
- In a **browser**, the identical UI talks to `codeg-server` over **HTTP and a WebSocket** for live events.

This is why the [Web Service](/reference/settings/web-service) screen can hand your phone "the full workspace," and a [headless deployment](/getting-started/deployment) feels identical to the desktop — it's one frontend over two transports, not two apps.

### Native mobile clients

The [iOS and Android apps](/getting-started/installation#mobile-apps) add a third client path without moving the core. They are native SwiftUI and Jetpack Compose applications rather than wrappers around the web frontend, and they talk to a desktop Web Service or `codeg-server` through the same authenticated **HTTP + WebSocket API**. The access token is kept in iOS Keychain or protected by Android Keystore.

No agent CLI or project checkout runs on the phone. The host still owns the files, database, git operations, and agent subprocesses; the mobile app sends commands and renders the resulting live event stream. Both clients are open source: [Codeg for iOS](https://github.com/xintaofei/codeg-ios) and [Codeg for Android](https://github.com/xintaofei/codeg-android).

## How agents run

Codeg doesn't reimplement Claude Code, Codex, Gemini, and the rest — it **drives their real CLIs**. Each agent runs as a **subprocess**, and Codeg speaks to it over the **[Agent Client Protocol](https://agentclientprotocol.com/) (ACP)** — the same JSON-RPC protocol an editor like Zed uses to talk to a coding agent.

In that relationship Codeg is the **client** and the agent is the **server**: Codeg opens a session, streams the model's turn back to your screen, and answers the agent's requests as they arrive — run a command in a **terminal**, **read or write a file**, ask **permission** for a risky action. Because every agent is normalized to the one protocol, they all land in a single workspace under one set of controls — which is what makes aggregating conversations and switching between agents possible in the first place.

When Codeg launches an agent, it also hands it a set of **MCP servers** to connect to. One of those is always Codeg's own companion.

## Multi-agent delegation and `codeg-mcp`

`codeg-mcp` is how one agent can **hand work to another**. When Codeg starts an agent CLI, it injects an MCP server entry pointing at this binary; the CLI launches it over stdio, and its LLM gains a small set of Codeg tools — above all **`delegate_to_agent`**, plus the toggleable helpers from [General settings](/reference/settings/general): `check_user_feedback`, `ask_user_question`, and `get_session_info`. A `delegate_to_agent` call travels back through the companion to the parent Codeg process, which spins up the worker agent and streams its result home.

Two practical consequences, both grounded in how it's shipped:

- **It lives next to its parent.** Installers, the Docker image, and the desktop bundle all place `codeg-mcp` beside `codeg` / `codeg-server`. A source build in an unusual layout can point at it explicitly with **`CODEG_MCP_BIN=/abs/path/codeg-mcp`**.
- **It's optional and fails soft.** If the companion is missing, delegation is simply skipped — a single warning is logged and the rest of the session runs normally.

The user-facing side of all this is [Working with Multiple Agents](/guide/multi-agent); this is the plumbing beneath it.

## Where your data lives

Codeg keeps its state on the **local machine**, under **`~/.codeg/`** by default (override with `CODEG_HOME`; a server can use `CODEG_DATA_DIR`). That directory holds the **SQLite database** (conversations, settings, account metadata), your **[skills](/guide/skills)**, and the **uploads** and **[logs](/reference/settings/logs)** directories. Secrets are the deliberate exception: on desktop, tokens go into the **OS keyring** rather than any of these files — the split described under [Version Control](/reference/settings/version-control) and again in [Backup & Restore](/reference/settings/system).

There's no Codeg cloud in the middle. The desktop app and a server you run both keep everything on the box they run on; the only things that leave are the agent's own calls to whatever model provider you've configured. [Privacy & Security](/reference/privacy) covers what that means in practice.

## Good to know

- **Three binaries, one codebase.** `codeg`, `codeg-server`, and `codeg-mcp` are build targets of the same Rust workspace over the same `codeg_lib` core — not three separate programs to keep in sync.
- **Desktop and server are the same app.** The distinction is the transport (Tauri IPC vs HTTP/WebSocket), not the feature set — the [Web Service](/reference/settings/web-service) screen and a [headless deployment](/getting-started/deployment) are two ways to reach the identical UI.
- **Mobile is a client, not another core.** iOS and Android connect over the authenticated API; projects and agents keep running on the desktop or server host.
- **Agents stay agents.** Codeg orchestrates the official CLIs over ACP; it doesn't fork or replace them, so each keeps its own behavior, auth, and updates.
- **`codeg-mcp` is per-session and disposable.** One is spawned per agent launch and exits with it; losing it costs you only delegation, nothing else.

## Related

- [Deployment](/getting-started/deployment) — running `codeg-server` (or Docker) as a headless deployment of the same core.
- [Web Service](/reference/settings/web-service) — the desktop app's own front door to the browser UI.
- [Download and install](/getting-started/installation#mobile-apps) — get the native clients and connect them to a Codeg host.
- [Working with Multiple Agents](/guide/multi-agent) — the delegation feature that `codeg-mcp` implements.
- [General](/reference/settings/general) — the toggles that decide which `codeg-mcp` tools each agent receives.
- [Privacy & Security](/reference/privacy) — what stays local, and what leaves for the model provider.
