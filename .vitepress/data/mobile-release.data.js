// Fetch mobile release metadata at build time so download links are present in
// the rendered HTML. Each platform falls back independently when a store/API
// is unavailable.
import {
  ANDROID_REPO,
  MOBILE_FALLBACK,
  pickAndroidRelease,
  pickIosApp,
} from '../shared/mobile-release.js'

async function fetchJson(url, signal, headers = {}) {
  const response = await fetch(url, { headers, signal })
  if (!response.ok) throw new Error(`Request failed with ${response.status}`)
  return response.json()
}

export default {
  async load() {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)

    try {
      const [iosResult, androidResult] = await Promise.allSettled([
        fetchJson(
          'https://itunes.apple.com/lookup?id=6785199071&country=us',
          controller.signal,
        ),
        fetchJson(
          `https://api.github.com/repos/${ANDROID_REPO}/releases/latest`,
          controller.signal,
          {
            Accept: 'application/vnd.github+json',
            'User-Agent': 'codeg-docs-build',
          },
        ),
      ])

      const ios = iosResult.status === 'fulfilled' ? pickIosApp(iosResult.value) : null
      const android =
        androidResult.status === 'fulfilled'
          ? pickAndroidRelease(androidResult.value)
          : null

      return {
        ios: ios || MOBILE_FALLBACK.ios,
        android: android || MOBILE_FALLBACK.android,
      }
    } finally {
      clearTimeout(timer)
    }
  },
}
