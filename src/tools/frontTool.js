import {
    Message
} from 'element-ui'
import router from './../router'
import store from '../store'

// text
export const siteTitle = 'beacon'
export const siteTitleInFull = 'beacon education'

// methods

// 字符串内非法字符检测
export function CS(str) {
    let regular = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/; //汉字，数字，英文
    return regular.test(str);
}

export function updateTitleTo(value) {
    store.dispatch('updateNavTitle', value)
    document.title = `${value} ~`
    // ${siteTitleInFull}
}

export function building() {
    Message("功能开发中，敬请期待");
}

export function toPath(pos) {
    router.push({
        path: pos
    })
}