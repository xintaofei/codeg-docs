# Runtime Logs

**Settings → Runtime Logs** is a live log viewer. Logs are written to local files and kept in memory for live viewing.

## Capture level

Set the overall level: **Off, Error, Warning, Info, Debug, or Trace**. If the level is controlled by the `RUST_LOG` / `CODEG_LOG` environment variable, the control is locked and shows a note.

## Per-module overrides

Add a different level for a specific module (for example `codeg_lib::acp`) to turn up detail for one subsystem without flooding the rest.

## Recent logs

A live tail with:

- a **level filter** (All / Error+ / … / Trace+),
- **text search**,
- **Pause / Live** toggle, **Refresh**, and **Clear**,
- **Open folder** to reach the log files on disk.

## Log files

Download full log files from disk (very large files are truncated to the most recent entries).
