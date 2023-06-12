import request from '@/utils/request'

// 检查计划接口

export interface CheckPlanQuery {
  endTime: string
  name: string
  order: string
  orderField: string
  pageNumber: number
  pageSize: number
  planTypeCode: number
  startTime: string
}

export interface CheckPlanResItem {
  createTime: string
  createUser: string
  createUserName: string
  endTime: string
  id: number
  lastModifiedTime: string
  lastModifiedUser: string
  name: string
  planTypeCode: number
  planTypeName: string
  preparedBy: string
  qualifiedCount: number
  rectifyCount: number
  startTime: string
  taskTotalCount: number
  valid: boolean
}

// 列表
export function checkPlan(params: CheckPlanQuery) {
  return request({ url: '/business/tsSecurityCheckPlan/page', method: 'post', data: params })
}

export interface UpdateQuery {
  adminUser: string
  adminUserName: string
  archivesDetailDtos: [
    {
      categoryId: number
      categoryName: string
      checkBasis: string
      checkContent: string
      checkRequire: string
      id: number
      itemId: number
      itemName: string
      legalLiability: string
    },
  ]
  checkBy: string
  checkTime: string
  checkUser: string
  checkUserName: string
  companyId: number
  companyName: string
  companyUser: string
  companyUserName: string
  detailDtos: [
    {
      categoryId: number
      categoryName: string
      checkBasis: string
      checkContent: string
      checkRequire: string
      id: number
      itemId: number
      itemName: string
      legalLiability: string
    },
  ]
  id: number
  name: string
  planId: number
  planName: string
}

// 新增或修改
export function addOrUpdate(params: UpdateQuery) {
  return request({ url: '/business/tsSecurityCheckPlan/addOrUpdate', method: 'post', data: params })
}

export interface DeleteQuery {
  id: number
}
// 检查项目删除
export function checkPlanDelete(params: DeleteQuery) {
  return request({ url: '/business/tsSecurityCheckPlan/delete', method: 'get', params: params })
}