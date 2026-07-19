---
title: 多智能体协作
description: 让你正在使用的智能体把自成一体的子任务委派给其他智能体——Claude Code 调用 Codex、Gemini 等等——每个都在各自的实时会话中运行，全部处于同一个对话内。
---

# 多智能体协作

这是 Codeg 的招牌功能。在一段对话内部，你正在使用的智能体——**主导智能体**——可以把一个自成一体的子任务交给*另一个*智能体，等待结果，然后把它融入自己的回答中。Claude Code 可以调用 Codex 来编写测试、请 Gemini 更新文档，或启动第二个智能体来审查它自己的工作——每个**子智能体**都作为自己的实时会话并行运行，而你自始至终无需离开对话。

何必费这个劲？有两个理由。**各有所长**——每个智能体擅长的事情各不相同，而委派让一项任务能借助多个智能体之力。**并行**——相互独立的工作片段同时运行，而不是一个接一个；主导智能体把它们扇出，再收集结果。

<div class="light-only">

![一个智能体委派给其他类型的子智能体](/images/collaboration-light.png)

</div>

<div class="dark-only">

![一个智能体委派给其他类型的子智能体](/images/collaboration-dark.png)

</div>

## 委派的工作原理 {#how-delegation-works}

当委派开启时，每个有能力的智能体都会获得一项额外的能力：它可以**让另一个智能体来执行子任务**。流程始终是一样的：

1. **主导智能体进行委派。** 它选定一个目标智能体，写下一份完整的任务描述，然后把它交出去。它可以一次性发出多个交接。
2. **一个子智能体运行。** Codeg 会启动该智能体的一个全新会话——它自己的对话，在你的工作文件夹中——并把任务交给它。
3. **结果返回。** 当子智能体完成后，它的回答会回到主导智能体那里，主导智能体继续进行：总结、合并，或再次委派。

有一个特性决定了你使用它的方方面面：**子智能体是冷启动的。** 它看不到你的对话、你打开的文件，或主导智能体所知道的任何东西——只能看到交给它的任务文本。因此，主导智能体必须把子智能体所需的一切都打包进那份任务里。（关于如何为此撰写，详见[下文](#write-a-good-delegation-prompt)。）

**谁能主导，谁能干活。** 委派能力以一个额外工具的形式到达智能体，通过 Codeg 内置的 MCP 服务器经由 ACP 交付——因此，只有当一个智能体通过该协议接受 MCP 工具时，它才能主导。有十个可以，并能*发起*委派：Claude Code、Codex、Gemini、OpenCode、Cline、Hermes、CodeBuddy、Kimi Code、Grok 和 Cursor。**OpenClaw** 和 **Pi** 不行——OpenClaw 干脆拒绝 MCP 服务器，而 Pi 则悄悄忽略它们——因此委派工具永远到不了它们那里，它们无法主导。全部十二个仍然可以*被*委派，这让 OpenClaw 和 Pi 成为完全合格的工作智能体。无论你正在与哪个有能力的智能体对话，它就是主导智能体；无需另外设置什么"编排器"。

## 开启它 {#turn-it-on}

委派默认是**关闭**的，因此第一步是启用它：

1. 打开**设置 → 通用**，找到**多智能体协作**。
2. 打开**启用委派**。（关闭时，委派工具根本不会提供给任何智能体。）

有几个相邻的设置值得了解：

- **最大委派深度**——委派可以嵌套多少层。默认是 **1**：主导智能体可以委派，但子智能体不能再进一步委派。只有当你希望子智能体去组建它们自己的团队时，才提高它（最高到 8）。
- **智能体默认设置**——每当 Codeg 把某个智能体作为工作智能体启动时所应用的模式和模型，从而让被委派的会话按你希望的方式配置好再开始。
- **已完成结果缓存**——Codeg 在内存中保留多少已完成的子智能体输出。

::: warning 工作智能体必须准备就绪
子智能体是一个真实智能体的真实会话，因此目标智能体必须**已启用、已安装且已登录**——就像你自己会启动的那种一样。委派给一个尚未就绪的智能体，那次交接会返回 *启动失败*；主导智能体会撇下它继续进行。[使用智能体](/zh/guide/agents)和[认证与模型](/zh/guide/authentication)介绍了如何让每一个都准备就绪。
:::

## 观看团队工作 {#watch-the-team-work}

委派全程可见——绝不是一个黑箱：

- **在主导智能体的回复中**，每次交接都会显示为一张**委派中**卡片——目标智能体、任务，以及一个实时状态——取代原始的工具调用。
- **一个子智能体面板**会收集最新回复中的工作智能体。折叠时，它是一个小小的 *子智能体 3* 标签；展开时，每一行都会显示智能体、它的任务，以及一个从**运行中**变为**已完成**（或**失败**）的状态徽标。
- **打开任意子智能体**，即可实时观看它完整的对话流——与你自己启动它时会看到的对话记录相同，只是只读的。你是在跟随观看，而不是在驾驶。
- **你依然握有那些至关重要的控制权。** 子智能体以你对该智能体的常规权限级别运行，因此当它想运行命令或写入文件时，它的**权限提示**会出现在它自己的视图内，供你允许或拒绝。如果它提出一个问题，你也在那里回答。

想让整个团队呈现在一个屏幕上？[将会话并排平铺](/zh/guide/workspace#tile-several-sessions-side-by-side)——主导智能体在一个窗格里，它的子智能体在其他窗格里——一次性观看每一份对话记录。

## 写好一份委派提示词 {#write-a-good-delegation-prompt}

由于子智能体是冷启动的，委派会青睐**具体、自成一体的请求。** 你其实是在同时写两样东西：你整体上想要什么，以及足够多的细节，好让主导智能体能向一个陌生人做交代。

好习惯：

- **说明哪些是独立的。** 如果任务的各部分互不依赖，就告诉主导智能体——"并行"、"同时"——它便能把它们扇出，而不是按顺序运行。
- **在意时就点名一个智能体。** "让 **Codex** 编写测试"会把那部分固定给 Codex；不写的话，主导智能体会自己选一个目标。
- **指向真实的东西。** 点明文件、路径和确切的结果。主导智能体会把这些原封不动地传给一个看不到你屏幕的子智能体。

一个开启三方拆分的提示词可能会这样写：

```text
Refactor src/auth.ts to use the new token helper yourself.
In parallel, have Codex write integration tests for the login flow,
and Gemini update the auth section of the README.
When all three are done, summarize what changed.
```

主导智能体亲自完成重构，把测试委派给 Codex、把文档委派给 Gemini，作为两个并行的子智能体，等待两者完成，然后给你一份统一的总结——与此同时，你在子智能体面板中观看三者。

## 示例工作流程 {#example-workflows}

在实践中，它会呈现出几种形态：

- **扇出。** 把相互独立的工作拆分到多个智能体上并一次性运行——就是上面那个重构加测试加文档的例子。当各部分互不依赖时最合适。
- **第二意见。** 让主导智能体完成工作，然后把对它的**审查**委派给一个*不同的*智能体，让审查者以全新视角来看待它——就是下面教程所演示的工作流程。
- **用对的工具做对的事。** 继续与你喜欢的智能体保持对话，但把某个特定的部分委派给最擅长它的那个智能体——一次棘手的重构、一门特定的语言、一遍文档梳理。
- **分割一个大范围。** 把子智能体指向不同的文件夹或模块——每次委派都可以有自己的工作目录——从而让一次大改动被拆成并行的切片来完成。

## 把工作流程变成一个技能 {#turn-a-workflow-into-a-skill}

委派完全由你如何向主导智能体发出提示来驱动——没有需要配置的编排器，因此一个多智能体工作流程其实只是一套好的指令。一旦你敲定了一个中意的，就**把它保存为一个技能**，下次用一个 `/command` 就能调用它。

一个技能就是一个小小的 Markdown 文件（`SKILL.md`），包含一个名称、一段描述，以及一段智能体在你调用它时会遵循的指令正文。一个编码了跨智能体工作流程的技能，只不过是告诉主导智能体去委派——例如一个 `build-with-review` 技能：

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

在**设置 → 技能**下撰写它，为**主导**智能体——也就是你将对其调用它的那个——启用它，然后在 composer 中输入 `/`（如果主导智能体是 Codex，则输入 `$`）来触发它。工作智能体不需要任何特别之处；它们只是执行主导智能体交给它们的任务。→ [技能](/zh/guide/skills) 全面介绍了撰写和启用。

::: info 与智能体自带的子智能体不同
有些智能体自带*它们自己的*子智能体功能，会启动更多**同一个智能体**的副本来并行处理工作——而好几个现成的技能，包括 Codeg 内置的 **Experts** 技能包中的若干个，就是为驱动*那个*而编写的。Codeg 的多智能体协作是另一回事：它**跨智能体类型**进行委派，一个模型调用另一个模型。一个谈论"subagents"却从不点名另一个智能体的技能，用的是智能体自己的机制，而不是 Codeg 的委派。
:::

## 教程：由团队构建并经过审查的功能 {#tutorial-a-reviewed-feature-built-by-a-team}

把它们组合起来——一个小功能，由一个智能体实现、由另一个智能体审查：

1. **启用委派。** 设置 → 通用 → **多智能体协作** → **启用委派**。
2. **让两个智能体都准备就绪。** 确保你的主导智能体和你将把审查委派给的那个都已各自启用并登录——参见[使用智能体](/zh/guide/agents)。
3. **开启会话。** 在项目文件夹中用你的主导智能体开启一个新对话。
4. **把工作和审查一起提出来。** 例如：
   ```text
   Add a "Copy link" button to the share dialog in src/share/Dialog.tsx.
   When it works, delegate a review to Codex: give it the diff, the goal,
   and the files you touched, and ask it to check for bugs and edge cases.
   Then address its feedback and tell me what changed.
   ```
5. **跟随进展。** 当主导智能体完成编码时，审查子智能体会出现在**子智能体**面板中。打开它，观看 Codex 阅读更改，并批准它弹出的任何权限提示。
6. **让它收敛。** 主导智能体读回审查意见，采纳值得采纳的部分，然后返回一个完成的、经过审查的更改。
7. **审阅并提交。** 在**更改**标签页中查看 diff，满意时就提交——整个 [git 工作流程](/zh/guide/git)就在那里。

经常这样做？把第 4 步封装成一个技能（见上文），它就变成了一个单命令工作流程。

## 值得了解 {#good-to-know}

- **默认只有一层深。** 如果你希望子智能体也能依次委派，就提高**最大委派深度**。
- **子智能体共享你的文件夹。** 工作智能体在主导智能体的工作目录中运行，除非主导智能体给它另一个——它不会自动获得自己的 git worktree。若要实现真正的隔离，请在 [worktree](/zh/guide/git#work-in-parallel-with-worktrees) 中或以无头[自动化](/zh/guide/automations)的方式运行并行工作。
- **每个子智能体都是一个完整的会话。** 它有自己的令牌开销，并会出现在你的历史中——委派会成倍增加正在完成的工作，用量也随之成倍增加。
- **OpenClaw 和 Pi 只能作为工作智能体。** 两者都不接受通过 ACP 传递的 MCP 工具——也就是委派工具的交付方式——因此它到不了它们那里。两者作为工作智能体都没问题，但无法主导。

## 后续步骤 {#next-steps}

- [**使用智能体**](/zh/guide/agents)——启用并登录你将编入团队的智能体。
- [**技能**](/zh/guide/skills)——把一个委派工作流程封装成一个可复用的 `/command`。
- [**Git 与 Worktree**](/zh/guide/git#work-in-parallel-with-worktrees)——运行你*自己的*并行会话，每个都在一个隔离的 worktree 中。
- [**工作区**](/zh/guide/workspace#tile-several-sessions-side-by-side)——把主导智能体和它的子智能体平铺，一次性观看它们全部。
