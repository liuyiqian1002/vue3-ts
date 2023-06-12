<template>
    <div class="set-col">
        <tw-dialog title="车辆监控" width="1000px" v-model="dialogFlag" :bodyPadding="0">
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
                        <el-form class="form" label-width="130px">
                            <el-descriptions class="mt20"
                                             direction="vertical"
                                             :column="1"
                                             border
                            >
                                <el-descriptions-item label="位置查询">
                                    <div class="tw_c">
                                        <el-button>实时位置</el-button>
                                        <el-button>实时点名</el-button>
                                    </div>
                                </el-descriptions-item>
                                <el-descriptions-item label="设置持续监控">
                                    <template #label>
                                        <div class="tw_clr">
                                            <p>定时拍照</p>
                                            <el-button icon="Position" round size="small" type="primary">发送</el-button>
                                        </div>
                                    </template>
                                    <el-row class="w">
                                        <el-col :span="10">
                                            <el-form-item label="汇报策略">
                                                <el-select class="w" size="small" v-model="mainData.formData.annulEffecDateType" placeholder="请选择结束时间">
                                                    <el-option label="定时和定距汇报" value="shanghai" />
                                                    <el-option label="定时汇报" value="shanghai" />
                                                    <el-option label="定距汇报" value="beijing" />
                                                </el-select>
                                            </el-form-item>
                
                                        </el-col>
                                        <el-col :span="10" :offset="2">
                                            <el-form-item label="汇报方案">
                                                <el-select class="w" size="small" v-model="mainData.formData.annulEffecDateType" placeholder="请选择结束时间">
                                                    <el-option label="根据登录状态和ACC状态" value="shanghai" />
                                                    <el-option label="根据ACC状态" value="beijing" />
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row class="w">
                                        <el-col :span="10">
                                            <el-form-item label="汇报间隔">
                                                <el-input size="small">
                                                    <template #suffix>
                                                        秒
                                                    </template>
                                                </el-input>
                                            </el-form-item>
                
                                        </el-col>
                                        <el-col :span="10" :offset="2">
                                            <el-form-item label="拐点补偿">
                                                <el-input size="small">
                                                    <template #suffix>
                                                        秒
                                                    </template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row class="w">
                                        <el-col :span="10">
                                            <el-form-item label="汇报间隔">
                                                <el-input size="small">
                                                    <template #suffix>
                                                        秒
                                                    </template>
                                                </el-input>
                                            </el-form-item>
                
                                        </el-col>
                                        <el-col :span="10" :offset="2">
                                            <el-form-item label="未登录汇报间隔">
                                                <el-input size="small">
                                                    <template #suffix>
                                                        秒
                                                    </template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row class="w">
                                        <el-col :span="10">
                                            <el-form-item label="紧急报警汇报间隔">
                                                <el-input size="small">
                                                    <template #suffix>
                                                        秒
                                                    </template>
                                                </el-input>
                                            </el-form-item>
                
                                        </el-col>
                                        <el-col :span="10" :offset="2">
                                            <el-form-item label="休眠时汇报间隔">
                                                <el-input size="small">
                                                    <template #suffix>
                                                        秒
                                                    </template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row class="w">
                                        <el-col :span="10">
                                            <el-form-item label="未登录汇报间隔">
                                                <el-input size="small">
                                                    <template #suffix>
                                                        秒
                                                    </template>
                                                </el-input>
                                            </el-form-item>
                
                                        </el-col>
                                    </el-row>
                                    <el-row class="w">
                                        <el-col :span="10">
                                            <el-form-item label="紧急报警汇报间隔">
                                                <el-input size="small">
                                                    <template #suffix>
                                                        秒
                                                    </template>
                                                </el-input>
                                            </el-form-item>
                
                                        </el-col>
                                        <el-col :span="10" :offset="2">
                                            <el-form-item label="休眠时汇报间隔">
                                                <el-input size="small">
                                                    <template #suffix>
                                                        秒
                                                    </template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-descriptions-item>
                                <el-descriptions-item label="临时监控参数">
                                    <template #label>
                                        <div class="tw_clr">
                                            <p>定时拍照</p>
                                            <el-button icon="Position" round size="small" type="primary">发送</el-button>
                                        </div>
                                    </template>
                                    <el-row class="w">
                                        <el-col :span="10">
                                            <el-form-item label="时间间隔">
                                                <el-input size="small">
                                                    <template #suffix>
                                                        秒
                                                    </template>
                                                </el-input>
                                            </el-form-item>
                
                                        </el-col>
                                        <el-col :span="10" :offset="2">
                                            <el-form-item label="有效期">
                                                <el-input size="small">
                                                    <template #suffix>
                                                        秒
                                                    </template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-descriptions-item>
                            </el-descriptions>

                        </el-form>
    
                        <div class="tw_c mt30">
                            <el-button type="primary" round icon="Search">查询参数</el-button>
                        </div>
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
    :deep(.el-form-item) {margin-bottom: 0}
    :deep(.el-dialog__body) {
        padding: 0 !important;
        .dialog_content { padding: 0 !important;}
    }
    .navs {
        .is-active { background: #fff}
    }
}

</style>
