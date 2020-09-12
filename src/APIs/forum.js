import axios from 'axios'

import {
    QS
} from './../tools/apiTool'

export const postDetail = (postId) => {
    return axios({
        method: 'POST',
        url: `/postQuery`,
        data: QS({
            id: postId
        })
    })
}

export const createPost = (post) => {
    return axios({
        method: 'POST',
        url: `/createPost`,
        data: QS({
            title: post.title,
            course: post.courseId,
            owner: post.senderId,
            tag: post.value,
            content: post.content
        })
    })
}

export const setForumRule = (forumId, forumCon) => {
    return axios({
        method: 'POST',
        url: `/setCourseRule`,
        data: QS({
            id: forumId,
            rule: forumCon
        })
    })
}