---
title: Appearance
description: The Appearance settings screen — theme mode and accent color, window zoom, per-surface fonts, the welcome-screen shortcut cards, and the desktop pet manager.
---

# Appearance

**Settings → Appearance** controls how Codeg looks: light or dark, the accent color, how large everything is drawn, the fonts used across each surface, and a couple of extras. It's the screen Settings opens on, and every change here saves automatically and applies immediately — no save button, no restart.

## Theme mode

A single picker — **Follow system**, **Light**, or **Dark**. *Follow system* tracks your OS setting and flips when it does; the line beneath shows the *effective* theme it resolved to right now. On the desktop app, the native window switches with it.

## Theme color

The accent palette used for buttons, accents, and highlights. Twelve presets — the standard shadcn theme colors, each a swatch you click:

**Neutral** *(default)* · Zinc · Slate · Stone · Gray · Red · Rose · Orange · Green · Blue · Yellow · Violet

The choice recolors the whole app instantly.

## Window zoom

Scales the entire interface — text, controls, and spacing alike — in discrete steps:

**80% · 90% · 100%** *(default)* **· 110% · 125% · 150%**

Zoom is stored **per device**, so a large external monitor and a laptop screen can each keep their own comfortable size.

## Fonts

Three independent typefaces, one per surface. Each picks from a set of bundled families (grouped **Sans-serif** / **Monospace**) or **Custom…**, which lets you name any font installed on your system. Bundled fonts load only when selected. What you can set differs by surface:

| Surface | Font list | Size | Ligatures | Word wrap |
| ------- | --------- | ---- | --------- | --------- |
| **Interface** | Sans + monospace | — | — | — |
| **Editor** | Monospace | ✓ | ✓ | ✓ |
| **Terminal** | Monospace | ✓ | ✓ | — |

- **Ligatures** turn on programming ligatures (`=>`, `!=`, `>=`) for fonts that carry them; the toggle disables itself and says so for a font that doesn't. Terminal ligatures apply only to the bundled coding fonts.
- A **live preview** at the bottom renders a line of interface text, a snippet of code, and a terminal command in your current choices — so you can compare before committing.

The editor and terminal these style are the ones in [the workspace](/guide/workspace).

## Mode selection area

One switch — **Show on the new conversation page**. It controls whether the **Code Development / Office Work** shortcut cards appear above the composer when you open a fresh conversation. Leave it on for one-click access to the welcome quick actions — they seed a starter prompt for the [Office](/guide/office) and [Research](/guide/research) skills, among others — or turn it off for a bare composer.

## Desktop Pet

A collapsible manager for **floating desktop companions** — animated sprite characters that sit on your screen and double as a live status indicator, showing how many agent sessions are running, awaiting approval, or errored. It's collapsed by default; the number beside its title is how many pets you have.

Three ways to add one:

- **Add pet** — supply your own sprite sheet: a **1536×1872 PNG or WebP with transparency** (Codex-compatible), plus an id and a display name.
- **Import from Codex** — pulls in any pets already installed under `~/.codex/pets/`; disabled when there are none.
- **Pet marketplace** — browse and install community pets, filterable by kind (object, animal, person, creature) and sortable by latest, popular, or most-viewed.

Each pet card lets you **Set active**, **Edit**, or **Delete** it (the active pet can't be deleted), and clicking it previews the animations — idle, run, wave, jump, and the session-state poses. **Summon pet window** floats the active pet on your desktop.

::: info The floating pet is desktop-only
Summoning the on-screen companion needs the native desktop window, so **Summon** appears only in the desktop app. You can still build and manage your pet library from a [browser session](/getting-started/deployment) — there's just nowhere for it to float.
:::

## Good to know

- **Appearance is local.** These are per-machine preferences — zoom explicitly so — not part of any synced profile. Set them once on each device.
- **App language isn't here.** Interface language lives on the [System](/reference/settings/system) screen, not Appearance.
- **Everything is instant.** No control on this screen needs a save or a reconnect to take effect.

## Related

- [The Workspace](/guide/workspace) — the editor and terminal the font settings style.
- [System](/reference/settings/system) — updates, network proxy, language, and backup.
- [Reference overview](/reference/) — the full 14-screen Settings map.
