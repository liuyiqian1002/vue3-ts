<template>
    <div>
        <tw-drawer title="信息" v-model="drawerFlag" :isBtns="false">
            <!--    表格组件    -->
            <TwTable ref="mainTable" :id="mainData.id" :url="mainData.tableUrl" :tableParams="mainData.formData" :isCheck="mainData.isCheck" :showIndex="mainData.showIndex" :showPagination="mainData.showPagination" :border="mainData.border" :botHeight="mainData.botHeight || 50" :tableIndex="mainData.tableIndex" :size="mainData.size" :columns="mainData.columns" :tableData="mainData.tableData" :tableBtns="mainData.tableBtns" :headBtns="mainData.headBtns" :tabindex="mainData.tabIndex || 0" :isLoadStatus="mainData.isLoadStatus">
    
            </TwTable>
        </tw-drawer>
    </div>
</template>

<script setup lang="tsx">

let {proxy} = getCurrentInstance()
let mainTable = $ref(null)
defineProps({
    title: String,
})

let mainData = reactive({
    tableUrl: '/statistics/companyReport/getOfflineVehicleStatistics',
    isCheck: false,
    id: 'offLineRegistration-details',
    botHeight: 80,
    columns: [
        { prop: 'plateNumber', label: '车牌号码', width: 120 },
        { prop: 'times', label: '次数' },
        { prop: 'lastTimeStr', label: '最后时间' },
    ],
    formData: { },
})
let drawerFlag = $ref(false)
const viewData = (row) => {
    mainData.formData = { ...mainData.formData, ...row}
    drawerFlag = true
}

defineExpose({ viewData })

const handleClose = () => {
    // dataLists = []
}
</script>

<style scoped lang="scss">
</style>
