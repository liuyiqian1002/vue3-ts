<template>
    <div>
            <TwTable
                ref="contentMainRef"
                :url="mainData.tableUrl"
                :tableParams="mainData.formData"
                :mainData="mainData"
                :showIndex="mainData.showIndex"
                :tableIndex="1"
                :botHeight="mainData.botHeight"
                :columns="mainData.columns"
                :headBtns="mainData.headBtns"
                :tableBtns="mainData.tableBtns"
                :isCheck="mainData.isCheck"
            ></TwTable>
        <!--  编辑角色  -->
        <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable"/>
    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
// import {updateValid} from "@/api/operation/alert/voluntarily/videoconfig";
import { log } from "console";
import { type } from "os";

let drawer = $ref(false)
let drawerRef = $ref(null)
let title = $ref('')
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/business/alarmTemplate/pageByGroupId',
    isCheck: true,
    botHeight: 300,
    columns: [
        { prop: "alarmType", label: "报警类型"},
        { prop: "alarmSubsetType", label: "报警小类",filter: 'videoType'},
        { prop: "alarmLevel", label: "报警级别",filter: 'videoType'},
        { prop: "urlTemplate", label: "处警内容"},
        { prop: "createTime", label: "创建时间"},
        { prop: "createUserName", label: "创建人员"},
        { prop: "lastModifyTime", label: "更新时间"},
        { prop: "lastModifyUserName", label: "更新人员"},
        { prop: 'openStatus', label: '状态', width: 80, formatter: (row) => { return row.openStatus ? ( <span style="color:#5AF2A1">启用</span> ) : ( <span style="color:#C9CDD4">禁用</span> ) }, },
    ],
    headBtns: [
        {icon: 'add', name: '新增', click: (row)=> {
                title = '新增自动处警模板'
                drawerRef.setFormData({})
                drawer = true
            }},
        { icon: 'add', name: '导出', click: (row) => {} },
        ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 100, btns:[
      {icon: 'bianji', name: '编辑', click: (row)=> {
              title = `编辑自动处警模板`
               drawerRef.setFormData(row,2)
              drawer = true
          }},
      {icon: 'qiyong', name: '启用', formatter:(row)=> !row.valid, click: (row)=> {
              proxy.MessageBox({msg: '确定启用当前角色吗？', type: 'warning'}).then((close) => {
                  updateValid({id: row.id, valid: true}).then(()=>{
                      getTable()
                      ElMessage.success('启用成功！')
                      close()
                 }).catch(()=>{
                      close()
                  })
              })
           }},
      {icon: 'jinyong', name: '禁用', formatter:(row)=> row.valid, click: (row)=> {
              proxy.MessageBox({msg: '确定禁用当前角色吗？', type: 'warning'}).then((close) => {
                   updateValid({id: row.id, valid: false}).then(()=>{
                      getTable()
                       ElMessage.success('禁用成功！')
                      close()
                   }).catch(()=>{
                       close()
                   })
                })
       }}
     ]},
     formData: {
   "groupId": "",
   "order": "",
   "orderField": "",
   "pageNumber": 1,
   "pageSize": 25,
    },
})

const viewData = (row) => {
    mainData.formData = {
    "groupId": "",
    "order": "",
    "orderField": "",
    "pageNumber": 1,
    "pageSize": 25,
    }
}

defineExpose({ viewData })

const getTable = ()=>{
    contentMainRef.getTable()
}
</script>

<style scoped lang="scss">
</style>
