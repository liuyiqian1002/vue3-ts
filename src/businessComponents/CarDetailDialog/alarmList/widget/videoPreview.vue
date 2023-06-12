<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" width="510px" height="610px" v-model="visible"
      class="video-dialog-wrapper">
      <div class="video-wrapper" ref="videoRef" id="play">
        <video loop autoplay id="player" :src="row.videoUrl" controls>
          <!-- <source :src="row.videoUrl" :key="sourceKey"
            type="video/mp4"> -->
        </video>
      </div>
    </tw-dialog>
  </div>
</template>
  
<script setup lang="tsx">
const { title, list } = defineProps({
  title: { type: String, default: () => '' },
  list: { type: Array, default: () => [] }
})
const proxy: any = getCurrentInstance()?.proxy

let visible = $ref(false)
let row = $ref({})
const show = (obj) => {
  console.log(obj, 'call show')
  visible = true
  row = JSON.parse(JSON.stringify(obj))
}




defineExpose({ show })
</script>
  
<style scoped lang="scss">

.video-dialog-wrapper {
  :deep(.el-dialog) {
    height: 100%;
    background: rgba(0,0,0,.3);
    border: none !important;
    box-shadow: none !important;
    .el-dialog__header{
      margin-right: 0px;
      padding: 20px 0px;
      border-bottom-color: #ccc;
    }
    .el-dialog__title {
      margin-right: 6px;
    }
    .el-dialog__title {
      .el-icon:first-child{
        display: none;
      }
    }
    .el-dialog__body {
      background: none;
    }
    .video-wrapper {
      height: 400px;
      // padding: 0 !important;
      video{
        height: 100%;
      }
    }
  }
}
</style>
  