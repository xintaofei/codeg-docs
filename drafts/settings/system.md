# System

**Settings → System** manages network proxy, app updates, and language.

## Software Update

Shows the current version and a **Check for updates** action. When an update is available, Codeg can upgrade **in place** — the desktop app via the Tauri updater, the standalone server via a self-update with a live progress bar — then **Restart to update**. The previous version is kept, so a **Roll back** action can return to it. Release notes render inline.

See [Configuration → In-place updates](/deployment/configuration#in-place-updates) for the server details and the Docker caveat.

## Network Proxy

- **Enable system proxy** and set a **Proxy address** (`http(s)` or `socks5`).
- When enabled, subsequent network requests prefer this proxy — including ACP chat, agent installation, and Git remote operations. Useful in enterprise environments.

## Language

**App language** — Follow system, or pick a specific locale (English, 简体中文, 繁體中文, 日本語, 한국어, Español, Deutsch, Français, Português, العربية). Unsupported system locales fall back to English.
