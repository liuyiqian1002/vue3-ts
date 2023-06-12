<template>
    <div>
        <tw-drawer
            @save="save"
            @handleClose="handleClose"
            :loading="loading"
            :title="title"
            v-model="drawerFlag"
        >
            
            <tw-custom-form
                ref="fromDataRef"
                class="w500"
                :lists="mainData.lists"
                :rules="mainData.rules"
                :formData="mainData.formData"
            >
                <template #fileList>
                    <div class="tw_y">
                        <upload uploadTxt="上传附件1" v-model:id="mainData.formData.fileIdList[0]" v-model="mainData.formData.fileList[0].viewUrl" @handleSuccess="(obj)=> mainData.formData.fileList[0]=obj" @clearUpload="clearUpload(0)"></upload>
                        <upload uploadTxt="上传附件2" v-model:id="mainData.formData.fileIdList[1]" v-model="mainData.formData.fileList[1].viewUrl" @handleSuccess="(obj)=> mainData.formData.fileList[1]=obj" @clearUpload="clearUpload(1)"></upload>
                    </div>
                   
                </template>
            </tw-custom-form>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">

defineProps({
    title: String,
    lists: {type: Array, default:()=>[]},
})
let {proxy} = getCurrentInstance()
let editData = {
    "certificateId": 0,
    "companyId": 0,
    "credentialCode": "",
    "credentialType": 0,
    "endDate": "",
    "fileIdList": ['',''],
    "fileList": [
        {
            "businessId": "",
            "fileId": "",
            "fileName": "",
            "fileType": 0,
            "thumbnailViewUrl": "",
            "uploadName": "",
            "viewUrl": ""
        },
        {
            "businessId": "",
            "fileId": "",
            "fileName": "",
            "fileType": 0,
            "thumbnailViewUrl": "",
            "uploadName": "",
            "viewUrl": ""
        }
    ],
    "issuingAuthority": "",
    "remark": "",
    "startDate": ""
}

let mainData = reactive({
    formData: {},
    lists: [
        {key: 'credentialType', label: '证件类型', type: 'select', col: 24, filter: 'credentialType'},
        {key: 'credentialCode', label: '证件编码', col: 24, filter: 'companyOperatorState'},
        {key: 'issuingAuthority', label: '发证机构', col: 24, filter: 'companyType'},
        {key: 'startDate', label: '开始时间', type: 'date', data: {valueFormat: 'YYYY-MM-DD'}, col: 24},
        {key: 'endDate', label: '结束时间', type: 'date', data: {valueFormat: 'YYYY-MM-DD'}, col: 24},
        {key: 'remark', label: '备注', col: 24},
        {key: 'fileList', label: '附件', slot: true, col: 24},
    ],
    rules: {
        credentialType: [
            {required: true, message: '请选择证件类型', trigger: 'change'},
        ],
        credentialCode: [
            {required: true, message: '请输入证件编码', trigger: 'blur'},
        ],
        
    },
})
let lists = $ref([])
let formData = $ref({})
let loading = $ref(false)
let drawerFlag = $ref(false)
let fromDataRef = $ref(null)
let tbaleIndex = $ref(0)

const setFormData = (obj, i) => {
    if (obj) {
        let item = proxy.$_.cloneDeep(editData.fileList[0])
        let odItem = proxy.$_.cloneDeep(editData.fileList[1])
        tbaleIndex = i
        let data = proxy.$_.cloneDeep(obj)
        if(data.fileList.length == 1){
            data.fileIdList = [data.fileIdList[0],'']
            data.fileList = [data.fileList[0], item]
        }
        if(data.fileList.length == 0){
            data.fileIdList = ['','']
            data.fileList = [item, odItem]
        }
        
        mainData.formData = data
    } else {
        mainData.formData = proxy.$_.cloneDeep(editData)
    }
    drawerFlag = true
}

const clearUpload = (i)=>{
    let item = proxy.$_.cloneDeep(editData.fileList[0])
    mainData.formData.fileList[i] = item
}

const handleClose = () => {
    mainData.formData = {}
}

let eimts = defineEmits(['save'])
const save = () => {
    fromDataRef.submitForm(false).then((form) => {
        ElMessage.success('修改成功！')
        eimts('save', mainData.formData, tbaleIndex)
        drawerFlag = false
    })
}

defineExpose({setFormData})
</script>

<style scoped lang="scss">
</style>
