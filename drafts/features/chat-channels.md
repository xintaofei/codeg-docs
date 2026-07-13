# Chat Channels

Connect Telegram, Lark (Feishu), or iLink (Weixin) to Codeg so you can create tasks, approve permissions, resume sessions, and follow along — all from your chat app, without opening a browser.

Configure channels under **Settings → Chat Channels**, which has four tabs: **Channels**, **Commands**, **Events**, and **Other**.

## Add and connect a channel

1. **Settings → Chat Channels → Channels → Add Channel.**
2. Enter a **Name**, pick a **Channel Type**, and fill in the type-specific fields (below). Optionally enable a **Daily report** with a time.
3. **Create.** Any secret you enter is stored in your OS keyring — never in plain config.
4. In the list, flip the channel's **Enable** switch, then click **Connect** (▶).

### Telegram

| Field | Example | Notes |
| ----- | ------- | ----- |
| Bot Token | `123456:ABC-DEF...` | From @BotFather; stored in the keyring |
| Chat ID | `-100123456789` | The chat or group to talk to |

Telegram connects by long-polling. In **groups**, the bot only acts on messages that **@mention** it.

### Lark (Feishu)

| Field | Example |
| ----- | ------- |
| App ID | `cli_xxxxx` |
| App Secret | `xxxxx` (entered in the token field) |
| Chat ID | `oc_xxxxx` |

Codeg uses the App ID + Secret to open a WebSocket connection. There is **no** webhook URL, verification token, or encrypt key to configure.

### iLink (Weixin)

No credentials to type. The default **Base URL** is `https://ilinkai.weixin.qq.com`. On first **Connect**, Codeg opens a **QR code** — scan it in WeChat and confirm, and the token is captured automatically.

## Row actions

- **Enable switch** — disabling a connected channel disconnects it first.
- **Connect / Disconnect** (▶ / ◼).
- **Test** (⚡) — validates the token (Telegram `getMe`, Lark tenant token).
- **Edit** — disabled while connected; leave the token blank to keep the existing one.
- **Delete** — removes the channel and its keyring token.
- A live **status dot**: green = connected, yellow = connecting, red = error, gray = disconnected.

## Commands from chat

Messages that start with the command prefix (default `/`) run built-in commands:

| Command | Action |
| ------- | ------ |
| `/folder [n\|path]` | List or select the working folder (a path adds a folder) |
| `/agent [n\|name]` | List or select the agent type |
| `/task <desc>` (or `/do`) | **Create a task** — spawns an agent in the selected folder |
| `/sessions` | List active sessions in the folder |
| `/resume [id]` | Resume a session (no id lists recent ones) |
| `/cancel` | Cancel the active session |
| `/approve [always]` | Approve a pending permission (`always` = auto-approve you) |
| `/deny` | Deny a pending permission |
| `/search <keyword>` | Search conversation titles |
| `/today` | Today's activity grouped by agent |
| `/status` | Connection status of all channels |
| `/help` | Show help |

Any **plain message** (no prefix), when you have an active session, is forwarded to that agent as a prompt.

## Global channel settings

These apply to every channel:

- **Command prefix** (Commands tab) — default `/`; must be 1–3 non-alphanumeric characters.
- **Message language** (Other tab) — default English; one of en, zh-cn, zh-tw, ja, ko, es, de, fr, pt, ar.
- **Events** (Events tab) — choose which events are pushed to the channel: `turn_complete`, `error`, `permission_request`, `question_request`, and `user_prompt_sent` (**off by default**, since it exports prompt text). You can also register **Webhooks** — additional `http(s)` POST sinks for the same events.
