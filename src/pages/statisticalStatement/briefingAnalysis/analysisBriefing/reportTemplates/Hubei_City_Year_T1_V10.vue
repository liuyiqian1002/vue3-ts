<template>
  <div>
    <!-- 封面页 -->
    <input type="hidden" id="year" :value="data.summaryReportStatisticalYear">
    <div class="fixed">{{ data.summaryReportStatisticalYear }}{{ data.summaryCityName }}年度简报
      <a href="javascript:" id="downloadDoc">下载word</a>
    </div>

    <div class="fullpage margin-t">
      <div class="t-center">
        <img src="/src/assets/images/cheanda/birefreport.png" alt="">
      </div>
      <h1 class="margin-tm">湖北省道路运输安全第三方监测</h1>
      <h1>{{ data.summaryReportStatisticalYear }}度简报</h1>
      <h1 style="margin: 60px 0px;">({{ data.summaryCityName }})</h1>
      <h3 class="margin-t">湖北车安达信息科技有限公司</h3>
      <h3 style="margin: 30px 0px;">{{ data.summaryReportGenerateDate }}</h3>
    </div>
    <!-- 目录页 -->
    <div class="fullpage">
      <h1>目录</h1>
      <ul>
        <li class="sub-menu" style="font-size: 20px">
          <span>一、总体情况..................</span>
          <span class="pageNumber">1</span>
        </li>
        <li class="sub-menu" style="font-size: 20px">
          <span>二、营运车辆违规报警情况.........</span>
          <span class="pageNumber">2</span>
        </li>
        <li class="sub-menu pad-left50" style="font-size: 20px">
          <span>2.1超速、疲劳驾驶、凌晨2-5点禁行三类报警情况</span>
          <span class="pageNumber">2</span>
        </li>
        <li class="sub-menu pad-left100" style="font-size: 20px">
          <span>2.1.1班线客运车辆超速、疲劳驾驶、凌晨2-5点禁行报警情况</span>
          <span class="pageNumber">2</span>
        </li>
        <li class="sub-menu pad-left100" style="font-size: 20px">
          <span>2.1.2旅游客运车辆超速、疲劳驾驶、凌晨2-5点禁行报警情况</span>
          <span class="pageNumber">5</span>
        </li>
        <c:set var="dangerVehicleAlarmInfo"
          value="${vehicleAlarmRatio.dangerVehicleAlarmInfo.totalAlarmVehicleNumber == '0'}" />
        <c:if test="${!dangerVehicleAlarmInfo}">
          <li class="sub-menu pad-left100" style="font-size: 20px">
            <span>2.1.3危险品运输车辆超速、疲劳驾驶报警情况</span>
            <span class="pageNumber">5</span>
          </li>
        </c:if>
        <c:set var="goodsVehicleAlarmInfo" value="${vehicleAlarmRatio.goodsVehicleAlarmInfo.totalAlarmNumber == '0'}" />
        <c:if test="${!goodsVehicleAlarmInfo}">
          <c:if test="${!goodsVehicleAlarmInfo && !dangerVehicleAlarmInfo}">
            <li class="sub-menu pad-left100" style="font-size: 20px">
              <span>2.1.4普通货物运输车辆超速、疲劳驾驶报警情况</span>
              <span class="pageNumber">6</span>
            </li>
          </c:if>
          <c:if test="${!goodsVehicleAlarmInfo && dangerVehicleAlarmInfo}">
            <li class="sub-menu pad-left100" style="font-size: 20px">
              <span>2.1.3普通货物运输车辆超速、疲劳驾驶报警情况</span>
              <span class="pageNumber">6</span>
            </li>
          </c:if>
        </c:if>
        <li class="sub-menu pad-left50" style="font-size: 20px">
          <span>2.2营运车辆违规报警趋势分析</span>
          <span class="pageNumber">10</span>
        </li>
        <li class="sub-menu pad-left50" style="font-size: 20px">
          <span>2.3营运车辆违规报警排名情况</span>
          <span class="pageNumber">10</span>
        </li>
        <li class="sub-menu pad-left100" style="font-size: 20px">
          <span>2.3.1区所报警排名情况</span>
          <span class="pageNumber">10</span>
        </li>
        <li class="sub-menu pad-left100" style="font-size: 20px">
          <span>2.3.2企业报警排名情况</span>
          <span class="pageNumber">13</span>
        </li>
        <li class="sub-menu pad-left100" style="font-size: 20px">
          <span>2.3.3营运车辆违规报警排名情况</span>
          <span class="pageNumber">17</span>
        </li>

        <li class="sub-menu" style="font-size: 20px">
          <span>三、营运车辆报警处警情况...........</span>
          <span class="pageNumber">21</span>
        </li>
        <c:if test="{{ intelligentEquipmentInfo.hasMomenta }}">
          <li class="sub-menu" style="font-size: 20px">
            <span>四、智能设备试点使用情况...........</span>
            <span class="pageNumber">23</span>
          </li>
        </c:if>
      </ul>
    </div>

    <!-- 一、总体情况 -->
    <div class="fullpage" id="text1">
      <h4>一、总体情况</h4>
      <p class="textStyle margin-tm text-in">
        {{ data.vehicleTypeNumberInfo }}
      </p>
      <div class="echartWrapper margin-tm h400" id="chartContainer1"></div>
      <div class="echartWrapper margin-tm h400" id="chartContainer2"></div>
      <div class="echartWrapper margin-tm h400" id="chartContainer3"></div>
      <div class="echartWrapper margin-tm h400" id="chartContainer4"></div>
      <div class="tableWrapper">
        <h3>重点营运车辆分布情况</h3>
        <table class="img-table img-table-other" border="1">
          <tr>
            <th style="width: 85px; line-height: normal"></th>
            <!-- <c:forEach items="{{ data.baseAlarmInfo.importantVehicleTypeInfoList }}" var="li"> -->
            <th v-for="li in importantVehicleTypeInfoList">{{ li.cityName }}</th>
            <!-- </c:forEach> -->
          </tr>
          <!-- <c:if test="${data.baseAlarmInfo.busVehicleNumber>0}"> -->
          <tr v-if="baseAlarmInfo.busVehicleNumber > 0">
            <td>班线客运</td>
            <!-- <c:forEach items="{{ data.baseAlarmInfo.importantVehicleTypeInfoList }}" var="li"> -->
            <td v-for="li in importantVehicleTypeInfoList">{{ li.busVehicleNumber }}</td>
            <!-- </c:forEach> -->
          </tr>
          <!-- </c:if> -->

          <!-- <c:if test="${data.baseAlarmInfo.tourVehicleNumber>0}"> -->
          <tr v-if="baseAlarmInfo.tourVehicleNumber > 0">
            <td>旅游客运</td>
            <!-- <c:forEach items="{{ data.baseAlarmInfo.importantVehicleTypeInfoList }}" var="li"> -->
            <td v-for="li in importantVehicleTypeInfoList">{{ li.tourVehicleNumber }}</td>
            <!-- </c:forEach> -->
          </tr>
          <!-- </c:if> -->

          <!-- <c:if test="${data.baseAlarmInfo.dangerVehicleNumber>0}"> -->
          <tr v-if="baseAlarmInfo.dangerVehicleNumber > 0">
            <td>危运</td>
            <!-- <c:forEach items="{{ data.baseAlarmInfo.importantVehicleTypeInfoList }}" var="li"> -->
            <td v-for="li in importantVehicleTypeInfoList">{{ li.dangerVehicleNumber }}</td>
            <!-- </c:forEach> -->
          </tr>
          <!-- </c:if> -->

        </table>
      </div>
    </div>
    <!-- 二、营运车辆违规报警情况 -->
    <div class="fullpage" id="text2">
      <h4>二、营运车辆违规报警情况</h4>
      <!-- <%--2.1--%> -->
      <div>
        <h4>2.1超速、疲劳驾驶、凌晨2-5点禁行三类报警情况</h4>
        <div>
          <p class="textStyle margin-tm text-in">
            {{ vehicleAlarmInfo.alarmNumberInfo }}
          </p>
          <div class="echartWrapper margin-tm h400" id="chartContainer5"></div>
          <div class="echartWrapper margin-tm h400" id="chartContainer6"></div>
          <div class="tableWrapperList">
            <!-- <c:set var="speedingVehicleAlarmNumber" value="${vehicleAlarmRatio.busSpeedingVehicleAlarmNumber == '0'
                           && vehicleAlarmRatio.tourSpeedingVehicleAlarmNumber == '0'
                           && vehicleAlarmRatio.dangerSpeedingVehicleAlarmNumber == '0'}" />
            <c:set var="tiredVehicleAlarmNumber" value="${vehicleAlarmRatio.busTiredVehicleAlarmNumber == '0'
                           && vehicleAlarmRatio.tourTiredVehicleAlarmNumber == '0'
                           && vehicleAlarmRatio.dangerTiredVehicleAlarmNumber == '0'}" />
            <c:set var="t25VehicleAlarmNumber" value="${vehicleAlarmRatio.busT25VehicleAlarmNumber == '0'
                           && vehicleAlarmRatio.tourT25VehicleAlarmNumber == '0'
                           && vehicleAlarmRatio.dangerT25VehicleAlarmNumber == '0'}" /> -->

            <table class="img-table" border="1">
              <tr>
                <td></td>
                <!-- <c:if test="${!speedingVehicleAlarmNumber}"> -->
                <td v-if="!speedingVehicleAlarmNumber">超速报警</td>
                <!-- </c:if> -->
                <!-- <c:if test="${!tiredVehicleAlarmNumber}"> -->
                <td v-if="!tiredVehicleAlarmNumber">疲劳驾驶</td>
                <!-- </c:if> -->
                <!-- <c:if test="${!t25VehicleAlarmNumber}"> -->
                <td v-if="!t25VehicleAlarmNumber">凌晨2-5点禁驾</td>
                <!-- </c:if> -->
                <td>合计</td>
              </tr>
              <!-- <c:if v-if="vehicleAlarmRatio.busTotalVehicleAlarmNumber > '0'" > -->
              <tr v-if="vehicleAlarmRatio.busTotalVehicleAlarmNumber > '0'">
                <td>班线客运</td>
                <!-- <c:if test="${!speedingVehicleAlarmNumber}"> -->
                <td v-if="!speedingVehicleAlarmNumber">{{ vehicleAlarmRatio.busSpeedingVehicleAlarmNumber }}</td>
                <!-- </c:if> -->
                <!-- <c:if test="${!tiredVehicleAlarmNumber}"> -->
                <td v-if="!tiredVehicleAlarmNumber">{{ vehicleAlarmRatio.busTiredVehicleAlarmNumber }}</td>
                <!-- </c:if> -->
                <!-- <c:if test="${!t25VehicleAlarmNumber}"> -->
                <td v-if="!t25VehicleAlarmNumber">{{ vehicleAlarmRatio.busT25VehicleAlarmNumber }}</td>
                <!-- </c:if> -->
                <td>{{ vehicleAlarmRatio.busTotalVehicleAlarmNumber }}</td>
              </tr>
              <!-- </c:if> -->
              <!-- <c:if v-if="vehicleAlarmRatio.tourTotalVehicleAlarmNumber > '0'" > -->
              <tr v-if="vehicleAlarmRatio.tourTotalVehicleAlarmNumber > '0'">
                <td>旅游客运</td>
                <!-- <c:if test="${!speedingVehicleAlarmNumber}"> -->
                <td v-if="!speedingVehicleAlarmNumber">{{ vehicleAlarmRatio.tourSpeedingVehicleAlarmNumber }}</td>
                <!-- </c:if> -->
                <!-- <c:if test="${!tiredVehicleAlarmNumber}"> -->
                <td v-if="!tiredVehicleAlarmNumber">{{ vehicleAlarmRatio.tourTiredVehicleAlarmNumber }}</td>
                <!-- </c:if> -->
                <!-- <c:if test="${!t25VehicleAlarmNumber}"> -->
                <td v-if="!t25VehicleAlarmNumber">{{ vehicleAlarmRatio.tourT25VehicleAlarmNumber }}</td>
                <!-- </c:if> -->
                <td>{{ vehicleAlarmRatio.tourTotalVehicleAlarmNumber }}</td>
              </tr>
              <!-- </c:if> -->
              <!-- <c:if v-if="vehicleAlarmRatio.dangerTotalVehicleAlarmNumber > '0'"> -->
              <tr v-if="vehicleAlarmRatio.dangerTotalVehicleAlarmNumber > '0'">
                <td>危运 </td>
                <!-- < c: if test =" ${!speedingVehicleAlarmNumber}"> --> 
                <td v-if="!speedingVehicleAlarmNumber">{{ vehicleAlarmRatio.dangerSpeedingVehicleAlarmNumber }}</td>
                <!-- </c:if> -->
                <!-- <c:if test="${!tiredVehicleAlarmNumber}"> -->
                <td v-if="!tiredVehicleAlarmNumber">{{ vehicleAlarmRatio.dangerTiredVehicleAlarmNumber }}</td>
                <!-- </c:if> -->
                <!-- <c:if test="${!t25VehicleAlarmNumber}"> -->
                <td v-if="!t25VehicleAlarmNumber">{{ vehicleAlarmRatio.dangerT25VehicleAlarmNumber }}</td>
                <!-- </c:if> -->
                <td>{{ vehicleAlarmRatio.dangerTotalVehicleAlarmNumber }}</td>
              </tr>
              <!-- </c:if> -->
            </table>
          </div>
          <div class="echartWrapper margin-tm h400" id="chartContainer7"></div>
        </div>
      </div>
      <!-- <%--2.1.1--%> -->
      <div>
        <h4>2.1.1班线客运车辆超速、疲劳驾驶、凌晨2-5点禁行报警情况</h4>
        <div>
          <h4 style="text-align: center;padding: 20px">班线客运车辆违规报警情况统计</h4>
          <div class="tableWrapperList">
            <table class="img-table" border="1">
              <tr style="font-weight: bold">
                <td>报警类型</td>
                <td>报警台数</td>
                <td>报警次数</td>
              </tr>
              <!-- <c:if v-if="vehicleAlarmRatio.busVehicleAlarmInfo.speedingAlarmNumber > '0'" > -->
              <tr v-if="vehicleAlarmRatio.busVehicleAlarmInfo.speedingAlarmNumber > '0'">
                <td>超速报警</td>
                <td>{{ vehicleAlarmRatio.busVehicleAlarmInfo.speedingAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmRatio.busVehicleAlarmInfo.speedingAlarmNumber }}</td>
              </tr>
              <!-- </c:if> -->
              <!-- <c:if v-if="vehicleAlarmRatio.busVehicleAlarmInfo.tiredAlarmNumber > '0'" > -->
              <tr v-if="vehicleAlarmRatio.busVehicleAlarmInfo.tiredAlarmNumber > '0'">
                <td>疲劳驾驶报警</td>
                <td>{{ vehicleAlarmRatio.busVehicleAlarmInfo.tiredAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmRatio.busVehicleAlarmInfo.tiredAlarmNumber }}</td>
              </tr>
              <!-- </c:if> -->
              <!-- <c:if v-if="vehicleAlarmRatio.busVehicleAlarmInfo.t25AlarmNumber > '0'" > -->
              <tr v-if="vehicleAlarmRatio.busVehicleAlarmInfo.t25AlarmNumber > '0'">
                <td>凌晨2-5点禁行报警</td>
                <td>{{ vehicleAlarmRatio.busVehicleAlarmInfo.t25AlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmRatio.busVehicleAlarmInfo.t25AlarmNumber }}</td>
              </tr>
              <!-- </c:if> -->
              <tr style="font-weight: bold">
                <td>合计</td>
                <td>{{ vehicleAlarmRatio.busVehicleAlarmInfo.totalAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmRatio.busVehicleAlarmInfo.totalAlarmNumber }}</td>
              </tr>
            </table>
          </div>
          <div class="echartWrapper margin-tm h400" id="chartContainer8"></div>
        </div>
      </div>
      <!-- <%--2.1.2--%> -->
      <div>
        <h4>2.1.2旅游客运车辆超速、疲劳驾驶、凌晨2-5点禁行报警情况</h4>
        <div>
          <h4 style="text-align: center;padding: 20px">旅游客运车辆违规报警情况统计</h4>
          <div class="tableWrapperList">
            <table class="img-table" border="1">
              <tr style="font-weight: bold">
                <td>报警类型</td>
                <td>报警台数</td>
                <td>报警次数</td>
              </tr>
              <!-- <c:if v-if="vehicleAlarmRatio.tourVehicleAlarmInfo.speedingAlarmNumber > '0'"> -->
              <tr v-if="vehicleAlarmRatio.tourVehicleAlarmInfo.speedingAlarmNumber > '0'">
                <td>超速报警</td>
                <td>{{ vehicleAlarmRatio.tourVehicleAlarmInfo.speedingAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmRatio.tourVehicleAlarmInfo.speedingAlarmNumber }}</td>
              </tr>
              <!-- </c:if> -->
              <!-- <c:if v-if="vehicleAlarmRatio.tourVehicleAlarmInfo.tiredAlarmNumber > '0'"> -->
              <tr v-if="vehicleAlarmRatio.tourVehicleAlarmInfo.tiredAlarmNumber > '0'">
                <td>疲劳驾驶报警</td>
                <td>{{ vehicleAlarmRatio.tourVehicleAlarmInfo.tiredAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmRatio.tourVehicleAlarmInfo.tiredAlarmNumber }}</td>
              </tr>
              <!-- </c:if> -->
              <!-- <c:if v-if="vehicleAlarmRatio.tourVehicleAlarmInfo.t25AlarmNumber > '0'"> -->
              <tr v-if="vehicleAlarmRatio.tourVehicleAlarmInfo.t25AlarmNumber > '0'">
                <td>凌晨2-5点禁行报警</td>
                <td>{{ vehicleAlarmRatio.tourVehicleAlarmInfo.t25AlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmRatio.tourVehicleAlarmInfo.t25AlarmNumber }}</td>
              </tr>
              <!-- </c:if> -->
              <tr style="font-weight: bold">
                <td>合计</td>
                <td>{{ vehicleAlarmRatio.tourVehicleAlarmInfo.totalAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmRatio.tourVehicleAlarmInfo.totalAlarmNumber }}</td>
              </tr>
            </table>
          </div>
          <div class="echartWrapper margin-tm h400" id="chartContainer9"></div>
        </div>
        <!-- <%--2.1.3--%> -->
        <div v-if="!(vehicleAlarmRatio.dangerVehicleAlarmInfo.totalAlarmVehicleNumber == '0')">
          <!-- <c:set var="dangerVehicleAlarmInfo"
            value="${vehicleAlarmRatio.dangerVehicleAlarmInfo.totalAlarmVehicleNumber == '0'}" /> -->
          <!-- <c:if test="${!dangerVehicleAlarmInfo}"> -->
          <h4>2.1.3危险品运输车辆超速、疲劳驾驶报警情况</h4>
          <div>
            <div class="echartWrapper margin-tm h400" id="chartContainer10"></div>
            <h4 style="text-align: center;padding: 20px">危险品运输车辆违规报警情况统计</h4>
            <div class="tableWrapperList">
              <table class="img-table" border="1">
                <tr style="font-weight: bold">
                  <td>报警类型</td>
                  <td>报警台数</td>
                  <td>报警次数</td>
                </tr>
                <!-- <c:if v-if="vehicleAlarmRatio.dangerVehicleAlarmInfo.speedingAlarmNumber > '0'" > -->
                <tr v-if="vehicleAlarmRatio.dangerVehicleAlarmInfo.speedingAlarmNumber > '0'">
                  <td>超速报警</td>
                  <td>{{ vehicleAlarmRatio.dangerVehicleAlarmInfo.speedingAlarmVehicleNumber }}</td>
                  <td>{{ vehicleAlarmRatio.dangerVehicleAlarmInfo.speedingAlarmNumber }}</td>
                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="vehicleAlarmRatio.dangerVehicleAlarmInfo.tiredAlarmNumber > '0'" > -->
                <tr v-if="vehicleAlarmRatio.dangerVehicleAlarmInfo.tiredAlarmNumber > '0'">
                  <td>疲劳驾驶报警</td>
                  <td>{{ vehicleAlarmRatio.dangerVehicleAlarmInfo.tiredAlarmVehicleNumber }}</td>
                  <td>{{ vehicleAlarmRatio.dangerVehicleAlarmInfo.tiredAlarmNumber }}</td>
                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="vehicleAlarmRatio.dangerVehicleAlarmInfo.t25AlarmNumber > '0'" > -->
                <tr v-if="vehicleAlarmRatio.dangerVehicleAlarmInfo.t25AlarmNumber > '0'">
                  <td>凌晨2-5点禁行报警</td>
                  <td>{{ vehicleAlarmRatio.dangerVehicleAlarmInfo.t25AlarmVehicleNumber }}</td>
                  <td>{{ vehicleAlarmRatio.dangerVehicleAlarmInfo.t25AlarmNumber }}</td>
                </tr>
                <!-- </c:if> -->
                <tr style="font-weight: bold">
                  <td>合计</td>
                  <td>{{ vehicleAlarmRatio.dangerVehicleAlarmInfo.totalAlarmVehicleNumber }}</td>
                  <td>{{ vehicleAlarmRatio.dangerVehicleAlarmInfo.totalAlarmNumber }}</td>
                </tr>
              </table>
            </div>
          </div>
          <!-- </c:if> -->
        </div>
        <!-- <%--2.1.3--%> -->
        <div>
          <!-- <c:set var="goodsVehicleAlarmInfo" value="${vehicleAlarmRatio.goodsVehicleAlarmInfo.totalAlarmNumber == '0'}" /> -->
          <!-- <c:if test="${!goodsVehicleAlarmInfo}"> -->
          <!-- <c:if test="${!goodsVehicleAlarmInfo && !dangerVehicleAlarmInfo}"> -->
          <h4
            v-if="!(vehicleAlarmRatio.goodsVehicleAlarmInfo.totalAlarmNumber == '0') && !(vehicleAlarmRatio.dangerVehicleAlarmInfo.totalAlarmVehicleNumber == '0')"
            style="padding-top: 20px">2.1.4普通货物运输车辆超速、疲劳驾驶报警情况</h4>
          <!-- </c:if> -->
          <!-- <c:if test="${!goodsVehicleAlarmInfo && dangerVehicleAlarmInfo}"> -->
          <h4 v-else style="padding-top: 20px">2.1.3普通货物运输车辆超速、疲劳驾驶报警情况</h4>
          <!-- </c:if> -->
          <div v-if="!(vehicleAlarmRatio.goodsVehicleAlarmInfo.totalAlarmNumber == '0')">
            <div class="echartWrapper margin-tm h400" id="chartContainer11"></div>
            <h4 style="text-align: center;padding: 20px">普通货物运输车辆违规报警情况统计</h4>
            <div class="tableWrapperList">
              <table class="img-table" border="1">
                <tr style="font-weight: bold">
                  <td>报警类型</td>
                  <td>报警台数</td>
                  <td>报警次数</td>
                </tr>
                <!-- <c:if v-if="vehicleAlarmRatio.goodsVehicleAlarmInfo.speedingAlarmNumber > '0'" > -->
                <tr v-if="vehicleAlarmRatio.goodsVehicleAlarmInfo.speedingAlarmNumber > '0'">
                  <td>超速报警</td>
                  <td>{{ vehicleAlarmRatio.goodsVehicleAlarmInfo.speedingAlarmVehicleNumber }}</td>
                  <td>{{ vehicleAlarmRatio.goodsVehicleAlarmInfo.speedingAlarmNumber }}</td>
                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="vehicleAlarmRatio.goodsVehicleAlarmInfo.tiredAlarmNumber > '0'" > -->
                <tr v-if="vehicleAlarmRatio.goodsVehicleAlarmInfo.tiredAlarmNumber > '0'">
                  <td>疲劳驾驶报警</td>
                  <td>{{ vehicleAlarmRatio.goodsVehicleAlarmInfo.tiredAlarmVehicleNumber }}</td>
                  <td>{{ vehicleAlarmRatio.goodsVehicleAlarmInfo.tiredAlarmNumber }}</td>
                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="vehicleAlarmRatio.goodsVehicleAlarmInfo.t25AlarmNumber > '0'" > -->
                <tr v-if="vehicleAlarmRatio.goodsVehicleAlarmInfo.t25AlarmNumber > '0'">
                  <td>凌晨2-5点禁行报警</td>
                  <td>{{ vehicleAlarmRatio.goodsVehicleAlarmInfo.t25AlarmVehicleNumber }}</td>
                  <td>{{ vehicleAlarmRatio.goodsVehicleAlarmInfo.t25AlarmNumber }}</td>
                </tr>
                <!-- </c:if> -->
                <tr style="font-weight: bold">
                  <td>合计</td>
                  <td>{{ vehicleAlarmRatio.goodsVehicleAlarmInfo.totalAlarmVehicleNumber }}</td>
                  <td>{{ vehicleAlarmRatio.goodsVehicleAlarmInfo.totalAlarmNumber }}</td>
                </tr>
              </table>
            </div>
          </div>
          <!-- </c:if> -->
        </div>
      </div>
      <!-- <%--2.2营运车辆违规报警趋势分析--%> -->
      <div>
        <h4 style="padding-top: 20px">2.2营运车辆违规报警趋势分析</h4>
        <!-- <%--2.2--%> -->
        <div>
          <h4 style="text-align: center;padding: 20px">{{ data.summaryCityName }}营运车辆违规报警情况统计</h4>
          <div class="tableWrapperList" style="width: 90%;margin-left: 5%;">
            <table class="img-table" border="1">
              <tr style="font-weight: bold">
                <td rowspan="2">经营类别</td>
                <td colspan="3">第一季度（1-3月）</td>
                <td colspan="3">第二季度（4-6月）</td>
                <td colspan="3">第三季度（7-9月）</td>
                <td colspan="3">第四季度（10-12月）</td>
              </tr>
              <tr style="font-weight: bold">
                <td>台数</td>
                <td>次数</td>
                <td>均值</td>
                <td>台数</td>
                <td>次数</td>
                <td>均值</td>
                <td>台数</td>
                <td>次数</td>
                <td>均值</td>
                <td>台数</td>
                <td>次数</td>
                <td>均值</td>
              </tr>
              <!-- <c:if test="${vehicleAlarmTrendAnalysis.busAlarmInfo.firstQuarterAlarmNumber > '0' ||
                    vehicleAlarmTrendAnalysis.busAlarmInfo.secondQuarterAlarmNumber > '0' ||
                    vehicleAlarmTrendAnalysis.busAlarmInfo.thirdQuarterAlarmNumber > '0' ||
                    vehicleAlarmTrendAnalysis.busAlarmInfo.fourthQuarterAlarmNumber > '0'}"> -->
              <tr v-if="vehicleAlarmTrendAnalysis.busAlarmInfo.firstQuarterAlarmNumber > '0' ||
                vehicleAlarmTrendAnalysis.busAlarmInfo.secondQuarterAlarmNumber > '0' ||
                vehicleAlarmTrendAnalysis.busAlarmInfo.thirdQuarterAlarmNumber > '0' ||
                vehicleAlarmTrendAnalysis.busAlarmInfo.fourthQuarterAlarmNumber > '0'">
                <td style="font-weight: bold">班线报警</td>
                <td>{{ vehicleAlarmTrendAnalysis.busAlarmInfo.firstQuarterAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.busAlarmInfo.firstQuarterAlarmNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.busAlarmInfo.firstQuarterAlarmRatio }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.busAlarmInfo.secondQuarterAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.busAlarmInfo.secondQuarterAlarmNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.busAlarmInfo.secondQuarterAlarmRatio }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.busAlarmInfo.thirdQuarterAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.busAlarmInfo.thirdQuarterAlarmNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.busAlarmInfo.thirdQuarterAlarmRatio }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.busAlarmInfo.fourthQuarterAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.busAlarmInfo.fourthQuarterAlarmNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.busAlarmInfo.fourthQuarterAlarmRatio }}</td>
              </tr>
              <!-- </c:if> -->
              <!-- <c:if test="${vehicleAlarmTrendAnalysis.tourAlarmInfo.firstQuarterAlarmNumber > '0' ||
                    vehicleAlarmTrendAnalysis.tourAlarmInfo.secondQuarterAlarmNumber > '0' ||
                    vehicleAlarmTrendAnalysis.tourAlarmInfo.thirdQuarterAlarmNumber > '0' ||
                    vehicleAlarmTrendAnalysis.tourAlarmInfo.fourthQuarterAlarmNumber > '0'}"> -->
              <tr v-if="vehicleAlarmTrendAnalysis.tourAlarmInfo.firstQuarterAlarmNumber > '0' ||
                vehicleAlarmTrendAnalysis.tourAlarmInfo.secondQuarterAlarmNumber > '0' ||
                vehicleAlarmTrendAnalysis.tourAlarmInfo.thirdQuarterAlarmNumber > '0' ||
                vehicleAlarmTrendAnalysis.tourAlarmInfo.fourthQuarterAlarmNumber > '0'">
                <td style="font-weight: bold">旅游报警</td>
                <td>{{ vehicleAlarmTrendAnalysis.tourAlarmInfo.firstQuarterAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.tourAlarmInfo.firstQuarterAlarmNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.tourAlarmInfo.firstQuarterAlarmRatio }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.tourAlarmInfo.secondQuarterAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.tourAlarmInfo.secondQuarterAlarmNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.tourAlarmInfo.secondQuarterAlarmRatio }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.tourAlarmInfo.thirdQuarterAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.tourAlarmInfo.thirdQuarterAlarmNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.tourAlarmInfo.thirdQuarterAlarmRatio }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.tourAlarmInfo.fourthQuarterAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.tourAlarmInfo.fourthQuarterAlarmNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.tourAlarmInfo.fourthQuarterAlarmRatio }}</td>
              </tr>
              <!-- </c:if> -->
              <!-- <c:if test="${vehicleAlarmTrendAnalysis.dangerAlarmInfo.firstQuarterAlarmNumber > '0' ||
                    vehicleAlarmTrendAnalysis.dangerAlarmInfo.secondQuarterAlarmNumber > '0' ||
                    vehicleAlarmTrendAnalysis.dangerAlarmInfo.thirdQuarterAlarmNumber > '0' ||
                    vehicleAlarmTrendAnalysis.dangerAlarmInfo.fourthQuarterAlarmNumber > '0'}"> -->
              <tr v-if="vehicleAlarmTrendAnalysis.dangerAlarmInfo.firstQuarterAlarmNumber > '0' ||
                vehicleAlarmTrendAnalysis.dangerAlarmInfo.secondQuarterAlarmNumber > '0' ||
                vehicleAlarmTrendAnalysis.dangerAlarmInfo.thirdQuarterAlarmNumber > '0' ||
                vehicleAlarmTrendAnalysis.dangerAlarmInfo.fourthQuarterAlarmNumber > '0'">
                <td style="font-weight: bold">危运报警</td>
                <td>{{ vehicleAlarmTrendAnalysis.dangerAlarmInfo.firstQuarterAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.dangerAlarmInfo.firstQuarterAlarmNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.dangerAlarmInfo.firstQuarterAlarmRatio }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.dangerAlarmInfo.secondQuarterAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.dangerAlarmInfo.secondQuarterAlarmNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.dangerAlarmInfo.secondQuarterAlarmRatio }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.dangerAlarmInfo.thirdQuarterAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.dangerAlarmInfo.thirdQuarterAlarmNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.dangerAlarmInfo.thirdQuarterAlarmRatio }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.dangerAlarmInfo.fourthQuarterAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.dangerAlarmInfo.fourthQuarterAlarmNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.dangerAlarmInfo.fourthQuarterAlarmRatio }}</td>
              </tr>
              <!-- </c:if> -->
              <!-- <c:if test="${vehicleAlarmTrendAnalysis.goodsAlarmInfo.firstQuarterAlarmNumber > '0' ||
                    vehicleAlarmTrendAnalysis.goodsAlarmInfo.secondQuarterAlarmNumber > '0' ||
                    vehicleAlarmTrendAnalysis.goodsAlarmInfo.thirdQuarterAlarmNumber > '0' ||
                    vehicleAlarmTrendAnalysis.goodsAlarmInfo.fourthQuarterAlarmNumber > '0'}"> -->
              <tr v-if="vehicleAlarmTrendAnalysis.goodsAlarmInfo.firstQuarterAlarmNumber > '0' ||
                vehicleAlarmTrendAnalysis.goodsAlarmInfo.secondQuarterAlarmNumber > '0' ||
                vehicleAlarmTrendAnalysis.goodsAlarmInfo.thirdQuarterAlarmNumber > '0' ||
                vehicleAlarmTrendAnalysis.goodsAlarmInfo.fourthQuarterAlarmNumber > '0'">
                <td style="font-weight: bold">普货报警</td>
                <td>{{ vehicleAlarmTrendAnalysis.goodsAlarmInfo.firstQuarterAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.goodsAlarmInfo.firstQuarterAlarmNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.goodsAlarmInfo.firstQuarterAlarmRatio }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.goodsAlarmInfo.secondQuarterAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.goodsAlarmInfo.secondQuarterAlarmNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.goodsAlarmInfo.secondQuarterAlarmRatio }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.goodsAlarmInfo.thirdQuarterAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.goodsAlarmInfo.thirdQuarterAlarmNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.goodsAlarmInfo.thirdQuarterAlarmRatio }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.goodsAlarmInfo.fourthQuarterAlarmVehicleNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.goodsAlarmInfo.fourthQuarterAlarmNumber }}</td>
                <td>{{ vehicleAlarmTrendAnalysis.goodsAlarmInfo.fourthQuarterAlarmRatio }}</td>
              </tr>
              <!-- </c:if> -->
            </table>
          </div>
          <!-- <%--图表1--%> -->
          <div>
            <div class="echartWrapper margin-tm h400" id="chartContainer12"></div>
            <h4 style="text-align: center;padding: 20px">{{ data.summaryReportStatisticalYear }}营运车辆违规报警次数趋势分析
            </h4>
            <div class="tableWrapperList" style="width: 90%;margin-left: 5%;">
              <!-- <c:set var="busQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busFirstQuarterAlarmNumber != '0' ||
                               vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busSecondQuarterAlarmNumber != '0' ||
                               vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busThirdQuarterAlarmNumber != '0' ||
                               vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busFourthQuarterAlarmNumber != '0'}" />
              <c:set var="tourQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourFirstQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourSecondQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourThirdQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourFourthQuarterAlarmNumber != '0'}" />
              <c:set var="dangerQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerFirstQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerSecondQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerThirdQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerFourthQuarterAlarmNumber != '0'}" />
              <c:set var="goodsQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsFirstQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsSecondQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsThirdQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsFourthQuarterAlarmNumber != '0'}" /> -->

              <table class="img-table" border="1">
                <tr style="font-weight: bold">
                  <td></td>
                  <td>第一季度(1-3)月</td>
                  <td>第二季度(4-6)月</td>
                  <td>第三季度(7-9)月</td>
                  <td>第四季度(10-12)月</td>
                </tr>
                <!-- <c:if v-if="busQuarterAlarmNumber" > -->
                <tr v-if="busQuarterAlarmNumber">
                  <td style="font-weight: bold">班线报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busFourthQuarterAlarmNumber }}
                  </td>
                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="tourQuarterAlarmNumber" > -->
                <tr v-if="tourQuarterAlarmNumber">
                  <td style="font-weight: bold">旅游报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourFourthQuarterAlarmNumber }}
                  </td>


                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="dangerQuarterAlarmNumber" > -->
                <tr v-if="dangerQuarterAlarmNumber">
                  <td style="font-weight: bold">危运报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerFourthQuarterAlarmNumber }}
                  </td>

                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="goodsQuarterAlarmNumber" > -->
                <tr v-if="goodsQuarterAlarmNumber">
                  <td style="font-weight: bold">普货报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsFourthQuarterAlarmNumber }}
                  </td>
                </tr>
                <!-- </c:if> -->
                <tr style="font-weight: bold">
                  <td>合计</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.totalFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.totalSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.totalThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.totalFourthQuarterAlarmNumber }}
                  </td>

                </tr>
              </table>
            </div>
          </div>
          <!-- <%--图表2--%> -->
          <div>
            <div class="echartWrapper margin-tm h400" id="chartContainer13"></div>
            <h4 style="text-align: center;padding: 20px">{{ data.summaryReportStatisticalYear }}营运车辆违规报警均值趋势分析
            </h4>
            <div class="tableWrapperList" style="width: 90%;margin-left: 5%">
              <!-- <c:set var="busQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.busFirstQuarterAlarmNumber != '0.00' ||
                               vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.busSecondQuarterAlarmNumber != '0.00' ||
                               vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.busThirdQuarterAlarmNumber != '0.00' ||
                               vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.busFourthQuarterAlarmNumber != '0.00'}" />
              <c:set var="tourQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.tourFirstQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.tourSecondQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.tourThirdQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.tourFourthQuarterAlarmNumber != '0.00'}" />
              <c:set var="dangerQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.dangerFirstQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.dangerSecondQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.dangerThirdQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.dangerFourthQuarterAlarmNumber != '0.00'}" />
              <c:set var="goodsQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.goodsFirstQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.goodsSecondQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.goodsThirdQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.goodsFourthQuarterAlarmNumber != '0.00'}" /> -->

              <table class="img-table" border="1">
                <tr style="font-weight: bold">
                  <td></td>
                  <td>第一季度(1-3)月</td>
                  <td>第二季度(4-6)月</td>
                  <td>第三季度(7-9)月</td>
                  <td>第四季度(10-12)月</td>
                </tr>
                <!-- <c:if v-if="busQuarterAlarmNumber" > -->
                <tr v-if="busQuarterAlarmNumber">
                  <td style="font-weight: bold">班线报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.busFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.busSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.busThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.busFourthQuarterAlarmNumber }}
                  </td>
                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="tourQuarterAlarmNumber" > -->
                <tr v-if="tourQuarterAlarmNumber">
                  <td style="font-weight: bold">旅游报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.tourFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.tourSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.tourThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.tourFourthQuarterAlarmNumber }}
                  </td>


                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="dangerQuarterAlarmNumber" > -->
                <tr v-if="dangerQuarterAlarmNumber">
                  <td style="font-weight: bold">危运报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.dangerFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.dangerSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.dangerThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.dangerFourthQuarterAlarmNumber }}
                  </td>

                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="goodsQuarterAlarmNumber" > -->
                <tr v-if="goodsQuarterAlarmNumber">
                  <td style="font-weight: bold">普货报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.goodsFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.goodsSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.goodsThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.goodsFourthQuarterAlarmNumber }}
                  </td>
                </tr>
                <!-- </c:if> -->
                <tr style="font-weight: bold">
                  <td>合计</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.totalFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.totalSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.totalThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.totalFourthQuarterAlarmNumber }}
                  </td>

                </tr>
              </table>
            </div>
          </div>
          <!-- <%--图表3--%> -->
          <div>
            <div class="echartWrapper margin-tm h400" id="chartContainer14"></div>
            <h4 style="text-align: center;padding: 20px">
              {{ data.summaryReportStatisticalYear }}营运车辆超速报警次数趋势分析</h4>
            <div class="tableWrapperList" style="width: 90%;margin-left: 5%">
              <!-- <c:set var="busQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.busFirstQuarterAlarmNumber != '0' ||
                               vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.busSecondQuarterAlarmNumber != '0' ||
                               vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.busThirdQuarterAlarmNumber != '0' ||
                               vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.busFourthQuarterAlarmNumber != '0'}" />
              <c:set var="tourQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.tourFirstQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.tourSecondQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.tourThirdQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.tourFourthQuarterAlarmNumber != '0'}" />
              <c:set var="dangerQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.dangerFirstQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.dangerSecondQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.dangerThirdQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.dangerFourthQuarterAlarmNumber != '0'}" />
              <c:set var="goodsQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.goodsFirstQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.goodsSecondQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.goodsThirdQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.goodsFourthQuarterAlarmNumber != '0'}" /> -->

              <table class="img-table" border="1">
                <tr style="font-weight: bold">
                  <td></td>
                  <td>第一季度(1-3)月</td>
                  <td>第二季度(4-6)月</td>
                  <td>第三季度(7-9)月</td>
                  <td>第四季度(10-12)月</td>
                </tr>
                <!-- <c:if v-if="busQuarterAlarmNumber" > -->
                <tr v-if="busQuarterAlarmNumber">
                  <td style="font-weight: bold">班线报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.busFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.busSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.busThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.busFourthQuarterAlarmNumber }}
                  </td>
                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="tourQuarterAlarmNumber" > -->
                <tr v-if="tourQuarterAlarmNumber">
                  <td style="font-weight: bold">旅游报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.tourFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.tourSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.tourThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.tourFourthQuarterAlarmNumber }}
                  </td>


                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="dangerQuarterAlarmNumber" > -->
                <tr v-if="dangerQuarterAlarmNumber">
                  <td style="font-weight: bold">危运报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.dangerFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.dangerSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.dangerThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.dangerFourthQuarterAlarmNumber }}
                  </td>

                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="goodsQuarterAlarmNumber" > -->
                <tr v-if="goodsQuarterAlarmNumber">
                  <td style="font-weight: bold">普货报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.goodsFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.goodsSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.goodsThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.goodsFourthQuarterAlarmNumber }}
                  </td>
                </tr>
                <!-- </c:if> -->
                <tr style="font-weight: bold">
                  <td>合计</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.totalFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.totalSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.totalThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.totalFourthQuarterAlarmNumber }}
                  </td>

                </tr>
              </table>
            </div>
          </div>
          <!-- <%--图表4--%> -->
          <div>
            <div class="echartWrapper margin-tm h400" id="chartContainer15"></div>
            <h4 style="text-align: center;padding: 20px">
              {{ data.summaryReportStatisticalYear }}营运车辆超速报警均值趋势分析</h4>
            <div class="tableWrapperList" style="width: 90%;margin-left: 5%">
              <!-- <c:set var="busQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.busFirstQuarterAlarmNumber != '0.00' ||
                               vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.busSecondQuarterAlarmNumber != '0.00' ||
                               vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.busThirdQuarterAlarmNumber != '0.00' ||
                               vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.busFourthQuarterAlarmNumber != '0.00'}" />
              <c:set var="tourQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.tourFirstQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.tourSecondQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.tourThirdQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.tourFourthQuarterAlarmNumber != '0.00'}" />
              <c:set var="dangerQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.dangerFirstQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.dangerSecondQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.dangerThirdQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.dangerFourthQuarterAlarmNumber != '0.00'}" />
              <c:set var="goodsQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.goodsFirstQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.goodsSecondQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.goodsThirdQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.goodsFourthQuarterAlarmNumber != '0.00'}" /> -->

              <table class="img-table" border="1">
                <tr style="font-weight: bold">
                  <td></td>
                  <td>第一季度(1-3)月</td>
                  <td>第二季度(4-6)月</td>
                  <td>第三季度(7-9)月</td>
                  <td>第四季度(10-12)月</td>
                </tr>
                <!-- <c:if v-if="busQuarterAlarmNumber" > -->
                <tr v-if="busQuarterAlarmNumber">
                  <td style="font-weight: bold">班线报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.busFirstQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.busSecondQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.busThirdQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.busFourthQuarterAlarmNumber
                    }}
                  </td>
                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="tourQuarterAlarmNumber" > -->
                <tr v-if="tourQuarterAlarmNumber">
                  <td style="font-weight: bold">旅游报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.tourFirstQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.tourSecondQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.tourThirdQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.tourFourthQuarterAlarmNumber
                    }}
                  </td>


                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="dangerQuarterAlarmNumber" > -->
                <tr v-if="dangerQuarterAlarmNumber">
                  <td style="font-weight: bold">危运报警</td>
                  <td>
                    {{
                      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.dangerFirstQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{
                      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.dangerSecondQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{
                      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.dangerThirdQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{
                      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.dangerFourthQuarterAlarmNumber
                    }}
                  </td>

                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="goodsQuarterAlarmNumber" > -->
                <tr v-if="goodsQuarterAlarmNumber">
                  <td style="font-weight: bold">普货报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.goodsFirstQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{
                      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.goodsSecondQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.goodsThirdQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{
                      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.goodsFourthQuarterAlarmNumber
                    }}
                  </td>
                </tr>
                <!-- </c:if> -->
                <tr style="font-weight: bold">
                  <td>合计</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.totalFirstQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.totalSecondQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.totalThirdQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.totalFourthQuarterAlarmNumber
                    }}
                  </td>

                </tr>
              </table>
            </div>
          </div>
          <!-- <%--图表5--%> -->
          <div>
            <div class="echartWrapper margin-tm h400" id="chartContainer16"></div>
            <h4 style="text-align: center;padding: 20px">
              {{ data.summaryReportStatisticalYear }}营运车辆疲劳驾驶报警次数趋势分析</h4>
            <div class="tableWrapperList" style="width: 90%;margin-left: 5%">
              <!-- <c:set var="busQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.busFirstQuarterAlarmNumber != '0' ||
                               vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.busSecondQuarterAlarmNumber != '0' ||
                               vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.busThirdQuarterAlarmNumber != '0' ||
                               vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.busFourthQuarterAlarmNumber != '0'}" />
              <c:set var="tourQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.tourFirstQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.tourSecondQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.tourThirdQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.tourFourthQuarterAlarmNumber != '0'}" />
              <c:set var="dangerQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.dangerFirstQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.dangerSecondQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.dangerThirdQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.dangerFourthQuarterAlarmNumber != '0'}" />
              <c:set var="goodsQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.goodsFirstQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.goodsSecondQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.goodsThirdQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.goodsFourthQuarterAlarmNumber != '0'}" /> -->

              <table class="img-table" border="1">
                <tr style="font-weight: bold">
                  <td></td>
                  <td>第一季度(1-3)月</td>
                  <td>第二季度(4-6)月</td>
                  <td>第三季度(7-9)月</td>
                  <td>第四季度(10-12)月</td>
                </tr>
                <!-- <c:if v-if="busQuarterAlarmNumber" > -->
                <tr v-if="busQuarterAlarmNumber">
                  <td style="font-weight: bold">班线报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.busFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.busSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.busThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.busFourthQuarterAlarmNumber }}
                  </td>
                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="tourQuarterAlarmNumber" > -->
                <tr v-if="tourQuarterAlarmNumber">
                  <td style="font-weight: bold">旅游报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.tourFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.tourSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.tourThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.tourFourthQuarterAlarmNumber }}
                  </td>


                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="dangerQuarterAlarmNumber" > -->
                <tr v-if="dangerQuarterAlarmNumber">
                  <td style="font-weight: bold">危运报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.dangerFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.dangerSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.dangerThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.dangerFourthQuarterAlarmNumber }}
                  </td>

                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="goodsQuarterAlarmNumber" > -->
                <tr v-if="goodsQuarterAlarmNumber">
                  <td style="font-weight: bold">普货报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.goodsFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.goodsSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.goodsThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.goodsFourthQuarterAlarmNumber }}
                  </td>
                </tr>
                <!-- </c:if> -->
                <tr style="font-weight: bold">
                  <td>合计</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.totalFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.totalSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.totalThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.totalFourthQuarterAlarmNumber }}
                  </td>

                </tr>
              </table>
            </div>
          </div>
          <!-- <%--图表6--%> -->
          <div>
            <div class="echartWrapper margin-tm h400" id="chartContainer17"></div>
            <h4 style="text-align: center;padding: 20px">
              {{ data.summaryReportStatisticalYear }}营运车辆疲劳驾驶报警均值趋势分析</h4>
            <div class="tableWrapperList" style="width: 90%;margin-left: 5%">
              <!-- <c:set var="busQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.busFirstQuarterAlarmNumber != '0.00' ||
                               vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.busSecondQuarterAlarmNumber != '0.00' ||
                               vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.busThirdQuarterAlarmNumber != '0.00' ||
                               vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.busFourthQuarterAlarmNumber != '0.00'}" />
              <c:set var="tourQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.tourFirstQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.tourSecondQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.tourThirdQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.tourFourthQuarterAlarmNumber != '0.00'}" />
              <c:set var="dangerQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.dangerFirstQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.dangerSecondQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.dangerThirdQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.dangerFourthQuarterAlarmNumber != '0.00'}" />
              <c:set var="goodsQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.goodsFirstQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.goodsSecondQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.goodsThirdQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.goodsFourthQuarterAlarmNumber != '0.00'}" /> -->

              <table class="img-table" border="1">
                <tr style="font-weight: bold">
                  <td></td>
                  <td>第一季度(1-3)月</td>
                  <td>第二季度(4-6)月</td>
                  <td>第三季度(7-9)月</td>
                  <td>第四季度(10-12)月</td>
                </tr>
                <!-- <c:if v-if="busQuarterAlarmNumber" > -->
                <tr v-if="busQuarterAlarmNumber">
                  <td style="font-weight: bold">班线报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.busFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.busSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.busThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.busFourthQuarterAlarmNumber }}
                  </td>
                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="tourQuarterAlarmNumber" > -->
                <tr v-if="tourQuarterAlarmNumber">
                  <td style="font-weight: bold">旅游报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.tourFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.tourSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.tourThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.tourFourthQuarterAlarmNumber }}
                  </td>


                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="dangerQuarterAlarmNumber" > -->
                <tr v-if="dangerQuarterAlarmNumber">
                  <td style="font-weight: bold">危运报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.dangerFirstQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.dangerSecondQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.dangerThirdQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.dangerFourthQuarterAlarmNumber
                    }}
                  </td>

                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="goodsQuarterAlarmNumber" > -->
                <tr v-if="goodsQuarterAlarmNumber">
                  <td style="font-weight: bold">普货报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.goodsFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.goodsSecondQuarterAlarmNumber
                    }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.goodsThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.goodsFourthQuarterAlarmNumber
                    }}
                  </td>
                </tr>
                <!-- </c:if> -->
                <tr style="font-weight: bold">
                  <td>合计</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.totalFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.totalSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.totalThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.totalFourthQuarterAlarmNumber }}
                  </td>

                </tr>
              </table>
            </div>
          </div>
          <!-- <%--图表7--%> -->
          <div>
            <div class="echartWrapper margin-tm h400" id="chartContainer18"></div>
            <h4 style="text-align: center;padding: 20px">
              {{ data.summaryReportStatisticalYear }}营运车辆凌晨2-5点禁行报警次数趋势分析</h4>
            <div class="tableWrapperList" style="width: 90%;margin-left: 5%">
              <!-- <c:set var="busQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.busFirstQuarterAlarmNumber != '0' ||
                               vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.busSecondQuarterAlarmNumber != '0' ||
                               vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.busThirdQuarterAlarmNumber != '0' ||
                               vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.busFourthQuarterAlarmNumber != '0'}" />
              <c:set var="tourQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.tourFirstQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.tourSecondQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.tourThirdQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.tourFourthQuarterAlarmNumber != '0'}" />
              <c:set var="dangerQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.dangerFirstQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.dangerSecondQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.dangerThirdQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.dangerFourthQuarterAlarmNumber != '0'}" />
              <c:set var="goodsQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.goodsFirstQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.goodsSecondQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.goodsThirdQuarterAlarmNumber != '0' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.goodsFourthQuarterAlarmNumber != '0'}" /> -->

              <table class="img-table" border="1">
                <tr style="font-weight: bold">
                  <td></td>
                  <td>第一季度(1-3)月</td>
                  <td>第二季度(4-6)月</td>
                  <td>第三季度(7-9)月</td>
                  <td>第四季度(10-12)月</td>
                </tr>
                <!-- <c:if v-if="busQuarterAlarmNumber" > -->
                <tr v-if="busQuarterAlarmNumber">
                  <td style="font-weight: bold">班线报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.busFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.busSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.busThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.busFourthQuarterAlarmNumber }}
                  </td>
                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="tourQuarterAlarmNumber" > -->
                <tr v-if="tourQuarterAlarmNumber">
                  <td style="font-weight: bold">旅游报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.tourFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.tourSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.tourThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.tourFourthQuarterAlarmNumber }}
                  </td>


                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="dangerQuarterAlarmNumber" > -->
                <tr v-if="dangerQuarterAlarmNumber">
                  <td style="font-weight: bold">危运报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.dangerFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.dangerSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.dangerThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.dangerFourthQuarterAlarmNumber }}
                  </td>

                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="goodsQuarterAlarmNumber" > -->
                <tr v-if="goodsQuarterAlarmNumber">
                  <td style="font-weight: bold">普货报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.goodsFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.goodsSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.goodsThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.goodsFourthQuarterAlarmNumber }}
                  </td>
                </tr>
                <!-- </c:if> -->
                <tr style="font-weight: bold">
                  <td>合计</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.totalFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.totalSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.totalThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.totalFourthQuarterAlarmNumber }}
                  </td>

                </tr>
              </table>
            </div>
          </div>
          <!-- <%--图表8--%> -->
          <div>
            <div class="echartWrapper margin-tm h400" id="chartContainer19"></div>
            <h4 style="text-align: center;padding: 20px">
              {{ data.summaryReportStatisticalYear }}营运车辆凌晨2-5点禁行报警均值趋势分析</h4>
            <div class="tableWrapperList" style="width: 90%;margin-left: 5%">
              <!-- <c:set var="busQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.busFirstQuarterAlarmNumber != '0.00' ||
                               vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.busSecondQuarterAlarmNumber != '0.00' ||
                               vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.busThirdQuarterAlarmNumber != '0.00' ||
                               vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.busFourthQuarterAlarmNumber != '0.00'}" />
              <c:set var="tourQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.tourFirstQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.tourSecondQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.tourThirdQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.tourFourthQuarterAlarmNumber != '0.00'}" />
              <c:set var="dangerQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.dangerFirstQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.dangerSecondQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.dangerThirdQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.dangerFourthQuarterAlarmNumber != '0.00'}" />
              <c:set var="goodsQuarterAlarmNumber"
                value="${vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.goodsFirstQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.goodsSecondQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.goodsThirdQuarterAlarmNumber != '0.00' ||
                       vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.goodsFourthQuarterAlarmNumber != '0.00'}" /> -->

              <table class="img-table" border="1">
                <tr style="font-weight: bold">
                  <td></td>
                  <td>第一季度(1-3)月</td>
                  <td>第二季度(4-6)月</td>
                  <td>第三季度(7-9)月</td>
                  <td>第四季度(10-12)月</td>
                </tr>
                <!-- <c:if v-if="busQuarterAlarmNumber" > -->
                <tr v-if="busQuarterAlarmNumber">
                  <td style="font-weight: bold">班线报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.busFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.busSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.busThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.busFourthQuarterAlarmNumber }}
                  </td>
                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="tourQuarterAlarmNumber" > -->
                <tr v-if="tourQuarterAlarmNumber">
                  <td style="font-weight: bold">旅游报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.tourFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.tourSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.tourThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.tourFourthQuarterAlarmNumber }}
                  </td>


                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="dangerQuarterAlarmNumber" > -->
                <tr v-if="dangerQuarterAlarmNumber">
                  <td style="font-weight: bold">危运报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.dangerFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.dangerSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.dangerThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.dangerFourthQuarterAlarmNumber }}
                  </td>

                </tr>
                <!-- </c:if> -->
                <!-- <c:if v-if="goodsQuarterAlarmNumber" > -->
                <tr v-if="goodsQuarterAlarmNumber">
                  <td style="font-weight: bold">普货报警</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.goodsFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.goodsSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.goodsThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.goodsFourthQuarterAlarmNumber }}
                  </td>
                </tr>
                <!-- </c:if> -->
                <tr style="font-weight: bold">
                  <td>合计</td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.totalFirstQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.totalSecondQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.totalThirdQuarterAlarmNumber }}
                  </td>
                  <td>
                    {{ vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.totalFourthQuarterAlarmNumber }}
                  </td>

                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- <%--2.3营运车辆违规报警排名情况--%> -->
      <div>
        <!-- <%--2.3.1--%> -->
        <div>
          <h4 style="padding-top: 10px; padding-bottom: 10px">2.3营运车辆违规报警排名情况</h4>
          <h4>2.3.1区所报警排名情况</h4>
          <!--表格1-->
          <div class="tableWrapperList" style="width: 100%; margin-left: 0%">
            <header>{{ data.summaryReportStatisticalYear }}车辆违规报警区所排名</header>
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
              <!-- <c:forEach items="{{ districtVehicleAlarmRanking.allVehicleAlarmRankingInfo }}" var="item"> -->
              <tr v-for="item in districtVehicleAlarmRanking.allVehicleAlarmRankingInfo">
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
              <tr style="font-weight: bold">
                <td colspan="2">小计</td>
                <td>{{ districtVehicleAlarmRanking.allVehicleAlarmSum.companyNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.allVehicleAlarmSum.vehicleNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.allVehicleAlarmSum.speedingAlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.allVehicleAlarmSum.fatigueAlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.allVehicleAlarmSum.t25AlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.allVehicleAlarmSum.totalAlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.allVehicleAlarmSum.avgAlarmNumber }}</td>
              </tr>
            </table>
          </div>
          <!--表格2-->
          <div class="tableWrapperList" style="width: 100%; margin-left: 0%">
            <header>{{ data.summaryReportStatisticalYear }}重点营运车辆违规报警区所排名</header>
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
              <!-- <c:forEach items="{{ districtVehicleAlarmRanking.importantVehicleAlarmRankingInfo }}" var="item"> -->
              <tr v-for="item in districtVehicleAlarmRanking.importantVehicleAlarmRankingInfo">
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
              <tr style="font-weight: bold">
                <td colspan="2">小计</td>
                <td>{{ districtVehicleAlarmRanking.importantVehicleAlarmSum.companyNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.importantVehicleAlarmSum.vehicleNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.importantVehicleAlarmSum.speedingAlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.importantVehicleAlarmSum.fatigueAlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.importantVehicleAlarmSum.t25AlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.importantVehicleAlarmSum.totalAlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.importantVehicleAlarmSum.avgAlarmNumber }}</td>
              </tr>
            </table>
          </div>
          <!--表格3-->
          <!-- <c:if
            test="${districtVehicleAlarmRanking.busVehicleAlarmRankingInfo != null && districtVehicleAlarmRanking.busVehicleAlarmRankingInfo.length > 0 }"> -->
          <div
            v-if="districtVehicleAlarmRanking.busVehicleAlarmRankingInfo != null && districtVehicleAlarmRanking.busVehicleAlarmRankingInfo.length > 0"
            class="tableWrapperList" style="width: 100%; margin-left: 0%">
            <header>{{ data.summaryReportStatisticalYear }}班线客运车辆违规报警区所排名</header>
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
              <!-- <c:forEach items="{{ districtVehicleAlarmRanking.busVehicleAlarmRankingInfo }}" var="item"> -->
              <tr v-for="item in districtVehicleAlarmRanking.busVehicleAlarmRankingInfo">
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
              <tr style="font-weight: bold">
                <td colspan="2">小计</td>
                <td>{{ districtVehicleAlarmRanking.busVehicleAlarmSum.companyNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.busVehicleAlarmSum.vehicleNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.busVehicleAlarmSum.speedingAlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.busVehicleAlarmSum.fatigueAlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.busVehicleAlarmSum.t25AlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.busVehicleAlarmSum.totalAlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.busVehicleAlarmSum.avgAlarmNumber }}</td>
              </tr>
            </table>
          </div>
          <!-- </c:if> -->
          <!--表格4-->
          <!-- <c:if
            test="${districtVehicleAlarmRanking.tourVehicleAlarmRankingInfo != null && districtVehicleAlarmRanking.tourVehicleAlarmRankingInfo.length > 0 }"> -->
          <div
            v-if="districtVehicleAlarmRanking.tourVehicleAlarmRankingInfo != null && districtVehicleAlarmRanking.tourVehicleAlarmRankingInfo.length > 0"
            class="tableWrapperList" style="width: 100%; margin-left: 0%">
            <header>{{ data.summaryReportStatisticalYear }}旅游客运车辆违规报警区所排名</header>
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
              <!-- <c:forEach items="{{ districtVehicleAlarmRanking.tourVehicleAlarmRankingInfo }}" var="item"> -->
              <tr v-for="item in districtVehicleAlarmRanking.tourVehicleAlarmRankingInfo">
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
              <tr style="font-weight: bold">
                <td colspan="2">小计</td>
                <td>{{ districtVehicleAlarmRanking.tourVehicleAlarmSum.companyNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.tourVehicleAlarmSum.vehicleNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.tourVehicleAlarmSum.speedingAlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.tourVehicleAlarmSum.fatigueAlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.tourVehicleAlarmSum.t25AlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.tourVehicleAlarmSum.totalAlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.tourVehicleAlarmSum.avgAlarmNumber }}</td>
              </tr>
            </table>
          </div>
          <!-- </c:if> -->
          <!--表格5-->
          <!-- <c:if
            test="${districtVehicleAlarmRanking.dangerVehicleAlarmRankingInfo != null && districtVehicleAlarmRanking.dangerVehicleAlarmRankingInfo.length > 0 }"> -->
          <div
            v-if="districtVehicleAlarmRanking.dangerVehicleAlarmRankingInfo != null && districtVehicleAlarmRanking.dangerVehicleAlarmRankingInfo.length > 0"
            class="tableWrapperList" style="width: 100%; margin-left: 0%">
            <header>{{ data.summaryReportStatisticalYear }}危险品运输车辆违规报警区所排名</header>
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
              <!-- <c:forEach items="{{ districtVehicleAlarmRanking.dangerVehicleAlarmRankingInfo }}" var="item"> -->
              <tr v-for="item in districtVehicleAlarmRanking.dangerVehicleAlarmRankingInfo">
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
              <tr style="font-weight: bold">
                <td colspan="2">小计</td>
                <td>{{ districtVehicleAlarmRanking.dangerVehicleAlarmSum.companyNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.dangerVehicleAlarmSum.vehicleNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.dangerVehicleAlarmSum.speedingAlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.dangerVehicleAlarmSum.fatigueAlarmNumber }}</td>

                <td>{{ districtVehicleAlarmRanking.dangerVehicleAlarmSum.totalAlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.dangerVehicleAlarmSum.avgAlarmNumber }}</td>
              </tr>
            </table>
          </div>
          <!-- </c:if> -->
          <!--表格6-->
          <!-- <c:if
            test="${districtVehicleAlarmRanking.goodsVehicleAlarmRankingInfo != null && districtVehicleAlarmRanking.goodsVehicleAlarmRankingInfo.length > 0 }"> -->
          <div
            v-if="districtVehicleAlarmRanking.goodsVehicleAlarmRankingInfo != null && districtVehicleAlarmRanking.goodsVehicleAlarmRankingInfo.length > 0"
            class="tableWrapperList" style="width: 100%; margin-left: 0%">
            <header>{{ data.summaryReportStatisticalYear }}普通货物运输车辆违规报警区所排名</header>
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
              <!-- <c:forEach items="{{ districtVehicleAlarmRanking.goodsVehicleAlarmRankingInfo }}" var="item"> -->
              <tr v-for="item in districtVehicleAlarmRanking.goodsVehicleAlarmRankingInfo">
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
              <tr style="font-weight: bold">
                <td colspan="2">小计</td>
                <td>{{ districtVehicleAlarmRanking.goodsVehicleAlarmSum.companyNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.goodsVehicleAlarmSum.vehicleNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.goodsVehicleAlarmSum.speedingAlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.goodsVehicleAlarmSum.fatigueAlarmNumber }}</td>

                <td>{{ districtVehicleAlarmRanking.goodsVehicleAlarmSum.totalAlarmNumber }}</td>
                <td>{{ districtVehicleAlarmRanking.goodsVehicleAlarmSum.avgAlarmNumber }}</td>
              </tr>
            </table>
          </div>
          <!-- </c:if> -->
        </div>
        <!-- <%--2.3.2--%> -->
        <div>
          <h4 style="padding-top: 10px">2.3.2企业报警排名情况</h4>
          <!--表格1-->
          <!-- <c:if
            test="${companyAlarmRanking.busCompanyAlarmRankingList != null && companyAlarmRanking.busCompanyAlarmRankingList.length > 0 }"> -->
          <div
            v-if="companyAlarmRanking.busCompanyAlarmRankingList != null && companyAlarmRanking.busCompanyAlarmRankingList.length > 0"
            class="tableWrapperList" style="width: 100%; margin-left: 0%">
            <header>{{ data.summaryReportStatisticalYear }}线客运企业违规报警排名</header>
            <table border="2" class="fontSmall">
              <tr>
                <th>排名</th>
                <th>区所</th>
                <th>企业名称</th>
                <th>车辆台数</th>
                <th>违规报警次数</th>
                <th>违规报警报警均值</th>
              </tr>
              <!-- <c:forEach items="{{ companyAlarmRanking.busCompanyAlarmRankingList }}" var="item"> -->
              <tr v-for="item in companyAlarmRanking.busCompanyAlarmRankingList">
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
          <!-- </c:if> -->
          <!--表格2-->
          <!-- <c:if
            test="${companyAlarmRanking.tourCompanyAlarmRankingList != null && companyAlarmRanking.tourCompanyAlarmRankingList.length > 0 }"> -->
          <div
            v-if="companyAlarmRanking.tourCompanyAlarmRankingList != null && companyAlarmRanking.tourCompanyAlarmRankingList.length > 0"
            class="tableWrapperList" style="width: 100%; margin-left: 0%">
            <header>{{ data.summaryReportStatisticalYear }}旅游客运企业违规报警排名</header>
            <table border="2" class="fontSmall">
              <tr>
                <th>排名</th>
                <th>区所</th>
                <th>企业名称</th>
                <th>车辆台数</th>
                <th>违规报警次数</th>
                <th>违规报警报警均值</th>
              </tr>
              <!-- <c:forEach items="{{ companyAlarmRanking.tourCompanyAlarmRankingList }}" var="item"> -->
              <tr v-for="item in companyAlarmRanking.tourCompanyAlarmRankingList">
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
          <!-- </c:if> -->
          <!--表格3-->
          <!-- <c:if
            test="${companyAlarmRanking.dangerCompanyAlarmRankingList != null && companyAlarmRanking.dangerCompanyAlarmRankingList.length > 0 }"> -->
          <div
            v-if="companyAlarmRanking.dangerCompanyAlarmRankingList != null && companyAlarmRanking.dangerCompanyAlarmRankingList.length > 0"
            class="tableWrapperList" style="width: 100%; margin-left: 0%">
            <header>{{ data.summaryReportStatisticalYear }}危险品运输企业违规报警排名</header>
            <table border="2" class="fontSmall">
              <tr>
                <th>排名</th>
                <th>区所</th>
                <th>企业名称</th>
                <th>车辆台数</th>
                <th>违规报警次数</th>
                <th>违规报警报警均值</th>
              </tr>
              <!-- <c:forEach items="{{ companyAlarmRanking.dangerCompanyAlarmRankingList }}" var="item"> -->
              <tr v-for="item in companyAlarmRanking.dangerCompanyAlarmRankingList">
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
          <!-- </c:if> -->
          <!--表格4-->
          <!-- <c:if
            test="${companyAlarmRanking.goodsCompanyAlarmRankingList != null && companyAlarmRanking.goodsCompanyAlarmRankingList.length > 0 }"> -->
          <div
            v-if="companyAlarmRanking.goodsCompanyAlarmRankingList != null && companyAlarmRanking.goodsCompanyAlarmRankingList.length > 0"
            class="tableWrapperList" style="width: 100%; margin-left: 0%">
            <header>{{ data.summaryReportStatisticalYear }}普通货物运输企业违规报警排名</header>
            <table border="2" class="fontSmall">
              <tr>
                <th>排名</th>
                <th>区所</th>
                <th>企业名称</th>
                <th>车辆台数</th>
                <th>违规报警次数</th>
                <th>违规报警报警均值</th>
              </tr>
              <!-- <c:forEach items="{{ companyAlarmRanking.goodsCompanyAlarmRankingList }}" var="item"> -->
              <tr v-for="item in companyAlarmRanking.goodsCompanyAlarmRankingList">
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
          <!-- </c:if> -->
        </div>
        <!-- <%--2.3.3--%> -->
        <div>
          <h4 style="padding-top: 10px">2.3.3营运车辆违规报警排名情况</h4>
          <!--表格1-->
          <!-- <c:if test="${transportCompanyAlarmRanking.busVehicleAlarmRanking.speedingAlarmRankings.length > 0
       || transportCompanyAlarmRanking.busVehicleAlarmRanking.tiredAlarmRankings.length > 0
       || transportCompanyAlarmRanking.busVehicleAlarmRanking.t25AlarmRankings.length > 0}"> -->
          <div
            v-if="transportCompanyAlarmRanking.busVehicleAlarmRanking.speedingAlarmRankings.length > 0 && transportCompanyAlarmRanking.busVehicleAlarmRanking.tiredAlarmRankings.length > 0 && transportCompanyAlarmRanking.busVehicleAlarmRanking.t25AlarmRankings.length > 0"
            class="tableWrapperList" style="width: 100%; margin-left: 0%">
            <header>{{ data.summaryReportStatisticalYear }}班线客运车辆违规报警排名</header>
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
                  test="${transportCompanyAlarmRanking.busVehicleAlarmRanking.speedingAlarmRankings!=null && transportCompanyAlarmRanking.busVehicleAlarmRanking.speedingAlarmRankings.length > 0 }">
                  <c:forEach items="{{ transportCompanyAlarmRanking.busVehicleAlarmRanking.speedingAlarmRankings }}"
                    var="item" varStatus="vs"> -->
              <tr
                v-if="transportCompanyAlarmRanking.busVehicleAlarmRanking.speedingAlarmRankings != null && transportCompanyAlarmRanking.busVehicleAlarmRanking.speedingAlarmRankings.length > 0"
                v-for="item, index in transportCompanyAlarmRanking.busVehicleAlarmRanking.speedingAlarmRankings">
                <!-- <c:if test="{{ vs.first }}"> -->
                <td v-if="index === 0"
                  :rowspan="transportCompanyAlarmRanking.busVehicleAlarmRanking.speedingAlarmRankings.length">
                  {{ transportCompanyAlarmRanking.busVehicleAlarmRanking.speedingAlarmTypeName }}
                </td>
                <!-- </c:if> -->
                <td>{{ item.serialNo }}</td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.companyName }}</td>
                <td>{{ item.vehicleNumber }}</td>
                <td>{{ item.alarmNumber }}</td>
              </tr>
              <!-- </c:forEach>
                </c:if> -->
              <!-- <c:if
                  test="${transportCompanyAlarmRanking.busVehicleAlarmRanking.tiredAlarmRankings!=null && transportCompanyAlarmRanking.busVehicleAlarmRanking.tiredAlarmRankings.length > 0 }">
                  <c:forEach items="{{ transportCompanyAlarmRanking.busVehicleAlarmRanking.tiredAlarmRankings }}" var="item"
                    varStatus="vs"> -->
              <tr
                v-if="transportCompanyAlarmRanking.busVehicleAlarmRanking.tiredAlarmRankings != null && transportCompanyAlarmRanking.busVehicleAlarmRanking.tiredAlarmRankings.length > 0"
                v-for="item, index in transportCompanyAlarmRanking.busVehicleAlarmRanking.tiredAlarmRankings">
                <!-- <c:if test="{{ vs.first }}"> -->
                <td v-if="index === 0"
                  :rowspan="transportCompanyAlarmRanking.busVehicleAlarmRanking.tiredAlarmRankings.length">
                  {{ transportCompanyAlarmRanking.busVehicleAlarmRanking.tiredAlarmTypeName }}</td>
                <!-- </c:if> -->
                <td>{{ item.serialNo }}</td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.companyName }}</td>
                <td>{{ item.vehicleNumber }}</td>
                <td>{{ item.alarmNumber }}</td>
              </tr>
              <!-- </c:forEach>
                </c:if> -->
              <!-- <c:if
                  test="${transportCompanyAlarmRanking.busVehicleAlarmRanking.t25AlarmRankings!=null && transportCompanyAlarmRanking.busVehicleAlarmRanking.t25AlarmRankings.length > 0 }">
                  <c:forEach items="{{ transportCompanyAlarmRanking.busVehicleAlarmRanking.t25AlarmRankings }}" var="item"
                    varStatus="vs"> -->
              <tr
                v-if="transportCompanyAlarmRanking.busVehicleAlarmRanking.t25AlarmRankings != null && transportCompanyAlarmRanking.busVehicleAlarmRanking.t25AlarmRankings.length > 0"
                v-for="item, index in transportCompanyAlarmRanking.busVehicleAlarmRanking.t25AlarmRankings">
                <!-- <c:if test="{{ vs.first }}"> -->
                <!-- ptransportCompanyAlarmRanking -->
                <td v-if="index === 0"
                  :rowspan="transportCompanyAlarmRanking.busVehicleAlarmRanking.t25AlarmRankings.length">
                  {{ transportCompanyAlarmRanking.busVehicleAlarmRanking.t25AlarmTypeName }}</td>
                <!-- </c:if> -->
                <td>{{ item.serialNo }}</td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.companyName }}</td>
                <td>{{ item.vehicleNumber }}</td>
                <td>{{ item.alarmNumber }}</td>
              </tr>
              <!-- </c:forEach>
                </c:if> -->
            </table>
          </div>
          <!-- </c:if> -->
          <!--表格2-->
          <!-- <c:if test="${transportCompanyAlarmRanking.tourVehicleAlarmRanking.speedingAlarmRankings.length > 0
       || transportCompanyAlarmRanking.tourVehicleAlarmRanking.tiredAlarmRankings.length > 0
       || transportCompanyAlarmRanking.tourVehicleAlarmRanking.t25AlarmRankings.length > 0}"> -->
          <div v-if="transportCompanyAlarmRanking.tourVehicleAlarmRanking.speedingAlarmRankings.length > 0
            || transportCompanyAlarmRanking.tourVehicleAlarmRanking.tiredAlarmRankings.length > 0
            || transportCompanyAlarmRanking.tourVehicleAlarmRanking.t25AlarmRankings.length > 0"
            class="tableWrapperList" style="width: 100%; margin-left: 0%">
            <header>{{ data.summaryReportStatisticalYear }}旅游客运车辆违规报警排名</header>
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
                  test="${transportCompanyAlarmRanking.tourVehicleAlarmRanking.speedingAlarmRankings!=null && transportCompanyAlarmRanking.tourVehicleAlarmRanking.speedingAlarmRankings.length > 0 }">
                  <c:forEach items="{{ transportCompanyAlarmRanking.tourVehicleAlarmRanking.speedingAlarmRankings }}"
                    var="item" varStatus="vs"> -->
              <tr
                v-if="transportCompanyAlarmRanking.tourVehicleAlarmRanking.speedingAlarmRankings != null && transportCompanyAlarmRanking.tourVehicleAlarmRanking.speedingAlarmRankings.length > 0"
                v-for="item, index in transportCompanyAlarmRanking.tourVehicleAlarmRanking.speedingAlarmRankings">
                <!-- <c:if test="{{ vs.first }}"> -->
                <td v-if="index === 0"
                  :rowspan="transportCompanyAlarmRanking.tourVehicleAlarmRanking.speedingAlarmRankings.length">
                  {{ transportCompanyAlarmRanking.tourVehicleAlarmRanking.speedingAlarmTypeName }}
                </td>
                <!-- </c:if> -->
                <td>{{ item.serialNo }}</td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.companyName }}</td>
                <td>{{ item.vehicleNumber }}</td>
                <td>{{ item.alarmNumber }}</td>
              </tr>
              <!-- </c:forEach>
                </c:if> -->
              <!-- <c:if
                  test="${transportCompanyAlarmRanking.tourVehicleAlarmRanking.tiredAlarmRankings!=null && transportCompanyAlarmRanking.tourVehicleAlarmRanking.tiredAlarmRankings.length > 0 }">
                  <c:forEach items="{{ transportCompanyAlarmRanking.tourVehicleAlarmRanking.tiredAlarmRankings }}" var="item"
                    varStatus="vs"> -->
              <tr
                v-if="transportCompanyAlarmRanking.tourVehicleAlarmRanking.tiredAlarmRankings != null && transportCompanyAlarmRanking.tourVehicleAlarmRanking.tiredAlarmRankings.length > 0"
                v-for="item,index in transportCompanyAlarmRanking.tourVehicleAlarmRanking.tiredAlarmRankings">
                <!-- <c:if test="{{ vs.first }}"> -->
                  <td v-if="index === 0" :rowspan="transportCompanyAlarmRanking.tourVehicleAlarmRanking.tiredAlarmRankings.length">
                    {{ transportCompanyAlarmRanking.tourVehicleAlarmRanking.tiredAlarmTypeName }}</td>
                <!-- </c:if> -->
                <td>{{ item.serialNo }}</td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.companyName }}</td>
                <td>{{ item.vehicleNumber }}</td>
                <td>{{ item.alarmNumber }}</td>
              </tr>
              <!-- </c:forEach> -->
              <!-- </c:if> -->
              <!-- <c:if
                  test="${transportCompanyAlarmRanking.tourVehicleAlarmRanking.t25AlarmRankings!=null && transportCompanyAlarmRanking.tourVehicleAlarmRanking.t25AlarmRankings.length > 0 }"> -->
              <!-- <c:forEach items="{{ transportCompanyAlarmRanking.tourVehicleAlarmRanking.t25AlarmRankings }}" var="item"
                    varStatus="vs"> -->
              <tr
                v-if="transportCompanyAlarmRanking.tourVehicleAlarmRanking.t25AlarmRankings != null && transportCompanyAlarmRanking.tourVehicleAlarmRanking.t25AlarmRankings.length > 0"
                v-for="item, index in transportCompanyAlarmRanking.tourVehicleAlarmRanking.t25AlarmRankings">
                <!-- // ptransportCompanyAlarmRanking -->
                <!-- <c:if test="{{ vs.first }}"> -->
                <td v-if="index === 0"
                  :rowspan="transportCompanyAlarmRanking.tourVehicleAlarmRanking.t25AlarmRankings.length">
                  {{ transportCompanyAlarmRanking.tourVehicleAlarmRanking.t25AlarmTypeName }}</td>
                <!-- </c:if> -->
                <td>{{ item.serialNo }}</td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.companyName }}</td>
                <td>{{ item.vehicleNumber }}</td>
                <td>{{ item.alarmNumber }}</td>
              </tr>
              <!-- </c:forEach> -->
              <!-- </c:if> -->
            </table>
          </div>
          <!-- </c:if> -->
          <!--表格3-->
          <!-- <c:if test="${transportCompanyAlarmRanking.dangerVehicleAlarmRanking.speedingAlarmRankings.length > 0
       || transportCompanyAlarmRanking.dangerVehicleAlarmRanking.tiredAlarmRankings.length > 0
       || transportCompanyAlarmRanking.dangerVehicleAlarmRanking.t25AlarmRankings.length > 0}"> -->
          <div v-if="transportCompanyAlarmRanking.dangerVehicleAlarmRanking.speedingAlarmRankings.length > 0
            || transportCompanyAlarmRanking.dangerVehicleAlarmRanking.tiredAlarmRankings.length > 0
            || transportCompanyAlarmRanking.dangerVehicleAlarmRanking.t25AlarmRankings.length > 0"
            class="tableWrapperList" style="width: 100%; margin-left: 0%">
            <header>{{ data.summaryReportStatisticalYear }}危险品运输车辆违规报警排名</header>
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
                  test="${transportCompanyAlarmRanking.dangerVehicleAlarmRanking.speedingAlarmRankings!=null && transportCompanyAlarmRanking.dangerVehicleAlarmRanking.speedingAlarmRankings.length > 0 }">
                  <c:forEach items="{{ transportCompanyAlarmRanking.dangerVehicleAlarmRanking.speedingAlarmRankings }}"
                    var="item" varStatus="vs"> -->
              <tr
                v-if="transportCompanyAlarmRanking.dangerVehicleAlarmRanking.speedingAlarmRankings != null && transportCompanyAlarmRanking.dangerVehicleAlarmRanking.speedingAlarmRankings.length > 0"
                v-for="item, index in transportCompanyAlarmRanking.dangerVehicleAlarmRanking.speedingAlarmRankings">
                <!-- <c:if test="{{ vs.first }}"> -->
                <td v-if="index === 0"
                  :rowspan="transportCompanyAlarmRanking.dangerVehicleAlarmRanking.speedingAlarmRankings.length">
                  {{ transportCompanyAlarmRanking.dangerVehicleAlarmRanking.speedingAlarmTypeName }}
                </td>
                <!-- </c:if> -->
                <td>{{ item.serialNo }}</td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.companyName }}</td>
                <td>{{ item.vehicleNumber }}</td>
                <td>{{ item.alarmNumber }}</td>
              </tr>
              <!-- </c:forEach>
                </c:if> -->
              <!-- <c:if
                  test="${transportCompanyAlarmRanking.dangerVehicleAlarmRanking.tiredAlarmRankings!=null && transportCompanyAlarmRanking.dangerVehicleAlarmRanking.tiredAlarmRankings.length > 0 }">
                  <c:forEach items="{{ transportCompanyAlarmRanking.dangerVehicleAlarmRanking.tiredAlarmRankings }}"
                    var="item" varStatus="vs"> -->
              <tr
                v-if="transportCompanyAlarmRanking.dangerVehicleAlarmRanking.tiredAlarmRankings != null && transportCompanyAlarmRanking.dangerVehicleAlarmRanking.tiredAlarmRankings.length > 0"
                v-for="item, index in transportCompanyAlarmRanking.dangerVehicleAlarmRanking.tiredAlarmRankings">
                <!-- <c:if test="{{ vs.first }}"> -->
                <td v-if="index === 0"
                  :rowspan="transportCompanyAlarmRanking.dangerVehicleAlarmRanking.tiredAlarmRankings.length">
                  {{ transportCompanyAlarmRanking.dangerVehicleAlarmRanking.tiredAlarmTypeName }}
                </td>
                <!-- </c:if> -->
                <td>{{ item.serialNo }}</td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.companyName }}</td>
                <td>{{ item.vehicleNumber }}</td>
                <td>{{ item.alarmNumber }}</td>
              </tr>
              <!-- </c:forEach>
                </c:if> -->
              <!-- <c:if
                  test="${transportCompanyAlarmRanking.dangerVehicleAlarmRanking.t25AlarmRankings!=null && transportCompanyAlarmRanking.dangerVehicleAlarmRanking.t25AlarmRankings.length > 0 }">
                  <c:forEach items="{{ transportCompanyAlarmRanking.dangerVehicleAlarmRanking.t25AlarmRankings }}" var="item"
                    varStatus="vs"> -->
              <tr
                v-if="transportCompanyAlarmRanking.dangerVehicleAlarmRanking.t25AlarmRankings != null && transportCompanyAlarmRanking.dangerVehicleAlarmRanking.t25AlarmRankings.length > 0"
                v-for="item, index in transportCompanyAlarmRanking.dangerVehicleAlarmRanking.t25AlarmRankings">
                <!-- <c:if test="{{ vs.first }}"> -->
                <td v-if="index === 0"
                  :rowspan="transportCompanyAlarmRanking.dangerVehicleAlarmRanking.t25AlarmRankings.length">
                  {{ transportCompanyAlarmRanking.dangerVehicleAlarmRanking.t25AlarmTypeName }}</td>
                <!-- </c:if> -->
                <td>{{ item.serialNo }}</td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.companyName }}</td>
                <td>{{ item.vehicleNumber }}</td>
                <td>{{ item.alarmNumber }}</td>
              </tr>
              <!-- </c:forEach>
                </c:if> -->
            </table>
          </div>
          <!-- </c:if> -->
          <!--表格4-->
          <!-- <c:if test="${transportCompanyAlarmRanking.goodsVehicleAlarmRanking.speedingAlarmRankings.length > 0
       || transportCompanyAlarmRanking.goodsVehicleAlarmRanking.tiredAlarmRankings.length > 0
       || transportCompanyAlarmRanking.goodsVehicleAlarmRanking.t25AlarmRankings.length > 0}"> -->
          <div v-if="transportCompanyAlarmRanking.goodsVehicleAlarmRanking.speedingAlarmRankings.length > 0
            || transportCompanyAlarmRanking.goodsVehicleAlarmRanking.tiredAlarmRankings.length > 0
            || transportCompanyAlarmRanking.goodsVehicleAlarmRanking.t25AlarmRankings.length > 0"
            class="tableWrapperList" style="width: 100%; margin-left: 0%">
            <header>{{ data.summaryReportStatisticalYear }}普通货物运输车辆违规报警排名</header>
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
                  test="${transportCompanyAlarmRanking.goodsVehicleAlarmRanking.speedingAlarmRankings!=null && transportCompanyAlarmRanking.goodsVehicleAlarmRanking.speedingAlarmRankings.length > 0 }">
                  <c:forEach items="{{ transportCompanyAlarmRanking.goodsVehicleAlarmRanking.speedingAlarmRankings }}"
                    var="item" varStatus="vs"> -->
              <tr
                v-if="transportCompanyAlarmRanking.goodsVehicleAlarmRanking.speedingAlarmRankings != null && transportCompanyAlarmRanking.goodsVehicleAlarmRanking.speedingAlarmRankings.length > 0"
                v-for="item, index in transportCompanyAlarmRanking.goodsVehicleAlarmRanking.speedingAlarmRankings">
                <!-- <c:if test="{{ vs.first }}"> -->
                <td v-if="index === 0"
                  :rowspan="transportCompanyAlarmRanking.goodsVehicleAlarmRanking.speedingAlarmRankings.length">
                  {{ transportCompanyAlarmRanking.goodsVehicleAlarmRanking.speedingAlarmTypeName }}
                </td>
                <!-- </c:if> -->
                <td>{{ item.serialNo }}</td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.companyName }}</td>
                <td>{{ item.vehicleNumber }}</td>
                <td>{{ item.alarmNumber }}</td>
              </tr>
              <!-- </c:forEach>
                </c:if> -->
              <!-- <c:if
                  test="${transportCompanyAlarmRanking.goodsVehicleAlarmRanking.tiredAlarmRankings!=null && transportCompanyAlarmRanking.goodsVehicleAlarmRanking.tiredAlarmRankings.length > 0 }">
                  <c:forEach items="{{ transportCompanyAlarmRanking.goodsVehicleAlarmRanking.tiredAlarmRankings }}"
                    var="item" varStatus="vs"> -->
              <tr
                v-if="transportCompanyAlarmRanking.goodsVehicleAlarmRanking.tiredAlarmRankings != null && transportCompanyAlarmRanking.goodsVehicleAlarmRanking.tiredAlarmRankings.length > 0"
                v-for="item, index in transportCompanyAlarmRanking.goodsVehicleAlarmRanking.tiredAlarmRankings">
                <!-- <c:if test="{{ vs.first }}"> -->
                <td v-if="index === 0"
                  :rowspan="transportCompanyAlarmRanking.goodsVehicleAlarmRanking.tiredAlarmRankings.length">
                  {{ transportCompanyAlarmRanking.goodsVehicleAlarmRanking.tiredAlarmTypeName }}</td>
                <!-- </c:if> -->
                <td>{{ item.serialNo }}</td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.companyName }}</td>
                <td>{{ item.vehicleNumber }}</td>
                <td>{{ item.alarmNumber }}</td>
              </tr>
              <!-- </c:forEach>
                </c:if> -->
              <!-- <c:if
                  test="${transportCompanyAlarmRanking.goodsVehicleAlarmRanking.t25AlarmRankings!=null && transportCompanyAlarmRanking.goodsVehicleAlarmRanking.t25AlarmRankings.length > 0 }">
                  <c:forEach items="{{ transportCompanyAlarmRanking.goodsVehicleAlarmRanking.t25AlarmRankings }}" var="item"
                    varStatus="vs"> -->
              <tr
                v-if="transportCompanyAlarmRanking.goodsVehicleAlarmRanking.t25AlarmRankings != null && transportCompanyAlarmRanking.goodsVehicleAlarmRanking.t25AlarmRankings.length > 0"
                v-for="item, index in transportCompanyAlarmRanking.goodsVehicleAlarmRanking.t25AlarmRankings">
                <!-- <c:if test="{{ vs.first }}"> -->
                <!-- // ptransportCompanyAlarmRanking -->
                <td v-if="index === 0"
                  :rowspan="transportCompanyAlarmRanking.goodsVehicleAlarmRanking.t25AlarmRankings.length">
                  {{ transportCompanyAlarmRanking.goodsVehicleAlarmRanking.t25AlarmTypeName }}</td>
                <!-- </c:if> -->
                <td>{{ item.serialNo }}</td>
                <td>{{ item.areaName }}</td>
                <td>{{ item.companyName }}</td>
                <td>{{ item.vehicleNumber }}</td>
                <td>{{ item.alarmNumber }}</td>
              </tr>
              <!-- </c:forEach>
                </c:if> -->
            </table>
          </div>
          <!-- </c:if> -->
        </div>
      </div>
    </div>
    <!-- <%--四、营运车辆报警处警情况--%> -->
    <div class="fullpage" id="text2">
      <h4>三、营运车辆违规报警情况</h4>
      <p class="textStyle margin-tm text-in">
        {{ handlingAlarmInfo }}
      </p>
    </div>
    <!-- <%--五、智能设备试点使用情况--%> -->
    <!-- <c:if test="{{ intelligentEquipmentInfo.hasMomenta }}"> -->
    <div v-if="intelligentEquipmentInfo.hasMomenta" class="fullpage" id="text2">
      <h4>四、智能设备试点使用情况</h4>
      <div>
        <p class="textStyle margin-tm text-in">
          {{ mentInfo }}
        </p>
      </div>
      <div>
        <div class="echartWrapper margin-tm h400" id="chartContainer20"></div>
      </div>
      <div>
        <p class="textStyle margin-tm text-in">
          {{ data.summaryReportStatisticalYear }}1月-12月期间人工智能设备监测报警环比数据情况如下图：
        </p>
        <div class="echartWrapper margin-tm h400" id="chartContainer21"></div>
      </div>
    </div>
    <!-- </c:if> -->
    <form id="downloadForm" :action="`/api/statistics/briefReport/download?briefId=${data.summaryReportId}`" method="post"
      target="_blank">
    </form>
  </div>
</template>

<script setup lang="tsx">
import * as echarts from "echarts";
const { title, data, download } = defineProps({
  title: { type: String, default: () => '' },
  data: { type: Object, default: () => [] },
  download: { type: Function, defualt: () => { } }
})

let { baseAlarmInfo, handlingAlarmInfo, intelligentEquipmentInfo, qualityInfo, summaryCityName, summaryReportGenerateDate, summaryReportStatisticalYear, vehicleAlarmInfo, baseName, baseName2, baseCompanyNumber, baseVehicleNumber, chartContainer1Values, chartContainer2Values, busVehicleNumber, tourVehicleNumber, dangerVehicleNumber, goodsVehicleNumber, totalVehicleNumbers, allXAxisData, alllegendData, legendData, seriesData, mentInfo } = data
const { companyList, importantVehicleTypeInfoList, vehicleList } = baseAlarmInfo
const { alarmNumberList } = intelligentEquipmentInfo
const { companyAlarmRanking, districtVehicleAlarmRanking, transportCompanyAlarmRanking, vehicleAlarmRatio, vehicleAlarmTrendAnalysis } = vehicleAlarmInfo
console.log(data, 'data')

let busVehicleNumbers = busVehicleNumber
let tourVehicleNumbers = tourVehicleNumber
let dangerVehicleNumbers = dangerVehicleNumber
let goodsVehicleNumbers = goodsVehicleNumber

let speedingVehicleAlarmNumber = (vehicleAlarmRatio.busSpeedingVehicleAlarmNumber == '0'
  && vehicleAlarmRatio.tourSpeedingVehicleAlarmNumber == '0'
  && vehicleAlarmRatio.dangerSpeedingVehicleAlarmNumber == '0')
let tiredVehicleAlarmNumber = (vehicleAlarmRatio.busTiredVehicleAlarmNumber == '0'
  && vehicleAlarmRatio.tourTiredVehicleAlarmNumber == '0'
  && vehicleAlarmRatio.dangerTiredVehicleAlarmNumber == '0')
let t25VehicleAlarmNumber = (vehicleAlarmRatio.busT25VehicleAlarmNumber == '0'
  && vehicleAlarmRatio.tourT25VehicleAlarmNumber == '0'
  && vehicleAlarmRatio.dangerT25VehicleAlarmNumber == '0')

let busQuarterAlarmNumber = vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busFirstQuarterAlarmNumber != '0' ||
  vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busSecondQuarterAlarmNumber != '0' ||
  vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busThirdQuarterAlarmNumber != '0' ||
  vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busFourthQuarterAlarmNumber != '0'
let tourQuarterAlarmNumber = vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourFirstQuarterAlarmNumber != '0' ||
  vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourSecondQuarterAlarmNumber != '0' ||
  vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourThirdQuarterAlarmNumber != '0' ||
  vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourFourthQuarterAlarmNumber != '0'
let dangerQuarterAlarmNumber = vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerFirstQuarterAlarmNumber != '0' ||
  vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerSecondQuarterAlarmNumber != '0' ||
  vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerThirdQuarterAlarmNumber != '0' ||
  vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerFourthQuarterAlarmNumber != '0'
let goodsQuarterAlarmNumber = vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsFirstQuarterAlarmNumber != '0' ||
  vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsSecondQuarterAlarmNumber != '0' ||
  vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsThirdQuarterAlarmNumber != '0' ||
  vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsFourthQuarterAlarmNumber != '0'


onMounted(() => {
  (function () {
    var PER_PIC_SIZE = 60000;
    const downloadForm = document.querySelector("#downloadForm")
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
        downloadForm && downloadForm.append('<input type="hidden" name="' + paramName + i + '" value="' + data + '" />');
      }
    }

    document.querySelector("#downloadDoc").addEventListener('click', function () {
      downloadForm && (downloadForm.innerHTML = '');
      // download && download()
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
      getPicData("chartContainer11", "char11Data");
      getPicData("chartContainer12", "char12Data");
      getPicData("chartContainer13", "char13Data");
      getPicData("chartContainer14", "char14Data");
      getPicData("chartContainer15", "char15Data");
      getPicData("chartContainer16", "char16Data");
      getPicData("chartContainer17", "char17Data");
      getPicData("chartContainer18", "char18Data");
      getPicData("chartContainer19", "char19Data");
      getPicData("chartContainer20", "char20Data");
      getPicData("chartContainer21", "char21Data");
      downloadForm && downloadForm.submit();
    });
  })();
  //1.1道路运输企业分布情况
  initChartContainer1();
  //1.2营运车辆分布情况
  initChartContainer2();
  //1.3营运车辆分类占比
  initChartContainer3();
  //1.4重点营运车辆分布情况
  initChartContainer4();
  //2.1营运车辆违规报警分类占比
  initChartContainer5();
  //2.2重点营运车辆违规报警分类情况
  initChartContainer6();
  //2.3重点营运车辆违规报警分类占比
  initChartContainer7();
  //2.1.1班线客运车辆违规报警分类占比
  initChartContainer8();
  //2.1.2旅游客运车辆违规报警分类占比
  initChartContainer9();
  //2.1.3危险品运输车辆违规报警分类占比
  initChartContainer10();
  //2.1.4普通货物运输车辆违规报警情况统计
  initChartContainer11();
  //2.2.1 2017年营运车辆违规报警次数趋势分析
  initChartContainer12();
  //2.2.22018年营运车辆违规报警均值趋势分析
  initChartContainer13();

  //2.2.3 2017年营运车辆超速报警次数趋势分析
  initChartContainer14();
  //2.2.4 2018年营运车辆超速报警均值趋势分析
  initChartContainer15();
  //2.2.5 2017年营运车辆疲劳驾驶报警次数趋势分析
  initChartContainer16();
  //2.2.6 2018年营运车辆疲劳驾驶报警均值趋势分析
  initChartContainer17();
  //2.2.7 2017年营运车辆凌晨2-5点禁驾报警次数趋势分析
  initChartContainer18();
  //2.2.8 2018年营运车辆凌晨2-5点禁驾报警均值趋势分析
  initChartContainer19();
  //2017年营运车辆驾驶员违规行为占比
  initChartContainer20();
  //智能设备报警次数环比情况

  initChartContainer21();

  function initChartContainer1() {
    var xAxisData = baseName,
      legendData = [{ name: '企业户数', icon: 'square' }],
      seriesData = [
        {
          name: '企业户数',
          type: 'bar',
          barGap: 0,
          barWidth: 20,
          data: baseCompanyNumber,
          label: {
            normal: {
              show: true,
              position: 'top',
              color: '#000000'
            }
          }
        }];
    var config = {
      containerId: 'chartContainer1',
      title: '道路运输企业分布情况',
      legendData: legendData,
      xAxisData: xAxisData,
      seriesData: seriesData,
      color: ['#5B9BD5']
    }
    initRectangleChartContainer2(config);
  }

  function initChartContainer2() {
    var xAxisData = baseName2,
      legendData = [{ name: '车辆台数', icon: 'square' }],
      seriesData = [
        {
          name: '车辆台数',
          type: 'bar',
          barGap: 0,
          barWidth: 20,
          data: baseVehicleNumber,
          label: {
            normal: {
              show: true,
              position: 'top',
              color: '#000000'
            }
          }
        }];
    var config = {
      containerId: 'chartContainer2',
      title: '营运车辆分布情况',
      legendData: legendData,
      xAxisData: xAxisData,
      seriesData: seriesData,
      color: ['#5B9BD5']
    }
    initRectangleChartContainer2(config);
  }

  function initChartContainer3() {
    var allLegendData = [{ name: '班线客运', icon: 'square' },
    { name: '旅游客运', icon: 'square' },
    { name: '危运', icon: 'square' },
    { name: '普通货运', icon: 'square' }];
    var allSeriesData = chartContainer1Values;

    var showLegendData = [];
    var showSeriesData = [];
    var busVehicleNumber = data.baseAlarmInfo.busVehicleNumber;
    if ((busVehicleNumber !== "") && (busVehicleNumber !== "0")) {
      showLegendData.push(allLegendData[0]);
      showSeriesData.push(allSeriesData[0]);
    }
    var tourVehicleNumber = data.baseAlarmInfo.tourVehicleNumber;
    if ((tourVehicleNumber !== "") && (tourVehicleNumber !== "0")) {
      showLegendData.push(allLegendData[1]);
      showSeriesData.push(allSeriesData[1]);
    }
    var dangerVehicleNumber = data.baseAlarmInfo.dangerVehicleNumber;
    if ((dangerVehicleNumber !== "") && (dangerVehicleNumber !== "0")) {
      showLegendData.push(allLegendData[2]);
      showSeriesData.push(allSeriesData[2]);
    }
    var goodsVehicleNumber = data.baseAlarmInfo.goodsVehicleNumber;
    if ((goodsVehicleNumber !== "") && (goodsVehicleNumber !== "0")) {
      showLegendData.push(allLegendData[3]);
      showSeriesData.push(allSeriesData[3]);
    }

    var color = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000'];
    if (showSeriesData.length == 3) {
      color = ['#5B9BD5', '#ED7D31', '#FFC000'];
    }

    var config = {
      containerId: 'chartContainer3',
      title: '营运车辆分类占比',
      legendData: showLegendData,
      seriesData: showSeriesData,
      color: color
    }
    initPieChartContainer(config);
  }

  function initChartContainer4() {
    let busVehicleNumbers = busVehicleNumber,
      tourVehicleNumbers = tourVehicleNumber,
      dangerVehicleNumbers = dangerVehicleNumber,
      allLegendData = [{ name: '班线客运', icon: 'square' },
      { name: '旅游客运', icon: 'square' },
      { name: '危运', icon: 'square' }],
      allSeriesData =
        [{ name: '班线客运', type: 'bar', barGap: 0, barWidth: 6, data: busVehicleNumbers },
        { name: '旅游客运', type: 'bar', barWidth: 6, data: tourVehicleNumbers },
        { name: '危运', type: 'bar', barWidth: 6, data: dangerVehicleNumbers }
        ],
      legendData = [],
      seriesData = [];

    // var busVehicleNumber = data.baseAlarmInfo.busVehicleNumber;
    if ((busVehicleNumber !== "") && (busVehicleNumber !== "0")) {
      legendData.push(allLegendData[0]);
      seriesData.push(allSeriesData[0]);
    }
    // var tourVehicleNumber = data.baseAlarmInfo.tourVehicleNumber;
    if ((tourVehicleNumber !== "") && (tourVehicleNumber !== "0")) {
      legendData.push(allLegendData[1]);
      seriesData.push(allSeriesData[1]);
    }
    // var dangerVehicleNumber = data.baseAlarmInfo.dangerVehicleNumber;
    if ((dangerVehicleNumber !== "") && (dangerVehicleNumber !== "0")) {
      legendData.push(allLegendData[2]);
      seriesData.push(allSeriesData[2]);
    }


    console.error(legendData, allXAxisData, seriesData)
    var config = {
      containerId: 'chartContainer4',
      title: '重点营运车辆分布情况',
      legendData: legendData,
      xAxisData: allXAxisData,
      seriesData: seriesData,
      color: ['#5B9BD5', '#ED7D31', '#A5A5A5']
    }
    initRectangleChartContainer2(config);
  }

  function initChartContainer5() {
    var allLegendData = [{ name: '班线客运', icon: 'square' },
    { name: '旅游客运', icon: 'square' },
    { name: '危运', icon: 'square' },
    { name: '普通货运', icon: 'square' }];
    var allSeriesData = chartContainer2Values;

    var showLegendData = [];
    var showSeriesData = [];
    var busVehicleNumber = vehicleAlarmRatio.busVehicleAlarmNumber;
    if ((busVehicleNumber !== "") && (busVehicleNumber !== "0")) {
      showLegendData.push(allLegendData[0]);
      showSeriesData.push(allSeriesData[0]);
    }
    var tourVehicleNumber = vehicleAlarmRatio.tourVehicleAlarmNumber;
    if ((tourVehicleNumber !== "") && (tourVehicleNumber !== "0")) {
      showLegendData.push(allLegendData[1]);
      showSeriesData.push(allSeriesData[1]);
    }
    var dangerVehicleNumber = vehicleAlarmRatio.dangerVehicleAlarmNumber;
    if ((dangerVehicleNumber !== "") && (dangerVehicleNumber !== "0")) {
      showLegendData.push(allLegendData[2]);
      showSeriesData.push(allSeriesData[2]);
    }
    var goodsVehicleNumber = vehicleAlarmRatio.goodsVehicleAlarmNumber;
    if ((goodsVehicleNumber !== "") && (goodsVehicleNumber !== "0")) {
      showLegendData.push(allLegendData[3]);
      showSeriesData.push(allSeriesData[3]);
    }

    var color = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000'];
    if (showSeriesData.length == 3) {
      color = ['#5B9BD5', '#ED7D31', '#FFC000'];
    }

    var config = {
      containerId: 'chartContainer5',
      title: '营运车辆违规报警分类占比',
      legendData: showLegendData,
      seriesData: showSeriesData,
      color: color
    }
    initPieChartContainer(config);
  }

  function initChartContainer6() {

    var xAxisData = ['超速报警', '疲劳驾驶', '凌晨2-5点禁驾', '合计'],
      busVehicleNumbers = [],
      tourVehicleNumbers = [],
      dangerVehicleNumbers = [],
      alllegendData = [{ name: '超速报警', icon: 'square' },
      { name: '疲劳驾驶', icon: 'square' },
      { name: '凌晨2-5点禁驾', icon: 'square' },
      { name: '合计', icon: 'square' }],
      legendData = [],
      seriesData = [];

    if ((vehicleAlarmRatio.busTotalVehicleAlarmNumber > "0")) {
      busVehicleNumbers.push(vehicleAlarmRatio.busSpeedingVehicleAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmRatio.busTiredVehicleAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmRatio.busT25VehicleAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmRatio.busTotalVehicleAlarmNumber);
      legendData.push(alllegendData[0]);
      seriesData.push({ name: '班线客运', type: 'bar', barGap: 0, barWidth: 16, data: busVehicleNumbers })

    }
    if ((vehicleAlarmRatio.tourTotalVehicleAlarmNumber > "0")) {
      tourVehicleNumbers.push(vehicleAlarmRatio.tourSpeedingVehicleAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmRatio.tourTiredVehicleAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmRatio.tourT25VehicleAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmRatio.tourTotalVehicleAlarmNumber);
      legendData.push(alllegendData[1]);
      seriesData.push({ name: '旅游客运', type: 'bar', barWidth: 16, data: tourVehicleNumbers })
    }
    if ((vehicleAlarmRatio.dangerTotalVehicleAlarmNumber > "0")) {
      dangerVehicleNumbers.push(vehicleAlarmRatio.dangerSpeedingVehicleAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmRatio.dangerTiredVehicleAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmRatio.dangerT25VehicleAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmRatio.dangerTotalVehicleAlarmNumber);
      legendData.push(alllegendData[2]);
      seriesData.push({ name: '危运', type: 'bar', barWidth: 16, data: dangerVehicleNumbers })
    }

    var color = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000'];
    if (seriesData.length == 3) {
      color = ['#5B9BD5', '#ED7D31', '#FFC000'];
    }
    var config = {
      containerId: 'chartContainer6',
      title: '重点营运车辆违规报警分类情况',
      legendData: legendData,
      xAxisData: xAxisData,
      seriesData: seriesData,
      color: color
    };
    initRectangleChartContainer2(config);
  }

  function initChartContainer7() {
    var allLegendData = [{ name: '班线客运', icon: 'square' },
    { name: '旅游客运', icon: 'square' },
    { name: '危运', icon: 'square' }];
    var allSeriesData = [
      { value: vehicleAlarmRatio.busTotalVehicleAlarmNumber, name: '班线客运' },
      { value: vehicleAlarmRatio.tourTotalVehicleAlarmNumber, name: '旅游客运' },
      { value: vehicleAlarmRatio.dangerTotalVehicleAlarmNumber, name: '危运' }
    ];

    var showLegendData = [];
    var showSeriesData = [];
    var busVehicleNumber = vehicleAlarmRatio.busTotalVehicleAlarmNumber;
    if ((busVehicleNumber !== "") && (busVehicleNumber !== "0")) {
      showLegendData.push(allLegendData[0]);
      showSeriesData.push(allSeriesData[0]);
    }
    var tourVehicleNumber = vehicleAlarmRatio.tourTotalVehicleAlarmNumber;
    if ((tourVehicleNumber !== "") && (tourVehicleNumber !== "0")) {
      showLegendData.push(allLegendData[1]);
      showSeriesData.push(allSeriesData[1]);
    }
    var dangerVehicleNumber = vehicleAlarmRatio.dangerTotalVehicleAlarmNumber;
    if ((dangerVehicleNumber !== "") && (dangerVehicleNumber !== "0")) {
      showLegendData.push(allLegendData[2]);
      showSeriesData.push(allSeriesData[2]);
    }

    var color = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000'];
    if (showSeriesData.length == 3) {
      color = ['#5B9BD5', '#ED7D31', '#FFC000'];
    }

    var config = {
      containerId: 'chartContainer7',
      title: '重点营运车辆违规报警分类占比',
      legendData: showLegendData,
      seriesData: showSeriesData,
      color: color
    }
    initPieChartContainer(config);
  }

  function initChartContainer8() {
    var allLegendData = [{ name: '超速报警', icon: 'square' },
    { name: '疲劳驾驶报警', icon: 'square' },
    { name: '凌晨2-5点禁行报警', icon: 'square' }];
    var allSeriesData = [
      { value: vehicleAlarmRatio.busVehicleAlarmInfo.speedingAlarmNumber, name: '超速报警' },
      { value: vehicleAlarmRatio.busVehicleAlarmInfo.tiredAlarmNumber, name: '疲劳驾驶报警' },
      { value: vehicleAlarmRatio.busVehicleAlarmInfo.t25AlarmNumber, name: '凌晨2-5点禁行报警' }
    ];

    var showLegendData = [];
    var showSeriesData = [];
    var speedingAlarmNumber = vehicleAlarmRatio.busVehicleAlarmInfo.speedingAlarmNumber;
    if ((speedingAlarmNumber !== "") && (speedingAlarmNumber !== "0")) {
      showLegendData.push(allLegendData[0]);
      showSeriesData.push(allSeriesData[0]);
    }
    var tiredAlarmNumber = vehicleAlarmRatio.busVehicleAlarmInfo.tiredAlarmNumber;
    if ((tiredAlarmNumber !== "") && (tiredAlarmNumber !== "0")) {
      showLegendData.push(allLegendData[1]);
      showSeriesData.push(allSeriesData[1]);
    }
    var t25AlarmNumber = vehicleAlarmRatio.busVehicleAlarmInfo.t25AlarmNumber;
    if ((t25AlarmNumber !== "") && (t25AlarmNumber !== "0")) {
      showLegendData.push(allLegendData[2]);
      showSeriesData.push(allSeriesData[2]);
    }

    var color = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000'];
    if (showSeriesData.length == 3) {
      color = ['#5B9BD5', '#ED7D31', '#FFC000'];
    }

    var config = {
      containerId: 'chartContainer8',
      title: '班线客运车辆违规报警分类占比',
      legendData: showLegendData,
      seriesData: showSeriesData,
      color: color
    }
    initPieChartContainer(config);
  }

  function initChartContainer9() {
    var allLegendData = [{ name: '超速报警', icon: 'square' },
    { name: '疲劳驾驶报警', icon: 'square' },
    { name: '凌晨2-5点禁行报警', icon: 'square' }];
    var allSeriesData = [
      { value: vehicleAlarmRatio.tourVehicleAlarmInfo.speedingAlarmNumber, name: '超速报警' },
      { value: vehicleAlarmRatio.tourVehicleAlarmInfo.tiredAlarmNumber, name: '疲劳驾驶报警' },
      { value: vehicleAlarmRatio.tourVehicleAlarmInfo.t25AlarmNumber, name: '凌晨2-5点禁行报警' }
    ];

    var showLegendData = [];
    var showSeriesData = [];
    var speedingAlarmNumber = vehicleAlarmRatio.tourVehicleAlarmInfo.speedingAlarmNumber;
    if ((speedingAlarmNumber !== "") && (speedingAlarmNumber !== "0")) {
      showLegendData.push(allLegendData[0]);
      showSeriesData.push(allSeriesData[0]);
    }
    var tiredAlarmNumber = vehicleAlarmRatio.tourVehicleAlarmInfo.tiredAlarmNumber;
    if ((tiredAlarmNumber !== "") && (tiredAlarmNumber !== "0")) {
      showLegendData.push(allLegendData[1]);
      showSeriesData.push(allSeriesData[1]);
    }
    var t25AlarmNumber = vehicleAlarmRatio.tourVehicleAlarmInfo.t25AlarmNumber;
    if ((t25AlarmNumber !== "") && (t25AlarmNumber !== "0")) {
      showLegendData.push(allLegendData[2]);
      showSeriesData.push(allSeriesData[2]);
    }

    var color = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000'];
    if (showSeriesData.length == 3) {
      color = ['#5B9BD5', '#ED7D31', '#FFC000'];
    }

    var config = {
      containerId: 'chartContainer9',
      title: '旅游客运车辆违规报警分类占比',
      legendData: showLegendData,
      seriesData: showSeriesData,
      color: color
    }
    initPieChartContainer(config);
  }

  function initChartContainer10() {
    var allLegendData = [{ name: '超速报警', icon: 'square' },
    { name: '疲劳驾驶报警', icon: 'square' },
    { name: '凌晨2-5点禁行报警', icon: 'square' }];
    var allSeriesData = [
      { value: vehicleAlarmRatio.dangerVehicleAlarmInfo.speedingAlarmNumber, name: '超速报警' },
      { value: vehicleAlarmRatio.dangerVehicleAlarmInfo.tiredAlarmNumber, name: '疲劳驾驶报警' },
      { value: vehicleAlarmRatio.dangerVehicleAlarmInfo.t25AlarmNumber, name: '凌晨2-5点禁行报警' }
    ];

    var showLegendData = [];
    var showSeriesData = [];
    var speedingAlarmNumber = vehicleAlarmRatio.dangerVehicleAlarmInfo.speedingAlarmNumber;
    if ((speedingAlarmNumber !== "") && (speedingAlarmNumber !== "0")) {
      showLegendData.push(allLegendData[0]);
      showSeriesData.push(allSeriesData[0]);
    }
    var tiredAlarmNumber = vehicleAlarmRatio.dangerVehicleAlarmInfo.tiredAlarmNumber;
    if ((tiredAlarmNumber !== "") && (tiredAlarmNumber !== "0")) {
      showLegendData.push(allLegendData[1]);
      showSeriesData.push(allSeriesData[1]);
    }
    var t25AlarmNumber = vehicleAlarmRatio.dangerVehicleAlarmInfo.t25AlarmNumber;
    if ((t25AlarmNumber !== "") && (t25AlarmNumber !== "0")) {
      showLegendData.push(allLegendData[2]);
      showSeriesData.push(allSeriesData[2]);
    }

    var color = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000'];
    if (showSeriesData.length == 3) {
      color = ['#5B9BD5', '#ED7D31', '#FFC000'];
    }

    var config = {
      containerId: 'chartContainer10',
      title: '危险品运输车辆违规报警分类占比',
      legendData: showLegendData,
      seriesData: showSeriesData,
      color: color
    };
    if (showSeriesData.length > 0) {
      initPieChartContainer(config);
    }

  }

  function initChartContainer11() {
    var allLegendData = [{ name: '超速报警', icon: 'square' },
    { name: '疲劳驾驶报警', icon: 'square' },
    { name: '凌晨2-5点禁行报警', icon: 'square' }];
    var allSeriesData = [
      { value: vehicleAlarmRatio.goodsVehicleAlarmInfo.speedingAlarmNumber, name: '超速报警' },
      { value: vehicleAlarmRatio.goodsVehicleAlarmInfo.tiredAlarmNumber, name: '疲劳驾驶报警' },
      { value: vehicleAlarmRatio.goodsVehicleAlarmInfo.t25AlarmNumber, name: '凌晨2-5点禁行报警' }
    ];

    var showLegendData = [];
    var showSeriesData = [];
    var speedingAlarmNumber = vehicleAlarmRatio.goodsVehicleAlarmInfo.speedingAlarmNumber;
    if ((speedingAlarmNumber !== "") && (speedingAlarmNumber !== "0")) {
      showLegendData.push(allLegendData[0]);
      showSeriesData.push(allSeriesData[0]);
    }
    var tiredAlarmNumber = vehicleAlarmRatio.goodsVehicleAlarmInfo.tiredAlarmNumber;
    if ((tiredAlarmNumber !== "") && (tiredAlarmNumber !== "0")) {
      showLegendData.push(allLegendData[1]);
      showSeriesData.push(allSeriesData[1]);
    }
    var t25AlarmNumber = vehicleAlarmRatio.goodsVehicleAlarmInfo.t25AlarmNumber;
    if ((t25AlarmNumber !== "") && (t25AlarmNumber !== "0")) {
      showLegendData.push(allLegendData[2]);
      showSeriesData.push(allSeriesData[2]);
    }

    var color = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000'];
    if (showSeriesData.length == 3) {
      color = ['#5B9BD5', '#ED7D31', '#FFC000'];
    }

    var config = {
      containerId: 'chartContainer11',
      title: '普通货物运输车辆违规报警情况统计',
      legendData: showLegendData,
      seriesData: showSeriesData,
      color: color
    }
    if (showSeriesData.length > 0) {
      initPieChartContainer(config);
    }
  }

  function initChartContainer12() {

    var xAxisData = ['第一季度(1-3)月', '第二季度(4-6)月', '第三季度(7-9)月', '第四季度(10-12)月'],
      allColor = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000', '#2858ff'],
      color = [];
    busVehicleNumbers = [],
      tourVehicleNumbers = [],
      dangerVehicleNumbers = [],
      goodsVehicleNumbers = [],
      totalVehicleNumbers = [],
      alllegendData = [{ name: '班线报警', icon: 'square' },
      { name: '旅游报警', icon: 'square' },
      { name: '危运报警', icon: 'square' },
      { name: '普货报警', icon: 'square' },
      { name: '合计', icon: 'square' }],
      legendData = [],
      seriesData = [];

    if (vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busFirstQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busSecondQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busThirdQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busFourthQuarterAlarmNumber != "0") {
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busFirstQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busSecondQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busThirdQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.busFourthQuarterAlarmNumber);
      legendData.push(alllegendData[0]);
      color.push(allColor[0]);
      seriesData.push({ name: '班线报警', type: 'line', data: busVehicleNumbers })

    }

    if (vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourFirstQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourSecondQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourThirdQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourFourthQuarterAlarmNumber != "0") {
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourFirstQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourSecondQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourThirdQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.tourFourthQuarterAlarmNumber);
      legendData.push(alllegendData[1]);
      color.push(allColor[1]);
      seriesData.push({ name: '旅游报警', type: 'line', data: tourVehicleNumbers })
    }

    if (vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerFirstQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerSecondQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerThirdQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerFourthQuarterAlarmNumber != "0"
    ) {
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerFirstQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerSecondQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerThirdQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.dangerFourthQuarterAlarmNumber);
      legendData.push(alllegendData[2]);
      color.push(allColor[2]);
      seriesData.push({ name: '危运报警', type: 'line', data: dangerVehicleNumbers })
    }

    if (vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsFirstQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsSecondQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsThirdQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsFourthQuarterAlarmNumber != "0") {
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsFirstQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsSecondQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsThirdQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.goodsFourthQuarterAlarmNumber);
      legendData.push(alllegendData[3]);
      color.push(allColor[3]);
      seriesData.push({ name: '普货报警', type: 'line', data: goodsVehicleNumbers })
    }

    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.totalFirstQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.totalSecondQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.totalThirdQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmNumberTrendAnalysis.totalFourthQuarterAlarmNumber);
    legendData.push(alllegendData[4]);
    color.push(allColor[4]);
    seriesData.push({ name: '合计', type: 'line', data: totalVehicleNumbers })

    var title = document.querySelector("#year").innerHTML + "营运车辆违规报警次数趋势分析";
    var config = {
      containerId: 'chartContainer12',
      title: title,
      legendData: legendData,
      xAxisData: xAxisData,
      seriesData: seriesData,
      color: color
    };
    initRectangleChartContainer2(config);
  }

  function initChartContainer13() {

    var xAxisData = ['第一季度(1-3)月', '第二季度(4-6)月', '第三季度(7-9)月', '第四季度(10-12)月'],
      allColor = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000', '#2858ff'],
      color = [];
    busVehicleNumbers = [],
      tourVehicleNumbers = [],
      dangerVehicleNumbers = [],
      goodsVehicleNumbers = [],
      totalVehicleNumbers = [],
      alllegendData = [{ name: '班线报警', icon: 'square' },
      { name: '旅游报警', icon: 'square' },
      { name: '危运报警', icon: 'square' },
      { name: '普货报警', icon: 'square' },
      { name: '合计', icon: 'square' }],
      legendData = [],
      seriesData = [];

    if (vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.busFirstQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.busSecondQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.busThirdQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.busFourthQuarterAlarmNumber != "0.00") {
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.busFirstQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.busSecondQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.busThirdQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.busFourthQuarterAlarmNumber);
      legendData.push(alllegendData[0]);
      color.push(allColor[0]);
      seriesData.push({ name: '班线报警', type: 'line', data: busVehicleNumbers })

    }

    if (vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.tourFirstQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.tourSecondQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.tourThirdQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.tourFourthQuarterAlarmNumber != "0.00") {
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.tourFirstQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.tourSecondQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.tourThirdQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.tourFourthQuarterAlarmNumber);
      legendData.push(alllegendData[1]);
      color.push(allColor[1]);
      seriesData.push({ name: '旅游报警', type: 'line', data: tourVehicleNumbers })
    }

    if (vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.dangerFirstQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.dangerSecondQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.dangerThirdQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.dangerFourthQuarterAlarmNumber != "0.00"
    ) {
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.dangerFirstQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.dangerSecondQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.dangerThirdQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.dangerFourthQuarterAlarmNumber);
      legendData.push(alllegendData[2]);
      color.push(allColor[2]);
      seriesData.push({ name: '危运报警', type: 'line', data: dangerVehicleNumbers })
    }

    if (vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.goodsFirstQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.goodsSecondQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.goodsThirdQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.goodsFourthQuarterAlarmNumber != "0.00") {
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.goodsFirstQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.goodsSecondQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.goodsThirdQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.goodsFourthQuarterAlarmNumber);
      legendData.push(alllegendData[3]);
      color.push(allColor[3]);
      seriesData.push({ name: '普货报警', type: 'line', data: goodsVehicleNumbers })
    }

    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.totalFirstQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.totalSecondQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.totalThirdQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.allVehicleAlarmAvgNumberTrendAnalysis.totalFourthQuarterAlarmNumber);
    legendData.push(alllegendData[4]);
    color.push(allColor[4]);
    seriesData.push({ name: '合计', type: 'line', data: totalVehicleNumbers })

    var title = document.querySelector("#year").innerHTML + "营运车辆违规报警均值趋势分析";
    var config = {
      containerId: 'chartContainer13',
      title: title,
      legendData: legendData,
      xAxisData: xAxisData,
      seriesData: seriesData,
      color: color
    };
    initRectangleChartContainer2(config);
  }

  function initChartContainer14() {

    var xAxisData = ['第一季度', '第二季度', '第三季度', '第四季度'],
      allColor = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000', '#2858ff'],
      color = [];
    busVehicleNumbers = [],
      tourVehicleNumbers = [],
      dangerVehicleNumbers = [],
      goodsVehicleNumbers = [],
      totalVehicleNumbers = [],
      alllegendData = [{ name: '班线报警', icon: 'square' },
      { name: '旅游报警', icon: 'square' },
      { name: '危运报警', icon: 'square' },
      { name: '普货报警', icon: 'square' },
      { name: '合计', icon: 'square' }],
      legendData = [],
      seriesData = [];

    if (vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.busFirstQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.busSecondQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.busThirdQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.busFourthQuarterAlarmNumber != "0") {
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.busFirstQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.busSecondQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.busThirdQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.busFourthQuarterAlarmNumber);
      legendData.push(alllegendData[0]);
      color.push(allColor[0]);
      seriesData.push({ name: '班线报警', type: 'line', data: busVehicleNumbers })

    }

    if (vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.tourFirstQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.tourSecondQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.tourThirdQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.tourFourthQuarterAlarmNumber != "0") {
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.tourFirstQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.tourSecondQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.tourThirdQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.tourFourthQuarterAlarmNumber);
      legendData.push(alllegendData[1]);
      color.push(allColor[1]);
      seriesData.push({ name: '旅游报警', type: 'line', data: tourVehicleNumbers })
    }

    if (vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.dangerFirstQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.dangerSecondQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.dangerThirdQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.dangerFourthQuarterAlarmNumber != "0"
    ) {
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.dangerFirstQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.dangerSecondQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.dangerThirdQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.dangerFourthQuarterAlarmNumber);
      legendData.push(alllegendData[2]);
      color.push(allColor[2]);
      seriesData.push({ name: '危运报警', type: 'line', data: dangerVehicleNumbers })
    }

    if (vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.goodsFirstQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.goodsSecondQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.goodsThirdQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.goodsFourthQuarterAlarmNumber != "0") {
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.goodsFirstQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.goodsSecondQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.goodsThirdQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.goodsFourthQuarterAlarmNumber);
      legendData.push(alllegendData[3]);
      color.push(allColor[3]);
      seriesData.push({ name: '普货报警', type: 'line', data: goodsVehicleNumbers })
    }

    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.totalFirstQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.totalSecondQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.totalThirdQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmNumberTrendAnalysis.totalFourthQuarterAlarmNumber);
    legendData.push(alllegendData[4]);
    color.push(allColor[4]);
    seriesData.push({ name: '合计', type: 'line', data: totalVehicleNumbers })

    var title = document.querySelector("#year").innerHTML + "营运车辆超速报警次数趋势分析";
    var config = {
      containerId: 'chartContainer14',
      title: title,
      legendData: legendData,
      xAxisData: xAxisData,
      seriesData: seriesData,
      color: color
    };
    initRectangleChartContainer2(config);
  }

  function initChartContainer15() {

    var xAxisData = ['第一季度', '第二季度', '第三季度', '第四季度'],
      allColor = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000', '#2858ff'],
      color = [];
    busVehicleNumbers = [],
      tourVehicleNumbers = [],
      dangerVehicleNumbers = [],
      goodsVehicleNumbers = [],
      totalVehicleNumbers = [],
      alllegendData = [{ name: '班线报警', icon: 'square' },
      { name: '旅游报警', icon: 'square' },
      { name: '危运报警', icon: 'square' },
      { name: '普货报警', icon: 'square' },
      { name: '合计', icon: 'square' }],
      legendData = [],
      seriesData = [];

    if (vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.busFirstQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.busSecondQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.busThirdQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.busFourthQuarterAlarmNumber != "0.00") {
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.busFirstQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.busSecondQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.busThirdQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.busFourthQuarterAlarmNumber);
      legendData.push(alllegendData[0]);
      color.push(allColor[0]);
      seriesData.push({ name: '班线报警', type: 'line', data: busVehicleNumbers })

    }

    if (vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.tourFirstQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.tourSecondQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.tourThirdQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.tourFourthQuarterAlarmNumber != "0.00") {
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.tourFirstQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.tourSecondQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.tourThirdQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.tourFourthQuarterAlarmNumber);
      legendData.push(alllegendData[1]);
      color.push(allColor[1]);
      seriesData.push({ name: '旅游报警', type: 'line', data: tourVehicleNumbers })
    }

    if (vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.dangerFirstQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.dangerSecondQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.dangerThirdQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.dangerFourthQuarterAlarmNumber != "0.00"
    ) {
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.dangerFirstQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.dangerSecondQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.dangerThirdQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.dangerFourthQuarterAlarmNumber);
      legendData.push(alllegendData[2]);
      color.push(allColor[2]);
      seriesData.push({ name: '危运报警', type: 'line', data: dangerVehicleNumbers })
    }

    if (vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.goodsFirstQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.goodsSecondQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.goodsThirdQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.goodsFourthQuarterAlarmNumber != "0.00") {
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.goodsFirstQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.goodsSecondQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.goodsThirdQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.goodsFourthQuarterAlarmNumber);
      legendData.push(alllegendData[3]);
      color.push(allColor[3]);
      seriesData.push({ name: '普货报警', type: 'line', data: goodsVehicleNumbers })
    }

    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.totalFirstQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.totalSecondQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.totalThirdQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.speedingVehicleAlarmAvgNumberTrendAnalysis.totalFourthQuarterAlarmNumber);
    legendData.push(alllegendData[4]);
    color.push(allColor[4]);
    seriesData.push({ name: '合计', type: 'line', data: totalVehicleNumbers })

    var title = document.querySelector("#year").innerHTML + "营运车辆超速报警均值趋势分析";
    var config = {
      containerId: 'chartContainer15',
      title: title,
      legendData: legendData,
      xAxisData: xAxisData,
      seriesData: seriesData,
      color: color
    };
    initRectangleChartContainer2(config);
  }

  function initChartContainer16() {

    var xAxisData = ['第一季度', '第二季度', '第三季度', '第四季度'],
      allColor = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000', '#2858ff'],
      color = [];
    busVehicleNumbers = [],
      tourVehicleNumbers = [],
      dangerVehicleNumbers = [],
      goodsVehicleNumbers = [],
      totalVehicleNumbers = [],
      alllegendData = [{ name: '班线报警', icon: 'square' },
      { name: '旅游报警', icon: 'square' },
      { name: '危运报警', icon: 'square' },
      { name: '普货报警', icon: 'square' },
      { name: '合计', icon: 'square' }],
      legendData = [],
      seriesData = [];

    if (vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.busFirstQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.busSecondQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.busThirdQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.busFourthQuarterAlarmNumber != "0") {
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.busFirstQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.busSecondQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.busThirdQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.busFourthQuarterAlarmNumber);
      legendData.push(alllegendData[0]);
      color.push(allColor[0]);
      seriesData.push({ name: '班线报警', type: 'line', data: busVehicleNumbers })

    }

    if (vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.tourFirstQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.tourSecondQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.tourThirdQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.tourFourthQuarterAlarmNumber != "0") {
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.tourFirstQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.tourSecondQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.tourThirdQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.tourFourthQuarterAlarmNumber);
      legendData.push(alllegendData[1]);
      color.push(allColor[1]);
      seriesData.push({ name: '旅游报警', type: 'line', data: tourVehicleNumbers })
    }

    if (vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.dangerFirstQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.dangerSecondQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.dangerThirdQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.dangerFourthQuarterAlarmNumber != "0"
    ) {
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.dangerFirstQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.dangerSecondQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.dangerThirdQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.dangerFourthQuarterAlarmNumber);
      legendData.push(alllegendData[2]);
      color.push(allColor[2]);
      seriesData.push({ name: '危运报警', type: 'line', data: dangerVehicleNumbers })
    }

    if (vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.goodsFirstQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.goodsSecondQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.goodsThirdQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.goodsFourthQuarterAlarmNumber != "0") {
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.goodsFirstQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.goodsSecondQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.goodsThirdQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.goodsFourthQuarterAlarmNumber);
      legendData.push(alllegendData[3]);
      color.push(allColor[3]);
      seriesData.push({ name: '普货报警', type: 'line', data: goodsVehicleNumbers })
    }

    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.totalFirstQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.totalSecondQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.totalThirdQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmNumberTrendAnalysis.totalFourthQuarterAlarmNumber);
    legendData.push(alllegendData[4]);
    color.push(allColor[4]);
    seriesData.push({ name: '合计', type: 'line', data: totalVehicleNumbers })

    var title = document.querySelector("#year").innerHTML + "营运车辆疲劳驾驶报警次数趋势分析";
    var config = {
      containerId: 'chartContainer16',
      title: title,
      legendData: legendData,
      xAxisData: xAxisData,
      seriesData: seriesData,
      color: color
    };
    initRectangleChartContainer2(config);
  }

  function initChartContainer17() {

    var xAxisData = ['第一季度', '第二季度', '第三季度', '第四季度'],
      allColor = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000', '#2858ff'],
      color = [];
    busVehicleNumbers = [],
      tourVehicleNumbers = [],
      dangerVehicleNumbers = [],
      goodsVehicleNumbers = [],
      totalVehicleNumbers = [],
      alllegendData = [{ name: '班线报警', icon: 'square' },
      { name: '旅游报警', icon: 'square' },
      { name: '危运报警', icon: 'square' },
      { name: '普货报警', icon: 'square' },
      { name: '合计', icon: 'square' }],
      legendData = [],
      seriesData = [];

    if (vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.busFirstQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.busSecondQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.busThirdQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.busFourthQuarterAlarmNumber != "0.00") {
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.busFirstQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.busSecondQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.busThirdQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.busFourthQuarterAlarmNumber);
      legendData.push(alllegendData[0]);
      color.push(allColor[0]);
      seriesData.push({ name: '班线报警', type: 'line', data: busVehicleNumbers })

    }

    if (vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.tourFirstQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.tourSecondQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.tourThirdQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.tourFourthQuarterAlarmNumber != "0.00") {
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.tourFirstQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.tourSecondQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.tourThirdQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.tourFourthQuarterAlarmNumber);
      legendData.push(alllegendData[1]);
      color.push(allColor[1]);
      seriesData.push({ name: '旅游报警', type: 'line', data: tourVehicleNumbers })
    }

    if (vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.dangerFirstQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.dangerSecondQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.dangerThirdQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.dangerFourthQuarterAlarmNumber != "0.00"
    ) {
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.dangerFirstQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.dangerSecondQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.dangerThirdQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.dangerFourthQuarterAlarmNumber);
      legendData.push(alllegendData[2]);
      color.push(allColor[2]);
      seriesData.push({ name: '危运报警', type: 'line', data: dangerVehicleNumbers })
    }

    if (vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.goodsFirstQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.goodsSecondQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.goodsThirdQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.goodsFourthQuarterAlarmNumber != "0.00") {
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.goodsFirstQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.goodsSecondQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.goodsThirdQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.goodsFourthQuarterAlarmNumber);
      legendData.push(alllegendData[3]);
      color.push(allColor[3]);
      seriesData.push({ name: '普货报警', type: 'line', data: goodsVehicleNumbers })
    }

    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.totalFirstQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.totalSecondQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.totalThirdQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.tiredVehicleAlarmAvgNumberTrendAnalysis.totalFourthQuarterAlarmNumber);
    legendData.push(alllegendData[4]);
    color.push(allColor[4]);
    seriesData.push({ name: '合计', type: 'line', data: totalVehicleNumbers })

    var title = document.querySelector("#year").innerHTML + "营运车辆疲劳驾驶报警均值趋势分析";
    var config = {
      containerId: 'chartContainer17',
      title: title,
      legendData: legendData,
      xAxisData: xAxisData,
      seriesData: seriesData,
      color: color
    };
    initRectangleChartContainer2(config);
  }

  function initChartContainer18() {

    var xAxisData = ['第一季度', '第二季度', '第三季度', '第四季度'],
      allColor = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000', '#2858ff'],
      color = [];
    busVehicleNumbers = [],
      tourVehicleNumbers = [],
      dangerVehicleNumbers = [],
      goodsVehicleNumbers = [],
      totalVehicleNumbers = [],
      alllegendData = [{ name: '班线报警', icon: 'square' },
      { name: '旅游报警', icon: 'square' },
      { name: '危运报警', icon: 'square' },
      { name: '普货报警', icon: 'square' },
      { name: '合计', icon: 'square' }],
      legendData = [],
      seriesData = [];

    if (vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.busFirstQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.busSecondQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.busThirdQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.busFourthQuarterAlarmNumber != "0") {
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.busFirstQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.busSecondQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.busThirdQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.busFourthQuarterAlarmNumber);
      legendData.push(alllegendData[0]);
      color.push(allColor[0]);
      seriesData.push({ name: '班线报警', type: 'line', data: busVehicleNumbers })

    }

    if (vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.tourFirstQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.tourSecondQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.tourThirdQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.tourFourthQuarterAlarmNumber != "0") {
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.tourFirstQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.tourSecondQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.tourThirdQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.tourFourthQuarterAlarmNumber);
      legendData.push(alllegendData[1]);
      color.push(allColor[1]);
      seriesData.push({ name: '旅游报警', type: 'line', data: tourVehicleNumbers })
    }

    if (vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.dangerFirstQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.dangerSecondQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.dangerThirdQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.dangerFourthQuarterAlarmNumber != "0"
    ) {
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.dangerFirstQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.dangerSecondQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.dangerThirdQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.dangerFourthQuarterAlarmNumber);
      legendData.push(alllegendData[2]);
      color.push(allColor[2]);
      seriesData.push({ name: '危运报警', type: 'line', data: dangerVehicleNumbers })
    }

    if (vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.goodsFirstQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.goodsSecondQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.goodsThirdQuarterAlarmNumber != "0" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.goodsFourthQuarterAlarmNumber != "0") {
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.goodsFirstQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.goodsSecondQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.goodsThirdQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.goodsFourthQuarterAlarmNumber);
      legendData.push(alllegendData[3]);
      color.push(allColor[3]);
      seriesData.push({ name: '普货报警', type: 'line', data: goodsVehicleNumbers })
    }

    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.totalFirstQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.totalSecondQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.totalThirdQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmNumberTrendAnalysis.totalFourthQuarterAlarmNumber);
    legendData.push(alllegendData[4]);
    color.push(allColor[4]);
    seriesData.push({ name: '合计', type: 'line', data: totalVehicleNumbers })

    var title = document.querySelector("#year").innerHTML + "营运车辆凌晨2-5点禁驾报警次数趋势分析";
    var config = {
      containerId: 'chartContainer18',
      title: title,
      legendData: legendData,
      xAxisData: xAxisData,
      seriesData: seriesData,
      color: color
    };
    initRectangleChartContainer2(config);
  }

  function initChartContainer19() {

    var xAxisData = ['第一季度', '第二季度', '第三季度', '第四季度'],
      allColor = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000', '#2858ff'],
      color = [];
    busVehicleNumbers = [],
      tourVehicleNumbers = [],
      dangerVehicleNumbers = [],
      goodsVehicleNumbers = [],
      totalVehicleNumbers = [],
      alllegendData = [{ name: '班线报警', icon: 'square' },
      { name: '旅游报警', icon: 'square' },
      { name: '危运报警', icon: 'square' },
      { name: '普货报警', icon: 'square' },
      { name: '合计', icon: 'square' }],
      legendData = [],
      seriesData = [];

    if (vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.busFirstQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.busSecondQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.busThirdQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.busFourthQuarterAlarmNumber != "0.00") {
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.busFirstQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.busSecondQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.busThirdQuarterAlarmNumber);
      busVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.busFourthQuarterAlarmNumber);
      legendData.push(alllegendData[0]);
      color.push(allColor[0]);
      seriesData.push({ name: '班线报警', type: 'line', data: busVehicleNumbers })

    }

    if (vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.tourFirstQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.tourSecondQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.tourThirdQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.tourFourthQuarterAlarmNumber != "0.00") {
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.tourFirstQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.tourSecondQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.tourThirdQuarterAlarmNumber);
      tourVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.tourFourthQuarterAlarmNumber);
      legendData.push(alllegendData[1]);
      color.push(allColor[1]);
      seriesData.push({ name: '旅游报警', type: 'line', data: tourVehicleNumbers })
    }

    if (vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.dangerFirstQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.dangerSecondQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.dangerThirdQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.dangerFourthQuarterAlarmNumber != "0.00"
    ) {
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.dangerFirstQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.dangerSecondQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.dangerThirdQuarterAlarmNumber);
      dangerVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.dangerFourthQuarterAlarmNumber);
      legendData.push(alllegendData[2]);
      color.push(allColor[2]);
      seriesData.push({ name: '危运报警', type: 'line', data: dangerVehicleNumbers })
    }

    if (vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.goodsFirstQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.goodsSecondQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.goodsThirdQuarterAlarmNumber != "0.00" ||
      vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.goodsFourthQuarterAlarmNumber != "0.00") {
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.goodsFirstQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.goodsSecondQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.goodsThirdQuarterAlarmNumber);
      goodsVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.goodsFourthQuarterAlarmNumber);
      legendData.push(alllegendData[3]);
      color.push(allColor[3]);
      seriesData.push({ name: '普货报警', type: 'line', data: goodsVehicleNumbers })
    }

    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.totalFirstQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.totalSecondQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.totalThirdQuarterAlarmNumber);
    totalVehicleNumbers.push(vehicleAlarmTrendAnalysis.t25VehicleAlarmAvgNumberTrendAnalysis.totalFourthQuarterAlarmNumber);
    legendData.push(alllegendData[4]);
    color.push(allColor[4]);
    seriesData.push({ name: '合计', type: 'line', data: totalVehicleNumbers })

    var title = document.querySelector("#year").innerHTML + "营运车辆凌晨2-5点禁驾报警均值趋势分析";
    var config = {
      containerId: 'chartContainer19',
      title: title,
      legendData: legendData,
      xAxisData: xAxisData,
      seriesData: seriesData,
      color: color
    };
    initRectangleChartContainer2(config);
  }

  function initChartContainer20() {
    var alllegendData = ['喝水', '打哈欠', '打电话', '抽烟', '闭眼', '摄像头偏移'],
      allcolor = ['#5B9BD5', '#ED7D31', '#A5A5A5', '#FFC000', '#70AD47', '#4472C4'],
      legendData = [],
      seriesData = [],
      color = [];

    var dringNumber = intelligentEquipmentInfo.dringNumber;
    if ((dringNumber !== "") && (dringNumber !== "0")) {
      legendData.push(alllegendData[0])
      seriesData.push({ value: intelligentEquipmentInfo.dringNumber, name: '喝水' })
      color.push(allcolor[0])
    }
    var yawmNumber = intelligentEquipmentInfo.yawmNumber;
    if ((yawmNumber !== "") && (yawmNumber !== "0")) {
      legendData.push(alllegendData[1])
      seriesData.push({ value: intelligentEquipmentInfo.yawmNumber, name: '打哈欠' })
      color.push(allcolor[1])
    }
    var phoneNumber = intelligentEquipmentInfo.phoneNumber;
    if ((phoneNumber !== "") && (phoneNumber !== "0")) {
      legendData.push(alllegendData[2])
      seriesData.push({ value: intelligentEquipmentInfo.phoneNumber, name: '打电话' })
      color.push(allcolor[2])
    }
    var smokingNumber = intelligentEquipmentInfo.smokingNumber;
    if ((smokingNumber !== "") && (smokingNumber !== "0")) {
      legendData.push(alllegendData[3])
      seriesData.push({ value: intelligentEquipmentInfo.smokingNumber, name: '抽烟' })
      color.push(allcolor[3])
    }
    var closedEyesNumber = intelligentEquipmentInfo.closedEyesNumber;
    if ((closedEyesNumber !== "") && (closedEyesNumber !== "0")) {
      legendData.push(alllegendData[4])
      seriesData.push({ value: intelligentEquipmentInfo.closedEyesNumber, name: '闭眼' })
      color.push(allcolor[4])
    }
    var cameraNumber = intelligentEquipmentInfo.cameraNumber;
    if ((cameraNumber !== "") && (cameraNumber !== "0")) {
      legendData.push(alllegendData[5])
      seriesData.push({ value: intelligentEquipmentInfo.cameraNumber, name: '摄像头偏移' })
      color.push(allcolor[5])
    }
    var title = document.querySelector("#year").innerHTML + "人工智能设备监测违规报警占比";
    var config = {
      containerId: 'chartContainer20',
      title: title,
      legendData: legendData,
      seriesData: seriesData,
      color: color
    }
    initPieChartContainer(config);
  }

  function initChartContainer21() {
    var xAxisData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',],
      legendData = [{ name: '报警数量', icon: 'square' }],
      seriesData = [
        {
          name: '报警数量',
          type: 'line',
          barGap: 0,
          barWidth: 20,
          data: alarmNumberList,
          label: {
            normal: {
              show: true,
              position: 'top',
              color: '#000000'
            }
          }
        }];
    var config = {
      containerId: 'chartContainer21',
      title: '智能设备报警次数环比情况',
      legendData: legendData,
      xAxisData: xAxisData,
      seriesData: seriesData,
      color: ['#5B9BD5']
    }
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
          /* axisLabel: {
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
          }, axisLabel: {
            interval: 0,
            rotate: 30,
            lineHeight: 80,
            textStyle: {
              fontSize: 12,
            }
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

})

</script>

<style scoped lang="scss">
@import url(./briefReport.css);
@import url(./briefReport1.css);
</style>
