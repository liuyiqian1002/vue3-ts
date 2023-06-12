<template>
    <div>
        <tw-drawer
            @save="save"
            @handleClose="handleClose"
            :loading="loading"
            :title="title"
            v-model="drawerFlag"
        >
            <tw-custom-form
                ref="fromDataRef"
                class="w400"
                :lists="mainData.lists"
                :rules="mainData.rules"
                :formData="mainData.formData"
                labelPosition="top">
            </tw-custom-form>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import {addOrUpdate} from "@/api/operation/operator/videoconfig";
import { getCurrentInstance } from 'vue'

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let mainData = reactive({
    formData: {},
    lists: [
        { key: 'displayName', label: '配置名称：', placeholder: '请输入配置名称'},
        { key: 'alarmCategoryCode', label: '报警类别编号：', placeholder: '请输入报警类别编号'},
        { key: 'alarmCategoryName', label: '报警类别名称：', placeholder: '请输入报警类别名称'},
        { key: 'isCustom', label: '是否自定义：',type: 'radio', children: [{ label: '非自定义', value:0}, { label: '自定义', value:1},], },
        { key: 'alarmTypeName', label: '上级报警名称',type:'select',filter: 'alarmType'},
        { key: 'remark', label: '类型描述：', placeholder: '请输入类型描述', props: {type: 'textarea'}, },
    ],
    rules: {
        displayName: [
            { required: true, message: '请输入配置名称', trigger: 'blur' },
        ],
        alarmCategoryCode: [
            { required: true, message: '请输入类别编号', trigger: 'blur' },
        ],
        alarmCategoryName: [
            { required: true, message: '请输入类别名称', trigger: 'blur' },
        ],
        isCustom: [
            { required: true, message: '请选择是否自定义', trigger: 'blur' },
        ],
        alarmTypeName: [
            { required: true, message: '请选择上级报警名称', trigger: 'blur' },
        ],
    },
})
// let formData = $ref({})
let loading = $ref(false)
// let drawerFlag = $ref(false)
let fromDataRef = $ref(null)

const setFormData = (obj) => {
    mainData.formData = proxy.$_.cloneDeep(obj)
    console.log(mainData.formData);
    // drawerFlag = true
}

const handleClose = ()=>{
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
                // drawerFlag = false
                eimts('getTable')
            })
            .catch(() => {
                loading = false
            })
    })
}
defineExpose({ setFormData })
</script>

<style scoped lang="scss">
</style>
