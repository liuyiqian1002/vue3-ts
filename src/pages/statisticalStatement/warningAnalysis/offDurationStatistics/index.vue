<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
    </div>
</template>


<script setup lang="tsx">
import {
    exportOffLineData,
} from '../../../../api/statisticalStatement/warningAnalysis/offDurationStatistics/index'

let {proxy} = getCurrentInstance()
let contentMainRef = $ref(null)
let mainData = reactive({
    tableUrl: '/statistics/alarmStatistics/offLineDataStatistics',
    isCheck: true,
    columns: [
        { prop: 'regional', label: '组织区域' },
        { prop: 'companyName', label: '企业' },
        { prop: 'plateNum', label: '车牌号', width: 110 },
        { prop: 'vehicleOperateTypeName', label: '营运类型', width: 120 },
        { prop: 'operatorName', label: '运营商' },
        { prop: 'operState', label: '车辆状态', filter: 'vehicleOperatorState' },
        { prop: 'offLineDateTime', label: '离线时长' },
        { prop: 'lastModifyTime', label: '最后gps时间' },
        { prop: 'locationName', label: '最后定位' },
    ],
    headBtns: [
        {
            icon: 'daochu',
            name: '导出',
            click: (row) => {
                let lists = contentMainRef.getAllCheck()
                let ids = proxy.$_.map(lists, 'operatorId')
                // let txt = ids.length > 0 ? `请确定导出选中的${ids.length}条数据吗？` : `请确定导出全部数据`
                let txt = `请确定导出全部数据`
                proxy.MessageBox({ msg: txt, type: 'warning' }).then((close) => {
                    exportOffLineData({...mainData.formData, ...{ ids: ids },}).then((res) => {
                        window.open(res.fileUrl)
                        close()
                    }).catch(() => {
                        close()
                    })
                })
            },
        },
    ],
    formData: {
        "endDate": "",
        "offLineDays": 3,
        "operatorId": '',
        "order": "",
        "orderField": "",
        "orgId": "",
        "startDate": "",
        "vehicleCode": "",
        "vehicleOperateTypeCodeList": [],
        alarmTypeCodeList:[],
        "pageNumber": 1,
        "pageSize": 25,
    },
    lists: [
        { key: 'orgId', label: '组织结构', placeholder: '请选择组织结构', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: { "hasDataPermission": true, needVehicle: false, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode', disabled: 'nocheck'}, permissionIds:[] },
        {label: '营运类型', key: 'vehicleOperateTypeCodeList', width: 170, type: 'allSelect', remote: true, url: '/system/vehicleOperateType/getTreeIdList', method: 'get', loadMore: true, placeholder: '请选择营运类型',},
        {label: '运营商', key: 'operatorId', type: 'select', remote: true, url: '/business/operatorEntity/listAssociateOperator', method: 'get', params: {}, props: { label: 'name', value: 'id' }, placeholder: '请选择运营商',},
        {label: '报警类型', key: 'alarmTypeCodeList', type: 'allSelect', filter: 'alarmModeTypes', placeholder: '请选择报警类型', width: 760,},
        {label: '车牌号', key: 'vehicleCode', type: 'select', remote: true, url: '/business/vehicle/associationPlateNum', method: 'post', loadMore: true, params: {pageNumber: 1, pageSize: 25, valid: 1, havePermission: true,}, props: { label: 'plateNum', value: 'vehicleCode' }, placeholder: '请选择车牌号码',},
        {label: '离线天数>=', key: 'offLineDays'  },
        {label: '时间范围', key: ['startDate', 'endDate'], type: 'esDate', col: 12, data: { valueFormat: 'YYYY-MM-DD' } },
    ],
})

const getTable = () => {
    contentMainRef.getTable()
}
</script>

<style scoped lang="scss">
</style>
