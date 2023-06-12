<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
    </div>
</template>

<script setup lang="tsx">
import {systemLogEntityExport} from "../../../../api/system/systemrecord/auditlog";

let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/system/systemLogEntity/page',
    isCheck: true,
    columns: [
        { prop: "createTime", label: "操作时间",},
        { prop: "lastModifyTime", label: "最后操作时间"},
        { prop: "module", label: "操作模块",},
        { prop: "createUserName", label: "操作人员"},
        { prop: "method", label: "操作内容" },
        { prop: "url", label: "链接", width: 380,},
        { prop: "duration", label: "操作时长" },
        { prop: "clickNum", label: "点击次数"},
        { prop: "result", label: "操作结果" },
    ],
    headBtns: [
        {icon: 'add', name: '导出', click: (row)=> {
                let lists = contentMainRef.getAllCheck();
                let ids = proxy.$_.map(lists, 'id');
                let txt = ids.length>0?`请确定导出选中的${ids.length}条数据吗？`:`请确定导出全部数据`
                proxy.MessageBox({msg: txt, type: 'warning'}).then((close) => {
                systemLogEntityExport({...mainData.formData, ...{ids:ids}}).then((res)=>{
                    window.open(res.fileUrl)
                    close()
                }).catch(()=>{
                    close()
                })
            })
        }},
    ],
    formData: {
        "pageNumber": 1,
        "pageSize": 25,
    },
    lists: [
        {label: '操作时间', key: 'createTime', placeholder: '请选择',type: 'date',},
        {label: '操作模块', key: 'module', placeholder: '请输入'},
        {label: '操作人员', key: 'createUserName', placeholder: '请输入'},
    ],
})

const getTable = ()=>{
    contentMainRef.getTable()
}

</script>

<style scoped lang="scss">
.a { color: rgb(134,144,156);}
</style>
