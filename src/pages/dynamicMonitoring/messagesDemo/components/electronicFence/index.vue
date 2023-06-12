<template>
    <div class="set-col">
        <tw-dialog title="电子围栏下发" width="1000px" v-model="dialogFlag" :bodyPadding="0">
            <div class="common-layout h">
                <el-container class="h">
                    <el-aside width="140px" class="border_r navs">
                        <div style="background: var(--tw-tag-bg-color);height: 740px">
                            <h3 class="title lh40">
                                <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">目标车辆</el-checkbox>
                            </h3>
                            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                <ul class="h">
                                    <el-checkbox class="pl20" v-for="(item, i) in carLists" :key="i" :label="item[value]">
                                        <li class="lh32 pointer">{{item.car}}</li>
                                    </el-checkbox>
                                </ul>
                            </el-checkbox-group>
                            
                        </div>
                        
                    </el-aside>
                    <el-main class="relative pt0 pb0 h">
                        <el-tabs v-model="activeName" class="demo-tabs">
                            <el-tab-pane label="圆形围栏" name="first">
                                <tw-table
                                    ref="userTableRef"
                                    url="/business/driver/page"
                                    size="small"
                                    :tableParams="{vehicleCode: mainData.formData.vehicleCode}"
                                    :botHeight="300"
                                    class="pt0"
                                    :columns="mainData.columns"
                                    :isTableHeader="false"
                                    :showPagination="false">
                                </tw-table>
                                <div class="tw_c mt30">
                                    <el-button type="primary" size="small">更新圆形围栏</el-button>
                                    <el-button type="primary" size="small">追加圆形围栏</el-button>
                                    <el-button type="primary" size="small">修改圆形围栏</el-button>
                                    <el-button type="primary" size="small">删除指定圆形围栏</el-button>
                                    <el-button type="primary" size="small">删除所有圆形围栏</el-button>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="矩形围栏" name="first2">
                                <tw-table
                                    ref="userTableRef"
                                    url="/business/driver/page"
                                    size="small"
                                    :tableParams="{vehicleCode: mainData.formData.vehicleCode}"
                                    :botHeight="300"
                                    class="pt0"
                                    :columns="mainData.columns"
                                    :isTableHeader="false"
                                    :showPagination="false">
                                </tw-table>
                                <div class="tw_c mt30">
                                    <el-button type="primary" size="small">更新矩形围栏</el-button>
                                    <el-button type="primary" size="small">追加矩形围栏</el-button>
                                    <el-button type="primary" size="small">修改矩形围栏</el-button>
                                    <el-button type="primary" size="small">删除指定矩形围栏</el-button>
                                    <el-button type="primary" size="small">删除所有矩形围栏</el-button>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="多边形围栏" name="first3">
                                <tw-table
                                    ref="userTableRef"
                                    url="/business/driver/page"
                                    size="small"
                                    :tableParams="{vehicleCode: mainData.formData.vehicleCode}"
                                    :botHeight="300"
                                    class="pt0"
                                    :columns="mainData.columns"
                                    :isTableHeader="false"
                                    :showPagination="false">
                                </tw-table>
                                <div class="tw_c mt30">
                                    <el-button type="primary" size="small">更新多边形围栏</el-button>
                                    <el-button type="primary" size="small">删除指定多边形围栏</el-button>
                                    <el-button type="primary" size="small">删除所有多边形围栏</el-button>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="查询" name="first4">
                                <tw-table
                                    ref="userTableRef"
                                    url="/business/driver/page"
                                    size="small"
                                    :tableParams="{vehicleCode: mainData.formData.vehicleCode}"
                                    :botHeight="300"
                                    class="pt0"
                                    :columns="mainData.columns"
                                    :isTableHeader="false"
                                    :showPagination="false">
                                </tw-table>
                                <div class="tw_c mt30">
                                    <el-button type="primary" size="small">查询</el-button>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                     
                    </el-main>
                </el-container>
            </div>
        </tw-dialog>
    
        
    </div>
</template>

<script setup lang="tsx">


let {carLists, props } = defineProps({
    carLists: { type: Array, default: ()=>[] },
    props: { type: Object, default: ()=>{ return {value: 'value', label: 'label' } }}
})
let dialogFlag = $ref(false)
let activeName = ref('first')
let mainData = reactive({
    formData:{
        checkList: [],
        pageSize: 10,
        terminalClassify: '',
        annulEffecDateType: '',
        state: '',
    },
    total: 40,
    pageSizesArr: [25, 50, 100],
    columns: [
        { prop: 'roleName', label: '区域名称'},
        { prop: 'driverName', label: '中心点经度' },
        { prop: 'mobilePhone', label: '中心点纬度'},
        { prop: 'mobilePhone', label: '半径'},
        { prop: 'mobilePhone', label: '备注'},
    ],
})
const viewData = ()=>{
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

const initChildren = ()=>{
    let arr = [];
    checkedCities = []
    carLists.forEach((tag)=> {
        let val = tag[value]
        arr.push(val)
    })
    cities = arr
}
initChildren()

const handleCheckAllChange = (val: boolean) => {
    checkedCities = val ? cities : []
    isIndeterminate = false
}

const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length
    checkAll = checkedCount === cities.length
    isIndeterminate = checkedCount > 0 && checkedCount < cities.length
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
