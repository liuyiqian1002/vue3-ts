<template>
    <div class="alarm-process-wrapper">
        <ContentMain ref="contentMainRef" :mainData="mainData"></ContentMain>
        <!--    编辑    -->
        <Edit ref="editDialogRef" :title="title" :archiveTypes="archiveTypes"></Edit>
        <!--    详情    -->
        <Detail ref="detailDialogRef" :list="detailList" :title="title"></Detail>
    </div>
</template>

<script setup lang="tsx">
import Edit from './edit/index.vue'
import Detail from './details/index.vue'
import { categoryTypeDelete, GategoryListResItem, getCategoryType } from '@/api/operation/filemanagement/fileclassification';
import { companyArchivesPage, CompanyArchivesQuery } from '@/api/operation/filemanagement/enterprisefiles';
let title = $ref('')
let editDialogRef = $ref(null)
let detailDialogRef = $ref(null)
let contentMainRef = $ref(null)
const proxy: any = getCurrentInstance()?.proxy
let list = $ref([]) // 勾选的行
let mainData = reactive({
    tableUrl: '/business/archivesCategory/page',
    columns: [
        { prop: 'name', label: '分类名称', },
        { prop: 'archivesTypeName', label: '档案类型' },
        { prop: 'archivesSum', label: '档案数' },
        { prop: 'companyName', label: '所属单位' },
        { prop: 'createUser', label: '创建人' },
        { prop: 'createTimeStr', label: '创建时间' },
    ],
    headBtns: [
        {
            icon: 'add', name: '新增', click: (row) => {
                title = '新增'
                editDialogRef.show()
            }
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
                click: (row: GategoryListResItem) => {
                    title = `详情`
                    detailDialogRef.show(row)
                    getDetailData(row)
                },
            },
            {
                icon: 'bianji',
                name: '修改',
                formatter: (row) => {
                    return true
                },
                click: (row: GategoryListResItem) => {
                    title = `修改`
                    editDialogRef.show(row)
                },
            },
            {
                icon: 'shanchu',
                name: '删除',
                formatter: (row) => {
                    return true
                },
                click: (row: GategoryListResItem) => {
                    ElMessageBox.confirm(`是否确定删除${row.name}分类?`, '提示', {
                        confirmButtonText: '删除',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                        .then(() => {
                            categoryTypeDelete(row.id).then(res => {
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
    formData: {
        "archivesType": '',
        "companyId": '',
        "name": "",
        pageNumber: 1,
        pageSize: 25,
    },
    lists: [
        {
            label: '分类名称',
            key: 'name',
            placeholder: '请输入分类名称',
        },
        {
            label: '档案类型',
            key: 'archivesType',
            type: 'select',
            placeholder: '请选择档案类型',
            children: []
        },
        { key: 'companyId', label: '所属单位', type: 'select', remote: true, url: '/business/company/associateCompany', method: 'post', params: { havePermission: true }, props: { label: 'companyName', value: 'companyId' }, placeholder: '请选择所属单位' },
    ]
})
let archiveTypes = $ref([])
let detailList = $ref([])
// 档案详情数据
const getDetailData = (row: GategoryListResItem) => {
    const query: CompanyArchivesQuery = {
        categoryId: row.id,
        pageNumber: 1,
        pageSize: 25,
    }
    companyArchivesPage(query).then(res => {
        console.log(res, 'companyArchivesPage')
        if (res) {
            detailList = res.rows
        }
    })
}
// 获取分类名称下拉框数据
getCategoryType({ type: 'category' }).then(res => {
    if (res) {
        console.log(res, 'category')
        let arr = []
        Object.keys(res.archivesType).forEach(key => {
            arr.push({
                label: res.archivesType[key],
                value: key
            })
        })
        archiveTypes = arr
        mainData.lists[0].children = arr
    }
})
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
