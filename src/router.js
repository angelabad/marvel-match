import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import SearchResults from '@/components/SearchResults'

Vue.use(Router)

const routes = [
  { path: '/', component: Index },
  { path: '/results', name: 'results', component: SearchResults, props: true }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
