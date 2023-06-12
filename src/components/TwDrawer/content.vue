<template>
    <transition-group name="lists" mode="out-in">
        <div v-if="drawer" class="drawer_content relative" :style="`padding-bottom:${isBtns?60:0}px`">
            <div class="drawer_content_title border-b ml10 tw_clr">
                <div>{{ title }}</div>
                <div class="primary pointer" @click="handleClose"><i class="el-icon-arrow-left"></i>返回上一级</div>
            </div>
            <el-scrollbar :style="`height: ${getHeight}px`">
                <div class="p20">
                    <slot></slot>
                </div>
            </el-scrollbar>
            <div v-if="isBtns" class="drawer__footer positionBr w tw_c" style="padding: 0 20px; margin-bottom: -8px;"
                 :class="boxAlign[align]">
                <div class="tw_c" v-if="btns.length == 0">
                    <el-button class="mr20" v-if="cancelBtn == '取消'" @click="handleClose" :loading="cancelLoading">
                        {{ cancelBtn }}
                    </el-button>
                    <el-button class="mr20" v-if="cancelBtn != '取消'" @click="lastStop" :loading="cancelLoading">
                        {{ cancelBtn }}
                    </el-button>
                    <el-button class="ml20" type="primary" @click="save()" :loading="loading">
                        {{ loading ? '提交中 ...' : confirmBtn }}
                    </el-button>
                </div>
                <div class="tw_c" v-else>
                    <el-button v-for="item in btns" class="ml20" :type="item.type != undefined ? item.type : 'primary'"
                               @click="tapclick(item.key)" :loading="item.loading">{{ item.name }}
                    </el-button>
                </div>
            </div>
        </div>
    </transition-group>
</template>

<script>
import {computed, reactive, toRefs} from "vue";
import {Throttle} from "@/utils/commonFn";

export default {
    name: "content",
    props: {
        title: {type: String, default: '新增'},
        align: {type: String, default: 'center'},
        drawer: {type: Boolean, default: false},
        cancelBtn: {type: String, default: '取消'},
        confirmBtn: {type: String, default: '确定'},
        cancelLoading: {type: Boolean, default: false},
        loading: {type: Boolean, default: false},
        width: {type: [Number, String], default: 950},
        btns: {type: Array, default: () => []}, // { type:'默认： primary',key:'事件名称',name:'按钮名称'}
        isBtns: {type: Boolean, default: true},
    },
    emits: {
        handleClose: null,
        'update:drawer': null,
        lastStop: null,
        save: null
    },
    setup(props, context) {
        let state = reactive({
            boxAlign: {
                right: 'positionBr',
                left: 'positionBl',
                center: 'positionBc'
            },
            getHeight: 300
        })
        let num = props.isBtns?280:220
        // 动态计算高度
        window.addEventListener('resize', Throttle(()=>{
            state.getHeight = document.getElementById('app').clientHeight - num
        }))
        state.getHeight = document.getElementById('app').clientHeight - num
    
        // 取消
        const handleClose = (done) => {
            context.emit('update:drawer', false)
            context.emit('handleClose', done)
        }
        
        // 上一步
        const lastStop = () => {
            context.emit('lastStop')
        }
        
        // 确定
        const save = () => {
            context.emit('save')
        }
        
        // 动态响应事件
        const tapclick = (key) => {
            context.emit(key)
        }
        
        return {
            ...toRefs(state),
            handleClose,
            save,
            lastStop,
            tapclick
        }
    }
}
</script>

<style lang="less" scoped>
.drawer_content {
    .drawer_content_title {
        font-size: 16px;
        line-height: 40px;
        font-family: 'Arial Normal', 'Arial', sans-serif;
        font-weight: 400;
        color: #333333;
    }
    
    .drawer__footer {
        box-shadow: 0px -1px 6px rgb(0 0 0 / 10%);
        height: 80px;
        background: #fff;
        bottom: -13px;
    }
}

</style>
