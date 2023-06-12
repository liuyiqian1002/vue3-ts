<template>
    <div class="set-col">
        <tw-dialog title="设置列" width="600px" height="600px" v-model="dialogFlag">
            <el-checkbox-group v-model="checkList">
                <el-row>
                    <el-col :span="6" v-for="(item,i) in columns" :key="i"><el-checkbox :tabindex="i" :label="item.prop" >{{item.label}}</el-checkbox></el-col>
                </el-row>
            </el-checkbox-group>
            
            <div class="tw_cr pt30 mt30 pr20">
                <el-button class="mt30" type="primary" @click="save">保存</el-button>
            </div>
        </tw-dialog>
    </div>
</template>

<script setup lang="tsx">

let checkList = $ref(['cityName', 'companyName', 'vehicleOperateTypeName', 'plateNum', 'plateColorName', 'simNum', 'operatorName', 'gpsTime', 'online', 'runningSpeed', 'vehicleStatusDesc', 'postionDetail',])
let { columns } = defineProps({
    columns: { type: Array, default:()=> {
        return [
            {label: '市区', value: 1 },
            {label: '企业', value: 2 },
            {label: '营运类型', value: 3 },
            {label: '车牌号', value: 4},
            {label: '颜色', value: 5},
            {label: 'SIM卡号', value: 6},
            {label: '运营商', value: 7},
            {label: '卫星时间', value: 8},
            {label: '是否上线', value: 9},
            {label: '速度 ', value: 10},
            {label: '车辆状态', value: 11},
            {label: '详情位置', value: 12},
        ]
        }}
})
let dialogFlag = $ref(false)

const viewData = ()=>{
    dialogFlag = true
}

let emits = defineEmits(['save'])
const save = ()=>{
    dialogFlag = false
    emits('save', checkList)
}

defineExpose({viewData})
</script>

<style scoped>

</style>
