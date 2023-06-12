import request from '@/utils/request'

// 申诉处理接口

export interface AppealProcess {
  alarmAppealId: number
  alarmEventId: number
  alarmEventIdList: number[]
  alarmLevelList: string[]
  alarmLevelMapList: object[]
  alarmTypeCodeList: string[]
  appealEndTime: string
  appealResultCode: number
  appealStartTime: string
  appealStatusCode: number
  appealTypeCode: number
  appealTypeCodeList: number[]
  companyId: number
  currentCheckedPermissionCodeList: string[]
  driverWarningType: string
  driverWarningTypeList: string[]
  eventId: string
  eventPersistSeconds: number
  eventStatus: number
  eventStatusList: string[]
  hasManual: number
  maxEventStartTime: string
  minEventStartTime: string
  modelType: string
  operatorId: number
  order: string
  orderField: string
  pageNumber: number
  pageSize: number
  plateNum: string
  status: number
  vehicleCode: string
  vehicleCodeList: string[]
  vehicleOperateTypeCodeList: string[]
}

export interface AppealProcessRes extends AppealProcess {
  alarmTypeName: string
  appealContent: string
  appealPerson: string
  appealReasonName: string
  appealResultName: string
  appealStatusName: string
  appealTimeStr: string
  appealTypeName: string
  processPerson: string
  processRemark1: string
  processRemark2: string
  processTimeStr: string
  imgList: string[]
  lastModifiedTime: string
  lastModifiedUser: string
  processTime: string
  processingDepartment: number
}

export type AppealProcessPartial = Partial<AppealProcess>

// 申诉处理列表
export function appealHand(params: AppealProcessPartial) {
  return request({ url: '/operation/appealHand/page', method: 'post', data: params })
}
export interface AddAppeal {
  alarmAppealId: number
  appealResultCode: number
  appealResultName: string
  appealStatusCode: number
  appealStatusName: string
  lastModifiedTime: string
  lastModifiedUser: string
  processPerson: string
  processRemark1: string
  processRemark2: string
  processTime: string
  processingDepartment: number
}
export type AddAppealQuery = Partial<AddAppeal>
// 申诉处理
export function addAppeal(params: AddAppealQuery) {
  return request({ url: '/operation/appealHand/addAppeal', method: 'post', data: params })
}
export interface BatchEditAppeal {
  alarmEventIdList: number[]
  alarmEventId: number
  appealResultCode: number
  appealResultName: string
  appealStatusCode: number
  appealStatusName: string
  processRemark1: string
  processRemark2: string
  processingDepartment: number
}
export type BatchEditAppealQuery =  Partial<BatchEditAppeal>
// 批量申诉处理
export function batchEditAppeal(params: BatchEditAppealQuery) {
  return request({ url: '/operation/appealHand/batchEditAppeal', method: 'post', data: params })
}
