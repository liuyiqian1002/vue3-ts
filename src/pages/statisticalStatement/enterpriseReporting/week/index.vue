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
                                    <h2 class="title">{{ title }}</h2>
                                    <table border="1" class="daily-content">
                                        <tr>
                                            <th colspan="11" class="subtitle" style="text-align: left">
                                                企业 : <span id="report_companyName">{{mainData.data.companyName || '-'}}</span>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th rowspan="2" colspan="2" style="width: 32%">{{ $store.getters.productCode == 'HAINAN'?'监测情况':'本周监控情况' }}</th>
                                            <th rowspan="2" colspan="1" style="width: 12%">本周情况统计</th>
                                            <th colspan="7"><span id="beginTime"></span>{{mainData.data.beginTime || '-'}} - {{mainData.data.endTime || '-'}}<span id="endTime"></span>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th style="width: 7%" v-for="i in 7" :key="i">{{mainData.data?.dateList?.[i-1]}}</th>
                                        </tr>
                                        <tr>
                                            <td rowspan="5">车辆入网情况</td>
                                            <td>期初车辆数</td>
                                            <td v-for="i in 8" :key="i">{{mainData.data?.vehicleWeekDto?.weekBegin[i-1] || '-'}}</td>
                                        </tr>
                                        <tr>
                                            <td>新增车辆数</td>
                                            <td v-for="i in 8" :key="i">{{mainData.data?.vehicleWeekDto?.newAdd[i-1] || '-'}}</td>
                                        </tr>
                                        <tr>
                                            <td>销户车辆数</td>
                                            <td v-for="i in 8" :key="i">{{mainData.data?.vehicleStateChangeDto?.logOutVehicleList[i-1] || '-'}}</td>
                                        </tr>
                                        <tr>
                                            <td>期末车辆数</td>
                                            <td v-for="i in 8" :key="i">{{mainData.data?.vehicleWeekDto?.weekEnd[i-1] || '-'}}</td>
                                        </tr>
                                        <tr>
                                            <td>报停车辆数</td>
                                            <td v-for="i in 8" :key="i">{{mainData.data?.vehicleStateChangeDto?.stopOperateVehicleList[i-1] || '-'}}</td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">车辆上线率情况</td>
                                            <td>未上线车辆数</td>
                                            <td>{{mainData.data?.notOnLine || '-'}}</td>
                                            <td v-for="i in 7" :key="i">{{mainData.data?.statisticsWeekDto?.notOnLineList[i-1] || '-'}}</td>
                                        </tr>
                                        <tr>
                                            <td>上线率合计</td>
                                            <td>{{mainData.data?.onLineRate || '-'}}</td>
                                            <td v-for="i in 7" :key="i">{{mainData.data?.statisticsWeekDto?.onLineRateList[i-1] || '-'}}</td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">超速报警情况</td>
                                            <td>超速报警车台数</td>
                                            <td v-for="i in 8" :key="i">{{mainData.data?.alarmEventWeekDto?.Count01[i-1] || '-'}}</td>
                                        </tr>
                                        <tr>
                                            <td>超速报警总次数</td>
                                            <td v-for="i in 8" :key="i">{{mainData.data?.alarmEventWeekDto?.Sum01[i-1] || '-'}}</td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">疲劳驾驶情况</td>
                                            <td>疲劳驾驶车台数</td>
                                            <td v-for="i in 8" :key="i">{{mainData.data?.alarmEventWeekDto?.Count02[i-1] || '-'}}</td>
                                        </tr>
                                        <tr>
                                            <td>疲劳驾驶总次数</td>
                                            <td v-for="i in 8" :key="i">{{mainData.data?.alarmEventWeekDto?.Sum02[i-1] || '-'}}</td>
                                        </tr>
                                        <tr id="driver_ban_1">
                                            <td rowspan="2">凌晨2点到5点运行情况</td>
                                            <td>凌晨2点到5点运行车台数</td>
                                            <td v-for="i in 8" :key="i">{{mainData.data?.alarmEventWeekDto?.Count03[i-1] || '-'}}</td>
                                        </tr>
                                        <tr id="driver_ban_2">
                                            <td>凌晨2点到5点运行总次数</td>
                                            <td v-for="i in 8" :key="i">{{mainData.data?.alarmEventWeekDto?.Sum03[i-1] || '-'}}</td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">设备异常情况</td>
                                            <td>设备异常台数</td>
                                            <td v-for="i in 8" :key="i">{{mainData.data?.alarmEventWeekDto?.Count06[i-1] || '-'}}</td>
                                        </tr>
                                        <tr>
                                            <td>设备异常次数</td>
                                            <td v-for="i in 8" :key="i">{{mainData.data?.alarmEventWeekDto?.Count06[i-1] || '-'}}</td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">司机违规情况</td>
                                            <td>司机违规台数</td>
                                            <td v-for="i in 8" :key="i">{{mainData.data?.alarmEventWeekDto?.Count07[i-1] || '-'}}</td>
                                        </tr>
                                        <tr>
                                            <td>司机违规次数</td>
                                            <td v-for="i in 8" :key="i">{{mainData.data?.alarmEventWeekDto?.Sum07[i-1] || '-'}}</td>
                                        </tr>
                                        <tr v-show="isXXPT">
                                            <td rowspan="2">智能设备情况</td>
                                            <td>智能设备台数</td>
                                            <template v-if="mainData.data?.alarmEventWeekDto?.Count100.length> 0">
                                                <td v-for="i in 8" :key="i">{{mainData.data?.alarmEventWeekDto?.Count100[i-1] || '-'}}</td>
                                            </template>
                                            <template v-else>
                                                <td v-for="i in 8" :key="i">0</td>
                                            </template>
                                        </tr>
                                        <tr v-show="isXXPT">
                                            <td>智能设备次数</td>
                                            <template v-if="mainData.data?.alarmEventWeekDto?.Sum100.length> 0">
                                                <td v-for="i in 8" :key="i">{{mainData.data?.alarmEventWeekDto?.Sum100[i-1] || '-'}}</td>
                                            </template>
                                            <template v-else>
                                                <td v-for="i in 8" :key="i">0</td>
                                            </template>
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
    weekReportExport, getReportConfigParamByKey,
} from '../../../../api/statisticalStatement/enterpriseReporting/week/index'
import {commonApi} from "@/api/common";

let {proxy} = getCurrentInstance()
let loading = $ref(false)
let title = $ref('第三方监控周报表')
let isGX = $ref(false)
let isXXPT = $ref(false)
isGX = proxy.$store.getters.productCode == 'GX'
isXXPT = proxy.$store.getters.productCode == 'XXPT'
const nullDisplayStyle = '-'
let mainData = reactive({
    data: {},
    formData: {
        "beginTime": proxy.$dayjs().startOf('week').subtract(6, 'day').format('YYYY-MM-DD'),
        "endTime": proxy.$dayjs().endOf('week').subtract(6, 'day').format('YYYY-MM-DD'),
        "monthDate": "",
        "nodeDtoList": [],
        "reportConfigId": ''
    },
    // formData: {
    //     "beginTime": "2022-04-01 00:00:00",
    //     "endTime": "2022-04-01 23:59:59",
    //     "nodeDtoList": [
    //         {
    //             "orgId": 1042,
    //             "permissionCode": "P000001.C000001.D000001.YYLX000002.QY000000444",
    //             "orgName": "武汉市宏干线公路客运有限公司",
    //             "orgCode": "QY000000444",
    //             "parentName": null,
    //             "parentCode": "P000001.C000001.D000001.YYLX000002",
    //             "orgType": 4,
    //             "parent": true,
    //             "nocheck": false,
    //             "vehicle": false
    //         }
    //     ],
    //     "reportConfigId": 49
    // },
    lists: [
        {label: '组织结构', key: 'nodeDtoList', showCheckbox: true, placeholder: '请选择组织结构', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: {hasDataPermission: true, needVehicle: true, searchType: 1, keyword: '',}, parKeys: [{ key: 'parentCode', val: 'permissionCode' }], props: {label: 'orgName', value: 'permissionCode', disabled: 'nocheck',}, permissionIds: [], selectTypes: [4, 5, null] },
        {label: ' 时间范围', key: ['beginTime', 'endTime'], type: 'esDate', col: 12, data: { valueFormat: 'YYYY-MM-DD' },endDisabledDate:(val)=> proxy.$dayjs(val).add(1, 'day').isSameOrAfter(proxy.$dayjs()),disabledDate:(val)=> proxy.$dayjs(val).add(1, 'day').isSameOrAfter(proxy.$dayjs()) },
        { key: 'reportConfigId',label: '报表配置',type:'select', remote: false, url: '/statistics/report/reportConfigList', method: 'post', clearable: false, params: {reportType: 102}, props:{ label: 'reportConfigName', value:'reportConfigId'}, placeholder: '请选择报表配置', loadData: (lists)=> mainData.formData.reportConfigId = lists[0].reportConfigId},
    ],
})

const resetForm = () => {
    mainData.formData.reportConfigId =  mainData.lists[2].children[0].reportConfigId
}

const setTableDataHeight = computed(() => {
    return window.innerHeight - 250
})

const getTable = () => {
    if (!loading)
        loading = true
    commonApi( '/statistics/companyReport/weekReport', mainData.formData).then(res => {
        loading = false
        mainData.data = res
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
        weekReportExport(mainData.formData).then(res=>{
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
