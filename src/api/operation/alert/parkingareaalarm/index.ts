// @ts-ignore
import request from '@/utils/request'

// 停车区域报警配置接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
  return request({ url: '/business/parkAreaAlarm/addOrUpdate', method: 'post', data: params })
}

// 禁用/启用接口
export function updateValid(params: Object) {
  return request({ url: '/business/parkAreaAlarm/updateValid', method: 'post', data: params })
}

// 根据停车区域报警ID获取控制范围
export function pageByParkAreaId(params: Object) {
  return request({ url: '/business/parkAreaVehicle/pageByParkAreaId', method: 'post', data: params })
}

// 控制范围添加接口
export function parkAreaVehicleAdd(params: Object) {
  return request({ url: '/business/parkAreaVehicle/add', method: 'post', data: params })
}

// 控制范围删除接口
export function parkAreaVehicleDelete(params: Object) {
  return request({ url: '/business/parkAreaVehicle/delete', method: 'get', params: params })
}
// 根据停车区域报警ID获取绘制区域列表
export function getDetailByParkAreaId(params: Object) {
  return request({ url: '/business/parkAreaAlarmDetail/getDetailByParkAreaId', method: 'get', params: params })
}

// 绘制区域添加接口
export function parkAreaAlarmDetailAddOrUpdate(params: Object) {
  return request({ url: '/business/parkAreaAlarmDetail/addOrUpdate', method: 'post', data: params })
}

// 绘制区域删除接口
export function parkAreaAlarmDetailDelete(params: Object) {
  return request({ url: '/business/parkAreaAlarmDetail/delete', method: 'get', params: params })
}



