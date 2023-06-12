<template>
    <div class="set-col">
        <tw-drawer title="设置显示列" v-model="drawerFlag" @save="save" :bodyPadding="0">
            <div class="common-layout h">
<!--                <el-checkbox-group v-model="checkList">-->
                    <el-checkbox v-model="item.hidden" v-for="(item, i) in checkList" :key="i">{{item.label}}</el-checkbox>
<!--                </el-checkbox-group>-->
            </div>
        </tw-drawer>
    </div>
</template>

<script setup lang="tsx">

import {getCurrentInstance} from "vue";

let { proxy } = getCurrentInstance()
let {lists, props } = defineProps({
    lists: { type: Array, default: ()=>[] },
    props: { type: Object, default: ()=>{ return {value: 'value', label: 'label' } }}
})
let checkList = $ref([])
let drawerFlag = $ref(false)

const viewData = ()=>{
    let arr = proxy.$_.cloneDeep(lists)
    arr.forEach(item=> item.hidden = !item.hidden )
    checkList = arr
    drawerFlag = true
}

let emits = defineEmits(['update:lists'])
const save = () => {
    let arr = proxy.$_.cloneDeep(checkList)
    arr.forEach(item=> item.hidden = !item.hidden )
    emits('update:lists', arr)
    drawerFlag = false
}

defineExpose({viewData})
</script>

<style scoped lang="scss">

</style>
