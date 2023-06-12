// @ts-ignore
import request from '@/utils/request'



// 组织管理树节点的下级节点
export function getFullTree(params: Object) {
    return request({ url: '/system/dataPermission/getChild', method: 'get', params: params })
}

// 组织管理添加与修改接口
export function addNode(params: Object) {
    return request({ url: '/system/dataPermission/addNode', method: 'post', data: params })
}

// 菜单、权限删除接口
export function deleteNode(params: Object) {
    return request({ url: '/system/dataPermission/deleteNode', method: 'post', params: params })
}

// 组织树节点详情
export function getOrgDetail(params: Object) {
    return request({ url: '/system/dataPermission/getOrgDetail', method: 'GET', params: params })
}

// 编辑节点接口
export function modifyNode(params: Object) {
    return request({ url: '/system/dataPermission/modifyNode', method: 'POST', data: params })
}
