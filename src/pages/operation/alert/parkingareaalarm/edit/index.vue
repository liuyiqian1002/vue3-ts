<template>
    <div>
        <tw-drawer @handleClose="handleClose" :loading="state.loading" :title="title" :isBtns="false"
            v-model="state.drawerFlag">
            <tw-custom-form class="p20 w500" ref="editFormRef" cancelBtn="取消" showBtns @colse="onClose" @save="save('first', $event)"
                :loading="state.loading" :lists="state.lists" :rules="state.rules" :formData="state.formData">
            </tw-custom-form>

        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import { addOrUpdate } from "@/api/operation/alert/parkingareaalarm";

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let editFormRef = $ref(null)
let state = reactive({
    drawerFlag: false,
    loading: false,
    fromDataRef: null,
    activeName: 'first',
    formData: {
        "id": undefined,
        "name": "",
        "startDate": "",
        "endDate": ''
    },
    lists: [
        { key: 'name', label: '区域名称', placeholder: '请输入区域名称' },
        { label: '开始时间', key: 'startDate', type: 'date', data: {valueFormat: 'YYYY-MM-DD'}, placeholder: '请选择开始时间' },
        { label: '结束时间', key: 'endDate', type: 'date', data: {valueFormat: 'YYYY-MM-DD'}, placeholder: '请选择结束时间' },
    ],
    rules: {
        name: [
            { required: true, message: '请输入类型名称', trigger: 'blur' },
        ],
    },
})


const setFormData = (obj) => {
    if (obj) {
        // 后台数据会返回null，前端会报错
        state.formData = proxy.$_.cloneDeep(obj)
        // state.lists[0].disabled = true
        state.drawerFlag = true
    } else {
        state.formData.endDate = ''
        state.formData.name = ''
        state.formData.startDate = ''
        state.drawerFlag = true
    }
}

const handleClose = () => {
    editFormRef.clearValidate()
    // state.formData = proxy.$_.cloneDeep(editData)
}

let eimts = defineEmits(['getTable'])
const save = (str, formData) => {
    state.loading = true
    addOrUpdate(state.formData).then(() => {
        state.loading = false
        ElMessage.success('操作成功！')
        state.drawerFlag = false
        eimts('getTable')
    }).catch(() => {
        state.loading = false
    })
}

const onClose = (val) => {
    state.drawerFlag = false
}

defineExpose({ ...toRefs(state), setFormData })
</script>

<style scoped lang="scss"></style>
