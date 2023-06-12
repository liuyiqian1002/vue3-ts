<template>
  <div>
    <!-- <TwTable class="pt0" v-if="drawer" ref="contentMainRef" id="videoconfig_table" :showPagination="true"
            :lists="lists" :mainData="mainData" :botHeight="mainData.botHeight" :columns="mainData.columns"
            :headBtns="mainData.headBtns" :tableBtns="mainData.tableBtns" :isCheck="mainData.isCheck"></TwTable> -->
    <content-main ref="contentMainRef" :mainData="mainData" @select="checkSelect"></content-main>
    <!--  编辑角色  -->
    <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable" />
  </div>
</template>

<script setup lang="tsx">
import edit from './components/edit/index.vue'
import { updateValid } from '@/api/operation/operator/videoconfig'
import { getListByCategoryId } from '@/api/operation/statement/type'

let drawer = $ref(false)
let drawerRef = $ref(null)
let title = $ref('')
let lists = $ref([])
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
  id: 'videoconfig_table',
  tableUrl: '/business/reportAlarmCategoryConfig/pageByCategoryId',
  isCheck: true,
  showPagination: true,
  // botHeight: 220,
  columns: [
    { prop: 'alarmCategoryCode', label: '报警类别编码' },
    { prop: 'alarmCategoryName', label: '报警类别名称' },
    { prop: 'alarmTypeName', label: '报警类型名称' },
    {
      prop: 'state',
      label: '状态',
      width: 100,
      formatter: (row) => {
        return row.state ? (
          <span>
            <span class="dot line-block bgSuccess mr5"></span>启用
          </span>
        ) : (
          <span>
            <span class="dot line-block bgGrey_2 mr5"></span>禁用
          </span>
        )
      },
    },
  ],
  headBtns: [
    {
      icon: 'add',
      name: '新增',
      click: (row) => {
        title = '新增明细报警类型'
        drawerRef.setFormData({})
        drawer = true
      },
    },
    { icon: 'add', name: '导出', click: (row) => {} },
  ],
  tableBtns: {
    prop: 'btns',
    label: '操作',
    fixed: 'right',
    width: 100,
    btns: [
      {
        icon: 'bianji',
        name: '编辑',
        click: (row) => {
          title = `编辑明细报警类型`
          drawerRef.setFormData(row, 2)
          drawer = true
        },
      },
      {
        icon: 'qiyong',
        name: '启用',
        formatter: (row) => !row.valid,
        click: (row) => {
          proxy.MessageBox({ msg: '确定启用当前角色吗？', type: 'warning' }).then((close) => {
            updateValid({ id: row.id, valid: true })
              .then(() => {
                getTable()
                ElMessage.success('启用成功！')
                close()
              })
              .catch(() => {
                close()
              })
          })
        },
      },
      {
        icon: 'jinyong',
        name: '禁用',
        formatter: (row) => row.valid,
        click: (row) => {
          proxy.MessageBox({ msg: '确定禁用当前角色吗？', type: 'warning' }).then((close) => {
            updateValid({ id: row.id, valid: false })
              .then(() => {
                getTable()
                ElMessage.success('禁用成功！')
                close()
              })
              .catch(() => {
                close()
              })
          })
        },
      },
    ],
  },
  formData: {
    categoryId: 0,
    keyword: '',
    pageNumber: 1,
    pageSize: 25,
  },
  lists: [{ label: '类别名称：', key: 'keyword', col: 12, placeholder: '请输入类别名称' }],
})

const viewData = (row) => {
  mainData.formData.categoryId = row.id
  // drawer = true
  // getListByCategoryId({ categoryId: row.id }).then(res => {
  //     lists = res
  // })
  getTable()
}
const setFormData = (obj) => {
  drawerRef.setFormData(obj)
}

const getTable = () => {
  contentMainRef.getTable()
}
const checkSelect = () => {}
defineExpose({ viewData, setFormData })
</script>

<style scoped lang="scss"></style>
