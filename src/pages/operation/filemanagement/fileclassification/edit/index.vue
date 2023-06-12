<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" :width="800" height="500px" v-model="visible"
      class="process-dialog-wrapper">
      <div class="content-wrapper">
        <!-- form表格 -->
        <div class="form-wrapper">
          <el-form class="demo-form-inline">
            <el-form-item label="分类名称:">
              <el-input v-model="name" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="档案类型:">
              <el-select v-model="archivesType" placeholder="请输入名称">
                <el-option v-for="item in archiveTypes" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
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
import { GategoryListResItem, addOrUpdate } from '@/api/operation/filemanagement/fileclassification';
interface archiveType {
  label: string,
  value: number
}
const { title, list, archiveTypes } = defineProps({
  title: { type: String, default: () => '' },
  list: { type: Array<GategoryListResItem>, default: () => [] },
  archiveTypes: { type: Array<archiveType>, default: () => [] }
})
const proxy: any = getCurrentInstance()?.proxy

let visible = $ref(false)
let row = $ref<GategoryListResItem>()
let name = $ref('')
let archivesType = $ref(0)

const show = (obj?: GategoryListResItem) => {
  visible = true
  row = obj
  name = obj?.name
  archivesType = obj?.archivesType
}

watch(() => archiveTypes, (nVal) => {
  console.log(nVal, 'archiveTypes')
})



const onSubmit = () => {
  const query = {
    id: row.id,
    name: name,
  }
  console.log('onSubmit', query, list)
  addOrUpdate(query).then(res => {
    console.log(res, 'save')
    if (res === null) {
      ElMessage.success('保存成功')
      visible = false
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
        padding-top: 50px;
        margin: 10px 0;
        width: 100%;
        display: flex;
        justify-content: center;

        &>div {
          margin-right: 30px;
        }
      }
    }
  }
}
</style>
