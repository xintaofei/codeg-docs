# Version Control & Git

**Settings → Version Control** manages the Git executable and the accounts Codeg uses for remote Git operations. Accounts are split into **GitHub** and **other Git servers**.

## Git configuration

Point Codeg at a specific **Git executable path** (otherwise it auto-detects `git`).

## Add a GitHub account

Authentication is by **Personal Access Token (PAT)**.

1. Under **GitHub Accounts**, click **Add account**.
2. **Server URL** — defaults to `https://github.com` (change it for GitHub Enterprise).
3. Click **Generate token** — Codeg opens the token page pre-filled with the scopes it needs (`repo`, `read:org`, `workflow`, `gist`, `read:user`, `user:email`).
4. Paste the **token** and click **Validate & add**. Codeg verifies it and stores the token in your OS keyring.

## Add another Git account

For GitLab, Gitea, or an enterprise server, use **Git Accounts** with **Server URL**, **Username**, and **Password / PAT**. (These aren't validated against an API.)

## Per-account actions

- **Test connection** — re-validates the credentials.
- **Set default** — the first account you add becomes the default.
- **Remove** — deletes the account and its keyring token.

## How accounts are used

For any HTTPS Git operation (clone / fetch / push), Codeg matches the remote's host to an account — preferring the default — and injects the credentials via `GIT_ASKPASS`. **SSH remotes are skipped** (they use your keys, not tokens). The commit author is derived from the matching account.

::: tip
Tokens live in your OS keyring on desktop, or in a `tokens.json` under the data directory on a standalone server.
:::
