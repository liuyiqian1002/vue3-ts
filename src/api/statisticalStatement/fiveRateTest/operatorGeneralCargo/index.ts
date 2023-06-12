// @ts-ignore
import request from '@/utils/request'


// 运营考核表(普货)-导出
export function exportGeneralOperatorReport(params: Object) {
    return request({ url: '/statistics/fiveRateAssessReport/exportGeneralOperatorReport', method: 'post', data: params })
}
