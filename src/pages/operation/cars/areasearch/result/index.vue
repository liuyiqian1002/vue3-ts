<template>
    <tw-dialog @handleClose="handleClose" :loading="loading" :title="'所查车辆信息'" :width="1200" v-model="drawerFlag">
        <div>
            <content-main ref="contentMainRef" :mainData="mainData"></content-main>
        </div>
    </tw-dialog>
</template>

<script setup lang="tsx">
import { exportRectangleArea, exportDistrictArea } from '@/api/operation/cars/areasearch'

defineProps({
    title: String
})

let title = $ref('所查车辆信息')
let drawerRef = $ref(null)
let contentMainRef = $ref(null)
let { proxy } = getCurrentInstance()
let loading = $ref(false)
let drawerFlag = $ref(false)

let mainData = reactive({
    tableUrl: '/business/vehicleManager/pageRectangleArea',
    // isCheck: true,
    isLoadStatus: true,
    showPagination: true,
    botHeight: 100,
    columns: [
        { prop: 'plateNum', label: '车牌号' },
        { prop: 'vehicleCode', label: '车牌编码' },
        {
            prop: 'districtName',
            label: '所属区域',
            // width: 180,
            formatter: (row) =>
                `${row.provinceName || ''} ${row.cityName || ''} ${row.districtName || ''
                }`,
        },
        { prop: 'companyName', label: '企业名称' },
        { prop: 'vehicleOperateTypeName', label: '营运类型' },
    ],
    headBtns: [
        {
            icon: 'daochu',
            name: '导出',
            formatter: () => proxy.$store.getters.permissions['operation-clgl-qycc-export'],
            click: (row) => {
                let lists = contentMainRef.getAllCheck()
                let ids = proxy.$_.map(lists, 'vehicleId')
                let txt =
                    ids.length > 0
                        ? `请确定导出选中的${ids.length}条数据吗？`
                        : `请确定导出全部数据`
                proxy
                    .MessageBox({ msg: txt, type: 'warning' })
                    .then((close) => {
                        let requestApi = exportRectangleArea
                        if (currentType === 2) {
                            // 行政区域导出
                            requestApi = exportDistrictArea
                        }

                        requestApi({
                            ...mainData.formData,
                            ...{ ids: ids },
                        })
                            .then((res) => {
                                // window.open(res.fileUrl)
                                proxy.downloadByUrl(res.fileUrl, res.fileName)
                                close()
                            })
                            .catch(() => {
                                close()
                            })
                    })
            },
        },
    ],
    formData: {
        leftTopPoint: '',
        rightBottomPoint: '',
        plateNum: '', // 车牌号
        "areaCode": "",
        "areaLevel": 0,
        "endTime": "",
        "order": "",
        "orderField": "",
        "orgId": "",
        "orgType": "",
        "pageNumber": 1,
        "pageSize": 25,
        "startTime": "",
        "vehicleList": [],
        "vehicleOperateTypeList": []
    },
    // lists: [
    //     {
    //         label: '车牌号',
    //         key: 'vehicleCode',
    //         type: 'select',
    //         remote: true,
    //         url: '/business/vehicle/associationPlateNum',
    //         method: 'post',
    //         loadMore: true,
    //         params: { pageNumber: 1, pageSize: 25, havePermission: true },
    //         props: { label: 'plateNum', value: 'vehicleCode' },
    //         placeholder: '请选择车牌号码',
    //         col: 7,
    //     },
    //     {
    //         label: '组织结构',
    //         key: 'dataPermissionCode',
    //         placeholder: '请输入组织结构',
    //         type: 'org',
    //         url: '/system/userDataAuthSearchTree/getTreesList',
    //         method: 'post',
    //         params: {
    //             hasDataPermission: true,
    //             needVehicle: false,
    //             searchType: 1,
    //             keyword: '',
    //         },
    //         parKeys: [{ key: 'parentCode', val: 'permissionCode' }],
    //         props: {
    //             label: 'orgName',
    //             value: 'permissionCode',
    //             disabled: 'nocheck',
    //         },
    //         permissionIds: [],
    //         col: 9,
    //     },
    //     {
    //         label: '营运类型',
    //         key: 'vehicleOperateTypeCode',
    //         type: 'select',
    //         remote: true,
    //         url: '/system/vehicleOperateType/getListByName',
    //         method: 'get',
    //         params: {},
    //         props: { label: 'typeName', value: 'typeCode' },
    //         placeholder: '请选择营运类型',
    //         col: 8,
    //     },
    // ],
})
const handleClose = () => {
    // mainData.formData = {}
}
let currentType = 0
const show = (pointArr, formData, type) => {
    drawerFlag = true
    currentType = type
    // 处理参数
    // mainData.formData.startTime = formData.startTime
    // mainData.formData.endTime = formData.endTime
    // mainData.formData.plateNum = formData.plateNum
    mainData.formData = {...formData}
    if (type === 2) {
        // 行政区域查车
        mainData.tableUrl = '/business/vehicleManager/pageDistrictArea'
        mainData.formData.areaCode = formData.areaCode
        mainData.formData.areaLevel = formData.areaLevel
    } else {
        // 矩形查车需要将
        mainData.formData.leftTopPoint = pointArr[0].toString()
        mainData.formData.rightBottomPoint = pointArr[2].toString()
        mainData.tableUrl = '/business/vehicleManager/pageRectangleArea'
    }
    setTimeout(() => {
        contentMainRef && contentMainRef.getTable()
    },0)
}
defineExpose({ show })
</script>

<style scoped lang="scss"></style>
