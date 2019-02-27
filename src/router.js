import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import SearchResults from '@/components/SearchResults'

Vue.use(Router)

const routes = [
  { path: '/', name: 'index', component: Index },
  { path: '/results', name: 'results', component: SearchResults, props: true }
]

const router = new Router({
  // mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
