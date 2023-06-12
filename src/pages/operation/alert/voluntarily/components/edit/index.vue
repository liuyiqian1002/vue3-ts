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
import { addOrUpdate } from '@/api/operation/alert/voluntarily'
import { getCurrentInstance } from 'vue'

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let mainData = reactive({
    formData: {
        "alarmTypeCode": "",
        "id": 0,
        "toolType": 0,
        "usefulExpressions": ""
    },
    lists: [
        { key: 'groupName', label: '模板名称：',placeholder: '请输入模板名称' },
        { key: 'alarmHandelType', label: '处警方式：',type:'select',placeholder: '请选择处警方式',filter: 'alarmHandelType'},
        // { key: 'nodeDtoList', label: '控制节点：', type: 'org', url: '/system/userDataTreeForEdit/getTreesList', method: 'post', params: { "filterNodeCondition": {"permissionCode": mainData.formData.permissionCode},"hasDataPermission": true, needVehicle: true, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode', disabled: 'nocheck'}, permissionIds:[], showCheckbox: true},
        { key: 'nodeDtoList',label: '控制节点：',placeholder: '请输入组织结构', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: { "hasDataPermission": true, needVehicle: false, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode', disabled: 'nocheck'}, permissionIds:[],},
        { key: 'openStatus', label: '模板状态：', type: 'radio', children: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 },], },
        { key: 'groupDesc', label: '模板描述：',placeholder: '请输入模板描述',props: {type: 'textarea'}, },

    ],
    rules: {
        groupName: [
            { required: true, message: '请输入模板名称', trigger: 'blur' },
        ],
        alarmHandelType: [
            { required: true, message: '请选择处警方式', trigger: 'blur' },
        ],
        nodeDtoList: [
            { required: true, message: '请选择企业', trigger: 'blur' },
        ],
        openStatus: [
            { required: true, message: '请选择模板状态', trigger: 'blur' },
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
