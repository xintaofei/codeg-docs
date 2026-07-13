# Multi-Agent Collaboration

Within a single session, the main agent delegates to sub-agents of different types — for example Claude Code calling Codex or Gemini — to jointly complete a task. Each sub-agent runs as an independent session, so you get the strengths of several agents working together on one problem.

<div class="light-only">

![Multi-agent collaboration in Codeg](/images/collaboration-light.png)

</div>

<div class="dark-only">

![Multi-agent collaboration in Codeg](/images/collaboration-dark.png)

</div>

## How it works

Delegation is powered by **`codeg-mcp`**, a per-launch stdio MCP companion that surfaces a `delegate_to_agent` tool to the agent CLIs. When the main agent decides to hand off a subtask, it calls that tool; Codeg spins up the chosen sub-agent as its own session and streams the result back into the parent conversation.

`codeg-mcp` must sit next to its parent binary at runtime — installers, the Docker image, and the Tauri sidecar bundler all place it next to `codeg` / `codeg-server`. If the companion is missing, delegation is skipped (a single warning is logged) and the rest of the session keeps working.

## Configure it

Delegation is turned on and tuned under **Settings → General → Multi-Agent Collaboration** — enable/disable it, set the maximum delegation depth and result cache, and choose per-agent defaults. See [Multi-Agent Delegation](/agents/delegation) for the full settings.

## Related

- [Multi-Agent Delegation](/agents/delegation) — the delegation settings and requirements
- [Supported Agents](/guide/supported-agents) — the agent types you can delegate between
