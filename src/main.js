import Vue from 'vue'
import App from './App.vue'
import router from './router'

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

Vue.filter('readMore', function (value) {
  let chars = 300
  if (!value) return ''
  if (value.length <= chars) {
    return value
  } else {
    return value.substring(0, chars) + ' ...'
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
