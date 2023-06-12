<template>
    <div>
        <tw-drawer
            @save="save"
            @handleClose="handleClose"
            :loading="loading"
            :title="title"
            v-model="drawerFlag"
        >
            <tw-table
                ref="tableRef"
                :url="mainData.tableUrl"
                method="get"
                :tableParams="mainData.formData"
                :showPagination="false"
                :botHeight="150"
                :tableIndex="1"
                :columns="mainData.columns"
                :tableBtns="mainData.tableBtns"
            >
                <template #tableHeader>
                    <el-row>
                        <el-col :offset="8" :span="16" class="tw_cr">
                            <span class="mr20">车牌号：</span>
                            <div class="w200 mr20">
                                <tw-select class="mb0" :formData="mainData.formData" :item="itemSelect" @tapClick="changeSelect"></tw-select>
                            </div>
                            <el-button type="primary" @click="addCar">添加</el-button>
                        </el-col>
                    </el-row>
                    
                </template>
            </tw-table>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import { addOrUpdate } from '@/api/system/systemrecord/dictionaries'
import {getCurrentInstance, reactive} from 'vue'
import {addDriverVehicle, updateVehicleValid} from "@/api/operation/cars/practitioner";

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let itemSelect = $ref({ key: 'companyId', type:'select', remote: true, url: '/business/vehicle/associationPlateNum', method: 'post', loadMore: true, params: {pageNumber: 1, pageSize: 25, valid: 1 }, props:{ label: 'plateNum', value:'vehicleCode'}, placeholder: '请选择车牌号码', children: []})

let mainData = reactive({
    tableUrl: '/business/driver/getDriverVehicleList',
    formData: {
        "driverId": 0,
        "plateColorCode": "",
        "plateColorName": "",
        "plateNum": "",
        "vehicleCode": "",
        "vehicleId": 0
    },
    headBtns: [{ icon: 'add', name: '导出', click: (row) => {} }],
    tableBtns: { prop: "btns", label: "操作", fixed: "right", width: 100, btns:[
            {icon: 'bianji', name: '取消关联', click: (row)=> {
                    proxy.MessageBox({msg: `确定取消关联${row.plateNum}吗？`, type: 'warning'}).then((close) => {
                        updateVehicleValid({relateId: row.relateId}).then(()=>{
                            getTable()
                            ElMessage.success('启用成功！')
                            close()
                        }).catch(()=>{
                            close()
                        })
                    })
                }},]},
    columns: [
        { prop: 'plateNum', label: '车牌' },
        { prop: 'plateColorName', label: '车牌颜色' },
        { prop: 'relateTime', label: '关联时间' },
    ],
    //
})
let loading = $ref(false)
let drawerFlag = $ref(false)
let tableRef = $ref(null)

const setFormData = (obj) => {
    // mainData.formData = proxy.$_.cloneDeep(obj)
    console.log(obj, 'setFormData')
    mainData.formData.driverId = obj.driverId
    // console.log(mainData.formData);
    drawerFlag = true
    getTable()
}

watch(() => mainData.formData,(val) => {
    console.log(val, 'formData watch')
})

const handleClose = ()=>{
    mainData.formData = {"driverId": 0, "plateColorCode": "", "plateColorName": "", "plateNum": "", "vehicleCode": "", "vehicleId": 0}
    eimts('getTable')
}

const changeSelect = (val, item)=>{
    let obj = item.children.filter(tag=> tag[item.item.props?.value ?? 'value'] == item.val)[0]
    mainData.formData = {...mainData.formData, ...obj}
}

const addCar = ()=>{
    loading = true
    addDriverVehicle(mainData.formData).then(()=>{
        getTable()
        ElMessage.success('关联成功！')
        loading = false
    }).catch(()=>{
        loading = false
    })
}

const getTable = ()=>{
    tableRef.getTable()
}

let eimts = defineEmits(['getTable'])
const save = () => {
    drawerFlag = false
    eimts('getTable')
}
defineExpose({ setFormData })
</script>

<style scoped lang="scss">
</style>
