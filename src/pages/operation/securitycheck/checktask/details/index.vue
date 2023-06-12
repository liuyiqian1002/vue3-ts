<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" v-model="visible" class="event-dialog-wrapper">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <div class="content-wrapper">
            <div class="table-wrapper">
              <div class="title-item title-text">检查任务信息</div>
              <div class="ctent-wrapper table1">
                <div class="item" v-for="it in 10">
                  <div class="label">{{ `任务名称${it}` }}</div>
                  <div class="value">{{ `测试任务${it}` }}</div>
                </div>
              </div>
            </div>
            <div class="table-wrapper">
              <div class="title-item title-text">检查项目信息</div>
              <div class="ctent-wrapper">
                <el-table :data="list" style="width: 100%">
                  <el-table-column v-for="(column, index) in tableColumns1" :key="index" :prop="column.prop"
                    :label="column.label" :width="column.width">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="table-wrapper">
              <div class="title-item title-text">附件项目（安全生产档案）</div>
              <div class="ctent-wrapper">
                <el-table :data="list" style="width: 100%">
                  <el-table-column v-for="(column, index) in tableColumns2" :key="index" :prop="column.prop"
                    :label="column.label" :width="column.width">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="table-wrapper">
              <div class="title-item title-text">待整改项目信息</div>
              <div class="ctent-wrapper">
                <el-table :data="list" style="width: 100%">
                  <el-table-column v-for="(column, index) in tableColumns3" :key="index" :prop="column.prop"
                    :label="column.label" :width="column.width">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="检查日志">
          <Logs :title="`检查日志`" :row="dto"></Logs>
        </el-tab-pane>
      </el-tabs>
    </tw-dialog>
  </div>
</template>

<script setup lang="tsx">
import { AlarmProcessItem, EventStaticsItem } from '@/api/operation/closedloopmanagement/alarmprocess';

import Logs from './Logs/index.vue'

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


const tableColumns1 = [
  {
    label: '项目分类',
    prop: 'categoryName'
  },
  {
    label: '检查内容',
    prop: 'checkContent'
  },
]
const tableColumns2 = [
  {
    label: '档案类型',
    prop: 'categoryName'
  },
]
const tableColumns3 = [
  {
    label: '项目分类',
    prop: 'categoryName'
  },
  {
    label: '检查内容',
    prop: 'checkContent'
  },
  {
    label: '检查时间',
    prop: 'checkTime'
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
      .el-tabs__content {
        height: 660px;
        overflow: scroll;
      }
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
      text-align: center;
    }

    .title-text {
      line-height: 40px;
      height: 40px;
      font-size: 18px;
      font-weight: 600;
    }

    .ctent-wrapper {
      border: 1px solid #e7e7e7;
      margin-bottom: 20px;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
    }

    .table1 {
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;

      &>div {
        box-sizing: border-box;
        border: 1px solid #e7e7e7;
        border-spacing: 0;
        border-collapse: collapse;
        width: 50%;
        display: flex;
        // display: table-cell;
        justify-content: flex-start;
        text-align: center;

        .label {
          width: 150px;
          border-right: 1px solid #e7e7e7;
          padding: 10px;
        }

        .value {
          padding: 10px;
          flex: 1;
        }
      }
    }

    .table-wrapper {
      height: 70%;

      :deep(.el-table) {
        .cell {
          text-align: center;
        }

        th .cell {
          background: #fbfbfb;
          line-height: 1.42857;
          padding: 8px;
          vertical-align: middle;
          // border-bottom: 1px solid #DDDDDD;
        }
      }
    }
  }
}
</style>
