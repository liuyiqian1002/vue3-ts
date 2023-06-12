<template>
    <tw-dialog title="导出列表" v-model="drawerFlag">
        <content-main v-if="drawerFlag" ref="contentMainRef" :mainData="mainData"></content-main>
    </tw-dialog>
</template>

<script setup lang="tsx">
// @ts-ignore
import nan from '@/assets/images/nan.png'
import nv from '@/assets/images/nv.png'
import { downloadFile } from '@/api/common.ts'
defineProps({
    title: String,
})
let contentMainRef = $ref(null)
let title = $ref('')
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/business/exportEntity/list',
    tabIndex: 0,
    botHeight: 120,
    showPagination: false,
    columns: [
        {
            prop: 'fileName',
            label: '文件名',
            formatter: (row) => {
                let src = nan
                if (row.portrait) {
                    src = row.portrait.thumbnailViewUrl
                } else {
                    src = row.gender == 1 ? nan : nv
                }
                return (
                    <div class="tw_cl" style="justify-content: flex-start;">
                        <el-image
                            class="tableUserImg radius"
                            src={src}
                        ></el-image>
                        <div class="el-link ml5 ellipsis" style="width: 200px;justify-content: flex-start;display: inline-block;overflow:hidden;">{row.fileName}</div>
                    </div>
                )
            },
        },
        { prop: 'exportType', label: '任务类型', filter: 'exportTypes' },
        {
            prop: '',
            label: '任务进度',
            formatter: (row) => {
                let status = row.status // status === 20 则表示已完成
                let progressMap = {
                    10: 99,
                    20: 100,
                    30: 100,
                    40: 0,
                }
                return (
                    <div class="demo-progress">
                        <el-progress percentage={progressMap[status]}></el-progress>
                    </div>
                )
            },
        },
        { prop: 'status', label: '状态', filter: 'exportStatus' },
        { prop: 'operateTime', label: '操作时间' },
    ],
    tableBtns: {
        prop: 'btns',
        label: '操作',
        fixed: 'right',
        width: 60,
        btns: [
            {
                icon: 'xiazai',
                name: '下载模板',
                formatter: (row) => row.status !== 40,
                click: (row) => {
                    if (row.status !== 20) {
                        ElMessage.warning('任务进度未完成，请稍后再试！')
                        return
                    }
                    proxy
                        .MessageBox({
                            msg: '请确定下载当前此模板！',
                            type: 'warning',
                        })
                        .then((close) => {
                            downloadFile(row.fileId).then(
                                (res) => {
                                    proxy.download(res, `${row.fileName || '用户导入模板'}`)
                                    close()
                                },
                            )
                        })
                },
            },
        ],
    },
    formData: {
        name: '',
        fileId: '',
    },
    lists: [{ label: '文件名', key: 'name', placeholder: '请输入' }],
})
let drawerFlag = $ref(false)
const viewData = (row) => {
    drawerFlag = true
}
defineExpose({ viewData })
const getTable = () => {
    contentMainRef.getTable()
}
</script>
<style scoped lang="scss"></style>
