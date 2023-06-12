<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
    </div>
</template>


<script setup lang="tsx">
import {
    batchDownload, reportSendRecordExport,
    reSendMail, setBatchDownloadReqDataKey,
} from '../../../../api/statisticalStatement/supervisoryStatement/automaticSending/index'
import {downloadFile, downloadFileByUrl} from "@/api/common";

let {proxy} = getCurrentInstance()
let contentMainRef = $ref(null)
let mainData = reactive({
    tableUrl: '/statistics/reportSendRecord/page',
    isCheck: true,
    foldNumber: 3,
    columns: [
        { prop: 'timeStr', label: '统计日期' },
        { prop: 'reportTypeName', label: '报表类型' },
        { prop: 'reportAutoSendType', label: '发送配置类型', filter: 'reportAutoSendType' },
        { prop: 'areaName', label: '区域' },
        { prop: 'companyName', label: '企业名称' },
        { prop: 'receiverName', label: '接收人' },
        { prop: 'receiverEmail', label: '邮箱' },
        { prop: 'sendTime', label: '发送时间' },
        { prop: 'senderName', label: '发送人' },
        { prop: 'sendStyleName', label: '发送方式' },
        { prop: 'sendStatus', label: '发送结果', filter: 'sendStatus' },
        { prop: 'remark', label: '备注' },
    ],
    tableBtns: {
        prop: 'btns',
        label: '操作',
        fixed: 'right',
        width: 100,
        btns: [
            {
                icon: 'xiazai',
                name: '下载',
                click: (row) => {
                    proxy.MessageBox({ msg: '请确定下载当前数据!', type: 'warning' }).then((close) => {
                        downloadFileByUrl({url:row.emailAttachment,fileName: row.attachmentName }).then(res=>{
                            proxy.download(res, `${row.attachmentName || '用户导入模板'}`)
                        })
                        close()
                    })
                },
            },
            {
                icon: 'zhongxinfasong',
                name: '自动发送',
                formatter: (row)=>row.sendStatus == 4,
                click: (row) => {
                    proxy.MessageBox({ msg: '请确定发送当前数据!', type: 'warning' }).then((close) => {
                        reSendMail({idList: [row.id]}).then((res) => {
                            getTable()
                            close()
                        }).catch(() => {
                            close()
                        })
                    })
                },
            },
        ],
    },
    headBtns: [
        {
            icon: 'xiazai',
            name: '批量下载',
            click: (row) => {
                let lists = contentMainRef.getAllCheck()
                if(lists.length == 0) return ElMessage.warning(`请选择需要下载的数据`)
                let txt = `请确定下载选中的${lists.length}条数据吗？`
                proxy.MessageBox({ msg: txt, type: 'warning' }).then((close) => {
                    let items = []
                    for (let i = 0; i < lists.length; i++) {
                        let item = lists[i]
                        items.push({"fileName": item.attachmentName, "fileUrl": item.emailAttachment})
                    }
                    setBatchDownloadReqDataKey({reportTypeName: '监管报表自动发送', items: items}).then((res) => {
                        batchDownload({batchDownloadKey: res}).then((res) => {
                            // window.open(res)
                            proxy.download(res, `企业报表_${proxy.$dayjs().format('YYYY-MM-DD')}`, 'zip')
                            close()
                        }).catch(() => {
                            close()
                        })
                    }).catch(() => {
                        close()
                    })
                })
            },
        },
        {
            icon: 'zhongxinfasong',
            name: '批量发送',
            click: (row) => {
                let lists = contentMainRef.getAllCheck()
                if(lists.length == 0) return ElMessage.warning(`请选择需要发送的数据`)
                let ids = proxy.$_.map(lists, 'id')
                let txt = ids.length > 0 ? `请确定发送选中的${ids.length}条数据吗？` : `请确定发送全部数据`
                proxy.MessageBox({ msg: txt, type: 'warning' }).then((close) => {
                    reSendMail({idList: ids}).then((res) => {
                        getTable()
                        close()
                    }).catch(() => {
                        close()
                    })
                })
            },
        },
        {
            icon: 'daochu',
            name: '导出',
            click: (row) => {
                let lists = contentMainRef.getAllCheck()
                // let ids = proxy.$_.map(lists, 'operatorId')
                // let txt = ids.length > 0 ? `请确定导出选中的${ids.length}条数据吗？` : `请确定导出全部数据`
                proxy.MessageBox({ msg: `请确定导出全部数据`, type: 'warning' }).then((close) => {
                    // reportSendRecordExport({...mainData.formData, ...{ ids: ids },}).then((res) => {
                    reportSendRecordExport(mainData.formData).then((data) => {
                        downloadFile(data.fileId).then((res) => {
                            proxy.download(res, `${data.fileName || '用户导入模板'}`)
                            close()
                        }).catch(() => {
                            close()
                        })
                        close()
                    }).catch(() => {
                        close()
                    })
                })
            },
        },
    ],
    formData: {
        "beginTime": proxy.$dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
        "category": 2,
        "endTime": proxy.$dayjs().format('YYYY-MM-DD'),
        "nodeDtoList": [],
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25,
        "reportAutoSendType": '',
        "reportType": '',
        "sendStatus": ''
    },
    lists: [
        {label: '企业名称', key: 'nodeDtoList', showCheckbox: true, placeholder: '请选择企业名称', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: {hasDataPermission: true, needVehicle: false, searchType: 1, keyword: '', displayLevel: 4}, parKeys: [{ key: 'parentCode', val: 'permissionCode' }], props: {label: 'orgName', value: 'permissionCode', disabled: 'nocheck',}, permissionIds: [], selectTypes: [1,2,3,6,4, null]},
        {label: '时间范围', key: ['beginTime', 'endTime'], type: 'esDate', col: 12, data: { valueFormat: 'YYYY-MM-DD' } ,endDisabledDate:(val)=> proxy.$dayjs(val).isSameOrAfter(proxy.$dayjs()),disabledDate:(val)=> proxy.$dayjs(val).isSameOrAfter(proxy.$dayjs())},
        {label: '发送配置类型', key: 'reportAutoSendType', type: 'select', filter: 'reportAutoSendType', placeholder: '请选择发送配置类型',},
        {label: '报表类型', key: 'reportType', type: 'select', filter: 'companyReportType', placeholder: '请选择报表类型',},
        {label: '发送状态', key: 'sendStatus', type: 'select', filter: 'sendStatus', placeholder: '请选择发送状态',},
    ],
})

const getTable = () => {
    contentMainRef.getTable()
}
</script>

<style scoped lang="scss">
</style>
