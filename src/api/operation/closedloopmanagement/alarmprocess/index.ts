import request from '@/utils/request'

// 报警处置接口

export interface AlarmProcessItem {
  companyId: number
  companyName: string
  driverStateAbnormalCount: number
  driverStateAbnormalNotProcessedCount: number
  drivingBehaviorAbnormalCount: number
  drivingBehaviorAbnormalNotProcessedCount: number
  operatingAlarmCount: number
  operatingAlarmNotProcessedCount: number
  plateColorName: string
  plateNum: string
  vehicleCode: string
}

export interface EventStaticsListQuery {
  alarmTypeCodeList: string[]
  companyId: number
  driverWarningTypeList: string[]
  endTime: string
  order: string
  orderField: string
  pageNumber: number
  pageSize: number
  plateNum: string
  startTime: string
  vehicleCode: string
}

// 报警处置列表
export function getEventStaticsList(params: EventStaticsListQuery) {
  return request({ url: '/operation/eventDisposal/getEventStaticsList', method: 'post', data: params })
}

export interface EventStaticsQuery {
  alarmTypeCodeList: string[]
  companyId: number
  driverWarningTypeList: string[]
  onlyShowNotDisposal: boolean
  showEventAddress: boolean
  endTime: string
  order: string
  orderField: string
  pageNumber: number
  pageSize: number
  plateNum: string
  startTime: string
  vehicleCode: string
}

export interface EventStaticsItem {
  alarmEventId: number
  alarmGroupId: number
  alarmGroupName: string
  alarmTypeCode: string
  alarmTypeCodeName: string
  appealStatus: number
  appealStatusName: string
  appealType: number
  appealTypeName: string
  displayPenaltyContent: string
  driverwarningtype: string
  driverwarningtypeName: string
  eventAddress: string
  eventDisposalId: number
  eventEndTime: string
  eventEndTimeStr: string
  eventHandleStatus: number
  eventHandleStatusName: string
  eventLatitude: number
  eventLongitude: number
  eventPersistSeconds: number
  eventPersistSecondsStr: string
  eventStartTime: string
  eventStartTimeStr: string
  eventStatus: number
  eventStatusName: string
  id: number
  penaltyContent: string
  penaltyType: number
  penaltyTypeName: string
  plateColorCode: string
  plateColorName: string
  plateNum: string
  valid: boolean
}

// 报警处置详情列表
export function getStaticsDetail(params: EventStaticsQuery) {
  return request({ url: '/operation/eventDisposal/getStaticsDetail', method: 'post', data: params })
}
// 预处理警情列表， 参数同上(EventStaticsDetailQuery)
export function getNotDisposalEvents(params: EventStaticsQuery) {
  return request({ url: '/operation/eventDisposal/getNotDisposalEvents', method: 'post', data: params })
}

export interface eventDisposalDto {
  companyId: number
  companyName: string
  createTime: string
  createUserId: string
  createUserName: string
  criticismCount: number
  dismissal: string
  disposalStatus: number
  disposalStatusName: string
  disposalTime: string
  disposalTimeStr: string
  disposalUserName: string
  driverName: string
  driverStateAbnormalCount: number
  drivingBehaviorAbnormalCount: number
  fileUrl: string
  financialPenaltiesAmount: number
  id: number
  joinDiscipline: string
  lastModifyTime: string
  lastModifyUserId: string
  lastModifyUserName: string
  operatingAlarmCount: number
  otherPenalties: string
  plateColorName: string
  plateNum: string
  preDisposalContent: string
  staticsInfo: string
  suspensionClassHour: number
  valid: boolean
  vehicleCode: string
}

export interface EventDisposalQuery {
  detailDtoList: EventStaticsItem[],
  eventDisposalDto: Partial<eventDisposalDto>
}

// 预处理保存
export function saveEventDisposal(params: EventDisposalQuery) {
  return request({ url: '/operation/eventDisposal/saveEventDisposal', method: 'post', data: params })
}
