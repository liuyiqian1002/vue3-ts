<template>
    <div>
<!--        @save="save"-->
        <tw-drawer
            @handleClose="handleClose"
            @save="save"
            :loading="loading"
            :title="title"
            v-model="drawerFlag"
        >
            <el-row v-if="drawerFlag" class="tw" style="padding-bottom: 180px">
                <el-col :span="12">
                    <tw-custom-form
                        ref="fromDataRef"
                        class="w400"
                        :lists="mainData.lists"
                        :rules="mainData.rules"
                        :formData="mainData.formData"
                        labelPosition="top"
                        @selectChange="selectChange"
                    ></tw-custom-form>
                </el-col>
                <el-col :span="12">
                    <div class="tw_ct">
                        <userUpload tipShow v-model="mainData.formData.portrait.viewUrl" :sex="mainData.formData.gender" v-model:id="mainData.formData.portrait.fileId"></userUpload>
                    </div>
                </el-col>
            </el-row>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import { addOrUpdate, getUserInfo, getTreeNodes, getRoleInfo } from '@/api/system/management/account' //获取账户添加与修改接口
import {getCurrentInstance, watchEffect} from 'vue' //获取组件实例
import userUpload from '../Upload/index.vue'
import {validAlphone} from "@/utils/validate";
import {checkUser} from "../../../../../../api/system/management/account";

const {title} = defineProps({
    title: String,
})

let { proxy } = getCurrentInstance()
let mainData = reactive({
    formData: {
    
    },
    lists: [],
    rules: {
        // 账户
        userAccount: [
            { required: true, message: '请输入账户', trigger: 'blur' },
            { required: true, message: '账户已注册', trigger: 'blur', validator: (rule, value)=> {
                    return new Promise((resolve, reject) => {
                        if(title == '编辑账户'){
                            resolve()
                        }else {
                            checkUser({userAccount:value}).then(status=>{
                                if(status){
                                    reject('账户已注册')
                                }else {
                                    resolve(status)
                                }
                            })
                        }
                    });
                } },

        ],
        // 真实名称
        realName: [
            { required: true, message: '请输入真实名称', trigger: 'blur' },
        ],
        // 手机号
        // cellphone: [
        //     {  message: '请输入正确手机号', trigger: 'change', validator: validAlphone },
        // ],
        // 绑定机构
        permissionCode: [{ required: true, message: '请选择绑定机构', trigger: 'change', }],
        // 角色类型
        organizationType: [
            { required: true, message: '请选择角色类型', trigger: 'change' },
        ],
        // 绑定角色
        roleId: [{ required: true, message: '请选择绑定角色', trigger: 'change'  }],
        // 性别
        gender: [{ required: true , message: '请选择性别', trigger: 'change'}],
        // 账户类型
        accountType: [{ required: true, message: '请选择账户类型', trigger: 'change' },],
        // 密保问题
        passAsk: [{ required: true, message: '请选择密保问题', trigger: 'change'}],
        // 密保答案
        passAnswer: [
            { required: true, message: '请输入密保问题答案', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { required: true, message: '两次密码不一致', trigger: 'change', validator:  (rule, value)=> {
                    return new Promise((resolve, reject) => {
                        if(value == mainData.formData.confirmPassword){
                            resolve()
                        }else {
                            reject(value)
                        }
                    })
                } },
        ],
        confirmPassword: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            { required: true, message: '两次密码不一致', trigger: 'change', validator:  (rule, value)=> {
                    return new Promise((resolve, reject) => {
                        if(value == mainData.formData.password){
                            resolve()
                        }else {
                            reject(value)
                        }
                    })
                } },
        ],
    },
})
let formData = $ref({})
let loading = $ref(false)
let drawerFlag = $ref(false)
let fromDataRef = $ref(null)

const setFormData = (row) => {
    if(!row.userId){
        mainData.formData = {"userId":'',"userAccount":"","cellphone":"","companyId":'',"organizationName":"","realName":"","accountType":'',"organizationType":'',"permissionCode":"","gender":1,"portrait":{"fileId":"","uploadName":".jpeg","fileName":"","viewUrl":"","thumbnailViewUrl":"","fileType":'',"businessId":""},"passAsk":'',"passAnswer":"","roleId":'',"idNumber":"","nodeDtoList":[]}
        mainData.lists = [
            { key: 'userAccount', label: '账户：'},
            { key: 'realName', label: '真实名称：' },
            { key: 'cellphone', label: '手机号：' },
            {key: 'gender', label: '性别：', type: 'radio', children: [{ label: '男', value: 1 }, { label: '女', value: 2 },],},
            { key: 'permissionCode', label: '绑定机构：', type: 'org', url: '/system/orgTree/getAll', method: 'post', params: { "hasDataPermission": true, needVehicle: false, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode'}, permissionCode: '', arrChangeKey: ['organizationType', 'roleId', 'nodeDtoList'], resetIndex: 7},
            { key: 'organizationType', label: '角色类型：', type: 'select', filter: 'roleCode' },
            { key: 'roleId', label: '绑定角色：', type: 'select', props: {label: 'roleName', value: 'roleId'}, children:[] },
            { key: 'nodeDtoList', label: '数据权限：', type: 'org', url: '/system/userDataTreeForEdit/getTreesList', method: 'post', params: { "filterNodeCondition": {"permissionCode": mainData.formData.permissionCode},"hasDataPermission": true, needVehicle: true, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode', disabled: 'nocheck'}, permissionIds:[], showCheckbox: true},
            { key: 'idNumber', label: '聚合操作：', type: 'switch' },
            { key: 'idNumber', label: '身份证：' },
            {key: 'accountType', label: '账户类型：', type: 'select', filter: 'accountType',},
            {key: 'passAsk', label: '密保问题：', type: 'select', children: [{ label: '我的真实名称？', value: 1 }, { label: '我的出生地点？', value: 2 }, { label: '我现在的工作地点？', value: 3 },],},
            { key: 'passAnswer', label: '密保答案：' },
            { key: 'password', label: '密码：', showPassword: true },
            { key: 'confirmPassword', label: '确认密码：', showPassword: true },
        ]
        drawerFlag = true
    }else {
        getUserInfo({userId: row.userId}).then(res=>{
            if(!res.portrait){
                res['portrait'] = {"fileId":"","uploadName":".jpeg","fileName":"","viewUrl":"","thumbnailViewUrl":"","fileType":'',"businessId":""}
            }
            mainData.formData = res
            return res
        }).then((data)=>{
            getTreeNodes({userId: row.userId}).then(res=>{
                mainData.formData.nodeDtoList = res
                let permissionCode = proxy.$_.cloneDeep(mainData.formData.permissionCode)
                mainData.lists = [
                    { key: 'userAccount', label: '账户：', disabled: true },
                    { key: 'realName', label: '真实名称：' },
                    { key: 'cellphone', label: '手机号：' },
                    {key: 'gender', label: '性别：', type: 'radio', children: [{ label: '男', value: 1 }, { label: '女', value: 2 },],},
                    { key: 'permissionCode', label: '绑定机构：', type: 'org', url: '/system/orgTree/getAll', method: 'post', params: { "hasDataPermission": true, needVehicle: false, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode'}, permissionCode: permissionCode, arrChangeKey: ['organizationType', 'roleId', 'nodeDtoList'], resetIndex: 7},
                    // { key: 'organizationType', label: '角色类型：', type: 'select', filter: 'roleCode', arrChangeKey: ['roleId'], resetIndex: 6 },
                    { key: 'organizationType', label: '角色类型：', type: 'select', filter: 'roleCode' },
                    { key: 'roleId', label: '绑定角色：', type: 'select', props: {label: 'roleName', value: 'roleId'}, children:[] },
                    { key: 'nodeDtoList', label: '数据权限：', type: 'org', url: '/system/userDataTreeForEdit/getTreesList', method: 'post', params: { "filterNodeCondition": {"permissionCode": mainData.formData.permissionCode},"hasDataPermission": true, needVehicle: true, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode', disabled: 'nocheck'}, showCheckbox: true},
                    { key: 'idNumber', label: '聚合操作：', type: 'switch' },
                    { key: 'idNumber', label: '身份证：' },
                    {key: 'accountType', label: '账户类型：', type: 'select', filter: 'accountType',},
                    {key: 'passAsk', label: '密保问题：', type: 'select', children: [{ label: '我的真实名称？', value: 1 }, { label: '我的出生地点？', value: 2 }, { label: '我现在的工作地点？', value: 3 },],},
                    { key: 'passAnswer', label: '密保答案：' },
                ]
                drawerFlag = true
                selectChange({item:{key: 'organizationType'}})
            })
        })
    }
    
}

const selectChange = ({item})=>{
    if(item.key != 'organizationType') return
    // 当选择角色类型后，重新给绑定角色赋值
    getRoleInfo({roleCode: mainData.formData.organizationType}).then(res=>{
        if(res.length>0){
            mainData.formData.roleId = res[0].roleId
        }else {
            mainData.formData.roleId = ''
        }
        mainData.lists[6].children = res
    })
}

const handleClose = ()=>{
    mainData.formData = {}
}

let eimts = defineEmits(['getTable'])
const save = () => {
    fromDataRef.submitForm(false).then((form) => {
        loading = true
        addOrUpdate(form).then(() => {
            loading = false
            ElMessage.success('修改成功！')
            drawerFlag = false
            eimts('getTable')
        }).catch(() => {
            loading = false
        })
    })
}
defineExpose({ setFormData })
</script>

<style scoped lang="scss">
</style>
