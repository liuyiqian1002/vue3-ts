import request from '@/utils/request'

// 企业档案接口

export interface CompanyArchivesQuery {
  archivesName?: string
  archivesType?: number
  categoryId?: number
  companyId?: number
  endDate?: string
  pageNumber?: number
  pageSize?: number
  startDate?: string
}

export interface ListResItem {
  archivesType: number
  archivesTypeName: string
  categoryId: number
  categoryName: string
  companyId: number
  companyName: string
  createTime: string
  createTimeStr: string
  createUser: string
  dataPermissionCode: string
  id: number
  lastModifiedTime: string
  lastModifiedUser: string
  name: string
  valid: boolean
}

// 企业档案列表
export function companyArchivesPage(params: CompanyArchivesQuery) {
  return request({ url: '/business/archives/companyArchivesPage', method: 'post', data: params })
}

export interface AddOrUpdateQuery {
  archivesType?: number
  categoryId?: number
  companyId?: number
  fileList?: [
    {
      fileId: string
      fileName: string
      filePath: string
      thumbnailViewUrl: string
      uploadName: string
      viewUrl: string
    },
  ]
  id?: number
  name: string
}

// 添加或修改
export function addOrUpdate(params: AddOrUpdateQuery) {
  return request({ url: '/business/archives/addOrUpdate', method: 'post', data: params })
}


// 获取档案附件
export function getAttachListInfo(id: number) {
  return request({ url: '/business/archives/getAttachListInfo', method: 'get', params: {id} })
}