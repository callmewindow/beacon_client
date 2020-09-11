import {
    Message
} from 'element-ui'
import router from './../router'
import store from '../store'

// text
export const siteTitle = 'beacon'
export const siteTitleInFull = 'beacon education'

// methods

export function updateTitleTo(value) {
    store.dispatch('updateNavTitle', value)
    document.title = `${value} ~`
    // ${siteTitleInFull}
}

export function building() {
    Message("功能开发中，敬请期待");
}

export function toHome(text) {
    if (text != '')
        Message(text + "，正在前往主页");
    router.push({
        path: "/home"
    })
}