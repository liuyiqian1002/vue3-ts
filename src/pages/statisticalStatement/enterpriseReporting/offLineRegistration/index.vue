<template>
    <div>
<!--        <content-main ref="contentMainRef" :mainData="mainData"></content-main>-->
        <tw-form class="pt20" v-if="mainData.lists" :lists="mainData.lists || []" :formData="mainData.formData" :labelWidth="mainData.labelWidth" :isFormBnts="mainData.isFormBnts" :extraField="mainData.extraField" @submitForm="seekTable" :foldNumber="mainData.foldNumber || 4" @onFormflag="onFormflag"></tw-form>
    
        <el-descriptions :column="4" direction="vertical" class="p20">
            <el-descriptions-item label="总车辆数(辆)" align="center">{{ mainData.data.vehicleTotal }}</el-descriptions-item>
            <el-descriptions-item label="申请离线车辆数(辆)" align="center">
                <el-link @click="viewDataDetails" type="primary">{{mainData.data.vehicleOffline}}</el-link>
            </el-descriptions-item>
            <el-descriptions-item label="未申请离线车辆数(辆)" align="center">{{mainData.data.vehicleNotOffline}}</el-descriptions-item>
            <el-descriptions-item label="总申请单数(次)" align="center">
                {{mainData.data.recordTotal}}
            </el-descriptions-item>
        </el-descriptions>
        <!--    表格组件    -->
        <TwTable ref="mainTable" :id="mainData.id" :url="mainData.tableUrl" :tableParams="mainData.formData" :isCheck="mainData.isCheck" :showIndex="mainData.showIndex" :showPagination="mainData.showPagination" :border="mainData.border" :botHeight="mainData.botHeight || 50" :tableIndex="mainData.tableIndex" :size="mainData.size" :columns="mainData.columns" :tableData="mainData.tableData" :tableBtns="mainData.tableBtns" :headBtns="mainData.headBtns" :tabindex="mainData.tabIndex || 0" :isLoadStatus="mainData.isLoadStatus" @tableCallback="tableCallback">
        
        </TwTable>
        <!--  查看不在线车辆明细  -->
        <viewData ref="viewDataRef" title="违规照片"></viewData>
    </div>
</template>


<script setup lang="tsx">
import viewData from "./components/viewData/index.vue"
import {
    exportOfflineStatistics, getSafetyCheckVehicleStatistics,
} from '@/api/statisticalStatement/enterpriseReporting/offLineRegistration/index'
let mainTable = $ref(null)
let {proxy} = getCurrentInstance()
let viewDataRef = $ref(null)
let contentMainRef = $ref(null)
let mainData = reactive({
    data: {
        num: 30000554
    },
    tableUrl: '/statistics/companyReport/offlineStatistics',
    isCheck: false,
    columns: [
        { prop: 'registerEnterpriseName', label: '企业名称', width: 120 },
        { prop: 'vehicleOperateTypeName', label: '营运类型' },
        { prop: 'vehiclePlateNumber', label: '车牌号码' },
        { prop: 'plateNum', label: '离线开始时间' },
        { prop: 'registerTimeStr', label: '离线结束时间' },
        { prop: 'reason', label: '离线原因' },
        { prop: 'registerName', label: '提交人员' },
        { prop: 'registerPhone', label: '提交人员电话' },
        { prop: 'registerTime', label: '提交时间' },
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
                    exportOfflineStatistics(mainData.formData).then((res) => {
                        window.open(res.fileUrl)
                        close()
                    }).catch(() => {
                        close()
                    })
                })
            },
        },
    ],
    formData: {
        "beginTime": '',
        "endTime": '',
        "nodeDto": {},
        "order": "",
        "orderField": "",
        "registerName": "",
        "vehiclePlateNumber": "",
        "pageNumber": 1,
        "pageSize": 25,
    },
    lists: [
        { key: 'nodeDto', label: '组织结构', placeholder: '请选择组织结构', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: { "hasDataPermission": true, needVehicle: false, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode', disabled: 'nocheck'}, permissionIds:[], orgType: 4, disabledSelectLevel: 4 },
        {label: '提交人员', key: 'userName', type: 'select', remote: true, url: '/system/user/associationUser', method: 'post', loadMore: true, params: {pageNumber: 1, pageSize: 25, valid: 1, havePermission: true,}, props: { label: 'realName', value: 'realName' }, placeholder: '请选择抽查人员',},
        {label: '车牌号', key: 'vehicleCode', type: 'select', remote: true, url: '/business/vehicle/associationPlateNum', method: 'post', loadMore: true, params: {pageNumber: 1, pageSize: 25, valid: 1, havePermission: true,}, props: { label: 'plateNum', value: 'vehicleCode' }, placeholder: '请选择车牌号码',},
        {label: '时间范围', key: ['beginTime', 'endTime'], type: 'esDate', data: { valueFormat: 'YYYY-MM-DD HH:mm:ss' } },
    ],
})

const getData = () => {
    getSafetyCheckVehicleStatistics(mainData.formData).then(res=>{
        mainData.data = {...mainData.data, ...res}
    })
}

const tableCallback = (lists,res) => {
    mainData.data = res
}


const getTable = () => {
    contentMainRef.getTable()
}


const onFormflag = ()=>{
    setTimeout(()=>{
        mainTable.setTableDataHeight()
    },100)
}

const seekTable = ()=>{
    mainData.formData.pageNumber = 1
    mainTable.getTable()
}

const viewDataDetails = () => {
    viewDataRef.viewData(mainData.formData)
}

</script>

<style scoped lang="scss">
</style>
