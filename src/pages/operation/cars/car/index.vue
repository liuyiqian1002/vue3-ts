<template>
    <div>
        <content-main v-if="showStatus" ref="contentMainRef" :mainData="mainData"></content-main>
        <!--    编辑    -->
        <edit ref="drawerRef" :title="title" @getTable="getTable"></edit>
        <!--    车辆过户    -->
        <carOfFamily ref="carOfFamilyRef" :title="title" @getTable="getTable"></carOfFamily>
    </div>
</template>

<script setup lang="tsx">
import edit from './components/edit/index.vue'
import carOfFamily from './components/carOfFamily/index.vue'
import { updateValid, exportVehicleList } from '@/api/operation/cars/car'
import {downloadFile} from "@/api/common";



const route=useRoute()
let title = $ref('')
let drawerRef = $ref(null)
let contentMainRef = $ref(null)
let carOfFamilyRef = $ref(null)
let showStatus = $ref(true)
let { proxy } = getCurrentInstance()
let obj = {运营中: '', 停运: 'info', 注销: 'danger', 未审核: 'warning', 待验证: 'warning', 已入网: 'success',}
let mainData = reactive({
    tableUrl: '/business/vehicle/page',
    isCheck: true,
    columns: [
        {
            prop: 'districtName',
            label: '所属区域',
            width: 180,
            formatter: (row) => `${row.provinceName || ''} ${row.cityName || ''} ${row.districtName || ''}`,
        },
        { prop: 'companyName', label: '企业名称', width: 240 },
        { prop: 'plateNum', label: '车牌号', width: 110 },
        { prop: 'plateColorName', label: '车牌颜色', width: 90 },
        { prop: 'vehicleTypeName', label: '车辆类型', width: 120 },
        { prop: 'simNum', label: 'SIM卡号', width: 120 },
        { prop: 'vehicleOperateTypeName', label: '营运类型', width: 120 },
        { prop: 'operatorName', label: '运营商', width: 200 },
        {
            prop: 'operStateName',
            label: '营运状态',
            formatter: (row) => (
                <div>
                    <tw-tag type={obj[row.operStateName]}>
                        {row.operStateName}
                    </tw-tag>
                </div>
            ),
            width: 100,
        },
        { prop: 'annulEffecDate', label: '年审时间', width: 120 },
        { prop: 'terminalClassifyName', label: '设备分类', width: 120 },
        { prop: 'annulEffecStatusName', label: '年审状态', width: 120 },
        { prop: 'isShuttleBusName', label: '接驳车', width: 120 },
        {
            prop: 'valid',
            label: '状态',
            formatter: (row) => (
                <div>
                    <tw-tag type={row.valid ? 'success' : 'danger'}>
                        {row.valid ? '启用' : '禁用'}
                    </tw-tag>
                </div>
            ),
            width: 80,
        },
    ],
    headBtns: [
        {
            icon: 'add',
            name: '新增',
            formatter: ()=> proxy.$store.getters.permissions['operation-clgl-cljbxx-add'],
            click: (row) => {
                title = `新增车辆信息`
                drawerRef.setFormData()
            },
        },
        {
            icon: 'cheliangguohu', // cheliangzhuangtai chache
            name: '车辆过户',
            formatter: ()=> proxy.$store.getters.permissions['operation-clgl-cljbxx-transfer'],
            click: (row) => {
                let lists = contentMainRef.getAllCheck()
                if (lists.length > 0) {
                    title = '车辆过户'
                    carOfFamilyRef.setFormData(lists)
                } else {
                    ElMessage.warning('请选择车辆！')
                }
            },
        },
        {
            icon: 'daochu',
            name: '导出',
            formatter: ()=> proxy.$store.getters.permissions['operation-clgl-cljbxx-export'],
            click: (row) => {
                let lists = contentMainRef.getAllCheck()
                let ids = proxy.$_.map(lists, 'vehicleId')
                let txt = ids.length > 0 ? `请确定导出选中的${ids.length}条数据吗？` : `请确定导出全部数据`
                proxy.MessageBox({ msg: txt, type: 'warning' }).then((close) => {
                    exportVehicleList({...mainData.formData, ...{ ids: ids },}).then((res) => {
                        downloadFile(res.fileId).then((res) => {
                            proxy.download(res, `车辆基本信息_${proxy.$dayjs().format('YYYY-MM-DD')}`)
                            close()
                        }).catch(()=>{
                            close()
        
                        })
                        // window.open(res.fileUrl, `车辆基本信息_${proxy.$dayjs().format('YYYY-MM-DD')}`)
                    }).catch(() => {
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
                icon: 'bianji',
                name: '编辑',
                formatter: ()=> proxy.$store.getters.permissions['operation-clgl-cljbxx-cl-edit'],
                click: (row) => {
                    title = `编辑车辆信息`
                    drawerRef.setFormData(row)
                },
            },
            {
                icon: 'qiyong',
                name: '启用',
                formatter: (row) => !row.valid && proxy.$store.getters.permissions['operation-clgl-cljbxx-enable'],
                click: (row) => {
                    proxy
                        .MessageBox({
                            msg: `确定启用${row.companyName}吗？`,
                            type: 'warning',
                        })
                        .then((close) => {
                            updateValid({ id: row.vehicleId, valid: true })
                                .then(() => {
                                    getTable()
                                    ElMessage.success('启用成功！')
                                    close()
                                })
                                .catch(() => {
                                    close()
                                })
                        })
                },
            },
            {
                icon: 'jinyong',
                name: '禁用',
                formatter: (row) => row.valid && proxy.$store.getters.permissions['operation-clgl-cljbxx-enable'],
                click: (row) => {
                    proxy
                        .MessageBox({
                            msg: `确定禁用${row.companyName}吗？`,
                            type: 'warning',
                        })
                        .then((close) => {
                            updateValid({ id: row.vehicleId, valid: false })
                                .then(() => {
                                    getTable()
                                    ElMessage.success('禁用成功！')
                                    close()
                                })
                                .catch(() => {
                                    close()
                                })
                        })
                },
            },
            {
                icon: 'xiaoxi1',
                name: '车辆过户',
                formatter: ()=> proxy.$store.getters.permissions['operation-clgl-cljbxx-transfer'],
                click: (row) => {
                    title = '车辆过户'
                    carOfFamilyRef.setFormData([row])
                },
            },
        ],
    },
    formData: {
        annulEffecDateType: '',
        annulEffecEnd: '',
        annulEffecStart: '',
        companyId: '',
        dataPermissionCode: '',
        onlineDateTime: '',
        onlineStatus: '',
        operState: '',
        operatorId: '',
        order: '',
        orderField: '',
        pageNumber: 1,
        pageSize: 25,
        plateNum: '',
        shuttleBus: '',
        simNum: '',
        terminalClassify: '',
        vehicleOperateTypeCode: '',
        valid: '',
        vehicleCode: route.query.vehicleCode || '',
        vehicleTypeId: '',
    },
    lists: [
        {
            label: '组织结构',
            key: 'dataPermissionCode',
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
            label: '车牌号',
            key: 'vehicleCode',
            type: 'select',
            remote: true,
            url: '/business/vehicle/associationPlateNum',
            method: 'post',
            loadMore: true,
            params: { keyword: route.query.plateNum ||'', pageNumber: 1, pageSize: 25, havePermission: true },
            props: { label: 'plateNum', value: 'vehicleCode' },
            placeholder: '请选择车牌号码',
        },
        { label: 'SIM卡号', key: 'simNum', placeholder: '请输入SIM卡号' },
        {
            label: '车辆类型',
            key: 'vehicleTypeId',
            type: 'select',
            remote: true,
            url: '/business/vehicleType/getAllType',
            loadMore: true,
            method: 'post',
            params: { order: '', orderField: '', pageNumber: 1, pageSize: 20 },
            props: { label: 'name', value: 'vehicleTypeId' },
            placeholder: '请选择车辆类型',
        },
        {
            label: '企业名称',
            key: 'companyId',
            type: 'select',
            remote: true,
            url: '/business/company/associateCompany',
            method: 'post',
            params: { havePermission: true },
            props: { label: 'companyName', value: 'companyId' },
            placeholder: '请选择企业名称',
        },
        {
            label: '运营商',
            key: 'operatorId',
            type: 'select',
            remote: true,
            url: '/business/operatorEntity/listAssociateOperator',
            method: 'get',
            params: {},
            props: { label: 'name', value: 'id' },
            placeholder: '请选择运营商',
        },
        {
            label: '营运类型',
            key: 'vehicleOperateTypeCode',
            type: 'select',
            remote: true,
            url: '/system/vehicleOperateType/getListByName',
            method: 'get',
            params: {},
            props: { label: 'typeName', value: 'typeCode' },
            placeholder: '请选择营运类型',
        },
        {
            label: '设备分类',
            key: 'terminalClassify',
            type: 'select',
            filter: 'terminalClassify',
        },
        {
            label: '接驳车',
            key: 'shuttleBus',
            type: 'select',
            placeholder: '请选择接驳车',
            children: [
                { label: '是', value: 1 },
                { label: '否', value: 0 },
            ],
        },
        {
            label: '营运状态',
            key: 'operState',
            type: 'select',
            filter: 'vehicleOperatorState',
        },
        // {label: '车辆状态', key: 'operState', type:'select', filter: 'vehicleOperatorState'},
        {
            label: '年审状态',
            key: 'annulEffecDateType',
            type: 'select',
            placeholder: '请选择年审状态',
            filter: 'driverEc',
        },
        {
            label: '年审时间',
            key: ['annulEffecStart', 'annulEffecEnd'],
            type: 'esNumber',
            col: 6,
        },
        {
            label: '状态',
            key: 'valid',
            type: 'select',
            children: [
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 },
            ],
        },
    ],
})

const getTable = () => {
    contentMainRef.getTable()
}

onActivated(()=>{
    if(route.query.plateNum){
        mainData.formData.vehicleCode = route.query.vehicleCode
        mainData.lists[1].params.keyword = route.query.plateNum
        // getTable()
        showStatus = false
        nextTick(()=>{
            showStatus = true
        })
    }
})
</script>

<style scoped lang="scss">
</style>
