
 <template>
     <div class="org_m h">
         <el-row class="sys_munus h">
             <el-col :span="4" class="relative content-box h">
                 <div class="h border-r">
                     <h2 class="fs16 txt fw700 p20 border-b" style="font-family: '微软雅黑 Light'">机构管理</h2>
                
                     <div class="tw pl20 pt10">
                         <el-button class="mr20" @click="addOrg">新增</el-button>
                         <el-button class="mr20" @click="editOrg">修改</el-button>
                         <el-button class="" @click="delOrg">删除</el-button>
                     </div>
    
                     <el-input
                         v-model="treeData.keyword"
                         placeholder="机构搜索"
                         class="ml20 mt20 mb10 mr20"
                         @change="changeSearch"
                         style="width: calc(100% - 40px)"
                     >
                         <template #append>
                             <el-button icon="Search" />
                         </template>
                     </el-input>
                     <TwTree v-if="treeRefStatus" ref="treeRef" class="pt10 pl20 w200" height="calc(100% - 100px)" lazy url="/system/orgTree/getAll" method="post" :default-expanded-keys="defaultExpandedKeys" :defaultProps="{label:'orgName'}" :params="treeData" :parKeys="[{key:'parentCode', val:'permissionCode'}]" nodekey="permissionCode" @nodeClick="nodeClick" @dataLoad="dataLoad"></TwTree>
                 </div>
             </el-col>
             <el-col :span="14" class="h">
                 <h2 class="fs16 txt fw700 p20 border-b" style="font-family: '微软雅黑 Light'">{{ title }}</h2>
                 <!--            <div class="editPermission pb10 pl20 pb20 mt10 border-b txt fs16 txt fw700" style="font-family: '微软雅黑 Light'">{{ title }}</div>-->
                 <transition name="fade-transform" mode="out-in" appear>
                     <div v-if="isMenu">
                         <tw-custom-form height="calc(100% - 40px)" labelPosition="top" style="width: 500px;margin: 0 auto" class="pt20" ref="customForm" :lists="mainData.lists" :formData="mainData.formData" :rules="mainData.rules" :loading="loading" @save="save" :showBtns="showBtn" @colse="colse">
                             <template #permissionIdList>
                                 <div class="pointer" @click="setMenus">已绑定{{mainData.formData.permissionIdList?mainData.formData.permissionIdList.length:0}}个</div>
                             </template>
                         </tw-custom-form>
                     </div>
                 </transition>
             </el-col>
             <el-col :span="6" class="relative content-box h">
                 <div class="h border-l" v-loading="!isOldTree">
                     <h2 class="fs16 txt fw700 p20 border-b" style="font-family: '微软雅黑 Light'">已绑定菜单</h2>
                     <TwTree class="pt10 pl20" v-if="isOldTree" ref="oldTreeRef" height="calc(100% - 70px)" v-model="menus" defaultExpandAll :defaultCheckedkeys="mainData.formData.permissionIdList" :default-expanded-keys="oldDefaultExpandedKeys" :defaultProps="{label:'permissionName'}" :params="treeData" showCheckbox></TwTree>
                 </div>
             </el-col>
         </el-row>
        <!--     绑定菜单    -->
         <bindMenu ref="bindMenuRef" title="绑定菜单" :defaultCheckedkeys="mainData.formData.permissionIdList"  @check="check"></bindMenu>
     </div>
    
</template>

<script lang="ts" setup>
import {getOrgDetail, addNode, modifyNode, orgDelete, getNodesForSearch} from "@/api/system/management/organization";
import {getFullTree} from "@/api/common";
import bindMenu from "./components/bindMenu/index.vue"
import {nextTick} from "@vue/runtime-core";

let { proxy} = getCurrentInstance()
let treeData = $ref({ "keyword": "","needPower": true, parentCode: ''})
let treeRef = $ref(null)
let treeRefStatus = $ref(true)
let menus = $ref([])
let customForm = $ref(null)
let defaultExpandedKeys = $ref([])
let oldTreeRef = $ref(null)
let oldDefaultExpandedKeys = $ref([])
let showBtn = $ref(false)
let isMenu = $ref(true)
let isOldTree = $ref(true)
let title = $ref('机构详情')
let nodeItem = {parentCode: '', permissionCode: '', orgName: ''}
let bindMenuRef = $ref(null)
let obj = {
    "createBy": 0,
    "createName": "",
    "createTime": "",
    "homePageId": '',
    "homePageName": "",
    "lastModifyBy": 0,
    "lastModifyName": "",
    "lastModifyTime": "",
    "nodeDtoList": [],
    "orgCode": "",
    "orgId": 0,
    "orgName": "",
    "orgType": 0,
    "parentCode": "",
    "parentLevel": 0,
    "parentName": "全部机构",
    "permissionCode": "",
    "halfPermissionIdList": [],
    "permissionIdList": [],
    "remark": "",
    "systemConfigId": '',
    "systemConfigName": ""
}

let mainData = reactive({
    formData: proxy.$_.cloneDeep(obj),
    rules: {
        orgName:[{ required: true, message: '请输入机构名称', trigger: 'blur' },],
        nodeDtoList:[{ required: true, message: '请选择数据权限', trigger: 'change' },],
    },
    lists: [
        {label: '上级机构', key: 'parentName', placeholder: '请输入上级机构', disabled: true},
        {label: '机构名称', key: 'orgName', placeholder: '请输入机构名称', disabled: true},
        {label: '绑定菜单', key: 'permissionIdList', placeholder: '请选择绑定菜单', slot: true, disabled: true},
        // {label: '绑定菜单', key: 'menuVueIcon', placeholder: '绑定角色', disabled: true},
        {label: '数据权限', key: 'nodeDtoList', placeholder: '请选择数据权限', disabled: true, type: 'org', url: '/system/userDataTreeForEdit/getTreesList', method: 'post', params: { "filterNodeCondition": {"permissionCode": ''},"hasDataPermission": true, needVehicle: true, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode', disabled: 'nocheck'}, showCheckbox: true },
        {label: '系统配置', key: 'systemConfigId', placeholder: '请选择系统配置', disabled: true, url: '/system/org/associateSystemConfig', method: 'get', type: 'select', props: {label: 'name', value: 'id'}, children:[] },
        {label: '首页配置', key: 'homePageId', placeholder: '请选择首页配置', disabled: true, url: '/system/org/associateHomePageConfig', method: 'get', type: 'select', props: {label: 'name', value: 'id'}, children:[] },
        {label: '说明', key: 'remark', placeholder: '请输入说明', props: {type: 'textarea'}, disabled: true},
        {label: '修改人', key: 'lastModifyName', placeholder: '修改人', disabled: true},
        {label: '修改时间', key: 'lastModifyTime', placeholder: '修改时间', disabled: true},
        // {label: 'test', key: 'halfPermissionIdList', type: 'allSelect', placeholder: '修改时间', disabled: true},
    ],
})

// 搜索
const changeSearch = (val)=>{
    getNodesForSearch(treeData).then(res=>{
        defaultExpandedKeys = res[0].permissionCodeList
        treeData.parentCode = ''
        treeRefStatus = false
        nextTick(()=>{
            treeRefStatus = true
        })
    })
    
}

// 设置编辑区域的框的禁用状态
const setItemStauts = (status)=>{
    mainData.lists.forEach((item,i)=> {
        if(i>0) item.disabled = status
    })
}

const setDisabled = (lists)=>{
    lists.forEach(item=>{
        if(item.children && item.children.length> 0){
            setDisabled(item.children)
        }
        item.disabled = true
    })
}

// 获取菜单树
const getMenus = ()=>{
    getFullTree({type: 1}).then(res=>{
        menus = res
        setDisabled(res)
        nodeItem = res[0]
        oldDefaultExpandedKeys = [res[0].permissionCode]
        oldTreeRef.setCurrentKey(res[0].permissionCode)
    })
}
getMenus()


// 点击树节点
const nodeClick = (data)=>{
    if(title == '机构详情') {
        isMenu = false
        getOrgDetail({permissionCode: data.permissionCode}).then(res=>{
            nodeItem = res
            mainData.formData = res
            mainData.lists[3].params.filterNodeCondition.permissionCode = data.permissionCode
            isMenu = true
            setTreeStatus()
        }).catch(()=>{
            isMenu = true
        })
        setItemStauts(true)
    }else {
        treeRef.setCurrentKey(nodeItem.permissionCode)
        ElMessage.warning(`请完成当前${title}操作！`)
    }
}

// 左边树第一次加载和展开
const dataLoad = (data)=>{
    getOrgDetail({permissionCode: data[0].permissionCode}).then(res=>{
        mainData.formData = res
        nodeItem = res
        isMenu = true
        setTimeout(()=>{
            treeRef.setCurrentKey(defaultExpandedKeys[defaultExpandedKeys.length-1])
        },100)
    })
    if(treeData.keyword == ''){
        defaultExpandedKeys = [data[0].permissionCode]
        treeRef.setCurrentKey(data[0].permissionCode)
    }
}

// 中间取消按钮事件
const colse = ()=>{
    title = '机构详情'
    setItemStauts(true)
    mainData.formData = proxy.$_.cloneDeep(obj)
    setTreeStatus()
}

const setTreeStatus = () => {
    isOldTree = false
    setTimeout(()=>{
        nextTick(()=>{
            isOldTree = true
        })
    }, 1200)
}

// 设置绑定菜单
const setMenus = ()=>{
    if(title != '机构详情') {
        bindMenuRef.setMenus()
    }else {
        ElMessage.warning('当前非编辑状态！')
    }
}

// 右侧菜单树事件
const check = (data, {halfCheckedKeys, checkedKeys})=>{
    mainData.formData.halfPermissionIdList = halfCheckedKeys
    mainData.formData.permissionIdList = checkedKeys
}

// 重置菜单
const setTreeCheckStatus = ()=>{
    oldDefaultExpandedKeys = []
    isMenu = false
    nextTick(()=>{
        isMenu = true
    })
}

const reset = ()=>{
    treeData.parentCode = ''
    setTreeCheckStatus()
}

// 新增机构
const addOrg = ()=>{
    if(showBtn && title == '编辑机构'){
        return ElMessage.warning('请完成当前操作或者取消操作！')
    }
    showBtn = true
    title = '新增机构'
    mainData.formData = proxy.$_.cloneDeep(obj)
    mainData.formData = {...mainData.formData, ...nodeItem}
    mainData.formData.parentName = nodeItem.orgName
    mainData.formData.orgName = ''
    mainData.formData.permissionIdList = []
    mainData.formData.nodeDtoList = []
    setItemStauts(false)
    mainData.lists[7]['hide'] = true
    mainData.lists[8]['hide'] = true
    isMenu = false
    nextTick(()=>{
        isMenu = true
    })
}

// 编辑机构
const editOrg = ()=>{
    if(mainData.formData.permissionCode == "ORG000001"){
        return ElMessage.warning('此节点不能修改！')
    }
    if(showBtn && title == '新增机构'){
        return ElMessage.warning('请完成当前操作或者取消操作！')
    }
    // mainData.formData = nodeItem
    showBtn = true
    title = '编辑机构'
    setItemStauts(false)
    mainData.lists[3]['disabled'] = true
    mainData.lists[7]['hide'] = true
    mainData.lists[8]['hide'] = true
    isMenu = false
    nextTick(()=>{
        isMenu = true
    })
}

// 删除机构
const delOrg = ()=>{
    proxy.MessageBox({msg: `请确定删除${nodeItem.orgName}机构吗？`, type: 'warning'}).then((close) => {
        orgDelete({permissionCode: nodeItem.permissionCode}).then(res=>{
            treeRefStatus = false
            nextTick(()=>{
                reset()
                treeRefStatus = true
            })
            ElMessage.success('删除成功！')
            close()
        }).catch(()=>{
            close()
            treeRefStatus = true
        })
    })
    
}


// 更新节点数据
let loading= $ref(false)
const save = (params)=>{
    loading = true
    treeRefStatus = false
    if(title == '新增机构'){
        addNode(params).then(res=>{
            reset()
            treeRefStatus = true
            loading = false
            customForm.resetForm(true)
            ElMessage.success('新增成功！')
        }).catch(()=>{
            treeRefStatus = true
            loading = false
        })
    }else {
        modifyNode(params).then(res=>{
            reset()
            treeRefStatus = true
            loading = false
            customForm.resetForm(true)
            ElMessage.success('编辑成功！')
        }).catch(()=>{
            treeRefStatus = true
            loading = false
        })
    }
}



</script>
<style lang="scss" scoped>
.sys_munus {
    :deep(.el-radio-button) { width: 50%; .el-radio-button__inner { width: 100%} }
    .editPermission { line-height: 18px} .border-no { :deep(.el-radio-button__inner) { border: none} }
}
</style>
