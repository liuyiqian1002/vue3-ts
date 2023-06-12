<!-- 公告消息 -->
<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable"></edit>
    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import nan from "@/assets/images/nan.png"
import nv from "@/assets/images/nv.png"
let contentMainRef = $ref(null)
let drawer = $ref(false)
let drawerRef = $ref(null)
let title = $ref('')
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/business/noticeEntity/page',
    tabIndex: 0,
    id:'gonggaoxiaoxi',
    botHeight: 160,
    foldNumber: 3,
    columns: [
        { prop: 'title', label: '公告标题' },
        { prop: 'digest', label: '摘要' },
        { prop: 'noticeType', label: '公告类型', filter: 'noticeType'},
        { prop: 'createTime', label: '发布时间'  },
        { prop: 'createName', label: '发布人',formatter:(row)=>{
            let src = nan
                if(row.portrait){
                    src = row.portrait.thumbnailViewUrl
                }else {
                    src = row.gender == 1?nan:nv
                }
                return (<div class="tw_cl"><el-image class="tableUserImg radius" src={src}></el-image><span class="el-link ml5">{row.createName}</span></div>)
            }},
        { prop: 'operatorName', label: '是否已读', formatter: (row) => { return row.valid ? ( <span style="color:#5AF2A1">默认</span> ) : ( <span>未读</span> ) },},
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 60, btns:[
            {icon: 'xiangqing', name: '详情', click: (row)=> {
                    title = `查看`
                    drawerRef.setFormData(row)
                    drawer = true
                }},
        ]},
    headBtns: [{ icon: 'add', name: '导出', click: (row) => {} }],
    formData: {
        pageNumber: 1,
        pageSize: 25,
        id: '',
        startDate: '',
        endDate:'',
        notificationType: 1,
    },
    lists: [
        { label: '公告标题', key: 'title', placeholder: '请输入' },
        { label: '公告类型', key: 'noticeType', type:'select', filter: 'noticeType'},
        { label: '时间范围', key: ['startDate', 'endDate'], type: 'esDate', placeholder: '选择时间', data: { type: 'datetime' }, col: 12, },
        { label: '是否已读', key: 'operatorName', type:'select', filter: 'readTypes'},
    ],
})

const getTable = () => {
    contentMainRef.getTable()
}
</script>
<style scoped lang="scss">
</style>
