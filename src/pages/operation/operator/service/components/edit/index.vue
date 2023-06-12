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
                gutter="30"
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
import { addOrUpdate } from '@/api/operation/operator/service'
import { getCurrentInstance } from 'vue'

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let mainData = reactive({
    foldNumber:2,
    formData: {
        "accessCode": 0,
        "accessInfoId": "",
        "accessInfoName": "",
        "encryptFlag": "",
        "encryptIa1": 0,
        "encryptIc1": 0,
        "encryptM1": 0,
        "entryPointId": "",
        "filterContent": "",
        "filterFlag": "",
        "operatorId": 0,
        "operatorName": "",
        "remark": "",
        "userId": 0,
        "userPassword": "",
        "valid": "",
    },
    lists: [
        { key: 'accessInfoName', label: '运营商名称：',placeholder: '请输入运营商名称',col:24, },
        { key: 'name', label: '配置名称：',placeholder: '请输入配置名称',col:12, },
        { key: 'code', label: '接入名称：',col:12,type:'select',placeholder: '请选择接入名称',filter: 'videoType' },
        { key: 'd', label: '接入地址：',placeholder: '请输入接入地址',col:12,disabled: true },
        { key: 'c', label: '接入端口：',placeholder: '请输入接入端口',col:12,disabled: true },
        { key: 'b', label: '协议版本：',col:12,type:'select',placeholder: '请选择协议版本',filter: 'basicProtocolType',disabled: true },
        { key: 'a', label: '主动安全：',col:12,type:'select',placeholder: '请选择主动安全',filter:'securityProtocolType',disabled: true },
        { key: 'accessCode', label: '接入码：',placeholder: '请输入接入码',col:12, },
        { key: 'userId', label: '用户名：',placeholder: '请输入用户名',col:12, },
        { key: 'userPassword', label: '密码：',placeholder: '请输入密码',col:24, },
        { key: 'encryptFlagName', label: '是否加密：',placeholder: '请选择是否加密',col:12,type:'select',children: [{label: '加密', value: 1},{label: '不加密', value: 0}] },
        { key: 'encryptM1', label: '参数M1：',placeholder: '请输入参数M1',col:12, },
        { key: 'encryptIa1', label: '参数IA1：',placeholder: '请输入参数IA1',col:12, },
        { key: 'encryptIc1', label: '参数IC1：',placeholder: '请输入参数IC1',col:12, },
        { key: 'filterFlag', label: '是否过滤',placeholder: '请选择是否过滤',col:12,type:'select',filter: 'filterTypes' },
        { key: 'filterContent', label: '过滤内容：',props: {type: 'textarea'},placeholder: '请输入过滤内容'},
    ],
    rules: {
        name: [
            { required: true, message: '请输入配置名称', trigger: 'blur' },
        ],
        code: [
            { required: true, message: '请选择接入名称', trigger: 'blur' },
        ],
        accessCode: [
            { required: true, message: '请输入接入码', trigger: 'blur' },
        ],
        userId: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        userPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        encryptFlagName: [
            { required: true, message: '请选择是否加密', trigger: 'blur' },
        ],
        filterFlag: [
            { required: true, message: '请选择是否过滤', trigger: 'blur' },
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
