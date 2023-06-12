// @ts-ignore
import request from '@/utils/request'

// 公告管理接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/business/noticeEntity/addOrUpdate', method: 'post', data: params })
}

// // 删除
export function deleteById(id) {
    return request({ url: `/business/noticeEntity/deleteById/${id}`, method: 'get' })
}
// // 发送公告接口
export function sendNotice(id) {
    return request({ url: `/business/noticeEntity/sendNotice/${id}`, method: 'get' })
}

// 查询单个
export function getOneById(id) {
    return request({ url: `/business/noticeEntity/getOneById/${id}`, method: 'get' })
}
