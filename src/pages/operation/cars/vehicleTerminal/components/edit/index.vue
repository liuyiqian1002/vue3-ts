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
import { addOrUpdate} from "@/api/operation/cars/vehicleTerminal";

defineProps({
    title: String,
})
let {proxy} = getCurrentInstance()
let editFormRef = $ref(null)
let editData = {
    "manufacturer": "",
    "name": "",
    "recorderVersion": "",
    "remark": "",
    "terminalClassify": '',
    "terminalModel": "",
    "terminalProtocolCode": "",
    "terminalTypeId": ''
}
let state = reactive({
    drawerFlag: false,
    loading: false,
    fromDataRef: null,
    activeName: 'first',
    formData: {},
    lists: [
        {key: 'terminalClassify', label: '终端分类', type:'select', filter: 'terminalClassify', placeholder: '请选择终端分类', },
        {key: 'name', label: '终端名称', placeholder: '请输入终端名称', },
        {key: 'terminalModel', label: '终端型号', placeholder: '请输入终端型号', },
        {key: 'terminalProtocolCode', label: '协议名称', type:'select', filter: 'terminalProtocolCode', placeholder: '请选择协议名称', },
        {key: 'recorderVersion', label: '行驶记录仪版本', placeholder: '请输入行驶记录仪版本', },
        {key: 'manufacturer', label: '生产厂家', placeholder: '请输入生产厂家', },
        {key: 'remark', label: '备注', props: {type: 'textarea'}, placeholder: '请输入备注'},
    ],
    rules: {
        terminalClassify: [
            {required: true, message: '请输入类型编码', trigger: 'blur'},
        ],
        terminalModel: [
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
        state.lists[2].disabled = true
        state.drawerFlag = true
    } else {
        state.formData = proxy.$_.cloneDeep(state.formData)
        state.lists[0].disabled = false
        state.lists[2].disabled = false
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
