import axios from 'axios'

// import {
//     QS
// } from './../tools/apiTool'

export const getCourseBasicInfo = (courseId) => {
    return axios({
        method: 'GET',
        url: `/info/basic/class/?class_id=${courseId}`
    })
}

export const getCourseVideoUrlArray = (courseId) => {
    return axios({
        method: 'GET',
        url: `/video/play/?class_id=${courseId}`
    })
}

export const courseQuery = () => {
    return axios({
        method: 'POST',
        url: `/courseQuery`,
    })
}

export const addCourse = (courseEntity) => {
    return axios({
        method: 'POST',
        url: `/course/createCourse`,
        data: { courseEntity }
    })
}

 export const uploadVideo = (videoEntity) => {
     return axios({
         method: 'POST',
         url: `/course/createCourse`,
         data: { videoEntity }
     })
 }
export const getUserCourse = (userid) => {
    return axios({
        method: 'GET',
        url: `/usercourse?userid=${userid}`
    })
}