---
title: Version Control
description: The Version Control settings screen — point Codeg at the right Git executable and store GitHub, GitLab, or self-hosted credentials so clone, fetch, and push just work.
---

# Version Control

**Settings → Version Control** does two jobs: it points Codeg at the **Git executable** it should run, and it holds the **accounts** — GitHub, plus any other Git server — whose credentials let clone, fetch, and push go through without a password prompt. The app describes it as *"Configure Git executable and manage GitHub accounts."*

Each account you add here is stored **locally on your machine**; the token or password goes into your OS keyring, never into the app's database or the network. When Codeg runs a git command on your behalf, it looks up the matching account by server and supplies the credential for you — the mechanics are in [How credentials get used](#how-credentials-get-used) below.

## Git executable

The first panel shows whether Codeg found a working `git`:

- **Git detected** *(green)* with the version string and the resolved **Path** — the auto-detected executable Codeg will use.
- **Git not found on this system** *(red)* — nothing usable was found on your `PATH`.

**Custom Git Path** lets you override the auto-detection — click it, type an absolute path (the placeholder is `/usr/bin/git`), and **Save**. Codeg **tests the path before saving**: if it isn't a valid git executable, the save is refused with an error, so you can't accidentally point it at something that won't run. Leave the field empty to fall back to the auto-detected path.

You'll want this only in the uncommon case where the right git isn't the one first on your `PATH` — a version manager's shim, a portable install, or a second copy you'd rather Codeg use.

## GitHub accounts

Credentials for **GitHub** — github.com or a GitHub Enterprise server. Each account is a **Server URL** (defaults to `https://github.com`) plus a **Personal Access Token**. **Add Account** opens a dialog with two conveniences:

- **Generate token** opens your browser straight to the server's *new token* page (`…/settings/tokens/new`), pre-filled with the name `codeg` and the scopes Codeg wants — `repo`, `read:org`, `workflow`, `gist`, `read:user`, `user:email`. Create it there, copy it back.
- **Validate & Add** doesn't just store the token — it **calls the GitHub API to verify it first**, and on success fills in your username, avatar, and the token's actual scopes. A bad or expired token is rejected on the spot, before it's ever saved.

Each saved account shows its username, server, and granted scopes, with three actions:

- **Test** re-validates the stored token against the server, so you can confirm a token still works (or spot that it was revoked).
- **Set Default** marks it the preferred account — see [the default rule](#good-to-know).
- The **trash** button removes it, after a confirmation, and deletes its token from the keyring.

## Git accounts

The same idea for **everything that isn't GitHub** — GitLab, Bitbucket, a self-hosted server. The panel's own line: *"Manage credentials for non-GitHub Git servers (GitLab, Bitbucket, self-hosted, etc.)."*

The add dialog asks for three fields — **Server URL** (e.g. `https://gitlab.example.com`), **Username** (or email), and **Password / Token**. Unlike the GitHub panel there's no API to validate against, so the credential is stored as-is; **Test** here simply confirms a credential is present in the keyring rather than checking it against the server. Everything else — **Set Default**, remove — works the same.

::: info Which panel an account lands in
The split is purely by server: an account whose URL contains **github.com** shows under *GitHub accounts*; anything else shows under *Git accounts*. A GitHub Enterprise host on its own domain therefore appears in the lower panel — that's cosmetic, and doesn't change how its credential is matched or used.
:::

## How credentials get used

You rarely invoke these accounts directly — they work through git itself. Codeg registers as git's **credential helper** and supplies credentials via `GIT_ASKPASS`, so when a git operation it runs needs a login for some host, Codeg answers instead of git stopping to prompt you.

The match is **by hostname**. For a remote on `github.com`, Codeg looks for an account whose server is `github.com`; for `gitlab.example.com`, one whose server is `gitlab.example.com`. Two things follow from how the matcher works:

- **It never uses an unrelated account.** If no account matches the remote's host, Codeg supplies nothing and lets git fall back to its own configuration — a token for one server is never offered to another.
- **Default breaks a tie *within* a host.** When several accounts share the same server (say two github.com logins), the one marked **Default** is the one used. Across different hosts, each remote uses its own matching account regardless of which is default.

This is why the [Git & Worktrees](/guide/git) workflow — cloning a repo, pushing an agent's branch — generally just works once the account exists: the credential is served automatically, per host, in the background.

## Good to know

- **Tokens stay on the device.** Credentials live in your operating system's keyring (Keychain on macOS, Credential Manager on Windows, the Secret Service on Linux), with a local `tokens.json` fallback where no keyring is available — as on a headless [server deployment](/getting-started/deployment). Only the account's non-secret metadata (server, username, scopes) sits in the app database; the secret itself never does.
- **The first account you add becomes the default** automatically. After that, **Set Default** moves it — and remember the default only disambiguates accounts *on the same server*, it isn't a catch-all for other hosts.
- **Removing an account deletes its secret.** The confirmation removes the account *and* purges its token/password from the keyring — it isn't left behind.
- **The Git executable and the accounts are independent.** Setting a custom git path doesn't touch your accounts, and vice-versa; each panel saves on its own.
- **Not the same as Model Providers.** These are credentials for *Git servers*; the API keys your *agents* use to reach a model live under [Model Providers](/guide/authentication). Two separate credential stores for two separate jobs.

## Related

- [Git & Worktrees](/guide/git) — the in-app git workflow these credentials quietly power: diffs, commits, branches, and parallel worktrees.
- [Model Providers](/guide/authentication) — the *other* credential screen, for agent model access rather than Git servers.
- [System](/reference/settings/system) — the network proxy that git traffic, like everything else, goes through.
- [Reference overview](/reference/) — the full 14-screen Settings map.
