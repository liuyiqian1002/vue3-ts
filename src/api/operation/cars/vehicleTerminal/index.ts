// @ts-ignore
import request from '@/utils/request'


//----------------------------- 获取表格数据------------------------

// 删除-启用禁用
export function updateValid(query: Object) {
    return request({ url: '/business/terminalType/updateValid', method: 'post', data: query })
}

// 新增编辑接口
export function addOrUpdate(query: Object) {
    return request({ url: '/business/terminalType/addOrUpdate', method: 'post', data: query })
}
