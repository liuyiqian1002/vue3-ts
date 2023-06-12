<template>
  <div class="alarm-process-wrapper">
    <ContentMain ref="contentMainRef" :mainData="mainData" @checkSelect="checkSelect"></ContentMain>

    <!--    详情    -->
    <Edit ref="dialogRef" :title="title" @getTable="getTable"></Edit>
  </div>
</template>

<script setup lang="tsx">
import { checkItemDelete, CheckItemResItem } from '@/api/operation/securitycheck/checkproject'
import Edit from './edit/index.vue'
// import ContentMainExt from '@/components/ContentMainExt/index.vue'
const { hideHeadBtn } = defineProps({
  hideHeadBtn: { type: Boolean, default: () => false },
})
let title = $ref('')
let dialogRef = $ref(null)
let contentMainRef = $ref(null)
const proxy: any = getCurrentInstance()?.proxy
let list = $ref([]) // 勾选的行
// const checkSelect = (data) => {
//     console.log(data, 'data')
// }
let emits = defineEmits(['checkSelect'])
const checkSelect = (data) => {
  console.log(data, 'ckp checkSelect data')
  emits('checkSelect', data)
}
let mainData = reactive({
  tableUrl: '/business/tsSecurityCheckItem/page',
  isCheck: true,
  columns: [
    { prop: 'categoryName', label: '项目分类' },
    { prop: 'name', label: '检查要点' },
    // { prop: 'checkRequire', label: '检查要求' },
    { prop: 'checkContent', label: '检查内容' },
    { prop: 'checkBasis', label: '检查依据' },
    { prop: 'lastModifiedUser', label: '修改人' },
    { prop: 'lastModifiedTime', label: '修改时间' },
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
        click: (row: CheckItemResItem) => {
          title = `详情`
          dialogRef.show(row, 2)
        },
      },
      {
        icon: 'bianji',
        name: '编辑',
        formatter: (row) => {
          return true
        },
        click: (row: CheckItemResItem) => {
          title = `编辑`
          dialogRef.show(row, 1)
        },
      },
      {
        icon: 'shanchu',
        name: '删除',
        formatter: (row) => {
          return true
        },
        click: (row: CheckItemResItem) => {
          ElMessageBox.confirm(`是否确定删除${row.name}检查项?`, '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              checkItemDelete({ id: row.id }).then((res) => {
                console.log('删除成功')
                ElMessage.success('删除成功')
                getTable()
              })
            })
            .catch((err) => {})
        },
      },
    ],
  },
  headBtns: hideHeadBtn
    ? []
    : [
        {
          icon: 'add',
          name: '新增',
          click: (row) => {
            title = '新增检查项目'
            dialogRef.show({}, 0)
          },
        },
        // { icon: 'daochu', name: '导出', click: (row) => { } },
      ],
  formData: {
    companyId: '',
    startTime: proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
    endTime: proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
    alarmTypeCodeList: [],
    order: '',
    orderField: '',
    pageNumber: 1,
    pageSize: 25,
    vehicleCode: '',
  },
  lists: [
    {
      label: '项目分类',
      key: 'categoryId',
      type: 'select',
      remote: true,
      url: '/business/tsSecurityCheckCategory/page',
      method: 'post',
      loadMore: true,
      params: {
        pageNumber: 1,
        pageSize: 25,
        valid: 1,
        havePermission: true,
      },
      props: { label: 'name', value: 'id' },
      placeholder: '请选择项目分类',
    },
    {
      label: '检查内容',
      key: 'checkContent',
      placeholder: '请输入检查内容',
    },
  ],
})

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
