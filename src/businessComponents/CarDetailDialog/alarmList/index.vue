<template>
  <div class="alarm-list-wrapper">
    <div class="map-wrapper pl15">
      <mapGaode ref="mapGaodeRef"></mapGaode>
      <div class="fixed-box" v-if="currentWidget">
        <component :ref="'widgetRef'" :is="currentWidget" :row="row" :data="widgetInfo"></component>
      </div>
    </div>
    <div class="tab-wrapper">
      <el-tabs v-model="tabsValue" type="card" class="event-tabs w">
        <el-tab-pane v-for="item in tableTabs" :key="item.name" :label="item.title" :name="item.name" :closable="item.closable">
          <component ref="trackRecordRef" :is="item.conponent" :row="row" @onRowClick="onTrackRecordRowClick" :list="eventTrackList"></component>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import trackRecord from './trackRecord/index.vue'
import speedRecord from './speedRecord/index.vue'
import parkingTime from './parkingTime/index.vue'

import mapGaode from '@/businessComponents/mapGaode/index.vue'

import VideoWidget from './widget/video.vue'
import insertCardWidget from './widget/insertCard.vue'
import speedWayWidget from './widget/speedway.vue'
import { getEventTrackInfo } from '@/api/dynamicMonitoring/eventTracking'
import { AxiosResponse } from 'axios'
import { Res } from '../types'
import { findDriverChangeRecords } from '@/api/dynamicMonitoring/eventTracking'

const { row } = defineProps({
  row: Object,
})
const proxy: any = getCurrentInstance()?.proxy

let mapLoading = $ref(false)

let tabsValue = $ref('1')
let tableTabs = $ref([
  {
    title: '违规轨迹记录',
    name: '1',
    conponent: trackRecord,
    closable: false,
    ref: 'trackRecordRef',
  },
  {
    title: '轨迹速度记录',
    name: '2',
    conponent: speedRecord,
    closable: false,
    ref: 'speedRecordRef',
  },
  {
    title: '停车时长',
    name: '3',
    conponent: parkingTime,
    closable: false,
    ref: 'parkingTimeRef',
  },
])

let eventTrackList = $ref([])
let trackRecordRef = $ref(null)
watch(
  () => row,
  (val, oVal) => {
    if (oVal.eventId !== val.eventId) {
      mapGaodeRef.clearMap()
      getData()
      getWidgetInfo()
    }
  },
)
const getData = () => {
  //   console.log(1111111111111111111)
  const query = {
    alarmLevel: row.alarmLevel,
    eventId: row.eventId,
    eventEndTime: row.eventEndTime,
  }
  interface rowItem {
    longitude: number
    latitude: number
  }
  getEventTrackInfo(query).then((res: Res<rowItem> & AxiosResponse) => {
    if (res && res.rows) {
      eventTrackList = res.rows
      // console.log(res, eventTrackList, 'res getEventTrackInfo')
      // console.log(trackRecordRef[0], 'trackRecordRef')
      if (trackRecordRef && trackRecordRef[0] && trackRecordRef[0].getLocationInfo) {
        trackRecordRef[0].getLocationInfo(res.rows)
      } else {
        // throw new Error('trackRecordRef is not exist!')
        if (trackRecordRef && trackRecordRef.getLocationInfo) {
          trackRecordRef.getLocationInfo(res.rows)
        } else {
          console.error('trackRecordRef is not exist!')
        }
      }
      // TODO 遍历eventTrackList生成轨迹数据 _pathData
      _pathData = []
      res.rows.forEach((it) => {
        _pathData.push([it.longitude, it.latitude])
      })
      mapGaodeRef.loadTrack(_pathData)
    }
  })
}
getData()

const onTrackRecordRowClick = (rowData) => {
  mapGaodeRef.addMarker(rowData)
}

let mapGaodeRef = $ref(null)
let currentWidget = $ref(null)

// 根据类型判断 currentWidget
const jugdeType = () => {
  console.log(widgetInfo.routePoints ? 'routePoints exist' : null, 'jugdeType')
  // pathSimplifierIns && pathSimplifierIns.clearPathNavigators()
  // TODO
  const showVideos = ['46'] // 视频弹窗
  // const showSpeedways = [] // 高速
  // const insertCards = ['36'] // 插卡
  // 根据返回的字段判断
  if (widgetInfo?.speedwayEventInfoDto?.eventId) {
    currentWidget = speedWayWidget
  } else if (widgetInfo?.driverChangeCardRecords?.length > 0) {
    currentWidget = insertCardWidget
  } else if (widgetInfo?.forbiddenPoints) {
    // 进出区域
    _pathDataRoute = []
    mapGaodeRef.drawer(strToPoints(widgetInfo?.forbiddenPoints))
    currentWidget = null
  } else if (widgetInfo?.listParkAreaPoints) {
    // 停车区域
    _pathDataRoute = []
    mapGaodeRef.drawer(strToPoints(widgetInfo?.listParkAreaPoints))
    currentWidget = null
  } else if (widgetInfo?.routePoints) {
    // 线路
    // _pathDataRoute = tranferPoints(widgetInfo?.routePoints)
    // mapGaodeRef.loadTrack(_pathData, tranferPoints(widgetInfo?.routePoints))
    mapGaodeRef.setTrackData(tranferPoints(widgetInfo?.routePoints))
    currentWidget = null
  } else if (widgetInfo?.fenceConfigurationDto) {
    // fence配置
    mapGaodeRef.fenceDraw(widgetInfo?.fenceConfigurationDto)
    currentWidget = null
  } else if (showVideos.includes(row.alarmTypeCode)) {
    currentWidget = VideoWidget
  } else {
    currentWidget = null
  }
}


// 偏移路线点转换成经纬度点数组
const tranferPoints = (routePoints) => {
  let _pathDataRoute = []
  let routeList = routePoints.split('|')
  for (var i = 0; i < routeList.length; i++) {
    var polygonArr = routeList[i].split(';')
    for (var j = 0; j < polygonArr.length; j++) {
      var arr = new Array()
      if (polygonArr[j] != '') {
        arr.push(polygonArr[j].split(',')[0])
        arr.push(polygonArr[j].split(',')[1])
        _pathDataRoute.push(arr)
      }
    }
  }
  return _pathDataRoute
}

// 线路区域和停车区域 转换成经纬度点数组
const strToPoints = (pointsStr) => {
  let areas = pointsStr.split('|')
  let result = []
  if (areas && areas.length > 0) {
    areas.forEach((ele) => {
      if (ele && ele !== '') {
        // 回显
        // drawer(arr)
        let arr = []
        ele.split(';').map((point) => {
          let item = point.split(',')
          // console.log(point, item, 'point')
          if (item.length === 2) {
            arr.push([item[0], item[1]])
          }
        })
        result.push(arr)
      }
    })
  }
  console.error(JSON.stringify(result), 'result')
  return result
}

// 获取警情列表地图上弹窗信息
interface widgetInfo {
  driverChangeCardRecords?: any[] // 司机插卡
  fenceConfigurationDto?: object
  forbiddenPoints?: string // 禁行区域回显
  listParkAreaPoints?: string // 停车区域报警规划
  routePoints?: string
  speedwayEventInfoDto?: any // 高速脱离监控
}
let widgetInfo = $ref<widgetInfo>({})
const getWidgetInfo = () => {
  findDriverChangeRecords({ alarmEventId: row.alarmEventId }).then((res) => {
    // console.log(res, 'findDriverChangeRecords widgetInfo')
    widgetInfo = res
    jugdeType()
  })
}
getWidgetInfo()
defineExpose({ getData })

let _pathData: Array<Array<number>> = [] // 测试数据
let _pathDataRoute: Array<Array<number>> = []
// let pathSimplifierIns = null
</script>

<style scoped lang="scss">
.alarm-list-wrapper {
  background: #fff;
  overflow: hidden;

  .map-wrapper {
    width: 100%;
    height: 300px;
    position: relative;

    .map-content-wrapper {
      height: 300px;
    }

    .fixed-box {
      position: absolute;
      right: 30px;
      top: 20px;
      min-width: 250px;
      height: 250px;
      background: #fff;
    }
  }

  .tab-wrapper {
    overflow: hidden;
  }
}
</style>
