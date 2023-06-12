// @ts-ignore
import request from '@/utils/request'


//----------------------------- 获取表格数据------------------------
// 获取所有车辆类型
export function getAllType(query: Object) {
    return request({ url: '/business/vehicleType/getAllType', method: 'post', data: query })
}

// 获取所有父类类型
export function getParentType(query: Object) {
    return request({ url: '/business/vehicleType/getParentType', method: 'post', data: query })
}

// 删除-启用禁用
export function updateValid(query: Object) {
    return request({ url: '/business/vehicleType/updateValid', method: 'post', data: query })
}

// 新增编辑接口
export function addOrUpdate(query: Object) {
    return request({ url: '/business/vehicleType/addOrUpdate', method: 'post', data: query })
}
