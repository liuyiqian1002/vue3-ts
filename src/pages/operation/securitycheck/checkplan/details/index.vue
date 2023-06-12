<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" v-model="visible" class="event-dialog-wrapper">
      <div class="content-wrapper">
        <div class="table-wrapper">
          <div class="title-item">检查任务详情</div>
          <div class="ctent-wrapper">
            <el-table :data="list" style="width: 100%">
              <el-table-column v-for="(column, index) in tableColumns" :key="index" :prop="column.prop"
                :label="column.label" :width="column.width">
              </el-table-column>
            </el-table>
          </div>
          <div class="tw_c"><el-button @click="visible = false">关闭</el-button></div>
        </div>
        <!-- <div><el-button @click="visible = false">关闭</el-button></div> -->
      </div>
    </tw-dialog>
  </div>
</template>

<script setup lang="tsx">
import { CheckPlanResItem } from '@/api/operation/securitycheck/checkplan';

const { title, list } = defineProps({
  title: { type: String, default: () => '' },
  list: { type: Array<CheckPlanResItem>, default: () => [] }
})
const proxy: any = getCurrentInstance()?.proxy

let visible = $ref(false)
let row = $ref({})

const show = (obj) => {
  visible = true
  row = obj
}


const tableColumns = [
  {
    label: '检查时间',
    prop: 'checkTime'
  },
  {
    label: '任务名称',
    prop: 'name'
  },
  {
    label: '受检单位',
    prop: 'companyName'
  },
  {
    label: '检查单位',
    prop: 'checkBy'
  },
  {
    label: '检查人员',
    prop: 'checkUserNames'
  },
  {
    label: '状态',
    prop: 'statusName'
  },
]

watch(() => list, (nVal) => {
  // console.log(nVal, 'list watch')
  // staticsAll()
}, { deep: true })


defineExpose({ show })
</script>

<style scoped lang="scss">
.event-dialog-wrapper {
  :deep(.el-scrollbar__view) {
    height: 100%;

    .dialog_content {
      height: 100%;
      // padding: 0 !important;
    }
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    height: 96%;

    .title-item {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: #ccc;
      text-align: left;
      padding-left: 10px;
      box-sizing: border-box;
    }

    .ctent-wrapper {
      border: 1px solid #e7e7e7;
      margin-bottom: 20px;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
    }

    .table-wrapper {
      height: 70%;
    }
  }
}
</style>
