<template>
    <div class="table-box">
        <tw-form v-if="mainData.lists" :lists="mainData.lists || []" :formData="mainData.formData" :labelWidth="mainData.labelWidth" :isFormBnts="mainData.isFormBnts" :extraField="mainData.extraField" @submitForm="getTable" :foldNumber="mainData.foldNumber || 4"></tw-form>
    
        <TwTable ref="tableRef" :id="mainData.id" :url="mainData.tableUrl" :tableParams="mainData.formData" :isCheck="mainData.isCheck" :showIndex="mainData.showIndex" :showPagination="mainData.showPagination" :border="mainData.border" :botHeight="mainData.botHeight || 50" :tableIndex="mainData.tableIndex" :size="mainData.size" :columns="mainData.columns" :tableData="mainData.tableData" :tableBtns="mainData.tableBtns" :headBtns="mainData.headBtns" :tabindex="mainData.tabIndex || 0" :isLoadStatus="mainData.isLoadStatus">
        </TwTable>
<!--        <content-main ref="contentMainRef" :mainData="mainData"></content-main>-->
<!--        <content-main ref="contentMainRefBot" :mainData="mainDataBot"></content-main>-->
        <TwTable ref="tableRefBot" :id="mainDataBot.id" :url="mainDataBot.tableUrl" :tableParams="mainData.formData" :isCheck="mainDataBot.isCheck" :showIndex="mainDataBot.showIndex" :showPagination="mainDataBot.showPagination" :border="mainDataBot.border" :botHeight="mainDataBot.botHeight || 50" :tableIndex="mainDataBot.tableIndex" :size="mainDataBot.size" :columns="mainDataBot.columns" :tableData="mainDataBot.tableData" :tableBtns="mainDataBot.tableBtns" :headBtns="mainDataBot.headBtns" :tabindex="mainDataBot.tabIndex || 0" :isLoadStatus="mainDataBot.isLoadStatus">
        </TwTable>
        <!--  查看不在线车辆明细  -->
        <viewData ref="viewDataRef" :title="title"></viewData>
    </div>
</template>


<script setup lang="tsx">
import viewData from "./components/viewData/index.vue"
import { exportDriftStatistics, exportDriftStatisticsList} from '../../../../api/statisticalStatement/fiveFactorAnalysis/satellitePositioningDriftRate/index'

let {proxy} = getCurrentInstance()
let title = $ref('')
let viewDataRef = $ref(null)
let tableRef = $ref(null)
let tableRefBot = $ref(null)
let mainData = reactive({
    tableUrl: '/statistics/fiveRateReport/queryDriftStatistics',
    showPagination: false,
    isLoadStatus: true,
    botHeight: 650,
    columns: [
        { prop: 'areaName', label: '所属区域' },
        { prop: 'companyName', label: '企业名称' },
        { prop: 'operateTypeName', label: '营运类型' },
        { prop: 'operatorName', label: '运营商', width: 120 },
        { prop: 'onlineVehicleTotal', label: '上线车辆总数' },
        { prop: 'driftVehicleTotal', label: '定位漂移车辆数', formatter: (row)=> (<el-link onClick={()=>{
                title = '定位漂移车辆数明细'
                let rowObj = proxy.$_.cloneDeep(row), formData = proxy.$_.cloneDeep(mainData.formData)
                viewDataRef.viewData({...rowObj, ...formData, ...{type: 'Drift',url: '/statistics/fiveRateReport/queryVehicleList'}})
            }} type="primary">{row.driftVehicleTotal}</el-link>)   },
        { prop: 'alarmEventCount', label: '定位漂移轨迹数', formatter: (row)=> (<el-link onClick={()=>{
                title = '定位漂移轨迹数明细'
                let rowObj = proxy.$_.cloneDeep(row), formData = proxy.$_.cloneDeep(mainData.formData)
                viewDataRef.viewData({...rowObj, ...formData, ...{type: 'Drift', url: '/statistics/fiveRateReport/queryLocationDriftDetail', status: 1}})
            }} type="primary">{row.alarmEventCount}</el-link>) },
        { prop: 'driftRate', label: '定位漂移率' },
        { prop: 'rank', label: '排名', renderHeader: (row)=> (<div>排名
                <el-tooltip
                    className="box-item"
                    effect="dark"
                    content="同级别的排名"
                    placement="bottom-start"
                >
                    <el-icon><InfoFilled /></el-icon>
                </el-tooltip>  </div>) },
    ],
    headBtns: [
        {
            icon: 'daochu',
            name: '导出',
            click: (row) => {
                let txt = `请确定导出全部数据`
                proxy.MessageBox({ msg: txt, type: 'warning' }).then((close) => {
                    exportDriftStatistics(mainData.formData).then((res) => {
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
        "beginDate": proxy.$dayjs().subtract(1, 'month').subtract(1, 'day').format('YYYY-MM-DD'),
        "endDate": proxy.$dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
        "nodeDto": {},
        "nodeDtoList": [],
        "operateTypeList": [],
        "operatorCodeList": [],
        "operatorId": '',
        "operatorName": "",
        "order": "",
        "orderField": "",
        // "vehicleCode": "",
        "pageNumber": 1,
        "pageSize": 25,
    },
    lists: [
        {label: '组织结构', key: 'nodeDto', placeholder: '请选择组织结构', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: {hasDataPermission: true, needVehicle: false, searchType: 1, keyword: '',}, parKeys: [{ key: 'parentCode', val: 'permissionCode' }], props: {label: 'orgName', value: 'permissionCode', disabled: 'nocheck',}, permissionIds: [], isNodeType: true, disabledSelectLevel: 4},
        {label: '运营商', key: 'operatorId', type: 'select', remote: true, url: '/business/operatorEntity/listAssociateOperator', method: 'get', params: { havePermission: true }, props: { label: 'name', value: 'id' }, placeholder: '请选择运营商名称',},
        {label: '营运类型', key: 'operateTypeList', type: 'allSelect', width: 170, remote: true, url: '/system/vehicleOperateType/getTreeIdList', method: 'get', loadMore: true, placeholder: '请选择营运类型',},
        {label: '车牌号', key: 'vehicleCode', type: 'select', remote: true, url: '/business/vehicle/associationPlateNum', method: 'post', loadMore: true, params: {pageNumber: 1, pageSize: 25, valid: 1, havePermission: true,}, props: { label: 'plateNum', value: 'vehicleCode' }, placeholder: '请选择车牌号码',},
        { label: '时间范围', key: ['beginDate', 'endDate'], type: 'esDate', placeholder: '选择时间', data: { valueFormat: 'YYYY-MM-DD' }, col: 12, },
    ],
})
let mainDataBot = reactive({
    tableUrl: '/statistics/fiveRateReport/queryDriftStatisticsList',
    isLoadStatus: true,
    botHeight: 240,
    columns: [
        { prop: 'areaName', label: '所属区域' },
        { prop: 'companyName', label: '企业名称' },
        { prop: 'operateTypeName', label: '营运类型' },
        { prop: 'operatorName', label: '运营商', width: 120 },
        { prop: 'onlineVehicleTotal', label: '上线车辆总数' },
        { prop: 'driftVehicleTotal', label: '定位漂移车辆数', formatter: (row)=> (<el-link onClick={()=>{
                title = '定位漂移车辆数明细'
                let rowObj = proxy.$_.cloneDeep(row), formData = proxy.$_.cloneDeep(mainData.formData)
                viewDataRef.viewData({...rowObj, ...formData, ...{type: 'Drift',url: '/statistics/fiveRateReport/queryVehicleList'}})
            }} type="primary">{row.driftVehicleTotal}</el-link>)  },
        { prop: 'alarmEventCount', label: '定位漂移轨迹数', formatter: (row)=> (<el-link onClick={()=>{
                title = '定位漂移轨迹数明细'
                let rowObj = proxy.$_.cloneDeep(row), formData = proxy.$_.cloneDeep(mainData.formData)
                viewDataRef.viewData({...rowObj, ...formData, ...{type: 'Drift', url: '/statistics/fiveRateReport/queryLocationDriftDetail', status: 1}})
            }} type="primary">{row.alarmEventCount}</el-link>) },
        { prop: 'driftRate', label: '定位漂移率', sortable: true },
        { prop: 'rank', label: '排名', sortable: true },
    ],
    headBtns: [
        {
            icon: 'daochu',
            name: '导出',
            click: (row) => {
                let txt = `请确定导出全部数据`
                proxy.MessageBox({ msg: txt, type: 'warning' }).then((close) => {
                    exportDriftStatisticsList(mainData.formData).then((res) => {
                        window.open(res.fileUrl)
                        close()
                    }).catch(() => {
                        close()
                    })
                })
            },
        },
    ],
})

const getTable = () => {
    tableRef.getTable()
    tableRefBot.getTable()
}



</script>

<style scoped lang="scss">
@import url("@/styles/exampleReport.scss");

</style>
