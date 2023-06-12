import request from '@/utils/request'

// 报警处理统计接口

export interface DisposalStaticsListQuery {
  alarmTypeCodeList: string[]
  driverWarningTypeList: string[]
  endTime: string
  nodeDto: {
    orgCode: string
    orgId: number
    orgName: string
    orgType: number
    parent: true
    parentCode: string
    parentName: string
    permissionCode: string
    vehicle: true
  }
  order: string
  rankCount: number
  rankType: string
  startTime: string
}

// 报警处理统计-下级列表
export function eventDisposalStaticsSubList(params: Partial<DisposalStaticsListQuery>) {
  return request({ url: '/operation/alarmEventExternal/eventDisposalStaticsSubList', method: 'post', data: params })
}
// 报警处理统计 导出
export function exportEventDisposalStatics(params: Partial<DisposalStaticsListQuery>) {
  return request({ url: '/operation/alarmEventExternal/exportEventDisposalStatics', method: 'post', data: params })
}
// 报警处理统计-下级列表 导出
export function exportEventDisposalStaticsSubList(params: Partial<DisposalStaticsListQuery>) {
  return request({ url: '/operation/alarmEventExternal/exportEventDisposalStaticsSubList', method: 'post', data: params })
}

