import request from '@/utils/request'

// 报警申诉接口

export interface AlarmAppealQuery {
  alarmEventIdList: number[]
  alarmLevelList: string[]
  alarmLevelMapList: object[]
  alarmTypeCodeList: string[]
  appealEndTime: string
  appealResultCode: string
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

// 报警申诉列表
export function feedbackPage(params: AlarmAppealQuery) {
  return request({ url: '/operation/alarmAppeal/feedbackPage', method: 'post', data: params })
}
export interface AddAppealQuery {
  alarmEventId: number
  appealContent: string
  appealReasonCode: number
  appealTypeCode: number
  imgIdList: string[]
}
// 报警申诉处理

export function addAppeal(params: AddAppealQuery) {
  return request({ url: '/operation/alarmAppeal/addAppeal', method: 'post', data: params })
}

export interface BatchAddAppealQuery {
    alarmEventIdList: number[]
    appealContent: string
    appealReasonCode: number
    appealTypeCode: number
    imgIdList: string[]
  }

// 报警申诉处理
export function batchAddAppeal(params: BatchAddAppealQuery) {
  return request({ url: '/operation/alarmAppeal/batchAddAppeal', method: 'post', data: params })
}
