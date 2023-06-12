<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="false" v-model="visible" class="event-dialog-wrapper">
      <div class="content-wrapper">
        <div class="table-wrapper">
          <!-- <div class="title-item">档案明细</div> -->
          <div class="ctent-wrapper">
            <el-table :data="list" style="width: 100%">
              <el-table-column v-for="(column, index) in tableColumns" :key="index" :prop="column.prop"
                :label="column.label" :width="column.width">
              </el-table-column>
            </el-table>
          </div>
          <div class="tw_c"><el-button @click="visible = false">关闭</el-button></div>
        </div>
        <!-- <div><el-button @click="visible = false">关闭</el-button></div> -->
      </div>
    </tw-dialog>
  </div>
</template>

<script setup lang="tsx">
import { ListResItem } from '@/api/operation/filemanagement/enterprisefiles';
import { GategoryListResItem } from '@/api/operation/filemanagement/fileclassification';

const { title, dto, list } = defineProps({
  title: { type: String, default: () => '' },
  dto: { type: Object, default: () => { } },
  list: { type: Array<ListResItem>, default: () => [] }
})
const proxy: any = getCurrentInstance()?.proxy

let visible = $ref(false)
let row = $ref<GategoryListResItem>()

const show = (obj: GategoryListResItem) => {
  visible = true
  row = obj
}


const tableColumns = [
  { prop: 'name', label: '分类名称', },
  { prop: 'archivesTypeName', label: '档案类型' },
  { prop: 'archivesSum', label: '档案数' },
  { prop: 'companyName', label: '所属单位' },
  { prop: 'createUser', label: '创建人' },
  { prop: 'createTimeStr', label: '创建时间' },
]

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
    }

    .ctent-wrapper {
      border: 1px solid #e7e7e7;
      margin-bottom: 20px;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
    }

    .table-wrapper {
      height: 70%;
    }
  }
}
</style>
