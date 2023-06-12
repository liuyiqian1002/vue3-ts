<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
       
        <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable"></edit>
    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import {updateValid} from "@/api/system/management/province"; //省市区启动禁用接口

let drawer = $ref(false)
let drawerRef = $ref(null)
let title = $ref('')
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/system/area/page',
    columns: [
        { prop: "code", label: "编码" },
        { prop: "charCode", label: "字符码", },
        { prop: "name", label: "名称" },
        { prop: "parentCode", label: "上级编码"},
        { prop: "shortName", label: "简称" },
        { prop: "areaType", label: "类型", filter: 'areaType' },
        { prop: "valid", label: "状态", formatter: (row)=>{ return row.valid?(<span style="color:#5AF2A1">启用</span>):(<span>禁用</span>) }}
    ],
    headBtns: [
        {icon: 'add', name: '新增', click: (row)=> {
                title = '添加区域信息'
                drawerRef.setFormData({})
                drawer = true
            }},
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 70, btns:[
            {icon: 'jinyong', name: '禁用', formatter:(row)=> row.valid, click: (row)=> {
                    proxy.MessageBox({msg: '确定禁用此名称吗？', type: 'warning'}).then((close) => {
                        updateValid({id: row.areaId, valid: false}).then(()=>{
                            getTable()
                            ElMessage.success('禁用成功！')
                            close()
                        }).catch(()=>{
                            close()
                        })
                    })
            }},
            {icon: 'qiyong', name: '启用', formatter:(row)=> !row.valid, click: (row)=> {
                    proxy.MessageBox({msg: '确定启用此名称吗？', type: 'warning'}).then((close) => {
                        updateValid({id: row.areaId, valid: true}).then(()=>{
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
        "code": "",
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25,
        "areaType": "",
        "valid": ''
    },
    lists: [
        {label: '编码', key: 'code', placeholder: '请输入'},
        {label: '上级编码', key: 'parentCode',placeholder: '请输入'},
        {label: '名称', key: 'name',placeholder: '请输入'},
        {label: '类型', key: 'areaType', type:'select', children:[{label:'全部', value:''}, {label:'省', value:1}, {label:'市', value:2},{label:'区', value:3}]},
    ],
})

const getTable = ()=>{
    contentMainRef.getTable()
}

</script>

<style scoped lang="scss">
.a { color: rgb(134,144,156);}
</style>
