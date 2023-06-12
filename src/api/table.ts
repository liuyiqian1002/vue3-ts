// @ts-ignore
import request from '@/utils/request'


//----------------------------- 获取表格数据------------------------
// 获取菜单数据
export function getTableList() {
    return request({ url: '/tableList', method: 'get' })
}

