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
                labelPosition="top"
            ></tw-custom-form>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import { addOrUpdate } from '@/api/operation/operator/carrierInformation'
import { getCurrentInstance } from 'vue'

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let mainData = reactive({
    formData: {
        "address": "",
         "mail": "",
         "name": "",
         "operatorId": 0,
         "platformName": "",
         "principalCellPhone": "",
         "principalName": "",
         "principalPhone": ""
    },
    lists: [
        { key: 'name', label: '运营商名称：',placeholder: '请输入运营商名称'},
        { key: 'platformName', label: '平台名称：', placeholder: '请输入平台名称'},
        { key: 'principalName', label: '负责人：', placeholder: '请输入负责人'},
        { key: 'principalCellPhone', label: '负责人手机号：', placeholder: '请输入负责人手机号'},
        { key: 'principalPhone', label: '负责人座机：', placeholder: '请输入负责人座机'},
        { key: 'mail', label: '企业邮箱：', placeholder: '请输入企业邮箱'},
        { key: 'address', label: '详细地址：',props: {type: 'textarea'}, placeholder: '请输入详细地址',},

    ],
    rules: {
        name: [
            { required: true, message: '请输入运营商名称', trigger: 'blur' },
        ],
        platformName: [
            { required: true, message: '请输入平台名称', trigger: 'blur' },
        ],
        principalName: [
            { required: true, message: '请输入负责人', trigger: 'blur' },
        ],
        principalCellPhone: [
            { required: true, message: '请输入负责人手机号', trigger: 'blur' },
        ],
        address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' },
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
defineExpose({ setFormData })
</script>

<style scoped lang="scss">
</style>
