<template>
    <div class="alarm-process-wrapper">
        <ContentMainExt ref="contentMainRef" :mainData="mainData"></ContentMainExt>

        <!--    详情    -->
        <Preprocess ref="dialogRef" :title="title"></Preprocess>
    </div>
</template>

<script setup lang="tsx">
import { AlarmProcessItem, EventStaticsListQuery, EventStaticsQuery, getNotDisposalEvents, getStaticsDetail } from '@/api/operation/closedloopmanagement/alarmprocess';
// import Preprocess from './preprocess/index.vue'
import ContentMainExt from '@/components/ContentMainExt/index.vue'
let title = $ref('')
let dialogRef = $ref(null)
let contentMainRef = $ref(null)
const proxy: any = getCurrentInstance()?.proxy
let list = $ref([]) // 勾选的行
let mainData = reactive({
    tableUrl: '/operation/eventDisposal/getEventStaticsList',
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
                name: '详情',
                formatter: (row) => {
                    return <div>1111</div>
                },
                click: (row: AlarmProcessItem) => {
                    title = `报警详情`
                    getDetailData(row)
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
            label: '生成时间',
            key: ['startTime', 'endTime'],
            type: 'esDate',
            data: { type: 'datetime' },
            col: 8,
        },
    ]
})
let preprocessLists = $ref([])
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
    getNotDisposalEvents(query).then(res => {
            console.log(res, 'getNotDisposalEvents')
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
