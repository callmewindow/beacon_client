import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PostDetail from "../views/PostDetail";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/postdetail',
    name: 'PostDetail',
    component: PostDetail
  },
]

const router = new VueRouter({
  routes
})

export default router
