<template>
  <div class="video-widget-wrapper">
    <div class="head">视频弹窗</div>
    <div class="list-item-wrapper">
      <div class="img-list-wrapper" v-if="imgsList && imgsList.length > 0">
        <div class="list" v-for="item in imgsList">
          <div style="position: relative">
            <el-image :src="item.imgUrl" @click.stop="onVideoClick(item)" :preview-src-list="item.videoUrl? [] : preImgsList" fit="cover"></el-image>
            <el-icon
              v-if="item.videoUrl"
              class="play-icon"
              @click="onVideoClick(item)"
              style="position: absolute; cursor: pointer; font-size: 50px; color: #ccc; top: 50%; left: 50%; transform: translate(-50%, -50%)"
            >
              <VideoPlay />
            </el-icon>
          </div>
        </div>
      </div>
      <div class="download-icon" v-else>
        <el-icon v-if="loading" class="is-loading" @click="onCancel">
          <Loading />
        </el-icon>
        <el-icon v-else @click="onDownloadClick">
          <Download />
        </el-icon>
      </div>
    </div>
    <videoPreview ref="videoPreviewRef"></videoPreview>
  </div>
</template>

<script setup lang="ts">
// import { useDraggable } from '@/hooks'
import videoPreview from './videoPreview.vue'

import { fileDownloadReq, getEventMomentaPicAndVideos } from '@/api/dynamicMonitoring/eventTracking'
import { EventItem } from '../../types'
const { row, data } = defineProps<{
  title: String
  row: EventItem
  data: any
}>()
const proxy: any = getCurrentInstance()?.proxy

// console.log(row, 'video created row')

let imgsList = $ref([])
let preImgsList = $ref([])
let loading = $ref(false)

watch(
  () => row,
  (val) => {
    // console.log(val, 'new row')
    clearInterval(timer)
    loading = false
    imgsList = []
    preImgsList = []
  },
)
let requestCount = 0
let timer = null
const onDownloadClick = (e) => {
  loading = true
  //TODO 请求视频图片地址
  getPicAndVideos()
  return
  //NOTE 既然能直接获取到图片和视频，先请求下发指令的接口的意义在哪里？
  const params = {
    eventDesc: row.eventDesc,
    eventId: row.eventId,
    vehicleCode: row.vehicleCode,
  }
  fileDownloadReq(params).then((res) => {
    console.log(res, 'fileDownloadReq')
    if (res === null) {
      //TODO 轮询获取图片列表
      getPicAndVideos()
      timer = setInterval(() => {
        getPicAndVideos()
      }, 3000)
    }
  })
}
const getPicAndVideos = () => {
  const query = {
    alarmLevel: row.alarmLevel,
    endTimeSearch: row.endTimeSearch,
    eventId: row.eventId,
    startTimeSearch: row.startTimeSearch,
  }
  if (!(imgsList && imgsList.length > 0)) {
    if (requestCount >= 10) {
      clearInterval(timer)
      loading = false
      requestCount = 0
      return
    }
    requestCount++
    getEventMomentaPicAndVideos(query).then((re) => {
      console.log(re, 'rere')
      if (re && re.length > 0) {
        imgsList = re
        re.map((it) => {
          if (it.imgUrl) {
            preImgsList.push(it.imgUrl)
          }
        })
      } else {
        imgsList = []
        preImgsList = []
      }
    })
  } else {
    clearInterval(timer)
    loading = false
    requestCount = 0
  }
}

let currentItem = {}
let videoPreviewRef = $ref(null)
const onVideoClick = (item) => {
  console.log(item, 'item click')
  if (item.videoUrl) {
    videoPreviewRef.show(item)
    currentItem = item
  } else {
    currentItem = {}
  }
}
const onCancel = () => {
  console.log()
}
// onMounted(() => {
//     console.log('handlelogs onMounted')
// })
// let videoRef = $ref(null)
// let headerRef = $ref(null)
// let drag = $ref(true)
// let draggable = computed(() => drag)
// const draggable = computed(() => draggable)
// useDraggable(videoRef, headerRef, draggable)
</script>

<style scoped lang="scss">
.video-wrapper {
  position: fixed;
  z-index: 10000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 400px;
  width: 480px;

  .header {
    width: 100%;
    height: 40px;
    background: #ccc;
  }

  #player {
    width: 100%;
    height: 100%;
  }
}

.video-widget-wrapper {
  width: 250px;
  text-align: center;

  .head {
    border-bottom: 1px solid #ccc;
    padding: 5px 0;
  }

  .list-item-wrapper {
    padding-left: 5px;

    .img-list-wrapper {
      margin-top: 5px;
      height: 220px;
      overflow: scroll;
    }

    .download-icon {
      width: 100%;
      height: 200px;
      line-height: 240px;
      font-size: 100px;
      cursor: pointer;
    }
  }

  .no-data {
    margin-top: 50px;
    font-size: 48px;
    text-align: center;
  }
}
</style>
