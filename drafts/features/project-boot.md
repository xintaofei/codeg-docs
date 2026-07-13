# Project Boot

Create new projects visually with a split-pane interface: configure on the left, preview in real time on the right. Project Boot opens in its own window from the **New folder** dropdown or the sidebar, and has two tabs: **shadcn** and **hyperframes**.

<div class="light-only">

![Project Boot split-pane interface](/images/project-boot-light.png)

</div>

<div class="dark-only">

![Project Boot split-pane interface](/images/project-boot-dark.png)

</div>

## shadcn — scaffold a UI project

The left panel configures the look; the right panel is a **live preview iframe** that updates as you change options.

**Design options:** Style (nova / vega / maia / lyra / mira), Base color, Theme color (25 choices), Chart color, Font (24) + Heading font, Icon library (lucide / hugeicons / tabler / phosphor / remixicon), Radius, and menu accent/color.

Click **Create Project** and fill in:

| Field | Notes |
| ----- | ----- |
| **Project name** | A single folder name (default `my-app`) |
| **Save directory** | Required; **Browse** to pick |
| **Package manager** | pnpm / npm / yarn / bun — shows the detected version or "not installed" |
| **Framework template** *(Advanced)* | Next.js, Vite, TanStack Start, React Router, Laravel, Astro |
| **Base / RTL** *(Advanced)* | Radix or Base; optional right-to-left |

Create runs `<runner> shadcn@latest init …` in the target directory (which must be empty), then opens the new project in your workspace.

## hyperframes — HTML-to-video project

A single form: **Project name**, **Save directory**, **Package manager**, **Resolution** (Landscape / Portrait / Square / 4K variants), and an optional **Agent skills** multiselect. Create runs `<runner> hyperframes@latest init …`; **Install skills** adds the hyperframes skill to each agent you select, one at a time.

## Package-manager detection

Both tabs detect **pnpm / npm / yarn / bun** and show each one's version or "not installed" — **Create is disabled until the chosen manager is installed**.
