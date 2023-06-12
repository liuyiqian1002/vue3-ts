<template>
    <div class="alarm-process-wrapper">
        <ContentMain ref="contentMainRef" :mainData="mainData"></ContentMain>
        <!--    编辑    -->
        <Edit ref="editDialogRef" :title="title"></Edit>
        <!--    详情    -->
        <Detail ref="detailDialogRef" :list="preprocessLists" :title="title"></Detail>
    </div>
</template>

<script setup lang="tsx">
import Edit from './edit/index.vue'
import Detail from './details/index.vue'
import { checkTaskDelete, CheckTaskResItem, DetailQuery, getTask } from '@/api/operation/securitycheck/checktask';
let title = $ref('')
let editDialogRef = $ref(null)
let detailDialogRef = $ref(null)
let contentMainRef = $ref(null)
const proxy: any = getCurrentInstance()?.proxy
let list = $ref([]) // 勾选的行
let mainData = reactive({
    tableUrl: '/business/tsSecurityCheckTask/page',
    columns: [
        {
            label: '检查时间',
            prop: 'checkTime'
        },
        {
            label: '计划名称',
            prop: 'planName'
        },
        {
            label: '任务名称',
            prop: 'name'
        },
        {
            label: '受检单位',
            prop: 'companyName'
        },
        {
            label: '检查单位',
            prop: 'checkBy'
        },
        {
            label: '检查人员',
            prop: 'checkUserNames'
        },
        {
            label: '状态',
            prop: 'statusName'
        },
        {
            label: '创建人',
            prop: 'createUserName'
        },
        {
            label: '创建时间',
            prop: 'createTime'
        },
    ],
    tableBtns: {
        prop: 'btns',
        label: '操作',
        fixed: 'right',
        width: 200,
        btns: [
            {
                icon: 'xiangqing',
                name: '详情',
                formatter: (row) => {
                    return true
                },
                click: (row: CheckTaskResItem) => {
                    title = `${row.name}详情`
                    detailDialogRef.show()
                    getDetailData(row)
                },
            },
            {
                icon: 'bianji',
                name: '修改',
                formatter: (row) => {
                    return true
                },
                click: (row: CheckTaskResItem) => {
                    title = `${row.name}修改`
                    editDialogRef.show(row)
                },
            },
            {
                icon: 'shanchu',
                name: '删除',
                formatter: (row) => {
                    return true
                },
                click: (row: CheckTaskResItem) => {
                    ElMessageBox.confirm(`是否确定删除${row.name}检查任务?`, '提示', {
                        confirmButtonText: '删除',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                        .then(() => {
                            checkTaskDelete({ id: row.id }).then(res => {
                                console.log('操作成功')
                                ElMessage.success('操作成功')
                            })
                        })
                        .catch((err) => {
                        })
                },
            },
        ],
    },
    headBtns: [
        { icon: 'add', name: '新增', click: (row) => { editDialogRef.show(row, 0) } },
    ],
    formData: {
        companyId: '',
        taskStatusList: [],
        startTime: proxy.$dayjs().format('YYYY-MM-DD'),
        endTime: proxy.$dayjs().format('YYYY-MM-DD'),
        order: '',
        orderField: '',
        planId: '',
        name: '',
        pageNumber: 1,
        pageSize: 25,
    },
    lists: [
        {
            label: '检查计划',
            key: 'planId',
            type: 'select',
            remote: true,
            url: '/business/tsSecurityCheckPlan/page',
            method: 'post',
            loadMore: true,
            params: {
                pageNumber: 1,
                pageSize: 25,
                valid: 1,
                havePermission: true,
            },
            props: { label: 'name', value: 'id' },
            placeholder: '请选择受检单位',
        },
        {
            label: '任务名称',
            key: 'name',
            placeholder: '请输入计划名称',
        },
        { key: 'companyId', label: '受检单位', type: 'select', remote: true, url: '/business/company/associateCompany', method: 'post', params: { havePermission: true }, props: { label: 'companyName', value: 'companyId' }, placeholder: '请选择受检单位' },
        {label: '任务状态', key: 'taskStatusList', type: 'allSelect', filter: 'securityCheckPlanTaskStatusList', placeholder: '请选择任务状态',},
        {
            label: '时间范围',
            key: ['startTime', 'endTime'],
            type: 'esDate',
            data: { type: 'date', valueFormat: 'YYYY-MM-DD' },
            col: 8,
        },
    ]
})
let preprocessLists = $ref([])
// 检查任务详情
const getDetailData = (row: CheckTaskResItem) => {
    const query: DetailQuery = {
        id: row.id,
    }
    getTask(query).then(res => {
        console.log(res, 'checkItemList')
        if (res) {
            preprocessLists = res.rows
        }
    })
}
</script>

<style scoped lang="scss">
.alarm-process-wrapper {
    .second-table-wrapper {
        margin-top: 5px;
    }

    .table-box {
        height: 50% !important;
    }
}
</style>
