<template>
    <div>
        <tw-drawer
            @save="save"
            @handleClose="handleClose"
            :loading="loading"
            :title="title"
            v-model="drawerFlag"
        >
            <tw-custom-form
                ref="fromDataRef"
                class="w500"
                :lists="mainData.lists"
                :rules="mainData.rules"
                :formData="mainData.formData"
            ></tw-custom-form>
            <!-- 上传 -->
            <mUpload class="userUpload" tipShow :mainData="mainData"></mUpload>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import {
    addOrUpdate,
    getOneById,
} from '@/api/operation/businessmanagement/announcement/index'
import { getCurrentInstance } from 'vue'
import mUpload from '../Upload/index.vue'

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()

const selectChange = (val, data, item) => {
    console.log(val, data, item, 'val,data')
    let result = []
    const key = item.key.replace(/Origin/, '')
    item.children.forEach((it) => {
        if (val.includes(it.companyId)) {
            result.push({
                orgId: it.companyId,
                businessName: it.companyName,
                permissionLevel: 5,
            })
        }
    })
    mainData.formData[key] = result
    console.log(mainData.formData[key], 'mainData.formData[item.key]')
}

let mainData = reactive({
    formData: {
        content: '',
        digest: '',
        fileIdList: [],
        id: 0,
        isOnTime: 0,
        noticeType: '',
        notificationType: 2, // 2抄告
        publishObj: '',
        publishObject: [
            {
                businessName: '',
                orgId: 0,
                permissionLevel: 0,
            },
        ],
        publishObjectOrigin: [], // 请求时需删除
        publishStatus: 0,
        publishType: 4,
        reciveType: 1,
        sendTime: '',
        title: '',
    },
    lists: [
        { key: 'title', label: '抄告标题：', placeholder: '请输入抄告标题' },
        {
            key: 'noticeType',
            label: '抄告类型：',
            type: 'select',
            filter: 'copyNoticeType',
            placeholder: '请选择抄告类型',
        },
        {
            key: 'publishType',
            label: '发布对象：',
            type: 'radio',
            children: [
                { label: '按企业发送', value: 4 },
                { label: '按账户发送', value: 3 },
            ],
            change: (val, e) => {
                console.log(typeof val, e, 'publishType')
                if (val === '4') {
                    mainData.lists[3] = {
                        label: '',
                        key: 'publishObjectOrigin',
                        type: 'select',
                        multiple: true,
                        remote: true,
                        url: '/business/company/associateCompany',
                        method: 'post',
                        loadMore: true,
                        params: {
                            pageNumber: 1,
                            pageSize: 25,
                            havePermission: true,
                        },
                        props: { label: 'companyName', value: 'companyId' },
                        placeholder: '请选择企业',
                        change: selectChange,
                    }
                } else if (val === '3') {
                    mainData.lists[3] = {
                        label: '',
                        key: 'publishObjectOrigin',
                        type: 'select',
                        multiple: true,
                        remote: true,
                        url: '/system/user/page',
                        method: 'post',
                        loadMore: true,
                        params: {
                            pageNumber: 1,
                            pageSize: 25,
                            havePermission: true,
                        },
                        props: { label: 'realName', value: 'userId' },
                        placeholder: '请选择账户',
                        change: (val, data, item) => {
                            let result = []
                            const key = item.key.replace(/Origin/, '')
                            item.children.forEach((it) => {
                                if (val.includes(it.userId)) {
                                    result.push({
                                        orgId: it.userId,
                                        businessName: it.realName,
                                        permissionLevel: 5,
                                    })
                                }
                            })
                            mainData.formData[key] = result
                            console.log(
                                mainData.formData[key],
                                'mainData.formData[item.key]',
                            )
                        },
                    }
                }
            },
        },
        {
            label: '',
            key: 'publishObjectOrigin',
            type: 'select',
            multiple: true,
            remote: true,
            url: '/business/company/associateCompany',
            method: 'post',
            loadMore: true,
            params: { pageNumber: 1, pageSize: 25, havePermission: true },
            props: { label: 'companyName', value: 'companyId' },
            placeholder: '请选择企业',
            change: selectChange,
        },
        // {label: '', key: 'publishObject', type:'select', multiple: true, remote: true, url: '/system/user/page', method: 'post', loadMore: true, params: {pageNumber: 1, pageSize: 25, havePermission: true}, props:{ label: 'realName', value:'userId'}, placeholder: '请选择账户'},
        {
            key: 'reciveType',
            label: '发布端：',
            type: 'radio',
            children: [
                { label: '电脑端', value: 1 },
                { label: 'app端', value: 2 },
                { label: '电脑端,app端', value: 3 },
            ],
        },
        {
            key: 'digest',
            label: '摘要：',
            placeholder: '请输入摘要',
            props: { type: 'textarea' },
        },
        {
            key: 'isOnTime',
            label: '是否定时：',
            type: 'radio',
            children: [
                { label: '是', value: 1 },
                { label: '否', value: 0 },
            ],
            change: (val) => {
                console.log(val, 'isOnTime')
                if (val === '1') {
                    //
                    mainData.lists[7] = {
                        label: '',
                        key: 'sendTime',
                        type: 'date',
                        placeholder: '选择时间',
                        data: { type: 'datetime' },
                    }
                    mainData.lists[8] = {
                        key: 'content',
                        label: '新闻内容：',
                        placeholder: '请输入内容',
                        props: { type: 'textarea' },
                    }
                } else if (val === '0') {
                    mainData.lists[7] = {
                        key: 'content',
                        label: '新闻内容：',
                        placeholder: '请输入内容',
                        props: { type: 'textarea' },
                    }
                    mainData.lists.pop()
                    console.log(mainData.lists, 'mainData.lists')
                } else {
                }
            },
        },
        // {label: '日期时间', key: 'sendTime', type:'date', placeholder: '选择时间', data: { type: 'datetime' } },
        {
            key: 'content',
            label: '抄告内容：',
            placeholder: '请输入内容',
            props: { type: 'textarea' },
            data: {},
        },
    ],
    rules: {
        title: [{ required: true, message: '请输入抄告标题', trigger: 'blur' }],
        noticeType: [
            { required: true, message: '请选择抄告类型', trigger: 'blur' },
        ],
        publishType: [
            { required: true, message: '请选择发布对象', trigger: 'blur' },
        ],
        reciveType: [
            { required: true, message: '请选择发布端', trigger: 'blur' },
        ],
        isOnTime: [
            { required: true, message: '请选择是否定时', trigger: 'blur' },
        ],
    },
})
let formData = $ref({})
let loading = $ref(false)
let drawerFlag = $ref(false)
let fromDataRef = $ref(null)

const editData = (obj) => {
    // mainData.formData = proxy.$_.cloneDeep(obj)
    if (obj.id) {
        getOneById(obj.id).then((res) => {
            mainData.formData = res as unknown as any
        })
    }
    drawerFlag = true
}

const handleClose = () => {
    mainData.formData = {} as any
}

let eimts = defineEmits(['getTable'])
const save = () => {
    fromDataRef.submitForm(false).then((form) => {
        loading = true
        if (form.publishObjectOrigin) {
            delete form.publishObjectOrigin
        }
        if (form.fileList) {
            delete form.fileList
        }
        addOrUpdate(form)
            .then(() => {
                loading = false
                ElMessage.success('修改成功！')
                drawerFlag = false
                eimts('getTable')
            })
            .catch(() => {
                loading = false
            })
    })
}
defineExpose({ editData })
</script>

<style scoped lang="scss">
.userUpload {
    width: 380px;
    margin-left: 15.6%;
}
</style>
