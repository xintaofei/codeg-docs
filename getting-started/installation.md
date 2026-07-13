---
title: Installation
description: Install the Codeg desktop app on macOS, Windows, or Linux — then enable an agent and run your first session.
---

# Installation

Codeg runs two ways. Most people want the **desktop app** — a native application for macOS, Windows, and Linux, covered on this page. To run Codeg headlessly on a server and reach it from a browser instead, see [Deployment](/getting-started/deployment).

## Download

<Download />

## Install

### macOS

The macOS build is signed with an Apple Developer ID and **notarized by Apple**, so it opens without any Gatekeeper workaround.

1. Open the `.dmg` — pick **aarch64** for Apple Silicon (M-series) or **x64** for Intel.
2. Drag **Codeg** into **Applications**.
3. Launch it from Applications or Spotlight. macOS may ask you to confirm opening an app downloaded from the internet the first time.

### Windows

1. Run the `…_x64-setup.exe` you downloaded (or the `arm64` installer on Arm devices).
2. If **SmartScreen** shows an "unknown publisher" notice, choose **More info → Run anyway** — the installer isn't yet distributed with an Authenticode certificate.
3. Codeg installs and appears in your Start menu. Updates apply passively (see below).

### Linux

- **AppImage (x64):** make it executable and run it —
  ```bash
  chmod +x codeg_*_amd64.AppImage
  ./codeg_*_amd64.AppImage
  ```
- **Debian / Ubuntu:** `sudo apt install ./codeg_*_amd64.deb`
- **Fedora / RHEL:** `sudo dnf install ./codeg-*.x86_64.rpm`

Codeg's UI runs on a **WebKitGTK** runtime (`libwebkit2gtk-4.1`). The `.deb` / `.rpm` packages pull it in automatically; for the AppImage, install it yourself if it isn't already present. No AppImage is published for arm64 — use the `.deb` or `.rpm` there.

## System requirements

- A 64-bit desktop OS: **macOS** (Apple Silicon or Intel), **Windows 10/11**, or a modern **Linux** distribution with WebKitGTK.
- To *drive* agents you need at least one agent CLI installed. Codeg can install and manage most of them for you — via `npx`, `uvx`, or a prebuilt binary — from **Settings → Agents**. A few (the `npx`- and `uvx`-based ones) expect **Node.js** or **[uv](https://docs.astral.sh/uv/)** on your `PATH`. See [Supported Agents](/guide/supported-agents).

::: tip Multi-agent delegation works out of the box
The desktop app bundles the `codeg-mcp` companion, so [multi-agent collaboration](/guide/multi-agent) is available immediately — no extra setup.
:::

## First run

Three steps take you from a fresh install to a running session:

1. **Enable an agent.** Open **Settings → Agents**, pick one (Claude Code, Codex, Gemini…), and let Codeg run its **preflight check** — it flags anything missing and offers to install the agent for you. → [Working with Agents](/guide/agents)
2. **Authenticate.** Sign in with the agent's own subscription, point it at a custom endpoint, or use a model-provider API key. → [Authentication & Models](/guide/authentication)
3. **Start a session.** Open a project folder, choose your agent and model in the composer, and send your first prompt. Past sessions from that agent are [imported into the workspace](/getting-started/#what-codeg-does) automatically.

## Staying up to date

The desktop app keeps itself current. When a new version ships, **Settings → System → Software Update** downloads the signed release, swaps it in, and restarts — while keeping the previous version so you can **roll back** if needed. See [System settings](/reference/settings/system).

## Alternatives

- **Use your desktop app from any browser** — enable **Settings → Web Service** and Codeg serves its interface over the network, protected by an access token (with a QR code for phones). Because it listens on all network interfaces, you can reach your desktop session from any device that can connect to your machine — no separate server required. → [Web Service](/reference/settings/web-service)
- **Run it on a dedicated server** — for headless or team use, deploy `codeg-server` and use Codeg from any browser. → [Deployment](/getting-started/deployment)
- **Build from source** — see the [Development](/reference/development) guide.

## Next steps

- [**Supported Agents**](/guide/supported-agents) — which agents Codeg aggregates, and where each keeps its sessions.
- [**Guide**](/guide/) — multi-agent collaboration, chat channels, automations, and more.
- [**Configuration**](/getting-started/configuration) — environment variables and runtime options.
