<template>
    <div class="set-col">
        <tw-dialog title="查看视频" width="1400px" v-model="dialogFlag" :dialogTop="60" :closeOnClickModal="false" @onScreenfull="onScreenfull">
            <div class="common-layout h">
                <el-container class="h">
                    <el-aside v-if="carLists.length>1" width="140px" class="border_r navs">
                        <div style="background: var(--tw-tag-bg-color)">
                            <h3 class="title lh40">目标车辆</h3>
                            <el-scrollbar :style="`height: ${contentH+14}px`">
                                <el-radio-group v-model="code" size="small">
                                    <el-tooltip
                                        v-for="(item, i) in carLists" :key="i"
                                        class="box-item"
                                        effect="dark"
                                        :content="getCarImg(item).txt"
                                        placement="top-start"
                                    >
                                        <el-radio-button class="w tw_c" :label="item.plateNum" @click="tapCar(i)">
                                            <p class="tw_cl pl20">
                                                <svg-icon :color="navIndex !== i?getCarImg(item).color:'#fff'" :icon-class="getCarImg(item).icon" size="12px"></svg-icon>
                                                <span class="ml10">{{item.plateNum}}</span>
                                            </p>
                                        </el-radio-button>
                                    </el-tooltip>
                                   
                                </el-radio-group>
                            </el-scrollbar>
                           
                        </div>
                    </el-aside>
                    <el-main class="relative p0 h">
                        <videoPlayer v-if="flag" ref="videoPlayerRef" :row="row" :height="`${contentH}px`"></videoPlayer>
<!--                        <el-button type="primary" class="positionTr" @click="violationMark">违规标记</el-button>-->
                    </el-main>
                </el-container>
            </div>
        </tw-dialog>
    
        <!--  添加违规标记  -->
        <addViolationMark ref="addViolationMarkRef"></addViolationMark>
    </div>
</template>

<script setup lang="tsx">
import videoPlayer from '@/businessComponents/CarDetailDialog/videoPlayer/index.vue'
import addViolationMark from "./components/addViolationMark/index.vue"
import pause from "@/assets/images/pause.jpg"


let {carLists, props } = defineProps({
    carLists: { type: Array, default: ()=>[] },
    props: { type: Object, default: ()=>{ return {value: 'value', label: 'label' } }}
})
let dialogFlag = $ref(false)
let code = $ref('')
let flag = $ref(true)
let activeName = ref('first')
let addViolationMarkRef = $ref(null)
let videoPlayerRef = $ref(null)
let navIndex = $ref(0)
let contentH = $ref(0)
let row = reactive({})
contentH = window.innerHeight - 254
const onScreenfull = (status) => {
    contentH = status?window.innerHeight - 254: window.innerHeight - 180
}

const viewData = ()=>{
    row = carLists[0]
    code = row.plateNum
    dialogFlag = true
    flag = false
    nextTick(()=>{
        flag = true
        nextTick(()=>{
            videoPlayerRef.getData()
        })
    })
}

const getCarImg = (state)=>{
    if (state.online) {
        if (!state.openLocation) {
            return {color: '#26C9FF', icon: 'weidingwei', txt: '未定位'};//未定位
        } else if (!state.openAcc) {
            return {color: '#26C9FF', icon: 'dingwei', txt: 'acc关'};//acc关
        } else if (state.runningSpeed == null || state.runningSpeed <= 0) {
            return {color: '#26C9FF', icon: 'tingche', txt: '停车中'};//停车中
        } else if ((state.runningSpeed != null || state.runningSpeed > 0)  && !state.direction) {
            return {color: '#FF4D4F', icon: 'yizhuxiao', txt: '已注销'};//行驶
        }else if ((state.runningSpeed != null || state.runningSpeed > 0) && state.direction && state.direction>0) {
            return {color: '#26C9FF', icon: 'hangshizhong', txt: '行驶'};//行驶
        }
    } else {
        return {color: '#AAAAAA', icon: 'yizhuxiao', txt: '离线'};
    }
}

const onSubmit = () => {
    console.log('submit!')
}

let emits = defineEmits(['save'])
const save = ()=>{
    emits('save')
}

// 违规标记
const violationMark = ()=>{
    console.log(addViolationMarkRef);
    addViolationMarkRef.viewData()
}

const tapCar = (i)=>{
    navIndex = i
    row = carLists[i]
    flag = false
    nextTick(()=>{
        flag = true
        nextTick(()=>{
            videoPlayerRef.getData()
        })
    })
}

defineExpose({viewData})
</script>

<style scoped lang="scss">
.set-col{
    :deep(.el-dialog__body) {
        padding: 0 !important;
        .dialog_content { padding: 0 !important;}
        .el-radio-button__inner {
            width: 100%;
            .vehicleStatus {
                font-size: 14px;font-family: "HarmonyOSSansSC";line-height: 22px;color: rgba(0,0,0,0.65);width: 14px;height: 14px; margin-right: 4px;
            }
        }
    }
    .navs {
        .is-active { background: #fff}
    }
}

</style>
