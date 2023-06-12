// @ts-ignore
import request from '@/utils/request'


//----------------------------- 获取表格数据------------------------
// 矩形查车列表接口
export function pageRectangleArea(query: Object) {
    return request({ url: '/business/vehicleManager/pageRectangleArea', method: 'post', data: query })
}
// 行政区域查车列表接口
export function pageDistrictArea(query: Object) {
    return request({ url: '/business/vehicleManager/pageDistrictArea', method: 'post', data: query })
}
// 矩形导出列表接口
export function exportRectangleArea(query: Object) {
    return request({ url: '/business/vehicleManager/exportRectangleArea', method: 'post', data: query })
}
// 行政区域导出列表接口
export function exportDistrictArea(query: Object) {
    return request({ url: '/business/vehicleManager/exportDistrictArea', method: 'post', data: query })
}
