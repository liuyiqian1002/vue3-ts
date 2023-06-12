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
                                    <table border="1" class="daily-content" id="table">
                                        <tr>
                                            <th colspan="5" class="title text-left subtitle blod">&nbsp;企业：<span id="report_companyName">{{mainData.data.companyName}}</span></th>
                                            <th :colspan="mainData.data.data.length === 5?2:mainData.data.data.length === 7?4:3" class="text-right subtitle blod" style="text-align: center">统计时间：<span id="reportDate" style="text-align: left">{{mainData.data.reportDate}}</span></th>
                                        </tr>
                                        <tr>
                                            <th rowspan="2" colspan="2" class="blod">本月监控情况</th>
                                            <th rowspan="2" class="blod">本月情况统计</th>
                                            <th class="blod" v-for="i in mainData.data.data.length-1" :key="i">{{ monthObj[month-1] }}月第{{ dateObj[i-1] }}周</th>
                                        </tr>
                                        <tr>
                                            <th class="blod" v-for="i in mainData.data.data.length-1" :key="i">{{ $dayjs(mainData.data.data[i]?.startDate).format('YYYY-MM-DD') || 'XXXX.X.X' }}-{{ $dayjs(mainData.data.data[i]?.endDate).format('YYYY-MM-DD') || 'XXXX.X.X' }}</th>
<!--                                            <th class="blod">XXXX.X.X-XXXX.X.X</th>-->
<!--                                            <th class="blod">XXXX.X.X-XXXX.X.X</th>-->
<!--                                            <th class="blod">XXXX.X.X-XXXX.X.X</th>-->
<!--                                            <th class="blod">XXXX.X.X-XXXX.X.X</th>-->
<!--                                            <th class="blod">XXXX.X.X-XXXX.X.X</th>-->
                                        </tr>
                                        <tr>
                                            <th rowspan="5" class="blod">车辆入网情况</th>
                                            <th class="blod">期初车辆数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.startVehicleCount || 0 }}</th>
                                        </tr>
                                        <tr>
                                            <th class="blod">新增车辆数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.newVehicleCount || 0 }}</th>
                                        </tr>
                                        <tr>
                                            <th class="blod">销户车辆数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.cancelVehicelCount || 0 }}</th>
                                        </tr>
                                        <tr>
                                            <th class="blod">期末车辆数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.endVehicleCount || 0 }}</th>
                                        </tr>
                                        <tr>
                                            <th class="blod">报停车辆数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.stopVehicleCount || 0 }}</th>
                                        </tr>
                                        <tr>
                                            <th class="blod" rowspan="2">车辆上线率情况</th>
                                            <th class="blod">未上线车辆数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.outlineVehicleCount || 0 }}</th>
                                        </tr>
                                        <tr>
                                            <th class="blod">上线率统计</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.onlineRate?`${(mainData.data.data[i-1]?.onlineRate * 100).toFixed(2)}`: 0 }}%</th>
                                        </tr>
                                        <tr>
                                            <th rowspan="2" class="blod">超速报警情况</th>
                                            <th class="blod">超速报警车台数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.alarmInfo?.Count01 || 0 }}</th>
                                        </tr>
                                        <tr>
                                            <th class="blod">超速报警总次数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.alarmInfo?.Sum01 || 0 }}</th>
                                        </tr>
                                        <tr>
                                            <th rowspan="2" class="blod">疲劳驾驶情况</th>
                                            <th class="blod">疲劳驾驶车台数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.alarmInfo?.Count02 || 0 }}</th>
                                        </tr>
                                        <tr>
                                            <th class="blod">疲劳驾驶总次数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.alarmInfo?.Sum02 || 0 }}</th>
                                        </tr>
                                        <tr v-show="mainData.data.hasClassLineAndTravel === '1'">
                                            <th rowspan="2" class="blod">凌晨2点到5点运行情况</th>
                                            <th class="blod">凌晨2点到5点运行车台数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.alarmInfo?.Count03 || 0 }}</th>
                                        </tr>
                                        <tr v-show="mainData.data.hasClassLineAndTravel === '1'">
                                            <th class="blod">凌晨2点到5点运行总次数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.alarmInfo?.Sum03 || 0 }}</th>
                                        </tr>
                                        
                                        <!--                                        信息平台保留 河南平台 去掉-->
                                        <!--                                         <tr>-->
                                        <!--                                        <th rowspan="2" class="blod">数据异常情况</th>-->
                                        <!--                                        <th class="blod">数据异常台数</th>-->
                                        <!--                                    </tr>-->
                                        <!--                                        <tr>-->
                                        <!--                                            <th class="blod">数据异常次数</th>-->
                                        <!--                                        </tr>-->
                                        <tr>
                                            <th rowspan="2" class="blod">卫星定位漂移情况</th>
                                            <th class="blod">卫星定位漂移台数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.alarmInfo?.Count04 || 0 }}</th>
                                        </tr>
                                        <tr>
                                            <th class="blod">卫星定位漂移次数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.alarmInfo?.Sum04 || 0 }}</th>
                                        </tr>
                                        <tr>
                                            <th rowspan="2" class="blod">轨迹不完整情况</th>
                                            <th class="blod">轨迹不完整台数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.alarmInfo?.Count05 || 0 }}</th>
                                        </tr>
                                        <tr>
                                            <th class="blod">轨迹不完整次数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.alarmInfo?.Sum05 || 0 }}</th>
                                        </tr>
                                        <tr>
                                            <th rowspan="2" class="blod">设备异常情况</th>
                                            <th class="blod">设备异常台数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.alarmInfo?.Count06 || 0 }}</th>
                                        </tr>
                                        <tr>
                                            <th class="blod">设备异常次数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.alarmInfo?.Sum06 || 0 }}</th>
                                        </tr>
                                        <tr>
                                            <th rowspan="2" class="blod">司机违规情况</th>
                                            <th class="blod">司机违规台数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.alarmInfo?.Count07 || 0 }}</th>
                                        </tr>
                                        <tr>
                                            <th class="blod">司机违规次数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.alarmInfo?.Sum07 || 0 }}</th>
                                        </tr>
                                        <tr v-show="isXXPT">
                                            <th rowspan="2" class="blod">智能设备报警</th>
                                            <th class="blod">智能设备台数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.alarmInfo?.Count100 || 0 }}</th>
                                        </tr>
                                        <tr v-show="isXXPT">
                                            <th class="blod">智能设备次数</th>
                                            <th v-for="i in mainData.data.data.length" :key="i">{{ mainData.data.data[i-1]?.alarmInfo?.Sum100 || 0 }}</th>
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
    monthReportExport, getReportConfigParamByKey,
} from '../../../../api/statisticalStatement/enterpriseReporting/month/index'
import {commonApi} from "@/api/common";

let {proxy} = getCurrentInstance()
let loading = $ref(false)
let title = $ref('第三方监控月报表')
let month = $ref(0)
let dateObj =  ['一', '二', '三', '四', '五', '六', '七', '八', '九']
let monthObj =  ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
let isGX = $ref(false)
let isXXPT = $ref(false)
isGX = proxy.$store.getters.productCode == 'GX'
isXXPT = proxy.$store.getters.productCode == 'XXPT'
let mainData = reactive({
    data: {
        data: [{},{},{},{},{},{}]
    },
    formData: {
        "beginTime": '',
        "endTime": '',
        "monthDate": proxy.$dayjs().subtract(1, 'month').format('YYYY-MM'),
        "nodeDtoList": [],
        "reportConfigId": ''
    },
    lists: [
        {label: '组织结构', key: 'nodeDtoList', showCheckbox: true, placeholder: '请选择组织结构', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: {hasDataPermission: true, needVehicle: true, searchType: 1, keyword: '',}, parKeys: [{ key: 'parentCode', val: 'permissionCode' }], props: {label: 'orgName', value: 'permissionCode', disabled: 'nocheck',}, permissionIds: [], selectTypes: [4, 5, null]},
        {label: ' 时间范围', key: 'monthDate', type: 'date', data: { type: 'month', valueFormat: 'YYYY-MM' }, change: (val)=> month = proxy.$dayjs(val).format('MM').replace(0, ""),disabledDate:(val)=> proxy.$dayjs(val).add(1, 'month').isSameOrAfter(proxy.$dayjs()) },
        { key: 'reportConfigId',label: '报表配置',type:'select', remote: false, url: '/statistics/report/reportConfigList', method: 'post', clearable: false, params: {reportType: 103}, props:{ label: 'reportConfigName', value:'reportConfigId'}, placeholder: '请选择报表配置', loadData: (lists)=> mainData.formData.reportConfigId = lists[0].reportConfigId},
    ],
})

month = proxy.$dayjs().subtract(1, 'month').format('MM').replace(0, "")

const resetForm = () => {
    mainData.formData.reportConfigId =  mainData.lists[2].children[0].reportConfigId
}

const setTableDataHeight = computed(() => {
    return window.innerHeight - 250
})

const getTable = () => {
    if (!loading)
        loading = true
    commonApi( '/statistics/companyReport/monthReport', mainData.formData).then(res => {
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
