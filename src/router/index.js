import Vue from 'vue'
import VueRouter from 'vue-router'
import People from '../views/People.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/people',
    name: 'people',
    component: People
  },
  {
    path: '/picinfo',
    name: 'picinfo',
    component: () => import(/* webpackChunkName: "home" */ '../views/PicInfo.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
