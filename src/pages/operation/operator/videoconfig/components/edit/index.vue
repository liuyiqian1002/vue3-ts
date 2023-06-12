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
                    <el-button @click="mainData.formData.urlTemplate+= '{车牌号}'" >车牌号</el-button>
                    <el-button @click="mainData.formData.urlTemplate+= '{车牌颜色编号}'">车牌颜色编号</el-button>
                    <el-button @click="mainData.formData.urlTemplate+= '{SIM卡号}'">SIM卡号</el-button>
                </template>
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
    formData: {
        "displayName": "",
        "id": 0,
        "needUrl": "",
        "operatorId": 0,
        "operatorName": "",
        "params": "",
        "urlTemplate": "",
        "videoKind": 0,
        "videoType": 0,
        "viewPath": ""
    },
    lists: [
        { key: 'operatorName', label: '运营商名称：',disabled: true},
        { key: 'displayName', label: '配置名称：', placeholder: '请输入配置名称' },
        { key: 'videoType', label: '视频类型：',type:'select', filter: 'videoType', placeholder: '请选择视频类型' },
        { key: 'videoKind', label: '视频种类：',type:'select', filter: 'videoKind', placeholder: '请选择视频种类' },
        { key: 'viewPath', label: '页面路径：', placeholder: '请输入页面路径' },
        { key: 'needUrl', label: '是否需要URL：',type: 'radio', children: [{ label: '是', value: true }, { label: '否', value: false },], },
        { key: 'urlTemplate', label: '链接模板：', placeholder: '请输入视频链模板地址', props: {type: 'textarea'}, },
        { key: 'one', label: '通配符',slot:true},
        { key: 'params', label: '自定义参数：', placeholder: '参照自定义参数文档，以JSON格式填写'},
    ],
    rules: {
        displayName: [
            { required: true, message: '请输入字典配置名称', trigger: 'blur' },
        ],
        videoType: [
            { required: true, message: '请选择视频类型', trigger: 'blur' },
        ],
        viewPath: [
            { required: true, message: '请输入页面路径', trigger: 'blur' },
        ],
        videoKind: [
            { required: true, message: '请选择视频种类', trigger: 'blur' },
        ],
        urlTemplate: [
            { required: true, message: '请输入链接模板', trigger: 'blur' },
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
