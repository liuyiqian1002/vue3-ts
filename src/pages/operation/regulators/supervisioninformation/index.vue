<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        <!--  编辑监管部门-基础信息  -->
        <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable"/>

    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import {updateValid} from "@/api/operation/regulators/supervisioninformation";

let drawer = $ref(false)
let drawerRef = $ref(null)
let title = $ref('')
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/business/regulatorsEntity/page',
    isCheck: true,
    columns: [
        { prop: "name", label: "监管部门" },
        { prop: "companyName", label: "所属区域" , width: 200, formatter:(row)=> `${row.provinceName || ''} ${row.cityName || ''} ${row.districtName || ''}` },
        { prop: "principalName", label: "负责人" },
        { prop: "principalCellPhone", label: "手机号" },
        { prop: "principalPhone", label: "座机号" },
        { prop: "address", label: "地址" },
        { prop: "valid", label: "状态", width: 80, formatter: (row)=>{
                return row.valid?(<span style="color:#5AF2A1">启用</span>):(<span style="color:#C9CDD4">禁用</span>)
            }}
    ],
    headBtns: [
        {icon: 'add', name: '新增', click: (row)=> {
                title = '新增监管部门信息'
                drawerRef.setFormData()
                drawer = true
            }},
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 100, btns:[
            {icon: 'bianji', name: '编辑', click: (row)=> {
                    title = `编辑监管部门信息`
                    drawerRef.setFormData(row,2)
                    drawer = true
                }},
            {icon: 'qiyong', name: '启用', formatter:(row)=> !row.valid, click: (row)=> {
                    proxy.MessageBox({msg: '确定启用当前角色吗？', type: 'warning'}).then((close) => {
                        updateValid({id: row.regulatorsId, valid: true}).then(()=>{
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
                        updateValid({id: row.regulatorsId, valid: false}).then(()=>{
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
       "valid": '',
    },
    lists: [
        {label: '监管部门', key: 'name', placeholder: '请输入监管部门'},
        {label: '状态：', key: 'valid', type:'select', filter: 'valid'},
    ],
})

const getTable = ()=>{
    contentMainRef.getTable()
}

</script>

<style scoped lang="scss">
.a { color: rgb(134,144,156);}
</style>
