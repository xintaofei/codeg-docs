---
title: 升级 Codeg
description: 了解 Codeg 0.43.0 及 0.41.1 以来各版本的新功能、兼容性说明、桌面版与服务器的更新方式，以及数据备份和恢复步骤。
---

# 升级 Codeg

**Codeg 0.43.0** 发布于 **2026 年 11 月 12 日**，支持在文件夹之间移动对话，在 composer 上方统计后台工作，把 Web 服务放进状态栏，在拉取请求上显示 CI 状态，并可让智能体起草回帖到 Issue 的评论。在它之前，0.41.1 之后还发布了七个小版本，新增了 CNB 支持、系统指令、一个任务处理多个 Issue，以及 Codex 原生的回合中途插话。本页介绍新版变化和已有安装的升级步骤。首次安装请看[下载与安装](/zh/getting-started/installation)。

::: warning 从 0.42.3 或更早版本升级前请先备份
本版新增待办相关的数据库迁移，**0.42.1** 也新增过一次。**0.42.3 及更早版本无法使用 0.43.0 打开过的数据启动**，**0.42.0 及更早版本也无法使用 0.42.1 或更高版本打开过的数据启动**。服务器的**回滚**按钮和重新安装旧版桌面应用只会恢复程序，不会撤销数据库迁移。如果之后可能需要降级，请在**新版首次启动前**保存完整数据目录的副本。此前从 0.41.1 退回 0.40.0、从 0.40.0 退回 0.39.0、从 0.39.0 退回 0.38.0 时，也需要恢复对应版本的数据。
:::

## 0.43.0 有哪些变化 {#whats-new-in-0-43-0}

- **在文件夹之间移动对话。** 右键点击对话并选择**移动到**，或在**会话管理**中一次移动多个。历史、标签和已打开的标签页会一起迁移；属于某个待办、或智能体正在处理的对话会留在原处。→ [移动对话](/zh/guide/workspace#move-a-conversation-to-another-folder)
- **看清还有哪些工作在运行。** composer 上方的一行会统计后台任务、子智能体和委派，包括回复结束后仍在继续的工作；点击即可打开、跟进或停止它们。它取代了原先位于对话记录上方的那一栏。→ [后台工作](/zh/guide/conversations#activity-timeline)
- **重新设计的会话详情。** **消息导航**把正在运行的消息放在最前面，并带有实时计时；每条消息的子智能体和改动文件分组显示，各自附带 diff。*扩展 ID* 现在改名为**会话索引**。→ [会话详情](/zh/guide/side-panel#session-details)
- **从状态栏启动和停止桌面应用的 Web 服务**，并可选择**仅本机**，让它不暴露到网络上，而是放在反向代理或 Tailscale Serve 之后。→ [Web 服务](/zh/reference/settings/web-service#listen-on)
- **拉取请求上的 CI 状态。** 列表行会显示检查是否通过，GitHub 和 Gitea 上还会显示数量；来自 fork 的 GitHub 拉取请求被挂起的工作流可以直接在面板中批准。→ [CI 状态一览](/zh/guide/repository#ci-at-a-glance)
- **由智能体起草回帖到 Issue 的内容。** 开启评论后，回帖的评论可以包含一段由智能体起草的回复——你在验收任务时审阅和编辑它——还可以附上可选的 Codeg 页脚。→ [回帖的那条评论](/zh/guide/repository#the-comment-that-goes-back)
- **智能体会给它创建的待办附上文件**，例如截图和日志。→ [让智能体替你写一个](/zh/guide/automations#let-an-agent-write-one)

Codex 的子智能体步骤会以时间线行的形式展开，并链接到子对话；Codex MCP 截图可在聊天中预览；提问卡片会显示完整的问题文本和选项说明。文件搜索能以更少的内存让已打开项目的结果保持最新，长会话整体占用的内存也更少。完整变化见 [0.43.0 发布说明](https://github.com/spacering-net/codeg/releases/tag/v0.43.0)。

### 从 0.41.1 升级 {#coming-from-0-41-1}

- **CNB 加入代码托管平台**（0.42.0）：通过新的 **CNB 账号**卡片，支持 Issue、合并请求、按计划自动处理，以及交付为合并请求。→ [仓库面板](/zh/guide/repository)
- **把多个 Issue 作为一个任务处理**（0.42.1），交付为一个拉取请求，并关闭你选中的 Issue。→ [多个 Issue](/zh/guide/repository#handle-several-issues-as-one-task)
- **在智能体的设置面板中编辑它的全局指令**（0.42.0）——`CLAUDE.md`、`AGENTS.md` 及其对应文件，覆盖十六个智能体。→ [系统指令](/zh/guide/agents#system-instructions)
- **回应等待中的任务**（0.42.0）：等待权限、回答或计划审批的任务会以**去回应**为首要操作，你答复后它会自动继续。→ [当任务需要你时](/zh/guide/tasks#when-a-task-needs-you)
- **Codex 支持回合中途发消息，并会建议下一条提示词**（0.41.3），与 Claude Code 一样。→ [在智能体工作时插话](/zh/guide/conversations#talk-to-an-agent-mid-turn)
- **更安静的通知**（0.42.0）：**仅顶层会话**会让委派子会话的完成和错误不再发到聊天渠道和 Webhook，Webhook 载荷也会写明对话和智能体。→ [聊天渠道](/zh/guide/chat-channels#approve-and-follow-along)
- **关闭标签页后后台工作仍会继续**（0.42.1）：关闭或切换窗格、刷新网页，都不会再停止后台命令、Remote Control 或正在运行的子智能体。

此外还有：Claude Code 的思考摘要开关和 Fable 5.2、行内 `$…$` 数学公式、桌面版按路径粘贴复制的文件、ZCode 的 Coding Plan API Key 与 `/rename`、OpenCode 按百分比设置的压缩预留、最大 64 MB 的工作区背景，以及会加载你的 profile 的 PowerShell 终端。详见 [0.41.2](https://github.com/spacering-net/codeg/releases/tag/v0.41.2) 到 [0.42.3](https://github.com/spacering-net/codeg/releases/tag/v0.42.3) 的发布说明。

### 兼容性检查 {#compatibility-checks}

- **Claude Code 新会话默认以 Auto 模式启动**（自 0.42.1 起），除非你选过其他模式或设置了 `permissions.defaultMode`。如果 API 网关无法响应 Auto 的检查，本该由 Auto 审查的命令会在没有权限卡片的情况下被拒绝；请切换到 **Manual**。不应修改文件的命令行审查需要加上 `--mode default`。→ [Claude Code](/zh/guide/agent-setup#claude-code)
- **OpenCode 要求 2.0 及以上版本**；Codeg 推荐 **2.2.7**。OpenCode 2 不支持 **SSE** MCP 服务器——请将服务器改用 streamable HTTP，或不要为它分配 OpenCode。它的 `/goal`、`/init` 和 `/review` 命令仍不显示进度。→ [OpenCode](/zh/guide/agent-setup#opencode)
- **Hermes 0.23** 在挂载了 Codeg 的 MCP 服务器时，无法连接它自己 `config.yaml` 中的 MCP 服务器；在部分系统上，断开一个 Hermes 对话可能会中断其他对话。→ [Hermes](/zh/guide/agent-setup#hermes)
- **ZCode 3.18 及以上版本**会加密存储凭据，只有 Codeg 在 0.43.0 中固定的桥接器版本才能读取；使用旧版桥接器时，每一轮都会失败。→ [ZCode](/zh/guide/agent-setup#zcode)

### 从 0.40 或更早版本升级 {#whats-new-in-0-41-1}

[0.41.1 版本](https://github.com/spacering-net/codeg/releases/tag/v0.41.1)新增了[标签页跟随文件夹](/zh/guide/workspace#tabs-follow-folder)、[回复中的 HTML 预览](/zh/guide/conversations#html-previews-in-replies)、[MiniMax Code](/zh/guide/agent-setup#minimax-code)、[从供应商获取的模型列表](/zh/guide/authentication#fetch-models-from-your-provider)、将[任何待验收任务交付为拉取请求](/zh/guide/tasks#deliver-as-a-pull-request)，以及在设置中管理 ZCode 技能。它还将 OpenCode 升级到 2.0；从旧构建升级的 **macOS 独立服务器**需要重新授予一次「完全磁盘访问」等隐私权限。

### 从 0.39 或更早版本升级 {#whats-new-in-0-40-0}

- **在一条时间线上跟进智能体的工作。** 思考、命令、文件查阅、编辑、计划和子智能体任务都按步骤排列。**执行过程**标题汇总步数、耗时和失败情况；点击标题可折叠中间过程，点击尚未解决的失败提示可直接跳到对应步骤。→ [执行过程时间线](/zh/guide/conversations#activity-timeline)
- **就地查看命令和文件改动。** 命令详情展示完整命令或脚本及其输出，并提供各自的复制按钮。文件编辑支持行内和左右对比、同步横向滚动，点击详情顶部的文件名可在工作区打开文件。
- **权限决定随会话保留。** 工具步骤上的**已批准一次**、**总是允许**或**已拒绝**记录在重新打开会话后仍可查看。这些记录说明当时的处理结果，后续调用仍由智能体的权限设置决定。
- **随时查看子智能体进度。** 任务行展示分配的任务、已完成步数、当前工作和最新结果；收起主回复后，仍在执行的任务也会保留。→ [观看团队工作](/zh/guide/multi-agent#watch-the-team-work)

长对话和流式回复的滚动也更加流畅。展开的思考能保留换行和列表，命令退出码显示更准确，Codex 在压缩上下文期间就会显示提示。完整变化见 [0.40.0 发布说明](https://github.com/spacering-net/codeg/releases/tag/v0.40.0)。

### 从 0.38 或更早版本升级 {#coming-from-0-38-or-earlier}

[0.39.0](https://github.com/spacering-net/codeg/releases/tag/v0.39.0) 还新增了[智能体生成提交信息](/zh/guide/git#generate-a-commit-message)、[在本机执行远程文件夹的常用命令](/zh/guide/workspace#run-a-saved-command)，以及 `codeg-server` 可选的[代理登录](/zh/getting-started/configuration#sign-in-through-an-identity-aware-proxy)。侧栏的**最近**分区改为按最近活动排序，每次显示十个对话。

## 升级前的准备 {#before-you-update}

1. **先结束正在执行的工作。** 等智能体回复、CLI 运行、自动化和待办任务到达合适的停止点。重启 Codeg 会结束正在运行的智能体和终端。
2. **找到这次要更新的实例的数据目录。** 如果设置过 `CODEG_DATA_DIR`，以该路径为准，否则使用下表中的默认位置。Docker 请备份挂载到 `/data` 的宿主机目录或命名卷。远程工作区请到对应服务器上备份服务器的数据。
3. **停止 Codeg 后再复制数据。** 完全退出桌面应用，或停止服务器、容器及其监督进程或服务管理器。将**整个数据目录**复制到独立位置，保留 `codeg.db` 和旁边的全部文件；副本应放在运行目录和容器之外。只复制仍在使用中的 SQLite 数据库可能遗漏最近写入的内容。
4. **另外保存项目文件和智能体历史。** Codeg 的数据目录不包含你的代码仓库，也不包含所有智能体 CLI 自己的记录。如果需要，请分别备份。停止 Codeg 前也可以导出 [`.codegbak` 备份](/zh/reference/settings/system#backup)，按需启用**包含对话内容**；如需降级版本，仍请保留停止后复制的数据目录。

| 平台 | 桌面应用 | 独立服务器 |
| --- | --- | --- |
| macOS | `~/Library/Application Support/app.codeg` | `~/Library/Application Support/codeg` |
| Linux | `~/.local/share/app.codeg` | `~/.local/share/codeg` |
| Windows | `%APPDATA%\app.codeg` | `%APPDATA%\codeg` |

表中是操作系统的默认位置；自定义系统数据路径和 `CODEG_DATA_DIR` 优先。`~/.codeg/preferences.json` 只是桌面偏好文件，**不是**主数据库。备份可能包含凭据，请妥善保管。→ [数据位置](/zh/getting-started/configuration#where-codeg-stores-its-data)

## 更新当前安装 {#update-your-installation}

| 安装方式 | 更新步骤 |
| --- | --- |
| 桌面应用 | 打开**设置 → 系统 → 软件更新**，下载后选择**重启以更新**。也可以从[下载页](/zh/getting-started/installation)安装对应平台的新版本。 |
| Linux/macOS 独立服务器 | 备份完成后，启动现有服务器，在**设置 → 软件更新**中升级，或用对应平台的[服务器压缩包](/zh/getting-started/deployment#prebuilt-binaries)替换程序。保留原来的数据目录和环境变量。 |
| Windows 独立服务器 | 停止服务器，用 Windows 服务器压缩包替换二进制程序和随附的 Web 文件，再使用原来的数据目录和环境变量启动。Windows 不支持就地自更新。 |
| Docker | 停止旧容器、备份持久数据，拉取或构建 0.43.0 镜像，再用相同的挂载和环境变量重建容器。只在容器内就地更新，重建后会丢失程序更新。→ [Docker](/zh/getting-started/deployment#docker) |

从 **0.39.0** 起，Windows 下载完成后也会等待你点击**重启以更新**。但**从 0.38.0 升级的这一次**仍会在下载完成后立即关闭应用并安装，因为这个步骤由更新前的版本决定。

重启后，在设置中确认版本，并重新打开一个对话检查历史是否保留。如果已打开的浏览器标签页提示客户端与服务器版本不同，请刷新页面。

## 如果需要退回旧版 {#if-you-need-to-go-back}

1. 停止新版程序及其监督进程或服务管理器。
2. 将当前数据目录另行保存，避免覆盖升级后产生的工作。
3. 将**升级前的完整副本**恢复到该实例配置的数据位置。
4. 安装或选择与副本对应的旧版程序或 Docker 镜像，再使用恢复的数据启动。

只在升级后记录的工作不会出现在旧快照中。没有升级前副本时，请继续用新版读取迁移后的数据；单独换回更早版本的程序无法让数据库恢复兼容。请勿修改 SQLite 的迁移记录来强行启动旧版。

## 下一步 {#next-steps}

- [**对话**](/zh/guide/conversations)——使用执行时间线、检查文件改动和处理权限请求。
- [**部署**](/zh/getting-started/deployment#keep-your-server-up-to-date)——服务器更新、监督进程和容器持久化。
- [**数据与同步**](/zh/reference/settings/system#backup-restore)——导出备份与恢复数据。
