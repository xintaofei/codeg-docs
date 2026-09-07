#!/usr/bin/env python3
"""Check that each English page and its `zh/` mirror line up.

The zh docs pin every heading to its English slug (`## 标题 {#english-slug}`)
so anchors are stable across locales. This compares, per page:

  * the heading ids that actually rendered, in order
  * a coarse block signature — how many list items, tables, fenced blocks and
    `:::` containers each side has

A mismatch is usually a section added to one locale and not the other, or a
missing `{#slug}` pin. Two known exceptions are tolerated and listed below.

Heading ids are read from the built HTML for the same reason as in
check-anchors.py: never re-implement the slugify.

    pnpm docs:build && python3 scripts/check-parity.py

Exits non-zero on an unexpected mismatch.
"""

import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / ".vitepress" / "dist"
SKIP_DIRS = {"node_modules", ".vitepress", "drafts", "public"}

# h2–h6 only: the page title is never linked to and is deliberately left
# unpinned, so its slug differs by locale on every page.
ID_RE = re.compile(r'<h[2-6][^>]*\bid="([^"]+)"')

# Pre-existing, deliberate: a zh-only anchor on the home page, and a zh-only
# translator's note container on the multi-agent page.
KNOWN = {
    "index.md": {"ids"},
    "guide/multi-agent.md": {"containers"},
}


def counts(md: Path) -> dict[str, int]:
    text = md.read_text("utf-8")
    body = re.sub(r"^---\n.*?\n---\n", "", text, count=1, flags=re.S)
    return {
        "items": len(re.findall(r"^\s*[-*] ", body, re.M)),
        "tables": len(re.findall(r"^\|", body, re.M)),
        "fences": len(re.findall(r"^```", body, re.M)),
        "containers": len(re.findall(r"^:::", body, re.M)),
    }


def route_of(rel: Path) -> str:
    parts = list(rel.with_suffix("").parts)
    if parts[-1] == "index":
        parts.pop()
    return "/" + "/".join(parts) if parts else "/"


def ids_of(rel: Path) -> list[str] | None:
    stem = route_of(rel).strip("/")
    if not stem:
        page = DIST / "index.html"
    else:
        flat = DIST / f"{stem}.html"
        page = flat if flat.is_file() else DIST / stem / "index.html"
    if not page.is_file():
        return None
    return [html.unescape(m) for m in ID_RE.findall(page.read_text("utf-8"))]


def main() -> int:
    if not DIST.is_dir():
        print("no build output — run `pnpm docs:build` first", file=sys.stderr)
        return 2

    problems: list[str] = []
    checked = 0
    for en in sorted(ROOT.rglob("*.md")):
        rel = en.relative_to(ROOT)
        if any(p in SKIP_DIRS for p in rel.parts) or rel.parts[0] == "zh":
            continue
        zh = ROOT / "zh" / rel
        if not zh.is_file():
            problems.append(f"{rel}  no zh mirror")
            continue
        checked += 1
        allow = KNOWN.get(str(rel), set())

        en_ids, zh_ids = ids_of(rel), ids_of(Path("zh") / rel)
        if en_ids is not None and zh_ids is not None:
            if en_ids != zh_ids and "ids" not in allow:
                only_en = [i for i in en_ids if i not in zh_ids]
                only_zh = [i for i in zh_ids if i not in en_ids]
                problems.append(
                    f"{rel}  headings differ  en-only={only_en} zh-only={only_zh}"
                )

        a, b = counts(en), counts(zh)
        for key in a:
            if a[key] != b[key] and key not in allow:
                problems.append(f"{rel}  {key}: en={a[key]} zh={b[key]}")

    print(f"{checked} pages compared, {len(problems)} problems")
    for row in problems:
        print("  " + row)
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
