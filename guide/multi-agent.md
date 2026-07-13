---
title: Multi-Agent Collaboration
description: Let the agent you're working with delegate self-contained sub-tasks to other agents — Claude Code calling Codex, Gemini, and more — each in its own live session, all inside one conversation.
---

# Multi-Agent Collaboration

This is Codeg's headline feature. Inside a single conversation, the agent you're working with — the **lead** — can hand a self-contained sub-task to *another* agent, wait for the result, and fold it into its own answer. Claude Code can call Codex to write tests, ask Gemini to update the docs, or spin up a second agent to review its own work — each **sub-agent** running as its own live session, in parallel, without you ever leaving the conversation.

Why bother? Two reasons. **Strengths** — every agent is good at different things, and delegation lets one task draw on several. **Parallelism** — independent pieces of work run at the same time instead of one after another; the lead fans them out and collects the results.

<div class="light-only">

![One agent delegating to sub-agents of other types](/images/collaboration-light.png)

</div>

<div class="dark-only">

![One agent delegating to sub-agents of other types](/images/collaboration-dark.png)

</div>

## How delegation works

When delegation is on, every capable agent gains one extra ability: it can **start another agent on a sub-task**. The flow is always the same:

1. **The lead delegates.** It picks a target agent and writes a complete task description, then hands it off. It can issue several hand-offs at once.
2. **A sub-agent runs.** Codeg starts a fresh session of that agent — its own conversation, in your working folder — and gives it the task.
3. **The result returns.** When the sub-agent finishes, its answer comes back to the lead, which carries on: summarizing, combining, or delegating again.

One property shapes everything about how you use this: **a sub-agent starts cold.** It can't see your conversation, your open files, or anything the lead knows — only the task text it's handed. So the lead has to pack everything the sub-agent needs into that task. (More on writing for that [below](#write-a-good-delegation-prompt).)

**Who can lead, who can work.** The delegate ability reaches an agent as an extra tool, delivered through Codeg's built-in MCP server over ACP — so an agent can only lead if it accepts MCP tools over the protocol. Nine do, and can *initiate* delegation: Claude Code, Codex, Gemini, OpenCode, Cline, Hermes, CodeBuddy, Kimi Code, and Grok. **OpenClaw** and **Pi** don't — OpenClaw refuses MCP servers outright, and Pi quietly ignores them — so the delegate tool never reaches them and they can't lead. All eleven can still be delegated *to*, which makes OpenClaw and Pi perfectly good workers. Whichever capable agent you're chatting with is the lead; there's no separate "orchestrator" to set up.

## Turn it on

Delegation ships **off**, so the first step is enabling it:

1. Open **Settings → General** and find **Multi-Agent Collaboration**.
2. Switch on **Enable delegation**. (With it off, the delegate tool simply isn't offered to any agent.)

A few neighbouring settings are worth knowing:

- **Maximum delegation depth** — how many levels deep delegation can nest. The default is **1**: the lead can delegate, but a sub-agent can't delegate further. Raise it (up to 8) only if you want sub-agents that build teams of their own.
- **Agent defaults** — the mode and model Codeg applies whenever it spawns a given agent as a worker, so delegated sessions start configured the way you want.
- **Completed-result cache** — how much finished sub-agent output Codeg keeps in memory.

::: warning Workers have to be ready
A sub-agent is a real session of a real agent, so the target must be **enabled, installed, and signed in** — just like one you'd start yourself. Delegate to an agent that isn't ready and that hand-off comes back as *spawn failed*; the lead keeps going without it. [Working with Agents](/guide/agents) and [Authentication & Models](/guide/authentication) cover getting each one ready.
:::

## Watch the team work

Delegation is visible the whole way through — never a black box:

- **In the lead's reply**, each hand-off shows up as a **delegating** card — the target agent, the task, and a live status — in place of a raw tool call.
- **A Sub-agents panel** collects the workers from the latest reply. Collapsed, it's a small *Sub-agents 3* chip; expanded, each row shows the agent, its task, and a status badge that moves from **Running** to **Completed** (or **Failed**).
- **Open any sub-agent** to watch its full conversation stream live — the same transcript you'd see if you'd started it yourself, but read-only. You're following along, not driving.
- **You still hold the controls that matter.** A sub-agent runs at your normal permission level for that agent, so when it wants to run a command or write a file, its **permission prompt** appears inside its view for you to allow or reject. If it asks a question, you answer it there too.

Want the whole team on one screen? [Tile the sessions side by side](/guide/workspace#tile-several-sessions-side-by-side) — the lead in one pane, its sub-agents in the others — and watch every transcript at once.

## Write a good delegation prompt

Because a sub-agent starts cold, delegation rewards **specific, self-contained requests.** You're really writing two things at once: what you want overall, and enough detail that the lead can brief a stranger.

Good habits:

- **Say what's independent.** If parts of the task don't depend on each other, tell the lead — "in parallel," "at the same time" — and it can fan them out instead of running them in sequence.
- **Name an agent when you care.** "Have **Codex** write the tests" pins that piece to Codex; leave it out and the lead chooses a target itself.
- **Point at the real thing.** Name files, paths, and the exact outcome. The lead passes these straight through to a sub-agent that can't see your screen.

A prompt that kicks off a three-way split might read:

```text
Refactor src/auth.ts to use the new token helper yourself.
In parallel, have Codex write integration tests for the login flow,
and Gemini update the auth section of the README.
When all three are done, summarize what changed.
```

The lead does the refactor, delegates the tests to Codex and the docs to Gemini as two parallel sub-agents, waits for both, and gives you a single summary — while you watch all three in the Sub-agents panel.

## Example workflows

A few shapes this takes in practice:

- **Fan-out.** Split independent work across agents and run it at once — the refactor-plus-tests-plus-docs example above. Best when the pieces don't depend on each other.
- **Second opinion.** Have the lead do the work, then delegate a **review** of it to a *different* agent so the reviewer comes at it fresh — the workflow the tutorial below walks through.
- **Right tool for the job.** Stay in the conversation with the agent you like, but delegate one specific piece to whichever agent is strongest at it — a gnarly refactor, a particular language, a documentation pass.
- **Divide a big surface.** Point sub-agents at different folders or modules — each delegation can take its own working directory — so a large change is worked in parallel slices.

## Turn a workflow into a skill

Delegation is driven entirely by how you prompt the lead — there's no orchestrator to configure, so a multi-agent workflow is really just a good set of instructions. Once you land on one you like, **save it as a skill** and invoke it with a single `/command` next time.

A skill is a small Markdown file (`SKILL.md`) with a name, a description, and a body of instructions the agent follows when you invoke it. A skill that encodes a cross-agent workflow simply tells the lead to delegate — for example, a `build-with-review` skill:

```markdown
---
name: build-with-review
description: Implement a change, then have a different agent review it.
---

# Build With Cross-Agent Review

When the user invokes this skill:

1. Implement the requested change yourself.
2. When it works, **delegate a review to a different agent** — hand another
   agent (say Codex or Gemini) the diff, the goal, and the files you touched,
   and ask it to hunt for bugs, missed edge cases, and unclear code. It can't
   see this conversation, so include everything it needs.
3. Read the review back, address what's worth addressing, and summarize both
   what you changed and what the reviewer flagged.
```

Author it under **Settings → Skills**, enable it for the **lead** agent — the one you'll invoke it on — and trigger it in the composer by typing `/` (or `$` if the lead is Codex). The workers need nothing special; they just carry out the task the lead hands them. → [Skills](/guide/skills) covers authoring and enabling in full.

::: info Not the same as an agent's own sub-agents
Some agents ship their *own* sub-agent feature that spins up more copies of **the same agent** to parallelize work — and several ready-made skills, including a number in Codeg's built-in **Experts** pack, are written to drive *that*. Codeg's multi-agent collaboration is the different one: it delegates **across agent types**, one model calling another. A skill that talks about "subagents" but never names another agent is using the agent's own mechanism, not Codeg's delegation.
:::

## Tutorial: a reviewed feature, built by a team

Putting it together — a small feature, implemented by one agent and reviewed by another:

1. **Enable delegation.** Settings → General → **Multi-Agent Collaboration** → **Enable delegation**.
2. **Get both agents ready.** Make sure your lead agent and the one you'll delegate the review to are each enabled and signed in — see [Working with Agents](/guide/agents).
3. **Start the session.** Open a new conversation with your lead agent in the project folder.
4. **Ask for the work and the review together.** For example:
   ```text
   Add a "Copy link" button to the share dialog in src/share/Dialog.tsx.
   When it works, delegate a review to Codex: give it the diff, the goal,
   and the files you touched, and ask it to check for bugs and edge cases.
   Then address its feedback and tell me what changed.
   ```
5. **Follow along.** The review sub-agent appears in the **Sub-agents** panel as the lead finishes coding. Open it to watch Codex read the change, and approve any permission prompts it raises.
6. **Let it converge.** The lead reads the review back, applies what's worth applying, and returns a finished, reviewed change.
7. **Review and commit.** Check the diff in the **Changes** tab and commit when you're happy — the whole [git workflow](/guide/git) is right there.

Doing this a lot? Bottle step 4 as a skill (above) and it becomes a one-command workflow.

## Good to know

- **One level deep by default.** Raise **Maximum delegation depth** if you want sub-agents that delegate in turn.
- **Sub-agents share your folder.** A worker runs in the lead's working directory unless the lead gives it another — it doesn't get its own git worktree automatically. For true isolation, run parallel work in [worktrees](/guide/git#work-in-parallel-with-worktrees) or headless [Automations](/guide/automations).
- **Every sub-agent is a full session.** It has its own token cost and turns up in your history — delegation multiplies the work being done, and the usage along with it.
- **OpenClaw and Pi are workers only.** Neither accepts MCP tools over ACP — the way the delegate tool is delivered — so it can't reach them. Both are fine as workers, but can't lead.

## Next steps

- [**Working with Agents**](/guide/agents) — enable and sign in the agents you'll put on a team.
- [**Skills**](/guide/skills) — bottle a delegation workflow into a reusable `/command`.
- [**Git & Worktrees**](/guide/git#work-in-parallel-with-worktrees) — run your *own* parallel sessions, each in an isolated worktree.
- [**The Workspace**](/guide/workspace#tile-several-sessions-side-by-side) — tile the lead and its sub-agents to watch them all at once.
