<template>
    <div>
        <tw-drawer
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
                        :showBtns="false"
                        @save="save('first', $event)"
                        :loading="state.loading"
                        :lists="state.lists"
                        :formData="state.formData"
                    ></tw-custom-form>
                </el-tab-pane>
                <el-tab-pane v-if="showStatus" label="身份证" name="second">
                    <tw-custom-form
                        class="p20"
                        ref="icDtoRef"
                        :showBtns="false"
                        @save="save('second', $event)"
                        :loading="state.loading"
                        :lists="state.idLists"
                        :formData="state.formData.icDto"
                    >
                        <template #frontImageUrl>
                            <img style="width: 120px;height: 120px" :src="state.formData.icDto.frontImageUrl"/>
                        </template>
                        <template #backImageUrl>
                            <img style="width: 120px;height: 120px" :src="state.formData.icDto.backImageUrl"/>
                        </template>
                    </tw-custom-form>
                </el-tab-pane>
                <el-tab-pane v-if="showStatus" label="从业资格证" name="third">
                    <tw-custom-form
                        class="p20"
                        ref="ecDtoRef"
                        :showBtns="false"
                        :loading="state.loading"
                        :lists="state.ecLists"
                        :formData="state.formData.ecDto"
                        @save="save('third', $event)"
                    >
                        <template #frontImageUrl>
                            <img style="width: 120px;height: 120px" :src="state.formData.ecDto.frontImageUrl"/>
                        </template>
                        <template #backImageUrl>
                            <img style="width: 120px;height: 120px" :src="state.formData.ecDto.backImageUrl"/>
                        </template>
                    </tw-custom-form>
                </el-tab-pane>
                <el-tab-pane v-if="showStatus" label="驾驶证" name="fourth">
                    <tw-custom-form
                        class="p20"
                        ref="dcDtoRef"
                        :showBtns="false"
                        @save="save('fourth', $event)"
                        :loading="state.loading"
                        :lists="state.dcLists"
                        :formData="state.formData.dcDto"
                    >
                        <template #frontImageUrl>
                            <img style="width: 120px;height: 120px" :src="state.formData.dcDto.frontImageUrl"/>
                        </template>
                        <template #backImageUrl>
                            <img style="width: 120px;height: 120px" :src="state.formData.dcDto.backImageUrl"/>
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
import {getDriverInfo} from "@/api/operation/cars/practitioner";

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
    "companyId": 0,
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
        "gender": "",
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
        "gender": "",
        "icId": 0,
        "issueDate": "",
        "name": "",
        "nation": "",
        "number": ""
    },
    "mobilePhone": "",
    "role": 0,
    "sex": true
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
        { key: 'gender', label: '性别',col:12,type:'select', children: [{ label: '女', value: '女' }, { label: '男', value: '男' }], placeholder: '请选择性别' },
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
        { key: 'gender', label: '性别',col:12,type:'select', children: [{ label: '女', value: '女' }, { label: '男', value: '男' }], placeholder: '请选择性别' },
        { key: 'address', label: '住址',col:12, placeholder: '请输入住址' },
        { key: 'birth', label: '出生日期',col:12,type:'date', placeholder: '请选择出生日期', data: {valueFormat: 'YYYY-MM-DD'} },
        { key: 'issueDate', label: '初次领证日期',col:12, type:'date', placeholder: '请输入初次领证日期', data: {valueFormat: 'YYYY-MM-DD'} },
        { key: 'driverLevel', label: '准驾车型',col:12, placeholder: '请输入准驾车型' },
        { key: 'archiveCode', label: '档案编号',col:24, placeholder: '请输入档案编号' },
        { key: ['effectiveDate', 'expireDate'], label: '有限期限',col:24, type: 'esDate', placeholder: '请选择有效期限', data: {valueFormat: 'YYYY-MM-DD'}},
        { key: 'frontImageUrl', label: '驾驶证正面',col:24, slot: true },
        { key: 'backImageUrl', label: '驾驶证反面',col:24, slot: true },
    ],
})




const setFormData = (obj) => {
    state.formData = proxy.$_.cloneDeep(editData)
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
