<template>
    <div>
        <!--    工具栏    -->
        <div id="tools" class="tools positionCr">
            <div class="tw_cy">
                <el-tooltip :content="item.title" v-for="(item, i) in mainData.tools" :key="i" placement="left-start" effect="light">
                    <el-button class="ml0 pt5 pb5 pl5 pr5" link @click="item.click()">
                        <svg-icon :icon-class="item.icon"></svg-icon>
                    </el-button>
                </el-tooltip>
            </div>
        </div>
    
    
        <!--    车辆详情    -->
        <help ref="helpRef"></help>
    </div>
    
</template>

<script setup  lang="tsx">
import help from "./components/help/index.vue"
let helpRef = $ref(null)

let mainData = reactive({
    tools: [
        {title: '地图切换', icon: 'dituqiehuan', click: ()=> {
            
            } },
        {title: '图层切换', icon: 'tucengqiehuan', click: ()=> {
            
            } },
        {title: '工具', icon: 'gongju', click: ()=> {
            
            } },
        {title: '查车', icon: 'chache', click: ()=> {
            
            } },
        {title: '帮助', icon: 'bangzhu', click: ()=> {
                helpRef.viewData()
            } },
    ]
})


</script>

<style lang="scss" scoped>
.tools { right: 34px; background: var(--el-bg-color);box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);border-radius: 6px}
</style>
