<template>
  <div>
    <div class="fullpage">
      <div class="brief">
        {{ `${data.provinceReportName || ''}${data.cityName || ''}（两客一危）${data.summaryReportShowDate || ''}简报`
        }}&nbsp;&nbsp;
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
      <h2 class="city text-center">（<i class="red">{{ data.areaName }}-两客一危</i>）</h2>

      <h3 class="company text-center">湖北车安达信息科技有限公司</h3>
      <h3 class="date text-center red">{{ data.summaryReportGenerateDate }}</h3>
    </div>
    <!-- 目录页 -->
    <div class="fullpage menu content-wrapper text-center">
      <h1 class="page-title text-center" style="font-size: 29px;margin-top:150px;">目录</h1>
      <h5 class="sub-menu">
        <span class="song"> 一、{{ data.areaName }}监测总体情况</span>
        <span class="pagenum">2</span>
        <span class="menu-dot">..................................</span>
      </h5>
      <h5 class="sub-menu">
        <span class="song">二、区（县）所三类报警情况</span>
        <span class="pagenum">3</span>
        <span class="menu-dot">................................</span>
      </h5>
      <h5 class="sub-menu">
        <span class="song">三、企业三类报警情况</span>
        <span class="pagenum">6</span>
        <span class="menu-dot">..................................</span>
      </h5>
      <h5 class="sub-menu">
        <span class="song">四、三类报警车辆排名情况</span>
        <span class="pagenum">9</span>
        <span class="menu-dot">..................................</span>
      </h5>
      <h5 class="sub-menu">
        <span class="song">五、三类报警对比上月情况</span>
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
        一、<i class="red">{{ data.areaName }}</i>监测总体情况
      </h3>
      <p class="text-wrapper">
        {{ data.summaryReportDate2 }}，
        {{ data.areaName }}接入我平台车辆共
        <i class="red">{{ part1Data.vehicleTotalNumber }}</i>台，其中
        {{ part1Data.vehicleInfoTextDesc }}
      </p>
      <div class="text-center img-wrapper">
        <div id="chartContainer1" style="height: 350px;width: 500px;display: inline-block;"></div>
      </div>
      <p class="text-wrapper">
        车辆报警总事件数为<i class="red">{{ part1Data.alarmTotalNumber }}</i>次{{ part1Data.alarmInfoTextDesc }}
      </p>
      <div class="text-center img-wrapper">
        <div id="chartContainer2" style="height: 300px;width: 500px;display: inline-block;"></div>
        <!-- <c:set var="part1ChartTableBus"
          value="${part1Data.busSpeedingAlarmNumber == '0' && part1Data.busFatigueAlarmNumber == '0' && part1Data.bus25AlarmNumber == '0'}" />
        <c:set var="part1ChartTableTour"
          value="${part1Data.tourSpeedingAlarmNumber == '0' && part1Data.tourFatigueAlarmNumber == '0' && part1Data.tour25AlarmNumber == '0'}" />
        <c:set var="part1ChartTableDanger"
          value="${part1Data.dangerSpeedingAlarmNumber == '0' && part1Data.dangerFatigueAlarmNumber == '0' && part1Data.danger25AlarmNumber == '0'}" />
        <c:set var="part1ChartTableGoods"
          value="${part1Data.goodsSpeedingAlarmNumber == '0' && part1Data.goodsFatigueAlarmNumber == '0' && part1Data.goods25AlarmNumber == '0'}" /> -->
        <table class="img-table" border="1">
          <tr>
            <th></th>
            <!-- <c:if v-if="!part1ChartTableBus" -->
            <th v-if="!part1ChartTableBus">班线客运</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part1ChartTableTour" -->
            <th v-if="!part1ChartTableTour">旅游客运</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part1ChartTableDanger" -->
            <th v-if="!part1ChartTableDanger">危运</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part1ChartTableGoods" -->
            <th v-if="!part1ChartTableGoods">普通货运</th>
            <!-- </c:if> -->
          </tr>
          <tr>
            <th>超速</th>
            <!-- <c:if v-if="!part1ChartTableBus" -->
            <th v-if="!part1ChartTableBus">{{ part1Data.busSpeedingAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part1ChartTableTour" -->
            <th v-if="!part1ChartTableTour">{{ part1Data.tourSpeedingAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part1ChartTableDanger" -->
            <th v-if="!part1ChartTableDanger">{{ part1Data.dangerSpeedingAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part1ChartTableGoods" -->
            <th v-if="!part1ChartTableGoods">{{ part1Data.goodsSpeedingAlarmNumber }}</th>
            <!-- </c:if> -->
          </tr>
          <tr>
            <th>疲劳驾驶</th>
            <!-- <c:if v-if="!part1ChartTableBus" -->
            <th v-if="!part1ChartTableBus">{{ part1Data.busFatigueAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part1ChartTableTour" -->
            <th v-if="!part1ChartTableTour">{{ part1Data.tourFatigueAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part1ChartTableDanger" -->
            <th>{{ part1Data.dangerFatigueAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part1ChartTableGoods" -->
            <th v-if="!part1ChartTableGoods">{{ part1Data.goodsFatigueAlarmNumber }}</th>
            <!-- </c:if> -->
          </tr>
          <tr>
            <th>凌晨2-5时禁驾</th>
            <!-- <c:if v-if="!part1ChartTableBus" -->
            <th v-if="!part1ChartTableBus">{{ part1Data.bus25AlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part1ChartTableTour" -->
            <th v-if="!part1ChartTableTour">{{ part1Data.tour25AlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part1ChartTableDanger" -->
            <th v-if="!part1ChartTableDanger">{{ part1Data.danger25AlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part1ChartTableGoods" -->
            <th v-if="!part1ChartTableGoods">{{ part1Data.goods25AlarmNumber }}</th>
            <!-- </c:if> -->
          </tr>
        </table>
      </div>
      <div class="text-center img-wrapper">
        <div id="chartContainer3" style="height: 350px;width: 500px;display: inline-block;"></div>
      </div>

      <!-- 二 -->
      <h3 class="content-title">
        二、区（县）所超速、疲劳驾驶、凌晨2-5时禁行三类报警情况
      </h3>
      <p class="text-wrapper">
        从各区（县）违规车辆报警均值情况来看，全市违规车辆报警均值为<i class="red">{{ part2Data.avgAlarmTotalNumber }}</i>次，
        违规车辆报警均值排名{{ part2Data.alarmNumberTop3Prefix }}为：
        <i class="red">{{ part2Data.alarmNumberTop3District }}</i>，分别为：<i class="red">${part2Data.alarmNumberTop3Value
          }</i>。
        <span v-if="part2Data.importantVehicleAlarmRankingInfos.length > 0">
          重点营运（两客一危）车辆报警均值排名{{ part2Data.carDangerAlarmNumberTop3Prefix }}为：<i class="red">{{
            part2Data.carDangerAlarmNumberTop3District }}</i>，分别为：<i class="red">{{
    part2Data.carDangerAlarmNumberTop3Value }}</i>。
        </span>
      </p>
      <h4 class="table-title text-center">
        {{ data.summaryReportDate }}车辆报警情况排名表
      </h4>
      <div class="table-wrapper">
        <table class="table" border="1">
          <tr>
            <th>排名</th>
            <th>辖区</th>
            <th>报警车辆数</th>
            <th>报警次数</th>
            <th>报警均值</th>
          </tr>
          <!-- <c:forEach v-for="item in part2Data.allVehicleAlarmRankingInfos" var="item"> -->
          <tr v-for="item in part2Data.allVehicleAlarmRankingInfos">
            <td>{{ item.serialNo }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.vehicleNumber }}</td>
            <td>{{ item.alarmNumber }}</td>
            <td>{{ item.avgAlarmNumber }}</td>
          </tr>
          <!-- </c:forEach> -->
          <tr>
            <td colspan="2">小计</td>
            <td>{{ part2Data.allVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
            <td>{{ part2Data.allVehicleAlarmRankingInfosSum.alarmNumber }}</td>
            <td>{{ part2Data.allVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
          </tr>
        </table>
      </div>

      <div v-if="part2Data.importantVehicleAlarmRankingInfos.length > 0">
        <h4 class="table-title text-center">
          {{ data.summaryReportDate }}重点营运车辆报警情况排名表
        </h4>
        <div class="table-wrapper">
          <table class="table" border="1">
            <tr>
              <th>排名</th>
              <th>辖区</th>
              <th>报警车辆数</th>
              <th>报警次数</th>
              <th>报警均值</th>
            </tr>
            <!-- <c:forEach v-for="item in part2Data.importantVehicleAlarmRankingInfos" var="item"> -->
            <tr v-for="item in part2Data.importantVehicleAlarmRankingInfos">
              <td>{{ item.serialNo }}</td>
              <td>{{ item.areaName }}</td>
              <td>{{ item.vehicleNumber }}</td>
              <td>{{ item.alarmNumber }}</td>
              <td>{{ item.avgAlarmNumber }}</td>
            </tr>
            <!-- </c:forEach> -->
            <tr>
              <td colspan="2">小计</td>
              <td>{{ part2Data.importantVehicleAlarmRankingInfosSum.vehicleNumber }}</td>
              <td>{{ part2Data.importantVehicleAlarmRankingInfosSum.alarmNumber }}</td>
              <td>{{ part2Data.importantVehicleAlarmRankingInfosSum.avgAlarmNumber }}</td>
            </tr>
          </table>
        </div>
      </div>
      <p class="text-wrapper">
        其中，
        <span v-if="part2Data.busAlarmInfos.length > 0">
          班线客运违规车辆报警均值辖区排名{{ part2Data.busAlarmNumberTop3Prefix }}为：<i class="red">{{ part2Data.busAlarmNumberTop3District
          }}</i>，分别为：
          <i class="red">{{ part2Data.busAlarmNumberTop3Value }}</i>
          {{ part2Data.busAlarmNumberTop3Seperator }}
        </span>
        <span v-if="part2Data.tourAlarmInfos.length > 0">
          旅游客运违规车辆报警均值辖区排{{ part2Data.tourAlarmNumberTop3Prefix }}为：<i class="red">{{
            part2Data.tourAlarmNumberTop3District }}</i>，分别为：<i class="red">{{ part2Data.tourAlarmNumberTop3Value }}</i>
          {{ part2Data.tourAlarmNumberTop3Seperator }}
        </span>
        <span v-if="part2Data.dangerAlarmInfos.length > 0">
          危险品运输违规车辆报警均值辖区排名{{ part2Data.dangerAlarmNumberTop3Prefix }}为：<i class="red">{{
            part2Data.dangerAlarmNumberTop3District }}</i>，分别为：<i class="red">{{ part2Data.dangerAlarmNumberTop3Value
  }}</i>。
        </span>
      </p>

      <div v-if="part2Data.busAlarmInfos.length > 0">
        <h4 class="table-title text-center">
          {{ data.summaryReportDate }}班线客运车辆报警情况排名表
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
              <th>凌晨2-5点禁驾</th>
              <th>报警总次数</th>
              <th>报警均值</th>
            </tr>
            <!-- <c:forEach v-for="item in part2Data.busAlarmInfos" var="item"> -->
            <tr v-for="item in part2Data.busAlarmInfos">
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
              <td>{{ part2Data.busAlarmInfosSum.companyNumber }}</td>
              <td>{{ part2Data.busAlarmInfosSum.vehicleNumber }}</td>
              <td>{{ part2Data.busAlarmInfosSum.speedingAlarmNumber }}</td>
              <td>{{ part2Data.busAlarmInfosSum.fatigueAlarmNumber }}</td>
              <td>{{ part2Data.busAlarmInfosSum.t25AlarmNumber }}</td>
              <td>{{ part2Data.busAlarmInfosSum.totalAlarmNumber }}</td>
              <td>{{ part2Data.busAlarmInfosSum.avgAlarmNumber }}</td>
            </tr>
          </table>
        </div>
      </div>

      <div v-if="part2Data.tourAlarmInfos.length > 0">
        <h4 class="table-title text-center">
          {{ data.summaryReportDate }}旅游客运车辆报警情况排名表
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
              <th>凌晨2-5点禁驾</th>
              <th>报警总次数</th>
              <th>报警均值</th>
            </tr>
            <!-- <c:forEach v-for="item in part2Data.tourAlarmInfos" var="item"> -->
            <tr v-for="item in part2Data.tourAlarmInfos">
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
              <td>{{ part2Data.tourAlarmInfosSum.companyNumber }}</td>
              <td>{{ part2Data.tourAlarmInfosSum.vehicleNumber }}</td>
              <td>{{ part2Data.tourAlarmInfosSum.speedingAlarmNumber }}</td>
              <td>{{ part2Data.tourAlarmInfosSum.fatigueAlarmNumber }}</td>
              <td>{{ part2Data.tourAlarmInfosSum.t25AlarmNumber }}</td>
              <td>{{ part2Data.tourAlarmInfosSum.totalAlarmNumber }}</td>
              <td>{{ part2Data.tourAlarmInfosSum.avgAlarmNumber }}</td>
            </tr>
          </table>
        </div>
      </div>

      <div v-if="part2Data.dangerAlarmInfos.length > 0">
        <h4 class="table-title text-center">
          {{ data.summaryReportDate }}危险品运输车辆报警情况排名表
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
            <!-- <c:forEach v-for="item in part2Data.dangerAlarmInfos" var="item"> -->
            <tr v-for="item in part2Data.dangerAlarmInfos">
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
              <td>{{ part2Data.dangerAlarmInfosSum.companyNumber }}</td>
              <td>{{ part2Data.dangerAlarmInfosSum.vehicleNumber }}</td>
              <td>{{ part2Data.dangerAlarmInfosSum.speedingAlarmNumber }}</td>
              <td>{{ part2Data.dangerAlarmInfosSum.fatigueAlarmNumber }}</td>
              <td>{{ part2Data.dangerAlarmInfosSum.totalAlarmNumber }}</td>
              <td>{{ part2Data.dangerAlarmInfosSum.avgAlarmNumber }}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- 三 -->
      <h3 class="content-title">
        三、企业超速、疲劳驾驶、凌晨2-5时禁行三类报警情况
      </h3>
      <p class="text-wrapper">
        从各企业违规车辆报警均值情况来看，
        <span v-if="part3Data.busCompanyAlarmRankingInfos.length > 0">
          班线客运违规车辆报警均值{{ part3Data.busAlarmNumberTop3Prefix }}为：<i class="red">{{ part3Data.busAlarmNumberTop3Company
          }}</i>，分别为<i class="red">{{ part3Data.busAlarmNumberTop3Value }}</i>
          {{ part3Data.busAlarmNumberTop3Seperator }}
        </span>
        <span v-if="part3Data.tourCompanyAlarmRankingInfos.length > 0">
          旅游客运违规车辆报警均值{{ part3Data.tourAlarmNumberTop3Prefix }}为：<i class="red">{{ part3Data.tourAlarmNumberTop3Company
          }}</i>，分别为<i class="red">{{ part3Data.tourAlarmNumberTop3Value }}</i>
          {{ part3Data.tourAlarmNumberTop3Seperator }}
        </span>
        <span v-if="part3Data.dangerCompanyAlarmRankingInfos.length > 0">
          危险品运输违规车辆报警均值{{ part3Data.dangerAlarmNumberTop3Prefix }}为：<i class="red">{{
            part3Data.dangerAlarmNumberTop3Company }}</i>，分别为<i class="red">{{ part3Data.dangerAlarmNumberTop3Value }}</i>。
        </span>
      </p>

      <div v-if="part3Data.busCompanyAlarmRankingInfos.length > 0">
        <h4 class="table-title text-center">
          {{ data.summaryReportDate }}班线客运企业报警情况排名表
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
            <!-- <c:forEach v-for="item in part3Data.busCompanyAlarmRankingInfos" var="item"> -->
            <tr v-for="item in part3Data.busCompanyAlarmRankingInfos">
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

      <div v-if="part3Data.tourCompanyAlarmRankingInfos.length > 0">
        <h4 class="table-title text-center">
          {{ data.summaryReportDate }}旅游客运企业报警情况排名表
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
            <!-- <c:forEach v-for="item in part3Data.tourCompanyAlarmRankingInfos" var="item"> -->
            <tr v-for="item in part3Data.tourCompanyAlarmRankingInfos">
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

      <div v-if="part3Data.dangerCompanyAlarmRankingInfos.length > 0">
        <h4 class="table-title text-center">
          {{ data.summaryReportDate }}危运企业报警情况排名表
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
            <!-- <c:forEach v-for="item in part3Data.dangerCompanyAlarmRankingInfos" var="item"> -->
            <tr v-for="item in part3Data.dangerCompanyAlarmRankingInfos">
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
        四、超速、疲劳驾驶、凌晨2-5时禁行三类报警车辆排名情况
      </h3>
      <p class="text-wrapper">
        从单台车辆报警情况来看，重点营运车辆报警次数排名{{ part4Data.alarmNumberTop3Prefix }}为：<i class="red">{{ part4Data.alarmNumberTop3Vehicles
        }}</i>
        ，分别为：<i class="red">{{ part4Data.alarmNumberTop3Value }}</i>。
      </p>

      <h4 class="table-title text-center">
        {{ data.summaryReportDate }}全市重点营运车辆报警情况排名表
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

      <h2 class="text-center">以下是各区（县）重点营运车辆报警次数排名前五的车辆。</h2>
      <br />
      <h4 class="table-title text-center">
        {{ data.summaryReportDate + data.areaName }}重点营运车辆车辆报警情况排名表
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
        五、超速、疲劳驾驶、凌晨2-5时禁行三类报警对比上月情况
      </h3>
      <p class="text-wrapper">
        对比上月超速、疲劳驾驶、凌晨2-5时禁行三类报警情况来看，
        全市报警总体{{ part5Data.allAlarmRelativeRatio }}。其中超速报警
        {{ part5Data.speedingAlarmRelativeRatio }}，疲劳驾驶报警
        {{ part5Data.fatigueAlarmRelativeRatio }}，
        凌晨2-5时禁行报警{{ part5Data.t25AlarmRelativeRatio }}。
      </p>
      <div class="img-wrapper text-center">
        <div id="chartContainer4" style="height: 300px;width: 500px;display: inline-block;"></div>
        <!-- <c:set var="part5Chart1TableBus"
          value="${part5Data.allAlarmTendencyInfo.lastMonth.busAlarmNumber == '0' && part5Data.allAlarmTendencyInfo.thisMonth.busAlarmNumber == '0'}" />
        <c:set var="part5Chart1TableTour"
          value="${part5Data.allAlarmTendencyInfo.lastMonth.tourAlarmNumber == '0' && part5Data.allAlarmTendencyInfo.thisMonth.tourAlarmNumber == '0'}" />
        <c:set var="part5Chart1TableDanger"
          value="${part5Data.allAlarmTendencyInfo.lastMonth.dangerAlarmNumber == '0' && part5Data.allAlarmTendencyInfo.thisMonth.dangerAlarmNumber == '0'}" />
        <c:set var="part5Chart1TableGoods"
          value="${part5Data.allAlarmTendencyInfo.lastMonth.goodsAlarmNumber == '0' && part5Data.allAlarmTendencyInfo.thisMonth.goodsAlarmNumber == '0'}" /> -->
        <table class="img-table" border="1" id="part5Chart1TableId"
          :refTest="`${part5Chart1TableBus},${part5Chart1TableDanger},${part5Chart1TableDanger}`">
          <tr>
            <th></th>
            <!-- <c:if v-if="!part5Chart1TableBus" -->
            <th v-if="!part5Chart1TableBus">班线客运</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart1TableTour" -->
            <th v-if="!part5Chart1TableTour">旅游客运</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart1TableDanger" -->
            <th v-if="!part5Chart1TableDanger">危险品运输</th>
            <!-- </c:if> -->
            <th>合计</th>
          </tr>
          <tr>
            <th>上月</th>
            <!-- <c:if v-if="!part5Chart1TableBus" -->
            <th v-if="!part5Chart1TableBus">{{ part5Data.allAlarmTendencyInfo.lastMonth.busAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart1TableTour" -->
            <th v-if="!part5Chart1TableTour">{{ part5Data.allAlarmTendencyInfo.lastMonth.tourAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart1TableDanger" -->
            <th v-if="!part5Chart1TableDanger">{{ part5Data.allAlarmTendencyInfo.lastMonth.dangerAlarmNumber }}</th>
            <!-- </c:if> -->
            <th>{{ part5Data.allAlarmTendencyInfo.lastMonth.totalAlarmNumber }}</th>
          </tr>
          <tr>
            <th>本月</th>
            <!-- <c:if v-if="!part5Chart1TableBus" -->
            <th v-if="!part5Chart1TableBus">{{ part5Data.allAlarmTendencyInfo.thisMonth.busAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart1TableTour" -->
            <th v-if="!part5Chart1TableTour">{{ part5Data.allAlarmTendencyInfo.thisMonth.tourAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart1TableDanger" -->
            <th v-if="!part5Chart1TableDanger">{{ part5Data.allAlarmTendencyInfo.thisMonth.dangerAlarmNumber }}</th>
            <!-- </c:if> -->
            <th>{{ part5Data.allAlarmTendencyInfo.thisMonth.totalAlarmNumber }}</th>
          </tr>
        </table>
      </div>
      <div class="img-wrapper text-center">
        <div id="chartContainer5" style="height: 300px;width: 500px;display: inline-block;"></div>
        <!-- <c:set var="part5Chart2TableBus"
          value="${part5Data.speedingAlarmTendencyInfo.lastMonth.busAlarmNumber == '0' && part5Data.speedingAlarmTendencyInfo.thisMonth.busAlarmNumber == '0'}" />
        <c:set var="part5Chart2TableTour"
          value="${part5Data.speedingAlarmTendencyInfo.lastMonth.tourAlarmNumber == '0' && part5Data.speedingAlarmTendencyInfo.thisMonth.tourAlarmNumber == '0'}" />
        <c:set var="part5Chart2TableDanger"
          value="${part5Data.speedingAlarmTendencyInfo.lastMonth.dangerAlarmNumber == '0' && part5Data.speedingAlarmTendencyInfo.thisMonth.dangerAlarmNumber == '0'}" />
        <c:set var="part5Chart2TableGoods"
          value="${part5Data.speedingAlarmTendencyInfo.lastMonth.goodsAlarmNumber == '0' && part5Data.speedingAlarmTendencyInfo.thisMonth.goodsAlarmNumber == '0'}" /> -->
        <table class="img-table" border="1" id="part5Chart2TableId"
          :refTest="`${part5Chart2TableBus},${part5Chart2TableDanger},${part5Chart2TableDanger}`">
          <tr>
            <th></th>
            <!-- <c:if v-if="!part5Chart2TableBus" -->
            <th v-if="!part5Chart2TableBus">班线客运</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart2TableTour" -->
            <th v-if="!part5Chart2TableTour">旅游客运</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart2TableDanger" -->
            <th v-if="!part5Chart2TableDanger">危险品运输</th>
            <!-- </c:if> -->
            <th>合计</th>
          </tr>
          <tr>
            <th>上月</th>
            <!-- <c:if v-if="!part5Chart2TableBus" -->
            <th v-if="!part5Chart2TableBus">{{ part5Data.speedingAlarmTendencyInfo.lastMonth.busAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart2TableTour" -->
            <th v-if="!part5Chart2TableTour">{{ part5Data.speedingAlarmTendencyInfo.lastMonth.tourAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart2TableDanger" -->
            <th v-if="!part5Chart2TableDanger">{{ part5Data.speedingAlarmTendencyInfo.lastMonth.dangerAlarmNumber }}</th>
            <!-- </c:if> -->
            <th>{{ part5Data.speedingAlarmTendencyInfo.lastMonth.totalAlarmNumber }}</th>
          </tr>
          <tr>
            <th>本月</th>
            <!-- <c:if v-if="!part5Chart2TableBus" -->
            <th v-if="!part5Chart2TableBus">{{ part5Data.speedingAlarmTendencyInfo.thisMonth.busAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart2TableTour" -->
            <th v-if="!part5Chart2TableTour">{{ part5Data.speedingAlarmTendencyInfo.thisMonth.tourAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart2TableDanger" -->
            <th v-if="!part5Chart2TableDanger">{{ part5Data.speedingAlarmTendencyInfo.thisMonth.dangerAlarmNumber }}</th>
            <!-- </c:if> -->
            <th>{{ part5Data.speedingAlarmTendencyInfo.thisMonth.totalAlarmNumber }}</th>
          </tr>
        </table>
      </div>
      <div class="img-wrapper text-center">
        <div id="chartContainer6" style="height: 300px;width: 500px;display: inline-block;"></div>
        <!-- <c:set var="part5Chart3TableBus"
          value="${part5Data.fatigueAlarmTendencyInfo.lastMonth.busAlarmNumber == '0' && part5Data.fatigueAlarmTendencyInfo.thisMonth.busAlarmNumber == '0'}" />
        <c:set var="part5Chart3TableTour"
          value="${part5Data.fatigueAlarmTendencyInfo.lastMonth.tourAlarmNumber == '0' && part5Data.fatigueAlarmTendencyInfo.thisMonth.tourAlarmNumber == '0'}" />
        <c:set var="part5Chart3TableDanger"
          value="${part5Data.fatigueAlarmTendencyInfo.lastMonth.dangerAlarmNumber == '0' && part5Data.fatigueAlarmTendencyInfo.thisMonth.dangerAlarmNumber == '0'}" />
        <c:set var="part5Chart3TableGoods"
          value="${part5Data.fatigueAlarmTendencyInfo.lastMonth.goodsAlarmNumber == '0' && part5Data.fatigueAlarmTendencyInfo.thisMonth.goodsAlarmNumber == '0'}" /> -->
        <table class="img-table" border="1" id="part5Chart3TableId"
          :refTest="`${part5Chart3TableBus},${part5Chart3TableDanger},${part5Chart3TableDanger}`">
          <tr>
            <th></th>
            <!-- <c:if v-if="!part5Chart3TableBus" -->
            <th v-if="!part5Chart3TableBus">班线客运</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart3TableTour" -->
            <th v-if="!part5Chart3TableTour">旅游客运</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart3TableDanger" -->
            <th v-if="!part5Chart3TableDanger">危险品运输</th>
            <!-- </c:if> -->
            <th>合计</th>
          </tr>
          <tr>
            <th>上月</th>
            <!-- <c:if v-if="!part5Chart3TableBus" -->
            <th v-if="!part5Chart3TableBus">{{ part5Data.fatigueAlarmTendencyInfo.lastMonth.busAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart3TableTour" -->
            <th v-if="!part5Chart3TableTour">{{ part5Data.fatigueAlarmTendencyInfo.lastMonth.tourAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart3TableDanger" -->
            <th v-if="!part5Chart3TableDanger">{{ part5Data.fatigueAlarmTendencyInfo.lastMonth.dangerAlarmNumber }}</th>
            <!-- </c:if> -->
            <th>{{ part5Data.fatigueAlarmTendencyInfo.lastMonth.totalAlarmNumber }}</th>
          </tr>
          <tr>
            <th>本月</th>
            <!-- <c:if v-if="!part5Chart3TableBus" -->
            <th v-if="!part5Chart3TableBus">{{ part5Data.fatigueAlarmTendencyInfo.thisMonth.busAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart3TableTour" -->
            <th v-if="!part5Chart3TableTour">{{ part5Data.fatigueAlarmTendencyInfo.thisMonth.tourAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart3TableDanger" -->
            <th v-if="!part5Chart3TableDanger">{{ part5Data.fatigueAlarmTendencyInfo.thisMonth.dangerAlarmNumber }}</th>
            <!-- </c:if> -->
            <th>{{ part5Data.fatigueAlarmTendencyInfo.thisMonth.totalAlarmNumber }}</th>
          </tr>
        </table>
      </div>
      <div class="img-wrapper text-center">
        <div id="chartContainer7" style="height: 300px;width: 500px;display: inline-block;"></div>
        <!-- <c:set var="part5Chart4TableBus"
        value="${part5Data.t25AlarmTendencyInfo.lastMonth.busAlarmNumber == '0' && part5Data.t25AlarmTendencyInfo.thisMonth.busAlarmNumber == '0'}" />
      <c:set var="part5Chart4TableTour"
        value="${part5Data.t25AlarmTendencyInfo.lastMonth.tourAlarmNumber == '0' && part5Data.t25AlarmTendencyInfo.thisMonth.tourAlarmNumber == '0'}" /> -->
        <table class="img-table" border="1" id="part5Chart4TableId" :refTest="`${part5Chart4TableBus},${part5Chart4TableTour},${part5Chart4TableTour}`">
          <tr>
            <th></th>
            <!-- <c:if v-if="!part5Chart4TableBus" -->
            <th v-if="!part5Chart4TableBus">班线客运</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart4TableTour" -->
            <th v-if="!part5Chart4TableTour">旅游客运</th>
            <!-- </c:if> -->
            <th>合计</th>
          </tr>
          <tr>
            <th>上月</th>
            <!-- <c:if v-if="!part5Chart4TableBus" -->
            <th v-if="!part5Chart4TableBus">{{ part5Data.t25AlarmTendencyInfo.lastMonth.busAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart4TableTour" -->
            <th v-if="!part5Chart4TableTour">{{ part5Data.t25AlarmTendencyInfo.lastMonth.tourAlarmNumber }}</th>
            <!-- </c:if> -->
            <th>{{ part5Data.t25AlarmTendencyInfo.lastMonth.totalAlarmNumber }}</th>
          </tr>
          <tr>
            <th>本月</th>
            <!-- <c:if v-if="!part5Chart4TableBus" -->
            <th v-if="!part5Chart4TableBus">{{ part5Data.t25AlarmTendencyInfo.thisMonth.busAlarmNumber }}</th>
            <!-- </c:if> -->
            <!-- <c:if v-if="!part5Chart4TableTour" -->
            <th v-if="!part5Chart4TableTour">{{ part5Data.t25AlarmTendencyInfo.thisMonth.tourAlarmNumber }}</th>
            <!-- </c:if> -->
            <th>{{ part5Data.t25AlarmTendencyInfo.thisMonth.totalAlarmNumber }}</th>
          </tr>
        </table>
      </div>

      <div v-if="part6Data.areaOtherAlarmInfos.length > 0 || part6Data.companyOtherAlarmInfos.length > 0">
        <!-- 六 -->
        <h3 class="content-title">
          六、其他类型报警区（县）级报警情况
        </h3>
        <p class="text-wrapper">
          备注：其他报警包括：轨迹不完整、定位漂移、疑似异地经营、进区域、出区域报警等。
        </p>
        <h4 class="table-title text-center">
          {{ data.summaryReportDate }}其他类型报警区（县）排名表
        </h4>
        <div class="table-wrapper">
          <table class="table" border="1">
            <tr>
              <th>排名</th>
              <th>辖区</th>
              <th>报警车辆数</th>
              <th>报警次数</th>
              <th>报警均值</th>
            </tr>
            <!-- <c:forEach v-for="item in part6Data.areaOtherAlarmInfos" var="item"> -->
            <tr v-for="item in part6Data.areaOtherAlarmInfos">
              <td>{{ item.serialNo }}</td>
              <td>{{ item.areaName }}</td>
              <td>{{ item.vehicleNumber }}</td>
              <td>{{ item.alarmNumber }}</td>
              <td>{{ item.avgAlarmNumber }}</td>
            </tr>
            <!-- </c:forEach> -->
            <tr>
              <td colspan="2">小计</td>
              <td>{{ part6Data.areaOtherAlarmInfosSum.vehicleNumber }}</td>
              <td>{{ part6Data.areaOtherAlarmInfosSum.alarmNumber }}</td>
              <td>{{ part6Data.areaOtherAlarmInfosSum.avgAlarmNumber }}</td>
            </tr>
          </table>
        </div>
        <h4 class="table-title text-center">
          {{ data.summaryReportDate }}其他类型报警企业排名表
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
            <!-- <c:forEach v-for="item in part6Data.companyOtherAlarmInfos" var="item"> -->
            <tr v-for="item in part6Data.companyOtherAlarmInfos">
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
    getPicData("chartContainer5", "char5Data");
    getPicData("chartContainer6", "char6Data");
    getPicData("chartContainer7", "char7Data");
    document.querySelector("#downloadForm").submit();
  });
})();

initChartContainer1();
initChartContainer2();
initChartContainer3();
initChartContainer4();
initChartContainer5();
initChartContainer6();
initChartContainer7();

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
  var seriesDataArray = chartContainer2Values;
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
  if (!((speedingDatas[0] === "0") && (fatigueDatas[0] === "0") && (t25Datas[0] === "0"))) {
    showXAxisData.push(allXAxisData[0]);
    showSpeedingDatas.push(speedingDatas[0]);
    showFatigueDatas.push(fatigueDatas[0]);
    showT25Datas.push(t25Datas[0]);
  }
  if (!((speedingDatas[1] === "0") && (fatigueDatas[1] === "0") && (t25Datas[1] === "0"))) {
    showXAxisData.push(allXAxisData[1]);
    showSpeedingDatas.push(speedingDatas[1]);
    showFatigueDatas.push(fatigueDatas[1]);
    showT25Datas.push(t25Datas[1]);
  }
  if (!((speedingDatas[2] === "0") && (fatigueDatas[2] === "0") && (t25Datas[2] === "0"))) {
    showXAxisData.push(allXAxisData[2]);
    showSpeedingDatas.push(speedingDatas[2]);
    showFatigueDatas.push(fatigueDatas[2]);
    showT25Datas.push(t25Datas[2]);
  }
  if (!((speedingDatas[3] === "0") && (fatigueDatas[3] === "0") && (t25Datas[3] === "0"))) {
    showXAxisData.push(allXAxisData[3]);
    showSpeedingDatas.push(speedingDatas[3]);
    showFatigueDatas.push(fatigueDatas[3]);
    showT25Datas.push(t25Datas[3]);
  }


  var config = {
    containerId: 'chartContainer2',
    title: `${data.areaNamedata.summaryReportDate}报警情况统计表`,
    legendData: [{ name: '超速', icon: 'square' },
    { name: '疲劳驾驶', icon: 'square' },
    { name: '凌晨2-5时禁驾', icon: 'square' }],
    xAxisData: showXAxisData,
    seriesData: [{ name: '超速', type: 'bar', barGap: 0, barWidth: 20, data: showSpeedingDatas },
    { name: '疲劳驾驶', type: 'bar', barWidth: 20, data: showFatigueDatas },
    { name: '凌晨2-5时禁驾', type: 'bar', barWidth: 20, data: showT25Datas }
    ],
    color: ['#5B9BD5', '#ED7D31', '#A5A5A5']
  }
  initRectangleChartContainer(config);
}

function initChartContainer3() {
  var config = {
    containerId: 'chartContainer3',
    title: '三类违规报警次数占比情况',
    legendData: [{ name: '超速', icon: 'square' },
    { name: '疲劳驾驶', icon: 'square' },
    { name: '凌晨2-5时禁驾', icon: 'square' }],
    seriesData: chartContainer3Values,
    color: ['#5B9BD5', '#ED7D31', '#A5A5A5']
  }
  initPieChartContainer(config);
}

function initChartContainer4() {
  var boolArr = document.querySelector("#part5Chart1TableId").getAttribute("refTest").split(",");
  iniPart5tChartContainer('chartContainer4', '重点营运车辆报警趋势分析统计表', chartContainer4Values, boolArr);
}

function initChartContainer5() {
  var boolArr = document.querySelector("#part5Chart2TableId").getAttribute("refTest").split(",");
  iniPart5tChartContainer('chartContainer5', '重点营运车辆超速报警趋势分析表', chartContainer5Values, boolArr);
}

function initChartContainer6() {
  var boolArr = document.querySelector("#part5Chart3TableId").getAttribute("refTest").split(",");
  iniPart5tChartContainer('chartContainer6', '重点营运车辆疲劳驾驶报警趋势分析表', chartContainer6Values, boolArr);
}

function initChartContainer7() {
  var boolArr = document.querySelector("#part5Chart4TableId").getAttribute("refTest").split(",");
  var seriesDataArray = chartContainer7Values;
  if (!seriesDataArray) {
    seriesDataArray = [[], [], []]
  }
  var allXAxisData = ['班线客运', '旅游客运', '合计'];
  var lastMonthData = seriesDataArray[0];
  var currentMonthData = seriesDataArray[1];
  var showXAxisData = [];
  var showLastMonthData = [];
  var showCurrentMonthData = [];
  for (var i = 0; i < boolArr.length; i++) {
    if (boolArr[i] !== "true") {
      showXAxisData.push(allXAxisData[i]);
      showLastMonthData.push(lastMonthData[i]);
      showCurrentMonthData.push(currentMonthData[i]);
    }
  }
  showXAxisData.push('合计');
  showLastMonthData.push(lastMonthData[allXAxisData.length - 1]);
  showCurrentMonthData.push(currentMonthData[allXAxisData.length - 1]);

  var config = {
    containerId: 'chartContainer7',
    title: '重点营运车辆凌晨2-5时禁行报警趋势分析表',
    legendData: [{ name: '上月', icon: 'square' },
    { name: '本月', icon: 'square' }],
    xAxisData: showXAxisData,
    seriesData: [
      { name: '上月', type: 'bar', barGap: 0, barWidth: 20, data: showLastMonthData },
      { name: '本月', type: 'bar', barWidth: 20, data: showCurrentMonthData }
    ],
    color: ['#5B9BD5', '#ED7D31']
  }
  initRectangleChartContainer(config);
}

function iniPart5tChartContainer(containerId, title, seriesDataArray, boolArr) {
  if (!seriesDataArray) {
    seriesDataArray = [[], [], []]
  }
  var allXAxisData = ['班线客运', '旅游客运', '危险品运输', '合计'];
  var lastMonthData = seriesDataArray[0];
  var currentMonthData = seriesDataArray[1];
  var showXAxisData = [];
  var showLastMonthData = [];
  var showCurrentMonthData = [];
  for (var i = 0; i < boolArr.length; i++) {
    if (boolArr[i] !== "true") {
      showXAxisData.push(allXAxisData[i]);
      showLastMonthData.push(lastMonthData[i]);
      showCurrentMonthData.push(currentMonthData[i]);
    }
  }
  showXAxisData.push('合计');
  showLastMonthData.push(lastMonthData[allXAxisData.length - 1]);
  showCurrentMonthData.push(currentMonthData[allXAxisData.length - 1]);

  var config = {
    containerId: containerId,
    title: title,
    legendData: [{ name: '上月', icon: 'square' },
    { name: '本月', icon: 'square' }],
    xAxisData: showXAxisData,
    seriesData: [
      { name: '上月', type: 'bar', barGap: 0, barWidth: 20, data: showLastMonthData },
      { name: '本月', type: 'bar', barWidth: 20, data: showCurrentMonthData }
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
