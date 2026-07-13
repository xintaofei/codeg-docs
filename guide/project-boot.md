---
title: Project Boot
description: Start a brand-new frontend project without leaving Codeg — design a shadcn/ui theme in a live configurator or scaffold an HTML-to-video HyperFrames project, then have the finished folder handed straight to your workspace with an agent ready to build.
---

# Project Boot

Most of Codeg is about working in a repo you already have. **Project Boot** is the other end — the on-ramp that *creates* one. It's a scaffolding launcher: you configure a new frontend project visually, Codeg runs the scaffolding CLI for you, and the finished folder is handed straight to your [workspace](/guide/workspace) as a draft tab — so you go from an empty idea to an agent working in a real project in one move.

It comes in two flavors: a **shadcn/ui** application you theme in a live configurator, and a **HyperFrames** HTML-to-video project. Both end the same way — a scaffolded folder open in Codeg, ready for an [agent](/guide/agents) to build on.

## Open the launcher

Project Boot has its own window. Open it from the **+** (New folder) button beside your folders — the dropdown's **Project Boot** item (the 🚀 rocket) — or from a right-click in the conversation sidebar. It opens with two tabs, **shadcn** and **HyperFrames**; pick the kind of project you're starting.

## Design a shadcn/ui app

The **shadcn** tab is a split view: a configurator on the left, a **live preview** on the right that re-renders the moment you change anything. You're designing a shadcn/ui theme, and the preview shows it applied to a real component gallery.

The configurator is grouped into four sections:

| Section | What you set |
| ------- | ------------ |
| **Style** | The base style — **Nova, Vega, Maia, Lyra, Mira** |
| **Colors** | **Base color** (Neutral, Stone, Zinc…), an accent **Theme** and **Chart color** from ~25 hues |
| **Typography** | **Font** and **Heading font** from two dozen families (Inter, Geist, JetBrains Mono, Playfair…), plus **Icon library** — Lucide, Hugeicons, Tabler, Phosphor, Remix |
| **Interface** | Corner **Radius**, and **Menu accent** / **Menu color** |

Every choice is packed into a compact **preset code** (shadcn's v2 format) — the same code that drives the preview *and* gets passed to the scaffolding CLI, so what you see is what you scaffold.

When it looks right, hit **Create Project**. A dialog collects the essentials:

- **Project name** and **Save directory** (browse to it).
- **Package manager** — pnpm, npm, yarn, or bun. Codeg checks it live and shows the version with a ✓, or a ✗ if it's missing.
- **Advanced options** — the **framework template** (Next.js, Vite, TanStack Start, React Router, Laravel, Astro), the base component library, and an **RTL** toggle for right-to-left languages.

Codeg then runs `shadcn@latest init` with your name, framework, and preset code, through the runner you picked (`pnpm dlx`, `yarn dlx`, `bunx`, or `npx`).

## Scaffold a HyperFrames video project

The **HyperFrames** tab scaffolds an **HTML-to-video** project — you compose frames as HTML and render them to video. As the tab puts it: *scaffold the project, and your workspace agent can then write and render it.*

You set a **project name**, a **save directory**, a **package manager** (detected live, same as above), and a **resolution**:

| Resolution | Size |
| ---------- | ---- |
| **Template default** | Keep the template's own dimensions |
| **Landscape** / **Portrait** / **Square** | 1920×1080 · 1080×1920 · 1080×1080 |
| **Landscape 4K** / **Portrait 4K** | 3840×2160 · 2160×3840 |

Codeg scaffolds from the offline **blank** example via `hyperframes@latest init`, then hands the folder to your workspace.

There's also an optional, collapsed-by-default **Agent Skills** card. Composing and rendering video is easier when the agent knows HyperFrames, so this step **globally installs the HyperFrames authoring skills** (symlinked) for the agents that support them — **Claude Code, Codex, OpenCode, Gemini, OpenClaw, and Cline**. Each agent shows an **Installed** badge, with a **Re-check** and an **Install / update** button; re-running is idempotent, so it doubles as an updater. (The scaffold step itself doesn't install these — that's why it's a separate, deliberate action here.)

::: tip These skills come from the project, not the curated packs
The HyperFrames skills are the video toolkit's *own* agent skills, installed here into your agents' shared skill store. That's different from the curated [Skill Packs](/guide/skills#enable-a-curated-skill-pack) (Experts, Science, Office) you manage in Settings — same idea, different source.
:::

## From scaffold to workspace

Both tabs share the same guardrails and the same happy ending:

- **The package manager must be present.** The chosen runner is what executes the scaffold, so Codeg gates **Create** on detecting it. Node/`npx` must be installed too — a missing runtime surfaces as a clear create-time error.
- **The name is a single safe folder name.** No path separators, `..`, absolute paths, or leading `-` — the name is handed to a CLI, so Codeg validates it (this path is reachable over the server API too, not just the desktop picker).
- **The target must be empty.** Codeg won't scaffold over a folder that already has files in it.
- **On success, the project opens itself.** Codeg registers the new folder and **opens it in your workspace as a draft tab**, then closes the launcher — so you land in the project, [agent](/guide/agents) at the ready, without a manual "open folder" step.

::: tip It works on a server too
Scaffolding runs on whichever host holds the workspace. Bound to a [remote server](/getting-started/deployment)? The directory browser browses the *server's* filesystem and the project is created there — the launcher just drives it from your browser.
:::

## Good to know

- **It's the "day zero" companion.** Everything else in Codeg assumes a repo; Project Boot makes one — a styled frontend or a video project — and drops you into it.
- **The preset is portable.** A shadcn project scaffolds into a standard repo with your theme baked in; nothing about it is Codeg-specific afterward.
- **Skills install is per agent and idempotent.** Install for the agents you'll actually use to build the video; re-run any time to update them.

## Next steps

- [**The Workspace**](/guide/workspace) — where the scaffolded project lands and where you'll build it.
- [**Working with Agents**](/guide/agents) — pick and sign in the agent that takes over once the project is open.
- [**Skills**](/guide/skills) — manage agent skills, including the shared store the HyperFrames skills install into.
- [**Office Documents**](/guide/office) · [**Scientific Research**](/guide/research) — the other domain workflows.
