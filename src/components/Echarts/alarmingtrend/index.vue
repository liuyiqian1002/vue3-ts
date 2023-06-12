<!-- 报警趋势(区域) -->
<template>
    <div v-loading="loading" :style="defaultStyle">
        <div class="defaultClass" :id="id" :style="defaultStyle"></div>
    </div>
</template>

<script setup lang="ts">
import { markRaw, nextTick, onMounted, watch } from '@vue/runtime-core'
import * as echarts from 'echarts'
import { forIn } from 'lodash-es'

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
let dataAxis = [321, 321, 53, 534, 534, 674, 2343, 423, 543, 424]
let data = []
let legend = []
let service = []
const update = (list) => {
    data = []
    legend = []
    service = []
    for (let i = 0; i < list.length; i++) {
        let item = list[i]
        data.push(item.date)

        if (i == 0) {
            for (let j = 0; j < item.listOperateTypeCount.length; j++) {
                let tag = item.listOperateTypeCount[j]
                legend.push(tag.name)
                service.push({
                    name: tag.name,
                    type: 'line',
                    symbolSize: 0,
                    symbol: 'circle', //变为实心圆
                    //鼠标移入只显示一条线
                    emphasis: {
                        focus: 'series',
                    },
                    data: [],
                })
            }
        }

        for (let j = 0; j < item.listOperateTypeCount.length; j++) {
            let tag = item.listOperateTypeCount[j]
            service[j].data.push(tag.alarmCount)
        }
    }
    option.xAxis.data = data
    option.legend.data = legend
    option.series = service
    myChart.setOption(option, true)
}
defineExpose({ update })
let option = {
    animationDuration: 3000,
    title: {},
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
        type: 'scroll',
        x: 'left', // 水平居右
        left: '28%',
        top: '25%',
        // bottom: ,
        // itemGap: 15,
        itemWidth: 20,
        // itemHeight: 10,
        pageIconColor: 'rgb(255,255,255)',
        pageTextStyle : {
            color: 'rgb(255,255,255)',
            textBorderColor: 'rgb(255,255,255)',
        },
        // 文字颜色
        textStyle: {
            fontSize: 10,
            color: '#F3FFFF',
        },
        data: data,
    },
    // 设置图表四周留白间距
    grid: {
        left: 50,
        top: 110,
        bottom: '15%',
        right: 40,
    },
    xAxis: {
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
        data: legend,
    },
    yAxis: {
        type: 'value',
        name: '单位：次',
        min: 0,
        minInterval: 3,
        nameTextStyle: {
            align: 'right',
            fontSize: 10,
            color: '#fff',
            padding: [0, 0, 8, 10],
        },
        splitNumber: 2,
        splitLine: {
            //网格线
            show: false, //关闭网格线
            lineStyle: {
                color: 'rgba(255, 255, 255, 0.08)', //设置网格线类型 dotted：虚线   solid:实线
                type: 'dashed', //网格线颜色
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
            name: '武汉',
            type: 'line',
            symbolSize: 0,
            symbol: 'circle', //变为实心圆
            //鼠标移入只显示一条线
            emphasis: {
                focus: 'series',
            },
            data: dataAxis,
        },
        {
            name: '孝感',
            type: 'line',
            symbolSize: 0,
            symbol: 'circle', //变为实心圆
            //鼠标移入只显示一条线
            emphasis: {
                focus: 'series',
            },
            data: dataAxis,
        },
        {
            name: '襄阳',
            type: 'line',
            symbolSize: 0,
            symbol: 'circle', //变为实心圆
            //鼠标移入只显示一条线
            emphasis: {
                focus: 'series',
            },
            data: dataAxis,
        },
        {
            name: '宜昌',
            type: 'line',
            symbolSize: 0,
            symbol: 'circle', //变为实心圆
            //鼠标移入只显示一条线
            emphasis: {
                focus: 'series',
            },
            data: dataAxis,
        },
        {
            name: '荆州',
            type: 'line',
            symbolSize: 0,
            symbol: 'circle', //变为实心圆
            //鼠标移入只显示一条线
            emphasis: {
                focus: 'series',
            },
            data: dataAxis,
        },
        {
            name: '随州',
            type: 'line',
            symbolSize: 0,
            symbol: 'circle', //变为实心圆
            //鼠标移入只显示一条线
            emphasis: {
                focus: 'series',
            },
            data: dataAxis,
        },
        {
            name: '恩施',
            type: 'line',
            symbolSize: 0,
            symbol: 'circle', //变为实心圆
            //鼠标移入只显示一条线
            emphasis: {
                focus: 'series',
            },
            data: dataAxis,
        },
        {
            name: '咸宁',
            type: 'line',
            symbolSize: 0,
            symbol: 'circle', //变为实心圆
            //鼠标移入只显示一条线
            emphasis: {
                focus: 'series',
            },
            data: dataAxis,
        },
        {
            name: '黄冈',
            type: 'line',
            symbolSize: 0,
            symbol: 'circle', //变为实心圆
            //鼠标移入只显示一条线
            emphasis: {
                focus: 'series',
            },
            data: dataAxis,
        },
        {
            name: '黄石',
            type: 'line',
            symbolSize: 0,
            symbol: 'circle', //变为实心圆
            //鼠标移入只显示一条线
            emphasis: {
                focus: 'series',
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
