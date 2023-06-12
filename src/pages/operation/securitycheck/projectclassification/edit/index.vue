<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" :width="800" height="400px" v-model="visible" class="process-dialog-wrapper">
      <div class="content-wrapper">
        <!-- form表格 -->
        <div class="form-wrapper">
          <el-form class="demo-form-inline">
            <el-form-item label="名称:">
              <el-input v-model="name" placeholder="请输入名称" />
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
import { CheckCategoryItem, addOrUpdate } from '@/api/operation/securitycheck/fileclassification'

const { title, list } = defineProps({
  title: { type: String, default: () => '' },
  list: { type: Array<CheckCategoryItem>, default: () => [] },
})
const proxy: any = getCurrentInstance()?.proxy

let visible = $ref(false)
let row:any = $ref()
let name = $ref('')

const show = (obj: CheckCategoryItem) => {
  visible = true
  row = obj ?? {}
  name = obj.name
}

const emits = defineEmits(['getTable'])

const onSubmit = () => {
  const query = {
    id: row?.id,
    name: name,
  }
  console.log('onSubmit', query, list)
  addOrUpdate(query).then((res) => {
    console.log(res, 'save')
    if (res) {
      ElMessage.success('保存成功')
      visible = false
      emits('getTable')
    }
  })
}

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

      .form-title {
        // font-size: 16px;
        // font-weight: 600;
        color: red;
        margin: 10px 0 20px 0;
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
