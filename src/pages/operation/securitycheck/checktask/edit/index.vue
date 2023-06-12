<template>
  <div>
    <!-- @update:modelValue="modelValue" -->
    <tw-dialog :loading="false" :title="title" :isBtns="true" v-model="visible" @save="onSave"
      class="event-dialog-wrapper">
      <div class="content-wrapper">
        <div class="table-wrapper">
          <div class="title-item title-text">基本信息</div>
          <div class="ctent-wrapper table1">
            <!-- <div class="item" v-for="it in 10">
              <div class="label">{{ `任务名称${it}` }}</div>
              <div class="value">{{ `测试任务${it}` }}</div>
            </div> -->
            <tw-custom-form ref="fromDataRef" class="w1000" :lists="mainData.lists || []" :rules="mainData.rules"
              :formData="mainData.formData"></tw-custom-form>
          </div>
        </div>
        <div class="table-wrapper">
          <div class="title-item title-text tw_blr">
            <div>检查项目</div>
            <div><el-button type="primary" @click="() => onClick(1)">添加检查项</el-button></div>
          </div>
          <div class="ctent-wrapper">
            <el-table :data="mainData.formData.detailDtos" style="width: 100%">
              <el-table-column v-for="(column, index) in tableColumns1" :key="index" :prop="column.prop"
                :label="column.label" :width="column.width">
              </el-table-column>
              <el-table-column label="操作">
                <template #default="scope">
                  <div style="color: red;cursor: pointer;" @click="() => onDelete(scope.row, 1)">删除</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="table-wrapper">
          <div class="title-item title-text tw_blr">
            <div>检查档案</div>
            <div><el-button type="primary" @click="() => onClick(2)">添加检查档案</el-button></div>
          </div>
          <div class="ctent-wrapper">
            <el-table :data="mainData.formData.archivesDetailDtos" style="width: 100%">
              <el-table-column v-for="(column, index) in tableColumns2" :key="index" :prop="column.prop"
                :label="column.label" :width="column.width">
              </el-table-column>
              <el-table-column label="操作">
                <template #default="scope">
                  <div style="color: red;cursor: pointer;" @click="() => onDelete(scope.row, 2)">删除</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="table-wrapper unpass-wrapper">
          <div class="title-item title-text">待整改项</div>
          <div class="ctent-wrapper">
            <el-table :data="unPassList" style="width: 100%;height:300px;">
              <el-table-column v-for="(column, index) in tableColumns3" :key="index" :prop="column.prop"
                :label="column.label" :width="column.width">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- <div class="btn-submit">
          <el-button type="primary" @click="onSave">保存</el-button>
          <el-button @click="visible = false">取消</el-button>
        </div> -->
      </div>
      <Checkpro ref="CheckproRef" :hideHeadBtn="true" @checkSelect="checkSelect"></Checkpro>
      <Archives ref="ArchivesRef" :hideHeadBtn="true" @save="onArchivesSave"></Archives>
    </tw-dialog>
  </div>
</template>

<script setup lang="tsx">
import Checkpro from '../checkpro/index.vue'
import Archives from '../archives/index.vue'
import { CheckTaskResItem, unPassPage } from '@/api/operation/securitycheck/checktask';

const { title, dto, } = defineProps({
  title: { type: String, default: () => '' },
  dto: { type: Object, default: () => { } },
})
const proxy: any = getCurrentInstance()?.proxy

let visible = $ref(false)
const CheckproRef = $ref(null)
const ArchivesRef = $ref(null)
let row = $ref<CheckTaskResItem>()
const show = (obj: CheckTaskResItem) => {
  visible = true
  row = obj
  getUnPassPage(obj)
}
const checkSelect = (data) => {
  mainData.formData.detailDtos = data.arr
  console.log(data.arr, 'checkSelect detailDtos')
}
const onArchivesSave = (data) => {
  mainData.formData.archivesDetailDtos = data.arr
  console.log(data, 'onArchivesSave')
}
// CheckproRef.show()
let mainData = reactive({
  formData: {
    "adminUser": "",
    "adminUserName": "",
    "archivesDetailDtos": [ // 检查档案
      // {
      //   "categoryId": 0,
      //   "categoryName": "",
      //   "checkBasis": "",
      //   "checkContent": "",
      //   "checkRequire": "",
      //   "id": 0,
      //   "itemId": null,
      //   "itemName": "",
      //   "legalLiability": ""
      // }
    ],
    "checkBy": "",
    "checkTime": "",
    "checkUser": "",
    "checkUserName": "",
    "companyId": null,
    "companyName": "",
    "companyUser": "",
    "companyUserName": "",
    "detailDtos": [ // 检查项
      // {
      //   "categoryId": 0,
      //   "categoryName": "",
      //   "checkBasis": "",
      //   "checkContent": "",
      //   "checkRequire": "",
      //   "id": 0,
      //   "itemId": 0,
      //   "itemName": "",
      //   "legalLiability": ""
      // }
    ],
    "id": 0,
    "name": "",
    "planId": null,
    "planName": ""
  },
  lists: [
    { key: 'name', label: '任务名称：', placeholder: '请输入任务名称', col: 6 },
    { key: 'planId', label: '所属计划', col: 6, type: 'select', remote: true, url: '/business/tsSecurityCheckPlan/page', method: 'post', params: { havePermission: true }, props: { label: 'name', value: 'id' }, placeholder: '请选择所属计划' },
    { key: 'checkBy', label: '检查单位', col: 6, placeholder: '请选择检查单位' },
    { key: 'checkUser', label: '检查人员', col: 6, type: 'select', multiple: true, remote: true, url: '/system/user/selectPage', method: 'post', params: { havePermission: true }, props: { label: 'realName', value: 'userId' }, placeholder: '请选择检查人员' },
    // {label: '提交人员', key: 'userName', type: 'select', remote: true, url: '/system/user/associationUser', method: 'post', loadMore: true, params: {pageNumber: 1, pageSize: 25, valid: 1, havePermission: true,}, props: { label: 'realName', value: 'realName' }, placeholder: '请选择抽查人员',},
    { key: 'adminUser', label: '检查管理人', col: 6, type: 'select', multiple: true, remote: true, url: '/system/user/selectPage', method: 'post', params: { havePermission: true }, props: { label: 'realName', value: 'userId' }, placeholder: '请选择检查管理人' },
    { key: 'companyId', label: '受检单位', col: 6, type: 'select', remote: true, url: '/business/company/associateCompany', method: 'post', params: { havePermission: true }, props: { label: 'companyName', value: 'companyId' }, placeholder: '请选择受检单位' },
    { key: 'companyUser', label: '企业对接人', col: 6, type: 'select', multiple: true, remote: true, url: '/system/user/selectPage', method: 'post', params: { havePermission: true }, props: { label: 'realName', value: 'userId' }, placeholder: '请选择企业对接人' },
    { key: 'checkTime', label: '检查时间', col: 6, type: 'date', placeholder: '请选择检查时间', data: { valueFormat: 'YYYY-MM-DD' } },
  ],
  rules: {
    name: [
      { required: true, message: '任务名称', trigger: 'blur' },
    ],
    planId: [
      { required: true, message: '请选择所属计划', trigger: 'blur' },
    ],
    checkBy: [
      { required: true, message: '请选择检查单位', trigger: 'blur' },
    ],
    checkUser: [
      { required: true, message: '请选择检查人员', trigger: 'blur' },
    ],
    adminUser: [
      { required: true, message: '检查管理人', trigger: 'blur' },
    ],
    companyId: [
      { required: true, message: '受检单位', trigger: 'blur' },
    ],
    companyUser: [
      { required: true, message: '企业对接人', trigger: 'blur' },
    ],
    checkTime: [
      { required: true, message: '检查时间', trigger: 'blur' },
    ],
  },
})
let unPassList = $ref([])
const getUnPassPage = (obj) => {
  const query = {
    notEqualTaskId: obj.id
  }
  unPassPage(query).then(res => {
    console.log(res, 'res')
    if (res && res.rows) {
      unPassList = res.rows
    }
  })
}

const onClick = (type) => {
  if (type === 1) {
    console.log(CheckproRef, 'CheckproRef')
    CheckproRef && CheckproRef.show()
  } else if (type === 2) {
    // 添加档案
    ArchivesRef && ArchivesRef.show()
  }
}
const onDelete = (row, type) => {
  console.log(row, type)
  if (type === 1) { // 检查项目
    mainData.formData.detailDtos = mainData.formData.detailDtos.filter(it => {
      return it.id !== row.id
    })
  } else { // 检查档案
    mainData.formData.archivesDetailDtos = mainData.formData.archivesDetailDtos.filter(it => {
      return it.id !== row.id
    })
  }
}
const onSave = () => {
  console.log('on save')
}

const tableColumns1 = [
  {
    label: '检查分类',
    prop: 'categoryName'
  },
  {
    label: '检查要点',
    prop: 'checkRequire'
  },
  {
    label: '检查内容',
    prop: 'checkContent'
  },
]
const tableColumns2 = [
  {
    label: '档案分类',
    prop: 'name'
  },
]
const tableColumns3 = [
  {
    label: '项目分类',
    prop: 'categoryName'
  },
  {
    label: '检查内容',
    prop: 'checkContent'
  },
  {
    label: '检查时间',
    prop: 'checkTimeStr'
  },
]

defineExpose({ show })
</script>

<style scoped lang="scss">
.event-dialog-wrapper {
  :deep(.el-dialog) {
    .dialog__footer {
      padding: 0 !important;
    }
  }

  :deep(.el-scrollbar__view) {
    height: 100%;
    overflow-x: hidden;

    .dialog_content {
      height: 100%;

      // padding: 0 10px !important;
      .el-tabs__content {
        height: 660px;
        overflow: scroll;
      }
    }
  }


  .content-wrapper {
    display: flex;
    flex-direction: column;
    height: 90%;
    overflow: scroll;

    .title-item {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: #ccc;
      text-align: left;
      padding-left: 10px;
      box-sizing: border-box;
      // text-align: center;
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

    .unpass-wrapper {
      max-height: 300px;
    }
  }
}
</style>
