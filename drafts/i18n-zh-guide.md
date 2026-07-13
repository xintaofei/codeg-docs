# Codeg Docs — Simplified Chinese (zh) Translation Guide

Working spec for translating the English docs into the `/zh/` tree. This file is
**excluded from the built site** (`srcExclude: ['drafts/**']`). It also documents
the localization convention reused for the remaining locales (Phase 4).

## Golden rule

Translate the **meaning** into natural, professional Simplified Chinese. Do **not**
summarize, drop, or invent content. Preserve every section, list item, table row,
callout, code block, image, and link. Keep the source's structure 1:1 — this
path-parity is what makes the language switcher land on the same page.

Tone: developer documentation. Use 你 for "you". Concise, idiomatic — don't
translate English idioms word-for-word.

---

## Mechanical rules — follow exactly (the build fails on dead links)

### 1. Internal doc links → add a `/zh` prefix

- `](/guide/x)` → `](/zh/guide/x)`
- `](/reference/settings/system)` → `](/zh/reference/settings/system)`
- `](/getting-started/)` → `](/zh/getting-started/)`
- `](/about)` → `](/zh/about)`
- `](/)` → `](/zh/)`
- Keep any `#fragment` on the link **byte-for-byte**:
  `](/guide/git#git-accounts)` → `](/zh/guide/git#git-accounts)`
- External URLs (`https://…`, `github.com/…`) — **unchanged**.

### 2. Asset paths → NEVER prefix

`/images/...` and `/icon.svg` stay exactly as written. Assets are shared across
locales, not copied per-language.

### 3. Headings → pin the English anchor

Append `{#english-slug}` to **every** `##` / `###` / `####` heading, where
`english-slug` is the VitePress auto-slug of the **original English** heading.

Slug algorithm — VitePress's real rule (verified against built HTML):
1. Replace every run of whitespace **and** ASCII punctuation (space and
   `` ~`!@#$%^&*()-_+=[]{}|\;:"'<>,.?/ ``) with a single `-`.
2. **Non-ASCII punctuation survives** — an em-dash `—` stays literally in the slug.
3. Trim leading/trailing `-`; if the result starts with a digit, prefix `_`; lowercase.

Most headings become plain kebab-case. The gotchas (each verified against the
built EN `id="…"`):
- em-dash survives:    `Start a session — the composer` → `start-a-session-—-the-composer`
- apostrophe → `-`:    `Check it's ready` → `check-it-s-ready`
- slash → `-`:         `Design a shadcn/ui app` → `design-a-shadcn-ui-app`
- leading digit → `_`: `1. Aggregate` → `_1-aggregate`
- `&` / `,` / `()` adjacent to spaces collapse to one `-`: `Channels & Automation` → `channels-automation`

When in doubt, build once and copy the real `id="…"` from the built HTML — that
is the authoritative slug. If an English heading already has an explicit
`{#pin}`, reuse that exact pin (don't re-derive it).

Examples:
- `## What stays local` → `## 本地保存的内容 {#what-stays-local}`
- `### Git accounts` → `### Git 账户 {#git-accounts}`
- `## Send events to your own tools` → `## 将事件发送到你自己的工具 {#send-events-to-your-own-tools}`
- `## What leaves your machine — and only when you act` → `## …（译文）… {#what-leaves-your-machine-—-and-only-when-you-act}`

Why: every same-page and cross-page `#fragment` link stays valid after we only
prefix paths with `/zh`. Get the slug right and no link coordination is needed.

### 4. Frontmatter

- Translate the **values** of `title:` and `description:`. Keep the keys.
- The home page (`index.md`) has special hero/features frontmatter — handled
  separately (not part of the batch translations).

### 5. VitePress containers

Keep the type token in **English**; translate the title and the body:
- `::: tip` / `::: info` / `::: warning` / `::: danger` / `::: details`
- If the source put a custom title on the same line (`::: warning Heads up`),
  translate that title (`::: warning 注意`). Keep the closing `:::`.

### 6. Raw HTML blocks

`stat-strip` / `stat`, `beforeafter` / `ba`, `cta-row` / `cta`, `nextsteps` /
`nextstep`, `light-only` / `dark-only`, etc.:
- Keep all tags, **class names**, and structure identical.
- Translate visible text only.
- `href="/guide/…"` → prefix with `/zh`. `src="/images/…"` → unchanged.

### 7. Vue components

`<AgentRoster />` and `<Download />` — leave **exactly as-is**. (AgentRoster shows
only product names; Download localizes itself.)

### 8. Keep as-is — do NOT translate

- Code blocks, shell commands, file paths, env-var names, config keys.
- Product / tech proper nouns: **Codeg, Claude Code, Codex, Codex CLI, Gemini,
  Gemini CLI, OpenCode, OpenClaw, Cline, Hermes, CodeBuddy, Kimi, Pi, Grok, MCP,
  ACP, composer, git, worktree, GitHub, GitLab, Docker, Tauri, SQLite, Telegram,
  Lark/Feishu, iLink, macOS, Windows, Linux, Keychain, officecli**, and file
  extensions like `.docx` / `.xlsx` / `.pptx` / `.dmg` / `.exe` / `.deb`.

---

## Glossary — use consistently

| English | 简体中文 |
|---|---|
| agent | 智能体 |
| sub-agent | 子智能体 |
| multi-agent | 多智能体 |
| main agent | 主智能体 |
| agent session | 智能体会话 |
| workspace | 工作区 |
| session | 会话 |
| conversation | 对话 |
| Conversation Aggregation | 对话聚合 |
| collaboration | 协作 |
| delegate / delegation | 委派 |
| worktree / git worktree | worktree（保留原文） |
| desktop app | 桌面应用 |
| server | 服务器 |
| standalone server | 独立服务器 |
| headless | 无头 |
| deployment | 部署 |
| Model Providers / model provider | 模型提供商 |
| credentials | 凭据 |
| token | 令牌 |
| keyring | 系统密钥环 |
| Keychain | 钥匙串 |
| skill / skills | 技能 |
| automation(s) | 自动化 |
| Chat Channels / channel | 聊天频道 / 频道 |
| permission | 权限 |
| prompt | 提示词 |
| terminal | 终端 |
| sidebar | 侧边栏 |
| tab | 标签页 |
| local-first | 本地优先 |
| telemetry | 遥测 |
| composer | composer（保留原文） |
| Project Boot | 项目引导 |
| Office Documents | Office 文档 |
| Scientific Research | 科学研究 |
| Supported Agents | 支持的智能体 |
| Getting Started | 快速开始 |
| Guide | 指南 |
| Reference | 参考 |
| Settings | 设置 |
| Installation | 安装 |
| Deployment | 部署 |
| Configuration | 配置 |
| Architecture | 架构 |
| Privacy & Security | 隐私与安全 |
| Web Service | Web 服务 |
| Version Control | 版本控制 |
| Runtime Logs | 运行日志 |
| Quick Messages | 快捷消息 |
| Shortcuts | 快捷键 |
| Appearance | 外观 |
| General | 通用 |
| System | 系统 |
| Development | 开发 |

---

## Sync convention (path parity)

The language switcher maps `/{path}` ↔ `/zh/{path}`. When you add, move, or
rename an English page, mirror the change in every locale tree so the switcher
lands on the same page. Anchor pins ({#english-slug}) keep fragment links stable
across the switch.
