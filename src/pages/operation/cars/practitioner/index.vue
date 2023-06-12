<template>
    <div>
        <content-main v-if="showStatus" ref="contentMainRef" :mainData="mainData"></content-main>
        <!--    编辑    -->
        <edit ref="drawerRef" :title="title" @getTable="getTable"></edit>
        <!--    关联车辆    -->
        <relevancy
            ref="relevancyRef"
            :title="title"
            @getTable="getTable"
        ></relevancy>
    </div>
</template>

<script setup lang="tsx">
import edit from './components/edit/index.vue'
import relevancy from './components/relevancy/index.vue'
import { updateValid, vehicleExport } from '@/api/operation/cars/practitioner'
import {downloadFile} from "@/api/common";

const route=useRoute()
let title = $ref('')
let drawerRef = $ref(null)
let contentMainRef = $ref(null)
let relevancyRef = $ref(null)
let showStatus = $ref(true)
let { proxy } = getCurrentInstance()

let mainData = reactive({
    tableUrl: '/business/driver/page',
    isCheck: true,
    columns: [
        { prop: 'companyName', label: '企业名称' },
        { prop: 'roleName', label: '岗位' },
        { prop: 'driverName', label: '姓名' },
        { prop: 'mobilePhone', label: '联系方式' },
        { prop: 'sexName', label: '性别' },
        { prop: 'identityCard', label: '身份证号' },
        { prop: 'archiveCode', label: '驾驶证档案编号' },
        { prop: 'expireDate', label: '资格证换证时间' },
        {
            prop: 'validName',
            label: '状态',
            formatter: (row) => {
                return row.valid ? (
                    <span><span class='dot line-block bgSuccess mr5'></span>启用</span>
                ) : (
                    <span><span class='dot line-block bgGrey_2 mr5'></span>禁用</span>
                )
            },
        },
    ],
    headBtns: [
        // { name: '车辆过户', click: (row) => {
        //
        //     } },
        {
            icon: 'add',
            name: '新增',
            formatter: ()=> proxy.$store.getters.permissions['operation-clgl-sjgl-add'],
            click: (row) => {
                title = `新增从业人员`
                drawerRef.setFormData()
            },
        },
        {
            icon: 'daochu',
            name: '导出',
            click: () => {
                let lists = contentMainRef.getAllCheck()
                let ids = proxy.$_.map(lists, 'driverId')
                let txt =
                    ids.length > 0
                        ? `请确定导出选中的${ids.length}条数据吗？`
                        : `请确定导出全部数据`
                proxy
                    .MessageBox({ msg: txt, type: 'warning' })
                    .then((close) => {
                        vehicleExport({ ...mainData.formData, ...{ ids: ids } }).then((res) => {
                            downloadFile(res.fileId).then((res) => {
                                    proxy.download(res, `从业人员基本信息_${proxy.$dayjs().format('YYYY-MM-DD')}`)
                                    close()
                            }).catch(()=>{
                                close()

                            })
                                // window.open(res.fileUrl)
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
        width: 120,
        btns: [
            {
                icon: 'bianji',
                name: '编辑',
                formatter: ()=> proxy.$store.getters.permissions['operation-clgl-sjgl-edit'],
                click: (row) => {
                    title = `编辑从业人员`
                    drawerRef.setFormData(row)
                },
            },
            {
                icon: 'qiyong',
                name: '启用',
                formatter: (row) => !row.valid && proxy.$store.getters.permissions['operation-clgl-sjgl-enable'],
                click: (row) => {
                    proxy
                        .MessageBox({
                            msg: `确定启用${row.companyName}吗？`,
                            type: 'warning',
                        })
                        .then((close) => {
                            updateValid({ driverId: row.driverId, valid: true })
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
                formatter: (row) => row.valid && proxy.$store.getters.permissions['operation-clgl-sjgl-enable'],
                click: (row) => {
                    proxy
                        .MessageBox({
                            msg: `确定禁用${row.companyName}吗？`,
                            type: 'warning',
                        })
                        .then((close) => {
                            updateValid({
                                driverId: row.driverId,
                                valid: false,
                            })
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
                icon: 'cheliangguanli',
                name: '关联车辆',
                formatter: ()=> proxy.$store.getters.permissions['operation-clgl-sjgl-glcl'],
                click: (row) => {
                    title = `关联车辆`
                    relevancyRef.setFormData(row)
                },
            },
        ],
    },
    formData: {
        annulEffecEnd: '',
        annulEffecStart: '',
        companyId: '',
        name: route.query.name || '',
        order: '',
        orderField: '',
        pageNumber: 1,
        pageSize: 25,
        phone: '',
        roleType: '',
        state: '',
        vehicleCode: route.query.vehicleCode || '',
    },
    lists: [
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
        { label: '人员姓名', key: 'name', placeholder: '请输入人员姓名' },
        { label: '联系方式', key: 'phone', placeholder: '请选择联系方式' },
        {
            label: '车牌号码',
            key: 'vehicleCode',
            type: 'select',
            remote: true,
            url: '/business/vehicle/associationPlateNum',
            method: 'post',
            loadMore: true,
            params: {
                keyword: route.query.plateNum ||'',  pageNumber: 1,
                pageSize: 25,
                valid: 1,
                havePermission: true,
            },
            props: { label: 'plateNum', value: 'vehicleCode' },
            placeholder: '请选择车牌号码',
        },
        {
            label: '岗位',
            key: 'roleType',
            type: 'select',
            filter: 'driverRole',
            placeholder: '请选择岗位',
        },
        {
            label: '从业资格',
            key: 'state',
            type: 'select',
            placeholder: '请选择从业资格期限',
            filter: 'driverEc',
            change: (val) => (mainData.lists[6].disabled = val !== 3),
        },
        {
            label: '过期时间',
            key: ['annulEffecStart', 'annulEffecEnd'],
            type: 'esNumber',
            disabled: true,
        },
    ],
})


const getTable = () => {
    contentMainRef.getTable()
}

onActivated(()=>{
    if(route.query.plateNum){
        mainData.formData.name = route.query.name
        mainData.formData.vehicleCode = route.query.vehicleCode
        mainData.lists[3].params.keyword = route.query.plateNum
        showStatus = false
        nextTick(()=>{
            showStatus = true
        })
    }
})


</script>

<style scoped lang="scss">
</style>
