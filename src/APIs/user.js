//axios是http请求的框架，用于发送请求
import axios from 'axios'
//QS为json对象转为字符串的函数

import {
  QS
} from './../tools/apiTool'

export const register = (username, user_nickname, user_password, email) => {
  return axios({
    method: 'POST',
    url: `/addUser`,
    data: QS({
      username,
      user_nickname,
      user_password,
      email
    }),
  })
}


export const login = (username, user_password) => {
  return axios({
    method: 'POST',
    url: `/login`,
    data: QS({
      username,
      user_password,
    }),
  })
}


//同步接口的调用示例见User.vue组件中的script部分
//Get方法就将参数放在url中，注意传参的方式
//如果get出错，与后端确认请求URL的格式
// export const login = (username, password) => {
//   return axios({
//     method: 'POST',
//     url: `/api/user/login`,
//     data: (
//       username,
//       password
//     ),
//   })
// }
//post方法就将参数放在data中
//如果post出错，特别是500 Internet serve error有以下解决方案
//例：将data: QS({ paper })换成data: { paper }   或反向操作（加上QS）
//（obj的转化是自动的，不是代码）
// export const register = (username, nickname, password, userEmail) => {
//   return axios({
//     method: 'POST',
//     url: `/api/user/register`,
//     data: QS({
//       username,
//       nickname,
//       password,
//       userEmail
//     }),
//   })
// }

export const getUserInfo = (userId) => {
  return axios({
    method: 'GET',
    url: `/api/user/getUserInfo?userId=${userId}`
  })
}

export const upToAdmin = (userId) => {
  return axios({
    method: 'POST',
    url: `/api/user/upgradeAdmin`,
    data: QS({
      userId
    })
  })
}

export const editNick = (userId, newNickname) => {
  return axios({
    method: 'POST',
    url: `/api/user/editNick`,
    data: QS({
      userId,
      newNickname
    })
  })
}

export const editUserIntro = (userId, newUserIntro) => {
  return axios({
    method: 'POST',
    url: `/api/user/editUserIntro`,
    data: QS({
      userId,
      newUserIntro
    })
  })
}

export const editPassword = (userId, newPassword) => {
  return axios({
    method: 'POST',
    url: `/api/user/changePwd`,
    data: QS({
      userId,
      newPassword
    })
  })
}
export const getUserDetail = (userid) => {
  return axios({
    method: 'GET',
    url: `/userdetail?userid=${userid}`
  })
}
//通过好友申请
export const passFriend = (sender_id, target_id) => {
  return axios({
    method: 'POST',
    url: `/passFriendApplication`,
    data: QS({
      applicant_id: sender_id,
      target_id
    })
  })
}
//拒绝好友申请
export const rejectFriend = (sender_id, target_id) => {
  return axios({
    method: 'POST',
    url: `/rejectFriendApplication`,
    data: QS({
      applicant_id: sender_id,
      target_id
    })
  })
}
//获取收到的好友申请
export const getFriendApplication = (target_id) => {
  return axios({
    method: 'POST',
    url: `/getFriendApplicationOfOthers`,
    data: QS({
      target_id
    })
  })
}

//删除好友
export const deleteFriend = (user1_id, user2_id) => {
  return axios({
    method: 'POST',
    url: `/deleteFriendRecord`,
    data: QS({
      user1_id,
      user2_id
    })
  })
}