# General

**Settings → General** collects preferences for the default terminal, rendering, and multi-agent delegation.

## Default Terminal

Choose the **default shell** Codeg uses for its integrated terminal: the system default, a specific Windows shell (PowerShell 7, Windows PowerShell, Command Prompt), or a **custom path** (Codeg probes that the path exists).

## Rendering

*(Windows desktop only.)* **Disable hardware acceleration** — toggle this if you hit GPU rendering glitches. Changing it prompts a restart.

## Multi-Agent Collaboration

Configure delegation between agents:

- **Enable delegation** — off hides the `delegate_to_agent` tool.
- **Maximum delegation depth** and **Completed-result cache (MB)**.
- **Agent defaults** — per-agent mode/model overrides for delegated runs.

See [Multi-Agent Delegation](/agents/delegation) for the full details.

## Session tools

Three toggles add optional tools to newly started agents:

- **Live Feedback** — lets you send mid-run feedback.
- **Ask user question** — lets the agent ask you a multiple-choice question.
- **Get session info** — lets the agent look up other sessions.
