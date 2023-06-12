<template>
    <div id="tw_upload" :class="obj[type]">
        <div class="upload_img relative" v-if="modelValue">
            <div class="upload_close radius tw_c positionTr" style="z-index: 1">
                <el-icon :size="16" class="pointer" @click="close"><Close /></el-icon>
            </div>
            <el-image style="width: 100px; height: 100px" class="radius h" :src="modelValue" :zoom-rate="1.2" :preview-src-list="[modelValue]">
                <template #error>
                    <div class="image-slot w h tw_c">
                        <el-icon :size="40" color="#ccc"><Picture /></el-icon>
                    </div>
                </template>
            </el-image>
        </div>
        
        <el-upload
            v-else
            :action="'api/file/uploadImage'"
            :headers="headers"
            :on-change="handleChange"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            :on-progress="uploadProcess"
            :before-remove="beforeRemove"
            :file-list="fileList"
            :multiple="multiple"
            :limit="limit"
            class="mb20"
            ref="upload"
        >
            <template #trigger>
                <div class="tw_cy">
                    <div class="image-slot w h tw_c mb20 mt20">
                        <el-icon :size="40" color="#ccc"><Picture /></el-icon>
                    </div>
                    <el-button icon="upload-filled">{{ uploadTxt }}</el-button>
                </div>
            </template>
        
            <template v-if="tipShow" #tip>
                <div class="el-upload__tip">支持扩展名: .jpg.png<br/>文件大小不超过1M</div>
            </template>
        </el-upload>
    </div>
    
</template>
<script setup>
import { getToken } from '@/utils/auth'
import { deleteFile } from '@/api/common'

const { modelValue, id, uploadType, tipShow, src, type, uploadTxt, multiple, limit } = defineProps({// 文件类型, 例如['png', 'jpg', 'jpeg']
    modelValue: { type: String, default: '' },
    id: { type: String, default: '' },
    uploadType: {type: Array, default: ()=>['image/jpeg', 'image/jpg', 'image/png', 'image/bmp']},
    tipShow: { type: Boolean, default: false},
    src: { type: String, default: '' },
    type: { type: String, default: 'y' },
    uploadTxt: { type: String, default: '上传文件' },
    multiple: { type: Boolean, default: false },
    limit: { type: Number, default: 1 },
})

const obj = $ref({y: 'tw_cy', x: 'tw_cl'})

const fileList = reactive([])
const headers = { "voms-token": getToken() }
const percent = $ref(0)
let upload = $ref(null)
// 上传前校验
const beforeUpload = (file) => {
    let types = uploadType
    const isImage = types.includes(file.type)
    const isLt2M = file.size / 1024 / 1024 < 1
    if (!isImage) {
        upload.clearFiles()
        ElMessage.warning('上传头像图片只能是 JPG、PNG 格式!')
        return isImage
    }
    if (!isLt2M) {
        upload.clearFiles()
        ElMessage.warning('上传头像图片大小不能超过 1MB!')
        return isLt2M
    }
    return isImage && isLt2M
}
let emits = defineEmits(['update:modelValue', 'update:id', 'clearUpload'])

//上传成功回调
const handleSuccess = (res, file) => {
    if (res) {
        console.log(res.object.data)
        // emits('update:modelValue', res.object.data.thumbnailViewUrl)
        emits('update:modelValue', res.object.data.viewUrl)
        emits('update:id', res.object.data.fileId)
        emits('handleSuccess', res.object.data)
        
        // ElMessage.success({ message: '上传成功!', })
    } else {
        ElMessage.error({
            message: '上传失败，请重新上传',
        })
    }
}

//上传文件
const handleChange = (file, fileList) => {
    // console.log('file---', file)
    // console.log('fileList---', fileList)
    // fileList = fileList.slice(-3);
}

// 上传时候的钩子
const uploadProcess = (event, file, fileList) => {
    // console.log(event.percent);
    // percent.value = Math.floor(event.percent)
}

// 删除图片
const close = ()=>{
    deleteFile(id).then(res=>{
        emits('update:modelValue', '')
        emits('update:id', '')
        emits('clearUpload', id)
        if(upload){
            upload.clearFiles()
        }
    }).catch(()=>{
        ElMessage.error({
            message: '删除失败',
        })
    })
}

// 删除
const beforeRemove = (file, fileList) => {
    const result = new Promise((resolve, reject) => {
        ElMessageBox.confirm('此操作将删除该图片, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(() => {
                let index = fileList.indexOf(file)
                fileList.splice(index, 1)
                // 请求删除接口
            })
            .catch(() => {
                reject(false)
            })
    })
    return result
}


</script>

<style lang="scss" scoped>
#tw_upload {
    .upload_img {
        width: 100px; height: 100px;
        .upload_close {
            width: 16px; height: 16px;background: var(--el-overlay-color-light);color: var(--el-color-white);
            &:hover { background: var(--el-overlay-color-lighter) }
        }
    }
    :deep(.el-upload-list) { display: none}
}

</style>
