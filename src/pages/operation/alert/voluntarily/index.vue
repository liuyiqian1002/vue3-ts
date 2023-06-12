<template>
    <div>
        <content-main  ref="contentMainRef" :mainData="mainData"></content-main>
        <!--  编辑角色  -->
        <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable"/>
        <particulars ref="particularsRef" :title="title"/>
    </div>
    <el-tabs v-model="activeName">
           <el-tab-pane label="处警内容配置" name="first">
             <videoconfig ref="videoconfigRef"></videoconfig>
           </el-tab-pane>
       </el-tabs>
</template>

<script setup lang="tsx">
import videoconfig from "./videoconfig/index.vue"
import edit from "./components/edit/index.vue"
import particulars from "./components/particulars/index.vue"
import {updateValid} from '@/api/operation/alert/voluntarily';

const afficheRef = $ref(null)
const activeName = ref('first')
let drawer = $ref(false)
let drawerRef = $ref(null)
let particularsRef = $ref(null)
let title = $ref('')
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/business/alarmTempGroup/page',
    isCheck: true,
    botHeight: 430,
    columns: [
        { prop: "groupName", label: "模板名称" },
        { prop: "alarmHandelType", label: "处警方式",filter: 'alarmHandelType'},
        { prop: "tempCount", label: "报警项" },
        { prop: "createTime", label: "创建时间" },
        { prop: "createUserName", label: "创建人员" },
        { prop: "lastModifyTime", label: "修改时间" },
        { prop: "lastModifyUserName", label: "修改人员" },
        { prop: "openStatus", label: "状态", width: 80, formatter: (row)=>{
                return row.openStatus?(<span style="color:#5AF2A1">启用</span>):(<span style="color:#C9CDD4">禁用</span>)
            }}
    ],
    headBtns: [
        {icon: 'add', name: '新增', click: (row)=> {
                title = '新增模板配置'
                drawerRef.setFormData({})
                drawer = true
            }},
            { icon: 'add', name: '导出', click: (row) => {} },
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 100, btns:[
            {icon: 'bianji', name: '编辑', click: (row)=> {
                    title = `编辑模板配置`
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
        "groupName": "",
        "openStatus": "",
        "order": "",
        "orderField": "",
        "nodeDtoList": "",
        "pageNumber": 1,
        "pageSize": 25,
        "vehicleCode": "",
        "valid": ""
    },
    lists: [
        {label: '模板名称', key: 'groupName', placeholder: '请输入模板名称'},
        {label: '车牌号：', key: 'vehicleCode', type:'select', remote: true, url: '/business/vehicle/associationPlateNum', method: 'post', loadMore: true, params: {pageNumber: 1, pageSize: 25, valid: 1,havePermission: true}, props:{ label: 'plateNum', value:'vehicleCode'}, placeholder: '请选择车牌号码'},
        {label: '处警方式：', key: 'alarmHandelType', type:'select',placeholder: '请选择处警方式',filter: 'alarmHandelType'},
        {label: '状态：', key: 'openStatus', type:'select', filter: 'valid'},
    ],
})

const getTable = ()=>{
    contentMainRef.getTable()
}

</script>

<style scoped lang="scss">
.a { color: rgb(134,144,156);}
:deep(.el-tabs__header) {
    padding-left: 20px;
    margin: 0;
}
</style>
