import axios from 'axios'

import {
    QS
} from './../tools/apiTool'

export const getCourseInfo = (courseId) => {
    return axios({
        method: 'GET',
        url: `/api/course/getCourseInfo=${courseId}`
    })
}