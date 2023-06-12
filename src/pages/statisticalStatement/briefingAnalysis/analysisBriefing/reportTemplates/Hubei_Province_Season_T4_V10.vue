<template>
  <div>
    <!-- 封面页 -->
    <div class="fixed">{{ data.summaryReportStatisticalYear }}{{ data.summaryReportStatisticalMonth2 }}湖北省月季度简报
      <!-- <shiro:hasPermission name="statistics-report-download"> -->
      <a href="javascript:" id="downloadDoc">下载word</a>
      <!-- </shiro:hasPermission> -->
    </div>

    <div class="fullpage margin-t">
      <div class="t-center">
        <!--        <img src="../statics/img/briefReport/monthlyAnalyze.png" alt="">-->
      </div>
      <h1 class="margin-tm">湖北省道路运输安全第三方监测</h1>
      <h1>{{ data.summaryReportStatisticalYear }}{{ data.summaryReportStatisticalMonth }}季度简报</h1>

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
          <span>2.4 全省营运车辆违规报警排名</span>
          <span class="pageNumber">5</span>
        </li>
        <!-- <c:if test="{{ data.intelligentEquipmentInfo.hasMomenta }}"> -->
        <li v-if="data.intelligentEquipmentInfo.hasMomenta" class="sub-menu">
          <span>三、人工智能设备试点使用情况</span>
          <span class="pageNumber">9</span>
        </li>
        <li class="sub-menu">
          <span>四、各地市州{{ data.summaryReportStatisticalMonth2 }}月季报情况分析（见附录）</span>
          <span class="pageNumber">10</span>
        </li>
        <!-- </c:if> -->
        <!-- <c:if v-if="!data.intelligentEquipmentInfo.hasMomenta" -->
        <li class="sub-menu">
          <span>三、各地市州{{ data.summaryReportStatisticalMonth2 }}月季报情况分析（见附录）</span>
          <span class="pageNumber">10</span>
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
            <td>省份</td>
            <th>营运类型</th>
            <th>车辆台数</th>
            <th>占比</th>
          </tr>
          <tr>
            <td rowspan=5>湖北省</td>
            <td>班线客运</td>
            <td>{{ part1Data.busVehicleNumber }}</td>
            <td>{{ part1Data.busVehicleRatio }}</td>
          </tr>
          <tr>
            <td>旅游客运</td>
            <td>{{ part1Data.tourVehicleNumber }}</td>
            <td>{{ part1Data.tourVehicleRatio }}</td>
          </tr>
          <tr>

            <td>危险货物运输</td>
            <td>{{ part1Data.dangerVehicleNumber }}</td>
            <td>{{ part1Data.dangerVehicleRatio }}</td>
          </tr>
          <tr>
            <td>普通货运</td>
            <td>{{ part1Data.goodsVehicleNumber }}</td>
            <td>{{ part1Data.goodsVehicleRatio }}</td>
          </tr>

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
            <c:forEach v-for="li in part1Data.importantVehicleTypeInfos" var="li">
              <!-- <c:if v-if="li.busVehicleNumber!=0 || li.tourVehicleNumber!=0 || li.dangerVehicleNumber!=0" -->
              <th v-if="li.busVehicleNumber != 0 || li.tourVehicleNumber != 0 || li.dangerVehicleNumber != 0">{{
                li.cityName }}
              </th>
              <!-- </c:if> -->
            </c:forEach>
          </tr>
          <tr>
            <td>班线客运</td>
            <c:forEach v-for="li in part1Data.importantVehicleTypeInfos" var="li">

              <!-- <c:if v-if="li.busVehicleNumber!=0 || li.tourVehicleNumber!=0 || li.dangerVehicleNumber!=0" -->
              <td v-if="li.busVehicleNumber != 0 || li.tourVehicleNumber != 0 || li.dangerVehicleNumber != 0">{{
                li.busVehicleNumber }}</td>
              <!-- </c:if> -->
            </c:forEach>
          </tr>
          <tr>
            <td>旅游客运</td>
            <c:forEach v-for="li in part1Data.importantVehicleTypeInfos" var="li">

              <!-- <c:if v-if="li.busVehicleNumber!=0 || li.tourVehicleNumber!=0 || li.dangerVehicleNumber!=0" -->
              <td v-if="li.busVehicleNumber != 0 || li.tourVehicleNumber != 0 || li.dangerVehicleNumber != 0">{{
                li.tourVehicleNumber }}</td>
              <!-- </c:if> -->
            </c:forEach>
          </tr>
          <tr>
            <td>危险品运输</td>
            <c:forEach v-for="li in part1Data.importantVehicleTypeInfos" var="li">

              <!-- <c:if v-if="li.busVehicleNumber!=0 || li.tourVehicleNumber!=0 || li.dangerVehicleNumber!=0" -->
              <td v-if="li.busVehicleNumber != 0 || li.tourVehicleNumber != 0 || li.dangerVehicleNumber != 0">{{
                li.dangerVehicleNumber }}</td>
              <!-- </c:if> -->
            </c:forEach>
          </tr>
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

        <table class="img-table" border="1">
          <tr>
            <td></td>
            <td>{{ data.firstMonthName }}</td>
            <td>{{ data.secondMonthName }}</td>
            <td>{{ data.thirdMonthName }}</td>
          </tr>
          <tr>
            <td>班线客运</td>
            <td>{{ part231Data.busFirstMonthAlarmNumber }}</td>
            <td>{{ part231Data.busSecondMonthAlarmNumber }}</td>
            <td>{{ part231Data.busThirdMonthAlarmNumber }}</td>
          </tr>
          <tr>
            <td>旅游客运</td>
            <td>{{ part231Data.tourFirstMonthAlarmNumber }}</td>
            <td>{{ part231Data.tourSecondMonthAlarmNumber }}</td>
            <td>{{ part231Data.tourThirdMonthAlarmNumber }}</td>
          </tr>
          <tr>
            <td>危运</td>
            <td>{{ part231Data.dangerFirstMonthAlarmNumber }}</td>
            <td>{{ part231Data.dangerSecondMonthAlarmNumber }}</td>
            <td>{{ part231Data.dangerThirdMonthAlarmNumber }}</td>
          </tr>

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
        <table class="img-table" border="1">
          <tr>
            <td></td>
            <td>{{ data.firstMonthName }}</td>
            <td>{{ data.secondMonthName }}</td>
            <td>{{ data.thirdMonthName }}</td>
          </tr>

          <tr>
            <td>班线客运</td>
            <td>{{ part232Data.busFirstMonthAlarmNumber }}</td>
            <td>{{ part232Data.busSecondMonthAlarmNumber }}</td>
            <td>{{ part232Data.busThirdMonthAlarmNumber }}</td>
          </tr>

          <tr>
            <td>旅游客运</td>
            <td>{{ part232Data.tourFirstMonthAlarmNumber }}</td>
            <td>{{ part232Data.tourSecondMonthAlarmNumber }}</td>
            <td>{{ part232Data.tourThirdMonthAlarmNumber }}</td>
          </tr>

          <tr>
            <td>危运</td>
            <td>{{ part232Data.dangerFirstMonthAlarmNumber }}</td>
            <td>{{ part232Data.dangerSecondMonthAlarmNumber }}</td>
            <td>{{ part232Data.dangerThirdMonthAlarmNumber }}</td>
          </tr>

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
        <table class="img-table" border="1">
          <tr>
            <td></td>
            <td>{{ data.firstMonthName }}</td>
            <td>{{ data.secondMonthName }}</td>
            <td>{{ data.thirdMonthName }}</td>
          </tr>

          <tr>
            <td>班线客运</td>
            <td>{{ part233Data.busFirstMonthAlarmNumber }}</td>
            <td>{{ part233Data.busSecondMonthAlarmNumber }}</td>
            <td>{{ part233Data.busThirdMonthAlarmNumber }}</td>
          </tr>

          <tr>
            <td>旅游客运</td>
            <td>{{ part233Data.tourFirstMonthAlarmNumber }}</td>
            <td>{{ part233Data.tourSecondMonthAlarmNumber }}</td>
            <td>{{ part233Data.tourThirdMonthAlarmNumber }}</td>
          </tr>

          <tr>
            <td>危运</td>
            <td>{{ part233Data.dangerFirstMonthAlarmNumber }}</td>
            <td>{{ part233Data.dangerSecondMonthAlarmNumber }}</td>
            <td>{{ part233Data.dangerThirdMonthAlarmNumber }}</td>
          </tr>

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
        <table class="img-table" border="1">
          <tr>
            <td></td>
            <td>{{ data.firstMonthName }}</td>
            <td>{{ data.secondMonthName }}</td>
            <td>{{ data.thirdMonthName }}</td>
          </tr>
          <tr>
            <td>班线客运</td>
            <td>{{ part234Data.busFirstMonthAlarmNumber }}</td>
            <td>{{ part234Data.busSecondMonthAlarmNumber }}</td>
            <td>{{ part234Data.busThirdMonthAlarmNumber }}</td>
          </tr>
          <tr>
            <td>旅游客运</td>
            <td>{{ part234Data.tourFirstMonthAlarmNumber }}</td>
            <td>{{ part234Data.tourSecondMonthAlarmNumber }}</td>
            <td>{{ part234Data.tourThirdMonthAlarmNumber }}</td>
          </tr>
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
      <h4>2.4 全省营运车辆违规报警排名</h4>
      <!--表格1-->
      <div class="tableWrapperList" style="width: 100%; margin-left: 0%">
        <header>{{ data.summaryReportStatisticalYear }}{{ data.summaryReportStatisticalMonth }}湖北省营运车辆违规报警情况综合排名表</header>
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
          <c:forEach v-for="item in part24Data.allVehicleAlarmRankingInfos" var="item">
            <tr>
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
          </c:forEach>
          <tr>
            <td colspan="2">小计</td>
            <td>{{ part24Data.allVehicleAlarmRankingInfosSum.companyNumber }}</td>
            <td>{{ part24Data.allVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
            <td>{{ part24Data.allVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
            <td>{{ part24Data.allVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>
            <td>{{ part24Data.allVehicleAlarmRankingInfosSum.t25AlarmNumber }}</td>
            <td>{{ part24Data.allVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
            <td>{{ part24Data.allVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
          </tr>
        </table>
      </div>
      <!--表格2-->
      <div class="tableWrapperList" style="width: 100%; margin-left: 0%">
        <header>{{ data.summaryReportStatisticalYear }}{{ data.summaryReportStatisticalMonth }}湖北省重点营运车辆违规报警情况排名表</header>
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
          <c:forEach v-for="item in part24Data.importantVehicleAlarmRankingInfos" var="item">
            <tr>
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
          </c:forEach>
          <tr>
            <td colspan="2">小计</td>
            <td>{{ part24Data.importantVehicleAlarmRankingInfosSum.companyNumber }}</td>
            <td>{{ part24Data.importantVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
            <td>{{ part24Data.importantVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
            <td>{{ part24Data.importantVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>
            <td>{{ part24Data.importantVehicleAlarmRankingInfosSum.t25AlarmNumber }}</td>
            <td>{{ part24Data.importantVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
            <td>{{ part24Data.importantVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
          </tr>
        </table>
      </div>
      <!--表格3-->
      <div class="tableWrapperList" style="width: 100%; margin-left: 0%">
        <header>{{ data.summaryReportStatisticalYear }}{{ data.summaryReportStatisticalMonth }}湖北省班线客运车辆违规报警情况排名表</header>
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
          <c:forEach v-for="item in part24Data.busVehicleAlarmRankingInfos" var="item">
            <tr>
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
          </c:forEach>
          <tr>
            <td colspan="2">小计</td>
            <td>{{ part24Data.busVehicleAlarmRankingInfosSum.companyNumber }}</td>
            <td>{{ part24Data.busVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
            <td>{{ part24Data.busVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
            <td>{{ part24Data.busVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>
            <td>{{ part24Data.busVehicleAlarmRankingInfosSum.t25AlarmNumber }}</td>
            <td>{{ part24Data.busVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
            <td>{{ part24Data.busVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
          </tr>
        </table>
      </div>
      <!--表格4-->
      <div class="tableWrapperList" style="width: 100%; margin-left: 0%">
        <header>{{ data.summaryReportStatisticalYear }}{{ data.summaryReportStatisticalMonth }}湖北省旅游客运车辆违规报警情况排名表</header>
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
          <c:forEach v-for="item in part24Data.tourVehicleAlarmRankingInfos" var="item">
            <tr>
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
          </c:forEach>
          <tr>
            <td colspan="2">小计</td>
            <td>{{ part24Data.tourVehicleAlarmRankingInfosSum.companyNumber }}</td>
            <td>{{ part24Data.tourVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
            <td>{{ part24Data.tourVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
            <td>{{ part24Data.tourVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>
            <td>{{ part24Data.tourVehicleAlarmRankingInfosSum.t25AlarmNumber }}</td>
            <td>{{ part24Data.tourVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
            <td>{{ part24Data.tourVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
          </tr>
        </table>
      </div>
      <!--表格5-->
      <div class="tableWrapperList" style="width: 100%; margin-left: 0%">
        <header>{{ data.summaryReportStatisticalYear }}{{ data.summaryReportStatisticalMonth }}湖北省危险品运输车辆违规报警情况排名表
        </header>
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
          <c:forEach v-for="item in part24Data.dangerVehicleAlarmRankingInfos" var="item">
            <tr>
              <td>{{ item.serialNo }}</td>
              <td>{{ item.areaName }}</td>
              <td>{{ item.companyNumber }}</td>
              <td>{{ item.vehicleNumber }}</td>
              <td>{{ item.speedingAlarmNumber }}</td>
              <td>{{ item.fatigueAlarmNumber }}</td>

              <td>{{ item.totalAlarmNumber }}</td>
              <td>{{ item.avgAlarmNumber }}</td>
            </tr>
          </c:forEach>
          <tr>
            <td colspan="2">小计</td>
            <td>{{ part24Data.dangerVehicleAlarmRankingInfosSum.companyNumber }}</td>
            <td>{{ part24Data.dangerVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
            <td>{{ part24Data.dangerVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
            <td>{{ part24Data.dangerVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>

            <td>{{ part24Data.dangerVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
            <td>{{ part24Data.dangerVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
          </tr>
        </table>
      </div>
      <!--表格6-->
      <div class="tableWrapperList" style="width: 100%; margin-left: 0%">
        <header>{{ data.summaryReportStatisticalYear }}{{ data.summaryReportStatisticalMonth }}湖北省普通货物运输车辆违规报警情况排名表
        </header>
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
          <c:forEach v-for="item in part24Data.goodsVehicleAlarmRankingInfos" var="item">
            <tr>
              <td>{{ item.serialNo }}</td>
              <td>{{ item.areaName }}</td>
              <td>{{ item.companyNumber }}</td>
              <td>{{ item.vehicleNumber }}</td>
              <td>{{ item.speedingAlarmNumber }}</td>
              <td>{{ item.fatigueAlarmNumber }}</td>

              <td>{{ item.totalAlarmNumber }}</td>
              <td>{{ item.avgAlarmNumber }}</td>
            </tr>
          </c:forEach>
          <tr>
            <td colspan="2">小计</td>
            <td>{{ part24Data.goodsVehicleAlarmRankingInfosSum.companyNumber }}</td>
            <td>{{ part24Data.goodsVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
            <td>{{ part24Data.goodsVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
            <td>{{ part24Data.goodsVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>

            <td>{{ part24Data.goodsVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
            <td>{{ part24Data.goodsVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
          </tr>
        </table>
      </div>
      <p class="textStyle margin-tm text-in">
        {{ alarmInfo }}
      </p>
    </div>
    <!-- <c:if test="{{ data.intelligentEquipmentInfo.hasMomenta }}"> -->
    <!-- 列表页3 -->
    <div v-if="data.intelligentEquipmentInfo.hasMomenta" class="fullpage" id="text8">
      <h4>三、人工智能设备试点使用情况</h4>
      <p class="textStyle margin-tm text-in">
        {{ part3Info }}
      </p>
      <div class="echartWrapper margin-tm h400" id="chartContainer9"></div>
      <p class="textStyle margin-tm text-in">
        {{ data.summaryReportStatisticalMonth2 }}月期间人工智能设备监测报警环比数据，{{ data.secondMonthName }}份环比{{
          part3Data.secondRatioInfo }}、{{ data.thirdMonthName }}份环比{{ part3Data.tiredRatioInfo }}。
      </p>
      <div class="echartWrapper margin-tm h400" id="chartContainer10"></div>
    </div>
    <div class="fullpage" id="text5">
      <h4>四、各地市州{{ data.summaryReportStatisticalMonth2 }}月季报情况分析（见附录）</h4>
    </div>
    <!-- </c:if> -->
    <!-- <c:if v-if="!data.intelligentEquipmentInfo.hasMomenta" -->
    <div v-if="!data.intelligentEquipmentInfo.hasMomenta" class="fullpage" id="text5">
      <h4>三、各地市州{{ data.summaryReportStatisticalMonth2 }}月季报情况分析（见附录）</h4>
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

const { vehicleInfoDetail, part1Data, part21DataInfo, part24Data, part3Data, part3Info, part231Data, part21Data, part22Data, part232Data, part233Data, part232DataInfo, part233DataInfo, part234Data, alarmInfo, part242Data, part243Data, part231DataInfo, part22DataInfo, part234DataInfo, chartContainer1Values, chartContainer2Values, chartContainer3Values, chartContainer4Values } = data


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

  var xAxisData = ['${data.firstMonthName}', '${data.secondMonthName}', '${data.thirdMonthName}'],
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
    busVehicleNumbers.push('${part231Data.busFirstMonthAlarmNumber}');
    busVehicleNumbers.push('${part231Data.busSecondMonthAlarmNumber}');
    busVehicleNumbers.push('${part231Data.busThirdMonthAlarmNumber}');
    legendData.push(alllegendData[0])
    seriesData.push({ name: '班线客运', type: 'bar', barGap: 0, barWidth: 20, data: busVehicleNumbers })

  }
  if ((part231Data.tourFirstMonthAlarmNumber !== "0") || (part231Data.tourSecondMonthAlarmNumber !== "0") || (part231Data.tourThirdMonthAlarmNumber !== "0")) {
    tourVehicleNumbers.push('${part231Data.tourFirstMonthAlarmNumber}');
    tourVehicleNumbers.push('${part231Data.tourSecondMonthAlarmNumber}');
    tourVehicleNumbers.push('${part231Data.tourThirdMonthAlarmNumber}');
    legendData.push(alllegendData[1])
    seriesData.push({ name: '旅游客运', type: 'bar', barWidth: 20, data: tourVehicleNumbers })
  }
  if ((part231Data.dangerFirstMonthAlarmNumber !== "0") || (part231Data.dangerSecondMonthAlarmNumber !== "0") || (part231Data.dangerThirdMonthAlarmNumber !== "0")) {
    dangerVehicleNumbers.push('${part231Data.dangerFirstMonthAlarmNumber}');
    dangerVehicleNumbers.push('${part231Data.dangerSecondMonthAlarmNumber}');
    dangerVehicleNumbers.push('${part231Data.dangerThirdMonthAlarmNumber}');
    legendData.push(alllegendData[2])
    seriesData.push({ name: '危险品运输', type: 'bar', barWidth: 20, data: dangerVehicleNumbers })
  }
  allXAxisData.push('${part231Data.firstMonthTotalAlarmNumber}');
  allXAxisData.push('${part231Data.secondMonthTotalAlarmNumber}');
  allXAxisData.push('${part231Data.thirdMonthTotalAlarmNumber}');
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

  var xAxisData = ['${data.firstMonthName}', '${data.secondMonthName}', '${data.thirdMonthName}'],
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
    busVehicleNumbers.push('${part232Data.busFirstMonthAlarmNumber}');
    busVehicleNumbers.push('${part232Data.busSecondMonthAlarmNumber}');
    busVehicleNumbers.push('${part232Data.busThirdMonthAlarmNumber}');
    legendData.push(alllegendData[0])
    seriesData.push({ name: '班线客运', type: 'bar', barGap: 0, barWidth: 20, data: busVehicleNumbers })

  }
  if ((part232Data.tourFirstMonthAlarmNumber !== "0") || (part232Data.tourSecondMonthAlarmNumber !== "0") || (part232Data.tourThirdMonthAlarmNumber !== "0")) {
    tourVehicleNumbers.push('${part232Data.tourFirstMonthAlarmNumber}');
    tourVehicleNumbers.push('${part232Data.tourSecondMonthAlarmNumber}');
    tourVehicleNumbers.push('${part232Data.tourThirdMonthAlarmNumber}');
    legendData.push(alllegendData[1])
    seriesData.push({ name: '旅游客运', type: 'bar', barWidth: 20, data: tourVehicleNumbers })
  }
  if ((part232Data.dangerFirstMonthAlarmNumber !== "0") || (part232Data.dangerSecondMonthAlarmNumber !== "0") || (part232Data.dangerThirdMonthAlarmNumber !== "0")) {
    dangerVehicleNumbers.push('${part232Data.dangerFirstMonthAlarmNumber}');
    dangerVehicleNumbers.push('${part232Data.dangerSecondMonthAlarmNumber}');
    dangerVehicleNumbers.push('${part232Data.dangerThirdMonthAlarmNumber}');
    legendData.push(alllegendData[2])
    seriesData.push({ name: '危险品运输', type: 'bar', barWidth: 20, data: dangerVehicleNumbers })
  }
  allXAxisData.push('${part232Data.firstMonthTotalAlarmNumber}');
  allXAxisData.push('${part232Data.secondMonthTotalAlarmNumber}');
  allXAxisData.push('${part232Data.thirdMonthTotalAlarmNumber}');
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

  var xAxisData = ['${data.firstMonthName}', '${data.secondMonthName}', '${data.thirdMonthName}'],
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
    busVehicleNumbers.push('${part233Data.busFirstMonthAlarmNumber}');
    busVehicleNumbers.push('${part233Data.busSecondMonthAlarmNumber}');
    busVehicleNumbers.push('${part233Data.busThirdMonthAlarmNumber}');
    legendData.push(alllegendData[0])
    seriesData.push({ name: '班线客运', type: 'bar', barGap: 0, barWidth: 20, data: busVehicleNumbers })

  }
  if ((part233Data.tourFirstMonthAlarmNumber !== "0") || (part233Data.tourSecondMonthAlarmNumber !== "0") || (part233Data.tourThirdMonthAlarmNumber !== "0")) {
    tourVehicleNumbers.push('${part233Data.tourFirstMonthAlarmNumber}');
    tourVehicleNumbers.push('${part233Data.tourSecondMonthAlarmNumber}');
    tourVehicleNumbers.push('${part233Data.tourThirdMonthAlarmNumber}');
    legendData.push(alllegendData[1])
    seriesData.push({ name: '旅游客运', type: 'bar', barWidth: 20, data: tourVehicleNumbers })
  }
  if ((part233Data.dangerFirstMonthAlarmNumber !== "0") || (part233Data.dangerSecondMonthAlarmNumber !== "0") || (part233Data.dangerThirdMonthAlarmNumber !== "0")) {
    dangerVehicleNumbers.push('${part233Data.dangerFirstMonthAlarmNumber}');
    dangerVehicleNumbers.push('${part233Data.dangerSecondMonthAlarmNumber}');
    dangerVehicleNumbers.push('${part233Data.dangerThirdMonthAlarmNumber}');
    legendData.push(alllegendData[2])
    seriesData.push({ name: '危险品运输', type: 'bar', barWidth: 20, data: dangerVehicleNumbers })
  }
  allXAxisData.push('${part233Data.firstMonthTotalAlarmNumber}');
  allXAxisData.push('${part233Data.secondMonthTotalAlarmNumber}');
  allXAxisData.push('${part233Data.thirdMonthTotalAlarmNumber}');
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

  var xAxisData = ['${data.firstMonthName}', '${data.secondMonthName}', '${data.thirdMonthName}'],
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
    busVehicleNumbers.push('${part234Data.busFirstMonthAlarmNumber}');
    busVehicleNumbers.push('${part234Data.busSecondMonthAlarmNumber}');
    busVehicleNumbers.push('${part234Data.busThirdMonthAlarmNumber}');
    legendData.push(alllegendData[0])
    seriesData.push({ name: '班线客运', type: 'bar', barGap: 0, barWidth: 20, data: busVehicleNumbers })

  }
  if ((part234Data.tourFirstMonthAlarmNumber !== "0") || (part234Data.tourSecondMonthAlarmNumber !== "0") || (part234Data.tourThirdMonthAlarmNumber !== "0")) {
    tourVehicleNumbers.push('${part234Data.tourFirstMonthAlarmNumber}');
    tourVehicleNumbers.push('${part234Data.tourSecondMonthAlarmNumber}');
    tourVehicleNumbers.push('${part234Data.tourThirdMonthAlarmNumber}');
    legendData.push(alllegendData[1])
    seriesData.push({ name: '旅游客运', type: 'bar', barWidth: 20, data: tourVehicleNumbers })
  }
  if ((part234Data.dangerFirstMonthAlarmNumber !== "0") || (part234Data.dangerSecondMonthAlarmNumber !== "0") || (part234Data.dangerThirdMonthAlarmNumber !== "0")) {
    dangerVehicleNumbers.push('${part234Data.dangerFirstMonthAlarmNumber}');
    dangerVehicleNumbers.push('${part234Data.dangerSecondMonthAlarmNumber}');
    dangerVehicleNumbers.push('${part234Data.dangerThirdMonthAlarmNumber}');
    legendData.push(alllegendData[2])
    seriesData.push({ name: '危险品运输', type: 'bar', barWidth: 20, data: dangerVehicleNumbers })
  }
  allXAxisData.push('${part234Data.firstMonthTotalAlarmNumber}');
  allXAxisData.push('${part234Data.secondMonthTotalAlarmNumber}');
  allXAxisData.push('${part234Data.thirdMonthTotalAlarmNumber}');

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
  var alllegendData = ['喝水/吃东西', '打哈欠（生理疲劳）', '打电话', '抽烟', '闭眼过长', '摄像头被扭转/遮挡'],
    allcolor = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000', '#70AD47', '#4472C4'],
    legendData = [],
    seriesData = [],
    color = [];
  var dringNumber = part3Data.dringNumber;
  if ((dringNumber !== "") && (dringNumber !== "0")) {
    legendData.push(alllegendData[0])
    seriesData.push({ value: part3Data.dringNumber, name: '喝水/吃东西' })
    color.push(allcolor[0])
  }
  var yawmNumber = part3Data.yawmNumber;
  if ((yawmNumber !== "") && (yawmNumber !== "0")) {
    legendData.push(alllegendData[1])
    seriesData.push({ value: part3Data.yawmNumber, name: '打哈欠（生理疲劳）' })
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
    seriesData.push({ value: part3Data.closedEyesNumber, name: '闭眼过长' })
    color.push(allcolor[4])
  }
  var cameraNumber = part3Data.cameraNumber;
  if ((cameraNumber !== "") && (cameraNumber !== "0")) {
    legendData.push(alllegendData[5])
    seriesData.push({ value: part3Data.cameraNumber, name: '摄像头被扭转/遮挡' })
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

  var xAxisData = ['${data.firstMonthName}', '${data.secondMonthName}', '${data.thirdMonthName}'],
    legendData = ['智能设备报警次数', '线性（智能设备报警次数）'],
    seriesData = [],
    allXAxisData = [];

  allXAxisData.push('${part3Data.firstMonthAlarmNumber}');
  allXAxisData.push('${part3Data.secondMonthAlarmNumber}');
  allXAxisData.push('${part3Data.thirdMonthAlarmNumber}');

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
