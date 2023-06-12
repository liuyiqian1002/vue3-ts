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
import {addOrUpdate, dictionaryAddOrUpdate} from '@/api/system/systemrecord/dictionaries'

let {title} = defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let mainData = reactive({
    formData: {
        "code": "",
        "dictionaryTypeId": "",
        "name": ""
    },
    lists: [
        { key: 'displayName', label: '字典名称' },
        { key: 'dictionaryKey', label: '字典键值' },
        { key: 'dictionaryValue', label: '值' },
        { key: 'sort', label: '排序' },
        { key: 'remark', label: '描述' },
    ],
    rules: {
        displayName: [{ required: true, message: '请输入字典类型名称', trigger: 'blur' },],
        dictionaryKey: [{ required: true, message: '请输入字典键值', trigger: 'blur' },],
        dictionaryValue: [{ required: true, message: '请输入值', trigger: 'blur' },],
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
        dictionaryAddOrUpdate(form)
            .then(() => {
                loading = false
                let str = title=='添加字典类型'?'新增成功！':'修改成功！'
                ElMessage.success(str)
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
