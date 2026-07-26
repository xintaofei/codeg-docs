---
title: 开发
description: 开发 —— 从源码构建 Codeg。前置要求、三个二进制文件及各自的编译方式、日常开发流程，以及 lint、测试和检查命令。
---

# 开发

本页面向**从源码构建 Codeg** —— 无论是为了对它做二次开发、自行打包，还是运行一个未发布的构建。Codeg 是单个 Cargo 工作区，产出三个 Rust 二进制文件外加一个 [Next.js](https://nextjs.org/) 前端，其工具链也反映了这一点：你既需要 Node 环境，也需要 Rust 环境。下面的命令正是项目自身所用的；除非另有说明，请从仓库根目录运行它们。

## 前置要求 {#prerequisites}

| 工具 | 版本 | 用于 |
| ---- | ------- | --- |
| **Node.js** | `>=22`（推荐） | 前端和 `pnpm` 脚本 |
| **pnpm** | `>=10` | 仓库锁定使用的包管理器 |
| **Rust** | stable（2021 版） | `codeg_lib` 核心和全部三个二进制文件 |
| **Tauri 2 构建依赖** | — | 仅 **桌面** 二进制文件（`codeg`） |

只有在构建**桌面**应用时才需要 Tauri 系统库；服务器和 MCP 伴生程序无需它们即可编译。在 Debian/Ubuntu 上：

```bash
sudo apt-get update
sudo apt-get install -y \
  libwebkit2gtk-4.1-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \
  patchelf
```

（macOS 和 Windows 有各自的 Tauri 前置要求 —— 参见 [Tauri 2 前置要求指南](https://v2.tauri.app/start/prerequisites/)。）

然后安装一次 JavaScript 依赖：

```bash
pnpm install
```

## 三个二进制文件 {#the-three-binaries}

一切都从单个工作区、在共享的 `codeg_lib` crate 之上构建 —— [架构](/zh/reference/architecture)页面解释了这一设计。二进制文件之间的差异在于一个 **Cargo 特性开关**：*默认*特性构建开启了 Tauri GUI 的**桌面**应用，而 `--no-default-features` 则将同一核心以**无头**方式编译为服务器和伴生程序。

| 二进制文件 | 它是什么 | 构建 |
| ------ | ---------- | ----- |
| **`codeg`** | Tauri 桌面应用（窗口、托盘、更新器） | `pnpm tauri build` · `pnpm tauri dev` |
| **`codeg-server`** | 用于浏览器 / 无头场景的独立 HTTP + WebSocket 服务器 | `pnpm server:build` · `pnpm server:dev` |
| **`codeg-mcp`** | 按次启动的 stdio MCP 伴生程序，为智能体 CLI 提供 `delegate_to_agent` 工具 | `pnpm tauri:prepare-sidecars` |

::: warning `codeg-mcp` 必须紧挨其父进程
运行时，伴生程序会在 `codeg` / `codeg-server` **旁边**被查找。`pnpm tauri dev` 和 `pnpm tauri build` 会为你构建并放置它，安装程序和 Docker 镜像也是如此。如果你把它构建在了别处 —— 或者运行的是一个手工构建的 `codeg-server` —— 请用 **`CODEG_MCP_BIN=/abs/path/codeg-mcp`** 让运行时指向它。当它无法被找到时，[多智能体委派](/zh/guide/multi-agent)会被跳过（记录一条警告），其余一切照常工作。
:::

## 日常命令 {#everyday-commands}

从最轻量到最完整的常见流程：

```bash
# Frontend only — Next.js dev server, no Rust involved
pnpm dev

# Frontend static export to out/
pnpm build

# Full desktop app — Tauri + Next.js; builds the codeg-mcp sidecar automatically
pnpm tauri dev

# Desktop release build — bundles codeg-mcp as an externalBin
pnpm tauri build

# Standalone server — no Tauri / GUI required
pnpm server:dev
pnpm server:build          # release binary → src-tauri/target/release/codeg-server

# Build the codeg-mcp companion on its own, for the host triple
pnpm tauri:prepare-sidecars   # output: src-tauri/binaries/codeg-mcp-<triple>
```

当你在迭代前端、且不需要委派时，跳过 sidecar 步骤可以节省时间：

```bash
CODEG_SKIP_SIDECAR=1 pnpm tauri dev
```

那样的构建禁用了委派，因此对于任何你打算交付的东西，请不要设置该标志。

## 检查与测试 {#checks-and-tests}

前端，从仓库根目录：

```bash
pnpm eslint .        # lint

pnpm test            # vitest, once
pnpm test:watch      # vitest, watch mode
pnpm test:coverage   # with coverage
```

Rust，从 **`src-tauri/`** 目录 —— 同样的特性开关拆分依然适用，因此每个二进制文件都在它实际交付时所处的模式下受到检查：

```bash
cargo check                                            # desktop (default features)
cargo check --no-default-features --bin codeg-server   # server mode
cargo check --no-default-features --bin codeg-mcp      # MCP companion
cargo clippy --all-targets --features test-utils -- -D warnings

cargo test --features test-utils                            # desktop (incl. integration)
cargo test --no-default-features --bin codeg-server --lib   # server mode
cargo insta review                                          # accept parser snapshot updates
```

`test-utils` 特性启用集成测试所需的测试辅助工具和固件；`cargo insta review` 用于当对话解析器的某项改动移动了已存储的快照、而你想接受新输出时。

## 从源码构建服务器 {#building-the-server-from-source}

要在没有桌面工具链的情况下产出一个可运行的服务器，先构建前端，然后并排构建两个无头二进制文件：

```bash
pnpm install && pnpm build                                      # frontend → out/
cd src-tauri
cargo build --release --bin codeg-server --no-default-features
cargo build --release --bin codeg-mcp    --no-default-features  # delegation companion
CODEG_STATIC_DIR=../out ./target/release/codeg-server           # codeg-mcp picked up as a sibling
```

`CODEG_STATIC_DIR` 让服务器指向你刚构建的静态导出产物。由于两个二进制文件都落在 `target/release/` 中，服务器会自动将 `codeg-mcp` 作为同级找到；若把它们分散到不同目录，你就又需要 `CODEG_MCP_BIN` 了。至于运行服务器的*已打包*方式 —— 安装脚本、发布 tarball、Docker —— 参见[部署](/zh/getting-started/deployment)，环境变量的完整清单则见[配置](/zh/getting-started/configuration)。

::: tip 让运行中的服务器指向一个新构建的伴生程序
只重新构建了 `codeg-mcp`，并想让一个手动启动的 `codeg-server` 无需重装即可使用它？导出它的绝对路径：

```bash
export CODEG_MCP_BIN=$(pwd)/src-tauri/target/release/codeg-mcp
```
:::

## 值得了解 {#good-to-know}

- **Node 用于前端，Rust 用于核心。** 每次构建都需要两套工具链；只有**桌面**二进制文件额外需要 Tauri 系统库。
- **默认特性 = 桌面，`--no-default-features` = 无头。** 正是这一个特性开关把共享核心变成 GUI 应用或服务器 / 伴生程序 —— 它是贯穿本页每一条构建和检查命令的主线。
- **`pnpm tauri dev` / `build` 会处理 sidecar。** 你很少直接调用 `tauri:prepare-sidecars`；它作为桌面构建的一部分运行，而当你不需要委派时，`CODEG_SKIP_SIDECAR=1` 可将其跳过。
- **让 `codeg-mcp` 紧挨其父进程。** 最常见的源码构建坑 —— 如果委派悄无声息地什么都不做，检查一下伴生程序是否是同级，或者 `CODEG_MCP_BIN` 是否已设置。

## 相关内容 {#related}

- [架构](/zh/reference/architecture) —— 这些命令所编译的一核心 / 三二进制文件设计。
- [部署](/zh/getting-started/deployment) —— 服务器构建完成后运行 `codeg-server` 的已打包方式。
- [配置](/zh/getting-started/configuration) —— 运行时环境变量，包括 `CODEG_STATIC_DIR` 和 `CODEG_MCP_BIN`。（`CODEG_SKIP_SIDECAR` 是构建期标志，介绍在本页。）
- [使用多个智能体](/zh/guide/multi-agent) —— `codeg-mcp` 伴生程序所驱动的委派功能。
