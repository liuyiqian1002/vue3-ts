<!-- 7天风险时段 -->
<template>
    <div v-loading="loading" :style="defaultStyle">
        <div class="defaultClass" :id="id" :style="defaultStyle"></div>
    </div>
</template>

<script setup lang="ts">
import { markRaw, nextTick, onMounted, watch } from '@vue/runtime-core'
import { log } from 'console'
import * as echarts from 'echarts'

const { id, defaultStyle, lists, loading } = defineProps({
    id: { type: String, default: 'container' },
    defaultStyle: {
        type: Object,
        default: () => {
            return { width: '100%', height: '500px' }
        },
    },
    lists: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
})
let dataAxis = [80, 157, 140, 125, 129, 90, 180]
let data = ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00']
const update = (list) => {
    option.series[0].data = list.alarmCount
    option.xAxis.data = list.recordTime
    myChart.setOption(option, true)
}
defineExpose({ update })
let option = {
    // backgroundColor: 'rgba(25, 38, 84, 1)', //rgba设置透明度0.1
    animationDuration: 2000,
    //设置图表四周留白间距
    grid: {
        left: 50,
        top: 90,
        bottom: '15%',
        right: '5%',
    },
    //鼠标移入显示弹窗
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985',
            },
        },
    },
    xAxis: {
        type: 'category',
        boundaryGap: false, //设置x轴两边的留白
        axisLabel: {
            // X轴字体样式
            padding: [0, 30, 0, 30],
            textStyle: {
                color: '#F3FFFF',
                fontSize: 10,
            },
        },
        axisTick: {
            //x轴刻度尺
            show: true,
        },
        axisLine: {
            //x轴线条颜色
            show: false, //隐藏x轴线
            lineStyle: {
                color: '#21385E',
            },
        },
        data: data,
    },
    yAxis: {
        type: 'value',
        name: '单位：次',
        // max: 1400, //最大刻度值
        // interval:10, //刻度值间隔值
        splitNumber: 4,
        nameTextStyle: {
            align: 'center',
            fontSize: 9.5,
            color: '#fff',
            padding: [0, 30, 0, 0],
        },
        splitLine: {
            //网格线
            show: true, //关闭网格线
            lineStyle: {
                type: 'dashed', //设置网格线类型 dotted：虚线   solid:实线
                color: 'rgba(255, 255, 255, 0.08)', //网格线颜色
            },
        },
        axisLine: {
            //y轴线条颜色
            show: false,
            lineStyle: {
                color: '#F3FFFF',
            },
        },
        axisLabel: {
            // y轴字体样式
            textStyle: {
                color: '#F3FFFF',
                fontSize: 10,
            },
        },
    },
    series: [
        {
            type: 'line',
            smooth: false, //面积图改成直线或曲线
            lineStyle: {
                width: 2, //外边线宽度
                color: '#1DFDFD', //外边线颜色
            },
            showSymbol: false, //去除面积图节点圆
            areaStyle: {
                //区域填充渐变颜色
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 0.9,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'rgba(50, 228, 253, 0.4)', // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: 'rgba(32, 252, 254, 0)', // 100% 处的颜色
                        },
                    ],
                    global: false, // 缺省为 false
                },
            },
            data: dataAxis,
        },
    ],
}

let myChart = $ref(null)
let listsData = $ref([])
onActivated(() => {
    let chartDom = document.getElementById(id)
    myChart = markRaw(echarts.init(chartDom))
    option && myChart.setOption(option)
    window.addEventListener('resize', myChart.resize)
})
onUnmounted(() => {
    window.removeEventListener('resize', myChart.resize)
})

onDeactivated(() => {
    window.removeEventListener('resize', myChart.resize)
})

</script>


<style scoped>
</style>
