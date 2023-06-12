<template>
    <div class="table-box">
        <!--        <content-main ref="contentMainRef" :mainData="mainData"></content-main>-->
        <tw-form :lists="mainData.lists" :formData="mainData.formData" :labelWidth="mainData.labelWidth"
            :isFormBnts="mainData.isFormBnts" @submitForm="getTable"
            :foldNumber="mainData.foldNumber || 4"></tw-form>
        <div class="p20">
            <div class="tw_cr mb10">
                <el-button @click="operatorReport">导出</el-button>
            </div>
            <el-table :loading="loading" :border="false" :data="tableData" :height="setTableDataHeight" style="width: 100%">
                <el-table-column align="center" prop="operatorName" label="运营商" />
                <el-table-column align="center" prop="vehicleTotal" label="车辆数" />
                <el-table-column align="center" prop="onlineRate" label="上线率">
                    <!-- <el-table-column align="center" prop="onlineTotal" label="上线车辆数" />
                    <el-table-column align="center" prop="onlineRate" label="上线率" /> -->
                </el-table-column>
                <el-table-column align="center" prop="avgOnlineRate" label="平均在线率">
                    <!-- <el-table-column align="center" prop="avgOnlineTotal" label="平均在线车辆数" />
                    <el-table-column align="center" prop="avgOnlineRate" label="平均在线率" /> -->
                </el-table-column>
                <el-table-column align="center" prop="platformConnectRate" label="平均连通率" />
            </el-table>
        </div>


    </div>
</template>


<script setup lang="tsx">
import { computed } from "vue";
import { commonApi } from "@/api/common";
import { exportGeneralOperatorReport } from "@/api/statisticalStatement/fiveRateTest/operatorGeneralCargo";

let { proxy } = getCurrentInstance()
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
        { label: '组织结构', key: 'nodeDto', placeholder: '请选择组织结构', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: { hasDataPermission: true, needVehicle: false, searchType: 1, keyword: '', }, parKeys: [{ key: 'parentCode', val: 'permissionCode' }], props: { label: 'orgName', value: 'permissionCode', disabled: 'nocheck', }, permissionIds: [], isNodeType: true },
        { label: '运营商', key: 'operatorId', type: 'select', remote: true, url: '/business/operatorEntity/listAssociateOperator', method: 'get', params: { havePermission: true }, props: { label: 'name', value: 'id' }, placeholder: '请选择运营商名称', },
        { label: ' 时间范围', key: ['beginDate', 'endDate'], type: 'esDate', col: 12, data: { valueFormat: 'YYYY-MM-DD' } },
    ],
})


const setTableDataHeight = computed(() => {
    return window.innerHeight - 250
})

const getTable = () => {
    if (!loading)
        loading = true
    commonApi('/statistics/fiveRateAssessReport/queryGeneralOperatorReport', mainData.formData).then(res => {
        loading = false
        total = res.total
        tableData = res.rows
    }).catch(() => {
        loading = false
    })
}


const operatorReport = () => {
    // exportMajorOperatorReport()
    proxy.MessageBox({ msg: `请确定导出全部数据`, type: 'warning' }).then((close) => {
        exportGeneralOperatorReport(mainData.formData).then(res => {
            window.open(res.fileUrl)
            close()
        }).catch(() => {
            close()
        })
    })

}


</script>

<style scoped lang="scss"></style>
