// @ts-ignore
import request from '@/utils/request'


// 监管考核表(普货)-导出
export function exportGeneralSuperviseReport(params: Object) {
    return request({ url: '/statistics/fiveRateAssessReport/exportGeneralSuperviseReport', method: 'post', data: params })
}
