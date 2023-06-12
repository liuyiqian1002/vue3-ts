<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        <!--    编辑    -->
        <edit ref="drawerRef" :title="title" @getTable="getTable"></edit>
        <controlRange ref="controlRangeRef" :title="title" @getTable="getTable"></controlRange>
        <drawArea ref="drawAreaRef" :title="title" @getTable="getTable"></drawArea>
    </div>
</template>

<script setup lang="tsx">
import edit from "./edit/index.vue"
import controlRange from "./controlrange/index.vue"
import drawArea from "./drawarea/index.vue"
import { updateValid } from "@/api/operation/alert/parkingareaalarm";
// /business/parkAreaAlarm/updateValid
let title = $ref('')
let drawerRef = $ref(null)
let controlRangeRef = $ref(null)
let drawAreaRef = $ref(null)
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/business/parkAreaAlarm/page',
    isCheck: true,
    columns: [
        { prop: "name", label: "区域名称" },
        { prop: "startDate", label: "开始日期" },
        { prop: "endDate", label: "结束日期" },
        // { prop: "parentCodeName", label: "报警区域名称" },
        { prop: "createName", label: "创建人" },
        { prop: "createTime", label: "创建时间" },
        { prop: "lastModifiedName", label: "修改人" },
        { prop: "lastModifiedTime", label: "修改时间" },
        {
            prop: "valid", label: "状态", formatter: (row) => {
                return proxy.getStatusTag(row.valid)
            }
        },
    ],
    headBtns: [
        {
            icon: 'add',
            name: '新增',
            click: () => {
                title = `新增停车区域报警`
                drawerRef.setFormData()
            }
        },
    ],
    tableBtns: {
        prop: "btns", label: "操作", fixed: "right", width: 150, btns: [
            {
                icon: 'bianji', name: '编辑', click: (row) => {
                    title = `编辑停车区域报警`
                    drawerRef.setFormData(row)
                }
            },
            {
                icon: 'qiyong', name: '启用', formatter: (row) => !row.valid, click: (row) => {
                    proxy.MessageBox({ msg: '确定启用当前线路吗？', type: 'warning' }).then((close) => {
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
                    proxy.MessageBox({ msg: '确定禁用当前线路吗？', type: 'warning' }).then((close) => {
                        updateValid({ id: row.id, valid: false }).then(() => {
                            getTable()
                            ElMessage.success('禁用成功！')
                            close()
                        }).catch(() => {
                            close()
                        })
                    })
                }
            },
            {
                icon: 'kongzhifanwei', name: '控制范围', click: (row) => {
                    title = `控制范围`
                    // console.log(controlRangeRef, 'controlRangeRef')
                    controlRangeRef && controlRangeRef.setFormData(row)
                }
            },
            {
                icon: 'huizhixiansuquyu', name: '绘制区域', click: (row) => {
                    title = `绘制区域`
                    console.log(drawAreaRef, 'drawAreaRef')
                    drawAreaRef && drawAreaRef.setFormData(row)
                }
            },
        ]
    },
    formData: {
        "keyword": "",
        "order": "",
        "orderField": "",
        "parentCode": "",
        "vehicleTypeId": '',
        "pageNumber": 1,
        "pageSize": 25,
    },
    lists: [
        { label: '区域名称', key: 'keyword', placeholder: '请输入区域名称' }
    ],
})

const getTable = () => {
    contentMainRef.getTable()
}
</script>

<style scoped lang="scss"></style>
