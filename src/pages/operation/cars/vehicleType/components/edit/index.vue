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
                class="p20 w500"
                ref="editFormRef"
                showBtns
                @save="save('first', $event)"
                :loading="state.loading"
                :lists="state.lists"
                :rules="state.rules"
                :formData="state.formData"
            >
            </tw-custom-form>
        
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import { addOrUpdate} from "@/api/operation/cars/vehicleType";

defineProps({
    title: String,
})
let {proxy} = getCurrentInstance()
let editFormRef = $ref(null)
let editData = {
    "code": "",
    "name": "",
    "parentCode": "",
    "vehicleTypeId": ''
}
let state = reactive({
    drawerFlag: false,
    loading: false,
    fromDataRef: null,
    activeName: 'first',
    formData: {},
    lists: [
        {key: 'code', label: '类型编码', placeholder: '请输入类型编码', },
        {key: 'name', label: '类型名称', placeholder: '请输入类型名称'},
        {label: '上级名称', key: 'parentCode', type:'select', remote: true, url: '/business/vehicleType/getParentType', method: 'post', params: {havePermission: true}, props:{ label: 'name', value:'code'}, placeholder: '请选择上级名称'},
    ],
    rules: {
        code: [
            {required: true, message: '请输入类型编码', trigger: 'blur'},
        ],
        name: [
            {required: true, message: '请输入类型名称', trigger: 'blur'},
        ],
        // parentCode: [
        //     {required: true, message: '请选择上级名称', trigger: 'change'},
        // ],
    },
})


const setFormData = (obj) => {
    if (obj) {
        // 后台数据会返回null，前端会报错
        state.formData = proxy.$_.cloneDeep(obj)
        state.lists[0].disabled = true
        state.drawerFlag = true
    } else {
        state.formData = proxy.$_.cloneDeep(state.formData)
        state.lists[0].disabled = false
        state.drawerFlag = true
    }
}

const handleClose = () => {
    editFormRef.clearValidate()
    state.formData = proxy.$_.cloneDeep(editData)
}

let eimts = defineEmits(['getTable'])
const save = (str, formData) => {
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

</style>
