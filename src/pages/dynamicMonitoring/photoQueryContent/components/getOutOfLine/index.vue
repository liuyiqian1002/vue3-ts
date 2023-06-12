<template>
    <div class="set-col">
        <tw-dialog title="违规标记" width="1000px" height="760px" v-model="dialogFlag" :isFull="false" :bodyPadding="0" @handleClose="handleClose">
            <div class="common-layout h">
                <el-container class="h">
                    <el-main class="tw_lr pb0 h">
                        <el-image class="b_radius overflow" style="width: 630px;height: 500px" :src="mainData.formData.imgUrl" :preview-src-list="[mainData.formData.imgUrl]" hide-on-click-modal></el-image>
                        <div class="m30 bgWhite b_radius" style="width: 300px">
                            <el-tag class="w mb20 fs16 lh40" style="height: 40px" effect="dark" size="large">{{ mainData.formData.plateNum }}</el-tag>
                            
                            <tw-custom-form
                                ref="fromDataRef"
                                class="w300"
                                :lists="mainData.lists"
                                :formData="mainData.formData"
                                labelPosition="top"
                            >
                                <template #gpsTime>{{mainData.formData.gpsTime}}</template>
                                
                                <template #driverWarningType>
                                    <el-checkbox-group v-model="mainData.formData.driverWarningType" @change="handleCheckAllChange">
                                        <el-row>
                                            <el-col :span="12" v-for="(item, i) in mainData.lists[1].children" :key="i">
                                                <el-checkbox :label="item.value" :key="item.label" :disabled="mainData.formData.driverWarningType.includes(60) && item.value != 60">{{ item.label }}</el-checkbox>
                                            </el-col>
                                        </el-row>
                                    </el-checkbox-group>
                                </template>
                            </tw-custom-form>
                            <div class="tw_c mt30" v-if="!mainData.formData.calibration">
                                <el-button type="primary" :loading="loading" @click="confirm">确定</el-button>
                                <el-button @click="dialogFlag=false">取消</el-button>
                            </div>
                            <p v-else class="danger">(图片已标记)</p>
                        </div>
                    </el-main>
                </el-container>
            </div>
        </tw-dialog>
    
        
    </div>
</template>

<script setup lang="tsx">
import { saveMarkSign } from "@/api/dynamicMonitoring/messages";
import {getCurrentInstance} from "vue";

let { proxy } = getCurrentInstance()
let { props } = defineProps({
    props: { type: Object, default: ()=>{ return {value: 'value', label: 'label' } }}
})
let dialogFlag = $ref(false)
let loading = $ref(false)
let visible = $ref(false)
let mainData = reactive({
    formData:{
        "businessId": '',
        "driverWarningType": [],
        "gpsTime": "",
        "markingDesc": "",
        "primaryId": "",
        "vehicleCode": ""
    },
    lists: [
        { key: 'gpsTime', label: '卫星时间：', slot: true},
        { key: 'driverWarningType', label: '违规行为：', width: 120, placeholder: '请选择违规行为', type:'checkbox', slot: true, children: [
                {label: '抽烟', value: 8},
                {label: '打电话', value: 5},
                {label: '打瞌睡', value: 20},
                {label: '聊天', value: 30},
                {label: '其他', value: 50},
                {label: '使用手机', value: 90},
                {label: '未系安全带', value: 40},
                {label: '副驾坐人', value: 70},
                {label: '乘客站立行走', value: 80},
                {label: '无押运员', value: 60}
            ]
        },
        { key: 'markingDesc', label: '违规备注：', maxRows: 2,placeholder: '请输入违规备注',maxlength: 50,showWordLimit: true, props: {type: 'textarea'}, },
    ],
})
const viewData = (row)=>{
    let data =  proxy.$_.cloneDeep(row)
    mainData.formData.driverWarningType = []
    mainData.formData.primaryId = data.id
    mainData.formData.businessId = data.businessId
    mainData.formData.vehicleCode = data.vehicleCode
    mainData.formData = {...mainData.formData, ...data}
    dialogFlag = true
}
let emits = defineEmits(['updateLists', 'mark'])



const confirm = ()=>{
    // mainData.formData.gpsTime = proxy.$dayjs().format('YYYY-MM-DD HH:mm:ss')
    if(mainData.formData.driverWarningType.length == 0) return ElMessage.warning('请选择违规行为')
    let formData = proxy.$_.cloneDeep(mainData.formData)
    formData.driverWarningType = formData.driverWarningType.join()
    loading = true
    saveMarkSign(formData).then(res=>{
        loading = false
        dialogFlag = false
        proxy.MessageBox({msg: `操作成功`, type: 'warning'}).then((close) => {
            close()
            res.gpsTime = mainData.formData.gpsTime
            emits('updateLists', res)
            emits('mark', mainData.formData)
    
            mainData.formData = {
                "businessId": '',
                "driverWarningType": [],
                "gpsTime": "",
                "markingDesc": "",
                "primaryId": "",
                "vehicleCode": ""
            }
        }).catch(()=>{
            emits('mark', mainData.formData)
        })
    }).catch(()=>{
        loading = false
    })
}

const handleCheckAllChange = (val) => {
    if(val.includes(60)){
        mainData.formData.driverWarningType = [60]
    }
    console.log(val);
}

const handleClose = () => {

}

defineExpose({viewData})
</script>

<style scoped lang="scss">

</style>
