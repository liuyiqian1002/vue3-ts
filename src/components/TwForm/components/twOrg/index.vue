<template>
    <el-form-item :label="item.label" :prop="item.key">
        <div class="form_org tw w">
            <div class="form_org_select">
                <el-select v-model="item.params.searchType" class="w" placeholder="Select">
                    <el-option label="组织" :value="1"/>
                    <el-option label="车辆" v-if="item.params.needVehicle" :value="2"/>
                </el-select>
            </div>
            <div class="form_org_content">
                <el-popover trigger="click" :width="460" :disabled="item.disabled" ref="popoverRef" tabindex="1" @hide="hidePopover">
                    <template #reference>
                        <div class="org_form_input w">
                            <div class="aa w">
                                <el-popover
                                    v-if="notNull(txt)"
                                    trigger="hover"
                                    placement="top-start"
                                    tabindex="2"
                                >
                                    <template #reference>
                                        <!--                                            <el-input v-model="txt" placeholder="数据权限" @focus="show=true"  />-->
                                        <div :class="`${item.disabled?'disabled' :''}`" class="org_form_input_txt border w pointer b_radius border-box pl10 h32 el-input__wrapper border ellipsis relative">
                                            {{txt}}
                                            <el-icon v-show="txt && !item.disabled" class="org_form_input_txt-icon positionCr" style="right: 4px" @click.stop="clear">
                                                <CircleClose/>
                                            </el-icon>
                                        </div>
                                    </template>
                                    <template v-if="item.showCheckbox">
                                        <span v-for="(txt,i) in formData[item.key]" :key="i"> {{txt.orgName}} <span v-if="i<formData[item.key].length-1">,</span></span>
                                    </template>
                                    <template v-else>
                                        <span> {{txt}}</span>
                                    </template>
                                </el-popover>
                                <!--                                    <el-input v-else v-model="txt" placeholder="数据权限" @focus="show=true" />-->
                                <div v-else :class="`${item.disabled?'disabled' :''}`" class="org_form_input_txt pointer w b_radius border-box pl10 h32 el-input__wrapper border ellipsis">
                                    {{txt}}
                                    <el-icon v-show="txt && !item.disabled" class="org_form_input_txt-icon positionCr" style="right: 4px" @click.stop="clear">
                                        <CircleClose/>
                                    </el-icon>
                                </div>
                            </div>
                        
                        </div>
                    </template>
                    <el-scrollbar class="relative" :style="`height: 440px;`">
                        <el-input
                            v-model="item.params.keyword"
                            style="z-index: 999"
                            class="w-50 m-2 positionTc"
                            size="small"
                            placeholder="输入搜索名称"
                            @change="onSear"
                        >
                            <template #append>
                                <el-button @click="onSear" icon="Search" />
                            </template>
                        </el-input>
                        
                        <el-tree
                            v-if="showOrg"
                            ref="orgTreeRef"
                            class="org_tree"
                            :show-checkbox="item.showCheckbox"
                            :props="item.props"
                            :node-key="item.nodeKey || 'permissionCode'"
                            :default-checked-keys="listsCodes"
                            @check="check"
                            :lazy="true"
                            :load="loadNode"
                            :highlight-current="true"
                        >
                            <template #default="{ node, data }">
                                <div class="custom-tree-node w" @click="nodeClick(node, data)">
                                    {{ $_.get(data, item.props.label) }}
                                </div>
                            </template>
                        </el-tree>
                    </el-scrollbar>
                
                </el-popover>
            </div>
        </div>
    </el-form-item>

</template>

<script setup lang="ts">
import {commonApi} from "@/api/common";

let {proxy} = getCurrentInstance()
const {formData, item} = defineProps({
    formData: Object,
    item: Object
})
let show = $ref(false)
let orgTreeRef = $ref(null)
let popoverRef = $ref(null)
let txt = $ref('')
let listsCodes = $ref([])
let showOrg = $ref(true)
let allObjLists = {}
let checkStatus = false
let openKeys = []
let treeNode = {}

item.props = { ...{disabled: 'disabled', isLeaf: 'vehicle'}, ...item.props }

/* ---  组织结构类型 重点  --- */
/* ---  组织结构类型 重点  --- */
/* ---  组织结构类型 重点  --- */
// displayLevel 等级查询
//   1：省，2：市，3：区，4：企业，5：运营商，6：营运类型，7：自定义
//  selectTypes    可以选择节点类型
//  disabledTypes  可以展开节点类型
const nodeExpand = ()=> {
    for (let i = 0; i < listsCodes.length; i++) {
        let code = listsCodes[i]
        if(!code) return;
        let keys = code.split('.')
        let newKey = []
        for (let j = 0; j < keys.length; j++) {
            let tagKey = keys[j]
            newKey.push(tagKey)
            if(!openKeys.includes(tagKey) && tagKey){
                let node = orgTreeRef.getNode(newKey.join('.'))
                if(node){
                    if(j<keys.length -1) {
                        openKeys.push(tagKey)
                        node.expand()
                    }
                    if(!item.showCheckbox && !treeNode.orgName){
                        orgTreeRef.setCurrentKey(listsCodes[0], true)
                        txt = node.data.orgName
                    }
                }
            }
        }
    }
}

// 树懒加载
const loadNode = (node: Node, resolve: (data) => void) => {
    let dataParams = proxy.$_.cloneDeep(item.params)
    if (node.level != 0) {
        for (let i = 0; i < item.parKeys.length; i++) {
            dataParams[item.parKeys[i].key] = node.data[item.parKeys[i].val]
        }
        dataParams = { ...dataParams, ...item.params}
    }
   
    // 禁止点击（选择）的类型
    if(item.disabledTypes){
        if (item.disabledTypes.includes(node.data.orgType)) {
            return resolve([])
        }
    }
    
    commonApi(item.url, dataParams, item.method).then(res=>{
        if(res){
            if(item.selectTypes && res.length>0){  // 多选情况下 指定树的哪些类型不能勾选
                if (!item.selectTypes.includes(res[0].orgType)) {
                    for (let i = 0; i < res.length; i++) {
                        res[i][item.props.disabled] = true
                    }
                }
            }
            resolve(res)
            nextTick(()=>{
                nodeExpand()
            })
        }else{
            resolve([])
        }
    })
}

let emits = defineEmits(['tapClick'])

// 关闭事件
const hidePopover = () => {
    if(!item.showCheckbox && item[item.key] != formData[item.key] && item.arrChangeKey){
        item.arrChangeKey.forEach(key=>{
            formData[key] = proxy.$_.isNumber(formData[key])?'':[]
        })
        emits('tapClick', 'changeOrg', formData)
        emits('tapClick', 'reset', item)
    }
}

// 单选事件
const nodeClick = (node, data) => {
    if(!item.showCheckbox){
        if(item.selectTypes){  // 指定树的哪一层不能点击
            if (!item.selectTypes.includes(data.orgType)) {
                setTimeout(()=>{
                    orgTreeRef.setCurrentKey(null)
                },0)
                return
            }
        }
        treeNode = data
        // isNodeType true 代表单选的时候需要的参数当前节点对象
        if(item.isNodeType){
            formData[item.key] = data
        }else {
            formData[item.key] = data[item.props.value]
        }
        txt = data[item.props.label]
    }
}

// 多选事件
const check = (data, { halfCheckedKeys })=>{
    allObjLists = orgTreeRef.store.nodesMap
    checkNotes(data, allObjLists, halfCheckedKeys )
}

// check响应事件
const checkNotes = (data, allObjLists, halfCheckedKeys )=> {
    let treeNodeItem = allObjLists[data.permissionCode]
    treeNode = allObjLists[data.permissionCode].data
    if (treeNode.nocheck) {
        return;
    }
    checkStatus = treeNodeItem.checked
    let parentNode = allObjLists[treeNode.parentCode];
    console.log(parentNode);
    let half = halfCheckedKeys.includes(treeNode.permissionCode)
    if (checkStatus || half) {
        // if ( half || treeNode.permissionCode == "0") {
        if ( half || treeNode.permissionCode == "0") {
            deleteNoteForArray(treeNode);
            let children = treeNodeItem.childNodes;
            if (children && children.length > 0) {
                children.forEach((an, i )=> {
                    let anHalf = halfCheckedKeys.includes(an.data.permissionCode)
                    if (an.data.parentCode == treeNode.permissionCode && an.checked && !anHalf) {
                        //防止节点下只有一个节点时，点击其他节点导致，当前节点与子节点同时出现在搜索栏中
                        if (an.childNodes && an.childNodes.length == 1) {
                            let m = an.childNodes[0];
                            let canAdd = true;
                            formData[item.key].forEach((n, i)=> {
                                //当前节点或者子节点在formData[item.key]中存在是，无需做新增操作
                                if ( [an.permissionCode, an.parentCode, m.permissionCode, m.parentCode].includes(n.permissionCode)) {
                                    canAdd = false;
                                }
                            });
                            if (canAdd) {
                                addNoteForArray(an.data);
                            }
                        } else {
                            addNoteForArray(an.data);
                        }
                    }
                })
            }
        } else {
            addNoteForArray(treeNode);
        }
        if (parentNode && parentNode.data.permissionCode != "0") {
            nodeFilters(parentNode, allObjLists, halfCheckedKeys, true)
        }
        if(treeNodeItem.checked){
            nodeFilters(treeNodeItem, allObjLists, halfCheckedKeys, false)
        }
    } else {
        deleteNoteForArrayBylike(treeNode);
        if (parentNode && parentNode.data.permissionCode != "0") {
            checkNotes(parentNode.data, allObjLists, halfCheckedKeys );
        }
    }
    
    // 过滤选中状态
    setTxt(formData[item.key])
}

// 过滤不需要权限
const nodeFilters = (node, allObjLists, halfCheckedKeys, status)=>{
    let parentStatus = node.checked;
    if (parentStatus && !node.data.nocheck) {//父节点是全选状态
        let children = node.childNodes;
        if (children && children.length > 0) {
            children.forEach((n, i)=> {
                deleteNoteForArrayBylike(n.data);
            })
        }
    }
    if (node.childNodes && node.childNodes.length > 0 && status) {
        checkNotes(node.data, allObjLists, halfCheckedKeys);
    }
}

const deleteNoteForArray = (note)=> {
    if (formData[item.key].length > 0) {
        formData[item.key].forEach((n, i)=> {
            // if (n && (n.permissionCode.indexOf(note.permissionCode) > -1)) {
            if (n && n.permissionCode == note.permissionCode) {
                formData[item.key].splice(i, 1, null);
            }
        });
        formData[item.key] = formData[item.key].filter(isNotNull);
    }
}

const addNoteForArray = (note)=> {
    let canAdd = true;
    if (formData[item.key].length > 0) {
        formData[item.key].forEach((n, i)=> {
            if (n.permissionCode == note.permissionCode || n.permissionCode == note.parentCode) {
                canAdd = false;
            }
        });
    }
    if (canAdd) {
        formData[item.key].push(note);
    }
}

const deleteNoteForArrayBylike = (note)=> {
    if (formData[item.key].length > 0) {
        formData[item.key].forEach((n, i)=> {
            if (n && (n.permissionCode == note.permissionCode || (n.permissionCode + "").indexOf(note.permissionCode) > -1
                || (n.parentCode + "").indexOf(note.permissionCode) > -1)) {
                formData[item.key].splice(i, 1, null);
            }
        });
        formData[item.key] = formData[item.key].filter(isNotNull);
    }
}

const isNotNull = (element)=> {
    return (element != null);
}


const setTxt = (arrLists)=>{
    let arr = []
    arrLists = arrLists || []
    let selectNum = arrLists.length;
    if (selectNum > 0) {
        if (selectNum <= 3) {
            arrLists.forEach(tag => arr.push(tag[item.props.label]))
            txt = arr.join(',')
        } else {
            txt = `已选择${selectNum}个`;
        }
    }else {
        txt = ''
    }
}

watch(()=>formData[item.key], (val:any)=>{
    let str = JSON.stringify(val)
    // console.log(val, str);
    if(!proxy.notNull(val) || str == '{}' || str == '[]'){
        txt = ''
        orgTreeRef.setCheckedKeys([])
    }
})

const clear = (str)=> {
    txt = ''
    if(item.showCheckbox){
        formData[item.key] = []
    }else {
        // NOTE:XXX 此处含义待注释 str == '{}' -> ???
        if(formData[item.key] instanceof Object) {
            formData[item.key] = {}
        } else {
            formData[item.key] = ''
        }
    }
    orgTreeRef.setCheckedKeys([])
}

// 此方法目前只有账号管理的数据权限才用到，目前可以说是专门为数据权限提供的重置数据的方法
const reset = ()=>{
    showOrg = false
    txt = ''
    formData[item.key] = []
    listsCodes = []
    item.params.filterNodeCondition = {permissionCode: formData.permissionCode}
    nextTick(()=>{
        showOrg = true
    })
}

const onSear = ()=>{
    showOrg = false
    nextTick(()=>{
        listsCodes = proxy.$_.map(formData[item.key], 'permissionCode')
        defaultParams = proxy.$_.cloneDeep(item.params)
        if(item.showCheckbox){
            setTxt(formData[item.key] || [])
        }
        showOrg = true
    })
}

defineExpose({reset,clear})

let defaultParams = {}
// 初始化选中数据
if(item.showCheckbox){
    listsCodes = proxy.$_.map(formData[item.key], 'permissionCode')
    defaultParams = proxy.$_.cloneDeep(item.params)
    setTxt(formData[item.key])
} else {
    // isNodeType true 代表单选的时候需要的参数当前节点对象
    if(item.isNodeType){
        listsCodes = [formData[item.key][item.props.value]]
    }else {
        listsCodes = [formData[item.key]]
    }
    // formData[item.key] = orgTreeRef.getNode(formData[item.key])
}

// const emit = defineEmits(['update:name'])
</script>

<style scoped lang="scss">
.form_org {
    height: 32px;
    .form_org_select {width: 80px;}
    .form_org_content { width: calc(100% - 80px)}
    .org_form_input_txt {
        box-shadow: none;justify-content: inherit; color: var(--el-menu-text-color);
        .org_form_input_txt-icon { display: none;color: var(--el-text-color-placeholder)}
        &:hover{
            .org_form_input_txt-icon { display: block}
        }
    }
    :deep(.el-input.is-disabled) {
        .org_form_input_txt {color: var(--el-disabled-text-color); }
    }
}
.org_tree{
    padding-top: 50px;
    :deep(.el-checkbox__input.is-disabled .el-checkbox__inner) { display: none}
}

</style>

