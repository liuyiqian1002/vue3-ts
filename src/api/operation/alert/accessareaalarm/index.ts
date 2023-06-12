// @ts-ignore
import request from '@/utils/request'

// 进出区域报警配置接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
  return request({ url: '/business/alarmArea/addOrUpdate', method: 'post', data: params })
}
// 禁用/启用接口
export function updateValid(params: Object) {
  return request({ url: '/business/alarmArea/updateValid', method: 'post', data: params })
}
// 语音播报接口
export function updateTtsMsg(params: Object) {
  return request({ url: '/business/alarmArea/updateTtsMsg', method: 'post', data: params })
}
// 列表导出
export function alarmAreaExport(params: Object) {
  return request({ url: '/business/alarmArea/export', method: 'post', data: params })
}

// 获取车辆禁行区域
export function getAlarmAreaById(vehicleId) {
  return request({ url: `/business/alarmArea/getAlarmAreaById/${vehicleId}`, method: 'get', params: { vehicleId } })
}

// 根据进出区域报警ID获取控制范围
export function pageByAlarmAreaId(params: Object) {
  return request({ url: '/business/alarmAreaScopeEntity/pageByAlarmAreaId', method: 'post', data: params })
}

// 控制范围添加接口
export function alarmAreaScopeAdd(params: Object) {
  return request({ url: '/business/alarmAreaScopeEntity/add', method: 'post', data: params })
}

// 控制范围删除接口
export function alarmAreaScopeDelete(params: Object) {
  return request({ url: '/business/alarmAreaScopeEntity/delete', method: 'get', params: params })
}
