<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" :width="800" height="75%" v-model="visible" class="process-dialog-wrapper">
      <div class="content-wrapper">
        <!-- form表格 -->
        <div class="form-wrapper">
          <el-form class="demo-form-inline" :rules="rules">
            <el-form-item label="计划名称:" prop="name">
              <el-input v-model="formData.name" placeholder="请输入计划名称" />
            </el-form-item>
            <el-form-item label="制定单位:" prop="preparedBy">
              <el-input v-model="formData.preparedBy" placeholder="请输入制定单位" />
            </el-form-item>
            <el-form-item label="计划类型:" prop="planTypeCode">
              <TwSelect :item="selectConfig" :formData="formData"></TwSelect>
            </el-form-item>
            <el-form-item label="开始日期:" prop="startTime">
              <!-- <el-input v-model="formData.startTime" placeholder="请选择开始日期" /> -->
              <el-date-picker v-model="formData.startTime" value-format="YYYY-MM-DD" type="date" placeholder="请选择开始日期" />
            </el-form-item>
            <el-form-item label="结束日期:" prop="endTime">
              <!-- <el-input v-model="formData.endTime" placeholder="请选择结束日期" /> -->
              <el-date-picker v-model="formData.endTime" value-format="YYYY-MM-DD" type="date" placeholder="请选择开始日期" />
            </el-form-item>
          </el-form>
          <div class="btn-wrapper">
            <div :span="3"><el-button type="primary" @click="onSubmit">提交</el-button></div>
            <div :span="3"><el-button @click="visible = false">关闭</el-button></div>
          </div>
        </div>
      </div>
    </tw-dialog>
  </div>
</template>

<script setup lang="tsx">
import { CheckPlanResItem, addOrUpdate } from '@/api/operation/securitycheck/checkplan'

const { title, list } = defineProps({
  title: { type: String, default: () => '' },
  list: { type: Array<CheckPlanResItem>, default: () => [] },
})
const proxy: any = getCurrentInstance()?.proxy

let visible = $ref(false)
let row = $ref<CheckPlanResItem>()
let formData = $ref({
  id: 0,
  planTypeCode: null,
  name: '',
  startTime: '',
  categoryName: '',
  endTime: '',
  preparedBy: '',
})
const initFormData = () => {
  formData.id = undefined
  formData.planTypeCode = null
  formData.name = ''
  formData.startTime = ''
  formData.categoryName = ''
  formData.endTime = ''
  formData.preparedBy = ''
}
const selectConfig = {
  // label: '计划类型',
  key: 'planTypeCode',
  type: 'select',
  filter: 'securityCheckPlanType',
  placeholder: '请选择计划类型',
}
const show = (obj: CheckPlanResItem) => {
  visible = true
  if (obj) {
    row = obj
    formData = {
      ...formData,
      ...obj,
    }
  } else {
    row = {} as CheckPlanResItem
    initFormData()
  }
  console.log(formData, obj, 'formData')
}

const emits = defineEmits(['getTable'])

const onSubmit = () => {
  const query = {
    id: row?.id,
    ...formData,
  }
  console.log('onSubmit', query, list)
  addOrUpdate(query).then((res) => {
    console.log(res, 'save')
    if (res || res === null) {
      ElMessage.success('保存成功')
      emits('getTable')
      visible = false
    }
  })
}

let rules = $ref({
  preparedBy: [{ required: true, message: '请选择项目分类:', trigger: 'blur' }],
  name: [{ required: true, message: '请输入制定单位', trigger: 'blur' }],
  planTypeCode: [{ required: true, message: '请输入计划类型', trigger: 'blur' }],
  startTime: [{ required: true, message: '请选择开始日期', trigger: 'blur' }],
  endTime: [{ required: true, message: '请选择结束日期', trigger: 'blur' }],
})

defineExpose({ show })
</script>

<style scoped lang="scss">
.process-dialog-wrapper {
  :deep(.el-scrollbar__view) {
    height: 100%;

    .dialog_content {
      height: 100%;
      // padding: 0 !important;
    }
  }

  .content-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 96%;

    .form-wrapper {
      // height: calc(30% - 20px);
      margin-top: 20px;

      .el-form > .el-form-item {
        margin-bottom: 38px;
      }

      .btn-wrapper {
        margin: 10px 0;
        width: 100%;
        display: flex;
        justify-content: center;

        & > div {
          margin-right: 30px;
        }
      }
    }
  }
}
</style>
