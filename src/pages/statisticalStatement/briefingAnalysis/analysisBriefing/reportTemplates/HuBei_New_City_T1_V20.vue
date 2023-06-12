<template>
  <div>
    <!-- 封面页 -->
    <div class="fullpage">
      <div class="brief">{{ data.provinceName }}简报&nbsp;&nbsp;
        <!-- <shiro:hasPermission name="statistics-report-download"> -->
        <a href="javascript:" id="downloadDoc" @click="e => download()">下载word</a>
        <!-- </shiro:hasPermission> -->
      </div>
      <div class="img-wrapper text-center">
        <img src="/src/assets/images/cheanda/birefreport.png" alt="">
      </div>
      <h1 class="page-title text-center">湖北省道路运输安全第三方监测</h1>
      <h1 class="page-title text-center">
        {{ data.reportDate }}
      </h1>
      <h3 class="company text-center">湖北车安达信息科技有限公司</h3>
      <h3 class="date text-center red">{{ data.reportDate2 }}</h3>
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
      <h4>一、第三方监测服务总体情况</h4>
      <p class="textStyle margin-tm text-in">
        &nbsp;&nbsp&nbsp;&nbsp{{ data.baseAlarmInfo.title }}
      </p>
      <!-- 表格1 -->
      <h3 style="margin-bottom: 10px; font-weight: 600 !important">全省车辆总体情况</h3>
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
          <!-- <c:if v-if="data.baseAlarmInfo.busVehicleNumber > 0"> -->
          <tr v-if="data.baseAlarmInfo.busVehicleNumber > 0">
            <td :rowspan="data.baseAlarmInfo.busVehicleNumber" class="weightSize">{{ data.cityReportName }}</td>
            <td>班线客运</td>
            <td>{{ data.baseAlarmInfo.busCompanyNumber }}</td>
            <td>{{ data.baseAlarmInfo.busVehicleNumber }}</td>
            <td>{{ data.baseAlarmInfo.busVehicleRate }}</td>
          </tr>
          <!-- </c:if> -->
          <!-- <c:if v-if="data.baseAlarmInfo.tourVehicleNumber > 0"> -->
          <tr v-if="data.baseAlarmInfo.tourVehicleNumber > 0">
            <td>旅游客运</td>
            <td>{{ data.baseAlarmInfo.tourCompanyNumber }}</td>
            <td>{{ data.baseAlarmInfo.tourVehicleNumber }}</td>
            <td>{{ data.baseAlarmInfo.tourVehicleRate }}</td>
          </tr>
          <!-- </c:if> -->
          <!-- <c:if v-if="data.baseAlarmInfo.dangerVehicleNumber > 0"> -->
          <tr v-if="data.baseAlarmInfo.dangerVehicleNumber > 0">
            <td>危险品运输</td>
            <td>{{ data.baseAlarmInfo.dangerCompanyNumber }}</td>
            <td>{{ data.baseAlarmInfo.dangerVehicleNumber }}</td>
            <td>{{ data.baseAlarmInfo.dangerVehicleRate }}</td>
          </tr>
          <!-- </c:if> -->
          <!-- <c:if v-if="data.baseAlarmInfo.goodsVehicleNumber > 0"> -->
          <tr v-if="data.baseAlarmInfo.goodsVehicleNumber > 0">
            <td>普货（总质量12吨）</td>
            <td>{{ data.baseAlarmInfo.goodsCompanyNumber }}</td>
            <td>{{ data.baseAlarmInfo.goodsVehicleNumber }}</td>
            <td>{{ data.baseAlarmInfo.goodsVehicleRate }}</td>
          </tr>
          <!-- </c:if> -->

          <tr>
            <td>合计</td>
            <td>{{ data.baseAlarmInfo.companyNumber }}</td>
            <td>{{ data.baseAlarmInfo.vehicleNumber }}</td>
            <td>100.00%</td>
          </tr>
        </tbody>
      </table>
      <!-- 1.1 -->
      <div>
        <!-- <c:if
            v-if="vehicleAlarmTypeInfo?.importantvehicleAlarmTypeInfo?.length > 0 || vehicleAlarmTypeInfo?.goodsvehicleAlarmTypeInfo?.length > 0"> -->
        <div
          v-if="vehicleAlarmTypeInfo?.importantvehicleAlarmTypeInfo?.length > 0 || vehicleAlarmTypeInfo?.goodsvehicleAlarmTypeInfo?.length > 0"
          class="info-title">（一）第三方监测平台车辆报警类型分析</div>
        <!-- </c:if> -->
        <div v-if="vehicleAlarmTypeInfo?.importantvehicleAlarmTypeInfo?.length > 0">
          <h3 class="info-h3">{{ vehicleAlarmTypeInfo?.importantTitle }}</h3>
          <table class="img-table">
            <thead>
              <tr>
                <th class="weightSize">类别</th>
                <th class="weightSize">{{ data.lastYearMonth }}</th>
                <th class="weightSize">{{ data.lastMonth }}</th>
                <th class="weightSize">{{ data.thisMonth }}</th>
                <th class="weightSize">同比增长率</th>
                <th class="weightSize">环比增长率</th>
              </tr>
            </thead>
            <tbody>
              <!-- <c:forEach v-for="item in vehicleAlarmTypeInfo?.importantVehicleAlarmTypeInfo" var="item"> -->
              <tr v-for="item in vehicleAlarmTypeInfo?.importantVehicleAlarmTypeInfo">
                <td>{{ item.alarmTypeStr }}</td>
                <td>{{ item.lastYearMonth }}</td>
                <td>{{ item.lastMonth }}</td>
                <td>{{ item.thisMonth }}</td>
                <td>{{ item.yearOnYear }}</td>
                <td>{{ item.chainRatio }}</td>
              </tr>
              <!-- </c:forEach> -->

            </tbody>
          </table>
        </div>
        <div v-if="vehicleAlarmTypeInfo?.goodsvehicleAlarmTypeInfo?.length > 0">
          <h3 class="info-h3">{{ vehicleAlarmTypeInfo?.goodsTitle }}</h3>
          <table class="img-table">
            <thead>
              <tr>
                <th class="weightSize">类别</th>
                <th class="weightSize">{{ data.lastYearMonth }}</th>
                <th class="weightSize">{{ data.lastMonth }}</th>
                <th class="weightSize">{{ data.thisMonth }}</th>
                <th class="weightSize">同比增长率</th>
                <th class="weightSize">环比增长率</th>
              </tr>
            </thead>
            <tbody>
              <!-- <c:forEach v-for="item in vehicleAlarmTypeInfo?.goodsVehicleAlarmTypeInfo" var="item"> -->
              <tr v-for="item in vehicleAlarmTypeInfo?.goodsVehicleAlarmTypeInfo">
                <td>{{ item.alarmTypeStr }}</td>
                <td>{{ item.lastYearMonth }}</td>
                <td>{{ item.lastMonth }}</td>
                <td>{{ item.thisMonth }}</td>
                <td>{{ item.yearOnYear }}</td>
                <td>{{ item.chainRatio }}</td>
              </tr>
              <!-- </c:forEach> -->

            </tbody>
          </table>
        </div>
        <p class="textStyle margin-tm text-in">
          &nbsp;&nbsp&nbsp;&nbsp{{ vehicleAlarmTypeInfo?.importantSummary }}
        </p>
        <p class="textStyle margin-tm text-in">
          &nbsp;&nbsp&nbsp;&nbsp{{ vehicleAlarmTypeInfo?.goodsSummary }}
        </p>
      </div>
      <!-- 1.2 -->
      <div>
        <!-- <c:if -->
        <div
          v-if="vehicleAlarmInfo?.importantVehicleAlarmInfo.length > 0 || vehicleAlarmInfo?.goodsVehicleAlarmInfo.length > 0"
          class="info-title">（二）第三方监测平台车辆报警数据统计</div>
        <!-- </c:if> -->
        <div v-if="vehicleAlarmInfo?.importantVehicleAlarmInfo.length > 0">
          <h3 class="info-h3">{{ vehicleAlarmInfo?.importantTitle }}</h3>
          <table class="img-table">
            <thead>
              <tr>
                <th class="weightSize">排名</th>
                <th class="weightSize">市州</th>
                <th class="weightSize">监测车辆台数</th>
                <th class="weightSize">报警车辆台数</th>
                <th class="weightSize">报警行为次数</th>
                <th class="weightSize">车均报警</th>
              </tr>
            </thead>
            <tbody>
              <!-- <c:forEach v-for="item, index in vehicleAlarmInfo?.importantVehicleAlarmInfo" var="item" varStatus="status"> -->
              <tr v-for="item, index in vehicleAlarmInfo?.importantVehicleAlarmInfo">
                <!-- <c:if test="{{ status.last }}"> -->
                <!-- </c:if> -->
                <td v-if="index === vehicleAlarmInfo?.importantVehicleAlarmInfo.length" colspan="2">{{ item.areaName }}
                </td>
                <!-- <c:if v-if="!(index === vehicleAlarmInfo?.importantVehicleAlarmInfo.length)"> -->
                <td v-if="!(index === vehicleAlarmInfo?.importantVehicleAlarmInfo.length)">{{ item.serialNo }}</td>
                <td v-if="!(index === vehicleAlarmInfo?.importantVehicleAlarmInfo.length)">{{ item.areaName }}</td>
                <!-- </c:if> -->
                <td>{{ item.vehicleNumber }}</td>
                <td>{{ item.vehicleAlarmNumber }}</td>
                <td>{{ item.alarmNumber }}</td>
                <td>{{ item.vehicleAvgAlarmNumber }}</td>
              </tr>
              <!-- </c:forEach> -->

            </tbody>
          </table>
        </div>
        <div v-if="vehicleAlarmInfo?.goodsVehicleAlarmInfo.length > 0">
          <h3 class="info-h3">{{ vehicleAlarmInfo?.goodsTitle }}</h3>
          <table class="img-table">
            <thead>
              <tr>
                <th class="weightSize">排名</th>
                <th class="weightSize">市州</th>
                <th class="weightSize">监测车辆台数</th>
                <th class="weightSize">报警车辆台数</th>
                <th class="weightSize">报警行为次数</th>
                <th class="weightSize">车均报警</th>
              </tr>
            </thead>
            <tbody>
              <!-- <c:forEach v-for="item, index in vehicleAlarmInfo?.goodsVehicleAlarmInfo" var="item" varStatus="status"> -->
              <tr v-for="item, index in vehicleAlarmInfo?.goodsVehicleAlarmInfo">
                <!-- <c:if test="{{ status.last }}"> -->
                <td v-if="(index === vehicleAlarmInfo?.goodsVehicleAlarmInfo.length)" colspan="2">{{ item.areaName }}</td>
                <!-- </c:if> -->
                <!-- <c:if v-if="!(index === vehicleAlarmInfo?.goodsVehicleAlarmInfo.length)"> -->
                <td v-if="!(index === vehicleAlarmInfo?.goodsVehicleAlarmInfo.length)">{{ item.serialNo }}</td>
                <td v-if="!(index === vehicleAlarmInfo?.goodsVehicleAlarmInfo.length)">{{ item.areaName }}</td>
                <!-- </c:if> -->
                <td>{{ item.vehicleNumber }}</td>
                <td>{{ item.vehicleAlarmNumber }}</td>
                <td>{{ item.alarmNumber }}</td>
                <td>{{ item.vehicleAvgAlarmNumber }}</td>
              </tr>
              <!-- </c:forEach> -->

            </tbody>
          </table>
        </div>
      </div>
      <!-- 1.3 -->
      <div>
        <!-- <c:if -->
        <div
          v-if="vehicleAlarmCountInfo?.importantVehicleAlarmCountInfo.length > 0 || vehicleAlarmCountInfo?.goodsVehicleAlarmCountInfo.length > 0"
          class="info-title">（三）第三方监测平台车辆报警次数分析</div>
        <!-- </c:if> -->
        <div v-if="vehicleAlarmCountInfo?.importantVehicleAlarmCountInfo.length > 0">
          <h3 class="info-h3">{{ vehicleAlarmCountInfo?.importantTitle }}</h3>
          <table class="img-table">
            <thead>
              <tr>
                <th class="weightSize">市州</th>
                <th class="weightSize">{{ data.lastYearMonth }}</th>
                <th class="weightSize">{{ data.lastMonth }}</th>
                <th class="weightSize">{{ data.thisMonth }}</th>
                <th class="weightSize">同比增长率</th>
                <th class="weightSize">环比增长率</th>
              </tr>
            </thead>
            <tbody>
              <!-- <c:forEach v-for="item in vehicleAlarmCountInfo?.importantVehicleAlarmCountInfo" var="item"
                varStatus="status"> -->
              <tr v-for="item in vehicleAlarmCountInfo?.importantVehicleAlarmCountInfo">
                <td>{{ item.alarmName }}</td>
                <td>{{ item.lastYearMonth }}</td>
                <td>{{ item.lastMonth }}</td>
                <td>{{ item.thisMonth }}</td>
                <td>{{ item.yearOnYear }}</td>
                <td>{{ item.chainRatio }}</td>
              </tr>
              <!-- </c:forEach> -->

            </tbody>
          </table>
        </div>
        <div v-if="vehicleAlarmCountInfo?.goodsVehicleAlarmCountInfo.length > 0">
          <h3 class="info-h3">{{ vehicleAlarmCountInfo?.goodsTitle }}</h3>
          <table class="img-table">
            <thead>
              <tr>
                <th class="weightSize">市州</th>
                <th class="weightSize">{{ data.lastYearMonth }}</th>
                <th class="weightSize">{{ data.lastMonth }}</th>
                <th class="weightSize">{{ data.thisMonth }}</th>
                <th class="weightSize">同比增长率</th>
                <th class="weightSize">环比增长率</th>
              </tr>
            </thead>
            <tbody>
              <!-- <c:forEach v-for="item in vehicleAlarmCountInfo?.goodsVehicleAlarmCountInfo" var="item" varStatus="status"> -->
              <tr v-for="item in vehicleAlarmCountInfo?.goodsVehicleAlarmCountInfo">
                <td>{{ item.alarmName }}</td>
                <td>{{ item.lastYearMonth }}</td>
                <td>{{ item.lastMonth }}</td>
                <td>{{ item.thisMonth }}</td>
                <td>{{ item.yearOnYear }}</td>
                <td>{{ item.chainRatio }}</td>
              </tr>
              <!-- </c:forEach> -->

            </tbody>
          </table>
        </div>
        <p class="textStyle margin-tm text-in">
          &nbsp;&nbsp&nbsp;&nbsp{{ vehicleAlarmCountInfo?.totalSummary }}
        </p>
      </div>
      <!-- 1.4 -->
      <div>
        <!-- <c:if
                  v-if="vehicleAvgAlarmInfo?.importantVehicleAvgAlarmInfo.length > 0 || vehicleAvgAlarmInfo?.goodsVehicleAvgAlarmInfo.length > 0"> -->
        <div
          v-if="vehicleAvgAlarmInfo?.importantVehicleAvgAlarmInfo.length > 0 || vehicleAvgAlarmInfo?.goodsVehicleAvgAlarmInfo.length > 0"
          class="info-title">（四）第三方监测平台车辆车均报警分析</div>
        <!-- </c:if> -->
        <div v-if="vehicleAvgAlarmInfo?.importantVehicleAvgAlarmInfo.length > 0">
          <h3 class="info-h3">{{ vehicleAvgAlarmInfo?.importantTitle }}</h3>
          <table class="img-table">
            <thead>
              <tr>
                <th class="weightSize">市州</th>
                <th class="weightSize">{{ data.lastYearMonth }}</th>
                <th class="weightSize">{{ data.lastMonth }}</th>
                <th class="weightSize">{{ data.thisMonth }}</th>
                <th class="weightSize">同比增长率</th>
                <th class="weightSize">环比增长率</th>
              </tr>
            </thead>
            <tbody>
              <!-- <c:forEach v-for="item in vehicleAvgAlarmInfo?.importantVehicleAvgAlarmInfo" var="item" varStatus="status"> -->
              <tr v-for="item in vehicleAvgAlarmInfo?.importantVehicleAvgAlarmInfo">
                <td>{{ item.alarmName }}</td>
                <td>{{ item.lastYearMonth }}</td>
                <td>{{ item.lastMonth }}</td>
                <td>{{ item.thisMonth }}</td>
                <td>{{ item.yearOnYear }}</td>
                <td>{{ item.chainRatio }}</td>
              </tr>
              <!-- </c:forEach> -->

            </tbody>
          </table>
        </div>
        <div v-if="vehicleAvgAlarmInfo?.goodsVehicleAvgAlarmInfo.length > 0">
          <h3 class="info-h3">{{ vehicleAvgAlarmInfo?.goodsTitle }}</h3>
          <table class="img-table">
            <thead>
              <tr>
                <th class="weightSize">市州</th>
                <th class="weightSize">{{ data.lastYearMonth }}</th>
                <th class="weightSize">{{ data.lastMonth }}</th>
                <th class="weightSize">{{ data.thisMonth }}</th>
                <th class="weightSize">同比增长率</th>
                <th class="weightSize">环比增长率</th>
              </tr>
            </thead>
            <tbody>
              <!-- <c:forEach v-for="item in vehicleAvgAlarmInfo?.goodsVehicleAvgAlarmInfo" var="item" varStatus="status"> -->
              <tr v-for="item in vehicleAvgAlarmInfo?.goodsVehicleAvgAlarmInfo">
                <td>{{ item.alarmName }}</td>
                <td>{{ item.lastYearMonth }}</td>
                <td>{{ item.lastMonth }}</td>
                <td>{{ item.thisMonth }}</td>
                <td>{{ item.yearOnYear }}</td>
                <td>{{ item.chainRatio }}</td>
              </tr>
              <!-- </c:forEach> -->

            </tbody>
          </table>
        </div>
        <p class="textStyle margin-tm text-in">
          &nbsp;&nbsp&nbsp;&nbsp{{ vehicleAvgAlarmInfo?.totalSummary }}
        </p>
      </div>
    </div>
    <div class="fullpage">
      <h4>二、第三方监测数据分析</h4>
      <!-- 2.1 -->
      <div>
        <!-- <c:if
            v-if="companyAlarmInfo?.importantCompanyAlarmInfo.length > 0 || companyAlarmInfo.goodsVehicleAvgAlarmInfo.length > 0"> -->
        <div
          v-if="companyAlarmInfo?.importantCompanyAlarmInfo.length > 0 || companyAlarmInfo?.goodsVehicleAvgAlarmInfo.length > 0"
          class="info-title">（一）企业监测报警均值排名</div>
        <!-- </c:if> -->
        <div v-if="companyAlarmInfo?.importantCompanyAlarmInfo.length > 0">
          <h3 class="info-h3">{{ companyAlarmInfo?.importantTitle }}</h3>
          <table class="img-table">
            <thead>
              <tr>
                <th class="weightSize">排名</th>
                <th class="weightSize">市州</th>
                <th class="weightSize">企业名称</th>
                <th class="weightSize">报警车辆台数</th>
                <th class="weightSize">报警行为次数</th>
                <th class="weightSize">报警均值</th>
              </tr>
            </thead>
            <tbody>
              <!-- <c:forEach v-for="item in companyAlarmInfo?.importantCompanyAlarmInfo" var="item" varStatus="status"> -->
              <tr v-for="item in companyAlarmInfo?.importantCompanyAlarmInfo">
                <td>{{ item.serialNo }}</td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.companyName }}</td>
                <td>{{ item.alarmVehicleNumber }}</td>
                <td>{{ item.alarmNumber }}</td>
                <td>{{ item.avgNumber }}</td>
              </tr>
              <!-- </c:forEach> -->

            </tbody>
          </table>
        </div>
        <div v-if="companyAlarmInfo?.goodsCompanyAlarmInfo.length > 0">
          <h3 class="info-h3">{{ companyAlarmInfo?.goodsTitle }}</h3>
          <table class="img-table">
            <thead>
              <tr>
                <th class="weightSize">排名</th>
                <th class="weightSize">市州</th>
                <th class="weightSize">企业名称</th>
                <th class="weightSize">报警车辆台数</th>
                <th class="weightSize">报警行为次数</th>
                <th class="weightSize">报警均值</th>
              </tr>
            </thead>
            <tbody>
              <!-- <c:forEach v-for="item in companyAlarmInfo.goodsCompanyAlarmInfo" var="item" varStatus="status"> -->
              <tr v-for="item in companyAlarmInfo?.goodsCompanyAlarmInfo">
                <td>{{ item.serialNo }}</td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.companyName }}</td>
                <td>{{ item.alarmVehicleNumber }}</td>
                <td>{{ item.alarmNumber }}</td>
                <td>{{ item.avgNumber }}</td>
              </tr>
              <!-- </c:forEach> -->

            </tbody>
          </table>
        </div>
      </div>
      <!-- 2.2 -->
      <div>
        <!-- <c:if
              v-if="vehicleAlarmDetailInfo.importantVehicleAlarmInfo.length > 0 || vehicleAlarmDetailInfo.goodsVehicleAlarmInfo.length > 0"> -->
        <div
          v-if="vehicleAlarmDetailInfo?.importantVehicleAlarmInfo.length > 0 || vehicleAlarmDetailInfo?.goodsVehicleAlarmInfo.length > 0"
          class="info-title">（二）车辆监测报警次数排名</div>
        <!-- </c:if> -->
        <div v-if="vehicleAlarmDetailInfo?.importantVehicleAlarmInfo.length > 0">
          <h3 class="info-h3">{{ vehicleAlarmDetailInfo?.importantTitle }}</h3>
          <table class="img-table">
            <thead>
              <tr>
                <th class="weightSize">排名</th>
                <th class="weightSize">市州</th>
                <th class="weightSize">企业名称</th>
                <th class="weightSize">车牌号</th>
                <th class="weightSize">报警行为次数</th>

              </tr>
            </thead>
            <tbody>
              <!-- <c:forEach v-for="item in vehicleAlarmDetailInfo.importantVehicleAlarmInfo" var="item" varStatus="status"> -->
              <tr v-for="item in vehicleAlarmDetailInfo?.importantVehicleAlarmInfo">
                <td>{{ item.serialNo }}</td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.companyName }}</td>
                <td>{{ item.plateNum }}</td>
                <td>{{ item.alarmNumber }}</td>
              </tr>
              <!-- </c:forEach> -->

            </tbody>
          </table>
        </div>
        <div v-if="vehicleAlarmDetailInfo?.goodsVehicleAlarmInfo.length > 0">
          <h3 class="info-h3">{{ vehicleAlarmDetailInfo?.goodsTitle }}</h3>
          <table class="img-table">
            <thead>
              <tr>
                <th class="weightSize">排名</th>
                <th class="weightSize">市州</th>
                <th class="weightSize">企业名称</th>
                <th class="weightSize">车牌号</th>
                <th class="weightSize">报警行为次数</th>
              </tr>
            </thead>
            <tbody>
              <!-- <c:forEach v-for="item in vehicleAlarmDetailInfo.goodsVehicleAlarmInfo" var="item" varStatus="status"> -->
              <tr v-for="item in vehicleAlarmDetailInfo?.goodsVehicleAlarmInfo">
                <td>{{ item.serialNo }}</td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.companyName }}</td>
                <td>{{ item.plateNum }}</td>
                <td>{{ item.alarmNumber }}</td>
              </tr>
              <!-- </c:forEach> -->

            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
const { title, data } = defineProps({
  title: { type: String, default: () => '' },
  data: { type: Object, default: () => [] },
  download: { type: Function, defualt: () => { } }
})
const proxy: any = getCurrentInstance()?.proxy
const { briefReportDto, vehicleAlarmTypeInfo, vehicleAlarmCountInfo, vehicleAvgAlarmInfo, companyAlarmInfo, vehicleAlarmDetailInfo, vehicleAlarmInfo } = data
</script>

<style scoped lang="scss">
@import url(./briefReport.css);
</style>
