<template>
    <el-row class="sys_munus">
        <el-col :span="3" class="relative content-box border-r h">
            <h2 class="fs16 txt fw700 p20" style="font-family: '微软雅黑 Light'">平台菜单</h2>
            <TwTree class="pt10 pl20 h w200" height="calc(100% - 120px)" v-model="lists" :default-expanded-keys="defaultExpandedKeys" :defaultProps="{label:'permissionName'}" @nodeClick="nodeClick"></TwTree>
            <div class="btns pb20 tw_c positionBc">
                <el-button type="primary" @click="addMenu">新增</el-button>
                <el-button @click="onDelMenu">删除</el-button>
            </div>
        </el-col>
        <el-col :span="20">
            <transition name="fade-transform" mode="out-in" appear>
                <div v-if="isform">
                    <div class="editPermission pb10 pl20 mt10 border-b txt" style="font-family: '微软雅黑 Light'">{{title}}</div>
                    <tw-custom-form v-if="isform" labelPosition="top" style="width: 500px;margin: 0 auto" class="pt20" ref="customForm" :lists="mainData.lists" :formData="mainData.formData" :rules="mainData.rules" :loading="loading" @save="save" showBtns>
<!--                        <template #permissionCode>-->
<!--                            {{mainData.formData.permissionCode}}-->
<!--                        </template>-->
                    </tw-custom-form>
                </div>
            </transition>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import {getFullTree, addOrUpdate, delMenu} from "@/api/system";
import {nextTick} from "@vue/runtime-core";

let { proxy} = getCurrentInstance()
let obj = {
    "isIndexDisplay": true,
    "menuIcon": "",
    "menuPath": "",
    "menuUrl": "",
    "menuVueIcon": "",
    "parentId": '',
    "permissionCode": "",
    "permissionId": '',
    "permissionName": "",
    "permissionType": 1,
    "productCode": "",
    "sort": 0
}
let mainData = reactive({
    formData: {
        "isIndexDisplay": true,
        "menuIcon": "",
        "menuPath": "",
        "menuUrl": "",
        "menuVueIcon": "",
        "parentId": '',
        "permissionCode": "",
        "permissionId": '',
        "permissionName": "",
        "permissionType": 1,
        "productCode": "",
        "sort": 0
    },
    lists: [
        {label: '父节点', key: 'parentName', placeholder: '父节点', disabled: true},
        {label: '节点名称', key: 'permissionName', placeholder: '节点名称'},
        // {label: '权限编号', key: 'permissionCode', placeholder: '权限编号'},
        {label: '权限编号', key: 'permissionCode', placeholder: '权限编号'},
        {label: '菜单图标', key: 'menuVueIcon', placeholder: '菜单图标'},
        {label: '菜单url', key: 'menuPath', placeholder: '菜单url'},
        // {label: '权限类型', key: 'permissionType', type:'radio', children:[ {label:'菜单权限', value:1},{label:'普通权限', value:2},{label:'APP权限', value:3}]},
        {label: '权限类型', key: 'permissionType', type:'radio', children:[ {label:'菜单权限', value:1},{label:'普通权限', value:2}]},
        {label: '首页显示', key: 'isIndexDisplay', type:'radio', children:[ {label:'是', value:true},{label:'否', value:false}]}
    ],
    rules: {
        permissionName: [
            { required: true, message: '请输入节点名称', trigger: 'blur' },
            { min: 2, max: 15, message: '长度为2 ~ 15', trigger: 'blur' },
        ],
    }
})
let title = $ref('编辑权限组织')
let lists = $ref([])
let customForm = $ref(null)
let defaultExpandedKeys = $ref([2])
let isform = $ref(true)
// 获取左侧树数据
const getLists = ()=>{
    getFullTree({type: mainData.formData.permissionType}).then((res)=>{
        lists = res
    })
}
getLists()
// 切换平台类型
const cutType = (val)=>{
    mainData.formData.permissionType = val
    defaultExpandedKeys = val==1? [2]:[10234]  // 1是web权限 3是app权限权限
    getLists()
}
// 点击树节点
const nodeClick = (data)=>{
    title = '编辑权限组织'
    mainData.formData = proxy.$_.cloneDeep(data)
    isform =false
    nextTick(()=>{
        isform =true
    })
}
// 更新节点数据
let loading= $ref(false)
const save = (params)=>{
    loading = true
    if(title == '编辑权限组织') params['permissionId'] = params.id
    addOrUpdate(params).then(res=>{
        loading = false
        mainData.formData = proxy.$_.cloneDeep(obj)
        // customForm.resetForm(true)
        getLists()
        ElMessage.success('更新成功！')
    }).catch(()=>{
        loading = false
    })
}
// 删除选中菜单
let treeCanleLoading= $ref(false)

const onDelMenu = ()=>{
    let id = mainData.formData.id
    if(id){
        proxy.MessageBox({msg: '确定删除当前菜单吗？', type: 'warning'}).then((close) => {
            treeCanleLoading = true
            delMenu({permissionId: id}).then(()=>{
                treeCanleLoading = false
                customForm.resetForm(true)
                getLists()
                ElMessage.success('删除成功！')
                close()
            }).catch(()=>{
                treeCanleLoading = false
            })
        })
    }else {
        ElMessage.warning('请选择要删除的菜单！')
    }
}



const addMenu = ()=>{
    title = '添加权限组织'
    mainData.formData.parentId = mainData.formData.id
    mainData.formData.parentName = mainData.formData.permissionName
    mainData.formData.permissionName = ''
    mainData.formData.permissionCode = ''
    mainData.formData.menuVueIcon = ''
    mainData.formData.menuPath = ''
    mainData.formData.permissionId = ''
    isform =false
    nextTick(()=>{
        isform =true
    })
}


</script>
<style lang="scss" scoped>
.sys_munus {
    :deep(.el-radio-button) {
        width: 50%;
        .el-radio-button__inner { width: 100%}
    }
    .editPermission { line-height: 18px}
    .border-no {
        :deep(.el-radio-button__inner) { border: none}
    }
}
</style>
