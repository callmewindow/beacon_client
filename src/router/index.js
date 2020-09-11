import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
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
    path: '/courselist',
    name: 'CourseList',
    component: () => import('@/views/CourseList.vue'),
  },
  {
    path: '/userdetail',
    name: 'UserDetail',
    component: () => import('@/views/UserDetail.vue'),
  },
  {
    path: '/UploadVideo',
    name: 'UploadVideo',
    component: () => import('@/components/UploadVideo.vue'),
  },
  {
    path: '/AddCourse',
    name: 'AddCourse',
    component: () => import('@/components/AddCourse.vue'),
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import('@/views/Video.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router