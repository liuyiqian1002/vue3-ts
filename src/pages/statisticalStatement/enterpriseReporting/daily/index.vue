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
                                            <th class="title text-left" v-show="!isXXPT && !isGX" colspan="16">企业名称：{{mainData.data.companyName}}</th>
                                            <th class="title text-left" v-show="isGX" colspan="17">企业名称：{{mainData.data.companyName}}</th>
                                            <th class="title text-left" v-show="isXXPT" colspan="18">企业名称：{{mainData.data.companyName}}</th>
                                        </tr>
                                        <tr>
                                            <th class="text-left subtitle" v-show="!isXXPT && !isGX" colspan="16">
                                                监控日期： {{ $dayjs(mainData.formData.beginTime).format('YYYY-MM-DD')}}
                                            </th>
                                            <th class="text-left subtitle" v-show="isGX" colspan="17">
                                                监控日期： {{ $dayjs(mainData.formData.beginTime).format('YYYY-MM-DD')}}
                                            </th>
                                            <th class="text-left subtitle" v-show="isXXPT" colspan="18">
                                                监控日期： {{ $dayjs(mainData.formData.beginTime).format('YYYY-MM-DD')}}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th rowspan="2" style="width: 50px">监控情况</th>
                                            <!--                                        <th class="bg"<c:if test="${isGX}"> colspan="2"  </c:if>>平台车辆</th>-->
                                            <th class="bg" :colspan="isGX?2:1">平台车辆</th>
                                            <th class="bg">上线车辆数</th>
                                            <th class="bg">上线率</th>
                                            <th class="bg">超速报警台数</th>
                                            <th class="bg">超速报警总次数</th>
                                            <th class="bg">疲劳驾驶台数</th>
                                            <th class="bg">疲劳驾驶总次数</th>
                                            <th class="bg" v-show="isGX" style="width: auto;">疲劳驾驶报警总时长</th>
                                            <th class="bg" id="dribants_num_name" v-show="mainData.data.show2To5Sheet=='1'">凌晨2点到5点运行台数</th>
                                            <th class="bg" v-show="isXXPT">智能设备报警台数</th>
                                            <th class="bg" v-show="isXXPT">智能设备报警总次数</th>
                                            <th class="bg">司机违规台数</th>
                                            <th class="bg">司机违规次数</th>
                                            <th class="bg">进区域报警台数</th>
                                            <th class="bg">进区域报警次数</th>
                                            <th class="bg">出区域报警台数</th>
                                            <th class="bg">出区域报警次数</th>
                                        </tr>
                                        <tr>
                                            <th id="ptcl">{{mainData.data.totalVel}}</th>
                                            <th id="zxcl">{{mainData.data.totalOnlineVel}}</th>
                                            <th id="sszxl">{{mainData.data.totalOnlineRate}}</th>
                                            <th id="csbjts">{{mainData.data.Count01}}</th>
                                            <th id="csbjcs">{{mainData.data.Sum01}}</th>
                                            <th id="pljsts">{{mainData.data.Count02}}</th>
                                            <th id="pljscs">{{mainData.data.Sum02}}</th>
                                            <th id="pljsbjzsc" v-show="isGX">{{mainData.data.Duration02}}</th>
                                            <th id="dribants" v-show="mainData.data.show2To5Sheet=='1'">{{mainData.data.Count03}}</th>
                                            <th id="velIntel" v-show="isXXPT">{{mainData.data.Count100}}</th>
                                            <th id="velIntelCount" v-show="isXXPT">{{mainData.data.Sum100}}</th>
                                            <th id="viots">{{mainData.data.Count07}}</th>
                                            <th id="viocs">{{mainData.data.Sum07}}</th>
                                            <th id="jqybjts">{{mainData.data.Count105}}</th>
                                            <th id="jqybjcs">{{mainData.data.Sum105}}</th>
                                            <th id="cqybjts">{{mainData.data.Count106}}</th>
                                            <th id="cqybjcs">{{mainData.data.Sum106}}</th>
                                        </tr>
                                        <tr>
                                            <th style="width: 50px">序号</th>
                                            <th class="bg">车牌号</th>
                                            <th class="bg" v-show="isGX">车辆SIM卡号</th>
                                            <th class="bg">终端类型</th>
                                            <th class="bg">车辆上线情况</th>
                                            <th colspan="2" class="bg">超速报警次数</th>
                                            <th colspan="2" class="bg">疲劳驾驶次数（不含累计超时的情况）</th>
                                            <th class="bg" v-show="isGX">疲劳驾驶报警时长（不含累计超时的情况）</th>
                                            <th class="bg" id="dribants_count_name" v-show="mainData.data.show2To5Sheet=='1'">凌晨2点到5点运行次数</th>
                                            <th v-show="isXXPT" class="bg" colspan="2">智能设备报警次数</th>
                                            <th colspan="2" class="bg">司机违规次数（打哈欠、抽烟、打电话、闭眼等）</th>
                                            <th colspan="2" class="bg">进区域报警次数</th>
                                            <th colspan="2" class="bg">出区域报警次数</th>
                                        </tr>
                                        <tr v-for="(data, i) in mainData.data.alarmVelList" :key="i+1">
                                            <th style="width: 50px">{{ i+1 }}</th>
                                            <th class="bg">{{ data.platenum }}</th>
                                            <th class="bg" v-show="isGX">{{ data.simNum }}</th>
                                            <th class="bg">{{ data.terminalType ? data.terminalType : nullDisplayStyle }}</th>
                                            <th class="bg">{{ data.isLocation ? data.isLocation : nullDisplayStyle }}</th>
                                            <th colspan="2" class="bg">{{ data.Count01 ? data.Count01 : nullDisplayStyle }}</th>
                                            <th colspan="2" class="bg">{{ data.Count02 ? data.Count02 : nullDisplayStyle }}</th>
                                            <th colspan="2" class="bg" v-show="isGX">{{ data.Duration02 ? data.Duration02 : nullDisplayStyle }}</th>
<!--                                            <th class="bg" id="dribants_count_name" v-show="mainData.data.show2To5Sheet=='1'">{{ data.Count03 ? data.Count03 : nullDisplayStyle }}</th>-->
                                            <th class="bg" id="dribants_count_name">{{ data.Count03 ? data.Count03 : nullDisplayStyle }}</th>
                                            <th class="bg" colspan="2" v-show="isXXPT">{{ data.Count100 ? data.Count100 : nullDisplayStyle }}</th>
                                            <th colspan="2" class="bg">{{ data.Count07 || nullDisplayStyle }}</th>
                                            <th colspan="2" class="bg">{{ data.Count105 ? data.Count105 : nullDisplayStyle }}</th>
                                            <th colspan="2" class="bg">{{ data.Count106 ? data.Count106 : nullDisplayStyle }}</th>
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
    dayReportExport, getReportConfigParamByKey,
} from '../../../../api/statisticalStatement/enterpriseReporting/daily/index'
import {commonApi} from "@/api/common";

let {proxy} = getCurrentInstance()
let loading = $ref(false)
let title = $ref('第三方监控日报表')
let isGX = $ref(false)
let isXXPT = $ref(false)
isGX = proxy.$store.getters.productCode == 'GX'
isXXPT = proxy.$store.getters.productCode == 'XXPT'
const nullDisplayStyle = '-'
let mainData = reactive({
    data: {},
    formData: {
        "beginTime": proxy.$dayjs().subtract(1, 'day').format('YYYY-MM-DD 00:00:00'),
        "endTime": proxy.$dayjs().subtract(1, 'day').format('YYYY-MM-DD 23:59:59'),
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
        {label: '组织结构', key: 'nodeDtoList', showCheckbox: true, placeholder: '请选择组织结构', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: {hasDataPermission: true, needVehicle: true, searchType: 1, keyword: '',}, parKeys: [{ key: 'parentCode', val: 'permissionCode' }], props: {label: 'orgName', value: 'permissionCode', disabled: 'nocheck',}, permissionIds: [], selectTypes: [4, 5, null]},
        {label: ' 时间范围', key: ['beginTime', 'endTime'], type: 'esDate', col: 12, data: { type: 'datetime', valueFormat: 'YYYY-MM-DD HH:mm:ss' },endDisabledDate:(val)=> proxy.$dayjs(val).add(1, 'day').isSameOrAfter(proxy.$dayjs()),disabledDate:(val)=> proxy.$dayjs(val).add(1, 'day').isSameOrAfter(proxy.$dayjs()) },
        { key: 'reportConfigId',label: '报表配置',type:'select', remote: false, url: '/statistics/report/reportConfigList', method: 'post', clearable: false, params: {reportType: 101}, props:{ label: 'reportConfigName', value:'reportConfigId'}, placeholder: '请选择报表配置', loadData: (lists)=> mainData.formData.reportConfigId = lists[0].reportConfigId},
    ],
})

const resetForm = () => {
    mainData.formData.reportConfigId =  mainData.lists[2].children[0].reportConfigId
}

const setTableDataHeight = computed(() => {
    return window.innerHeight - 250
})

const getTable = () => {
    if(mainData.formData.nodeDtoList.length>3){
        return ElMessage.warning('勾选企业不能超过3个!')
    }
    if (!loading){
        loading = true
        commonApi( '/statistics/companyReport/dayReport', mainData.formData).then(res => {
            loading = false
            mainData.data = res
            getReportConfigParamByKey({"configId": mainData.formData.reportConfigId, "key": "headerName"}).then(res=>{
                title = res
            })
        }).catch(() => {
            loading = false
        })
    }
    
}


const operatorReport = () => {
    // exportMajorOperatorReport()
    proxy.MessageBox({ msg: `请确定导出全部数据`, type: 'warning' }).then((close) => {
        dayReportExport(mainData.formData).then(res=>{
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
