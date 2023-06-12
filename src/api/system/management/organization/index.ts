// @ts-ignore
import request from '@/utils/request'


// // 获取WEB菜单
// export function getWebMenus(params: Object) {
//     return request({ url: '/system/menu/getWebMenus', method: 'get', data: params })
// }

// 角色类型列表接口
export function listUser(params: Object) {
    return request({ url: '/system  /org/getRoleType', method: 'post', data: params })
}


// 机构、新增节点
export function addNode(params: Object) {
    return request({ url: '/system/org/addNode', method: 'post', data: params })
}

// 机构、编辑节点
export function modifyNode(params: Object) {
    return request({ url: '/system/org/modifyNode', method: 'post', data: params })
}

// 机构、权限删除接口
export function orgDelete(params: Object) {
    return request({ url: '/system/org/delete', method: 'get', params: params })
}


// 组织树节点详情
export function getOrgDetail(params: Object) {
    return request({ url: '/system/org/getOrgDetail', method: 'get', params: params })
}


// 页面点击搜索节点
export function getNodesForSearch(params: Object) {
    return request({ url: '/system/orgTree/getNodesForSearch', method: 'post', data: params })
}
