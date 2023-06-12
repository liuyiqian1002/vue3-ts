<template>
    <div>
        <tw-drawer
            @handleClose="handleClose"
            :loading="state.loading"
            :title="title"
            :isBtns="false"
            v-model="state.drawerFlag"
        >
            <tw-custom-form
                class="p20"
                ref="editFormRef"
                :loading="state.loading"
                :lists="state.lists"
                :formData="state.formData"
            >
                <template #insuranceFileUrl>
                    <el-image style="width: 100px; height: 100px" class="radius" :src="state.formData.insuranceFileUrl" :zoom-rate="1.2" :preview-src-list="[state.formData.insuranceFileUrl]">
                    
                    </el-image>
                </template>
            </tw-custom-form>
        
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import {getDetail, addOrUpdate} from "@/api/operation/cars/insurance";

defineProps({
    title: String,
})
let {proxy} = getCurrentInstance()
let editFormRef = $ref(null)
let editData = {
    "amountPurchase": '',
    "endDate": "",
    "insuranceCompanyId": '',
    "insuranceFileId": "",
    "insuranceId": '',
    "insuranceNumber": "",
    "insuranceSubType": '',
    "insuranceType": '',
    "procurator": "",
    "procuratorPhone": "",
    "startDate": "",
    "vehicleCode": "",
    insuranceFileUrl: '',
    commont: ''
}
let state = reactive({
    drawerFlag: false,
    loading: false,
    fromDataRef: null,
    activeName: 'first',
    formData: {},
    lists: [
        {key: 'insuranceFileUrl', label: '证件照片', col: 24, slot: true},
        {key: 'vehicleCode', label: '车牌号', col: 12, offset: 12, pull: 12, disabled: true, type:'select', remote: true, url: '/business/vehicle/associationPlateNum', method: 'post', loadMore: true, params: {pageNumber: 1, pageSize: 25, valid: 1,havePermission: true}, props:{ label: 'plateNum', value:'vehicleCode'}, placeholder: '请选择车牌号码'},
        {key: 'insuranceType', label: '保险类型', col: 12, type: 'select', filter: 'vehicleInsuranceType', placeholder: '请选择保险类型'},
        {key: 'insuranceSubType', label: '投保险种', col: 12, type: 'select', filter: 'vehicleInsuranceSubType', placeholder: '请选择投保险种'},
        {key: 'insuranceCompanyId', label: '承保公司', col: 12, type: 'select', placeholder: '请选择承保公司', filter: 'insuranceCompany'},
        {key: 'amountPurchase', label: '保险费用', col: 12, placeholder: '请输入保险费用'},
        {key: ['startDate', 'endDate'], label: '起止有效期', col: 24, type: 'esDate', placeholder: '请选择起止有效期', data: {valueFormat: 'YYYY-MM-DD'}},
        {key: 'insuranceNumber', label: '保单号', col: 12, offset: 12, pull: 12, placeholder: '请输入保单号'},
        {key: 'procurator', label: '代理人', col: 12, placeholder: '请输入代理人'},
        {key: 'procuratorPhone', label: '代理人电话', col: 12, placeholder: '请输入代理人电话', maxlength: 11},
        {key: 'commont', label: '备注', col: 24, props: {type: 'textarea'}, placeholder: '请输入备注'},
    ]
})


const setFormData = (obj) => {
    state.formData = proxy.$_.cloneDeep(editData)
    if (obj) {
        getDetail({insuranceId: obj.insuranceId}).then(res => {
            let data = {...state.formData, ...res}
            // 后台数据会返回null，前端会报错
            state.lists[1].disabled = true
            state.formData = proxy.$_.cloneDeep(data)
            state.drawerFlag = true
        })
    } else {
        state.lists[1].disabled = false
        state.formData = proxy.$_.cloneDeep(state.formData)
        state.drawerFlag = true
    }
}

const handleClose = () => {
    editFormRef.clearValidate()
    state.formData = proxy.$_.cloneDeep(editData)
}

let eimts = defineEmits(['getTable'])


const handleClick = (val) => {

}

defineExpose({...toRefs(state), setFormData})
</script>

<style scoped lang="scss">
.example {
    display: inline-block;
    margin-left: 50px;
    width: 120px;
    height: 120px;
    border: 1px dashed #dcdfe6;
    border-radius: 14px;
    padding: 10px;
    box-sizing: border-box;
    
    .el-image {
        width: 100%;
        height: 80px;
    }
    
    .tips {
        text-align: center;
        line-height: 0px;
        color: #979797;
    }
}
</style>
