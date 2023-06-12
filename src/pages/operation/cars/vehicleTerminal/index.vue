<template>
    <div>
        <content-main  ref="contentMainRef" :mainData="mainData"></content-main>
        <!--    编辑    -->
        <edit ref="drawerRef" :title="title" @getTable="getTable"></edit>
    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import {updateValid } from "@/api/operation/cars/vehicleTerminal";
    
    let title = $ref('')
let drawerRef = $ref(null)
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/business/terminalType/page',
    isCheck: true,
    columns: [
        { prop: "terminalClassify", label: "终端分类", filter: 'terminalClassify' },
        { prop: "name", label: "终端名称" },
        { prop: "terminalModel", label: "终端型号" },
        { prop: "terminalProtocolCode", label: "协议名称" },
        { prop: "manufacturer", label: "生产厂家" },
        { prop: "recorderVersion", label: "行驶记录仪版本" },
        { prop: "remark", label: "备注" },
    ],
    headBtns: [
        {
            name: '新增',
            click: ()=> {
                title = `新增终端类型`
                drawerRef.setFormData()
            }},
        {
            icon: 'daochu',
            name: '导出',
            click: () => {
                let lists = contentMainRef.getAllCheck();
                let ids = proxy.$_.map(lists, 'code');
                let txt = ids.length>0?`请确定导出选中的${ids.length}条数据吗？`:`请确定导出全部数据`
                proxy.MessageBox({msg: txt, type: 'warning'}).then((close) => {
                    // insuranceExport({...mainData.formData, ...{ids:ids}}).then((res)=>{
                    //     window.open(res.fileUrl)
                    //     close()
                    // }).catch(()=>{
                    //     close()
                    // })
                })
        
            }, }
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 80, btns:[
            {icon: 'bianji', name: '编辑', click: (row)=> {
                    title = `编辑终端类型`
                    drawerRef.setFormData(row)
                }},
            {icon: 'shanchu', name: '删除',
                click: (row)=> {
                    proxy.MessageBox({msg: `确定删除${row.name}终端吗？`, type: 'warning'}).then((close) => {
                        updateValid({idList:[row.terminalTypeId]}).then((res)=>{
                            getTable()
                            close()
                        }).catch(()=>{
                            close()
                        })
                    })
                }
            }
        ] },
    formData: {
        "name": "",
        "order": "",
        "orderField": "",
        "terminalClassify": '',
        "terminalModel": "",
        "pageNumber": 1,
        "pageSize": 25,
    },
    lists: [
        {label: '终端分类', key: 'terminalClassify', type:'select', filter: 'terminalClassify'},
        {label: '终端名称', key: 'name',placeholder: '请输入终端名称'},
        {label: '终端型号', key: 'terminalModel',placeholder: '请输入终端型号'},
    ],
})

const getTable = ()=>{
    contentMainRef.getTable()
}
</script>

<style scoped lang="scss">

</style>
