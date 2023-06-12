// @ts-ignore
import request from '@/utils/request'


// 数据合格率统计导出
export function exportDataQualifiedStatistics(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportDataQualifiedStatistics', method: 'post', data: params })
}

// 数据合格率统计下级列表导出
export function exportDataQualifiedStatisticsList(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportDataQualifiedStatisticsList', method: 'post', data: params })
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

// 不合格轨迹明细导出
export function exportDataQualifiedLocationDetail(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportDataQualifiedLocationDetail', method: 'post', data: params })
}
