// @ts-ignore
import request from '@/utils/request'


// 车辆入网情况统计导出
export function exportInNetRate(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportInNetRate', method: 'post', data: params })
}

// 车辆入网情况统计下级列表导出
export function exportInNetRateList(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportInNetRateList', method: 'post', data: params })
}

// 车辆明细
export function queryVehicleList(params: Object) {
    return request({ url: '/statistics/fiveRateReport/queryVehicleList', method: 'post', data: params })
}

// 车辆明细 导出
export function exportVehicleList(params: Object) {
    return request({ url: '/statistics/fiveRateReport/exportVehicleList', method: 'post', data: params })
}
