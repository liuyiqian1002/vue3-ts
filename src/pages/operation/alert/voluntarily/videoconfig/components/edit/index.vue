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
                <template #one slot：true>
                    <el-button @click="mainData.formData.urlTemplate+= '{大类替换符}'" >大类替换符</el-button>
                    <el-button @click="mainData.formData.urlTemplate+= '{小类替换符}'">小类替换符</el-button>
                    <el-button @click="mainData.formData.urlTemplate+= '{车牌号}'">车牌号</el-button>
                    <div style="margin-top: 10px;">
                        <el-button @click="mainData.formData.urlTemplate+= '{事件开始时间}'">事件开始时间</el-button>
                        <el-button @click="mainData.formData.urlTemplate+= '{当前道路限速值}'">当前道路限速值</el-button>
                    </div>
                </template>
            </tw-custom-form>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
// import {addOrUpdate} from "@/api/operation/alert/voluntarily/videoconfig";
import { getCurrentInstance } from 'vue'

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let mainData = reactive({
    formData: {},
    lists: [
        { key: 'alarmType', label: '报警类型：',type:'select',placeholder: '请选择报警类型',filter: 'alarmType' },
        { key: 'alarmLevel', label: '报警级别：',type:'select',placeholder: '请选择报警级别', filter: 'alarmLevel' },
        { key: 'urlTemplate', label: '处警内容：', placeholder: '请输入说明', props: {type: 'textarea'}, },
        { key: 'one', label: '通配符',slot:true},
        { key: 'openStatus', label: '状态：',type: 'radio', children: [{ label: '启用', value: true }, { label: '禁用', value: false },], },
    ],
    rules: {
        alarmType: [
            { required: true, message: '请选择报警类型', trigger: 'blur' },
        ],
        alarmLevel: [
            { required: true, message: '请选择报警级别', trigger: 'blur' },
        ],
        urlTemplate: [
            { required: true, message: '请输入处警内容', trigger: 'blur' },
        ],
        openStatus: [
            { required: true, message: '请选择状态', trigger: 'blur' },
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
