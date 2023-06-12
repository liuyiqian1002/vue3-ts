<template>
    <div>
        <tw-drawer @save="save" :loading="loading" :title="title" v-model="drawerFlag" @handleClose="handleClose">
            <tw-tree ref="treeRef" :default-expanded-keys="defaultExpandedKeys"  showCheckbox v-model="dataLists" :defaultProps="{label:'permissionName'}" @check="check"></tw-tree>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import {getFullTree} from "@/api/system";
import {getPermission, addOrUpdatePermissionInfo} from "@/api/system/management/users";
import store from "@/store";


defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let lists = reactive([
    { key: "roleName", label: "角色名称" },
    // { key: "productCode", label: "产品编码", disabled: true },
])
let dataLists = $ref([])
let loading = $ref(false)
let drawerFlag = $ref(false)
let treeRef = $ref(null)
let defaultExpandedKeys = $ref([])
let roleId = 0
const getDatalists = (row,type)=>{
    roleId = row.roleId
    drawerFlag = true
    getFullTree({type: type}).then((res)=>{
        dataLists = res
        getPermission({type: type, roleId: roleId}).then((data)=>{
            let arr = []
            for (let i = 0; i < data.length; i++) {
                if(data[i].checkAll){
                    arr.push(data[i].permissionId)
                }
            }
            treeRef.setCheckedNodes(arr)
        })
        defaultExpandedKeys = type==1? [2]:[10234]  // 1是web权限 3是app权限
    })
}

const handleClose = ()=>{
    dataLists = []
}

let permissionId = []
let halfPermissionId = []
const check = (data, node)=>{
    permissionId = node.checkedKeys
    halfPermissionId = node.halfCheckedKeys
}

let eimts = defineEmits(['getTable'])
const save = ()=> {
    loading = true
    addOrUpdatePermissionInfo({roleId:roleId, permissionId: permissionId, halfPermissionId: halfPermissionId}).then(()=>{
        loading = false
        store.dispatch('user/getUserInfo')  // 刷新权限
        ElMessage.success('修改成功！')
        drawerFlag = false
        eimts('getTable')
    }).catch(()=>{
        loading = false
    })
}
defineExpose({getDatalists})

</script>

<style scoped lang="scss">

</style>
