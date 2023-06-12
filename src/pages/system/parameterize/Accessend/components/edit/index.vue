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
                 class="w700"
                :lists="mainData.lists"
                :rules="mainData.rules"
                :formData="mainData.formData"
                labelPosition="top"
            ></tw-custom-form>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import { addOrUpdate } from '@/api/system/parameterize/accessend';
import { getCurrentInstance } from 'vue'

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let mainData = reactive({
    foldNumber:2,
    formData: {
        "basicProtocol": "",
        "defaultSelect": "",
        "entryPointId": "",
        "entryPointName": "",
        "innerServer": "",
        "outerIp": "",
        "outerPort": 0,
        "remark": "",
        "securityProtocol": "",
        "valid": "",
    },
    lists: [
        { key: 'entryPointName', label: '配置名称：',placeholder: '请输入配置名称', },
        { key: 'basicProtocol', label: '协议版本：',placeholder: '请选择协议版本', type: 'select', filter: 'basicProtocolType'},
        { key: 'securityProtocol', label: '主动安全：',placeholder: '请选择主动安全', type: 'select',filter: 'securityProtocolType'},
        { key: 'outerIp', label: '外网IP：',placeholder: '请输入外网IP',col:12,},
        { key: 'outerPort', label: '外网端口：',placeholder: '请输入外网端口',col:12,},
        { key: 'innerServer', label: '内网IP(含端口)：',placeholder: '请输入内网IP(含端口)'},
        { key: 'remark', label: '备注：',props: {type: 'textarea'},placeholder: '请输入备注'},
    ],
    rules: {
        entryPointName: [
            { required: true, message: '请输入配置名称', trigger: 'blur'},
        ],
        basicProtocol: [
            { required: true, message: '请选择协议版本', trigger: 'blur'},
        ],
        securityProtocol: [
            { required: true, message: '请选择主动安全', trigger: 'blur'},
        ],
        outerIp: [
            { required: true, message: '请输入外网IP地址', trigger: 'blur'},
        ],
        outerPort: [
            { required: true, message: '请输入外网端口', trigger: 'blur'},
        ],
        innerServer: [
            { required: true, message: '请输入内网IP地址及端口', trigger: 'blur'},
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
