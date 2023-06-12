<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" :width="800" v-model="visible"
      class="process-dialog-wrapper">
      <div class="content-wrapper">
        <!-- form表格 -->
        <div class="form-wrapper">
          <el-form class="demo-form-inline">
            <el-form-item label="档案分类:">
              <el-select v-model="form.categoryId" placeholder="请选择档案分类">
                <el-option v-for="item in archiveGategory" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="档案名称:">
              <el-input v-model="form.name" placeholder="请输入档案名称" />
            </el-form-item>
            <el-form-item label="附件:">
              <mUpload class="userUpload" tipShow :fileList="form.fileList"></mUpload>
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
import mUpload from '../Upload/index.vue'
import { addOrUpdate, ListResItem } from '@/api/operation/filemanagement/enterprisefiles';

const { title, list, archiveGategory } = defineProps({
  title: { type: String, default: () => '' },
  list: { type: Array<ListResItem>, default: () => [] },
  archiveGategory: { type: Array<{ id: number, name: string }>, default: () => [] }
})
const proxy: any = getCurrentInstance()?.proxy

let visible = $ref(false)
let row = $ref<ListResItem>()
let form = $ref({
  name: '',
  archivesType: 0,
  categoryId: 0,
  fileList: []
})

const show = (obj?: ListResItem) => {
  visible = true
  row = obj
  form.name = obj?.name
  if(obj?.archivesType) {
    form.archivesType = Number(obj?.archivesType)
  }
  form.categoryId = obj?.id
}


const onSubmit = () => {
  const query = {
    ...form
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
