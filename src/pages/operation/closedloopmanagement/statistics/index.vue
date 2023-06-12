<template>
  <div class="alarm-process-wrapper">
    <ContentMainExt ref="contentMainRef" :mainData="mainData"></ContentMainExt>
    <!-- <content-main ref="contentMain2Ref" :mainData="mainData2"></content-main> -->
    <div class="second-table-wrapper">
      <AlarmTable
        ref="mainTableRef"
        :columns="mainData2.columns"
        :lists="mainData2.detailLists"
        :botHeight="mainData2.botHeight"
        :tableParams="mainData.formData"
        :headBtns="mainData2.headBtns"
        :showPagination="true"
      ></AlarmTable>
    </div>
  </div>
</template>

<script setup lang="tsx">
import {
  DisposalStaticsListQuery,
  eventDisposalStaticsSubList,
  exportEventDisposalStatics,
  exportEventDisposalStaticsSubList,
} from '@/api/operation/closedloopmanagement/statistics'
// import Preprocess from './preprocess/index.vue'
import ContentMainExt from '@/components/ContentMainExt/index.vue'
import AlarmTable from '@/businessComponents/AlarmTable/index.vue'
let title = $ref('')
let dialogRef = $ref(null)
let contentMainRef = $ref(null)
let mainTableRef = $ref(null)
const proxy: any = getCurrentInstance()?.proxy
let list = $ref([]) // 勾选的行
//
let mainData = reactive({
  tableUrl: '/operation/alarmEventExternal/eventDisposalStatics',
  botHeight: 550,
  isLoadStatus: true,
  showPagination: false, // 统计不需要分页
  columns: [
    { prop: 'orgName', label: '组织机构', width: 120 },
    { prop: 'subOrgCount', label: '下机机构数' },
    { prop: 'totalVehicleNumber', label: '车辆总数' },
    { prop: 'alarmVehicleNumber', label: '报警车辆数' },
    { prop: 'totalAlarmEventCount', label: '报警总数' },
    { prop: 'validAlarmCount', label: '有效报警数' },
    { prop: 'appealCount', label: '报警申诉数' },
    { prop: 'manualCount', label: '处警次数' },
    { prop: 'manualRate', label: '处警率' },
    { prop: 'disposalCount', label: '处置次数' },
    { prop: 'disposalRate', label: '处置率' },
  ],
  formData: {
    // companyId: '',
    startTime: proxy.$dayjs().format('YYYY-MM-DD'),
    endTime: proxy.$dayjs().format('YYYY-MM-DD'),
    alarmTypeCodeList: [],
    order: '',
    // orderField: '',
    // pageNumber: 1,
    // pageSize: 25,
    // vehicleCode: '',
    // "alarmTypeCodeList": [],
    driverWarningTypeList: [],
    // "endTime": "",
    nodeDto: {
      orgCode: '',
      orgId: 0,
      orgName: '',
      orgType: 0,
      parent: true,
      parentCode: '',
      parentName: '',
      permissionCode: '',
      vehicle: true,
    },
    // "order": "",
    rankCount: 0,
    rankType: '',
    // "startTime": ""
  },
  onSearch: (data) => {
    // todo 查询下级列表
    getSubListData(data)
  },
  headBtns: [
    {
      icon: 'daochu',
      name: '导出',
      //   formatter: () => proxy.$store.getters.permissions['operation-jjxg-jxqy-export'],
      click: () => {
        let lists = contentMainRef.getAllCheck()
        let txt = lists.length > 0 ? `请确定导出选中的${lists.length}条数据吗？` : `请确定导出全部数据`
        proxy.MessageBox({ msg: txt, type: 'warning' }).then((close) => {
          exportEventDisposalStatics({
            ...mainData.formData as DisposalStaticsListQuery,
          })
            .then((res) => {
              // window.open(res.fileUrl)
              proxy.downloadByUrl(res.fileUrl, res.fileName)
              close()
            })
            .catch(() => {
              close()
            })
        })
      },
    },
  ],
  lists: [
    {
      label: '所属组织',
      key: 'nodeDto',
      isNodeType: true,
      placeholder: '请输入所属组织',
      type: 'org',
      url: '/system/userDataAuthSearchTree/getTreesList',
      method: 'post',
      params: {
        hasDataPermission: true,
        needVehicle: false,
        searchType: 1,
        keyword: '',
      },
      parKeys: [{ key: 'parentCode', val: 'permissionCode' }],
      props: {
        label: 'orgName',
        value: 'permissionCode',
        disabled: 'nocheck',
      },
      permissionIds: [],
    },
    {
      label: '报警类型',
      key: 'alarmTypeCodeList',
      type: 'allSelect',
      filter: 'alarmModeTypes',
      placeholder: '请选择报警类型',
      width: 760,
      col: 5,
    },
    {
      label: '报警时间',
      key: ['startTime', 'endTime'],
      type: 'esDate',
      data: { type: 'datetime' },
      col: 8,
    },
    {
      label: '排名方式',
      key: 'rankType',
      type: 'select',
      // filter: 'alarmModeTypes',
      placeholder: '请选择排名方式',
      children: [
        { label: '处置率排名', value: 1 },
        { label: '处警率排名', value: 2 },
      ],
      col: 5,
    },
    {
      label: '排名数',
      key: 'rankCount',
      // type: 'select',
      // filter: 'alarmModeTypes',
      placeholder: '请输入排名数',
      col: 5,
    },
    {
      label: '排序',
      key: 'order',
      type: 'select',
      placeholder: '请选择排序方式',
      children: [
        { label: '倒序', value: 'DESC' },
        { label: '正序', value: 'ASC' },
      ],
      col: 5,
    },
  ],
})
let mainData2 = reactive({
  url: '/operation/alarmEventExternal/eventDisposalStaticsSubList',
  botHeight: 250,
  columns: [
    { prop: 'orgName', label: '组织机构' },
    { prop: 'totalVehicleNumber', label: '车辆总数' },
    { prop: 'eventStartTimeStr', label: '报警车辆数' },
    { prop: 'totalAlarmEventCount', label: '报警总数' },
    { prop: 'validAlarmCount', label: '有效报警数' },
    { prop: 'appealCount', label: '报警申诉数' },
    { prop: 'manualCount', label: '处警次数' },
    { prop: 'manualRate', label: '处警率' },
    { prop: 'disposalCount', label: '处置次数' },
    { prop: 'disposalRate', label: '处置率' },
    { prop: 'rank', label: '排名' },
  ],
  headBtns: [
    {
      icon: 'daochu',
      name: '导出',
      //   formatter: () => proxy.$store.getters.permissions['operation-jjxg-jxqy-export'],
      click: () => {
        let lists = mainTableRef.getAllCheck()
        let txt = lists.length > 0 ? `请确定导出选中的${lists.length}条数据吗？` : `请确定导出全部数据`
        proxy.MessageBox({ msg: txt, type: 'warning' }).then((close) => {
          exportEventDisposalStaticsSubList({
            ...mainData.formData as DisposalStaticsListQuery,
          })
            .then((res) => {
              // window.open(res.fileUrl)
              proxy.downloadByUrl(res.fileUrl, res.fileName)
              close()
            })
            .catch(() => {
              close()
            })
        })
      },
    },
  ],
  //   formData: {
  //     companyId: '',
  //     startTime: proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
  //     endTime: proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
  //     alarmTypeCodeList: [],
  //     order: '',
  //     orderField: '',
  //     pageNumber: 1,
  //     pageSize: 25,
  //     vehicleCode: '',
  //   },
  detailLists: [], // 报警详情数据
  preprocessLists: [], // 预处理弹窗数据
})
// 报警详情数据
const getSubListData = (query: DisposalStaticsListQuery) => {
  //   const query: DisposalStaticsListQuery = {
  //     alarmTypeCodeList: [],
  //     driverWarningTypeList: [],
  //     endTime: '',
  //     nodeDto: {
  //       orgCode: '',
  //       orgId: 0,
  //       orgName: '',
  //       orgType: 0,
  //       parent: true,
  //       parentCode: '',
  //       parentName: '',
  //       permissionCode: '',
  //       vehicle: true,
  //     },
  //     order: '',
  //     rankCount: 0,
  //     rankType: '',
  //     startTime: '',
  //   }
  eventDisposalStaticsSubList(query).then((res) => {
    console.log(res, 'getStaticsDetail')
    if (res) {
      mainData2.detailLists = res.rows
    }
  })
}
const checkSelect = (val) => {
  console.log(val, 'val checkSelect')
}

const getTable = () => {
  contentMainRef.getTable()
}
</script>

<style scoped lang="scss">
.alarm-process-wrapper {
  .second-table-wrapper {
    margin-top: 5px;
    :deep(.table-header) {
      .table-r {
        z-index: 1;
      }
    }
  }

  .table-box {
    height: 30% !important;
  }
}
</style>
