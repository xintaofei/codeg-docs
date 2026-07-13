# Authentication & Models

Each agent is authenticated and tuned under **Settings → Agents → (select an agent) → Config Management**. Codeg keeps these settings in sync with the agent's own native config files, so what you set here is exactly what the agent CLI uses.

## Auth modes

Claude Code, Codex, and Gemini (and several other agents) share three authentication modes:

- **Official Subscription** — sign in to the vendor's own subscription; no API key required.
- **Custom Endpoint** — point at any compatible API with an **API URL** + **API Key**.
- **Model Provider** — reuse a saved [Model Provider](/agents/model-providers). The API URL becomes read-only, populated from the provider.

Common fields across modes: **API URL**, **API Key** (with show/hide), and **Model** (leave empty to use the agent's default model).

## Per-agent setup

| Agent | Authentication | Notable model options |
| ----- | -------------- | --------------------- |
| **Claude Code** | Official Subscription / Custom Endpoint / Model Provider | Main model, Reasoning (thinking) model, default Haiku/Sonnet/Opus, a Custom model added to Claude's picker, **Reasoning Effort** (Default/Low/Medium/High/Extra High) |
| **Codex** | Log in with ChatGPT (device code — Codeg shows a URL + code) / Model Provider / Custom API key | Model name, **Reasoning effort** (low/medium/high/xhigh); toggles: Enable WebSocket, Enable Skills, Enable Fast |
| **Gemini CLI** | Custom Endpoint / Google Login (OAuth) / Vertex AI (Service Account) | `GEMINI_API_KEY`, `GOOGLE_GEMINI_BASE_URL`, `GEMINI_MODEL`; Vertex adds `GOOGLE_CLOUD_PROJECT` / `LOCATION` / `APPLICATION_CREDENTIALS` |
| **Pi** | API key, with custom provider definitions | Provider + Model + Thinking level; custom `pi` command/path; separate config & sessions directories; auto-trust workspaces |
| **Kimi Code** | API key or Kimi account login | Endpoint: International (`api.moonshot.ai`) / China (`api.moonshot.cn`) / Custom; Base URL; fetchable model list; max context |
| **Grok** | `XAI_API_KEY` or `grok login` | Permission mode; Reasoning effort (Low/Medium/High/Max); bring-your-own endpoint (model ID, base URL, API backend) |
| **Hermes** | Per-provider API key (OpenRouter, OpenAI-compatible, Anthropic, Google AI Studio, DeepSeek, xAI, …) | Model; raw `config.yaml` editor; OAuth providers use a terminal setup step |
| **CodeBuddy** | `CODEBUDDY_API_KEY` | Environment: Overseas / China (internal) / iOA / Self-hosted; Deployment URL for self-hosted |
| **Cline** | Provider + API key | Model, base URL |
| **OpenClaw** | Gateway URL + gateway auth token | Optional session key (local or remote gateway) |
| **OpenCode** | Multi-provider via the models.dev catalog, plus custom OpenAI-compatible providers | Per-model management; Main / Small model selection |

## Where credentials are stored

Codeg writes each agent's settings into that agent's native config on disk — for example `~/.codex/config.toml`, `~/.gemini/settings.json`, `~/.grok/config.toml`, `~/.hermes/config.yaml`, `~/.kimi-code/config.toml`. Sensitive values follow the agent's own convention, so credentials never leave your machine except to the endpoint you configured.

::: tip
To route several agents through the same gateway or key, define it once as a [Model Provider](/agents/model-providers) instead of re-entering it per agent.
:::
