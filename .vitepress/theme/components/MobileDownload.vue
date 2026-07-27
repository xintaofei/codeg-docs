<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { data as baked } from '../../data/mobile-release.data.js'
import {
  ANDROID_RELEASES_URL,
  ANDROID_SOURCE_URL,
  IOS_APP_STORE_URL,
  IOS_SOURCE_URL,
} from '../../shared/mobile-release.js'
import { useAndroidRelease } from '../composables/useAndroidRelease.js'

const { lang } = useData()
const zh = computed(() => lang.value.toLowerCase().startsWith('zh'))
const android = useAndroidRelease(baked.android)
</script>

<template>
  <div class="mobile-download">
    <div class="mobile-download__test-note" role="note">
      <strong>{{ zh ? '当前为测试版本' : 'Current test releases' }}</strong>
      <span>
        {{ zh
          ? 'iOS 与 Android 应用仍处于测试阶段，功能、兼容性与分发方式可能会在正式版前调整。'
          : 'The iOS and Android apps are still in testing; features, compatibility, and distribution may change before the stable release.' }}
      </span>
    </div>

    <div class="mobile-download__grid">
      <section class="mobile-download__card" aria-labelledby="ios-download-title">
        <div class="mobile-download__head">
          <span class="mobile-download__device" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
              <path d="M10 5h4M11 18.5h2" />
            </svg>
          </span>
          <div>
            <h3 id="ios-download-title">iOS</h3>
            <p>iPhone · iPad</p>
          </div>
          <span class="mobile-download__version">v{{ baked.ios.version }}</span>
        </div>

        <p class="mobile-download__summary">
          {{ zh
            ? '使用 SwiftUI 打造的通用原生客户端，支持实时会话、Markdown、工具调用与权限审批。'
            : 'A universal SwiftUI client with live sessions, Markdown, tool calls, and permission prompts.' }}
        </p>

        <p class="mobile-download__requirement">
          {{ zh ? '需要 iOS 26 或更高版本' : 'Requires iOS 26 or later' }}
        </p>

        <div class="mobile-download__actions">
          <a
            class="mobile-download__button mobile-download__button--primary"
            :href="IOS_APP_STORE_URL"
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 18v2h14v-2" />
            </svg>
            {{ zh ? '前往 App Store' : 'Download on the App Store' }}
          </a>
          <a
            class="mobile-download__button"
            :href="IOS_SOURCE_URL"
            target="_blank"
            rel="noreferrer"
          >
            {{ zh ? '查看源码' : 'View source' }}
          </a>
        </div>
      </section>

      <section class="mobile-download__card" aria-labelledby="android-download-title">
        <div class="mobile-download__head">
          <span class="mobile-download__device" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
              <path d="M10 5h4M11 18.5h2" />
            </svg>
          </span>
          <div>
            <h3 id="android-download-title">Android</h3>
            <p>{{ zh ? '手机 · 平板' : 'Phone · Tablet' }}</p>
          </div>
          <span class="mobile-download__version">v{{ android.version }}</span>
        </div>

        <p class="mobile-download__summary">
          {{ zh
            ? '使用 Jetpack Compose 与 Material 3 打造，支持会话、项目、Git、设置与实时任务流。'
            : 'Built with Jetpack Compose and Material 3 for sessions, projects, Git, settings, and live task streams.' }}
        </p>

        <p class="mobile-download__requirement">
          {{ zh ? '需要 Android 12 或更高版本' : 'Requires Android 12 or later' }}
        </p>

        <div class="mobile-download__actions">
          <a
            class="mobile-download__button mobile-download__button--primary"
            :href="android.url || ANDROID_RELEASES_URL"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 18v2h14v-2" />
            </svg>
            {{ zh ? '下载 APK' : 'Download APK' }}
          </a>
          <a
            class="mobile-download__button"
            :href="ANDROID_SOURCE_URL"
            target="_blank"
            rel="noreferrer"
          >
            {{ zh ? '查看源码' : 'View source' }}
          </a>
        </div>
      </section>
    </div>

    <p class="mobile-download__note">
      <template v-if="zh">
        移动应用是连接你自己的 Codeg 的原生客户端；智能体、项目与会话仍运行在你的电脑或服务器上。
        Android 的历史版本与 SHA-256 校验值见<a :href="ANDROID_RELEASES_URL" target="_blank" rel="noreferrer">发布页</a>。
      </template>
      <template v-else>
        The mobile apps are native clients for your own Codeg; agents, projects, and sessions keep running on your computer or server.
        Older Android builds and SHA-256 checksums are on the
        <a :href="ANDROID_RELEASES_URL" target="_blank" rel="noreferrer">releases page</a>.
      </template>
    </p>
  </div>
</template>

<style scoped>
.mobile-download {
  margin: 20px 0 8px;
}

.mobile-download__test-note {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 0 0 14px;
  padding: 11px 13px;
  border: 1px solid var(--vp-c-warning-3);
  border-radius: 12px;
  background: var(--vp-c-warning-soft);
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.55;
}

.mobile-download__test-note strong {
  flex: none;
  color: var(--vp-c-warning-1);
  font-size: 12px;
  font-weight: 700;
}

.mobile-download__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.mobile-download__card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: linear-gradient(145deg, var(--vp-c-bg-soft), var(--vp-c-bg));
}

.mobile-download__head {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
}

.mobile-download__head h3,
.mobile-download__head p {
  margin: 0;
}

.mobile-download__head h3 {
  border: 0;
  padding: 0;
  font-size: 17px;
  line-height: 1.3;
}

.mobile-download__head p {
  color: var(--vp-c-text-3);
  font-size: 12px;
  line-height: 1.4;
}

.mobile-download__device {
  display: inline-flex;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.mobile-download__device svg {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.mobile-download__version {
  align-self: start;
  padding: 3px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  color: var(--vp-c-text-2);
  font-size: 11px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.mobile-download__summary {
  flex: 1;
  margin: 16px 0 8px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}

.mobile-download__requirement {
  margin: 0 0 14px;
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.mobile-download__actions {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(92px, 0.8fr);
  gap: 8px;
}

.mobile-download__button {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  text-decoration: none;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.mobile-download__button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.mobile-download__button:focus-visible {
  outline: 3px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.mobile-download__button--primary {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
}

.mobile-download__button--primary:hover {
  border-color: var(--vp-c-brand-2);
  background: var(--vp-c-brand-2);
  color: var(--vp-c-bg);
}

.mobile-download__button svg {
  width: 18px;
  height: 18px;
  flex: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.mobile-download__note {
  margin: 14px 2px 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.6;
}

@media (max-width: 720px) {
  .mobile-download__test-note {
    align-items: flex-start;
    flex-direction: column;
    gap: 3px;
  }

  .mobile-download__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 420px) {
  .mobile-download__card {
    padding: 16px;
  }

  .mobile-download__actions {
    grid-template-columns: 1fr;
  }
}
</style>
