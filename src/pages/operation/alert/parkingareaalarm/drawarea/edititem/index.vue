<template>
    <div>
        <tw-custom-form class="w300 form-wrapper" ref="editFormRef" cancelBtn="取消" @colse="onClose" :loading="state.loading"
            :lists="state.lists" :rules="state.rules" :formData="formData">
        </tw-custom-form>
        <div class="btn-wrapper">
            <el-button type="primary" @click="onSave">保存</el-button>
            <el-button type="primary" @click="onReset">重置</el-button>
            <!-- <el-button type="primary" @click="onDelete">删除</el-button> -->
            <el-button type="primary" @click="onEdit">编辑</el-button>
        </div>
    </div>
</template>

<script setup lang="tsx">

const { formData } = defineProps({
    formData: { type: Object, default: () => {} }
})
let { proxy } = getCurrentInstance()
let editFormRef = $ref(null)
let state = reactive({
    drawerFlag: false,
    loading: false,
    // fromDataRef: null,
    // activeName: 'first',
    // formData: {
    //     "id": undefined,
    //     "name": "",
    //     "startTime": "",
    //     "endTime": ''
    // },
    lists: [
        { key: 'name', label: '区域名称', placeholder: '请输入区域名称' },
        { label: '开始时间', key: 'startTime', type: 'time', placeholder: '请选择开始时间' },
        { label: '结束时间', key: 'endTime', type: 'time', placeholder: '请选择结束时间' },
    ],
    rules: {
        name: [
            { required: true, message: '请输入类型名称', trigger: 'change' },
        ],
    },
})


let eimts = defineEmits(['save', 'delete', 'reset', 'edit'])
const onSave = () => {
    eimts('save')
}

const onDelete = () => {
    // con
    eimts('delete')
}
const onReset = () => {
    // con
    eimts('reset')
}

const onEdit = () => {
    // con
    eimts('edit')
}

const onClose = (val) => {
    state.drawerFlag = false
}

defineExpose({ ...toRefs(state) })
</script>

<style scoped lang="scss">
.form-wrapper {
    display: flex;
    justify-content: flex-start;
    margin: 20px 0;

    :deep(.el-row) {
        color: aqua;

        .el-form-item {
            .el-form-item__label {
                width: 90px !important;
            }
        }
    }
}

.btn-wrapper {
    margin-left: 20px;
}
</style>
