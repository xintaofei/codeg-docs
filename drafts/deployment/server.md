# Standalone Server

Codeg can run as a standalone web server without a desktop environment. Run `codeg-server` on any Linux/macOS machine and access it from a browser.

## Option 1: One-line install (Linux / macOS)

```bash
curl -fsSL https://raw.githubusercontent.com/xintaofei/codeg/main/install.sh | bash
```

Install a specific version or to a custom directory:

```bash
curl -fsSL https://raw.githubusercontent.com/xintaofei/codeg/main/install.sh | bash -s -- --version v0.5.2 --dir ~/.local/bin
```

Then run:

```bash
codeg-server
```

## Option 2: One-line install (Windows PowerShell)

```powershell
irm https://raw.githubusercontent.com/xintaofei/codeg/main/install.ps1 | iex
```

Or install a specific version:

```powershell
.\install.ps1 -Version v0.5.2
```

## Option 3: Download from GitHub Releases

Pre-built binaries (with bundled web assets) are available on the [Releases](https://github.com/xintaofei/codeg/releases) page:

| Platform    | File                               |
| ----------- | ---------------------------------- |
| Linux x64   | `codeg-server-linux-x64.tar.gz`    |
| Linux arm64 | `codeg-server-linux-arm64.tar.gz`  |
| macOS x64   | `codeg-server-darwin-x64.tar.gz`   |
| macOS arm64 | `codeg-server-darwin-arm64.tar.gz` |
| Windows x64 | `codeg-server-windows-x64.zip`     |

```bash
# Example: download, extract, and run
tar xzf codeg-server-linux-x64.tar.gz
cd codeg-server-linux-x64
CODEG_STATIC_DIR=./web ./codeg-server
```

## Option 4: Docker

See the dedicated [Docker](/deployment/docker) guide.

## Option 5: Build from source

```bash
pnpm install && pnpm build          # build frontend
cd src-tauri
cargo build --release --bin codeg-server --no-default-features
cargo build --release --bin codeg-mcp --no-default-features    # delegation companion
CODEG_STATIC_DIR=../out ./target/release/codeg-server          # codeg-mcp is picked up as a sibling
```

If you keep the two binaries in separate directories, set `CODEG_MCP_BIN=/abs/path/to/codeg-mcp` so the runtime can still find the companion; without it, multi-agent delegation is silently disabled.

## Run under the supervisor

For unattended deployments, start the server with `--supervise` so a failed in-place upgrade is automatically rolled back:

```bash
CODEG_STATIC_DIR=./web ./codeg-server --supervise
```

See [Configuration → In-place updates](/deployment/configuration#in-place-updates) for details.
