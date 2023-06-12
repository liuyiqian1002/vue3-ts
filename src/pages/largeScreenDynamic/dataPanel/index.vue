<template>
    <div id="home" class="w relative">
        <div class="home_head positionTl">
            <div class="home_head_title tw_lr white pt15 pl20 pr20">
                <div class="home_head_title_date home_head_title_txt tw">
                    <!-- <p class="home_head_title_date_txt fs10">{{ date }}</p>
                    <span class="fs12">{{ time }}</span>
                    <span class=" ml5 fs12">{{ weekArr[week] }}</span>
                    <span class="ml10">{{city.city}}</span> -->
                </div>
                <h1 class="home-title positionTc fw700 pt5" style="top: 15px">
                    主动安全风险看板
                </h1>
                <div
                    class="
                        home_head_title_details home_head_title_txt
                        tw tw_clr
                    "
                >
                    <span class="mr5 fs12">
                        <el-image :src="iconDot"></el-image>
                    </span>
                    <span class="mr15 relative" style="padding-left: 16px">
                        <span>{{ time }}</span>
                    </span>
                    <span class="mr5">
                        <el-image :src="iconSplit1"></el-image>
                    </span>
                    <span class="mr15 relative" style="padding-left: 16px">
                        <span>{{ date }}</span>
                    </span>
                    <span class="mr5">
                        <el-image :src="iconSplit1"></el-image>
                    </span>
                    <span>{{ weekArr[week] }}</span>
                    <!-- <span @click="viewFull" class="border-xian pl15 mr5 pointer fs12" style="margin-top: -2px">
                        <svg-icon :icon-class="isFullscreen?'fangda':'suoxiao'" color="#fff"></svg-icon>
                    </span> -->
                </div>
            </div>
            <!-- <img class="img_gif positionTl" :src="bgDx" /> -->
        </div>
        <el-row
            id="home_content"
            ref="homeRef"
            class="pl20 pr20 pb30 h"
            :gutter="12"
        >
            <statistics
                ref="statisticsRef"
                class="w"
                :elementLoadingBackground="elementLoadingBackground"
                :data="allStatisticData"
                @viewData="statisticsData"
            ></statistics>
            <el-col :span="5" class="alarm-l-wrapper">
                <alarmTypeList
                    :id="'left'"
                    :lists="leftList"
                    @viewData="alarmListData"
                >
                    <titlePanel :title="currentTypeItem.title"></titlePanel>
                </alarmTypeList>
            </el-col>
            <el-col id="home_content_map" class="w h relative" :span="14">
                <!-- 中间图表组件 -->
                <alarmTypeChart
                    v-show="showChart"
                    ref="alarmTypeChartRef"
                    :elementLoadingBackground="elementLoadingBackground"
                    :totalCount="totalCount"
                    :loading="alarmTypeLoading"
                    id="alarmTypeChart"
                >
                    <titlePanel
                        :title="`${
                            currentTypeItem.title
                                ? currentTypeItem.title + '（已选报警类型）'
                                : '报警看板'
                        }`"
                        showLeftIcon
                        showRightIcon
                        :onLeftIconClick="onLeftIconClick"
                        :onRightIconClick="onRightIconClick"
                        :splitIconNum="1"
                    ></titlePanel>
                </alarmTypeChart>
                <alarmTypeTable
                    v-show="!showChart"
                    :lists="alarmList"
                    :totalCount="totalCount"
                >
                    <titlePanel
                        :title="`${
                            currentTypeItem.title
                                ? currentTypeItem.title + '（已选报警类型）'
                                : '报警看板'
                        }`"
                        showLeftIcon
                        showRightIcon
                        :onLeftIconClick="onLeftIconClick"
                        :onRightIconClick="onRightIconClick"
                        :splitIconNum="1"
                    ></titlePanel>
                </alarmTypeTable>
            </el-col>
            <el-col
                class="tw_cytb h alarm-l-wrapper alarm-r-wrapper"
                style="box-sizing: border-box; flex-direction: column"
                :span="5"
            >
                <alarmTypeList
                    :id="'right'"
                    :lists="rightList"
                    @viewData="alarmListData"
                >
                    <titlePanel :title="currentTypeItem.title"></titlePanel>
                </alarmTypeList>
            </el-col>
        </el-row>
        <!--------引入首页弹窗组件-------- -->
        <!-- 报警明细弹窗 -->
        <alarmListDetail
            ref="alarmListDetailRef"
            :title="currentISubtem?.subTypeCodeName"
        ></alarmListDetail>
        <!-- 看板设置弹窗 -->
        <panelSetting
            ref="panelSettingRef"
            @updatePanelData="getData"
        ></panelSetting>
        <!--------引入首页弹窗组件-------- -->
    </div>
</template>

<script setup lang="ts">
import titlePanel from './components/titlePanel/index.vue'
import alarmTypeChart from './components/alarmTypeChart/index.vue'
import alarmTypeTable from './components/alarmTypeTable/index.vue'
import statistics from './components/statistics/index.vue'
import alarmTypeList from './components/alarmTypeList/index.vue'
import { getSafetySignBoard } from '@/api/largeScreen'
import screenfull from 'screenfull'

// import { watch } from 'vue'
import { AlarmListItem, SafetySignBoardRes } from './types'
// 图标
import iconDot from '@/assets/images/dataPanel/dot.png'
import iconSplit1 from '@/assets/images/dataPanel/split1.png'

// ------引入首页弹窗组件----------.
import alarmListDetail from './components/alarmListDetail/index.vue'
import panelSetting from './components/panelSetting/index.vue'

// const alarmTypeChart = defineAsyncComponent(() => import('./components/alarmTypeChart/index.vue'))
// const alarmTypeChart = defineAsyncComponent({
//     loader: () => import('./components/alarmTypeChart/index.vue'),
//     loadingComponent: titlePanel,
//     errorComponent: titlePanel,
//     delay: 0,
//     timeout: 1000
// })

const proxy: any = getCurrentInstance()?.proxy

// dayjs.extend(WeekDay);
/*-- 头部数据 --*/
let date = $ref(proxy.$dayjs().format('YYYY.MM.DD'))
let time = $ref(proxy.$dayjs().format('HH:mm:ss'))
let week = $ref(proxy.$dayjs().day())
let weekArr = $ref([
    '',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期天',
])

/*-- ref变量 --*/
let alarmTypeChartRef = $ref(null)
let statisticsRef = $ref(null)

/*-- 公共数据 --*/
let allStatisticData = $ref<SafetySignBoardRes>() // 全部统计数据汇总
let subtypeStatisticData = $ref<SafetySignBoardRes>() // 子大类统计数据汇总
let currentTypeItem = $ref<AlarmListItem>() // 当前选中的大类
let currentISubtem = $ref<AlarmListItem>() // 当前选中的子类
let isFullscreen = $ref(true)
let elementLoadingBackground = $ref('rgba(0,0,0,0.2)')

let totalCount: number | undefined = $ref(0)

/*-- loading状态 --*/
// let statisticDataLoading = $ref(false)
let alarmTypeLoading = $ref(true)

// 1驾驶员状态报警DSM 2智能驾驶辅助报警ADAS 3 营运报警
const analysisType: number | undefined = $ref(undefined)
let alarmList: Array<AlarmListItem> = $ref([])

const getData = (item) => {
    console.log(item, 'getData item')
    // 1驾驶员状态报警 2智能驾驶辅助报警 3 营运报警
    const typeMap = {
        all: undefined,
        dsmAlarmCount: 1,
        adasAlarmCount: 2,
        generalAlarmCount: 3,
    }
    const type = typeMap[item?.key]
    if (!type) {
        // 获取全部类型数据时清空当前大类信息
        currentTypeItem = {} as AlarmListItem
    }
    getSafetySignBoard({ analysisType: type })
        .then((res: SafetySignBoardRes) => {
            console.log(res, 'alarmTypeChartRef.update')
            alarmTypeLoading = false
            alarmTypeChartRef.update({
                list: res.signBoardDtos,
                tData: { ...item, val: res.alarmCount },
            })
            if (type) {
                subtypeStatisticData = res
            } else {
                // type不存在的时候就是全部汇总，全部汇总才需要修改统计数据
                allStatisticData = res
            }
            totalCount = res.alarmCount
            alarmList = res.signBoardDtos
            splitAlarmList(alarmList)
        })
        .catch(() => {
            alarmTypeLoading = false
        })
}

// watch(() => totalCount, (val) => {
//     console.log(val, 'totalCount watch')
// })

// ------引入首页弹窗组件----------.
const alarmListDetailRef = $ref(null)
const alarmListData = (item: AlarmListItem) => {
    console.log(item, 'alarmListData index')
    currentISubtem = item
    alarmListDetailRef.alarmListData(item, 1)
    //TODO 需要跟饼图联动
    alarmTypeChartRef.clickItem(item)
}

// 看板设置弹窗
let panelSettingRef = $ref(null)

const panelSettingData = () => {
    panelSettingRef.panelSettingData()
}

const onRightIconClick = () => {
    console.log('onRightIconClick')
    panelSettingData()
}

// const operatorRef = $ref(null)
const statisticsData = (item) => {
    console.log(item, 'statistic item click')

    if (
        item.key === 'dsmAlarmCount' ||
        item.key === 'adasAlarmCount' ||
        item.key === 'generalAlarmCount'
    ) {
        // 当前页面数据
        currentTypeItem = item
        console.log(item, 'change')
        getData(item)
    } else {
        // 弹窗table
        console.log(item, 'table')
        currentISubtem = {} as AlarmListItem
        currentTypeItem = {} as AlarmListItem
        if (item.type === 'num') {
            alarmListDetailRef.alarmListData(
                { ...item, subTypeCode: undefined },
                1,
            )
        } else {
            getData({ key: 'all' })
        }
    }
    // if (currentISubtem.title) {
    //     currentISubtem = {}
    // }
    console.log(currentISubtem, 'currentISubtem')
}
// ------引入首页弹窗组件----------.

// 中间饼图与表格切换标识
let showChart: Boolean = $ref(true)
const onLeftIconClick = () => {
    console.log('onLeftIconClick')
    showChart = !showChart
}

onActivated(() => {
    date = proxy.$dayjs().format('YYYY.MM.DD')
    week = proxy.$dayjs().day()
})

let timer = setInterval(() => {
    time = proxy.$dayjs().format('HH:mm:ss')
}, 1000)

onUnmounted(() => {
    clearInterval(timer)
})
const viewFull = () => {
    // screenfull.toggle()
    // isFullscreen = screenfull.isFullscreen
    if (screenfull.isFullscreen) {
        screenfull.exit()
    } else {
        screenfull.request(document.getElementById('home'))
    }
}

getData(analysisType)

let leftList: AlarmListItem[] = $ref([])
let rightList: AlarmListItem[] = $ref([])

// 将alarmList平分成左右两个数组
const splitAlarmList = (list: Array<AlarmListItem>) => {
    let cIndex: number = Math.floor(list.length / 2)
    leftList = list.slice(0, cIndex)
    rightList = list.slice(cIndex, list.length)
}
</script>

<style scoped lang="scss">
#home {
    background: #1a1f3b;
    //  background: url("@/assets/images/homepage/home-bg.jpg") no-repeat;background-size: 100% 100%;
    height: calc(100% - 80px);
    padding-top: 80px;
    #home_content {
        #home_content_map {
            margin-top: 100px;
        }
        .alarm-l-wrapper {
            margin-top: 100px;
        }
        .alarm-r-wrapper {
            display: flex;
            align-items: flex-end;
        }
    }
    .home_head {
        width: 100%;
        height: 230px;
        background: url('@/assets/images/dataPanel/title_bg.png') no-repeat;
        background-size: 100% 80px;
        .home-title {
            font-size: 22px;
            text-shadow: 0 1px 8px rgba(42, 211, 245, 0.72);
        }
        .home_head_title_details {
            justify-content: flex-start;
            margin-top: -8px;
        }
        span {
            display: inline-block;
        }
        .home_head_title_txt {
            //  font-family: 'douyuZt';
            font-family: 'DIN Alternate';
            color: rgba(217, 251, 255, 0.6);
            //  letter-spacing: 2px;
            font-size: 16px;
            .home_head_title_date_txt {
                transform: scale(1);
                color: rgba(255, 255, 255, 0.8);
            }
            :deep(.el-dropdown) {
                height: 16px;
                color: #fff;
                font-size: 12px;
                cursor: pointer;
            }
            :deep(.tianqi) {
                top: -10px;
                left: 14px;
                width: 30px;
                height: 30px;
            }
            .temperature {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.6);
                transform: scale(0.8) translate(2px, -10px);
            }
            .pm25 {
                :deep(.pm25-icon) {
                    top: -6px;
                    right: 5px;
                    color: rgba(255, 255, 255, 0.8);
                }
            }
            .border-xian {
                position: relative;
                &::after {
                    content: '';
                    position: absolute;
                    top: 0px;
                    height: 18px;
                    left: -1px;
                    width: 1px;
                    background: #fff;
                }
            }
        }
        .img_gif {
            width: 100%;
            height: 5px;
            top: 60px;
        }
    }
    @media (max-width: 1700px) {
        .home_head {
            .home-title {
                font-size: 24px;
            }
            .home_head_title_txt {
                transform: scale(0.9);
            }
        }
    }
    @media (max-width: 1380px) {
        .home_head {
            background-size: 100% 117px;
            .home-title {
                font-size: 20px;
            }
            .home_head_title_txt {
                transform: scale(0.8);
            }
        }
    }
}
</style>

function $ref(arg0: number): number {
  throw new Error('Function not implemented.');
}

function $ref(arg0: null) {
  throw new Error('Function not implemented.');
}
