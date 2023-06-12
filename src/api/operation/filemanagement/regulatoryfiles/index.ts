import request from '@/utils/request'

// 检查项目接口

export interface BatchAddAppealQuery {
    alarmEventIdList: number[]
    appealContent: string
    appealReasonCode: number
    appealTypeCode: number
    imgIdList: string[]
  }

// 处理
export function batchAddAppeal(params: BatchAddAppealQuery) {
  return request({ url: '/operation/alarmAppeal/batchAddAppeal', method: 'post', data: params })
}
