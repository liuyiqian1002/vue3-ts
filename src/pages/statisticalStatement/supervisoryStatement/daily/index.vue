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
<!--                                            信息平台 湖北  河南平台 河南-->
                                            <th colspan="4" class="text-left subtitle">填报单位：{{mainData.setData.filter(tag=> tag.parameterKey == 'areaName')?.[0]?.parameterValue}}</th>
                                            <th colspan="2" class="text-left subtitle">{{mainData.setData.filter(tag=> tag.parameterKey == 'transport')?.[0]?.parameterValue}}：<span
                                                id="report_companyName">{{mainData.nodeName}}</span></th>
                                            <th colspan="2" class="text-left subtitle">报送时间:
                                                <span id="jkDate">{{mainData.date}}</span></th>
                                        </tr>
                                        <tr>
                                            <th class="bg-yellow">序号</th>
                                            <th class="bg-yellow">车牌号</th>
                                            <th class="bg-yellow">道路运输证号</th>
                                            <th class="bg-yellow"  v-show="!isGx">行为代码</th>
                                            <th class="bg-green">时间(时、分、秒)</th>
                                            <th class="bg-green">地点(省、市、县)</th>
                                            <th class="bg-green">
                                                {{isGx?'报警类型':'事件描述' }}
                                            </th>
                                            <th class="bg-green">备注</th>
                                        </tr>
                                        <tr v-for="(item, i) in mainData.data" :key="i">
                                            <th class="">{{ i+1 }}</th>
                                            <th class="">{{ item.plateNum || '-' }}</th>
                                            <th class="">{{ item.tranLicenseNum || '-' }}</th>
                                            <th class=""  v-show="!isGx">{{ item.alarmTypeHbCode || '-' }}</th>
                                            <th class="">{{ item.eventStartTime || '-' }}</th>
                                            <th class="">{{ item.startLocation || '-' }}</th>
                                            <th class="">
                                                {{ item.alarmTypeName || '-' }}
                                            </th>
                                            <th class="">{{ item.remark || '-' }}</th>
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
    dayReportExport, getReportConfigParamByKey,getReportConfig
} from '../../../../api/statisticalStatement/supervisoryStatement/daily/index'
import {commonApi} from "@/api/common";

let {proxy} = getCurrentInstance()
let loading = $ref(false)
let title = $ref('')
let isGX = $ref(false)
let isXXPT = $ref(false)
isGX = proxy.$store.getters.productCode == 'GX'
isXXPT = proxy.$store.getters.productCode == 'XXPT'
const nullDisplayStyle = '-'
let mainData = reactive({
    data: {},
    setData: [],
    nodeName: '',
    date: '',
    formData: {
        "beginDay": "",
        "date": proxy.$dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
        "endDay": "",
        "nodeId": '',
        "nodeName": "",
        "reportConfigId": '',
        "taskType": '',
        "vehicleOperateTypeIdList": []
    },
    lists: [
        {label: '企业名称', key: 'nodeId', type: 'select', remote: true, url: '/business/company/associateCompany', method: 'post', params: { havePermission: true }, props: { label: 'companyName', value: 'companyId' }, placeholder: '请选择企业名称', change: (val,data, item)=>{
                mainData.formData.nodeName = item.children.filter(tag=> tag.companyId == val)[0].companyName
            }},
        // {label: ' 时间范围', key: ['beginTime', 'endTime'], type: 'esDate', col: 12, data: { type: 'datetime', valueFormat: 'YYYY-MM-DD HH:mm:ss' } },
        {label: ' 时间范围', key: 'date', type: 'date', data: { valueFormat: 'YYYY-MM-DD' },disabledDate:(val)=> proxy.$dayjs(val).isSameOrAfter(proxy.$dayjs()) },
        {label: '营运类型', key: 'vehicleOperateTypeIdList', type: 'allSelect', width: 170, remote: true, url: '/system/vehicleOperateType/getTreeIdList', method: 'get', loadMore: true, placeholder: '请选择营运类型',},
        { key: 'reportConfigId',label: '报表配置',type:'select', remote: true, url: '/statistics/report/reportConfigList', method: 'post', params: {reportType: 201}, props:{ label: 'reportConfigName', value:'reportConfigId'}, clearable: false, placeholder: '请选择报表配置', loadData: (lists)=> {
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
    commonApi( '/statistics/superviseReport/dayReport', mainData.formData).then(res => {
        loading = false
        mainData.nodeName = mainData.formData.nodeName
        mainData.date = mainData.formData.date
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
