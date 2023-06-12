<template>
    <div>
        <tw-dialog :title="title" v-model="drawerFlag">
            <!--            :botHeight="mainData.botHeight" :tableIndex="mainData.tableIndex"-->
            <TwTable
                class="p0"
                v-if="drawerFlag"
                ref="mainTable"
                :url="mainData.tableUrl"
                :tableParams="mainData.formData"
                id="carUpOnlineSituationStatisticsDateils"
                :botHeight="100"
                :tableIndex="1"
                :columns="mainData.columns"
                :headBtns="mainData.headBtns"
            ></TwTable>
        </tw-dialog>
    </div>
</template>

<script setup lang="tsx">
import { getCurrentInstance, reactive } from 'vue'
import {exportVehicleList, exportLocationDriftDetail} from "@/api/statisticalStatement/fiveFactorAnalysis/trajectoryIntegrityRate";


let {proxy} = getCurrentInstance()
let mainTable = $ref(null)
defineProps({
    title: String,
})

let statusObj = {
    "areaId": '',
    "areaLevel": '',
    "areaName": "",
    "beginDate": "",
    "endDate": "",
    "operateTypeList": [],
    "operateTypeName": "",
    "operatorId": '',
    "operatorName": "",
    "parentId": '',
    "plateNum": "",
    "type": "",
    "vehicleCode": "",
    "vehicleId": '',
    pageNumber: 1,
    pageSize: 25,
}
let mainData = reactive({
    tableUrl: '/statistics/fiveRateReport/queryLocationDriftDetail',
    formData: {},
    headBtns: [{ icon: 'add', name: '导出', click: (row) => {
            proxy.MessageBox({msg: `请确定导出全部数据`, type: 'warning'}).then((close) => {
                if(mainData.formData.status == 1){
                    exportVehicleList({...mainData.formData}).then((res)=>{
                        window.open(res.fileUrl)
                        close()
                    }).catch(()=>{
                        close()
                    })
                }else {
                    exportLocationDriftDetail({...mainData.formData}).then((res)=>{
                        window.open(res.fileUrl)
                        close()
                    }).catch(()=>{
                        close()
                    })
                }
            })
        } }],
    columns: [
        { prop: 'companyName', label: '企业名称', sortable: true },
        { prop: 'plateNum', label: '车牌号码', sortable: true },
        { prop: 'plateColorName', label: '车牌颜色' },
        { prop: 'operatorName', label: '运营商' },
        { prop: 'vehicleOperateTypeName', label: '营运类型' },
        { prop: 'eventStartTimeStr', label: '开始时间', color: '#FF0000' },
        { prop: 'eventEndTimeStr', label: '结束时间', color: '#FF0000' },
        { prop: 'endLocation', label: '结束时位置' },
        { prop: 'eventPersistSeconds', label: '持续时长' },
        { prop: 'violationDistance', label: '里程' },
    ],
    //
})
let drawerFlag = $ref(false)
const viewData = (row) => {
    mainData.formData = proxy.$_.cloneDeep(statusObj)
    mainData.formData = { ...mainData.formData, ...row}
    mainData.tableUrl = row.url
    if(mainData.formData.status == 1){
        mainData.columns = [
            { prop: 'companyName', label: '企业名称', sortable: true },
            { prop: 'plateNum', label: '车牌号码', sortable: true },
            { prop: 'plateColorName', label: '车牌颜色' },
            { prop: 'operatorName', label: '运营商' },
            { prop: 'vehicleOperateTypeName', label: '营运类型' },
            { prop: 'eventStartTimeStr', label: '开始时间', color: '#FF0000' },
            { prop: 'eventEndTimeStr', label: '结束时间', color: '#FF0000' },
            { prop: 'endLocation', label: '结束时位置' },
            { prop: 'eventPersistSeconds', label: '持续时长' },
            { prop: 'violationDistance', label: '里程' },
        ]
    } else {
        mainData.columns = [
            { prop: 'companyName', label: '企业名称', sortable: true },
            { prop: 'plateNum', label: '车牌号码', sortable: true },
            { prop: 'plateColorName', label: '车牌颜色' },
            { prop: 'vehicleOperateTypeName', label: '营运类型' },
            { prop: 'vehicleTypeName', label: '车辆类型' },
            { prop: 'onlineState', label: '状态' },
        ]
    }
    drawerFlag = true
}

defineExpose({ viewData })

const handleClose = () => {
    // dataLists = []
}
</script>

<style scoped lang="scss">
</style>
