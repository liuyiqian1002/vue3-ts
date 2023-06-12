<template>
  <div class="edit-wrapper">
    <tw-custom-form ref="fromDataRef" class="w400" :lists="mainData.lists" :rules="mainData.rules" :formData="mainData.formData" labelPosition="top"></tw-custom-form>
    <div class="btn-wrapper"><el-button type="primary" @click="save">保存</el-button></div>
  </div>
</template>

<script setup lang="ts">
import { addOrUpdate } from '@/api/operation/statement/type'
import { getCurrentInstance } from 'vue'

defineProps({
  title: String,
})
let { proxy } = getCurrentInstance()
let mainData = reactive({
  formData: {
    configName: '',
    id: 0,
    state: '',
  },
  lists: [
    { key: 'configName', label: '模块名称：', placeholder: '请输入模块名称' },
    {
      key: 'state',
      label: '是否启用：',
      type: 'radio',
      placeholder: '请选择是否启用',
      children: [
        { label: '启用', value: true },
        { label: '禁用', value: false },
      ],
    },
  ],
  rules: {
    configName: [{ required: true, message: '请输入模块名称', trigger: 'blur' }],
    state: [{ required: true, message: '请选择是否启用', trigger: 'blur' }],
  },
})
let fromDataRef = $ref(null)

const setFormData = (obj) => {
  // mainData.formData = proxy.$_.cloneDeep(obj)
  const o = {
    configName: obj.configName,
    id: obj.id,
    state: obj.state,
  }
  mainData.formData = o
  console.log(mainData.formData)
  fromDataRef.setFormData(o)
}

// const handleClose = () => {
//     mainData.formData = {}
// }

let eimts = defineEmits(['getTable'])
const save = () => {
  fromDataRef.submitForm(false).then((form) => {
    addOrUpdate(form)
      .then(() => {
        ElMessage.success('修改成功！')
        eimts('getTable')
      })
      .catch(() => {})
  })
}
defineExpose({ setFormData })
</script>

<style scoped lang="scss">
.edit-wrapper {
  :deep(.el-form) {
    .el-form-item {
      display: flex;
    }
  }
  .btn-wrapper {
    text-align: center;
  }
}
</style>
