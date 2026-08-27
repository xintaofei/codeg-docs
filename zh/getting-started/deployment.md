---
title: 部署
description: 使用 codeg-server 或 Docker 在 Linux 或 macOS 服务器上以无头方式运行 Codeg，并从任意浏览器访问你的工作区。
---

# 部署

**`codeg-server`** 就是以无头方式运行的 Codeg——与桌面应用相同的智能体、会话、频道和[多智能体协作](/zh/guide/multi-agent)，由你掌控的机器提供服务，并可在任意浏览器中访问。只需在一台常开的服务器上部署一次，你的工作区便可从任何设备访问，无需桌面端。每个请求都由访问令牌守护。

::: tip 只是想偶尔在浏览器中使用桌面应用？
那你不需要服务器——打开 [Web 服务](/zh/reference/settings/web-service)，正在运行的桌面应用便会通过网络提供自身。当你想让 Codeg 在**没有**桌面端的情况下运行时——常开、无头或共享——再考虑 `codeg-server`。
:::

## 部署方式 {#ways-to-deploy}

| 方式 | 最适合 |
| ------ | -------- |
| [**Docker**](#docker) | 最简单的持久化部署——隔离、自我监督、一条命令搞定 |
| [**一行命令安装**](#one-line-install-linux-macos) | 将原生二进制文件直接装到 Linux 或 macOS 主机上 |
| [**预构建二进制文件**](#prebuilt-binaries) | 手动、离线或完全受控的安装 |
| [**从源码构建**](#build-from-source) | 自定义补丁或不受支持的平台 |

每种方式都会安装相同的两个二进制文件——`codeg-server` 及其 `codeg-mcp` 伴生程序——因此多智能体委派在服务器上的运作方式与桌面端完全一致。

## Docker {#docker}

最快的持久化部署只需一条命令：

```bash
docker run -d -p 3080:3080 -v codeg-data:/data ghcr.io/xintaofei/codeg:latest
```

这就是一次完整的安装：该镜像捆绑了 Web 界面、`git` 和 `ssh`，以自带的监督进程作为 PID 1 运行，并将所有内容持久化到 `codeg-data` 卷中。首次启动时，它会生成一个随机访问令牌并写入日志——用 `docker logs` 读取它，或者设置你自己的令牌并挂载一个项目目录以处理本地仓库：

```bash
docker run -d -p 3080:3080 \
  -v codeg-data:/data \
  -v /path/to/projects:/projects \
  -e CODEG_TOKEN=your-secret-token \
  ghcr.io/xintaofei/codeg:latest
```

镜像以多架构（amd64 + arm64）形式发布到 `ghcr.io/xintaofei/codeg` 和 Docker Hub 上的 `xintaofei/codeg`。

### 使用 Compose {#with-compose}

对于任何长期运行的场景，请使用 Compose。将以下内容保存为 `docker-compose.yml`：

```yaml
services:
  codeg:
    image: ghcr.io/xintaofei/codeg:latest
    ports:
      - "3080:3080"
    volumes:
      - codeg-data:/data
      # - /path/to/projects:/projects   # optional: expose local repos
    environment:
      - CODEG_TOKEN=${CODEG_TOKEN:-}
      - CODEG_PORT=3080
      - CODEG_HOST=0.0.0.0
    restart: unless-stopped

volumes:
  codeg-data:
```

然后运行 `docker compose up -d`。通过 `.env` 文件或你的 shell 提供 `CODEG_TOKEN`。

::: warning 就地升级无法在容器重建后保留
服务器可以自我升级（参见[保持服务器更新](#keep-your-server-up-to-date)），但在 Docker 内部，该升级会写入正在运行的容器的可写层——而非镜像。你的 `/data` 卷会保留，但一旦容器被重建（`docker compose up --force-recreate`、重新执行 `docker run`，或在 `docker pull` 之后重建），升级后的二进制文件就会丢失。要永久升级，请拉取或构建新镜像，并据此重建容器。
:::

## 一行命令安装（Linux / macOS） {#one-line-install-linux-macos}

将原生二进制文件直接安装到主机上：

```bash
curl -fsSL https://raw.githubusercontent.com/xintaofei/codeg/main/install.sh | bash
```

这会将 `codeg-server` 和 `codeg-mcp` 放入 `/usr/local/bin`，并将捆绑的 Web 资源放入 `/usr/local/share/codeg/web`，仅在目标位置尚不可写时才使用 `sudo`。用 `--version` / `--dir` 来固定版本或更改位置：

```bash
curl -fsSL https://raw.githubusercontent.com/xintaofei/codeg/main/install.sh | bash -s -- --version v0.26.0 --dir ~/.local/bin
```

然后启动它。安装程序会为你打印出确切的命令；在无人值守的主机上添加 `--supervise`，这样失败的自我升级就会自动回滚：

```bash
CODEG_STATIC_DIR=/usr/local/share/codeg/web codeg-server --supervise
```

除非你自行设置 `CODEG_TOKEN`，否则访问令牌会在启动时打印到 stderr。

### Windows {#windows}

```powershell
irm https://raw.githubusercontent.com/xintaofei/codeg/main/install.ps1 | iex
```

这会安装到 `%LOCALAPPDATA%\codeg` 并将其添加到你的 PATH。用 `.\install.ps1 -Version v0.26.0` 固定版本。Windows 上禁用了自我更新——请通过重新运行安装程序来升级。

## 预构建二进制文件 {#prebuilt-binaries}

每个版本都会在 [Releases](https://github.com/xintaofei/codeg/releases) 页面提供一个自包含的服务器捆绑包——包含二进制文件和 Web 资源，均经过签名和校验和验证：

| 平台 | 文件 |
| -------- | ---- |
| Linux x64 | `codeg-server-linux-x64.tar.gz` |
| Linux arm64 | `codeg-server-linux-arm64.tar.gz` |
| macOS x64 | `codeg-server-darwin-x64.tar.gz` |
| macOS arm64 | `codeg-server-darwin-arm64.tar.gz` |
| Windows x64 | `codeg-server-windows-x64.zip` |

解压并运行——`web/` 文件夹与二进制文件放在一起，因此只需将 `CODEG_STATIC_DIR` 指向它：

```bash
tar xzf codeg-server-linux-x64.tar.gz
cd codeg-server-linux-x64
CODEG_STATIC_DIR=./web ./codeg-server --supervise
```

## 从源码构建 {#build-from-source}

```bash
pnpm install && pnpm build          # build the web UI
cd src-tauri
cargo build --release --bin codeg-server --no-default-features
cargo build --release --bin codeg-mcp --no-default-features   # delegation companion
CODEG_STATIC_DIR=../out ./target/release/codeg-server
```

完整的工具链和平台先决条件请见[开发](/zh/reference/development)指南。

## 配置 {#configuration}

`codeg-server` 完全通过环境变量进行配置——没有配置文件：

| 变量 | 默认值 | 说明 |
| -------- | ------- | ----------- |
| `CODEG_PORT` | `3080` | HTTP 端口 |
| `CODEG_HOST` | `0.0.0.0` | 绑定地址 |
| `CODEG_TOKEN` | *（随机）* | 访问令牌——若未设置，则在启动时打印到 stderr |
| `CODEG_DATA_DIR` | `~/.local/share/codeg` | SQLite 数据库、上传文件和资源 |
| `CODEG_STATIC_DIR` | `./web` | Web 界面目录（捆绑的 `web/` 导出） |
| `CODEG_MCP_BIN` | *（同级目录）* | `codeg-mcp` 的路径（当它不与服务器放在一起时） |

::: tip 生产环境中务必设置令牌
若不设置，`CODEG_TOKEN` 会被随机生成并打印到日志中——用于快速试用尚可，但对于任何长期部署都应设置你自己的令牌。可调项的完整列表——上传配额、ACP 超时、日志——见[配置](/zh/getting-started/configuration)。
:::

## 安全访问 {#access-it-securely}

默认情况下，服务器绑定 `0.0.0.0:3080`，因此任何能路由到该主机的设备都可以访问它。这正是远程访问所需要的——但这也意味着**令牌是你唯一的防线**。在公开主机上有两件事要做对：

- **将其置于 HTTPS 之后。** `codeg-server` 使用纯 HTTP 通信，没有内置的 TLS。请在其前面架设一个反向代理——Caddy、nginx 或 Traefik——由它终止 TLS 并转发到 `127.0.0.1:3080`。设置 `CODEG_HOST=127.0.0.1`，使得只有代理（而非整个网络）能够直接访问服务器。
- **对令牌保密。** 每个 HTTP 和 WebSocket 请求都必须携带它；不存在匿名访问。通过以新的 `CODEG_TOKEN` 重启来轮换它。

对于负载均衡器或编排器的存活探测，经过身份验证的 `POST /api/health`（携带 bearer 令牌）会返回 `{"status":"ok","version":"…"}`。

### 如果你的代理要求它自己的请求头 {#if-your-proxy-demands-its-own-headers}

有些网关在请求不带上它们要的东西时，压根不会转发——最常见的就是 Cloudflare Access 的 service token。从 **0.28.2** 起，远端工作区连接可以携带**自定义 HTTP 请求头**，桌面客户端发往该连接的每个请求都会带上它们。

它们位于该连接的管理对话框中，在访问令牌下方的**自定义请求头**一节里。除非这个连接已经配置过，否则这一节保持折叠，而且**值是掩码显示**的——因为这里的请求头几乎总是承载着某种凭据。它是一个列表而不是「名字唯一」的表，所以需要发两次的请求头也能用，同名的两个值会按你输入的顺序保持。

这些请求头属于**那个连接自己的主机**，不会去到别处——而且和访问令牌一样，只走你配置的那个协议：配置为 `https://box:8443` 的连接，不会把凭据交给 `http://box:8443`。

::: warning 这些存在数据库里，而不是密钥环里
一个连接的访问令牌及其自定义请求头，未加密地存放在该连接位于 Codeg SQLite 数据库中的那一行上——这与进入操作系统密钥环的 Git 和聊天凭据不同。任何能读到数据目录的人都能读到它们。→ [隐私与安全](/zh/reference/privacy#where-secrets-are-kept)
:::

## 保持服务器更新 {#keep-your-server-up-to-date}

与桌面应用一样，`codeg-server` 也可从**设置 → 软件更新**自我更新：它会下载适用于其平台的、经过签名的版本，验证签名，替换磁盘上的二进制文件和 Web 资源，然后重启——无需重新部署。上一个版本会被保留，因此同一界面上还提供了**回滚**。此功能仅限 Linux/macOS（Windows 上已禁用）。

在其监督进程下运行它，以确保升级安全：

```bash
./codeg-server --supervise
```

使用 `--supervise` 时，刚升级的进程如果在其试用窗口内未能启动，就会自动还原到上一个版本。不使用它时，服务器仍会就地更新（它会重新执行自身），但无法在启动失败时自动回滚。Docker 镜像已经在监督模式下运行。

::: tip 重启需要服务管理器
`--supervise` 能让服务器在升级过程中保持存活，但它无法在机器重启后把进程拉起来。Codeg 不附带 systemd 单元——如果你希望它自动恢复，请将 `codeg-server --supervise` 包装进你自己的单元，或依靠 Compose 的 `restart: unless-stopped`。
:::

## 后续步骤 {#next-steps}

- [**配置**](/zh/getting-started/configuration)——每一个环境变量和运行时选项。
- [**Web 服务**](/zh/reference/settings/web-service)——通过网络提供你现有的桌面应用，而无需运行服务器。
- [**支持的智能体**](/zh/guide/supported-agents)——在无头主机上安装和管理智能体。
- [**架构**](/zh/reference/architecture)——桌面应用与 `codeg-server` 如何共享同一个 Rust 内核。
