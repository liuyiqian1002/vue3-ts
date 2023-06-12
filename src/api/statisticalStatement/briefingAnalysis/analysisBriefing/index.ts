// @ts-ignore
import request from '@/utils/request'


// 分析简报批量导出
export function batchDownload(params: object) {
    return request({ url: '/statistics/briefReport/batchDownload', method: 'get', responseType: 'blob', params: params })
}

// 分析简报下载
export function download(id) {
    return request({ url: '/statistics/briefReport/download', method: 'get', responseType: 'blob', params: {briefId: id} })
}

// 简报详情
export function briefDetail(id) {
    return request({ url: '/statistics/briefReport/briefDetail', method: 'get', params: {briefId: id} })
}
