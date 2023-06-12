// @ts-ignore
import request from '@/utils/request'

// 人工处警配置接口

// 添加与修改接口
export function addOrUpdate(params: Object) {
    return request({ url: '/business/alarmProcessToolConfigEntity/addOrUpdate', method: 'post', data: params })
}