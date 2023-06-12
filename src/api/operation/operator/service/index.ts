// @ts-ignore
import request from '@/utils/request'

// 运营商基本信息-接入配置接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/business/operatorAccessInfo/addOrUpdate', method: 'post', data: params })
}
// 运营商基本信息-接入配置禁用-启用接口
export function updateValid(params: Object) {
    return request({ url: '/business/operatorAccessInfo/updateValid', method: 'post', data: params })
}
