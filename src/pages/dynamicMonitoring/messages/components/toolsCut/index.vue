<template>
    <div>
        <!--    工具栏    -->
        <div id="tools" class="tools positionCr">
            <div class="tw_cy">
                <el-tooltip v-for="(item, i) in mainData.tools" :key="i" placement="left-start" effect="light">
                    <el-button class="ml0 pt5 pb5 pl5 pr5" color="#000" text @click="item.click()">
                        <svg-icon :icon-class="item.icon"></svg-icon>
                    </el-button>
                    <template #content>
                        <div class="tw_y" v-if="item.children">
                            <el-button class="ml0 pt5 pb5 pl5 pr5" v-for="(tag, j) in item.children" :key="j" text @click="tag.click()">
                                <svg-icon :icon-class="tag.icon"></svg-icon><p class="w60 ml5" style="text-align: justify">{{tag.title}}</p>
                            </el-button>
                        </div>
                        <span v-else>{{item.title}}</span>
                        
                    </template>
                    
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
let emits = defineEmits(['tapClick'])
let mainData = reactive({
    tools: [
        {title: '图层切换', icon: 'tucengqiehuan', children: [
                {title: '实时路况', icon: 'shikuangditu', click: ()=> emits('tapClick', 'mapSwitching', 1) },
                {title: '卫星地图', icon: 'weixingditu', click: ()=> emits('tapClick', 'mapSwitching', 2) },
                {title: '默认地图', icon: 'jiaotongditu', click: ()=> emits('tapClick', 'mapSwitching', 3) }
            ] },
        {title: '工具', icon: 'gongju', children: [
                {title: '放大', icon: 'fangda', click: ()=> emits('tapClick', 'mapTools', 1) },
                {title: '缩小', icon: 'suoxiao', click: ()=> emits('tapClick', 'mapTools', 2) },
                {title: '拉框放大', icon: 'quanjufangda', click: ()=> emits('tapClick', 'mapTools', 3) },
                {title: '拉框缩小', icon: 'quanjusuoxiao', click: ()=> emits('tapClick', 'mapTools', 4) },
                {title: '测距', icon: 'ceju', click: ()=> emits('tapClick', 'mapTools', 5) },
                {title: '清除车辆', icon: 'shanchu', click: ()=> emits('tapClick', 'mapTools', 6) },
            ] },
        // 已跟陈琪沟通先注释
        // {title: '查车', icon: 'chache', click: ()=> {
        //
        //     } },
        {title: '帮助', icon: 'bangzhu', click: ()=> {
                helpRef.viewData()
            } },
    ]
})


</script>

<style lang="scss" scoped>
.tools { right: 34px; background: var(--el-bg-color);box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);border-radius: 6px;padding: 6px 4px}
</style>
