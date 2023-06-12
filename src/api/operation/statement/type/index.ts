// @ts-ignore
import request from '@/utils/request'

// 报表模板配置接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/business/reportAlarmCategory/addOrUpdate', method: 'post', data: params })
}
// // 模板配置禁用-启用接口
// export function updateValid(params: Object) {
//     return request({ url: '/business/operatorEntity/updateValid', method: 'post', data: params })
// }

// 详情列表
export function getListByCategoryId(params: Object) {
    return request({ url: '/business/reportAlarmCategoryConfig/getListByCategoryId', method: 'get', params: params })
}
