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
import type { UploadFile, UploadUserFile } from 'element-plus'

let { limit, fileList } = defineProps({
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    limit: { type: Number, default: 3 },
    fileList: { type: Array<UploadUserFile>, default: () => [] },
})
const headers = { 'voms-token': getToken() }
let upload = $ref(null)
// const fileList = reactive([])
// watch(() => fileIdList, (val) => {
//     console.log(val, 'fileList watch')
// })
// 上传前校验
const beforeUpload = (file) => {
    return true
}
let emits = defineEmits(['update:modelValue', 'getTable'])
//上传成功回调
const handleSuccess = (res, file) => {
    console.log(res.object,file, fileList, 'handleSuccess')
    if (res.code === 0) {
        fileList.push(res.object.data)
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
    fileList = fileList.filter(item => {
        return item !==  (file.response as any).object.data.fileId
    })
}
</script>
<style lang="scss" scoped>
</style>
