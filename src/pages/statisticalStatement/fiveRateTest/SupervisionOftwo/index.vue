<template>
    <div class="table-box">
<!--        <content-main ref="contentMainRef" :mainData="mainData"></content-main>-->
        <tw-form :lists="mainData.lists" :formData="mainData.formData" :labelWidth="mainData.labelWidth" :isFormBnts="mainData.isFormBnts" :extraField="mainData.extraField" @submitForm="getTable" :foldNumber="mainData.foldNumber || 4"></tw-form>
        <div class="p20">
            <div class="tw_cr mb10">
                <el-button @click="operatorReport">导出</el-button>
            </div>
            <el-table :loading="loading" :border="false" :data="tableData" :height="setTableDataHeight" style="width: 100%">
                <el-table-column align="center" prop="areaName" label="区所" />
                <el-table-column align="center" label="入网率">
                    <el-table-column align="center" prop="inNetSum" label="小计" />
                    <el-table-column align="center" prop="inNetPassenger" label="班线客车" />
                    <el-table-column align="center" prop="inNetTraver" label="旅游客车" />
                    <el-table-column align="center" prop="inNetDanger" label="危险品车" />
                </el-table-column>
                <el-table-column align="center" label="上线率">
                    <el-table-column align="center" prop="onLineSum" label="小计" />
                    <el-table-column align="center" prop="onLinePassenger" label="班线客车" />
                    <el-table-column align="center" prop="onLineTraver" label="旅游客车" />
                    <el-table-column align="center" prop="onLineDanger" label="危险品车" />
                </el-table-column>
                <el-table-column align="center" label="轨迹完整率">
                    <el-table-column align="center" prop="trackFullSum" label="小计" />
                    <el-table-column align="center" prop="trackFullPassenger" label="班线客车" />
                    <el-table-column align="center" prop="trackFullTraver" label="旅游客车" />
                    <el-table-column align="center" prop="trackFullDanger" label="危险品车" />
                </el-table-column>
                <el-table-column align="center" label="数据合格率">
                    <el-table-column align="center" prop="dataPassSum" label="小计" />
                    <el-table-column align="center" prop="dataPassPassenger" label="班线客车" />
                    <el-table-column align="center" prop="dataPassTraver" label="旅游客车" />
                    <el-table-column align="center" prop="dataPassDanger" label="危险品车" />
                </el-table-column>
            </el-table>
            <!--  分页  -->
<!--            <tw-pagination v-model:currentPage="mainData.formData.pageNumber"-->
<!--                           v-model:pageSize="mainData.formData.pageSize" :total="total"-->
<!--                           @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></tw-pagination>-->
        </div>
        
        
    </div>
</template>


<script setup lang="tsx">
import {
    exportMajorSuperviseReport,
} from '../../../../api/statisticalStatement/fiveRateTest/SupervisionOftwo/index'
import {commonApi} from "@/api/common";

let {proxy} = getCurrentInstance()
let contentMainRef = $ref(null)
let tableData = $ref([])
let total = $ref(0)
let loading = $ref(false)
let mainData = reactive({
    formData: {
        "beginDate": proxy.$dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        "endDate": proxy.$dayjs().format('YYYY-MM-DD'),
        "nodeDto": {},
        "operateTypeList": [],
        "operatorCodeList": [],
        "operatorId": '',
        "operatorName": "",
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25,
        "vehicleCode": ""
    },
    lists: [
        {label: '组织结构', key: 'nodeDto', placeholder: '请选择组织结构', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: {hasDataPermission: true, needVehicle: false, searchType: 1, keyword: '',}, parKeys: [{ key: 'parentCode', val: 'permissionCode' }], props: {label: 'orgName', value: 'permissionCode', disabled: 'nocheck',}, permissionIds: [], isNodeType: true},
        {label: ' 时间范围', key: ['beginDate', 'endDate'], type: 'esDate', col: 12, data: { valueFormat: 'YYYY-MM-DD' } },
    ],
})


const setTableDataHeight = computed(() => {
    return window.innerHeight - 234
})

const getTable = () => {
    if (!loading)
        loading = true
    commonApi('/statistics/fiveRateAssessReport/queryMajorSuperviseReport', mainData.formData).then(res => {
        loading = false
        total = res.total
        tableData = res.rows
    }).catch(() => {
        loading = false
    })
}

// getTable()

// const handleSizeChange = (val) => {
//
// }
//
// const handleCurrentChange = (val) => {
//
// }

const operatorReport = () => {
    // exportMajorOperatorReport()
    proxy.MessageBox({ msg: `请确定导出全部数据`, type: 'warning' }).then((close) => {
        // reportSendRecordExport({...mainData.formData, ...{ ids: ids },}).then((res) => {
        exportMajorSuperviseReport(mainData.formData).then(res=>{
            window.open(res.fileUrl)
            close()
        }).catch(() => {
            close()
        })
    })
    
}



</script>

<style scoped lang="scss">
</style>
