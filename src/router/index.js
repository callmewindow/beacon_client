import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/postdetail',
    name: 'PostDetail',
    component: () => import('@/components/PostDetail.vue'),
  },
  {
    path: '/postlist',
    name: 'PostList',
    component: () => import('@/components/PostList.vue'),
  },
  {
    path: '/userdetail',
    name: 'UserDetail',
    component: () => import('@/views/UserDetail.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router