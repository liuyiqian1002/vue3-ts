<template>
    <div class="alarm-process-wrapper">
        <ContentMainExt ref="contentMainRef" :mainData="mainData"></ContentMainExt>
        <!-- <content-main ref="contentMain2Ref" :mainData="mainData2"></content-main> -->
        <div class="second-table-wrapper">
            <AlarmTable ref="mainTable" :columns="mainData2.columns" :lists="mainData2.detailLists"
                :botHeight="mainData2.botHeight" :tableParams="mainData2.formData" :showPagination="true"></AlarmTable>
        </div>

        <!--    详情    -->
        <Preprocess ref="dialogRef" :list="mainData2.preprocessLists" :title="title"></Preprocess>
    </div>
</template>

<script setup lang="tsx">
import { AlarmProcessItem, EventStaticsListQuery, EventStaticsQuery, getNotDisposalEvents, getStaticsDetail } from '@/api/operation/closedloopmanagement/alarmprocess';
import Preprocess from './preprocess/index.vue'
import ContentMainExt from '@/components/ContentMainExt/index.vue'
import AlarmTable from '@/businessComponents/AlarmTable/index.vue'
let title = $ref('')
let dialogRef = $ref(null)
let contentMainRef = $ref(null)
const proxy: any = getCurrentInstance()?.proxy
let list = $ref([]) // 勾选的行
let mainData = reactive({
    tableUrl: '/operation/eventDisposal/getEventStaticsList',
    botHeight: 450,
    columns: [
        { prop: 'companyName', label: '所属企业', width: 120 },
        {
            prop: 'plateNum',
            label: '车牌号',
            width: 100,
            formatter: (row) => {
                if (row.outTime) {
                    return (
                        <div class="tw_cl danger">
                            <p class="mr5">{row.plateNum}</p>
                            <el-icon>
                                <Clock />
                            </el-icon>
                        </div>
                    )
                } else {
                    return row.plateNum
                }
            },
        },
        { prop: 'plateColorName', label: '车牌颜色', width: 120 },
        { prop: 'driverStateAbnormalCount', label: '驾驶员状态异常报警条数' },
        { prop: 'driverStateAbnormalNotProcessedCount', label: '待处理条数' },
        { prop: 'drivingBehaviorAbnormalCount', label: '驾驶行为异常报警条数' },
        { prop: 'drivingBehaviorAbnormalNotProcessedCount', label: '待处理条数' },
        { prop: 'operatingAlarmCount', label: '营运类报警条数' },
        { prop: 'operatingAlarmNotProcessedCount', label: '待处理条数' },
    ],
    tableBtns: {
        prop: 'btns',
        label: '操作',
        fixed: 'right',
        width: 200,
        btns: [
            {
                // icon: 'xiangqing',
                name: '报警详情',
                formatter: (row) => {
                    return <div>1111</div>
                },
                click: (row: AlarmProcessItem) => {
                    title = `报警详情`
                    console.log(title)
                    getDetailData(row, 1)
                },
            },
            {
                // icon: 'xiangqing',
                name: '预处置',
                click: (row: AlarmProcessItem) => {
                    title = `预处置`
                    getDetailData(row, 2)
                    dialogRef.show(row)
                },
            },
        ],
    },
    formData: {
        companyId: '',
        startTime: proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
        endTime: proxy.$dayjs(proxy.$dayjs().format('YYYY-MM-DD')+ ' 23:59:59').format('YYYY-MM-DD 23:59:59'),
        alarmTypeCodeList: [],
        order: '',
        orderField: '',
        pageNumber: 1,
        pageSize: 25,
        vehicleCode: '',
    },
    lists: [
        // {
        //     label: '组织结构',
        //     key: 'companyId',
        //     // showCheckbox: true,
        //     placeholder: '请输入组织结构',
        //     type: 'org',
        //     url: '/system/userDataAuthSearchTree/getTreesList',
        //     method: 'post',
        //     params: {
        //         hasDataPermission: true,
        //         needVehicle: false,
        //         searchType: 1,
        //         keyword: '',
        //     },
        //     parKeys: [{ key: 'parentCode', val: 'permissionCode' }],
        //     props: {
        //         label: 'orgName',
        //         value: 'permissionCode',
        //         disabled: 'nocheck',
        //     },
        //     permissionIds: [],
        // },
        { key: 'companyId', label: '企业名称', col: 5, type: 'select', remote: true, url: '/business/company/associateCompany', method: 'post', params: { havePermission: true }, props: { label: 'companyName', value: 'companyId' }, placeholder: '请选择企业名称' },
        {
            label: '车牌号',
            key: 'vehicleCode',
            type: 'select',
            remote: true,
            url: '/business/vehicle/associationPlateNum',
            method: 'post',
            loadMore: true,
            params: {
                pageNumber: 1,
                pageSize: 25,
                valid: 1,
                havePermission: true,
            },
            props: { label: 'plateNum', value: 'vehicleCode' },
            placeholder: '请选择车牌号码',
            col: 5,
        },
        {
            label: '报警类型',
            key: 'alarmTypeCodeList',
            type: 'allSelect',
            filter: 'alarmModeTypes',
            placeholder: '请选择报警类型',
            width: 760,
            col: 5,
        },
        {
            label: '时间范围',
            key: ['startTime', 'endTime'],
            type: 'esDate',
            data: { type: 'datetime' },
            col: 8,
        },
    ]
})
let mainData2 = reactive({
    botHeight: 450,
    columns: [
        { prop: 'alarmGroupName', label: '报警类别' },
        { prop: 'alarmTypeCodeName', label: '报警类型' },
        { prop: 'eventStartTimeStr', label: '报警开始时间' },
        { prop: 'eventEndTimeStr', label: '报警结束时间' },
        { prop: 'eventPersistSecondsStr', label: '持续时长' },
        { prop: 'eventStatusName', label: '是否纠正' },
        { prop: 'eventHandleStatusName', label: '处警状态' },
        { prop: 'appealTypeName', label: '处理方式' },
        { prop: 'appealStatusName', label: '处理状态' },
        { prop: 'eventAddress', label: '报警位置' },
    ],
    formData: {
        companyId: '',
        startTime: proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
        endTime: proxy.$dayjs().format('YYYY-MM-DD 23:59:59'),
        alarmTypeCodeList: [],
        order: '',
        orderField: '',
        pageNumber: 1,
        pageSize: 25,
        vehicleCode: '',
    },
    detailLists: [], // 报警详情数据
    preprocessLists: [] // 预处理弹窗数据
})
// 报警详情数据
const getDetailData = (row: AlarmProcessItem, type: number) => {
    const query: EventStaticsQuery = {
        alarmTypeCodeList: [],
        companyId: row.companyId,
        driverWarningTypeList: [],
        endTime: mainData.formData.endTime,
        onlyShowNotDisposal: false,
        order: mainData.formData.order,
        orderField: mainData.formData.orderField,
        pageNumber: 1,
        pageSize: 25,
        plateNum: row.plateNum,
        showEventAddress: false,
        startTime: mainData.formData.startTime,
        vehicleCode: row.vehicleCode,
    }
    if (type === 1) {
        getStaticsDetail(query).then(res => {
            console.log(res, 'getStaticsDetail')
            if (res) {
                mainData2.detailLists = res.rows
            }
        })
    } else {
        getNotDisposalEvents(query).then(res => {
            console.log(res, 'getNotDisposalEvents')
            if (res) {
                mainData2.preprocessLists = res.rows
            }
        })
    }
}
const checkSelect = (val) => {
    console.log(val, 'val checkSelect')
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
