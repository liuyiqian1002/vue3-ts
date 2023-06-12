// @ts-ignore
import request from '@/utils/request'

// 系统配置接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/system/homePageConfig/addOrUpdate', method: 'post', data: params })
}
// 首页配置设置是否默认接口
export function updateValid(params: Object) {
    return request({ url: '/system/homePageConfig/setDefault', method: 'get', params: params })
}

// 获取当前用户首页配置
export function getHomePageConfig(params: Object) {
    return request({ url: '/system/homePageConfig/getHomePageConfig', method: 'get', params: params })
}
