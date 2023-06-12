// @ts-ignore
import request from '@/utils/request'


// 运营考核表(两客一危)导出
export function exportMajorOperatorReport(params: Object) {
    return request({ url: '/statistics/fiveRateAssessReport/exportMajorOperatorReport', method: 'post', data: params })
}
