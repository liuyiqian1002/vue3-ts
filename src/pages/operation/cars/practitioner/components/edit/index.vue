<template>
    <div>
        <tw-drawer
            @handleClose="handleClose"
            :loading="state.loading"
            :title="title"
            :isBtns="false"
            v-model="state.drawerFlag"
        >
            <el-tabs v-model="state.activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane class="pt20" label="基础信息" name="first">
                    <tw-custom-form
                        class="p20"
                        ref="editFormRef"
                        showBtns
                        @save="save('first', $event)"
                        :loading="state.loading"
                        :lists="state.lists"
                        :rules="state.rules"
                        :formData="state.formData"
                    ></tw-custom-form>
                </el-tab-pane>
                <el-tab-pane v-if="showStatus" label="身份证" name="second">
                    <tw-custom-form
                        class="p20"
                        ref="icDtoRef"
                        showBtns
                        @save="save('second', $event)"
                        :loading="state.loading"
                        :lists="state.idLists"
                        :rules="state.icrules"
                        :formData="state.formData.icDto"
                    >
                        <template #frontImageUrl>
                            <upload v-model="state.formData.icDto.frontImageUrl" v-model:id="state.formData.icDto.frontFileId" uploadTxt="上传图片"></upload>
                            <div class="example">
                                <el-image :src="sfzo" :preview-src-list="[sfzo]"></el-image>
                                <p class="tips">示例图</p>
                            </div>
                        </template>
                        <template #backImageUrl>
                            <upload v-model="state.formData.icDto.backImageUrl" v-model:id="state.formData.icDto.backFileId" uploadTxt="上传图片"></upload>
                            <div class="example">
                                <el-image :src="sfz" :preview-src-list="[sfz]"></el-image>
                                <p class="tips">示例图</p>
                            </div>
                        </template>
                    </tw-custom-form>
                </el-tab-pane>
                <el-tab-pane v-if="showStatus" label="从业资格证" name="third">
                    <tw-custom-form
                        class="p20"
                        ref="ecDtoRef"
                        showBtns
                        :loading="state.loading"
                        :lists="state.ecLists"
                        :rules="state.ecrules"
                        :formData="state.formData.ecDto"
                        @save="save('third', $event)"
                    >
                        <template #frontImageUrl>
                            <upload v-model="state.formData.ecDto.frontImageUrl" v-model:id="state.formData.ecDto.frontFileId" uploadTxt="上传从业资格证正面"></upload>
                        </template>
                        <template #backImageUrl>
                            <upload v-model="state.formData.ecDto.backImageUrl" v-model:id="state.formData.ecDto.backFileId" uploadTxt="上传从业资格证反面"></upload>
                        </template>
                    </tw-custom-form>
                </el-tab-pane>
                <el-tab-pane v-if="showStatus" label="驾驶证" name="fourth">
                    <tw-custom-form
                        class="p20"
                        ref="dcDtoRef"
                        showBtns
                        @save="save('fourth', $event)"
                        :loading="state.loading"
                        :lists="state.dcLists"
                        :rules="state.dcrules"
                        :formData="state.formData.dcDto"
                    >
                        <template #frontImageUrl>
                            <upload v-model="state.formData.dcDto.frontImageUrl" v-model:id="state.formData.dcDto.frontFileId" uploadTxt="上传驾驶证正面"></upload>
                        </template>
                        <template #backImageUrl>
                            <upload v-model="state.formData.dcDto.backImageUrl" v-model:id="state.formData.dcDto.backFileId" uploadTxt="上传驾驶证反面"></upload>
                        </template>
                    </tw-custom-form>
                </el-tab-pane>
            </el-tabs>
            
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import sfzo from "@/assets/images/sfz_o.jpg"
import sfz from "@/assets/images/sfz.jpg"
import {getDriverInfo, addOrUpdate, driverInfoDcAddOrUpdate, driverInfoEcAddOrUpdate, driverInfoIcAddOrUpdate} from "@/api/operation/cars/practitioner";
import {validAlid, validAlphone} from "../../../../../../utils/validate";

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let editFormRef = $ref(null)
let icDtoRef = $ref(null)
let ecDtoRef = $ref(null)
let dcDtoRef = $ref(null)
let showStatus = $ref(false)
let editData = {
    "birthday": "",
    "companyId": '',
    "companyName": "",
    "contactName": "",
    "contactPhone": "",
    "contactRelation": "",
    "dcDto": {
        "address": "",
        "archiveCode": "",
        "backFileId": "",
        "backImageUrl": "",
        "birth": "",
        "driverId": 0,
        "driverLevel": "",
        "effectiveDate": "",
        "expireDate": "",
        "frontFileId": "",
        "frontImageUrl": "",
        "gender": "男",
        "id": 0,
        "issueDate": "",
        "name": "",
        "number": ""
    },
    "driverId": 0,
    "driverName": "",
    "ecDto": {
        "authority": "",
        "backFileId": "",
        "backImageUrl": "",
        "category": "",
        "driverId": 0,
        "effectiveDate": "",
        "expireDate": "",
        "frontFileId": "",
        "frontImageUrl": "",
        "id": 0,
        "issueDate": "",
        "name": "",
        "number": ""
    },
    "icDto": {
        "address": "",
        "authority": "",
        "backFileId": "",
        "backImageUrl": "",
        "birth": "",
        "driverId": 0,
        "expireDate": "",
        "frontFileId": "",
        "frontImageUrl": "",
        "gender": "男",
        "icId": 0,
        "issueDate": "",
        "name": "",
        "nation": "",
        "number": ""
    },
    "mobilePhone": "",
    "role": 0,
    "sex": false
}
let state = reactive({
    drawerFlag: false,
    loading: false,
    fromDataRef: null,
    activeName: 'first',
    formData: {},
    lists: [
        { key: 'driverName', label: '人员姓名',col:12, placeholder: '请输入人员姓名'},
        { key: 'mobilePhone', label: '联系电话',col:12,  placeholder: '请输入联系电话', maxlength: 11},
        { key: 'birthday', label: '出生日期',col:12,type:'date', placeholder: '请选择出生日期', data: {valueFormat: 'YYYY-MM-DD'} },
        { key: 'role', label: '岗位',col:12, type: 'select',filter: 'driverRole', placeholder: '请选择岗位' },
        { key: 'companyId', label: '所属企业',col:12, type:'select', remote: true, url: '/business/company/associateCompany', method: 'post', params: {havePermission: true}, props:{ label: 'companyName', value:'companyId'}, placeholder: '请选择企业名称' },
        { key: 'sex', label: '性别',col:12,type:'select', placeholder: '请选择性别', children: [{ label: '女', value: true }, { label: '男', value: false }] },
        { key: 'contactName', label: '紧急联系人',col:12, placeholder: '请输入紧急联系人' },
        { key: 'contactPhone', label: '紧急联系电话',col:12, placeholder: '请输入紧急联系电话', maxlength: 11 },
        { key: 'contactRelation', label: '关系',col:12, type:'select',filter: 'contactRelation', placeholder: '请选择关系' },
    ],
    idLists: [
        { key: 'name', label: '姓名',col:12, placeholder: '请输入姓名' },
        { key: 'number', label: '身份证',col:12, placeholder: '请输入身份证' },
        { key: 'gender', label: '性别',col:12,type:'select', children: [{ label: '男', value: '男' }, { label: '女', value: '女' }], placeholder: '请选择性别' },
        { key: 'nation', label: '民族',col:12, placeholder: '请输入民族' },
        { key: 'birth', label: '出生日期',col:12,type:'date', placeholder: '请选择出生日期', data: {valueFormat: 'YYYY-MM-DD'} },
        { key: 'address', label: '住址',col:12, placeholder: '请输入住址' },
        { key: 'authority', label: '签发机关',col:24, placeholder: '请输入签发机关' },
        { key: ['issueDate', 'expireDate'], label: '有效期限',col:24, type: 'esDate', placeholder: '请选择有效期限', data: {valueFormat: 'YYYY-MM-DD'}},
        { key: 'frontImageUrl', label: '身份证正面',col:24, slot: true },
        { key: 'backImageUrl', label: '身份证反面',col:24, slot: true },
    ],
    ecLists: [
        { key: 'number', label: '资格证号',col:12, placeholder: '请输入资格证号' },
        { key: 'category', label: '资格证类别',col:12, placeholder: '请输入资格证类别' },
        { key: 'authority', label: '发证机关',col:12, placeholder: '请输入发证机关' },
        { key: 'issueDate', label: '领证日期',col:12,type:'date', placeholder: '请选择领证日期', data: {valueFormat: 'YYYY-MM-DD'} },
        { key: ['effectiveDate', 'expireDate'], label: '有效期限',col:24, type: 'esDate', placeholder: '请选择有效期限', data: {valueFormat: 'YYYY-MM-DD'}},
        { key: 'frontImageUrl', label: '从业资格证正面',col:24, slot: true },
        { key: 'backImageUrl', label: '从业资格证反面',col:24, slot: true },
    ],
    dcLists: [
        { key: 'number', label: '驾驶证号',col:12, placeholder: '请输入驾驶证号' },
        { key: 'gender', label: '性别',col:12,type:'select', children: [{ label: '男', value: '男' }, { label: '女', value: '女' }], placeholder: '请选择性别' },
        { key: 'address', label: '住址',col:12, placeholder: '请输入住址' },
        { key: 'birth', label: '出生日期',col:12,type:'date', placeholder: '请选择出生日期', data: {valueFormat: 'YYYY-MM-DD'} },
        { key: 'issueDate', label: '初次领证日期',col:12, type:'date', placeholder: '请输入初次领证日期', data: {valueFormat: 'YYYY-MM-DD'} },
        { key: 'driverLevel', label: '准驾车型',col:12, placeholder: '请输入准驾车型' },
        { key: 'archiveCode', label: '档案编号',col:24, placeholder: '请输入档案编号' },
        { key: ['effectiveDate', 'expireDate'], label: '有限期限',col:24, type: 'esDate', placeholder: '请选择有效期限', data: {valueFormat: 'YYYY-MM-DD'}},
        { key: 'frontImageUrl', label: '驾驶证正面',col:24, slot: true },
        { key: 'backImageUrl', label: '驾驶证反面',col:24, slot: true },
    ],
    rules: {
        driverName: [
            {required: true, message: '请输入人员姓名', trigger: 'blur'},
        ],
        mobilePhone: [
            { required: true, message: '请输入手机号', trigger: 'blur'},
            { max: 11, message: '请输入正确手机号', trigger: 'blur', validator: validAlphone},
        ],
        role: [
            { required: true, message: '请选择岗位', trigger: 'blur'},
        ],
        contactName: [
            { required: true, message: '请输入紧急联系人', trigger: 'blur'},
        ],
        contactPhone: [
            { required: true, message: '请输入紧急联系电话', trigger: 'blur'},
        ],
        contactRelation: [
            { required: true, message: '请选择关系', trigger: 'blur'},
        ],
        
    },
    icrules: {
        name: [
            { required: true, message: '请输入姓名', trigger: 'blur'},
        ],
        number: [
            { required: true, message: '请输入身份证', trigger: 'blur'},
            { message: '请输入正确身份证', trigger: 'blur', validator: validAlid},
        ],
        issueDate: [
            { required: true, message: '请选择有效期限', trigger: 'blur'},
        ],
        expireDate: [
            { required: true, message: '请选择有效期限', trigger: 'blur'},
        ],
    },
    ecrules: {
        number: [
            { required: true, message: '请输入资格证号', trigger: 'blur'},
        ],
        category: [
            { required: true, message: '请输入资格证类别', trigger: 'blur'},
        ],
        issueDate: [
            { required: true, message: '请选择领证日期', trigger: 'blur'},
        ],
        effectiveDate: [
            { required: true, message: '请选择有效期限', trigger: 'blur'},
        ],
        expireDate: [
            { required: true, message: '请选择有效期限', trigger: 'blur'},
        ],
    },
    dcrules: {
        number: [
            { required: true, message: '请输入驾驶证号', trigger: 'blur'},
        ],
        driverLevel: [
            { required: true, message: '请输入准驾车型', trigger: 'blur'},
        ],
        archiveCode: [
            { required: true, message: '请输入档案编号', trigger: 'blur'},
        ],
        issueDate: [
            { required: true, message: '请选择领证日期', trigger: 'blur'},
        ],
        effectiveDate: [
            { required: true, message: '请选择有效期限', trigger: 'blur'},
        ],
        expireDate: [
            { required: true, message: '请选择有效期限', trigger: 'blur'},
        ],
    }
})




const setFormData = (obj) => {
    state.formData = proxy.$_.cloneDeep(editData)
    if(obj){
        showStatus = true
        getDriverInfo({driverId: obj.driverId}).then(res=>{
            let data = {...state.formData, ...res}
            // 后台数据会返回null，前端会报错
            if(!data.icDto) data.icDto = proxy.$_.cloneDeep(state.formData.icDto)
            if(!data.ecDto) data.ecDto = proxy.$_.cloneDeep(state.formData.ecDto)
            if(!data.dcDto) data.dcDto = proxy.$_.cloneDeep(state.formData.dcDto)
            state.formData = proxy.$_.cloneDeep(data)
            state.drawerFlag = true
        })
    }else {
        showStatus = false
        state.activeName = "first"
        state.formData = proxy.$_.cloneDeep(state.formData)
        state.drawerFlag = true
    }
}

const handleClose = ()=>{
    let arr = [editFormRef, icDtoRef, ecDtoRef, dcDtoRef]
    arr.forEach(async (item)=>{
        item.clearValidate()
    })
    state.formData = proxy.$_.cloneDeep(editData)
}

let eimts = defineEmits(['getTable'])
const save = (str, formData) => {
    let objArr = { "first": {ref: editFormRef, api: addOrUpdate, form: state.formData },  "second": {ref: icDtoRef, api: driverInfoIcAddOrUpdate, form: state.formData.icDto},  "third": {ref: ecDtoRef, api: driverInfoEcAddOrUpdate, form: state.formData.ecDto},  "fourth": {ref: dcDtoRef, api: driverInfoDcAddOrUpdate, form: state.formData.dcDto}}
    let formObj = objArr[str]
    // formObj.ref.submitForm(false).then(err=>{
    console.log(formData);
    state.loading = true
        formObj.api(formData).then(() => {
            state.loading = false
            ElMessage.success('操作成功！')
            state.drawerFlag = false
            eimts('getTable')
        }).catch(() => {
            state.loading = false
        })
    // })
    
    // state.fromDataRef.submitForm(false).then((form) => {
    // state.loading = true
    
    // })
}

const handleClick = (val)=>{

}

defineExpose({ ...toRefs(state), setFormData })
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
