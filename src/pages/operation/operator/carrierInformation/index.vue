<template>
    <div>
        <content-main  ref="contentMainRef" :mainData="mainData"></content-main>
        
        <el-tabs v-model="activeName">
            <el-tab-pane label="视频配置" name="first">
                <videoconfig ref="videoconfigRef"></videoconfig>
            </el-tab-pane>
            <el-tab-pane label="接入配置" name="second">
                <service ref="systemRef"></service>
            </el-tab-pane>
        </el-tabs>
    
        <!--  编辑角色  -->
        <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable"/>
        <particulars ref="particularsRef" :title="title"/>
    </div>
    
</template>

<script setup lang="tsx">
import videoconfig from "../videoconfig/index.vue"
import service from "../service/index.vue"
import edit from "./components/edit/index.vue"
import particulars from "./components/particulars/index.vue"
import {updateValid} from "@/api/operation/operator/carrierInformation";

const afficheRef = $ref(null)
const activeName = ref('first')
let drawer = $ref(false)
let drawerRef = $ref(null)
let particularsRef = $ref(null)
let title = $ref('')
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/business/operatorEntity/page',
    isCheck: true,
    botHeight: 430,
    columns: [
        { prop: "name", label: "运营商" },
        { prop: "platformName", label: "平台名称",},
        { prop: "principalName", label: "负责人" },
        { prop: "principalCellPhone", label: "手机号码" },
        { prop: "principalPhone", label: "座机号码" },
        { prop: "address", label: "公司地址" },
        { prop: "valid", label: "状态", width: 80, formatter: (row)=>{
                return row.valid?(<span style="color:#5AF2A1">启用</span>):(<span style="color:#C9CDD4">禁用</span>)
            }}
    ],
    headBtns: [
        {icon: 'add', name: '新增', click: (row)=> {
                title = '添加运营商'
                drawerRef.setFormData({})
                drawer = true
            }},
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 100, btns:[
            {icon: 'bianji', name: '编辑', click: (row)=> {
                    title = `编辑运营商`
                    drawerRef.setFormData(row,2)
                    drawer = true
                }},
            // {icon: 'chakan', name: '详情', click: (row)=> {
            //         title = `运营商详情`
            //         particularsRef.setFormData(row,1)
            //         drawer = true
            //     }},
            {icon: 'qiyong', name: '启用', formatter:(row)=> !row.valid, click: (row)=> {
                    proxy.MessageBox({msg: '确定启用当前角色吗？', type: 'warning'}).then((close) => {
                        updateValid({id: row.operatorId, valid: true}).then(()=>{
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
                        updateValid({id: row.operatorId, valid: false}).then(()=>{
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
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25,
        "valid": ''
    },
    lists: [
        {label: '运营商：', key: 'name', placeholder: '请输入运营商名称'},
        {label: '视频配置：', key: 'accessConfigName',placeholder: '请输入视频配置'},
        {label: '视频类型：', key: 'videoType', type:'select',placeholder: '请选择视频类型',filter: 'videoType'},
        {label: '视频种类：', key: 'videoKind',type:'select',placeholder: '请选择视频种类',filter: 'videoKind'},
        {label: '状态：', key: 'd', type:'select', filter: 'valid'},
        {label: '接入配置：', key: 'a', placeholder: '请输入接入配置'},
        {label: '接入码：', key: 'b', placeholder: '请输入接入码'},
        {label: '用户名：', key: 'c', placeholder: '请输入用户名'},
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
