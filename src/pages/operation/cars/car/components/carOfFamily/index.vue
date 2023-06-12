<template>
    <div>
        <tw-dialog
            
            @handleClose="handleClose"
            :loading="loading"
            :title="title"
            :width="500"
            height="50%"
            v-model="drawerFlag"
        >
            <div class="w">
                <tw-org :formData="mainData.formData" :item="itemOrg" @tapClick="changeSelect"></tw-org>
                <div class="tw_c pt30 mt30">
                    <el-button type="primary" @click="save">确定</el-button>
                </div>
            </div>
        </tw-dialog>
    </div>
</template>

<script setup lang="ts">
import { addOrUpdate } from '@/api/system/systemrecord/dictionaries'
import {getCurrentInstance, reactive} from 'vue'
import {updateVehicleCompany} from "../../../../../../api/operation/cars/car";

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()

let itemOrg = $ref({label: '组织结构', key: 'dataPermissionCode', placeholder: '请输入组织结构', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: { "hasDataPermission": true, needVehicle: false, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode', disabled: 'nocheck'}, permissionIds:[],})

let mainData = reactive({
    formData: {
        dataPermissionCode: '',
        vehicleIdList: [],
    },
})
let loading = $ref(false)
let drawerFlag = $ref(false)

const setFormData = (lists) => {
    let ids = proxy.$_.map(lists, 'vehicleId')
    mainData.formData.vehicleIdList = ids
    drawerFlag = true
}

const handleClose = ()=>{
    // mainData.formData = {}
}

let eimts = defineEmits(['getTable'])
const save = () => {
    loading = true
    updateVehicleCompany(mainData.formData).then(() => {
        loading = false
        ElMessage.success('修改成功！')
        drawerFlag = false
        eimts('getTable')
    }).catch(() => {
        loading = false
    })
}
defineExpose({ setFormData })
</script>

<style scoped lang="scss">
</style>
