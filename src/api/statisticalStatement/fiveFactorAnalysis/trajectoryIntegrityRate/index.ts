// @ts-ignore
import request from '@/utils/request'


// 轨迹完整率统计导出
export function exportTrackWholeStatistics(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportTrackWholeStatistics', method: 'post', data: params })
}

// 轨迹完整率统计下级列表导出
export function exportTrackWholeStatisticsList(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportTrackWholeStatisticsList', method: 'post', data: params })
}

// // 车辆明细
// export function queryVehicleList(params: Object) {
//     return request({ url: '/statistics/fiveRateReport/queryVehicleList', method: 'post', data: params })
// }
//
// 车辆明细 导出
export function exportVehicleList(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportVehicleList', method: 'post', data: params })
}

// 定位漂移率、轨迹完整率轨迹明细导出
export function exportLocationDriftDetail(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportLocationDriftDetail', method: 'post', data: params })
}
