// @ts-ignore
import request from '@/utils/request'

// 预约发送接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/business/planSendEntity/addOrUpdate', method: 'post', data: params })
}
// 角色禁用-启用接口
export function updateValid(params: Object) {
    return request({ url: '/business/planSendEntity/updateValid', method: 'post', data: params })
}
