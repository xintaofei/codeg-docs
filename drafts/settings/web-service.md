# Web Service

*(Desktop app only.)* **Settings → Web Service** lets you access your desktop Codeg from a browser on another device.

| Control | Notes |
| ------- | ----- |
| **Port** | Default `3080` (range 1024–65535). A warning shows if the port is already in use. |
| **Access Token** | Leave empty to auto-generate. You enter this token the first time you open the web client. **Regenerate** to rotate it. |
| **Auto-start** | Start the web service automatically when Codeg launches. |
| **Status** | A running/stopped indicator with a **Start / Stop** button. |
| **Access Address** | Shown while running, with a QR code to open it on your phone. |

The service binds all network interfaces, so the address selector only changes what's displayed, not what it listens on.

::: info
Running Codeg **headless** on a server instead? Don't use this page — configure the standalone server with [environment variables](/deployment/configuration) (`CODEG_PORT`, `CODEG_TOKEN`, `CODEG_HOST`, …) and see [Standalone Server](/deployment/server).
:::
