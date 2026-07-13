# Scientific Research

Turn any agent into a rigorous research assistant. Codeg bundles a curated set of MIT-licensed **scientific-research skills** — from ideation to analysis to write-up — that install into the shared central skill store and link into whichever agents you choose.

## Enable science skills

Go to **Settings → Skill Packs → Science** — the same [skill-by-agent matrix](/features/skills#the-skill-by-agent-matrix) used by Experts and Office. Thirteen skills are bundled:

| Category | Skills |
| -------- | ------ |
| Ideation | scientific-brainstorming, hypothesis-generation |
| Design | experimental-design, statistical-power |
| Analysis | statistical-analysis, exploratory-data-analysis |
| Visualization | scientific-visualization, scientific-schematics |
| Evaluation | scientific-critical-thinking, peer-review, scholar-evaluation |
| Literature | paper-lookup, citation-management |

## Skill badges

Some skills carry advisory badges:

- **needs key** — the skill's primary workflow needs an external API key. Only **scientific-schematics** (an OpenRouter key).
- **may need setup** — the skill ships scripts that may need a Python / `uv` environment (10 of the 13).

Codeg does **not** auto-install Python/uv or manage the API key — the badges just flag what a skill may require before it works.

## Quick actions

The **Scientific Research** tab on the new-session welcome screen drops the matching skill invocation plus a localized prompt template into the composer with one click.

The Scientific Research skills are an MIT-licensed subset of [scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills).
