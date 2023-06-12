<template>
  <div>
    <div class="brief">{{ head.reportDate }}简报&nbsp;&nbsp;
      <shiro:hasPermission name="statistics-report-download">
        <a href="javascript:" id="downloadDoc">下载word</a>
      </shiro:hasPermission>
    </div>
    <div class="fullpage margin-t">
      <h1 class="margin-tm">{{ head.provinceReportName }}道路运输第三方安全监测月报</h1>
      <h3 style="margin: 30px 0px;">({{ head.reportDate }})</h3>
    </div>
    <!-- 一、总体情况 -->
    <div class="fullpage">
      <h4>一、总体情况</h4>
      <p class="textStyle margin-tm text-in">&nbsp;&nbsp;&nbsp;&nbsp;{{ head.headContent }}</p>

      <!-- 总体情况表格 -->
      <div v-if="listOpTypeStatistic.length > 0">
        <table class="img-table">
          <thead>
            <tr>
              <th class="weightSize">区域</th>
              <th class="weightSize">营运类型</th>
              <th class="weightSize">车辆总数</th>
              <th class="weightSize">入网车辆数</th>
              <th class="weightSize">占比</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="{{ rowSpan }}" class="weightSize">{{ head.areaName }}</td>
            </tr>
            <div v-for="op in listOpTypeStatistic" var="op">
              <div v-if="op.vehicleTotalCount > 0">
                <tr>
                  <!-- <%--说明：operateTypeCode为0（后端指定值）说明是合计行，需要增加字体样式--%> -->
                  <td :class="{ weightSize: op.operateTypeCode === '0' }">{{ op.operateTypeName }}</td>
                  <td :class="{ weightSize: op.operateTypeCode === '0' }">{{ op.vehicleTotalCount }}</td>
                  <td :class="{ weightSize: op.operateTypeCode === '0' }">{{ op.onlineVehicleCount }}</td>
                  <td :class="{ weightSize: op.operateTypeCode === '0' }">{{ op.ratio }}</td>
                </tr>
              </div>
            </div>

          </tbody>
        </table>
      </div>

    </div>
    <!-- 二、入网情况分析 -->
    <div class="fullpage">
      <div v-if="listOnlineAnalysis.length > 0">
        <h4>二、入网情况分析</h4>

        <div items="{{ listOnlineAnalysis }}" var="onlineRanking">

          <div>
            <div v-if="onlineRanking.listOnlineRankingAnalysis.length > 0">
              <!--1、“两客一危”超速报警次数排名前十车辆名单-->
              <p class="textStyle margin-tm text-in">{{ onlineRanking.title }}</p>
              <table class="img-table img-tableLong">
                <thead>
                  <tr>
                    <th>排名</th>
                    <th>区/县</th>
                    <th>业户名称</th>
                    <th>未入网车辆数</th>
                    <th>车辆总数</th>
                    <th>占比</th>
                  </tr>
                </thead>
                <tbody>
                  <div v-for="item in onlineRanking.listOnlineRankingAnalysis" var="item">
                    <tr>
                      <td>{{ item.ranking }}</td>
                      <td>{{ item.areaName }}</td>
                      <td>{{ item.companyName }}</td>
                      <td>{{ item.notOnlineVehicleCount }}</td>
                      <td>{{ item.vehicleCount }}</td>
                      <td>{{ item.avgAlarmCount }}</td>
                    </tr>
                  </div>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
    <!-- 三、报警分析 -->
    <div class="fullpage">

      <h4>三、报警分析</h4>

      <!--（一）报警类型分析,如果没有数据集则不显示标题-->
      <div>
        <div v-if="alarmTypeAnalysis.listAlarmTypeAnalysis.length > 0">
          <!--（一）报警类型分析-->
          <p class="textStyle margin-tm text-in">{{ alarmTypeAnalysis.title }}</p>
          <table class="img-table">
            <thead>
              <tr>
                <th class="weightSize">类型</th>
                <th class="weightSize">单位</th>
                <th class="weightSize">当月报警总量</th>
                <th class="weightSize">同比增长率</th>
                <th class="weightSize">环比增长率</th>
              </tr>
            </thead>
            <tbody>
              <div v-for="item in alarmTypeAnalysis.listAlarmTypeAnalysis" var="item">
                <tr>
                  <td>{{ item.alarmTypeName }}</td>
                  <td>{{ item.unitName }}</td>
                  <td>{{ item.currMonthAlarmCount }}</td>
                  <td>{{ item.onYearGrowthRate }}</td>
                  <td>{{ item.seqGrowthRate }}</td>
                </tr>
              </div>
            </tbody>
          </table>
          <p class="textStyle margin-tm text-in" style="width:600px;margin:auto">
            &nbsp;&nbsp;{{ alarmTypeAnalysis.alarmTypeNote }}</p>
        </div>
      </div>

      <!--（二）各项报警分类排名分析,如果没有数据集则不显示标题-->
      <div>
        <div v-if="alarmClassifyRanking.listAlarmClassifyRanking.length > 0">
          <!--（二）各项报警分类排名分析-->
          <p class="textStyle margin-tm text-in">{{ alarmClassifyRanking.title }}</p>

          <div v-for="item in alarmClassifyRanking.listAlarmClassifyRanking" var="classify">

            <div v-if="classify.alarmTypeCode == '109' && classify.opGpCode == '1'">
              <!--1、“两客一危”超速报警次数排名前十车辆名单-->
              <div>
                <div v-if="classify.listCompanyRanking.length > 0">
                  <!--1、“两客一危”超速报警次数排名前十车辆名单-->
                  <p class="textStyle margin-tm text-in">{{ classify.companyRankingTitle }}</p>
                  <table class="img-table img-tableLong">
                    <thead>
                      <tr>
                        <th>排名</th>
                        <th>区/县</th>
                        <th>业户名称</th>
                        <th>入网车辆数</th>
                        <th>报警次数</th>
                        <th>车均报警</th>
                      </tr>
                    </thead>
                    <tbody>
                      <div v-for="item in classify.listCompanyRanking" var="item">
                        <tr>
                          <td>{{ item.ranking }}</td>
                          <td>{{ item.areaName }}</td>
                          <td>{{ item.companyName }}</td>
                          <td>{{ item.onlineVehicleCount }}</td>
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
                <div v-if="classify.listAlarmCountRanking.length > 0">
                  <!--2、“两客一危”超速报警次数排名前十车辆名单-->
                  <p class="textStyle margin-tm text-in">{{ classify.alarmCountRankingTitle }}</p>
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
                      <div v-for="item in classify.listAlarmCountRanking" var="item">
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
            </div>

            <div v-if="classify.alarmTypeCode == '109' && classify.opGpCode == '2'">
              <!--3、普通货运车均超速报警排名前十企业名单-->
              <div>
                <div v-if="classify.listCompanyRanking.length > 0">
                  <!--3、普通货运车均超速报警排名前十企业名单-->
                  <p class="textStyle margin-tm text-in">{{ classify.companyRankingTitle }}</p>
                  <table class="img-table img-tableLong">
                    <thead>
                      <tr>
                        <th>排名</th>
                        <th>区/县</th>
                        <th>业户名称</th>
                        <th>入网车辆数</th>
                        <th>报警次数</th>
                        <th>车均报警</th>
                      </tr>
                    </thead>
                    <tbody>
                      <div v-for="item in classify.listCompanyRanking" var="item">
                        <tr>
                          <td>{{ item.ranking }}</td>
                          <td>{{ item.areaName }}</td>
                          <td>{{ item.companyName }}</td>
                          <td>{{ item.onlineVehicleCount }}</td>
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
                <div v-if="classify.listAlarmCountRanking.length > 0">
                  <!--4、普通货运超速报警次数排名前十车辆名单-->
                  <p class="textStyle margin-tm text-in">{{ classify.alarmCountRankingTitle }}</p>
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
                      <div v-for="item in classify.listAlarmCountRanking" var="item">
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
            </div>

            <div v-if="classify.alarmTypeCode == '102' && classify.opGpCode == '1'">
              <!--5、“两客一危”车均疲劳报警排名前十企业名单-->
              <div>
                <div v-if="classify.listCompanyRanking.length > 0">
                  <!--5、“两客一危”车均疲劳报警排名前十企业名单-->
                  <p class="textStyle margin-tm text-in">{{ classify.companyRankingTitle }}</p>
                  <table class="img-table img-tableLong">
                    <thead>
                      <tr>
                        <th>排名</th>
                        <th>区/县</th>
                        <th>业户名称</th>
                        <th>入网车辆数</th>
                        <th>报警持续时长(秒)</th>
                        <th>车均报警时长(秒)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <div v-for="item in classify.listCompanyRanking" var="item">
                        <tr>
                          <td>{{ item.ranking }}</td>
                          <td>{{ item.areaName }}</td>
                          <td>{{ item.companyName }}</td>
                          <td>{{ item.onlineVehicleCount }}</td>
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
                <div v-if="classify.listAlarmCountRanking.length > 0">
                  <!--6、“两客一危”疲劳报警次数排名前十车辆名单-->
                  <p class="textStyle margin-tm text-in">{{ classify.alarmCountRankingTitle }}</p>
                  <table class="img-table img-tableLong">
                    <thead>
                      <tr>
                        <th>排名</th>
                        <th>区/县</th>
                        <th>业户名称</th>
                        <th>车牌号</th>
                        <th>报警持续时长(秒)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <div v-for="item in classify.listAlarmCountRanking" var="item">
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
            </div>

            <div v-if="classify.alarmTypeCode == '102' && classify.opGpCode == '2'">
              <!--7、普通货运车均疲劳报警排名前十企业名单-->
              <div>
                <div v-if="classify.listCompanyRanking.length > 0">
                  <!--7、普通货运车均疲劳报警排名前十企业名单-->
                  <p class="textStyle margin-tm text-in">{{ classify.companyRankingTitle }}</p>
                  <table class="img-table img-tableLong">
                    <thead>
                      <tr>
                        <th>排名</th>
                        <th>区/县</th>
                        <th>业户名称</th>
                        <th>入网车辆数</th>
                        <th>报警持续时长(秒)</th>
                        <th>车均报警时长(秒)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <div v-for="item in classify.listCompanyRanking" var="item">
                        <tr>
                          <td>{{ item.ranking }}</td>
                          <td>{{ item.areaName }}</td>
                          <td>{{ item.companyName }}</td>
                          <td>{{ item.onlineVehicleCount }}</td>
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
                <div v-if="classify.listAlarmCountRanking.length > 0">
                  <!--8、普通货运疲劳报警次数排名前十车辆名单-->
                  <p class="textStyle margin-tm text-in">{{ classify.alarmCountRankingTitle }}</p>
                  <table class="img-table img-tableLong">
                    <thead>
                      <tr>
                        <th>排名</th>
                        <th>区/县</th>
                        <th>业户名称</th>
                        <th>车牌号</th>
                        <th>报警持续时长(秒)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <div v-for="item in classify.listAlarmCountRanking" var="item">
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
            </div>

            <div v-if="classify.alarmTypeCode == '35' && classify.opGpCode == '1'">
              <!--9、客运车辆2点到5点禁行排名前十企业名单-->
              <div>
                <div v-if="classify.listCompanyRanking.length > 0">
                  <!--9、客运车辆2点到5点禁行排名前十企业名单-->
                  <p class="textStyle margin-tm text-in">{{ classify.companyRankingTitle }}</p>
                  <table class="img-table img-tableLong">
                    <thead>
                      <tr>
                        <th>排名</th>
                        <th>区/县</th>
                        <th>业户名称</th>
                        <th>入网车辆数</th>
                        <th>报警车辆数</th>
                        <th>占比</th>
                      </tr>
                    </thead>
                    <tbody>
                      <div v-for="item in classify.listCompanyRanking" var="item">
                        <tr>
                          <td>{{ item.ranking }}</td>
                          <td>{{ item.areaName }}</td>
                          <td>{{ item.companyName }}</td>
                          <td>{{ item.onlineVehicleCount }}</td>
                          <td>{{ item.alarmVehicleCount }}</td>
                          <td>{{ item.avgAlarmCount }}</td>
                        </tr>
                      </div>
                    </tbody>
                  </table>
                </div>
              </div>
              <!--10、客运车辆2点到5点禁行排名前十车辆-->
              <div>
                <div v-if="classify.listAlarmCountRanking.length > 0">
                  <!--10、客运车辆2点到5点禁行排名前十车辆-->
                  <p class="textStyle margin-tm text-in">{{ classify.alarmCountRankingTitle }}</p>
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
                      <div v-for="item in classify.listAlarmCountRanking" var="item">
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
            </div>

            <div v-if="classify.alarmTypeCode == '106' && classify.opGpCode == '1'">
              <!--11、“两客一危”车均高速脱离监控报警排名前十企业-->
              <div>
                <div v-if="classify.listCompanyRanking.length > 0">
                  <!--11、“两客一危”车均高速脱离监控报警排名前十企业-->
                  <p class="textStyle margin-tm text-in">{{ classify.companyRankingTitle }}</p>
                  <table class="img-table img-tableLong">
                    <thead>
                      <tr>
                        <th>排名</th>
                        <th>区/县</th>
                        <th>业户名称</th>
                        <th>入网车辆数</th>
                        <th>报警次数</th>
                        <th>车均报警</th>
                      </tr>
                    </thead>
                    <tbody>
                      <div v-for="item in classify.listCompanyRanking" var="item">
                        <tr>
                          <td>{{ item.ranking }}</td>
                          <td>{{ item.areaName }}</td>
                          <td>{{ item.companyName }}</td>
                          <td>{{ item.onlineVehicleCount }}</td>
                          <td>{{ item.alarmCount }}</td>
                          <td>{{ item.avgAlarmCount }}</td>
                        </tr>
                      </div>
                    </tbody>
                  </table>
                </div>
              </div>
              <!--12、“两客一危”高速脱离监控报警次数排名前十车辆-->
              <div>
                <div v-if="classify.listAlarmCountRanking.length > 0">
                  <!--12、“两客一危”高速脱离监控报警次数排名前十车辆-->
                  <p class="textStyle margin-tm text-in">{{ classify.alarmCountRankingTitle }}</p>
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
                      <div v-for="item in classify.listAlarmCountRanking" var="item">
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
            </div>

            <div v-if="classify.alarmTypeCode == '106' && classify.opGpCode == '2'">
              <!--13、普通货运车均高速脱离监控报警排名前十企业名单-->
              <div>
                <div v-if="classify.listCompanyRanking.length > 0">
                  <!--13、普通货运车均高速脱离监控报警排名前十企业名单-->
                  <p class="textStyle margin-tm text-in">{{ classify.companyRankingTitle }}</p>
                  <table class="img-table img-tableLong">
                    <thead>
                      <tr>
                        <th>排名</th>
                        <th>区/县</th>
                        <th>业户名称</th>
                        <th>入网车辆数</th>
                        <th>报警次数</th>
                        <th>车均报警</th>
                      </tr>
                    </thead>
                    <tbody>
                      <div v-for="item in classify.listCompanyRanking" var="item">
                        <tr>
                          <td>{{ item.ranking }}</td>
                          <td>{{ item.areaName }}</td>
                          <td>{{ item.companyName }}</td>
                          <td>{{ item.onlineVehicleCount }}</td>
                          <td>{{ item.alarmCount }}</td>
                          <td>{{ item.avgAlarmCount }}</td>
                        </tr>
                      </div>
                    </tbody>
                  </table>
                </div>
              </div>
              <!--14、普通货运高速脱离监控报警次数排名前十车辆名单-->
              <div>
                <div v-if="classify.listAlarmCountRanking.length > 0">
                  <!--14、普通货运高速脱离监控报警次数排名前十车辆名单-->
                  <p class="textStyle margin-tm text-in">{{ classify.alarmCountRankingTitle }}</p>
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
                      <div v-for="item in classify.listAlarmCountRanking" var="item">
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
            </div>

            <div v-if="classify.alarmTypeCode == '20'">
              <!--15、疑似进入中高风险疫情防控地区排名前十企业名单-->
              <div>
                <div v-if="classify.listCompanyRanking.length > 0">
                  <!--15、疑似进入中高风险疫情防控地区排名前十企业名单-->
                  <p class="textStyle margin-tm text-in">{{ classify.companyRankingTitle }}</p>
                  <table class="img-table img-tableLong">
                    <thead>
                      <tr>
                        <th>排名</th>
                        <th>区/县</th>
                        <th>业户名称</th>
                        <th>入网车辆数</th>
                        <th>报警次数</th>
                        <th>车均报警</th>
                      </tr>
                    </thead>
                    <tbody>
                      <div v-for="item in classify.listCompanyRanking" var="item">
                        <tr>
                          <td>{{ item.ranking }}</td>
                          <td>{{ item.areaName }}</td>
                          <td>{{ item.companyName }}</td>
                          <td>{{ item.onlineVehicleCount }}</td>
                          <td>{{ item.alarmCount }}</td>
                          <td>{{ item.avgAlarmCount }}</td>
                        </tr>
                      </div>
                    </tbody>
                  </table>
                </div>
              </div>
              <!--16、疑似进入中高风险疫情防控地区排名前十车辆名单-->
              <div>
                <div v-if="classify.listAlarmCountRanking.length > 0">
                  <!--16、疑似进入中高风险疫情防控地区排名前十车辆名单-->
                  <p class="textStyle margin-tm text-in">{{ classify.alarmCountRankingTitle }}</p>
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
                      <div v-for="item in classify.listAlarmCountRanking" var="item">
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
            </div>

            <div v-if="classify.alarmTypeCode == '45'">
              <!--15、疑似异地经营车辆名单-->
              <div>
                <div v-if="classify.listAlarmCountRanking.length > 0">
                  <!--15、疑似异地经营车辆名单-->
                  <p class="textStyle margin-tm text-in">{{ classify.alarmCountRankingTitle }}</p>
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
                      <div v-for="item in classify.listAlarmCountRanking" var="item">
                        <tr>
                          <td>{{ item.ranking }}</td>
                          <td>{{ item.areaName }}</td>
                          <td>{{ item.companyName }}</td>
                          <td>{{ item.eventStatus }}</td>
                          <td>{{ item.plateNum }}</td>
                          <td>{{ item.locationAddress }}</td>
                        </tr>
                      </div>
                    </tbody>
                  </table>
                  <p class="textStyle margin-tm text-in">&emsp;&emsp;疑似异地经营报警说明：未纠正、已纠正都是代表有疑似异地经营的报警。
                    最后停留区域显示为“-”代表未纠正车辆20XX年X月1日前未返回车籍地，
                    故没有位置信息；已纠正代表车辆20XX年X月1日前已经返回车籍地。
                    <span
                      style="color: red">(有未纠正和已纠正的车辆)</span><br />&emsp;&emsp;疑似异地经营报警说明：已纠正是代表有疑似异地经营的报警,已纠正代表车辆2020年X月X日前已经返回车籍地。
                    <span
                      style="color: red">（只有已纠正的车辆）</span><br />&emsp;&emsp;疑似异地经营报警说明：未纠正是代表有疑似异地经营的报警，最后停留区域显示为“-”代表未纠正车辆20XX年X月1日前未返回车籍地，故没有位置信息。
                    <span style="color: red">（只有未纠正的车辆）</span>
                  </p>
                </div>
              </div>
            </div>

          </div>

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

const { head, listOpTypeStatistic, listOnlineAnalysis, onlineRanking, alarmTypeAnalysis, alarmClassifyRanking, classify,   } = data

</script>

<style scoped lang="scss">
@import url(./briefReport.css);
</style>
