// Build-time data loader: fetches the latest codeg release so the Installation
// page ships with the real version and per-platform download URLs baked in.
// Falls back to a known-good snapshot when the build host is offline.
// https://vitepress.dev/guide/data-loading
import { REPO, RELEASES_URL, FALLBACK, pickDownloads } from '../shared/release.js'

export default {
  async load() {
    try {
      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), 8000)
      const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
        headers: {
          Accept: 'application/vnd.github+json',
          // GitHub's API rejects requests without a User-Agent.
          'User-Agent': 'codeg-docs-build',
        },
        signal: ctrl.signal,
      })
      clearTimeout(timer)
      if (res.ok) {
        const picked = pickDownloads(await res.json())
        if (picked) return { ...picked, releasesUrl: RELEASES_URL, live: true }
      }
    } catch {
      // offline / rate-limited — fall through to the snapshot
    }
    return { ...FALLBACK, releasesUrl: RELEASES_URL, live: false }
  },
}
