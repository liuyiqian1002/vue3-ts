<template>
  <div class="alarm-process-wrapper">
    <tw-dialog :loading="false" :title="title" v-model="visible" confirmBtn="添加" isBtns @save="onSave" :width="1000"
      class="event-dialog-wrapper">
      <ContentMain ref="contentMainRef" :mainData="mainData" @checkSelect="checkSelect"></ContentMain>
    </tw-dialog>
  </div>
</template>

<script setup lang="tsx">
let title = $ref('')
let contentMainRef = $ref(null)
const proxy: any = getCurrentInstance()?.proxy
let list = $ref([]) // 勾选的行
let mainData = reactive({
  isCheck: true,
  botHeight: 250,
  tableUrl: '/business/archivesCategory/page',
  columns: [
    { prop: 'name', label: '分类名称', },
  ],
  formData: {
    "archivesType": '',
    "companyId": '',
    "name": "",
    pageNumber: 1,
    pageSize: 25,
  },
  lists: [
    {
      label: '分类名称',
      key: 'name',
      placeholder: '请输入分类名称',
      col: 12
    },
  ]
})

const emits = defineEmits(['save'])

const checkSelect = (data) => {
  console.log(data, 'checkSelect')
  list = data
}
const onSave = () => {
  console.log(list)
  visible = false
  emits('save', list)
}
let visible = $ref(false)
const show = (obj) => {
  visible = true
}


defineExpose({ show })
</script>

<style scoped lang="scss">
.alarm-process-wrapper {
  .second-table-wrapper {
    margin-top: 5px;
  }

  .table-box {
    height: 50% !important;
  }
}
</style>
