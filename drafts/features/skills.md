# Skills

Codeg manages two kinds of agent skills:

- **Custom skills** you write yourself, per agent — under **Settings → Skills**.
- **Skill Packs** that Codeg curates and links into your agents — under **Settings → Skill Packs** (Experts, Office, Science).

## Custom skills

**Settings → Skills** is a two-pane editor. Pick a **Managed target** agent, choose a **scope**, then create or edit skill files (Markdown, one `SKILL.md` per skill).

- **Scope — Global vs Folder.** *Global* writes to the agent's home skill directory (e.g. `~/.claude/skills`). *Folder* writes to a specific project folder (e.g. `{folder}/.claude/skills`), so the skill only applies in that repo.
- **New Skill** — give it an ID (the on-disk name; it can't be renamed later) and a Markdown body; toggle **Edit / Preview**; **Save**.
- Right-click a skill for Preview, Edit, Open in window, or Delete. Read-only **System** skills can't be edited.

Saved skills become available to that agent's `/` and `$` autocomplete right away.

## Skill Packs

Skill Packs are curated bundles Codeg keeps in a central store (`~/.codeg/skills/`) and **links into each agent you enable them for**. Three packs share one interface under **Settings → Skill Packs**:

- **Experts** — workflow skills vendored from [Superpowers](https://github.com/obra/superpowers).
- **Office** — document skills powered by OfficeCLI. See [Office Documents](/features/office-documents).
- **Science** — research skills. See [Scientific Research](/features/scientific-research).

### The skill-by-agent matrix

Each pack is a grid: **rows = skills**, **columns = agents**. Toggle any single **(skill, agent)** cell to link or unlink one skill for one agent. Bulk controls:

- **Row menu** — enable/disable a skill across all agents.
- **Column header** — enable/disable all skills for one agent.
- **Top-right menu** — enable/disable everything visible.
- **Select rows** — bulk-apply to a chosen set of agents.

Enabling applies immediately; disabling in bulk asks for confirmation. A skill must first be **synced** to the central store — un-synced skills show a "not synced" badge with locked cells.

::: tip
"Enabled for an agent" literally means a link to the central skill copy exists in that agent's skill directory. Codeg upgrades re-sync the central copies automatically; your own edits are preserved and flagged for review.
:::
