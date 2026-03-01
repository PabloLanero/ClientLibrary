import { createApp } from 'vue'
import App from './App.vue'
// Pinia
import { createPinia } from 'pinia'
import { useConfigurationStore } from './stores/Central'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//Router
import router from './router'
// i18n
import { i18n } from '@/i18n/i18n'
const pinia = createPinia()

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,  
  theme: {
    defaultTheme: 'dark', 
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  }
})
app.use(i18n)
app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
