// Release metadata shared by the build-time mobile data loader and the
// download components. The public store/repository URLs are deliberately
// stable; only the displayed version and Android APK asset change over time.

export const IOS_APP_ID = 6785199071
export const IOS_APP_STORE_URL = `https://apps.apple.com/app/codeg-client/id${IOS_APP_ID}`
export const IOS_SOURCE_URL = 'https://github.com/xintaofei/codeg-ios'

export const ANDROID_REPO = 'xintaofei/codeg-android'
export const ANDROID_SOURCE_URL = `https://github.com/${ANDROID_REPO}`
export const ANDROID_RELEASES_URL = `${ANDROID_SOURCE_URL}/releases/latest`

export function pickIosApp(payload) {
  const app = payload?.results?.find((item) => Number(item.trackId) === IOS_APP_ID)
  if (!app?.version) return null

  return {
    version: app.version,
    date: (app.currentVersionReleaseDate || '').slice(0, 10),
    url: IOS_APP_STORE_URL,
  }
}

export function pickAndroidRelease(release) {
  if (!release?.tag_name || !Array.isArray(release.assets)) return null

  const apk = release.assets.find((asset) => /\.apk$/i.test(asset.name))
  if (!apk?.browser_download_url) return null

  return {
    version: release.tag_name.replace(/^v/, ''),
    date: (release.published_at || '').slice(0, 10),
    url: apk.browser_download_url,
  }
}

// Known-good values keep the page useful in offline and rate-limited builds.
// Refresh these when the documentation is updated for a new mobile release.
export const MOBILE_FALLBACK = {
  ios: {
    version: '1.0.1',
    date: '2026-07-07',
    url: IOS_APP_STORE_URL,
  },
  android: {
    version: '1.0.0',
    date: '2026-07-26',
    url: `${ANDROID_SOURCE_URL}/releases/download/v1.0.0/codeg-android-v1.0.0.apk`,
  },
}
