<template>
    <div>
<!--        @save="save"-->
        <tw-drawer
            :loading="loading"
            :title="title"
            :isBtns="false"
            v-model="drawerFlag"
        >
            <el-row class="tw w">
                <el-col :span="11">
                    <h3 class="mb20 txt">菜单权限</h3>
                    <tw-tree style="height: 500px" class="p20 border" ref="treeRef" v-model="dataLists" :defaultProps="{label:'name'}"></tw-tree>
                </el-col>
                <el-col :span="11" :offset="2">
                    <h3 class="mb20 txt">数据权限</h3>
                    <tw-tree style="height: 500px" v-if="drawerFlag" class="p20 border" ref="treeOldRef" :defaultProps="{label:'name'}" lazy url="/system/user/getDataPermission" :params="params" :parKeys="[{key:'permissionCode', val:'code'}]"></tw-tree>
                </el-col>
            </el-row>
            
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import {getDataPermission, getPermission} from "@/api/system/management/account"; //获取组件实例

defineProps({
    title: String,
})
let dataLists = $ref([])
let loading = $ref(false)
let treeRef = $ref(null)
let treeOldRef = $ref(null)
let defaultExpandedKeys = $ref([])
let drawerFlag = $ref(false)
let params = $ref({})
const getDatalists = (row,type)=>{
    params = {userId: row.userId}
    drawerFlag = true
    getPermission({type: type, userId: row.userId}).then((data)=>{
        // let arr = []
        // for (let i = 0; i < data.length; i++) {
        //     arr.push(data[i].permissionId)
        // }
        dataLists = data
    })
    // defaultExpandedKeys = type==1? [2]:[10234]  // 1是web权限 3是app权限
    // getDataPermission({permissionCode: row.permissionCode, userId: row.userId}).then((data)=>{
    //     let arr = []
    //     for (let i = 0; i < data.length; i++) {
    //         arr.push(data[i].permissionId)
    //     }
    // })
}

defineExpose({getDatalists})

const handleClose = ()=>{
    dataLists = []
}
</script>

<style scoped lang="scss">
</style>
