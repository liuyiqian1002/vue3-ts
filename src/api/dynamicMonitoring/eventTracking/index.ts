// @ts-ignore
import request from '@/utils/request'

//----------------------------- 获取表格数据------------------------

// 获取事件跟踪列表
// 参数约束
export interface EventTrackingQuery {
  alarmLevel?: number
  alarmLevelMapList?: object[]
  alarmTypeCodeList?: string[]
  companyId?: number
  companyName?: string
  driverWarningTypeList?: string[]
  endTime?: string
  eventPersistSeconds?: number
  eventStatusList?: string[]
  hasManual?: number
  operatorId?: number
  order?: string
  orderField?: string
  pageNumber: number // 必填
  pageSize: number // 必填
  startTime?: string
  type?: string
  typeId?: string
  typeIdList?: string[]
  vehicleCode?: string
  vehicleOperateTypeIdList?: number[]
}
export function getEventTrackingList(query: EventTrackingQuery) {
  return request({ url: '/operation/alarmEventEntity/page', method: 'post', data: query })
}

export interface EventTrackInfoQuery {
  alarmLevel: number
  eventEndTime?: string
  eventId: string
}

// 警情列表
export function getEventTrackInfo(query: EventTrackInfoQuery) {
  return request({ url: '/operation/alarmEventEntity/getEventTrackInfo', method: 'post', data: query })
}

export interface ParkTimeListQuery {
  endTime: string
  plateNum: string
  startTime: string
  vehicleCode: string
}
// 警情列表-停车时长
export function getParkingTimeList(query: ParkTimeListQuery) {
  return request({ url: '/operation/alarmEventEntity/getParkTimeList', method: 'post', data: query })
}

export interface AddressByLocationQuery {
  latitude: number
  locationName?: string
  longitude: number
  primaryId: string
}

// 警情列表-位置信息
export function getAddressByLocation(query: AddressByLocationQuery[]) {
  return request({ url: '/operation/alarmEventEntity/getAddressByLocation', method: 'post', data: query })
}

export interface EventTrackExportQuery {
  alarmLevel?: number
  alarmLevelMapList?: object[]
  alarmTypeCodeList?: string[]
  companyId?: number | null
  companyName?: string
  driverWarningTypeList?: string[]
  endTime?: string
  eventPersistSeconds?: number
  eventStatusList?: string[]
  hasManual?: number
  operatorId?: number
  order?: string
  orderField?: string
  pageNumber: number
  pageSize: number
  startTime?: string
  type?: string
  typeId?: string
  typeIdList?: string[]
  vehicleCode?: string
  vehicleOperateTypeIdList?: number[]
}

// 导出
export function eventTrackExport(query: EventTrackExportQuery) {
  return request({ url: '/operation/alarmEventEntity/export', method: 'post', data: query })
}
// 企业报警统计导出
export function exportAlarmStatistics(query: EventTrackExportQuery) {
  return request({ url: '/operation/alarmEventEntity/exportAlarmStatistics', method: 'post', data: query })
}

export interface ManualHandleQuery {
  alarmEventId?: number
  vehicleCode?: string
  alarmLevel?: number
  eventId?: string
  handleType?: number
  processContent?: string
  processMethod?: number
  receiverName?: string
  receiverPhone?: string
}

// 人工处理-有效警情
export function manualHandle(query: ManualHandleQuery) {
  return request({ url: '/operation/alarmEventEntity/manualHandle', method: 'post', data: query })
}

export interface BatchManualHandleQueryItem {
  alarmEventId?: number
  eventId?: string
  vehicleCode?: string
  handleType?: number
  processContent?: string
  processMethod?: number
  receiverName?: string
  receiverPhone?: string
}
// 批量人工处理-有效警情  Array<BatchManualHandleQueryItem>
export function batchManualHandle(query: ManualHandleQuery[]) {
  return request({ url: '/operation/alarmEventEntity/batchManualHandle', method: 'post', data: query })
}

export interface ManualHandleInvalidQuery {
  alarmEventId?: number
  alarmTypeCode?: string
  eventId?: string
  eventDesc?: string
  eventEndTime?: string
  eventStartTime?: string
  eventOriginalTime?: string
  alarmLevel?: number
  fileIdList: string[]
  valid: boolean
  vehicleCode: string
}
// 人工处理-无效警情
export function manualHandleInvalid(query: ManualHandleInvalidQuery) {
  return request({ url: '/operation/alarmEventEntity/invalidEvent', method: 'post', data: query })
}
// 批量人工处理-无效警情
export function manualHandleInvalidBatch(query: ManualHandleInvalidQuery[]) {
  return request({ url: '/operation/alarmEventEntity/handleValidBatch', method: 'post', data: query })
}

export interface EventLogsQuery {
  alarmEventId: number
  eventId: string
  alarmId?: string
}

// 处理日志
export function getEventLogs(query: EventLogsQuery) {
  return request({ url: '/operation/alarmEventEntity/getEventLog', method: 'post', data: query })
}

export interface FlvPlayConfigQuery {
  vehicleCode: string
}

// 视频播放
export function getFlvPlayConfig(query: FlvPlayConfigQuery) {
  return request({ url: '/operation/flvPlay/getFlvPlayConfig', method: 'get', params: query })
}
// 获取历史视频
export function getHistoryFlvPlayConfig(query: FlvPlayConfigQuery) {
  return request({ url: '/operation/flvPlay/getHistoryFlvPlayConfig', method: 'get', params: query })
}

export interface MarkSignQuery {
  alarmTypeCode: string
  date: string
  driverWarningType: string[]
  fileId: string
  markingDesc: string
  vehicleCode: string
  vehicleId?: number
  violationSpeed: number | null
}
// 视频标记
export function saveMarkSign(query: MarkSignQuery) {
  return request({ url: '/operation/flvPlay/saveMarkSign', method: 'post', data: query })
}

// 照片列表
export function getPhotoList(query: any) {
  return request({ url: '/operation/alarmEventEntity/getPhotoList', method: 'post', data: query })
}

// 违规图片
export function getViolationPhotoList(query: any) {
  return request({ url: '/operation/photo/getViolationPhotoList', method: 'get', params: query })
}

// 下载附件请求
export function fileDownloadReq(query: any) {
  return request({ url: '/dyndatastore/command/fileDownloadReq', method: 'post', data: query })
}
// 视频弹窗图片列表
export function getEventMomentaPicAndVideos(query: any) {
  return request({ url: '/operation/alarmEventEntity/getEventMomentaPicAndVideos', method: 'post', data: query })
}
/**
 * @description 获取警情弹窗数据（停车区域报警规划,禁行区域回显,司机插拔卡记录,高速脱离监控）
 * @param query
 * @returns
 */
export function findDriverChangeRecords(query: { alarmEventId: string }) {
  return request({ url: '/operation/alarmEventEntity/findDriverChangeRecords', method: 'get', params: query })
}
/**
 * @description 获取预警与报警是否分开，即事件跟踪传参时预警和报警是否只能传一种
 */
export function getIsDivideTable(query: any) {
  return request({ url: '/operation/alarmEventEntity/getIsDivideTable', method: 'get', params: query })
}

interface IRelieveQuery {
  alarmEventId: number
  businessId: string
  driverWarningType: string
  flag: true | false
  gpsTime: string
  markingDesc: string
  note: string
  plateNum: string
  primaryId: string
  remark: string
  sendMsg: number
  userId: number
  userName: string
  vehicleCode: string
}

// 违规纠正
export function relieve(query: Partial<IRelieveQuery>) {
  return request({ url: '/operation/photo/violation/relieve', method: 'post', data: query })
}

interface IEventQuery {
  alarmEventId?: number
  alarmLevel?: number
  eventId?: string
}
// 事件详情
export function getEvent(query: IEventQuery) {
  return request({ url: '/operation/alarmEventEntity/getEvent', method: 'post', data: query })
}
