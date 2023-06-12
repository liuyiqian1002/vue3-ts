<template>
    <div class="head-title tw_clr">
        <div class="left">
            <el-image class="pointer" v-show="showLeftIcon" :src="iconLeft" @click="onLeftIconClick"></el-image>
        </div>
        <div class="center">
            <p class="fs18">{{title}}</p>
        </div>
        <div class="right">
            <el-image class="pointer" v-show="showRightIcon" :src="iconRight" @click="onRightIconClick"></el-image>
        </div>
    </div>
    <div class="b-split">
        <el-image :src="splitIconNum === 0 ? iconSplit : iconSplit1"></el-image>
    </div>
</template>

<script setup lang="ts">
// import detailpage from '@/assets/detailpage.gif'
import iconLeft from '@/assets/images/dataPanel/l.png'
import iconRight from '@/assets/images/dataPanel/r.png'
import iconSplit from '@/assets/images/dataPanel/split3.png'
import iconSplit1 from '@/assets/images/dataPanel/split4.png'
// prettier-ignore
const { title, showLeftIcon, showRightIcon, loading, splitIconNum } = defineProps({
    title: { type: String, default: '报警类型' },
    showLeftIcon: { type: Boolean, default: false },
    showRightIcon: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    splitIconNum: {type: Number, default: 0},
    onLeftIconClick: {type: Function,default: () => {}},
    onRightIconClick: {type: Function,default: () => {}}
})
// console.log(splitIconNum, 'splitIconNum')


// const onLeftIconClick = () => {
//     console.log('onLeftIconClick')
// }
// const onRightIconClick = () => {
//     console.log('onRightIconClick')
// }

// let index = $ref(3)
// index = dateType

// let emits = defineEmits(['changeDate', 'viewData'])
// const getData = (val)=>{
//     if(val == index) {
//         index = 3
//     }else {
//         index = val
//     }
//     emits('changeDate', val)
// }

// const viewData = ()=>{
//     emits('viewData')
// }

onMounted(() => {

})


</script>

<style scoped lang="scss">
    .head-title{
        z-index: 2;color: #fff;top: 20px;
        .center{
            background: url("@/assets/images/dataPanel/dot_bg.png") no-repeat;background-size: 100% 100%;
            width: 300px;
            height: 36px;
            text-align: center;
            p{
                min-width: 80px;
                margin: 0 auto;
                line-height: 40px;
                font-family: 'douyuZt';
                text-shadow: 0 0 9px #159AFF;
            }
        }
    }
    .b-split {
        .el-image {
            width: 100%;
        }
    }
    
</style>
