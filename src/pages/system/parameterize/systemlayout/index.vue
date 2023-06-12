<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        <edit ref="drawerRef" :title="title" v-model:drawer="drawer" @getTable="getTable"></edit>
    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import { updateValid } from "@/api/system/parameterize/systemlayout";

let drawer = $ref(false)
let drawerRef = $ref(null)
let title = $ref('')
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/system/systemConfigurationInfoEntity/page',
    columns: [
        { prop: "name", label: "配置名称" },
        { prop: "productPrimaryName", label: "平台主名称" },
        { prop: "productSecondaryName", label: "平台副名称" },
        { prop: "systemUrl", label: "平台链接地址" },
        {
            prop: "pointCollectStatus", label: "聚合状态", formatter: (row) => {
                return row.pointCollectStatus === 1 ? (<span>显示</span>) : (<span>不显示</span>)
            }
        },
        {
            prop: "status", label: "是否默认", width: 90, formatter: (row) => {
                return row.status ? (<span>默认</span>) : (<span>非默认</span>)
            }
        }
    ],
    headBtns: [
        {
            icon: 'add', name: '新增', click: (row) => {
                title = '新增系统配置'
                drawerRef.setFormData({})
                drawer = true
            }
        },
    ],
    tableBtns: {
        prop: "btns", label: "操作", fixed: "right", width: 90, btns: [
            {
                icon: 'bianji', name: '编辑', click: (row) => {
                    title = `修改系统配置`
                    drawerRef.setFormData(row)
                    drawer = true
                }
            },
            // {icon: 'jinyong', name: '禁用', formatter:(row)=> row.valid, click: (row)=> {
            //         proxy.MessageBox({msg: '确定禁用当前角色吗？', type: 'warning'}).then((close) => {
            //             updateValid({id: row.roleId, valid: false}).then(()=>{
            //                 getTable()
            //                 ElMessage.success('禁用成功！')
            //                 close()
            //             })
            //         })
            // }},
            {
                icon: 'qiyong', name: '设置默认', formatter: (row) => !row.status, click: (row) => {
                    proxy.MessageBox({ msg: '确认设为默认配置？', type: 'warning' }).then((close) => {
                        updateValid({ id: row.id, valid: true }).then(() => {
                            getTable()
                            ElMessage.success('配置成功！')
                            close()
                        })
                    })
                }
            }
        ]
    },
    formData: {
        "keyword": "",
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25,
    },
    lists: [
        { label: '配置名称', key: 'keyword', placeholder: '请输入' },
    ],
})

const getTable = () => {
    contentMainRef.getTable()
}

</script>

<style scoped lang="scss">
.a {
    color: rgb(134, 144, 156);
}
</style>
