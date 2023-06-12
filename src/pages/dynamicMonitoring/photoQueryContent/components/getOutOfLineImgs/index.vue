<template>
    <div class="set-col">
        <tw-dialog title="违规图片" width="800px" height="760px" :isFull="false" @handleClose="handleClose" v-model="dialogFlag" :bodyPadding="0">
            <div class="common-layout h">
                <el-container class="h">
                    <el-main class="tw_lr pb0 h">
                        <div class="tw">
                            <div class="mr10 mb20 ml10 b_radius" style="height: 370px" :class="itemData.calibration?'active_card':'bgInfo'">
                                <el-image class="b_radius overflow" style="width: 260px;height: 260px" :src="itemData.imgUrl" :preview-src-list="[itemData.imgUrl]" hide-on-click-modal></el-image>
                                <div class="tw_y pt5 pb5 pl10">
                                    <p class="fs12 mb3">车牌号：{{itemData.plateNum}}</p>
                                    <p class="fs12 mb3">当前速度：{{itemData.runningSpeed}}km/h</p>
                                    <p class="fs12 mb3">GPS时间：{{itemData.gpsTime}}</p>
                                </div>
                                <div class="tw_c p10">
                                    <el-button type="primary" size="small" @click="cancelJiuzheng">违规纠正</el-button>
                                </div>
                            </div>
                        </div>
                        <div class="p10 border b_radius">
                            <el-scrollbar style="height: 520px">
                                <div class="m30" style="width: 440px">
                                    <div class="tw">
                                        <div class="tw_y w200 mr10 mb20 ml10 b_radius overflow" v-for="(item, i) in lists" :key="i" :class="item.calibration?'active_card':'bgInfo'">
                                            <el-image :src="item.imgUrl" style="width: 200px; height: 140px" :preview-src-list="mainData.imgLists"
                                                      :initial-index="i" hide-on-click-modal></el-image>
                                            <div class="tw_y pt5 pl3 pb5">
                                                <p class="fs12 mb3">车牌号：{{item.plateNum}}</p>
                                                <p class="fs12 mb3">当前速度：{{item.runningSpeed}}km/h</p>
                                                <p class="fs12 mb3">GPS时间：{{item.gpsTime}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </div>
                        
                        
                    </el-main>
                </el-container>
            </div>
        </tw-dialog>
    
        
    </div>
</template>

<script setup lang="tsx">
import {
    getPhotoLesMarkSignInfo,
    getViolationPhotoList,
    photoPage, relieve,
    saveLesMarkSign
} from "@/api/dynamicMonitoring/messages";

let { proxy } = getCurrentInstance()

let dialogFlag = $ref(false)
let itemData = reactive({})
let lists = reactive([])
let mainData = reactive({
    imgLists: [],
    formData:{
        pageNumber: 1,
        pageSize: 25,
        "endTime": proxy.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
        "minSpeed": "",
        companyId: '',
        "order": "",
        "orderField": "",
        "startTime": proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
        "vehicleCodes": [],
        "vehicleOperateTypeCode": ""
    },
    descriptionsLists: [
        { key: 'plateNum', label: '车牌号:', col: 24 },
        { key: 'runningSpeed', label: '当前速度:', col: 24, formatter:(row)=> row.runningSpeed+'km/h' },
        { key: 'gpsTime', label: 'GPS时间:', col: 24 },

    ]
})
const viewData = (row)=>{
    let data =  proxy.$_.cloneDeep(row)
    itemData = data
    mainData.formData.vehicleCodes = [itemData.vehicleCode]
    mainData.formData.startTime = itemData.gpsTime
    mainData.formData.endTime = proxy.$dayjs(itemData.gpsTime).add(2, 'day').format('YYYY-MM-DD HH:mm:ss')
    photoPage(mainData.formData).then(res=>{
        lists = res.rows
        mainData.imgLists = proxy.$_.map(lists, 'imgUrl')
        dialogFlag = true
    })
}
let emits = defineEmits(['updateItem'])

const cancelJiuzheng = ()=>{
    // mainData.formData.gpsTime = proxy.$dayjs().format('YYYY-MM-DD HH:mm:ss')
    proxy.MessageBox({msg: '您确认要对当前事件进行违规纠正吗？', type: 'warning'}).then((close) => {
        relieve({businessId: itemData.businessId, gpsTime:itemData.gpsTime, primaryId:itemData.id, plateNum:itemData.plateNum}).then(res=>{
            ElMessage.success('操作成功')
            itemData.calibration = false
            dialogFlag = false
            emits('updateItem', mainData.formData)
            close()
        }).catch(()=>{
            close()
        })
    })
}


const handleClose = () => {
    dialogFlag = false
    mainData.formData = {}
}

defineExpose({viewData})
</script>

<style scoped lang="scss">
.active_card {
    background: rgba(255, 0, 0, 0.59);color: #fff;
}
</style>
