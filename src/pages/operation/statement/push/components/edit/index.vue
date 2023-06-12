<template>
    <div>
        <tw-drawer @save="save" @handleClose="handleClose" :loading="loading" :title="title" v-model="drawerFlag">
            <tw-custom-form ref="fromDataRef" :gutter="70" class="w700" :lists="mainData.lists" :rules="mainData.rules"
                :formData="mainData.formData" labelPosition="top"></tw-custom-form>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import { addOrUpdate } from '@/api/operation/statement/push'
import { getCurrentInstance } from 'vue'

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let mainData = reactive({
    formData: {
        "configInfoList": [
            {
                "id": 0,
                "parameterKey": "",
                "parameterName": "",
                "parameterValue": ""
            }
        ],
        "configName": "",
        "configType": 0,
        "dataScopeInfoList": [
            {
                "dataId": 0,
                "dataType": 0,
                "vehicleCode": ""
            }
        ],
        "id": 0,
        "mailContent": "",
        "mailTitle": "",
        "receiver": "",
        "reportConfigId": 0,
        "reportType": 0,
        "sendType": 0,
        "state": "",
        "vehicleOperateTypeCodeList": [],
    },
    lists: [
        { key: 'configName', label: '推送配置名称：', col: 12, placeholder: '请输入推送配置名称' },
        { key: 'sendType', label: '发送方式：', type: 'select', placeholder: '请选择发送方式', filter: 'listSendMode', col: 12, },
        { key: 'mailTitle', label: '邮件标题：', col: 12, placeholder: '请输入邮件标题' },
        { key: 'reportType', label: '报表配置：', type: 'select', filter: 'reportTypes', col: 12, placeholder: '请选择报表配置', },
        { key: 'mailContent', label: '邮件内容：', placeholder: '请输入邮件内容', props: { type: 'textarea' }, },
        { key: 'configType', label: '配置类型：', placeholder: '请选择配置类型', type: 'select', filter: 'listConfigType', change: (val) => formData.lists[6].disabled = val !== 3 },
        { key: 'state', label: '是否启用：', col: 12, type: 'radio', placeholder: '请选择是否启用', children: [{ label: '启用', value: true }, { label: '禁用', value: false }] },
        { key: 'receiver', label: '收件人邮箱：', placeholder: '请输入收件人邮箱', },
        { key: 'dataScopeInfoList', label: '数据范围：', placeholder: '请选择数据范围', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: { "hasDataPermission": true, needVehicle: false, searchType: 1, keyword: '' }, parKeys: [{ key: 'parentCode', val: 'permissionCode' }], props: { label: 'orgName', value: 'permissionCode', disabled: 'nocheck' }, permissionIds: [], },
        // { key: 'companyId', label: '企业名称', type: 'select', remote: true, url: '/business/company/associateCompany', method: 'post', params: { havePermission: true }, props: { label: 'companyName', value: 'companyId' }, placeholder: '请选择企业名称' },
        // { key: 'vehicleOperateTypeCode', label: '营运类型：', type: 'select', remote: true, url: '/system/vehicleOperateType/getListByName', method: 'get', params: {}, props: { label: 'typeName', value: 'typeCode' }, placeholder: '请选择营运类型' },
        // {label: '营运类型', key: 'vehicleOperateTypeCodeList', type:'allSelect', remote: true, url: '/system/vehicleOperateType/getTreeCodeList', method: 'get', loadMore: true, params: {}, props:{ }, placeholder: '请选择营运类型'},

    ],
    rules: {
        configName: [
            { required: true, message: '请输入推送配置名称', trigger: 'blur' },
        ],
        sendType: [
            { required: true, message: '请选择发送方式', trigger: 'blur' },
        ],
        mailTitle: [
            { required: true, message: '请输入邮件标题', trigger: 'blur' },
        ],
        reportType: [
            { required: true, message: '请选择报表配置', trigger: 'blur' },
        ],
        configType: [
            { required: true, message: '请选择配置类型', trigger: 'blur' },
        ],
        state: [
            { required: true, message: '请选择是否启用', trigger: 'blur' },
        ],
        // receiver: [
        //     { required: true, message: '请输入收件人邮箱', trigger: 'blur' },
        // ],
        // dataScopeInfoList: [
        //     { required: true, message: '请输入数据范围', trigger: 'blur' },
        // ],
    },
})
let formData = $ref({})
let loading = $ref(false)
let drawerFlag = $ref(false)
let fromDataRef = $ref(null)

const setFormData = (obj, type) => {
    mainData.formData = proxy.$_.cloneDeep(obj)
    console.log(mainData.formData);
    if(type === 1) {
        // 复制新增 删除id
        delete mainData.formData.id
    }
    drawerFlag = true
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
defineExpose({ setFormData })
</script>

<style scoped lang="scss">

</style>
