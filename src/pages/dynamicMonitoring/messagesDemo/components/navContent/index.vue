<template>
    <div id="meaages_nav_content" class="w h">
        <div class="el-collapse h" role="tablist" aria-multiselectable="true">
            <div class="el-collapse-item is-active" :style="`height: ${collapseActiveName == '1'? 'calc(100% - 50px)':'50px'}`">
                <carList ref="carListRef" :formData="formData" @isCollapse="isCollapse" @checkNode="checkNode" @setCollapseActiveName="collapseActiveNameChange" @zoomAndCenterIns="zoomAndCenterIns" @closeCarDetails="closeCarDetails" @nodeClick="nodeClick" @tapClick="tapClick" @carListVehicleCodeListUpate="(codes)=> carListVehicleCodeList = codes"></carList>
            </div>
            <div class="el-collapse-item h" :style="`height: ${collapseActiveName == '1'? 'calc(100% - 50px)':'130px'}`">
                <onCar ref="onCarRef" :formData="formData" @carDetails="carDetails"  @nodeClick="nodeClick" @checkNode="checkNode" @tapClick="tapClick" @setCollapseActiveName="collapseActiveNameChange" @zoomAndCenterIns="zoomAndCenterIns" @addPageNumber="formData.pageNumber++" @onCarVehicleCodeListUpate="(codes)=> onCarVehicleCodeList = codes" :carListVehicleCodeList="carListVehicleCodeList"></onCar>
            </div>
        </div>
    </div>
</template>

<script setup lang="tsx">
import carList from './components/carList/index.vue'
import onCar from './components/onCar/index.vue'

let { proxy } = getCurrentInstance()
let carListRef = $ref(null)
let onCarRef = $ref(null)
let collapseActiveName = inject('collapseActiveName')
console.log(collapseActiveName);
let carListVehicleCodeList = $ref([])   // 车辆列表选择项
let onCarVehicleCodeList = $ref([])     // 选中车辆选择项
let formData = reactive({
    "is808": 0,
    "operatorIdList": [],
    "parentCode": "",
    "vehicleOperateTypeCodeList": [],
    "vehicleStatus": '',
    "vehicleType": '',
    "pageNumber": 1,
    "pageSize": 30,
    filter: false,
    keyword: '',
    type: '',
    vehicleCodeList: [],
    secondOperatorIdList: [],
    secondVehicleCodeList: [],
    currentCheckedPermissionCodeList: []
})
let emits = defineEmits([ 'carDetails', 'tapClick', 'checkNode', 'setCollapseActiveName', 'zoomAndCenterIns', 'closeCarDetails', 'nodeClick', 'isCollapse'])

const isCollapse = ()=>{
    emits('isCollapse')
}

const zoomAndCenterIns = (data, zoom) => {
    emits('zoomAndCenterIns', data, zoom)
}

// 车辆详情
const carDetails = ()=>{
    emits('carDetails', formData)
}

const tapClick = (key, node) => {
    emits('tapClick', key, node)
}

const checkNode = (data, obj)=>{
    // let arrCode = proxy.$_.map(obj.checkedNodes, 'permissionCode')
    // let permissionCodeList = proxy.$_.map(arrCode, '.')
    // 默认设置选项参数不全处理
    // if(obj.checkedNodes){
        let permissionCodeList = []
        let vehicleCodeList = []
        obj.checkedNodes.forEach(item=>{
            if(item.permissionCode.indexOf('.')>0){
                permissionCodeList.push(item.permissionCode)
            }else {
                vehicleCodeList.push(item.permissionCode)
            }
        })
        formData.currentCheckedPermissionCodeList = permissionCodeList
        formData.vehicleCodeList = vehicleCodeList
    // }
    
    emits('checkNode', data, obj, formData)
}

const nodeClick = (data, node) => {
    emits('nodeClick', data, node, formData)
}

const collapseActiveNameChange = (val)=>{
    let obj
    if(val == 1){
        obj = carListRef.mainData.checkObj
    }else {
        obj = onCarRef.mainData.checkObj
    }
    let permissionCodeList = []
    let vehicleCodeList = []
    if(obj.checkedNodes){
        obj.checkedNodes.forEach(item=>{
            if(item.permissionCode){
                if(item.permissionCode.indexOf('.')>0){
                    permissionCodeList.push(item.permissionCode)
                }else {
                    if(item.vehicleCode)
                        vehicleCodeList.push(item.vehicleCode)
                }
            }
        })
    }
    formData.currentCheckedPermissionCodeList = permissionCodeList
    formData.vehicleCodeList = vehicleCodeList
    emits('setCollapseActiveName', val, formData)
}

const closeCarDetails = (val)=>{
    emits('closeCarDetails', val)
}

const getTree = (val) => {
    onCarRef.loadTreeData(val)
}

defineExpose({formData, getTree})
</script>

<style scoped lang="scss">
    #meaages_nav_content {
        //font-size: 12px;
        :deep(.el-tabs__item) { padding: 0 10px}
        .nav_custom-form, .nav_content_keyword {
            :deep(.el-form-item) { margin-bottom: 8px}
            :deep(.el-input__wrapper) { background: rgba(247,247,247,1);box-shadow: none}
        }
        .el-collapse-item__wrap { height: calc(100% - 100px)}
    }
</style>
