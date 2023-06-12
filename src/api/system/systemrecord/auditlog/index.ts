// @ts-ignore
import request from '@/utils/request'


// 导出
export function systemLogEntityExport(params: Object) {
    return request({ url: '/system/systemLogEntity/export', method: 'post', data: params })
}
