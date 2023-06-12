<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" :width="800" v-model="visible"
      class="process-dialog-wrapper">
      <div class="content-wrapper">
        <!-- form表格 -->
        <div class="form-wrapper">
          <div class="form-title">上传文件支持格式：jpg,jpeg,bmp,png,pdf 单个文件不能超过20MB,最多上传5个文件</div>
          <el-form class="demo-form-inline">
            <el-form-item label="驾驶员">
              <el-input v-model="driverName" placeholder="驾驶员" />
            </el-form-item>
            <el-form class="demo-form-inline">
              <!-- <upload v-model="imageUrl" v-model:id="fileId" uploadTxt="上传照片"></upload> -->
              <mUpload :fileIdList="fileUrlId" uploadTxt="上传照片" :limit="5"></mUpload>
            </el-form>
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
import { AlarmProcessItem, EventStaticsItem } from '@/api/operation/closedloopmanagement/alarmprocess';
import { handleDisposal } from '@/api/operation/closedloopmanagement/ticketfiles';
import mUpload from './Upload/index.vue'

const { title, list } = defineProps({
  title: { type: String, default: () => '' },
  list: { type: Array<EventStaticsItem>, default: () => [] }
})
const proxy: any = getCurrentInstance()?.proxy

let visible = $ref(false)
let row = $ref<EventStaticsItem>()
let driverName = $ref('')
let imageUrl = $ref('')
let fileUrlId = $ref([])

const show = (obj: EventStaticsItem) => {
  visible = true
  row = obj
}



const onSubmit = () => {
  const query = {
    disposalId: row.id,
    driverName: driverName,
    fileUrlId: fileUrlId
  }
  console.log('onSubmit', query, list)
  handleDisposal(query).then(res => {
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
