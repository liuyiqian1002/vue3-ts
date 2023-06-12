<template>
    <div class="set-col">
        <tw-dialog title="发送语音" width="1000px" v-model="dialogFlag" :bodyPadding="0">
            <div class="common-layout h">
                <el-container class="h">
                    <el-aside width="140px" class="border_r navs">
                        <div style="background: var(--tw-tag-bg-color);height: 740px">
                            <h3 class="title lh40">
                                <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">目标车辆</el-checkbox>
                            </h3>
                            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                <ul class="h">
                                    <el-checkbox-button class="w tw_c" v-for="(item, i) in carLists" :key="i" :label="item[value]">
                                        <svg-icon :color="checkedCities.includes(item[value])?'#fff':getCarImg(item).color" :icon-class="getCarImg(item).icon" size="12px"></svg-icon>
                                        <span class="ml10">{{item.plateNum}}</span>
                                    </el-checkbox-button>
                                </ul>
                            </el-checkbox-group>
                            
                        </div>
                        
                    </el-aside>
                    <el-main class="relative pt0 pb0 h">
                        <el-tabs v-model="activeName" class="demo-tabs">
                            <el-tab-pane label="文本信息" name="first">
                                <el-checkbox-group v-model="mainData.formData.flags">
                                    <el-checkbox label="URGENT">紧急</el-checkbox>
                                    <el-checkbox label="TERMINAL_PANEL">终端显示器显示</el-checkbox>
                                    <el-checkbox label="TTS">终端TTS播读</el-checkbox>
                                    <el-checkbox label="AD_SCREEN">广告屏显示</el-checkbox>
                                    <el-checkbox label="CENTER_NAV">中心导航信息</el-checkbox>
                                    <el-checkbox label="CAN_ERROR">CAN故障码信息</el-checkbox>
                                </el-checkbox-group>
                                <div class="pt20">
                                    <p class="mb10">内容</p>
                                    <el-popover
                                        placement="top-start"
                                        :width="600"
                                        :visible="visible"
                                    >
                                        <el-scrollbar style="height: 400px">
                                            <ul class="pr10">
                                                <li @click="mainData.formData.text = item.usefulExpressions" class="pointer msg_list_item" v-for="(item, i) in lists" :key="i">{{item.usefulExpressions}}</li>
                                            </ul>
                                        </el-scrollbar>
        
                                        <template #reference>
                                            <el-input type="textarea" v-model="mainData.formData.text" rows="4" @focus="getMsgLits" @blur="visible = false"></el-input>
                                        </template>
                                    </el-popover>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                        <div class="tw_c mt30">
                            <el-button type="primary" @click="senfMsg">发送</el-button>
                            <el-button @click="dialogFlag=false">取消</el-button>
                        </div>
                    
                    </el-main>
                </el-container>
            </div>
        </tw-dialog>
    
        
    </div>
</template>

<script setup lang="tsx">
import {getToolConfigList, sendTextInfo} from "@/api/dynamicMonitoring/messages";


let {carLists, props } = defineProps({
    carLists: { type: Array, default: ()=>[] },
    props: { type: Object, default: ()=>{ return {value: 'value', label: 'label' } }}
})
let dialogFlag = $ref(false)
let visible = $ref(false)
let activeName = ref('first')
let lists = $ref([])
let mainData = reactive({
    formData:{
        "eventIds": [],
        "flags": [],
        "text": "",
        "vehicleCodes": [],
        "webUuid": ""
    },
    total: 40,
    pageSizesArr: [25, 50, 100],
})

getToolConfigList({toolType: 1}).then(res=>{
    lists = res
})

const viewData = ()=>{
    initChildren()
    dialogFlag = true
}

let value = $ref(null)
let label = $ref(null)
let disabled = $ref(null)
value = props?.value || 'value'
label = props?.label || 'label'
disabled = props?.disabled || 'disabled'


let checkAll = $ref(false)
let isIndeterminate = $ref(false)
let checkedCities = $ref([])
let cities = []

const getCarImg = (state)=>{
    if (state.online) {
        if (!state.openLocation) {
            return {color: '#26C9FF', icon: 'weidingwei'};//未定位
        } else if (!state.openAcc) {
            return {color: '#26C9FF', icon: 'dingwei'};//acc关
        } else if (state.runningSpeed == null || state.runningSpeed <= 0) {
            return {color: '#26C9FF', icon: 'tingche'};//停车中
        } else if ((state.runningSpeed != null || state.runningSpeed > 0)  && !state.direction) {
            return {color: '#FF4D4F', icon: 'yizhuxiao'};//行驶
        }else if ((state.runningSpeed != null || state.runningSpeed > 0) && state.direction && state.direction>0) {
            return {color: '#26C9FF', icon: 'hangshizhong'};//行驶
        }
    } else {
        return {color: '#AAAAAA', icon: 'yizhuxiao'};
    }
}

const initChildren = ()=>{
    let arr = [];
    checkedCities = []
    carLists.forEach((tag)=> {
        let val = tag[value]
        arr.push(val)
    })
    cities = arr
    checkedCities = arr
    checkAll = true
}

const handleCheckAllChange = (val: boolean) => {
    checkedCities = val ? cities : []
    isIndeterminate = false
}

const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length
    checkAll = checkedCount === cities.length
    isIndeterminate = checkedCount > 0 && checkedCount < cities.length
}


// 获取焦点
const getMsgLits = ()=>{
    if(mainData.formData.text == ''){
        visible = true
    }
}

let emits = defineEmits(['save'])
const save = ()=>{
    emits('save')
}

const getGuid = ()=> {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

const senfMsg = ()=>{
    let guid = getGuid()
    mainData.formData.vehicleCodes = checkedCities
    mainData.formData.webUuid = guid
    sendTextInfo(mainData.formData).then(res=>{
    
    })
}

defineExpose({viewData})
</script>

<style scoped lang="scss">
.set-col{
    :deep(.el-dialog__body) {
        padding: 0 !important;
        .dialog_content { padding: 0 !important;}
    }
    .navs {
        .is-active { background: #fff}
    }
    .photoQueryContent{
        :deep(.el-checkbox) {
            height: auto;
            .el-checkbox__input { position: absolute; top: 10px;left: 20px}
            .el-checkbox__label {
                width: 100%;
                .el-descriptions--small .el-descriptions__body .el-descriptions__table:not(.is-bordered) .el-descriptions__cell { padding-bottom: 0}
            }
        }
    }
    
}

</style>
