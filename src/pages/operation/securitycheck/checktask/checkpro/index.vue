<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" v-model="visible" class="event-dialog-wrapper">
      <Checkproject :hideHeadBtn="hideHeadBtn" @checkSelect="checkSelect"></Checkproject>
    </tw-dialog>
  </div>
</template>

<script setup lang="tsx">
import Checkproject from '../../checkproject/index.vue'
const { title, dto, list } = defineProps({
  title: { type: String, default: () => '' },
  hideHeadBtn: { type: Boolean, default: () => true },
  dto: { type: Object, default: () => { } },
})
const proxy: any = getCurrentInstance()?.proxy
let emits = defineEmits(['checkSelect'])
const checkSelect = (data) => {
  console.log('checkpro')
  emits('checkSelect', data)
}
let visible = $ref(false)
const show = (obj) => {
  visible = true
}


defineExpose({ show })
</script>

<style scoped lang="scss">
.event-dialog-wrapper {
  :deep(.el-scrollbar__view) {
    height: 100%;

    .dialog_content {
      height: 100%;

      // padding: 0 !important;
      .el-tabs__content {
        height: 660px;
        overflow: scroll;
      }
    }
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    height: 96%;

    .title-item {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: #ccc;
      text-align: left;
      padding-left: 10px;
      box-sizing: border-box;
      text-align: center;
    }

    .title-text {
      line-height: 40px;
      height: 40px;
      font-size: 18px;
      font-weight: 600;
    }

    .ctent-wrapper {
      border: 1px solid #e7e7e7;
      margin-bottom: 20px;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
    }

    .table1 {
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;

      &>div {
        box-sizing: border-box;
        border: 1px solid #e7e7e7;
        border-spacing: 0;
        border-collapse: collapse;
        width: 50%;
        display: flex;
        // display: table-cell;
        justify-content: flex-start;
        text-align: center;

        .label {
          width: 150px;
          border-right: 1px solid #e7e7e7;
          padding: 10px;
        }

        .value {
          padding: 10px;
          flex: 1;
        }
      }
    }

    .table-wrapper {
      height: 70%;

      :deep(.el-table) {
        .cell {
          text-align: center;
        }

        th .cell {
          background: #fbfbfb;
          line-height: 1.42857;
          padding: 8px;
          vertical-align: middle;
          // border-bottom: 1px solid #DDDDDD;
        }
      }
    }
  }
}
</style>
