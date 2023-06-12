<template>
    <div class="set-col h">
        <div class="common-layout h">
            <el-container class="h">
                <el-main class="relative pt0 pb0 h">
<!--                    :foldNumber="3"-->
                    <tw-form class="pt10" :lists="mainData.lists" :formData="mainData.formData" label-width="80px" @submitForm="submitForm" @resetForm="getLists"></tw-form>
                    <div class="tw_cr mb10 mt10">
                        <el-button @click="btnClick('fnShot')">镜头标记</el-button>
                        <el-button @click="btnClick('fnGetOutOfLine')">违规标记</el-button>
                        <el-button @click="downLoadImg()">保存照片</el-button>
                    </div>
                    <el-scrollbar :style="`height: ${height}px`">
                        <div v-show="mainData.contentLists.length == 0" v-loading="loading" class="w h">
                            <el-empty description="无数据" />
                        </div>
                        <el-radio-group
                            v-show="mainData.contentLists.length>0"
                            v-loading="loading"
                            v-model="vehicleId"
                        >
                            <div class="photoQueryContent tw w h tw_cl">
                                <div v-for="(item, i) in mainData.contentLists" :key="i" class="mb20 card_content" style="width: 340px" :class="item.calibration? 'active_card':''">
                                    <el-radio :label="item.id" class="relative w">
                                        <el-card class="card_item" :body-style="{ padding: '0px' }">
                                            <el-image style="width: 340px;height: 280px" :src="item.imgUrl" lazy>
                                                <template #error>
                                                    <img style="width: 100%;" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"/>
                                                </template>
                                            </el-image>
                                            <tw-form-item label-width="74px" size="small" :lists="mainData.descriptionsLists" :row="item ?? {}" mb="0px"></tw-form-item>
<!--                                            <el-descriptions :style="`padding: 0 6px;`" :column="1" size="small">-->
<!--                                                <el-descriptions-item class="pb0">-->
<!--                                                    <template #label><span style="width:100px">车  牌 号:</span></template>-->
<!--                                                    {{ item.plateNum }}<span class="ml5">{{item.plateColorName}}</span></el-descriptions-item>-->
<!--                                                <el-descriptions-item class="pb0" label="所属区域:">{{ item.district }}</el-descriptions-item>-->
<!--                                                <el-descriptions-item class="pb0" label="公司名称:" :span="2">{{ item.companyName }}</el-descriptions-item>-->
<!--                                                <el-descriptions-item class="pb0" label="运 营  商:">{{ item.operatorName }}</el-descriptions-item>-->
<!--                                                <el-descriptions-item class="pb0" label="营运类型:">{{ item.vehicleOperateTypeName }}</el-descriptions-item>-->
<!--                                                <el-descriptions-item class="pb0" label="网络类型:">{{ item.aaaa }}</el-descriptions-item>-->
<!--                                                <el-descriptions-item class="pb0" label="卫星时间:">{{ item.gpsTime }}</el-descriptions-item>-->
<!--                                                <el-descriptions-item class="pb0" label="当前速度:">{{ item.runningSpeed }}</el-descriptions-item>-->
<!--                                                <el-descriptions-item class="pb0" label="通  道  ID:">{{ item.aaaa }}</el-descriptions-item>-->
<!--                                            </el-descriptions>-->
                                            
                                            <el-tag class="positionBr" style="bottom: 10px;right: 10px" @click="viewImgs(item)" v-show="item.calibration" effect="dark">违规纠正</el-tag>
                                        </el-card>
                                    </el-radio>
                                </div>
                            </div>
                        </el-radio-group>
                    </el-scrollbar>
                    <!--  分页  -->
                    <tw-pagination class="mt10" ref="paginationRef" v-model:currentPage="mainData.formData.pageNumber" v-model:pageSize="mainData.formData.pageSize" :total="mainData.total" :pageSizesArr="mainData.pageSizesArr" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></tw-pagination>
                </el-main>
            </el-container>
        </div>
        <!--    违规    -->
        <getOutOfLine title="违规标记" ref="getOutOfLineRef" @updateLists="updateLists" @mark="mark"></getOutOfLine>
        <!--    镜头    -->
        <shot title="镜头标定" ref="shotRef" @updateShot="getLists"></shot>
        <!--    违规纠正    -->
        <getOutOfLineImgs title="违规纠正" @updateItem="updateItem" ref="getOutOfLineImgsRef"></getOutOfLineImgs>
    
        <CarDetailDialog ref="dialogRef" :title="title"  showManual showVideoPlayer showPhotograph :showWarningList="false"></CarDetailDialog>
    </div>
</template>

<script setup lang="tsx">
import {photoPage, saveLesMarkSign, saveMarkSign} from "@/api/dynamicMonitoring/messages";
import {getCurrentInstance} from "vue";
import getOutOfLine from "./components/getOutOfLine/index.vue"
import shot from "./components/shot/index.vue"
import getOutOfLineImgs from "./components/getOutOfLineImgs/index.vue"
import CarDetailDialog from '@/businessComponents/CarDetailDialog/index.vue'


let {proxy} = getCurrentInstance()
let height = $ref(0)
let shotRef = $ref(null)
let getOutOfLineRef = $ref(null)
let dialogRef = $ref(null)
let getOutOfLineImgsRef = $ref(null)
let paginationRef = $ref(null)
let loading = $ref(false)
let itemData = $ref({})
let vehicleId = $ref('')
let title = $ref('查看')
height = window.innerHeight - 240
let mainData = reactive({
    formData:{
        pageNumber: 1,
        pageSize: 25,
        "endTime": proxy.$dayjs().format('YYYY-MM-DD 23:59:59'),
        "minSpeed": "",
        companyId: '',
        "order": "",
        "orderField": "",
        "startTime": proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
        "vehicleCodes": [],
        "vehicleOperateTypeCode": ""
    },
    total: 20,
    lists: [
        {label: '时间范围', key: ['startTime', 'endTime'], type:'esDate', placeholder: '选择时间',disabledDate: proxy.disabledAfterToday,
      endDisabledDate: proxy.disabledAfterToday, data: {type: 'datetime', valueFormat: 'YYYY-MM-DD HH:mm:ss'},col: 9 },
        {label: '企业名称', key: 'companyId', type: 'select', remote: true, url: '/business/company/associateCompany', method: 'post', params: { havePermission: true }, props: { label: 'companyName', value: 'companyId' }, placeholder: '请选择企业名称',col: 5},
        {label: '车牌号', key: 'vehicleCodes', type:'select', multiple: true, remote: true, url: '/business/vehicle/associationPlateNum', method: 'post', loadMore: true, params: {pageNumber: 1, pageSize: 25, valid: 1,havePermission: true}, props:{ label: 'plateNum', value:'vehicleCode'}, placeholder: '请选择车牌号码',col: 5},
        {label: '营运类型', key: 'vehicleOperateTypeCode', type: 'select', remote: true, url: '/system/vehicleOperateType/getListByName', method: 'get', params: {}, props: { label: 'typeName', value: 'typeCode' }, placeholder: '请选择营运类型',col: 5},
    ],
    contentLists: [],
    descriptionsLists:[
        { key: 'createTime', label: '车 牌 号:', col: 24, formatter:(row)=> <p class="tw">{row.plateNum}<p class="p5"></p>  {row.plateColorName}</p>  },
        { key: 'district', label: '所属区域:', col: 24 },
        { key: 'companyName', label: '公司名称:', col: 24 },
        { key: 'operatorName', label: '运 营  商:', col: 24 },
        { key: 'vehicleOperateTypeName', label: '营运类型:', col: 24 },
        { key: 'netWorkType', label: '网络类型:', col: 24, formatter:(row)=> row.netWorkType==0?'2G':'4G' },
        { key: 'gpsTime', label: '卫星时间:', col: 24 },
        { key: 'runningSpeed', label: '当前速度:', col: 24, formatter:(row)=> row.runningSpeed+'km/h' },
        { key: 'lensId', label: '通  道  ID:', col: 24 },
    ]
})

const getLists = () => {
    loading = true
    photoPage(mainData.formData).then(res=>{
        loading = false
        mainData.total = res?.total
        mainData.contentLists = res?.rows || []
        if(!res && mainData.formData.pageNumber == 1){
            ElMessage.warning('未查询到数据')
        }
    }).catch(()=>{
        loading = false
    })
}

// 搜索
const submitForm = () => {
    paginationRef.setPage(1)
    mainData.formData.pageNumber = 1
    getLists()
}

getLists()

const handleSizeChange = (val)=>{
    mainData.formData.pageNumber = 1
    mainData.formData.pageSize = val
    getLists()
}

const handleCurrentChange = (val)=>{
    mainData.formData.pageNumber = val
    getLists()
}

const btnClick = (type) => {
    if(vehicleId == '') return ElMessage.warning('请选择图片')
    let car = mainData.contentLists.filter(item=>item.id == vehicleId)[0]
    if(type == 'fnShot'){
        shotRef.viewData(car)
    }else {
        getOutOfLineRef.viewData(car)
    }
}


let itemRow = {
    calibration: undefined
}
// 违规纠正
const viewImgs = (item) => {
    itemData = item
    itemRow = item
    getOutOfLineImgsRef.viewData(item)
}

const updateItem = () => {
    itemRow.calibration = false
}

const mark = (row) => {
    mainData.contentLists.map(item=>{
        if(item.id == vehicleId){
            item.calibration = true
        }
    })
}

// 违规
const updateLists = (row) => {
    dialogRef.show(row)
}

// 保存图片
const downLoadImg = () => {
    if(vehicleId == '') return ElMessage.warning('请选择图片')
    let car = mainData.contentLists.filter(item=>item.id == vehicleId)[0]
    let name = car.companyName,plateNum = car.plateNum, gpstime=car.gpsTime, image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function() {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        let url = canvas.toDataURL("image/png",0.7); //得到图片的base64编码数据
        let a = document.createElement("a"); // 生成一个a元素
        let event = new MouseEvent("click"); // 创建一个单击事件
        a.download = `${name}_${plateNum}[${car.plateColorName}]_${gpstime}.png`; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
        document.body.removeChild(a)
        document.body.removeChild(image)
    };
    // 后端图片数据没有处理好，这里做了三元运算
    image.src = car.imgUrl;
    // image.src = car.imgUrl.indexOf('http')>-1?car.imgUrl:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png';
}

let emits = defineEmits(['save'])
const save = ()=>{
    emits('save')
}

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
        .card_content {
            margin-right: 30px;
            &:nth-child(5n+5) { margin-right: 0}
        }
        :deep(.el-radio) {
            height: auto;
            
            .el-radio__input { position: absolute; top: 240px;right: 20px;z-index: 1}
            .el-radio__label {
                width: 100%;padding-left: 0;
                .el-descriptions--small .el-descriptions__body .el-descriptions__table:not(.is-bordered) .el-descriptions__cell { padding-bottom: 0}
                
            }
            
        }
        :deep(.active_card) {
            .card_item{
                background: rgba(255, 0, 0, 0.59);
                .el-form-item__content{color: #fff;}
            }
        }
    }
    
}

</style>
