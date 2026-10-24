---
title: 升级 Codeg
description: 了解 Codeg 0.40.0 的新功能、桌面版与服务器的更新方式，以及数据库迁移前的备份和恢复步骤。
---

# 升级 Codeg

**Codeg 0.40.0** 发布于 **2026 年 10 月 24 日**，为对话带来了全新的执行过程时间线。本页介绍新版变化和已有安装的升级步骤。首次安装请看[下载与安装](/zh/getting-started/installation)。

::: warning 升级到 0.40.0 前请先备份
0.40.0 首次启动时会更新 Codeg 的数据库，**0.39.0 无法使用更新后的同一份数据启动**。服务器的**回滚**按钮和重新安装旧版桌面应用只会恢复程序，不会撤销数据库迁移。如果之后可能需要退回 0.39.0，请在**新版首次启动前**保存一份数据目录副本。从 0.39.0 退回 0.38.0 也有同样的限制。
:::

## 0.40.0 有哪些变化 {#whats-new-in-0-40-0}

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
| Docker | 停止旧容器、备份持久数据，拉取或构建 0.40.0 镜像，再用相同的挂载和环境变量重建容器。只在容器内就地更新，重建后会丢失程序更新。→ [Docker](/zh/getting-started/deployment#docker) |

从 **0.39.0** 起，Windows 下载完成后也会等待你点击**重启以更新**。但**从 0.38.0 升级的这一次**仍会在下载完成后立即关闭应用并安装，因为这个步骤由更新前的版本决定。

重启后，在设置中确认版本，并重新打开一个对话检查历史是否保留。如果已打开的浏览器标签页提示客户端与服务器版本不同，请刷新页面。

## 如果需要退回旧版 {#if-you-need-to-go-back}

1. 停止新版程序及其监督进程或服务管理器。
2. 将当前数据目录另行保存，避免覆盖升级后产生的工作。
3. 将**升级前的完整副本**恢复到该实例配置的数据位置。
4. 安装或选择与副本对应的旧版程序或 Docker 镜像，再使用恢复的数据启动。

只在升级后记录的工作不会出现在旧快照中。没有升级前副本时，请继续用 0.40.0 读取迁移后的数据；单独换回 0.39.0 的程序无法让数据库恢复兼容。请勿修改 SQLite 的迁移记录来强行启动旧版。

## 下一步 {#next-steps}

- [**对话**](/zh/guide/conversations)——使用执行时间线、检查文件改动和处理权限请求。
- [**部署**](/zh/getting-started/deployment#keep-your-server-up-to-date)——服务器更新、监督进程和容器持久化。
- [**数据与同步**](/zh/reference/settings/system#backup-restore)——导出备份与恢复数据。
