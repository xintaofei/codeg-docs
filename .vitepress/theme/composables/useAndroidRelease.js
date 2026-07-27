import { onMounted, ref } from 'vue'
import { ANDROID_REPO, pickAndroidRelease } from '../../shared/mobile-release.js'

const CACHE_KEY = 'codeg-android-latest-release'
const TTL = 60 * 60 * 1000
let sharedAndroid
let refreshInFlight

function isRelease(value) {
  return Boolean(value?.version && value?.url)
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    // Corrupt JSON or unavailable storage is a cache miss, not a reason to
    // suppress the live refresh. Remove bad data when storage permits it.
    try {
      localStorage.removeItem(CACHE_KEY)
    } catch {
      // Storage can be disabled; the network path remains usable without it.
    }
    return null
  }
}

async function refresh() {
  const cached = readCache()
  if (
    cached?.t &&
    Date.now() - cached.t < TTL &&
    isRelease(cached.data)
  ) {
    sharedAndroid.value = cached.data
    return
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${ANDROID_REPO}/releases/latest`,
      { headers: { Accept: 'application/vnd.github+json' } },
    )
    if (!response.ok) return

    const latest = pickAndroidRelease(await response.json())
    if (!latest) return

    sharedAndroid.value = latest
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data: latest }))
    } catch {
      // The current page still receives the release when storage is disabled.
    }
  } catch {
    // Keep the build-time snapshot when GitHub is unavailable.
  }
}

function refreshOnce() {
  if (!refreshInFlight) {
    refreshInFlight = refresh().finally(() => {
      refreshInFlight = undefined
    })
  }
  return refreshInFlight
}

// Start with SSR-safe build data, then refresh once hydrated so every Android
// download CTA stays current between documentation deploys.
export function useAndroidRelease(initial) {
  if (!sharedAndroid) sharedAndroid = ref(initial)
  onMounted(refreshOnce)
  return sharedAndroid
}
