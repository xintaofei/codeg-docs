# Multi-Agent Delegation

Delegation lets a main agent hand subtasks to sub-agents of different types (see [Multi-Agent Collaboration](/features/multi-agent-collaboration) for the concept). You configure it under **Settings → General → Multi-Agent Collaboration**.

## Settings

| Setting | Effect |
| ------- | ------ |
| **Enable delegation** | When off, the `delegate_to_agent` tool is hidden from agents entirely. |
| **Maximum delegation depth** | How deeply nested delegations may go (an agent delegating to an agent that delegates again…). |
| **Completed-result cache (MB)** | Cap on cached sub-agent results that are handed back to the parent. |
| **Agent defaults** (tab) | Per-agent **mode** and **model** overrides applied when that agent is delegated to. Options are probed live from each installed agent. |

## Requirements

Delegation is powered by **`codeg-mcp`**, a companion binary that must sit next to the `codeg` / `codeg-server` executable at runtime. Installers, the Docker image, and the Tauri sidecar bundler all place it correctly.

- For **source builds** or custom layouts, set `CODEG_MCP_BIN=/abs/path/codeg-mcp`.
- If the companion is missing, delegation is disabled (a single warning is logged) and everything else keeps working.

See [Deployment](/deployment/) for how the companion is bundled.

## Related

- [Multi-Agent Collaboration](/features/multi-agent-collaboration) — what delegation looks like in a session
- [Agent Settings](/agents/) — enabling the agents you want to delegate between
