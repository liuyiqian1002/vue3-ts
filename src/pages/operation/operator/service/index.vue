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
                :showPagination="false"
            ></TwTable>
        <!--  编辑角色  -->
        <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable"/>

    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import {updateValid} from "@/api/operation/operator/service";

let drawer = $ref(false)
let drawerRef = $ref(null)
let title = $ref('')
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/business/operatorAccessInfo/page',
    botHeight: 80,
    columns: [
        { prop: "accessInfoName", label: "配置名称" },
        { prop: "accessCode", label: "接入码",},
        { prop: "userId", label: "用户名" },
        { prop: "userPassword", label: "密码" },
        { prop: "encryptFlag", label: "是否加密" },
        { prop: "encryptM1", label: "加密参数M1" },
        { prop: "encryptIa1", label: "加密参数IA1" },
        { prop: "encryptIc1", label: "加密参数IC1" },
        { prop: "valid", label: "状态", width: 80, formatter: (row)=>{
                    return row.valid?(<span style="color:#5AF2A1">启用</span>):(<span style="color:#C9CDD4">禁用</span>)
            }}
    ],
    headBtns: [
        {icon: 'add', name: '新增', click: (row)=> {
                title = '添加接入端配置'
                drawerRef.setFormData({})
                drawer = true
            }},
        { icon: 'add', name: '导出', click: (row) => {} },
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 100, btns:[
            {icon: 'bianji', name: '编辑', click: (row)=> {
                    title = `新增接入端配置`
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
        ] },
    formData: {
        "accessCode": "",
        "accessInfoName": "",
        "operatorId": "",
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25,
        "userName": "",
        "valid": '',
  "accessInfoId": "",
  "encryptFlag": "",
  "encryptIa1": "",
  "encryptIc1": "",
  "encryptM1": "",
  "entryPointId": "",
  "filterContent": "",
  "filterFlag": "",
  "operatorName": "",
  "remark": "",
  "userId": "",
  "userPassword": "",        
    },
})

const viewData = (row) => {
    mainData.formData = {
        "accessCode": "",
        "accessInfoName": "",
        "operatorId":  "",
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25,
        "userName": "",
        "valid": '',
        "accessInfoId": "",
  "encryptFlag": "",
  "encryptIa1": "",
  "encryptIc1": "",
  "encryptM1": "",
  "entryPointId": "",
  "filterContent": "",
  "filterFlag": "",
  "operatorName": "",
  "remark": "",
  "userId": "",
  "userPassword": "",  
    }
}

defineExpose({ viewData })

const getTable = ()=>{
    contentMainRef.getTable()
}

</script>

<style scoped lang="scss">
.a { color: rgb(134,144,156);}
</style>
