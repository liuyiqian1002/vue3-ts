<template>
  <div>
    <content-main ref="contentMainRef" :mainData="mainData" @checkSelect="checkSelect">
      <template #table-r>
        <div class="tw_clr">
          <el-switch
            v-model="refreshValue"
            class="ml-2"
            size="large"
            :width="66"
            inline-prompt
            :active-text="'刷新'"
            :inactive-text="'不刷新'"
            @change="onRefreshChange"
          ></el-switch>
        </div>
      </template>
    </content-main>
    <!--    详情    -->
    <CarDetailDialog ref="dialogRef" :title="title" showManual></CarDetailDialog>
    <tw-dialog :loading="false" title="人工处理" :isBtns="false" width="45%" height="80%" v-model="manualHandleVisible" class="manual-dialog-wrapper">
      <Manual ref="ManualRef" :widthSpan="24" :list="list" :close="onClose" @getTable="getTable"></Manual>
    </tw-dialog>
  </div>
</template>

<script setup lang="tsx">
import CarDetailDialog from '@/businessComponents/CarDetailDialog/index.vue'
import Manual from '@/businessComponents/CarDetailDialog/manual/index.vue'
// import Manual from './dialog_dep/manual/index.vue'
import { eventTrackExport, exportAlarmStatistics, getIsDivideTable } from '@/api/dynamicMonitoring/eventTracking'
let title = $ref('详情')
let dialogRef = $ref(null)
let ManualRef = $ref(null)
let contentMainRef = $ref(null)
const proxy: any = getCurrentInstance()?.proxy
let list = $ref([]) // 勾选的行

const { index } = defineProps(['index'])

// 控制车辆详情弹窗组件是否展示视频
// let showWarningList = $ref(true)
// let showViolationPhoto = $ref(false)
// let showVideoPlayer = $ref(false)
// 控制车辆详情弹窗组件是否展示图片列表
// let showPhotograph = $ref(false)

let mainData = reactive({
  tableUrl: '/operation/alarmEventEntity/page',
  isCheck: true,
  tableIndex: index,
  beforeChange: (formData) => {
    if (formData.startTime && formData.endTime) {
      if (new Date(formData.startTime).getTime() > new Date(formData.endTime).getTime()) {
        ElMessage.warning('开始时间不可大于结束时间！')
        return false
      }
    } else {
      if(!formData.startTime) {
        ElMessage.warning('请选择开始时间！')
        return false
      }
    }
    getTable()
  },
  columns: [
    {
      prop: 'companyName',
      label: '市区',
      width: 100,
      formatter: (row) => `${row.provinceName || ''} ${row.cityName || ''} ${row.districtName || ''}`,
    },
    { prop: 'companyName', label: '企业名称', width: 120 },
    { prop: 'vehicleOperateTypeName', label: '营运类型' },
    {
      prop: 'plateNum',
      label: '车牌号',
      width: 120,
      formatter: (row) => {
        if (row.outTime) {
          return (
            <div class="tw_cl danger">
              <p class="mr5">{row.plateNum}</p>
              <el-icon>
                <Clock />
              </el-icon>
            </div>
          )
        } else {
          return row.plateNum
        }
      },
    },
    { prop: 'plateColorStr', label: '车牌颜色' },
    { prop: 'operatorName', label: '运营商名称', width: 120 },

    { prop: 'alarmTypeName', label: '报警类型' },
    {
      prop: 'alarmLevelString',
      label: '报警级别',
      formatter: (row) => {
        if (row.alarmLevel === 1) {
          return (
            <div style="display: flex;justify-content: center;align-items: center;">
              <el-icon style="color: orange;font-size: 20px;">
                <WarningFilled />
              </el-icon>
              {row.alarmLevelString}
            </div>
          )
        } else {
          return (
            <div style="display: flex;justify-content: center;align-items: center;">
              <el-icon style="color: red;font-size: 20px;">
                <WarnTriangleFilled />
              </el-icon>
              {row.alarmLevelString}
            </div>
          )
        }
      },
    },

    { prop: 'eventOriginalTime', label: '警情/行驶开始时间', width: 170 },
    { prop: 'eventStartTime', label: '事件开始时间', width: 170 },
    { prop: 'eventEndTime', label: '警情/行驶结束时间', width: 170 },
    { prop: 'persistTimeZH', label: '持续时长' },
    { prop: 'eventStatusString', label: '事件状态' },
    { prop: 'hasManualString', label: '处理状态' },
    { prop: 'eventDesc', label: '事件描述' },
    // { prop: "outTime", label: "是否过期" , formatter:(row)=> row.outTime? (<p class="danger">是</p>): '否'},
  ],
  headBtns: [
    // {
    //     name: '刷新',
    //     type: 'switch',
    //     width: 64,
    //     value: 0,
    //     activeText: '刷新',
    //     inactiveText: '不刷新',
    //     formatter: () => proxy.$store.getters.permissions['watch-sjgz-zdsxkg'],
    //     change: (val) => {
    //         console.log(val, 'change')
    //         if (val) {
    //             timer = setInterval(() => contentMainRef.getTable(), 10000)
    //         } else {
    //             clearInterval(timer)
    //         }
    //     },
    // },
    {
      name: '人工处理',
      formatter: () => proxy.$store.getters.permissions['watch-sjgz-rgclan'],
      click: () => {
        list = contentMainRef.getAllCheck()
        console.log(list, 'list')
        if (list.length <= 0) {
          ElMessage.warning('请至少选择一行')
          return
        }
        list = list.filter((it) => it.eventStatus !== 0)
        if (list.length <= 0) {
          ElMessage.warning('请至少选择一行不为无效警情的')
          return
        }
        manualHandleVisible = true
        ManualRef && ManualRef.resetForm()
        // console.log(list, '人工处理')
      },
    },
    {
      icon: '',
      name: '统计报表',
      formatter: () => proxy.$store.getters.permissions['watch-sjgz-export'],
      click: () => {
        let lists = contentMainRef.getAllCheck()
        // console.log(lists, 'lists')
        let ids = proxy.$_.map(lists, 'alarmEventId')

        proxy.MessageBox({ msg: '请确定导出报表统计数据吗？', type: 'warning' }).then((close) => {
          exportAlarmStatistics({
            ...mainData.formData,
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
    {
      icon: 'daochu',
      name: '导出',
      formatter: () => proxy.$store.getters.permissions['watch-sjgz-export'],
      click: () => {
        let lists = contentMainRef.getAllCheck()
        // console.log(lists, 'lists')
        let ids = proxy.$_.map(lists, 'alarmEventId')
        let txt = ids.length > 0 ? `请确定导出选中的${ids.length}条数据吗？` : `请确定导出全部数据`
        proxy.MessageBox({ msg: txt, type: 'warning' }).then((close) => {
          eventTrackExport({
            ...mainData.formData,
            ...{ ids: ids },
          })
            .then((res) => {
              if (res === null) {
                ElMessage.success('新建导出任务成功，请到消息->导出列表中可以查看进度!')
              }
              // window.open(res.fileUrl)
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
          title = `详情`
          // console.log(dialogRef, 'dialogRef')
          // 根据报警类型控制是否需要展示视频和图片列表
          console.error(row.alarmTypeCode, row.alarmTypeName, 'rowwww')
          let obj = row
          // 司机违规需要展示视频标记
          if (row.alarmTypeCode === '2') {
            obj = { ...row, showVideoMark: true }
          }
          dialogRef.show(obj)
        },
      },
    ],
  },
  formData: {
    alarmLevel: 0,
    alarmLevelMapList: [], // { "alarmLevel": 2, "alarmSubLevel": 10 }, { "alarmLevel": 2, "alarmSubLevel": 20 }, { "alarmLevel": 2, "alarmSubLevel": 30 }
    alarmTypeCodeList: [],
    companyId: null,
    companyName: '',
    driverWarningTypeList: [],
    endTime: '',
    eventPersistSeconds: 0,
    newEventPersistSeconds: proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
    eventStatusList: [],
    hasManual: undefined,
    operatorId: null,
    order: '',
    orderField: '',
    pageNumber: 1,
    pageSize: 25,
    startTime: proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
    type: '',
    typeId: '',
    typeIdList: [],
    vehicleCode: '',
    vehicleOperateTypeIdList: [],
  },
  extraField: [
    {
      key: 'eventPersistSeconds',
      value: 0,
    },
  ],
  // objectToBaseTypeKey: ['typeIdList', 'orgId'], // 默认对象数组, 1表示值数组
  lists: [
    {
      label: '组织结构',
      key: 'typeIdList',
      showCheckbox: true,
      placeholder: '请输入组织结构',
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
      label: '事件状态',
      key: 'eventStatusList',
      type: 'select',
      multiple: true,
      filter: 'eventStatus',
      placeholder: '请选择事件状态',
    },
    {
      label: '车牌号',
      key: 'vehicleCode',
      type: 'select',
      remote: true,
      url: '/business/vehicle/associationPlateNum',
      method: 'post',
      loadMore: true,
      params: {
        pageNumber: 1,
        pageSize: 25,
        valid: 1,
        havePermission: true,
      },
      props: { label: 'plateNum', value: 'vehicleCode' },
      placeholder: '请选择车牌号码',
    },
    {
      label: '营运类型',
      key: 'vehicleOperateTypeIdList',
      type: 'allSelect',
      width: 170,
      remote: true,
      url: '/system/vehicleOperateType/getTreeIdList',
      method: 'get',
      loadMore: true,
      // params: {},
      // props: {},
      placeholder: '请选择营运类型',
    },
    {
      label: '报警级别',
      key: 'alarmLevelMapList',
      type: 'allSelect',
      filter: 'eventAlarmTypes',
      placeholder: '请选择报警级别',
      mutex: false,
      returnObjectInArray: true, // 返回数组里面的每一项是否是对象
      returnObjectKeys: ['alarmLevel', 'alarmSubLevel'], // [0]是大类值字段，[1]是子类值字段
    },
    {
      label: '报警类型',
      key: 'alarmTypeCodeList',
      type: 'allSelect',
      filter: 'alarmModeTypes',
      placeholder: '请选择报警类型',
      width: 760,
    },
    {
      label: '持续时长',
      key: 'newEventPersistSeconds',
      type: 'time',
      placeholder: '00:00:00',
      change: (timeString: any) => {
        // console.log(timeString, 'eventPersistSeconds change')
        // 当点击清除图标时timeSring 为null，则需要还原默认值，以解决点击清除时间后再次聚焦自动获取当前时间的问题
        if (timeString === null) {
          mainData.formData.newEventPersistSeconds = proxy.$dayjs().format('YYYY-MM-DD 00:00:00')
        }
        const time = proxy.$dayjs(proxy.$dayjs(timeString).format('HH:mm:ss'), 'hh:mm:ss')
        const startOfDay = proxy.$dayjs().startOf('day')
        const diff = time.diff(startOfDay, 'second')
        // console.log(diff, 'diff')
        mainData.formData.eventPersistSeconds = diff
      },
    },
    {
      label: '运营商',
      key: 'operatorId',
      type: 'select',
      remote: true,
      url: '/business/operatorEntity/listAssociateOperator',
      method: 'get',
      params: { havePermission: true },
      props: { label: 'name', value: 'id' },
      placeholder: '请选择运营商名称',
    },
    {
      label: '处理状态',
      key: 'hasManual',
      type: 'select',
      filter: 'eventHandleStatus',
      all: true,
    },
    // {label: '企业名称', key: 'companyId', type:'select', remote: true, url: '/business/company/associateCompany', method: 'post', params: {havePermission: true}, props:{ label: 'companyName', value:'companyId'}, placeholder: '请选择企业名称'},
    {
      label: '企业名称',
      key: 'companyId',
      type: 'select',
      remote: true,
      url: '/business/company/associateCompany',
      method: 'post',
      params: { havePermission: true },
      props: { label: 'companyName', value: 'companyId' },
      placeholder: '请选择企业名称',
      change: (val, formData, item) => {
        let obj = item.children.filter((it) => it.companyId === val)
        // console.log(obj, item, 'val companyId')
        mainData.formData.companyName = obj[0]?.companyName
      },
    },
    {
      label: '时间范围',
      key: ['startTime', 'endTime'],
      type: 'esDate',
      data: { type: 'datetime' },
      col: 8,
    },
  ],
})

/**
 * @description 获取报警级别大类型是否互斥控制标识，互斥则不能同时选择
 */
const getIsDivide = () => {
  getIsDivideTable({}).then((res) => {
    // console.log(res, 'getIsDivideTable')
    if (res) {
      mainData.lists[4].mutex = true
    }
  })
}
getIsDivide()

// 人工处理弹窗显示
let manualHandleVisible = $ref(false)

const onClose = () => {
  manualHandleVisible = false
}

let refreshValue = $ref(false)
let timer = null // 定时刷新列表定时器

const onRefreshChange = (val) => {
  // console.log(val,'onRefreshChange')
  if (val) {
    timer = setInterval(() => getTable(), 10000)
  } else {
    clearInterval(timer)
  }
}

const checkSelect = (val) => {
  // console.log(val, 'val checkSelect')
}
const getTable = () => {
  contentMainRef.getTable()
}
</script>

<style scoped lang="scss"></style>
