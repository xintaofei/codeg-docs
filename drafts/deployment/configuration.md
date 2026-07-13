# Configuration

## Environment variables

| Variable                       | Default                | Description                                                                                                                                                     |
| ------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CODEG_PORT`                   | `3080`                 | HTTP port                                                                                                                                                       |
| `CODEG_HOST`                   | `0.0.0.0`              | Bind address                                                                                                                                                     |
| `CODEG_TOKEN`                  | _(random)_             | Auth token (printed to stderr on start)                                                                                                                         |
| `CODEG_DATA_DIR`               | `~/.local/share/codeg` | SQLite database directory (also roots `uploads/`, `pets/`)                                                                                                       |
| `CODEG_STATIC_DIR`             | `./web` or `./out`     | Next.js static export directory                                                                                                                                 |
| `CODEG_MCP_BIN`                | _(unset)_              | Absolute path to the `codeg-mcp` companion. Overrides the default sibling-of-executable + `PATH` lookup. Use for source builds or custom layouts.               |
| `CODEG_SKIP_SIDECAR`           | _(unset)_              | Frontend-only convenience for `pnpm tauri dev` / `pnpm tauri build` — when `1`, skips building the `codeg-mcp` sidecar. Delegation is disabled in that build.   |
| `CODEG_UPLOAD_MAX_TOTAL_BYTES` | _(unset)_              | Hard cap on total bytes resident under `<data dir>/uploads/`. Plain decimal byte count (e.g. `10737418240` for 10 GiB). Unset, `0`, or unparseable disables it. |
| `CODEG_UPLOAD_QUOTA_STRICT`    | _(unset)_              | When truthy (`1` / `true` / `yes` / `on`), abort startup with exit code 2 if `CODEG_UPLOAD_MAX_TOTAL_BYTES` is unparseable, instead of fail-open with a WARN.   |

::: tip
The upload cap is enforced within a single `codeg-server` process. Horizontally-scaled deployments sharing one `uploads/` volume need external coordination (file lock, Redis, reverse-proxy quota).
:::

## In-place updates

The server can update itself from **Settings → Software Update**: it downloads the signed release for its platform, swaps the binaries and web assets on disk, and restarts — no manual re-deploy. This is Linux/macOS only (disabled on Windows). The previous version is kept as a backup, so the same screen offers a **Roll back** action to return to it.

### Run under the supervisor for auto-rollback

Start the standalone server with `--supervise` so a freshly-upgraded process that fails to boot within the trial window is automatically reverted to the previous version:

```bash
CODEG_STATIC_DIR=./web ./codeg-server --supervise
```

Without `--supervise` the server still updates in place (it re-execs itself), but the upgrade is best-effort: there is no supervisor to auto-roll-back a version that can't start. The Docker image already runs under the supervisor.

::: warning Docker
In-place upgrades inside a container are not persistent — see [Docker → Upgrades change the container, not the image](/deployment/docker#upgrades-change-the-container-not-the-image).
:::
