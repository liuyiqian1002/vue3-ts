<template>
    <!--    模式    -->
    <div id="pattern" class="pattern tw_cl absolute">
        <el-button-group class="ml-4 tw_cl">
            <div class="border_r">
                <el-button class="pr10 border-no pl10" :type="patternActive === 0?'primary':''" link @click="pattern(0, '1')">地图模式</el-button>
            </div>
            <div class="border_r">
                <el-button class="pr10 border-no pl10" :type="patternActive === 1?'primary':''" link @click="pattern(1, '2')">视频模式</el-button>
            </div>
            <el-button class="pr10 border-no pl10" :type="patternActive === 2?'primary':''" link @click="pattern(2, '2')">轨迹模式</el-button>
        </el-button-group>
    </div>
</template>

<script setup  lang="tsx">

let patternActive = $ref(0)

let emits = defineEmits(['tapClick', 'setCollapseActiveName'])

const pattern = (i, status)=>{
    patternActive = i
    emits('setCollapseActiveName', status, i)
    if(patternActive == 1){
        emits('tapClick','sendVideo', patternActive, 'pattern')
    }
    // if(patternActive == 2){
    //     markers = []
    //     initPointsToMarkers([])
    // }
}

const setPatternActive = (i) => {
    patternActive = i
}

defineExpose({pattern, setPatternActive})



</script>

<style lang="scss" scoped>
.pattern { top: 7px; right: 104px; background: var(--el-bg-color); padding: 6px 12px;border-radius: 6px;box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);z-index: 999}
</style>
