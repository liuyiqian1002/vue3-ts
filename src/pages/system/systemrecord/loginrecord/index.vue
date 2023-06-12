<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
    </div>
</template>

<script setup lang="tsx">
import {userLogEntityExport} from "../../../../api/system/systemrecord/Loginrecord";

let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/system/userLogEntity/page',
    isCheck: true,
    columns: [
        { prop: "createTime", label: "操作时间"},
        { prop: "typeInfo", label: "操作类型"},
        { prop: "userAccount", label: "用户账号"},
        { prop: "createUserName", label: "用户名称"},
        { prop: "url", label: "链接",width: 380, },
        { prop: "ip", label: "ip",},
        { prop: "resultInfo", label: "操作结果"},
        { prop: "remark", label: "备注"},
    ],
    headBtns: [
        {icon: 'add', name: '导出', click: (row)=> {
            let lists = contentMainRef.getAllCheck();
            let ids = proxy.$_.map(lists, 'id');
            let txt = ids.length>0?`请确定导出选中的${ids.length}条数据吗？`:`请确定导出全部数据`
            proxy.MessageBox({msg: txt, type: 'warning'}).then((close) => {
                userLogEntityExport({...mainData.formData, ...{ids:ids}}).then((res)=>{
                    window.open(res.fileUrl)
                    close()
                }).catch(()=>{
                    close()
                })
            })
        }},
    ],
    formData: {
        startDate: proxy.$dayjs().format('YYYY-MM-DD')+' 00:00:00',
        endDate: proxy.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
        "pageNumber": 1,
        "pageSize": 25,
    },
    lists: [
        {label: '时间范围', key: ['startDate', 'endDate'], type:'esDate', placeholder: '选择时间', data: {type: 'datetime', valueFormat: 'YYYY-MM-DD HH:mm:ss'}, col: 12 },
        {label: '用户名称', key: 'createUserName', placeholder: '请输入'},
    ],
})

const getTable = ()=>{
    contentMainRef.getTable()
}

</script>

<style scoped lang="scss">
.a { color: rgb(134,144,156);}
</style>
