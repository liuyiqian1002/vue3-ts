<template>
    <div>
        <content-main  ref="contentMainRef" :mainData="mainData"></content-main>
        <!--    编辑    -->
        <edit ref="drawerRef" :title="title" @getTable="getTable"></edit>
    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import {updateValid } from "@/api/operation/cars/vehicleType";
    
    let title = $ref('')
let drawerRef = $ref(null)
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/business/vehicleType/page',
    isCheck: true,
    columns: [
        { prop: "vehicleTypeId", label: "类型编码" },
        { prop: "name", label: "类型名称" },
        { prop: "parentCode", label: "上级编码" },
        { prop: "parentCodeName", label: "上级名称" },
    ],
    headBtns: [
        {
            name: '新增',
            click: ()=> {
                title = `新增车辆类型`
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
                    title = `编辑车辆类型`
                    drawerRef.setFormData(row)
                }},
            {icon: 'shanchu', name: '删除',
                click: (row)=> {
                    proxy.MessageBox({msg: `确定删除${row.name}类型吗？`, type: 'warning'}).then((close) => {
                        updateValid({id:row.vehicleTypeId}).then((res)=>{
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
        "keyword": "",
        "order": "",
        "orderField": "",
        "parentCode": "",
        "vehicleTypeId": '',
        "pageNumber": 1,
        "pageSize": 25,
    },
    lists: [
        {label: '类型名称', key: 'keyword',placeholder: '请输入类型名称'},
        {label: '上级名称', key: 'parentCode', type:'select', remote: true, url: '/business/vehicleType/getParentType', method: 'post', params: {havePermission: true}, props:{ label: 'name', value:'code'}, placeholder: '请选择企业名称'},
    ],
})

const getTable = ()=>{
    contentMainRef.getTable()
}
</script>

<style scoped lang="scss">

</style>
