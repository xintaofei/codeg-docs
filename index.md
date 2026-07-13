---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Codeg
  text: Multi-agent coding workspace
  tagline: Run every AI coding agent in one place — and let them work together.
  image:
    src: /icon.svg
    alt: Codeg
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/installation
    - theme: alt
      text: What is Codeg?
      link: /getting-started/
    - theme: alt
      text: View on GitHub
      link: https://github.com/xintaofei/codeg

features:
  - icon: 📥
    title: Conversation Aggregation
    details: Import sessions from every supported agent into one unified, searchable workspace — one timeline no matter which tool produced them.
    link: /guide/aggregation
    linkText: Learn more
  - icon: 🤝
    title: Multi-Agent Collaboration
    details: A main agent delegates to sub-agents of different types (Claude Code calling Codex, Gemini…) to jointly complete a task, each running as its own session.
    link: /guide/multi-agent
    linkText: Learn more
  - icon: 🚀
    title: Project Boot
    details: Visually scaffold new projects with a live-preview split pane, then open them straight in the workspace.
    link: /guide/project-boot
    linkText: Learn more
  - icon: 💬
    title: Chat Channels
    details: Drive your agents from Telegram, Lark (Feishu) and iLink (Weixin) — create tasks, approve permissions, get real-time replies.
    link: /guide/chat-channels
    linkText: Learn more
  - icon: 📄
    title: Office Documents
    details: Create, analyze, proofread and edit .docx / .xlsx / .pptx via the bundled officecli, with live in-tab preview.
    link: /guide/office
    linkText: Learn more
  - icon: 🔬
    title: Scientific Research
    details: Bundled research skills — hypothesis, experimental design, statistics, visualization — that any agent can invoke.
    link: /guide/research
    linkText: Learn more
  - icon: ⚡
    title: Automations
    details: Save a composer setup as a reusable automation that runs headlessly, on a cron schedule or on demand.
    link: /guide/automations
    linkText: Learn more
  - icon: 🖥️
    title: Desktop, Server & Docker
    details: Run it as a Tauri desktop app, a standalone codeg-server for the browser, or via docker compose up.
    link: /getting-started/deployment
    linkText: Deploy it
---

## See Codeg in action

<div class="light-only">

![Codeg main interface](/images/main-light.png)

</div>

<div class="dark-only">

![Codeg main interface](/images/main-dark.png)

</div>

<div class="cta-row">
  <a class="cta cta--brand" href="/getting-started/installation">Get the desktop app →</a>
  <a class="cta" href="/getting-started/deployment">Run a server</a>
  <a class="cta" href="/guide/">Explore the guide</a>
</div>
