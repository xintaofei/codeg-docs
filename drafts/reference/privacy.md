# Privacy & Security

- **Local-first by default** for parsing, storage, and project operations
- **Network access happens only on user-triggered actions**
- **System proxy support** for enterprise environments
- **Web service mode** uses token-based authentication

## Web service authentication

When you run Codeg as a [standalone server](/deployment/server) or in [Docker](/deployment/docker), access is gated by an auth token. Set it explicitly with `CODEG_TOKEN`, or let the server generate a random one and print it to stderr on start — see [Configuration](/deployment/configuration).
