// @ts-ignore
import request from '@/utils/request'


//----------------------------- 获取表格数据------------------------
// 车辆保险导出
export function insuranceExport(query: Object) {
    return request({ url: '/business/vehicleInsuranceInfo/export', method: 'post', data: query })
}

// 车辆保险详情接口
export function getDetail(query: Object) {
    return request({ url: '/business/vehicleInsuranceInfo/getDetail', method: 'get', params: query })
}

// 车辆保险新增编辑接口
export function addOrUpdate(query: Object) {
    return request({ url: '/business/vehicleInsuranceInfo/addOrUpdate', method: 'post', data: query })
}
