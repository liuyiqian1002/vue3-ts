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
                class="w500"
                :lists="mainData.lists"
                :rules="mainData.rules"
                :formData="mainData.formData"
                labelPosition="top"
            ></tw-custom-form>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import {addOrUpdate} from '@/api/system/management/province'
import {getCurrentInstance} from 'vue' //获取组件实例

defineProps({
    title: String,
})
let {proxy} = getCurrentInstance()
let mainData = reactive({
    formData: {
        "areaId": 0,
        "areaType": 0,
        "charCode": "",
        "code": "",
        "name": "",
        "parentCode": "",
        "shortName": ""
    },
    lists: [
        {key: 'code', label: '编码', placeholder: '地区编码',},
        {key: 'name', label: '名称', placeholder: '地区名称',},
        {key: 'charCode', label: '字符编码', placeholder: '字符编码'},
        {
            key: 'areaType',
            label: '类型',
            type: 'select',
            children: [{label: '省', value: 1}, {label: '市', value: 2}, {label: '区', value: 3}],
            change: (val) => {
                if(val == 1){
                    mainData.lists[4] = {key: 'parentCode', label: '上级地区'}
                }else {
                    mainData.lists[4] = {label: '上级地区', key: 'parentCode', type: 'select', remote: true, url: '/system/area/getAreaListByKeyword', method: 'get', params: {level: val-1}, props:{ label: 'areaName', value:'areaCode'}}
                }
    
            }
        },
        {key: 'parentCode', label: '上级地区'},
    ],
    rules: {
        code: [{required: true, message: '请输入地区编码', trigger: 'blur'},],
        name: [{required: true, message: '请输入地区名称', trigger: 'blur'},],
        charCode: [{required: true, message: '请输入字符编码', trigger: 'blur'},],
        areaType: [{required: true, message: '请选择类型', trigger: 'change',},],
        parentCode: [{required: true, message: '请选择上级地区', trigger: 'change',},],
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
defineExpose({setFormData})
</script>

<style scoped lang="scss">
</style>
