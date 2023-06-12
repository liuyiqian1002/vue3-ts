// @ts-ignore
import request from '@/utils/request'

// 报表模板配置接口

// 获取配置接口
export function getReportConfigSelect(params: Object) {
    return request({ url: '/business/reportConfigEntity/getReportConfigSelect/', method: 'get', params: params })
}
// 获取模板详情接口
export function getOneById(id) {
    return request({ url: `/business/reportConfigEntity/getOneById/${id}`, method: 'get', params: {} })
}
// 添加或修改接口
export function addOrUpdate(params: Object) {
    return request({ url: `/business/reportConfigEntity/addOrUpdate`, method: 'post', data: params })
}
