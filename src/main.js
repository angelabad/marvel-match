import Vue from 'vue'
import App from './App.vue'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy, {
  defaultIconPack: 'fa'
})

Vue.config.productionTip = false

Vue.filter('convertToHttps', function (value) {
  if (!value) return ''
  let url = new URL(value)
  url.protocol = 'https:'
  return url.href
})

new Vue({
  render: h => h(App)
}).$mount('#app')
