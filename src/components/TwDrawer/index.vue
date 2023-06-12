<template>
    <div ref="twdrawer" class="tw-drawer-a">
        <el-drawer :title="title" :before-close="beforeClose" v-model="drawer" close-on-press-escape :size="width" direction="rtl" class="tw-drawer-bg tw-drawer">
            <template #header="{ close, titleId, titleClass }">
                <h4 class="pl20 title fs16 fw700" :id="titleId" :class="titleClass">{{ title }}</h4>
                
                <el-icon v-if="isScreenfull" @click="onScreenfull" class="pointer mr10">
                    <svg-icon :icon-class="twdrawerWsize == '100%'?'suoxiao':'fangda'" size="16px"></svg-icon>
                </el-icon>
            </template>
            <el-scrollbar class="pr10" ref="scrollbarContent" :style="`height: ${getHeight}px`">
<!--                <div class="pb20">-->
                    <slot></slot>
<!--                </div>-->
            </el-scrollbar>
            <div v-if="isBtns" class="drawer__footer positionBr w tw_c" style="padding: 0 60px">
                <div class="tw_c" v-if="btns.length === 0">
                    <el-button class="mr20" v-if="cancelBtn === '取消'" @click="handleClose('handleClose')" :loading="cancelLoading">
                        {{ cancelBtn }}
                    </el-button>
                    <el-button class="mr20" v-if="cancelBtn !== '取消'" @click="tapclick('lastStop')" :loading="cancelLoading">{{ cancelBtn }}</el-button>
                    <el-button class="ml20" type="primary" @click="tapclick('save')" :loading="loading">
                        {{ loading ? '提交中 ...' : confirmBtn }}
                    </el-button>
                </div>
                <div class="tw_c" v-else>
                    <el-button v-for="item in btns" class="ml20" :type="item.type != undefined ? item.type : 'primary'"
                               @click="tapclick(item.key)" :loading="item.loading" :disabled="item.disabled ?? false">{{ item.name }}
                    </el-button>
                </div>
            </div>
        </el-drawer>
    </div>
    
</template>

<script setup lang="ts">
// import screenfull from "screenfull";

let { proxy } = getCurrentInstance()
let { title, align, modelValue, cancelBtn, confirmBtn, cancelLoading, loading, width, btns, isBtns} = defineProps({
    title: {type: String, default: '新增'},                          // drawer弹框title配置
    modelValue: {type: Boolean, default: false},                        // drawer弹框显示隐藏变量
    cancelBtn: {type: String, default: '取消'},                      // 取消按钮自定义文字配置
    confirmBtn: {type: String, default: '确定'},                     // 确定按钮自定义文字配置
    cancelLoading: {type: Boolean, default: false},                 // 取消按钮loading配置
    loading: {type: Boolean, default: false},                       // 确定按钮loading配置
    width: {type: [Number, String], default: "800px"},             // 自定义宽度
    btns: {type: Array, default: () => []},                         // 底部自定义操作按钮 { type:'默认： primary',key:'事件名称',name:'按钮名称'}
    isBtns: {type: Boolean, default: true},                          // 底部操作按钮显示开关
    isScreenfull: {type: Boolean, default: true}                     // 是否能全屏
})

// watch(() => modelValue, (newVal) => {
//     dialog = newVal
// }, {deep: true})

let drawer = $ref(false)
let twdrawer = $ref(null)
let twdrawerWsize = $ref('800px')
let twdrawerHsize = $ref('calc(100% - 98px)')
let twdrawerTop = $ref('98px')

watch(() => modelValue, (newVal) => {
    drawer = newVal
}, {deep: true})

twdrawerWsize = width
const onScreenfull = () => {
    if( twdrawerWsize == '100%'){
        twdrawerWsize = width
    }else {
        twdrawerWsize = '100%'
    }
}

let emits = defineEmits(['update:modelValue', 'handleClose', 'beforeClose', 'save', 'cancel', 'termination' ])

const beforeClose = ()=>{
    emits('update:modelValue', false)
    emits('handleClose', 'before')
}

// 取消
const handleClose = (key) => {
    twdrawerWsize = width
    emits('update:modelValue', false)
    if(proxy.$_.isString(key)) emits(key, 'handle')
    // if(screenfull.isFullscreen) screenfull.exit()
}

// 动态响应事件
const tapclick = (key) => {
    emits(key)
}
// 动态计算高度
const getHeight = computed(() => {
    let isBtnNum = isBtns ?64: 0
    let treeHight = window.innerHeight - 190 - isBtnNum
    return treeHight
})



</script>

<style lang="scss" scoped>
.drawer__footer {
    box-shadow: 0px -1px 6px rgb(0 0 0 / 10%);
    height: 64px;background: var(--el-bg-color);
}
.tw-drawer-a {
    :deep(.el-drawer) {
        height: v-bind(twdrawerHsize); top: v-bind(twdrawerTop);border-bottom-left-radius: 20px;border-top-left-radius: 20px;overflow: hidden;width: v-bind(twdrawerWsize) !important;
        .el-drawer__header { padding: 12px 0; border-bottom: 1px solid var(--el-menu-border-color);margin-bottom: 0px}
        .drawer__footer {  border-top: 1px solid var(--el-menu-border-color)}
    }
         //:deep(.tw-drawer-bg){ background: rgba(0,0,0,0)}
    :deep(.el-overlay){ background: rgba(0,0,0,0)}
}


//.tw-drawer { height: calc(100% - 100px) !important;}
</style>
