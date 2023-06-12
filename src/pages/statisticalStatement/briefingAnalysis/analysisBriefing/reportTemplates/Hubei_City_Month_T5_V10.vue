<template>
  <div>
    <!-- 封面页 -->
    <div class="fullpage">
      <div class="brief">{{ data.summaryProvinceName }}{{ data.summaryReportDate }}简报&nbsp;&nbsp;
        <!-- <shiro:hasPermission name="statistics-report-download"> -->
        <a href="javascript:" id="downloadDoc">下载word</a>
        <!-- </shiro:hasPermission> -->
      </div>
      <div class="img-wrapper text-center">
        <!-- <img src="../statics/img/briefReport/monthlyAnalyze.png" alt=""> -->
      </div>
      <h1 class="page-title text-center">湖北省道路运输安全第三方监测</h1>
      <h1 class="page-title text-center">
        {{ data.summaryReportDate }}简报
      </h1>
      <h3 class="company text-center">湖北车安达信息科技有限公司</h3>
      <h3 class="date text-center red">{{ data.summaryReportGenerateDate }}</h3>
    </div>
    <!-- 目录页 -->
    <div class="fullpage menu content-wrapper text-center">
      <h1 class="page-title text-center" style="font-size: 29px;margin-top:150px;">目录</h1>
      <h5 class="sub-menu">
        <span class="song"> 一、车辆分布情况</span>
        <span class="pagenum">2</span>
        <span class="menu-dot">.........................................</span>
      </h5>
      <h5 class="sub-menu">
        <span class="song">二、车辆报警情况</span>
        <span class="pagenum">3</span>
        <span class="menu-dot">.........................................</span>
      </h5>
      <h5 class="sm-menu">
        <span class="song">&nbsp;&nbsp&nbsp;&nbsp2.1 车辆报警类型占比</span>
        <span class="pagenum">3</span>
        <span class="menu-dot">...................................</span>
      </h5>
      <h5 class="sm-menu">
        <span class="song">&nbsp;&nbsp&nbsp;&nbsp2.2 重点营运车辆报警情况</span>
        <span class="pagenum">4</span>
        <span class="menu-dot">................................</span>
      </h5>
      <h5 class="sm-menu">
        <span class="song">&nbsp;&nbsp&nbsp;&nbsp2.3 对比上月报警趋势分析</span>
        <span class="pagenum">4</span>
        <span class="menu-dot">................................</span>
      </h5>
      <h5 class="sm-menu">
        <span class="song">&nbsp;&nbsp&nbsp;&nbsp2.4 全省重点营运车辆报警排名</span>
        <span class="pagenum">6</span>
        <span class="menu-dot">.............................</span>
      </h5>
      <h5 class="sm-menu">
        <span class="song">&nbsp;&nbsp&nbsp;&nbsp2.5全省营运车辆报警排名（按营运类型分）</span>
        <span class="pagenum">7</span>
        <span class="menu-dot">.....................</span>
      </h5>
      <h5 class="sub-menu">
        <span class="song">三、各地市州{{ data.summaryMonth }}份情况分析（见附录）</span>
        <span class="pagenum">9</span>
        <span class="menu-dot">.........................</span>
      </h5>
    </div>

    <div class="content-wrapper">
      <p class="text-wrapper" style="    margin-top: 60px;">
        车安达第三方监测平台在湖北省道路运输管理局的领导下，对湖北省道路运输营运车辆开展了动态监测及数据分析工作。现将{{ data.summaryReportDate2 }}工作情况汇报如下：
      </p>

      <!-- 一 -->
      <div>
        <h3 class="content-title">
          一、车辆分布情况
        </h3>
        <p class="text-wrapper">
          截止{{ part1Data.lastMonthLastDay }}，车安达第三方监测平台共监测湖北省道路运输企业共{{ part1Data.companyTotalNumber }}家，平台接入车辆数{{
            part1Data.vehicleTotalNumber }}辆。其中班线客运企业{{ part1Data.busCompanyNumber }}家，车辆{{ part1Data.busVehicleNumber
  }}辆；旅游客运企业{{ part1Data.tourCompanyNumber }}家，车辆{{ part1Data.tourVehicleNumber }}辆；危险品运输企业{{
  part1Data.dangerCompanyNumber }}家，车辆{{ part1Data.dangerVehicleNumber }}辆；普货（12吨以上）企业{{
    part1Data.goodsCompanyNumber }}家，车辆{{ part1Data.goodsVehicleNumber }}辆。

        </p>
        <div class="text-center">
          <h3>全省车辆数统计</h3>
          <table class="img-table" border="1">
            <tr>
              <td>省份</td>
              <td>营运类型</td>
              <td>车辆台数</td>
              <td>占比</td>
            </tr>
            <tr>
              <td rowspan="5">湖北省</td>
              <!-- <c:if v-if="part1Data.busVehicleNumber > 0"> -->
              <th v-if="part1Data.busVehicleNumber > 0">班线客运</th>
              <td v-if="part1Data.busVehicleNumber > 0">{{ part1Data.busVehicleNumber }}</td>
              <td v-if="part1Data.busVehicleNumber > 0">{{ part1Data.busVehicleRatio }}</td>
              <!-- </c:if> -->
            </tr>
            <tr>
              <!-- <c:if v-if="part1Data.tourVehicleNumber > 0"> -->
              <th v-if="part1Data.tourVehicleNumber > 0">旅游客运</th>
              <td v-if="part1Data.tourVehicleNumber > 0">{{ part1Data.tourVehicleNumber }}</td>
              <td v-if="part1Data.tourVehicleNumber > 0">{{ part1Data.tourVehicleRatio }}</td>
              <!-- </c:if> -->
            </tr>
            <tr>
              <!-- <c:if v-if="part1Data.dangerVehicleNumber > 0"> -->
              <th v-if="part1Data.dangerVehicleNumber > 0">危险货物运输</th>
              <td v-if="part1Data.dangerVehicleNumber > 0">{{ part1Data.dangerVehicleNumber }}</td>
              <td v-if="part1Data.dangerVehicleNumber > 0">{{ part1Data.dangerVehicleRatio }}</td>
              <!-- </c:if> -->
            </tr>
            <tr>
              <!-- <c:if v-if="part1Data.goodsVehicleNumber > 0"> -->
              <th v-if="part1Data.goodsVehicleNumber > 0">普通货运</th>
              <td v-if="part1Data.goodsVehicleNumber > 0">{{ part1Data.goodsVehicleNumber }}</td>
              <td v-if="part1Data.goodsVehicleNumber > 0">{{ part1Data.goodsVehicleRatio }}</td>
              <!-- </c:if> -->
            </tr>
            <tr>
              <td>小计</td>
              <td>{{ part1Data.vehicleTotalNumber }}</td>
              <td>100.00%</td>
            </tr>
          </table>
        </div>
        <div class="text-center img-wrapper">
          <div id="chartContainer1" style="height: 350px;width: 500px;display: inline-block;"></div>
        </div>
        <div class="text-center img-wrapper">
          <div id="chartContainer2" style="height: 350px;width: 500px;display: inline-block;"></div>
        </div>
        <div class="text-center">
          <h3>各地级市车辆类型分布情况</h3>
          <table class="img-table img-table-other" border="1">
            <tr>
              <th style="width: 30px"></th>
              <!-- <c:forEach v-for="li in part1Data.cityVehicleTypeInfos" var="li"> -->
              <th v-for="li in part1Data.cityVehicleTypeInfos">{{ li.cityName }}</th>
              <!-- </c:forEach> -->
            </tr>
            <tr>
              <td>班线客运</td>
              <!-- <c:forEach v-for="li in part1Data.cityVehicleTypeInfos" var="li"> -->
              <td v-for="li in part1Data.cityVehicleTypeInfos">{{ li.busVehicleNumber }}</td>
              <!-- </c:forEach> -->
            </tr>
            <tr>
              <td>旅游客运</td>
              <!-- <c:forEach v-for="li in part1Data.cityVehicleTypeInfos" var="li"> -->
              <td v-for="li in part1Data.cityVehicleTypeInfos">{{ li.tourVehicleNumber }}</td>
              <!-- </c:forEach> -->
            </tr>
            <tr>
              <td>危险品运输</td>
              <!-- <c:forEach v-for="li in part1Data.cityVehicleTypeInfos" var="li"> -->
              <td v-for="li in part1Data.cityVehicleTypeInfos">{{ li.dangerVehicleNumber }}</td>
              <!-- </c:forEach> -->
            </tr>
            <tr>
              <td>普通货运</td>
              <!-- <c:forEach v-for="li in part1Data.cityVehicleTypeInfos" var="li"> -->
              <td v-for="li in part1Data.cityVehicleTypeInfos">{{ li.goodsVehicleNumber }}</td>
              <!-- </c:forEach> -->
            </tr>
          </table>
        </div>
      </div>
      <div>
        <h3 class="content-title" style="margin:20px 0;">
          二、车辆报警情况
        </h3>
        <div>
          <h3 class="content-title">
            2.1 车辆报警类型占比
          </h3>
          <p class="text-wrapper">
            {{ part2Data.statisticalTime }}，车安达第三方监测平台监测到车辆违规行为{{ part2Data.allVehicleAlarmNumber }}次，其中超速报警{{
              part2Data.speedingAlarmNumber }}次，疲劳驾驶报警{{ part2Data.fatigueAlarmNumber }}次，凌晨2-5点禁驾报警{{
    part2Data.t25AlarmNumber }}次。
          </p>
          <div class="text-center img-wrapper">
            <div id="chartContainer3" style="height: 350px;width: 500px;display: inline-block;"></div>
          </div>
        </div>
        <div>
          <h3 class="content-title">
            2.2 重点营运车辆报警情况
          </h3>
          <p class="text-wrapper">
            重点营运车辆报警总事件数为{{ part3Data.importantAlarmNumber }}次，车均报警{{ part3Data.vehicleAlarmAverageNumber }}次。其中班线客运车辆{{
              part3Data.busAlarmNumber }}次，车均报警{{ part3Data.busAlarmAverageNumber }}次；旅游客运车辆{{ part3Data.tourAlarmNumber
  }}次，车均报警{{ part3Data.tourAlarmAverageNumber }}次；危险品运输车辆{{ part3Data.dangerAlarmNumber }}次，车均报警{{
  part3Data.dangerAlarmAverageNumber }}次。
          </p>
          <div class="text-center img-wrapper">
            <div id="chartContainer4" style="height: 350px;width: 500px;display: inline-block;"></div>
          </div>
          <div class="text-center">
            <!-- <c:set var="part231ChartTableBus"
              value="${part231Data.busFirstMonthAlarmNumber == '0' && part231Data.busSecondMonthAlarmNumber == '0' && part231Data.busThirdMonthAlarmNumber == '0'}" />
            <c:set var="part231ChartTableTour"
              value="${part231Data.tourFirstMonthAlarmNumber == '0' && part231Data.tourSecondMonthAlarmNumber == '0' && part231Data.tourThirdMonthAlarmNumber == '0'}" />
            <c:set var="part231ChartTableDanger"
              value="${part231Data.dangerFirstMonthAlarmNumber == '0' && part231Data.dangerSecondMonthAlarmNumber == '0' && part231Data.dangerThirdMonthAlarmNumber == '0'}" /> -->



            <table class="img-table" border="1">
              <tr>
                <td></td>
                <!-- <c:if v-if="!part1ChartTableBus"> -->
                <th v-if="!part1ChartTableBus">超速</th>
                <!-- </c:if> -->
                <!-- <c:if v-if="!part1ChartTableTour"> -->
                <th v-if="!part1ChartTableTour">疲劳驾驶</th>
                <!-- </c:if> -->
                <!-- <c:if v-if="!part1ChartTableDanger"> -->
                <th v-if="!part1ChartTableDanger">凌晨2-5点禁驾</th>
                <!-- </c:if> -->
                <!-- <c:if v-if="!part1ChartTableGoods"> -->
                <th v-if="!part1ChartTableGoods">报警次数合计</th>
                <!-- </c:if> -->
              </tr>
              <tr>
                <td>班线客运</td>
                <!-- <c:if v-if="!part1ChartTableBus"> -->
                <td v-if="!part1ChartTableBus">{{ part3Data.busSpeedingAlarmNumber }}</td>
                <!-- </c:if> -->
                <!-- <c:if v-if="!part1ChartTableTour"> -->
                <td v-if="!part1ChartTableTour">{{ part3Data.busFatigueAlarmNumber }}</td>
                <!-- </c:if> -->
                <!-- <c:if v-if="!part1ChartTableDanger"> -->
                <td v-if="!part1ChartTableDanger">{{ part3Data.bus25AlarmNumber }}</td>
                <!-- </c:if> -->
                <!-- <c:if v-if="!part1ChartTableGoods"> -->
                <td v-if="!part1ChartTableGoods">{{ part3Data.speedingAlarmTotalNumber }}</td>
                <!-- </c:if> -->
              </tr>
              <tr>
                <td>旅游客运</td>
                <!-- <c:if v-if="!part1ChartTableBus"> -->
                <td v-if="!part1ChartTableBus">{{ part3Data.tourSpeedingAlarmNumber }}</td>
                <!-- </c:if> -->
                <!-- <c:if v-if="!part1ChartTableTour"> -->
                <td v-if="!part1ChartTableTour">{{ part3Data.tourFatigueAlarmNumber }}</td>
                <!-- </c:if> -->
                <!-- <c:if v-if="!part1ChartTableDanger"> -->
                <td v-if="!part1ChartTableDanger">{{ part3Data.tour25AlarmNumber }}</td>
                <!-- </c:if> -->
                <!-- <c:if v-if="!part1ChartTableGoods"> -->
                <td v-if="!part1ChartTableGoods">{{ part3Data.fatigueAlarmTotalNumber }}</td>
                <!-- </c:if> -->
              </tr>
              <tr>
                <td>危险货物运输</td>
                <!-- <c:if v-if="!part1ChartTableBus"> -->
                <td v-if="!part1ChartTableBus">{{ part3Data.dangerSpeedingAlarmNumber }}</td>
                <!-- </c:if> -->
                <!-- <c:if v-if="!part1ChartTableTour"> -->
                <td v-if="!part1ChartTableTour">{{ part3Data.dangerFatigueAlarmNumber }}</td>
                <!-- </c:if> -->
                <!-- <c:if v-if="!part1ChartTableDanger"> -->
                <td v-if="!part1ChartTableDanger">{{ part3Data.danger25AlarmNumber }}</td>
                <!-- </c:if> -->
                <!-- <c:if v-if="!part1ChartTableGoods"> -->
                <td v-if="!part1ChartTableGoods">{{ part3Data.t25AlarmTotalNumber }}</td>
                <!-- </c:if> -->
              </tr>
            </table>
          </div>
        </div>
        <div>
          <h3 class="content-title" style="margin:20px 0;">
            2.3 对比上月报警趋势分析
          </h3>
          <p class="text-wrapper">
            从全市报警总事件数情况来看，本月报警总次数比上月{{ part4Data.allAlarmRelativeRatio }}。其中，超速报警次数比上月{{
              part4Data.speedingAlarmRelativeRatio }}，疲劳驾驶报警次数比上月{{ part4Data.fatigueAlarmRelativeRatio }}，凌晨2-5点禁驾报警次数比上月{{
    part4Data.t25AlarmRelativeRatio }}。
          </p>
          <div>
            <!-- <%-- all--%> -->
            <div class="text-center img-wrapper">
              <div id="chartContainer5" style="height: 350px;width: 500px;display: inline-block;"></div>
            </div>
            <div class="text-center">
              <!-- <c:set var="part2ChartTableBus"
                value="${part4Data.allAlarmTendencyInfo.lastBusAlarmNumber == '0' && part4Data.allAlarmTendencyInfo.thisBusAlarmNumber == '0'}" />
              <c:set var="part2ChartTableTour"
                value="${part4Data.allAlarmTendencyInfo.lastTourAlarmNumber == '0' && part4Data.allAlarmTendencyInfo.thisTourAlarmNumber == '0' }" />
              <c:set var="part2ChartTableDanger"
                value="${part4Data.allAlarmTendencyInfo.lastDangerAlarmNumber == '0' && part4Data.allAlarmTendencyInfo.thisDangerAlarmNumber == '0'}" />
              <c:set var="part2ChartTableGoods"
                value="${part4Data.allAlarmTendencyInfo.lastGoodsAlarmNumber == '0' && part4Data.allAlarmTendencyInfo.thisGoodsAlarmNumber == '0' }" />
              <c:set var="part2ChartTableTotal"
                value="${part4Data.allAlarmTendencyInfo.lastTotalAlarmNumber == '0' && part4Data.allAlarmTendencyInfo.thisTotalAlarmNumber == '0' }" /> -->

              <table class="img-table" border="1">
                <tr>
                  <td></td>
                  <!-- <c:if v-if="!part2ChartTableBus"> -->
                  <th v-if="!part2ChartTableBus">班线客运</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part2ChartTableTour"> -->
                  <th v-if="!part2ChartTableTour">旅游客运</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part2ChartTableDanger"> -->
                  <th v-if="!part2ChartTableDanger">危险货物运输</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part2ChartTableGoods"> -->
                  <th v-if="!part2ChartTableGoods">普通货运</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part2ChartTableTotal"> -->
                  <th v-if="!part2ChartTableTotal">合计</th>
                  <!-- </c:if> -->
                </tr>
                <tr>
                  <td>上月</td>
                  <!-- <c:if v-if="!part2ChartTableBus"> -->
                  <th v-if="!part2ChartTableBus">{{ part4Data.allAlarmTendencyInfo.lastBusAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part2ChartTableTour"> -->
                  <th v-if="!part2ChartTableTour">{{ part4Data.allAlarmTendencyInfo.lastTourAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part2ChartTableDanger"> -->
                  <th v-if="!part2ChartTableDanger">{{ part4Data.allAlarmTendencyInfo.lastDangerAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part2ChartTableGoods"> -->
                  <th v-if="!part2ChartTableGoods">{{ part4Data.allAlarmTendencyInfo.lastGoodsAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part2ChartTableTotal"> -->
                  <th v-if="!part2ChartTableTotal">{{ part4Data.allAlarmTendencyInfo.lastTotalAlarmNumber }}</th>
                  <!-- </c:if> -->
                </tr>
                <tr>
                  <td>本月</td>
                  <!-- <c:if v-if="!part2ChartTableBus"> -->
                  <th v-if="!part2ChartTableBus">{{ part4Data.allAlarmTendencyInfo.thisBusAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part2ChartTableTour"> -->
                  <th v-if="!part2ChartTableTour">{{ part4Data.allAlarmTendencyInfo.thisTourAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part2ChartTableDanger"> -->
                  <th v-if="!part2ChartTableDanger">{{ part4Data.allAlarmTendencyInfo.thisDangerAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part2ChartTableGoods"> -->
                  <th v-if="!part2ChartTableGoods">{{ part4Data.allAlarmTendencyInfo.thisGoodsAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part2ChartTableTotal"> -->
                  <th v-if="!part2ChartTableTotal">{{ part4Data.allAlarmTendencyInfo.thisTotalAlarmNumber }}</th>
                  <!-- </c:if> -->
                </tr>
              </table>
            </div>
            <!-- <%--speeding--%> -->
            <div class="text-center img-wrapper">
              <div id="chartContainer6" style="height: 350px;width: 500px;display: inline-block;"></div>
            </div>
            <div class="text-center">
              <!-- <c:set var="part3ChartTableBus"
                value="${part4Data.speedingAlarmTendencyInfo.lastBusAlarmNumber == '0' && part4Data.speedingAlarmTendencyInfo.thisBusAlarmNumber == '0'}" />
              <c:set var="part3ChartTableTour"
                value="${part4Data.speedingAlarmTendencyInfo.lastTourAlarmNumber == '0' && part4Data.speedingAlarmTendencyInfo.thisTourAlarmNumber == '0' }" />
              <c:set var="part3ChartTableDanger"
                value="${part4Data.speedingAlarmTendencyInfo.lastDangerAlarmNumber == '0' && part4Data.speedingAlarmTendencyInfo.thisDangerAlarmNumber == '0'}" />
              <c:set var="part3ChartTableGoods"
                value="${part4Data.speedingAlarmTendencyInfo.lastGoodsAlarmNumber == '0' && part4Data.speedingAlarmTendencyInfo.thisGoodsAlarmNumber == '0' }" />
              <c:set var="part3ChartTableTotal"
                value="${part4Data.speedingAlarmTendencyInfo.lastTotalAlarmNumber == '0' && part4Data.speedingAlarmTendencyInfo.thisTotalAlarmNumber == '0' }" /> -->

              <table class="img-table" border="1">
                <tr>
                  <td></td>
                  <!-- <c:if v-if="!part3ChartTableBus"> -->
                  <th v-if="!part3ChartTableBus">班线客运</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part3ChartTableTour"> -->
                  <th v-if="!part3ChartTableTour">旅游客运</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part3ChartTableDanger"> -->
                  <th v-if="!part3ChartTableDanger">危险货物运输</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part3ChartTableGoods"> -->
                  <th v-if="!part3ChartTableGoods">普通货运</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part3ChartTableTotal"> -->
                  <th v-if="!part3ChartTableTotal">合计</th>
                  <!-- </c:if> -->
                </tr>
                <tr>
                  <td>上月</td>
                  <!-- <c:if v-if="!part3ChartTableBus"> -->
                    <th v-if="!part3ChartTableBus">{{ part4Data.speedingAlarmTendencyInfo.lastBusAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part3ChartTableTour"> -->
                    <th v-if="!part3ChartTableTour">{{ part4Data.speedingAlarmTendencyInfo.lastTourAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part3ChartTableDanger"> -->
                    <th v-if="!part3ChartTableDanger">{{ part4Data.speedingAlarmTendencyInfo.lastDangerAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part3ChartTableGoods"> -->
                    <th v-if="!part3ChartTableGoods">{{ part4Data.speedingAlarmTendencyInfo.lastGoodsAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part3ChartTableTotal"> -->
                    <th v-if="!part3ChartTableTotal">{{ part4Data.speedingAlarmTendencyInfo.lastTotalAlarmNumber }}</th>
                  <!-- </c:if> -->
                </tr>
                <tr>
                  <td>本月</td>
                  <!-- <c:if v-if="!part3ChartTableBus"> -->
                    <th v-if="!part3ChartTableBus">{{ part4Data.speedingAlarmTendencyInfo.thisBusAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part3ChartTableTour"> -->
                    <th v-if="!part3ChartTableTour">{{ part4Data.speedingAlarmTendencyInfo.thisTourAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part3ChartTableDanger"> -->
                    <th v-if="!part3ChartTableDanger">{{ part4Data.speedingAlarmTendencyInfo.thisDangerAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part3ChartTableGoods"> -->
                    <th v-if="!part3ChartTableGoods">{{ part4Data.speedingAlarmTendencyInfo.thisGoodsAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part3ChartTableTotal"> -->
                    <th v-if="!part3ChartTableTotal">{{ part4Data.speedingAlarmTendencyInfo.thisTotalAlarmNumber }}</th>
                  <!-- </c:if> -->
                </tr>
              </table>
            </div>
            <!-- <%--fatigue--%> -->
            <div class="text-center img-wrapper">
              <div id="chartContainer7" style="height: 350px;width: 500px;display: inline-block;"></div>
            </div>
            <div class="text-center">
              <!-- <c:set var="part4ChartTableBus"
                value="${part4Data.fatigueAlarmTendencyInfo.lastBusAlarmNumber == '0' && part4Data.fatigueAlarmTendencyInfo.thisBusAlarmNumber == '0'}" />
              <c:set var="part4ChartTableTour"
                value="${part4Data.fatigueAlarmTendencyInfo.lastTourAlarmNumber == '0' && part4Data.fatigueAlarmTendencyInfo.thisTourAlarmNumber == '0' }" />
              <c:set var="part4ChartTableDanger"
                value="${part4Data.fatigueAlarmTendencyInfo.lastDangerAlarmNumber == '0' && part4Data.fatigueAlarmTendencyInfo.thisDangerAlarmNumber == '0'}" />
              <c:set var="part4ChartTableGoods"
                value="${part4Data.fatigueAlarmTendencyInfo.lastGoodsAlarmNumber == '0' && part4Data.fatigueAlarmTendencyInfo.thisGoodsAlarmNumber == '0' }" />
              <c:set var="part4ChartTableTotal"
                value="${part4Data.fatigueAlarmTendencyInfo.lastTotalAlarmNumber == '0' && part4Data.fatigueAlarmTendencyInfo.thisTotalAlarmNumber == '0' }" /> -->

              <table class="img-table" border="1">
                <tr>
                  <td></td>
                  <!-- <c:if v-if="!part4ChartTableBus"> -->
                    <th v-if="!part4ChartTableBus">班线客运</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part4ChartTableTour"> -->
                    <th v-if="!part4ChartTableTour">旅游客运</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part4ChartTableDanger"> -->
                    <th v-if="!part4ChartTableDanger">危险货物运输</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part4ChartTableGoods"> -->
                    <th v-if="!part4ChartTableGoods">普通货运</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part4ChartTableTotal"> -->
                    <th v-if="!part4ChartTableTotal">合计</th>
                  <!-- </c:if> -->
                </tr>
                <tr>
                  <td>上月</td>
                  <!-- <c:if v-if="!part4ChartTableBus"> -->
                    <th v-if="!part4ChartTableBus">{{ part4Data.fatigueAlarmTendencyInfo.lastBusAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part4ChartTableTour"> -->
                    <th v-if="!part4ChartTableTour">{{ part4Data.fatigueAlarmTendencyInfo.lastTourAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part4ChartTableDanger"> -->
                    <th v-if="!part4ChartTableDanger">{{ part4Data.fatigueAlarmTendencyInfo.lastDangerAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part4ChartTableGoods"> -->
                    <th v-if="!part4ChartTableGoods">{{ part4Data.fatigueAlarmTendencyInfo.lastGoodsAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part4ChartTableTotal"> -->
                    <th v-if="!part4ChartTableTotal">{{ part4Data.fatigueAlarmTendencyInfo.lastTotalAlarmNumber }}</th>
                  <!-- </c:if> -->
                </tr>
                <tr>
                  <td>本月</td>
                  <!-- <c:if v-if="!part4ChartTableBus"> -->
                    <th v-if="!part4ChartTableBus">{{ part4Data.fatigueAlarmTendencyInfo.thisBusAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part4ChartTableTour"> -->
                    <th v-if="!part4ChartTableTour">{{ part4Data.fatigueAlarmTendencyInfo.thisTourAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part4ChartTableDanger"> -->
                    <th v-if="!part4ChartTableDanger">{{ part4Data.fatigueAlarmTendencyInfo.thisDangerAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part4ChartTableGoods"> -->
                    <th v-if="!part4ChartTableGoods">{{ part4Data.fatigueAlarmTendencyInfo.thisGoodsAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part4ChartTableTotal"> -->
                    <th v-if="!part4ChartTableTotal">{{ part4Data.fatigueAlarmTendencyInfo.thisTotalAlarmNumber }}</th>
                  <!-- </c:if> -->
                </tr>
              </table>
            </div>
            <!-- <%--t25--%> -->
            <div class="text-center img-wrapper">
              <div id="chartContainer8" style="height: 350px;width: 500px;display: inline-block;"></div>
            </div>
            <div class="text-center">
              <!-- <c:set var="part5ChartTableBus"
                value="${part4Data.t25AlarmTendencyInfo.lastBusAlarmNumber == '0' && part4Data.t25AlarmTendencyInfo.thisBusAlarmNumber == '0'}" />
              <c:set var="part5ChartTableTour"
                value="${part4Data.t25AlarmTendencyInfo.lastTourAlarmNumber == '0' && part4Data.t25AlarmTendencyInfo.thisTourAlarmNumber == '0' }" />
              <c:set var="part5ChartTableDanger"
                value="${part4Data.t25AlarmTendencyInfo.lastDangerAlarmNumber == '0' && part4Data.t25AlarmTendencyInfo.thisDangerAlarmNumber == '0'}" />
              <c:set var="part5ChartTableGoods"
                value="${part4Data.t25AlarmTendencyInfo.lastGoodsAlarmNumber == '0' && part4Data.t25AlarmTendencyInfo.thisGoodsAlarmNumber == '0' }" />
              <c:set var="part5ChartTableTotal"
                value="${part4Data.t25AlarmTendencyInfo.lastTotalAlarmNumber == '0' && part4Data.t25AlarmTendencyInfo.thisTotalAlarmNumber == '0' }" /> -->

              <table class="img-table" border="1">
                <tr>
                  <td></td>
                  <!-- <c:if v-if="!part5ChartTableBus"> -->
                    <th v-if="!part5ChartTableBus">班线客运</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part5ChartTableTour"> -->
                    <th v-if="!part5ChartTableTour">旅游客运</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part5ChartTableDanger"> -->
                    <th v-if="!part5ChartTableDanger">危险货物运输</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part5ChartTableGoods"> -->
                    <th v-if="!part5ChartTableGoods">普通货运</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part5ChartTableTotal"> -->
                    <th v-if="!part5ChartTableTotal">合计</th>
                  <!-- </c:if> -->
                </tr>
                <tr>
                  <td>上月</td>
                  <!-- <c:if v-if="!part5ChartTableBus"> -->
                    <th v-if="!part5ChartTableBus">{{ part4Data.t25AlarmTendencyInfo.lastBusAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part5ChartTableTour"> -->
                    <th v-if="!part5ChartTableTour">{{ part4Data.t25AlarmTendencyInfo.lastTourAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part5ChartTableDanger"> -->
                    <th v-if="!part5ChartTableDanger">{{ part4Data.t25AlarmTendencyInfo.lastDangerAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part5ChartTableGoods"> -->
                    <th v-if="!part5ChartTableGoods">{{ part4Data.t25AlarmTendencyInfo.lastGoodsAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part5ChartTableTotal"> -->
                    <th v-if="!part5ChartTableTotal">{{ part4Data.t25AlarmTendencyInfo.lastTotalAlarmNumber }}</th>
                  <!-- </c:if> -->
                </tr>
                <tr>
                  <td>本月</td>
                  <!-- <c:if v-if="!part5ChartTableBus"> -->
                    <th v-if="!part5ChartTableBus">{{ part4Data.t25AlarmTendencyInfo.thisBusAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part5ChartTableTour"> -->
                    <th v-if="!part5ChartTableTour">{{ part4Data.t25AlarmTendencyInfo.thisTourAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part5ChartTableDanger"> -->
                    <th v-if="!part5ChartTableDanger">{{ part4Data.t25AlarmTendencyInfo.thisDangerAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part5ChartTableGoods"> -->
                    <th v-if="!part5ChartTableGoods">{{ part4Data.t25AlarmTendencyInfo.thisGoodsAlarmNumber }}</th>
                  <!-- </c:if> -->
                  <!-- <c:if v-if="!part5ChartTableTotal"> -->
                    <th v-if="!part5ChartTableTotal">{{ part4Data.t25AlarmTendencyInfo.thisTotalAlarmNumber }}</th>
                  <!-- </c:if> -->
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h3 class="content-title" style="margin:20px 0;">
            2.4 全省重点营运车辆报警排名
          </h3>
          <div>
            <div class="text-center">
              <h3>{{ data.summaryReportDate2 }}重点营运车辆报警情况排名表</h3>
            </div>
            <table class="table" border="1">
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
              <!-- <c:forEach v-for="item in part5Data.allVehicleAlarmRankingInfos" var="item"> -->
              <tr v-for="item in part5Data.allVehicleAlarmRankingInfos">
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
                <td>{{ part5Data.allVehicleAlarmRankingInfosSum.companyNumber }}</td>
                <td>{{ part5Data.allVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
                <td>{{ part5Data.allVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
                <td>{{ part5Data.allVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>
                <td>{{ part5Data.allVehicleAlarmRankingInfosSum.t25AlarmNumber }}</td>
                <td>{{ part5Data.allVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
                <td>{{ part5Data.allVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
              </tr>
            </table>

          </div>
        </div>
        <div>
          <h3 class="content-title" style="margin:20px 0;">
            2.5全省营运车辆报警排名（按营运类型分）
          </h3>
          <div>
            <div class="text-center">
              <h3>{{ data.summaryReportDate2 }}班线客运车辆报警情况排名表</h3>
            </div>
            <table class="table" border="1">
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
              <!-- <c:forEach v-for="item in part6Data.busVehicleAlarmRankingInfos" var="item"> -->
              <tr v-for="item in part6Data.busVehicleAlarmRankingInfos">
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
                <td>{{ part6Data.busVehicleAlarmRankingInfosSum.companyNumber }}</td>
                <td>{{ part6Data.busVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
                <td>{{ part6Data.busVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
                <td>{{ part6Data.busVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>
                <td>{{ part6Data.busVehicleAlarmRankingInfosSum.t25AlarmNumber }}</td>
                <td>{{ part6Data.busVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
                <td>{{ part6Data.busVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
              </tr>
            </table>

          </div>
          <div>
            <div class="text-center">
              <h3>{{ data.summaryReportDate2 }}旅游客运车辆报警情况排名表</h3>
            </div>
            <table class="table" border="1">
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
              <!-- <c:forEach v-for="item in part6Data.tourVehicleAlarmRankingInfos" var="item"> -->
              <tr v-for="item in part6Data.tourVehicleAlarmRankingInfos">
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
                <td>{{ part6Data.tourVehicleAlarmRankingInfosSum.companyNumber }}</td>
                <td>{{ part6Data.tourVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
                <td>{{ part6Data.tourVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
                <td>{{ part6Data.tourVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>
                <td>{{ part6Data.tourVehicleAlarmRankingInfosSum.t25AlarmNumber }}</td>
                <td>{{ part6Data.tourVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
                <td>{{ part6Data.tourVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
              </tr>
            </table>

          </div>
          <div>
            <div class="text-center">
              <h3>{{ data.summaryReportDate2 }}危运车辆报警情况排名表</h3>
            </div>
            <table class="table" border="1">
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
              <!-- <c:forEach v-for="item in part6Data.dangerVehicleAlarmRankingInfos" var="item"> -->
              <tr v-for="item in part6Data.dangerVehicleAlarmRankingInfos">
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
                <td>{{ part6Data.dangerVehicleAlarmRankingInfosSum.companyNumber }}</td>
                <td>{{ part6Data.dangerVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
                <td>{{ part6Data.dangerVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
                <td>{{ part6Data.dangerVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>
                <td>{{ part6Data.dangerVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
                <td>{{ part6Data.dangerVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
              </tr>
            </table>

          </div>
          <div>
            <div class="text-center">
              <h3>{{ data.summaryReportDate2 }}普货车辆报警情况排名表</h3>
            </div>
            <table class="table" border="1">
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
              <!-- <c:forEach v-for="item in part6Data.goodsVehicleAlarmRankingInfos" var="item"> -->
              <tr v-for="item in part6Data.goodsVehicleAlarmRankingInfos">
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
                <td>{{ part6Data.goodsVehicleAlarmRankingInfosSum.companyNumber }}</td>
                <td>{{ part6Data.goodsVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
                <td>{{ part6Data.goodsVehicleAlarmRankingInfosSum.speedingAlarmNumber }}</td>
                <td>{{ part6Data.goodsVehicleAlarmRankingInfosSum.fatigueAlarmNumber }}</td>
                <td>{{ part6Data.goodsVehicleAlarmRankingInfosSum.totalAlarmNumber }}</td>
                <td>{{ part6Data.goodsVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
              </tr>
            </table>
          </div>
          <div>
            &nbsp;&nbsp{{ data.summaryReportDate2 }}，车安达第三方监测平台共计处理违规报警事件{{ part7Data.handlingAlarmNumber
            }}起。针对疲劳驾驶、超速行驶、凌晨2-5点禁驾三类报警，系统自动处理{{ part7Data.systemHandlingAlarmNumber }}起，人工核实{{
  part7Data.manualVerifyAlarmNumber }}起，1分钟内自动纠正警情{{ part7Data.automaticCorrectionNumber }}起，短信通知企业{{
    part7Data.smsNoticeNumber }}条，电话提醒企业{{ part7Data.phoneRemindNumber }}次，人工提醒后及时纠正报警数{{
    part7Data.timelyCorrectionNumber }}条。
          </div>
        </div>
      </div>

      <div>
        <h3 class="content-title" style="margin:20px 0;">
          三、各地市州9月份情况分析（见附录）
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import * as echarts from 'echarts'
const { title, data } = defineProps({
  title: { type: String, default: () => '' },
  data: { type: Object, default: () => [] },
  download: { type: Function, defualt: () => { } }
})
const proxy: any = getCurrentInstance()?.proxy

const { chartContainer1Values, chartContainer2Values, chartContainer3Values, chartContainer4Values, chartContainer5Values, chartContainer6Values, chartContainer7Values, part1Data, part2Data, part3Data, part4Data, part5Data, part6Data, part7Data, busVehicleNumber, tourVehicleNumber, dangerVehicleNumber, goodsVehicleNumber } = data



let part1ChartTableBus = part1Data.busSpeedingAlarmNumber == '0' && part1Data.busFatigueAlarmNumber == '0' && part1Data.bus25AlarmNumber == '0'
let part1ChartTableTour = part1Data.tourSpeedingAlarmNumber == '0' && part1Data.tourFatigueAlarmNumber == '0' && part1Data.tour25AlarmNumber == '0'
let part1ChartTableDanger = part1Data.dangerSpeedingAlarmNumber == '0' && part1Data.dangerFatigueAlarmNumber == '0' && part1Data.danger25AlarmNumber == '0'
let part1ChartTableGoods = part1Data.goodsSpeedingAlarmNumber == '0' && part1Data.goodsFatigueAlarmNumber == '0' && part1Data.goods25AlarmNumber == '0'


let part2ChartTableBus = part4Data.allAlarmTendencyInfo.lastBusAlarmNumber == '0' && part4Data.allAlarmTendencyInfo.thisBusAlarmNumber == '0'
let part2ChartTableTour = part4Data.allAlarmTendencyInfo.lastTourAlarmNumber == '0' && part4Data.allAlarmTendencyInfo.thisTourAlarmNumber == '0'
let part2ChartTableDanger = part4Data.allAlarmTendencyInfo.lastDangerAlarmNumber == '0' && part4Data.allAlarmTendencyInfo.thisDangerAlarmNumber == '0'
let part2ChartTableGoods = part4Data.allAlarmTendencyInfo.lastDoodsAlarmNumber == '0' && part4Data.allAlarmTendencyInfo.thisGoodsAlarmNumber == '0'
let part2ChartTableTotal = part4Data.allAlarmTendencyInfo.lastTotalAlarmNumber == '0' && part4Data.allAlarmTendencyInfo.thisTotalAlarmNumber == '0';

let part3ChartTableBus = part4Data.speedingAlarmTendencyInfo.lastBusAlarmNumber == '0' && part4Data.speedingAlarmTendencyInfo.thisBusAlarmNumber == '0'
let part3ChartTableTour = part4Data.speedingAlarmTendencyInfo.lastTourAlarmNumber == '0' && part4Data.speedingAlarmTendencyInfo.thisTourAlarmNumber == '0'
let part3ChartTableDanger = part4Data.speedingAlarmTendencyInfo.lastDangerAlarmNumber == '0' && part4Data.speedingAlarmTendencyInfo.thisDangerAlarmNumber == '0'
let part3ChartTableGoods = part4Data.speedingAlarmTendencyInfo.lastGoodsAlarmNumber == '0' && part4Data.speedingAlarmTendencyInfo.thisGoodsAlarmNumber == '0'
let part3ChartTableTotal = part4Data.speedingAlarmTendencyInfo.lastTotalAlarmNumber == '0' && part4Data.speedingAlarmTendencyInfo.thisTotalAlarmNumber == '0';

let part4ChartTableBus = part4Data.fatigueAlarmTendencyInfo.lastBusAlarmNumber == '0' && part4Data.fatigueAlarmTendencyInfo.thisBusAlarmNumber == '0'
let part4ChartTableTour = part4Data.fatigueAlarmTendencyInfo.lastTourAlarmNumber == '0' && part4Data.fatigueAlarmTendencyInfo.tourAlarmNumber == '0'
let part4ChartTableDanger = part4Data.fatigueAlarmTendencyInfo.lastDangerAlarmNumber == '0' && part4Data.fatigueAlarmTendencyInfo.dangerAlarmNumber == '0'
let part4ChartTableGoods = part4Data.fatigueAlarmTendencyInfo.lastGoodsAlarmNumber == '0' && part4Data.fatigueAlarmTendencyInfo.goodsAlarmNumber == '0'
let part4ChartTableTotal = part4Data.fatigueAlarmTendencyInfo.lastTotalAlarmNumber == '0' && part4Data.fatigueAlarmTendencyInfo.thisTotalAlarmNumber == '0';

let part5ChartTableBus = part4Data.t25AlarmTendencyInfo.lastBusAlarmNumber == '0' && part4Data.t25AlarmTendencyInfo.thisBusAlarmNumber == '0'
let part5ChartTableTour = part4Data.t25AlarmTendencyInfo.lastTourAlarmNumber == '0' && part4Data.t25AlarmTendencyInfo.thisTourAlarmNumber == '0';
let part5ChartTableDanger = part4Data.t25AlarmTendencyInfo.lastDangerAlarmNumber == '0' && part4Data.t25AlarmTendencyInfo.thisDangerAlarmNumber == '0'
let part5ChartTableGoods = part4Data.t25AlarmTendencyInfo.lastGoodsAlarmNumber == '0' && part4Data.t25AlarmTendencyInfo.thisGoodsAlarmNumber == '0';
let part5ChartTableTotal = part4Data.t25AlarmTendencyInfo.lastTotalAlarmNumber == '0' && part4Data.t25AlarmTendencyInfo.thisTotalAlarmNumber == '0';

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
    document.querySelector("#downloadForm").submit();
  });
})();

//第一个饼图
initChartContainer1();
//各地级市车辆类型分布情况
initChartContainer2();
//三类违规报警次数占比
initChartContainer3();
//重点营运车辆报警情况
initChartContainer4();
//车辆报警趋势分析统计
initChartContainer5();
//spdding报警趋势分析统计
initChartContainer6()
//fatigues报警趋势分析统计
initChartContainer7()
//t25报警趋势分析统计
initChartContainer8()

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
    title: '各类营运车辆数占比',
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
    goodsVehicleNumbers = goodsVehicleNumber;

  var config = {
    containerId: 'chartContainer2',
    title: '各地级市车辆类型分布情况',
    legendData: [{ name: '班线客运', icon: 'square' },
    { name: '旅游客运', icon: 'square' },
    { name: '危险品运输', icon: 'square' },
    { name: '普通货运', icon: 'square' }],
    xAxisData: allXAxisData,
    seriesData: [{ name: '班线客运', type: 'bar', barGap: 0, barWidth: 6, data: busVehicleNumbers },
    { name: '旅游客运', type: 'bar', barWidth: 6, data: tourVehicleNumbers },
    { name: '危险品运输', type: 'bar', barWidth: 6, data: dangerVehicleNumbers },
    { name: '普通货运', type: 'bar', barWidth: 6, data: goodsVehicleNumbers }
    ],
    color: ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000']
  }
  initRectangleChartContainer(config);
}

function initChartContainer3() {
  var config = {
    containerId: 'chartContainer3',
    title: '三类违规报警次数占比情况',
    legendData: [{ name: '超速', icon: 'square' },
    { name: '疲劳驾驶', icon: 'square' },
    { name: '凌晨2-5点禁驾', icon: 'square' }],
    seriesData: chartContainer3Values,
    color: ['#5B9BD5', '#ED7D31', '#A5A5A5']
  }
  initPieChartContainer(config);
}

function initChartContainer4() {

  var allLegendData = ['超速', '疲劳驾驶', '凌晨2-5点禁驾', '报警次数合计'],
    busVehicleNumbers = [],
    tourVehicleNumbers = [],
    dangerVehicleNumbers = [],
    allXAxisData = [];

  if ((part3Data.busSpeedingAlarmNumber !== "0") || (part3Data.tourSpeedingAlarmNumber !== "0") || (part3Data.dangerSpeedingAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[0]);
    busVehicleNumbers.push(part3Data.busSpeedingAlarmNumber);
    tourVehicleNumbers.push(part3Data.tourSpeedingAlarmNumber);
    dangerVehicleNumbers.push(part3Data.dangerSpeedingAlarmNumber);
  }
  if ((part3Data.busFatigueAlarmNumber !== "0") || (part3Data.tourFatigueAlarmNumber !== "0") || (part3Data.dangerFatigueAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[1]);
    busVehicleNumbers.push(part3Data.busFatigueAlarmNumber);
    tourVehicleNumbers.push(part3Data.tourFatigueAlarmNumber);
    dangerVehicleNumbers.push(part3Data.dangerFatigueAlarmNumber);
  }
  if ((part3Data.bus25AlarmNumber !== "0") || (part3Data.tour25AlarmNumber !== "0") || (part3Data.danger25AlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[2]);
    busVehicleNumbers.push(part3Data.bus25AlarmNumber);
    tourVehicleNumbers.push(part3Data.tour25AlarmNumber);
    dangerVehicleNumbers.push(part3Data.danger25AlarmNumber);
  }
  if ((part3Data.speedingAlarmTotalNumber !== "0") || (part3Data.fatigueAlarmTotalNumber !== "0") || (part3Data.t25AlarmTotalNumber !== "0")) {
    allXAxisData.push(allLegendData[3]);
    busVehicleNumbers.push(part3Data.speedingAlarmTotalNumber);
    tourVehicleNumbers.push(part3Data.fatigueAlarmTotalNumber);
    dangerVehicleNumbers.push(part3Data.t25AlarmTotalNumber);
  }

  var config = {
    containerId: 'chartContainer4',
    title: '重点营运车辆报警情况',
    legendData: [{ name: '班线客运', icon: 'square' },
    { name: '旅游客运', icon: 'square' },
    { name: '危险品运输', icon: 'square' }],
    xAxisData: allXAxisData,
    seriesData: [{ name: '班线客运', type: 'bar', barGap: 0, barWidth: 20, data: busVehicleNumbers },
    { name: '旅游客运', type: 'bar', barWidth: 20, data: tourVehicleNumbers },
    { name: '危险品运输', type: 'bar', barWidth: 20, data: dangerVehicleNumbers }],
    color: ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000']
  };
  initRectangleChartContainer(config);
}

function initChartContainer5() {

  var allLegendData = ['班线客运', '旅游客运', '危险货物运输', '普通货运', '合计'],
    allColor = ['#5B9BD5', '#ED7D31'],
    allXAxisData = [],
    lastMonthList = [],
    thisMonthList = [];

  if ((part4Data.allAlarmTendencyInfo.lastBusAlarmNumber !== "0") || (part4Data.allAlarmTendencyInfo.thisBusAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[0]);
    lastMonthList.push(part4Data.allAlarmTendencyInfo.lastBusAlarmNumber);
    thisMonthList.push(part4Data.allAlarmTendencyInfo.thisBusAlarmNumber);
  }
  if ((part4Data.allAlarmTendencyInfo.lastTourAlarmNumber !== "0") || (part4Data.allAlarmTendencyInfo.thisTourAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[1]);
    lastMonthList.push(part4Data.allAlarmTendencyInfo.lastTourAlarmNumber);
    thisMonthList.push(part4Data.allAlarmTendencyInfo.thisTourAlarmNumber);
  }

  if ((part4Data.allAlarmTendencyInfo.lastDangerAlarmNumber !== "0") || (part4Data.allAlarmTendencyInfo.thisDangerAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[2]);
    lastMonthList.push(part4Data.allAlarmTendencyInfo.lastDangerAlarmNumber);
    thisMonthList.push(part4Data.allAlarmTendencyInfo.thisDangerAlarmNumber);
  }
  if ((part4Data.allAlarmTendencyInfo.lastGoodsAlarmNumber !== "0") || (part4Data.allAlarmTendencyInfo.thisGoodsAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[3]);
    lastMonthList.push(part4Data.allAlarmTendencyInfo.lastGoodsAlarmNumber);
    thisMonthList.push(part4Data.allAlarmTendencyInfo.thisGoodsAlarmNumber);
  }
  if ((part4Data.allAlarmTendencyInfo.lastTotalAlarmNumber !== "0") || (part4Data.allAlarmTendencyInfo.thisTotalAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[4]);
    lastMonthList.push(part4Data.allAlarmTendencyInfo.lastTotalAlarmNumber);
    thisMonthList.push(part4Data.allAlarmTendencyInfo.thisTotalAlarmNumber);
  }
  var config = {
    containerId: 'chartContainer5',
    title: '车辆报警趋势分析统计',
    legendData: [{ name: '上月', icon: 'square' },
    { name: '本月', icon: 'square' }],
    xAxisData: allXAxisData,
    seriesData: [{ name: '上月', type: 'bar', barGap: 0, barWidth: 20, data: lastMonthList },
    { name: '本月', type: 'bar', barGap: 0, barWidth: 20, data: thisMonthList }],
    color: allColor
  };
  initRectangleChartContainer(config);
}

function initChartContainer6() {

  var allLegendData = ['班线客运', '旅游客运', '危险货物运输', '普通货运', '合计'],
    allColor = ['#5B9BD5', '#ED7D31'],
    allXAxisData = [],
    lastMonthList = [],
    thisMonthList = [];

  if ((part4Data.speedingAlarmTendencyInfo.lastBusAlarmNumber !== "0") || (part4Data.speedingAlarmTendencyInfo.thisBusAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[0]);
    lastMonthList.push(part4Data.speedingAlarmTendencyInfo.lastBusAlarmNumber);
    thisMonthList.push(part4Data.speedingAlarmTendencyInfo.thisBusAlarmNumber);
  }
  if ((part4Data.speedingAlarmTendencyInfo.lastTourAlarmNumber !== "0") || (part4Data.speedingAlarmTendencyInfo.thisTourAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[1]);
    lastMonthList.push(part4Data.speedingAlarmTendencyInfo.lastTourAlarmNumber);
    thisMonthList.push(part4Data.speedingAlarmTendencyInfo.thisTourAlarmNumber);
  }

  if ((part4Data.speedingAlarmTendencyInfo.lastDangerAlarmNumber !== "0") || (part4Data.speedingAlarmTendencyInfo.thisDangerAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[2]);
    lastMonthList.push(part4Data.speedingAlarmTendencyInfo.lastDangerAlarmNumber);
    thisMonthList.push(part4Data.speedingAlarmTendencyInfo.thisDangerAlarmNumber);
  }
  if ((part4Data.speedingAlarmTendencyInfo.lastGoodsAlarmNumber !== "0") || (part4Data.speedingAlarmTendencyInfo.thisGoodsAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[3]);
    lastMonthList.push(part4Data.speedingAlarmTendencyInfo.lastGoodsAlarmNumber);
    thisMonthList.push(part4Data.speedingAlarmTendencyInfo.thisGoodsAlarmNumber);
  }
  if ((part4Data.speedingAlarmTendencyInfo.lastTotalAlarmNumber !== "0") || (part4Data.speedingAlarmTendencyInfo.thisTotalAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[4]);
    lastMonthList.push(part4Data.speedingAlarmTendencyInfo.lastTotalAlarmNumber);
    thisMonthList.push(part4Data.speedingAlarmTendencyInfo.thisTotalAlarmNumber);
  }
  var config = {
    containerId: 'chartContainer6',
    title: '超速报警趋势分析统计',
    legendData: [{ name: '上月', icon: 'square' },
    { name: '本月', icon: 'square' }],
    xAxisData: allXAxisData,
    seriesData: [{ name: '上月', type: 'bar', barGap: 0, barWidth: 20, data: lastMonthList },
    { name: '本月', type: 'bar', barGap: 0, barWidth: 20, data: thisMonthList }],
    color: allColor
  };
  initRectangleChartContainer(config);
}

function initChartContainer7() {

  var allLegendData = ['班线客运', '旅游客运', '危险货物运输', '普通货运', '合计'],
    allColor = ['#5B9BD5', '#ED7D31'],
    allXAxisData = [],
    lastMonthList = [],
    thisMonthList = [];

  if ((part4Data.fatigueAlarmTendencyInfo.lastBusAlarmNumber !== "0") || (part4Data.fatigueAlarmTendencyInfo.thisBusAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[0]);
    lastMonthList.push(part4Data.fatigueAlarmTendencyInfo.lastBusAlarmNumber);
    thisMonthList.push(part4Data.fatigueAlarmTendencyInfo.thisBusAlarmNumber);
  }
  if ((part4Data.fatigueAlarmTendencyInfo.lastTourAlarmNumber !== "0") || (part4Data.fatigueAlarmTendencyInfo.thisTourAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[1]);
    lastMonthList.push(part4Data.fatigueAlarmTendencyInfo.lastTourAlarmNumber);
    thisMonthList.push(part4Data.fatigueAlarmTendencyInfo.thisTourAlarmNumber);
  }

  if ((part4Data.fatigueAlarmTendencyInfo.lastDangerAlarmNumber !== "0") || (part4Data.fatigueAlarmTendencyInfo.thisDangerAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[2]);
    lastMonthList.push(part4Data.fatigueAlarmTendencyInfo.lastDangerAlarmNumber);
    thisMonthList.push(part4Data.fatigueAlarmTendencyInfo.thisDangerAlarmNumber);
  }
  if ((part4Data.fatigueAlarmTendencyInfo.lastGoodsAlarmNumber !== "0") || (part4Data.fatigueAlarmTendencyInfo.thisGoodsAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[3]);
    lastMonthList.push(part4Data.fatigueAlarmTendencyInfo.lastGoodsAlarmNumber);
    thisMonthList.push(part4Data.fatigueAlarmTendencyInfo.thisGoodsAlarmNumber);
  }
  if ((part4Data.fatigueAlarmTendencyInfo.lastTotalAlarmNumber !== "0") || (part4Data.fatigueAlarmTendencyInfo.thisTotalAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[4]);
    lastMonthList.push(part4Data.fatigueAlarmTendencyInfo.lastTotalAlarmNumber);
    thisMonthList.push(part4Data.fatigueAlarmTendencyInfo.thisTotalAlarmNumber);
  }
  var config = {
    containerId: 'chartContainer7',
    title: '疲劳报警趋势分析统计',
    legendData: [{ name: '上月', icon: 'square' },
    { name: '本月', icon: 'square' }],
    xAxisData: allXAxisData,
    seriesData: [{ name: '上月', type: 'bar', barGap: 0, barWidth: 20, data: lastMonthList },
    { name: '本月', type: 'bar', barGap: 0, barWidth: 20, data: thisMonthList }],
    color: allColor
  };
  initRectangleChartContainer(config);
}

function initChartContainer8() {

  var allLegendData = ['班线客运', '旅游客运', '危险货物运输', '普通货运', '合计'],
    allColor = ['#5B9BD5', '#ED7D31'],
    allXAxisData = [],
    lastMonthList = [],
    thisMonthList = [];

  if ((part4Data.t25AlarmTendencyInfo.lastBusAlarmNumber !== "0") || (part4Data.t25AlarmTendencyInfo.thisBusAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[0]);
    lastMonthList.push(part4Data.t25AlarmTendencyInfo.lastBusAlarmNumber);
    thisMonthList.push(part4Data.t25AlarmTendencyInfo.thisBusAlarmNumber);
  }
  if ((part4Data.t25AlarmTendencyInfo.lastTourAlarmNumber !== "0") || (part4Data.t25AlarmTendencyInfo.thisTourAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[1]);
    lastMonthList.push(part4Data.t25AlarmTendencyInfo.lastTourAlarmNumber);
    thisMonthList.push(part4Data.t25AlarmTendencyInfo.thisTourAlarmNumber);
  }

  if ((part4Data.t25AlarmTendencyInfo.lastDangerAlarmNumber !== "0") || (part4Data.t25AlarmTendencyInfo.thisDangerAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[2]);
    lastMonthList.push(part4Data.t25AlarmTendencyInfo.lastDangerAlarmNumber);
    thisMonthList.push(part4Data.t25AlarmTendencyInfo.thisDangerAlarmNumber);
  }
  if ((part4Data.t25AlarmTendencyInfo.lastGoodsAlarmNumber !== "0") || (part4Data.t25AlarmTendencyInfo.thisGoodsAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[3]);
    lastMonthList.push(part4Data.t25AlarmTendencyInfo.lastGoodsAlarmNumber);
    thisMonthList.push(part4Data.t25AlarmTendencyInfo.thisGoodsAlarmNumber);
  }
  if ((part4Data.t25AlarmTendencyInfo.lastTotalAlarmNumber !== "0") || (part4Data.t25AlarmTendencyInfo.thisTotalAlarmNumber !== "0")) {
    allXAxisData.push(allLegendData[4]);
    lastMonthList.push(part4Data.t25AlarmTendencyInfo.lastTotalAlarmNumber);
    thisMonthList.push(part4Data.t25AlarmTendencyInfo.thisTotalAlarmNumber);
  }
  var config = {
    containerId: 'chartContainer8',
    title: '凌晨2-5点禁驾报警趋势分析统计',
    legendData: [{ name: '上月', icon: 'square' },
    { name: '本月', icon: 'square' }],
    xAxisData: allXAxisData,
    seriesData: [{ name: '上月', type: 'bar', barGap: 0, barWidth: 20, data: lastMonthList },
    { name: '本月', type: 'bar', barGap: 0, barWidth: 20, data: thisMonthList }],
    color: allColor
  };
  initRectangleChartContainer(config);
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

</script>

<style scoped lang="scss">
@import url(./briefReport.css);
</style>
