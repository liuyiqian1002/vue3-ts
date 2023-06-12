<template>
    <div>
        <tw-descriptions ref="fromDataRef" :column="3" :labelWidth="120"
                         :lists="mainData.descriptionsLists"
                         :data="data"></tw-descriptions>
        <tw-table
            method="post"
            class="pt0"
            url="/business/driver/page"
            :tableParams="{vehicleCode: vehicleCode, pageNumber: 1, pageSize: 20}"
            :botHeight="200"
            :columns="mainData.columns"
        ></tw-table>

    </div>
</template>

<script setup lang="ts">


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
    columns: [
        { prop: 'roleName', label: '角色' },
        { prop: 'driverName', label: '姓名' },
        { prop: 'mobilePhone', label: '联系电话' },
        // { prop: 'plateNum', label: '来源', width: 120 },
    ],
   
    //
})


</script>

<style scoped lang="scss">
</style>
