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
const titleId = computed(() => (zh.value ? 'mobile-showcase-title-zh' : 'mobile-showcase-title'))
const android = useAndroidRelease(baked.android)
</script>

<template>
  <div class="mobile-showcase-block">
    <section class="mobile-showcase" :aria-labelledby="titleId">
      <div class="mobile-showcase__copy">
        <p class="mobile-showcase__eyebrow">
          <span>{{ zh ? '原生 iOS 与 Android 客户端' : 'Native iOS & Android clients' }}</span>
          <span class="mobile-showcase__test-status">
            {{ zh ? '当前为测试版本' : 'Current test release' }}
          </span>
        </p>
        <h2 :id="titleId" class="mobile-showcase__title">
          {{ zh ? '离开电脑，任务也不必停下。' : 'Step away from your desk, not your work.' }}
        </h2>
        <p class="mobile-showcase__lead">
          {{ zh
            ? '连接你自己的 Codeg，在手机或平板上发起会话、跟进实时输出、处理审批，并随时接手正在运行的智能体。'
            : 'Connect to your own Codeg to start sessions, follow live output, handle approvals, and pick up any running agent from your phone or tablet.' }}
        </p>

        <ul class="mobile-showcase__highlights">
          <li>{{ zh ? '会话与工具调用实时流式返回' : 'Live sessions and streaming tool calls' }}</li>
          <li>{{ zh ? '项目、分支与工作区上下文随身可查' : 'Projects, branches, and workspace context' }}</li>
          <li>{{ zh ? '数据仍留在你掌控的电脑或服务器上' : 'Your data stays on the computer or server you control' }}</li>
        </ul>

        <div class="mobile-showcase__actions">
          <a
            class="mobile-showcase__button mobile-showcase__button--primary"
            :href="IOS_APP_STORE_URL"
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 18v2h14v-2" />
            </svg>
            {{ zh ? 'App Store 下载' : 'Download for iOS' }}
          </a>
          <a
            class="mobile-showcase__button"
            :href="android.url || ANDROID_RELEASES_URL"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 18v2h14v-2" />
            </svg>
            {{ zh ? '下载 Android APK' : 'Download Android APK' }}
          </a>
        </div>

        <p class="mobile-showcase__sources">
          {{ zh ? '开放源码：' : 'Open source:' }}
          <a :href="IOS_SOURCE_URL" target="_blank" rel="noreferrer">iOS</a>
          <span aria-hidden="true">·</span>
          <a :href="ANDROID_SOURCE_URL" target="_blank" rel="noreferrer">Android</a>
        </p>
      </div>

      <div class="mobile-showcase__devices">
        <figure class="mobile-device">
          <div class="mobile-device__frame">
            <img
              src="/images/mobile-ios.jpg"
              width="720"
              height="1565"
              loading="lazy"
              decoding="async"
              :alt="zh
                ? 'Codeg iOS 客户端的新建会话界面，可选择智能体、工作区、分支与权限模式'
                : 'The Codeg iOS new-session screen with agent, workspace, branch, and permission mode choices'"
            >
          </div>
          <figcaption>
            <strong>iPhone & iPad</strong>
            <span>{{ zh ? '原生 SwiftUI · Liquid Glass' : 'Native SwiftUI · Liquid Glass' }}</span>
          </figcaption>
        </figure>

        <figure class="mobile-device mobile-device--android">
          <div class="mobile-device__frame">
            <img
              src="/images/mobile-android.jpg"
              width="720"
              height="1616"
              loading="lazy"
              decoding="async"
              :alt="zh
                ? 'Codeg Android 客户端中的智能体回复、Markdown 内容和消息输入框'
                : 'An agent response, rendered Markdown, and message composer in the Codeg Android client'"
            >
          </div>
          <figcaption>
            <strong>Android</strong>
            <span>{{ zh ? 'Jetpack Compose · Material 3' : 'Jetpack Compose · Material 3' }}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  </div>
</template>

<style scoped>
.mobile-showcase-block {
  margin: 32px 0 24px;
}

.mobile-showcase {
  display: grid;
  grid-template-columns: minmax(250px, 0.8fr) minmax(0, 1.25fr);
  gap: clamp(32px, 6vw, 72px);
  align-items: center;
  margin: 0;
  padding: clamp(28px, 5vw, 52px);
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 24px;
  background:
    radial-gradient(circle at 88% 12%, rgba(41, 182, 246, 0.12), transparent 36%),
    radial-gradient(circle at 55% 82%, rgba(255, 64, 129, 0.1), transparent 34%),
    var(--vp-c-bg-soft);
}

.mobile-showcase__copy {
  min-width: 0;
}

.mobile-showcase__eyebrow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin: 0 0 10px;
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.09em;
  line-height: 1.4;
  text-transform: uppercase;
}

.mobile-showcase__test-status {
  display: inline-flex;
  padding: 2px 7px;
  border: 1px solid var(--vp-c-warning-3);
  border-radius: 999px;
  background: var(--vp-c-warning-soft);
  color: var(--vp-c-warning-1);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.03em;
  line-height: 1.4;
  text-transform: none;
}

.mobile-showcase__title {
  margin: 0;
  border: 0;
  padding: 0;
  color: var(--vp-c-text-1);
  font-size: clamp(1.75rem, 4vw, 2.55rem);
  font-weight: 760;
  letter-spacing: -0.035em;
  line-height: 1.08;
  text-align: left;
}

.mobile-showcase__lead {
  margin: 20px 0 0;
  color: var(--vp-c-text-2);
  font-size: 16px;
  line-height: 1.7;
}

.mobile-showcase__highlights {
  display: grid;
  gap: 10px;
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
}

.mobile-showcase__highlights li {
  position: relative;
  margin: 0;
  padding-left: 20px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.55;
}

.mobile-showcase__highlights li::before {
  position: absolute;
  top: 0.62em;
  left: 2px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  content: "";
}

.mobile-showcase__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
}

.mobile-showcase__button {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 9px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 650;
  line-height: 1.3;
  text-decoration: none;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.mobile-showcase__button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.mobile-showcase__button:focus-visible {
  outline: 3px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.mobile-showcase__button--primary {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
}

.mobile-showcase__button--primary:hover {
  border-color: var(--vp-c-brand-2);
  background: var(--vp-c-brand-2);
  color: var(--vp-c-bg);
}

.mobile-showcase__button svg {
  width: 17px;
  height: 17px;
  flex: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.mobile-showcase__sources {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 14px 0 0;
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.mobile-showcase__sources a {
  color: var(--vp-c-text-2);
  font-weight: 600;
  text-decoration: none;
}

.mobile-showcase__sources a:hover {
  color: var(--vp-c-brand-1);
}

.mobile-showcase__devices {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(16px, 3vw, 28px);
  align-items: end;
}

.mobile-device {
  min-width: 0;
  margin: 0;
}

.mobile-device--android {
  transform: translateY(24px);
}

.mobile-device__frame {
  padding: 7px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: clamp(24px, 4vw, 38px);
  background: #111318;
  box-shadow: 0 22px 50px rgba(9, 12, 20, 0.22);
}

.mobile-device__frame img {
  display: block;
  width: 100%;
}

.mobile-device__frame img {
  height: auto;
  margin: 0;
  border: 0;
  border-radius: clamp(18px, 3.4vw, 31px);
  box-shadow: none;
}

.mobile-device figcaption {
  display: grid;
  gap: 2px;
  margin-top: 13px;
  text-align: center;
}

.mobile-device figcaption strong {
  color: var(--vp-c-text-1);
  font-size: 13px;
  line-height: 1.4;
}

.mobile-device figcaption span {
  color: var(--vp-c-text-3);
  font-size: 11px;
  line-height: 1.4;
}

@media (max-width: 860px) {
  .mobile-showcase {
    grid-template-columns: 1fr;
  }

  .mobile-showcase__copy {
    max-width: 620px;
    margin: 0 auto;
    text-align: center;
  }

  .mobile-showcase__title {
    text-align: center;
  }

  .mobile-showcase__eyebrow {
    justify-content: center;
  }

  .mobile-showcase__highlights {
    display: inline-grid;
    text-align: left;
  }

  .mobile-showcase__actions,
  .mobile-showcase__sources {
    justify-content: center;
  }

  .mobile-showcase__devices {
    width: min(100%, 620px);
    margin: 0 auto;
  }
}

@media (max-width: 520px) {
  .mobile-showcase-block {
    margin-top: 24px;
  }

  .mobile-showcase {
    gap: 28px;
    padding: 24px 16px 28px;
    border-radius: 18px;
  }

  .mobile-showcase__lead {
    font-size: 15px;
  }

  .mobile-showcase__actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .mobile-showcase__button {
    width: 100%;
  }

  .mobile-showcase__devices {
    gap: 10px;
  }

  .mobile-device__frame {
    padding: 4px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mobile-device--android {
    transform: none;
  }
}
</style>
