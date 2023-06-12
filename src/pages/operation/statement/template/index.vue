<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        <!--  编辑角色  -->
        <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable"/>

    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import {updateValid} from "@/api/system/systemrecord/dictionaries";
import { getOneById } from "@/api/operation/statement/template";

let drawer = $ref(false)
let drawerRef = $ref(null)
let title = $ref('')
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/business/reportConfigEntity/page',
    columns: [
        { prop: "configName", label: "配置名称" }, // tamplateName
        { prop: "templateCategory", label: "模块样式",filter: 'reportTemplateStyle'},
        { prop: "templateType", label: "模块类型",filter: 'reportTemplateTypes'},
        { prop: "categoryName", label: "报表类别配置"},  // categoryName
        { prop: "createTime", label: "创建时间"},
        { prop: "createUserName", label: "创建人员"},
        { prop: "lastModifyTime", label: "更新时间"},
        { prop: "lastModifyUserName", label: "更新人员"},
        { prop: "state", label: "状态", width: 80, formatter: (row)=>{
                return proxy.getStatusTag(row.state)
            }}
    ],
    headBtns: [
        {icon: 'add', name: '新增', click: (row)=> {
                title = '新增报表模板配置'
                drawerRef.setFormData({})
                drawer = true
            }},
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 100, btns:[
            {icon: 'bianji', name: '编辑', click: (row)=> {
                    title = `编辑报表模板配置`
                    getOneById(row.id).then(res => {
                        console.log(res, 'getOneById')
                        drawerRef.setFormData(res,2)
                    })
                    drawer = true
                }},
            {icon: 'qiyong', name: '启用', formatter:(row)=> !row.valid, click: (row)=> {
                    proxy.MessageBox({msg: '确定启用当前角色吗？', type: 'warning'}).then((close) => {
                        updateValid({id: row.dictionaryTypeId, valid: true}).then(()=>{
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
                        updateValid({id: row.dictionaryTypeId, valid: false}).then(()=>{
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
        "name": "",
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25,
        "periodType": "",
        "dataSelectMode":"",
        "state": 1
    },
    lists: [
        {label: '配置名称', key: 'name', placeholder: '请输入配置名称'},
        {label: '状态：', key: 'state', type:'select', children: [{ value: 1, label: '启用', },{ value: 0, label: '禁用', }]},
    ],
})

const getTable = ()=>{
    contentMainRef.getTable()
}

</script>

<style scoped lang="scss">
.a { color: rgb(134,144,156);}
</style>
