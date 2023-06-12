<!-- 系统消息 -->
<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable"></edit>
    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
let contentMainRef = $ref(null)
let drawer = $ref(false)
let drawerRef = $ref(null)
let title = $ref('')
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/business/systemMessageEntity/page',
    botHeight: 160,
    id:'xitongxiaoxi',
    foldNumber: 3,
    columns: [
        { prop: 'title', label: '系统标题' },
        { prop: 'messageType', label: '系统类型', filter: 'noticeType'},
        { prop: 'content', label: '系统类容',},
        { prop: 'createTime', label: '发送时间'  },
        { prop: 'readStatus', label: '是否已读', formatter: (row) => { return row.valid ? ( <span style="color:#5AF2A1">默认</span> ) : ( <span>未读</span> ) },},
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 60, btns:[
            {icon: 'xiangqing', name: '编辑', click: (row)=> {
                    title = `查看`
                    drawerRef.setFormData(row)
                    drawer = true
                }},
        ]},
    headBtns: [{ icon: 'add', name: '导出', click: (row) => {} }],
    formData: {
        endDate:'',
        pageNumber: 1,
        pageSize: 25,
        startDate: '',
        title:'',
        order: "",
        orderField: "",
    },
    lists: [
        { label: '系统标题', key: 'title', placeholder: '请输入' },
        { label: '时间范围', key: ['startDate', 'endDate'], type: 'esDate', placeholder: '选择时间', data: { type: 'datetime' }, col: 12, },
        { label: '是否已读', key: 'readStatus', type:'select', filter: 'readTypes'},
    ],
})

const getTable = () => {
    contentMainRef.getTable()
}
</script>
<style scoped lang="scss">
</style>
