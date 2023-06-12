// @ts-ignore
import request from '@/utils/request'


//----------------------------- 获取表格数据------------------------
// 车辆详情
export function getDetail(query: Object) {
    return request({ url: '/business/vehicle/getDetail', method: 'get', params: query })
}

// 车辆新增编辑
export function addOrUpdate(query: Object) {
    return request({ url: '/business/vehicle/addOrUpdate', method: 'post', data: query })
}

// 从业人员取消关联车辆接口
export function updateVehicleValid(query: Object) {
    return request({ url: '/business/driver/updateVehicleValid', method: 'post', params: query })
}

// 车辆过户
export function updateVehicleCompany(query: Object) {
    return request({ url: '/business/vehicle/updateVehicleCompany', method: 'post', data: query })
}

// 禁用-启用接口
export function updateValid(query: Object) {
    return request({ url: '/business/vehicle/updateValid', method: 'post', data: query })
}

// 导出车辆基本信息列表接口
export function exportVehicleList(query: Object) {
    return request({ url: '/business/vehicle/exportVehicleList', method: 'post', data: query })
}
