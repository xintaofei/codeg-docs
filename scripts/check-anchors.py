#!/usr/bin/env python3
"""Check every internal anchor link in the docs against the built HTML.

VitePress fails a build on a dead *page* link but says nothing about a dead
*anchor*, so this walks the markdown for `](/path#anchor)` and same-page
`](#anchor)` and resolves each against the heading ids that actually rendered.

Heading ids come from the built HTML rather than from a re-implemented slugify:
VitePress's slug rules have surprises (an em-dash survives literally into the
id), and re-deriving them is how a checker ends up agreeing with itself and
disagreeing with the site.

    pnpm docs:build && python3 scripts/check-anchors.py

Exits non-zero when anything is broken.
"""

import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / ".vitepress" / "dist"

SKIP_DIRS = {"node_modules", ".vitepress", "drafts", "public"}

# `](/guide/page#anchor)` or `](#anchor)`; ignores external and mailto links.
LINK_RE = re.compile(r"\]\((/[^)\s]*?|)#([^)\s]+)\)")
ID_RE = re.compile(r'<h[1-6][^>]*\bid="([^"]+)"')


def route_of(md: Path) -> str:
    """Markdown path -> site route, matching VitePress's own mapping."""
    rel = md.relative_to(ROOT).with_suffix("")
    parts = list(rel.parts)
    if parts[-1] == "index":
        parts.pop()
    return "/" + "/".join(parts) if parts else "/"


def dist_html(route: str) -> Path:
    """Built page for a route. A directory index renders as `<dir>/index.html`,
    everything else as `<name>.html`."""
    stem = route.strip("/")
    if not stem:
        return DIST / "index.html"
    flat = DIST / f"{stem}.html"
    return flat if flat.is_file() else DIST / stem / "index.html"


def main() -> int:
    if not DIST.is_dir():
        print("no build output — run `pnpm docs:build` first", file=sys.stderr)
        return 2

    ids: dict[str, set[str]] = {}
    pages: list[Path] = []
    for md in sorted(ROOT.rglob("*.md")):
        if any(p in SKIP_DIRS for p in md.relative_to(ROOT).parts):
            continue
        pages.append(md)
        route = route_of(md)
        page = dist_html(route)
        if page.is_file():
            ids[route] = {
                html.unescape(m) for m in ID_RE.findall(page.read_text("utf-8"))
            }

    broken: list[str] = []
    total = 0
    for md in pages:
        here = route_of(md)
        for lineno, line in enumerate(md.read_text("utf-8").splitlines(), 1):
            for target, anchor in LINK_RE.findall(line):
                total += 1
                route = (target or here).rstrip("/") or "/"
                if route not in ids:
                    broken.append(f"{md.relative_to(ROOT)}:{lineno}  no page {route}")
                elif html.unescape(anchor) not in ids[route]:
                    broken.append(
                        f"{md.relative_to(ROOT)}:{lineno}  {route}#{anchor}"
                    )

    print(f"{len(ids)} routes, {total} anchor links, {len(broken)} broken")
    for row in broken:
        print("  " + row)
    return 1 if broken else 0


if __name__ == "__main__":
    sys.exit(main())
