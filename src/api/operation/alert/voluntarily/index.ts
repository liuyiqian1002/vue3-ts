// @ts-ignore
import request from '@/utils/request'

// 自动处警接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/business/alarmTempGroup/addOrUpdate', method: 'post', data: params })
}
// 自动处警禁用-启用接口
export function updateValid(params: Object) {
    return request({ url: '/business/alarmTempGroup/updateValid', method: 'post', data: params })
}
