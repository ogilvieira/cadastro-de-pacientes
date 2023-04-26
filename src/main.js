import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify setup
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable } from 'vuetify/labs/VDataTable'
import colors from 'vuetify/lib/util/colors'
import { vMaska } from "maska"

const vuetify = createVuetify({
  components: {
    ...components,
    VDataTable
  },
  directives: {
    ...directives,
    maska: vMaska
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          background: colors.grey.lighten3
        }
      }
    }

  }
})

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
