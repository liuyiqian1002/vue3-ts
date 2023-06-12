<template>
  <div class="list-detail">
    <el-dialog
      @close="onClose"
      v-model="drawerFlag"
      :title="title ? `(${title})报警明细` : '报警明细汇总'"
      :fullscreen="fullscreen"
      center
      width="80%"
      :show-close="false"
      v-loading="loading"
      element-loading-text="加载中..."
    >
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <span :id="titleId" :class="titleClass" class="el-dialog__title">{{ title ? `(${title})报警明细` : '报警明细汇总' }}</span>
          <div class="right-wrapper" style="display: inline-block; position: absolute; right: 40px; top: 24px; color: #909399">
            <el-icon @click="onFullScreen" style="cursor: pointer"><FullScreen /></el-icon>
            <el-icon @click="close()" style="margin-left: 5px; cursor: pointer"><Close /></el-icon>
          </div>
        </div>
      </template>
      <div class="homeTitle-bot relative w">
        <el-image class="bottom-img" src="/src/assets/images/dataPanel/light.png"></el-image>
      </div>
      <div class="provinceScreen">
        <el-table
          v-loading="loading"
          element-loading-background="rgba(255, 255, 255, .1)"
          element-loading-text="加载中，请稍后..."
          element-loading-spinner="el-icon-loading"
          :data="gridData"
          size="mini"
          :height="tableHeight"
          stripe
          :header-cell-style="{ background: 'rgba(6,85,105,0.3)', color: 'rgba(42, 212, 255, 1)', textAlign: 'center', fontSize: '12px', padding: '4px' }"
          style="width: 100%"
          row-style="test"
        >
          <el-table-column prop="cityName" label="市区">
            <template #default="{ row }">{{ row.cityName + '-' + row.districtName }}</template>
          </el-table-column>
          <el-table-column prop="companyName" label="企业名称" />

          <el-table-column prop="vehicleOperateTypeName" label="营运类型" />
          <el-table-column prop="plateNum" label="车牌号" />
          <el-table-column prop="plateColorCode" label="车牌颜色">
            <template #default="{ row }">{{ store.getters.oEnumerate.color[row.plateColorCode] }}</template>
          </el-table-column>
          <el-table-column prop="operatorName" label="运营商名称" />
          <el-table-column prop="alarmTypeName" label="报警类型">
            <!-- <template #default="{ row }">{{ store.getters.oEnumerate.alarmType[row.alarmTypeCode] }}</template> -->
          </el-table-column>
          <el-table-column prop="alarmLevel" label="报警级别">
            <template #default="{ row }">
              <tw-tag :type="row.alarmLevel ? 'danger' : 'warning'">{{ row.alarmLevelString }}</tw-tag>
            </template>
          </el-table-column>
          <el-table-column prop="eventStartTime" label="事件开始时间" width="90" />
          <el-table-column prop="eventEndTime" label="事件结束时间" width="90" />
          <el-table-column prop="persistTimeZH" label="持续时长" />
          <el-table-column prop="eventStatus" label="事件状态">
            <template #default="{ row }">
              <tw-tag :type="row.eventStatus === 2 ? 'success' : row.eventStatus === 1 ? 'warning' : 'info'">{{ store.getters.oEnumerate.eventStatus[row.eventStatus] }}</tw-tag>
            </template>
          </el-table-column>
          <el-table-column prop="hasManual" label="处理状态">
            <template #default="{ row }">
              <tw-tag :type="!!row.hasManual ? 'success' : 'warning'">{{ !!row.hasManual ? '已处理' : '未处理' }}</tw-tag>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-wrapper w">
          <el-pagination
            :page-size="pageSize"
            :current-page="currentPage"
            :pager-count="11"
            layout="prev, pager, next"
            background
            :total="total"
            @current-change="onCurrentChange"
            @prev-click="onPrev"
            @next-click="onNext"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getAlarmListDetail } from '@/api/largeScreen'
import type { AxiosResponse } from 'axios'

const { title } = defineProps({
  title: { type: String, default: '' },
})

const store = useStore()

let fullscreen = $ref(false)
let tableHeight = $ref(535)
const onFullScreen = () => {
  fullscreen = !fullscreen
  tableHeight = fullscreen ? 775 : 535
}

const formLabelWidth = '140px'
let loading = $ref(false)
const form = reactive({
  areaName: '',
  vehicleCount: '',
  vehicleTotalCount: '',
  rate: '',
})
let gridData = $ref([])
let drawerFlag = $ref(false)

let currentItem: any = {}

// 定义返回值类型
type Res = {
  rows: Array<object>
  total: number
}
const alarmListData = (item?: object, pageNumber?: number) => {
  console.log(item, pageNumber, currentPage, 'alarmListData detail')
  if (item) {
    currentItem = item
  }
  if (pageNumber) {
    currentPage = pageNumber || 1
  }
  drawerFlag = true
  loading = true
  const param = {
    alarmTypeCode: currentItem.subTypeCode,
    pageNumber: currentPage,
    pageSize: pageSize,
  }

  getAlarmListDetail(param)
    .then((res: Res & AxiosResponse) => {
      gridData = res.rows
      total = res.total
      loading = false
    })
    .catch(() => {
      loading = false
    })
}

let currentPage = $ref(1)
let pageSize = $ref(10)
let pages = $ref(1)
let total = $ref(1)

const onCurrentChange = (value: number) => {
  console.log(value, 'onCurrentChange')
  currentPage = value
  alarmListData()
}
const onPrev = (value: number) => {
  console.log(value, 'onPrev')
  currentPage--
}
const onNext = (value: number) => {
  console.log(value, 'onNext')
  currentPage++
}
const onClose = () => {
  currentPage = 1
}

defineExpose({ alarmListData })
</script>
<style scoped lang="scss">
.list-detail {
  :deep(.el-dialog) {
    border: 1px solid rgba(108, 128, 151, 0.5);
    background: rgba(10, 16, 28, 0.4);
    backdrop-filter: blur(3px);
    .el-dialog__title {
      color: rgba(226, 235, 241, 1);
      font-family: 'douyuZt';
      font-style: oblique;
      letter-spacing: 3px;
      font-size: 18px;
      font-weight: DOUYUFont;
      font-family: 'DOUYUFont';
      text-shadow: 0 0 9px #14ccff;
    }
    .el-dialog__header {
      padding-bottom: 0;
    }
    .el-dialog__body {
      padding-top: 0;
    }
    .homeTitle-bot {
      text-align: center;
      height: 10px;
      margin-top: 10px;
      margin-bottom: 20px;
      background: url('@/assets/images/dataPanel/split4.png') no-repeat;
      background-size: 100% 3px;
      .homeTitle_block {
        height: 2px;
      }
      .bottom-img {
        margin-top: -12px;
      }
    }
    .provinceScreen {
      // 滚动条样式
      .el-scrollbar__bar.is-vertical > div {
        width: 4px;
        border-radius: 4px;
        background: rgba(39, 202, 255, 0.8);
      }
      .el-table {
        background: rgba(71, 138, 138, 0);
      }
      .el-table tr {
        background: rgba(10, 16, 28, 0.4);
        background-color: transparent !important;
        border: none;
      }
      /**改变表格内行线颜色*/
      .el-table td,
      .el-table th.is-leaf {
        border-bottom: 1px solid #3c4c67 !important;
      }
      .el-table--border .el-table__inner-wrapper::after,
      .el-table--border::after,
      .el-table--border::before,
      .el-table__inner-wrapper::before {
        background: rgba(108, 128, 151, 0.5);
      }
      .el-table td.el-table__cell div {
        color: rgba(208, 222, 238, 1);
        font-weight: 500;
      }
      .el-table--enable-row-transition .el-table__body td,
      .el-table .cell {
        font-size: 12px;
        text-align: center;
        background-color: transparent !important;
      }
    }
    .pagination-wrapper {
      text-align: right;
      .el-pagination {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
      }
      button,
      li {
        width: 22px;
        height: 26px;
        color: rgba(255, 255, 255, 0.65);
        background: rgba(39, 202, 255, 0.3) !important;
      }
    }
  }
}
</style>
