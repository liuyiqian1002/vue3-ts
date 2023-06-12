
<template>
    <div class="defaultClass" :id="chartDom" :style="defaultStyle" > </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';

let { proxy } = getCurrentInstance()

const props = defineProps({
    options: {
        type:Object,
        default: () => {
            return {}
        },
        required: true
    },
    chartDom: {
        type: String,
        default: 'container',
        required: true
    },
    defaultStyle: {
        type:Object,
        default: () => {
            return { "width": '100%', "height": '500px' }
        },
    },
    customMethod: {
        type: Function,
        default: () => {}
    }
})

const Sechart:any = reactive({
    value: ''
});


const initChart = (option:any) => {
    props.customMethod()
    option && Sechart.value.setOption(option)
}

watch(() => props.options, (newVal) => {
    nextTick(() => {
        initChart(newVal)
    })
}, {deep: true})


watch(() => props.chartDom, (newVal) => {
    nextTick(() => {
        let op = reactive({ value: document.getElementById(newVal) })
        if(op.value){
            Sechart.value = markRaw(echarts.init(op.value)) //初始化图表
        }
        initChart(props.options)
    })
}, {immediate: true,})



const resizeOrdispose = proxy.$_.debounce(() => {
    if(Sechart.value){
        Sechart.value?.resize()
    }
},1600)


onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeOrdispose, true )
})

onMounted(() => {
    window.addEventListener('resize', resizeOrdispose )
})

onUnmounted(() => {
    if(Sechart.value){
        Sechart.value?.dispose()
    }
})


defineExpose({})
</script>


<style scoped>
</style>
