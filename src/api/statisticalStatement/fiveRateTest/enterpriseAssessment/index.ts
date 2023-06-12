// @ts-ignore
import request from '@/utils/request'


// 企业考核表-导出
export function exportCompanyAssessReport(params: Object) {
    return request({ url: '/statistics/fiveRateAssessReport/exportCompanyAssessReport', method: 'post', data: params })
}
