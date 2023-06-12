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
                gutter="20"
                :lists="mainData.lists"
                :rules="mainData.rules"
                :formData="mainData.formData"
                labelPosition="top"
            ></tw-custom-form>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import { addOrUpdateOperatorAccess } from '@/api/operation/operator/carrierInformation'
import { getCurrentInstance } from 'vue'

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let mainData = reactive({
    foldNumber:3,
    formData: {},
    lists: [
        { key: 'name', label: '运营商名称：',col:6,disabled: true },
        { key: 'platformName', label: '平台名称：',col:6,disabled: true },
        { key: 'platformName', label: '接入IP',col:6,disabled: true },
        { key: 'principalCellPhone', label: '接入端口：',col:6,disabled: true },
        { key: 'principalPhone', label: '接入码：',col:6 },
        { key: 'mail', label: '用户名：',col:6 },
        { key: 'address', label: '密码：',col:6},
        { key: 'publishType', label: '是否加密：',type:'select', filter: 'publishType',col:6},

    ],
    rules: {
        name: [
            { required: true, message: '请输入接入码', trigger: 'blur' },
        ],
        platformName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        principalName: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
    },
})
let formData = $ref({})
let loading = $ref(false)
let drawerFlag = $ref(false)
let fromDataRef = $ref(null)

const setFormData = (obj) => {
    mainData.formData = proxy.$_.cloneDeep(obj)
    console.log(mainData.formData);
    drawerFlag = true
}

const handleClose = ()=>{
    mainData.formData = {}
}

let eimts = defineEmits(['getTable'])
const save = () => {
    fromDataRef.submitForm(false).then((form) => {
        loading = true
        addOrUpdateOperatorAccess(form)
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
defineExpose({ setFormData })
</script>

<style scoped lang="scss">
</style>
