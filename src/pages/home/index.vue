<template>
    <div id="home" class="w relative">
        <div class="home_head positionTl">
            <div class="home_head_title tw_lr white pt15 pl20 pr20">
                <div class="home_head_title_date home_head_title_txt tw">
                    <p class="home_head_title_date_txt lh16 fs10">{{ date }}</p>
                    <span class="fs12 lh16">{{ time }}</span>
                    <span class=" ml5 lh16 fs12">{{ weekArr[week] }}</span>
<!--                    <span class="ml10 lh16">{{city.city}}</span>-->
                </div>
                <h1 class="home-title positionTc fw700 pt5" style="top: 20px;font-size: 24px;">{{$store.getters.productPrimaryName}}</h1>
<!--                <h1 class="home-title positionTc fw700 pt5" style="top: 20px;font-size: 24px;">兴山县兴发汽运有限公司</h1>-->
                <!-- <h2 class="home-title positionTc fw700 pt5" style="top: 20px;font-size: 24px;">湖北兴发化工集团安全生产智</h2> -->
                <div class="home_head_title_details home_head_title_txt tw">
                    <span class="mr5 fs12 pr10">
                        <el-select :teleported="false" class="border-no select_area" v-model="areaId">
                            <el-option v-for="(item, i) in options" @click="selectCtiy(i)" :key="item.areaId" :value="item.areaId" :label="item.name">{{ item.name }}</el-option>

                        </el-select>
<!--                        <el-dropdown >-->
<!--                            <span class="el-dropdown-link">-->
<!--                              {{ options[areaIndex]?.name }}-->
<!--                              <el-icon class="el-icon&#45;&#45;right">-->
<!--                                <arrow-down />-->
<!--                              </el-icon>-->
<!--                            </span>-->
<!--                            <template #dropdown>-->
<!--                              <el-dropdown-menu>-->
<!--                                <el-dropdown-item v-for="(item, i) in options" @click="selectCtiy(i)" :key="item.areaId">{{ item.name }}</el-dropdown-item>-->
<!--                              </el-dropdown-menu>-->
<!--                            </template>-->
<!--                        </el-dropdown>-->
                    </span>
                    <span class="border-xian fs12 mr15 relative" style="padding-left: 56px">
<!--                        <svg-icon class-name="absolute tianqi mr10" icon-class="tianqi-duoyun" color="#fff" size="50px"></svg-icon>-->
                        <img class="absolute tianqi" :src="objTianqi[weatherData.weather] || dy"/>
                        <span class="tw mt3">{{ weatherData.temperature }} <p class="temperature">℃</p></span>
                    </span>
<!--                    <span class="border-xian mr5 fs12 relative pt3 pm25" style="padding: 0 56px 0 20px">30 <svg-icon class-name="pm25-icon absolute" size="42px" icon-class="a-pm25"></svg-icon></span>-->
                    <span @click="viewFull" class="border-xian pl15 mr5 pointer fs12" style="margin-top: -2px">
                        <svg-icon :icon-class="isFullscreen?'fangda':'suoxiao'" color="#fff"></svg-icon>
                    </span>
<!--                    <svg-icon color="red" icon-class="zhexiantu"></svg-icon>-->
<!--                    <svg-icon color="red" icon-class="bingtu"></svg-icon>-->
<!--                    <svg-icon color="red" icon-class="paihangbang"></svg-icon>-->
<!--                    <svg-icon color="red" icon-class="tiaoxingtu"></svg-icon>-->
                </div>
            </div>
            <img class="img_gif positionTl" :src="bgDx" />
        </div>
        <el-row id="home_content" ref="homeRef" class="pl20 pr20 pb30 h" :gutter="12">
            <el-col :span="6">
               <cars  ref="carsRef" :elementLoadingBackground="elementLoadingBackground" :loading="carsLoading" id="cars">
                   <homeTitle title="车辆分布" icon="bingtu" @viewData="carlocationData"></homeTitle>
               </cars>
                <service  ref="serviceRef" :elementLoadingBackground="elementLoadingBackground"  :loading="serviceLoading">
                    <homeTitle title="报警趋势（营运类型）" icon="zhexiantu" :dateType="serviceDateType" showRadio  @changeDate=" districtChangeDate" @viewData="operationalarmData"></homeTitle>
                </service>
                <district  ref="districtRef" :elementLoadingBackground="elementLoadingBackground"  :loading="districtLoading" >
                    <homeTitle title="报警趋势（区域）" icon="zhexiantu" :dateType="districtDateType" showRadio  @changeDate="serviceChangeDate" @viewData="localalarmData"></homeTitle>
                </district>
            </el-col>
            <el-col id="home_content_map" class="w h relative" :span="12">
                <statistics class="w" :elementLoadingBackground="elementLoadingBackground" :data="homeData" @viewData="operatorData" :loading="homeDataLoading"></statistics>
             <!-- 地图组件 -->
                <centreMap v-if="areaId" :areaItem="options[areaIndex]" :areaId="areaId"></centreMap>
<!--                <centreMap :areaId="areaId"></centreMap>-->
            </el-col>
            <el-col class="tw_cytb h" style="box-sizing: border-box;flex-direction: column;" :span="6">
                <analyse id="analyse_txfx" ref="analyseRef" v-if="$store.getters.users.userAccount == 'xingfa'">
                    <homeTitle icon="bingtu"  title="车辆行业分布" @viewData="viewVehicleDistribution"></homeTitle>
                </analyse>
                <vehicle ref="vehicleRef" :elementLoadingBackground="elementLoadingBackground" :loading="vehicleLoading">
                    <homeTitle icon="tiaoxingtu" @viewData="vehiclewarningData"></homeTitle>
                </vehicle>
                <taper ref="taperRef" :elementLoadingBackground="elementLoadingBackground" :loading="taperLoading" id="taper">
                    <homeTitle icon="paihangbang" title="7 天警情类型排行（top5）" @viewData="typeofalarmData"></homeTitle>
                </taper>
                <risk ref="riskRef" v-if="$store.getters.users.userAccount != 'xingfa'" :elementLoadingBackground="elementLoadingBackground"  :loading="riskLoading"  id="vehicle_two">
                    <homeTitle icon="zhexiantu"  title="风险时段" @viewData="periodofriskData"></homeTitle>
                </risk>
            </el-col>
        </el-row>
        <!--------引入首页弹窗组件-------- -->
        <!-- 运营商 -->
        <operator ref="operatorRef" ></operator>
        <!-- 车辆分布 -->
        <carlocation ref="carlocationRef" ></carlocation>
        <!--报警趋势（营运） -->
        <operationalarm v-model:dateType="serviceDateType" ref="operationalarmRef" :areaId="areaId"></operationalarm>
        <!--报警趋势（区域） -->
        <localalarm v-model:dateType="districtDateType" ref="localalarmRef" :areaId="areaId"></localalarm>
         <!-- 7天车辆警情排名 -->
        <vehiclewarning ref="vehiclewarningRef" ></vehiclewarning>
        <!-- 7天类型警情排名 -->
        <typeofalarm ref="typeofalarmRef" ></typeofalarm>
        <!-- 7天风险时段 -->
        <!-- <periodofrisk ref="periodofriskRef" ></periodofrisk> -->
        <alarmDetails ref="periodofriskRef" ></alarmDetails>
        <!-- 车辆行业分析 -->
        <vehicleDistribution ref="vehicleDistributionRef" ></vehicleDistribution>
        <!--------引入首页弹窗组件-------- -->
    </div>
    
</template>

<script setup lang="ts">
import homeTitle from './components/homeTitle/index.vue'
import cars from './components/cars/index.vue'
import service from './components/service/index.vue'
import district from './components/district/index.vue'
import centreMap from './components/centreMap/index.vue'
import statistics from './components/statistics/index.vue'
import vehicle from './components/vehicle/index.vue'
import taper from './components/taper/index.vue'
import risk from './components/risk/index.vue'
import analyse from './components/analyse/index.vue'
import {
    getAreaList,
    getVehicleAlarmTop5Info,
    getAlarmTypeTop5Dto,
    getVehicleDetail,
    getHomePage24HourStatisticsDto,
    getAlarmCount,
    getHomePageAreaAlarmChartDto,
    getVehicleInfo,
    getOperateType
} from "@/api/home";
import screenfull from "screenfull";

/*-- 图片资源 --*/
import bgDx from '../../assets/images/homepage/bg-dx.gif'
import baofengxue from '../../assets/images/homepage/tq_baofengxue.png'
import baofengyu from '../../assets/images/homepage/tq_baofengyu.png'
import daxue from '../../assets/images/homepage/tq_daxue.png'
import dayu from '../../assets/images/homepage/tq_dayu.png'
import dy from '../../assets/images/homepage/tq_dy.png'
import qingtian from '../../assets/images/homepage/tq_qingtian.png'
import wu from '../../assets/images/homepage/tq_wu.png'
import xiaoxue from '../../assets/images/homepage/tq_xiaoxue.png'
import xiaoyu from '../../assets/images/homepage/tq_xiaoyu.png'
import xue from '../../assets/images/homepage/tq_xue.png'
import yintian from '../../assets/images/homepage/tq_yintian.png'
import zx from '../../assets/images/homepage/tq_zx.png'
import zy from '../../assets/images/homepage/tq_zy.png'



// ------引入首页弹窗组件----------.
import carlocation from './components/homepagepopup/carlocation/index.vue'
import operator from './components/homepagepopup/operator/index.vue'
import operationalarm from './components/homepagepopup/operationalarm/index.vue'
import localalarm from './components/homepagepopup/localalarm/index.vue'
import vehiclewarning from './components/homepagepopup/vehiclewarning/index.vue'
import typeofalarm from './components/homepagepopup/typeofalarm/index.vue'
import periodofrisk from './components/homepagepopup/periodofrisk/index.vue'
import alarmDetails from './components/homepagepopup/alarmdetails/index.vue'
import vehicleDistribution from './components/homepagepopup/vehicleDistribution/index.vue'


let { proxy} = getCurrentInstance()

// dayjs.extend(WeekDay);
/*-- 头部数据 --*/
let areaIndex = $ref(0)
let options = $ref([])
let date = $ref(proxy.$dayjs().format('YYYY.MM.DD'))
let time = $ref(proxy.$dayjs().format('HH:mm'))
let week = $ref(proxy.$dayjs().day())
let weekArr = $ref(['','星期一','星期二','星期三','星期四','星期五','星期六','星期天'])
let weatherData = $ref({})
let city = $ref({})
let serviceDateType = $ref(0)
let districtDateType = $ref(0)
let objTianqi = reactive({
    '暴雪': baofengxue,
    '暴雨': baofengyu,
    '大雪': daxue,
    '大雨': dayu,
    '多云': dy,
    '晴': qingtian,
    '雾': wu,
    '小雪': xiaoxue,
    '小雨': xiaoyu,
    '雪': xue,
    '阴天': yintian,
    '中雪': zx,
    '中雨': zy,
})

/*-- ref变量 --*/
let homeRef = $ref(null)
let analyseRef = $ref(null)
let vehicleRef = $ref(null)
let taperRef = $ref(null)
let riskRef = $ref(null)
let carsRef = $ref(null)
let serviceRef = $ref(null)
let districtRef = $ref(null)

// ------引入首页弹窗组件----------.
const carlocationRef = $ref(null)
const carlocationData = ()=>{
    carlocationRef.carlocationData(areaId)
}
const operatorRef = $ref(null)
const operatorData = ()=>{
    operatorRef.operatorData(areaId)
}
const operationalarmRef = $ref(null)
const operationalarmData = ()=>{
    operationalarmRef.operationalarmData()
}
const localalarmRef = $ref(null)
const localalarmData = ()=>{
    localalarmRef.localalarmData()
}
const vehiclewarningRef = $ref(null)
const vehiclewarningData = ()=>{
    vehiclewarningRef.vehiclewarningData(areaId)
}
const typeofalarmRef = $ref(null)
const typeofalarmData = ()=>{
    typeofalarmRef.typeofalarmData(areaId)
}
const periodofriskRef = $ref(null)
const periodofriskData = ()=>{
    periodofriskRef.periodofriskData(areaId)
}

const vehicleDistributionRef = $ref(null)
const viewVehicleDistribution = ()=>{
    vehicleDistributionRef.periodofriskData(analyseLists)
}

// ------引入首页弹窗组件----------.

/*-- 图表数据对象 --*/
let vehicleLists = $ref([])
let taperLists = $ref([])

/*-- 公共数据 --*/
let areaId = $ref(0)
let homeData = $ref({})
let isFullscreen = $ref(true)
let elementLoadingBackground = $ref('rgba(0,0,0,0.2)')

/*-- loading状态 --*/
let homeDataLoading = $ref(false)
let vehicleLoading = $ref(false)
let taperLoading = $ref(false)
    //7天风险时段
let riskLoading = $ref(false)
    // 车辆分布
let carsLoading = $ref(false)
let serviceLoading = $ref(false)
let districtLoading = $ref(false)
let analyseLists = $ref([])


onActivated(()=>{
    date = proxy.$dayjs().format('YYYY.MM.DD')
    week = proxy.$dayjs().day()
})

let timer = setInterval(()=>{
    time = proxy.$dayjs().format('HH:mm')
    getHomeData(areaId)
}, 30000)

onUnmounted(()=>{
    clearInterval(timer)
})
const viewFull = ()=>{
    // screenfull.toggle()
    isFullscreen = screenfull.isFullscreen
    if(screenfull.isFullscreen) {
        screenfull.exit()
    }else {
        screenfull.request(document.getElementById('home'))
    }
}

const getWeather = ()=>{
    //加载天气查询插件
    AMap.plugin('AMap.Weather', function() {
        //创建天气查询实例
        let weather = new AMap.Weather();
        
        //执行实时天气信息查询
        weather.getLive(options[areaIndex].name, function(err, data) {
            weatherData = data
        });
    });
    
    AMap.plugin('AMap.CitySearch', function () {
        let citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                // 查询成功，result即为当前所在城市信息
                city = result
            }
        })
    })
}

// 城市切换
const selectCtiy = (i) =>{
    areaIndex = i
}
let store = useStore()
// 获取地域信息
getAreaList({}).then(res=>{
    options = res
    areaId = options[areaIndex].areaId
    getWeather()
    return areaId
}).then(areaId=>{
    // 车辆行业分布
    if(store.getters.users.userAccount == 'xingfa') {
        getOperateType({areaId: areaId}).then(res=>{
            // taperLoading = false
            analyseLists = res
            analyseRef.update(res)
        }).catch(()=>{
            // taperLoading = false
        })
    }
    
    // 七天车辆
    vehicleLoading = true
    getVehicleAlarmTop5Info({areaId: areaId}).then(res=>{
        vehicleLoading = false
        vehicleLists = res
        vehicleRef.update(res)
    }).catch(()=>{
        vehicleLoading = false
    })
    // 车辆总数及上线情况
    getHomeData(areaId)
    // 7天报警类型排行
    taperLoading = true
    getAlarmTypeTop5Dto({areaId: areaId}).then(res=>{
        taperLoading = false
        taperRef.update(res)
    }).catch(()=>{
        taperLoading = false
    })
    //7天风险时段
    riskLoading = true
    getHomePage24HourStatisticsDto({areaId:areaId}).then(res=>{
        riskLoading = false
        riskRef.update(res)
    }).catch(()=>{
        riskLoading = false
    })
    //报警趋势(区域)
    serviceChangeDate(0)
    //报警趋势(营运类型)
    districtChangeDate(0)
    
        //车辆分布
        carsLoading = true
        getVehicleInfo({areaId:areaId}).then(res=>{
            carsLoading = false
            carsRef.update(res)
        }).catch(()=>{
            carsLoading = false
        })
})

// 车辆总数及上线情况
const getHomeData = (areaId) => {
    // 车辆总数及上线情况
    homeDataLoading = true
    getVehicleDetail({areaId: areaId}).then(res=>{
        homeDataLoading = false
        homeData = res
    }).catch(()=>{
        homeDataLoading = false
    })
}

// 报警趋势(区域)
const serviceChangeDate = (searchType)=>{
    districtDateType = searchType
    districtLoading = true
    
    getHomePageAreaAlarmChartDto({areaId:areaId,searchType:searchType}).then(res=>{
        districtLoading = false
        districtRef.update(res)
    }).catch(()=>{
          
          districtLoading = false
    })
}

//报警趋势(营运类型)
const districtChangeDate = (type)=>{
    serviceLoading = true
    serviceDateType = type
    getAlarmCount({areaId:areaId,type:type}).then(res=>{
        serviceLoading = false
        serviceRef.update(res)
    }).catch(()=>{
        serviceLoading = false
    })
}

</script>

<style scoped lang="scss">
 #home {
     //background: radial-gradient(52.8% 52.8% at 50% 75%, rgba(23,53,135,1) 0%, rgba(26,31,59,1) 100%);
     background: url("@/assets/images/homepage/home-bg.jpg") no-repeat;background-size: 100% 100%;
     height: calc(100% - 80px);padding-top: 80px;
     #home_content {
         //#home_content_map { background: url("@/assets/images/homepage/content_bot.png") no-repeat;background-size: 100%; background-position: bottom}
    
     }
     .home_head {
         width: 100%;height: 230px;background: url("@/assets/images/homepage/home_head.png") no-repeat;background-size: 100% 127px;
         .home-title { font-size: 30px;text-shadow: 0 0 12px #2AD3FE;}
         .home_head_title_txt {
             font-family: 'douyuZt';
             .home_head_title_date_txt { transform: scale(0.8);color: rgba(255,255,255,0.8);}
             :deep(.el-dropdown) {
                 height: 16px;color: #fff;font-size: 12px;cursor: pointer;
             }
             :deep(.tianqi) { top: -10px; left: 14px;width: 30px; height: 30px}
             .temperature { font-size: 12px;color: rgba(255,255,255,0.6);transform: scale(0.8) translate(2px, -10px) }
            .pm25 {
                :deep(.pm25-icon) { top: -6px; right: 5px;color: rgba(255,255,255,0.8);}
            }
             .border-xian {
                 position: relative;
                &::after { content: ''; position: absolute; top: 0px;height: 18px;left: -1px;width: 1px;background: #fff}
             }
         }
         .img_gif {  width: 100%;height: 5px;top: 60px}
         :deep(.select_area) {
             background: rgba(0,0,0,0);width: 90px;
             .el-input__wrapper {background: rgba(0,0,0,0); box-shadow: none; height: 16px;}
             .el-input__inner {color: #fff;}
         }
     }
     @media (max-width: 1700px) {
         .home_head {
             .home-title {font-size: 24px}
             .home_head_title_txt {transform: scale(0.9);}
         }
     }
     @media (max-width: 1380px) {
         .home_head {
             background-size: 100% 117px;
             .home-title {font-size: 20px}
             .home_head_title_txt {transform: scale(0.8);}
         }
     }
 }
 

 
</style>
