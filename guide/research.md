---
title: Scientific Research
description: Turn any coding agent into a research assistant — a curated pack of scientific-research skills that carry a study from a vague idea to a testable hypothesis, a rigorous design, real statistics, publication-ready figures, and a literature search.
---

# Scientific Research

Codeg bundles a curated library of **scientific-research skills** that turn any of its coding agents into a research assistant. They carry a study across its whole arc — from a half-formed idea to a testable hypothesis, a rigorous experimental design, an honest power calculation, real statistical analysis, publication-ready figures, and a search of the literature. You invoke them the same way you invoke any [skill](/guide/skills): type `/` and pick one.

Where the [Office pack](/guide/office) produces research *artifacts* — the deck, the paper, the workbook — the Science pack supplies the *method*: how to frame a question, design the study, run the stats, and appraise the result. The two compose well; this page is about the thinking half.

The skills are vendored, byte-for-byte, from the open-source [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) project (MIT-licensed), baked into Codeg, and enabled per agent like any pack.

## Enable the research skills

The Science pack lives under **Settings → Skill Packs → Science**. It shares the same [central store and enabling model](/guide/skills#enable-a-curated-skill-pack) as the other packs: a **skill-and-agent matrix** where you tick which skills each of your agents gets, and Codeg links them into that agent's own skills directory. Nothing here is agent-specific magic — a linked science skill is just a skill in that agent's `/` menu.

Two badges show up on the Science matrix that the Experts pack doesn't have — they flag a skill whose *own workflow* needs something before it runs:

- **May need setup** — the skill ships helper scripts that expect a **Python** (often `uv`) environment. It still links fine; the script-backed steps just need that environment present. The skill's own `SKILL.md` lists what to install.
- **Needs API key** — the skill's main workflow calls an external service that wants a key. Only one skill carries this (Scientific Schematics — see below); it links like any other, but the diagram step needs the key set first.

::: tip Enabling always works — setup is about the skill, not the link
A **May need setup** or **Needs API key** badge never blocks enabling. It's a heads-up that the skill's *tools* have a prerequisite. Keys go where the agent's other credentials live — an environment variable the agent runs with. → [Where credentials are stored](/guide/authentication#where-credentials-are-stored)
:::

## The research skills

Thirteen skills, grouped by the stage of research they serve. Each has its own `/`-invocation and knows the conventions of its craft:

| Stage | Skill | What it does | Setup |
| ----- | ----- | ------------ | ----- |
| **Ideation** | **Scientific Brainstorming** | Explore interdisciplinary links, challenge assumptions, surface research gaps | — |
| | **Hypothesis Generation** | Turn observations into testable hypotheses with predictions and mechanisms | Python |
| **Study Design** | **Experimental Design** | Randomization, blocking, controls, and factorial/DOE layouts — *before* you collect data | Python |
| | **Statistical Power** | Sample-size and power analysis, minimum detectable effects, power curves | Python |
| **Analysis** | **Statistical Analysis** | Test selection, assumption checks, effect sizes, APA-style reporting | Python |
| | **Exploratory Data Analysis** | Automated exploration of data files across 200+ formats, with quality reports | Python |
| **Visualization** | **Scientific Visualization** | Publication-ready figures — multi-panel layouts, significance annotations, journal formats | Python |
| | **Scientific Schematics** | AI-generated diagrams — pathways, architectures, flowcharts | API key |
| **Evaluation** | **Critical Thinking** | Appraise claims and evidence — biases, confounders, GRADE and risk-of-bias | — |
| | **Peer Review** | Checklist-based manuscript and grant review, CONSORT/STROBE compliance | Python |
| | **Scholar Evaluation** | Score work with the ScholarEval framework — formulation through writing | Python |
| **Literature** | **Paper Lookup** | Search 10 scholarly APIs (PubMed, arXiv, OpenAlex, Crossref…) for papers and full text | — |
| | **Citation Management** | Verify metadata and generate accurate BibTeX — DOI-to-BibTeX, reference validation | Python |

Two are worth calling out. **Paper Lookup** reaches ten open scholarly APIs and needs **no key** — it's a keyless literature search you can enable and use immediately. **Scientific Schematics** is the one skill that needs an API key: it renders diagrams through an AI image model and expects an **OpenRouter** key.

You only enable the ones a given agent will use — a data-analysis agent wants the stats and EDA skills, not the pitch for peer review.

## Start from the welcome screen

A fresh conversation shows quick-action tabs; the **Scientific Research** tab is the fast way in. It promotes the first three skills — **Scientific Brainstorming**, **Hypothesis Generation**, **Experimental Design** — as prominent cards, with the rest of the featured skills in a scrolling row. Clicking one drops the skill in and **seeds a starter prompt** you finish in your own words:

```text
/scientific-brainstorming Help me brainstorm research directions — explore
interdisciplinary connections, challenge assumptions, and surface promising
gaps. The area I'm exploring: circadian regulation of gut microbiota
```

If a skill isn't enabled for the current agent, its card shows a **lock** — click it and Codeg points you to Settings to switch it on. Prefer to type? `/` in the composer lists every enabled skill, so `/paper-lookup` or `/statistical-analysis` works without touching the cards. *(Codex uses `$` instead of `/`.)*

The four skills that aren't featured — **Peer Review**, **Citation Management**, **Scholar Evaluation**, **Scientific Schematics** — don't get welcome cards, but they're right there in the `/` menu and the settings matrix once enabled.

## A research session, end to end

The skills are built to hand off to one another, so a single conversation can walk the whole lifecycle:

1. **Frame it.** `/scientific-brainstorming` to widen the question, then `/hypothesis-generation` to sharpen it into something with a prediction and a mechanism.
2. **Design it.** `/experimental-design` lays out controls and randomization; `/statistical-power` tells you how many samples you actually need before you spend a week collecting them.
3. **Analyze it.** Point `/exploratory-data-analysis` at your data file for a first pass, then `/statistical-analysis` to pick the right test, check its assumptions, and report effect sizes.
4. **Show it.** `/scientific-visualization` renders publication-ready figures; `/scientific-schematics` draws the mechanism diagram.
5. **Pressure-test it.** `/scientific-critical-thinking` and `/peer-review` appraise the claim and the write-up the way a reviewer would; `/paper-lookup` and `/citation-management` ground it in the literature and produce clean BibTeX.

The script-backed skills (the **Python** ones) run their analysis and drop the outputs — reports, figures — straight into your working folder, where they open in a [workspace tab](/guide/workspace). When the science is settled and you want the write-up as a real `.docx` or a slide deck, hand the results to the [Office pack](/guide/office).

## Good to know

- **"May need setup" is about the skill's scripts, not Codeg.** The stats, EDA, visualization, and most evaluation/literature skills ship Python helpers; enabling links them instantly, but those steps run only once a Python/`uv` environment is available on the machine the agent works on. Each skill's `SKILL.md` spells out its dependencies.
- **One key, one skill.** Only Scientific Schematics needs an API key (OpenRouter, for AI-rendered diagrams). Everything else — including the ten-API Paper Lookup — runs without one.
- **They stay current on their own.** Because the pack is bundled into Codeg and re-extracted to the central store on each upgrade, enabled skills track the vendored upstream with no action from you. Edit one in place and Codeg marks it **User modified** and preserves your version.
- **Enable per agent, invoke like any skill.** Same matrix, same `/id` (Codex `$id`), same **Reconnect to apply** for a session that's already open. → [Skills](/guide/skills) · [Configure an agent](/guide/agents#configure-an-agent)
- **It works the same on a server.** The Skill Packs screen is in the browser build; the skills live on the machine Codeg runs on.

## Next steps

- [**Skills**](/guide/skills) — the enabling matrix in full, and how to write your own skills.
- [**Office Documents**](/guide/office) — turn research results into real `.docx`, `.xlsx`, and `.pptx` files with live preview.
- [**MCP Servers**](/guide/mcp) — give an agent live data tools and APIs beyond the bundled skills.
- [**Working with Agents**](/guide/agents) — pick and sign in the agent that will do the research.
