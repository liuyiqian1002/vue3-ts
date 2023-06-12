// @ts-ignore
import request from '@/utils/request'

// 企业基本信息接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/business/company/addOrUpdate', method: 'post', data: params })
}
// // 发送公告接口
export function sendNotice(id) {
    return request({ url: `/business/noticeEntity/sendNotice/${id}`, method: 'get' })
}
// 查询单个
export function getOneById(id) {
    return request({ url: `/business/noticeEntity/getOneById/${id}`, method: 'get' })
}
// 企业基本信息禁用-启用接口
export function updateValid(params: Object) {
    return request({ url: '/business/company/updateValid', method: 'post', data: params })
}
// 根据企业ID获取企业联系人
export function getListByCompanyId(params: Object) {
    return request({ url: '/business/companyContacts/getListByCompanyId', method: 'post', data: params })
}
// 下载模板
export function downloadTemplate(params: Object) {
    return request({ url: '/business/company/downloadTemplate', method: 'get', responseType: 'blob', data: params })
}

// 导出
export function basicinformationExport(params: Object) {
    return request({ url: '/business/company/export', method: 'post', data: params })
}

// 导入
export function basicinformationUpload(params: Object) {
    return request({ url: '/business/company/upload', method: 'post', data: params })
}
