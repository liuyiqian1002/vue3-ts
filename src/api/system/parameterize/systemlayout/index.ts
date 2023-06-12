// @ts-ignore
import request from '@/utils/request'

// 系统配置接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/system/systemConfigurationInfoEntity/addOrUpdate', method: 'post', data: params })
}
// 系统配置设置是否默认接口
export function updateValid(params: Object) {
    return request({ url: '/system/systemConfigurationInfoEntity/setDefault', method: 'get', data: params })
}

