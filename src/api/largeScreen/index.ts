import request from '@/utils/request'


// 数据看板
export function getSafetySignBoard(params: Object) {
    return request({ url: '/statistics/activeSafetySignBoard/getActiveSafetyAlarmCountInfo', method: 'get', params: params })
}
// 报警明细
export function getAlarmListDetail(params: Object) {
    return request({ url: '/operation/alarmEventEntity/getSignBoardDetailList', method: 'post', data: params })
}
// 获取配置
export function getPanelSettings(params: Object) {
    return request({ url: '/business/activeSafetyAnalysisConfig/getConfigDataList', method: 'post', data: params })
}
// 设置配置
export function updatePanelSettings(params: Object) {
    return request({ url: '/business/activeSafetyAnalysisConfig/addOrUpdate', method: 'post', data: params })
}


