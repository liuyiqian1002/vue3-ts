// @ts-ignore
import request from '@/utils/request'


// 报警明细统计导出
export function exportAlarmDetail(params: Object) {
    return request({ url: '/statistics/alarmStatistics/exportAlarmDetail', method: 'post', data: params })
}
