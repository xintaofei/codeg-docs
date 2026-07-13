# Development

Codeg builds three binaries — `codeg` (desktop), `codeg-server` (standalone), and `codeg-mcp` (delegation companion) — from a single pnpm + Cargo workspace.

## Requirements

- Node.js `>=22` (recommended)
- pnpm `>=10`
- Rust stable (2021 edition)
- Tauri 2 build dependencies (desktop mode only)

Linux (Debian/Ubuntu) example:

```bash
sudo apt-get update
sudo apt-get install -y \
  libwebkit2gtk-4.1-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \
  patchelf
```

## Common tasks

```bash
pnpm install

# Frontend only (Next.js dev server, no Rust)
pnpm dev

# Frontend static export to out/
pnpm build

# Full desktop app (Tauri + Next.js, builds codeg-mcp sidecar automatically)
pnpm tauri dev

# Desktop release build (bundles codeg-mcp as externalBin)
pnpm tauri build

# Standalone server (no Tauri/GUI required)
pnpm server:dev
pnpm server:build                  # release binary at src-tauri/target/release/codeg-server

# Build the codeg-mcp companion explicitly (for the host triple)
pnpm tauri:prepare-sidecars        # output: src-tauri/binaries/codeg-mcp-<triple>

# Skip sidecar prep when iterating on the frontend and you don't need delegation
CODEG_SKIP_SIDECAR=1 pnpm tauri dev
```

## Tests & checks

```bash
# Lint
pnpm eslint .

# Frontend tests (vitest)
pnpm test
pnpm test:watch
pnpm test:coverage

# Rust checks (run in src-tauri/)
cargo check                                                     # desktop (default features)
cargo check --no-default-features --bin codeg-server            # server mode
cargo check --no-default-features --bin codeg-mcp               # MCP companion
cargo clippy --all-targets --features test-utils -- -D warnings

# Rust tests
cargo test --features test-utils                                # desktop (incl. integration)
cargo test --no-default-features --bin codeg-server --lib       # server mode
cargo insta review                                              # accept parser snapshot updates
```

::: tip
When you have a fresh `codeg-mcp` build under `src-tauri/target/release/` and want to point a manually-launched `codeg-server` at it without reinstalling, export `CODEG_MCP_BIN=$(pwd)/src-tauri/target/release/codeg-mcp`.
:::

For the architecture behind these binaries, see [Reference → Architecture](/reference/architecture).
