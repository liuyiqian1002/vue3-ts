<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        <!--  查看不在线车辆明细  -->
        <viewData ref="viewDataRef" title="违规照片"></viewData>
    </div>
</template>


<script setup lang="tsx">
import viewData from "./components/viewData/index.vue"
import {
     exportVehicleStateSnapShoot,
} from '@/api/statisticalStatement/warningAnalysis/statusSpotCheck/index'
import {updateValid} from "@/api/operation/cars/car";
import {downloadFile} from "@/api/common";

let {proxy} = getCurrentInstance()
let viewDataRef = $ref(null)
let contentMainRef = $ref(null)
// isLoadStatus: true,
let mainData = reactive({
    tableUrl: '/statistics/alarmStatistics/vehicleStateSnapShoot',
    isCheck: true,
    columns: [
        { prop: 'spotCheckDateStr', label: '抽查日期' },
        { prop: 'spotCheckTimeStr', label: '抽查时间' },
        { prop: 'plateNum', label: '所属区域', width: 110, formatter: (row)=> row.provinceName+row.cityName+row.districtName },
        { prop: 'companyName', label: '企业名称', width: 120 },
        { prop: 'vehicleOperateTypeName', label: '营运类型' },
        { prop: 'plateNum', label: '车牌号码' },
        { prop: 'plateColorCodeName', label: '车牌颜色' },
        { prop: 'operatorName', label: '运营商' },
        { prop: 'terminalModel', label: '终端型号' },
        { prop: 'isOnline', label: '车辆状态', formatter: (row)=> row.isOnline?'在线':'离线' },
        { prop: 'isIllegal', label: '是否违规', formatter: (row)=> row.isIllegal?'是':'否' },
        { prop: 'createUserName', label: '抽查人员', width: 200 },
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
                    exportVehicleStateSnapShoot(mainData.formData).then((res) => {
                        // window.open(res.fileUrl)
                        downloadFile(res.fileId).then((data) => {
                            proxy.download(data, `车辆抽查明细_${mainData.formData.beginDate}至${mainData.formData.endDate}`)
                            // proxy.download(res, '监管报表', 'zip')
                            close()
                        }).catch(() => {
                            close()
                        })
                    }).catch(() => {
                        close()
                    })
                })
            },
        },
    ],
    tableBtns: {
        prop: 'btns',
        label: '照片',
        fixed: 'right',
        width: 100,
        btns: [
            {
                icon: 'xiangqing',
                name: '照片详情',
                formatter: (row)=> row.isIllegal,
                click: (row) => {
                    viewDataRef.viewData(row)
                },
            },
        ],
    },
    formData: {
        "beginDate": proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
        "endDate": proxy.$dayjs().format('YYYY-MM-DD 23:59:59'),
        "isIllegal": '',
        "isOnline": '',
        "nodeDtoList": [],
        vehicleOperateTypeCodeList: [],
        "operateTypeId": '',
        "order": "",
        "orderField": "",
        "userName": "",
        "vehicleCode": "",
        "pageNumber": 1,
        "pageSize": 25,
    },
    lists: [
        { key: 'nodeDtoList', label: '组织结构', showCheckbox: true, placeholder: '请选择组织结构', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: { "hasDataPermission": true, needVehicle: false, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode', disabled: 'nocheck'}, permissionIds:[] },
        // {label: '运营商', key: 'operateTypeId', type: 'select', remote: true, url: '/business/operatorEntity/listAssociateOperator', method: 'get', params: {}, props: { label: 'name', value: 'id' }, placeholder: '请选择运营商',},
        {label: '营运类型', key: 'operateTypeId', width: 170, type: 'select', remote: true, url: '/system/vehicleOperateType/getListByName', props:{ label: 'typeName', value:'typeId'}, method: 'get', loadMore: true, placeholder: '请选择营运类型',},
        {label: '车辆状态', key: 'isOnline', type:'select', children: [{label: '在线', value: true},{label: '离线', value: false}]},
        {label: '是否违规', key: 'isIllegal', type:'select', children: [{ label: '是', value: true }, { label: '否', value: false },]},
        {label: '时间范围', key: ['beginDate', 'endDate'], type: 'esDate', col: 12, data: { type: 'datetime', valueFormat: 'YYYY-MM-DD HH:mm:ss' } },
        {label: '车牌号', key: 'vehicleCode', type: 'select', remote: true, url: '/business/vehicle/associationPlateNum', method: 'post', loadMore: true, params: {pageNumber: 1, pageSize: 25, valid: 1, havePermission: true,}, props: { label: 'plateNum', value: 'vehicleCode' }, placeholder: '请选择车牌号码',},
        // {label: '抽查人员', key: 'userName', type: 'select', remote: true, url: '/system/user/associationUser', method: 'post', loadMore: true, params: {pageNumber: 1, pageSize: 25, valid: 1, havePermission: true,}, props: { label: 'realName', value: 'realName' }, placeholder: '请选择抽查人员',},
        {label: '抽查人员', key: 'userName'},
    ],
})

const getTable = () => {
    contentMainRef.getTable()
}
</script>

<style scoped lang="scss">
</style>
