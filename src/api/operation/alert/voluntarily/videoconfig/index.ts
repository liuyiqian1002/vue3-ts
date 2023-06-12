// @ts-ignore
import request from '@/utils/request'

// 自动处警配置处警内容接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/business/regulatorsEntity/addOrUpdate', method: 'post', data: params })
}

// 自动处警配置处警内容禁用-启用接口
export function updateValid(params: Object) {
    return request({ url: '/business/regulatorsEntity/updateValid', method: 'post', data: params })
}
