// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import Download from './components/Download.vue'
import AgentRoster from './components/AgentRoster.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Download', Download)
    app.component('AgentRoster', AgentRoster)
  },
}
