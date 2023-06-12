<template>
    <div class="set-col">
        <tw-dialog title="照片查询" width="1400px" v-model="dialogFlag" :bodyPadding="0">
            <div class="common-layout h">
                <el-container class="h">
                    <el-aside width="140px" class="border_r navs">
                        <div style="background: var(--tw-tag-bg-color);height: 740px">
                            <h3 class="title lh40">
                                <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">目标车辆</el-checkbox>
                            </h3>
                            <el-checkbox-group v-model="mainData.formData.vehicleCodes" @change="handleCheckedCitiesChange">
                                <ul class="h">
                                    <el-checkbox-button class="w tw_c" v-for="(item, i) in carLists" :key="i" :label="item[value]">
                                        <svg-icon :color="mainData.formData.vehicleCodes.includes(item[value])?'#fff':getCarImg(item).color" :icon-class="getCarImg(item).icon" size="12px"></svg-icon>
                                        <span class="ml10">{{item.plateNum}}</span>
                                    </el-checkbox-button>
                                </ul>
                            </el-checkbox-group>
                            
                        </div>
                        
                    </el-aside>
                    <el-main class="relative pt0 pb0 h">
                        <tw-form class="pt10" :lists="mainData.lists"  :formData="mainData.formData" :label-width="80"></tw-form>
                        <div class="tw_cr mb10 mt10">
                            <el-button>镜头标记</el-button>
                            <el-button>违规标记</el-button>
                            <el-button>保存照片</el-button>
                        </div>
                        <el-scrollbar style="height: 570px">
                            <el-checkbox-group
                                v-model="mainData.formData.vehicleCodes"
                                @change="handleCheckedCitiesChange"
                            >
                                <div class="photoQueryContent tw w">
                                    <!--                                <el-col v-for="(o, index) in 10" :key="o" :span="4" :offset="index%5 < 5 && index%5 > 0 ? 1 : 0" class="mb10">-->
                                    <div v-for="(o, index) in mainData.contentLists" :key="o" class="mb10 " style="width: 20%">
                                        <el-checkbox class="relative w">
                                            <el-card :body-style="{ padding: '0px' }">
                                                <img style="width: 120%; height: 165px;" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"/>
                                                <div style="padding: 0 6px">
                                                    <el-descriptions :column="1" size="small">
                                                        <el-descriptions-item label="车  牌 号:">kooriookami</el-descriptions-item>
                                                        <el-descriptions-item label="所属区域:">18100000000</el-descriptions-item>
                                                        <el-descriptions-item label="公司名称:" :span="2">Suzhou</el-descriptions-item>
                                                        <el-descriptions-item label="运 营  商:"></el-descriptions-item>
                                                        <el-descriptions-item label="营运类型:"></el-descriptions-item>
                                                        <el-descriptions-item label="网络类型:"></el-descriptions-item>
                                                        <el-descriptions-item label="卫星时间:"></el-descriptions-item>
                                                        <el-descriptions-item label="当前速度:"></el-descriptions-item>
                                                        <el-descriptions-item label="通  道  ID:"></el-descriptions-item>
                                                    </el-descriptions>
                                                </div>
                                            </el-card>
                                        </el-checkbox>
            
            
                                    </div>
                                </div>
                            </el-checkbox-group>
                        </el-scrollbar>
                        <!--  分页  -->
                        <tw-pagination class="mt10" v-model:currentPage="mainData.formData.pageNumber" v-model:pageSize="mainData.formData.pageSize" :total="mainData.total" :pageSizesArr="mainData.pageSizesArr" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></tw-pagination>
                    </el-main>
                </el-container>
            </div>
        </tw-dialog>
    
        
    </div>
</template>

<script setup lang="tsx">


import {photoPage} from "@/api/dynamicMonitoring/messages";
import {getCurrentInstance} from "vue";

let {carLists, props } = defineProps({
    carLists: { type: Array, default: ()=>[] },
    props: { type: Object, default: ()=>{ return {value: 'value', label: 'label' } }}
})
let {proxy} = getCurrentInstance()
let dialogFlag = $ref(false)
let activeName = ref('first')
let mainData = reactive({
    formData:{
        pageNumber: 1,
        pageSize: 10,
        "companyId": 0,
        "endTime": proxy.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
        "lensOrientation": 0,
        "minSpeed": "",
        "order": "",
        "orderField": "",
        "startTime": proxy.$dayjs().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
        "vehicleCodes": [],
        "vehicleOperateTypeCode": ""
    },
    total: 40,
    pageSizesArr: [25, 50, 100],
    lists: [
        {label: '企业名称', key: 'terminalClassify', type:'select', filter: 'terminalClassify', col: 7},
        {label: '营运类型', key: 'annulEffecDateType', type:'select', placeholder: '请选择营运类型', filter: 'driverEc', col: 7},
        {label: '车牌号', key: 'state', type:'select', placeholder: '请选择车牌号', col: 7, children: [{label: '是', value: 1},{label: '不是', value: 0}]},
    ],
    contentLists: []
})

let value = $ref(null)
let label = $ref(null)
let disabled = $ref(null)
value = props?.value || 'value'
label = props?.label || 'label'
disabled = props?.disabled || 'disabled'


const viewData = ()=>{
    initChildren()
    dialogFlag = true
    photoPage(mainData.formData).then(res=>{
        mainData.contentLists = res
    })
    
}



let checkAll = $ref(false)
let isIndeterminate = $ref(false)
let cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']

const initChildren = ()=>{
    let arr = [];
    mainData.formData.vehicleCodes = []
    carLists.forEach((tag)=> {
        let val = tag.value
        arr.push(val)
    })
    cities = arr
    mainData.formData.vehicleCodes = arr
    checkAll = true
}
initChildren()

const handleCheckAllChange = (val: boolean) => {
    mainData.formData.vehicleCodes = val ? cities : []
    isIndeterminate = false
}

const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === cities.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}

const handleSizeChange = ()=>{

}

const handleCurrentChange = ()=>{

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
