<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
    </div>
</template>


<script setup lang="tsx">
import { exportCompanyAssessReport} from '../../../../api/statisticalStatement/fiveRateTest/enterpriseAssessment/index'

let {proxy} = getCurrentInstance()
let contentMainRef = $ref(null)
let mainData = reactive({
    tableUrl: '/statistics/fiveRateAssessReport/queryCompanyAssessReport',
    isCheck: false,
    isLoadStatus: true,
    columns: [
        { prop: 'districtName', label: '区所名称' },
        { prop: 'operateTypeName', label: '营运类型' },
        { prop: 'companyName', label: '企业名称' },
        { prop: 'innetRate', label: '车辆入网率' },
        { prop: 'onlineRate', label: '车辆上线率' },
        { prop: 'trackFullRate', label: '轨迹完整率' },
        { prop: 'dataQualifiedRate', label: '数据合格率' },
        { prop: 'satelliteDriftRate', label: '卫星定位漂移车辆率' },
    ],
    headBtns: [
        {
            icon: 'daochu',
            name: '导出',
            click: (row) => {
                let lists = contentMainRef.getAllCheck()
                // let ids = proxy.$_.map(lists, 'operatorId')
                // let txt = ids.length > 0 ? `请确定导出选中的${ids.length}条数据吗？` : `请确定导出全部数据`
                proxy.MessageBox({ msg: `请确定导出全部数据`, type: 'warning' }).then((close) => {
                    // reportSendRecordExport({...mainData.formData, ...{ ids: ids },}).then((res) => {
                    exportCompanyAssessReport(mainData.formData).then((res) => {
                        window.open(res.fileUrl)
                        close()
                    }).catch(() => {
                        close()
                    })
                })
            },
        },
    ],
    formData: {
        "beginDate": proxy.$dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        "endDate": proxy.$dayjs().format('YYYY-MM-DD'),
        "nodeDtoList": [],
        "operateTypeList": [],
        "operatorCodeList": [],
        "operatorId": '',
        "operatorName": "",
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25,
        "vehicleCode": ""
    },
    lists: [
        {label: '企业名称', key: 'nodeDtoList', showCheckbox: true, placeholder: '请选择企业名称', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: {hasDataPermission: true, needVehicle: false, searchType: 1, keyword: '',}, parKeys: [{ key: 'parentCode', val: 'permissionCode' }], props: {label: 'orgName', value: 'permissionCode', disabled: 'nocheck',}, permissionIds: [] },
        {label: '时间范围', key: ['beginDate', 'endDate'], type: 'esDate', col: 12, data: { valueFormat: 'YYYY-MM-DD' } },
    ],
})

const getTable = () => {
    contentMainRef.getTable()
}
</script>

<style scoped lang="scss">
</style>
