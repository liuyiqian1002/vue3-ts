// @ts-ignore
import request from '@/utils/request'


// 车辆在线情况统计导出
export function exportOnlineStatistics(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportOnlineStatistics', method: 'post', data: params })
}

// 车辆在线情况统计下级列表导出
export function exportOnlineStatisticsList(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportOnlineStatisticsList', method: 'post', data: params })
}

// 车辆明细
export function queryVehicleList(params: Object) {
    return request({ url: '/statistics/fiveRateReport/queryVehicleList', method: 'post', data: params })
}

// 车辆明细 导出
export function exportVehicleList(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportVehicleList', method: 'post', data: params })
}
