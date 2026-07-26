---
title: Development
description: Development — build Codeg from source. Prerequisites, the three binaries and how to compile each, the everyday dev loops, and the lint, test, and check commands.
---

# Development

This page is for **building Codeg from source** — to hack on it, package it yourself, or run an unreleased build. Codeg is a single Cargo workspace that produces three Rust binaries plus a [Next.js](https://nextjs.org/) frontend, and the toolchain reflects that: you need both a Node and a Rust setup. The commands below are the ones the project itself uses; run them from the repository root unless noted.

## Prerequisites

| Tool | Version | For |
| ---- | ------- | --- |
| **Node.js** | `>=22` (recommended) | the frontend and the `pnpm` scripts |
| **pnpm** | `>=10` | the package manager the repo is pinned to |
| **Rust** | stable (2021 edition) | the `codeg_lib` core and all three binaries |
| **Tauri 2 build deps** | — | the **desktop** binary only (`codeg`) |

The Tauri system libraries are needed only if you're building the **desktop** app; the server and the MCP companion compile without them. On Debian/Ubuntu:

```bash
sudo apt-get update
sudo apt-get install -y \
  libwebkit2gtk-4.1-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \
  patchelf
```

(macOS and Windows have their own Tauri prerequisites — see the [Tauri 2 prerequisites guide](https://v2.tauri.app/start/prerequisites/).)

Then install the JavaScript dependencies once:

```bash
pnpm install
```

## The three binaries

Everything builds from one workspace over the shared `codeg_lib` crate — the [Architecture](/reference/architecture) page explains that design. What differs between the binaries is a **Cargo feature flag**: the *default* features build the **desktop** app with Tauri's GUI on, while `--no-default-features` compiles the same core **headless** for the server and the companion.

| Binary | What it is | Build |
| ------ | ---------- | ----- |
| **`codeg`** | Tauri desktop app (window, tray, updater) | `pnpm tauri build` · `pnpm tauri dev` |
| **`codeg-server`** | Standalone HTTP + WebSocket server for browser / headless use | `pnpm server:build` · `pnpm server:dev` |
| **`codeg-mcp`** | Per-launch stdio MCP companion that gives agent CLIs the `delegate_to_agent` tool | `pnpm tauri:prepare-sidecars` |

::: warning `codeg-mcp` must sit next to its parent
At runtime the companion is looked up **beside** `codeg` / `codeg-server`. `pnpm tauri dev` and `pnpm tauri build` build and place it for you, and installers and the Docker image do the same. If you build it somewhere else — or run a hand-built `codeg-server` — point the runtime at it with **`CODEG_MCP_BIN=/abs/path/codeg-mcp`**. When it can't be found, [multi-agent delegation](/guide/multi-agent) is skipped (one warning is logged) and everything else keeps working.
:::

## Everyday commands

The common loops, from the lightest to the fullest:

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

When you're iterating on the frontend and don't need delegation, skip the sidecar step to save time:

```bash
CODEG_SKIP_SIDECAR=1 pnpm tauri dev
```

That build has delegation disabled, so leave the flag unset for anything you intend to ship.

## Checks and tests

Frontend, from the repository root:

```bash
pnpm eslint .        # lint

pnpm test            # vitest, once
pnpm test:watch      # vitest, watch mode
pnpm test:coverage   # with coverage
```

Rust, from **`src-tauri/`** — the same feature-flag split applies, so each binary is checked in the mode it actually ships in:

```bash
cargo check                                            # desktop (default features)
cargo check --no-default-features --bin codeg-server   # server mode
cargo check --no-default-features --bin codeg-mcp      # MCP companion
cargo clippy --all-targets --features test-utils -- -D warnings

cargo test --features test-utils                            # desktop (incl. integration)
cargo test --no-default-features --bin codeg-server --lib   # server mode
cargo insta review                                          # accept parser snapshot updates
```

The `test-utils` feature enables the test helpers and fixtures the integration tests need; `cargo insta review` is for when a change to the conversation parsers shifts a stored snapshot and you want to accept the new output.

## Building the server from source

To produce a runnable server without the desktop toolchain, build the frontend, then the two headless binaries side by side:

```bash
pnpm install && pnpm build                                      # frontend → out/
cd src-tauri
cargo build --release --bin codeg-server --no-default-features
cargo build --release --bin codeg-mcp    --no-default-features  # delegation companion
CODEG_STATIC_DIR=../out ./target/release/codeg-server           # codeg-mcp picked up as a sibling
```

`CODEG_STATIC_DIR` points the server at the static export you just built. Because both binaries land in `target/release/`, the server finds `codeg-mcp` as a sibling automatically; split them across directories and you'll need `CODEG_MCP_BIN` again. For the *packaged* ways to run a server — install script, release tarball, Docker — see [Deployment](/getting-started/deployment), and [Configuration](/getting-started/configuration) for the full environment-variable list.

::: tip Point a running server at a fresh companion
Rebuilt just `codeg-mcp` and want a manually-launched `codeg-server` to use it without reinstalling? Export its absolute path:

```bash
export CODEG_MCP_BIN=$(pwd)/src-tauri/target/release/codeg-mcp
```
:::

## Good to know

- **Node for the frontend, Rust for the core.** Every build needs both toolchains; only the **desktop** binary additionally needs the Tauri system libraries.
- **Default features = desktop, `--no-default-features` = headless.** That one feature flag is what turns the shared core into either the GUI app or the server / companion — it's the thread running through every build and check command on this page.
- **`pnpm tauri dev` / `build` handles the sidecar.** You rarely call `tauri:prepare-sidecars` directly; it runs as part of the desktop build, and `CODEG_SKIP_SIDECAR=1` opts out when you don't need delegation.
- **Keep `codeg-mcp` next to its parent.** The most common source-build gotcha — if delegation quietly does nothing, check that the companion is a sibling or that `CODEG_MCP_BIN` is set.

## Related

- [Architecture](/reference/architecture) — the one-core / three-binary design these commands compile.
- [Deployment](/getting-started/deployment) — the packaged ways to run `codeg-server` once it's built.
- [Configuration](/getting-started/configuration) — the runtime environment variables, including `CODEG_STATIC_DIR` and `CODEG_MCP_BIN`. (`CODEG_SKIP_SIDECAR` is a build-time flag and lives on this page.)
- [Working with Multiple Agents](/guide/multi-agent) — the delegation feature the `codeg-mcp` companion powers.
