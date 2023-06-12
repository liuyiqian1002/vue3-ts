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
            ></tw-custom-form>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import { addOrUpdate } from '@/api/system/systemrecord/dictionaries'
import { getCurrentInstance } from 'vue'

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let mainData = reactive({
    formData: {
      "cron": "",
      "displayTime": "",
      "id": 0,
      "oldCron": "",
      "openStatus": "",
      "planName": "",
      "planTime": "",
      "planType": 0,
      "relationList": [
        {
          "id": 0,
          "orgId": 0,
          "permissionType": 0
        }
      ],
      "sendContent": "",
      "subTime": "",
      "textInfoCommandFlag": "",
      "triggerGroup": "",
      "triggerName": "",
      "vaildEndTime": "",
      "vaildStartTime": "",
      "valid": "",
  },
    lists: [
        { key: 'planName', label: '计划名称：', placeholder: '请输入计划名称'},
        { key: 'code', label: '模板分类：',type:'select', filter: 'valid', placeholder: '请选择模板分类'},
        { key: 'code', label: '模板内容：',type:'select',filter: 'valid', placeholder: '请选择模板内容'},
        { key: 'code', label: '类型：',type:'select',filter: 'planTypes', placeholder: '请选择类型'},
        { key: 'planType', label: '预约方式：',type:'select',filter: 'planSendTypes', placeholder: '请选择预约方式'},
        { key: 'planTime', label: '发送时间：', placeholder: '请选择发送时间'},
        { key: ['vaildEndTime', 'vaildStartTime'], label: '生效期间',col:24, type: 'esDate', placeholder: '请选择生效期间', data: {valueFormat: 'YYYY-MM-DD'}},
        { key: 'vehicleOperateTypeCode', label: '营运类型：', type:'select', remote: true, url: '/system/vehicleOperateType/getListByName', method: 'get', params: {}, props:{ label: 'typeName', value:'typeCode'}, placeholder: '车辆营运类型'},
        { key: 'code', label: '发送对象：', placeholder: '请输入发送对象'},
        { key: 'sendContent', label: '发送内容：',placeholder: '请输入发送内容', props: {type: 'textarea'}},
    ],
    rules: {
        name: [
            { required: true, message: '请输入模板名称', trigger: 'blur' },
        ],
        code: [
            { required: true, message: '请选择类型', trigger: 'blur' },
        ],
        code: [
            { required: true, message: '请选择预约方式', trigger: 'blur' },
        ],
        code: [
            { required: true, message: '请选择发送时间', trigger: 'blur' },
        ],
        code: [
            { required: true, message: '请选择生效时间', trigger: 'blur' },
        ],
        code: [
            { required: true, message: '请选择发送对象', trigger: 'blur' },
        ],
        code: [
            { required: true, message: '请输入发送内容', trigger: 'blur' },
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
