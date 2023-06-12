<template>
    <div>
        <tw-drawer @save="save" @handleClose="handleClose" :loading="loading" :width="'1400px'" :title="title"
            v-model="drawerFlag">
            <tw-custom-form ref="fromDataRef" class="w1000" :lists="mainData.lists1" :rules="mainData.rules"
                :formData="mainData.formData"></tw-custom-form>
            <div class="params-settings-wrapper">
                <div class="title">参数设置</div>
                <div class="table-wrapper">
                    <el-table :data="paramList">
                        <el-table-column label="参数名称" prop="parameterName">
                        </el-table-column>
                        <el-table-column label="参数值" prop="parameterValue">
                            <template #default="scope">
                                <el-input v-if="scope.row.parameterType === 1" v-model="scope.row.parameterValue"
                                    size="small" :input-style="{ width: '200px' }"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="参数描述" prop="remark">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="details-settings-wrapper">
                <div class="title">
                    <div>明细设置</div>
                    <div><el-button type="primary" @click="onAdd">新增</el-button></div>
                    <div>
                        <p class="fs14">建议:纯文本sheet页建议行高20-30，含图片sheet页建议行高200-250。</p>
                    </div>
                </div>
                <div class="table-wrapper">
                    <el-table :data="sheetList">
                        <el-table-column v-for="(it, i) in sheetListColumn" :label="it.label" :prop="it.key" :key="i">
                            <template #default="scope">
                                <el-input v-if="it.type === 'input'" v-model="scope.row[it.key]" size="small"
                                    :input-style="{ width: (it.width || 120) + 'px' }" :key="Math.random()"></el-input>
                                <el-select v-model="scope.row[it.key]" v-if="it.type === 'select'" size="small"
                                    :key="Math.random()">
                                    <el-option v-if="i === 2" v-for="item in alarmTypes" :key="item.alarmTypeName"
                                        :label="item.alarmTypeName" :value="item.alarmTypeCode" />
                                    <el-option v-else v-for="item in it.selectList" :key="item.value + 1"
                                        :label="item.label" :value="item.value" />
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template #default="scope">
                                <el-button @click="onDelete(scope.row)" size="small">删除</el-button>
                                <el-button @click="onSet(scope.row)" size="small">设置列</el-button>
                                <el-button @click="onUp(scope.row,scope.$index)" size="small">↑</el-button>
                                <el-button @click="onDown(scope.row,scope.$index)" size="small">↓</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <tw-custom-form ref="fromDataRef" class="w1000" :lists="mainData.lists2" :rules="mainData.rules"
                :formData="mainData.formData"></tw-custom-form>
            <div class="time-wrapper" v-if="mainData.formData.periodType === 1">
                <el-time-picker v-model="mainData.formData.periodStart" format="HH:mm:ss" placeholder="开始时间" />
                <el-time-picker v-model="mainData.formData.periodEnd" format="HH:mm:ss" arrow-control placeholder="结束时间" />
            </div>
            <SetCol ref="setColRef"></SetCol>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import { getReportConfigSelect, addOrUpdate } from '@/api/operation/statement/template';
import { getCurrentInstance } from 'vue'
import SetCol from './setCol.vue'

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let mainData = reactive({
    formData: {

        "configId": 0,
        "configName": "",
        "dataSelectMode": 0,
        "nullDisplay": 0,
        "paramList": [
            {
                "parameterKey": "",
                "parameterName": "",
                "parameterType": 0,
                "parameterValue": ""
            }
        ],
        "periodEnd": '',
        "periodStart": '',
        "periodType": 0,
        "reportAlarmCategoryId": '',
        "reportTemplateId": 0,
        "reportType": 0,
        "templateType": 1,
        "templateCategory": 1,
        "sheetList": [
            {
                "dataTag": "",
                "id": 0,
                "serialNumber": 0,
                "sheetName": "",
                "sheetRowHeight": 0,
                "sheetTitle": "",
                "type": 0
            }
        ],
        "state": "",
    },
    lists1: [
        { key: 'configName', label: '配置名称：', placeholder: '请输入配置名称', col: 8 },
        { key: 'templateCategory', label: '模板样式：', type: 'select', placeholder: '请选择模板样式', filter: 'reportTemplateStyle', col: 8 },
        { key: 'templateType', label: '模板类型：', type: 'select', placeholder: '请选择模板类型', filter: 'reportTemplateTypes', col: 8 },
        { key: 'reportTemplateId', label: '报表模板：', type: 'select', children: [], props: { label: 'templateName', value: 'id' }, placeholder: '请选择报表模板', col: 8 },
        { key: 'reportAlarmCategoryId', label: '报警类型', type: 'select', children: [], props: { label: 'configName', value: 'id' }, placeholder: '请选择报警类型', col: 8 },
        { key: 'reportType', label: '报表类型：', type: 'select', placeholder: '请选择报表类型', filter: 'reportTypes', col: 8 },

    ],
    lists2: [
        { key: 'nullDisplay', label: '空值显示：', type: 'radio', placeholder: '请选择空值显示', children: [{ label: '显示为"-"', value: 1 }, { label: '显示为"无"', value: 2 }, { label: '显示为""', value: 3 }], col: 8 },
        { key: 'state', label: '是否启用：', type: 'radio', placeholder: '请选择是否启用', children: [{ label: '启用', value: true }, { label: '禁用', value: false }], col: 16 },
        { key: 'periodType', label: '统计周期：', type: 'radio', placeholder: '请选择统计周期', children: [{ label: '按天', value: 1 }, { label: '按周', value: 2 }, { label: '按月', value: 3 }], col: 8 },
        // { key: 'periodType', label: '统计周期：', type: 'select', placeholder: '请选择统计周期', filter: 'periodTypes' }, // TODO 这里如果使用periodTypes的话，3个全部默认选中
        { key: 'dataSelectMode', label: '数据选择模式：', placeholder: '请选择数据选择模式', type: 'select', filter: 'dataSelectModeEnums', col: 16 },
    ],
    rules: {
        configName: [
            { required: true, message: '请输入配置名称', trigger: 'blur' },
        ],
        templateCategory: [
            { required: true, message: '请选择模板样式', trigger: 'blur' },
        ],
        templateType: [
            { required: true, message: '请选择模板类型', trigger: 'blur' },
        ],
        operatorId: [
            { required: true, message: '请选择报表模板', trigger: 'blur' },
        ],
        key: [
            { required: true, message: '请选择报警类别', trigger: 'blur' },
        ],
        reportType: [
            { required: true, message: '请选择报警类型', trigger: 'blur' },
        ],
        nullDisplay: [
            { required: true, message: '请选择空值显示', trigger: 'blur' },
        ],
        state: [
            { required: true, message: '请选择是否启用', trigger: 'blur' },
        ],
        periodType: [
            { required: true, message: '请选择统计周期', trigger: 'blur' },
        ],
        dataSelectMode: [
            { required: true, message: '请选择数据选择模式', trigger: 'blur' },
        ],
    },
})

// const timeConfig = {
//     label: '',
//     key: ['periodStart', 'periodEnd'],
//     type: 'esDate',
//     data: { type: 'time' },
//     col: 8,
// }
const setColRef = $ref(null)
let paramList = $ref([
    {
        "parameterKey": "parameterKey",
        "parameterName": "填报单位",
        "parameterType": 1,
        "parameterValue": "",
    },
])

let sheetListColumn = $ref([
    {
        label: 'sheet名称',
        key: 'sheetName',
        type: 'input',
        width: 100
    },
    {
        label: 'sheet标题',
        key: 'sheetTitle',
        type: 'input',
    },
    {
        label: '数据标识',
        key: 'dataTag',
        type: 'select',
        selectList: []
    },
    {
        label: 'sheet类型',
        key: 'type',
        type: 'select',
        selectList: proxy.$store.getters.arrEnumerate['sheetTypes']
    },
    {
        label: '行高',
        key: 'sheetRowHeight',
        type: 'input'
    },
    {
        label: '绑定列',
        key: 'serialNumber',
    },
])

let sheetList = $ref([
    {
        "dataTag": "",
        "id": 0,
        "serialNumber": 0,
        "sheetName": "",
        "sheetRowHeight": 0,
        "sheetTitle": "",
        "type": 0,
        value: ''
    },
])


let loading = $ref(false)
let drawerFlag = $ref(false)
let fromDataRef = $ref(null)

const setFormData = (obj) => {
    mainData.formData = { ...mainData.formData, ...obj }
    paramList = obj.paramList || []
    sheetList = obj.sheetList || []
    // 将时间字符串转化为Date对象
    if (mainData.formData.periodStart){
        mainData.formData.periodStart = new Date(`2022-02-02 ${mainData.formData.periodStart}`)
    }
    if (mainData.formData.periodEnd){
        mainData.formData.periodEnd = new Date(`2022-02-02 ${mainData.formData.periodEnd}`)
    }
    console.log(mainData.formData, 'formData');
    drawerFlag = true
}

const onAdd = () => {
    sheetList.push(
        {
            "dataTag": "",
            "id": 0,
            "serialNumber": 0,
            "sheetName": "",
            "sheetRowHeight": 0,
            "sheetTitle": "",
            "type": 0,
            value: ''
        }
    )
}
const onDelete = (row) => {
    console.log(row, sheetList, 'del')
    sheetList = sheetList.filter(it => it.sheetName !== row.sheetName)
}
const onSet = (row) => {
    console.log(row, 'set')
    setColRef.setFormData(row)
}
const onUp = (row,index) => {
    console.log(row, index, 'up')
    if(index > 0) {
        sheetList.splice(index,1,...sheetList.splice(index-1,1,sheetList[index]))
    }
}
const onDown = (row,index) => {
    console.log(row,index, 'down')
    if(index < sheetList.length - 1) {
        sheetList.splice(index,1,...sheetList.splice(index+1,1,sheetList[index]))
    }
}

const handleClose = () => {
    mainData.formData = {}
}

let eimts = defineEmits(['getTable'])
const save = () => {
    fromDataRef.submitForm(false).then((form) => {
        loading = true
        addOrUpdate(form)
            .then(() => {
                loading = false
                ElMessage.success('修改成功！')
                drawerFlag = false
                eimts('getTable')
            })
            .catch(() => {
                loading = false
            })
    })
}


let reportConfig: any = $ref({})
const getReportConfig = () => {
    getReportConfigSelect({}).then(res => {
        console.log(res, 'reportConfig')
        reportConfig = res
        setSelectionData()
    })
}
getReportConfig()

// 设置
const setSelectionData = () => {
    mainData.lists1[3].children = reportConfig.reportTemplateList
    mainData.formData.paramList = reportConfig.paramterList || []
    paramList = reportConfig.paramterList || []
}
// 监听报表模板变动
watch(() => mainData.formData.reportTemplateId, (nVal) => {
    console.log(nVal, 'reportTemplateId nVal')
    mainData.lists1[4].children = reportConfig.categoryMap[nVal]
    // mainData.formData.reportAlarmCategoryId = ''
})
let alarmTypes = $ref([])
// 监听报警变动
watch(() => mainData.formData.reportAlarmCategoryId, (nVal) => {
    alarmTypes = reportConfig.categoryConfigMap[nVal] || []
    sheetListColumn[4].selectList = alarmTypes
    console.log(nVal, alarmTypes, 'reportAlarmCategoryId nVal')
})


defineExpose({ setFormData })
</script>

<style scoped lang="scss">
.params-settings-wrapper,
.details-settings-wrapper {
    padding-left: 38px;
    padding-top: 20px;

    .title {
        display: flex;
        align-items: center;
        text-align: left;
        font-size: 16px;

        &>div {
            margin-right: 20px;
        }
    }

    .table-wrapper {
        .el-button {
            color: #3c8cff;
            border: 1px solid #3c8cff;
        }
    }

    .el-button+.el-button {
        margin-left: 2px !important;
    }
}

.time-wrapper {
    margin-left: 40px;
}
</style>
