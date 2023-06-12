<template>
  <div id="trackPattern_dongtai">
    <div style="height: 300px">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2
            :header-height="40"
            :row-height="40"
            :row-class="mainData.rowClassName"
            :columns="mainData.columns"
            :data="mainData.data"
            :cell-props="cellProps"
            :width="width"
            :height="height"
            size="small"
            fixed
          >
            <template #row="{ rowData }">
              <div
                class="el-table-v2__row-cell"
                role="cell"
                v-for="item in mainData.columns"
                :style="{ flex: '0 0 auto', width: `${item.width}px` }"
                @click="(e) => onRowClick(e, rowData)"
              >
                <div class="el-table-v2__cell-text" :title="rowData.vehicleStatusDesc" v-if="item.cellRenderer">{{ item.cellRenderer(rowData) }}</div>
                <div class="el-table-v2__cell-text" :title="rowData.locationName" v-else>{{ rowData[item.key] }}</div>
              </div>
            </template>
          </el-table-v2>
        </template>
      </el-auto-resizer>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ElAutoResizer } from 'element-plus'

import { getAddressByLocation, AddressByLocationQuery } from '@/api/dynamicMonitoring/eventTracking'
import { EventItem } from '../../types'

interface listItem extends AddressByLocationQuery {
  // latitude: number,
  // longitude: number,
  // primaryId: string,
  // locationName?: string
}

const { row, list } = defineProps<{
  row: EventItem
  list: { type: Array<listItem>; default: () => [] }
}>()

const cellProps = (props) => {
  console.log(props, 'cellProps')
  return {
    ['data-key']: '',
    onMouseenter: () => {
      console.log(props)
    },
    onMouseleave: () => {
      // kls.value = ''
    },
  }
}

let comParams = {
  eventStartTime: 0,
  eventEndTime: 0,
  alarmTypeName: '',
  eventStatus: 0
}
watch(() => row, (val) => {
  getComParamsByData(val)
})

const getComParamsByData = (data: any) => {
  comParams = {
    // eventBegTime: val.eventBegTime,
    eventEndTime: data.eventEndTime ? new Date(data.eventEndTime).getTime() : new Date().getTime(),
    alarmTypeName: data.alarmTypeName,
    // alarmLevelName: row.alarmLevelName,
    eventStartTime: new Date(data.eventStartTime).getTime(),
    eventStatus: data.eventStatus,
  }
  // 卫星定位漂移
  if (data.alarmTypeCode === '41') {
    // comParams.eventStartTime = new Date(row.eventBegTime).getTime()
    // console.log(val.eventOriginalTime, 'row.eventOriginalTime')
    comParams.eventStartTime = new Date(data.eventOriginalTime).getTime()
  }
  // 智能设备终端46,2,并且eventEndTime为空（事件未结束）
  if(['46','2'].includes(data.alarmTypeCode) && !data.eventEndTime) {
    comParams.eventEndTime = new Date(data.eventOriginalTime).getTime()
  }
}

if(row && row.alarmEventId) {
  getComParamsByData(row)
}

const rowClassName = (row1) => {
  let rowData = row1.rowData

  rowData.gpsTimestamp = new Date(rowData.gpsTime).getTime()
  //TODOIMe 除了超速，其他类型也需要判断
  
  const compTime = () => {
    if (row.eventStatus === 2) {
      return rowData.gpsTimestamp >= comParams.eventStartTime && rowData.gpsTimestamp < comParams.eventEndTime
    } else {
      return rowData.gpsTimestamp >= comParams.eventStartTime && rowData.gpsTimestamp <= comParams.eventEndTime
    }
  }
  if (compTime()) {
    // console.log(rowData, 'rowData')
    if (row.alarmLevelString.indexOf('报警') !== -1  || row.alarmLevelString.indexOf('严重') !== -1) {
      return 'danger'
    }
    if (row.alarmLevelString.indexOf('预警') !== -1) {
      return 'orange'
    }
    if (rowData.alarmTypeName) {
      if (row.alarmLevel === 2) {
        return 'danger'
      }
      if (row.alarmLevel === 1) {
        return 'orange'
      }
    }
  }
}

const emits = defineEmits(['onRowClick'])

const onRowClick = (e, rowData?: any) => {
  console.log(e.target, rowData, 'row info')
  emits('onRowClick', rowData)
}

const proxy: any = getCurrentInstance()?.proxy

let colsExt = []
let columns = []

const changeColumns = () => {
  if (row.alarmTypeCode === '32') {
    colsExt = [
      { width: 110, dataKey: 'speedLimit', key: 'speedLimit', title: '限速km/h',cellRenderer: (row) => {
        return row?.speedLimit ?? '-'
      } },
      { width: 110, dataKey: 'overSpeedType', key: 'overSpeedType', title: '阈值来源',cellRenderer: (row) => {
        return row?.overSpeedType ?? '-'
      } },
    ]
  } else {
    colsExt = []
  }

  columns = [
    // {title: '序号', width: 100, cellRenderer: (row) => row.rowIndex+1},
    // { width: 100, dataKey: 'plateNum', key: "plateNum", title: "车牌号"},
    { width: 180, dataKey: 'gpsTime', key: 'gpsTime', title: '卫星时间' },
    {
      width: 180,
      dataKey: 'receiveTime',
      key: 'receiveTime',
      title: '接收时间',
    },
    {
      width: 100,
      dataKey: 'runningSpeed',
      key: 'runningSpeed',
      title: '速度km/h',
    },
    // TODO 超速会有这两项
    ...colsExt,
    {
      width: 100,
      dataKey: 'totalDistance',
      key: 'totalDistance',
      title: '里程(km)',
    },
    {
      width: 120,
      dataKey: 'alarmTypeName',
      key: 'alarmTypeName',
      title: '报警类型',
    },
    {
      width: 300,
      dataKey: 'vehicleStatusDesc',
      key: 'vehicleStatusDesc',
      title: '车辆状态',
      cellRenderer: (row) => {
        // console.log(row)
        return row.vehicleStatusDesc
        // return (<div alt={row.vehicleStatusDesc}>{row.vehicleStatusDesc}</div>)
      }
    },
    // { width: 150, dataKey: 'alarmStatusName', key: "alarmStatusName", title: "报警状态" },
    // { width: 110, dataKey: 'limitedSpeed', key: "limitedSpeed", title: "限速km/h" },
    // { width: 150, dataKey: 'msg', key: "msg", title: "停车时长" },
    {
      width: 200,
      dataKey: 'locationName',
      key: 'locationName',
      title: '位置信息',
    },
    {
      width: 100,
      dataKey: 'isValid',
      key: 'isValid',
      title: '是否有效',
      // formatter: (row) => {
      //     console.log(row, 'row formatter')
      //     return (row.isValid ? '是' : '否')
      // },
      cellRenderer: (row) => {
        return row?.isValid ? '是' : '否'
      },
    },
  ]
  mainData.columns = columns
}

let mainData = reactive({
  data: [],
  rowClassName: rowClassName,
  columns: columns,
})
watch(
  () => list,
  (val) => {
    changeColumns()
    mainData.data = val as unknown as any[]
  },
)

// 获取位置信息
const getLocationInfo = (list: Array<listItem>) => {
  // console.log(list, 'getLocationInfo list')
  let query: Array<AddressByLocationQuery> = []
  list.forEach((el) => {
    query.push({
      latitude: el.latitude,
      longitude: el.longitude,
      primaryId: el.primaryId,
    })
  })
  getAddressByLocation(query).then((res) => {
    // console.log(res, mainData.data, 'res getAddressByLocation')
    if (res) {
      for (let i = 0; i < res.length; i++) {
        if (res[i]?.primaryId === mainData.data[i]?.primaryId) {
          mainData.data[i].locationName = res[i]?.locationName
        } else {
          if (res[i] && res[i] instanceof Array) {
            mainData.data[i].locationName = res[i]?.filter((it) => it.primaryId === mainData.data[i]?.primaryId)[0]?.locationName
          }
        }
      }
    }
  })
}

defineExpose({ getLocationInfo })
</script>

<style scoped lang="scss">
#trackPattern_dongtai {
  width: 100%;
}
</style>
