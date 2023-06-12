// @ts-ignore
import request from '@/utils/request'

// 角色管理接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/system/role/addOrUpdate', method: 'post', data: params })
}
// 角色查看菜单-权限接口
export function getPermission(params: Object) {
    return request({ url: '/system/role/getPermission', method: 'get', params: params })
}
// 添加-修改权限
export function addOrUpdatePermissionInfo(params: Object) {
    return request({ url: '/system/role/addOrUpdatePermissionInfo', method: 'post', data: params })
}
// 角色禁用-启用接口
export function updateValid(params: Object) {
    return request({ url: '/system/role/updateValid', method: 'post', data: params })
}
