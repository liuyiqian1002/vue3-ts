<template>
    <el-upload
        action="api/file/uploadFile"
        :file-list="fileList"
        :headers="headers"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :on-remove="handleRemove"
        :limit="limit"
        list-type="picture-card"
        class="w400"
        ref="upload"
        multiple
    >
        <el-icon class="el-icon--upload"><plus /></el-icon>
    </el-upload>
</template>
<script lang="ts" setup>
import { getToken } from '@/utils/auth'
import type { UploadFile } from 'element-plus'

const { limit, mainData } = defineProps({
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    limit: { type: Number, default: 3 },
    mainData: { type: Object, default: () => {} },
})
const headers = { 'voms-token': getToken() }
let upload = $ref(null)
const fileList = reactive([])
watch(() => mainData.formData.fileIdList, (val) => {
    console.log(val, 'fileList watch')
})
// 上传前校验
const beforeUpload = (file) => {
    return true
}
let emits = defineEmits(['update:modelValue', 'getTable'])
//上传成功回调
const handleSuccess = (res, file) => {
    console.log(res.object,file, fileList, 'handleSuccess')
    if (res.code === 0) {
        mainData.formData.fileIdList.push(res.object.data.fileId)
    } else {
        ElMessage.error({ message: res.message })
        // emits('getTable', false)
        // close()
    }
}
//上传文件
const close = () => {
    emits('update:modelValue', false)
}

const disabled = ref(false)
const handleRemove = (file: UploadFile) => {
    // console.log(file.response.object, mainData.formData.fileIdList)
    mainData.formData.fileIdList = mainData.formData.fileIdList.filter(item => {
        return item !==  (file.response as any).object.data.fileId
    })
}
</script>
<style lang="scss" scoped>
</style>
