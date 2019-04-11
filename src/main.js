import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueMeta from 'vue-meta'
import VueScrollTo from 'vue-scrollto'
import VueMq from 'vue-mq'
import Buefy from 'buefy'
import VueAnalytics from 'vue-analytics'
import VueSocialSharing from 'vue-social-sharing'

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft, faSort, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'buefy/dist/buefy.css'

Vue.config.productionTip = false

const isProd = process.env.NODE_ENV === 'production'

// dom is for use normal <i class="fas fa-....."> in code
dom.watch()
library.add(faFacebookSquare, faTwitterSquare, faAngleRight, faAngleLeft, faSort, faHeart)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueMeta)
Vue.use(VueScrollTo, {
  duration: 1500
})
Vue.use(VueMq)
Vue.use(Buefy, {
  defaultIconPack: 'fas'
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
Vue.use(VueSocialSharing)

Vue.filter('convertToHttps', function (value) {
  if (!value) return ''
  let url = new URL(value)
  url.protocol = 'https:'
  return url.href
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
