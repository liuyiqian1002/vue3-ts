<template>
  <div class="type-wrapper">
    <div class="content-wrapper">
      <div class="left-wrapper">
        <div class="title-item">报警类型配置</div>
        <div class="add-wrapper">
          <div class="title">新增报表报警类型</div>
          <div class="edit-form">
            <edit ref="editRef" @getTable="getTable"></edit>
          </div>
        </div>
        <content-main ref="contentMainRef" :mainData="mainData" @select="checkSelect" @tableCallback="tableCallback"></content-main>
      </div>
      <div class="right-wrapper">
        <div class="title-item">报警类别设置</div>
        <videoconfig ref="videoconfigRef"></videoconfig>
      </div>
    </div>
    <!--  编辑角色  -->
    <!-- <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable"/> -->
    <particulars ref="particularsRef" :title="title" />
  </div>
</template>

<script setup lang="tsx">
import videoconfig from './videoconfig/index.vue'
import edit from './components/edit/index.vue'
import particulars from './components/particulars/index.vue'
import { updateValid } from '@/api/operation/operator/carrierInformation'

const afficheRef = $ref(null)
let drawer = $ref(false)
let editRef = $ref(null)
let particularsRef = $ref(null)
let videoconfigRef = $ref(null)
let title = $ref('')
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()

// 获取状态标签
// TODO 做成公共组件或者函数
const getStatusTag = (status) => {
    return status ? (
        <span><span class="dot line-block bgSuccess mr5"></span>启用</span>
    ) : (
        <span><span class="dot line-block bgGrey_2 mr5"></span>禁用</span>
    )
}

let mainData = reactive({
  tableUrl: '/business/reportAlarmCategory/page',
  isCheck: true,
  showPagination: true,
  // botHeight: 220,
  columns: [
    { prop: 'configName', label: '配置名称' },
    { prop: 'totalCount', label: '报警项' },
    {
      prop: 'state',
      label: '状态',
      width: 100,
      formatter: (row) => {
        return getStatusTag(row.state)
      },
    },
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
          title = `编辑`
          editRef.setFormData(row, 2)
          drawer = true
        },
      },
      {
        icon: 'qiyong',
        name: '启用',
        formatter: (row) => !row.valid,
        click: (row) => {
          proxy.MessageBox({ msg: '确定启用当前角色吗？', type: 'warning' }).then((close) => {
            updateValid({ id: row.operatorId, valid: true })
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
            updateValid({ id: row.operatorId, valid: false })
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
    configName: '',
    order: '',
    orderField: '',
    pageNumber: 1,
    pageSize: 25,
    state: '',
  },
  lists: [
    { label: '配置名称：', key: 'configName', col: 12, placeholder: '请输入配置名称' },
    { label: '类型状态：', key: 'state', col: 12, type: 'select', filter: 'valid' },
  ],
})

const tableCallback = (lists) => {
  console.log(videoconfigRef)
  videoconfigRef.viewData(lists[0])
}

const getTable = () => {
  contentMainRef.getTable()
}

const checkSelect = () => {}
</script>

<style scoped lang="scss">
.a {
  color: rgb(134, 144, 156);
}
:deep(.el-tabs__header) {
  padding-left: 20px;
  margin: 0;
}
:deep(.el-table) {
    th.el-table__cell {
        text-align: left;
    }
}
.type-wrapper {
  .content-wrapper {
    display: flex;
    justify-content: space-between;
    & > div {
      width: 50%;
      box-sizing: border-box;
      border: 1px solid #c7c7c7;
      .title-item {
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        padding: 20px 0 20px 0;
        border-bottom: 1px solid #c7c7c7;
      }
    }
    .add-wrapper {
      padding: 10px;
      border-bottom: 1px solid #c7c7c7;
      .title {
        font-size: 16px;
        font-weight: 600;
        text-align: left;
        padding: 10px 0 10px 20px;
      }
      .edit-form {
        padding-left: 100px;
      }
    }
  }
}
</style>
