<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" :width="800" v-model="visible"
      class="event-dialog-wrapper">
      <div class="content-wrapper">
        <div v-for="item in list" class="item-wrapper">
          <!-- <div class="item-wrapper"> -->
          <div class="img">
            <el-image :src="item.thumbnailViewUrl"></el-image>
            <!-- <img src="/src/assets/images/pause.jpg" /> -->
          </div>
          <div class="title">{{ item.fileName }}</div>
          <div class="time">{{ item.createTime }}</div>
          <!-- </div> -->
        </div>
      </div>
    </tw-dialog>
  </div>
</template>

<script setup lang="tsx">
import { ListResItem } from '@/api/operation/filemanagement/enterprisefiles';
import { GategoryListResItem } from '@/api/operation/filemanagement/fileclassification';
const { title, list } = defineProps({
  title: { type: String, default: () => '' },
  list: { type: Array<ListResItem>, default: () => [] }
})
const proxy: any = getCurrentInstance()?.proxy

let visible = $ref(false)
let row = $ref<GategoryListResItem>()

const show = (obj: GategoryListResItem) => {
  visible = true
  row = obj
}


watch(() => list, (nVal) => {
  // console.log(nVal, 'list watch')
  // staticsAll()
}, { deep: true })


defineExpose({ show })
</script>

<style scoped lang="scss">
.event-dialog-wrapper {
  :deep(.el-scrollbar__view) {
    height: 100%;

    .dialog_content {
      height: 100%;
      // padding: 0 !important;
    }
  }

  .content-wrapper {
    display: flex;
    // flex-direction: column;
    height: 96%;

    .item-wrapper {
      // height: auto !important;
      width: 220px !important;
      max-height: 250px;
      border: 1px solid #cccccc;
      border-radius: 5px;
      margin-right: 15px;
      margin-left: 14px;
      // padding-left: 10px !important;
      padding-top: 5px !important;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      img {
        width: 90%;
      }
      .title,.time {
        text-align: left;
        margin: 5px 8px;
      }
    }
  }
}
</style>
