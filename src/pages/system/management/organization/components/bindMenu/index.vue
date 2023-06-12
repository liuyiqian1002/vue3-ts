<template>
    <div>
<!--        @save="save"-->
        <tw-drawer
            :loading="loading"
            :title="title"
            v-model="drawerFlag"
            :isBtns="false"
        >
            <tw-tree ref="treeRef" style="height: 500px" v-if="drawerFlag" v-model="dataLists" class="p20" :defaultCheckedkeys="defaultCheckedkeys" :defaultProps="{label:'permissionName'}" showCheckbox @check="check"></tw-tree>
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import {getFullTree} from "@/api/common";


defineProps({
    title: String,
    defaultCheckedkeys: Array
})
let dataLists = $ref([])
let loading = $ref(false)
let treeRef = $ref(null)
let drawerFlag = $ref(false)
const setMenus = ()=>{
    drawerFlag = true
    getFullTree({type: 1}).then(res=>{
        dataLists = res
    
    })
}


let emits = defineEmits(['check'])
// 右侧菜单树事件
const check = (data, node)=>{
    emits('check', data, node)
}

defineExpose({setMenus})

const handleClose = ()=>{
    dataLists = []
}
</script>

<style scoped lang="scss">
</style>
