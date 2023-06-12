<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        <!--    详情    -->
        <CarDetailDialog ref="dialogRef" :title="title" showManual showVideoPlayer></CarDetailDialog>
    </div>
</template>


<script setup lang="tsx">
import CarDetailDialog from '@/businessComponents/CarDetailDialog/index.vue'
import {
    exportAlarmDetail,
} from '@/api/statisticalStatement/warningAnalysis/alarmDetails/index'

let {proxy} = getCurrentInstance()
let dialogRef = $ref(null)
let contentMainRef = $ref(null)
let title = $ref('')
let mainData = reactive({
    tableUrl: '/statistics/alarmStatistics/alarmDetail',
    isCheck: false,
    isLoadStatus: true,
    columns: [
        { prop: 'cityName', label: '市区', formatter: (row)=> row.cityName+row.districtName },
        { prop: 'companyName', label: '企业名称', width: 120 },
        { prop: 'vehicleOperateTypeName', label: '营运类型' },
        { prop: 'plateNum', label: '车牌号码' },
        { prop: 'plateColorName', label: '车牌颜色' },
        { prop: 'operatorName', label: '运营商' },
        { prop: 'alarmTypeName', label: '报警类型' },
        { prop: 'alarmLevel', label: '报警级别' },
        { prop: 'eventEndTimeStr', label: '警情/行驶开始时间' , width: 160},
        { prop: 'eventOriginalTimeStr', label: '事件开始时间', width: 130 },
        { prop: 'eventStartTimeStr', label: '警情/行驶结束时间' , width: 160 },
        { prop: 'persistTimeZH', label: '持续时长', width: 110 },
        { prop: 'eventStatus', label: '事件状态', filter: 'eventStatus' },
        { prop: 'hasManual', label: '人工处理', formatter: (row)=> row.isOnline?'上线':'下线' },
        { prop: 'eventDesc', label: '事件描述' },
    ],
    headBtns: [
        {
            icon: 'daochu',
            name: '导出',
            click: (row) => {
                // let lists = contentMainRef.getAllCheck()
                // let ids = proxy.$_.map(lists, 'operatorId')
                // let txt = ids.length > 0 ? `请确定导出选中的${ids.length}条数据吗？` : `请确定导出全部数据`
                let txt = `请确定导出全部数据`
                // debugger
                proxy.MessageBox({ msg: txt, type: 'warning' }).then((close) => {
                    // exportVehicleStateSnapShoot({...mainData.formData, ...{ ids: ids },}).then((res) => {
                    exportAlarmDetail(mainData.formData).then((res) => {
                        window.open(res.fileUrl)
                        close()
                    }).catch(() => {
                        close()
                    })
                })
            },
        },
    ],
    tableBtns: {
        prop: 'btns',
        label: '操作',
        fixed: 'right',
        width: 60,
        btns: [
            {
                icon: 'xiangqing',
                name: '照片详情',
                click: (row) => {
                    dialogRef.show(row)
                },
            },
        ],
    },
    formData: {
        "beginDate": proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
        "endDate": proxy.$dayjs().format('YYYY-MM-DD 23:59:59'),
        "alarmLevelList": [],
        "alarmTypeCodeList": [],
        "eventPersistSeconds": "",
        "eventStatusList": [],
        "hasManual": '',
        "nodeDto": {},
        "operateTypeIdList": [],
        "operatorId": '',
        "order": "",
        "orderField": "",
        "vehicleCode": "",
        "pageNumber": 1,
        "pageSize": 25,
    },
    lists: [
        { key: 'nodeDto', label: '组织结构', placeholder: '请选择组织结构', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: { "hasDataPermission": true, needVehicle: false, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode', disabled: 'nocheck'}, permissionIds:[], isNodeType: true  },
        {label: '运营商', key: 'operateTypeId', type: 'select', remote: true, url: '/business/operatorEntity/listAssociateOperator', method: 'get', params: {}, props: { label: 'name', value: 'id' }, placeholder: '请选择运营商',},
        {label: '营运类型', key: 'operateTypeIdList', width: 170, type: 'allSelect', remote: true, url: '/system/vehicleOperateType/getTreeIdList', method: 'get', loadMore: true, placeholder: '请选择营运类型',},
        {label: '报警类型', key: 'alarmTypeCodeList', type: 'allSelect', filter: 'alarmModeTypes', placeholder: '请选择报警类型', width: 760,},
        {label: '报警级别', key: 'alarmLevelList', type: 'allSelect', filter: 'eventAlarmTypes', placeholder: '请选择报警级别', returnObjectInArray: true, /* 返回数组里面的每一项是否是对象 */ returnObjectKeys: ['alarmLevel', 'alarmSubLevel'], /* [0]是大类值字段，[1]是子类值字段 */},
        {label: '车牌号', key: 'vehicleCode', type: 'select', remote: true, url: '/business/vehicle/associationPlateNum', method: 'post', loadMore: true, params: {pageNumber: 1, pageSize: 25, valid: 1, havePermission: true,}, props: { label: 'plateNum', value: 'vehicleCode' }, placeholder: '请选择车牌号码',},
        {label: '时间范围', key: ['beginDate', 'endDate'], type: 'esDate', col: 12, data: { type: 'datetime', valueFormat: 'YYYY-MM-DD HH:mm:ss' } },
        {label: '人工处理', key: 'hasManual', type: 'select', placeholder: '请选择人工处理', children: [{ label: '已处理', value: 1 }, { label: '未处理', value: 2 },]},
        { prop: 'eventPersistSeconds', label: '持续时长' },
    ],
})

const getTable = () => {
    contentMainRef.getTable()
}
</script>

<style scoped lang="scss">
</style>
