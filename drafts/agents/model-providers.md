# Model Providers

A **Model Provider** is a reusable connection — a name, API URL, API key, and model — that you can bind to **Claude Code**, **Codex**, or **Gemini**. Define it once and reuse it across agents instead of re-typing the same endpoint and key.

## Add a provider

Go to **Settings → Model Providers → Add**. Fields:

| Field | Notes |
| ----- | ----- |
| **Name** | Display name for the provider. |
| **API URL** | The endpoint base URL. |
| **API Key** | Stored securely; masked in the UI. |
| **Agent Type** | Claude Code / Codex / Gemini. **Immutable after creation** — pick carefully. |
| **Model** | For Codex/Gemini: a single model name. For Claude: structured **Main / Reasoning / Haiku / Sonnet / Opus** models, plus an optional **Custom Model** (ID / Name / Description). |

## Use a provider

On the agent's **Config Management** panel, set **Auth Mode → Model Provider**, then choose your provider from the dropdown. The API URL, key, and model are pulled from the provider (the API URL becomes read-only).

If the dropdown is empty, you'll see *"No model provider configured for this agent"* — add one scoped to that agent type first.

## Manage providers

The Model Providers page lists each provider with its name, API URL, and an agent badge. You can filter by agent, **Edit**, or **Delete** — but a provider that an agent is currently using **cannot be deleted** until you unbind it.
