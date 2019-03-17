import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueScrollTo from 'vue-scrollto'
import VueMq from 'vue-mq'
import Buefy from 'buefy'
import VueAnalytics from 'vue-analytics'

import 'buefy/dist/buefy.css'

Vue.config.productionTip = false

const isProd = process.env.NODE_ENV === 'production'

Vue.use(VueScrollTo, {
  duration: 1500
})
Vue.use(VueMq)
Vue.use(Buefy, {
  defaultIconPack: 'fa'
})
Vue.use(VueAnalytics, {
  id: 'UA-136350344-1',
  router,
  autoTracking: {
    exception: true
  },
  debug: {
    enabled: !isProd,
    sendHitTask: isProd
  }
})

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
