// @ts-ignore
import request from '@/utils/request'


// 企业月报导出
export function monthReportExport(params: Object) {
    return request({ url: '/statistics/companyReport/monthReportExport', method: 'post', data: params })
}

// 根据报表配置和参数获取值
export function getReportConfigParamByKey(params: Object) {
    return request({ url: '/statistics/report/getReportConfigParamByKey', method: 'post', data: params })
}
