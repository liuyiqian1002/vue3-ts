import request from '@/utils/request'

// 检查任务接口

export interface CheckTaskQuery {
  companyId?: number
  endTime?: string
  name?: string
  order?: string
  orderField?: string
  pageNumber: number
  pageSize: number
  planId?: number
  startTime?: string
  taskStatusList?: number[]
}

export interface CheckTaskResItem {
  adminUserNum: number
  checkBy: string
  checkTime: string
  checkTimeStr: string
  checkUserIds: string
  checkUserName: string
  checkUserNames: string
  checkUserNum: number
  companyId: number
  companyName: string
  companyUserIds: string
  companyUserNames: string
  companyUserNum: number
  createTime: string
  createTimeStr: string
  createUser: string
  createUserName: string
  createUserNum: number
  dataPermissionCode: string
  id: number
  ifAdminUser: boolean
  ifCheckUser: boolean
  ifCompanyUser: boolean
  ifCreateUser: boolean
  lastModifiedTime: string
  lastModifiedUser: string
  manageUserIds: string
  manageUserNames: string
  name: string
  noticeId: number
  overdueStatus: number
  planId: number
  planName: string
  rectifyRequire: string
  rectifyTime: string
  rectifyTimeStr: string
  rectifyType: number
  signTime: string
  status: number
  statusName: string
  superviseRequire: string
  superviseTime: string
  valid: boolean
}

// 列表
export function checkTask(params: CheckTaskQuery) {
  return request({ url: '/business/tsSecurityCheckTask/page', method: 'post', data: params })
}

export interface UpdateQuery {
  endTime: string
  id: number
  name: string
  planTypeCode: number
  preparedBy: string
  startTime: string
}

// 新增或修改
export function addOrUpdate(params: UpdateQuery) {
  return request({ url: '/business/tsSecurityCheckTask/addOrUpdate', method: 'post', data: params })
}

export interface DeleteQuery {
  id: number
}
// 检查任务删除
export function checkTaskDelete(params: DeleteQuery) {
  return request({ url: '/business/tsSecurityCheckTask/delete', method: 'get', params: params })
}
export interface DetailQuery {
  id: number
}
// 检查任务详情
export function getTask(params: DetailQuery) {
  return request({ url: '/business/tsSecurityCheckTask/getTask', method: 'get', params: params })
}
export interface UnPassQuery {
  checkTimeStr: string
  companyId: number
  notEqualTaskId: number
  order: string
  orderField: string
  pageNumber: number
  pageSize: number
}
// 待检查项
export function unPassPage(params: UnPassQuery) {
  return request({ url: '/business/tsSecurityCheckTask/unPassPage', method: 'post', data: params })
}
