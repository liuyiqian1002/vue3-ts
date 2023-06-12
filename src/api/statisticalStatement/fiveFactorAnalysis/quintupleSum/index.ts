// @ts-ignore
import request from '@/utils/request'


// 五率合计统计导出
export function exportFiveRateStatistics(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportFiveRateStatistics', method: 'post', data: params })
}

// 五率合计统计下级列表导出
export function exportFiveRateStatisticsList(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportFiveRateStatisticsList', method: 'post', data: params })
}

// // 车辆明细
// export function queryVehicleList(params: Object) {
//     return request({ url: '/statistics/fiveRateReport/queryVehicleList', method: 'post', data: params })
// }
//
// // 车辆明细 导出
// export function exportVehicleList(params: Object) {
//     return request({ url: '/statistics/fiveRateReport/exportVehicleList', method: 'post', data: params })
// }
