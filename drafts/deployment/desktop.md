# Desktop App

The desktop app is the **`codeg`** binary — a Tauri 2 application with window management, a system tray, and a built-in updater. It bundles the `codeg-mcp` companion automatically (as an `externalBin`), so [multi-agent delegation](/features/multi-agent-collaboration) works out of the box.

## Build & run

```bash
pnpm install

# Full desktop app (Tauri + Next.js, builds codeg-mcp sidecar automatically)
pnpm tauri dev

# Desktop release build (bundles codeg-mcp as externalBin)
pnpm tauri build
```

If you're iterating on the frontend and don't need delegation, skip the sidecar build:

```bash
CODEG_SKIP_SIDECAR=1 pnpm tauri dev
```

## Prerequisites

Building the desktop app requires the Tauri toolchain (Node.js, pnpm, Rust, and platform build dependencies). See [Development](/contributing/development) for the full prerequisite list and per-platform setup.
