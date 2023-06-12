// @ts-ignore
import request from '@/utils/request'





// 导出
export function userLogEntityExport(params: Object) {
    return request({ url: '/system/userLogEntity/export', method: 'post', data: params })
}
