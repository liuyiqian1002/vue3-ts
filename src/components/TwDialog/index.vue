<template>
    <div class="tw-dialog-a">
        <el-dialog ref="twdialog" :top="twdialogTop" :width="twdialogWsize" :before-close="handleClose" @close="handleClose('handleClose')" v-model="dialog" close-on-press-escape class="tw-dialog" draggable :modal="false" :show-close="false" :close-on-click-modal="closeOnClickModal">
            <template #header="{ close, titleId, titleClass }">
                <div class="tw_clr">
                    <span></span>
                    <h4 class="pl20 title fs16 fw700" :id="titleId" :class="titleClass">{{ title }}</h4>
                    <div class="tw_cr" :class="titleClass">
                        <el-icon v-show="isFull" @click="onScreenfull" class="pointer mr10">
                            <svg-icon :icon-class="twdialogWsize == '100%'?'suoxiao':'fangda'" size="16px"></svg-icon>
                        </el-icon>
    
<!--                        <el-icon :size="16" @click="onScreenfull" class="pointer mr10"><FullScreen /></el-icon>-->
                        <el-icon :size="16" class="pointer mr10" @click="handleClose('handleClose')"><Close /></el-icon>
                    </div>
                </div>
                
            </template>
            <el-scrollbar ref="scrollbarContent" :style="`height: ${getHeight}px`">
                <div class="dialog_content" :style="`padding: 0 20px`">
                    <slot></slot>
                </div>
            </el-scrollbar>
            <div v-if="isBtns" class="dialog__footer positionBr w tw_c" style="padding: 0 60px">
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
        </el-dialog>
    </div>
    
</template>

<script setup lang="ts">
// import screenfull from "screenfull";
import { FullScreen } from "@element-plus/icons-vue"
// import {Close} from "@element-plus/icons";
let { proxy } = getCurrentInstance()
let { title, align, modelValue, cancelBtn, confirmBtn, cancelLoading, loading, width, height, btns, isBtns, bodyPadding, closeOnClickModal, isFull, dialogTop} = defineProps({
    title: {type: String, default: '新增'},                          // dialog弹框title配置
    modelValue: {type: Boolean, default: false},                        // dialog弹框显示隐藏变量
    cancelBtn: {type: String, default: '取消'},                      // 取消按钮自定义文字配置
    confirmBtn: {type: String, default: '确定'},                     // 确定按钮自定义文字配置
    cancelLoading: {type: Boolean, default: false},                 // 取消按钮loading配置
    loading: {type: Boolean, default: false},                       // 确定按钮loading配置
    width: {type: [Number, String], default: "80%"},                // 自定义宽度
    height: {type: [Number, String], default: "100%"},              // 自定义宽度
    btns: {type: Array, default: () => []},                         // 底部自定义操作按钮 { type:'默认： primary',key:'事件名称',name:'按钮名称'}
    isBtns: {type: Boolean, default: false},                        // 底部操作按钮显示开关
    bodyPadding: { type: Number, default: 20},
    closeOnClickModal: {type: Boolean, default: true},
    isFull: {type: Boolean, default: true},
    dialogTop: { type: Number, default: 100},                       // 顶部距离
})

let dialog = $ref(false)
watch(() => modelValue, (newVal) => {
    dialog = newVal
}, {deep: true})

let twdialog = $ref(null)
let twdialogWsize = $ref( width)
let twdialogHsize = $ref(`calc(${height} - 140px)`)
let twdialogTop = $ref(`${dialogTop}px`)
let getHeight = $ref(580)
getHeight = window.innerHeight - 200
const onScreenfull = () => {
    if( twdialogWsize == '100%'){
        twdialogWsize = width
        twdialogHsize = `calc(${height} - 140px)`
        getHeight = window.innerHeight - 180
        emits('onScreenfull', true)
    }else {
        twdialogWsize = '100%'
        twdialogHsize = `calc(100% - ${dialogTop}px)`
        getHeight = window.innerHeight - 110
        emits('onScreenfull', false)
    }
    // twdialogWsize = '100%'
    // twdialogHsize = 'calc(100% - 100px)'
    // // twdialogTop = '0'
    // if(screenfull.isFullscreen){
    //     screenfull.exit()
    // }else {
    //     screenfull.request(twdialog)
    // }
}

let emits = defineEmits(['update:modelValue', 'handleClose', 'save', 'cancel', 'termination', 'onScreenfull'  ])
// 取消
const handleClose = (key) => {
    twdialogWsize = width
    twdialogHsize = `calc(${height} - 140px)`
    // twdialogTop = '100px'
    emits('update:modelValue', false)
    if(proxy.$_.isString(key)) emits(key)
    // if(screenfull.isFullscreen) screenfull.exit()
}

// 动态响应事件
const tapclick = (key) => {
    emits(key)
}
// // 动态计算高度
// const getHeight = computed(() => {
//     let treeHight = document.getElementById('app').clientHeight - 180
//     return treeHight
// })


defineExpose({twdialogWsize})
</script>

<style lang="scss" scoped>
.dialog__footer {
    box-shadow: 0px -1px 6px rgb(0 0 0 / 10%);
    height: 64px;
}
.tw-dialog-a {
    :deep(.el-overlay-dialog) {
    
        .el-dialog {
            border-radius: 20px;margin-bottom: 0;height: v-bind(twdialogHsize);transition: 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
            .el-dialog__header { padding: 12px 0; border-bottom: 1px solid var(--el-menu-border-color)}
            .dialog__footer {  border-top: 1px solid var(--el-menu-border-color)}
            .el-dialog__body { padding: 10px}
        }
    }
    
}

//.tw-dialog { height: calc(100% - 100px) !important;}
</style>
