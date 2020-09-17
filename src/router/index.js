import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

    {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/pm',
    name: 'PrivateMessage',
    component: () => import('@/components/PrivateMessages.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/courselist',
    name: 'CourseList',
    component: () => import('@/views/CourseList.vue'),
  },
  {
    path: '/user',
    name: 'UserDetail',
    component: () => import('@/views/UserDetail.vue'),
  },
  {
    path: '/course/:courseId',
    redirect: '/course/:courseId/intro'
  },
  {
    path: '/course/:courseId/:coursePos/',
    name: 'Course',
    component: () => import('@/views/Course.vue'),
    children: [
      {path: 'post/:postId'},
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router