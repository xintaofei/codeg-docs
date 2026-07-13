# Supported Agents

Codeg aggregates conversations from many coding agents. It discovers each agent's sessions from a configurable location, falling back to a sensible per-platform default.

| Agent        | Environment Variable Path             | macOS / Linux Default                 | Windows Default                                       |
| ------------ | ------------------------------------- | ------------------------------------- | ----------------------------------------------------- |
| Claude Code  | `$CLAUDE_CONFIG_DIR/projects`         | `~/.claude/projects`                  | `%USERPROFILE%\.claude\projects`                      |
| Codex CLI    | `$CODEX_HOME/sessions`                | `~/.codex/sessions`                   | `%USERPROFILE%\.codex\sessions`                       |
| OpenCode     | `$XDG_DATA_HOME/opencode/opencode.db` | `~/.local/share/opencode/opencode.db` | `%USERPROFILE%\.local\share\opencode\opencode.db`     |
| Gemini CLI   | `$GEMINI_CLI_HOME/.gemini`            | `~/.gemini`                           | `%USERPROFILE%\.gemini`                               |
| OpenClaw     | —                                     | `~/.openclaw/agents`                  | `%USERPROFILE%\.openclaw\agents`                      |
| Cline        | `$CLINE_DIR`                          | `~/.cline/data/tasks`                 | `%USERPROFILE%\.cline\data\tasks`                     |
| Hermes Agent | `$HERMES_HOME/state.db`               | `~/.hermes/state.db`                  | `%USERPROFILE%\.hermes\state.db`                      |
| CodeBuddy    | `$CODEBUDDY_CONFIG_DIR/projects`      | `~/.codebuddy/projects`               | `%USERPROFILE%\.codebuddy\projects`                   |
| Kimi Code    | `$KIMI_CODE_HOME/sessions`            | `~/.kimi-code/sessions`               | `%USERPROFILE%\.kimi-code\sessions`                   |
| Pi           | `$PI_CODING_AGENT_SESSION_DIR`        | `~/.pi/agent/sessions`                | `%USERPROFILE%\.pi\agent\sessions`                    |
| Grok Build   | `$GROK_HOME/sessions`                 | `~/.grok/sessions`                    | `%USERPROFILE%\.grok\sessions`                        |

::: tip
Environment variables take precedence over the fallback paths.
:::

Once your agents are detected, Codeg can aggregate their conversations into one workspace and let them [collaborate within a single session](/features/multi-agent-collaboration).
