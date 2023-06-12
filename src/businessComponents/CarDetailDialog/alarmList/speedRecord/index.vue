<template>
    <div class="speed-record-wrapper">
        <div
            class="defaultClass"
            id="trackSpeedRecord"
            style="width: 1200px; height: 300px"
        ></div>
    </div>
</template>

<script setup lang="ts">
import {
    markRaw,
    nextTick,
    onMounted,
    onUnmounted,
    onDeactivated,
} from '@vue/runtime-core'
import * as echarts from 'echarts'
const proxy: any = getCurrentInstance()?.proxy

const { list } = defineProps({
    list: { type: Array, default: [] },
})

// let data = []
const option = {
    title: {
        // text: '表格'
    },
    visualMap: [
        {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400,
        },
    ],
    tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>{a}: {c}km/h',
        axisPointer: {
            animation: false,
        },
    },
    dataZoom: [
        {
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 30,
            start: 30,
            end: 100,
            textStyle: { color: '#A3CCFF' },
            borderColor: '#eee',
        },
        {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35,
        },
    ],
    xAxis: {
        // type: 'name',
        splitLine: {
            show: false,
        },
        data: [],
    },
    yAxis: {
        name: '速度',
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false,
        },
        // min: 0,
        // max: 200,
        // splitNumber: 20,
        axisLabel: {
            formatter: (value, index) => {
                return value + ' km/s'
            },
        },
    },
    grid: {
        borderWidth: 0,
        top: 30,
        bottom: 95,
        x: 70,
        right: 5,
        textStyle: {
            color: '#fff',
        },
    },
    series: [
        {
            name: '速度',
            type: 'line',
            showSymbol: false,
            markLine: {
                data: [
                    {
                        name: 'Y 轴值为 10 的水平线',
                        yAxis: 10,
                    },
                ],
            },
            data: [],
        },
    ],
}
// console.log(data, 'data')
// setInterval(function () {
//   for (var i = 0; i < 5; i++) {
//     data.shift();
//     data.push(randomData());
//   }
//   myChart.setOption({
//     series: [
//       {
//         data: data
//       }
//     ]
//   });
// }, 1000);

watch(
    () => list,
    (val) => {
        // console.log(val, proxy.$_.map(val, 'runningSpeed'), 'val watch')
        let gpsTimes: string[] = proxy.$_.map(val, 'gpsTime')
        let runningSpeeds = proxy.$_.map(val, 'runningSpeed')
        let sData = []
        gpsTimes.forEach((it, i) => {
            sData.push({
                name: it,
                value: Number(runningSpeeds[i]),
            })
        })
        // console.log(sData, 'sData')
        // data = sData
        // option.xAxis.data = gpsTimes
        // option.series[0].data = sData
        // console.log(option, 'option')
        // myChart.setOption(option)
        myChart.setOption({
            xAxis: {
                data: gpsTimes,
            },
            series: [
                {
                    data: sData,
                },
            ],
        })
    },
)

let myChart = $ref(null)
let listsData = $ref([])
onMounted(() => {
    let chartDom = document.getElementById('trackSpeedRecord')
    if (chartDom) {
        myChart = markRaw(echarts.init(chartDom))
        option && myChart.setOption(option)
        window.addEventListener('resize', myChart.resize)
    }
})
onUnmounted(() => {
    window.removeEventListener('resize', myChart.resize)
})

onDeactivated(() => {
    window.removeEventListener('resize', myChart.resize)
})
</script>

<style scoped lang="scss">
.speed-record-wrapper {
    width: 1200px;
    height: 300px;
}
</style>
