import 'vuetify/styles'
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()
window.$ = window.jQuery = require('jquery');

createApp(App)
  .use(vuetify)
  .mount('#app')
