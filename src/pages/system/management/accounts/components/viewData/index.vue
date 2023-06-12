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
                :showIndex="mainData.showIndex"
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
import {exportVehicle} from "@/api/system/management/account";


let {proxy} = getCurrentInstance()
let mainTable = $ref(null)
defineProps({
    title: String,
})

let statusObj = {
"营运中":"",
"待验证":"warning",
"注销":"danger",
"入网":"success",
"未审核":"warning",
"停运":"info",
}
let mainData = reactive({
    tableUrl: '/system/user/pageVehicle',
    formData: {
        order: '',
        orderField: '',
        pageNumber: 1,
        pageSize: 25,
        userId: 0,
    },
    headBtns: [{ icon: 'add', name: '导出', click: (row) => {
            proxy.MessageBox({msg: `请确定导出全部数据`, type: 'warning'}).then((close) => {
                exportVehicle({...mainData.formData}).then((res)=>{
                    window.open(res.fileUrl)
                    close()
                }).catch(()=>{
                    close()
                })
            })
        } }],
    columns: [
        { prop: 'provinceName', label: '省', width: 80 },
        { prop: 'cityName', label: '市', width: 80 },
        { prop: 'districtName', label: '区', width: 80 },
        { prop: 'companyName', label: '企业' },
        { prop: 'vehicleOperateTypeName', label: '营运类型', width: 120 },
        { prop: 'operatorName', label: '运营商', width: 200 },
        { prop: 'plateNum', label: '车牌号码', width: 120 },
        { prop: 'plateColorName', label: '车牌颜色', width: 100 },
        { prop: 'vehicleTypeName', label: '车辆类型', width: 120 },
        { prop: 'simNum', label: 'SIM卡', width: 130 },
        { prop: 'terminalTypeName', label: '终端名称', width: 120 },
        { prop: 'terminalModel', label: '终端类型', width: 140 },
        { prop: 'operateState', label: '营运状态', width: 120, formatter: (row)=> <tw-tag type={statusObj[row.operateState]}>{row.operateState}</tw-tag> },
    ],
    //
})
let drawerFlag = $ref(false)
const viewData = (row) => {
    mainData.formData = {
        order: row.order,
        orderField: row.orderField,
        pageNumber: 1,
        pageSize: 25,
        userId: row.userId,
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
