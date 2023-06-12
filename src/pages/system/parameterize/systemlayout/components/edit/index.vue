<template>
    <div>
        <tw-drawer @save="save" @handleClose="handleClose" confirm-btn="保存" :loading="loading" :title="title" width="100%"
            v-model="drawerFlag">
            <div class="system-edit-wrapper">
                <div class="form-wrapper">
                    <tw-custom-form ref="fromDataRef" class="w600" :lists="mainData.lists" :rules="mainData.rules"
                        :formData="mainData.formData" labelPosition="top">
                        <template #systemIconFileId>
                            <upload uploadTxt="上传Logo" v-model:id="mainData.formData.systemIconFileId"
                                v-model="mainData.formData.systemIconFile.viewUrl"></upload>
                        </template>

                    </tw-custom-form>
                </div>
                <div class="preview-wrapper">
                    <p style="color: brown;margin-bottom: 10px;">请上传平台背景图（尺寸：1920*969  格式：mp4、png、jpg  建议文件大小在200k以内）</p>
                    <upload uploadTxt="上传图片" v-model:id="mainData.formData.loginBackgroundFileId"
                        v-model="mainData.formData.loginBackgroundFile.viewUrl"></upload>
                </div>
            </div>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import { addOrUpdate } from '@/api/system/parameterize/systemlayout'
import { getCurrentInstance } from 'vue'
import store from "@/store";

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let mainData = reactive({
    formData: {
        "id": 0,
        "imagePath": "",
        "loginBackgroundFileId": "",
        "loginPageWord": "",
        "loginType": 1,
        "name": "",
        "pointCollectStatus": 0,
        "productPrimaryName": "",
        "productSecondaryName": "",
        "styleType": 0,
        "systemIconFileId": "",
        systemIconFile: { viewUrl: '' },
        loginBackgroundFile: { viewUrl: '' },
    },
    lists: [
        { key: 'name', label: '配置名称：', placeholder: '请输入配置名称', },
        { key: 'productPrimaryName', label: '平台名称(主)', placeholder: '请输入平台名称(主)', },
        { key: 'productSecondaryName', label: '平台名称(副)', placeholder: '请输入平台名称(副)', },
        { key: 'systemUrl', label: '平台配置链接', placeholder: '请输入平台配置链接', },
        // { key: 'permissionCode', label: '登录页底部文案', placeholder: '200字以内', maxlength: '200', showWordLimit: true },
        { key: 'loginType', label: '默认登录方式', type: 'select', children: [{ label: '账号登录', value: 1 }, { label: '手机登录', value: 2 }] },
        { key: 'pointCollectStatus', label: '聚合点是否展示', type: 'select', children: [{ label: '是', value: 1 }, { label: '否', value: 0 }] },
        { key: "systemIconFileId", label: "平台Logo", slot: true },
        // { key: 'pointCollectStatus', label: '聚合点是否展示', type: 'select',children: [{ label: '不显示', value: 0 }, { label: '显示', value: 1 }], },
        // { key: 'styleType', label: '主题风格', type: 'select',children: [{ label: '默认', value: 1 }],},
    ],
    rules: {
        name: [
            { required: true, message: '请输入配置名称', trigger: 'blur' },
        ],
        productPrimaryName: [
            { required: true, message: '请输入平台名称(主)', trigger: 'blur' },
        ],
        // productSecondaryName: [
        //     { required: true, message: '请输入平台名称(副)', trigger: 'blur' },
        // ],
        systemIconFileId: [
            { required: true, message: '请上传平台Logo', trigger: 'change' },
        ],
        // imagePath: [
        //     { required: true, message: '必填', trigger: 'blur' },
        // ],
    },
})
let formData = $ref({})
let loading = $ref(false)
let drawerFlag = $ref(false)
let fromDataRef = $ref(null)

const setFormData = (obj) => {
    // mainData.formData = proxy.$_.cloneDeep(obj)
    console.log(obj, 'obj');
    mainData.formData = { ...mainData.formData, ...obj }
    mainData.formData.systemIconFile = mainData.formData.systemIconFile || { viewUrl: '' }
    mainData.formData.systemIconFileId = obj.systemIconFile ? obj.systemIconFile.fileId : ''
    mainData.formData.loginBackgroundFile = mainData.formData.loginBackgroundFile || { viewUrl: '' }
    mainData.formData.loginBackgroundFileId = obj.loginBackgroundFile ? obj.loginBackgroundFile.fileId : ''
    console.log(mainData.formData, 'mainData.formData');
    drawerFlag = true
}

const handleClose = () => {
    // mainData.formData = {}
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
                store.dispatch('system/getSystemMsg')
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
:deep(.el-drawer) {
    .system-edit-wrapper {
        width: 100%;
        display: flex;

        .form-wrapper {
            width: 35%;
        }

        .preview-wrapper {
            width: 64%;
            .tw_upload {
                height: 100%;
            }

            .upload_img {
                width: 100% !important;
                height: 100% !important;
                .el-image {
                    width: 100% !important;
                    border-radius: 0px !important;
                    // height: 100% !important;

                    img {
                        width: 100% !important;
                        // height: 100% !important;
                    }
                }
            }
        }
    }
}
</style>
