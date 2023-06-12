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
import {exportVehicleList, exportDataQualifiedLocationDetail} from "@/api/statisticalStatement/fiveFactorAnalysis/dataAcceptanceRate";


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
    tableUrl: '/statistics/fiveRateReport/queryVehicleList',
    formData: {},
    headBtns: [{ icon: 'add', name: '导出', click: (row) => {
            proxy.MessageBox({msg: `请确定导出全部数据`, type: 'warning'}).then((close) => {
                if(mainData.formData.type == 'DataQualified') {
                    exportVehicleList({...mainData.formData}).then((res) => {
                        window.open(res.fileUrl)
                        close()
                    }).catch(() => {
                        close()
                    })
                }else{
                    exportDataQualifiedLocationDetail({...mainData.formData}).then((res)=>{
                        window.open(res.fileUrl)
                        close()
                    }).catch(()=>{
                        close()
                    })
                }
                
            })
        } }],
    columns: [],
    //
})
let drawerFlag = $ref(false)
const viewData = (row) => {
    mainData.formData = proxy.$_.cloneDeep(statusObj)
    mainData.formData = { ...mainData.formData, ...row}
    if(row.type == 'DataQualified'){
        mainData.tableUrl = '/statistics/fiveRateReport/queryVehicleList'
        mainData.columns = [
            { prop: 'companyName', label: '企业名称', sortable: true },
            { prop: 'plateNum', label: '车牌号码', sortable: true },
            { prop: 'plateColorName', label: '车牌颜色' },
            { prop: 'vehicleOperateTypeName', label: '营运类型' },
            { prop: 'operatorName', label: '运营商' },
            { prop: 'vehicleTypeName', label: '车辆类型' },
        ]
    } else {
        mainData.tableUrl = '/statistics/fiveRateReport/queryDataQualifiedLocationDetail'
        mainData.columns = [
            { prop: 'companyName', label: '企业名称', sortable: true },
            { prop: 'plateNum', label: '车牌号码', sortable: true },
            { prop: 'plateColorCodeName', label: '车牌颜色' },
            { prop: 'vehicleStatusDesc', label: '车辆状态' },
            { prop: 'alarmStatusName', label: '报警状态' },
            { prop: 'receiveTimeString', label: '接收时间' },
            { prop: 'gspTimeString', label: '卫星时间' },
            { prop: 'runningSpeed', label: '当前速度', color: '#FF0000' },
            { prop: 'limitedSpeed', label: '限速值', color: '#FF0000' },
            { prop: 'picGroupName', label: '位置' },
            { prop: 'strValid', label: '是否有效' },
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
