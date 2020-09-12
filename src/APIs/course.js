import axios from 'axios'

// import {
//     QS
// } from './../tools/apiTool'

export const getCourseInfo = (courseId) => {
    return axios({
        method: 'GET',
        url: `/course/?getCourseInfo=${courseId}`
    })
}

export const courseQuery = () => {
    return axios({
        method: 'POST',
        url: `/courseQuery`,
    })
}