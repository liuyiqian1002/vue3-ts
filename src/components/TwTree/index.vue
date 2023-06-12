
<template>
    <div class="tw_tree">
        <el-scrollbar :style="`height: ${height}`">
            <el-tree
                ref="treeRef"
                :data="modelValue"
                :show-checkbox="showCheckbox"
                :props="defaultProps"
                :node-key="nodekey"
                :default-expand-all="defaultExpandAll"
                :defaultExpandedKeys="defaultExpandedKeys"
                :default-checked-keys="defaultCheckedkeys"
                :check-strictly="checkStrictly"
                @node-click="handleNodeClick"
                @check-change="handleCheckChange"
                @check="check"
                :lazy="lazy"
                :load="loadNode"
                :accordion="false"
                :highlight-current="true"
            >
                <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span>{{ $_.get(data, defaultProps.label) }}</span>
              
            </span>
                </template>
            </el-tree>
        </el-scrollbar>
    </div>
   
    
</template>
<script lang="ts" setup>
import type Node from 'element-plus/es/components/tree/src/model/node'
import {commonApi} from "../../api/common";

const {modelValue, defaultExpandedKeys, defaultCheckedkeys, defaultExpandAll,  showCheckbox, url, method, params, parKeys, lazy, nodekey, defaultProps,} = defineProps({modelValue: {type: Array, default: [],},
    defaultExpandedKeys: {type: Array, default: [],},
    defaultCheckedkeys: {type: Array, default: [],},
    defaultExpandAll: {type: Boolean, default: false,},
    showCheckbox: {type: Boolean, default: false,},
    height:  {type: String, default: '100%',},
    url: {type: String, default: '',},
    method: {type: String, default: 'get',},
    params: {type: Object, default: ()=>{},},
    parKeys: {type: Array, default: ()=>[],},
    lazy : {type: Boolean, default: false,},
    checkStrictly : {type: Boolean, default: false,},
    nodekey: {type: String, default: 'id',},
    defaultProps: {
        type: Object,
        default: () => {
            return {
                children: 'children', //显示子节点的某个属性值
                label: 'label', //显示的节点的某个属性值
            }
        },
    },
})

let treeRef = $ref(null)

const emit = defineEmits(['nodeClick', 'handleCheckChange', 'dataLoad' ])
const loadNode = async (node: Node, resolve: (data) => void) => {
    let dataParams = params || {}
    if (node.level != 0) {
        for (let i = 0; i < parKeys.length; i++) {
            dataParams[parKeys[i].key] = node.data[parKeys[i].val]
        }
        dataParams = { ...dataParams, ...params}
    }
    // if (node.level > 1) return resolve([])
    
    commonApi(url, dataParams, method).then(res=>{
        resolve(res||[])
        if(node.level == 0) emit('dataLoad', res, node)
    }).catch(()=>{
        resolve([])
        // 只有重置了这3个属性,树才能正常继续重新请求和展开
        node.isLeaf = false
        node.expanded = false
        node.loaded = false
    });
}

// 当节点被点击的时候触发当节点被点击的时候触发
const handleNodeClick = (data: any, node) => {
    emit('nodeClick', data, node)
}

// 当复选框被点击的时候触发
const handleCheckChange = (data: any, node)=>{
    emit('handleCheckChange', data, node)
}

// 点击当前复选框被的时候触发
const check = (data: any, node)=>{
    emit('check', data, node)
}

// 返回当前选中节点的数组
const getAllCheckNode = ()=>{
    return treeRef.getCheckedNodes()
}

// 返回当前选中节点 key 的数组
const getCheckedKeys = ()=>{
    return treeRef.getCheckedKeys()
}

// 设置目前选中的节点
const setCheckedNodes = (lists)=>{
    treeRef.setCheckedKeys(lists)
}

// 设置目前节点高亮
const setCurrentKey = (key, b: boolean)=>{
    treeRef.setCurrentKey(key, true)
}

defineExpose({ getAllCheckNode, getCheckedKeys, setCheckedNodes, setCurrentKey})

</script>

<style lang="scss" scoped>
.tw_tree {
    :deep(.el-scrollbar__wrap){
        //overflow-x: hidden !important;
        .el-scrollbar__view{display:inline-block !important; white-space: nowrap}
        .el-tree-node__content { width: 100%}
    }
}

</style>
