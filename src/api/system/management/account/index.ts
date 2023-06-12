// @ts-ignore
import request from '@/utils/request'

// 账户管理接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/system/user/addOrUpdate', method: 'post', data: params })
}

// 重置账户密码接口
export function resetPwd(params: Object) {
    return request({ url: '/system/user/resetPwd', method: 'get', params })
}

// 账户禁用-启用接口
export function updateValid(params: Object) {
    return request({ url: '/system/user/updateValid', method: 'post', data:params })
}

// 账户查看菜单-权限接口
export function getPermission(params: Object) {
    return request({ url: '/system/user/getPermission', method: 'get', params })
}

// 账户查看数据权限接口
export function getDataPermission(params: Object) {
    return request({ url: '/system/user/getDataPermission', method: 'get', params })
}

// 账户车辆数据分页列表接口
export function pageVehicle(params: Object) {
    return request({ url: '/system/user/pageVehicle', method: 'post', data: params })
}

// 获取用户列表对应的车辆数量
export function vehicleCount(params: Object) {
    return request({ url: '/system/user/vehicleCount', method: 'post', data: params })
}

// 获取用户详情接口
export function getUserInfo(params: Object) {
    return request({ url: '/system/user/getUserInfo', method: 'get', params })
}

// 获取回显数据
export function getTreeNodes(params: Object) {
    return request({ url: '/system/userDataTreeForEdit/getTreeNodes', method: 'get', params })
}

// 获取绑定角色数据
export function getRoleInfo(params: Object) {
    return request({ url: '/system/role/getRoleInfo', method: 'get', params })
}

// 账户校验接口
export function checkUser(params: Object) {
    return request({ url: '/system/user/checkUser', method: 'post', data: params })
}

// 下载模板
export function downloadTemplate(params: Object) {
    return request({ url: '/system/user/downloadTemplate', method: 'get', responseType: 'blob', params })
}

// 导出
export function userExport(params: Object) {
    return request({ url: '/system/user/export', method: 'post', data: params })
}

// 账户车辆数据分页列表导出接口
export function exportVehicle(params: Object) {
    return request({ url: '/system/user/exportVehicle', method: 'post', data: params })
}
