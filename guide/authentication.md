---
title: Authentication & Models
description: Sign an agent in with its own subscription, a provider API key, or a custom endpoint — then pick the model it runs, and know where every credential lives.
---

# Authentication & Models

Codeg ships no model of its own. Every agent brings its own credentials — a subscription you already pay for, a provider API key, or a compatible endpoint — and talks to its own models. This page is about getting an agent authenticated so it can run, and choosing which model it uses once it can.

You do this per agent, in **Settings → Agents**: open an agent and its detail pane shows the sign-in options that apply to it. A separate **Model Providers** pane holds reusable credentials for the agents that support them. Enabling an agent and confirming it's healthy come first — see [Working with Agents](/guide/agents) — and [Supported Agents](/guide/supported-agents) is the roster this all applies to.

## How agents authenticate

Because each agent authenticates its own way, its detail pane offers only the options that make sense for it — usually a single **auth mode** dropdown. Across the roster, those options come in three shapes:

- **The agent's own account** — sign in with the subscription or plan you already have (Anthropic, ChatGPT, Google, and so on). Codeg reuses the agent's own login; you don't hand it a key.
- **A provider API key and endpoint** — type an API URL and key straight into the agent's card to bill against an API account or a compatible gateway. This is the **Custom Endpoint** option.
- **A saved Model Provider** — point the agent at a reusable credential you've stored once. Available for **Claude Code, Codex, and Gemini**.

These are mutually exclusive: an agent uses one at a time, and switching the auth mode swaps between them. The next three sections take each in turn.

## Sign in with a subscription

The simplest path is to use the agent's own subscription — the plan you'd use from its CLI. For most agents that means **logging in through the agent's own tool once**, in a terminal; Codeg then reuses that login and stores nothing extra:

- **Claude Code** — choose **Official Subscription** and Codeg uses your existing `claude` login. No key required.
- **Gemini** — choose **Google Login** and complete Google's sign-in by running `gemini` in a terminal first.
- **Kimi Code**, **CodeBuddy** — run the agent's own login in a terminal (`kimi login`, `codebuddy`) and Codeg picks it up. Kimi Code has a pane of its own for the API-key route. → [Kimi Code](#kimi-code-provider-model-and-reasoning)
- **Grok** and **Cursor** each have an **Authentication method** picker of their own:
  - **Grok** — **Official Subscription** (SuperGrok or X Premium+ via `grok login`; nothing stored), **XAI API key** (a key from the xAI console, for headless runs), or **Custom endpoint** (a custom model with its own base URL and key, which becomes Grok's default).
  - **Cursor** — **official subscription**, where Codeg shows you the `cursor-agent login` command to run (a browser window opens) and reports **Logged in** once you refresh, or a **Cursor API key** from the Cursor dashboard for headless and server machines. Note that key is a *Cursor account* key — `cursor-agent` only talks to Cursor's own backend, so it isn't a route to a third-party endpoint. Codeg writes both into `~/.cursor/cli-config.json`, shared with the CLI.

The integrated terminal (**⌘J**) is right there for those one-time logins.

**Codex is the exception** — it signs in *inside* Codeg. Pick **Official Subscription** and click **Log in with ChatGPT**: Codeg shows a code and a verification link, you approve it in your browser, and the pane confirms with a green **Account logged in**. Click again anytime to re-login or switch accounts.

## Connect with an API key or custom endpoint

Prefer to pay per API call, or route through an OpenAI/Anthropic/Gemini-compatible gateway? Choose **Custom Endpoint** in the agent's auth mode and fill in:

- **API URL** — the base URL of your provider or gateway.
- **API Key** — your key, masked with a show/hide toggle.
- **Model** — the model id to request, where the agent expects one.

Codeg hands these to the agent when it launches. Most agents accept this route; the exact fields shown follow whatever that agent understands.

## Save and reuse a Model Provider

If you switch between endpoints, or want one credential shared across sessions, save it as a **Model Provider** instead of retyping it. This is available for **Claude Code, Codex, and Gemini** — the three whose CLIs cleanly accept a base-URL-and-key override.

1. Go to **Settings → Model Providers → Add Provider**.
2. Give it a **name**, an **API URL**, an **API Key**, the **agent type** it's for, and a **model**.
3. Open that agent in **Settings → Agents**, set its auth mode to **Model Provider**, and select the one you saved.

Once bound, the agent's API fields show read-only, filled from the provider. Edit a provider later and Codeg flags any running sessions that need to **reconnect** to pick up the change.

::: tip Custom Endpoint vs. Model Provider
They configure the same thing — a base URL, a key, and a model — but differ in reach. **Custom Endpoint** is typed inline on one agent; a **Model Provider** is a named record you set up once and reuse. If you only ever use one endpoint for one agent, Custom Endpoint is simpler; if you juggle several, save them as providers. (An agent's type is fixed once a provider is created.)
:::

## Choose a model

Which models you can pick comes from the **agent**, not Codeg. Once an agent connects, the composer's **model dropdown** lists exactly what that agent offers for the way you signed in — so the choices differ from one agent to the next. Pick one there and it takes effect for the conversation.

- **Codeg remembers your last pick** per agent and preselects it next time you start a session with that agent.
- There's **no per-folder model default** — the model is chosen at the session level. (A folder default sets the *agent*, not the model.)

**Reasoning effort** is set in the composer, per session — with a few agent panes adding something the composer can't express:

- **Grok** keeps a settings-pane dropdown, from low up to **Max**, written into Grok's own config.
- **Claude Code** and **Codex** had one until **0.30.0**, when both were deleted. They read as the knob that decides how hard a turn thinks while the composer's per-session picker is what actually governs it, so the two could disagree with nothing on screen to say which won. An `effortLevel` already written into a config file is **left alone** rather than cleaned up.
- **Pi** works like Kimi Code rather than like Grok: because pi only sends an effort for a model that *declares* one, its pane is where you declare it — a switch, which of pi's six levels your model accepts, and the value each is sent as. → [Pi: reasoning on a custom provider](/guide/agents#pi-reasoning-on-a-custom-provider)
- **Kimi Code** works the other way round: its pane declares which levels *exist* and the composer's Thinking picker offers them. → [Kimi Code](#kimi-code-provider-model-and-reasoning)
- **Cursor** folds effort into its model picker — see [Cursor's families and knobs](/guide/agents#cursor-families-and-knobs-not-two-hundred-ids).

## Hermes: pick a provider

Hermes is a special case — it manages its own stable of model providers, so instead of a single key it has its own config pane with a **provider** dropdown, grouped three ways:

- **API key** providers — enter your key (and a base URL, if the provider needs one) plus a model name. The key is saved to Hermes's own `~/.hermes/.env`.
- **OAuth** providers (Nous, OpenAI Codex, Gemini, GitHub Copilot, and more) — no key to type; click **Run Hermes setup** and Hermes authenticates you in a terminal.
- **AWS** (Bedrock) — uses your existing AWS credentials from the environment.

For anything the pane doesn't cover, **Open Config Folder** reveals `~/.hermes`, and an Advanced section lets you edit Hermes's `config.yaml` directly.

## Kimi Code: provider, model, and reasoning

Kimi Code is the other agent with a pane of its own, rebuilt in **0.23**. The reason is a quirk of the CLI: `kimi acp` only accepts a **stored login token**, never a key handed to it at launch. So an API key can't simply be passed through — Codeg writes a **managed provider** into `~/.kimi-code/config.toml` and seeds a local gate token so sessions can open at all. Inference still runs on your key; the token only unlocks the door.

**Credential** — two mutually exclusive routes:

- **API key** — pick the provider shape from six Kimi accepts (**Kimi / Moonshot**, **OpenAI** in either Chat Completions or Responses form, **Anthropic**, **Google Gemini**, or **Google Vertex AI**, which uses your GCP credentials and takes no key at all), then a base URL where one is needed. Moonshot's two regions — `api.moonshot.ai` and `api.moonshot.cn` — are one click apart.
- **Sign in with a Kimi account** — run `kimi login` in a terminal and Codeg reuses that login, storing nothing. Saving this way removes the API-key gate token.

**Model** — the model id written to `config.toml`, plus **Max context size**. That second field looks optional and isn't: Kimi's schema requires it, and without it Kimi discards the entire model block and every prompt comes back empty. It defaults to **262144**. **Test & list models** calls your key and reports what it can actually reach, so a typo shows up as *this model is not in the list* rather than as a *model not found* mid-conversation.

**Reasoning** — Kimi only offers a **Thinking** picker in the composer when the model declares a reasoning capability, so this section declares one for it. **Levels offered** become the picker's rows and are forwarded to the provider verbatim, so pick ones your model accepts; choose none and the composer falls back to a plain Off / On toggle. You can set a **default level** (or let Kimi choose), and for a model that always reasons, drop the *Off* row entirely. Changes take effect on new sessions.

**Advanced** holds **Credential placement** — inline `api_key` versus the provider's env sub-table — and a raw editor for `config.toml`, which overwrites the whole file verbatim and replaces everything the structured fields above set.

::: warning A leftover environment variable wins
`kimi acp` reads the `KIMI_MODEL_*` family — `KIMI_MODEL_BASE_URL`, `KIMI_MODEL_API_KEY`, `KIMI_MODEL_NAME` — *before* `config.toml`, so one left in the agent's [Environment Variables](/guide/agents#configure-an-agent) silently overrides everything this pane writes. The pane warns you while any is still set, and saving clears them — so what you can see is what's in force.
:::

## DeepSeek Harness: endpoint and key

**DeepSeek Harness**'s pane is the short one, because the adapter takes both of its settings as plain environment variables:

- **API endpoint** — leave it blank for DeepSeek's own `https://api.deepseek.com`. Fill it in for a proxy or a compatible endpoint; it wants a full `http(s)` URL with no query string.
- **API key** — passed to the agent as `DEEPSEEK_API_KEY`.

Model and reasoning effort are **not** here. The adapter advertises both as ordinary session options, so they live in the [composer](/guide/workspace#start-a-session-—-the-composer) and belong to a conversation rather than to the agent. The launch-default model is `DEEPSEEK_ACP_MODEL` in the agent's raw [Environment Variables](/guide/agents#configure-an-agent) — deliberately not in this pane, so a save here can never overwrite a model line you're editing there.

::: tip An environment variable outranks the credentials file
DeepSeek Harness can also be signed in from a terminal, which stores the key in `~/.dsh/.credentials.yaml`. The environment takes precedence — so if that's how you signed in, **leave the API key field empty** rather than filling it with the same value and having two places to keep in step.
:::

## Where credentials are stored

Codeg keeps agent credentials where the agents themselves do — nothing is uploaded to Codeg:

- **The agent's own native config.** A subscription login or key handled by the agent's CLI stays in that agent's files — `~/.codex/auth.json`, `~/.hermes/.env`, `~/.grok/auth.json`, and so on — exactly where the agent's own tool keeps it.
- **Codeg's local database.** Keys you type into Codeg's UI — Custom Endpoint keys and saved Model Providers — are stored locally by Codeg and injected as environment variables when the agent launches. Like the agents' own config files, they aren't encrypted at rest, and the masked display is only cosmetic — so treat access to your machine as the boundary.

This is separate from **git account** tokens, which *are* kept in your OS keyring. → [git accounts](/guide/git#git-accounts)

## Next steps

- [**Working with Agents**](/guide/agents) — enable an agent and run its preflight before you sign in.
- [**Supported Agents**](/guide/supported-agents) — the full roster and what each agent is.
- [**Multi-Agent Collaboration**](/guide/multi-agent) — once your agents are signed in, let them work together.
