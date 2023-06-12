import request from '@/utils/request'

// 项目分类接口

export interface CheckCategoryQuery {
  name: string
  order: string
  orderField: string
  pageNumber: number
  pageSize: number
  valid: boolean
}
export interface CheckCategoryItem {
  checkItemTotal: number
  createTime: string
  createUser: string
  id: number
  lastModifiedTime: string
  lastModifiedUser: string
  name: string
  parentId: number
  valid: boolean
}

// 列表
export function checkCategory(params: Partial<CheckCategoryQuery>) {
  return request({ url: '/business/tsSecurityCheckCategory/page', method: 'post', data: params })
}

export interface AddOrUpdateQuery {
  id: number
  name: string
}

// 添加或修改
export function addOrUpdate(params: AddOrUpdateQuery) {
  return request({ url: '/business/tsSecurityCheckCategory/addOrUpdate', method: 'post', data: params })
}

export interface UpdateValidQuery {
  id: number
  valid: boolean
}

// 启用/禁用
export function updateValid(params: UpdateValidQuery) {
  return request({ url: '/business/tsSecurityCheckCategory/updateValid', method: 'post', data: params })
}
