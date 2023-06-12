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
                :showPagination="false"
            ></TwTable>
        <!--  编辑角色  -->
        <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable"/>
    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import {updateValid} from "@/api/operation/operator/videoconfig";

let drawer = $ref(false)
let drawerRef = $ref(null)
let title = $ref('')
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/business/videoConfigEntity/page',
    isCheck: true,
    botHeight: 80,
    showPagination: false,
    columns: [
        { prop: "displayName", label: "配置名称"},
        { prop: "videoType", label: "视频类型",filter: 'videoType'},
        { prop: "viewPath", label: "页面视图"},
        { prop: "urlTemplate", label: "地址模板"},
        { prop: "params", label: "自定义参数"},
        { prop: "videoKind", label: "视频种类", filter: 'videoKind'},
        { prop: 'valid', label: '状态', width: 80, formatter: (row) => { return row.valid ? ( <span style="color:#5AF2A1">启用</span> ) : ( <span style="color:#C9CDD4">禁用</span> ) }, },
    ],
    headBtns: [
        {icon: 'add', name: '新增', click: (row)=> {
                title = '新增运营商视频配置'
                drawerRef.setFormData({})
                drawer = true
            }},
        { icon: 'add', name: '导出', click: (row) => {} },
        ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 100, btns:[
      {icon: 'bianji', name: '编辑', click: (row)=> {
              title = `编辑运营商视频配置`
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
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25,
        "valid": '',
    },
})

const viewData = (row) => {
    mainData.formData = {
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25,
        "valid": '',
    }
}

defineExpose({ viewData })

const getTable = ()=>{
    contentMainRef.getTable()
}
</script>

<style scoped lang="scss">
</style>
