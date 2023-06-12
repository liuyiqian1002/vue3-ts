<template>
    <div>
        <tw-drawer
            @save="save"
            @handleClose="handleClose"
            :title="title"
            :isBtns="false"
            v-model="drawerFlag"
        >
            <tw-descriptions
            ref="fromDataRef"
                :lists="mainData.lists"
                :data="mainData.formData"
            ></tw-descriptions>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let mainData = reactive({
    formData: {},
    lists: [
        { key: 'title', label: '系统标题:' },
        { key: 'createTime', label: '发送时间:' },
        { key: 'messageId', label: '发送人:', },
        { key: 'content', label: '系统类容:', },
    ],
})
let drawerFlag = $ref(false)
let fromDataRef = $ref(null)

const setFormData = (obj) => {
    mainData.formData = proxy.$_.cloneDeep(obj)
    console.log(mainData.formData)
    drawerFlag = true
}

const handleClose = () => {
    mainData.formData = {}
}

let eimts = defineEmits(['getTable'])
const save = () => {
}
defineExpose({ setFormData })
</script>

<style scoped lang="scss">
</style>
