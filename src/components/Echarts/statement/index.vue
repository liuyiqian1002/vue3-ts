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
        text: '报警占比',
        textStyle: {
            color: '#535353',
            fontSize: '14',
            fontWeight: '600',
        },
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c}次 ({d}%)',
    },
    legend: {
        orient: 'vertical',
        left: 'right',
    },
    series: [
        {
            name: '报警占比',
            type: 'pie',
            radius: '50%',
            label: {
                    show: false, //隐藏标线
            },
            data: [],
            emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
        },
    ],
}

onMounted(() => {
    let chartDom = document.getElementById(id)
    myChart.value = markRaw(echarts.init(chartDom))
    option && myChart.value.setOption(option)
})

const update = (newVal) => {
    listsData.value = newVal
    option.series[0].data = newVal
    myChart.value.setOption(option, true)
}
defineExpose({ update })
</script>


<style scoped>
</style>
