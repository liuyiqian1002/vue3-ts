// @ts-ignore
import request from '@/utils/request'

// 运营商管理接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/business/operatorEntity/addOrUpdate', method: 'post', data: params })
}
// 运营商接入码新增-修改接口
export function addOrUpdateOperatorAccess(params: Object) {
    return request({ url: '/business/operatorEntity/addOrUpdateOperatorAccess', method: 'post', data: params })
}
// 运营商禁用-启用接口
export function updateValid(params: Object) {
    return request({ url: '/business/operatorEntity/updateValid', method: 'post', data: params })
}
