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
                showBtns
                @colse="reset"
                @save="save('first', $event)"
                :loading="state.loading"
                :lists="state.lists"
                :rules="state.rules"
                :formData="state.formData"
            >
                <template #insuranceFileUrl>
                    <upload v-model="state.formData.insuranceFileUrl" v-model:id="state.formData.insuranceFileId"
                            uploadTxt="上传保险附件"></upload>
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
        {key: 'insuranceFileUrl', label: '附件上传', col: 24, slot: true},
        {key: 'vehicleCode', label: '车牌号', col: 12, offset: 12, pull: 12, disabled: true, type:'select', remote: true, url: '/business/vehicle/associationPlateNum', method: 'post', loadMore: true, params: {pageNumber: 1, pageSize: 25, valid: 1,havePermission: true, keyword: ''}, props:{ label: 'plateNum', value:'vehicleCode'}, placeholder: '请选择车牌号码'},
        {key: 'insuranceType', label: '保险类型', col: 12, type: 'select', filter: 'vehicleInsuranceType', placeholder: '请选择保险类型', change: (val)=>{
                state.lists[3].hide = val!=0
                if(val!=0){
                    state.formData.insuranceSubType = ''
                }
            }},
        {key: 'insuranceSubType', label: '投保险种', col: 12, type: 'select', filter: 'vehicleInsuranceSubType', placeholder: '请选择投保险种', hide: true},
        {key: 'insuranceCompanyId', label: '承保公司', col: 12, type: 'select', placeholder: '请选择承保公司', filter: 'insuranceCompany'},
        {key: 'amountPurchase', label: '保险费用', col: 12, placeholder: '请输入保险费用'},
        {key: ['startDate', 'endDate'], label: '起止有效期', col: 24, type: 'esDate', placeholder: '请选择起止有效期', data: {valueFormat: 'YYYY-MM-DD'}},
        {key: 'insuranceNumber', label: '保单号', col: 12, offset: 12, pull: 12, placeholder: '请输入保单号'},
        {key: 'procurator', label: '代理人', col: 12, placeholder: '请输入代理人'},
        {key: 'procuratorPhone', label: '代理人电话', col: 12, placeholder: '请输入代理人电话', maxlength: 11},
        {key: 'commont', label: '备注', col: 24, props: {type: 'textarea'}, placeholder: '请输入备注'},
    ],
    rules: {
        vehicleCode: [
            {required: true, message: '请输入车牌号', trigger: 'change'},
        ],
        insuranceType: [
            {required: true, message: '请选择保险类型', trigger: 'change'},
        ],
        insuranceSubType: [
            {required: true, message: '请选择投保险种', trigger: 'change'},
        ],
        insuranceCompanyId: [
            {required: true, message: '请选择承保公司', trigger: 'change'},
        ],
        startDate: [
            {required: true, message: '请选择起止有效期', trigger: 'change'},
        ],
        endDate: [
            {required: true, message: '请选择起止有效期', trigger: 'change'},
        ],
        insuranceNumber: [
            {required: true, message: '请输入保单号', trigger: 'blur'},
        ],
        amountPurchase: [
            {required: true, message: '请输入保险费用', trigger: 'blur'},
        ],
    },
})


let editFormData = {}
const setFormData = (obj) => {
    state.formData = proxy.$_.cloneDeep(editData)
    if (obj) {
        console.log(obj);
        getDetail({insuranceId: obj.insuranceId}).then(res => {
            let data = {...state.formData, ...res}
            data.plateNum = obj.plateNum
            editFormData = data
            // 后台数据会返回null，前端会报错
            state.lists[1].disabled = true
            state.lists[1].params.keyword = obj.plateNum
            state.lists[3].hide = data.insuranceType != 0
            state.formData = proxy.$_.cloneDeep(data)
            state.drawerFlag = true
        })
    } else {
        state.lists[1].disabled = false
        // state.formData = proxy.$_.cloneDeep(editData)
        state.drawerFlag = true
    }
}

const reset = () => {
    state.formData = proxy.$_.cloneDeep(editData)
    if(state.lists[1].disabled){
        state.formData.vehicleCode = editFormData.vehicleCode
    }
}

const handleClose = () => {
    editFormRef.clearValidate()
    state.formData = proxy.$_.cloneDeep(editData)
}

let eimts = defineEmits(['getTable'])
const save = (str, formData) => {
    console.log(formData);
    state.loading = true
    addOrUpdate(state.formData).then(() => {
        state.loading = false
        ElMessage.success('操作成功！')
        state.drawerFlag = false
        eimts('getTable')
    }).catch(() => {
        state.loading = false
    })
}

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
