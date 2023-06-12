<template>
  <div class="alarm-process-wrapper">
    <ContentMain ref="contentMainRef" :mainData="mainData"></ContentMain>
    <!--    编辑    -->
    <Edit ref="editDialogRef" :title="title" @getTable="getTable"></Edit>
    <!--    详情    -->
    <Detail ref="detailDialogRef" :list="preprocessLists" :title="title"></Detail>
  </div>
</template>

<script setup lang="tsx">
import Edit from './edit/index.vue'
import Detail from './details/index.vue'
import { checkTask, CheckTaskQuery } from '@/api/operation/securitycheck/checktask'
import { checkPlanDelete, CheckPlanResItem } from '@/api/operation/securitycheck/checkplan'
let title = $ref('')
let editDialogRef = $ref(null)
let detailDialogRef = $ref(null)
let contentMainRef = $ref(null)
const proxy: any = getCurrentInstance()?.proxy
let list = $ref([]) // 勾选的行
let mainData = reactive({
  tableUrl: '/business/tsSecurityCheckPlan/page',
  columns: [
    { prop: 'name', label: '计划名称' },
    { prop: 'preparedBy', label: '制定单位' },
    { prop: 'planTypeName', label: '计划类型' },
    { prop: 'startTime', label: '开始日期' },
    { prop: 'endTime', label: '结束时间' },
    { prop: 'taskTotalCount', label: '任务数' },
    { prop: 'createUserName', label: '创建人' },
    { prop: 'createTime', label: '创建时间' },
  ],
  tableBtns: {
    prop: 'btns',
    label: '操作',
    fixed: 'right',
    width: 200,
    btns: [
      {
        icon: 'xiangqing',
        name: '详情',
        formatter: (row) => {
          return true
        },
        click: (row: CheckPlanResItem) => {
          title = `${row.name}详情`
          console.log(row, 'row')
          detailDialogRef.show(row)
          getDetailData(row)
        },
      },
      {
        icon: 'bianji',
        name: '修改',
        formatter: (row) => {
          return true
        },
        click: (row: CheckPlanResItem) => {
          title = `${row.name}修改`
          editDialogRef.show(row)
        },
      },
      {
        icon: 'shanchu',
        name: '删除',
        formatter: (row) => {
          return true
        },
        click: (row: CheckPlanResItem) => {
          ElMessageBox.confirm(`是否确定删除${row.name}检查计划?`, '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              checkPlanDelete({ id: row.id }).then((res) => {
                console.log('操作成功')
                ElMessage.success('操作成功')
                getTable()
              })
            })
            .catch((err) => {})
        },
      },
    ],
  },
  headBtns: [
    {
      icon: 'add',
      name: '新增',
      click: (row) => {
        title = '新增检查计划'
        editDialogRef.show()
      },
    },
  ],
  formData: {
    planTypeCode: '',
    startTime: proxy.$dayjs().startOf('month').format('YYYY-MM-DD'),
    endTime: proxy.$dayjs().endOf('month').format('YYYY-MM-DD'),
    order: '',
    orderField: '',
    name: '',
    pageNumber: 1,
    pageSize: 25,
  },
  lists: [
    {
      label: '计划类型',
      key: 'planTypeCode',
      type: 'select',
      method: 'post',
      filter: 'securityCheckPlanType',
      all: true,
      placeholder: '请选择计划类型',
    },
    {
      label: '计划名称',
      key: 'name',
      placeholder: '请输入计划名称',
    },
    {
      label: '时间范围',
      key: ['startTime', 'endTime'],
      type: 'esDate',
      data: { type: 'date', valueFormat: 'YYYY-MM-DD' },
      col: 8,
    },
  ],
})
let preprocessLists = $ref([])
// 检查任务数据
const getDetailData = (row: CheckPlanResItem) => {
  const query: CheckTaskQuery = {
    planId: row.id,
    pageNumber: 1,
    pageSize: 25,
  }
  checkTask(query).then((res) => {
    console.log(res, 'checkItemList')
    if (res) {
      preprocessLists = res.rows
    }
  })
}
const getTable = () => {
  contentMainRef.getTable()
}
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
