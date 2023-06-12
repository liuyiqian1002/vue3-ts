// @ts-ignore
import request from '@/utils/request'


// 运营商平台连通率导出
export function exportVehicleStateSnapShoot(params: Object) {
    return request({ url: '/statistics/alarmStatistics/exportVehicleStateSnapShoot', method: 'post', data: params })
}
