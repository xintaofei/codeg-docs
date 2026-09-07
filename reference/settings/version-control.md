---
title: Version Control
description: The Version Control settings screen — point Codeg at the right Git executable and store GitHub, GitLab, Gitea, or self-hosted credentials so clone, fetch, push, and the Repository panel just work.
---

# Version Control

**Settings → Version Control** does two jobs: it points Codeg at the **Git executable** it should run, and it holds the **accounts** — GitHub, GitLab, Gitea, plus any other Git server — whose credentials let clone, fetch, and push go through without a password prompt. The app describes it as *"Configure Git executable and manage GitHub accounts."*

Since **0.27** these accounts do a second job: the [**Repository panel**](/guide/repository) reads your issues and pull requests through them, and pushes a delivered branch as the account that triggered the task. A GitHub, GitLab or Gitea account here is what makes that panel work at all.

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

Each saved account shows its username, server, and granted scopes, with four actions:

- **Test** re-validates the stored token against the server, so you can confirm a token still works (or spot that it was revoked).
- **Update token** replaces the stored secret while **keeping the account itself** — validated the same way *Validate & Add* is. Reach for this when a token expires or gets rotated. It matters more than it looks: [repository tasks](/guide/repository) are pinned to the account that triggered them, and removing an account and adding it back is a *different* account as far as those are concerned, while updating the token leaves them working.
- **Set Default** marks it the preferred account — see [the default rule](#good-to-know).
- The **trash** button removes it, after a confirmation, and deletes its token from the keyring.

An account whose avatar can't be fetched falls back to its **initials** rather than an empty circle.

## GitLab accounts

Added in **0.27**, and the counterpart to the GitHub panel: an account is a **Server URL** — `https://gitlab.com`, or your own instance — plus a **Personal Access Token**, validated against the GitLab API before it's stored, which fills in the username and avatar on success.

The token needs the **`api`** scope. Create one under **GitLab → Preferences → Access tokens**; the panel says so inline. Everything else works exactly like the GitHub panel: Test, Update token, Set Default, and remove.

This is the panel the [Repository panel](/guide/repository) reads a GitLab project's issues and merge requests through, and the identity it pushes a delivered branch as.

## Gitea accounts

Added in **0.30.4**, and built the same way: a **Server URL** and a **Personal Access Token**, checked against the instance's own *who am I* endpoint before it's stored. It serves **Forgejo** as well — Forgejo is a fork of Gitea and answers the same `/api/v1`, so there's no separate panel and nothing to choose between. The URL field defaults to `https://gitea.com` but expects to be edited: a Gitea is far more often somebody's own instance than the public one.

The token needs three scopes — **`write:repository`**, **`write:issue`** and **`read:user`** — created under **Gitea → Settings → Applications**. The **Generate token** link opens that page but, unlike GitHub's and GitLab's, arrives with nothing ticked: Gitea's token form takes no scopes in the query, so the panel's inline hint is what tells you which boxes to check. Test, Update token, Set Default and remove all behave as they do on the other two.

## Git accounts

The same idea for **everything the three panels above don't cover** — Bitbucket, a plain self-hosted server. The panel's own line: *"Manage credentials for non-GitHub Git servers (GitLab, Bitbucket, self-hosted, etc.)."*

The add dialog asks for three fields — **Server URL** (e.g. `https://git.example.com`), **Username** (or email), and **Password / Token**. Unlike the three forge panels there's no API to validate against, so the credential is stored as-is; **Test** here simply confirms a credential is present in the keyring rather than checking it against the server. Everything else — **Set Default**, remove — works the same.

::: info Which panel to use, and why it matters now
All four panels are one store, split for display. For pure git traffic — clone, fetch, push — the split makes no difference: the match is by hostname, so a credential in any of them serves its host. What the GitHub, GitLab and Gitea panels add is a **declared provider**, which is what tells Codeg *which API to speak* to that host.

Which panel an account lands in is decided by **the dialog you added it through**, not by its URL — which is the only way to tell a self-hosted GitLab from a GitHub Enterprise by looking at it. An account that declares nothing still serves any of the three, and Codeg works down three fallbacks in order: it [asks the instance](/guide/repository#before-you-start-an-account) what it is; failing that it reads the hostname, where a **whole label** `gitlab`, `github`, `gitea` or `forgejo` names a forge and `mygitlabhost.com` deliberately doesn't, being somebody's domain rather than a claim; and failing *that* it falls back to GitHub, which is what a host that can't be reached did before any of this existed.

So the declaration earns its keep on the **ambiguous** hosts. It saves the probe, and it's the only answer where the probe can't reach a verdict — an instance behind an authenticating gateway, say. Adding through the right dialog removes the guess entirely.

Accounts stored before the provider field existed keep the rule they were filed under: `github.com` under *GitHub accounts*, everything else among the plain git credentials.
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
- **A repository task pins its account at trigger time.** When the [Repository panel](/guide/repository) creates a task, it records *which* account read the item — not "whichever is default". Flipping the default later can't change who its branch is pushed as, which is why **Update token** exists: it keeps the identity those tasks are pinned to, and removing-and-re-adding does not.
- **Not the same as Model Providers.** These are credentials for *Git servers*; the API keys your *agents* use to reach a model live under [Model Providers](/guide/authentication). Two separate credential stores for two separate jobs.

## Related

- [Repository Panel](/guide/repository) — the issues-and-pull-requests workbench these GitHub, GitLab and Gitea accounts unlock.
- [Git & Worktrees](/guide/git) — the in-app git workflow these credentials quietly power: diffs, commits, branches, and parallel worktrees.
- [Model Providers](/guide/authentication) — the *other* credential screen, for agent model access rather than Git servers.
- [System](/reference/settings/system) — the network proxy that git traffic, like everything else, goes through.
- [Reference overview](/reference/) — the full 14-screen Settings map.
