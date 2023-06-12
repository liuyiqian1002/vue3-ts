<template>
    <div>
        <tw-dialog @save="save" @handleClose="handleClose" :is-btns="true" :loading="loading" :width="'1400px'" title="导出列配置"
            v-model="drawerFlag">
            <div class="details-settings-wrapper">
                <div class="title">
                    <div>导出列配置</div>
                    <div><el-button type="primary" @click="onAdd">新增</el-button></div>
                    <div>
                        <p class="fs14"> 建议：纯文本列字数*1.8，含图片列40-45。</p>
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
                                <el-button @click="onUp(scope.row,scope.$index)" size="small">↑</el-button>
                                <el-button @click="onDown(scope.row,scope.$index)" size="small">↓</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </tw-dialog>
    </div>
</template>

<script setup lang="ts">
import { getReportConfigSelect, addOrUpdate } from '@/api/operation/statement/template';
import { getCurrentInstance } from 'vue'

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()


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
        label: '数据列',
        key: 'sheetName',
        type: 'input',
        width: 100
    },
    {
        label: '显示名称',
        key: 'sheetTitle',
        type: 'input',
    },
    {
        label: '列宽',
        key: 'sheetRowHeight',
        type: 'input'
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
    paramList = obj.paramList || []
    sheetList = obj.sheetList || []
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
}

let eimts = defineEmits(['getTable'])
const save = () => {
    drawerFlag = false
    // fromDataRef.submitForm(false).then((form) => {
    //     loading = true
    //     addOrUpdate(form)
    //         .then(() => {
    //             loading = false
    //             ElMessage.success('修改成功！')
    //             drawerFlag = false
    //             eimts('getTable')
    //         })
    //         .catch(() => {
    //             loading = false
    //         })
    // })
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
    paramList = reportConfig.paramterList || []
}
let alarmTypes = $ref([])

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
