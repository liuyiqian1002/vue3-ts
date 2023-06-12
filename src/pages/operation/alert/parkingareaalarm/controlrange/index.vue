<template>
  <div>
    <tw-drawer @handleClose="handleClose" :loading="loading" :title="title" :isBtns="false" v-model="drawerFlag">
      <div class="title-wrapper">{{ row.name }}</div>
      <div class="add-wrapper">
        <div style="width: 500px">
          <Org ref="orgRef" :formData="orgFormData" :item="orgConfig"></Org>
        </div>
        <div><el-button type="primary" @click="onAdd">添加</el-button></div>
      </div>
      <content-main ref="contentMainRef" :mainData="mainData"></content-main>
    </tw-drawer>
  </div>
</template>

<script setup lang="tsx">
import Org from '@/components/TwForm/components/twOrg/index.vue'
import { parkAreaVehicleAdd, parkAreaVehicleDelete } from '@/api/operation/alert/parkingareaalarm'

defineProps({
  title: String,
})

let { proxy } = getCurrentInstance()
let contentMainRef = $ref(null)
let drawerFlag = $ref(false)
let loading = $ref(false)

const orgFormData = {
  parkAreaId: 0,
  detailList: [],
}

// 组织结构
const orgConfig = {
  label: '组织结构',
  key: 'detailList',
  showCheckbox: true,
  placeholder: '请输入组织结构',
  type: 'org',
  url: '/system/userDataAuthSearchTree/getTreesList',
  method: 'post',
  params: {
    hasDataPermission: true,
    needVehicle: true,
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
  col: 8,
}

let mainData = reactive({
  tableUrl: '/business/parkAreaVehicle/pageByParkAreaId',
  showIndex: true,
  botHeight: 220,
  // isLoadStatus: true,
  columns: [
    {
      prop: 'permissionType',
      label: '控制类型',
      formatter: (row) => {
        return row.permissionType === 1 ? '节点' : '车辆'
      },
    },
    { prop: 'permissionName', label: '控制范围' },
  ],
  tableBtns: {
    prop: 'btns',
    label: '操作',
    fixed: 'right',
    width: 150,
    btns: [
      {
        icon: 'shanchu',
        name: '删除',
        click: (row) => {
            console.log(row, 'row')
          // 删除
          parkAreaVehicleDelete({ id: row.id }).then((res) => {
            if (res === null) {
              ElMessage.success('删除成功!')
              contentMainRef.getTable()
            }
          })
        },
      },
    ],
  },
  formData: {
    order: '',
    orderField: '',
    parkAreaId: '',
    permissionName: '',
    pageNumber: 1,
    pageSize: 25,
  },
  lists: [{ label: '控制范围', key: 'permissionName', placeholder: '请输入控制范围', col: 18 }],
})

const orgRef = $ref(null)
let row: any = $ref({})
const setFormData = (obj) => {
  mainData.formData.parkAreaId = obj.id
  orgFormData.parkAreaId = obj.id
  // 每次弹窗清空表单
  orgFormData.detailList = []
  orgRef && orgRef.clear()
  mainData.formData.permissionName = ''
  console.log(obj, 'obj')
  row = obj
  drawerFlag = true
  contentMainRef && contentMainRef.getTable()
}

const handleClose = () => {
  //
}

let eimts = defineEmits(['getTable'])
const onAdd = () => {
  let params = {
    parkAreaId: orgFormData.parkAreaId,
    detailList: [],
  }
  if (orgFormData.detailList) {
    orgFormData.detailList.map((item) => {
      params.detailList.push({
        permissionCode: item.orgId,
        permissionName: item.orgName,
        permissionType: item.vehicle ? 2 : 1,
        vehicleCode: item.vehicle ? item.permissionCode : '',
      })
    })
  }

  parkAreaVehicleAdd(params)
    .then(() => {
      ElMessage.success('操作成功！')
      drawerFlag = false
    })
    .catch(() => {})
}

const onClose = (val) => {
  drawerFlag = false
}

defineExpose({ setFormData })
</script>

<style scoped lang="scss">
.title-wrapper{
    padding-left: 40px;
    padding-bottom: 10px;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
}
.add-wrapper {
  padding: 20px 40px 0px 40px;
  display: flex;
  justify-content: space-between;
//   align-items: center;
  border-bottom: 1px solid #bbb;
}
:deep(.el-form) {
  width: 95%;
  .el-form-item__label {
    width: 70px !important;
    justify-content: flex-start;
  }
}
</style>
