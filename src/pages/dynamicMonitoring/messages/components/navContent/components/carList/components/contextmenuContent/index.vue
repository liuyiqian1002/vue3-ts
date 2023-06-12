<template>
    <div class="fixed" style="z-index: 9999;left: 0; top: 0;right: 0;bottom: 0" v-show="showContextmenuContent" @click="showContextmenuContent = false">
        <ul class="contextmenu pl10 pr10 absolute" :style="`left: ${left}px; top: ${top}px`">
            <template  v-for="(item, i) in lists">
                <li class="contextmenu_li pointer w relative" v-show="item.isshow" :tabindex="i" @click="item.click()">
                    <el-button link class="contextmenu_li_txt">
                        <svg-icon class-name="contextmenu_li_txt_icon" :icon-class="item.icon"></svg-icon>
                        <span class="ml5">{{item.name}}</span>
                    </el-button>
                    <div class="contextmenu_li_bg w h transition positionTl"></div>
                </li>
            </template>
        </ul>
    </div>
</template>

<script setup lang="tsx">
let { lists } = defineProps({
    lists: { type: Array, default: ()=> []},
})

let showContextmenuContent = $ref(false)
let left = $ref(0)
let top = $ref(0)

const viewData = (node)=>{
    left = node.clientX
    top = node.clientY
    showContextmenuContent = true
}

defineExpose({ viewData})

</script>

<style scoped lang="scss">
.contextmenu{
    background: var(--el-bg-color);border-radius: 12px;box-shadow: var(--el-box-shadow);width: 120px;
    .contextmenu_li {
        line-height: 30px; margin: 5px 0;background: var(--el-bg-color);position: relative;z-index: 1;
        .contextmenu_li_bg { transform: translateX(-12px);z-index: -1; border-radius: 6px}
        &:hover {
            .contextmenu_li_txt,:deep(.contextmenu_li_txt_icon) { color: #fff;}
            .contextmenu_li_bg { background: #27CAFF;transform: translateX(0); border-radius: 6px;}
        }
    }
}

</style>
