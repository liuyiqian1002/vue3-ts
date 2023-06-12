<template>
    <div>
        <div class="fullpage">
            <div class="brief">{{ data.provinceReportName }}{{ data.cityName }}简报&nbsp;&nbsp;
                <a href="javascript:" id="downloadDoc" @click="e => download()">下载word</a>
            </div>
            <div class="img-wrapper text-center">
                <img src="/src/assets/images/cheanda/birefreport.png" alt="">
            </div>
            <h1 class="page-title text-center">湖北省道路运输安全第三方监测</h1>
            <h1 class="page-title text-center">
                {{ data.yearMonthCh }}
            </h1>

            <h3 class="company text-center">{{ data.areaName }}</h3>
            <h3 class="company text-center">湖北车安达信息科技有限公司</h3>
            <h3 class="date text-center red">{{ data.reportDate }}</h3>
        </div>
        <!-- 目录页 -->
        <div class="fullpage menu content-wrapper text-center">
            <h1 class="page-title text-center" style="font-size: 29px;margin-top:150px;">目录</h1>
            <h5 class="sub-menu">
                <span class="song"> 一、第三方监测服务总体情况</span>
                <span class="pagenum">1</span>
                <span class="menu-dot">................................</span>
            </h5>
            <h5 class="sm-menu">
                <span class="song">&nbsp;&nbsp&nbsp;&nbsp（一）车辆报警类型分析</span>
                <span class="pagenum">1</span>
                <span class="menu-dot">.................................</span>
            </h5>
            <h5 class="sm-menu">
                <span class="song">&nbsp;&nbsp&nbsp;&nbsp（二）车辆报警数据统计</span>
                <span class="pagenum">2</span>
                <span class="menu-dot">.................................</span>
            </h5>
            <h5 class="sm-menu">
                <span class="song">&nbsp;&nbsp&nbsp;&nbsp（三）车辆报警次数分析</span>
                <span class="pagenum">3</span>
                <span class="menu-dot">.................................</span>
            </h5>
            <h5 class="sm-menu">
                <span class="song">&nbsp;&nbsp&nbsp;&nbsp（四）车辆车均报警分析</span>
                <span class="pagenum">5</span>
                <span class="menu-dot">.................................</span>
            </h5>

            <h5 class="sub-menu">
                <span class="song"> 二、第三方监测数据分析</span>
                <span class="pagenum">6</span>
                <span class="menu-dot">....................................</span>
            </h5>
            <h5 class="sm-menu">
                <span class="song">&nbsp;&nbsp&nbsp;&nbsp（一）企业监测报警均值排名</span>
                <span class="pagenum">6</span>
                <span class="menu-dot">..............................</span>
            </h5>
            <h5 class="sm-menu">
                <span class="song">&nbsp;&nbsp&nbsp;&nbsp（二）车辆监测报警次数排名</span>
                <span class="pagenum">7</span>
                <span class="menu-dot">..............................</span>
            </h5>
        </div>
        <!-- 一、总体情况 -->
        <div class="fullpage">
            <!-- 一、第三方监测服务总体情况 -->
            <h4>{{ generalViewTitle }}</h4>
            <c:if test="${fn:length(generalView.listOperateTypeStatistic) > 0}">
                <p class="textStyle margin-tm text-in">
                    &nbsp;&nbsp&nbsp;&nbsp{{ generalView.headSummary }}
                </p>
                <!-- 营运类型分析表格 -->
                <h3 style="margin-bottom: 10px; font-weight: 600 !important">{{ generalView.title }}</h3>

                <table class="img-table">
                    <thead>
                        <tr>
                            <th class="weightSize">区域</th>
                            <th class="weightSize">营运类型</th>
                            <th class="weightSize">企业户数</th>
                            <th class="weightSize">车辆台数</th>
                            <th class="weightSize">车辆占比</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item, index in generalView?.listOperateTypeStatistic">
                            <td v-if="index === 0" :rowspan="generalView?.listOperateTypeStatistic.length + 1"
                                class="weightSize">{{ data.areaName }}</td>
                            <td :class="{ weightSize: item.operateTypeCode == '0' }">{{ item.operateTypeName }}</td>
                            <td :class="{ weightSize: item.operateTypeCode == '0' }">{{ item.companyCount }}</td>
                            <td :class="{ weightSize: item.operateTypeCode == '0' }">{{ item.vehicleTotalCount }}</td>
                            <td :class="{ weightSize: item.operateTypeCode == '0' }">{{ item.ratio }}</td>
                        </tr>
                    </tbody>
                </table>
            </c:if>

            <!-- 第三方监测平台车辆报警类型分析 -->
            <div v-if="listAlarmTypeAnalysis && listAlarmTypeAnalysis.length > 0">
                <!-- （一）第三方监测平台车辆报警类型分析 -->
                <div class="info-title">{{ alarmTypeTitle }}</div>

                <div v-for="row in listAlarmTypeAnalysis">
                    <h3 class="info-h3">{{ row.title }}</h3>
                    <table class="img-table">
                        <thead>
                            <tr>
                                <th class="weightSize">类别</th>
                                <th class="weightSize">{{ row.lastYearCurrMonthCh }}</th>
                                <!-- <c:if test="${not empty row.lastMonthCh}"> -->
                                <th v-if="row.lastMonthCh" class="weightSize">{{ row.lastMonthCh }}</th>
                                <!-- </c:if> -->
                                <th class="weightSize">{{ row.currMonthCh }}</th>
                                <th class="weightSize">同比增长率</th>
                                <!-- <c:if test="${not empty row.lastMonthCh}"> -->
                                <th v-if="row.lastMonthCh" class="weightSize">环比增长率</th>
                                <!-- </c:if> -->
                            </tr>
                        </thead>
                        <tbody>
                            <!-- <div items="${row.listAlarmTypeDetail}" var="item"> -->
                            <tr v-for="item in row.listAlarmTypeDetail">
                                <td>{{ item.typeName }}</td>
                                <td>{{ item.lastYearCurrMonth }}</td>
                                <!-- <c:if test="${not empty row.lastMonthCh}"> -->
                                <td v-if="row.lastMonthCh">{{ item.lastMonth }}</td>
                                <!-- </c:if> -->
                                <td>{{ item.currMonth }}</td>
                                <td>{{ item.onYearGrowthRate }}</td>
                                <!-- <c:if test="${not empty row.lastMonthCh}"> -->
                                <td v-if="row.lastMonthCh">{{ item.seqGrowthRate }}</td>
                                <!-- </c:if> -->
                            </tr>
                            <!-- </div> -->
                        </tbody>
                    </table>
                </div>
                <p class="textStyle margin-tm text-in">
                    &nbsp;&nbsp&nbsp;&nbsp{{ alarmTypeSummary }}
                </p>
            </div>
            <!-- </c:if> -->

            <!-- 第三方监测平台车辆报警数据统计 -->
            <!-- <c:if test="${fn:length(listAlarmStatistic) > 0}"> -->
            <div v-if="listAlarmStatistic && listAlarmStatistic.length > 0">
                <!-- （二）第三方监测平台车辆报警数据统计  -->
                <div class="info-title">{{ alarmStatisticTitle }}</div>

                <div v-for="row in listAlarmStatistic">
                    <h3 class="info-h3">{{ row.title }}</h3>
                    <table class="img-table">
                        <thead>
                            <tr>
                                <th class="weightSize">排名</th>
                                <th class="weightSize">区（县）</th>
                                <th class="weightSize">监测车辆台数</th>
                                <th class="weightSize">报警车辆台数</th>
                                <th class="weightSize">报警行为次数</th>
                                <th class="weightSize">车均报警</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- <div items="${row.listAlarmStatisticDetail}" var="item"> -->
                            <tr v-for="item in row.listAlarmStatisticDetail">
                                <!-- 合计行 -->
                                <!-- <c:if test="${item.areaId == '9999'}"> -->
                                <td v-if="item.areaId != '9999'">{{ item.ranking }}</td>
                                <td colspan="2" v-if="item.areaId == '9999'">{{ item.areaName }}</td>
                                <td v-else>{{ item.areaName }}</td>
                                <!-- </c:if> -->
                                <!-- <c:if test="${item.areaId != '9999'}"> -->
                                <!-- </c:if> -->

                                <td>{{ item.vehicleCount }}</td>
                                <td>{{ item.alarmVehicleCount }}</td>
                                <td>{{ item.alarmCount }}</td>
                                <td>{{ item.avgAlarmCountStr }}</td>
                            </tr>
                            <!-- </div> -->
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- </c:if> -->

            <!-- 第三方监测平台车辆报警次数分析 -->
            <!-- <c:if test="${fn:length(listAlarmCountAnalysis) > 0}"> -->
            <div v-if="listAlarmCountAnalysis && listAlarmCountAnalysis.length > 0">
                <!-- （三）第三方监测平台车辆报警次数分析 -->
                <div class="info-title">{{ alarmCountAnalysisTitle }}</div>

                <div v-for="row in listAlarmCountAnalysis">
                    <h3 class="info-h3">{{ row.title }}</h3>
                    <table class="img-table">
                        <thead>
                            <tr>
                                <th class="weightSize">类别</th>
                                <th class="weightSize">{{ row.lastYearCurrMonthCh }}</th>
                                <!-- <c:if test="${not empty row.lastMonthCh}"> -->
                                <th v-if="row.lastMonthCh" class="weightSize">{{ row.lastMonthCh }}</th>
                                <!-- </c:if> -->
                                <th class="weightSize">{{ row.currMonthCh }}</th>
                                <th class="weightSize">同比增长率</th>
                                <!-- <c:if test="${not empty row.lastMonthCh}"> -->
                                <th v-if="row.lastMonthCh" class="weightSize">环比增长率</th>
                                <!-- </c:if> -->
                            </tr>
                        </thead>
                        <tbody>
                            <!-- <div items="${row.listAlarmCountDetail}" var="item"> -->
                            <tr v-for="item in row.listAlarmCountDetail">
                                <td>{{ item.typeName }}</td>
                                <td>{{ item.lastYearCurrMonth }}</td>
                                <!-- <c:if test="${not empty row.lastMonthCh}"> -->
                                <td v-if="row.lastMonthCh">{{ item.lastMonth }}</td>
                                <!-- </c:if> -->
                                <td>{{ item.currMonth }}</td>
                                <td>{{ item.onYearGrowthRate }}</td>
                                <!-- <c:if test="${not empty row.lastMonthCh}"> -->
                                <td v-if="row.lastMonthCh">{{ item.seqGrowthRate }}</td>
                                <!-- </c:if> -->
                            </tr>
                            <!-- </div> -->
                        </tbody>
                    </table>
                </div>
                <p class="textStyle margin-tm text-in">
                    &nbsp;&nbsp&nbsp;&nbsp{{ alarmCountAnalysisSummary }}
                </p>
            </div>
            <!-- </c:if> -->

            <!-- 第三方监测平台车辆车均报警分析 -->
            <!-- <c:if test="${fn:length(listAlarmAvgAnalysis) > 0}"> -->
            <div v-if="listAlarmAvgAnalysis && listAlarmAvgAnalysis.length > 0">
                <!-- （四）第三方监测平台车辆车均报警分析 -->
                <div class="info-title">{{ alarmAvgTitle }}</div>

                <div v-for="row in listAlarmAvgAnalysis" var="row">
                    <h3 class="info-h3">{{ row.title }}</h3>
                    <table class="img-table">
                        <thead>
                            <tr>
                                <th class="weightSize">区（县）</th>
                                <th class="weightSize">{{ row.lastYearCurrMonthCh }}</th>
                                <!-- <c:if test="${not empty row.lastMonthCh}"> -->
                                <th v-if="row.lastMonthCh" class="weightSize">{{ row.lastMonthCh }}</th>
                                <!-- </c:if> -->
                                <th class="weightSize">{{ row.currMonthCh }}</th>
                                <th class="weightSize">同比增长率</th>
                                <!-- <c:if test="${not empty row.lastMonthCh}"> -->
                                <th v-if="row.lastMonthCh" class="weightSize">环比增长率</th>
                                <!-- </c:if> -->
                            </tr>
                        </thead>
                        <tbody>
                            <!-- <div items="${row.listAlarmAvgDetail}" var="item"> -->
                            <tr v-for="item in row.listAlarmAvgDetail">
                                <td>{{ item.typeName }}</td>
                                <td>{{ item.lastYearCurrMonth }}</td>
                                <!-- <c:if test="${not empty row.lastMonthCh}"> -->
                                <td v-if="row.lastMonthCh">{{ item.lastMonth }}</td>
                                <!-- </c:if> -->
                                <td>{{ item.currMonth }}</td>
                                <td>{{ item.onYearGrowthRate }}</td>
                                <!-- <c:if test="${not empty row.lastMonthCh}"> -->
                                <td v-if="row.lastMonthCh">{{ item.seqGrowthRate }}</td>
                                <!-- </c:if> -->
                            </tr>
                            <!-- </div> -->
                        </tbody>
                    </table>
                </div>
                <p class="textStyle margin-tm text-in">
                    &nbsp;&nbsp&nbsp;&nbsp{{ alarmAvgSummary }}
                </p>
            </div>
            <!-- </c:if> -->

        </div>

        <!-- 二、第三方监测数据分析 -->
        <div class="fullpage">
            <h4>{{ alarmRankingTitle }}</h4>

            <!-- 企业监测报警均值排名 -->
            <!-- <c:if test="${fn:length(listCompanyAlarmRanking) > 0}"> -->
            <div v-if="listCompanyAlarmRanking && listCompanyAlarmRanking.length > 0">
                <!-- （一）企业监测报警均值排名 -->
                <div class="info-title">{{ companyAlarmRankingTitle }}</div>

                <div v-for="row in listCompanyAlarmRanking">
                    <h3 class="info-h3">{{ row.title }}</h3>
                    <table class="img-table">
                        <thead>
                            <tr>
                                <th class="weightSize">排名</th>
                                <th class="weightSize">区（县）</th>
                                <th class="weightSize">企业名称</th>
                                <th class="weightSize">报警车辆台数</th>
                                <th class="weightSize">报警行为次数</th>
                                <th class="weightSize">报警均值</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- <div items="${row.listRankingDetail}" var="item"> -->
                            <tr v-for="item in row.listRankingDetail">
                                <td>{{ item.ranking }}</td>
                                <td>{{ item.areaName }}</td>
                                <td>{{ item.companyName }}</td>
                                <td>{{ item.alarmVehicleCount }}</td>
                                <td>{{ item.alarmCount }}</td>
                                <td>{{ item.avgAlarmCountStr }}</td>
                            </tr>
                            <!-- </div> -->
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- </c:if> -->

            <!-- 车辆监测报警次数排名 -->
            <!-- <c:if test="${fn:length(listAlarmCountRanking) > 0}"> -->
            <div v-if="listAlarmCountRanking && listAlarmCountRanking.length > 0">
                <!-- （二）车辆监测报警次数排名 -->
                <div class="info-title">{{ alarmCountRankingTitle }}</div>

                <div v-for="row in listAlarmCountRanking">
                    <h3 class="info-h3">{{ row.title }}</h3>
                    <table class="img-table">
                        <thead>
                            <tr>
                                <th class="weightSize">排名</th>
                                <th class="weightSize">区（县）</th>
                                <th class="weightSize">企业名称</th>
                                <th class="weightSize">车牌号</th>
                                <th class="weightSize">报警行为次数</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- <div items="${row.listRankingDetail}" var="item"> -->
                            <tr v-for="item in row.listRankingDetail">
                                <td>{{ item.ranking }}</td>
                                <td>{{ item.areaName }}</td>
                                <td>{{ item.companyName }}</td>
                                <td>{{ item.plateNum }}</td>
                                <td>{{ item.alarmCount }}</td>
                            </tr>
                            <!-- </div> -->
                        </tbody>
                    </table>
                </div>

            </div>
            <!-- </c:if> -->
        </div>
    </div>
</template>

<script setup lang="tsx">

const { title, data } = defineProps({
    title: { type: String, default: () => '' },
    // row: { type: Object, default: () => { } },
    data: { type: Object, default: () => { } },
    download: { type: Function, defualt: () => { } }
})
const proxy: any = getCurrentInstance()?.proxy
const { generalView, alarmAnalysis, alarmRanking, generalViewTitle, alarmRankingTitle, alarmCountAnalysisSummary } = data
const { alarmAvgSummary, alarmAvgTitle, alarmCountAnalysisTitle, alarmStatisticTitle, alarmTypeSummary, alarmTypeTitle, listAlarmAvgAnalysis, listAlarmCountAnalysis, listAlarmStatistic, listAlarmTypeAnalysis } = alarmAnalysis
const { alarmCountRankingTitle, companyAlarmRankingTitle, listAlarmCountRanking, listCompanyAlarmRanking } = alarmRanking

// const onDownload = (e) => {
//   console.log(row, 'row')
//   download(row.summaryReportId).then(res => {
//       console.log(res, 'download')
//       proxy.download(res, `湖北省道路运输安全第三方监测-${row.summaryReportShowDate}(车安达)`, 'doc')
//   })
// }
</script>

<style scoped lang="scss">
@import url(./briefReport.css);
</style>
