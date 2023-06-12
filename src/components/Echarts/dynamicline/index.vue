<!-- 报警趋势(营运类型) -->
<template>
    <div v-loading="loading" :style="defaultStyle">
        <div class="defaultClass" :id="id" :style="defaultStyle"></div>
    </div>
</template>

<script setup lang="ts">
import { markRaw, nextTick, onMounted, watch } from '@vue/runtime-core'
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
let myChart = $ref(null)
let listsData = $ref([])

let option = {
    // backgroundColor: 'rgba(25, 38, 84, 1)', //rgba设置透明度0.1
    animationDuration: 2000,
    title: {
        // text: '报警趋势(营运类型)',
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
    legend: {
        x: 'right', // 水平居右
        left: '23%',
        top: '25%',
        // 文字颜色
        // bottom: ,
        itemGap: 15,
        itemWidth: 20,
        // itemHeight: 10,
        // 文字颜色
        textStyle: {
            fontSize: 10,
            color: '#F3FFFF',
        },
        data: ['危险货物运输', '普通客运', '班线客运', '旅游客运'],
    },
    // 设置图表四周留白间距
    grid: {
        left: 50,
        top: 90,
        bottom: '15%',
        right: '5%',
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false, //设置x轴两边的留白
            axisLabel: {
                // X轴字体样式
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
                // show:false,  //隐藏x轴线
                //x轴线条颜色
                lineStyle: {
                    color: '#444965',
                },
            },
            data: [],
        },
    ],
    yAxis: {
        type: 'value',
        name: '单位：次',
        min: 0,
        minInterval: 1,
        nameTextStyle: {
            align: 'right',
            fontSize: 10,
            color: '#fff',
            padding: [8, 0, 0,0],
        },
        // max: 1400, //最大刻度值
        // interval: 60, //刻度值间隔值
        splitNumber: 2,
        splitLine: {
            //网格线
            show: false, //关闭网格线
            lineStyle: {
                type: 'dashed', //设置网格线类型 dotted：虚线   solid:实线
                color: '#000', //网格线颜色
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
    series: [],
}
onMounted(() => {
    let chartDom = document.getElementById(id)
    myChart = markRaw(echarts.init(chartDom))
    option && myChart.setOption(option)
    window.addEventListener('resize', myChart.resize)
})
onUnmounted(() => {
    window.removeEventListener('resize', myChart.resize)
})
const update = (newVal) => {
    listsData = newVal
    option.series = newVal
    myChart.setOption(option, true)
}
defineExpose({ update })
</script>


<style scoped>
</style>
