// @ts-ignore
import request from '@/utils/request'


// 获取WEB菜单
export function getWebMenus(params: Object) {
    return request({ url: '/system/menu/getWebMenus', method: 'get', data: params })
}

// 获取用户列表接口
export function listUser(params: Object) {
    return request({ url: '/system/user/listUser', method: 'post', data: params })
}

// 菜单、权限全量数据树
export function getFullTree(params: Object) {
    return request({ url: '/system/permissionInfo/getFullTree', method: 'get', params: params })
}

// 菜单、权限添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/system/permissionInfo/addOrUpdate', method: 'post', data: params })
}

// 菜单、权限删除接口
export function delMenu(params: Object) {
    return request({ url: '/system/permissionInfo/delete', method: 'get', params: params })
}
