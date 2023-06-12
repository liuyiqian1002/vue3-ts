<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        <!--  编辑角色  -->
        <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable"/>

    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import {updateValid} from "@/api/operation/dispatching";


let drawer = $ref(false)
let drawerRef = $ref(null)
let title = $ref('')
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/business/planSendEntity/page',
    columns: [
        { prop: "planName", label: "计划名称" },
        { prop: "planType", label: "预约方式",filter: 'planSendTypes'},
        { prop: "planTime", label: "发送时间" },
        { prop: "code", label: "发送对象" },
        { prop: "sendContent", label: "发送内容" },
        { prop: "vaildEndTime", label: "生效起始日期" },
        { prop: "vaildStartTime", label: "生效结束日期" },
        { prop: "createUserName", label: "创建人" },
        { prop: "createTime", label: "创建时间" },
        { prop: "openStatus", label: "状态", width: 80, formatter: (row)=>{
                return row.openStatus?(<span style="color:#5AF2A1">启用</span>):(<span style="color:#C9CDD4">禁用</span>)
            }}
    ],
    headBtns: [
        {icon: 'add', name: '新增', formatter: (row) => proxy.$store.getters.permissions['operation-clgj-clbx-export'], click: (row)=> {
                title = '添加预约发送'
                drawerRef.setFormData({})
                drawer = true
            }},
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 100, btns:[
            {icon: 'bianji', name: '编辑', click: (row)=> {
                    title = `编辑预约发送`
                    drawerRef.setFormData(row,2)
                    drawer = true
                }},
            {icon: 'qiyong', name: '启用', formatter:(row)=> !row.openStatus, click: (row)=> {
                    proxy.MessageBox({msg: '确定启用当前角色吗？', type: 'warning'}).then((close) => {
                        updateValid({id: row.id, openStatus: true}).then(()=>{
                            getTable()
                            ElMessage.success('启用成功！')
                            close()
                        }).catch(()=>{
                            close()
                        })
                    })
                }},
            {icon: 'jinyong', name: '禁用', formatter:(row)=> row.openStatus, click: (row)=> {
                    proxy.MessageBox({msg: '确定禁用当前角色吗？', type: 'warning'}).then((close) => {
                        updateValid({id: row.id, openStatus: false}).then(()=>{
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
        "openStatus": "",
        "order": "",
        "orderField": "",
        "orgId": "",
        "vaildStartTime": "",
        "vaildEndTime": "",
        "pageNumber": 1,
        "pageSize": 25,
        "permissionType": "",
        "planName": "",
        "valid": ""
    },
    lists: [
        {label: '计划名称', key: 'planName', placeholder: '请输入计划名称'},
        {label: '组织结构', key: 'dataPermissionCode', placeholder: '请输入组织结构', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: { "hasDataPermission": true, needVehicle: false, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode', disabled: 'nocheck'}, permissionIds:[],},
        {key: 'vaildStartTime', label: '生效开始时间', type: 'date', data: {valueFormat: 'YYYY-MM-DD'}},
        {key: 'vaildEndTime', label: '生效结束时间', type: 'date', data: {valueFormat: 'YYYY-MM-DD'}},
        {label: '状态', key: 'openStatus', type:'select',filter: 'valid'},
    ],
})

const getTable = ()=>{
    contentMainRef.getTable()
}

</script>

<style scoped lang="scss">
.a { color: rgb(134,144,156);}
</style>
