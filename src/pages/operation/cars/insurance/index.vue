<template>
    <div>
        <content-main v-if="showStatus" ref="contentMainRef" :mainData="mainData"></content-main>
        <!--    编辑    -->
        <edit ref="drawerRef" :title="title" @getTable="getTable"></edit>
    </div>
</template>

<script setup lang="tsx">
import edit from "./components/edit/index.vue"
import {insuranceExport} from "@/api/operation/cars/insurance";

const route=useRoute()
let title = $ref('')
let drawerRef = $ref(null)
let contentMainRef = $ref(null)
let showStatus = $ref(true)
let { proxy } = getCurrentInstance()
let mainData = reactive({
    tableUrl: '/business/vehicleInsuranceInfo/page',
    isCheck: true,
    columns: [
        { prop: "companyName", label: "所属区域" , width: 200, formatter:(row)=> `${row.provinceName || ''} ${row.cityName || ''} ${row.districtName || ''}` },
        { prop: "companyName", label: "企业名称", width: 220 },
        { prop: "plateNum", label: "车牌号", formatter: (row)=>{
            if(row.outTime){
                return (<div class="tw_cl danger"><p class="mr5">{row.plateNum}</p><el-icon><Clock /></el-icon></div>)
            }else {
                return row.plateNum
            }
            } },
        { prop: "plateColorName", label: "车牌颜色" },
        { prop: "vehicleOperateTypeName", label: "营运类型" },
        { prop: "vehicleValidName", label: "车辆状态" },
        { prop: "insuranceTypeName", label: "保险类型" },
        { prop: "insuranceSubTypeName", label: "投保险种" },
        { prop: "insuranceNumber", label: "保单号" },
        { prop: "insuranceCompanyName", label: "承保公司" },
        { prop: "amountPurchase", label: "保险费用" },
        { prop: "endDate", label: "有效期" },
        { prop: "outTime", label: "是否过期" , formatter:(row)=> row.outTime? (<p class="danger">是</p>): '否'},
    ],
    headBtns: [
        {
            name: '新增',
            formatter: (row) => proxy.$store.getters.permissions['operation-clgj-clbx-add'],
            click: ()=> {
                title = `保险新增`
                drawerRef.setFormData()
            }},
        {
            icon: 'daochu',
            formatter: (row) => proxy.$store.getters.permissions['operation-clgj-clbx-export'],
            name: '导出',
            click: () => {
                let lists = contentMainRef.getAllCheck();
                let ids = proxy.$_.map(lists, 'insuranceId');
                let txt = ids.length>0?`请确定导出选中的${ids.length}条数据吗？`:`请确定导出全部数据`
                proxy.MessageBox({msg: txt, type: 'warning'}).then((close) => {
                    insuranceExport({...mainData.formData, ...{ids:ids}}).then((res)=>{
                        window.open(res.fileUrl)
                        close()
                    }).catch(()=>{
                        close()
                    })
                })
        
            }, }
    ],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 100, btns:[
            {icon: 'bianji', name: '编辑', formatter: (row) => proxy.$store.getters.permissions['operation-clgj-clbx-edit'], click: (row)=> {
                    title = `保险编辑`
                    drawerRef.setFormData(row)
                }},
        ] },
    formData: {
        "annulEffecEnd": '',
        "annulEffecStart": '',
        "companyId": '',
        "dataPermissionCode": "",
        "insuranceCompanyId": '',
        "insuranceNumber": "",
        "insuranceSubType": '',
        "insuranceSubTypeName": "",
        "insuranceType": '',
        "order": "",
        "orderField": "",
        "pageNumber": 1,
        "pageSize": 25,
        "permissionCode": "",
        "plateNum": "",
        "state": '',
        "vehicleCode": route.query.vehicleCode || '',
        "vehicleOperateTypeCodeList": [],
        "vehicleValid": ''
    },
    // , disabledTypes:[1,2,3,4,6]
    lists: [
        {label: '组织结构', key: 'dataPermissionCode', placeholder: '请选择组织结构', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: { "hasDataPermission": true, needVehicle: false, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode', disabled: 'nocheck'}, permissionIds:[], disabledTypes:[4]},
        {label: '车牌号', key: 'vehicleCode', type:'select', remote: true, url: '/business/vehicle/associationPlateNum', method: 'post', loadMore: true, params: {keyword: route.query.plateNum ||'',pageNumber: 1, pageSize: 25,havePermission: true}, props:{ label: 'plateNum', value:'vehicleCode'}, placeholder: '请选择车牌号码'},
        {label: '营运类型', key: 'vehicleOperateTypeCodeList', type:'allSelect', width: 180, remote: true, url: '/system/vehicleOperateType/getTreeCodeList', method: 'get', loadMore: true, params: {}, props:{ }, placeholder: '请选择营运类型'},
        {label: '车辆状态', key: 'vehicleValid', type:'select', filter: 'valid'},
        {label: '企业名称', key: 'companyId', type:'select', remote: true, url: '/business/company/associateCompany', method: 'post', params: {havePermission: true}, props:{ label: 'companyName', value:'companyId'}, placeholder: '请选择企业名称'},
        {label: '保单号', key: 'insuranceNumber',placeholder: '请输入保单号'},
        {label: '保险类型', key: 'insuranceType', type:'select', filter: 'vehicleInsuranceType', placeholder: '请选择保险类型'},
        {label: '投保险种', key: 'insuranceSubType', type:'select', filter: 'vehicleInsuranceSubType', placeholder: '请选择投保险种'},
        {label: '承保公司', key: 'insuranceCompanyId', type:'select', filter: 'insuranceCompany', placeholder: '请选择承保公司'},
        {label: '有效至', key: 'state', type:'select', filter:'vehicleAnnulEffecDate', placeholder: '请选择年审期限',change:(val) => {
            console.log(val, 'val')
            if(val === 3 && mainData.lists.length === 10) {
                mainData.lists.push({label: '过期时间', key: ['annulEffecStart', 'annulEffecEnd'], type: 'esNumber' })
            } else {
                // pop
                if(mainData.lists.length === 11) {
                   mainData.lists.pop()
                }
            }
        }},
        // {label: '过期时间', key: ['annulEffecStart', 'annulEffecEnd'], type: 'esNumber' },
    ],
})

const getTable = ()=>{
    contentMainRef.getTable()
}

onActivated(()=>{
    if(route.query.plateNum){
        mainData.formData.vehicleCode = route.query.vehicleCode
        mainData.lists[1].params.keyword = route.query.plateNum
        showStatus = false
        nextTick(()=>{
            showStatus = true
        })
    }
})
</script>

<style scoped lang="scss">

</style>
