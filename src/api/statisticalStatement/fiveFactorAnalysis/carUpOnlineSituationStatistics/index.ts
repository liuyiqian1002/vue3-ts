// @ts-ignore
import request from '@/utils/request'


// 车辆上线情况统计导出
export function exportOnlineRate(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportOnlineRate', method: 'post', data: params })
}

// 车辆上线情况统计下级列表导出
export function exportOnlineRateList(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportOnlineRateList', method: 'post', data: params })
}

// 车辆明细
export function queryVehicleList(params: Object) {
    return request({ url: '/statistics/fiveRateReport/queryVehicleList', method: 'post', data: params })
}

// 车辆明细 导出
export function exportVehicleList(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportVehicleList', method: 'post', data: params })
}
