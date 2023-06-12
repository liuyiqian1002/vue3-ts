import request from '@/utils/request'

// 检查项目接口

export interface CheckItem {
  categoryId: number
  checkContent: string
  ids: number[]
  order: string
  orderField: string
  pageNumber: number
  pageSize: number
}
export type CheckItemQuery = Partial<CheckItem>

// 检查项目列表返回list的单项类型
export interface CheckItemResItem {
  categoryId: number
  categoryName: string
  checkBasis: string
  checkContent: string
  checkRequire: string
  createTime: string
  createUser: string
  id: number
  lastModifiedTime: string
  lastModifiedUser: string
  legalLiability: string
  name: string
  score: number
  valid: true
}
// 检查项目列表
export function checkItemList(params: CheckItemQuery) {
  return request({ url: '/business/tsSecurityCheckItem/page', method: 'post', data: params })
}

export interface DeleteQuery {
  id: number
}
// 检查项目删除
export function checkItemDelete(params: DeleteQuery) {
  return request({ url: '/business/tsSecurityCheckItem/delete', method: 'get', params: params })
}
