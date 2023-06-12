$(function () {
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
          $("#downloadForm").append('<input type="hidden" name="' + paramName + i + '" value="' + data + '" />');
      }
  }

  $("#downloadDoc").click(function () {
      $("#downloadForm").html('');
      //将图片转为base64传递到后台
      getPicData("chartContainer1", "char1Data");
      getPicData("chartContainer2", "char2Data");
      getPicData("chartContainer3", "char3Data");
      getPicData("chartContainer4", "char4Data");
      getPicData("chartContainer5", "char5Data");
      getPicData("chartContainer6", "char6Data");
      getPicData("chartContainer7", "char7Data");
      $("#downloadForm").submit();
  });
});

initChartContainer1();
initChartContainer2();
initChartContainer3();
initChartContainer4();
initChartContainer5();
initChartContainer6();
initChartContainer7();

function initChartContainer1() {
  var allLegendData = [{name: '班线客运', icon: 'square'},
      {name: '旅游客运', icon: 'square'},
      {name: '危运', icon: 'square'},
      {name: '普通货运', icon: 'square'}];
  var allSeriesData = ${chartContainer1Values};
  var allColor = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000'];
  var showLegendData=[];
  var showSeriesData=[];
  var busVehicleNumber = "${part1Data.busVehicleNumber}";
  if((busVehicleNumber !== "") && (busVehicleNumber !== "0")) {
      showLegendData.push(allLegendData[0]);
      showSeriesData.push(allSeriesData[0]);
  }
  var tourVehicleNumber = "${part1Data.tourVehicleNumber}";
  if((tourVehicleNumber !== "") && (tourVehicleNumber !== "0")) {
      showLegendData.push(allLegendData[1]);
      showSeriesData.push(allSeriesData[1]);
  }
  var dangerVehicleNumber = "${part1Data.dangerVehicleNumber}";
  if((dangerVehicleNumber !=="") && (dangerVehicleNumber !== "0")) {
      showLegendData.push(allLegendData[2]);
      showSeriesData.push(allSeriesData[2]);
  }
  var goodsVehicleNumber = "${part1Data.goodsVehicleNumber}";
  if((goodsVehicleNumber !== "") && (goodsVehicleNumber !== "0")) {
      showLegendData.push(allLegendData[3]);
      showSeriesData.push(allSeriesData[3]);
  }
  var showColor=allColor.slice(0,showLegendData.length);

  var config = {
      containerId: 'chartContainer1',
      title: '各类营运车辆数占比',
      legendData: showLegendData,
      seriesData:showSeriesData,
      color:showColor
  }
  initPieChartContainer(config);
}

function initChartContainer2() {
  var seriesDataArray = ${chartContainer2Values};
  if (!seriesDataArray) {
      seriesDataArray = [[], [], []]
  }
  var allXAxisData = ['班线客运', '旅游客运', '危运', '普通货运'];
  var speedingDatas = seriesDataArray[0];
  var fatigueDatas = seriesDataArray[1];
  var t25Datas = seriesDataArray[2];
  var showXAxisData = [];
  var showSpeedingDatas = [];
  var showFatigueDatas = [];
  var showT25Datas = [];
  if(!((speedingDatas[0] === "0") && (fatigueDatas[0] === "0") && (t25Datas[0] === "0"))) {
      showXAxisData.push(allXAxisData[0]);
      showSpeedingDatas.push(speedingDatas[0]);
      showFatigueDatas.push(fatigueDatas[0]);
      showT25Datas.push(t25Datas[0]);
  }
  if(!((speedingDatas[1] === "0") && (fatigueDatas[1] === "0") && (t25Datas[1] === "0"))) {
      showXAxisData.push(allXAxisData[1]);
      showSpeedingDatas.push(speedingDatas[1]);
      showFatigueDatas.push(fatigueDatas[1]);
      showT25Datas.push(t25Datas[1]);
  }
  if(!((speedingDatas[2] === "0") && (fatigueDatas[2] === "0") && (t25Datas[2] === "0"))) {
      showXAxisData.push(allXAxisData[2]);
      showSpeedingDatas.push(speedingDatas[2]);
      showFatigueDatas.push(fatigueDatas[2]);
      showT25Datas.push(t25Datas[2]);
  }
  if(!((speedingDatas[3] === "0") && (fatigueDatas[3] === "0") && (t25Datas[3] === "0"))) {
      showXAxisData.push(allXAxisData[3]);
      showSpeedingDatas.push(speedingDatas[3]);
      showFatigueDatas.push(fatigueDatas[3]);
      showT25Datas.push(t25Datas[3]);
  }


  var config = {
      containerId: 'chartContainer2',
      title: '${data.areaName}${data.summaryReportDate}报警情况统计表',
      legendData: [{name: '超速', icon: 'square'},
          {name: '疲劳驾驶', icon: 'square'},
          {name: '凌晨2-5时禁驾', icon: 'square'}],
      xAxisData: showXAxisData,
      seriesData: [{name: '超速', type: 'bar', barGap: 0, barWidth: 20, data: showSpeedingDatas},
          {name: '疲劳驾驶', type: 'bar', barWidth: 20, data: showFatigueDatas},
          {name: '凌晨2-5时禁驾', type: 'bar', barWidth: 20, data: showT25Datas}
      ],
      color: ['#5B9BD5', '#ED7D31', '#A5A5A5']
  }
  initRectangleChartContainer(config);
}

function initChartContainer3() {
  var config = {
      containerId: 'chartContainer3',
      title: '三类违规报警次数占比情况',
      legendData: [{name: '超速', icon: 'square'},
          {name: '疲劳驾驶', icon: 'square'},
          {name: '凌晨2-5时禁驾', icon: 'square'}],
      seriesData: ${chartContainer3Values},
      color: ['#5B9BD5', '#ED7D31', '#A5A5A5']
  }
  initPieChartContainer(config);
}

function initChartContainer4() {
  var boolArr = $("#part5Chart1TableId").attr("ref").split(",");
  iniPart5tChartContainer('chartContainer4', '车辆报警趋势分析统计表', ${chartContainer4Values},boolArr);
}

function initChartContainer5() {
  var boolArr = $("#part5Chart2TableId").attr("ref").split(",");
  iniPart5tChartContainer('chartContainer5', '超速报警趋势分析表', ${chartContainer5Values},boolArr);
}

function initChartContainer6() {
  var boolArr = $("#part5Chart3TableId").attr("ref").split(",");
  iniPart5tChartContainer('chartContainer6', '疲劳驾驶报警趋势分析表', ${chartContainer6Values},boolArr);
}

function initChartContainer7() {
  var boolArr = $("#part5Chart4TableId").attr("ref").split(",");
  var seriesDataArray = ${chartContainer7Values};
  if (!seriesDataArray) {
      seriesDataArray = [[], [], []]
  }
  var allXAxisData = ['班线客运', '旅游客运', '合计'];
  var lastMonthData = seriesDataArray[0];
  var currentMonthData = seriesDataArray[1];
  var showXAxisData=[];
  var showLastMonthData=[];
  var showCurrentMonthData=[];
  for(var i=0;i<boolArr.length;i++) {
      if(boolArr[i] !== "true") {
          showXAxisData.push(allXAxisData[i]);
          showLastMonthData.push(lastMonthData[i]);
          showCurrentMonthData.push(currentMonthData[i]);
      }
  }
  showXAxisData.push('合计');
  showLastMonthData.push(lastMonthData[allXAxisData.length-1]);
  showCurrentMonthData.push(currentMonthData[allXAxisData.length-1]);

  var config = {
      containerId: 'chartContainer7',
      title: '凌晨2-5时禁行报警趋势分析表',
      legendData: [{name: '上月', icon: 'square'},
          {name: '本月', icon: 'square'}],
      xAxisData: showXAxisData,
      seriesData: [
          {name: '上月', type: 'bar', barGap: 0, barWidth: 20, data: showLastMonthData},
          {name: '本月', type: 'bar', barWidth: 20, data: showCurrentMonthData}
      ],
      color: ['#5B9BD5', '#ED7D31']
  }
  initRectangleChartContainer(config);
}

function iniPart5tChartContainer(containerId, title, seriesDataArray,boolArr) {
  if (!seriesDataArray) {
      seriesDataArray = [[], [], []]
  }
  var allXAxisData = ['班线客运', '旅游客运', '危险品运输', '普通货运', '合计'];
  var lastMonthData = seriesDataArray[0];
  var currentMonthData = seriesDataArray[1];
  var showXAxisData=[];
  var showLastMonthData=[];
  var showCurrentMonthData=[];
  for(var i=0;i<boolArr.length;i++) {
      if(boolArr[i] !== "true") {
          showXAxisData.push(allXAxisData[i]);
          showLastMonthData.push(lastMonthData[i]);
          showCurrentMonthData.push(currentMonthData[i]);
      }
  }
  showXAxisData.push('合计');
  showLastMonthData.push(lastMonthData[allXAxisData.length-1]);
  showCurrentMonthData.push(currentMonthData[allXAxisData.length-1]);

  var config = {
      containerId: containerId,
      title: title,
      legendData: [{name: '上月', icon: 'square'},
          {name: '本月', icon: 'square'}],
      xAxisData: showXAxisData,
      seriesData: [
          {name: '上月', type: 'bar', barGap: 0, barWidth: 20, data: showLastMonthData},
          {name: '本月', type: 'bar', barWidth: 20, data: showCurrentMonthData}
      ],
      color: ['#5B9BD5', '#ED7D31']
  }
  initRectangleChartContainer(config);
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
              axisTick: {show: false},
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