<template>
  <div>
    <tw-drawer @handleClose="handleClose" :loading="loading" :title="title" :isBtns="false" v-model="drawerFlag">
      <div class="add-wrapper">
        <div style="min-width: 240px">
          <TwAllSelect :formData="fMainData.formData" :item="fMainData.lists[0]"></TwAllSelect>
        </div>
        <div style="width: 300px;">
          <Org :formData="fMainData.formData" :item="fMainData.lists[1]"></Org>
        </div>
        <div><el-button type="primary" @click="onAdd">添加</el-button></div>
      </div>
      <content-main ref="contentMainRef" :mainData="mainData"></content-main>
    </tw-drawer>
  </div>
</template>

<script setup lang="tsx">
import Org from '@/components/TwForm/components/twOrg/index.vue'
import TwAllSelect from '@/components/TwForm/components/twAllSelect/index.vue'
import { alarmAreaScopeAdd, alarmAreaScopeDelete } from '@/api/operation/alert/accessareaalarm'

defineProps({
  title: String,
})

let { proxy } = getCurrentInstance()
let contentMainRef = $ref(null)
let drawerFlag = $ref(false)
let loading = $ref(false)

let cusFormData = {
  alarmAreaId: 0,
  nodeDtoList: [],
  vehicleOperateTypeCodeList: [],
}

// 组织结构
let orgConfig = {
  label: '组织结构',
  key: 'nodeDtoList',
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
    vehicleOperateTypeCodeList: []
  },
  parKeys: [{ key: 'parentCode', val: 'permissionCode' }],
  props: {
    label: 'orgName',
    value: 'permissionCode',
    disabled: 'nocheck',
  },
  permissionIds: [],
  col: 8
}

let allSelectConfig = {
  label: '营运类型',
  key: 'vehicleOperateTypeCodeList',
  type: 'allSelect',
  width: 170,
  remote: true,
  url: '/system/vehicleOperateType/getTreeCodeList',
  method: 'get',
  loadMore: true,
  placeholder: '请选择营运类型',
  col: 12
}

let fMainData = $ref({
  formData: cusFormData,
  lists: [allSelectConfig, orgConfig],
})

watch(() => fMainData.formData.vehicleOperateTypeCodeList, val => {
  console.log(val, 'vehicleOperateTypeCodeList')
  if(val) {
    fMainData.lists[1].params.vehicleOperateTypeCodeList = val
  }
})

let emits = defineEmits(['getTable'])
let mainData = reactive({
  tableUrl: '/business/alarmAreaScopeEntity/pageByAlarmAreaId',
  showIndex: true,
  botHeight: 200,
  // isLoadStatus: true,
  columns: [
    { prop: 'vehicleOperateTypeNames', label: '控制营运类型' },
    {
      prop: 'permissionType',
      label: '控制类型',
      formatter: (row) => {
        return row.permissionType === 1 ? '节点' : '车辆'
      },
    },
    { prop: 'scopeName', label: '控制范围' },
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
          proxy.MessageBox({ msg: '确定删除吗？', type: 'warning' }).then((close) => {
            alarmAreaScopeDelete({ alarmAreaScopeId: row.alarmAreaScopeId }).then((res) => {
              if (!res) {
                ElMessage.success('删除成功!')
                close()
                drawerFlag = false
              }
            })
          })
        },
      },
    ],
  },
  formData: {
    alarmAreaId: 0,
    order: '',
    orderField: '',
    scopeName: '',
    pageNumber: 1,
    pageSize: 25,
  },
  lists: [{ label: '控制范围', key: 'scopeName', placeholder: '请输入控制范围', col: 12 }],
})

const setFormData = (obj) => {
  console.log(obj, 'obj')
  mainData.formData.alarmAreaId = obj.alarmAreaId
  fMainData.formData.alarmAreaId = obj.alarmAreaId
  // 每次弹窗清空表单
  fMainData.formData.nodeDtoList = []
  fMainData.formData.vehicleOperateTypeCodeList = []
  drawerFlag = true
  contentMainRef && contentMainRef.getTable()
}

const handleClose = () => {
  //
  fMainData.formData = {
    alarmAreaId: 0,
    nodeDtoList: [],
    vehicleOperateTypeCodeList: [],
  }
}

const onAdd = () => {
  alarmAreaScopeAdd(fMainData.formData)
    .then(() => {
      ElMessage.success('操作成功！')
      drawerFlag = false
      emits('getTable')
    })
    .catch(() => {})
}

const onClose = (val) => {
  drawerFlag = false
}

defineExpose({ setFormData })
</script>

<style scoped lang="scss">
.add-wrapper {
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
  // align-items: center;
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
