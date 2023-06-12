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
            <!-- <div class="attech-wrapper">attech</div> -->
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
        { key: 'title', label: '新闻标题：' },
        { key: 'noticeType', label: '新闻类型：', filter: 'noticeType' },
        { key: 'createTime', label: '创建时间：' },
        { key: 'createName', label: '创建人：' },
        { key: 'digest', label: '摘要：' },
        { key: 'content', label: '新闻内容：' },
    ],
})
let drawerFlag = $ref(false)
let fromDataRef = $ref(null)

let data = $ref({})
const setFormData = (obj) => {
    data = proxy.$_.cloneDeep(obj)
    mainData.formData = data
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
.attech-wrapper {
    margin-left: 55px;
}
</style>
