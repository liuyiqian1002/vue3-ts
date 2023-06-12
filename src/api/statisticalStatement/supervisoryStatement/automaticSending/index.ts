// @ts-ignore
import request from '@/utils/request'


// 重新发送-批量重新发送
export function reSendMail(params: Object) {
    return request({ url: '/statistics/reportSendRecord/reSendMail', method: 'post', data: params })
}


// 获取批量下载KEY
export function setBatchDownloadReqDataKey(params: Object) {
    return request({ url: '/file/setBatchDownloadReqDataKey', method: 'post', data: params })
}

// 批量下载
export function batchDownload(params: Object) {
    return request({ url: '/file/batchDownload', method: 'get', responseType: 'blob', params: params })
}

// 报表自动发送-导出
export function reportSendRecordExport(params: Object) {
    return request({ url: '/statistics/reportSendRecord/export', method: 'post', data: params })
}
