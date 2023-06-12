<template>
<!--    background: rgba(0,0,0,0)-->
    <div class="el-overlay is-message-box" v-if="modelValue" style="z-index: 2028; ">
        <div role="dialog" aria-modal="true" aria-describedby="el-id-6613-166" class="el-overlay-message-box"
             aria-label="导入数据">
            <div class="el-message-box" tabindex="-1">
                <div class="el-message-box__header">
                    <div class="el-message-box__title"><!--v-if--><span>导入数据</span></div>
    
                    <button @click="close" type="button" class="el-message-box__headerbtn" aria-label="el.messagebox.close"><i
                        class="el-icon el-message-box__close">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor"
                                  d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path>
                        </svg>
                    </i></button>
<!--                    <button type="button" class="el-message-box__headerbtn" aria-label="el.messagebox.close">-->
<!--                        <el-icon class="el-icon&#45;&#45;right el-message-box__close"><close /></el-icon>-->
<!--                    </button>-->
                </div>
                <div class="el-message-box__content">
                    <div class="el-message-box__container"><!--v-if-->
                        <div class="el-message-box__message">
                            <el-upload
                                action="api/system/user/upload"
                                :headers="headers"
                                :on-success="handleSuccess"
                                :before-upload="beforeUpload"
                                :limit="limit"
                                class="mb20"
                                ref="upload"
                            >
                                <template #trigger>
                                    <el-button link="primary" icon="upload-filled">上传文件</el-button>
                                </template>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div class="el-message-box__btns"><!--v-if-->
                    <button @click="close" class="el-button el-button--primary" aria-disabled="false" type="button"><!--v-if--><span
                        class="">确定</span></button>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
import { getToken } from '@/utils/auth'

const { limit, modelValue } = defineProps({// 文件类型, 例如['png', 'jpg', 'jpeg']
    limit: { type: Number, default: 1 },
    modelValue: {type: Boolean, default: false},
})

const headers = { 'voms-token': getToken() }
let upload = $ref(null)
// 上传前校验
const beforeUpload = (file) => {
    // let types = uploadType
    // const isImage = types.includes(file.type)
    // const isLt2M = file.size / 1024 / 1024 < 1
    // if (!isImage) {
    //     upload.clearFiles()
    //     ElMessage.warning('上传头像图片只能是 JPG、PNG 格式!')
    //     return isImage
    // }
    // if (!isLt2M) {
    //     upload.clearFiles()
    //     ElMessage.warning('上传头像图片大小不能超过 1MB!')
    //     return isLt2M
    // }
    // return isImage && isLt2M
    return true
}
let emits = defineEmits(['update:modelValue', 'getTable'])

//上传成功回调
const handleSuccess = (res, file) => {
    if (res.code != 0) {
        ElMessage.error({ message: res.message, })
    }else {
        emits('getTable', false)
        close()
    }
}

//上传文件
const close = () => {
    emits('update:modelValue', false)
}


</script>

<style lang="scss" scoped>


</style>
