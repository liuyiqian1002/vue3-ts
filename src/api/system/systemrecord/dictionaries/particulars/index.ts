// @ts-ignore
import request from '@/utils/request'

// 数据字典接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/system/dictionary/addOrUpdate', method: 'post', data: params })
}
// 数据字典禁用-启用接口
export function updateValid(params: Object) {
    return request({ url: '/system/dictionary/updateValid', method: 'post', data: params })
}
