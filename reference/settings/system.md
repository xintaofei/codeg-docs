---
title: System
description: The System settings screen — Codeg's operations hub for software updates, the network proxy, the app language, and full backup and restore.
---

# System

**Settings → System** — labeled **System Management** in the app — is the operations screen: *"Manage network proxy, app updates and language preferences,"* plus a fourth panel for backing up and restoring everything. Four independent sections, each saving on its own; nothing here needs a page-level Save.

## Software Update

Checks the configured release source for a newer Codeg and, where it can, installs it in place. The panel shows your **current version** and a **Check for updates** button; after a check it notes the time (*"Last checked…"*) and either *"You're on the latest version"* or the details of the release waiting for you — its version, date, and full release notes.

::: tip You don't have to come looking
A new release also announces itself in the workspace: a **New v…** badge appears in the [status bar](/guide/workspace#the-layout), and its popover carries the same version, **What's new** notes, and actions. Both surfaces read one shared check — a single fetch answers both, and they never disagree. **Later** dismisses a release, per version and across every open window, leaving a plain grey icon you can still click; the next release lights the badge again.
:::

What the upgrade button does depends on where you're running — this is the one screen where desktop and server genuinely differ:

- **Desktop app** — **Upgrade to vX** downloads the release, shows a progress bar, and when it's staged flips to **Restart to update**; clicking that relaunches into the new version. This is Codeg's built-in auto-updater.
- **A self-updating server** — a standalone `codeg-server` (or Docker) that supports in-place updates behaves the same way: download, progress, restart. See [Deployment](/getting-started/deployment) for how server updates work.
- **Anything that can't self-update** — an older remote server falls back to a **View vX release** button that opens the GitHub releases page, so you can update it by hand.

::: info Rollback (server only)
A self-updating server keeps the previous binary, so after an upgrade a **Roll back** button appears — *"Restore the version installed before the last upgrade."* It's there for a regression that only surfaces later, once the automatic trial-window check has already passed. The desktop app updates through the OS installer and doesn't offer this. On **Docker**, an in-place upgrade is only live until the container is recreated — *"to keep it, pull or build an image at the new version and recreate."*
:::

If a check or install fails, the reason is shown inline — an unreachable update source, a network error, or a failed download or install — usually a connectivity issue, which the proxy panel below can address.

## Network Proxy

Routes Codeg's own network traffic through a proxy. Tick **Enable system proxy** and enter a **Proxy address**; from then on, *"subsequent network requests prefer this proxy (including ACP chat, agent installation and Git remote operations)."*

The address takes an `http`, `https`, or `socks5` URL — the placeholder is `http://127.0.0.1:7890`, a typical local proxy. It's **required once the proxy is enabled** (turning it on without an address is refused), and the setting **saves as you go** — toggling the checkbox or leaving the field commits it. It applies only while *Enable system proxy* is on; untick to go direct again.

This is the proxy that carries everything Codeg reaches out for — the [Git operations](/reference/settings/version-control) your accounts authenticate, agent installs, model traffic. To set a proxy *before* the app starts, from the environment, see [Configuration](/getting-started/configuration).

## Language

Sets the language of Codeg's **own interface** — menus, buttons, settings. **App language** is either **Follow System** or one of ten: English, Simplified and Traditional Chinese, Japanese, Korean, Spanish, German, French, Portuguese, and Arabic. When following the system locale, *"unsupported languages fall back to English."* The choice applies immediately and is remembered.

(This is the desktop or browser app's UI language — separate from the language of any one conversation, or of this documentation site.)

## Backup & Restore

A portable snapshot of your Codeg install — *"Export a portable backup of your codeg data, or restore from one."* Two tabs: **Backup** and **Restore**.

### Backup

Export writes a single `.codegbak` archive of your **database and uploads**. Two choices shape it:

- **Include conversation content** *(off by default)* — *"Also archive agent CLI transcripts (Claude, Codex, Gemini, …). Increases size."* Off, the backup is your Codeg data alone; on, it also pulls in the underlying agent CLIs' own transcript files.
- **Passphrase** *(optional)* — encrypt the archive. Leave it empty and Codeg warns, in amber, that *"this backup will contain secrets (API keys, tokens) in plaintext"* — because it does; store it somewhere safe. Set one and the opposite caution applies: *"if you lose it, the backup cannot be recovered."*

**Export backup** builds it — the desktop app saves a file, a browser session downloads one.

### Restore

**Select backup file** (`.codegbak` or `.zip`), and Codeg inspects it before doing anything. If it's encrypted you're asked for the passphrase; then a **Backup details** card shows when it was made, which app version made it, and whether it's **Compatible** — a backup from a *newer* Codeg than you're running can't be restored.

Restoring is a **full replace**, and the panel says so plainly, in red: *"Restoring replaces all current codeg data (database and uploads). Your current data is snapshotted first so it can be recovered."* You confirm through a **Replace all data?** dialog, after which Codeg stages the restore and restarts to apply it.

Two things worth knowing before you do:

- **Desktop backups don't carry your keychain secrets.** *"Desktop GitHub/chat tokens live in your OS keychain and are not included; re-enter them after restoring."* On a **server**, those same tokens live in a file that *is* in the backup — the difference is exactly the keyring split described under [Version Control](/reference/settings/version-control).
- **Restoring conversation content is its own choice.** If the backup included the agent CLI transcripts, you pick where they land — skip them, drop them in a **safe side folder**, or write them back to the **original CLI locations** (with a conflict scan and an optional overwrite) so the agents see their history again.

::: warning Backup acts on this machine
Backup and restore operate on the data of the machine actually running Codeg. If you're in a desktop app **connected to a remote workspace**, the panel is disabled with a note to *"manage its backups from that server directly"* — the native file dialogs here wouldn't line up with the remote server's storage.
:::

## Good to know

- **Four panels, four independent saves.** The proxy, the language, and the update check each act on their own; there's no page-level Save, and changing one never touches another.
- **Desktop and server update differently.** The desktop app auto-installs and relaunches; a server updates in place with a restart (and can roll back); an old remote server just links you to the release. Same panel, three behaviors.
- **An unencrypted backup is plaintext secrets.** API keys and tokens ride along in the clear unless you set a passphrase — encrypt it, or keep the file somewhere trusted. How Codeg handles secrets generally is under [Privacy & Security](/reference/privacy).
- **Restore is a replace, but reversible.** It swaps in the backup's database and uploads wholesale — yet snapshots your current data first, so a mistaken restore can be walked back.
- **The proxy is app-wide.** Once on, it carries git, agent installs, and model calls alike — the one path everything Codeg reaches out through.

## Related

- [Deployment](/getting-started/deployment) — in-place updates for `codeg-server` and Docker, and where a server keeps the tokens a desktop backup leaves behind.
- [Configuration](/getting-started/configuration) — setting the proxy, and other options, from the environment before the app starts.
- [Version Control](/reference/settings/version-control) — the OS keychain that desktop backups deliberately exclude.
- [Privacy & Security](/reference/privacy) — plaintext secrets, encryption, and what leaves your machine.
- [Reference overview](/reference/) — the full 14-screen Settings map.
