<template>
    <div class="set-col">
        <tw-dialog title="拍照" width="1000px" v-model="dialogFlag" :bodyPadding="0">
            <div class="common-layout h">
                <el-container class="h">
                    <el-aside width="140px" class="border_r navs">
                        <div style="background: var(--tw-tag-bg-color);height: 740px">
                            <h3 class="title lh40">
                                <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">目标车辆</el-checkbox>
                            </h3>
                            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" size="small">
                                    <el-checkbox-button class="w tw_c" v-for="(item, i) in carLists" :key="i" :label="item[value]">
                                        <svg-icon :color="checkedCities.includes(item[value])?'#fff':getCarImg(item).color" :icon-class="getCarImg(item).icon" size="12px"></svg-icon>
                                        <span class="ml10">{{item.plateNum}}</span>
                                    </el-checkbox-button>
                                </el-checkbox-group>
                            </el-checkbox-group>
                            
                        </div>
                        
                    </el-aside>
                    <el-main class="relative pt0 pb0 h">
                        <el-tabs v-model="activeName" class="demo-tabs">
                            <el-tab-pane label="拍照" name="first">
                                <el-descriptions class="mt20"
                                                 direction="vertical"
                                                 :column="1"
                                                 border
                                >
                                    <el-descriptions-item label="通道">
                                        <template #label>
                                            <div class="tw_clr">
                                                <p>通道</p>
                                                <el-button-group size="small">
                                                    <el-button type="primary" @click="mainData.formData.allCheck = allCheck">全选</el-button>
                                                    <el-button @click="invertSelection">反选</el-button>
                                                </el-button-group>
                                            </div>
                                        </template>
                                        <el-checkbox-group v-model="mainData.formData.allCheck">
                                            <el-checkbox :label="1">1</el-checkbox>
                                            <el-checkbox :label="2">2</el-checkbox>
                                            <el-checkbox :label="3">3</el-checkbox>
                                            <el-checkbox :label="4">4</el-checkbox>
                                            <el-checkbox :label="5">5</el-checkbox>
                                            <el-checkbox :label="6">6</el-checkbox>
                                            <el-checkbox :label="7">7</el-checkbox>
                                            <el-checkbox :label="8">8</el-checkbox>
                                        </el-checkbox-group>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="设置">
                                        <el-form :model="mainData.formData" label-width="100px">
                                            <el-form-item label="拍摄">
                                                <el-input class="w200 mr10" v-model="mainData.formData.photoCommand" placeholder="请选择开始时间" /><span class="danger">备注:0表示停止拍摄；65535表示录像；其他表示拍照张数</span>
                                            </el-form-item>
                                            <el-form-item label="间隔">
                                                <el-input class="w200 mr10" v-model="mainData.formData.photoTimeInterval" placeholder="请选择开始时间" />秒<span class="danger ml10">备注:0表示按最小间隔拍或一直录像</span>
                                            </el-form-item>
                                            <el-form-item label="分辨率">
                                                <el-select class="w200" v-model="mainData.formData.resolution" placeholder="请选择结束时间">
                                                    <el-option label="320*240" :value="1" />
                                                    <el-option label="640*480" :value="2" />
                                                    <el-option label="800*600" :value="3" />
                                                    <el-option label="1024*768" :value="4" />
                                                    <el-option label="176*144[Qcif]" :value="5" />
                                                    <el-option label="352*288[Cif]" :value="6" />
                                                    <el-option label="704*288[HALF D1]" :value="7" />
                                                    <el-option label="704*576[D1]" :value="8" />
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="保存标志">
                                                <el-select class="w200" v-model="mainData.formData.storeFlag" placeholder="请选择结束时间">
                                                    <el-option label="实时上传" :value="0" />
                                                    <el-option label="保存" :value="1" />
                                                </el-select>
                                            </el-form-item>
                                        </el-form>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="参数">
                                        <el-row :gutter="30">
                                            <el-col :span="12">
                                                <div class="tw_cl mb20">
                                                    <p class="pl10 w60">质量</p><el-slider style="width: 200px" :min="0" :max="10" v-model="mainData.formData.quality" /><p class="pl20">
                                                    {{ mainData.formData.quality }}/10</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="tw_cl mb20">
                                                    <p class="pl10 w60">亮度</p><el-slider style="width: 200px" :min="0" :max="255" v-model="mainData.formData.brightness" /><p class="pl20">
                                                    {{ mainData.formData.brightness }}/255</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="tw_cl mb20">
                                                    <p class="pl10 w60">色度</p><el-slider style="width: 200px" :min="0" :max="255" v-model="mainData.formData.chroma" /><p class="pl20">{{ mainData.formData.chroma }}/255</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="tw_cl mb20">
                                                    <p class="pl10 w60">对比度</p><el-slider style="width: 200px" :min="0" :max="127" v-model="mainData.formData.contrast" /><p class="pl20">{{ mainData.formData.contrast }}/127</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="tw_cl mb20">
                                                    <p class="pl10 w60">饱和度</p><el-slider style="width: 200px" :min="0" :max="127" v-model="mainData.formData.saturation" /><p class="pl20">{{ mainData.formData.saturation }}/127</p>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </el-descriptions-item>
                                </el-descriptions>
                                
                                <div class="tw_c mt30">
                                    <el-button @click="photo" type="primary" :lodaing="lodaing" size="small" round>立即拍照</el-button>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="自动拍照" name="second">
                                <el-descriptions class="mt20" direction="vertical" :column="1" border>
                                    <el-descriptions-item label="定时拍照">
                                        <template #label>
                                            <div class="tw_clr">
                                                <p>定时拍照</p>
                                                <el-button :loading="timeLodaing" @click="send('time')" icon="Position" round size="small" type="primary">发送</el-button>
                                            </div>
                                        </template>
                                        <el-form :model="mainData.formData" label-width="100px">
            
                                            <el-form-item v-for="i in 5" :key="i" class="mb3" :label="`摄像通道${i}`">
                                                <el-row class="w">
                                                    <el-col :span="10">
                                                        <el-form-item label="拍照开关标志">
                                                            <el-select size="small" v-model="mainData.autoTimeFormData[`channel${i}Open`]" placeholder="请选择结束时间">
                                                                <el-option label="关闭" :value="false" />
                                                                <el-option label="开启" :value="true" />
                                                            </el-select>
                                                        </el-form-item>
                    
                                                    </el-col>
                                                    <el-col :span="10" :offset="2">
                                                        <el-form-item label="存储标志">
                                                            <el-select size="small" v-model="mainData.autoTimeFormData[`channel${i}Flag`]" placeholder="请选择结束时间">
                                                                <el-option label="存储" :value="0" />
                                                                <el-option label="上传" :value="1" />
                                                            </el-select>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </el-form-item>
                                            <el-form-item class="mb3" label=" ">
                                                <el-row class="w">
                                                    <el-col :span="10">
                                                        <el-form-item label="定时时间单位">
                                                            <el-select size="small" v-model="mainData.autoTimeFormData.timeUnit" placeholder="请选择结束时间">
                                                                <el-option label="秒" :value="0" />
                                                                <el-option label="分" :value="1" />
                                                            </el-select>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="10" :offset="2">
                                                        <el-form-item label="定时时间间隔">
                                                            <el-input size="small" v-model="mainData.autoTimeFormData.timeInterval"></el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </el-form-item>
                                        </el-form>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="定距拍照">
                                        <template #label>
                                            <div class="tw_clr">
                                                <p>定距拍照</p>
                                                <el-button :loading="distanceLodaing" @click="send('distance')" icon="Position" round size="small" type="primary">发送</el-button>
                                            </div>
                                        </template>
                                        <el-form :model="mainData.formData" label-width="100px">
            
                                            <el-form-item v-for="i in 5" :key="i" class="mb3" :label="`摄像通道${i}`">
                                                <el-row class="w">
                                                    <el-col :span="10">
                                                        <el-form-item label="拍照开关标志">
                                                            <el-select size="small" v-model="mainData.autoDistanceFormData[`channel${i}Open`]" placeholder="请选择结束时间">
                                                                <el-option label="关闭" :value="false" />
                                                                <el-option label="开启" :value="true" />
                                                            </el-select>
                                                        </el-form-item>
                    
                                                    </el-col>
                                                    <el-col :span="10" :offset="2">
                                                        <el-form-item label="存储标志">
                                                            <el-select size="small" v-model="mainData.autoDistanceFormData[`channel${i}Flag`]" placeholder="请选择结束时间">
                                                                <el-option label="存储" :value="0" />
                                                                <el-option label="上传" :value="1" />
                                                            </el-select>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </el-form-item>
                                            <el-form-item class="mb3" label=" ">
                                                <el-row class="w">
                                                    <el-col :span="10">
                                                        <el-form-item label="定距距离单位">
                                                            <el-select size="small" v-model="mainData.autoDistanceFormData.distanceUnit" placeholder="请选择结束时间">
                                                                <el-option label="米" :value="0" />
                                                                <el-option label="公里" :value="1" />
                                                            </el-select>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="10" :offset="2">
                                                        <el-form-item label="定时时间间隔">
                                                            <el-input size="small" v-model="mainData.autoDistanceFormData.distanceInterval"></el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </el-form-item>
                                        </el-form>
                                    </el-descriptions-item>
                                </el-descriptions>
                                
                                <div class="tw_c mt30">
                                    <el-button @click="seekParams" icon="Search" round size="small" type="primary">查询参数</el-button>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="设置图像参数" name="third">
                                <el-descriptions class="mt20"
                                                 direction="vertical"
                                                 :column="1"
                                                 border
                                >
                                    <el-descriptions-item label="参数">
                                        <template #label>
                                            <div class="tw_clr">
                                                <p>参数</p>
                                                <el-button @click="sendSet" icon="Position" round size="small" type="primary">发送</el-button>
                                            </div>
                                        </template>
                                        <el-row :gutter="30">
                                            <el-col :span="12">
                                                <div class="tw_cl mb20">
                                                    <p class="pl10 w60">质量</p><el-slider style="width: 200px" :min="0" :max="10" v-model="mainData.setFormData.p0070" /><p class="pl20">20/10</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="tw_cl mb20">
                                                    <p class="pl10 w60">亮度</p><el-slider style="width: 200px" :min="0" :max="255" v-model="mainData.setFormData.p0071" /><p class="pl20">20/255</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="tw_cl mb20">
                                                    <p class="pl10 w60">色度</p><el-slider style="width: 200px" :min="0" :max="255" v-model="mainData.setFormData.p0072" /><p class="pl20">20/255</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="tw_cl mb20">
                                                    <p class="pl10 w60">对比度</p><el-slider style="width: 200px" :min="0" :max="127" v-model="mainData.setFormData.p0073" /><p class="pl20">20/127</p>
                                                </div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="tw_cl mb20">
                                                    <p class="pl10 w60">饱和度</p><el-slider style="width: 200px" :min="0" :max="127" v-model="mainData.setFormData.p0074" /><p class="pl20">20/127</p>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </el-descriptions-item>
                                </el-descriptions>
                            </el-tab-pane>
                        </el-tabs>
                        
                    
                    </el-main>
                </el-container>
            </div>
        </tw-dialog>
    
        
    </div>
</template>

<script setup lang="tsx">


import {
    photoDistanceControl,
    photoTimeControl,
    queryParamSet,
    takePhoto,
    termParamSet
} from "@/api/dynamicMonitoring/messages";

let { proxy } = getCurrentInstance()

let {carLists, props } = defineProps({
    carLists: { type: Array, default: ()=>[] },
    props: { type: Object, default: ()=>{ return {value: 'value', label: 'label' } }}
})
let dialogFlag = $ref(false)
let lodaing = $ref(false)
let timeLodaing = $ref(false)
let distanceLodaing = $ref(false)
let activeName = ref('first')
// {
//     checkList: [],
//         pageSize: 10,
//     terminalClassify: '',
//     annulEffecDateType: '',
//     state: 10,
// }
let mainData = reactive({
    formData:{
        "brightness": 128,
        "chroma": 128,
        "contrast": 71,
        "eventIds": [],
        allCheck: [1,2,3,4,5,6,7,8],
        "lensIds": '',
        "photoCommand": 1,
        "photoTimeInterval": 600,
        "quality": 3,
        "resolution": 1,
        "saturation": 64,
        "storeFlag": 0,
        "vehicleCodes": [],
        "webUuid": ""
    },
    autoTimeFormData: {
        "channel1Flag": 0,
        "channel1Open": false,
        "channel2Flag": 0,
        "channel2Open": false,
        "channel3Flag": 0,
        "channel3Open": false,
        "channel4Flag": 0,
        "channel4Open": false,
        "channel5Flag": 0,
        "channel5Open": false,
        "eventIds": [],
        "timeInterval": 5,
        "timeUnit": 0,
        "vehicleCodes": [],
        "webUuid": ""
    },
    autoDistanceFormData: {
        "channel1Flag": 0,
        "channel1Open": false,
        "channel2Flag": 0,
        "channel2Open": false,
        "channel3Flag": 0,
        "channel3Open": false,
        "channel4Flag": 0,
        "channel4Open": false,
        "channel5Flag": 0,
        "channel5Open": false,
        "distanceInterval": 1,
        "distanceUnit": 0,
        "vehicleCodes": [],
        "webUuid": ""
    },
    setFormData: {
        p0070: 3,
        p0071: 128,
        p0074: 128,
        p0072: 71,
        p0073: 64,
    },
    total: 40,
    pageSizesArr: [25, 50, 100],
})
const viewData = ()=>{
    dialogFlag = true
    initChildren()
}

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


let allCheck = $ref([1,2,3,4,5,6,7,8])
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

const initChildren = ()=>{
    let arr = [];
    checkedCities = []
    carLists.forEach((tag)=> {
        let val = tag[value]
        arr.push(val)
        checkedCities.push(val)
    })
    checkAll = true
    cities = arr
    checkedCities = arr
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

const invertSelection = ()=>{
    let newArr = []
    for (let i = 0; i < allCheck.length; i++) {
        let item = allCheck[i]
        if(!mainData.formData.allCheck.includes(item)){
            newArr.push(item)
        }
    }
    mainData.formData.allCheck = newArr
    console.log(newArr);
}

// 立即拍照
const photo = () => {
    mainData.formData.lensIds = mainData.formData.allCheck.join()
    mainData.formData.vehicleCodes = checkedCities
    lodaing = true
    takePhoto(mainData.formData).then(res=>{
        lodaing = false
        ElMessage.success('指令已下发服务器')
    }).catch(()=>{
        lodaing = false
    })
}

const getGuid = ()=> {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}


// 定时发送，定距发送
const send = (type) => {
    let guid = getGuid()
    if(type == 'time'){
        mainData.autoTimeFormData.vehicleCodes = checkedCities
        mainData.autoTimeFormData.webUuid = guid
        timeLodaing = true
        photoTimeControl(mainData.autoTimeFormData).then(res=>{
            timeLodaing = false
            ElMessage.success('指令已下发服务器')
        }).catch(()=>{
            timeLodaing = false
        })
    }else {
        mainData.autoDistanceFormData.vehicleCodes = checkedCities
        mainData.autoDistanceFormData.webUuid = guid
        distanceLodaing = true
        photoDistanceControl(mainData.autoDistanceFormData).then(res=>{
            distanceLodaing = false
            ElMessage.success('指令已下发服务器')
        }).catch(()=>{
            distanceLodaing = false
        })
    }
}

// 查询参数
const seekParams = ()=>{
    let guid = getGuid()
    queryParamSet({webUuid: guid, vehicleCodes: checkedCities}).then(res=>{
        ElMessage.success('查询指令已下发服务器')
    })
}

// 设置图像参数发送
const sendSet = () => {
    let guid = getGuid()
    termParamSet({webUuid: guid, vehicleCodes: checkedCities, params: mainData.setFormData}).then(res=>{
        ElMessage.success('指令已下发服务器')
    })
}

const onSubmit = () => {
    console.log('submit!')
}

let emits = defineEmits(['save'])
const save = ()=>{
    emits('save')
}

defineExpose({viewData})
</script>

<style scoped lang="scss">
.set-col{
    :deep(.el-dialog__body) {
        padding: 0 !important;
        .dialog_content { padding: 0 !important;}
        .el-checkbox-button__inner {
            width: 100%;
            .vehicleStatus {
                font-size: 14px;font-family: "HarmonyOSSansSC";line-height: 22px;color: rgba(0,0,0,0.65);width: 14px;height: 14px; margin-right: 4px;
            }
        }
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
