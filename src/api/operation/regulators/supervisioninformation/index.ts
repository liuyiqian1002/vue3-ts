// @ts-ignore
import request from '@/utils/request'

// 监管部门-基础信息接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/business/regulatorsEntity/addOrUpdate', method: 'post', data: params })
}

// 监管部门-基础信息禁用-启用接口
export function updateValid(params: Object) {
    return request({ url: '/business/regulatorsEntity/updateValid', method: 'post', data: params })
}
