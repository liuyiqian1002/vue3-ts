// @ts-ignore
import request from '@/utils/request'


//----------------------------- 获取表格数据------------------------

// 获取树接口，如传入parentCode则返回对应子节点
export function getTreesList(query) {
    return request({ url: '/system/dynamicTree/getTreesList', method: 'post', data: query })
}

// 勾选的节点获取车辆
export function getVehicleListForCheckedNodeNotPage(query) {
    return request({ url: '/business/tbVehicleState/getVehicleListForCheckedNodeNotPage', method: 'post', data: query })
}

// 动态监测树上车辆数查
export function getVehicleStateStatistic(query) {
    return request({ url: '/business/vehicle/getVehicleStateStatistic', method: 'post', data: query })
}

// 车辆实时状态
export function getVehicleState(query) {
    return request({ url: '/business/tbVehicleState/getVehicleState', method: 'post', data: query })
}

// 获取车辆描述状态
export function getVehicleDetail(query) {
    return request({ url: '/business/tbVehicleState/getVehicleDetail', method: 'post', data: query })
}

// 动态监测企业车辆控件联想
export function associateCompanyAndVehicle(query) {
    return request({ url: '/business/company/associateCompanyAndVehicle', method: 'post', data: query })
}

// 页面点击搜索节点
export function getNodesForSearch(query) {
    return request({ url: '/system/dynamicTree/getNodesForSearch', method: 'post', data: query })
}

// 获取勾选节点车辆列表
export function getVehicleListForCheckedPermission(query) {
    return request({ url: '/business/vehicle/getVehicleListForCheckedPermission', method: 'post', data: query })
}

// 获取勾选节点车辆列表总数
export function getVehicleListForCheckedPermissionCount(query) {
    return request({ url: '/business/vehicle/getVehicleListForCheckedPermissionCount', method: 'post', data: query })
}

// 通过节点选择车辆添加关注
export function saveVehicleUserFocus(query) {
    return request({ url: '/business/vehicleUserFocus/saveVehicleUserFocus', method: 'post', data: query })
}

// 取消关注
export function removeVehicleUserFocus(query) {
    return request({ url: '/business/vehicleUserFocus/removeVehicleUserFocus', method: 'post', data: query })
}

// 拍照
export function takePhoto(query) {
    return request({ url: '/dyndatastore/command/takePhoto', method: 'post', data: query })
}

// 拍照定时控制
export function photoTimeControl(query) {
    return request({ url: '/dyndatastore/command/photoTimeControl', method: 'post', data: query })
}

// 拍照定距离控制
export function photoDistanceControl(query) {
    return request({ url: '/dyndatastore/command/photoDistanceControl', method: 'post', data: query })
}

// 查询终端参数
export function queryParamSet(query) {
    return request({ url: '/dyndatastore/command/queryParamSet', method: 'post', data: query })
}

// 终端参数设置
export function termParamSet(query) {
    return request({ url: '/dyndatastore/command/termParamSet', method: 'post', data: query })
}

// 获取文本信息下发模板
export function getToolConfigList(query) {
    return request({ url: '/operation/monitor/getToolConfigList', method: 'post', params: query })
}

// 下发文本信息接口
export function sendTextInfo(query) {
    return request({ url: '/dyndatastore/command/sendTextInfo', method: 'post', data: query })
}

// 图片列表
export function photoPage(query) {
    return request({ url: '/operation/photo/page', method: 'post', data: query })
}

// 照片查询 - 镜头标记
export function saveLesMarkSign(query) {
    return request({ url: '/operation/photo/saveLesMarkSign', method: 'post', data: query })
}

// 照片查询 - 违规标记
export function saveMarkSign(query) {
    return request({ url: '/operation/photo/saveMarkSign', method: 'post', data: query })
}

// 照片镜头标记详情
export function getPhotoLesMarkSignInfo(query) {
    return request({ url: '/operation/photo/getPhotoLesMarkSignInfo', method: 'post', data: query })
}

// 停止接受轨迹信息
export function stopPushTrack(query) {
    return request({ url: '/operation/track/stopPushTrack', method: 'post', data: query })
}

// 全部报警数量
export function alarmCount(query) {
    return request({ url: '/operation/track/alarmCount', method: 'post', data: query })
}

// 轨迹回放导出
export function exportTrackData(query) {
    return request({ url: '/operation/track/exportTrackData', method: 'post', data: query })
}

// 停车数据导出
export function exportParkTime(query) {
    return request({ url: '/operation/track/exportParkTime', method: 'post', data: query })
}

// 行驶数据导出
export function exportTravelTime(query) {
    return request({ url: '/operation/track/exportTravelTime', method: 'post', data: query })
}

// 全部报警一导出
export function exportAlarmPage(query) {
    return request({ url: '/operation/track/exportAlarmPage', method: 'post', data: query })
}

// 筛选设置
export function saveDynamicSearchConfigDto(query) {
    return request({ url: '/business/dynamicSearchConfig/saveDynamicSearchConfigDto', method: 'post', data: query })
}

// 设置获取
export function getDynamicSearchConfigDto(query) {
    return request({ url: '/business/dynamicSearchConfig/getDynamicSearchConfigDto', method: 'post', data: query })
}

// 违规纠正
export function relieve(query) {
    return request({ url: '/operation/photo/violation/relieve', method: 'POST', data: query })
}

// 获取勾选节点车辆列表 导出
export function exportVehicleState(query) {
    return request({ url: '/business/vehicle/exportVehicleState', method: 'POST', data: query })
}

// 获取勾选节点车辆列表 excle导出
export function exportVehicleStateSimple(query) {
    return request({ url: '/business/vehicle/exportVehicleStateSimple', method: 'POST', data: query })
}

// 车辆抽查
export function saveVehicleStateSnapshoot(query) {
    return request({ url: '/business/vehicleStateSnapshoot/saveVehicleStateSnapshoot', method: 'POST', data: query })
}












