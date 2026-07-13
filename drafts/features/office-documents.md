# Office Documents

Work with Word, Excel, and PowerPoint files as a first-class workflow. The bundled **officecli** toolset lets your agents create, analyze, proofread, and edit `.docx`, `.xlsx`, and `.pptx` documents — and you can preview the result right inside Codeg.

<div class="light-only">

![Office document workflow in Codeg](/images/office-light.png)

</div>

<div class="dark-only">

![Office document workflow in Codeg](/images/office-dark.png)

</div>

## Install officecli

Go to **Settings → Skill Packs → Office**. The detection card shows one of **Installed**, **Installed but not runnable** (the binary is present but fails to run — e.g. missing system libraries on a slim Linux host), or **Not installed**.

Click **Install** — Codeg downloads and runs the officecli installer (`~/.local/bin` on Unix, `%LOCALAPPDATA%\OfficeCLI` on Windows), streaming the log, then syncs the skills. **Uninstall** and **Sync skills** are on the same page.

## Enable skills per agent

The Office tab is a [skill-by-agent matrix](/features/skills#the-skill-by-agent-matrix). Nine skills are available:

| Category | Skills |
| -------- | ------ |
| Presentations | Presentation (pptx), Pitch Deck, Morph Animation PPT, 3D Morph PPT |
| Documents | Word Document, Academic Paper |
| Spreadsheets | Excel Workbook, Financial Model, Data Dashboard |

A skill must be **synced** to the central store before it can be enabled for an agent.

## Supported formats & live preview

Codeg previews **`.docx`, `.xlsx`, `.pptx`**. With **Auto-preview** on (the default), when an agent writes one of these files in your workspace a preview tab opens automatically and **refreshes as the agent edits** — backed by a long-lived `officecli watch` server (loopback on local desktop, reverse-proxied and capability-authenticated on web/remote deployments).

Codeg's Office documents workflow is powered by [OfficeCLI](https://github.com/iOfficeAI/OfficeCLI).
