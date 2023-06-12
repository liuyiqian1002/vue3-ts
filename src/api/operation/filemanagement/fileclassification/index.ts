import request from '@/utils/request'

// 档案分类接口

export interface GategoryListResItem {
  archivesSum: number
  archivesType: number
  archivesTypeName: string
  companyId: number
  companyName: string
  createTimeStr: string
  createUser: string
  id: number
  name: string
}

export interface CategoryQuery {
  archivesType?: number
  companyId?: number
  name?: string
  pageNumber?: number
  pageSize?: number
}

// 档案分类列表
export function getArchivesCategory(params: CategoryQuery) {
  return request({ url: '/business/archivesCategory/page', method: 'post', data: params })
}

export interface CategoryTypeQuery {
  type: 'category' | 'company' | 'regulatory' // category:档案分类,company:企业档案,regulatory:监管档案
}

// 获取档案类型字典、企业
export function getCategoryType(params: CategoryTypeQuery) {
  return request({ url: '/business/archivesCategory/getCategoryType', method: 'get', params: params })
}

export interface AddOrUpdateQuery {
  id?: number
  name: string
  archivesType?: number
  companyId?: number
}

// 添加或修改
export function addOrUpdate(params: AddOrUpdateQuery) {
  return request({ url: '/business/archivesCategory/addOrUpdate', method: 'post', data: params })
}

// 删除
export function categoryTypeDelete(id: number) {
  return request({ url: '/business/archivesCategory/delete', method: 'get', params: { id } })
}
