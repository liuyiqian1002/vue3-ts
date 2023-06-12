<template>
  <div>
    <!-- 封面页 -->
    <div class="fixed">
      {{ data.summaryReportStatisticalYear }}{{ data.summaryReportStatisticalMonth2 }}月{{ data.summaryCityName }}季度简报
      <!-- <shiro:hasPermission name="statistics-report-download"> -->
      <a href="javascript:" id="downloadDoc" @click="e => download()">下载word</a>
      <!-- </shiro:hasPermission> -->
    </div>

    <div class="fullpage margin-t">
      <div class="t-center">
<!--        <img src="../statics/img/briefReport/monthlyAnalyze.png" alt="">-->
      </div>
      <h1 class="margin-tm">湖北省道路运输安全第三方监测</h1>
      <h1>{{ data.summaryReportStatisticalYear }}{{ data.summaryReportStatisticalMonth }}季度简报</h1>
      <h1 style="margin: 60px 0px;">({{ data.summaryCityName }})</h1>
      <h3 class="margin-t">湖北车安达信息科技有限公司</h3>
      <h3 style="margin: 30px 0px;">{{ data.summaryReportGenerateDate }}</h3>
    </div>
    <!-- 目录页 -->
    <div class="fullpage">
      <h1>目录</h1>
      <ul>
        <li class="sub-menu">
          <span>一、营运车辆基本情况</span>
          <span class="pageNumber">1</span>
        </li>
        <li class="sub-menu">
          <span>二、营运车辆违规报警情况</span>
          <span class="pageNumber">2</span>
        </li>
        <li class="sub-menu pad-left50">
          <span>2.1 营运车辆违规报警综合情况</span>
          <span class="pageNumber">2</span>
        </li>
        <li class="sub-menu pad-left50">
          <span>2.2 重点营运车辆违规报警情况</span>
          <span class="pageNumber">3</span>
        </li>
        <li class="sub-menu pad-left50">
          <span>2.3 重点营运车辆违规报警趋势分析</span>
          <span class="pageNumber">3</span>
        </li>
        <li class="sub-menu pad-left50">
          <span>2.4 全市违规报警排名情况</span>
          <span class="pageNumber">6</span>
        </li>
        <li class="sub-menu pad-left100">
          <span>2.4.1区所报警排名情况</span>
          <span class="pageNumber">6</span>
        </li>
        <li class="sub-menu pad-left100">
          <span>2.4.2运输企业报警排名情况</span>
          <span class="pageNumber">8</span>
        </li>
        <li class="sub-menu pad-left100">
          <span>2.4.3营运车辆违规报警排名情况</span>
          <span class="pageNumber">10</span>
        </li>
        <!-- <c:if test="{{ data.intelligentEquipmentInfo.hasMomenta }}"> -->
        <li v-if="data.intelligentEquipmentInfo.hasMomenta" class="sub-menu">
          <span>三、人工智能设备试点使用情况</span>
          <span class="pageNumber">14</span>
        </li>
        <!-- </c:if> -->

      </ul>
    </div>
    <!-- 列表页1 -->
    <div class="fullpage" id="text1">
      <h4>一、营运车辆基本情况</h4>
      <p class="textStyle margin-tm text-in">
        {{ vehicleInfoDetail }}
      </p>
      <div class="tableWrapper ">
        <h3>营运车辆分类统计</h3>
        <table class="img-table" border="1">
          <tr>
            <td>市区</td>
            <th>营运类型</th>
            <th>车辆台数</th>
            <th>占比</th>
          </tr>
          <tr v-if="part1Data.busVehicleNumber > 0">
            <td rowspan=${size+1}>{{ data.summaryCityName }}</td>
            <td>班线客运</td>
            <td>{{ part1Data.busVehicleNumber }}</td>
            <td>{{ part1Data.busVehicleRatio }}</td>
          </tr>
          <tr v-if="part1Data.tourVehicleNumber > 0">
            <td v-if="part1Data.busVehicleNumber == 0" rowspan=${size+1}>{{ data.summaryCityName }}</td>
            <td>旅游客运</td>
            <td>{{ part1Data.tourVehicleNumber }}</td>
            <td>{{ part1Data.tourVehicleRatio }}</td>
          </tr>
          <!-- <c:if v-if="part1Data.dangerVehicleNumber>0" -->
          <tr v-if="part1Data.dangerVehicleNumber > 0">
            <td>危险货物运输</td>
            <td>{{ part1Data.dangerVehicleNumber }}</td>
            <td>{{ part1Data.dangerVehicleRatio }}</td>
          </tr>
          <!-- </c:if> -->
          <!-- <c:if v-if="part1Data.goodsVehicleNumber>0" -->
          <tr v-if="part1Data.goodsVehicleNumber > 0">
            <td>普通货运</td>
            <td>{{ part1Data.goodsVehicleNumber }}</td>
            <td>{{ part1Data.goodsVehicleRatio }}</td>
          </tr>
          <!-- </c:if> -->
          <tr>
            <th>小计</th>
            <th>{{ part1Data.vehicleTotalNumber }}</th>
            <th>100.00%</th>
          </tr>
        </table>
      </div>

      <div class="echartWrapper margin-tm h400" id="chartContainer1"></div>
      <div class="echartWrapper margin-tm h400" id="chartContainer2"></div>

      <div class="tableWrapper">
        <h3>重点营运车辆分类分布情况</h3>
        <table class="img-table img-table-other" border="1">
          <tr>
            <th style="width: 85px; line-height: normal"></th>
            <th v-for="li in part1Data.importantVehicleTypeInfos">

              <!-- <c:if v-if="li.busVehicleNumber!=0 || li.tourVehicleNumber!=0 || li.dangerVehicleNumber!=0" -->
              <p v-if="li.busVehicleNumber != 0 || li.tourVehicleNumber != 0 || li.dangerVehicleNumber != 0">
                {{ li.cityName }}
              </p>
              <!-- </c:if> -->
            </th>
          </tr>
          <!-- <c:if v-if="part1Data.busVehicleNumber>0" -->
          <tr v-if="part1Data.busVehicleNumber > 0">
            <td>班线客运</td>
            <td v-for="li in part1Data.importantVehicleTypeInfos">

              <!-- <c:if v-if="li.busVehicleNumber!=0 || li.tourVehicleNumber!=0 || li.dangerVehicleNumber!=0" -->
              <p v-if="li.busVehicleNumber != 0 || li.tourVehicleNumber != 0 || li.dangerVehicleNumber != 0">{{
                li.busVehicleNumber
              }}</p>
              <!-- </c:if> -->
            </td>
          </tr>
          <!-- </c:if> -->

          <!-- <c:if v-if="part1Data.tourVehicleNumber>0" -->
          <tr v-if="part1Data.tourVehicleNumber > 0">
            <td>旅游客运</td>
            <td v-for="li in part1Data.importantVehicleTypeInfos" var="li">

              <!-- <c:if v-if="li.busVehicleNumber!=0 || li.tourVehicleNumber!=0 || li.dangerVehicleNumber!=0" -->
              <p v-if="li.busVehicleNumber != 0 || li.tourVehicleNumber != 0 || li.dangerVehicleNumber != 0">{{
                li.tourVehicleNumber }}</p>
              <!-- </c:if> -->
            </td>
          </tr>
          <!-- </c:if> -->

          <!-- <c:if v-if="part1Data.dangerVehicleNumber>0" -->
          <tr v-if="part1Data.dangerVehicleNumber > 0">
            <td>危险品运输</td>
            <td v-for="li in part1Data.importantVehicleTypeInfos" var="li">

              <!-- <c:if v-if="li.busVehicleNumber!=0 || li.tourVehicleNumber!=0 || li.dangerVehicleNumber!=0" -->
              <p v-if="li.busVehicleNumber != 0 || li.tourVehicleNumber != 0 || li.dangerVehicleNumber != 0">{{
                li.dangerVehicleNumber }}</p>
              <!-- </c:if> -->
            </td>
          </tr>
          <!-- </c:if> -->

        </table>
      </div>
    </div>
    <!-- 列表页2 -->
    <div class="fullpage" id="text2">
      <h4>二、营运车辆违规报警情况</h4>
      <h4>2.1 营运车辆违规报警综合情况</h4>
      <p class="textStyle margin-tm text-in">
        {{ part21DataInfo }}
      </p>
      <div class="echartWrapper margin-tm h400" id="chartContainer3"></div>
    </div>
    <!-- 列表页2.2 -->
    <div class="fullpage" id="text3">
      <h4>2.2 重点营运车辆违规报警情况</h4>
      <p class="textStyle margin-tm text-in">
        {{ part22DataInfo }}
      </p>
      <div class="echartWrapper margin-tm h400" id="chartContainer4"></div>
    </div>
    <!-- 列表页2.3 -->
    <div class="fullpage" id="text4">
      <h4>2.3 重点营运车辆违规报警趋势分析</h4>
      <p class="textStyle margin-tm text-in">
        {{ part231DataInfo }}
      </p>
      <div class="echartWrapper margin-tm h400" id="chartContainer5"></div>
      <div class="tableWrapperList">
        <!-- <c:set var="part1ChartTableBus"
          value="${part231Data.busFirstMonthAlarmNumber == '0' && part231Data.busSecondMonthAlarmNumber == '0' && part231Data.busThirdMonthAlarmNumber == '0'}" />
        <c:set var="part1ChartTableTour"
          value="${part231Data.tourFirstMonthAlarmNumber == '0' && part231Data.tourSecondMonthAlarmNumber == '0' && part231Data.tourThirdMonthAlarmNumber == '0'}" />
        <c:set var="part1ChartTableDanger"
          value="${part231Data.dangerFirstMonthAlarmNumber == '0' && part231Data.dangerSecondMonthAlarmNumber == '0' && part231Data.dangerThirdMonthAlarmNumber == '0'}" /> -->

        <table class="img-table" border="1">
          <tr>
            <td></td>
            <td>{{ data.firstMonthName }}</td>
            <td>{{ data.secondMonthName }}</td>
            <td>{{ data.thirdMonthName }}</td>
          </tr>
          <!-- <c:if v-if="!part1ChartTableBus" -->
          <tr v-if="!part1ChartTableBus">
            <td>班线客运</td>
            <td>{{ part231Data.busFirstMonthAlarmNumber }}</td>
            <td>{{ part231Data.busSecondMonthAlarmNumber }}</td>
            <td>{{ part231Data.busThirdMonthAlarmNumber }}</td>
          </tr>
          <!-- </c:if> -->
          <!-- <c:if v-if="!part1ChartTableTour" -->
          <tr v-if="!part1ChartTableTour">
            <td>旅游客运</td>
            <td>{{ part231Data.tourFirstMonthAlarmNumber }}</td>
            <td>{{ part231Data.tourSecondMonthAlarmNumber }}</td>
            <td>{{ part231Data.tourThirdMonthAlarmNumber }}</td>
          </tr>
          <!-- </c:if> -->
          <!-- <c:if v-if="!part1ChartTableDanger" -->
          <tr v-if="!part1ChartTableDanger">
            <td>危运</td>
            <td>{{ part231Data.dangerFirstMonthAlarmNumber }}</td>
            <td>{{ part231Data.dangerSecondMonthAlarmNumber }}</td>
            <td>{{ part231Data.dangerThirdMonthAlarmNumber }}</td>
          </tr>
          <!-- </c:if> -->
          <tr>
            <td>合计</td>
            <td>{{ part231Data.firstMonthTotalAlarmNumber }}</td>
            <td>{{ part231Data.secondMonthTotalAlarmNumber }}</td>
            <td>{{ part231Data.thirdMonthTotalAlarmNumber }}</td>
          </tr>
        </table>
      </div>
      <p class="textStyle margin-tm text-in">
        {{ part232DataInfo }}
      </p>
      <div class="echartWrapper margin-tm h400" id="chartContainer6"></div>
      <div class="tableWrapperList">
        <!-- <c:set var="part2ChartTableBus"
          value="${part232Data.busFirstMonthAlarmNumber == '0' && part232Data.busSecondMonthAlarmNumber == '0' && part232Data.busThirdMonthAlarmNumber == '0'}" />
        <c:set var="part2ChartTableTour"
          value="${part232Data.tourFirstMonthAlarmNumber == '0' && part232Data.tourSecondMonthAlarmNumber == '0' && part232Data.tourThirdMonthAlarmNumber == '0'}" />
        <c:set var="part2ChartTableDanger"
          value="${part232Data.dangerFirstMonthAlarmNumber == '0' && part232Data.dangerSecondMonthAlarmNumber == '0' && part232Data.dangerThirdMonthAlarmNumber == '0'}" /> -->

        <table class="img-table" border="1">
          <tr>
            <td></td>
            <td>{{ data.firstMonthName }}</td>
            <td>{{ data.secondMonthName }}</td>
            <td>{{ data.thirdMonthName }}</td>
          </tr>
          <!-- <c:if v-if="!part2ChartTableBus" -->
          <tr v-if="!part2ChartTableBus">
            <td>班线客运</td>
            <td>{{ part232Data.busFirstMonthAlarmNumber }}</td>
            <td>{{ part232Data.busSecondMonthAlarmNumber }}</td>
            <td>{{ part232Data.busThirdMonthAlarmNumber }}</td>
          </tr>
          <!-- </c:if> -->
          <!-- <c:if v-if="!part2ChartTableTour" -->
          <tr v-if="!part2ChartTableTour">
            <td>旅游客运</td>
            <td>{{ part232Data.tourFirstMonthAlarmNumber }}</td>
            <td>{{ part232Data.tourSecondMonthAlarmNumber }}</td>
            <td>{{ part232Data.tourThirdMonthAlarmNumber }}</td>
          </tr>
          <!-- </c:if> -->
          <!-- <c:if v-if="!part2ChartTableDanger" -->
          <tr v-if="!part2ChartTableDanger">
            <td>危运</td>
            <td>{{ part232Data.dangerFirstMonthAlarmNumber }}</td>
            <td>{{ part232Data.dangerSecondMonthAlarmNumber }}</td>
            <td>{{ part232Data.dangerThirdMonthAlarmNumber }}</td>
          </tr>
          <!-- </c:if> -->
          <tr>
            <td>合计</td>
            <td>{{ part232Data.firstMonthTotalAlarmNumber }}</td>
            <td>{{ part232Data.secondMonthTotalAlarmNumber }}</td>
            <td>{{ part232Data.thirdMonthTotalAlarmNumber }}</td>
          </tr>
        </table>
      </div>
      <p class="textStyle margin-tm text-in">
        {{ part233DataInfo }}
      </p>
      <div class="echartWrapper margin-tm h400" id="chartContainer7"></div>
      <div class="tableWrapperList">
        <!-- <c:set var="part3ChartTableBus"
          value="${part233Data.busFirstMonthAlarmNumber == '0' && part233Data.busSecondMonthAlarmNumber == '0' && part233Data.busThirdMonthAlarmNumber == '0'}" />
        <c:set var="part3ChartTableTour"
          value="${part233Data.tourFirstMonthAlarmNumber == '0' && part233Data.tourSecondMonthAlarmNumber == '0' && part233Data.tourThirdMonthAlarmNumber == '0'}" />
        <c:set var="part3ChartTableDanger"
          value="${part233Data.dangerFirstMonthAlarmNumber == '0' && part233Data.dangerSecondMonthAlarmNumber == '0' && part233Data.dangerThirdMonthAlarmNumber == '0'}" /> -->

        <table class="img-table" border="1">
          <tr>
            <td></td>
            <td>{{ data.firstMonthName }}</td>
            <td>{{ data.secondMonthName }}</td>
            <td>{{ data.thirdMonthName }}</td>
          </tr>
          <!-- <c:if v-if="!part3ChartTableBus" -->
          <tr v-if="!part3ChartTableBus">
            <td>班线客运</td>
            <td>{{ part233Data.busFirstMonthAlarmNumber }}</td>
            <td>{{ part233Data.busSecondMonthAlarmNumber }}</td>
            <td>{{ part233Data.busThirdMonthAlarmNumber }}</td>
          </tr>
          <!-- </c:if> -->
          <!-- <c:if v-if="!part3ChartTableTour" -->
          <tr v-if="!part3ChartTableTour">
            <td>旅游客运</td>
            <td>{{ part233Data.tourFirstMonthAlarmNumber }}</td>
            <td>{{ part233Data.tourSecondMonthAlarmNumber }}</td>
            <td>{{ part233Data.tourThirdMonthAlarmNumber }}</td>
          </tr>
          <!-- </c:if> -->
          <!-- <c:if v-if="!part3ChartTableDanger" -->
          <tr v-if="!part3ChartTableDanger">
            <td>危运</td>
            <td>{{ part233Data.dangerFirstMonthAlarmNumber }}</td>
            <td>{{ part233Data.dangerSecondMonthAlarmNumber }}</td>
            <td>{{ part233Data.dangerThirdMonthAlarmNumber }}</td>
          </tr>
          <!-- </c:if> -->
          <tr>
            <td>合计</td>
            <td>{{ part233Data.firstMonthTotalAlarmNumber }}</td>
            <td>{{ part233Data.secondMonthTotalAlarmNumber }}</td>
            <td>{{ part233Data.thirdMonthTotalAlarmNumber }}</td>
          </tr>
        </table>
      </div>
      <p class="textStyle margin-tm text-in">
        {{ part234DataInfo }}
      </p>
      <div class="echartWrapper margin-tm h400" id="chartContainer8"></div>
      <div class="tableWrapperList">
        <!-- <c:set var="part4ChartTableBus"
          value="${part234Data.busFirstMonthAlarmNumber == '0' && part234Data.busSecondMonthAlarmNumber == '0' && part234Data.busThirdMonthAlarmNumber == '0'}" />
        <c:set var="part4ChartTableTour"
          value="${part234Data.tourFirstMonthAlarmNumber == '0' && part234Data.tourSecondMonthAlarmNumber == '0' && part234Data.tourThirdMonthAlarmNumber == '0'}" />
        <c:set var="part4ChartTableDanger"
          value="${part234Data.dangerFirstMonthAlarmNumber == '0' && part234Data.dangerSecondMonthAlarmNumber == '0' && part234Data.dangerThirdMonthAlarmNumber == '0'}" /> -->

        <table class="img-table" border="1">
          <tr>
            <td></td>
            <td>{{ data.firstMonthName }}</td>
            <td>{{ data.secondMonthName }}</td>
            <td>{{ data.thirdMonthName }}</td>
          </tr>
          <!-- <c:if v-if="!part4ChartTableBus" -->
          <tr v-if="!part4ChartTableBus">
            <td>班线客运</td>
            <td>{{ part234Data.busFirstMonthAlarmNumber }}</td>
            <td>{{ part234Data.busSecondMonthAlarmNumber }}</td>
            <td>{{ part234Data.busThirdMonthAlarmNumber }}</td>
          </tr>
          <!-- </c:if> -->
          <!-- <c:if v-if="!part4ChartTableTour" -->
          <tr v-if="!part4ChartTableTour">
            <td>旅游客运</td>
            <td>{{ part234Data.tourFirstMonthAlarmNumber }}</td>
            <td>{{ part234Data.tourSecondMonthAlarmNumber }}</td>
            <td>{{ part234Data.tourThirdMonthAlarmNumber }}</td>
          </tr>
          <!-- </c:if> -->
          <!-- <c:if v-if="!part4ChartTableDanger" -->
          <tr v-if="!part4ChartTableDanger">
            <td>危运</td>
            <td>{{ part234Data.dangerFirstMonthAlarmNumber }}</td>
            <td>{{ part234Data.dangerSecondMonthAlarmNumber }}</td>
            <td>{{ part234Data.dangerThirdMonthAlarmNumber }}</td>
          </tr>
          <!-- </c:if> -->
          <tr>
            <td>合计</td>
            <td>{{ part234Data.firstMonthTotalAlarmNumber }}</td>
            <td>{{ part234Data.secondMonthTotalAlarmNumber }}</td>
            <td>{{ part234Data.thirdMonthTotalAlarmNumber }}</td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 列表页2.4 -->
    <div class="fullpage" id="text5">
      <h4>2.4 全市违规报警排名情况</h4>
      <h4 style="margin-top: 20px">2.4.1区所报警排名情况</h4>
      <!--表格1-->
      <div class="tableWrapperList" style="width: 100%; margin-left: 0%">
        <header>全市违规报警情况综合排名表</header>
        <table border="2" class="fontSmall">
          <tr>
            <th>排名</th>
            <th>所属市（州）</th>
            <th>企业报警户数</th>
            <th>报警车辆数</th>
            <th>超速报警</th>
            <th>疲劳驾驶</th>
            <th>凌晨2-5点禁驾</th>
            <th>报警总次数</th>
            <th>报警均值</th>
          </tr>
          <!-- <c:forEach v-for="item in part241Data.allVehicleAlarmRankingInfos" var="item"> -->
          <tr v-for="item in part241Data.allVehicleAlarmRankingInfos">
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyNumber }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.speedingAlarmNumber }}</td>
            <td>{{ item.fatigueAlarmNumber }}</td>
            <td>{{ item.t25AlarmNumber }}</td>
            <td>{{ item.totalAlarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <tr>
            <td colspan="2">小计</td>
            <td>{{ part241Data.allVehicleAlarmRankingInfosSum.companyNumber }}</td>
            <td>{{ part241Data.allVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
            <td>{{ part241Data.allVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
            <td>{{ part241Data.allVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>
            <td>{{ part241Data.allVehicleAlarmRankingInfosSum.t25AlarmNumber }}</td>
            <td>{{ part241Data.allVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
            <td>{{ part241Data.allVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
          </tr>
        </table>
      </div>
      <!--表格2-->
      <div class="tableWrapperList" style="width: 100%; margin-left: 0%">
        <header>全市重点营运车辆违规报警情况排名表</header>
        <table border="2" class="fontSmall">
          <tr>
            <th>排名</th>
            <th>所属市（州）</th>
            <th>企业报警户数</th>
            <th>报警车辆数</th>
            <th>超速报警</th>
            <th>疲劳驾驶</th>
            <th>凌晨2-5点禁驾</th>
            <th>报警总次数</th>
            <th>报警均值</th>
          </tr>
          <!-- <c:forEach v-for="item in part241Data.importantVehicleAlarmRankingInfos" var="item"> -->
          <tr v-for="item in part241Data.importantVehicleAlarmRankingInfos">
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyNumber }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.speedingAlarmNumber }}</td>
            <td>{{ item.fatigueAlarmNumber }}</td>
            <td>{{ item.t25AlarmNumber }}</td>
            <td>{{ item.totalAlarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <tr>
            <td colspan="2">小计</td>
            <td>{{ part241Data.importantVehicleAlarmRankingInfosSum.companyNumber }}</td>
            <td>{{ part241Data.importantVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
            <td>{{ part241Data.importantVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
            <td>{{ part241Data.importantVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>
            <td>{{ part241Data.importantVehicleAlarmRankingInfosSum.t25AlarmNumber }}</td>
            <td>{{ part241Data.importantVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
            <td>{{ part241Data.importantVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
          </tr>
        </table>
      </div>
      <!--表格3-->
      <!-- <c:if
         v-if="part241Data.busVehicleAlarmRankingInfos != null && part241Data.busVehicleAlarmRankingInfos.length >0 "> -->
      <div v-if="part241Data.busVehicleAlarmRankingInfos != null && part241Data.busVehicleAlarmRankingInfos.length > 0"
        class="
                tableWrapperList" style="width: 100%; margin-left: 0%">
        <header>全市班线客运车辆违规报警情况排名表</header>
        <table border="2" class="fontSmall">
          <tr>
            <th>排名</th>
            <th>所属市（州）</th>
            <th>企业报警户数</th>
            <th>报警车辆数</th>
            <th>超速报警</th>
            <th>疲劳驾驶</th>
            <th>凌晨2-5点禁驾</th>
            <th>报警总次数</th>
            <th>报警均值</th>
          </tr>
          <!-- <c:forEach v-for="item in part241Data.busVehicleAlarmRankingInfos" var="item"> -->
          <tr v-for="item in part241Data.busVehicleAlarmRankingInfos">
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyNumber }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.speedingAlarmNumber }}</td>
            <td>{{ item.fatigueAlarmNumber }}</td>
            <td>{{ item.t25AlarmNumber }}</td>
            <td>{{ item.totalAlarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <tr>
            <td colspan="2">小计</td>
            <td>{{ part241Data.busVehicleAlarmRankingInfosSum.companyNumber }}</td>
            <td>{{ part241Data.busVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
            <td>{{ part241Data.busVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
            <td>{{ part241Data.busVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>
            <td>{{ part241Data.busVehicleAlarmRankingInfosSum.t25AlarmNumber }}</td>
            <td>{{ part241Data.busVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
            <td>{{ part241Data.busVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
          </tr>
        </table>
      </div>
      <!-- </c:if> -->
      <!--表格4-->
      <!-- <c:if
         v-if="part241Data.tourVehicleAlarmRankingInfos != null && part241Data.tourVehicleAlarmRankingInfos.length >0 "> -->
      <div v-if="part241Data.tourVehicleAlarmRankingInfos != null && part241Data.tourVehicleAlarmRankingInfos.length > 0"
        class="tableWrapperList" style="width: 100%; margin-left: 0%">
        <header>全市旅游客运车辆违规报警情况排名表</header>
        <table border="2" class="fontSmall">
          <tr>
            <th>排名</th>
            <th>所属市（州）</th>
            <th>企业报警户数</th>
            <th>报警车辆数</th>
            <th>超速报警</th>
            <th>疲劳驾驶</th>
            <th>凌晨2-5点禁驾</th>
            <th>报警总次数</th>
            <th>报警均值</th>
          </tr>
          <!-- <c:forEach v-for="item in part241Data.tourVehicleAlarmRankingInfos" var="item"> -->
          <tr v-for="item in part241Data.tourVehicleAlarmRankingInfos">
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyNumber }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.speedingAlarmNumber }}</td>
            <td>{{ item.fatigueAlarmNumber }}</td>
            <td>{{ item.t25AlarmNumber }}</td>
            <td>{{ item.totalAlarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <tr>
            <td colspan="2">小计</td>
            <td>{{ part241Data.tourVehicleAlarmRankingInfosSum.companyNumber }}</td>
            <td>{{ part241Data.tourVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
            <td>{{ part241Data.tourVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
            <td>{{ part241Data.tourVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>
            <td>{{ part241Data.tourVehicleAlarmRankingInfosSum.t25AlarmNumber }}</td>
            <td>{{ part241Data.tourVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
            <td>{{ part241Data.tourVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
          </tr>
        </table>
      </div>
      <!-- </c:if> -->
      <!--表格5-->
      <!-- <c:if
         v-if="part241Data.dangerVehicleAlarmRankingInfos != null && part241Data.dangerVehicleAlarmRankingInfos.length >0 "> -->
      <div
        v-if="part241Data.dangerVehicleAlarmRankingInfos != null && part241Data.dangerVehicleAlarmRankingInfos.length > 0"
        class="tableWrapperList" style="width: 100%; margin-left: 0%">
        <header>全市危险品运输车辆违规报警情况排名表</header>
        <table border="2" class="fontSmall">
          <tr>
            <th>排名</th>
            <th>所属市（州）</th>
            <th>企业报警户数</th>
            <th>报警车辆数</th>
            <th>超速报警</th>
            <th>疲劳驾驶</th>

            <th>报警总次数</th>
            <th>报警均值</th>
          </tr>
          <!-- <c:forEach v-for="item in part241Data.dangerVehicleAlarmRankingInfos" var="item"> -->
          <tr v-for="item in part241Data.dangerVehicleAlarmRankingInfos">
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyNumber }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.speedingAlarmNumber }}</td>
            <td>{{ item.fatigueAlarmNumber }}</td>

            <td>{{ item.totalAlarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <tr>
            <td colspan="2">小计</td>
            <td>{{ part241Data.dangerVehicleAlarmRankingInfosSum.companyNumber }}</td>
            <td>{{ part241Data.dangerVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
            <td>{{ part241Data.dangerVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
            <td>{{ part241Data.dangerVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>

            <td>{{ part241Data.dangerVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
            <td>{{ part241Data.dangerVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
          </tr>
        </table>
      </div>
      <!-- </c:if> -->
      <!--表格6-->
      <!-- <c:if
         v-if="part241Data.goodsVehicleAlarmRankingInfos != null && part241Data.goodsVehicleAlarmRankingInfos.length >0 "> -->
      <div
        v-if="part241Data.goodsVehicleAlarmRankingInfos != null && part241Data.goodsVehicleAlarmRankingInfos.length > 0"
        class="tableWrapperList" style="width: 100%; margin-left: 0%">
        <header>全市普通货物运输车辆违规报警情况排名表</header>
        <table border="2" class="fontSmall">
          <tr>
            <th>排名</th>
            <th>所属市（州）</th>
            <th>企业报警户数</th>
            <th>报警车辆数</th>
            <th>超速报警</th>
            <th>疲劳驾驶</th>

            <th>报警总次数</th>
            <th>报警均值</th>
          </tr>
          <!-- <c:forEach v-for="item in part241Data.goodsVehicleAlarmRankingInfos" var="item"> -->
          <tr v-for="item in part241Data.goodsVehicleAlarmRankingInfos">
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyNumber }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.speedingAlarmNumber }}</td>
            <td>{{ item.fatigueAlarmNumber }}</td>

            <td>{{ item.totalAlarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <tr>
            <td colspan="2">小计</td>
            <td>{{ part241Data.goodsVehicleAlarmRankingInfosSum.companyNumber }}</td>
            <td>{{ part241Data.goodsVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
            <td>{{ part241Data.goodsVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
            <td>{{ part241Data.goodsVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>

            <td>{{ part241Data.goodsVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
            <td>{{ part241Data.goodsVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
          </tr>
        </table>
      </div>
      <!-- </c:if> -->
    </div>
    <!--列表页2.4.2-->
    <div class="fullpage" id="text6">
      <h4>2.4.2运输企业报警排名情况</h4>
      <!--表格1-->
      <!-- <c:if test="${part242Data.busCompanyAlarmRanking.speedingAlarmRankings.length >0
         || part242Data.busCompanyAlarmRanking.tiredAlarmRankings.length >0
         || part242Data.busCompanyAlarmRanking.t25AlarmRankings.length >0}"> -->
      <div v-if="part242Data.busCompanyAlarmRanking.speedingAlarmRankings.length > 0
        || part242Data.busCompanyAlarmRanking.tiredAlarmRankings.length > 0
        || part242Data.busCompanyAlarmRanking.t25AlarmRankings.length > 0" class="tableWrapperList"
        style="width: 100%; margin-left: 0%">
        <header>班线客运企业违规报警排名</header>
        <table border="2" class="fontSmall">
          <tr>
            <th>报警类型</th>
            <th>排名</th>
            <th>所属区</th>
            <th>企业名称</th>
            <th>报警车辆台数</th>
            <th>报警次数</th>
            <th>报警均值</th>
          </tr>
          <!-- <c:if
               v-if="part242Data.busCompanyAlarmRanking.speedingAlarmRankings!=null && part242Data.busCompanyAlarmRanking.speedingAlarmRankings.length >0 "> -->
          <!-- <c:forEach v-for="item,index in part242Data.busCompanyAlarmRanking.speedingAlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part242Data.busCompanyAlarmRanking.speedingAlarmRankings != null && part242Data.busCompanyAlarmRanking.speedingAlarmRankings.length > 0"
            v-for="item, index in part242Data.busCompanyAlarmRanking.speedingAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part242Data.busCompanyAlarmRanking.speedingAlarmRankings.length">
              {{ part242Data.busCompanyAlarmRanking.speedingAlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.alarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
          <!-- <c:if
               v-if="part242Data.busCompanyAlarmRanking.tiredAlarmRankings!=null && part242Data.busCompanyAlarmRanking.tiredAlarmRankings.length >0 ">
              <c:forEach v-for="item in part242Data.busCompanyAlarmRanking.tiredAlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part242Data.busCompanyAlarmRanking.tiredAlarmRankings != null && part242Data.busCompanyAlarmRanking.tiredAlarmRankings.length > 0"
            v-for="item, index in part242Data.busCompanyAlarmRanking.tiredAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part242Data.busCompanyAlarmRanking.tiredAlarmRankings.length">
              {{ part242Data.busCompanyAlarmRanking.tiredAlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.alarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
          <!-- <c:if
               v-if="part242Data.busCompanyAlarmRanking.t25AlarmRankings!=null && part242Data.busCompanyAlarmRanking.t25AlarmRankings.length >0 ">
              <c:forEach v-for="item in part242Data.busCompanyAlarmRanking.t25AlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part242Data.busCompanyAlarmRanking.t25AlarmRankings != null && part242Data.busCompanyAlarmRanking.t25AlarmRankings.length > 0"
            v-for="item, index in part242Data.busCompanyAlarmRanking.t25AlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part242Data.busCompanyAlarmRanking.t25AlarmRankings.length">
              {{ part242Data.busCompanyAlarmRanking.t25AlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.alarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
        </table>
      </div>
      <!-- </c:if> -->
      <!--表格2-->
      <!-- <c:if test="${part242Data.tourCompanyAlarmRanking.speedingAlarmRankings.length >0
         || part242Data.tourCompanyAlarmRanking.tiredAlarmRankings.length >0
         || part242Data.tourCompanyAlarmRanking.t25AlarmRankings.length >0}"> -->
      <div v-if="part242Data.tourCompanyAlarmRanking.speedingAlarmRankings.length > 0
        || part242Data.tourCompanyAlarmRanking.tiredAlarmRankings.length > 0
        || part242Data.tourCompanyAlarmRanking.t25AlarmRankings.length > 0" class="tableWrapperList"
        style="width: 100%; margin-left: 0%">
        <header>旅游客运企业违规报警排名</header>
        <table border="2" class="fontSmall">
          <tr>
            <th>报警类型</th>
            <th>排名</th>
            <th>所属区</th>
            <th>企业名称</th>
            <th>报警车辆台数</th>
            <th>报警次数</th>
            <th>报警均值</th>
          </tr>
          <!-- <c:if
               v-if="part242Data.tourCompanyAlarmRanking.speedingAlarmRankings!=null && part242Data.tourCompanyAlarmRanking.speedingAlarmRankings.length >0 ">
              <c:forEach v-for="item in part242Data.tourCompanyAlarmRanking.speedingAlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part242Data.tourCompanyAlarmRanking.speedingAlarmRankings != null && part242Data.tourCompanyAlarmRanking.speedingAlarmRankings.length > 0"
            v-for="item, index in part242Data.tourCompanyAlarmRanking.speedingAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part242Data.tourCompanyAlarmRanking.speedingAlarmRankings.length">
              {{ part242Data.tourCompanyAlarmRanking.speedingAlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.alarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
          <!-- <c:if
               v-if="part242Data.tourCompanyAlarmRanking.tiredAlarmRankings!=null && part242Data.tourCompanyAlarmRanking.tiredAlarmRankings.length >0 ">
              <c:forEach v-for="item in part242Data.tourCompanyAlarmRanking.tiredAlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part242Data.tourCompanyAlarmRanking.tiredAlarmRankings != null && part242Data.tourCompanyAlarmRanking.tiredAlarmRankings.length > 0"
            v-for="item, index in part242Data.tourCompanyAlarmRanking.tiredAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part242Data.tourCompanyAlarmRanking.tiredAlarmRankings.length">
              {{ part242Data.tourCompanyAlarmRanking.tiredAlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.alarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
          <!-- <c:if
               v-if="part242Data.tourCompanyAlarmRanking.t25AlarmRankings!=null && part242Data.tourCompanyAlarmRanking.t25AlarmRankings.length >0 ">
              <c:forEach v-for="item in part242Data.tourCompanyAlarmRanking.t25AlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part242Data.tourCompanyAlarmRanking.t25AlarmRankings != null && part242Data.tourCompanyAlarmRanking.t25AlarmRankings.length > 0"
            v-for="item, index in part242Data.tourCompanyAlarmRanking.t25AlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part242Data.tourCompanyAlarmRanking.t25AlarmRankings.length">
              {{ part242Data.tourCompanyAlarmRanking.t25AlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.alarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
        </table>
      </div>
      <!-- </c:if> -->

      <!--表格3-->
      <!-- <c:if test="${part242Data.dangerCompanyAlarmRanking.speedingAlarmRankings.length >0
         || part242Data.dangerCompanyAlarmRanking.tiredAlarmRankings.length >0
         || part242Data.dangerCompanyAlarmRanking.t25AlarmRankings.length >0}"> -->
      <div v-if="part242Data.dangerCompanyAlarmRanking.speedingAlarmRankings.length > 0
        || part242Data.dangerCompanyAlarmRanking.tiredAlarmRankings.length > 0
        || part242Data.dangerCompanyAlarmRanking.t25AlarmRankings.length > 0" class="tableWrapperList"
        style="width: 100%; margin-left: 0%">
        <header>危险品运输企业违规报警排名</header>
        <table border="2" class="fontSmall">
          <tr>
            <th>报警类型</th>
            <th>排名</th>
            <th>所属区</th>
            <th>企业名称</th>
            <th>报警车辆台数</th>
            <th>报警次数</th>
            <th>报警均值</th>
          </tr>
          <!-- <c:if
               v-if="part242Data.dangerCompanyAlarmRanking.speedingAlarmRankings!=null && part242Data.dangerCompanyAlarmRanking.speedingAlarmRankings.length >0 ">
              <c:forEach v-for="item in part242Data.dangerCompanyAlarmRanking.speedingAlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part242Data.dangerCompanyAlarmRanking.speedingAlarmRankings != null && part242Data.dangerCompanyAlarmRanking.speedingAlarmRankings.length > 0"
            v-for="item, index in part242Data.dangerCompanyAlarmRanking.speedingAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part242Data.dangerCompanyAlarmRanking.speedingAlarmRankings.length">
              {{ part242Data.dangerCompanyAlarmRanking.speedingAlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.alarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
          <!-- <c:if
               v-if="part242Data.dangerCompanyAlarmRanking.tiredAlarmRankings!=null && part242Data.dangerCompanyAlarmRanking.tiredAlarmRankings.length >0 ">
              <c:forEach v-for="item in part242Data.dangerCompanyAlarmRanking.tiredAlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part242Data.dangerCompanyAlarmRanking.tiredAlarmRankings != null && part242Data.dangerCompanyAlarmRanking.tiredAlarmRankings.length > 0"
            v-for="item, index in part242Data.dangerCompanyAlarmRanking.tiredAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part242Data.dangerCompanyAlarmRanking.tiredAlarmRankings.length">
              {{ part242Data.dangerCompanyAlarmRanking.tiredAlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.alarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
          <!-- <c:if
               v-if="part242Data.dangerCompanyAlarmRanking.t25AlarmRankings!=null && part242Data.dangerCompanyAlarmRanking.t25AlarmRankings.length >0 ">
              <c:forEach v-for="item in part242Data.dangerCompanyAlarmRanking.t25AlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part242Data.dangerCompanyAlarmRanking.t25AlarmRankings != null && part242Data.dangerCompanyAlarmRanking.t25AlarmRankings.length > 0"
            v-for="item, index in part242Data.dangerCompanyAlarmRanking.t25AlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part242Data.dangerCompanyAlarmRanking.t25AlarmRankings.length">
              {{ part242Data.dangerCompanyAlarmRanking.t25AlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.alarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
        </table>
      </div>
      <!-- </c:if> -->

      <!--表格4-->
      <!-- <c:if test="${part242Data.goodsCompanyAlarmRanking.speedingAlarmRankings.length >0
         || part242Data.goodsCompanyAlarmRanking.tiredAlarmRankings.length >0
         || part242Data.goodsCompanyAlarmRanking.t25AlarmRankings.length >0}"> -->
      <div v-if="part242Data.goodsCompanyAlarmRanking.speedingAlarmRankings.length > 0
        || part242Data.goodsCompanyAlarmRanking.tiredAlarmRankings.length > 0
        || part242Data.goodsCompanyAlarmRanking.t25AlarmRankings.length > 0" class="tableWrapperList"
        style="width: 100%; margin-left: 0%">
        <header>普通货物运输企业违规报警排名</header>
        <table border="2" class="fontSmall">
          <tr>
            <th>报警类型</th>
            <th>排名</th>
            <th>所属区</th>
            <th>企业名称</th>
            <th>报警车辆台数</th>
            <th>报警次数</th>
            <th>报警均值</th>
          </tr>
          <!-- <c:if
               v-if="part242Data.goodsCompanyAlarmRanking.speedingAlarmRankings!=null && part242Data.goodsCompanyAlarmRanking.speedingAlarmRankings.length >0 ">
              <c:forEach v-for="item in part242Data.goodsCompanyAlarmRanking.speedingAlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part242Data.goodsCompanyAlarmRanking.speedingAlarmRankings != null && part242Data.goodsCompanyAlarmRanking.speedingAlarmRankings.length > 0"
            v-for="item, index in part242Data.goodsCompanyAlarmRanking.speedingAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part242Data.goodsCompanyAlarmRanking.speedingAlarmRankings.length">
              {{ part242Data.goodsCompanyAlarmRanking.speedingAlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.alarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
          <!-- <c:if
               v-if="part242Data.goodsCompanyAlarmRanking.tiredAlarmRankings!=null && part242Data.goodsCompanyAlarmRanking.tiredAlarmRankings.length >0 ">
              <c:forEach v-for="item in part242Data.goodsCompanyAlarmRanking.tiredAlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part242Data.goodsCompanyAlarmRanking.tiredAlarmRankings != null && part242Data.goodsCompanyAlarmRanking.tiredAlarmRankings.length > 0"
            v-for="item, index in part242Data.goodsCompanyAlarmRanking.tiredAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part242Data.goodsCompanyAlarmRanking.tiredAlarmRankings.length">
              {{ part242Data.goodsCompanyAlarmRanking.tiredAlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.alarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
          <!-- <c:if
               v-if="part242Data.goodsCompanyAlarmRanking.t25AlarmRankings!=null && part242Data.goodsCompanyAlarmRanking.t25AlarmRankings.length >0 ">
              <c:forEach v-for="item in part242Data.goodsCompanyAlarmRanking.t25AlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part242Data.goodsCompanyAlarmRanking.t25AlarmRankings != null && part242Data.goodsCompanyAlarmRanking.t25AlarmRankings.length > 0"
            v-for="item, index in part242Data.goodsCompanyAlarmRanking.t25AlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part242Data.goodsCompanyAlarmRanking.t25AlarmRankings.length">
              {{ part242Data.goodsCompanyAlarmRanking.t25AlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.alarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
        </table>
      </div>
      <!-- </c:if> -->
    </div>
    <!--列表页2.4.3-->
    <div class="fullpage" id="text7">
      <h4>2.4.3营运车辆违规报警排名情况</h4>
      <p>以下为排名前十的车辆</p>
      <!--表格1-->
      <!-- <c:if test="${part243Data.busVehicleAlarmRanking.speedingAlarmRankings.length >0
         || part243Data.busVehicleAlarmRanking.tiredAlarmRankings.length >0
         || part243Data.busVehicleAlarmRanking.t25AlarmRankings.length >0}"> -->
      <div v-if="part243Data.busVehicleAlarmRanking.speedingAlarmRankings.length > 0
        || part243Data.busVehicleAlarmRanking.tiredAlarmRankings.length > 0
        || part243Data.busVehicleAlarmRanking.t25AlarmRankings.length > 0" class="tableWrapperList"
        style="width: 100%; margin-left: 0%">
        <header>班线客运车辆违规报警排名</header>
        <table border="2" class="fontSmall">
          <tr>
            <th>报警类型</th>
            <th>排名</th>
            <th>所属区</th>
            <th>企业名称</th>
            <th>车牌号</th>
            <th>报警次数</th>
          </tr>
          <!-- <c:if
               v-if="part243Data.busVehicleAlarmRanking.speedingAlarmRankings!=null && part243Data.busVehicleAlarmRanking.speedingAlarmRankings.length >0 ">
              <c:forEach v-for="item in part243Data.busVehicleAlarmRanking.speedingAlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part243Data.busVehicleAlarmRanking.speedingAlarmRankings != null && part243Data.busVehicleAlarmRanking.speedingAlarmRankings.length > 0"
            v-for="item, index in part243Data.busVehicleAlarmRanking.speedingAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part243Data.busVehicleAlarmRanking.speedingAlarmRankings.length">
              {{ part243Data.busVehicleAlarmRanking.speedingAlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehiclePlateNum }}</td>
            <td>{{ item.alarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
          <!-- <c:if
               v-if="part243Data.busVehicleAlarmRanking.tiredAlarmRankings!=null && part243Data.busVehicleAlarmRanking.tiredAlarmRankings.length >0 ">
              <c:forEach v-for="item in part243Data.busVehicleAlarmRanking.tiredAlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part243Data.busVehicleAlarmRanking.tiredAlarmRankings != null && part243Data.busVehicleAlarmRanking.tiredAlarmRankings.length > 0"
            v-for="item, index in part243Data.busVehicleAlarmRanking.tiredAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part243Data.busVehicleAlarmRanking.tiredAlarmRankings.length">
              {{ part243Data.busVehicleAlarmRanking.tiredAlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehiclePlateNum }}</td>
            <td>{{ item.alarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
          <!-- <c:if
               v-if="part243Data.busVehicleAlarmRanking.t25AlarmRankings!=null && part243Data.busVehicleAlarmRanking.t25AlarmRankings.length >0 ">
              <c:forEach v-for="item in part243Data.busVehicleAlarmRanking.t25AlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part243Data.busVehicleAlarmRanking.t25AlarmRankings != null && part243Data.busVehicleAlarmRanking.t25AlarmRankings.length > 0"
            v-for="item, index in part243Data.busVehicleAlarmRanking.t25AlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part243Data.busVehicleAlarmRanking.t25AlarmRankings.length">
              {{ part243Data.busVehicleAlarmRanking.t25AlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehiclePlateNum }}</td>
            <td>{{ item.alarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
        </table>
      </div>
      <!-- </c:if> -->
      <!--表格2-->
      <!-- <c:if test="${part243Data.tourVehicleAlarmRanking.speedingAlarmRankings.length >0
         || part243Data.tourVehicleAlarmRanking.tiredAlarmRankings.length >0
         || part243Data.tourVehicleAlarmRanking.t25AlarmRankings.length >0}"> -->
      <div v-if="part243Data.tourVehicleAlarmRanking.speedingAlarmRankings.length > 0
        || part243Data.tourVehicleAlarmRanking.tiredAlarmRankings.length > 0
        || part243Data.tourVehicleAlarmRanking.t25AlarmRankings.length > 0" class="tableWrapperList"
        style="width: 100%; margin-left: 0%">
        <header>旅游客运车辆违规报警排名</header>
        <table border="2" class="fontSmall">
          <tr>
            <th>报警类型</th>
            <th>排名</th>
            <th>所属区</th>
            <th>企业名称</th>
            <th>车牌号</th>
            <th>报警次数</th>
          </tr>
          <!-- <c:if
               v-if="part243Data.tourVehicleAlarmRanking.speedingAlarmRankings!=null && part243Data.tourVehicleAlarmRanking.speedingAlarmRankings.length >0 ">
              <c:forEach v-for="item in part243Data.tourVehicleAlarmRanking.speedingAlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part243Data.tourVehicleAlarmRanking.speedingAlarmRankings != null && part243Data.tourVehicleAlarmRanking.speedingAlarmRankings.length > 0"
            v-for="item, index in part243Data.tourVehicleAlarmRanking.speedingAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part243Data.tourVehicleAlarmRanking.speedingAlarmRankings.length">
              {{ part243Data.tourVehicleAlarmRanking.speedingAlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehiclePlateNum }}</td>
            <td>{{ item.alarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
          <!-- <c:if
               v-if="part243Data.tourVehicleAlarmRanking.tiredAlarmRankings!=null && part243Data.tourVehicleAlarmRanking.tiredAlarmRankings.length >0 ">
              <c:forEach v-for="item in part243Data.tourVehicleAlarmRanking.tiredAlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part243Data.tourVehicleAlarmRanking.tiredAlarmRankings != null && part243Data.tourVehicleAlarmRanking.tiredAlarmRankings.length > 0"
            v-for="item, index in part243Data.tourVehicleAlarmRanking.tiredAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part243Data.tourVehicleAlarmRanking.tiredAlarmRankings.length">
              {{ part243Data.tourVehicleAlarmRanking.tiredAlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehiclePlateNum }}</td>
            <td>{{ item.alarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
          <!-- <c:if
            v-if="part243Data.tourVehicleAlarmRanking.t25AlarmRankings != null && part243Data.tourVehicleAlarmRanking.t25AlarmRankings.length > 0">
            <c:forEach v-for="item in part243Data.tourVehicleAlarmRanking.t25AlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="part243Data.tourVehicleAlarmRanking.t25AlarmRankings != null && part243Data.tourVehicleAlarmRanking.t25AlarmRankings.length > 0"
            v-for="item, index in part243Data.tourVehicleAlarmRanking.t25AlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part243Data.tourVehicleAlarmRanking.t25AlarmRankings.length">
              {{ part243Data.tourVehicleAlarmRanking.t25AlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehiclePlateNum }}</td>
            <td>{{ item.alarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
        </table>
      </div>
      <!-- </c:if> -->
      <!--表格3-->
      <!-- <c:if test="${part243Data.dangerVehicleAlarmRanking.speedingAlarmRankings.length >0
           || part243Data.dangerVehicleAlarmRanking.tiredAlarmRankings.length >0
           || part243Data.dangerVehicleAlarmRanking.t25AlarmRankings.length >0}"> -->
      <div v-if="part243Data.dangerVehicleAlarmRanking.speedingAlarmRankings.length > 0
        || part243Data.dangerVehicleAlarmRanking.tiredAlarmRankings.length > 0
        || part243Data.dangerVehicleAlarmRanking.t25AlarmRankings.length > 0" class="tableWrapperList"
        style="width: 100%; margin-left: 0%">
        <header>危险品运输车辆违规报警排名</header>
        <table border="2" class="fontSmall">
          <tr>
            <th>报警类型</th>
            <th>排名</th>
            <th>所属区</th>
            <th>企业名称</th>
            <th>车牌号</th>
            <th>报警次数</th>
          </tr>
          <!-- <c:if
              v-if="part243Data.dangerVehicleAlarmRanking.speedingAlarmRankings != null && part243Data.dangerVehicleAlarmRanking.speedingAlarmRankings.length > 0">
              <c:forEach v-for="item in part243Data.dangerVehicleAlarmRanking.speedingAlarmRankings" var="item"
                varStatus="vs"> -->
          <tr
            v-if="part243Data.dangerVehicleAlarmRanking.speedingAlarmRankings != null && part243Data.dangerVehicleAlarmRanking.speedingAlarmRankings.length > 0"
            v-for="item, index in part243Data.dangerVehicleAlarmRanking.speedingAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part243Data.dangerVehicleAlarmRanking.speedingAlarmRankings.length">
              {{ part243Data.dangerVehicleAlarmRanking.speedingAlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehiclePlateNum }}</td>
            <td>{{ item.alarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
          <!-- <c:if
                v-if="part243Data.dangerVehicleAlarmRanking.tiredAlarmRankings != null && part243Data.dangerVehicleAlarmRanking.tiredAlarmRankings.length > 0">
                <c:forEach v-for="item in part243Data.dangerVehicleAlarmRanking.tiredAlarmRankings" var="item"
                  varStatus="vs"> -->
          <tr
            v-if="part243Data.dangerVehicleAlarmRanking.tiredAlarmRankings != null && part243Data.dangerVehicleAlarmRanking.tiredAlarmRankings.length > 0"
            v-for="item, index in part243Data.dangerVehicleAlarmRanking.tiredAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part243Data.dangerVehicleAlarmRanking.tiredAlarmRankings.length">
              {{ part243Data.dangerVehicleAlarmRanking.tiredAlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehiclePlateNum }}</td>
            <td>{{ item.alarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
          <!-- <c:if
                  v-if="part243Data.dangerVehicleAlarmRanking.t25AlarmRankings != null && part243Data.dangerVehicleAlarmRanking.t25AlarmRankings.length > 0">
                  <c:forEach v-for="item in part243Data.dangerVehicleAlarmRanking.t25AlarmRankings" var="item"
                    varStatus="vs"> -->
          <tr
            v-if="part243Data.dangerVehicleAlarmRanking.t25AlarmRankings != null && part243Data.dangerVehicleAlarmRanking.t25AlarmRankings.length > 0"
            v-for="item, index in part243Data.dangerVehicleAlarmRanking.t25AlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part243Data.dangerVehicleAlarmRanking.t25AlarmRankings.length">
              {{ part243Data.dangerVehicleAlarmRanking.t25AlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehiclePlateNum }}</td>
            <td>{{ item.alarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
        </table>
      </div>
      <!-- </c:if> -->
      <!--表格4-->
      <!-- <c:if test="${part243Data.goodsVehicleAlarmRanking.speedingAlarmRankings.length >0
           || part243Data.goodsVehicleAlarmRanking.tiredAlarmRankings.length >0
           || part243Data.goodsVehicleAlarmRanking.t25AlarmRankings.length >0}"> -->
      <div v-if="part243Data.goodsVehicleAlarmRanking.speedingAlarmRankings.length > 0
        || part243Data.goodsVehicleAlarmRanking.tiredAlarmRankings.length > 0
        || part243Data.goodsVehicleAlarmRanking.t25AlarmRankings.length > 0" class="tableWrapperList"
        style="width: 100%; margin-left: 0%">
        <header>普通货物运输车辆违规报警排名</header>
        <table border="2" class="fontSmall">
          <tr>
            <th>报警类型</th>
            <th>排名</th>
            <th>所属区</th>
            <th>企业名称</th>
            <th>车牌号</th>
            <th>报警次数</th>
          </tr>
          <!-- <c:if
                v-if="part243Data.goodsVehicleAlarmRanking.speedingAlarmRankings != null && part243Data.goodsVehicleAlarmRanking.speedingAlarmRankings.length > 0">
                <c:forEach v-for="item in part243Data.goodsVehicleAlarmRanking.speedingAlarmRankings" var="item"
                  varStatus="vs"> -->
          <tr
            v-if="part243Data.goodsVehicleAlarmRanking.speedingAlarmRankings != null && part243Data.goodsVehicleAlarmRanking.speedingAlarmRankings.length > 0"
            v-for="item, index in part243Data.goodsVehicleAlarmRanking.speedingAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part243Data.goodsVehicleAlarmRanking.speedingAlarmRankings.length">
              {{ part243Data.goodsVehicleAlarmRanking.speedingAlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehiclePlateNum }}</td>
            <td>{{ item.alarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
          <!-- <c:if
                  v-if="part243Data.goodsVehicleAlarmRanking.tiredAlarmRankings != null && part243Data.goodsVehicleAlarmRanking.tiredAlarmRankings.length > 0">
                  <c:forEach v-for="item in part243Data.goodsVehicleAlarmRanking.tiredAlarmRankings" var="item"
                    varStatus="vs"> -->
          <tr
            v-if="part243Data.goodsVehicleAlarmRanking.tiredAlarmRankings != null && part243Data.goodsVehicleAlarmRanking.tiredAlarmRankings.length > 0"
            v-for="item, index in part243Data.goodsVehicleAlarmRanking.tiredAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part243Data.goodsVehicleAlarmRanking.tiredAlarmRankings.length">
              {{ part243Data.goodsVehicleAlarmRanking.tiredAlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehiclePlateNum }}</td>
            <td>{{ item.alarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
          <!-- <c:if
                  v-if="part243Data.goodsVehicleAlarmRanking.t25AlarmRankings!=null && part243Data.goodsVehicleAlarmRanking.t25AlarmRankings.length >0 ">
                  <c:forEach v-for="item,index in part243Data.goodsVehicleAlarmRanking.t25AlarmRankings" var="item"
                    varStatus="vs"> -->
          <tr
            v-if="part243Data.goodsVehicleAlarmRanking.t25AlarmRankings != null && part243Data.goodsVehicleAlarmRanking.t25AlarmRankings.length > 0"
            v-for="item, index in part243Data.goodsVehicleAlarmRanking.t25AlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="part243Data.goodsVehicleAlarmRanking.t25AlarmRankings.length">
              {{ part243Data.goodsVehicleAlarmRanking.t25AlarmTypeName }}</td>
            <!-- </c:if> -->
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.vehiclePlateNum }}</td>
            <td>{{ item.alarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <!-- </c:if> -->
        </table>
      </div>
      <!-- </c:if> -->
      <!--表格5-->

      <p class="textStyle margin-tm text-in">
        {{ data.summaryReportStatisticalYear }}年{{ data.summaryReportStatisticalMonth }}月期间，车安达第三方监测平台共计处理违规报警事件{{
          part2Data.handlingAlarmNumber }}起。针对疲劳驾驶、超速行驶、夜间2-5点禁驾等报警，系统自动处理（APP推送和TTS语音）{{
    part2Data.systemHandlingAlarmNumber }}起，人工核实{{ part2Data.manualVerifyAlarmNumber }}起，1分钟内自动纠正警情{{
    part2Data.automaticCorrectionNumber }}起，短信通知企业{{ part2Data.smsNoticeNumber }}条，电话提醒企业{{
    part2Data.phoneRemindNumber }}次，人工提醒后及时纠正报警数{{ part2Data.timelyCorrectionNumber }}条。
      </p>
    </div>
    <!-- 列表页3 -->
    <!-- <c:if test="{{ data.intelligentEquipmentInfo.hasMomenta }}"> -->
    <div v-if="data.intelligentEquipmentInfo.hasMomenta" class="fullpage" id="text8">
      <h4>三、人工智能设备试点使用情况</h4>
      <p class="textStyle margin-tm text-in">
      </p>
      {{ part3Info }}
      <div class="echartWrapper margin-tm h400" id="chartContainer9"></div>
      <p class="textStyle margin-tm text-in">
        {{ data.summaryReportStatisticalMonth2 }}月期间人工智能设备监测报警环比数据，整体呈{{ part3Data.totalRatioInfo }}，{{
          data.secondMonthName }}份环比{{ part3Data.secondRatioInfo }}、{{ data.thirdMonthName }}份环比{{
    part3Data.tiredRatioInfo }}。
      </p>
      <div class="echartWrapper margin-tm h400" id="chartContainer10"></div>
    </div>
    <!-- </c:if> -->
  </div>
  <form id="downloadForm" :action="`/api/statistics/briefReport/download?briefId={{ data.summaryReportId }}`"
    method="post" target="_blank"></form>
</template>

<script setup lang="tsx">
import * as echarts from "echarts";

const { title, data } = defineProps({
  title: { type: String, default: () => '' },
  data: { type: Object, default: () => [] },
  download: { type: Function, defualt: () => { } }
})
const proxy: any = getCurrentInstance()?.proxy

const { vehicleInfoDetail, part1Data, part2Data, part3Data, part3Info, part231Data, part21Data, part22Data, part232Data, part233Data, part232DataInfo, part233DataInfo, part234Data, part241Data, part242Data, part243Data, part231DataInfo, part21DataInfo, part22DataInfo, part234DataInfo, chartContainer1Values, chartContainer2Values, chartContainer3Values, chartContainer4Values } = data

let part1ChartTableBus = part231Data.busFirstMonthAlarmNumber == '0' && part231Data.busSecondMonthAlarmNumber == '0' && part231Data.busThirdMonthAlarmNumber == '0'
let part1ChartTableTour = part231Data.tourFirstMonthAlarmNumber == '0' && part231Data.tourSecondMonthAlarmNumber == '0' && part231Data.tourThirdMonthAlarmNumber == '0'
let part1ChartTableDanger = part231Data.dangerFirstMonthAlarmNumber == '0' && part231Data.dangerSecondMonthAlarmNumber == '0' && part231Data.dangerThirdMonthAlarmNumber == '0'
let part2ChartTableBus = part232Data.busFirstMonthAlarmNumber == '0' && part232Data.busSecondMonthAlarmNumber == '0' && part232Data.busThirdMonthAlarmNumber == '0'
let part2ChartTableTour = part232Data.tourFirstMonthAlarmNumber == '0' && part232Data.tourSecondMonthAlarmNumber == '0' && part232Data.tourThirdMonthAlarmNumber == '0'
let part2ChartTableDanger = part232Data.dangerFirstMonthAlarmNumber == '0' && part232Data.dangerSecondMonthAlarmNumber == '0' && part232Data.dangerThirdMonthAlarmNumber == '0'
let part3ChartTableBus = part233Data.busFirstMonthAlarmNumber == '0' && part233Data.busSecondMonthAlarmNumber == '0' && part233Data.busThirdMonthAlarmNumber == '0'
let part3ChartTableTour = part233Data.tourFirstMonthAlarmNumber == '0' && part233Data.tourSecondMonthAlarmNumber == '0' && part233Data.tourThirdMonthAlarmNumber == '0'
let part3ChartTableDanger = part233Data.dangerFirstMonthAlarmNumber == '0' && part233Data.dangerSecondMonthAlarmNumber == '0' && part233Data.dangerThirdMonthAlarmNumber == '0'
let part4ChartTableBus = part234Data.busFirstMonthAlarmNumber == '0' && part234Data.busSecondMonthAlarmNumber == '0' && part234Data.busThirdMonthAlarmNumber == '0'
let part4ChartTableTour = part234Data.tourFirstMonthAlarmNumber == '0' && part234Data.tourSecondMonthAlarmNumber == '0' && part234Data.tourThirdMonthAlarmNumber == '0'
let part4ChartTableDanger = part234Data.dangerFirstMonthAlarmNumber == '0' && part234Data.dangerSecondMonthAlarmNumber == '0' && part234Data.dangerThirdMonthAlarmNumber == '0';


// 图表脚本

(function () {
  var PER_PIC_SIZE = 60000;

  function getPicData(chartContainerId, paramName) {
    var chartContainer = document.getElementById(chartContainerId);
    if (!chartContainer) {
      return;
    }
    var canvasArr = chartContainer.getElementsByTagName("canvas");
    if (!canvasArr || canvasArr.length == 0) {
      return;
    }
    var canvasObj = canvasArr[0];
    var picData = canvasObj.toDataURL('image/jpeg', 1.0);

    var size = picData.length / PER_PIC_SIZE;
    if (size * PER_PIC_SIZE < picData.length) {
      size = size + 1;
    }
    for (var i = 0; i < size; i++) {
      var endIndex = (i + 1) * PER_PIC_SIZE;
      if (endIndex > picData.length) {
        endIndex = picData.length;
      }
      var data = picData.substring(i * PER_PIC_SIZE, endIndex);
      document.querySelector("#downloadForm").append('<input type="hidden" name="' + paramName + i + '" value="' + data + '" />');
    }
  }

  document.querySelector("#downloadDoc").addEventListener('click', function () {
    document.querySelector("#downloadForm").innerHTML = '';
    //将图片转为base64传递到后台
    getPicData("chartContainer1", "char1Data");
    getPicData("chartContainer2", "char2Data");
    getPicData("chartContainer3", "char3Data");
    getPicData("chartContainer4", "char4Data");
    getPicData("chartContainer5", "char5Data");
    getPicData("chartContainer6", "char6Data");
    getPicData("chartContainer7", "char7Data");
    getPicData("chartContainer8", "char8Data");
    getPicData("chartContainer9", "char9Data");
    getPicData("chartContainer10", "char10Data");
    document.querySelector("#downloadForm").submit();
  });
})();


//第一个饼图
initChartContainer1();
//各地级市车辆类型分布情况
initChartContainer2();
///2.1 营运车辆违规报警综合情况
initChartContainer3();
//2.2 重点营运车辆违规报警情况
initChartContainer4();
//2.3.1 重点营运车辆违规报警趋势分析
initChartContainer5();
initChartContainer6();
initChartContainer7();
initChartContainer8();
//人工智能设备监测违规报警占比
initChartContainer9();
//智能设备报警次数环比统计
initChartContainer10();


function initChartContainer1() {
  var allLegendData = [{ name: '班线客运', icon: 'square' },
  { name: '旅游客运', icon: 'square' },
  { name: '危运', icon: 'square' },
  { name: '普通货运', icon: 'square' }];
  var allSeriesData = chartContainer1Values;
  var allColor = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000'];
  var showLegendData = [];
  var showSeriesData = [];
  var busVehicleNumber = part1Data.busVehicleNumber;
  if ((busVehicleNumber !== "") && (busVehicleNumber !== "0")) {
    showLegendData.push(allLegendData[0]);
    showSeriesData.push(allSeriesData[0]);
  }
  var tourVehicleNumber = part1Data.tourVehicleNumber;
  if ((tourVehicleNumber !== "") && (tourVehicleNumber !== "0")) {
    showLegendData.push(allLegendData[1]);
    showSeriesData.push(allSeriesData[1]);
  }
  var dangerVehicleNumber = part1Data.dangerVehicleNumber;
  if ((dangerVehicleNumber !== "") && (dangerVehicleNumber !== "0")) {
    showLegendData.push(allLegendData[2]);
    showSeriesData.push(allSeriesData[2]);
  }
  var goodsVehicleNumber = part1Data.goodsVehicleNumber;
  if ((goodsVehicleNumber !== "") && (goodsVehicleNumber !== "0")) {
    showLegendData.push(allLegendData[3]);
    showSeriesData.push(allSeriesData[3]);
  }
  var showColor = allColor.slice(0, showLegendData.length);

  var config = {
    containerId: 'chartContainer1',
    title: '营运车辆分类占比',
    legendData: showLegendData,
    seriesData: showSeriesData,
    color: showColor
  }
  initPieChartContainer(config);
}

function initChartContainer2() {
  var allXAxisData = allXAxisData,
    busVehicleNumbers = busVehicleNumber,
    tourVehicleNumbers = tourVehicleNumber,
    dangerVehicleNumbers = dangerVehicleNumber,
    allLegendData = [{ name: '班线客运', icon: 'square' },
    { name: '旅游客运', icon: 'square' },
    { name: '危险品运输', icon: 'square' }],
    allSeriesData =
      [{ name: '班线客运', type: 'bar', barGap: 0, barWidth: 6, data: busVehicleNumbers },
      { name: '旅游客运', type: 'bar', barWidth: 6, data: tourVehicleNumbers },
      { name: '危险品运输', type: 'bar', barWidth: 6, data: dangerVehicleNumbers }
      ],
    legendData = [],
    seriesData = [];

  var busVehicleNumber = part1Data.busVehicleNumber;
  if ((busVehicleNumber !== "") && (busVehicleNumber !== "0")) {
    legendData.push(allLegendData[0]);
    seriesData.push(allSeriesData[0]);
  }
  var tourVehicleNumber = part1Data.tourVehicleNumber;
  if ((tourVehicleNumber !== "") && (tourVehicleNumber !== "0")) {
    legendData.push(allLegendData[1]);
    seriesData.push(allSeriesData[1]);
  }
  var dangerVehicleNumber = part1Data.dangerVehicleNumber;
  if ((dangerVehicleNumber !== "") && (dangerVehicleNumber !== "0")) {
    legendData.push(allLegendData[2]);
    seriesData.push(allSeriesData[2]);
  }


  var config = {
    containerId: 'chartContainer2',
    title: '重点营运车辆分类分布情况',
    legendData: legendData,
    xAxisData: allXAxisData,
    seriesData: seriesData,
    color: ['#5B9BD5', '#ED7D31', '#A5A5A5']
  }
  initRectangleChartContainer(config);
}

function initChartContainer3() {

  var allLegendData = [{ name: '超速次数', icon: 'square' },
  { name: '疲劳驾驶次数', icon: 'square' },
  { name: '凌晨2-5点禁行次数', icon: 'square' }],
    allSeriesData = chartContainer3Values,
    showLegendData = [],
    showSeriesData = [];

  var speedingAlarmNumber = part21Data.speedingAlarmNumber;
  if ((speedingAlarmNumber !== "") && (speedingAlarmNumber !== "0")) {
    showLegendData.push(allLegendData[0]);
    showSeriesData.push(allSeriesData[0]);
  }
  var fatigueAlarmNumber = part21Data.fatigueAlarmNumber;
  if ((fatigueAlarmNumber !== "") && (fatigueAlarmNumber !== "0")) {
    showLegendData.push(allLegendData[1]);
    showSeriesData.push(allSeriesData[1]);
  }
  var t25AlarmNumber = part21Data.t25AlarmNumber;
  if ((t25AlarmNumber !== "") && (t25AlarmNumber !== "0")) {
    showLegendData.push(allLegendData[2]);
    showSeriesData.push(allSeriesData[2]);
  }


  var config = {
    containerId: 'chartContainer3',
    title: '超速、疲劳、凌晨2-5点禁行报警占比',
    legendData: showLegendData,
    seriesData: showSeriesData,
    color: ['#5B9BD5', '#ED7D31', '#A5A5A5']
  }
  initPieChartContainer(config);
}

function initChartContainer4() {
  var allLegendData = [{ name: '班线客运', icon: 'square' },
  { name: '旅游客运', icon: 'square' },
  { name: '危运', icon: 'square' }],
    allSeriesData = chartContainer4Values,
    showLegendData = [],
    showSeriesData = [],
    busAlarmNumber = part22Data.busAlarmNumber;
  if ((busAlarmNumber !== "") && (busAlarmNumber !== "0")) {
    showLegendData.push(allLegendData[0]);
    showSeriesData.push(allSeriesData[0]);
  }

  var tourAlarmNumber = part22Data.tourAlarmNumber;
  if ((tourAlarmNumber !== "") && (tourAlarmNumber !== "0")) {
    showLegendData.push(allLegendData[1]);
    showSeriesData.push(allSeriesData[1]);
  }
  var dangerAlarmNumber = part22Data.dangerAlarmNumber;
  if ((dangerAlarmNumber !== "") && (dangerAlarmNumber !== "0")) {
    showLegendData.push(allLegendData[2]);
    showSeriesData.push(allSeriesData[2]);
  }
  var config = {
    containerId: 'chartContainer4',
    title: '重点营运车辆报警次数占比',
    legendData: showLegendData,
    seriesData: showSeriesData,
    color: ['#5B9BD5', '#ED7D31', '#A5A5A5']
  }
  initPieChartContainer(config);
}

function initChartContainer5() {

  var xAxisData = [data.firstMonthName, data.secondMonthName, data.thirdMonthName],
    busVehicleNumbers = [],
    tourVehicleNumbers = [],
    dangerVehicleNumbers = [],
    allXAxisData = [];

  var alllegendData = [{ name: '班线客运', icon: 'square' },
  { name: '旅游客运', icon: 'square' },
  { name: '危险品运输', icon: 'square' }],
    legendData = [],
    seriesData = [];

  if ((part231Data.busFirstMonthAlarmNumber !== "0") || (part231Data.busSecondMonthAlarmNumber !== "0") || (part231Data.busThirdMonthAlarmNumber !== "0")) {
    busVehicleNumbers.push(part231Data.busFirstMonthAlarmNumber);
    busVehicleNumbers.push(part231Data.busSecondMonthAlarmNumber);
    busVehicleNumbers.push(part231Data.busThirdMonthAlarmNumber);
    legendData.push(alllegendData[0])
    seriesData.push({ name: '班线客运', type: 'bar', barGap: 0, barWidth: 20, data: busVehicleNumbers })

  }
  if ((part231Data.tourFirstMonthAlarmNumber !== "0") || (part231Data.tourSecondMonthAlarmNumber !== "0") || (part231Data.tourThirdMonthAlarmNumber !== "0")) {
    tourVehicleNumbers.push(part231Data.tourFirstMonthAlarmNumber);
    tourVehicleNumbers.push(part231Data.tourSecondMonthAlarmNumber);
    tourVehicleNumbers.push(part231Data.tourThirdMonthAlarmNumber);
    legendData.push(alllegendData[1])
    seriesData.push({ name: '旅游客运', type: 'bar', barWidth: 20, data: tourVehicleNumbers })
  }
  if ((part231Data.dangerFirstMonthAlarmNumber !== "0") || (part231Data.dangerSecondMonthAlarmNumber !== "0") || (part231Data.dangerThirdMonthAlarmNumber !== "0")) {
    dangerVehicleNumbers.push(part231Data.dangerFirstMonthAlarmNumber);
    dangerVehicleNumbers.push(part231Data.dangerSecondMonthAlarmNumber);
    dangerVehicleNumbers.push(part231Data.dangerThirdMonthAlarmNumber);
    legendData.push(alllegendData[2])
    seriesData.push({ name: '危险品运输', type: 'bar', barWidth: 20, data: dangerVehicleNumbers })
  }
  allXAxisData.push(part231Data.firstMonthTotalAlarmNumber);
  allXAxisData.push(part231Data.secondMonthTotalAlarmNumber);
  allXAxisData.push(part231Data.thirdMonthTotalAlarmNumber);
  legendData.push({ name: '合计' });
  seriesData.push({ name: '合计', type: 'line', barWidth: 20, data: allXAxisData });

  var color = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000'];
  if (seriesData.length == 3) {
    color = ['#5B9BD5', '#ED7D31', '#FFC000'];
  }

  var config = {
    containerId: 'chartContainer5',
    title: '重点营运车辆违规报警趋势月综合分析',
    legendData: legendData,
    xAxisData: xAxisData,
    seriesData: seriesData,
    color: color
  };
  initRectangleChartContainer2(config);
}

function initChartContainer6() {

  var xAxisData = [data.firstMonthName, data.secondMonthName, data.thirdMonthName],
    busVehicleNumbers = [],
    tourVehicleNumbers = [],
    dangerVehicleNumbers = [],
    allXAxisData = [];

  var alllegendData = [{ name: '班线客运', icon: 'square' },
  { name: '旅游客运', icon: 'square' },
  { name: '危险品运输', icon: 'square' }],
    legendData = [],
    seriesData = [];

  if ((part232Data.busFirstMonthAlarmNumber !== "0") || (part232Data.busSecondMonthAlarmNumber !== "0") || (part232Data.busThirdMonthAlarmNumber !== "0")) {
    busVehicleNumbers.push(part232Data.busFirstMonthAlarmNumber);
    busVehicleNumbers.push(part232Data.busSecondMonthAlarmNumber);
    busVehicleNumbers.push(part232Data.busThirdMonthAlarmNumber);
    legendData.push(alllegendData[0])
    seriesData.push({ name: '班线客运', type: 'bar', barGap: 0, barWidth: 20, data: busVehicleNumbers })

  }
  if ((part232Data.tourFirstMonthAlarmNumber !== "0") || (part232Data.tourSecondMonthAlarmNumber !== "0") || (part232Data.tourThirdMonthAlarmNumber !== "0")) {
    tourVehicleNumbers.push(part232Data.tourFirstMonthAlarmNumber);
    tourVehicleNumbers.push(part232Data.tourSecondMonthAlarmNumber);
    tourVehicleNumbers.push(part232Data.tourThirdMonthAlarmNumber);
    legendData.push(alllegendData[1])
    seriesData.push({ name: '旅游客运', type: 'bar', barWidth: 20, data: tourVehicleNumbers })
  }
  if ((part232Data.dangerFirstMonthAlarmNumber !== "0") || (part232Data.dangerSecondMonthAlarmNumber !== "0") || (part232Data.dangerThirdMonthAlarmNumber !== "0")) {
    dangerVehicleNumbers.push(part232Data.dangerFirstMonthAlarmNumber);
    dangerVehicleNumbers.push(part232Data.dangerSecondMonthAlarmNumber);
    dangerVehicleNumbers.push(part232Data.dangerThirdMonthAlarmNumber);
    legendData.push(alllegendData[2])
    seriesData.push({ name: '危险品运输', type: 'bar', barWidth: 20, data: dangerVehicleNumbers })
  }
  allXAxisData.push(part232Data.firstMonthTotalAlarmNumber);
  allXAxisData.push(part232Data.secondMonthTotalAlarmNumber);
  allXAxisData.push(part232Data.thirdMonthTotalAlarmNumber);
  legendData.push({ name: '合计' });
  seriesData.push({ name: '合计', type: 'line', barWidth: 20, data: allXAxisData });

  var color = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000'];
  if (seriesData.length == 3) {
    color = ['#5B9BD5', '#ED7D31', '#FFC000'];
  }

  var config = {
    containerId: 'chartContainer6',
    title: '重点营运车辆超速报警趋势月分析',
    legendData: legendData,
    xAxisData: xAxisData,
    seriesData: seriesData,
    color: color
  };
  initRectangleChartContainer2(config);
}

function initChartContainer7() {

  var xAxisData = [data.firstMonthName, data.secondMonthName, data.thirdMonthName],
    busVehicleNumbers = [],
    tourVehicleNumbers = [],
    dangerVehicleNumbers = [],
    allXAxisData = [];

  var alllegendData = [{ name: '班线客运', icon: 'square' },
  { name: '旅游客运', icon: 'square' },
  { name: '危险品运输', icon: 'square' }],
    legendData = [],
    seriesData = [];

  if ((part233Data.busFirstMonthAlarmNumber !== "0") || (part233Data.busSecondMonthAlarmNumber !== "0") || (part233Data.busThirdMonthAlarmNumber !== "0")) {
    busVehicleNumbers.push(part233Data.busFirstMonthAlarmNumber);
    busVehicleNumbers.push(part233Data.busSecondMonthAlarmNumber);
    busVehicleNumbers.push(part233Data.busThirdMonthAlarmNumber);
    legendData.push(alllegendData[0])
    seriesData.push({ name: '班线客运', type: 'bar', barGap: 0, barWidth: 20, data: busVehicleNumbers })

  }
  if ((part233Data.tourFirstMonthAlarmNumber !== "0") || (part233Data.tourSecondMonthAlarmNumber !== "0") || (part233Data.tourThirdMonthAlarmNumber !== "0")) {
    tourVehicleNumbers.push(part233Data.tourFirstMonthAlarmNumber);
    tourVehicleNumbers.push(part233Data.tourSecondMonthAlarmNumber);
    tourVehicleNumbers.push(part233Data.tourThirdMonthAlarmNumber);
    legendData.push(alllegendData[1])
    seriesData.push({ name: '旅游客运', type: 'bar', barWidth: 20, data: tourVehicleNumbers })
  }
  if ((part233Data.dangerFirstMonthAlarmNumber !== "0") || (part233Data.dangerSecondMonthAlarmNumber !== "0") || (part233Data.dangerThirdMonthAlarmNumber !== "0")) {
    dangerVehicleNumbers.push(part233Data.dangerFirstMonthAlarmNumber);
    dangerVehicleNumbers.push(part233Data.dangerSecondMonthAlarmNumber);
    dangerVehicleNumbers.push(part233Data.dangerThirdMonthAlarmNumber);
    legendData.push(alllegendData[2])
    seriesData.push({ name: '危险品运输', type: 'bar', barWidth: 20, data: dangerVehicleNumbers })
  }
  allXAxisData.push(part233Data.firstMonthTotalAlarmNumber);
  allXAxisData.push(part233Data.secondMonthTotalAlarmNumber);
  allXAxisData.push(part233Data.thirdMonthTotalAlarmNumber);
  legendData.push({ name: '合计' });
  seriesData.push({ name: '合计', type: 'line', barWidth: 20, data: allXAxisData });

  var color = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000'];
  if (seriesData.length == 3) {
    color = ['#5B9BD5', '#ED7D31', '#FFC000'];
  }
  var config = {
    containerId: 'chartContainer7',
    title: '重点营运车辆疲劳驾驶报警趋势月分析',
    legendData: legendData,
    xAxisData: xAxisData,
    seriesData: seriesData,
    color: color
  };
  initRectangleChartContainer2(config);
}

function initChartContainer8() {

  var xAxisData = [data.firstMonthName, data.secondMonthName, data.thirdMonthName],
    busVehicleNumbers = [],
    tourVehicleNumbers = [],
    dangerVehicleNumbers = [],
    allXAxisData = [];

  var alllegendData = [{ name: '班线客运', icon: 'square' },
  { name: '旅游客运', icon: 'square' },
  { name: '危险品运输', icon: 'square' }],
    legendData = [],
    seriesData = [];

  if ((part234Data.busFirstMonthAlarmNumber !== "0") || (part234Data.busSecondMonthAlarmNumber !== "0") || (part234Data.busThirdMonthAlarmNumber !== "0")) {
    busVehicleNumbers.push(part234Data.busFirstMonthAlarmNumber);
    busVehicleNumbers.push(part234Data.busSecondMonthAlarmNumber);
    busVehicleNumbers.push(part234Data.busThirdMonthAlarmNumber);
    legendData.push(alllegendData[0])
    seriesData.push({ name: '班线客运', type: 'bar', barGap: 0, barWidth: 20, data: busVehicleNumbers })

  }
  if ((part234Data.tourFirstMonthAlarmNumber !== "0") || (part234Data.tourSecondMonthAlarmNumber !== "0") || (part234Data.tourThirdMonthAlarmNumber !== "0")) {
    tourVehicleNumbers.push(part234Data.tourFirstMonthAlarmNumber);
    tourVehicleNumbers.push(part234Data.tourSecondMonthAlarmNumber);
    tourVehicleNumbers.push(part234Data.tourThirdMonthAlarmNumber);
    legendData.push(alllegendData[1])
    seriesData.push({ name: '旅游客运', type: 'bar', barWidth: 20, data: tourVehicleNumbers })
  }
  if ((part234Data.dangerFirstMonthAlarmNumber !== "0") || (part234Data.dangerSecondMonthAlarmNumber !== "0") || (part234Data.dangerThirdMonthAlarmNumber !== "0")) {
    dangerVehicleNumbers.push(part234Data.dangerFirstMonthAlarmNumber);
    dangerVehicleNumbers.push(part234Data.dangerSecondMonthAlarmNumber);
    dangerVehicleNumbers.push(part234Data.dangerThirdMonthAlarmNumber);
    legendData.push(alllegendData[2])
    seriesData.push({ name: '危险品运输', type: 'bar', barWidth: 20, data: dangerVehicleNumbers })
  }
  allXAxisData.push(part234Data.firstMonthTotalAlarmNumber);
  allXAxisData.push(part234Data.secondMonthTotalAlarmNumber);
  allXAxisData.push(part234Data.thirdMonthTotalAlarmNumber);

  legendData.push({ name: '合计' });
  seriesData.push({ name: '合计', type: 'line', barWidth: 20, data: allXAxisData });
  var color = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000'];
  if (seriesData.length == 3) {
    color = ['#5B9BD5', '#ED7D31', '#FFC000'];
  }
  var config = {
    containerId: 'chartContainer8',
    title: '重点营运车辆凌晨2-5点禁驾趋势月分析',
    legendData: legendData,
    xAxisData: xAxisData,
    seriesData: seriesData,
    color: color
  };
  initRectangleChartContainer2(config);
}

function initChartContainer9() {
  var alllegendData = ['喝水', '打哈欠', '打电话', '抽烟', '闭眼', '摄像头偏移'],
    allcolor = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000', '#70AD47', '#4472C4'],
    legendData = [],
    seriesData = [],
    color = [];

  var dringNumber = part3Data.dringNumber;
  if ((dringNumber !== "") && (dringNumber !== "0")) {
    legendData.push(alllegendData[0])
    seriesData.push({ value: part3Data.dringNumber, name: '喝水' })
    color.push(allcolor[0])
  }
  var yawmNumber = part3Data.yawmNumber;
  if ((yawmNumber !== "") && (yawmNumber !== "0")) {
    legendData.push(alllegendData[1])
    seriesData.push({ value: part3Data.yawmNumber, name: '打哈欠' })
    color.push(allcolor[1])
  }
  var phoneNumber = part3Data.phoneNumber;
  if ((phoneNumber !== "") && (phoneNumber !== "0")) {
    legendData.push(alllegendData[2])
    seriesData.push({ value: part3Data.phoneNumber, name: '打电话' })
    color.push(allcolor[2])
  }
  var smokingNumber = part3Data.smokingNumber;
  if ((smokingNumber !== "") && (smokingNumber !== "0")) {
    legendData.push(alllegendData[3])
    seriesData.push({ value: part3Data.smokingNumber, name: '抽烟' })
    color.push(allcolor[3])
  }
  var closedEyesNumber = part3Data.closedEyesNumber;
  if ((closedEyesNumber !== "") && (closedEyesNumber !== "0")) {
    legendData.push(alllegendData[4])
    seriesData.push({ value: part3Data.closedEyesNumber, name: '闭眼' })
    color.push(allcolor[4])
  }
  var cameraNumber = part3Data.cameraNumber;
  if ((cameraNumber !== "") && (cameraNumber !== "0")) {
    legendData.push(alllegendData[5])
    seriesData.push({ value: part3Data.cameraNumber, name: '摄像头偏移' })
    color.push(allcolor[5])
  }
  var config = {
    containerId: 'chartContainer9',
    title: '人工智能设备监测违规报警占比',
    legendData: legendData,
    seriesData: seriesData,
    color: color
  }
  initPieChartContainer(config);
}

function initChartContainer10() {

  var xAxisData = [data.firstMonthName, data.secondMonthName, data.thirdMonthName],
    legendData = ['智能设备报警次数', '线性（智能设备报警次数）'],
    seriesData = [],
    allXAxisData = [];

  allXAxisData.push(part3Data.firstMonthAlarmNumber);
  allXAxisData.push(part3Data.secondMonthAlarmNumber);
  allXAxisData.push(part3Data.thirdMonthAlarmNumber);

  seriesData.push({ name: '智能设备报警次数', type: 'bar', barWidth: 20, data: allXAxisData });
  seriesData.push({ name: '线性（智能设备报警次数）', type: 'line', barWidth: 20, data: allXAxisData });

  var config = {
    containerId: 'chartContainer10',
    title: '智能设备报警次数环比统计',
    legendData: legendData,
    xAxisData: xAxisData,
    seriesData: seriesData,
    color: ['#5B9BD5', '#ED7D31', '#FFC000', '#A5A5A5']
  };
  initRectangleChartContainer2(config);
}

function initPieChartContainer(config) {
  var dom = document.getElementById(config.containerId);
  var myChart = echarts.init(dom);
  var option = {
    backgroundColor: '#FFFFFF',
    title: {
      text: config.title,
      x: 'center',
      top: 5,
      textStyle: {
        fontSize: 18,
        align: 'center',
        fontFamily: '仿宋'
      }
    },
    legend: {
      bottom: 10,
      left: 'center',
      itemWidth: 12,
      itemHeight: 12,
      data: config.legendData
    },
    color: config.color,
    series: [
      {
        name: config.title,
        type: 'pie',
        avoidLabelOverlap: true,
        minAngle: 0,
        radius: '60%',
        center: ['50%', '52%'],
        label: {
          normal: {
            show: true,
            //position: 'inner',
            textStyle: {
              fontWeight: 300,
              fontSize: 14
            },
            formatter: function (data) {
              return Number(data.percent).toFixed(2) + "%";
            }
          }
        },
        data: config.seriesData
      }
    ]
  };
  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}

function initRectangleChartContainer(config) {
  var dom = document.getElementById(config.containerId);
  var myChart = echarts.init(dom);
  var option = {
    backgroundColor: '#FFFFFF',
    title: {
      text: config.title,
      x: 'center',
      top: 10,
      textStyle: {
        fontSize: 18,
        align: 'center',
        fontFamily: '仿宋'
      }
    },
    grid: {
      bottom: 120,
    },
    color: config.color,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      bottom: 10,
      left: 'center',
      itemWidth: 12,
      itemHeight: 12,
      data: config.legendData
    },
    calculable: false,
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: config.xAxisData,
        axisLine: {
          show: false
        },
        axisLabel: {
          interval: 0,
          rotate: 30,
          lineHeight: 80,
          textStyle: {
            fontSize: 12,
          }
        }
        /*axisLabel: {
            textStyle: {
                fontSize: 8,
            }
        }*/
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      }
    ],
    series: config.seriesData
  };
  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}

//2.3
function initRectangleChartContainer2(config) {
  var dom = document.getElementById(config.containerId);
  var myChart = echarts.init(dom);
  var option = {
    backgroundColor: '#FFFFFF',
    title: {
      text: config.title,
      x: 'center',
      top: 10,
      textStyle: {
        fontSize: 18,
        align: 'center',
        fontFamily: '仿宋'
      }
    },
    grid: {
      bottom: 120,
    },
    color: config.color,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      bottom: 10,
      left: 'center',
      itemWidth: 12,
      itemHeight: 12,
      data: config.legendData
    },
    calculable: false,
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: config.xAxisData,
        axisLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      }
    ],
    series: config.seriesData
  };
  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}

</script>

<style scoped lang="scss">
@import url(./briefReport.css);
</style>
