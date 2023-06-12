<template>
  <div>
    <tw-drawer @handleClose="handleClose" :loading="state.loading" :isScreenfull="false" :title="title" width="100%" :isBtns="false" v-model="state.drawerFlag">
      <div class="content-wrapper">
        <div class="left-wrapper">
          <div>
            <tw-custom-form
              class="w300 form-wrapper"
              ref="editFormRef"
              cancelBtn="取消"
              @colse="onClose"
              :loading="state.loading"
              :lists="state.lists"
              :rules="state.rules"
              :formData="state.formData"
            ></tw-custom-form>
            <div class="btn-wrapper">
              <el-button type="primary" @click="onSave">保存</el-button>
              <el-button type="primary" v-if="editType === 'edit'" @click="onEdit">编辑</el-button>
              <el-button type="primary" v-if="editType === 'add'" @click="onReset">重置</el-button>
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
        </div>
      </div>
    </tw-drawer>
  </div>
</template>

<script setup lang="tsx">
import { addOrUpdate } from '@/api/operation/alert/accessareaalarm'

const { title, editType } = defineProps({
  title: String,
  editType: { type: String, default: 'add' },
})
let { proxy } = getCurrentInstance()

const centerPoint = [114.3, 30.6]

const initFormData = {
  alarmAreaId: 0,
  alarmLevel: '',
  alarmTypeCode: '',
  alarmValue: '',
  beginTime: '',
  controlArea: '',
  endTime: '',
  name: '',
  points: '',
  remark: '',
  ttsMsg: '',
  valid: true,
}

let state = reactive({
  drawerFlag: false,
  loading: false,
  fromDataRef: null,
  activeName: 'first',
  formData: { ...initFormData },
  // formDataList: [],
  lists: [
    { key: 'name', label: '区域名称', maxlength: 20, placeholder: '请输入区域名称' },
    { label: '报警类型', key: 'alarmTypeCode', type: 'select', filter: 'alarmAreaTypeCode', placeholder: '请选择报警类型' },
    { label: '风险区域', key: 'alarmLevel', type: 'select', filter: 'alarmAreaTypes', placeholder: '请选择风险区域' },
    { label: '备注(选填)', key: 'remark', maxlength: 100, placeholder: '请输入备注' },
    { label: '限制开始时间', key: 'beginTime', type: 'date', data: { valueFormat: 'YYYY-MM-DD' }, placeholder: '请选择限制开始时间' },
    { label: '限制结束时间', key: 'endTime', type: 'date', data: { valueFormat: 'YYYY-MM-DD' }, placeholder: '请选择限制结束时间' },
  ],
  rules: {
    name: [{ required: true, message: '请输入类型名称', trigger: 'blur' }],
    alarmTypeCode: [{ required: true, message: '请选择报警类型', trigger: 'blur' }],
    alarmLevel: [{ required: true, message: '请选择风险区域', trigger: 'blur' }],
    beginTime: [{ required: true, message: '请选择开始时间', trigger: 'blur' }],
    endTime: [{ required: true, message: '请选择结束时间', trigger: 'blur' }],
  },
})
watch(
  () => editType,
  (val) => {
    console.log(val, '11editType111')
  },
)
let row = $ref({})
const setFormData = (obj) => {
  state.drawerFlag = true
  console.log(row, 'row')
  if (obj) {
    row = obj
    state.formData = row
    areaPointRange = row.points
    arr = strToPoints(row.points)
  } else {
    state.formData = { ...initFormData }
    areaPointRange = ''
    arr = []
  }
  setTimeout(() => {
    initMap()
    // 如果是编辑需要画当前区域
    if (obj) {
      drawArea()
    }
  }, 10)
}

const onReset = () => {
  console.log('reset')
  Object.keys(initFormData).forEach((key) => {
    console.log(key, state.formData[key], initFormData[key])
    state.formData[key] = initFormData[key]
  })
}

const handleClose = () => {}
// 地图代码

let editor = {},
  arr = [],
  polygons = [],
  mapLayer = null,
  map = null,
  areaPointRange = '',
  mouseTool = null

const initMap = () => {
  map = new AMap.Map('map', {
    center: centerPoint,
    zoom: 11,
  })
  console.log(map, 'map')

  //加载AMap.MouseTool插件
  AMap.plugin(['AMap.MouseTool'], function () {
    mouseTool = new AMap.MouseTool(map)
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
      areaPointRange = areaPointRange + item[0] + ',' + item[1] + ';'
    })
    console.log(arr, 'arr')
    mouseTool.close(true)
    // resultRef && resultRef.show(arr, mainData.formData)
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
  editor._polygonEditor.on('end', (event) => {
    // polyEditor  close关闭时执行
    console.log(event.target.getPath(), 'path')
    areaPointRange = pointsToStr(event.target.getPath())
  })
}

// 坐标数组转换成坐标点字符串
const pointsToStr = (arr) => {
  let areaPointRange = ''
  arr.forEach(function (n, i) {
    areaPointRange = areaPointRange + n.lng + ',' + n.lat + ';'
  })
  return areaPointRange
}
// 坐标点字符串转换成坐标数组
const strToPoints = (points) => {
  let arr = []
  points.split(';').map((point) => {
    let item = point.split(',')
    // console.log(point, item, 'point')
    if (item.length === 2) {
      arr.push([item[0], item[1]])
    }
  })
  return arr
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

const drawArea = () => {
  if (!editor) {
    editor = {}
    return
  }
  if (!areaPointRange) {
    return
  }

  editor._polygon = (function () {
    let arr = strToPoints(areaPointRange)
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
    return mapLayer
  })()
  map.setCenter(arr[0])
}

const emits = defineEmits(['getTable'])

const onSave = () => {
  console.log('onSave idx')
  let params = {
    ...state.formData,
    points: areaPointRange,
  }
  editor?._polygonEditor?.close()
  // 时间处理
  if (params.beginTime && params.endTime) {
    params.beginTime = proxy.$dayjs(params.beginTime).format('YYYY-MM-DD')
    params.endTime = proxy.$dayjs(params.endTime).format('YYYY-MM-DD')
  } else {
    ElMessage.warning('请选择时间!')
    return
  }
  if (!params.alarmTypeCode || !params.alarmLevel || !params.name) {
    let text = `请${!params.name ? '填写区域名称' : !params.alarmTypeCode ? '选择报警类型' : !params.alarmLevel ? '选择风险区域' : ''}`
    ElMessage.warning(text)
    return
  }
  addOrUpdate(params)
    .then(() => {
      ElMessage.success('操作成功！')
      state.drawerFlag = false
      emits('getTable')
    })
    .catch(() => {})
}
const onEdit = () => {
  console.log('onEdit idx')
  onEditArea()
}

const onClose = (val) => {
  state.drawerFlag = false
}

defineExpose({ ...toRefs(state), setFormData })
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

    .form-wrapper {
      display: flex;
      justify-content: flex-start;
      margin: 20px 0;

      :deep(.el-row) {
        color: aqua;

        // .el-form-item {
        //   .el-form-item__label {
        //     width: 90px !important;
        //   }
        // }
      }
    }

    .btn-wrapper {
      margin-left: 20px;
    }
  }

  .right-wrapper {
    flex: 1;
    border: 1px solid #ccc;
  }

  .map-wrapper {
    position: relative;

    .button-group {
      z-index: 999;
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
