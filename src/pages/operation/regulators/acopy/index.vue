<!-- 公告消息 -->
<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        <particulars ref="drawerRef" :title="title" v-model:drawer="particularsdrawer" @getTable="getTable"></particulars>
        <releasedetails ref="viewDataRef" :title="title"></releasedetails>
        <edit ref="editRef" :title="title" v-model:drawer="editdrawer" @getTable="getTable"/>
   </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import particulars from "./components/particulars/index.vue"
import releasedetails from "./components/releasedetails/index.vue"
// import {sendNotice} from "@/api/operation/businessmanagement/announcement";
import {sendNotice, deleteById} from "@/api/operation/businessmanagement/announcement";
import nan from "@/assets/images/nan.png"
import nv from "@/assets/images/nv.png"
let contentMainRef = $ref(null)
let drawerRef = $ref(null)
let editRef = $ref(null)
let editdrawer = $ref(false)
let particularsdrawer = $ref(false)
let viewDataRef = $ref(null)
let title = $ref('')
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/business/noticeEntity/pageManager',
    isCheck: true,
    tabIndex: 0,
    botHeight: 120,
    foldNumber: 3,
    columns: [
        { prop: 'title', label: '抄告标题' },
        { prop: 'noticeType', label: '抄告类型', filter: 'copyNoticeType'},
        { prop: "publishStatus", label: "发布状态",filter: 'publishType',
        // formatter: (row)=>{
        //         return row.publishStatus?(<span>已发布</span>):(<span>待发布</span>)}
            },
        { prop: 'publishObj', label: '发布对象' },
        { prop: 'reciveType', label: '发布端',filter: 'platformTypes' },
        { prop: 'lastModifyTime', label: '发布时间' },
        { prop: 'digest', label: '摘要' },
        { prop: 'createName', label: '创建人',formatter:(row)=>{
            let src = nan
                if(row.portrait){
                    src = row.portrait.thumbnailViewUrl
                }else {
                    src = row.gender == 1?nan:nv
                }
                return (<div class="tw_cl"><el-image class="tableUserImg radius" src={src}></el-image><span class="el-link ml5">{row.createName}</span></div>)
            }},
            { prop: 'createTime', label: '创建时间'},
    ],
    headBtns: [
             {icon: 'add', name: '新增', click: (row)=> {
                title = '新增抄告'
                editRef.editData({})
                editdrawer = true
            }},
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 160, btns:[
            {icon: 'chakanxiangqing2', name: '详情', click: (row)=> {
                    title = `抄告消息`
                    drawerRef.setFormData(row,2)
                    particularsdrawer = true
            }},
            // {icon: 'fabumingxi', name: '发布明细', click: (row)=> {
            //         title = `发布明细`
            //         viewDataRef.viewData(row)
            // }},
            {icon: 'bianji', name: '编辑', click: (row)=> {
                    title = `编辑`
                    editRef.editData(row,1)
                    editdrawer = true
            }},
            {icon: 'fabu', name: '发布', formatter:(row)=> row.publishStatus !== 3, click: (row)=>{
                proxy.MessageBox({msg: '你确定要发布吗？', type: 'info'}).then((close) => {
                    sendNotice(row.id).then(()=>{
                            getTable()
                            ElMessage.success('发布成功！')
                            close()
                        })
                    })
            }},
            {icon: 'shanchu', name: '删除', click: (row)=> {
                console.log(row, 'row')
                proxy.MessageBox({msg: '你确定要删除吗？', type: 'warning'}).then((close) => {
                    deleteById(row.id).then(()=>{
                            getTable()
                            ElMessage.success('删除成功！')
                            close()
                        })
                    })
            }},
        ]},
    formData: {
        pageNumber: 1,
        pageSize: 25,
        startDate: '',
        endDate:'',
        notificationType: 2,
        noticeType: '',
        noticeId: 0,
        order: '',
        orderField: '',
        publishStatus: '',
        id:0,
    },
    lists: [
        { label: '抄告标题', key: 'title', placeholder: '请输入抄告标题' },
        { label: '抄告类型', key: 'noticeType', type:'select',placeholder: '请选择抄告类型',filter: 'copyNoticeType' },
        { label: '发布状态', key: 'publishStatus', type:'select',placeholder: '请选择发布状态', filter: 'publishType'},
        { label: '时间范围', key: ['startDate', 'endDate'], type: 'esDate', placeholder: '选择时间', data: { type: 'datetime', valueFormat: 'YYYY-MM-DD' }, col: 12, },
    ],
})

const getTable = () => {
    contentMainRef.getTable()
}
</script>
<style scoped lang="scss">
</style>
