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
          <span class="pageNumber">1</span>
        </li>
        <li class="sub-menu pad-left50">
          <span>2.1 营运车辆违规报警情况</span>
          <span class="pageNumber">1</span>
        </li>
        <li class="sub-menu pad-left50">
          <span>2.2 营运车辆违规报警趋势分析</span>
          <span class="pageNumber">2</span>
        </li>
        <li class="sub-menu pad-left50">
          <span>2.3 全市违规报警排名情况</span>
          <span class="pageNumber">4</span>
        </li>
        <li class="sub-menu pad-left100">
          <span>2.3.1区所报警排名情况</span>
          <span class="pageNumber">4</span>
        </li>
        <li class="sub-menu pad-left100">
          <span>2.3.2运输企业报警排名情况</span>
          <span class="pageNumber">4</span>
        </li>
        <li class="sub-menu pad-left100">
          <span>2.3.3营运车辆违规报警排名情况</span>
          <span class="pageNumber">5</span>
        </li>

      </ul>
    </div>
    <!-- 列表页1 -->
    <div class="fullpage" id="text1">
      <h4>一、营运车辆基本情况</h4>
      <p class="textStyle margin-tm text-in">
        {{ vehicleInfoInfo }}
      </p>
      <div class="echartWrapper margin-tm h400" id="chartContainer1"></div>

      <div class="tableWrapper">
        <h3>普货车辆分布情况</h3>
        <table class="img-table img-table-other" border="1">
          <tr>
            <th style="width: 85px; line-height: normal"></th>
            <c:forEach v-for="item in baseAlarmInfo.goodsVehicleTypeInfos" var="li">
              <th>{{ item.cityName }}</th>
            </c:forEach>
          </tr>
          <tr>
            <td>普通货运</td>
            <c:forEach v-for="item in baseAlarmInfo.goodsVehicleTypeInfos" var="li">
              <td>{{ item.goodsVehicleNumber }}</td>
            </c:forEach>
          </tr>
        </table>
      </div>
    </div>
    <!-- 列表页2.1 -->
    <div class="fullpage" id="text2">
      <h4>二、营运车辆违规报警情况</h4>
      <h4>2.1 营运车辆违规报警情况</h4>
      <p class="textStyle margin-tm text-in">
        {{ vehicleAlarmRatioInfo }}
      </p>
      <div class="echartWrapper margin-tm h400" id="chartContainer2"></div>
    </div>
    <!-- 列表页2.2 -->
    <div class="fullpage" id="text4">
      <h4>2.2营运车辆违规报警趋势分析</h4>
      <div>
        <p class="textStyle margin-tm text-in">
          {{ importantVehicleAlarmAnalysis }}
        </p>
        <div class="echartWrapper margin-tm h400" id="chartContainer3"></div>
        <div class="tableWrapper">
          <h3>重点营运车辆违规报警趋势月综合分析</h3>
          <table class="img-table img-table-other" border="1">
            <tr>
              <td></td>
              <td>{{ data.firstMonthName }}</td>
              <td>{{ data.secondMonthName }}</td>
              <td>{{ data.thirdMonthName }}</td>
            </tr>
            <tr>
              <td>普通货运</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleAlarmAnalysis.goodsFirstAlarmNumber }}</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleAlarmAnalysis.goodsSecondAlarmNumber }}</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleAlarmAnalysis.goodsThirdAlarmNumber }}</td>
            </tr>
            <tr>
              <td>合计</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleAlarmAnalysis.goodsFirstAlarmNumber }}</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleAlarmAnalysis.goodsSecondAlarmNumber }}</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleAlarmAnalysis.goodsThirdAlarmNumber }}</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- <%--2.2.2--%> -->
      <div>
        <p class="textStyle margin-tm text-in">
          {{ importantVehicleSpeedingAlarmAnalysis }}
        </p>
        <div class="echartWrapper margin-tm h400" id="chartContainer4"></div>
        <div class="tableWrapper">
          <h3>重点营运车辆超速报警趋势月分析</h3>
          <table class="img-table img-table-other" border="1">
            <tr>
              <td></td>
              <td>{{ data.firstMonthName }}</td>
              <td>{{ data.secondMonthName }}</td>
              <td>{{ data.thirdMonthName }}</td>
            </tr>
            <tr>
              <td>普通货运</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleSpeedingAlarmAnalysis.goodsFirstAlarmNumber }}</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleSpeedingAlarmAnalysis.goodsSecondAlarmNumber }}</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleSpeedingAlarmAnalysis.goodsThirdAlarmNumber }}</td>
            </tr>
            <tr>
              <td>合计</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleSpeedingAlarmAnalysis.goodsFirstAlarmNumber }}</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleSpeedingAlarmAnalysis.goodsSecondAlarmNumber }}</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleSpeedingAlarmAnalysis.goodsThirdAlarmNumber }}</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- <%--2.2.3--%> -->
      <div>
        <p class="textStyle margin-tm text-in">
          {{ importantVehicleTiredAlarmAnalysis }}
        </p>
        <div class="echartWrapper margin-tm h400" id="chartContainer5"></div>
        <div class="tableWrapper">
          <h3>重点营运车辆疲劳驾驶报警趋势月分析</h3>
          <table class="img-table img-table-other" border="1">
            <tr>
              <td></td>
              <td>{{ data.firstMonthName }}</td>
              <td>{{ data.secondMonthName }}</td>
              <td>{{ data.thirdMonthName }}</td>
            </tr>
            <tr>
              <td>普通货运</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleTiredAlarmAnalysis.goodsFirstAlarmNumber }}</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleTiredAlarmAnalysis.goodsSecondAlarmNumber }}</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleTiredAlarmAnalysis.goodsThirdAlarmNumber }}</td>
            </tr>
            <tr>
              <td>合计</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleTiredAlarmAnalysis.goodsFirstAlarmNumber }}</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleTiredAlarmAnalysis.goodsSecondAlarmNumber }}</td>
              <td>{{ importantVehicleAlarmInfo.importantVehicleTiredAlarmAnalysis.goodsThirdAlarmNumber }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!-- 列表页2.3 -->
    <div class="fullpage" id="text5">
      <h4>2.3全市违规报警排名情况</h4>
      <h4 style="margin-top: 20px">2.3.1区所报警排名情况</h4>
      <div class="tableWrapperList" style="width: 100%; margin-left: 0%">
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
          <c:forEach v-for="item in vehicleAlarmRanking.goodsVehicleAlarmRankingInfos" var="item">
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
            <td>{{ vehicleAlarmRanking.goodsVehicleAlarmRankingInfosSum.companyNumber }}</td>
            <td>{{ vehicleAlarmRanking.goodsVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
            <td>{{ vehicleAlarmRanking.goodsVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
            <td>{{ vehicleAlarmRanking.goodsVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>

            <td>{{ vehicleAlarmRanking.goodsVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
            <td>{{ vehicleAlarmRanking.goodsVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
          </tr>
        </table>
      </div>
    </div>
    <!--列表页2.3.2-->
    <div class="fullpage" id="text6">
      <h4>2.3.2运输企业报警排名情况</h4>
      <!--表格1-->
      <div class="tableWrapperList" style="width: 100%; margin-left: 0%">
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
            v-if="transportCompanyAlarmRanking.speedingAlarmRankings != null && transportCompanyAlarmRanking.speedingAlarmRankings.length > 0">
            <c:forEach v-for="item in transportCompanyAlarmRanking.speedingAlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="transportCompanyAlarmRanking.speedingAlarmRankings != null && transportCompanyAlarmRanking.speedingAlarmRankings.length > 0"
            v-for="item, index in transportCompanyAlarmRanking.speedingAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="transportCompanyAlarmRanking.speedingAlarmRankings.length">
              {{ transportCompanyAlarmRanking.speedingAlarmTypeName }}</td>
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
              v-if="transportCompanyAlarmRanking.tiredAlarmRankings != null && transportCompanyAlarmRanking.tiredAlarmRankings.length > 0">
              <c:forEach v-for="item in transportCompanyAlarmRanking.tiredAlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="transportCompanyAlarmRanking.tiredAlarmRankings != null && transportCompanyAlarmRanking.tiredAlarmRankings.length > 0"
            v-for="item, index in transportCompanyAlarmRanking.tiredAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="transportCompanyAlarmRanking.tiredAlarmRankings.length">
              {{ transportCompanyAlarmRanking.tiredAlarmTypeName }}</td>
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


    </div>
    <!--列表页2.3.3-->
    <div class="fullpage" id="text7">
      <h4>2.3.3营运车辆违规报警排名情况</h4>
      <p> 以下为排名前十的车辆</p>

      <div class="tableWrapperList" style="width: 100%; margin-left: 0%">
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
            v-if="operationVehicleRanking.speedingAlarmRankings != null && operationVehicleRanking.speedingAlarmRankings.length > 0">
            <c:forEach v-for="item in operationVehicleRanking.speedingAlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="operationVehicleRanking.speedingAlarmRankings != null && operationVehicleRanking.speedingAlarmRankings.length > 0"
            v-for="item, index in operationVehicleRanking.speedingAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="operationVehicleRanking.speedingAlarmRankings.length">
              {{ operationVehicleRanking.speedingAlarmTypeName }}</td>
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
              v-if="operationVehicleRanking.tiredAlarmRankings != null && operationVehicleRanking.tiredAlarmRankings.length > 0">
              <c:forEach v-for="item in operationVehicleRanking.tiredAlarmRankings" var="item" varStatus="vs"> -->
          <tr
            v-if="operationVehicleRanking.tiredAlarmRankings != null && operationVehicleRanking.tiredAlarmRankings.length > 0"
            v-for="item, index in operationVehicleRanking.tiredAlarmRankings">
            <!-- <c:if test="{{ vs.first }}"> -->
            <td v-if="index === 0" :rowspan="operationVehicleRanking.tiredAlarmRankings.length">
              {{ operationVehicleRanking.tiredAlarmTypeName }}</td>
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


      <p class="textStyle margin-tm text-in">
        {{ alarmInfo }}
      </p>
    </div>
  </div>
</template>

<script setup lang="tsx">
import * as echarts from "echarts";

let { data } = defineProps({
  title: { type: String, default: () => '' },
  data: { type: Object, default: () => { } },
  download: { type: Function, defualt: () => { } }
})
const proxy: any = getCurrentInstance()?.proxy

let { vehicleInfoInfo, baseAlarmInfo, vehicleAlarmRatioInfo, importantVehicleAlarmAnalysis, importantVehicleAlarmInfo, importantVehicleSpeedingAlarmAnalysis, importantVehicleTiredAlarmAnalysis, vehicleAlarmRanking, transportCompanyAlarmRanking, operationVehicleRanking, alarmInfo, allXAxisData, goodsVehicleNumber, legendData, seriesData, vehicleAlarmRatio } = data;

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
initChartContainer2();
//2.2营运车辆违规报警趋势分析
initChartContainer3();
initChartContainer4();
initChartContainer5();

function initChartContainer1() {
  // var allXAxisData = { allXAxisData },
  // goodsVehicleNumber = { goodsVehicleNumber },
  legendData = [{ name: '普通货运', icon: 'square' }],
    seriesData = [{ name: '普通货运', type: 'bar', barGap: 0, barWidth: 20, data: goodsVehicleNumber }];
  var config = {
    containerId: 'chartContainer1',
    title: '普货车辆分布情况',
    legendData: legendData,
    xAxisData: allXAxisData,
    seriesData: seriesData,
    color: ['#5B9BD5']
  }
  initRectangleChartContainer2(config);
}

function initChartContainer2() {
  var showLegendData = [{ name: '超速次数', icon: 'square' }, { name: '疲劳驾驶次数', icon: 'square' }];

  var showSeriesData = [{ name: '超速次数', value: vehicleAlarmRatio.speedingAlarmNumber }, {
    name: '疲劳驾驶次数',
    value: vehicleAlarmRatio.tiredAlarmNumber
  }];

  var config = {
    containerId: 'chartContainer2',
    title: '超速、疲劳驾驶报警占比',
    legendData: showLegendData,
    seriesData: showSeriesData,
    color: ['#5B9BD5', '#ED7D31']
  }
  initPieChartContainer(config);
}

function initChartContainer3() {

  var xAxisData = ['{{ data.firstMonthName }}', '{{ data.secondMonthName }}', '{{ data.thirdMonthName }}'],
    goodsVehicleNumbers = [],
    allXAxisData = [];

  var legendData = [{ name: '普通货运' }, { name: '合计' }],
    seriesData = [];


  goodsVehicleNumbers.push('{{ importantVehicleAlarmInfo.importantVehicleAlarmAnalysis.goodsFirstAlarmNumber }}');
  goodsVehicleNumbers.push('{{ importantVehicleAlarmInfo.importantVehicleAlarmAnalysis.goodsSecondAlarmNumber }}');
  goodsVehicleNumbers.push('{{ importantVehicleAlarmInfo.importantVehicleAlarmAnalysis.goodsThirdAlarmNumber }}');
  seriesData.push({ name: '普通货运', type: 'bar', barGap: 0, barWidth: 20, data: goodsVehicleNumbers });
  seriesData.push({ name: '合计', type: 'line', barGap: 0, barWidth: 20, data: goodsVehicleNumbers });

  var color = ['#5B9BD5', '#ED7D31',];
  var config = {
    containerId: 'chartContainer3',
    title: '重点营运车辆违规报警趋势月综合分析',
    legendData: legendData,
    xAxisData: xAxisData,
    seriesData: seriesData,
    color: color
  };
  initRectangleChartContainer2(config);
}

function initChartContainer4() {

  var xAxisData = ['{{ data.firstMonthName }}', '{{ data.secondMonthName }}', '{{ data.thirdMonthName }}'],
    goodsVehicleNumbers = [],
    allXAxisData = [];

  var legendData = [{ name: '普通货运' }, { name: '合计' }],
    seriesData = [];


  goodsVehicleNumbers.push('{{ importantVehicleAlarmInfo.importantVehicleSpeedingAlarmAnalysis.goodsFirstAlarmNumber }}');
  goodsVehicleNumbers.push('{{ importantVehicleAlarmInfo.importantVehicleSpeedingAlarmAnalysis.goodsSecondAlarmNumber }}');
  goodsVehicleNumbers.push('{{ importantVehicleAlarmInfo.importantVehicleSpeedingAlarmAnalysis.goodsThirdAlarmNumber }}');
  seriesData.push({ name: '普通货运', type: 'bar', barGap: 0, barWidth: 20, data: goodsVehicleNumbers });
  seriesData.push({ name: '合计', type: 'line', barGap: 0, barWidth: 20, data: goodsVehicleNumbers });

  var color = ['#5B9BD5', '#ED7D31',];
  var config = {
    containerId: 'chartContainer4',
    title: '重点营运车辆超速报警趋势月分析',
    legendData: legendData,
    xAxisData: xAxisData,
    seriesData: seriesData,
    color: color
  };
  initRectangleChartContainer2(config);
}

function initChartContainer5() {

  var xAxisData = ['{{ data.firstMonthName }}', '{{ data.secondMonthName }}', '{{ data.thirdMonthName }}'],
    goodsVehicleNumbers = [],
    allXAxisData = [];

  var legendData = [{ name: '普通货运' }, { name: '合计' }],
    seriesData = [];


  goodsVehicleNumbers.push('{{ importantVehicleAlarmInfo.importantVehicleTiredAlarmAnalysis.goodsFirstAlarmNumber }}');
  goodsVehicleNumbers.push('{{ importantVehicleAlarmInfo.importantVehicleTiredAlarmAnalysis.goodsSecondAlarmNumber }}');
  goodsVehicleNumbers.push('{{ importantVehicleAlarmInfo.importantVehicleTiredAlarmAnalysis.goodsThirdAlarmNumber }}');
  seriesData.push({ name: '普通货运', type: 'bar', barGap: 0, barWidth: 20, data: goodsVehicleNumbers });
  seriesData.push({ name: '合计', type: 'line', barGap: 0, barWidth: 20, data: goodsVehicleNumbers });

  var color = ['#5B9BD5', '#ED7D31',];
  var config = {
    containerId: 'chartContainer5',
    title: '重点营运车辆疲劳驾驶报警趋势月分析',
    legendData: legendData,
    xAxisData: xAxisData,
    seriesData: seriesData,
    color: color
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
        // axisTick: { show: false },
        data: config.xAxisData,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false,
          alignWithLabel: true
        },
        /*axisLabel: {
            interval: 0,
            rotate: 30,
            lineHeight: 80,
            textStyle: {
                fontSize: 12,
            }
        }*/
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

<style scoped lang="scss">@import url(./briefReport.css);</style>
