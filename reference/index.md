---
title: Reference
description: The reference desk — a screen-by-screen map of Codeg's Settings, how the app is built, how it handles your data, and how to build it from source.
---

# Reference

The [Guide](/guide/) is the *how* — how to run an agent, wire up a channel, build a document. This section is the *what*: a screen-by-screen tour of Codeg's **Settings**, how the app is **built**, how it treats your **data**, and how to build it **from source**. Reach for it when you're staring at a specific toggle and want to know exactly what it does.

Some of Codeg's settings screens are big enough to have their own how-to in the Guide — MCP, Skills, Agents. The rest are configuration you set once and forget. The map below covers **all** of them, so you can always find where a screen is documented, then jump to it.

## The Settings surface

Codeg gathers every preference into one **Settings** window (its sidebar is headed *Preferences*). Here's the whole surface, in the order the app lists it, and where each screen is documented:

| Settings screen | What it controls | Documented in |
| --------------- | ---------------- | ------------- |
| **Appearance** | Theme mode & color, window zoom, fonts, desktop pet | [Appearance](/reference/settings/appearance) |
| **General** | Default terminal, command-output colour, rendering, what the close button does, desktop notifications & sounds | [General](/reference/settings/general) |
| **MCP** | Model Context Protocol servers — add, scan, enable per agent | [Guide → MCP Servers](/guide/mcp) |
| **Skills** | Write and edit your own agent skills | [Guide → Skills](/guide/skills) |
| **Skill Packs** | Curated bundles — Experts, Science, Office | [Guide → Skills](/guide/skills#enable-a-curated-skill-pack) |
| **Collaboration** | Delegation between agents, and the in-conversation tools each agent is given | [Collaboration](/reference/settings/collaboration) |
| **Agents** | The agent CLIs — connect, configure, run preflight, and [register your own](/guide/custom-agents) | [Guide → Working with Agents](/guide/agents) |
| **Model Providers** | API provider credentials for agents | [Guide → Authentication & Models](/guide/authentication) |
| **Browser** | The built-in browser — where links open, site rules, what agents may see and do on a page *(desktop only)* | [Browser](/reference/settings/browser) |
| **Quick Messages** | Reusable message snippets for the composer | [Quick Messages](/reference/settings/quick-messages) |
| **Shortcuts** | Keyboard shortcuts | [Shortcuts](/reference/settings/shortcuts) |
| **Version Control** | Git executable, GitHub, GitLab and other Git accounts | [Version Control](/reference/settings/version-control) |
| **Chat Channels** | IM bots for notifications and remote control | [Guide → Chat Channels](/guide/chat-channels) |
| **Web Service** | Expose Codeg to a browser — port, token, QR *(desktop only)* | [Web Service](/reference/settings/web-service) |
| **Runtime Logs** | Diagnostic logs — level, live viewer, files | [Runtime Logs](/reference/settings/logs) |
| **System** | Updates, launch at login, network proxy, language, backup & restore | [System](/reference/settings/system) |

Opening Settings lands you on **Appearance**. Every screen is identical whether you run the desktop app or reach Codeg through a browser — with two exceptions, both dropped from the nav in a browser session: **Web Service**, because it's the screen that *turns on* browser access in the first place, and **Browser**, because there's no engine to embed in a browser tab and every link goes to your own browser instead.

::: tip Six screens have a full how-to in the Guide
MCP, Skills, Skill Packs, Agents, Model Providers, and Chat Channels are features you *use*, not just settings you tweak — so they're written up as task guides. The ten remaining screens are covered here, in reference form.
:::

::: info The map moves when the app does
**Collaboration** and **Browser** are new entries in **0.31.2**, split out of General — delegation and the in-conversation tools onto one page, the built-in browser onto another. [General](/reference/settings/general) is the app-behaviour screen it was always named for.
:::

## Architecture & Security

How Codeg is built, and how it handles what you give it.

- [**Architecture**](/reference/architecture) — one Rust core, three binaries: the `codeg` desktop app, the standalone `codeg-server`, and the `codeg-mcp` companion that powers delegation. How the pieces fit, and how they drive external agent CLIs over ACP.
- [**Privacy & Security**](/reference/privacy) — what stays on your machine, when the network is actually touched, and how agent credentials and web-service tokens are handled.

## Contributing

- [**Development**](/reference/development) — requirements, the build commands for each binary, and the dev loop for building Codeg from source.

---

Everything here describes the app you actually run — desktop or [server](/getting-started/deployment). For the project itself — the people behind Codeg, the community, and the license — see [About](/about).
