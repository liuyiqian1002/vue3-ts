<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        <!--  编辑角色  -->
        <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable"></edit>
        <!--  关联权限  -->
        <permission ref="permissionRef" :title="title" v-model:drawer="permissionDrawer" @getTable="getTable"></permission>
    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import permission from "./components/permission/index.vue"
import {updateValid} from "@/api/system/management/users";

let drawer = $ref(false)
let permissionDrawer = $ref(false)
let drawerRef = $ref(null)
let permissionRef = $ref(null)
let title = $ref('')
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/system/role/page',
    columns: [
        { prop: "roleName", label: "角色名称" },
        { prop: "roleType", label: "角色类型", filter: 'roleType'},
        { prop: "createUserName", label: "创建人" },
        { prop: "createTime", label: "创建时间"},
        { prop: "lastModifyUserName", label: "修改人" },
        { prop: "lastModifyTime", label: "修改时间" },
        { prop: "valid", label: "状态", width: 80, formatter: (row)=>{
                return row.valid?(<span style="color:#5AF2A1">启用</span>):(<span style="color:#C9CDD4">禁用</span>)
            }}
    ],
    headBtns: [
        {icon: 'add', name: '新增', click: (row)=> {
                title = '新增角色'
                drawerRef.setFormData({})
                drawer = true
            }},
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 160, btns:[
            {icon: 'bianji', name: '编辑', click: (row)=> {
                    title = `编辑角色`
                    drawerRef.setFormData(row)
                    drawer = true
                }},
            {icon: 'web', name: 'web', click: (row)=> {
                    title = `${row.roleName}关联WEB权限`
                    permissionRef.getDatalists(row, 1)
                }},
            // {icon: 'app', name: 'app', click: (row)=> {
            //         title = '编辑角色'
            //         permissionRef.getDatalists(row, 3)
            //         permissionDrawer = true
            //     }},
            {icon: 'jinyong', name: '禁用', formatter:(row)=> row.valid, click: (row)=> {
                    proxy.MessageBox({msg: '确定禁用当前角色吗？', type: 'warning'}).then((close) => {
                        updateValid({id: row.roleId, valid: false}).then(()=>{
                            getTable()
                            ElMessage.success('禁用成功！')
                            close()
                        }).catch(()=>{
                            close()
                        })
                    })
            }},
            {icon: 'qiyong', name: '启用', formatter:(row)=> !row.valid, click: (row)=> {
                    proxy.MessageBox({msg: '确定启用当前角色吗？', type: 'warning'}).then((close) => {
                        updateValid({id: row.roleId, valid: true}).then(()=>{
                            getTable()
                            ElMessage.success('启用成功！')
                            close()
                        }).catch(()=>{
                            close()
                        })
                    })
                }}
        ] },
    formData: {
        "keyword": "",
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25,
        "roleType": "",
        "valid": ''
    },
    lists: [
        {label: '角色名称', key: 'keyword', placeholder: '请输入'},
        {label: '角色类型', key: 'roleType', type:'select', children:[ {label:'全部', value:''}, {label:'通用角色', value:1},{label:'定制角色', value:2}]},
        {label: '状态', key: 'valid', type:'select', children:[ {label:'全部', value:''},{label:'启用', value: true},{label:'禁用', value:false}]},
    ],
})

const getTable = ()=>{
    contentMainRef.getTable()
}

</script>

<style scoped lang="scss">
.a { color: rgb(134,144,156);}
</style>
