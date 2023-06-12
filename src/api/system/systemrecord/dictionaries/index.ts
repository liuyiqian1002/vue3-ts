// @ts-ignore
import request from '@/utils/request'

// 数据字典类型接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/system/dictionaryTypeEntity/addOrUpdate', method: 'post', data: params })
}
// // 获取所有数据字典接口
// export function getPermission(params: Object) {
//     return request({ url: '/system/dictionary/all', method: 'get', params: params })
// }
// // 获取指定的字典value对应的描述接口
// export function addOrUpdatePermissionInfo(params: Object) {
//     return request({ url: '/system/dictionary/getOne', method: 'post', data: params })
// }
// 数据字典类型禁用-启用接口
export function updateValid(params: Object) {
    return request({ url: '/system/dictionaryTypeEntity/updateValid', method: 'post', data: params })
}

// 数据字典类型禁用-启用接口
export function dictionaryUpdateValid(params: Object) {
    return request({ url: '/system/dictionary/updateValid', method: 'post', data: params })
}

// 数据字典详情增加修改接口
export function dictionaryAddOrUpdate(params: Object) {
    return request({ url: '/system/dictionary/addOrUpdate', method: 'post', data: params })
}
