import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: '847590417@qq.com',
    frontIP: 'http://211.159.161.35',
    userId: 7,
    expertId: 'null',
    messageNum: 0,
    messages:[],
    identity: 'user',
    permission: 3, //-1==首陀罗，0==吠舍，1==刹帝利，2==婆罗门
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
