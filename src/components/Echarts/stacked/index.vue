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

let myChart = ref(null)
let listsData = ref([])

let option = {
    title: {
        text: '报警趋势',
        textStyle: {
            color: '#000',
            fontSize: '14',
            fontWeight: '600',
        },
    },
    tooltip: {
        confine: true,
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.8)',
        extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
        textStyle: {
            color: '#6a717b',
        },
        axisPointer: {
            type: 'shadow',
            textStyle: {
                color: '#FFF',
            },
        },
    },
    grid: {
        top: '20%',
        left: '4%',
        right: '2%',
        bottom: '15%',
        containLabel: true,
    },
    color: [
        '#229aff',
        '#fdb94e',
        '#30d6a9',
        '#13bfe8',
        '#fedb42',
        '#86d560',
        '#72d4ec',
        '#ff9d35',
        '#31ca5f',
        '#ff999a',
        '#3dccc7',
        '#ffad8c',
        '#4bb6de',
        '#fe8042',
        '#5fa5f5',
        '#07bcbe',
        '#f36365',
        '#30addc',
        '#f5adae',
        '#7fd4d2',
    ],
    legend: {
        x: '15%',
        textStyle: {
            color: '#535353',
            fontSize: 10,
            padding: 0,
        },
        data: ['微博', '知乎', '抖音', '百度'],
    },
    calculable: true,
    dataZoom: [
        {
            show: true,
            height: 12,
            xAxisIndex: [0],
            zoomLock: true,
            bottom: 0,
            start: 0,
            end: 20,
            handleSize: 8,
            handleStyle: {
                color: '#e5e5e5',
            },
            textStyle: {
                color: 'black',
            },
            borderColor: '#e5e5e5',
        },
        {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35,
        },
    ],
    xAxis: [
        {
            type: 'category',
            data: [
                '3.1',
                '3.2',
                '3.3',
                '3.4',
                '3.5',
                '3.6',
                '3.7',
                '3.8',
                '3.9',
                '3.10',
                '3.11',
                '3.12',
                '3.13',
            ],
            splitLine: {
                show: false,
                lineStyle: {
                    color: ['#D4DFF5'],
                },
            },
            axisTick: {
                show: true,
            },
            axisLine: {
                lineStyle: {
                    color: '#666',
                },
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitArea: {
                show: false,
            },
            axisLabel: {
                interval: 'auto',
                color: '#333',
                // formatter: function (value, index) {
                //     let date = value
                //     return date.replace(/-/g, '.')
                // },
            },
        },
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                textStyle: {
                    color: '#666',
                    fontStyle: 'normal',
                },
            },
            splitLine: {
                show: true,
            },
            axisLine: {
                lineStyle: {
                    color: '#000',
                },
            },
            axisTick: {
                show: true,
            },
            splitLine: {
                show: true,
            },
            axisLabel: {
                interval: 0,
                show: true,
            },
        },
    ],
    series: [],
}
onMounted(() => {
    let chartDom = document.getElementById(id)
    myChart.value = markRaw(echarts.init(chartDom))
    option && myChart.value.setOption(option)
})

const update = (newVal) => {
    listsData.value = newVal
    option.series = newVal
    myChart.value.setOption(option, true)
}
defineExpose({ update })
</script>


<style scoped lang="scss">
</style>
