<template>
  <div class="map-gaode-wrapper" :style="{ height: height }">
    <div id="commonMap" v-loading="mapLoading" element-loading-background="rgba(122, 122, 122, 0.8)" class="map-content-wrapper w positionTl"></div>
    <div class="tools-left-wrapper">
      <div class="route-clear" @click="onRouteClick">
        <!-- <el-icon style="color: #176cba">
          <Delete />
        </el-icon> -->
        <div style="padding: 6px 12px; border: 1px solid transparent; background: #fff">
          <el-image class="img" style="width: 20px; height: 20px" :src="clearImg"></el-image>
        </div>
      </div>
    </div>
    <div class="tools-right-wrapper">
      <div class="input-search" v-if="inputSearch">
        <!-- <el-input id="search_input" placeholder="区域搜索"></el-input> -->
        <input id="search_input" placeholder="搜索区域" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import clearImg from '@/assets/images/deleteTack.png'
const { height, showToolBar, inputSearch } = defineProps({
  height: String,
  showToolBar: Boolean,
  inputSearch: { type: Boolean, default: false },
})
const proxy: any = getCurrentInstance()?.proxy

let mapLoading = $ref(false)

// 地图
let map
const initMap = (layers?: any, zoom?: any, center?: any) => {
  // console.log(isInit, document.querySelector('#commonMap'), 'isInitMap')
  //@ts-ignore
  map = new AMap.Map(document.querySelector('#commonMap'), {
    resizeEnable: true,
    // center: center ? center : CONFIG.latLng,//108.3628,22.8150
    center: center || [114.304569, 30.593354], //108.3628,22.8150
    layers: layers,
    zoom: zoom || 6, //设置初始化级别
    // zooms:[3,18], //设置缩放级别范围 3-18 级
  })

  map.plugin(['AMap.MouseTool', 'AMap.RangingTool'], function () {
    //鼠标工具插件
    map.on('click', function (e) {
      let cursor = map.getDefaultCursor()
      if (cursor === 'zoom-in') {
        map.zoomIn()
      } else if (cursor === 'zoom-out') {
        map.zoomOut()
      }
    })
  })
  map.plugin(['AMap.ToolBar'], function () {
    if (showToolBar) {
      map.addControl(new AMap.ToolBar())
    }
  })
  // 搜索区域
  if (inputSearch) {
    map.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
      //回调函数
      //实例化Autocomplete
      let autoOptions = {
        input: 'search_input', //使用联想输入的input的id
      }
      let autocomplete = new AMap.Autocomplete(autoOptions)
      var placeSearch = new AMap.PlaceSearch({
        map: map,
      })
      AMap.event.addListener(autocomplete, 'select', function (e) {
        placeSearch.search(e.poi.name)
      })
    })
  }
  isInit = true
  // console.log(map, 'map instance')
  return map
}

let _pathData: Array<Array<number>> = [
  // [114.304569, 30.593354],
  // [114.204569, 30.493354],
  // [114.104569, 30.393354],
] // 测试数据
let _pathDataRoute: Array<Array<number>> = []
let pathSimplifierIns = null
let navg0 = null
// 轨迹实例
const initPath = (PathSimplifier) => {
  // console.log(_pathData.length, _pathDataRoute?.length, 'initPath length')
  let colors = [
    '#dc3912',
    'green',
    '#ff9900',
    '#109618',
    '#990099',
    '#0099c6',
    '#dd4477',
    '#66aa00',
    '#b82e2e',
    '#316395',
    '#994499',
    '#22aa99',
    '#aaaa11',
    '#6633cc',
    '#e67300',
    '#8b0707',
    '#651067',
    '#329262',
    '#5574a6',
    '#3b3eac',
  ]
  //创建组件实例
  if (pathSimplifierIns) {
    pathSimplifierIns.clearPathNavigators()
    // pathSimplifierIns.hide()
    pathSimplifierIns.destroy()
    pathSimplifierIns.setData([])
    pathSimplifierIns = null
  }
  pathSimplifierIns = new PathSimplifier({
    zIndex: 100,
    map: map, //所属的地图实例
    getPath: function (pathData, pathIndex) {
      // console.log(pathData, 'pathData')
      //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
      return pathData.path
    },
    getHoverTitle: function (pathData, pathIndex, pointIndex) {
      return null
    },
    renderOptions: {
      //轨迹线的样式
      pathLineStyle: {
        //strokeStyle: 'red',
        //lineWidth: 6,
        dirArrowStyle: false,
      },
      getPathStyle: function (pathItem, zoom) {
        let color = colors[pathItem.pathIndex]

        return {
          pathLineStyle: {
            strokeStyle: color,
            lineWidth: 6,
          },
          pathLineSelectedStyle: {
            strokeStyle: color,
            lineWidth: 6,
          },
          pathNavigatorStyle: {
            fillStyle: color,
          },
          pathLineHoverStyle: {
            lineWidth: 3,
            strokeStyle: color,
            borderWidth: 1,
            dirArrowStyle: false,
          },
        }
      },
    },
  })

  //这里构建两条简单的轨迹，仅作示例
  pathSimplifierIns.setData([
    //轨迹1
    {
      name: '车辆轨迹',
      //path:pathData,
      path: _pathData,
    },
    {
      name: '线路',
      path: _pathDataRoute,
    },
  ])

  //创建一个巡航器
  navg0 = pathSimplifierIns.createPathNavigator(
    0, //关联第1条轨迹
    {
      loop: true, //循环播放
      speed: 600,
    },
  )
  navg0.start()

  if (_pathDataRoute != null && _pathDataRoute.length > 0) {
    // console.log(_pathData, _pathDataRoute, 'enter pathDataRoute')
    let navg1 = pathSimplifierIns.createPathNavigator(
      1, //关联第2条轨迹
      {
        loop: false, //循环播放
        speed: 600,
        pathNavigatorStyle: {
          autoRotate: false, //禁止调整方向
          pathLinePassedStyle: null,
          width: 24,
          height: 24,
          //content: PathSimplifier.Render.Canvas.getImageContent('./imgs/car-front.png', null, null),
          strokeStyle: null,
          fillStyle: null,
        },
      },
    )
    navg1.start()
  }
}

// 加载轨迹回放
const loadTrack = (pathData) => {
  // console.log(pathData.length, pathDataRoute?.length, 'enter loadTrack')
  // map && map.clearMap()
  _pathData = pathData
  // _pathDataRoute = pathDataRoute
  //@ts-ignore
  AMapUI.load(['ui/misc/PathSimplifier'], function (PathSimplifier) {
    if (!PathSimplifier.supportCanvas) {
      // layer.msg('当前环境不支持 Canvas！')
      return
    }
    //启动页面
    initPath(PathSimplifier)
    // setTimeout(() => {
    //   initPath(PathSimplifier)
    // }, 100);
  })
}

const setTrackData = (pathDataRoute) => {
  console.log(pathDataRoute.length, 'setTrack')
  if (!pathDataRoute) {
    console.error('没有数据')
    return
  }
  _pathDataRoute = pathDataRoute
  if (pathSimplifierIns) {
    // console.log(pathSimplifierIns.getData, pathDataRoute, 'setTrack')
    pathSimplifierIns.setData([
      {
        name: '车辆轨迹',
        //path:pathData,
        path: _pathData,
      },
      {
        name: '线路',
        path: pathDataRoute,
      },
    ])
    navg0 = pathSimplifierIns.createPathNavigator(
      0, //关联第1条轨迹
      {
        loop: true, //循环播放
        speed: 600,
      },
    )
    navg0.start()
  } else {
    AMapUI.load(['ui/misc/PathSimplifier'], function (PathSimplifier) {
      if (!PathSimplifier.supportCanvas) {
        // layer.msg('当前环境不支持 Canvas！')
        return
      }
      //启动页面
      initPath(PathSimplifier)
      // setTimeout(() => {
      //   initPath(PathSimplifier)
      // }, 100);
    })
  }
}

// let polygons = []
const drawer = (arr) => {
  console.log(arr, 'drawer')
  let polygon = new AMap.Polygon({
    path: arr, //设置多边形边界路径
    strokeColor: '#0000ff', //线颜色
    strokeOpacity: 0.5, //线透明度
    strokeWeight: 3, //线宽
    fillColor: '#359ef4', //填充色
    fillOpacity: 0.35, //填充透明度
  })
  console.log(polygon.setMap(map), 'polygon')
  setTimeout(() => {polygon.setMap(map)})
}
// let arrDemo = JSON.parse('[[["112.431762","30.357923"],["112.43137","30.356336"],["112.434466","30.355729"],["112.434884","30.35759"],["112.434884","30.35759"]]]')
// drawer(arrDemo)
/**
 * @description 清除地图
 */
const clearMap = () => {
  console.log('enter clearMap')
  _pathDataRoute = []
  if (pathSimplifierIns) {
    pathSimplifierIns.clearPathNavigators()
    // pathSimplifierIns.hide()
    pathSimplifierIns.setData([])
    pathSimplifierIns.destroy()
    pathSimplifierIns = null
  }
  map.clearMap()
}

let AllMarker = []
/**
 * @description 添加标记
 * @param row
 */
// 视频弹窗-警情列表-地图标记 TODO 可做成通用标记
const addMarker = (row) => {
  let marker = new AMap.Marker({
    icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
    position: [row.longitude, row.latitude],
    animation: 'AMAP_ANIMATION_DROP',
    extData: row.primaryId,
  })
  marker.setMap(map)
  let speedLimit = '-'
  if (row.speedLimit != null) {
    speedLimit = row.speedLimit
  }
  marker.setLabel({
    //label默认蓝框白底左上角显示，样式className为：amap-marker-label
    offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
    content: 'GPS时间：' + row.gpsTime + ',速度：' + row.runningSpeed + ',限速：' + speedLimit,
  })
  AllMarker.push(marker)
}
// const clearPolygons = () => {
//     polygons.map(it => {
//         it.clear()
//     })
//     polygons = []
// }

const fenceDraw = (fenceConfigurationDto) => {
  if (fenceConfigurationDto && fenceConfigurationDto != '') {
    var item = JSON.parse(fenceConfigurationDto)
    if (item.shapeType === '1') {
      new AMap.Circle({
        map: map,
        center: [item.centerLongitude, item.centerLatitude],
        radius: item.radius,
        strokeColor: '#0000ff',
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: '#f5deb3',
        fillOpacity: 0.35,
      })
      map.setCenter([item.centerLongitude, item.centerLatitude])
    }
    if (item.shapeType === '2') {
      let southWest = new AMap.LngLat(item.leftTopLongitude, item.leftTopLatitude)
      let northEast = new AMap.LngLat(item.rightBottomLongitude, item.rightBottomLatitude)
      let bounds = new AMap.Bounds(southWest, northEast)
      new AMap.Rectangle({
        map: map,
        bounds: bounds,
        strokeColor: '#0000ff',
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: '#f5deb3',
        fillOpacity: 0.35,
      })

      map.setCenter(southWest)
    }
    if (item.shapeType === '3') {
      let paths = []
      for (let i = 0; i < item.polygonPaths.length; i++) {
        let point = item.polygonPaths[i]
        paths.push([point.longitude, point.latitude])
      }

      new AMap.Polygon({
        map: map,
        path: paths,
        strokeColor: '#0000ff',
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: '#f5deb3',
        fillOpacity: 0.35,
      })

      map.setCenter(paths[0])
    }
  }
}

const onRouteClick = () => {
  map.clearMap()
}

let isInit = false
onMounted(() => {
  if (!isInit) {
    nextTick(() => {
      initMap()
    })
  }
})

defineExpose({ loadTrack, setTrackData, fenceDraw, drawer, addMarker, clearMap })
</script>

<style scoped lang="scss">
.amap-sug-result {
  z-index: 10000;
}
.map-gaode-wrapper {
  width: 100%;
  height: 300px;
  background: #fff;
  overflow: hidden;
  position: relative;

  #commonMap {
    height: 100%;
  }

  .tools-left-wrapper {
    position: absolute;
    top: 10px;
    left: 15px;

    .route-clear {
      cursor: pointer;
      font-size: 20px;
    }
  }
  .tools-right-wrapper {
    position: absolute;
    top: 10px;
    right: 30px;
  }
}
</style>
