<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" :width="900" v-model="visible" class="event-dialog-wrapper">
      <div class="content-wrapper">
        <div class="table-wrapper">
          <!-- <div class="title-item">档案明细</div> -->
          <div class="ctent-wrapper">
            <!-- <HuBei_Province_Month_V20 :row="row" :data="data"></HuBei_Province_Month_V20> -->
            <component :is="componentsMap[row.templateName]" v-if="data && data.brief" :row="row" :data="data" :download="onDownload"></component>
          </div>
          <!-- <div class="tw_c mb20"><el-button @click="visible = false">关闭</el-button></div> -->
        </div>
      </div>
    </tw-dialog>
  </div>
</template>

<script setup lang="tsx">
import Hubei_City_Month_T1_V10 from '../reportTemplates/Hubei_City_Month_T1_V10.vue'
import Hubei_City_Month_T2_V10 from '../reportTemplates/Hubei_City_Month_T2_V10.vue'
import Hubei_City_Month_T3_V10 from '../reportTemplates/Hubei_City_Month_T3_V10.vue'
import Hubei_City_Month_T4_V10 from '../reportTemplates/Hubei_City_Month_T4_V10.vue'
import Hubei_City_Month_T5_V10 from '../reportTemplates/Hubei_City_Month_T5_V10.vue'
import Hubei_City_Year_T1_V10 from '../reportTemplates/Hubei_City_Year_T1_V10.vue'
import Hubei_City_Month_V20 from '../reportTemplates/Hubei_City_Month_V20.vue'
import HuBei_New_City_T1_V20 from '../reportTemplates/HuBei_New_City_T1_V20.vue'
import HuBei_New_City_T2_V20 from '../reportTemplates/HuBei_New_City_T2_V20.vue'
import HuBei_New_City_T3_V20 from '../reportTemplates/HuBei_New_City_T3_V20.vue'
import HuBei_New_City_T4_V20 from '../reportTemplates/HuBei_New_City_T4_V20.vue'
import Hubei_City_Season_T1_V10 from '../reportTemplates/Hubei_City_Season_T1_V10.vue'
import Hubei_City_Season_T2_V10 from '../reportTemplates/Hubei_City_Season_T2_V10.vue'
import Hubei_City_Season_T3_V10 from '../reportTemplates/Hubei_City_Season_T3_V10.vue'
import HuBei_Province_Month_V20 from '../reportTemplates/HuBei_Province_Month_V20.vue'
import Hubei_Province_Season_T4_V10 from '../reportTemplates/Hubei_Province_Season_T4_V10.vue'
import GuangXi_City_Month_T1_V20 from '../reportTemplates/GuangXi_City_Month_T1_V20.vue'
import GuangXi_City_Month_T1_V30 from '../reportTemplates/GuangXi_City_Month_T1_V30.vue'
import GuangXi_City_Month_T5_V20 from '../reportTemplates/GuangXi_City_Month_T5_V20.vue'
import GuangXi_City_Month_T5_V30 from '../reportTemplates/GuangXi_City_Month_T5_V30.vue'
import GuangXi_Province_Month_V40 from '../reportTemplates/GuangXi_Province_Month_V40.vue'
import GuangXi_City_Month_V40 from '../reportTemplates/GuangXi_City_Month_V40.vue'
import { briefDetail, download } from '@/api/statisticalStatement/briefingAnalysis/analysisBriefing'
const { title } = defineProps({
  title: { type: String, default: () => '' },
})

const componentsMap = {
  briefReportView_HuBeiProvinceMonthV20: HuBei_Province_Month_V20,
  briefReportView_HuBeiCityMonthV20: Hubei_City_Month_V20,
  briefReportDetail_Hubei_City_Month_T1_V10: Hubei_City_Month_T1_V10,
  briefReportDetail_Hubei_City_Month_T2_V10: Hubei_City_Month_T2_V10,
  briefReportDetail_Hubei_City_Month_T3_V10: Hubei_City_Month_T3_V10,
  briefReportDetail_Hubei_City_Month_T4_V10: Hubei_City_Month_T4_V10,
  briefReportDetail_Hubei_City_Month_T5_V10: Hubei_City_Month_T5_V10,
  briefReportDetail_Hubei_City_Year_T1_V10: Hubei_City_Year_T1_V10,
  briefReportDetail_HuBei_New_City_T1_V20: HuBei_New_City_T1_V20,
  briefReportDetail_HuBei_New_City_T2_V20: HuBei_New_City_T2_V20,
  briefReportDetail_HuBei_New_City_T3_V20: HuBei_New_City_T3_V20,
  briefReportDetail_HuBei_New_City_T4_V20: HuBei_New_City_T4_V20,
  briefReportDetail_Hubei_City_Season_T1_V10: Hubei_City_Season_T1_V10,
  briefReportDetail_Hubei_City_Season_T2_V10: Hubei_City_Season_T2_V10,
  briefReportDetail_Hubei_City_Season_T3_V10: Hubei_City_Season_T3_V10,
  briefReportDetail_Hubei_Province_Season_T4_V10: Hubei_Province_Season_T4_V10,
  // 广西模板
  briefReportDetail_GuangXi_City_Month_T1_V20: GuangXi_City_Month_T1_V20,
  briefReportDetail_GuangXi_City_Month_T1_V30: GuangXi_City_Month_T1_V30,
  briefReportDetail_GuangXi_City_Month_T5_V20: GuangXi_City_Month_T5_V20,
  briefReportDetail_GuangXi_City_Month_T5_V30: GuangXi_City_Month_T5_V30,
  briefReportView_GxProvinceMonthV40: GuangXi_Province_Month_V40,
  briefReportView_GxCityMonthV40: GuangXi_City_Month_V40,
}

const proxy: any = getCurrentInstance()?.proxy
let visible = $ref(false)
let row: any = $ref({})
let data: any = $ref({})
// let currentComponent = $ref(componentsMap[row.templateName])
const show = (obj) => {
  data = {}
  row = {}
  visible = true
  // if (row.summaryReportData) {
  // const details = JSON.parse(row.summaryReportData)
  // console.log(details, 'details')
  // data = details
  // }
  briefDetail(obj.summaryReportId).then((res) => {
    // console.log(res, 'briefDetail')
    row = res.brief
    console.log(row.templateName, 'templateName')
    data = { ...JSON.parse(res.brief.summaryReportData), ...res, ...res.brief }
    // data = JSON.parse(JSON.stringify({ ...JSON.parse(res.brief.summaryReportData), ...res, ...res.brief }))
    // currentComponent = componentsMap[row.templateName]
  })
  backToTop()
}

const backToTop = () => {
  queueMicrotask(() => {
    const dom = document.querySelector('.ctent-wrapper')
    // console.log(dom, 'dom')
    dom?.scrollIntoView()
  })
}
console.log(data, row, 'data details')

const onDownload = (docType: string = 'doc') => {
  console.log(row, data, 'download click')
  download(row.summaryReportId).then((res) => {
    console.log(res, 'download res')

    proxy.download(res, `湖北省道路运输安全第三方监测服务${getReportTypeBySummaryReportType(data.summaryReportType)}-${row.summaryReportShowDate}${row.cityName || row.provinceName}(车安达)`, docType)
  })
}
const getReportTypeBySummaryReportType = (summaryReportType) => {
  if([1,5,6].includes(summaryReportType)) {
    return '月报'
  }
  if([2,7,8].includes(summaryReportType)) {
    return '季报'
  }
  if([3,9,10].includes(summaryReportType)) {
    return '半年报'
  }
  if([4,11,12].includes(summaryReportType)) {
    return '年报'
  }
}

defineExpose({ show })
</script>

<style scoped lang="scss">
.event-dialog-wrapper {
  :deep(.el-dialog) {
    height: 100%;
    overflow: hidden;

    .el-dialog__body {
      height: calc(100% - 3px) !important;
      overflow: hidden;
      .el-scrollbar {
        height: calc(100% - 50px) !important;
        background: #FFF;
      }
    }
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
      padding-bottom: 50px;
    }

    .table-wrapper {
      height: 70%;
    }
  }
}
</style>
