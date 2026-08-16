---
title: Deployment
description: Run Codeg headlessly on a Linux or macOS server with codeg-server or Docker, and reach your workspace from any browser.
---

# Deployment

**`codeg-server`** is Codeg running headless — the same agents, sessions, channels, and [multi-agent collaboration](/guide/multi-agent) as the desktop app, served from a machine you control and reachable in any browser. Stand it up once on an always-on server and your workspace is there from any device, no desktop required. Every request is guarded by an access token.

::: tip Just want your desktop app in a browser now and then?
You don't need a server for that — turn on [Web Service](/reference/settings/web-service) and your running desktop app serves itself over the network. Reach for `codeg-server` when you want Codeg running **without** a desktop: always-on, headless, or shared.
:::

## Ways to deploy

| Method | Best for |
| ------ | -------- |
| [**Docker**](#docker) | The simplest durable setup — isolated, self-supervising, one command |
| [**One-line install**](#one-line-install-linux-macos) | A native binary straight onto a Linux or macOS host |
| [**Prebuilt binary**](#prebuilt-binaries) | Manual, offline, or fully controlled installs |
| [**Build from source**](#build-from-source) | Custom patches or unsupported platforms |

Every method installs the same two binaries — `codeg-server` and its `codeg-mcp` companion — so multi-agent delegation works on the server exactly as it does on the desktop.

## Docker

The fastest durable deployment is one command:

```bash
docker run -d -p 3080:3080 -v codeg-data:/data ghcr.io/xintaofei/codeg:latest
```

That's a complete install: the image bundles the web UI, `git`, and `ssh`, runs under its own supervisor as PID 1, and persists everything to the `codeg-data` volume. On first start it generates a random access token and writes it to the logs — read it with `docker logs`, or set your own and mount a project directory to work on local repos:

```bash
docker run -d -p 3080:3080 \
  -v codeg-data:/data \
  -v /path/to/projects:/projects \
  -e CODEG_TOKEN=your-secret-token \
  ghcr.io/xintaofei/codeg:latest
```

Images are published multi-arch (amd64 + arm64) to `ghcr.io/xintaofei/codeg` and Docker Hub `xintaofei/codeg`.

### With Compose

For anything long-lived, use Compose. Save this as `docker-compose.yml`:

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

Then `docker compose up -d`. Provide `CODEG_TOKEN` through a `.env` file or your shell.

::: warning In-place upgrades don't survive a container recreate
The server can upgrade itself (see [Keep your server up to date](#keep-your-server-up-to-date)), but inside Docker that upgrade is written to the running container's writable layer — not the image. Your `/data` volume persists, but the upgraded binary is dropped the moment the container is recreated (`docker compose up --force-recreate`, a fresh `docker run`, or recreating after a `docker pull`). To upgrade permanently, pull or build a new image and recreate the container from it.
:::

## One-line install (Linux / macOS)

Install the native binary straight onto a host:

```bash
curl -fsSL https://raw.githubusercontent.com/xintaofei/codeg/main/install.sh | bash
```

This places `codeg-server` and `codeg-mcp` in `/usr/local/bin` and the bundled web assets in `/usr/local/share/codeg/web`, using `sudo` only if the target isn't already writable. Pin a version or change the location with `--version` / `--dir`:

```bash
curl -fsSL https://raw.githubusercontent.com/xintaofei/codeg/main/install.sh | bash -s -- --version v0.26.0 --dir ~/.local/bin
```

Then start it. The installer prints the exact command for you; add `--supervise` on an unattended host so a failed self-upgrade rolls back automatically:

```bash
CODEG_STATIC_DIR=/usr/local/share/codeg/web codeg-server --supervise
```

The access token is printed to stderr on startup unless you set `CODEG_TOKEN` yourself.

### Windows

```powershell
irm https://raw.githubusercontent.com/xintaofei/codeg/main/install.ps1 | iex
```

This installs to `%LOCALAPPDATA%\codeg` and adds it to your PATH. Pin a version with `.\install.ps1 -Version v0.26.0`. Self-update is disabled on Windows — upgrade by re-running the installer.

## Prebuilt binaries

Every release ships a self-contained server bundle — binaries plus web assets, signed and checksummed — on the [Releases](https://github.com/xintaofei/codeg/releases) page:

| Platform | File |
| -------- | ---- |
| Linux x64 | `codeg-server-linux-x64.tar.gz` |
| Linux arm64 | `codeg-server-linux-arm64.tar.gz` |
| macOS x64 | `codeg-server-darwin-x64.tar.gz` |
| macOS arm64 | `codeg-server-darwin-arm64.tar.gz` |
| Windows x64 | `codeg-server-windows-x64.zip` |

Extract and run — the `web/` folder ships next to the binary, so just point `CODEG_STATIC_DIR` at it:

```bash
tar xzf codeg-server-linux-x64.tar.gz
cd codeg-server-linux-x64
CODEG_STATIC_DIR=./web ./codeg-server --supervise
```

## Build from source

```bash
pnpm install && pnpm build          # build the web UI
cd src-tauri
cargo build --release --bin codeg-server --no-default-features
cargo build --release --bin codeg-mcp --no-default-features   # delegation companion
CODEG_STATIC_DIR=../out ./target/release/codeg-server
```

The full toolchain and platform prerequisites are in the [Development](/reference/development) guide.

## Configuration

`codeg-server` is configured entirely through environment variables — there's no config file:

| Variable | Default | Description |
| -------- | ------- | ----------- |
| `CODEG_PORT` | `3080` | HTTP port |
| `CODEG_HOST` | `0.0.0.0` | Bind address |
| `CODEG_TOKEN` | *(random)* | Access token — printed to stderr on start if unset |
| `CODEG_DATA_DIR` | `~/.local/share/codeg` | SQLite database, uploads, and assets |
| `CODEG_STATIC_DIR` | `./web` | Web UI directory (the bundled `web/` export) |
| `CODEG_MCP_BIN` | *(sibling)* | Path to `codeg-mcp`, if it doesn't sit next to the server |

::: tip Always set a token in production
Left unset, `CODEG_TOKEN` is generated randomly and printed to the logs — fine for a quick trial, but set your own for anything durable. The complete list of tunables — upload quotas, ACP timeouts, logging — lives in [Configuration](/getting-started/configuration).
:::

## Access it securely

By default the server binds `0.0.0.0:3080`, so it's reachable from any device that can route to the host. That's exactly what you want for remote access — which also means the **token is your only guard**. Two things to get right on a public host:

- **Put it behind HTTPS.** `codeg-server` speaks plain HTTP and has no built-in TLS. Front it with a reverse proxy — Caddy, nginx, or Traefik — that terminates TLS and forwards to `127.0.0.1:3080`. Set `CODEG_HOST=127.0.0.1` so only the proxy, not the whole network, can reach the server directly.
- **Keep the token secret.** Every HTTP and WebSocket request must carry it; there is no anonymous access. Rotate it by restarting with a new `CODEG_TOKEN`.

For a load balancer or orchestrator liveness probe, an authenticated `POST /api/health` (carrying the bearer token) returns `{"status":"ok","version":"…"}`.

## Keep your server up to date

Like the desktop app, `codeg-server` updates itself from **Settings → Software Update**: it downloads the signed release for its platform, verifies the signature, swaps the binaries and web assets on disk, and restarts — no redeploy. The previous version is retained, so the same screen offers a **Roll back**. This is Linux/macOS only (disabled on Windows).

Run it under its supervisor to make upgrades safe:

```bash
./codeg-server --supervise
```

With `--supervise`, a freshly upgraded process that fails to boot within its trial window is automatically reverted to the previous version. Without it, the server still updates in place (it re-execs itself) but can't auto-roll-back a bad start. The Docker image already runs supervised.

::: tip Reboots need a service manager
`--supervise` keeps the server alive across upgrades, but it won't bring the process back after a machine reboot. Codeg doesn't ship a systemd unit — wrap `codeg-server --supervise` in your own unit, or rely on Compose's `restart: unless-stopped`, if you want it to return automatically.
:::

## Next steps

- [**Configuration**](/getting-started/configuration) — every environment variable and runtime option.
- [**Web Service**](/reference/settings/web-service) — serve your existing desktop app over the network instead of running a server.
- [**Supported Agents**](/guide/supported-agents) — install and manage agents on a headless host.
- [**Architecture**](/reference/architecture) — how the desktop app and `codeg-server` share one Rust core.
