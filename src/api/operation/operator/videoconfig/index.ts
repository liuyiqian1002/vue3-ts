// @ts-ignore
import request from '@/utils/request'

// 运营商管理-视频配置接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/business/videoConfigEntity/addOrUpdate', method: 'post', data: params })
}
// 运营商管理-视频配置接新增-修改接口
// export function addOrUpdateOperatorAccess(params: Object) {
//     return request({ url: '/business/operatorEntity/addOrUpdateOperatorAccess', method: 'post', data: params })
// }
// 运营商管理-视频配置禁用-启用接口
export function updateValid(params: Object) {
    return request({ url: '/business/videoConfigEntity/updateValid', method: 'post', data: params })
}
