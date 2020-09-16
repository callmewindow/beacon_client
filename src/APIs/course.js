import axios from 'axios'

import {
  QS
} from './../tools/apiTool'

export const addCourse = (courseEntity) => {
  return axios({
    method: 'POST',
    url: `/createCourse`,
    data: QS({
      course_name: courseEntity.course_name,
      course_intro: courseEntity.course_intro,
      start_time: courseEntity.start_time,
      end_time: courseEntity.end_time,
      profession: courseEntity.profession,
      rule: ''
    })
  })
}

export const uploadVideo = (videoEntity) => {
  return axios({
    method: 'POST',
    url: `/uploadVideo2`,
    data: QS({
      course_id: videoEntity.course_id,
      title: videoEntity.title,
      introduction: videoEntity.introduction,
      upload_time: videoEntity.upload_time,
      video_id: videoEntity.video_id
    })
  })
}

export const getCourseBasicInfo = (courseId, user_id) => {
  return axios({
    method: 'GET',
    url: `/info/basic/class/?class_id=${courseId}&user_id=${user_id}`
  })
}

export const getCourseVideoUrlArray = (courseId) => {
  return axios({
    method: 'GET',
    url: `/video/play/?class_id=${courseId}`
  })
}

export const getCourseStudentList = (courseId) => {
  return axios({
    method: 'GET',
    url: `api/student/manage/search?class_id=${courseId}`
  })
}

export const courseQuery = () => {
  return axios({
    method: 'POST',
    url: `/courseQuery`,
  })
}

export const getUserCourse = (userid) => {
  return axios({
    method: 'GET',
    url: `/usercourse?userid=${userid}`
  })
}

export const openCourseForum = (courseId) => {
  return axios({
    method: 'GET',
    url: `/api/circle/open?class_id=${courseId}`
  })
}

export const searchCourse = (keyword) => {
  return axios({
    method: 'POST',
    url: `/searchCourse`,
    data: QS({
      keyWord: keyword
    })
  })
}