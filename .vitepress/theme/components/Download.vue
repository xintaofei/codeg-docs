<script setup>
import { ref, computed, onMounted } from 'vue'
import { useData } from 'vitepress'
import { data as baked } from '../../data/release.data.js'
import { pickDownloads, releaseNotesUrl, RELEASES_URL, REPO } from '../../shared/release.js'

// Localize the handful of prose strings; OS / arch / extension labels are
// universal and stay as-is.
const { lang } = useData()
const zh = computed(() => lang.value.toLowerCase().startsWith('zh'))

// Start from the build-time snapshot (SSR-safe, no blank flash), then refresh
// against the GitHub API on mount so the page stays current between deploys.
const rel = ref(baked)
const notesUrl = computed(() => releaseNotesUrl(rel.value.version))

const CACHE_KEY = 'codeg-latest-release'
const TTL = 60 * 60 * 1000 // 1 hour

onMounted(async () => {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
    if (cached && cached.t && Date.now() - cached.t < TTL && cached.data) {
      rel.value = cached.data
      return
    }
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return
    const picked = pickDownloads(await res.json())
    if (picked) {
      rel.value = { ...picked, releasesUrl: RELEASES_URL }
      localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data: rel.value }))
    }
  } catch {
    // keep the baked snapshot
  }
})
</script>

<template>
  <div class="dl">
    <div class="dl-head">
      <span class="dl-badge">{{ zh ? '最新版' : 'Latest' }}</span>
      <a class="dl-ver" :href="notesUrl" target="_blank" rel="noreferrer">v{{ rel.version }}</a>
      <span v-if="rel.date" class="dl-date">· {{ rel.date }}</span>
    </div>

    <div class="dl-grid">
      <section class="dl-card">
        <h4 class="dl-os">macOS</h4>
        <a class="dl-btn" :href="rel.assets.macApple || rel.releasesUrl">
          Apple Silicon <span class="dl-ext">.dmg</span>
        </a>
        <a class="dl-btn alt" :href="rel.assets.macIntel || rel.releasesUrl">
          Intel <span class="dl-ext">.dmg</span>
        </a>
      </section>

      <section class="dl-card">
        <h4 class="dl-os">Windows</h4>
        <a class="dl-btn" :href="rel.assets.winX64 || rel.releasesUrl">
          x64 {{ zh ? '安装程序' : 'Installer' }} <span class="dl-ext">.exe</span>
        </a>
        <a class="dl-btn alt" :href="rel.assets.winArm64 || rel.releasesUrl">
          Arm64 {{ zh ? '安装程序' : 'Installer' }} <span class="dl-ext">.exe</span>
        </a>
      </section>

      <section class="dl-card">
        <h4 class="dl-os">Linux</h4>
        <a class="dl-btn" :href="rel.assets.linuxAppImage || rel.releasesUrl">
          x64 <span class="dl-ext">.AppImage</span>
        </a>
        <div class="dl-mini-row">
          <a class="dl-btn alt dl-mini" :href="rel.assets.linuxDebX64 || rel.releasesUrl">.deb</a>
          <a class="dl-btn alt dl-mini" :href="rel.assets.linuxRpmX64 || rel.releasesUrl">.rpm</a>
        </div>
        <p class="dl-arm">
          arm64:
          <a :href="rel.assets.linuxDebArm64 || rel.releasesUrl">.deb</a> ·
          <a :href="rel.assets.linuxRpmArm64 || rel.releasesUrl">.rpm</a>
        </p>
      </section>
    </div>

    <p class="dl-foot">
      <template v-if="zh">
        更早的版本与独立服务器构建见<a :href="rel.releasesUrl" target="_blank" rel="noreferrer">发布页</a>。
      </template>
      <template v-else>
        Older versions and the standalone server build are on the
        <a :href="rel.releasesUrl" target="_blank" rel="noreferrer">releases page</a>.
      </template>
    </p>
  </div>
</template>

<style scoped>
.dl {
  margin: 20px 0 8px;
}
.dl-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.dl-badge {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-radius: 10px;
  padding: 1px 9px;
  font-size: 12px;
  font-weight: 600;
}
.dl-ver {
  font-weight: 700;
  font-size: 16px;
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.dl-ver:hover {
  color: var(--vp-c-brand-1);
}
.dl-date {
  color: var(--vp-c-text-3);
  font-size: 14px;
}
.dl-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 14px;
}
.dl-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}
.dl-os {
  margin: 0 0 12px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
}
.dl-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s;
}
.dl-btn:hover {
  background: var(--vp-c-brand-2);
  /* Override VitePress's higher-specificity `.vp-doc a:hover` colour, which
     would otherwise turn this button's label dark-on-dark on hover. */
  color: #fff;
}
.dl-btn.alt {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}
.dl-btn.alt:hover {
  background: var(--vp-c-default-3);
  color: var(--vp-c-text-1);
}
.dl-ext {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.75;
}
.dl-mini-row {
  display: flex;
  gap: 8px;
}
.dl-mini {
  flex: 1;
  justify-content: center;
  margin-bottom: 0;
}
.dl-arm {
  margin: 10px 0 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.dl-arm a {
  color: var(--vp-c-text-2);
  font-weight: 600;
  text-decoration: none;
}
.dl-arm a:hover {
  color: var(--vp-c-brand-1);
}
.dl-foot {
  margin-top: 16px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
