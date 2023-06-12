<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        <!--  编辑角色  -->
        <edit ref="drawerRef" :title="title" @getTable="getTable"/>
        <!--  查看详情  -->
        <detailsDom ref="detailsRef" :title="title" @getTable="getTable"/>
    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import detailsDom from "./components/detailsDom/index.vue"
import {updateValid} from "@/api/system/systemrecord/dictionaries";

let drawer = $ref(false)
let drawerRef = $ref(null)
let detailsRef = $ref(null)
let title = $ref('')
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/system/dictionaryTypeEntity/page',
    columns: [
        { prop: "dictionaryTypeId", label: "序号" },
        { prop: "name", label: "名称",},
        { prop: "code", label: "字典类型编码" },
        { prop: "valid", label: "状态", width: 80, formatter: (row)=>{
                return row.valid?(<span style="color:#5AF2A1">启用</span>):(<span style="color:#C9CDD4">禁用</span>)
            }}
    ],
    headBtns: [
        {icon: 'add', name: '新增', click: (row)=> {
                title = '添加字典类型'
                drawerRef.setFormData({})
                drawer = true
            }},
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 120, btns:[
            {icon: 'xiangqing', name: '详情', click: (row)=> {
                    title = `详情`
                    console.log(detailsRef);
                    detailsRef.setFormData(row,2)
                }},
            {icon: 'bianji', name: '编辑', click: (row)=> {
                    title = `编辑字典类型`
                    drawerRef.setFormData(row,2)
                }},
            {icon: 'qiyong', name: '启用', formatter:(row)=> !row.valid, click: (row)=> {
                    proxy.MessageBox({msg: `确定启用${row.name}吗？`, type: 'warning'}).then((close) => {
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
                    proxy.MessageBox({msg: `确定禁用${row.name}吗？`, type: 'warning'}).then((close) => {
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
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25,
        "valid": ''
    },
    lists: [
        {label: '字典类型名称', key: 'name', placeholder: '请输入字典类型名称'},
        {label: '字典类型编码', key: 'code', placeholder: '请输入字典类型编码' },
    ],
})

const getTable = ()=>{
    contentMainRef.getTable()
}

</script>

<style scoped lang="scss">
.a { color: rgb(134,144,156);}
</style>
