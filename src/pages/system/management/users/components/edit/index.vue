<template>
    <div>
        <tw-drawer
            @save="save"
            :loading="loading"
            :title="title"
            v-model="drawerFlag"
        >
            <tw-custom-form
                v-if="drawerFlag"
                ref="fromDataRef"
                class="w500"
                :lists="lists"
                :formData="formData"
            ></tw-custom-form>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import { addOrUpdate } from '@/api/system/management/users'
import { getCurrentInstance } from 'vue'

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let lists = reactive([
    { key: 'roleName', label: '角色名称' },
    { key: 'orgPermissionCode', label: '绑定机构', type: 'org', url: '/system/orgTree/getAll', method: 'post', params: { "hasDataPermission": true, needVehicle: false, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode'},},
    // { key: "productCode", label: "产品编码", disabled: true },
])
let formData = $ref({})
let loading = $ref(false)
let drawerFlag = $ref(false)
let fromDataRef = $ref(null)

const setFormData = (obj) => {
    drawerFlag = true
    formData = obj.roleName ? proxy.$_.cloneDeep(obj) : { roleName: '', orgPermissionCode: '' }
}
let eimts = defineEmits(['getTable'])
const save = () => {
    fromDataRef.submitForm(false).then((form) => {
        loading = true
        addOrUpdate(form)
            .then(() => {
                loading = false
                ElMessage.success('修改成功！')
                drawerFlag = false
                eimts('getTable')
            })
            .catch(() => {
                loading = false
            })
    })
}
defineExpose({ setFormData })
</script>

<style scoped lang="scss">
</style>
