// @ts-ignore
import request from '@/utils/request'


//----------------------------- 获取表格数据------------------------
// 从业人员启用禁用接口
export function updateValid(query: Object) {
    return request({ url: '/business/driver/updateValid', method: 'post', params: query })
}
// 从业人员获取详情接口
export function getDriverInfo(query: Object) {
    return request({ url: '/business/driver/getDriverInfo', method: 'get', params: query })
}
// 从业人员驾驶证新增编辑接口
export function addOrUpdate(query: Object) {
    return request({ url: '/business/driver/addOrUpdate', method: 'post', data: query })
}

// 从业人员新增编辑接口
export function driverInfoDcAddOrUpdate(query: Object) {
    return request({ url: '/business/driver/driverInfoDcAddOrUpdate', method: 'post', data: query })
}

// 从业人员资格证新增编辑接口
export function driverInfoEcAddOrUpdate(query: Object) {
    return request({ url: '/business/driver/driverInfoEcAddOrUpdate', method: 'post', data: query })
}

// 从业人员身份证新增编辑接口
export function driverInfoIcAddOrUpdate(query: Object) {
    return request({ url: '/business/driver/driverInfoIcAddOrUpdate', method: 'post', data: query })
}

// 从业人员取消关联车辆接口
export function updateVehicleValid(query: Object) {
    return request({ url: '/business/driver/updateVehicleValid', method: 'post', params: query })
}
// 从业人员关联车辆接口
export function addDriverVehicle(query: Object) {
    return request({ url: '/business/driver/addDriverVehicle', method: 'post', data: query })
}
// 从业人员 导出
export function vehicleExport(query: Object) {
    return request({ url: '/business/driver/export', method: 'post', data: query })
}







