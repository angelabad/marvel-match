import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueMeta from 'vue-meta'
import VueScrollTo from 'vue-scrollto'
import VueMq from 'vue-mq'
import Autocomplete from 'buefy/dist/components/autocomplete'
import Modal from 'buefy/dist/components/modal'
import Pagination from 'buefy/dist/components/pagination'
import Progress from 'buefy/dist/components/progress'
import Dialog from 'buefy/dist/components/dialog'
import VueGtag from 'vue-gtag'
import VueSocialSharing from 'vue-social-sharing'
import { VLazyImagePlugin } from 'v-lazy-image'

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft, faSort, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'buefy/dist/buefy.css'
import './registerServiceWorker'

Vue.config.productionTip = false

// dom is for use normal <i class="fas fa-....."> in code
dom.watch()
library.add(faFacebookSquare, faTwitterSquare, faAngleRight, faAngleLeft, faSort, faHeart)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueMeta)
Vue.use(VueScrollTo, {
  duration: 1500
})
Vue.use(VueMq)
Vue.use(Autocomplete)
Vue.use(Modal)
Vue.use(Pagination)
Vue.use(Progress)
Vue.use(Dialog)
Vue.use(VueGtag, {
  config: { id: 'UA-136350344-1' }
}, router)
Vue.use(VueSocialSharing)
Vue.use(VLazyImagePlugin)

Vue.filter('convertToHttps', function (value) {
  if (!value) return ''
  const url = new URL(value)
  url.protocol = 'https:'
  return url.href
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
