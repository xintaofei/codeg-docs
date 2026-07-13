# Getting Started

Codeg runs as a **desktop app**, a **standalone server** you reach from any browser, or in **Docker**. The fastest way to try it is the one-line server install or Docker.

## One-line install (Linux / macOS)

```bash
curl -fsSL https://raw.githubusercontent.com/xintaofei/codeg/main/install.sh | bash
```

Then start the server:

```bash
codeg-server
```

Install a specific version or to a custom directory:

```bash
curl -fsSL https://raw.githubusercontent.com/xintaofei/codeg/main/install.sh | bash -s -- --version v0.5.2 --dir ~/.local/bin
```

## One-line install (Windows PowerShell)

```powershell
irm https://raw.githubusercontent.com/xintaofei/codeg/main/install.ps1 | iex
```

Or install a specific version:

```powershell
.\install.ps1 -Version v0.5.2
```

## Docker

```bash
# Using Docker Compose (recommended)
docker compose up -d

# Or run directly with Docker
docker run -d -p 3080:3080 -v codeg-data:/data ghcr.io/xintaofei/codeg:latest
```

By default the server listens on port `3080` and prints an auth token to stderr on start.

::: tip Looking for more?
Want the desktop app, every server install option, or to build from source? See [Deployment](/deployment/) and [Development](/contributing/development).
:::

## Next steps

- [Supported Agents](/guide/supported-agents) — connect the coding agents you already use
- [Configuration](/deployment/configuration) — ports, tokens, data directories, and upload quotas
- [Features](/features/) — multi-agent collaboration, office documents, automations, and more
