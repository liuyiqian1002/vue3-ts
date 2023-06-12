<template>
    <div class="alarm-process-wrapper">
        <ContentMain ref="contentMainRef" :mainData="mainData"></ContentMain>
        <!--    编辑    -->
        <Edit ref="editDialogRef" :title="title" :archiveTypes="archiveTypes" :archiveGategory="archiveGategory"></Edit>
        <!--    详情    -->
        <Detail ref="detailDialogRef" :list="detailList" :title="title"></Detail>
    </div>
</template>

<script setup lang="tsx">
import Edit from './edit/index.vue'
import Detail from './details/index.vue'
import { categoryTypeDelete, GategoryListResItem, getArchivesCategory, getCategoryType } from '@/api/operation/filemanagement/fileclassification';
import { getAttachListInfo } from '@/api/operation/filemanagement/enterprisefiles';
let title = $ref('')
let editDialogRef = $ref(null)
let detailDialogRef = $ref(null)
let contentMainRef = $ref(null)
const proxy: any = getCurrentInstance()?.proxy
let list = $ref([]) // 勾选的行
let mainData = reactive({
    tableUrl: '/business/archives/regulatoryArchivesPage',
    columns: [
        { prop: 'name', label: '档案名称', },
        { prop: 'categoryName', label: '档案分类', },
        { prop: 'createUser', label: '创建人' },
        { prop: 'createTimeStr', label: '创建时间' },
    ],
    headBtns: [
        {
            icon: 'add', name: '新增', click: (row) => {
                title = '新增'
                editDialogRef.show()
                // detailDialogRef.show() //测试用
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
        "archivesType": null,
        "archivesName": '',
        "companyId": null,
        "name": "",
        pageNumber: 1,
        pageSize: 25,
    },
    lists: [
        {
            label: '档案名称',
            key: 'name',
            placeholder: '请输入档案名称',
        },
        {
            label: '档案分类',
            key: 'categoryId',
            type: 'select',
            placeholder: '请选择档案分类',
            props: { label: 'name', value: 'id' },
            children: []
        },
        {
            label: '时间范围',
            key: ['startTime', 'endTime'],
            type: 'esDate',
            data: { type: 'date' },
            col: 8,
        },
    ]
})
let archiveTypes = $ref([])
let archiveGategory = $ref([])
let detailList = $ref([])
// 获取档案附件数据
const getDetailData = (row: GategoryListResItem) => {
    getAttachListInfo(row.id).then(res => {
        console.log(res, 'getAttachListInfo')
        if (res) {
            detailList = res
        }
    })
}
// 获取档案类型下拉框数据
getCategoryType({ type: 'category' }).then(res => {
    if (res) {
        console.log(res, 'category')
        let arr = []
        Object.keys(res.archivesType).forEach(key => {
            arr.push({
                label: res.archivesType[key],
                value: Number(key)
            })
        })
        archiveTypes = arr
        mainData.lists[0].children = arr
    }
})
// 获取档案分类下拉框数据
const query = {}
getArchivesCategory(query).then(res => {
    if (res) {
        console.log(res.rows, 'getArchivesCategory')
        archiveGategory = res.rows
        mainData.lists[1].children = res.rows
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
