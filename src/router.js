import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import Match from '@/components/Match'
import NotFound from '@/components/NotFound'

Vue.use(Router)

const routes = [
  { path: '/', name: 'index', component: Index },
  { path: '/match/:hero1/:hero2/:page?', name: 'match', component: Match },
  { path: '*', component: NotFound }
]

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
