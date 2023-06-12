import request from '@/utils/request'

// 罚单档案接口

export interface EventDisposalQuery {
  companyId: 0
  disposalStatus: 0
  endTime: ''
  id: 0
  order: ''
  orderField: ''
  pageNumber: 0
  pageSize: 0
  plateNum: ''
  startTime: ''
  staticsInfo: true
  vehicleCode: ''
}

// 罚单档案列表
export function getEventDisposalList(params: EventDisposalQuery) {
  return request({ url: '/operation/eventDisposal/getEventDisposalList', method: 'post', data: params })
}
export interface DisposalDetailQuery {
  disposalId: number
  onlyQueryValidDetail: boolean
  queryDisposal: boolean
  queryDisposalDetail: boolean
  queryDisposalRecord: boolean
  showEventAddress: boolean
}
// 罚单档案查看罚单详情
export function getDisposalDetailDto(params: DisposalDetailQuery) {
  return request({ url: '/operation/eventDisposal/getDisposalDetailDto', method: 'post', data: params })
}
// 罚单档案查看事件详情
export function getEventDetailList(params: DisposalDetailQuery) {
  return request({ url: '/operation/eventDisposal/getEventDetailList', method: 'post', data: params })
}

// update就是报警处置(alarm process)里面的 saveEventDisposal

export interface HandleDisposalQuery {
  disposalId: number
  driverName: string
  fileUrlId: string[]
}
// 处置罚单接口
export function handleDisposal(params: HandleDisposalQuery) {
  return request({ url: '/operation/eventDisposal/handleDisposal', method: 'post', data: params })
}

// 撤销罚单
export function cancelDisposal(params: {disposalId: number}) {
  return request({ url: '/operation/eventDisposal/cancelDisposal', method: 'post', data: params })
}