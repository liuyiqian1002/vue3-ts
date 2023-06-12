<template>
  <div class="analysis-wrapper">
    <content-main ref="contentMainRef" :mainData="mainData" @tableCallback="tableCallback"></content-main>
    <!--    详情    -->
    <Detail ref="detailDialogRef"></Detail>
  </div>
</template>

<script setup lang="tsx">
import { batchDownload } from '@/api/statisticalStatement/briefingAnalysis/analysisBriefing'
import Detail from './details/index.vue'
let { proxy } = getCurrentInstance()
let contentMainRef = $ref(null)
let detailDialogRef = $ref(null)
// let detailData = $ref({})
const reportTypes = proxy.$store.getters.oEnumerate['summaryReportType']
console.log(reportTypes, 'reportTypes')
// reportTypes[row.summaryReportType].label

const onTimeChange = (e) => {
    if(!e) {
        mainData.formData.summaryReportTime = null
        return
    }
  const year = e.substr(0, 4)
  const month = e.substr(5, 2)
  console.log(month, e, 'date')
  if (mainData.dateType === 'month') {
    mainData.formData.summaryReportTime = Number(month)
    mainData.formData.summaryReportYear = Number(year)
  } else if (mainData.dateType === 'season') {
    mainData.formData.summaryReportTime = Number(month)
    mainData.formData.summaryReportYear = Number(year)
  } else if (mainData.dateType === 'halfyear') {
    mainData.formData.summaryReportTime = Number(month)
    mainData.formData.summaryReportYear = Number(year)
  } else if (mainData.dateType === 'year') {
    mainData.formData.summaryReportTime = 1
    mainData.formData.summaryReportYear = Number(year)
  }
}
const tableCallback = (e) => {
    console.log(e,'eeee')
}

let mainData = reactive({
  tableUrl: '/statistics/briefReport/query',
  isCheck: true,
  isLoadStatus: true,
  columns: [
    { prop: 'summaryReportType', label: '简报类型', formatter: (row) => reportTypes[row.summaryReportType] },
    { prop: 'provinceName', label: '组织区域', formatter: (row) => `${row.provinceName}${row.cityName || ''}` },
    { prop: 'summaryReportShowDate', label: '简报时间' },
    { prop: 'createTimeStr', label: '生成时间' },
  ],
  headBtns: [
    {
      icon: 'daochu',
      name: '导出',
      click: (row) => {
        let lists = contentMainRef.getAllCheck()
        let ids = proxy.$_.map(lists, 'summaryReportId')
        console.log(ids, 'ids')
        if (ids.length === 0) {
          ElMessage.warning('请勾选需要导出的报表!')
          return
        }
        let txt = ids.length > 0 ? `请确定导出选中的${ids.length}条数据吗？` : `请确定导出全部数据`
        proxy.MessageBox({ msg: txt, type: 'warning' }).then((close) => {
          batchDownload({ briefIds: ids.toString() })
            .then((res) => {
              console.log(res, 'batchDownload res')
              // window.open(res.fileUrl)
              proxy.download(res, `简报-${proxy.$dayjs().format('YYYY-MM-DD')}`, 'zip')
              close()
            })
            .catch(() => {
              close()
            })
        })
      },
    },
  ],
  tableBtns: {
    prop: 'btns',
    label: '操作',
    fixed: 'right',
    width: 100,
    btns: [
      {
        icon: 'xiangqing',
        name: '详情',
        click: (row) => {
          // const details = JSON.parse(row.summaryReportData)
          // console.log(details, 'details')
          // detailData = details
          if (detailDialogRef) {
            detailDialogRef.show(row)
          }
        },
      },
    ],
  },
  formData: {
    // "begDateTime": proxy.$dayjs().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
    // "endDateTime": proxy.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
    nodeDto: {},
    date: '',
    summaryReportTime: null, // proxy.$dayjs().month() + 1
    summaryReportType: 1,
    summaryReportYear: proxy.$dayjs().year(),
    pageNumber: 1,
    pageSize: 100,
  },
  dateType: 'month',
  lists: [
    {
      label: '简报类型',
      key: 'summaryReportType',
      type: 'select',
      filter: 'summaryReportType',
      placeholder: '请选择简报类型',
      change: (e) => {
        console.log(e, 'eeee')
        // let dateType = 'month'
        let format = ''
        if ([1, 5, 6].includes(e)) {
          // 月度
          mainData.dateType = 'month'
          format = 'YYYY-MM'
        } else if ([2, 7, 8].includes(e)) {
          // 季度
          mainData.dateType = 'season'
          format = 'YYYY [季度] MM'
          mainData.formData.summaryReportTime = 1
        } else if ([3, 9, 10].includes(e)) {
          // 半年度
          mainData.dateType = 'halfyear'
          format = 'YYYY [半年度] MM'
          mainData.formData.summaryReportTime = 1
        } else if ([4, 11, 12].includes(e)) {
          // 年度
          mainData.dateType = 'year'
          format = 'YYYY'
          mainData.formData.summaryReportTime = 1
        }
        mainData.formData.date = null
        console.log(mainData.lists[2].clear, 'mainData.lists[2]')
        if (mainData.lists[2].clear) {
          mainData.lists[2].clear()
          mainData.lists[2].clear = undefined
        }
        if (mainData.dateType === 'month' || mainData.dateType === 'year') {
          mainData.lists[2] = {
            label: ' 时间范围',
            placeholder: '请选择时间范围',
            key: 'date',
            type: 'date',
            clear: undefined,
            disabledDate: proxy.disabledAfterToday,
            data: { type: mainData.dateType, format: format },
            change: onTimeChange,
          }
        } else {
          mainData.lists[2] = {
            label: ' 时间范围',
            placeholder: '请选择时间范围',
            key: 'summaryReportTime',
            type: 'date1',
            clear: undefined,
            disabledDate: proxy.disabledAfterToday,
            data: { type: mainData.dateType, format: format },
            change: (value) => {
              if (value) {
                let arr = value.split('-')
                mainData.formData.summaryReportTime = Number(arr[1])
                mainData.formData.summaryReportYear = Number(arr[0])
              }
            },
          }
        }
      },
    },
    {
      label: '组织结构',
      key: 'nodeDto',
      placeholder: '请选择组织结构',
      type: 'org',
      url: '/system/userDataAuthSearchTree/getTreesList',
      method: 'post',
      params: { hasDataPermission: true, needVehicle: true, searchType: 1, keyword: '' },
      isNodeType: true,
      parKeys: [{ key: 'parentCode', val: 'permissionCode' }],
      props: { label: 'orgName', value: 'permissionCode' },
      permissionIds: [],
      disabledTypes:[2]
    },
    {
      label: ' 时间范围',
      placeholder: '请选择时间范围',
      key: 'date',
      type: 'date',
      clear: undefined,
      disabledDate: proxy.disabledAfterToday,
      data: { type: 'month' },
      change: onTimeChange,
    },
    // { label: ' 时间范围', key: 'summaryReportTime', type: 'date1', data: { type: 'halfyear' }, change: onTimeChange },
  ],
  rules: { date: [{ required: true, message: '请选择事件范围', trigger: 'blur' }] },
})

const getTable = () => {
  contentMainRef.getTable()
}
</script>

<style scoped lang="scss">
.analysis-wrapper {
  :deep(.el-table) {
    .tw_cl {
      justify-content: center;
    }
  }
}
// 设置table下的tw_cl 居中
</style>
