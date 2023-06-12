// @ts-ignore
import request from '@/utils/request'


// 企业日报导出
export function dayReportExport(params: Object) {
    return request({ url: '/statistics/superviseReport/dayReportExport', method: 'post', data: params })
}

// 根据报表配置和参数获取值
export function getReportConfigParamByKey(params: Object) {
    return request({ url: '/statistics/report/getReportConfigParamByKey', method: 'post', data: params })
}

// 报表配置常量列表
export function getReportConfig(params: Object) {
    return request({ url: '/statistics/report/getReportConfig', method: 'GET', params: params })
}
