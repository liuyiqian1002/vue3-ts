<template>
  <div>
    <div class="fullpage">
      <div class="brief">
        {{ `${data.provinceReportName || ''}${data.cityName || ''}${data.summaryReportShowDate || ''}简报` }}&nbsp;&nbsp;
        <shiro:hasPermission name="statistics-report-download">
          <a href="javascript:" id="downloadDoc">下载word</a>
        </shiro:hasPermission>
      </div>
      <div class="img-wrapper text-center">
        <!-- <img src="../statics/img/data/monthlyAnalyze.png" alt=""> -->
      </div>
      <h1 class="page-title text-center">湖北省道路运输安全第三方监测</h1>
      <h1 class="page-title text-center">
        {{ data.summaryReportDate }}简报
      </h1>
      <h2 class="city text-center">（<i class="red">{{ data.areaName }}-普货</i>）</h2>

      <h3 class="company text-center">湖北车安达信息科技有限公司</h3>
      <h3 class="date text-center red">{{ data.summaryReportGenerateDate }}</h3>
    </div>
    <!-- 目录页 -->
    <div class="fullpage menu content-wrapper text-center">
      <h1 class="page-title text-center" style="font-size: 29px;margin-top:150px;">目录</h1>
      <h5 class="sub-menu">
        <span class="song"> 一、{{ data.areaName }}普货车辆监测情况分析</span>
        <span class="pagenum">2</span>
        <span class="menu-dot">..................................</span>
      </h5>
      <h5 class="sub-menu">
        <span class="song">二、区（县）所普货车辆报警情况</span>
        <span class="pagenum">3</span>
        <span class="menu-dot">................................</span>
      </h5>
      <h5 class="sub-menu">
        <span class="song">三、企业普货车辆超速、疲劳驾驶二类报警情况</span>
        <span class="pagenum">6</span>
        <span class="menu-dot">..................................</span>
      </h5>
      <h5 class="sub-menu">
        <span class="song">四、超速、疲劳驾驶二类报警普货车辆排名情况</span>
        <span class="pagenum">9</span>
        <span class="menu-dot">..................................</span>
      </h5>
      <h5 class="sub-menu">
        <span class="song">五、超速、疲劳驾驶二类报警对比上月情况</span>
        <span class="pagenum">12</span>
        <span class="menu-dot">..................................</span>
      </h5>
      <h5 class="sub-menu">
        <span class="song">六、其他类型报警区（县）级报警情况</span>
        <span class="pagenum">13</span>
        <span class="menu-dot">..........................</span>
      </h5>
    </div>
    <!-- 内容页 -->
    <div class="content-wrapper">
      <p class="text-wrapper">
        车安达第三方监测平台在湖北省道路运输管理局的领导下，对湖北省道路运输营运车辆开展了动态监测及数据分析工作。
        现将{{ data.summaryReportDate }}
        {{ data.areaName }}工作情况汇报如下：
      </p>

      <!-- 一 -->
      <h3 class="content-title">
        一、<i class="red">{{ data.areaName }}</i>普货车辆监测情况分析
      </h3>
      <p class="text-wrapper">
        {{ data.summaryReportDate2 }}，
        {{ data.areaName }}接入我平台普货（总质量12吨）车辆共
        <i class="red">{{ part1Data.goodsVehicleNumber }}</i>台，普货（总质量12吨）车辆报警总事件数为{{ part1Data.goodsAlarmNumber }}次，车均报警{{
          part1Data.goodsAvgAlarmNumber }}次。
      </p>
      <div class="text-center img-wrapper">
        <div id="chartContainer1" style="height: 350px;width: 500px;display: inline-block;"></div>
      </div>
      <!-- 二 -->
      <h3 class="content-title">
        二、区（县）所普货车辆报警情况
      </h3>
      <p class="text-wrapper">
        普货（总质量12吨）违规车辆报警均值排名{{ part2Data.goodsAlarmNumberTop3Prefix }}为：<i class="red">{{
          part2Data.goodsAlarmNumberTop3District }}</i>，分别为：<i class="red">{{ part2Data.goodsAlarmNumberTop3Value }}</i>。
      </p>

      <div v-if="part2Data.goodsAlarmInfos.length > 0">
        <h4 class="table-title text-center">
          {{ data.summaryReportDate }}普货（总质量12吨）车辆报警情况排名表
        </h4>
        <div class="table-wrapper">
          <table class="table" border="1">
            <tr>
              <th>排名</th>
              <th>辖区</th>
              <th>企业报警户数</th>
              <th>报警车辆数</th>
              <th>超速报警</th>
              <th>疲劳驾驶</th>
              <th>报警总次数</th>
              <th>报警均值</th>
            </tr>
            <!-- <c:forEach v-for="item in part2Data.goodsAlarmInfos" var="item"> -->
            <tr v-for="item in part2Data.goodsAlarmInfos">
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
              <td>{{ part2Data.goodsAlarmInfosSum.companyNumber }}</td>
              <td>{{ part2Data.goodsAlarmInfosSum.vehicleNumber }}</td>
              <td>{{ part2Data.goodsAlarmInfosSum.speedingAlarmNumber }}</td>
              <td>{{ part2Data.goodsAlarmInfosSum.fatigueAlarmNumber }}</td>
              <td>{{ part2Data.goodsAlarmInfosSum.totalAlarmNumber }}</td>
              <td>{{ part2Data.goodsAlarmInfosSum.avgAlarmNumber }}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- 三 -->
      <h3 class="content-title">
        三、企业普货车辆超速、疲劳驾驶二类报警情况
      </h3>
      <p class="text-wrapper">
        从各企业违规车辆报警均值情况来看，普货（总质量12吨）违规车辆报警均值{{ part3Data.goodsAlarmNumberTop3Prefix }}企业为：<i class="red">{{
          part3Data.goodsAlarmNumberTop3Company }}</i>，分别为：{{ part3Data.goodsAlarmNumberTop3Value }}。
      </p>

      <div v-if="part3Data.goodsCompanyAlarmRankingInfos.length > 0">
        <h4 class="table-title text-center">
          {{ data.summaryReportDate }}普货（总质量12吨）企业报警情况排名表
        </h4>
        <div class="table-wrapper">
          <table class="table" border="1">
            <tr>
              <th>排名</th>
              <th>辖区</th>
              <th>企业名称</th>
              <th>报警车辆数</th>
              <th>报警次数</th>
              <th>报警均值</th>
            </tr>
            <!-- <c:forEach v-for="item in part3Data.goodsCompanyAlarmRankingInfos" var="item"> -->
            <tr v-for="item in part3Data.goodsCompanyAlarmRankingInfos">
              <td>{{ item.serialNo }}</td>
              <td>{{ item.areaName }}</td>
              <td>{{ item.companyName }}</td>
              <td>{{ item.vehicleNumber }}</td>
              <td>{{ item.alarmNumber }}</td>
              <td>{{ item.avgAlarmNumber }}</td>
            </tr>
            <!-- </c:forEach> -->
          </table>
        </div>
      </div>

      <!-- 四 -->
      <h3 class="content-title">
        四、超速、疲劳驾驶二类报警普货车辆排名情况
      </h3>
      <p class="text-wrapper">
        从单台车辆报警情况来看，车辆报警次数排名{{ part4Data.alarmNumberTop3Prefix }}为：<i class="red">{{ part4Data.alarmNumberTop3Vehicles
        }}</i>
        ，分别为：<i class="red">{{ part4Data.alarmNumberTop3Value }}</i>。
      </p>

      <h4 class="table-title text-center">
        {{ data.summaryReportDate }}全市普货车辆报警情况排名表
      </h4>
      <div class="table-wrapper">
        <table class="table" border="1">
          <tr>
            <th>排名</th>
            <th>辖区</th>
            <th>企业名称</th>
            <th>营运类型</th>
            <th>车牌号</th>
            <th>报警次数</th>
          </tr>
          <!-- <c:forEach v-for="item in part4Data.allVehicleAlarmInfos" var="item"> -->
          <tr v-for="item in part4Data.allVehicleAlarmInfos">
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.operatorType }}</td>
            <td>{{ item.plateNum }}</td>
            <td>{{ item.alarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
        </table>
      </div>

      <h2 class="text-center">以下是各区（县）报警次数排名前五的普货车辆。</h2>
      <br />
      <h4 class="table-title text-center">
        {{ data.summaryReportDate + data.areaName }}普货车辆报警情况排名表
      </h4>
      <div class="table-wrapper">
        <table class="table" border="1">
          <tr>
            <th>序号</th>
            <th>区所</th>
            <th>排名</th>
            <th>企业名称</th>
            <th>营运类型</th>
            <th>车牌号</th>
            <th>报警次数</th>
          </tr>
          <!-- <c:forEach v-for="areaItem in part4Data.areaVehicleAlarmInfos" var="areaItem"> -->
          <div v-for="areaItem in part4Data.areaVehicleAlarmInfos">
            <tr v-for="companyItem, index in areaItem.companyVehicleAlarmInfo">
              <!-- <c:if v-if="vs.first" -->
              <td v-if="index === 0" :rowspan="areaItem.companyVehicleAlarmInfo.length">{{ areaItem.serialNo }}</td>
              <td v-if="index === 0" :rowspan="areaItem.companyVehicleAlarmInfo.length">{{ areaItem.areaName }}</td>
              <!-- </c:if> -->
              <td>{{ companyItem.serialNo }}</td>
              <td>{{ companyItem.companyName }}</td>
              <td>{{ companyItem.operatorType }}</td>
              <td>{{ companyItem.plateNum }}</td>
              <td>{{ companyItem.alarmNumber }}</td>
            </tr>
          </div>
          <!-- </c:forEach> -->
        </table>
      </div>

      <!-- 五 -->
      <h3 class="content-title">
        五、超速、疲劳驾驶二类报警对比上月情况
      </h3>
      <p class="text-wrapper">
        对比上月超速、疲劳驾驶二类报警情况来看，
        全市普货车辆报警总体{{ part5Data.allAlarmRelativeRatio }}。其中超速报警{{ part5Data.speedingAlarmRelativeRatio }}，疲劳驾驶报警{{
          part5Data.fatigueAlarmRelativeRatio }}。
      </p>
      <div class="img-wrapper text-center">
        <div id="chartContainer4" style="height: 300px;width: 500px;display: inline-block;"></div>

        <table class="img-table" border="1">
          <tr>
            <th></th>
            <th>上月</th>
            <th>本月</th>
          </tr>
          <tr>
            <th>普通货运</th>
            <th>{{ part5Data.allAlarmTendencyInfo.lastMonth.goodsAlarmNumber }}</th>
            <th>{{ part5Data.allAlarmTendencyInfo.thisMonth.goodsAlarmNumber }}</th>
          </tr>
        </table>
      </div>
      <div class="img-wrapper text-center">
        <div id="chartContainer5" style="height: 300px;width: 500px;display: inline-block;"></div>

        <table class="img-table" border="1">
          <tr>
            <th></th>
            <th>上月</th>
            <th>本月</th>
          </tr>
          <tr>
            <th>普通货运</th>
            <th>{{ part5Data.speedingAlarmTendencyInfo.lastMonth.goodsAlarmNumber }}</th>
            <th>{{ part5Data.speedingAlarmTendencyInfo.thisMonth.goodsAlarmNumber }}</th>
          </tr>
        </table>
      </div>
      <div class="img-wrapper text-center">
        <div id="chartContainer6" style="height: 300px;width: 500px;display: inline-block;"></div>
        <table class="img-table" border="1">
          <tr>
            <th></th>
            <th>上月</th>
            <th>本月</th>
          </tr>
          <tr>
            <th>普通货运</th>
            <th>{{ part5Data.fatigueAlarmTendencyInfo.lastMonth.goodsAlarmNumber }}</th>
            <th>{{ part5Data.fatigueAlarmTendencyInfo.thisMonth.goodsAlarmNumber }}</th>
          </tr>
        </table>
      </div>
      <div class="img-wrapper text-center">
        <div id="chartContainer7" style="height: 300px;width: 500px;display: inline-block;"></div>
        <!-- <c:set var="part5Chart4TableBus"
        value="${part5Data.t25AlarmTendencyInfo.lastMonth.busAlarmNumber == '0' && part5Data.t25AlarmTendencyInfo.thisMonth.busAlarmNumber == '0'}" />
      <c:set var="part5Chart4TableTour"
        value="${part5Data.t25AlarmTendencyInfo.lastMonth.tourAlarmNumber == '0' && part5Data.t25AlarmTendencyInfo.thisMonth.tourAlarmNumber == '0'}" /> -->
        <table class="img-table" border="1" id="part5Chart4TableId" :refTest="`${part5Chart4TableBus},${part5Chart4TableTour}`">

          <tr>
            <th></th>
            <th>上月</th>
            <th>本月</th>
          </tr>
          <tr>
            <th>普通货运</th>
            <th>{{ part5Data.t25AlarmTendencyInfo.lastMonth.goodsAlarmNumber }}</th>
            <th>{{ part5Data.t25AlarmTendencyInfo.thisMonth.goodsAlarmNumber }}</th>
          </tr>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup lang="tsx">
import * as echarts from "echarts";

const { title, data } = defineProps({
  title: { type: String, default: () => '' },
  data: { type: Object, default: () => [] }
})
const { chartContainer1Values, chartContainer2Values, chartContainer3Values, chartContainer4Values, chartContainer5Values, chartContainer6Values, chartContainer7Values, part1Data, part2Data, part3Data, part4Data, part5Data, part6Data } = data

let part1ChartTableBus = part1Data.busSpeedingAlarmNumber == '0' && part1Data.busFatigueAlarmNumber == '0' && part1Data.bus25AlarmNumber == '0'
let part1ChartTableTour = part1Data.tourSpeedingAlarmNumber == '0' && part1Data.tourFatigueAlarmNumber == '0' && part1Data.tour25AlarmNumber == '0'
let part1ChartTableDanger = part1Data.dangerSpeedingAlarmNumber == '0' && part1Data.dangerFatigueAlarmNumber == '0' && part1Data.danger25AlarmNumber == '0'
let part1ChartTableGoods = part1Data.goodsSpeedingAlarmNumber == '0' && part1Data.goodsFatigueAlarmNumber == '0' && part1Data.goods25AlarmNumber == '0'

let part5Chart1TableBus = part5Data.allAlarmTendencyInfo.lastMonth.busAlarmNumber == '0' && part5Data.allAlarmTendencyInfo.thisMonth.busAlarmNumber == '0'
let part5Chart1TableTour = part5Data.allAlarmTendencyInfo.lastMonth.tourAlarmNumber == '0' && part5Data.allAlarmTendencyInfo.thisMonth.tourAlarmNumber == '0'
let part5Chart1TableDanger = part5Data.allAlarmTendencyInfo.lastMonth.dangerAlarmNumber == '0' && part5Data.allAlarmTendencyInfo.thisMonth.dangerAlarmNumber == '0'
let part5Chart1TableGoods = part5Data.allAlarmTendencyInfo.lastMonth.goodsAlarmNumber == '0' && part5Data.allAlarmTendencyInfo.thisMonth.goodsAlarmNumber == '0'

let part5Chart2TableBus = part5Data.speedingAlarmTendencyInfo.lastMonth.busAlarmNumber == '0' && part5Data.speedingAlarmTendencyInfo.thisMonth.busAlarmNumber == '0'
let part5Chart2TableTour = part5Data.speedingAlarmTendencyInfo.lastMonth.tourAlarmNumber == '0' && part5Data.speedingAlarmTendencyInfo.thisMonth.tourAlarmNumber == '0'
let part5Chart2TableDanger = part5Data.speedingAlarmTendencyInfo.lastMonth.dangerAlarmNumber == '0' && part5Data.speedingAlarmTendencyInfo.thisMonth.dangerAlarmNumber == '0'
let part5Chart2TableGoods = part5Data.speedingAlarmTendencyInfo.lastMonth.goodsAlarmNumber == '0' && part5Data.speedingAlarmTendencyInfo.thisMonth.goodsAlarmNumber == '0'

let part5Chart3TableBus = part5Data.fatigueAlarmTendencyInfo.lastMonth.busAlarmNumber == '0' && part5Data.fatigueAlarmTendencyInfo.thisMonth.busAlarmNumber == '0'
let part5Chart3TableTour = part5Data.fatigueAlarmTendencyInfo.lastMonth.tourAlarmNumber == '0' && part5Data.fatigueAlarmTendencyInfo.thisMonth.tourAlarmNumber == '0'
let part5Chart3TableDanger = part5Data.fatigueAlarmTendencyInfo.lastMonth.dangerAlarmNumber == '0' && part5Data.fatigueAlarmTendencyInfo.thisMonth.dangerAlarmNumber == '0'
let part5Chart3TableGoods = part5Data.fatigueAlarmTendencyInfo.lastMonth.goodsAlarmNumber == '0' && part5Data.fatigueAlarmTendencyInfo.thisMonth.goodsAlarmNumber == '0'

let part5Chart4TableBus = part5Data.t25AlarmTendencyInfo.lastMonth.busAlarmNumber == '0' && part5Data.t25AlarmTendencyInfo.thisMonth.busAlarmNumber == '0'
let part5Chart4TableTour = part5Data.t25AlarmTendencyInfo.lastMonth.tourAlarmNumber == '0' && part5Data.t25AlarmTendencyInfo.thisMonth.tourAlarmNumber == '0'


console.log(data, 'data');

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
    document.querySelector("#downloadForm").submit();
  });
})();

function initChartContainer2() {
  iniPart5tChartContainer('chartContainer2', '普货车辆报警趋势统计表', chartContainer2Values);
}

function initChartContainer3() {
  iniPart5tChartContainer('chartContainer3', '普货车辆超速报警趋势统计表', chartContainer3Values);
}

function initChartContainer4() {
  iniPart5tChartContainer('chartContainer4', '普货车辆疲劳驾驶报警趋势统计表', chartContainer4Values);
}


function iniPart5tChartContainer(containerId, title, seriesDataArray) {
  if (!seriesDataArray) {
    seriesDataArray = [[]]
    var config = {
      containerId: containerId,
      title: title,
      legendData: [{ name: '普通货运', icon: 'square' }],
      xAxisData: ['上月', '本月'],
      seriesData: [
        { name: '普通货运', type: 'bar', barGap: 0, barWidth: 80, data: seriesDataArray[0] }
      ],
      color: ['#5B9BD5', '#ED7D31']
    }
    initRectangleChartContainer(config);
  }
}

/**
 * 饼图显示
 *  config = {
 *      containerId : 'chartContainer1',
 *      title : '各类营运车辆数占比',
 *      legendData: [{name: '班线客运', icon: 'square'},
 *               {name: '旅游客运', icon: 'square'},
 *               {name: '危运', icon: 'square'},
 *              {name: '普通货运', icon: 'square'}],
 *      seriesData:[
 *                   {value: "310", name: '班线客运'},
 *                   {value: "234", name: '旅游客运'},
 *                   {value: "135", name: '危运'},
 *                   {value: "1548", name: '普通货运'}
 *               ],
 *      color:['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000']
 *  }
 */
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
        fontFamily: '宋体'
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

/**
 * 矩形图显示
 *  config = {
 *      containerId : 'chartContainer1',
 *      title : '各类营运车辆数占比',
 *      legendData: [{name: '班线客运', icon: 'square'},
 *               {name: '旅游客运', icon: 'square'},
 *               {name: '危运', icon: 'square'},
 *              {name: '普通货运', icon: 'square'}],
 *      xAxisData: ['班线客运', '旅游客运', '危运', '普通货运'],
 *      seriesData:[
 *           {
 *               name: '超速',
 *               type: 'bar',
 *               barGap: 0,
 *               barWidth: 20,
 *               data: [6983, 691, 1914, 4318]
 *           },
 *           {
 *               name: '疲劳驾驶',
 *               type: 'bar',
 *               barWidth: 20,
 *               data: [6983, 691, 1914, 4318]
 *           },
 *           {
 *               name: '凌晨2-5时禁驾',
 *               type: 'bar',
 *               barWidth: 20,
 *               data: [6983, 691, 1914, 4318]
 *           }
 *       ],
 *      color:['#5B9BD5', '#ED7D31', '#A5A5A5']
 *  }
 */
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
        fontFamily: '宋体'
      }
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


function initChartContainer1() {

  var config = {
    containerId: 'chartContainer1',
    title: '二类违规报警次数占比情况',
    legendData: [{ name: '超速', icon: 'square' },
    { name: '疲劳驾驶', icon: 'square' }],
    seriesData: chartContainer1Values,
    color: ['#5B9BD5', '#ED7D31']
  }
  initPieChartContainer(config);
}

initChartContainer1();
initChartContainer2();
initChartContainer3();
initChartContainer4();


</script>

<style scoped lang="scss">
@import url(./briefReport.css);
</style>
