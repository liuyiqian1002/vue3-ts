// @ts-ignore
import request from '@/utils/request'

// 报表模板配置接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/business/autoSendConfigEntity/addOrUpdate', method: 'post', data: params })
}
// 报表模板禁用-启用接口
export function updateValid(params: Object) {
    return request({ url: '/business/autoSendConfigEntity/updateValid', method: 'post', data: params })
}
