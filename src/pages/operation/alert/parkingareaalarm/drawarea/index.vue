<template>
  <div>
    <tw-drawer @handleClose="handleClose" :loading="loading" :title="title" width="100%" :isBtns="false" v-model="drawerFlag">
      <div class="content-wrapper">
        <div class="left-wrapper">
          <div class="head-wrapper">
            <div>
              <p>线路名称：{{ row.name }}</p>
            </div>
            <div>
              <p>时间范围：{{ `${row.startDate || ''}-${row.endDate || ''}` }}</p>
            </div>
          </div>
          <div>
            <editItem :formData="formData" @save="onSave" @reset="onReset" @delete="onDelete" @edit="onEdit"></editItem>
            <!-- <editItem :formData="formData" :idx="i" @save="(e) => onSave(i, it)" @delete="(e) => onDelete(i, it)" @edit="(e) => onEdit(i, it)"></editItem> -->
          </div>
          <div class="list-wrapper">
            <!-- <div class="list-item" v-for="(item, index) in areaList" :key="index">{{ item.name }}</div> -->
            <content-main-ext ref="contentMainRef" :mainData="mainData"></content-main-ext>
            <div class="search-btn">
              <el-button type="primary" @click="onSearch">搜索</el-button>
            </div>
          </div>
        </div>
        <div class="right-wrapper map-wrapper">
          <div id="map" style="width: 100%; height: 720px"></div>
          <div class="button-group">
            <div type="hidden" value="鼠标绘制线" id="polygon">鼠标绘制线</div>
            <!-- <div value="鼠标绘制矩形" id="rectangle">绘制矩形</div> -->
            <!-- <input type="button" class="button" value="鼠标绘制圈" id="circle"/> -->
          </div>
          <div class="tools-right-wrapper">
            <input id="searchInput" placeholder="搜索区域" />
          </div>
        </div>
      </div>
    </tw-drawer>
  </div>
</template>

<script setup lang="tsx">
import editItem from './edititem/index.vue'
import { getDetailByParkAreaId, parkAreaAlarmDetailAddOrUpdate, parkAreaAlarmDetailDelete } from '@/api/operation/alert/parkingareaalarm'

defineProps({
  title: String,
})
let { proxy } = getCurrentInstance()

const centerPoint = [114.3, 30.6]

let drawerFlag = $ref(false)
let loading = $ref(false)

let formData = $ref({
  id: '',
  name: '',
  areaPointRange: '',
  parkAreaId: undefined,
  startTime: '',
  endTime: '',
})

// let state = reactive({
//   drawerFlag: false,
//   loading: false,
//   fromDataRef: null,
//   activeName: 'first',
//   formData: {
//     id: '',
//     name: '',
//     areaPointRange: '',
//     parkAreaId: undefined,
//     startTime: '',
//     endTime: '',
//   },
//   formDataList: [],
//   lists: [
//     { key: 'name', label: '区域名称', placeholder: '请输入区域名称' },
//     { label: '开始时间', key: 'startTime', type: 'time', data: { valueFormat: 'hh-mm-ss' }, placeholder: '请选择开始时间' },
//     { label: '结束时间', key: 'endTime', type: 'time', data: { valueFormat: 'hh-mm-ss' }, placeholder: '请选择结束时间' },
//   ],
//   rules: {
//     name: [{ required: true, message: '请输入类型名称', trigger: 'blur' }],
//   },
// })

let contentMainRef = $ref(null)

let mainData = reactive({
  tableUrl: '/business/parkAreaAlarmDetail/getDetailByParkAreaId',
  method: 'get',
  //   showIndex: true,
  botHeight: 460,
  isFormBnts: false,
  showPagination: false,
  isLoadStatus: true,
  columns: [
    {
      prop: 'name',
      label: '区域名称',
      //   formatter: (row) => {
      //     return row.permissionType === 1 ? '节点' : '车辆'
      //   },
    },
    { prop: 'startTime', label: '开始时间' },
    { prop: 'endTime', label: '结束时间' },
  ],
  tableBtns: {
    prop: 'btns',
    label: '操作',
    fixed: 'right',
    width: 80,
    btns: [
      {
        icon: 'kongzhifanwei',
        name: '操作',
        type: 'icon',
        click: (row) => {
          console.log(row, 'row')
          let today = proxy.$dayjs().format('YYYY-MM-DD')
          formData.id = row.id
          formData.parkAreaId = row.parkAreaId
          formData.name = row.name
          formData.areaPointRange = row.areaPointRange
          if (row?.startTime) {
            formData.startTime = proxy.$dayjs(today + ' ' + row?.startTime)
          } else {
            formData.startTime = ''
          }
          if (row?.endTime) {
            formData.endTime = proxy.$dayjs(today + ' ' + row?.endTime)
          } else {
            formData.endTime = ''
          }
          drawArea(row)
        },
      },
      {
        icon: 'shanchu',
        name: '删除',
        type: 'icon',
        click: (row) => {
          console.log(row, 'row')
          // 删除
          proxy.MessageBox({ msg: `确定删除${row.name}吗？`, type: 'warning' }).then((close) => {
            onDelete(row)
            close()
          })
        },
      },
    ],
  },
  formData: {
    parkAreaId: '',
    name: '',
    // pageNumber: 1,
    // pageSize: 25,
  },
  lists: [{ label: '', key: 'name', placeholder: '请输入区域名称', col: 18 }],
})

let row = $ref({})
const setFormData = (obj) => {
  drawerFlag = true
  row = obj
  // 用于表格搜索
  mainData.formData.parkAreaId = obj.id
  formData.parkAreaId = obj.id
  console.log(row, 'row')
  renew()
  nextTick(() => {
    initMap()
    contentMainRef && contentMainRef.getTable()
  })
  //   getData()
}

const renew = () => {
  formData.id = ''
  formData.parkAreaId = row.id
  formData.name = ''
  formData.areaPointRange = ''
  formData.startTime = ''
  formData.endTime = ''
}

const handleClose = () => {
  // editFormRef.clearValidate()
  // formData = proxy.$_.cloneDeep(editData)
}

let areaList = $ref([])

// const getData = () => {
//   getDetailByParkAreaId({
//     parkAreaId: row.id,
//   }).then((res) => {
//     console.log(res, 'res')
//     if (res) {
//       // TODO 生成多个formData
//       let today = proxy.$dayjs().format('YYYY-MM-DD')
//       areaList = res
//       formData = {
//         id: res[0]?.id,
//         name: res[0]?.name,
//         areaPointRange: res[0]?.areaPointRange,
//         parkAreaId: res[0]?.parkAreaId,
//         startTime: proxy.$dayjs(today + ' ' + res[0]?.startTime),
//         endTime: proxy.$dayjs(today + ' ' + res[0]?.endTime),
//       }
//     }
//   })
// }

// 地图代码

let editor = {
    new: {}, // 新增专用编辑器，一次只能编辑一个区域
  },
  arr = [],
  polygons = [],
  mapLayer = null,
  map = null,
  //   areaPointRange = '',
  mouseTool = null

const initMap = () => {
  map = new AMap.Map('map', {
    center: centerPoint,
    zoom: 11,
  })

  //加载AMap.MouseTool插件
  AMap.plugin(['AMap.MouseTool'], function () {
    mouseTool = new AMap.MouseTool(map)
  })

  AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
    console.log('PlaceSearch')
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
  // //首次绘制多边型
  const polygon = document.getElementById('polygon')
  AMap.event.addDomListener(
    polygon,
    'click',
    function () {
      console.log('polygon')
      clearMap()
      mouseTool.polygon()
      map.setDefaultCursor('crosshair')
    },
    false,
  )

  // //首次绘制矩形
  // const rectangle = document.getElementById('rectangle')
  // console.log(rectangle, 'rectangle')
  // if (rectangle) {
  //     AMap.event.addDomListener(rectangle, 'click', function () {
  //         console.log('rectangle')
  //         clearMap();
  //         map.setDefaultCursor("crosshair");
  //         mouseTool.rectangle();
  //     }, false);
  // }

  // 首次绘制完成
  AMap.event.addListener(mouseTool, 'draw', function (e) {
    // 添加事件
    map.setDefaultCursor('pointer')
    var po = e.obj.toString().split(';')
    po.forEach(function (n, i) {
      var item = n.split(',')
      arr.push([item[0], item[1]])
      formData.areaPointRange = formData.areaPointRange + item[0] + ',' + item[1] + ';'
    })
    console.log(arr, 'arr')
    mouseTool.close(true)
    generateEditItem(arr)
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
    map.plugin(['AMap.PolyEditor'], function (e) {
      editor._polygonEditor = new AMap.PolyEditor(map, editor._polygon)
      //编辑多边形打开
      editor._polygonEditor.open()
    })
  })
}

// 编辑
const onEditArea = () => {
  //加载AMap.PolyEditor插件
  map.plugin(['AMap.PolyEditor'], function () {
    editor._polygonEditor = new AMap.PolyEditor(map, editor._polygon)
  })
  //编辑多边形打开
  editor._polygonEditor.open()
  editor._polygon.on('dblclick', () => {
    console.log('双击')
    editor._polygonEditor.close()
  })
  editor._polygon.on('rightclick', () => {
    console.log('右键')
    editor._polygonEditor.close()
  })
  editor._polygonEditor.on('end', (event) => {
    // polyEditor  close关闭时执行
    console.log(event.target.getPath(), 'path')
    formData.areaPointRange = pointsToStr(event.target.getPath())
  })
}
// 编辑完成
const onEditComplete = () => {
  editor._polygonEditor.close()
  // 记录编辑后多边形的 点
  formData.areaPointRange = pointsToStr(arr)
}

const pointsToStr = (arr) => {
  let areaPointRange = ''
  arr.forEach(function (n, i) {
    areaPointRange = areaPointRange + n.lng + ',' + n.lat + ';'
  })
  return areaPointRange
}

const generateEditItem = (pointArr) => {
  console.log(pointArr, 'pointArr')
}

function clearMap() {
  for (var i = 0, l = polygons.length; i < l; i++) {
    polygons[i].setMap(null)
  }

  arr = [] //数组清空
  if (mapLayer != null) {
    editor._polygonEditor && editor._polygonEditor.close()
    // mapLayer.setMap(null);     //清除页面多边形
  }
}

const drawArea = (area) => {
  if (!editor) {
    editor = {}
  }
  map.clearMap()
  editor._polygon = (function () {
    let arr = []
    if (area.areaPointRange) {
      area.areaPointRange.split(';').map((point) => {
        let item = point.split(',')
        console.log(point, item, 'point')
        if (item.length === 2) {
          arr.push([item[0], item[1]])
        }
      })
    }
    console.log(arr, 'arr end')
    mapLayer = new AMap.Polygon({
      map: map,
      path: arr,
      strokeColor: '#0000ff',
      strokeOpacity: 1,
      strokeWeight: 3,
      fillColor: '#f5deb3',
      fillOpacity: 0.35,
    })
    map.setCenter(arr[0]);
    map.setZoom(15)
    return mapLayer
  })()
}

const onSave = () => {
  console.log(editor, 'onSave')
  let params = {
    ...formData,
    areaPointRange: formData.areaPointRange,
  }
  console.log(params, formData.areaPointRange)
  editor._polygonEditor?.close()
  if (!params.name) {
    ElMessage.warning('请填写区域名称!')
    return
  }
  // 时间处理
  if (params.startTime) {
    params.startTime = proxy.$dayjs(params.startTime).format('HH:mm:ss')
  }
  if (params.endTime) {
    params.endTime = proxy.$dayjs(params.endTime).format('HH:mm:ss')
  }
  parkAreaAlarmDetailAddOrUpdate(params)
    .then(() => {
      ElMessage.success('操作成功！')
      renew()
      contentMainRef.getTable()
    })
    .catch(() => {})
}
const onDelete = (row) => {
  parkAreaAlarmDetailDelete({ id: row.id || formData.id })
    .then(() => {
      ElMessage.success('删除成功！')
      contentMainRef.getTable()
      onReset()
    })
    .catch(() => {})
}

const onSearch = () => {
  contentMainRef.getTable()
}

const onReset = () => {
  console.log('reset')
  renew()
  map && map.clearMap()
}

const onEdit = () => {
  onEditArea()
}

const onClose = (val) => {
  drawerFlag = false
}

defineExpose({ setFormData })
</script>

<style scoped lang="scss">
.content-wrapper {
  display: flex;
  justify-content: flex-start;
  height: 720px;

  .left-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 400px;
    border: 1px solid #ccc;
    height: 720px;
    overflow: scroll;

    .head-wrapper {
      margin-left: 20px;
      margin-top: 20px;

      p {
        margin-bottom: 10px;
        font-weight: 700;
      }
    }
    .list-wrapper {
      margin-top: 20px;
      border-top: 1px solid #ccc;
      width: 100%;
      position: relative;
      .search-btn {
        position: absolute;
        right: 30px;
        top: 20px;
      }
      :deep(.el-form) {
        .el-form-item__label {
          width: 0px !important;
        }
        .el-form-item {
          width: 120px;
        }
        .el-form-item__content {
          margin-left: 0px !important;
        }
      }
    }
  }

  .right-wrapper {
    flex: 1;
    border: 1px solid #ccc;
    .tools-right-wrapper {
      position: absolute;
      top: 10px;
      right: 150px;
    }
  }

  .map-wrapper {
    position: relative;

    .button-group {
      top: 10px;
      position: absolute;
      left: 10px;
      z-index: 1000;
      background-color: rgba(255, 228, 196, 0);

      #rectangle,
      #polygon {
        border: 1px solid #eee;
        padding: 8px 10px;
        color: #fff;
        cursor: pointer;
        background-color: #1ab394;
      }
    }
  }
}
</style>
<style>
.amap-sug-result {
  z-index: 10000;
}
</style>
