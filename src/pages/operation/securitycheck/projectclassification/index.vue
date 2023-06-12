<template>
    <div class="alarm-process-wrapper">
        <ContentMain ref="contentMainRef" :mainData="mainData"></ContentMain>
        <!--    编辑    -->
        <Edit ref="editDialogRef" :title="title" @getTable="contentMainRef.getTable()"></Edit>
        <!--    详情    -->
        <Detail ref="detailDialogRef" :list="preprocessLists" :title="title"></Detail>
    </div>
</template>

<script setup lang="tsx">
import { checkItemList, CheckItem, CheckItemQuery } from '@/api/operation/securitycheck/checkproject'
import Edit from './edit/index.vue'
import Detail from './details/index.vue'
import { CheckCategoryItem, updateValid } from '@/api/operation/securitycheck/fileclassification';
let title = $ref('')
let editDialogRef = $ref(null)
let detailDialogRef = $ref(null)
let contentMainRef = $ref(null)
const proxy: any = getCurrentInstance()?.proxy
let list = $ref([]) // 勾选的行
let mainData = reactive({
    tableUrl: '/business/tsSecurityCheckCategory/page',
    columns: [
        { prop: 'name', label: '分类名称', },
        { prop: 'checkItemTotal', label: '项目数' },
        { prop: 'lastModifiedUser', label: '修改人' },
        { prop: 'lastModifiedTime', label: '修改时间' },
        {
            prop: 'valid', label: '状态', formatter: (row) => {
                return row.valid ? (
                    <span><span class='dot line-block bgSuccess mr5'></span>启用</span>
                ) : (
                    <span><span class='dot line-block bgGrey_2 mr5'></span>禁用</span>
                )
            },
        }
    ],
    headBtns: [
        {icon: 'add', name: '新增', click: (row)=> {
                title = '新增'
                editDialogRef.show()
                // drawer = true
            }},
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
                click: (row: CheckCategoryItem) => {
                    title = `详情（${row.name}）`
                    detailDialogRef.show()
                    getDetailData(row)
                },
            },
            {
                icon: 'bianji',
                name: '编辑',
                formatter: (row) => {
                    return true
                },
                click: (row: CheckCategoryItem) => {
                    title = `编辑检查项目分类`
                    editDialogRef.show(row)
                },
            },
            {
                icon: 'qiyong',
                name: '启用',
                formatter: row => row.valid,
                click: (row: CheckCategoryItem) => {
                    ElMessageBox.confirm(`是否确定启用${row.name}检查分类?`, '提示', {
                        confirmButtonText: '启用',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                        .then(() => {
                            updateValid({ id: row.id, valid: !row.valid }).then(res => {
                                console.log('操作成功')
                                ElMessage.success('操作成功')
                                getTable()
                            })
                        })
                        .catch((err) => {
                        })
                },
            },
            {
                icon: 'jinyong',
                name: '禁用',
                formatter: row => !row.valid,
                click: (row: CheckCategoryItem) => {
                    ElMessageBox.confirm(`是否确定禁用${row.name}检查分类?`, '提示', {
                        confirmButtonText: '禁用',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                        .then(() => {
                            updateValid({ id: row.id, valid: !row.valid }).then(res => {
                                console.log('操作成功')
                                ElMessage.success('操作成功')
                                getTable()
                            })
                        })
                        .catch((err) => {
                        })
                },
            },
        ],
    },
    formData: {
        companyId: '',
        startTime: proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
        endTime: proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
        alarmTypeCodeList: [],
        order: '',
        orderField: '',
        pageNumber: 1,
        pageSize: 25,
        vehicleCode: '',
    },
    lists: [
        {
            label: '分类名称',
            key: 'categoryName',
            placeholder: '请选择分类名称',
        },
        {
            label: '状态',
            key: 'valid',
            type: 'select',
            placeholder: '请选择状态',
            children: [
                { label: '全部', value: null },
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 },
            ]
        }
    ]
})
let preprocessLists = $ref([])
// 检查项目数据
const getDetailData = (row: CheckCategoryItem) => {
    const query: CheckItemQuery = {
        categoryId: row.id,
        pageNumber: 1,
        pageSize: 25,
    }
    checkItemList(query).then(res => {
        console.log(res, 'checkItemList')
        if (res) {
            preprocessLists = res.rows
        }
    })
}

const getTable = () => {
    contentMainRef.getTable()
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
