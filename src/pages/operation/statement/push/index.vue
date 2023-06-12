<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData" @tableCurrentChange="tableCurrentChange" @rowCheck="rowCheck"></content-main>
        <!--  编辑角色  -->
        <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable" />

    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import { updateValid } from "@/api/operation/statement/push";

let drawer = $ref(false)
let drawerRef = $ref(null)
let title = $ref('')
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    // isCheck: true,
    highlightCurrentRow: true,
    tableUrl: '/business/autoSendConfigEntity/page  ',
    columns: [
        { prop: "configName", label: "推送配置名称" },
        { prop: "reportType", label: "报表类型", filter: 'reportTypes' },
        { prop: "configType", label: "发送类型", filter: 'listConfigType' },
        { prop: "sendTypeStr", label: "发送方式" },
        { prop: "mailTitle", label: "邮件标题" },
        { prop: "mailContent", label: "邮件内容" },
        { prop: "createTime", label: "创建时间" },
        { prop: "createUserName", label: "创建人员" },
        { prop: "lastModifyTime", label: "更新时间" },
        { prop: "lastModifyUserName", label: "更新人员" },
        {
            prop: "state", label: "状态", width: 80, formatter: (row) => {
                return proxy.getStatusTag(row.state)
            }
        }
    ],
    headBtns: [
        {
            icon: 'add', name: '新增', click: (row) => {
                title = '新增报表推送设置'
                drawerRef.setFormData({})
                drawer = true
            }
        },
        {
            icon: '', name: '复制新增', click: (row) => {
                title = '复制新增'
                // 将选中的row传进去
                console.log(currentTableItemSelected, 'currentTableItemSelected')
                if(!currentTableItemSelected.id) {
                    ElMessage.warning('请先选择一行!')
                    return
                }
                drawerRef.setFormData(currentTableItemSelected, 1)
                drawer = true
            }
        },
    ],
    tableBtns: {
        prop: "btns", label: "操作", fixed: "right", width: 100, btns: [
            {
                icon: 'bianji', name: '编辑', click: (row) => {
                    title = `编辑报表推送设置`
                    drawerRef.setFormData(row, 2)
                    drawer = true
                }
            },
            {
                icon: 'qiyong', name: '启用', formatter: (row) => !row.valid, click: (row) => {
                    proxy.MessageBox({ msg: '确定启用当前角色吗？', type: 'warning' }).then((close) => {
                        updateValid({ id: row.id, valid: true }).then(() => {
                            getTable()
                            ElMessage.success('启用成功！')
                            close()
                        }).catch(() => {
                            close()
                        })
                    })
                }
            },
            {
                icon: 'jinyong', name: '禁用', formatter: (row) => row.valid, click: (row) => {
                    proxy.MessageBox({ msg: '确定禁用当前角色吗？', type: 'warning' }).then((close) => {
                        updateValid({ id: row.id, valid: false }).then(() => {
                            getTable()
                            ElMessage.success('禁用成功！')
                            close()
                        }).catch(() => {
                            close()
                        })
                    })
                }
            }
        ]
    },
    formData: {
        "name": "",
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25,
        "dataScopeInfoList": "",
        "companyId": "",
        "vehicleOperateTypeCodeList": [],
        "state": '',
        "valid": ""
    },
    lists: [
        { label: '推送配置名称', key: 'configName', placeholder: '请输入规则名称' },
        { label: '状态：', key: 'state', type: 'select', children: [{ value: 1, label: '启用', }, { value: 0, label: '禁用', }] },],
})

const getTable = () => {
    contentMainRef.getTable()
}

// 表格单选
let currentTableItemSelected = {}
// const tableCurrentChange = (row) => {
//     console.log(row, 'tableCurrentChange')
//     currentTableItemSelected = row
// }
const rowCheck = (row) => {
    if(row.id === currentTableItemSelected.id) {
        contentMainRef.setCurrentRow()
        currentTableItemSelected = {}
    } else {
        currentTableItemSelected = row
    }
}

</script>

<style scoped lang="scss">.a {
    color: rgb(134, 144, 156);
}</style>
