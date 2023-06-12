<template>
    <div v-loading="loading" :style="defaultStyle">
        <div class="defaultClass" :id="id" :style="defaultStyle"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import {getCurrentInstance} from "vue";

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

let { proxy} = getCurrentInstance()
let myChart = $ref(null)

let option = {
    tooltip: {
        trigger: 'axis',
        // formatter: '{a}<br/>速度: {c}km/h',
        formatter: (row)=> {
            return `${row[0].axisValue}<br/>速度:${row[0].data}km/h`
        },
    },
    grid: {
        top: 20,
        left: 80,
        right: 40,
        bottom: 70
    },
    visualMap: [{
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
    }],
    xAxis:  [
        {data:[]}
    ],
    yAxis: [{
        min: 0,
        max: 140,
        splitNumber: 6,
        splitLine: {show: false},
        axisLabel: {
            formatter: '{value} km/h'
        }
    }],
    dataZoom: [
        {
            show: true,
            height: 20,
            xAxisIndex: [0],
            bottom: 10,
            start: 0,
            end: 140,
            textStyle: {color: "#A3CCFF"},
            borderColor: "#eee"
        }, {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35
        }
    ],
    series: [
        {
            type: 'line',
            smooth: true,
            labelLine: {show: false},
            showSymbol: false,
            lineStyle: {width: 1},
            markLine: {
                data: [
                    {type: "average", yAxis: 100,},
                    {type: "average", yAxis: 60,}
                ],
                lineStyle: {width: 1}
            },
            data: []
        }
    ]
};
let chartDom
onMounted(() => {
    chartDom = document.getElementById(id)
    chartDom.style.width= window.innerWidth - 350+'px';
    myChart = markRaw(echarts.init(chartDom))
    option && myChart.setOption(option)
    
})

const update = proxy.$_.throttle((newVal) => {
    // listsData = newVal
    let num = newVal.length,arr = [], arrgspTimeString = []
    for (let i = 0; i < num; i++) {
        arr.push(newVal[i].runningSpeed)
        arrgspTimeString.push( newVal[i].gspTimeString)
    }
    // let arr = proxy.$_.map(newVal, 'runningSpeed')
    // let arrgspTimeString =  proxy.$_.map(newVal, 'gspTimeString')
    option.xAxis[0].data = arrgspTimeString
    option.series[0].data = arr
    myChart.setOption(option, true)
    // myChart.resize()
}, 3000)

const resize = () => {
    chartDom.style.width= window.innerWidth - 350+'px';
    myChart.resize()
}
defineExpose({ update, resize })
</script>


<style scoped lang="scss">
</style>
