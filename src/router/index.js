import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/index/Home'
import Parser from '@/components/parser/example/Index'
import Playground from '@/views/index/Playground'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/parser',
    name: 'parser',
    component: Parser
  },
  {
    path: '/playground',
    name: 'playground',
    component: Playground
  }
]

const router = new VueRouter({
  routes
})

export default router
