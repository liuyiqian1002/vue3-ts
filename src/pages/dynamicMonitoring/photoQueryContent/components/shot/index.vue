<template>
    <div class="set-col">
        <tw-dialog title="镜头标记" width="1000px" height="760px" :isFull="false" @handleClose="handleClose" v-model="dialogFlag" :bodyPadding="0">
            <div class="common-layout h">
                <el-container class="h">
                    <el-main class="tw_lr pb0 h">
                        <el-image class="b_radius overflow" style="width: 600px;height: 500px" :src="mainData.formData.imgUrl" :preview-src-list="[mainData.formData.imgUrl]" hide-on-click-modal></el-image>
                        <div class="m30 bgWhite b_radius" style="width: 340px">
                            <el-tag class="w mb20 fs16 lh40" style="height: 40px" effect="dark" size="large">{{ mainData.formData.plateNum }}</el-tag>
                            <tw-custom-form
                                ref="fromDataRef"
                                :lists="mainData.lists"
                                :formData="mainData.formData"
                                label-width="90px"
                            >
                                <template #vehicleOperateTypeName>{{mainData.formData.vehicleOperateTypeName}}</template>
                                <template #lensId>{{mainData.formData.lensId}}</template>
                            </tw-custom-form>
                            <div class="tw_c mt30">
                                <template v-if="itemData">
                                    <span class="danger">（图片已标定）</span>
                                </template>
                                <template v-else>
                                    <el-button type="primary" @click="confirm">确定</el-button>
                                    <el-button @click="handleClose">取消</el-button>
                                </template>
                                
                            </div>
                        </div>
                    </el-main>
                </el-container>
            </div>
        </tw-dialog>
    
        
    </div>
</template>

<script setup lang="tsx">
import {getPhotoLesMarkSignInfo, saveLesMarkSign} from "@/api/dynamicMonitoring/messages";

let { proxy } = getCurrentInstance()

let dialogFlag = $ref(false)
let itemData = reactive({})
let mainData = reactive({
    formData:{
        "companyId": 0,
        "lensId": 0,
        "orientation": 0,
        "plateNum": "",
        "remark": "",
        "status": true,
        "vehicleCode": "",
        "vehicleTypeId": 0,
        primaryId:'',
        businessId:'',
    },
    lists: [
        { key: 'vehicleOperateTypeName', label: '车辆类型：', slot: true, col: 14},
        { key: 'lensId', label: '镜头ID：', slot: true, col: 10},
        { key: 'status', label: '是否正常：',placeholder: '请选择报警类型', type:'radio', children: [
                {label: '是', value: true},
                {label: '否', value: false},
            ]
        },
        { key: 'orientation', label: '镜头方位：', width: 70,placeholder: '请选择报警类型', type:'radio', filter: 'markPhotoType', children: [
                {label: '正驾驶', value: 1},
                {label: '副驾驶', value: 2},
                {label: '车内', value: 20},
                {label: '路况', value: 30},
                {label: '其他', value: 0}
            ]
        },
        { key: 'remark', label: '违规备注：', maxRows: 2,maxlength: 100,showWordLimit: true,placeholder: '请输入违规备注',props: {type: 'textarea'}, },
    ],
})
const viewData = (row)=>{
    let data =  proxy.$_.cloneDeep(row)
    mainData.formData.primaryId = data.id
    mainData.formData.businessId = data.businessId
    mainData.formData.vehicleCode = data.vehicleCode
    getPhotoLesMarkSignInfo({"gpsTime": row.gpsTime, "id": row.id}).then(res=>{
        mainData.formData = {...mainData.formData, ...data}
        mainData.formData = {...mainData.formData, ...res}
        itemData = res
        dialogFlag = true
    })
}
let emits = defineEmits(['updateShot'])

const confirm = ()=>{
    // mainData.formData.gpsTime = proxy.$dayjs().format('YYYY-MM-DD HH:mm:ss')
    let formData = proxy.$_.cloneDeep(mainData.formData)
    formData.lensId = formData.lensId=='未知'?0:formData.lensId
    saveLesMarkSign(formData).then(res=>{
        ElMessage.success('操作成功')
        dialogFlag = false
        emits('updateShot', mainData.formData)
    })
}

const handleClose = () => {
    dialogFlag = false
    mainData.formData = {}
}

defineExpose({viewData})
</script>

<style scoped lang="scss">

</style>
