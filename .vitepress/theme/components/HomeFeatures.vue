<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { VPFeatures } from 'vitepress/theme'

const { frontmatter, lang } = useData()
const features = computed(() => frontmatter.value.homeFeatures ?? [])
const zh = computed(() => lang.value.toLowerCase().startsWith('zh'))
const copy = computed(() =>
  zh.value
    ? {
        eyebrow: 'Codeg 核心能力',
        title: '一个工作区，覆盖智能体工作的每一步。',
        description: '聚合会话、协同智能体、启动项目、接入聊天频道、处理文档与科研任务、运行自动化，并在移动端继续推进。',
      }
    : {
        eyebrow: 'Built into Codeg',
        title: 'One workspace for every step of the agent workflow.',
        description: 'Aggregate conversations, coordinate agents, launch projects, work through chat, create documents, run research and automations, and keep moving from mobile.',
      },
)
</script>

<template>
  <section v-if="features.length" class="home-features" aria-labelledby="home-features-title">
    <header class="home-features__intro">
      <p class="home-features__eyebrow">{{ copy.eyebrow }}</p>
      <h2 id="home-features-title" class="home-features__title">{{ copy.title }}</h2>
      <p class="home-features__description">{{ copy.description }}</p>
    </header>
    <VPFeatures :features="features" />
  </section>
</template>

<style scoped>
.home-features {
  margin-top: 72px;
}

.home-features__intro {
  max-width: 760px;
  margin: 0 auto 30px;
  text-align: center;
}

.home-features__eyebrow {
  margin: 0 0 10px;
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.09em;
  line-height: 1.4;
  text-transform: uppercase;
}

.home-features__title {
  margin: 0;
  border: 0;
  padding: 0;
  color: var(--vp-c-text-1);
  font-size: clamp(1.65rem, 4vw, 2.25rem);
  letter-spacing: -0.035em;
  line-height: 1.15;
}

.home-features__description {
  margin: 16px auto 0;
  color: var(--vp-c-text-2);
  font-size: 16px;
  line-height: 1.7;
}

.home-features :deep(.VPFeatures) {
  padding: 0;
}

/* VPFeatures normally sits outside .vp-doc. Reset document prose styles now
   that the native cards render inside the home page's Markdown content. */
.home-features :deep(.VPFeature) {
  color: var(--vp-c-text-1);
  font-weight: 400;
  text-decoration: none;
}

.home-features :deep(.VPFeature:hover) {
  color: var(--vp-c-text-1);
}

.home-features :deep(.VPFeature .title) {
  margin: 0;
  border: 0;
  padding: 0;
  letter-spacing: normal;
}

.home-features :deep(.VPFeature .details),
.home-features :deep(.VPFeature .link-text-value) {
  margin: 0;
}

.home-features :deep(.VPFeature ul.details) {
  margin: 0;
}

@media (max-width: 640px) {
  .home-features {
    margin-top: 56px;
  }

  .home-features__intro {
    margin-bottom: 24px;
  }

  .home-features__description {
    font-size: 15px;
  }
}
</style>
