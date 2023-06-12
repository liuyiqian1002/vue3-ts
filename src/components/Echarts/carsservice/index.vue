<!-- '报警趋势(营运类型) -->
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
let dataAxis = [220, 182, 191, 234, 290, 330, 310]
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
                legend.push(tag.operateTypeName)
                service.push(
                    {
                        name: tag.operateTypeName,
                        type: 'line',
                        // stack: 'Sum',
                        symbol: 'circle', //变为实心圆
                        smooth: true, //面积图改成直线或曲线
                        symbolSize: 0,
                        emphasis: {
                            focus: 'series',
                        },
                        data: [],
                    },
                )
            }
        }
        for (let j = 0; j < item.listOperateTypeCount.length; j++) {
            let tag = item.listOperateTypeCount[j]
            service[j].data.push(tag.count)
        }
    }
    option.xAxis[0].data = data
    option.legend.data = legend
    option.series = service
    myChart.setOption(option, true)
}
defineExpose({ update })
let option = {
    animationDuration: 2000,
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
        x: 'right', // 水平居右
        left: '21%',
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
        data: data,
    },
    // 设置图表四周留白间距
    grid: {
        left: 50,
        top: 90,
        bottom: '15%',
        right: 40,
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
            data: legend,
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
            padding: [8, 0, 0, 0],
        },
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
    series: [
        {
            name: '危险货物运输',
            type: 'line',
            stack: 'Sum',
            symbol: 'circle', //变为实心圆
            smooth: true, //面积图改成直线或曲线
            symbolSize: 0,
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
                            color: 'rgba(84, 112, 198, 1)', // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: 'rgba(84, 112, 198, 1)', // 100% 处的颜色
                        },
                    ],
                    global: false, // 缺省为 false
                },
            },
            emphasis: {
                focus: 'series',
            },
            data: dataAxis,
        },
        {
            name: '普通客运',
            type: 'line',
            stack: 'Sum',
            symbol: 'circle', //变为实心圆
            smooth: true, //面积图改成直线或曲线
            symbolSize: 0,
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
                            color: 'rgba(145, 204, 117, 1)', // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: 'rgba(145, 204, 117, 1)', // 100% 处的颜色
                        },
                    ],
                    global: false, // 缺省为 false
                },
            },
            emphasis: {
                focus: 'series',
            },
            data: dataAxis,
        },
        {
            name: '班线客运',
            type: 'line',
            stack: 'Sum',
            symbol: 'circle', //变为实心圆
            smooth: true, //面积图改成直线或曲线
            symbolSize: 0,
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
                            color: 'rgba(250, 220, 88, 1)', // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: 'rgba(250, 220, 88, 1)', // 100% 处的颜色
                        },
                    ],
                    global: false, // 缺省为 false
                },
            },
            emphasis: {
                focus: 'series',
            },
            data: dataAxis,
        },
        {
            name: '旅游客运',
            type: 'line',
            stack: 'Sum',
            symbol: 'circle', //变为实心圆
            smooth: true, //面积图改成直线或曲线
            symbolSize: 0,
            areaStyle: {
                //区域填充渐变颜色
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'rgba(238, 102, 102, 1)', // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: 'rgba(238, 102, 102, 1)', // 100% 处的颜色
                        },
                    ],
                    global: false, // 缺省为 false
                },
                emphasis: {
                    focus: 'series',
                },
                data: dataAxis,
            },
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

<style scoped lang="scss">
</style>
