# Docker

```bash
# Using Docker Compose (recommended)
docker compose up -d

# Or run directly with Docker
docker run -d -p 3080:3080 -v codeg-data:/data ghcr.io/xintaofei/codeg:latest

# With custom token and project directory mounted
docker run -d -p 3080:3080 \
  -v codeg-data:/data \
  -v /path/to/projects:/projects \
  -e CODEG_TOKEN=your-secret-token \
  ghcr.io/xintaofei/codeg:latest
```

The Docker image uses a multi-stage build (Node.js + Rust → slim Debian runtime) and includes `git` and `ssh` for repository operations. Data is persisted in the `/data` volume. You can optionally mount project directories to access local repos from within the container.

## Upgrades change the container, not the image

An [in-place upgrade](/deployment/configuration#in-place-updates) rewrites the binaries and web assets inside the running container's writable layer, so they live only in that container. The `/data` volume persists, but the upgraded files do **not**: recreating the container — `docker compose up --force-recreate`, a fresh `docker run`, or recreating after a `docker pull` — starts from the image again and drops the in-place upgrade.

::: warning
To make an upgrade permanent, build or pull an image at the new version and recreate the container from it. A `docker pull` on its own only refreshes the local image; nothing reverts until the container is recreated.
:::

The Docker image already runs under the supervisor, so failed upgrades auto-roll-back.
