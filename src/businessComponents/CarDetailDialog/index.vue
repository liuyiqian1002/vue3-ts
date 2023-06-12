<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" v-model="visible" class="event-dialog-wrapper">
      <div class="content-wrapper">
        <carSummary :row="row" @close="close"></carSummary>
        <!-- <component :is="summary" :row="row"></component> -->
        <div class="right-wrapper">
          <el-tabs v-model="currentTab" type="card" class="event-tabs w">
            <template v-for="item in tableTabs.filter((it) => it.show)">
              <el-tab-pane :key="item.name" :label="item.title" :name="item.name" :closable="item.closable" v-if="$store.getters.permissions[item.permission]">
                <component :is="item.component" :row="row" v-if="currentTab === item.name"></component>
              </el-tab-pane>
            </template>
          </el-tabs>
        </div>
      </div>
    </tw-dialog>
  </div>
</template>

<script setup lang="ts">
import carSummary from './summary/index.vue'
import feedback from './feedback/index.vue'
import feedback1 from './feedback1/index.vue'
import alarmList from './alarmList/index.vue'
import manual from './manual/index.vue'
import videoPlayer from './videoPlayer/index.vue'
import handleLogs from './handleLogs/index.vue'
import PhotographLists from './PhotographLists/index.vue'
import ViolationPhoto from './violationphoto/index.vue'
import { computed, provide } from 'vue'
import { EventItem } from './types'
import { getEvent } from '@/api/dynamicMonitoring/eventTracking'

const props = defineProps({
  title: { type: String, default: () => '详情' },
  showManual: { type: Boolean, default: false },
  showVideoPlayer: { type: Boolean, default: false },
  showPhotograph: { type: Boolean, default: false },
  showViolationPhoto: { type: Boolean, default: false },
  showWarningList: { type: Boolean, default: true },
  showLog: { type: Boolean, default: true },
  showFeedback: { type: Boolean, default: false },
  showFeedback1: { type: Boolean, default: false },
  permissions: {
    type: Array,
    default: () => ['watch-sjgz-fkcl', 'watch-sjgz-fkcl', 'watch-sjgz-qjlb', 'watch-sjgz-rgcl', 'watch-sjgz-spbf', 'watch-sjgz-clrz', 'watch-sjgz-zplb', 'watch-sjgz-wgtp'],
  },
})
const { title, showManual, showVideoPlayer, showWarningList, showPhotograph, showViolationPhoto, showFeedback, showFeedback1, showLog, permissions } = props
const proxy: any = getCurrentInstance()?.proxy

let visible = $ref(false)
let row = $ref<EventItem>()


let tableTabs = $ref([
  {
    title: '反馈处理',
    name: '5',
    key: 'showFeedback',
    component: feedback,
    closable: false,
    permission: permissions[0],
    show: showFeedback,
  },
  {
    title: '反馈处理',
    name: '5',
    key: 'showFeedback1',
    component: feedback1,
    permission: permissions[1],
    closable: false,
    show: showFeedback1,
  },
  {
    title: '警情列表',
    name: '1',
    key: 'showWarningList',
    component: alarmList,
    permission: permissions[2],
    closable: false,
    show: showWarningList,
  },
  {
    title: '人工处理',
    name: '2',
    key: 'showManual',
    component: manual,
    permission: permissions[3],
    closable: false,
    show: showManual,
  },
  {
    title: '照片列表',
    name: '6',
    key: 'showPhotograph',
    component: PhotographLists,
    permission: permissions[6],
    closable: false,
    show: showPhotograph,
  },
  {
    title: '违规图片',
    name: '7',
    key: 'showViolationPhoto',
    component: ViolationPhoto,
    permission: permissions[7],
    closable: false,
    show: showViolationPhoto,
  },
  {
    title: '视频播放',
    name: '3',
    key: 'showVideoPlayer',
    component: videoPlayer,
    permission: permissions[4],
    closable: false,
    show: showVideoPlayer,
  },
  {
    title: '处理日志',
    name: '4',
    key: 'showLog',
    component: handleLogs,
    permission: permissions[5],
    closable: false,
    show: showLog,
  },
])

const show = (obj: EventItem) => {
  visible = true
  // TODO 这里确认一下是否需要赋值给row，getEventDetails获取后row还是会赋值一次，这样会导致部分组件刷新两次
  row = obj
  // console.log(row, 'row detai')
  getEventDetails(obj)
}


// 模块控制
let controlsMap = {
  showManual: showManual, // 人工处理
  showFeedback: showFeedback, // 反馈
  showFeedback1: showFeedback1, // 反馈1
  showLog: showLog, // 处理日志
  showPhotograph: showPhotograph, // 照片列表
  showVideoPlayer: showVideoPlayer, // 视频播放
  showWarningList: showWarningList, // 警情列表
  showViolationPhoto: showViolationPhoto, // 违规图片
}

/**
 * @description 根据报警类型控制功能展示
 * @param obj 报警信息
 */
const controlsChange = (obj) => {
  let showPhotographs = ['36'] // 需要展示照片列表的类型
  let violations = ['2', '18'] // 2 疲劳驾驶，18 当天累计驾驶超时 需要展示违规图片的类型
  if (showPhotographs.includes(obj.alarmTypeCode)) {
    controlsMap.showPhotograph = true
    controlsMap.showVideoPlayer = true
    controlsMap.showWarningList = false
    controlsMap.showViolationPhoto = false
  } else if (violations.includes(obj.alarmTypeCode)) {
    // console.error('violations set')
    controlsMap.showPhotograph = false
    controlsMap.showVideoPlayer = true
    controlsMap.showWarningList = true
    controlsMap.showViolationPhoto = true
  } else {
    controlsMap.showWarningList = true
    controlsMap.showVideoPlayer = true
    controlsMap.showViolationPhoto = false
    controlsMap.showPhotograph = false
  }
  console.log(controlsMap, 'controlsMap')
  tableTabs = tableTabs.map(it => {
    if(controlsMap[it.key]) {
      it.show = true
    } else {
      it.show = false
    }
    return it
  })
  currentTab = getFirstTab()
}

const getEventDetails = (data) => {
  const query = {
    eventId: data.eventId || row.eventId,
    alarmEventId: data.alarmEventId || row.alarmEventId,
  }
  getEvent(query).then((res) => {
    // console.log(res, 'getEvent')
    row = res
    controlsChange(res)
  })
}

provide(
  'row',
  computed(() => row),
)

const componentRef = $ref(null)

watch(
  () => visible,
  (val) => {
    // console.log(val, row.plateNum, componentRef, 'dialog index watch visible')
    // if (val) {
    //   currentTab = getFirstTab()
    // }
  },
)
watch(
  () => props,
  (nVal) => {
    // console.log(nVal, 'props watch')
    tableTabs = tableTabs.map((item) => {
      item.show = props[item.key] ?? false
      return item
    })
    currentTab = getFirstTab()
  },
  { deep: true },
)

const getFirstTab = () => {
  console.log('getFirstTab')
  for (let index = 0; index < tableTabs.length; index++) {
    const element = tableTabs[index]
    if (element.show) {
      // console.log(element, 'element')
      return element.name
    }
  }
}
// right-content 内容
let currentTab = $ref(tableTabs[0])

const close = () => {
  visible = false
}

defineExpose({ show })
</script>

<style scoped lang="scss">
.event-dialog-wrapper {
  :deep(.el-dialog) {
    .el-scrollbar__view {
      height: calc(100% - 30px);
    }

    .dialog_content {
      height: 100%;
      padding-left: 0 !important;
    }
  }

  .content-wrapper {
    display: flex;
    height: 98%;

    .right-wrapper {
      flex: 1;
      // overflow-y: scroll;
    }
  }
}
</style>
