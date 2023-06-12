<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData" @checkSelect="checkSelect"></content-main>
        <!--    详情    -->
        <CarDetailDialog ref="dialogRef" :title="title" showFeedback></CarDetailDialog>
        <tw-dialog :loading="false" title="人工处理" :isBtns="false" width="45%" height="66%" v-model="manualHandleVisible"
            class="manual-dialog-wrapper">
            <Manual :widthSpan="24" :list="list" @close="onClose"></Manual>
        </tw-dialog>
    </div>
</template>

<script setup lang="tsx">
import CarDetailDialog from '@/businessComponents/CarDetailDialog/index.vue'
import Manual from '@/businessComponents/CarDetailDialog/manual/index.vue'
// import Manual from './dialog_dep/manual/index.vue'
import { eventTrackExport } from '@/api/dynamicMonitoring/eventTracking'
let title = $ref('')
let dialogRef = $ref(null)
let contentMainRef = $ref(null)
const proxy: any = getCurrentInstance()?.proxy
let list = $ref([]) // 勾选的行
let mainData = reactive({
    tableUrl: '/operation/alarmAppeal/feedbackPage',
    // isCheck: true,
    columns: [
        // {
        //     prop: 'companyName',
        //     label: '市区',
        //     width: 100,
        //     formatter: (row) =>
        //         `${row.provinceName || ''} ${row.cityName || ''} ${row.districtName || ''
        //         }`,
        // },
        // { prop: 'companyName', label: '企业名称', width: 120 },
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
        // { prop: 'alarmLevel', label: '报警级别' },

        { prop: 'originalTime', label: '警情/行驶开始时间', width: 170 },
        { prop: 'startTime', label: '事件开始时间', width: 170 },
        { prop: 'endTime', label: '警情/行驶结束时间', width: 170 },
        { prop: 'durationStr', label: '持续时长' },
        { prop: 'appealTypeName', label: '反馈类型' },
        { prop: 'appealPerson', label: '反馈人姓名/账号' },
        // { prop: 'eventStatusString', label: '事件状态' },
        { prop: 'appealStatusName', label: '处理状态' },
        { prop: 'appealResultName', label: '处理结果' },
        { prop: 'processPerson', label: '处理人' },
        { prop: 'processTime', label: '处理时间' },
    ],
    headBtns: [
        // {
        //     name: '批量处理',
        //     // formatter: () => proxy.$store.getters.permissions['watch-sjgz-rgcl'],
        //     click: () => {
        //         list = contentMainRef.getAllCheck()
        //         if (list.length <= 0) {
        //             ElMessage.warning('请至少选择一行')
        //             return
        //         }
        //         manualHandleVisible = true
        //         console.log(list, '人工处理')
        //     },
        // },
        // {
        //     icon: 'daochu',
        //     name: '导出',
        //     // formatter: () =>
        //     //     proxy.$store.getters.permissions['watch-sjgz-export'],
        //     click: () => {
        //         let lists = contentMainRef.getAllCheck()
        //         let ids = proxy.$_.map(lists, 'insuranceId')
        //         let txt =
        //             ids.length > 0
        //                 ? `请确定导出选中的${ids.length}条数据吗？`
        //                 : `请确定导出全部数据`
        //         proxy
        //             .MessageBox({ msg: txt, type: 'warning' })
        //             .then((close) => {
        //                 eventTrackExport({
        //                     ...mainData.formData,
        //                     ...{ ids: ids },
        //                 })
        //                     .then((res) => {
        //                         window.open(res.fileUrl)
        //                         close()
        //                     })
        //                     .catch(() => {
        //                         close()
        //                     })
        //             })
        //     },
        // },
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
        appealTypeCode: null,
        appealResultCode: null,
        companyName: '',
        driverWarningTypeList: [],
        minEventStartTime: proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
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
            label: '事件状态',
            key: 'eventStatusList',
            type: 'select',
            multiple: true,
            filter: 'eventStatus',
            placeholder: '请选择事件状态',
        },
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
        },
        {
            label: '营运类型',
            key: 'vehicleOperateTypeCodeList',
            type: 'allSelect',
            width: 170,
            remote: true,
            url: '/system/vehicleOperateType/getTreeIdList',
            method: 'get',
            loadMore: true,
            // params: {},
            // props: {},
            placeholder: '请选择营运类型',
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
            label: '持续时长',
            key: 'newEventPersistSeconds',
            type: 'time',
            placeholder: '00:00:00',
            change: (timeString: any) => {
                console.log(timeString, 'eventPersistSeconds change')
                // 当点击清除图标时timeSring 为null，则需要还原默认值，以解决点击清除时间后再次聚焦自动获取当前时间的问题
                if (timeString === null) {
                    mainData.formData.newEventPersistSeconds = proxy
                        .$dayjs()
                        .format('YYYY-MM-DD 00:00:00')
                }
                const time = proxy.$dayjs(
                    proxy.$dayjs(timeString).format('HH:mm:ss'),
                    'hh:mm:ss',
                )
                const startOfDay = proxy.$dayjs().startOf('day')
                const diff = time.diff(startOfDay, 'second')
                console.log(diff, 'diff')
                mainData.formData.eventPersistSeconds = diff
            },
        },
        {
            label: '运营商',
            key: 'operatorId',
            type: 'select',
            remote: true,
            url: '/business/operatorEntity/listAssociateOperator',
            method: 'get',
            params: { havePermission: true },
            props: { label: 'name', value: 'id' },
            placeholder: '请选择运营商名称',
        },
        {
            label: '人工处理',
            key: 'hasManual',
            type: 'select',
            // props: { label: 'companyName', value: 'companyId' },
            placeholder: '请选择人工处理',
            children: [
                { label: '已处理', value: 1 },
                { label: '未处理', value: 2 },
            ]
        },
        {
            label: '回执类型',
            key: 'appealTypeCode',
            type: 'select',
            // props: { label: 'companyName', value: 'companyId' },
            placeholder: '请选择回执类型',
            children: [
                { label: '申诉', value: 100 },
                { label: '回执', value: 200 },
            ]
        },
        {
            label: '处理状态',
            key: 'appealStatusCode',
            type: 'select',
            filter: 'eventHandleStatus',
            all: true,
        },
        // {label: '企业名称', key: 'companyId', type:'select', remote: true, url: '/business/company/associateCompany', method: 'post', params: {havePermission: true}, props:{ label: 'companyName', value:'companyId'}, placeholder: '请选择企业名称'},
        {
            label: '处理结果',
            key: 'appealResultCode',
            type: 'select',
            // props: { label: 'companyName', value: 'companyId' },
            placeholder: '请选择处理结果',
            children: [
                { label: '设为无效', value: '100' },
                { label: '不予处理', value: '200' },
            ]
        },
        {
            label: '时间范围',
            key: ['minEventStartTime', 'maxEventStartTime'],
            type: 'esDate',
            data: { type: 'datetime' },
            col: 8,
        },
    ],
})

// 人工处理弹窗显示
let manualHandleVisible = $ref(false)

const onClose = () => {
    manualHandleVisible = false
}

// let refreshValue = $ref(false)
let timer = null // 定时刷新列表定时器

// const onRefreshChange = (val) => {
//     console.log(val, 'onRefreshChange')
//     if (val) {
//         timer = setInterval(() => contentMainRef.getTable(), 10000)
//     } else {
//         clearInterval(timer)
//     }
// }

const checkSelect = (val) => {
    console.log(val, 'val checkSelect')
}

const getTable = () => {
    contentMainRef.getTable()
}
</script>

<style scoped lang="scss">

</style>
