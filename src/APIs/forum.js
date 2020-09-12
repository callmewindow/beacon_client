// import axios from 'axios'

import Axios from "axios"

// import {
//   QS
// } from './../tools/apiTool'

export const postQuery = (postId) => {
    return axios({
        method: 'POST',
        url: `/postQuery`,
        data: {
            id: postId
        }
    })
}

export const createPost = (post) => {
    return axios({
        method: 'POST',
        url: `/createPost`,
        data: {
            title: post.title,
            course: post.courseId,
            owner: post.senderId,
            tag: post.value,
            content: post.content
        }
    })
}

export const setForumRule = (forumId, forumCon) => {
    return axios({
        method: 'POST',
        url: `/setCourseRule`,
        data: {
            id: forumId,
            rule: forumCon
        }
    })
}