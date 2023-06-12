<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        <!--    详情    -->
        <CarDetailDialog ref="dialogRef" showFeedback1 :title="title"></CarDetailDialog>
    </div>
</template>

<script setup lang="tsx">
import CarDetailDialog from '@/businessComponents/CarDetailDialog/index.vue'
import { eventTrackExport } from '@/api/dynamicMonitoring/eventTracking'
let title = $ref('')
let dialogRef = $ref(null)
let contentMainRef = $ref(null)
const proxy: any = getCurrentInstance()?.proxy
let list = $ref([]) // 勾选的行
let mainData = reactive({
    tableUrl: '/operation/appealHand/page',
    // isCheck: true,
    columns: [
        { prop: 'appealTimeStr', label: '反馈时间' },
        { prop: 'appealTypeName', label: '反馈类型' },
        { prop: 'appealPerson', label: '反馈人姓名/账号' },
        {
            prop: 'cityName',
            label: '市区',
            width: 100,
            formatter: (row) =>
                `${row.provinceName || ''} ${row.cityName || ''} ${row.districtName || ''
                }`,
        },
        { prop: 'companyName', label: '企业', width: 120 },
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
        { prop: 'plateColorName', label: '车牌颜色' },
        { prop: 'operateTypeName', label: '营运类型' },
        // { prop: 'operatorName', label: '运营商名称', width: 120 },

        { prop: 'alarmTypeName', label: '报警类型' },
        // { prop: 'alarmLevelString', label: '报警级别' },
        { prop: 'originalTime', label: '警情/行驶开始时间', width: 170 },
        // { prop: 'eventStartTime', label: '事件开始时间', width: 170 },
        // { prop: 'eventEndTime', label: '警情/行驶结束时间', width: 170 },
        { prop: 'durationStr', label: '持续时长' },
        // { prop: 'eventStatusString', label: '事件状态' },
        { prop: 'appealStatusName', label: '处理状态' },
        { prop: 'appealResultName', label: '处理结果' },
        { prop: 'processPerson', label: '处理人' },
        { prop: 'processTimeStr', label: '处理时间' },
    ],
    headBtns: [
        {
            icon: 'daochu',
            name: '导出',
            // formatter: () =>
            //     proxy.$store.getters.permissions['watch-sjgz-export'],
            click: () => {
                let lists = contentMainRef.getAllCheck()
                let ids = proxy.$_.map(lists, 'id')
                let txt =
                    ids.length > 0
                        ? `请确定导出选中的${ids.length}条数据吗？`
                        : `请确定导出全部数据`
                proxy
                    .MessageBox({ msg: txt, type: 'warning' })
                    .then((close) => {
                        eventTrackExport({
                            ...mainData.formData,
                            ...{ ids: ids },
                        })
                            .then((res) => {
                                window.open(res.fileUrl)
                                close()
                            })
                            .catch(() => {
                                close()
                            })
                    })
            },
        },
    ],
    tableBtns: {
        prop: 'btns',
        label: '操作',
        fixed: 'right',
        width: 100,
        btns: [
            {
                icon: 'xiangqing',
                name: '详情',
                click: (row) => {
                    title = `详情`
                    console.log(dialogRef, 'dialogRef')
                    dialogRef.show(row)
                },
            },
        ],
    },
    formData: {
        alarmLevel: 0,
        alarmLevelMapList: [],
        alarmTypeCodeList: [],
        currentCheckedPermissionCodeList: [],
        appealTypeCode: null,
        handleResult: null,
        companyName: '',
        driverWarningTypeList: [],
        minEventStartTime: proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
        appealStartTime: proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
        appealEndTime: '',
        maxEventStartTime: '',
        eventPersistSeconds: 0,
        newEventPersistSeconds: proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
        eventStatusList: [],
        hasManual: undefined,
        manualProcessing: undefined,
        operatorId: null,
        order: '',
        orderField: '',
        pageNumber: 1,
        pageSize: 25,
        type: '',
        typeId: '',
        typeIdList: [],
        vehicleCode: '',
        vehicleOperateTypeIdList: [],
    },
    extraField: [
        {
            key: 'eventPersistSeconds',
            value: 0,
        },
    ],
    // objectToBaseTypeKey: ['typeIdList', 'orgId'], // 默认对象数组, 1表示值数组
    lists: [
        {
            label: '组织结构',
            key: 'currentCheckedPermissionCodeList',
            showCheckbox: true,
            placeholder: '请输入组织结构',
            type: 'org',
            url: '/system/userDataAuthSearchTree/getTreesList',
            method: 'post',
            params: {
                hasDataPermission: true,
                needVehicle: false,
                searchType: 1,
                keyword: '',
            },
            parKeys: [{ key: 'parentCode', val: 'permissionCode' }],
            props: {
                label: 'orgName',
                value: 'permissionCode',
                disabled: 'nocheck',
            },
            permissionIds: [],
        },
        {
            label: '报警级别',
            key: 'alarmLevelMapList',
            type: 'allSelect',
            filter: 'eventAlarmTypes',
            placeholder: '请选择报警级别',
            returnObjectInArray: true, // 返回数组里面的每一项是否是对象
            returnObjectKeys: ['alarmLevel', 'alarmSubLevel'], // [0]是大类值字段，[1]是子类值字段
        },
        {
            label: '报警类型',
            key: 'alarmTypeCodeList',
            type: 'allSelect',
            filter: 'alarmModeTypes',
            placeholder: '请选择报警类型',
            width: 760,
        },
        {
            label: '反馈类型',
            key: 'appealTypeCode',
            type: 'select',
            // props: { label: 'companyName', value: 'companyId' },
            placeholder: '请选择回执类型',
            children: [
                { label: '回执', value: 100 },
                { label: '申诉', value: 200 },
            ]
        },
        {
            label: '反馈时间',
            key: ['appealStartTime', 'appealEndTime'],
            type: 'esDate',
            data: { type: 'datetime' },
            col: 8,
        },
        {
            label: '事件时间',
            key: ['minEventStartTime', 'maxEventStartTime'],
            type: 'esDate',
            data: { type: 'datetime' },
            col: 8,
        },
    ],
})

const checkSelect = (val) => {
    console.log(val, 'val checkSelect')
}

const getTable = () => {
    contentMainRef.getTable()
}
</script>

<style scoped lang="scss">

</style>
