// @ts-ignore
import request from '@/utils/request'

// 接入端配置接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/system/entryPoint/addOrUpdate', method: 'post', data: params })
}
// 接入端配置 禁用-启用接口
export function updateValid(params: Object) {
    return request({ url: '/system/entryPoint/updateValid', method: 'post', data: params })
}
// 接入端导出
export function insuranceExport(query: Object) {
    return request({ url: '/system/entryPoint/export', method: 'post', data: query })
}