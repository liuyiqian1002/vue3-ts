<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" v-model="visible" class="event-dialog-wrapper">
      <div class="content-wrapper">
        <div class="table-wrapper">
          <div class="title-item">报警明细</div>
          <div class="ctent-wrapper">
            <el-table :data="list" style="width: 100%">
              <el-table-column v-for="(column, index) in tableColumns" :key="index" :prop="column.prop"
                :label="column.label" :width="column.width" show-overflow-tooltip>
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
import { AlarmProcessItem, eventDisposalDto, EventStaticsItem } from '@/api/operation/closedloopmanagement/alarmprocess';

const { title, dto, list } = defineProps({
  title: { type: String, default: () => '' },
  dto: { type: Object, default: () => { } },
  list: { type: Array<EventStaticsItem>, default: () => [] }
})
const proxy: any = getCurrentInstance()?.proxy

let visible = $ref(false)
let row = $ref<AlarmProcessItem>()

const show = (obj: AlarmProcessItem) => {
  visible = true
  row = obj
}


const tableColumns = [
  {
    label: '项目分类',
    prop: 'categoryName'
  },
  {
    label: '检查要点',
    prop: 'checkRequire'
  },
  {
    label: '检查内容',
    prop: 'checkContent',
    width: 300,
  },
  {
    label: '检查依据',
    prop: 'checkBasis'
  },
  {
    label: '修改人',
    prop: 'lastModifiedUser'
  },
  {
    label: '修改时间',
    prop: 'lastModifiedTime'
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
