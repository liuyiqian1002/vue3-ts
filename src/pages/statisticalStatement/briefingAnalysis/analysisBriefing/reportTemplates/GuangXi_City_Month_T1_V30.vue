<template>
  <div>
    <div class="brief">{{ data.reportDate }}简报&nbsp;&nbsp;
      <!-- <shiro:hasPermission name="statistics-report-download"> -->
        <a href="javascript:" id="downloadDoc">下载word</a>
      <!-- </shiro:hasPermission> -->
    </div>
    <div class="fullpage margin-t">
      <h1 class="margin-tm">{{ data.provinceReportName }}道路运输第三方安全监测月报</h1>
      <h3 style="margin: 30px 0px;">({{ data.reportDate }})</h3>
    </div>
    <!-- 一、总体情况 -->
    <div class="fullpage">
      <h4>一、总体情况</h4>
      <p class="textStyle margin-tm text-in">
        {{ data.reportDate2 }}，第三方监测平台共监测{{ data.cityReportName }}道路运输企业共{{ data.companyReportCount }}户，个体共{{
          data.peopleCompanyReportCount }}户，平台接入道路运输车辆数{{ data.vehicleReportCount }}辆。
      </p>
      <!-- 总体情况表格 -->
      <table class="img-table">
        <thead>
          <tr>
            <th class="weightSize">区域</th>
            <th class="weightSize">营运类型</th>
            <th class="weightSize">车辆数</th>
            <th class="weightSize">占比</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="0" class="weightSize">{{ data.areaName }}</td>
            <div v-if="baseReportInfo.busVehicleNumber > 0">
              <td>班线客运</td>
              <td>
                {{ baseReportInfo.busVehicleNumber }}
              </td>
              <td>{{ baseReportInfo.busVehicleRatio }}</td>
            </div> 
            <div v-if="baseReportInfo.busVehicleNumber == '0' && part1Data.tourVehicleNumber > 0">
              <td>旅游客运</td>
              <td>
                {{ baseReportInfo.tourVehicleNumber }}
              </td>
              <td>{{ baseReportInfo.tourVehicleRatio }}</td>
            </div> 
            <div
              v-if="baseReportInfo.busVehicleNumber == '0' && part1Data.tourVehicleNumber == '0' && baseReportInfo.dangerVehicleNumber > 0">
              <td>危险品货运</td>
              <td>
                {{ baseReportInfo.dangerVehicleNumber }}
              </td>
              <td>{{ baseReportInfo.dangerVehicleRatio }}</td>
            </div> 
            <div
              v-if="baseReportInfo.busVehicleNumber == '0' && part1Data.tourVehicleNumber == '0' && baseReportInfo.dangerVehicleNumber == '0' && baseReportInfo.goodsVehicleNumber > 0">
              <td>普通货运</td>
              <td>
                {{ baseReportInfo.goodsVehicleNumber }}
              </td>
              <td>{{ baseReportInfo.goodsVehicleRatio }}</td>
            </div> 
          </tr>
          <div v-if="baseReportInfo.tourVehicleNumber > 0">
            <tr>
              <td>旅游客运</td>
              <td>
                {{ baseReportInfo.tourVehicleNumber }}
              </td>
              <td>{{ baseReportInfo.tourVehicleRatio }}</td>
            </tr>
          </div> 
          <div v-if="baseReportInfo.dangerVehicleNumber > 0">
            <tr>
              <td>危险品货运</td>
              <td>
                {{ baseReportInfo.dangerVehicleNumber }}
              </td>
              <td>{{ baseReportInfo.dangerVehicleRatio }}</td>
            </tr>
          </div> 
          <div v-if="baseReportInfo.goodsVehicleNumber > 0">
            <tr>
              <td>普通货运</td>
              <td>
                {{ baseReportInfo.goodsVehicleNumber }}
              </td>
              <td>{{ baseReportInfo.goodsVehicleRatio }}</td>
            </tr>
          </div> 

          <tr>
            <td class="weightSize">合计</td>
            <td class="weightSize">
              {{ baseReportInfo.allVehicleNumber }}
            </td>
            <td class="weightSize">{{ baseReportInfo.allVehicleRatio }}</td>
          </tr>
        </tbody>
      </table>

    </div>
    <!-- 二、报警分析 -->
    <div class="fullpage">
      <h4>二、报警分析</h4>
      <!--（一）报警类型分析 -->
      <div>
        <div v-if="alarmTypeReportInfo.alarmTypeReportInfoDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ alarmTypeReportInfo.title }}
          </p>
          <table class="img-table">
            <thead>
              <tr>
                <th class="weightSize">类型</th>
                <th class="weightSize">当月报警总量</th>
                <th class="weightSize">类型占比</th>
                <th class="weightSize">同比增长率</th>
                <th class="weightSize">环比增长率</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in alarmTypeReportInfo.alarmTypeReportInfoDetail" var="item">
                <tr>
                  <td>{{ item.alarmTypeName }}</td>
                  <td>{{ item.thisMonthAlarmCount }}</td>
                  <td>{{ item.alarmTypeProportion }}</td>
                  <td>{{ item.alarmUp }}</td>
                  <td>{{ item.alarmRatio }}</td>
                </tr>
              </div>
              <tr>
                <td class="weightSize">合计</td>
                <td>{{ alarmTypeReportInfo.alarmTypeReportInfoTotal.thisMonthAlarmCount }}</td>
                <td>{{ alarmTypeReportInfo.alarmTypeReportInfoTotal.alarmTypeProportion }}</td>
                <td>{{ alarmTypeReportInfo.alarmTypeReportInfoTotal.alarmUp }}</td>
                <td>{{ alarmTypeReportInfo.alarmTypeReportInfoTotal.alarmRatio }}</td>
              </tr>
            </tbody>
          </table>
        </div> 
      </div>
      <!--（二）地市报警数据分析(各区/县报警数据分析) -->
      <div>
        <div v-if="alarmCityReportInfo.alarmTypeReportInfoDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ alarmCityReportInfo.title }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th rowspan="2">排名</th>
                <th rowspan="2" colspan="2">区/县</th>
                <th rowspan="2">车辆总数</th>
                <th colspan="3">报警车辆数</th>
                <th colspan="3">报警次数</th>
                <th colspan="3">车均报警</th>
              </tr>
              <tr>
                <th>数量</th>
                <th>同比增长率</th>
                <th>环比增长率</th>
                <th>数量</th>
                <th>同比增长率</th>
                <th>环比增长率</th>
                <th>数量</th>
                <th>同比增长率</th>
                <th>环比增长率</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in alarmCityReportInfo.alarmTypeReportInfoDetail" var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td colspan="2">{{ item.locationName }}</td>
                  <td>{{ item.vehicleNumber }}</td>
                  <td>{{ item.alarmVehicleNumber }}</td>
                  <td>{{ item.alarmVehicleUp }}</td>
                  <td>{{ item.alarmVehicleRatio }}</td>
                  <td>{{ item.alarmCountNumber }}</td>
                  <td>{{ item.alarmCountUp }}</td>
                  <td>{{ item.alarmCountRatio }}</td>
                  <td>{{ item.average }}</td>
                  <td>{{ item.averageVehicleUp }}</td>
                  <td>{{ item.averageVehicleRatio }}</td>
                </tr>
              </div>

            </tbody>
            <!-- 合计 -->
            <tr>
              <td colspan="3" class="weightSize">合计</td>
              <td>{{ alarmCityReportInfo.alarmTypeReportInfoTotal.vehicleNumber }}</td>
              <td>{{ alarmCityReportInfo.alarmTypeReportInfoTotal.alarmVehicleNumber }}</td>
              <td>{{ alarmCityReportInfo.alarmTypeReportInfoTotal.alarmVehicleUp }}</td>
              <td>{{ alarmCityReportInfo.alarmTypeReportInfoTotal.alarmVehicleRatio }}</td>
              <td>{{ alarmCityReportInfo.alarmTypeReportInfoTotal.alarmCountNumber }}</td>
              <td>{{ alarmCityReportInfo.alarmTypeReportInfoTotal.alarmCountUp }}</td>
              <td>{{ alarmCityReportInfo.alarmTypeReportInfoTotal.alarmCountRatio }}</td>
              <td>{{ alarmCityReportInfo.alarmTypeReportInfoTotal.average }}</td>
              <td>{{ alarmCityReportInfo.alarmTypeReportInfoTotal.averageVehicleUp }}</td>
              <td>{{ alarmCityReportInfo.alarmTypeReportInfoTotal.averageVehicleRatio }}</td>
            </tr>
          </table>
        </div> 
      </div>
      <!--（三）各项报警总体排名分析  -->
      <p class="textStyle margin-tm text-in">（三）各项报警总体排名分析</p>

      <!--1、“两客一危”车均报警排名前十企业名单-->
      <div>
        <div v-if="importantAverageVehicleAlarmInfo.importantAverageVehicleAlarmInfoDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ importantAverageVehicleAlarmInfo.title }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th>排名</th>
                <th>区/县</th>
                <th>业户名称</th>
                <th>报警车辆数</th>
                <th>报警次数</th>
                <th>车均报警</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in importantAverageVehicleAlarmInfo.importantAverageVehicleAlarmInfoDetail"
                var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td>{{ item.locationName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.alarmVehicleNumber }}</td>
                  <td>{{ item.alarmNumber }}</td>
                  <td>{{ item.averageAlarmNumber }}</td>
                </tr>
              </div>
            </tbody>
          </table>
        </div> 
      </div>
      <!--2、“两客一危”报警次数排名前十车辆名单-->
      <div>
        <div v-if="importantVehicleAlarmNumberInfo.importantVehicleAlarmNumberInfoDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ importantVehicleAlarmNumberInfo.title }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th>排名</th>
                <th>区/县</th>
                <th>业户名称</th>
                <th>车牌号</th>
                <th>报警次数</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in importantVehicleAlarmNumberInfo.importantVehicleAlarmNumberInfoDetail" var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td>{{ item.locationName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.vehicleNumber }}</td>
                  <td>{{ item.alarmNumber }}</td>
                </tr>
              </div>
            </tbody>
          </table>
        </div> 
      </div>

      <!--3、普通货运车均报警排名前十企业名单-->
      <div>
        <div v-if="goodsVehicleAverageNumberInfo.goodsVehicleAverageNumberInfoDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ goodsVehicleAverageNumberInfo.title }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th>排名</th>
                <th>区/县</th>
                <th>业户名称</th>
                <th>报警车辆数</th>
                <th>报警次数</th>
                <th>车均报警</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in goodsVehicleAverageNumberInfo.goodsVehicleAverageNumberInfoDetail" var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td>{{ item.locationName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.alarmVehicleNumber }}</td>
                  <td>{{ item.alarmNumber }}</td>
                  <td>{{ item.averageAlarmNumber }}</td>
                </tr>
              </div>
            </tbody>
          </table>
        </div> 
      </div>
      <!--4、普通货运报警次数排名前十车辆名单-->
      <div>
        <div v-if="goodsVehicleAlarmNumberInfo.goodsVehicleAlarmNumberInfoDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ goodsVehicleAlarmNumberInfo.title }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th>排名</th>
                <th>区/县</th>
                <th>业户名称</th>
                <th>车牌号</th>
                <th>报警次数</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in goodsVehicleAlarmNumberInfo.goodsVehicleAlarmNumberInfoDetail" var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td>{{ item.locationName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.vehicleNumber }}</td>
                  <td>{{ item.alarmNumber }}</td>
                </tr>
              </div>
            </tbody>
          </table>
        </div> 
      </div>

      <!--（四）各项报警分类排名分析-->
      <p class="textStyle margin-tm text-in">{{ alarmClassifyRankingTitle }}</p>

      <!--1、“两客一危”车均超速报警排名前十企业名单-->
      <div>
        <div v-if="alarmClassify.overSpeedCompany4MajorOperateDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ alarmClassify.overSpeedCompany4MajorOperateTitle }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th>排名</th>
                <th>地市/区（县）</th>
                <th>业户名称</th>
                <th>报警车辆数</th>
                <th>报警次数</th>
                <th>车均报警</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in alarmClassify.overSpeedCompany4MajorOperateDetail" var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td>{{ item.areaName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.alarmVehicleCount }}</td>
                  <td>{{ item.alarmCount }}</td>
                  <td>{{ item.avgAlarmCount }}</td>
                </tr>
              </div>
            </tbody>
          </table>
        </div> 
      </div>
      <!--2、“两客一危”超速报警次数排名前十车辆名单-->
      <div>
        <div v-if="alarmClassify.overSpeedVehicle4MajorOperateDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ alarmClassify.overSpeedVehicle4MajorOperateTitle }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th>排名</th>
                <th>地市/区（县）</th>
                <th>业户名称</th>
                <th>车牌号</th>
                <th>报警次数</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in alarmClassify.overSpeedVehicle4MajorOperateDetail" var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td>{{ item.areaName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.plateNum }}</td>
                  <td>{{ item.alarmCount }}</td>
                </tr>
              </div>
            </tbody>
          </table>
        </div> 
      </div>

      <!--3、普通货运车均超速报警排名前十企业名单-->
      <div>
        <div v-if="alarmClassify.overSpeedCompany4GeneralTransportDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ alarmClassify.overSpeedCompany4GeneralTransportTitle }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th>排名</th>
                <th>地市/区（县）</th>
                <th>业户名称</th>
                <th>报警车辆数</th>
                <th>报警次数</th>
                <th>车均报警</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in alarmClassify.overSpeedCompany4GeneralTransportDetail" var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td>{{ item.areaName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.alarmVehicleCount }}</td>
                  <td>{{ item.alarmCount }}</td>
                  <td>{{ item.avgAlarmCount }}</td>
                </tr>
              </div>
            </tbody>
          </table>
        </div> 
      </div>
      <!--4、普通货运超速报警次数排名前十车辆名单-->
      <div>
        <div v-if="alarmClassify.overSpeedVehicle4GeneralTransportDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ alarmClassify.overSpeedVehicle4GeneralTransportTitle }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th>排名</th>
                <th>地市/区（县）</th>
                <th>业户名称</th>
                <th>车牌号</th>
                <th>报警次数</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in alarmClassify.overSpeedVehicle4GeneralTransportDetail" var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td>{{ item.areaName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.plateNum }}</td>
                  <td>{{ item.alarmCount }}</td>
                </tr>
              </div>
            </tbody>
          </table>
        </div> 
      </div>

      <!--5、“两客一危”车均疲劳报警排名前十企业名单-->
      <div>
        <div v-if="alarmClassify.fatigueDrivingCompany4MajorOperateDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ alarmClassify.fatigueDrivingCompany4MajorOperateTitle }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th>排名</th>
                <th>地市/区（县）</th>
                <th>业户名称</th>
                <th>报警车辆数</th>
                <th>报警次数</th>
                <th>车均报警</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in alarmClassify.fatigueDrivingCompany4MajorOperateDetail" var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td>{{ item.areaName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.alarmVehicleCount }}</td>
                  <td>{{ item.alarmCount }}</td>
                  <td>{{ item.avgAlarmCount }}</td>
                </tr>
              </div>
            </tbody>
          </table>
        </div> 
      </div>
      <!--6、“两客一危”疲劳报警次数排名前十车辆名单-->
      <div>
        <div v-if="alarmClassify.fatigueDrivingVehicle4MajorOperateDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ alarmClassify.fatigueDrivingVehicle4MajorOperateTitle }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th>排名</th>
                <th>地市/区（县）</th>
                <th>业户名称</th>
                <th>车牌号</th>
                <th>报警次数</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in alarmClassify.fatigueDrivingVehicle4MajorOperateDetail" var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td>{{ item.areaName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.plateNum }}</td>
                  <td>{{ item.alarmCount }}</td>
                </tr>
              </div>
            </tbody>
          </table>
        </div> 
      </div>

      <!--7、普通货运车均疲劳报警排名前十企业名单-->
      <div>
        <div v-if="alarmClassify.fatigueDrivingCompany4GeneralTransportDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ alarmClassify.fatigueDrivingCompany4GeneralTransportTitle }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th>排名</th>
                <th>地市/区（县）</th>
                <th>业户名称</th>
                <th>报警车辆数</th>
                <th>报警次数</th>
                <th>车均报警</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in alarmClassify.fatigueDrivingCompany4GeneralTransportDetail" var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td>{{ item.areaName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.alarmVehicleCount }}</td>
                  <td>{{ item.alarmCount }}</td>
                  <td>{{ item.avgAlarmCount }}</td>
                </tr>
              </div>
            </tbody>
          </table>
        </div> 
      </div>
      <!--8、普通货运疲劳报警次数排名前十车辆名单-->
      <div>
        <div v-if="alarmClassify.fatigueDrivingVehicle4GeneralTransportDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ alarmClassify.fatigueDrivingVehicle4GeneralTransportTitle }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th>排名</th>
                <th>地市/区（县）</th>
                <th>业户名称</th>
                <th>车牌号</th>
                <th>报警次数</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in alarmClassify.fatigueDrivingVehicle4GeneralTransportDetail" var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td>{{ item.areaName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.plateNum }}</td>
                  <td>{{ item.alarmCount }}</td>
                </tr>
              </div>
            </tbody>
          </table>
        </div> 
      </div>

      <!--9、“两客一危”车均高速脱离监控报警排名前十企业-->
      <div>
        <div v-if="alarmClassify.speedwayOutOfControlCompany4MajorOperateDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ alarmClassify.speedwayOutOfControlCompany4MajorOperateTitle }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th>排名</th>
                <th>地市/区（县）</th>
                <th>业户名称</th>
                <th>报警车辆数</th>
                <th>报警次数</th>
                <th>车均报警</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in alarmClassify.speedwayOutOfControlCompany4MajorOperateDetail" var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td>{{ item.areaName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.alarmVehicleCount }}</td>
                  <td>{{ item.alarmCount }}</td>
                  <td>{{ item.avgAlarmCount }}</td>
                </tr>
              </div>
            </tbody>
          </table>
        </div> 
      </div>
      <!--10、“两客一危”高速脱离监控报警次数排名前十车辆-->
      <div>
        <div v-if="alarmClassify.speedwayOutOfControlVehicle4MajorOperateDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ alarmClassify.speedwayOutOfControlVehicle4MajorOperateTitle }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th>排名</th>
                <th>地市/区（县）</th>
                <th>业户名称</th>
                <th>车牌号</th>
                <th>报警次数</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in alarmClassify.speedwayOutOfControlVehicle4MajorOperateDetail" var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td>{{ item.areaName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.plateNum }}</td>
                  <td>{{ item.alarmCount }}</td>
                </tr>
              </div>
            </tbody>
          </table>
        </div> 
      </div>

      <!--11、普通货运车均高速脱离监控报警排名前十企业名单-->
      <div>
        <div v-if="alarmClassify.speedwayOutOfControlCompany4GeneralTransportDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ alarmClassify.speedwayOutOfControlCompany4GeneralTransportTitle }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th>排名</th>
                <th>地市/区（县）</th>
                <th>业户名称</th>
                <th>报警车辆数</th>
                <th>报警次数</th>
                <th>车均报警</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in alarmClassify.speedwayOutOfControlCompany4GeneralTransportDetail" var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td>{{ item.areaName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.alarmVehicleCount }}</td>
                  <td>{{ item.alarmCount }}</td>
                  <td>{{ item.avgAlarmCount }}</td>
                </tr>
              </div>
            </tbody>
          </table>
        </div> 
      </div>
      <!--12、普通货运高速脱离监控报警次数排名前十车辆名单-->
      <div>
        <div v-if="alarmClassify.speedwayOutOfControlVehicle4GeneralTransportDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ alarmClassify.speedwayOutOfControlVehicle4GeneralTransportTitle }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th>排名</th>
                <th>地市/区（县）</th>
                <th>业户名称</th>
                <th>车牌号</th>
                <th>报警次数</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in alarmClassify.speedwayOutOfControlVehicle4GeneralTransportDetail" var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td>{{ item.areaName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.plateNum }}</td>
                  <td>{{ item.alarmCount }}</td>
                </tr>
              </div>
            </tbody>
          </table>
        </div> 
      </div>

      <!--13、疑似异地经营车辆名单-->
      <div>
        <div v-if="distantOperationAlarmInfo.distantOperationAlarmInfoDetail.length > 0">
          <p class="textStyle margin-tm text-in">
            {{ distantOperationAlarmInfo.title }}
          </p>
          <table class="img-table img-tableLong">
            <thead>
              <tr>
                <th>序号</th>
                <th>区/县</th>
                <th>业户名称</th>
                <th>是否纠正</th>
                <th>车牌号码</th>
                <th>最后停留区域</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in distantOperationAlarmInfo.distantOperationAlarmInfoDetail" var="item">
                <tr>
                  <td>{{ item.ranking }}</td>
                  <td>{{ item.locationName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.eventStatus }}</td>
                  <td>{{ item.vehicleNumber }}</td>
                  <td>{{ item.locationAddress }}</td>
                </tr>
              </div>
            </tbody>
          </table>
          <p class="textStyle margin-tm text-in">
            &emsp;疑似异地经营报警说明：未纠正、已纠正都是代表有疑似异地经营的报警。其中未纠正代表车辆至今未归；已纠正代表车辆已经返回。<span
              style="color: red">（表中已纠正和未纠正都有时显示此条）</span><br />
            &emsp;疑似异地经营报警说明：已纠正是代表有疑似异地经营的报警,已纠正代表车辆已经返回。<span style="color: red">（表中只有已纠正时显示此条）</span><br />
            &emsp;疑似异地经营报警说明：未纠正是代表有疑似异地经营的报警，未纠正代表车辆至今未归。<span style="color: red">（表中只有未纠正时显示此条）</span><br />
            &emsp;<span style="color: red">以上根据统计表中实际情况三选一</span>
          </p>
        </div> 
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
const { title, data } = defineProps({
  title: { type: String, default: () => '' },
  data: { type: Object, default: () => [] }
})
const proxy: any = getCurrentInstance()?.proxy

const { baseReportInfo, part1Data, alarmTypeReportInfo, alarmCityReportInfo, importantAverageVehicleAlarmInfo, importantVehicleAlarmNumberInfo, goodsVehicleAlarmNumberInfo,goodsVehicleAverageNumberInfo, alarmClassifyRankingTitle, alarmClassify, distantOperationAlarmInfo } = data

</script>

<style scoped lang="scss"></style>
