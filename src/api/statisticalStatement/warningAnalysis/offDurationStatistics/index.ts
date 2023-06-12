// @ts-ignore
import request from '@/utils/request'


// 离线时长统计导出
export function exportOffLineData(params: Object) {
    return request({ url: '/statistics/alarmStatistics/exportOffLineData', method: 'post', data: params })
}
