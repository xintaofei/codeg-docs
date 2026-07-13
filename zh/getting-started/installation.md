---
title: 安装
description: 在 macOS、Windows 或 Linux 上安装 Codeg 桌面应用——然后启用一个智能体并运行你的第一个会话。
---

# 安装

Codeg 有两种运行方式。大多数人需要的是**桌面应用**——一个面向 macOS、Windows 和 Linux 的原生应用，本页将对其进行介绍。若要在服务器上以无头方式运行 Codeg 并改从浏览器访问，请参见[部署](/zh/getting-started/deployment)。

## 下载 {#download}

<Download />

## 安装 {#install}

### macOS {#macos}

macOS 版本使用 Apple Developer ID 签名，并**经过 Apple 公证**，因此无需任何绕过 Gatekeeper 的操作即可打开。

1. 打开 `.dmg`——为 Apple Silicon（M 系列）选择 **aarch64**，为 Intel 选择 **x64**。
2. 将 **Codeg** 拖入 **Applications**。
3. 从 Applications 或 Spotlight 启动它。首次打开时，macOS 可能会要求你确认打开一个从互联网下载的应用。

### Windows {#windows}

1. 运行你下载的 `…_x64-setup.exe`（在 Arm 设备上则运行 `arm64` 安装程序）。
2. 如果 **SmartScreen** 显示“未知发布者”提示，请选择**更多信息 → 仍要运行**——该安装程序尚未附带 Authenticode 证书进行分发。
3. Codeg 完成安装并出现在开始菜单中。更新会被动应用（见下文）。

### Linux {#linux}

- **AppImage（x64）：** 赋予其可执行权限并运行——
  ```bash
  chmod +x codeg_*_amd64.AppImage
  ./codeg_*_amd64.AppImage
  ```
- **Debian / Ubuntu：** `sudo apt install ./codeg_*_amd64.deb`
- **Fedora / RHEL：** `sudo dnf install ./codeg-*.x86_64.rpm`

Codeg 的界面运行在 **WebKitGTK** 运行时（`libwebkit2gtk-4.1`）之上。`.deb` / `.rpm` 软件包会自动引入它；对于 AppImage，如果系统中尚未安装，则需你自行安装。arm64 没有发布 AppImage——请在该平台上使用 `.deb` 或 `.rpm`。

## 系统要求 {#system-requirements}

- 一个 64 位桌面操作系统：**macOS**（Apple Silicon 或 Intel）、**Windows 10/11**，或带有 WebKitGTK 的现代 **Linux** 发行版。
- 要*驱动*智能体，你至少需要安装一个智能体 CLI。Codeg 可以在 **设置 → 智能体**中为你安装和管理其中大多数——通过 `npx`、`uvx` 或预构建的二进制文件。少数（基于 `npx` 和 `uvx` 的）需要在你的 `PATH` 中有 **Node.js** 或 **[uv](https://docs.astral.sh/uv/)**。参见[支持的智能体](/zh/guide/supported-agents)。

::: tip 多智能体委派开箱即用
桌面应用捆绑了 `codeg-mcp` 伴生程序，因此[多智能体协作](/zh/guide/multi-agent)可立即使用——无需额外设置。
:::

## 首次运行 {#first-run}

三个步骤带你从全新安装走向运行中的会话：

1. **启用一个智能体。** 打开 **设置 → 智能体**，选择一个（Claude Code、Codex、Gemini……），让 Codeg 运行它的**预检**——它会标记出任何缺失项，并主动提出为你安装该智能体。→ [使用智能体](/zh/guide/agents)
2. **进行身份验证。** 使用该智能体自己的订阅登录、将其指向自定义端点，或使用模型提供商的 API 密钥。→ [身份验证与模型](/zh/guide/authentication)
3. **启动一个会话。** 打开一个项目文件夹，在 composer 中选择你的智能体和模型，然后发送你的第一条提示词。该智能体过去的会话会自动[导入到工作区](/zh/getting-started/#what-codeg-does)。

## 保持更新 {#staying-up-to-date}

桌面应用会自动保持最新。当新版本发布时，**设置 → 系统 → 软件更新**会下载经过签名的版本，将其换入并重启——同时保留上一个版本，以便你在需要时**回滚**。参见[系统设置](/zh/reference/settings/system)。

## 其他方式 {#alternatives}

- **从任意浏览器使用你的桌面应用**——启用 **设置 → Web 服务**，Codeg 便会通过网络提供其界面，并由访问令牌保护（并为手机提供二维码）。由于它监听所有网络接口，你可以从任何能连接到你机器的设备访问你的桌面会话——无需单独的服务器。→ [Web 服务](/zh/reference/settings/web-service)
- **在专用服务器上运行**——对于无头或团队使用场景，部署 `codeg-server` 并从任意浏览器使用 Codeg。→ [部署](/zh/getting-started/deployment)
- **从源码构建**——参见[开发](/zh/reference/development)指南。

## 后续步骤 {#next-steps}

- [**支持的智能体**](/zh/guide/supported-agents)——Codeg 聚合了哪些智能体，以及每个智能体将会话保存在何处。
- [**指南**](/zh/guide/)——多智能体协作、聊天频道、自动化等更多内容。
- [**配置**](/zh/getting-started/configuration)——环境变量与运行时选项。
