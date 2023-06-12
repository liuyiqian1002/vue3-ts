<template>
  <div>
    <div class="form-wrapper">
      <tw-form
        v-if="mainData.lists"
        :lists="mainData.lists || []"
        :formData="mainData.formData"
        :labelWidth="mainData.labelWidth"
        :isFormBnts="mainData.isFormBnts"
        :extraField="mainData.extraField"
        @submitForm="seekTable"
        :foldNumber="mainData.foldNumber || 4"
        @onFormflag="onFormflag"
      ></tw-form>
    </div>
    <div class="map-wrapper">
      <div id="map" style="width: 100%; height: 750px"></div>
      <div class="tab-wrapper">
        <el-tabs type="border-card" v-model="activeName" class="demo-tabs" @tab-click="handleTabClick">
          <el-tab-pane label="绘制区域查车" name="draw">
            <div class="button-group">
              <div><input id="searchInput" placeholder="搜索区域" /></div>
              <!-- <div type="hidden" value="鼠标绘制线" id="polygon">绘制线</div> -->
              <div value="鼠标绘制矩形" id="rectangle">绘制矩形</div>
              <!-- <input type="button" class="button" value="鼠标绘制圈" id="circle"/> -->
            </div>
          </el-tab-pane>
          <el-tab-pane label="按行政区域查车" name="district">
            <div class="district-group">
              <div>
                <button class="btn btntips" style="outline: none">
                  省：
                  <el-select v-model="province" class="m-2" placeholder="请选择省">
                    <el-option v-for="item in provinceOptions" :key="item.adcode" :label="item.name" :value="JSON.stringify(item)" />
                  </el-select>
                  市：
                  <el-select v-model="city" class="m-2" placeholder="请选择市" clearable>
                    <el-option v-for="item in cityOptions" :key="item.code" :label="item.name" :value="JSON.stringify(item)" />
                  </el-select>
                  区：
                  <el-select v-model="area" class="m-2" placeholder="请选择区" clearable>
                    <el-option v-for="item in areaOptions" :key="item.code" :label="item.name" :value="JSON.stringify(item)" />
                  </el-select>
                  <el-button class="search-btn" type="primary" style="outline: none" id="query" @click="onAreaSearch">
                    <i class="iconfont icon-sousuo1"></i>
                    搜索
                  </el-button>
                </button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- <div class="tools-right-wrapper" v-if="activeName === 'draw'">
        <input id="searchInput" placeholder="搜索区域" />
      </div> -->
    </div>
    <!--    区域查车结果弹窗    -->
    <result ref="resultRef" :title="title"></result>
  </div>
</template>

<script setup lang="tsx">
// import { getAreaDtoListByParentCode, getAreaList } from '@/api/common'
// import { pageDistrictArea } from '@/api/operation/cars/areasearch';
import result from './result/index.vue'

let title = $ref('')
// let contentMainRef = $ref(null)
let resultRef = $ref(null)
let { proxy } = getCurrentInstance()

const centerPoint = [114.3, 30.6]
let activeName = $ref('draw')
const handleTabClick = (e) => {
  console.log(e.props, 'eee')
  if (e.props.name === 'district' && provinceOptions.length === 0) {
    getAreaData()
  }
}

//TODO 这里可以做成组件配置
// const disabledAfterToday = (date) => {
//   const today = proxy.$dayjs() // 获取今天的日期
//   const isAfterToday = proxy.$dayjs(date).isAfter(today, 'day')
//   if (isAfterToday) {
//     return true
//   } else {
//     return false
//   }
// }

let mainData = reactive({
  isFormBnts: false,
  formData: {
    leftTopPoint: '',
    rightBottomPoint: '',
    plateNum: '', // 车牌号
    areaCode: '',
    areaLevel: 0,
    endTime: '',
    order: '',
    orderField: '',
    orgId: '',
    orgType: '',
    pageNumber: 1,
    pageSize: 25,
    startTime: '',
    vehicleList: [],
    vehicleOperateTypeList: [],
  },
  lists: [
    {
      label: '车牌号',
      key: 'plateNum',
      type: 'select',
      remote: true,
      url: '/business/vehicle/associationPlateNum',
      method: 'post',
      loadMore: true,
      params: { pageNumber: 1, pageSize: 25, havePermission: true },
      props: { label: 'plateNum', value: 'vehicleCode' },
      placeholder: '请选择车牌号码',
      col: 5,
    },
    {
      label: '时间范围',
      key: ['startTime', 'endTime'],
      type: 'esDate',
      data: { type: 'datetime' },
      col: 8,
      disabledDate: proxy.disabledAfterToday,
      endDisabledDate: proxy.disabledAfterToday,
    },
    {
      label: '组织结构',
      key: 'orgId',
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
      col: 5,
    },
    {
      label: '营运类型',
      key: 'vehicleOperateTypeList',
      type: 'select',
      multiple: true,
      remote: true,
      url: '/system/vehicleOperateType/getListByName',
      method: 'get',
      params: {},
      props: { label: 'typeName', value: 'typeCode' },
      placeholder: '请选择营运类型',
      col: 5,
    },
  ],
})

let province = $ref('')
let city = $ref('')
let area = $ref('')
let provinceOptions = $ref([])
let cityOptions = $ref([])
let areaOptions = $ref([])

let switchCheck: Boolean = inject('switchCheck')
watch(switchCheck, (val) => {
  console.log(switchCheck, 'switchCheck')
  if (val) {
    map.setMapStyle('amap://styles/dark')
  } else {
    map.setMapStyle('amap://styles/macaron')
  }
})

// const getAreaListBy = () => {
//   getAreaList({ keyword: '', level: 1 }).then((res) => {
//     console.log(res, 'province')
//     res && (provinceOptions = res)
//   })
// }
watch(
  () => province,
  (val) => {
    if (val) {
      console.log(val, 'province')
      val && search(JSON.parse(val))
    }
  },
)
watch(
  () => city,
  (val) => {
    if (val) {
      console.log(val, 'city')
      val && search(JSON.parse(val))
    }
  },
)
watch(
  () => area,
  (val) => {
    val && search(JSON.parse(val))
    // 查询TODO?
  },
)

// const getAreaListByParentCode = (code, type: number) => {
//   getAreaDtoListByParentCode(code).then((res) => {
//     if (!res) {
//       console.log('没数据')
//       return
//     }
//     if (type === 1) {
//       cityOptions = res
//     } else {
//       areaOptions = res
//     }
//   })
// }
// getAreaListBy()

const onAreaSearch = () => {
  console.log('onAreaSearch')
  if (!validParams()) {
    return
  }
  if (area) {
    let areaObj = JSON.parse(area)
    mainData.formData.areaCode = areaObj.adcode
    mainData.formData.areaLevel = 3
  } else if (city) {
    let cityObj = JSON.parse(city)
    mainData.formData.areaCode = cityObj.adcode
    mainData.formData.areaLevel = 2
  } else {
    // 请选择一个城市或者区域提示
    ElMessage.warning('请选择一个市级别区域!')
    return
  }
  resultRef && resultRef.show([], mainData.formData, 2)
  // pageDistrictArea(mainData.formData).then(res => {
  //     console.log(res)
  //     if(!res) {
  //         ElMessage.warning('暂无数据!')
  //         return
  //     }

  // })
}

const validParams = () => {
  console.log(mainData.formData, 'mainData.formData')
  if (!mainData.formData.startTime || mainData.formData.startTime === '') {
    ElMessage.warning('请选择开始时间')
    return false
  }
  if (!mainData.formData.endTime || mainData.formData.endTime === '') {
    ElMessage.warning('请选择结束时间')
    return false
  }
  if (mainData.formData.startTime === mainData.formData.endTime) {
    ElMessage.warning('结束时间不能等于开始时间')
    return false
  }
  if (proxy.$dayjs(mainData.formData.startTime).isAfter(proxy.$dayjs(mainData.formData.endTime))) {
    ElMessage.warning('结束时间不能小于开始时间')
    return false
  }
  return true
}

let map = null
let district = null
let polygons = []
onMounted(() => {
  // 地图代码
  let editor = {},
    arr = [],
    mapLayer = null,
    mouseTool = null,
    areaLevel = null,
    areaCode = null
  // var points = ''
  // var lng_lat_str = ''
  nextTick(() => {
    map = new AMap.Map(document.querySelector('#map'), {
      center: centerPoint,
      zoom: 11,
    })

    //加载AMap.MouseTool插件
    AMap.plugin(['AMap.MouseTool'], function () {
      mouseTool = new AMap.MouseTool(map)
    })

    // //首次绘制多边型
    // AMap.event.addDomListener(document.getElementById('polygon'), 'click', function () {
    //     clearMap();
    //     mouseTool.polygon();
    //     map.setDefaultCursor("crosshair");
    // }, false);

    // //首次绘制矩形
    AMap.event?.addDomListener(
      document.getElementById('rectangle'),
      'click',
      function () {
        console.log('rectangle')
        clearMap()
        map.setDefaultCursor('crosshair')
        mouseTool.rectangle()
      },
      false,
    )
    AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
      //回调函数
      //实例化Autocomplete
      let autoOptions = {
        input: 'searchInput', //使用联想输入的input的id
      }
      let autocomplete = new AMap.Autocomplete(autoOptions)
      let placeSearch = new AMap.PlaceSearch({
        map: map,
      })
      AMap.event.addListener(autocomplete, 'select', function (e) {
        placeSearch.search(e.poi.name)
      })
    })

    // //绘制完成
    AMap.event?.addListener(mouseTool, 'draw', function (e) {
      //添加事件
      map.setDefaultCursor('pointer')
      var po = e.obj.toString().split(';')
      po.forEach(function (n, i) {
        var item = n.split(',')
        arr.push([item[0], item[1]])
      })
      console.log(arr, 'arr')
      mouseTool.close(true)
      if (!validParams()) {
        return
      }
      resultRef && resultRef.show(arr, mainData.formData)
      editor._polygon = (function () {
        mapLayer = new AMap.Polygon({
          map: map,
          path: arr,
          strokeColor: '#0000ff',
          strokeOpacity: 1,
          strokeWeight: 3,
          fillColor: '#f5deb3',
          fillOpacity: 0.35,
        })
        return mapLayer
      })()
      // 加载AMap.PolyEditor插件
      map.plugin(['AMap.PolyEditor'], function () {
        editor._polygonEditor = new AMap.PolyEditor(map, editor._polygon)
        //编辑多边形打开
        // editor._polygonEditor.open();
      })
      //   lng_lat_str = ''
    })
  })

  function clearMap() {
    for (var i = 0, l = polygons.length; i < l; i++) {
      polygons[i].setMap(null)
    }

    arr = [] //数组清空
    if (mapLayer != null) {
      editor._polygonEditor.close()
      mapLayer.setMap(null) //清除页面多边形
    }
  }
})

const getAreaData = () => {
  //行政区划查询
  let opts = {
    subdistrict: 1, //返回下一级行政区
    showbiz: false, //最后一级返回街道信息
  }
  map.plugin(['AMap.DistrictSearch'], function () {
    district = new AMap.DistrictSearch(opts) //注意：需要使用插件同步下发功能才能这样直接使用
    district.search('中国', function (status, result) {
      console.log(result, 'result')
      if (status == 'complete') {
        getData(result.districtList[0])
      }
    })
  })
}

function getData(data, level?: any) {
  console.log(data, 'getData')
  var bounds = data.boundaries
  if (bounds) {
    var lng_lat = []
    if (bounds && bounds.length > 0) {
      lng_lat = bounds[0]
      for (var i = 0; i < bounds.length; i++) {
        if (bounds[i].length > lng_lat.length) {
          lng_lat = bounds[i]
        }
      }
    }
    if (lng_lat) {
      var newPointList = []
      if (lng_lat.length > 2000) {
        for (var i = 0; i < lng_lat.length; i++) {
          if (i % 20 == 0) {
            newPointList.push(lng_lat[i].lng + ',' + lng_lat[i].lat)
          }
        }
        // lng_lat_str = newPointList.join(';')
      } else {
        // lng_lat_str = lng_lat.join(';')
      }
    }
    var polygon = new AMap.Polygon({
      map: map,
      strokeWeight: 1,
      strokeColor: '#CC66CC',
      fillColor: '#CCF3FF',
      fillOpacity: 0.5,
      path: lng_lat,
    })
    polygons.push(polygon)
    for (var i = 0, l = bounds.length; i < l; i++) {
      var polygon = new AMap.Polygon({
        map: map,
        strokeWeight: 1,
        strokeColor: '#CC66CC',
        fillColor: '#CCF3FF',
        fillOpacity: 0.5,
        path: bounds[i],
      })
      polygons.push(polygon)
    }
    //地图自适应
    map.setFitView()
  }
  if (data.level === 'country') {
    provinceOptions = data.districtList
    cityOptions = []
    areaOptions = []
    province = ''
    city = ''
    area = ''
  } else if (data.level === 'province') {
    cityOptions = data.districtList
    areaOptions = []
    city = ''
    area = ''
  } else if (data.level === 'city') {
    if (data.districtList[0].level === 'district') {
      areaOptions = data.districtList
    } else {
      areaOptions = []
    }
    area = ''
  }
}

function search(obj) {
  console.log(obj, 'search')
  //清除地图上所有覆盖物
  for (var i = 0, l = polygons.length; i < l; i++) {
    polygons[i].setMap(null)
  }
  //   var option = obj[obj.options.selectedIndex]
  // 关键字
  //   var keyword = option.text
  var adcode = obj.adcode
  //行政区级别
  district.setLevel(obj.level)
  district.setExtensions('all')
  //行政区查询
  //按照adcode进行查询可以保证数据返回的唯一性
  district.search(adcode, function (status, result) {
    if (status === 'complete') {
      getData(result.districtList[0], obj.id)
    }
  })
}
function setCenter(obj) {
  map.setCenter(obj[obj.options.selectedIndex].center)
}
</script>

<style scoped lang="scss">
.form-wrapper {
  margin-top: 20px;
}

.map-wrapper {
  position: relative;
  .tools-right-wrapper {
    position: absolute;
    top: 10px;
    right: 150px;
  }
  .tab-wrapper {
    z-index: 1000;
    top: 10px;
    position: absolute;
    left: 30px;
    // right: 30px;
    // background-color: rgb(247, 246, 245);
    // padding: 0 10px 20px 10px;
    .button-group {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      #searchInput {
        margin-right: 20px;
        height: 24px;
      }
      #rectangle {
        border: 1px solid #eee;
        padding: 8px 10px;
        background: #1ab394;
        color: #fff;
        width: 60px;
        border-radius: 3px;
        cursor: pointer;
      }
    }

    .district-group {
      .btntips {
        padding: 5px;
        border: none;
        background: var(--el-bg-color);

        .search-btn {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
