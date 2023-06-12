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
                <template #one>
                    <el-button @click="mainData.formData.usefulExpressions+= '{车牌}'">车牌</el-button>
                    <el-button @click="mainData.formData.usefulExpressions+= '{报警类型}'">报警类型</el-button>
                    <el-button @click="mainData.formData.usefulExpressions+= '{报警时间}'">报警时间</el-button>
                </template>
            </tw-custom-form>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import { addOrUpdate } from '@/api/operation/alert/artificial'
import { getCurrentInstance } from 'vue'

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let mainData = reactive({
    formData: {
        "alarmTypeCode": "",
         "id":"",
        "toolType": "",
        "usefulExpressions": ""
    },
    lists: [
        //  { key: 'lastModifyUserName', label: '公司抬头：',placeholder: '请输入公司抬头',filter: 'CompanyTitle'},
        { key: 'alarmTypeCode', label: '报警类型：',type:'select',placeholder: '请选择报警类型',filter: 'alarmType'},
        { key: 'usefulExpressions', label: '常用语：',placeholder: '请输入常用语',props: {type: 'textarea'},  },
        { key: 'one', label: '通配符：',slot:true},
    ],
    rules: {
        lastModifyUserName: [
            { required: true, message: '请输入公司抬头', trigger: 'blur' },
        ],
        alarmTypeCode: [
            { required: true, message: '请选择报警类型', trigger: 'blur' },
        ],
        usefulExpressions: [
            { required: true, message: '请输入企业详细地址', trigger: 'blur' },
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
