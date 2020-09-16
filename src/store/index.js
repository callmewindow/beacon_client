import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: '847590417@qq.com',
    frontIP: 'http://211.159.161.35',
    userId: 7, // -1代表没有登录
    expertId: 'null',
    messageNum: 0,
    messages:[],
    identity: 'user',
    teacherID: 1,
    nickname: "稼轩",
    permission: 2, //-1==首陀罗，0==吠舍，1==刹帝利，2==婆罗门
    // permission仅针对用户-课程关系，0普通用户，1管理员，2创始人，3未加入课程
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
