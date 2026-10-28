---
title: 升级 Codeg
description: 了解 Codeg 0.41.1 的新功能、OpenCode 2 兼容性、桌面版与服务器的更新方式，以及数据备份和恢复步骤。
---

# 升级 Codeg

**Codeg 0.41.1** 发布于 **2026 年 10 月 28 日**，新增文件夹独立标签页与分屏布局、对话内 HTML 预览、MiniMax Code 和 OpenCode 2 适配，并改进模型选择与任务交付。本页介绍新版变化和已有安装的升级步骤。首次安装请看[下载与安装](/zh/getting-started/installation)。

::: warning 从 0.40.0 或更早版本升级前请先备份
本版新增任务交付相关的数据库迁移，**0.40.0 及更早版本无法使用更新后的同一份数据启动**。服务器的**回滚**按钮和重新安装旧版桌面应用只会恢复程序，不会撤销数据库迁移。如果之后可能需要降级，请在**新版首次启动前**保存完整数据目录的副本。此前从 0.40.0 退回 0.39.0、从 0.39.0 退回 0.38.0 时，也需要恢复对应版本的数据。
:::

## 0.41.1 有哪些变化 {#whats-new-in-0-41-1}

- **切换项目时一起切换标签页与布局。** 在侧栏开启**显示选项 → 标签页跟随文件夹**，即可分别保留各文件夹的会话、文件和分屏。切换时，草稿、未保存的编辑和正在运行的会话都会保留。→ [标签页跟随文件夹](/zh/guide/workspace#tabs-follow-folder)
- **在回复中预览 HTML。** 开启**设置 → 外观 → 聊天 HTML 渲染**，即可查看与 Markdown 混排的静态 HTML/CSS 卡片和图表，并在**预览**与**代码**之间切换。→ [回复中的 HTML 预览](/zh/guide/conversations#html-previews-in-replies)
- **直接使用 MiniMax Code。** 连接已安装的 `mcode`，沿用它的登录与供应商配置，并使用 MCP 工具和多智能体委派。→ [MiniMax Code 配置](/zh/guide/agent-setup#minimax-code)
- **从供应商列表选择模型。** 支持的模型字段新增获取、搜索、刷新和重试控件。Codex 的模型列表集中管理，可选内置或供应商来源，并自动刷新。→ [获取供应商模型](/zh/guide/authentication#fetch-models-from-your-provider)
- **待验收任务可以交付为 PR。** GitHub、GitLab 和 Gitea/Forgejo 也支持交付未关联 Issue 的任务。保留待验收状态，即可继续处理并更新同一个请求。→ [交付为拉取请求](/zh/guide/tasks#deliver-as-a-pull-request)
- **在设置中管理 ZCode 技能。** 和其他智能体一样启用内置技能、编辑自有技能或导入技能。Experts 同步更新至 **Superpowers v7.0.1**，包含会话诊断。→ [技能](/zh/guide/skills)

执行过程时间线改进了命令结果说明，并在底部提供收起按钮。用量筛选包含自定义智能体，TRAE CLI 总量计入原生子智能体消耗，重新打开会话后也能更可靠地保留已记录的用量与耗时。完整变化见 [0.41.1 发布说明](https://github.com/spacering-net/codeg/releases/tag/v0.41.1)。

### 兼容性检查 {#compatibility-checks}

- **OpenCode 要求 2.0 及以上版本。** Codeg 推荐 **2.2.0**。打开会话前请先升级已有的 1.x 安装，并使用兼容 OpenCode 2 的插件。新版供应商、权限和插件编辑器会保留 JSONC 注释。→ [OpenCode](/zh/guide/agent-setup#opencode)
- **OpenCode 2 不支持 SSE MCP 服务器。** 如果服务器支持，请改用 **streamable HTTP**（`http`），否则取消为它分配 OpenCode。→ [MCP 传输方式](/zh/guide/mcp#choose-which-agents-get-a-server)
- **macOS 独立服务器需要重新授权一次。** 从旧构建升级时，请重新授予「完全磁盘访问」等所需隐私权限。新的签名方式会在后续更新中保留这些授权。

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
| Docker | 停止旧容器、备份持久数据，拉取或构建 0.41.1 镜像，再用相同的挂载和环境变量重建容器。只在容器内就地更新，重建后会丢失程序更新。→ [Docker](/zh/getting-started/deployment#docker) |

从 **0.39.0** 起，Windows 下载完成后也会等待你点击**重启以更新**。但**从 0.38.0 升级的这一次**仍会在下载完成后立即关闭应用并安装，因为这个步骤由更新前的版本决定。

重启后，在设置中确认版本，并重新打开一个对话检查历史是否保留。如果已打开的浏览器标签页提示客户端与服务器版本不同，请刷新页面。

## 如果需要退回旧版 {#if-you-need-to-go-back}

1. 停止新版程序及其监督进程或服务管理器。
2. 将当前数据目录另行保存，避免覆盖升级后产生的工作。
3. 将**升级前的完整副本**恢复到该实例配置的数据位置。
4. 安装或选择与副本对应的旧版程序或 Docker 镜像，再使用恢复的数据启动。

只在升级后记录的工作不会出现在旧快照中。没有升级前副本时，请继续用新版读取迁移后的数据；单独换回 0.40.0 或更早版本的程序无法让数据库恢复兼容。请勿修改 SQLite 的迁移记录来强行启动旧版。

## 下一步 {#next-steps}

- [**对话**](/zh/guide/conversations)——使用执行时间线、检查文件改动和处理权限请求。
- [**部署**](/zh/getting-started/deployment#keep-your-server-up-to-date)——服务器更新、监督进程和容器持久化。
- [**数据与同步**](/zh/reference/settings/system#backup-restore)——导出备份与恢复数据。
