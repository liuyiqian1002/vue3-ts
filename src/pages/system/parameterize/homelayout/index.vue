<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable"></edit>
    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import {updateValid} from "@/api/system/parameterize/homelayout";

let drawer = $ref(false)
let drawerRef = $ref(null)
let title = $ref('')
let contentMainRef = $ref(null)
let store = useStore()
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/system/homePageConfig/page',
    columns: [
        { prop: "configName", label: "配置名称" },
        { prop: "provinceName", label: "省名称"},
        { prop: "cityName", label: "市名称" },
        { prop: "showModules", label: "展示模块", formatter:()=>{
        
        }},
        { prop: "status", label: "是否默认", width: 90, formatter: (row)=>{
                return row.status?(<span>默认</span>):(<span>非默认</span>)
            }}
    ],
    headBtns: [
        {icon: 'add', name: '新增', click: (row)=> {
                title = '首页设置'
                drawerRef.setFormData({})
                drawer = true
            }},
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 90,  btns:[
            {icon: 'bianji', name: '编辑', click: (row)=> {
                    title = `首页设置`
                    drawerRef.setFormData(row)
                    drawer = true
                }},
            // {icon: 'jinyong', name: '禁用', formatter:(row)=> row.valid, click: (row)=> {
            //         proxy.MessageBox({msg: '确定禁用当前角色吗？', type: 'warning'}).then((close) => {
            //             updateValid({id: row.roleId, valid: false}).then(()=>{
            //                 getTable()
            //                 ElMessage.success('禁用成功！')
            //                 close()
            //             }).catch(()=>{
            //                 close()
            //             })
            //         })
            // }},
            {icon: 'playCircle', name: '设置默认', formatter:(row)=> !row.status, click: (row)=> {
                    proxy.MessageBox({msg: '确认设为默认配置？', type: 'warning'}).then((close) => {
                        updateValid({id: row.id, valid: true}).then(()=>{
                            getTable()
                            ElMessage.success('配置成功！')
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
        "valid": "",
        "showModules":'',
    },
    lists: [
        {label: '城市名称', key: 'keyword', placeholder: '请输入'},
    ],
})

const getTable = ()=>{
    contentMainRef.getTable()
}

</script>

<style scoped lang="scss">
.a { color: rgb(134,144,156);}
</style>
