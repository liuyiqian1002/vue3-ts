<template>
    <div>
        <content-main-ext ref="contentMainRef" :mainData="mainData"></content-main-ext>
        <!--    详情    -->
        <Update ref="dialogUpdateRef" :list="disposalDetailList" :title="title"></Update>
        <Process ref="dialogProcessRef" :title="title"></Process>
        <Details ref="dialogDetailsRef" :list="disposalDetailList" :dto="disposalDetailDto" :title="title"></Details>
        <Ticket ref="dialogTicketRef" :list="disposalDetailList" :dto="disposalDetailDto" :title="title"></Ticket>
    </div>
</template>

<script setup lang="tsx">
import { getDisposalDetailDto, getEventDetailList, cancelDisposal } from '@/api/operation/closedloopmanagement/ticketfiles';
import Update from './update/index.vue'
import Process from './process/index.vue'
import Details from './details/index.vue'
import Ticket from './ticket/index.vue'
let title = $ref('')
let dialogUpdateRef = $ref(null)
let dialogProcessRef = $ref(null)
let dialogDetailsRef = $ref(null)
let dialogTicketRef = $ref(null)
let contentMainRef = $ref(null)
const proxy: any = getCurrentInstance()?.proxy
let list = $ref([]) // 勾选的行
let mainData = reactive({
    tableUrl: '/operation/eventDisposal/getEventDisposalList',
    // isCheck: true,
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
        { prop: 'drivingBehaviorAbnormalCount', label: '驾驶行为异常报警条数' },

        { prop: 'operatingAlarmCount', label: '营运类报警条数' },
        { prop: 'disposalStatusName', label: '状态' },
        { prop: 'createTimeStr', label: '罚单生成时间' },
        { prop: 'disposalTimeStr', label: '处置时间' },
    ],
    tableBtns: {
        prop: 'btns',
        label: '操作',
        fixed: 'right',
        width: 300,
        btns: [
            {
                // icon: 'xiangqing',
                name: '详情',
                color: '#3c8cff',
                formatter: (row) => row.disposalStatus === 20, // 20表示已处置
                click: (row) => {
                    title = `详情`
                    dialogDetailsRef.show(row)
                    getDetailDto(row)
                    getDetailList(row)
                },
            },
            {
                // icon: 'xiangqing',
                name: '罚单',
                color: '#3c8cff',
                click: (row) => {
                    title = `罚单`
                    dialogTicketRef.show(row)
                    getDetailDto(row)
                    getDetailList(row)
                },
            },
            {
                // icon: 'xiangqing',
                name: '处置',
                color: '#3c8cff',
                formatter: (row) => row.disposalStatus !== 30 && row.disposalStatus !== 20,
                click: (row) => {
                    title = `处置`
                    dialogProcessRef.show(row)
                },
            },
            {
                // icon: 'xiangqing',
                name: '修改',
                color: '#3c8cff',
                formatter: (row) => row.disposalStatus !== 30 && row.disposalStatus !== 20,
                click: (row) => {
                    title = `修改`
                    dialogUpdateRef.show(row)
                    getDetailDto(row)
                    getDetailList(row)
                },
            },
            {
                name: '撤销',
                color: '#ff3c3c',
                formatter: (row) => row.disposalStatus !== 30 && row.disposalStatus !== 20,
                click: (row) => {
                    title = `撤销`
                    ElMessageBox.confirm('是否确认撤销罚单?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                        .then(() => {
                            cancelDisposal({ disposalId: row.id }).then(res => {
                                console.log('撤销成功')
                                ElMessage.success('撤销成功')
                            })
                        })
                        .catch((err) => {
                        })
                },
            },
        ],
    },
    formData: {
        companyId: null,
        startTime: proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
        endTime: proxy.$dayjs().format('YYYY-MM-DD 00:00:00'),
        disposalStatus: null,
        order: '',
        orderField: '',
        pageNumber: 1,
        pageSize: 25,
        vehicleCode: '',
        staticsInfo: true,
    },
    // objectToBaseTypeKey: ['typeIdList', 'orgId'], // 默认对象数组, 1表示值数组
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
            label: '处置状态',
            key: 'disposalStatus',
            type: 'select',
            filter: 'eventStatus',
            placeholder: '请选择事件状态',
            col: 5,
        },
        {
            label: '生成时间',
            key: ['startTime', 'endTime'],
            type: 'esDate',
            data: { type: 'datetime' },
            col: 8,
        },
    ],
})

// 获取修改的数据
let disposalDetailDto = $ref({})
let disposalDetailList = $ref([])
const getDetailDto = (row) => {
    const query = {
        "disposalId": row.id,
        "onlyQueryValidDetail": false,
        "queryDisposal": true,
        "queryDisposalDetail": true,
        "queryDisposalRecord": true,
        "showEventAddress": true
    }
    getDisposalDetailDto(query).then(res => {
        console.log(res, 'getDisposalDetailDto')
        if (res) {
            disposalDetailDto = res
        }
    })
}

const getDetailList = (row) => {
    const query = {
        "disposalId": row.id,
        "onlyQueryValidDetail": true,
        "queryDisposal": true,
        "queryDisposalDetail": true,
        "queryDisposalRecord": true,
        "showEventAddress": true
    }
    getEventDetailList(query).then(res => {
        console.log(res, 'getEventDetailList')
        if (res) {
            disposalDetailList = res
        }
    })
}

// const checkSelect = (val) => {
//     console.log(val, 'val checkSelect')
// }

// const getTable = () => {
//     contentMainRef.getTable()
// }
</script>

<style scoped lang="scss">

</style>
