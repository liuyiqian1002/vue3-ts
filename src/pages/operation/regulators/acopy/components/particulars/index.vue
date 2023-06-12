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
        { key: 'title', label: '抄告标题：' },
        { key: 'noticeType', label: '抄告类型：', filter: 'copyNoticeType' },
        { key: 'createTime', label: '创建时间：' },
        { key: 'createName', label: '创建人：' },
        { key: 'digest', label: '摘要：' },
        { key: 'content', label: '抄告内容：' },
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
    drawerFlag = false
}
defineExpose({ setFormData })
</script>

<style scoped lang="scss">
</style>
