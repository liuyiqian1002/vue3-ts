<template>
    <div class="table-box">
        <!--        <content-main ref="contentMainRef" :mainData="mainData"></content-main>-->
        <tw-form :lists="mainData.lists" :formData="mainData.formData" :labelWidth="mainData.labelWidth" :isFormBnts="mainData.isFormBnts" :extraField="mainData.extraField" @submitForm="getTable" :foldNumber="mainData.foldNumber || 4" @resetForm="resetForm"></tw-form>
        <el-scrollbar style="height: 100%;">
            <div class="wrapper w overflow pb30 wrapper-content animated fadeInRight activeWatch report-page">
                <div class="page-wrapper">
                    <div class="page-content example-report">
                        
                        <div class="report-content-detail table-wrapper">
                            <div class="table-wrapper1">
                                <div class="tw_cr mb10 pr30">
                                    <el-button class="mr20" @click="operatorReport">
                                        <template #icon>
                                            <svg-icon icon-class="daochu"></svg-icon>
                                        </template>
                                        导出
                                    </el-button>
                                </div>
                                <div class="table-bg" v-loading="loading">
                                    <h2 class="title">{{ title ||  mainData.setData.filter(tag=> tag.parameterKey == 'headerName')?.[0]?.parameterValue}}</h2>
                                    <table border="1" class="daily-content" id="table">
                                        <tr>
                                            <th colspan="10" class="text-left subtitle">填报单位：{{mainData.setData.filter(tag=> tag.parameterKey == 'areaName')?.[0]?.parameterValue}}</th>
                                            <th colspan="12" class="text-left subtitle">{{mainData.setData.filter(tag=> tag.parameterKey == 'transport')?.[0]?.parameterValue}}:<span
                                                id="report_districtName">{{mainData.orgName}}</span></th>
                                            <th colspan="5" class="text-left subtitle">填报时间:
                                                <span id="jkDate">{{mainData.date}}</span></th>
                                        </tr>
                                        <tr>
                                            <th rowspan="2" class="bg-yellow">序号</th>
                                            <th rowspan="2" class="bg-yellow">县(市、区)</th>
                                            <th rowspan="2" class="bg-yellow">监测车辆总数</th>
                                            <th rowspan="2" class="bg-yellow">违法违规车辆总数</th>
                                            <th rowspan="2" class="bg-yellow">违法违规车辆比例</th>
            
                                            <th colspan="2" class="bg-green">01(超速报警)</th>
                                            <th colspan="2" class="bg-green">02(疲劳驾驶)</th>
                                            <th colspan="2" class="bg-green">03(凌晨2-5点违规运行)</th>
                                            <th colspan="2" class="bg-green">04(终端异常)</th>
                                            <th colspan="2" class="bg-green">05(数据异常)</th>
                                            <th colspan="2" class="bg-green">06(超员超载)</th>
                                            <th colspan="2" class="bg-green">07(不按核定线路行驶、不按核定站点停靠)</th>
                                            <th colspan="2" class="bg-green">08(企业、车辆、线路证照过期)</th>
                                            <th colspan="2" class="bg-green">09(驾驶员其他违规行为)</th>
                                            <th colspan="2" class="bg-green">10(车辆其他违规行为)</th>
                                            <th colspan="2" class="bg-green">99(其他违法违规行为)</th>
                                        </tr>
                                        <tr>
                                            <th>违法违规总数</th>
                                            <th>违法违规率</th>
                                            <th>违法违规总数</th>
                                            <th>违法违规率</th>
                                            <th>违法违规总数</th>
                                            <th>违法违规率</th>
                                            <th>违法违规总数</th>
                                            <th>违法违规率</th>
                                            <th>违法违规总数</th>
                                            <th>违法违规率</th>
                                            <th>违法违规总数</th>
                                            <th>违法违规率</th>
                                            <th>违法违规总数</th>
                                            <th>违法违规率</th>
                                            <th>违法违规总数</th>
                                            <th>违法违规率</th>
                                            <th>违法违规总数</th>
                                            <th>违法违规率</th>
                                            <th>违法违规总数</th>
                                            <th>违法违规率</th>
                                            <th>违法违规总数</th>
                                            <th>违法违规率</th>
                                        </tr>
    
                                        <tr name="monthDistrictList" v-for="(item, i) in mainData.data.data" :key="i">
                                            <td>{{ i+1 }}</td>
                                            <td>{{item.areaName || '-'}}</td>
                                            <td>{{item.vehicleTotal || '-'}}</td>
                                            <td>{{item?.alarmVehicleTotal || '-'}}</td>
                                            <td>{{item?.alarmVehicleRate || '-'}}</td>
                                            <td>{{ item?.hbcode01?.totalquantitystr || '-' }}</td>
                                            <td>{{ item?.hbcode01?.rate || '-' }}</td>
                                            <td>{{ item?.hbcode02?.totalquantitystr || '-' }}</td>
                                            <td>{{ item?.hbcode02?.rate || '-' }}</td>
                                            <td>{{ item?.hbcode03?.totalquantitystr || '-' }}</td>
                                            <td>{{ item?.hbcode03?.rate || '-' }}</td>
                                            <td>{{ item?.hbcode04?.totalquantitystr || '-' }}</td>
                                            <td>{{ item?.hbcode04?.rate || '-' }}</td>
                                            <td>{{ item?.hbcode05?.totalquantitystr || '-' }}</td>
                                            <td>{{ item?.hbcode05?.rate || '-' }}</td>
                                            <td>{{ item?.hbcode06?.totalquantitystr || '-' }}</td>
                                            <td>{{ item?.hbcode06?.rate || '-' }}</td>
                                            <td>{{ item?.hbcode07?.totalquantitystr || '-' }}</td>
                                            <td>{{ item?.hbcode07?.rate || '-' }}</td>
                                            <td>{{ item?.hbcode08?.totalquantitystr || '-' }}</td>
                                            <td>{{ item?.hbcode08?.rate || '-' }}</td>
                                            <td>{{ item?.hbcode09?.totalquantitystr || '-' }}</td>
                                            <td>{{ item?.hbcode09?.rate || '-' }}</td>
                                            <td>{{ item?.hbcode10?.totalquantitystr || '-' }}</td>
                                            <td>{{ item?.hbcode10?.rate || '-' }}</td>
                                            <td>{{ item?.hbcode99?.totalquantitystr || '-' }}</td>
                                            <td>{{ item?.hbcode99?.rate || '-' }}</td>
                                        </tr>
                                    </table>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </el-scrollbar>
    
    
    </div>
</template>


<script setup lang="tsx">
import {
    monthReportExport, getReportConfigParamByKey,getReportConfig
} from '../../../../api/statisticalStatement/supervisoryStatement/month/index'
import {commonApi} from "@/api/common";

let {proxy} = getCurrentInstance()
let loading = $ref(false)
let title = $ref('')
let isGX = $ref(false)
let isXXPT = $ref(false)
isGX = proxy.$store.getters.productCode == 'GX'
isXXPT = proxy.$store.getters.productCode == 'XXPT'
let mainData = reactive({
    data: {},
    setData: [],
    orgName: '',
    date: '',
    formData: {
        "beginDay": "",
        "date": proxy.$dayjs().subtract(1, 'month').format('YYYY-MM'),
        "endDay": "",
        "node": {},
        "nodeId": '',
        "nodeName": "",
        "reportConfigId": '',
        "taskType": 90,
        "vehicleOperateTypeIdList": []
    },
    lists: [
        {label: '市名称', key: 'node', placeholder: '请选择组织结构', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: {hasDataPermission: true, needVehicle: false, searchType: 1, keyword: '',displayLevel: 2}, parKeys: [{ key: 'parentCode', val: 'permissionCode' }], props: {label: 'orgName', value: 'permissionCode', disabled: 'nocheck',}, permissionIds: [], selectTypes: [2], disabledTypes: [2], isNodeType: true},
        // {label: ' 时间范围', key: ['beginDay', 'endDay'], type: 'esDate', data: { valueFormat: 'YYYY-MM-DD' } },
        {label: ' 时间范围', key: 'date', type: 'date', data: { type: 'month', valueFormat: 'YYYY-MM' },disabledDate:(val)=> proxy.$dayjs(val).isSameOrAfter(proxy.$dayjs()) },
        {label: '营运类型', key: 'vehicleOperateTypeIdList', type: 'allSelect', width: 170, remote: true, url: '/system/vehicleOperateType/getTreeIdList', method: 'get', loadMore: true, placeholder: '请选择营运类型',},
        { key: 'reportConfigId',label: '报表配置',type:'select', remote: true, url: '/statistics/report/reportConfigList', method: 'post', params: {reportType: 203}, props:{ label: 'reportConfigName', value:'reportConfigId'}, clearable: false, placeholder: '请选择报表配置', loadData: (lists)=> {
                if(mainData.formData.reportConfigId == ''){
                    getReportConfig({"configId": lists[0].reportConfigId}).then(res=>{
                        mainData.setData = res
                    })
                }
                mainData.formData.reportConfigId = lists[0].reportConfigId
            }},
    ],
})

const resetForm = () => {
    mainData.formData.reportConfigId =  mainData.lists[3].children[0].reportConfigId
}

const setTableDataHeight = computed(() => {
    return window.innerHeight - 250
})

const getTable = () => {
    if (!loading)
        loading = true
    // mainData.formData.nodeName = mainData.formData.node.orgName
    // mainData.formData.nodeId = mainData.formData.node.permissionCode
    commonApi( '/statistics/superviseReport/monthReport', mainData.formData).then(res => {
        loading = false
        mainData.data = res
        console.log(mainData.formData);
        mainData.orgName = mainData.formData.node?.orgName
        mainData.date = mainData.formData.date
        getReportConfigParamByKey({"configId": mainData.formData.reportConfigId, "key": "headerName"}).then(res=>{
            title = res
        })
    }).catch(() => {
        loading = false
    })
    
    
}


const operatorReport = () => {
    // exportMajorOperatorReport()
    proxy.MessageBox({ msg: `请确定导出全部数据`, type: 'warning' }).then((close) => {
        monthReportExport(mainData.formData).then(res=>{
            ElMessage.success('导出成功')
            close()
        }).catch(() => {
            close()
        })
    })
    
}


</script>

<style scoped lang="scss">
@import url("@/styles/exampleReport.scss");

</style>
