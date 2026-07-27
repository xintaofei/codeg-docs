// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import Download from './components/Download.vue'
import AgentRoster from './components/AgentRoster.vue'
import HomeFeatures from './components/HomeFeatures.vue'
import MobileDownload from './components/MobileDownload.vue'
import MobileShowcase from './components/MobileShowcase.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Download', Download)
    app.component('AgentRoster', AgentRoster)
    app.component('HomeFeatures', HomeFeatures)
    app.component('MobileDownload', MobileDownload)
    app.component('MobileShowcase', MobileShowcase)
  },
}
