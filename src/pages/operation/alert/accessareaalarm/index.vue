<template>
  <div>
    <content-main ref="contentMainRef" :mainData="mainData"></content-main>
    <!--    编辑    -->
    <edit ref="drawerRef" :title="title" :editType="editType" @getTable="getTable"></edit>
    <controlRange ref="controlRangeRef" :title="title" @getTable="getTable"></controlRange>
    <audioAnnouncement ref="audioAnnouncementRef" :title="title" @getTable="getTable"></audioAnnouncement>
  </div>
</template>

<script setup lang="tsx">
import edit from './edit/index.vue'
import controlRange from './controlrange/index.vue'
import audioAnnouncement from './audioannouncement/index.vue'
import { alarmAreaExport, updateValid } from '@/api/operation/alert/accessareaalarm'
let title = $ref('')
let editType = $ref('add')
let drawerRef = $ref(null)
let controlRangeRef = $ref(null)
let audioAnnouncementRef = $ref(null)
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
  tableUrl: '/business/alarmArea/page',
  isCheck: true,
  columns: [
    { prop: 'name', label: '区域名称' },
    { prop: 'alarmTypeCode', label: '报警类型', filter: 'alarmAreaTypeCode' },
    { prop: 'alarmLevel', label: '风险区域', filter: 'alarmAreaTypes' },
    { prop: 'beginTime', label: '限制开始时间' },
    { prop: 'endTime', label: '限制结束时间' },
    { prop: 'controlArea', label: '限制对象名称' },
    { prop: 'remark', label: '备注' },
    {
      prop: 'valid',
      label: '状态',
      formatter: (row) => {
        return row.valid ? (
          <span>
            <span class="dot line-block bgSuccess mr5"></span>有效
          </span>
        ) : (
          <span>
            <span class="dot line-block bgGrey_2 mr5"></span>无效
          </span>
        )
      },
    },
  ],
  headBtns: [
    {
      icon: 'add',
      name: '新增',
      click: () => {
        title = `新增进/出区域报警`
        editType = 'add'
        drawerRef.setFormData()
      },
    },
    {
      icon: 'daochu',
      name: '导出',
      formatter: () => proxy.$store.getters.permissions['operation-jjxg-jxqy-export'],
      click: () => {
        let lists = contentMainRef.getAllCheck()
        // let ids = proxy.$_.map(lists, 'insuranceId')
        let txt = lists.length > 0 ? `请确定导出选中的${lists.length}条数据吗？` : `请确定导出全部数据`
        proxy.MessageBox({ msg: txt, type: 'warning' }).then((close) => {
          alarmAreaExport({
            ...mainData.formData,
          })
            .then((res) => {
              // window.open(res.fileUrl)
              proxy.downloadByUrl(res.fileUrl, res.fileName)
              close()
            })
            .catch(() => {
              close()
            })
        })
      },
    },
  ],
  tableBtns: {
    prop: 'btns',
    label: '操作',
    fixed: 'right',
    width: 150,
    btns: [
      {
        icon: 'bianji',
        name: '编辑',
        click: (row) => {
          title = `进/出区域报警设置`
          editType = 'edit'
          drawerRef.setFormData(row)
        },
      },
      {
        icon: 'qiyong',
        name: '启用',
        formatter: (row) => !row.valid,
        click: (row) => {
          proxy.MessageBox({ msg: '确定启用当前线路吗？', type: 'warning' }).then((close) => {
            updateValid({ id: row.alarmAreaId, valid: true })
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
          proxy.MessageBox({ msg: '确定禁用当前线路吗？', type: 'warning' }).then((close) => {
            updateValid({ id: row.alarmAreaId, valid: false })
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
      {
        icon: 'kongzhifanwei',
        name: '控制范围',
        click: (row) => {
          title = `控制范围`
          console.log(controlRangeRef, 'controlRangeRef')
          controlRangeRef && controlRangeRef.setFormData(row)
        },
      },
      {
        icon: 'peizhiyuyinmianban',
        name: '配置语音播报',
        click: (row) => {
          title = `配置语音播报`
          console.log(audioAnnouncementRef, 'audioAnnouncementRef')
          audioAnnouncementRef && audioAnnouncementRef.setFormData(row)
        },
      },
    ],
  },
  formData: {
    alarmLevel: null,
    alarmTypeCode: '',
    name: '',
    order: '',
    orderField: '',
    valid: null,
    pageNumber: 1,
    pageSize: 25,
  },
  lists: [
    { label: '区域名称', key: 'name', placeholder: '请输入区域名称' },
    { label: '报警类型', key: 'alarmTypeCode', type: 'select', filter: 'alarmAreaTypeCode', placeholder: '请选择报警类型' },
    { label: '风险区域', key: 'alarmLevel', type: 'select', filter: 'alarmAreaTypes', placeholder: '请选择风险区域' },
    {
      label: '是否有效',
      key: 'valid',
      type: 'select',
      children: [
        { label: '全部', value: null },
        { label: '有效', value: true },
        { label: '无效', value: false },
      ],
      placeholder: '请输入线路名称或区域名称',
    },
  ],
})

const getTable = () => {
  contentMainRef.getTable()
}
</script>

<style scoped lang="scss"></style>
