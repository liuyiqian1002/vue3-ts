<template>
    <div>
        <tw-descriptions ref="fromDataRef" :column="3" :labelWidth="120"
                         :lists="mainData.descriptionsLists"
                         :data="data"></tw-descriptions>
        <tw-table
            ref="tableRef"
            method="post"
            url="/business/driver/page"
            :tableParams="{vehicleCode: vehicleCode, pageNumber: 1, pageSize: 20}"
            :botHeight="200"
            :columns="mainData.columns"
            :tableBtns="mainData.tableBtns"
            :headBtns="mainData.headBtns"
        ></tw-table>
        <!--    编辑    -->
        <edit ref="drawerRef" :title="title" @getTable="getTable" :vehicleCode="vehicleCode"></edit>
    </div>
</template>

<script setup lang="ts">

import edit from "./components/edit/index.vue"

import {updateVehicleValid} from "@/api/operation/cars/car";

defineProps({
    title: String,
    lists: { type: Array, default: ()=> []},
    data: Object,
    vehicleCode: String
})
let { proxy } = getCurrentInstance()
let title = $ref('')
let drawerRef = $ref(null)
let mainData = reactive({
    descriptionsLists: [
        { key: 'createTime', label: '企业负责人姓名：', col: 8 },
        { key: 'messageId', label: '企业负责人电话：', col: 8 },
    ],
    headBtns: [{ icon: 'add', name: '新增', click: (row) => {
            title = `添加`
            drawerRef.setFormData()
        } }],
    columns: [
        { prop: 'roleName', label: '角色' },
        { prop: 'driverName', label: '姓名' },
        { prop: 'mobilePhone', label: '联系电话' },
        // { prop: 'plateNum', label: '来源', width: 120 },
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 80, btns:[
            {icon: 'bianji', name: '编辑', click: (row)=> {
                    title = `编辑`
                    drawerRef.setFormData(row)
                }},
            {icon: 'quguan', name: '取消关联', click: (row)=> {
                proxy.MessageBox({msg: `确定取消关联${row.driverName}吗？`, type: 'warning'}).then((close) => {
                    updateVehicleValid({relateId: row.relateId}).then(()=>{
                        getTable()
                        ElMessage.success('取消关联成功！')
                        close()
                    }).catch(()=>{
                        close()
                    })
                })
            }},
        ]},
    //
})
let tableRef = $ref(null)

const getTable = ()=>{
    tableRef.getTable()
}
</script>

<style scoped lang="scss">
</style>
