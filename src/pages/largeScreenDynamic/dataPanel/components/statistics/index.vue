<template>
    <div
        class="pt20 positionTc"
        v-loading="loading"
        :element-loading-background="elementLoadingBackground"
        ref="operRef"
    >
        <!-- ------------------中间统计-------------------------- -->
        <div class="centre-top-layout pt5 pr20 pl20">
            <ul class="statistics_head tw_clr">
                <li
                    v-for="(item, i) in list"
                    :key="i"
                    class="tw_clr pointer"
                >
                    <el-image
                        class="mr5 tw_c"
                        style="width: 43px"
                        :src="item.icon"
                        @click="tapItem(item, 'icon')"
                    ></el-image>
                    <div class="">
                        <div class="statistics_txt fs14 title">
                            {{ item.title }}
                        </div>
                        <div class="statistics_num fs24 title"  @click="tapItem(item, 'num')">
                            <countTo
                                :startVal="0"
                                :endVal="data[item.key]"
                                :duration="duration"
                            ></countTo>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import countTo from '../counTo/vue-countTo.vue'

// 图标
import iconCars from '@/assets/images/dataPanel/cars.png'
import iconAdas from '@/assets/images/dataPanel/adas.png'
import iconAlarmcount from '@/assets/images/dataPanel/alarmcount.png'
import iconDsm from '@/assets/images/dataPanel/dsm.png'
import iconYingyun from '@/assets/images/dataPanel/yingyun.png'
import iconHandle from '@/assets/images/dataPanel/handle.png'
// import { AlarmListItem } from '../../types'

const { id, data, loading, elementLoadingBackground } = defineProps({
    id: { type: String, default: 'container' },
    data: {
        type: Object,
        default: () => {
            return {
                alarmVehicleCount: 146,
                dsmAlarmCount: 17656,
                adasAlarmCount: 123456,
                generalAlarmCount: 123456,
                alarmCount: 123456,
                alarmDealCount: 123456,
            }
        },
    },
    loading: { type: Boolean, default: false },
    elementLoadingBackground: String,
})
let duration = $ref(2000)
let list = $ref([
    {
        icon: iconCars,
        title: '报警车辆数',
        val: data.alarmVehicleCount,
        key: 'alarmVehicleCount',
    },
    { icon: iconDsm, title: 'DSM报警', val: data.dsmAlarmCount, key: 'dsmAlarmCount' },
    { icon: iconAdas, title: 'ADAS报警', val: data.adasAlarmCount, key: 'adasAlarmCount' },
    {
        icon: iconYingyun,
        title: '营运报警',
        val: data.generalAlarmCount,
        key: 'generalAlarmCount',
    },
    { icon: iconAlarmcount, title: '报警条数', val: data.alarmCount, key: 'alarmCount' },
    { icon: iconHandle, title: '报警处置', val: data.alarmDealCount, key: 'alarmDealCount' },
])

let emits = defineEmits(['viewData'])
const tapItem = (item, type) => {
    item.type = type
    emits('viewData', item)
}
// let listClone =
// watch(
//     () => data,
//     (nv) => {
//         // list = list.map((item) => {
//         //     item.val = data[item.key] || 0
//         //     return item
//         // })
//         console.log(list, data, 'statistics data')
//     },
// )

// onMounted(() => {
//     console.log(list, data, 'statistics list')
// })
</script>
<style scoped lang="scss">
.centre-top-layout {
    width: 97%;
    margin: 0 auto;
    color: #fff;
    font-family: 'Arial Normal', 'Arial', sans-serif;
    min-height: 153px;
    :deep(.el-icon) {
        padding-bottom: 8px;
    }
    :deep(.bot_icon) {
        padding-bottom: 2px;
    }
    .statistics_txt {
        width: 220px;
        line-height: 7px;
        height: 7px;
        margin-bottom: 6px;
        font-size: 12px;
        background: rgba(108, 128, 151, 0.1);
    }
    .statistics_head {
        .statistics_num {
            background: rgba(108, 128, 151, 0.1);
            width: 220px;
            line-height: 30px;
            font-size: 20px;
            color: rgba(208,222,238,1);
            text-shadow: rgba(21, 154, 255, 0.5);
        }
    }
    .statistics_bot {
        .statistics_num {
            background: rgba(108, 128, 151, 0.1);
            width: 220px;
            line-height: 26px;
            font-size: 18px;
        }
    }
}
</style>
