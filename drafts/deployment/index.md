# Deployment

Codeg ships three Rust binaries from a single workspace, so you can run it however you like — on your desktop, as a browser-accessible server, or in a container.

| Binary         | Role                                                                                                         | Build                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| `codeg`        | Tauri desktop app (window, tray, updater)                                                                    | `pnpm tauri build` (release) / `pnpm tauri dev` (dev)                        |
| `codeg-server` | Standalone HTTP + WebSocket server for browser/headless deployments                                          | `pnpm server:build` / `pnpm server:dev`                                     |
| `codeg-mcp`    | Per-launch stdio MCP companion that surfaces the `delegate_to_agent` tool to agent CLIs (multi-agent collab) | `pnpm tauri:prepare-sidecars` (auto-invoked by `tauri dev` / `tauri build`) |

## Choose a deployment

- [Desktop App](/deployment/desktop) — the native app with tray and auto-updates
- [Standalone Server](/deployment/server) — run `codeg-server` on Linux/macOS, use from any browser
- [Docker](/deployment/docker) — `docker compose up` or `docker run`
- [Configuration](/deployment/configuration) — environment variables and in-place updates

::: info
`codeg-mcp` must sit next to its parent binary at runtime. Installers, the Docker image, and the Tauri sidecar bundler all place it correctly. If it's missing, [multi-agent delegation](/features/multi-agent-collaboration) is disabled (a single warning is logged) but everything else keeps working.
:::
