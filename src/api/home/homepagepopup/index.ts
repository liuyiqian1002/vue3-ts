// @ts-ignore
import request from '@/utils/request'



// // 首页根据权限获取省-市列表
// export function getAreaList(params: Object) {
//     return request({ url: '/system/area/getAreaList', method: 'get', data: params })
// }

// 7天车辆报警排行 
export function getVehicleAlarmTop5InfoList(params: Object) {
    return request({ url: '/statistics/homePage/getVehicleAlarmTop5InfoList', method: 'get', params: params })
}

// 车辆总数及上线情况
export function getVehicleDetail(params: Object) {
    return request({ url: '/statistics/homePage/getVehicleDetailList', method: 'get', params: params })
}

// 7天报警类型排行 
export function getAlarmTypeTop5List(params: Object) {
    return request({ url: '/statistics/homePage/getAlarmTypeTop5List', method: 'get', params: params })
}
// 7天风险时段
export function getHomePage24HourStatisticsListDto(params: Object) {
    return request({ url: '/statistics/homePage/getHomePage24HourStatisticsListDto', method: 'get', params: params })
}
//报警趋势（营运类型） 
export function getAlarmCountList(params: Object) {
    return request({ url: '/statistics/homePage/getAlarmCountList', method: 'get', params: params })
}

// 报警趋势（区域） 
export function getHomePageAreaAlarmListDto(params: Object) {
    return request({ url: '/statistics/homePage/getHomePageAreaAlarmListDto', method: 'get', params: params })
}
// 车辆分布 
// export function getVehicleInfo(params: Object) {
//     return request({ url: '/statistics/homePage/getVehicleInfo', method: 'get', params: params })
// }


