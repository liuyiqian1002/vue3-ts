<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        <!--  编辑角色  -->
        <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable"/>

    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
let drawer = $ref(false)
let drawerRef = $ref(null)
let title = $ref('')
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/business/alarmProcessToolConfigEntity/pageByType',
    isCheck: true,
    columns: [
        { prop: "alarmTypeCode", label: "报警类型",filter: 'alarmType'},
        { prop: "usefulExpressions", label: "常用语",},
        { prop: "createTime", label: "创建时间" },
        { prop: "createUserName", label: "创建人员" },
        { prop: "lastModifyTime", label: "更新时间" },
        { prop: "lastModifyUserName", label: "更新人员" },
    ],
    headBtns: [
        {icon: 'add', name: '新增', click: (row)=> {
                title = '新增报警提醒'
                drawerRef.setFormData({})
                drawer = true
            }},
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 60, btns:[
            {icon: 'bianji', name: '编辑', click: (row)=> {
                    title = `修改报警提醒`
                    drawerRef.setFormData(row,2)
                    drawer = true
                }},
        ] },
    formData: {
        "order": "",
        "orderField": "",
        "keyword": "",
        "pageNumber": 1,
        "pageSize": 25,
        "type": 2
    },
    lists: [
        {label: '关键字', key: 'keyword', placeholder: '请输入关键字'},
        {label: '报警类型', key: 'alarmTypeCode', type:'select',filter: 'alarmType',placeholder: '请选择报警类型'},
    ],
})

const getTable = ()=>{
    contentMainRef.getTable()
}

</script>

<style scoped lang="scss">
.a { color: rgb(134,144,156);}
</style>
