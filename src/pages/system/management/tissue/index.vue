<template>
    <div class="org_m h">
        <el-row class="sys_munus h">
            <el-col :span="4" class="relative content-box h">
                <div class="h border-r">
                    <h2 class="fs16 txt fw700 p20 border-b" style="font-family: '微软雅黑 Light'">组织管理</h2>
                    
                    <div class="tw pl20 pt10">
                        <el-button class="mr20" @click="addOrg">新增</el-button>
                        <el-button class="mr20" @click="editOrg">修改</el-button>
                        <el-button class="" @click="delOrg">删除</el-button>
                    </div>
                    <el-input
                        v-model="treeData.keyword"
                        placeholder="组织搜索"
                        class="ml20 mt20 mb10 mr20"
                        @change="changeSearch"
                        style="width: calc(100% - 40px)"
                    >
                        <template #append>
                            <el-button icon="Search" @click="changeSearch"/>
                        </template>
                    </el-input>
                    <TwTree v-if="treeRefStatus" ref="treeRef" class="pt10 pl20" height="calc(100% - 220px)" lazy
                            url="/system/dataPermission/getChild" :default-expanded-keys="defaultExpandedKeys"
                            :parKeys="[{key:'parentCode',val:'permissionCode'}]" :defaultProps="{label:'orgName'}"
                            @nodeClick="nodeClick" :params="treeData" @dataLoad="dataLoad"></TwTree>
                </div>
            </el-col>
            <el-col :span="20" class="h">
                <h2 class="fs16 txt fw700 p20 border-b" style="font-family: '微软雅黑 Light'">{{ title }}</h2>
                <!--            <div class="editPermission pb10 pl20 pb20 mt10 border-b txt fs16 txt fw700" style="font-family: '微软雅黑 Light'">{{ title }}</div>-->
                <transition name="fade-transform" mode="out-in" appear>
                    <div v-if="isMenu">
                        <tw-custom-form height="calc(100% - 40px)" labelPosition="top"
                                        style="width: 500px;margin: 0 auto" class="pt20" ref="customForm"
                                        :lists="mainData.lists" :formData="mainData.formData" :rules="mainData.rules"
                                        :loading="loading" @save="save" :showBtns="showBtn" @colse="colse">
                            <template #permissionIdList>
                                <div class="pointer" @click="setMenus">已绑定{{
                                        mainData.formData.permissionIdList
                                            ? mainData.formData.permissionIdList.length
                                            : 0
                                    }}个
                                </div>
                            </template>
                        </tw-custom-form>
                    </div>
                </transition>
            </el-col>
        </el-row>
    </div>

</template>
<script lang="ts" setup>
import {getOrgDetail, getFullTree, addNode, deleteNode, modifyNode} from "@/api/system/management/tissue";
import {nextTick} from "@vue/runtime-core";

let {proxy} = getCurrentInstance()
let treeData = $ref({"keyword": "", "needPower": true, parentCode: ''})
let treeRef = $ref(null)
let treeRefStatus = $ref(true)
let menus = $ref([])
let customForm = $ref(null)
let defaultExpandedKeys = $ref(['P000001'])
let showBtn = $ref(false)
let isMenu = $ref(true)
let title = $ref('组织详情')
let nodeItem = {parentCode: '', permissionCode: '', orgName: ''}
let bindMenuRef = $ref(null)
let obj = {
    "createBy": '',
    "createTime": "",
    "lastModifyName": "",
    "lastModifyTime": "",
    "nodeDtoList": [],
    "orgName": "",
    "orgType": "",
    "parentCode": "",
    "parentName": "全部组织",
    "halfPermissionIdList": [],
    "remark": "",
    "systemConfigId": '',
    "systemConfigName": ""
}

let mainData = reactive({
    formData: proxy.$_.cloneDeep(obj),
    lists: [
        {label: '上级组织', key: 'parentName', placeholder: '上级组织', disabled: true},
        {label: '组织类型', key: 'orgType', type: 'select', placeholder: '组织类型', children: [], change: (val)=>{
                setCompanyClassify(val)
            }},
        {label: '组织名称', key: 'orgName', type: 'select', placeholder: '组织名称'},
        {label: '备注', key: 'remark', placeholder: '请输入说明', props: {type: 'textarea'}, disabled: true},
        {label: '创建人', key: 'createBy', placeholder: '创建人'},
        {label: '创建时间', key: 'createTime', placeholder: '创建时间'},
        {label: '修改人', key: 'lastMofiryName', placeholder: '修改人', disabled: true},
        {label: '修改时间', key: 'lastMofiryTime', placeholder: '修改时间', disabled: true},
    ],
})
// 搜索
const changeSearch = () => {
    treeData.parentCode = ''
    treeRefStatus = false
    nextTick(() => {
        treeRefStatus = true
    })
}

// 设置编辑区域的框的禁用状态
const setItemStauts = (status) => {
    mainData.lists.forEach((item, i) => {
        if (i > 0) item.disabled = status
    })
}

const setDisabled = (lists) => {
    lists.forEach(item => {
        if (item.children && item.children.length > 0) {
            setDisabled(item.children)
        }
        item.disabled = true
    })
}

// 获取菜单树
const getMenus = () => {
    getFullTree({type: 1}).then(res => {
        menus = res
        setDisabled(res)
        nodeItem = res[0]
    })
}
getMenus()


// 点击树节点
const nodeClick = (data) => {
    nodeItem = proxy.$_.cloneDeep(data)
    if(data.orgType == 1) return
    getOrgDetail({permissionCode: nodeItem.permissionCode}).then(res=>{
        mainData.formData = res
        mainData.lists[4]['hide'] = false
        mainData.lists[5]['hide'] = false
        mainData.lists[6]['hide'] = false
        mainData.lists[7]['hide'] = false
        mainData.lists[1].children = [
            {value: 1, label: "省运管"},
            {value: 2, label: "市运管"},{value: 3, label: "区运管"},
            {value: 4, label: "企业"},
            {value: 5, label: "运营商"},
            {value: 6, label: "营运类型"},
            {value: 7, label: "自定义"}
        ]
        if(data.orgType > 3){
            if(mainData.lists[0].url){
                mainData.lists[0]['hide'] = true
            }
            nextTick(()=>{
                mainData.lists[0]['hide'] = false
                mainData.lists[0] = { key: 'parentCode', label: '上级组织', placeholder: '请选择上级组织', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: { "hasDataPermission": true, needVehicle: false, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode', disabled: 'nocheck'}, permissionIds:[] }
            })
        } else{
            mainData.lists[0] = {label: '上级组织', key: 'parentName', placeholder: '上级组织', disabled: true}
        }
    })
   
}
// const nodeClick = (data)=>{
//     if(title == '组织详情') {
//         isMenu = false
//         mainData.lists[3].params.filterNodeCondition.permissionCode = data.permissionCode
//         mainData.formData = proxy.$_.cloneDeep(data)
//         getOrgDetail({permissionCode: data.permissionCode}).then(res=>{
//             mainData.formData = res
//             nodeItem = res
//             isMenu = true
//         })
//         setItemStauts(true)
//     }else {
//         treeRef.setCurrentKey(nodeItem.permissionCode)
//         ElMessage.warning(`请完成当前${title}操作！`)
//     }
// }
// 左边树第一次加载和展开
const dataLoad = (data) => {
    defaultExpandedKeys = [data[0].permissionCode]
    treeRef.setCurrentKey(data[0].permissionCode)
}
// 中间取消按钮事件
const colse = () => {
    isMenu = false
    nextTick(() => {
        title = '组织详情'
        setItemStauts(true)
        mainData.formData = proxy.$_.cloneDeep(obj)
        isMenu = true
    })
}

// 设置绑定菜单
const setMenus = () => {
    if (title != '组织详情') {
        bindMenuRef.setMenus()
    } else {
        ElMessage.warning('当前非编辑状态！')
    }
}

// 右侧菜单树事件
const check = (data, {halfCheckedKeys, checkedKeys}) => {
    mainData.formData.halfPermissionIdList = halfCheckedKeys
    // mainData.formData.permissionIdList = checkedKeys
}

// 重置菜单
const setTreeCheckStatus = () => {
    // oldDefaultExpandedKeys = []
    isMenu = false
    nextTick(() => {
        isMenu = true
    })
}

const reset = () => {
    treeData.parentCode = ''
    setTreeCheckStatus()
}

// 新增组织
const addOrg = () => {
    if (showBtn && title == '编辑组织') {
        return ElMessage.warning('请完成当前操作或者取消操作！')
    }
    if (nodeItem.orgType == 1) {
        return ElMessage.warning('省运管下不可新增节点！')
    }
    showBtn = true
    title = '新增组织'
    mainData.formData = proxy.$_.cloneDeep(obj)
    mainData.formData = {...mainData.formData, ...nodeItem}
    mainData.formData.parentCode = nodeItem.permissionCode
    mainData.formData.parentName = nodeItem.orgName
    mainData.formData.orgName = ''
    mainData.formData.orgType = ''
    setChildren(nodeItem.orgType+1)
    setItemStauts(false)
    mainData.lists[4]['hide'] = true
    mainData.lists[5]['hide'] = true
    mainData.lists[6]['hide'] = true
    mainData.lists[7]['hide'] = true
    isMenu = false
    nextTick(() => {
        isMenu = true
    })
}

const setCompanyClassify = (val) => {
    if(val == 3){
        mainData.lists[2] = { label: '组织名称', key: 'orgName', type: 'select', remote: true, url: '/system/area/getAreaListByKeyword', method: 'get', params: {level: 3}, props: { label: 'areaName', value: 'areaName' }, placeholder: '请选择报表模板', }
    }else if(val == 4){
        mainData.lists[2] = { label: '组织名称', key: 'orgName', type: 'select', remote: true, url: '/business/company/associateCompany', method: 'post', params: {"allSearch": true, "companyId": 0, "havePermission": true, "keyword": "", "order": "", "orderField": "", "pageNumber": 1, "pageSize": 40, "toVehicle": true}, props: { label: 'companyName', value: 'companyName' }, placeholder: '请选择报表模板', }
    }else if(val == 5){
        mainData.lists[2] = {label: '组织名称', key: 'orgName', type: 'select', remote: true, url: '/business/operatorEntity/listAssociateOperator', method: 'get', params: {}, props:{ label: 'name', value:'name'}}
    }else if(val == 6){
        mainData.lists[2] = {label: '组织名称', key: 'orgName', type: 'select', remote: true, url: '/system/vehicleOperateType/getListByName', method: 'get', params: {}, props:{ label: 'typeName', value:'typeName'}}
    }else {
        mainData.lists[2] = {label: '组织名称', key: 'orgName', placeholder: '组织名称'}
    }
}

const setChildren = (type) => {
    mainData.lists[1].children = []
    let children = [{value: 3, label: "区运管"},
        {value: 4, label: "企业"},
        {value: 5, label: "运营商"},
        {value: 6, label: "营运类型"},
        {value: 7, label: "自定义"}]
    if(type == 1){
        mainData.lists[1].children = [
            {value: 1, label: "省运管"},
            {value: 2, label: "市运管"},
        ]
    }else if(type == 2){
        mainData.lists[1].children = [
            {value: 2, label: "市运管"},
        ]
    }
    mainData.lists[1].children = [...mainData.lists[1].children, ...children]
}

// 编辑组织
const editOrg = () => {
    if (mainData.formData.permissionCode == "P000001") {
        return ElMessage.warning('此节点不能修改！')
    }
    if (showBtn && title == '新增组织') {
        return ElMessage.warning('请完成当前操作或者取消操作！')
    }
    if(nodeItem.orgType == 1){
        return ElMessage.warning('省运管不可修改！')
    }
    if(nodeItem.orgType == 2){
        return ElMessage.warning('市运管不可修改！')
    }
    if(nodeItem.orgType == 3){
        return ElMessage.warning('区运管不可修改！')
    }
    
        showBtn = true
        title = '编辑组织'
        setChildren(nodeItem.orgType+1)
        setItemStauts(false)
        setCompanyClassify(nodeItem.orgType)
        mainData.lists[1].disabled = true
        mainData.lists[2].disabled = true
        mainData.lists[4]['hide'] = true
        mainData.lists[5]['hide'] = true
        mainData.lists[6]['hide'] = true
        mainData.lists[7]['hide'] = true
        isMenu = false
        nextTick(() => {
            isMenu = true
        })
    
}

// 删除组织
const delOrg = () => {
    proxy.MessageBox({msg: `请确定删除${nodeItem.orgName}组织吗？`, type: 'warning'}).then((close) => {
        deleteNode({permissionCode: nodeItem.permissionCode}).then(res => {
            treeRefStatus = false
            nextTick(() => {
                reset()
                treeRefStatus = true
            })
            ElMessage.success('删除成功！')
            close()
        }).catch(() => {
            close()
        })
    })
}


// 更新节点数据
let loading = $ref(false)
const save = (params) => {
    loading = true
    if (title == '新增组织') {
        addNode(params).then(res => {
            treeRefStatus = false
            nextTick(()=>{
                reset()
                treeRefStatus = true
                loading = false
                customForm.resetForm(true)
            })
            ElMessage.success('新增成功！')
        }).catch(() => {
            loading = false
        })
    } else {
        modifyNode(params).then(res => {
            reset()
            treeRefStatus = true
            loading = false
            customForm.resetForm(true)
            ElMessage.success('编辑成功！')
        }).catch(() => {
            treeRefStatus = true
            loading = false
        })
    }
}


</script>
<style lang="scss" scoped>
.sys_munus {
    :deep(.el-radio-button) {
        width: 50%;
        
        .el-radio-button__inner {
            width: 100%
        }
    }
    
    .editPermission {
        line-height: 18px
    }
    
    .border-no {
        :deep(.el-radio-button__inner) {
            border: none
        }
    }
}
</style>
