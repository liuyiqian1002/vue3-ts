// @ts-ignore
import request from '@/utils/request'


//
// 离线登记统计 申请离线车辆数
export function getOfflineVehicleStatistics(params: Object) {
    return request({ url: '/statistics/companyReport/getOfflineVehicleStatistics', method: 'post', data: params })
}

// 安全检查统计 已检查车辆数
export function getSafetyCheckVehicleStatistics(params: Object) {
    return request({ url: '/statistics/companyReport/getSafetyCheckVehicleStatistics', method: 'post', data: params })
}

// 离线登记统计 导出
export function exportOfflineStatistics(params: Object) {
    return request({ url: '/statistics/companyReport/exportOfflineStatistics', method: 'post', data: params })
}
