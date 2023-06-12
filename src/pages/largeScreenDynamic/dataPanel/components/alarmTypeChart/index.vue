<template>
    <div class="w relative map-center">
        <slot></slot>
        <Circle
            :id="id"
            ref="listscircle"
            :defaultStyle="{ width: '100%', height: '100%' }"
            :loading="loading"
            :element-loading-background="elementLoadingBackground"
            @clearCount="clearCount"
        ></Circle>
    </div>
    
</template>

<script setup lang="ts">
import Circle from './components/circle/index.vue'
const {id, loading,elementLoadingBackground } = defineProps({
    id: { type: String, default: 'listscircle' },
    loading: { type: Boolean, default: false },
    elementLoadingBackground: String
})


const emits = defineEmits(['clearCount'])
const clearCount = () => {
    console.log('clearCount')
    emits('clearCount')
}

//  饼图
let listscircle = $ref([])
const update = (list,tData) => {
    listscircle.update(list, tData)
}
const clickItem = (item) => {
    console.log('clickItem 1')
    listscircle.clickItem(item)
}
defineExpose({ update, clickItem })




</script>

<style scoped lang="scss">
.map-center {
    height: 600px;
    min-width: 1092px !important;
    // margin-top: 100px;
    background: url("@/assets/images/dataPanel/center_bg.png") no-repeat;background-size: 100% 100%;
}
</style>
