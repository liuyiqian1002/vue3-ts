<template>
    <div>
        <tw-dialog :title="title" v-model="drawerFlag">
            <TwTable
                v-if="drawerFlag"
                ref="mainTable"
                :url="mainData.tableUrl"
                :tableParams="mainData.formData"
                :showIndex="mainData.showIndex"
                :botHeight="100"
                :tableIndex="1"
                :columns="mainData.columns"
            ></TwTable>
        </tw-dialog>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive } from 'vue'
import {getOneById } from '@/api/operation/businessmanagement/announcement/index'
defineProps({
    title: String,
})
let mainData = reactive({
    // tableUrl: '/business/noticePublishScopeEntity/page',
    formData: {
        noticeId: 0,
        order: '',
        orderField: '',
        pageNumber: 1,
        pageSize:25,
    },
    columns: [
        { key: 'businessName', label: '发布对象：' },
        { key: 'createTime', label: '创建时间：' },
        { key: 'lastModifyTime', label: '发布时间：' },
        { key: 'status', label: '发布状态', filter: 'noticeType' },
    ],
})
let drawerFlag = $ref(false)
// const viewData = (row) => {
//     mainData.formData = {
//         order: row.order,
//         orderField: row.orderField,
//         pageNumber: 1,
//         pageSize: 25,
//         noticeId:0,
//     }
//     console.log(row)
//     console.log(mainData.formData)
//     drawerFlag = true
// }
const viewData = (obj) => {
    // mainData.formData = proxy.$_.cloneDeep(obj)
    getOneById(obj.id).then(res=>{
        mainData.formData = res
    })
    drawerFlag = true
}


defineExpose({ viewData })

const handleClose = () => {
    // dataLists = []
}
</script>

<style scoped lang="scss">
</style>
