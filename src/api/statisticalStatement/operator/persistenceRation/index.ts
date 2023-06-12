// @ts-ignore
import request from '@/utils/request'


// 运营商平台连通率导出
export function exportStatisticsConnectRate(params: Object) {
    return request({ url: '/statistics/operatorReport/exportStatisticsConnectRate', method: 'post', data: params })
}
