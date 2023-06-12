<template>
    <div>
        <tw-drawer
            @handleClose="handleClose"
            :isBtns="false"
            :loading="state.loading"
            :title="title"
            v-model="drawerFlag"
        >
            <el-tabs v-if="drawerFlag" v-model="state.activeName" class="demo-tabs h" @tab-click="handleClick">
                <el-tab-pane class="pt20" label="车辆信息" name="vehicleDto" lazy>
<!--                    <el-scrollbar style="height: 640px">-->
                        <tw-custom-form
                            class="border-b"
                            ref="vehicleDtoRef"
                            :lists="state.vehicleDtoList"
                            :rules="state.rules"
                            :formData="state.formData.vehicleDto"
                        >
                        </tw-custom-form>
    <!--                    :rules="state.rules"-->
                        <tw-custom-form
                            class="p20 border-b"
                            :lists="state.dvrInfoDtoList"
                            :formData="state.formData.dvrInfoDto[0]"
                        ></tw-custom-form>
                        <tw-custom-form
                            class="p20"
                            @save="save('vehicleDto', $event)"
                            :loading="state.loading"
                            :lists="state.videoDtoList"
                            :formData="state.formData.videoDto"
                        ></tw-custom-form>
<!--                    </el-scrollbar>-->
                </el-tab-pane>
                <el-tab-pane label="补充信息" name="extDto" class="tw_c" lazy>
                    <div class="w500">
                        <tw-custom-form
                            class="p20"
                            @save="save('extDto', $event)"
                            :loading="state.loading"
                            :lists="state.extDtoList"
                            :rules="state.rules"
                            :formData="state.formData.extDto"
                        >
                        </tw-custom-form>
                    </div>
                    
                </el-tab-pane>
                <template v-if="showStatus">
                    <el-tab-pane label="登记证" name="rcDto" lazy>
                        <el-scrollbar style="height: 660px">
                            <tw-custom-form
                                class="p20"
                                @save="save('rcDto', $event)"
                                :loading="state.loading"
                                :lists="state.rcDtoLists"
                                :rules="state.rules"
                                :formData="state.formData.rcDto"
                            >
                                <template #rcFrontImageUrl>
                                    <upload v-model="state.formData.rcDto.rcFrontImageUrl" v-model:id="state.formData.rcDto.frontFileId" type="x" uploadTxt="上传登记证"></upload>
                                </template>
                            </tw-custom-form>
                        </el-scrollbar>
        
                        <!--                    <tw-descriptions  :lists="state.rcDtoLists"-->
                        <!--                                      :data="state.formData.rcDto"></tw-descriptions>-->
                    </el-tab-pane>
                    <el-tab-pane label="行驶证" name="vcDto" lazy>
                        <tw-custom-form
                            class="p20"
                            ref="vcDtoRef"
                            @save="save('vcDto', $event)"
                            :loading="state.loading"
                            :lists="state.vcDtoLists"
                            :rules="state.vcRules"
                            :formData="state.formData.vcDto"
                        >
                            <template #vcFrontImageUrl>
                                <img style="width: 120px;height: 120px" :src="state.formData.vcDto.vcFrontImageUrl"/>
                            </template>
                            <template #vcBackImageUrl>
                                <img style="width: 120px;height: 120px" :src="state.formData.vcDto.vcBackImageUrl"/>
                            </template>
                        </tw-custom-form>
                    </el-tab-pane>
                    <el-tab-pane label="运输证" name="tcDto" lazy>
                        <tw-custom-form
                            class="p20"
                            ref="tcDtoRef"
                            @save="save('tcDto', $event)"
                            :loading="state.loading"
                            :lists="state.tcDtoLists"
                            :rules="state.tcRules"
                            :formData="state.formData.tcDto"
                        >
                            <template #tcFrontImageUrl>
                                <img style="width: 120px;height: 120px" :src="state.formData.tcDto.vcFrontImageUrl"/>
                            </template>
                            <template #tcBackImageUrl>
                                <img style="width: 120px;height: 120px" :src="state.formData.tcDto.vcBackImageUrl"/>
                            </template>
                        </tw-custom-form>
                    </el-tab-pane>
                    <el-tab-pane label="从业人员" name="congyerenyuan" lazy>
                        <practitioner :vehicleCode="state.formData.vehicleDto.vehicleCode" :lists="state.formData.driverList" :data="state.formData.companyContactsDto || {}"></practitioner>
                    </el-tab-pane>
                    <el-tab-pane label="保险信息" name="baoxian" lazy>
                        <tw-table
                            ref="tableRef"
                            method="post"
                            :tableParams="state.insurance.params"
                            :url="state.insurance.url"
                            :isTableHeader="false"
                            :botHeight="100"
                            :columns="state.insurance.columns"
                        ></tw-table>
                    </el-tab-pane>
                    <el-tab-pane label="变更记录" name="biangenjilu" lazy>
                        <tw-table
                            ref="tableRef"
                            method="post"
                            :lists="state.formData.logList"
                            :botHeight="100"
                            :isTableHeader="false"
                            :columns="state.alteration.columns"
                        ></tw-table>
                    </el-tab-pane>
                </template>
            </el-tabs>
            
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import sfzo from "@/assets/images/sfz_o.jpg"
import sfz from "@/assets/images/sfz.jpg"
import { getDetail, addOrUpdate } from "@/api/operation/cars/car";
import practitioner from "./components/practitioner/index.vue"

defineProps({
    title: String,
})
let { proxy } = getCurrentInstance()
let vehicleDtoRef = $ref(null)
let vcDtoRef = $ref(null)
let tcDtoRef = $ref(null)
let showStatus = $ref(false)
let txt = $ref('')
let editData = {
    "billDto": {
        "contact": "",
        "cost": '',
        "faultType": "",
        "id": '',
        "isReplacementParts": true,
        "mileage": '',
        "otherFaultDescribe": "",
        "remark": "",
        "repairContent": "",
        "repairDate": "",
        "repairLocation": "",
        "repairNum": "",
        "repairResult": '',
        "replacementParts": "",
        "serverType": '',
        "technicistName": "",
        "workload": ""
    },
    "driverList": [
        {
            "driverId": ''
        }
    ],
    "dvrInfoDto": [
        {
            "deviceChannelCount": '',
            "deviceTypeCode": "",
            "deviceTypeName": "",
            "terminalClassify": '',
            "terminalModel": "",
            "vehicleDVRInfoId": '',
            "vehicleId": '',
            "videoCommunicationId": ""
        }
    ],
    "extDto": {
        "imeiNum": "",
        "isShuttleBus": false,
        "macAddress": "",
        "remark": "",
        "shuttleBusDate": "",
        "vehicleExtId": ''
    },
    "rcDto": {
        "backFileId": "",
        "frontFileId": "",
        "id": '',
        "rcAuthority": "",
        "rcAxisBase": "",
        "rcAxisNumber": "",
        "rcBackImageUrl": "",
        "rcCabPassengers": "",
        "rcCarryPassengers": "",
        "rcCode": "",
        "rcEngineModel": "",
        "rcEngineNumber": "",
        "rcFrontImageUrl": "",
        "rcFuelType": "",
        "rcGetWay": "",
        "rcIdentityCategory": "",
        "rcIdentityNumber": "",
        "rcInsideSize": "",
        "rcIssueDate": "",
        "rcLoadMass": "",
        "rcManufacturer": "",
        "rcOutsideSize": "",
        "rcOwner": "",
        "rcPower": "",
        "rcProductionDate": "",
        "rcRegisterCode": "",
        "rcRegisterDate": "",
        "rcSpringPlate": "",
        "rcSteering": "",
        "rcTotalMass": "",
        "rcTractiveTonnage": "",
        "rcUseNature": "",
        "rcVehicleBodyColor": "",
        "rcVehicleBrand": "",
        "rcVehicleIdentityNumber": "",
        "rcVehicleModelNumber": "",
        "rcVehiclePlace": "",
        "rcVehicleType": "",
        "rcWheelBase": "",
        "rcWheelNumber": "",
        "rcWheelSize": "",
        "relationId": ''
    },
    "tcDto": {
        "backFileId": "",
        "frontFileId": "",
        "id": '',
        "relationId": '',
        "tcAnnualDate": "",
        "tcAuthority": "",
        "tcBackImageUrl": "",
        "tcFrontImageUrl": "",
        "tcIssueDate": "",
        "tcOwner": "",
        "tcPlateNumber": "",
        "tcSize": "",
        "tcTonnage": "",
        "tcTransportCode": "",
        "tcType": ""
    },
    "vcDto": {
        "backFileId": "",
        "frontFileId": "",
        "id": '',
        "relationId": '',
        "vcAddress": "",
        "vcArchiveCode": "",
        "vcBackImageUrl": "",
        "vcBrand": "",
        "vcCarryPassengers": "",
        "vcCurbWeight": "",
        "vcEngineNumber": "",
        "vcExpireDate": "",
        "vcFrontImageUrl": "",
        "vcIdentityNumber": "",
        "vcIssueDate": "",
        "vcLoadMass": "",
        "vcOutsideSize": "",
        "vcOwner": "",
        "vcPlateNumber": "",
        "vcRegistrationDate": "",
        "vcTotalMass": "",
        "vcTractiveTonnage": "",
        "vcType": "",
        "vcUseNature": ""
    },
    "vehicleDto": {
        "accessCode": "",
        "dataPermissionCode": "",
        "operState": '',
        "operStateName": '',
        "operatorId": '',
        "operatorName": "",
        "plateColorCode": "",
        "plateColorName": "",
        "plateNum": "",
        "protocol": "",
        "simNum": "",
        "valid": true,
        "vehicleCode": "",
        "vehicleId": '',
        "vehicleOperateTypeCode": "",
        "vehicleOperateTypeId": '',
        "vehicleOperateTypeName": "",
        "vehicleTypeCode": "",
        "vehicleTypeId": '',
        "vehicleTypeName": "",
        tagNameList:[]
    },
    "videoDto": {
        "id": '',
        "videoConfigId": ''
    },
    logList: []
};
let drawerFlag = $ref(false)
let state = reactive({
    loading: false,
    fromDataRef: null,
    activeName: 'vehicleDto',
    formData:{},
    // 车辆信息 - 基本信息
    vehicleDtoList: [
        { key: 'plateNum', label: '车牌号',col:12, placeholder: '请输入车牌号', disabled: true },
        { key: 'plateColorCode', label: '车牌颜色',col:12, type: 'select', filter: 'color', placeholder: '请选择车牌颜色', disabled: true},
        { key: 'dataPermissionCode', label: '组织结构',col:12, placeholder: '请输入组织结构', type: 'org', url: '/system/userDataAuthSearchTree/getTreesList', method: 'post', params: { "hasDataPermission": true, needVehicle: false, searchType: 1, keyword: '' }, parKeys: [{key:'parentCode', val:'permissionCode'}], props: {label:'orgName', value: 'permissionCode', disabled: 'nocheck'}, permissionIds:[], disabled: true },
        { key: 'simNum', label: 'SIM卡号',col:12, placeholder: '请输入SIM卡号' },
        { key: 'vehicleTypeId', label: '车辆类型',col:12, type:'select', remote: true, url: '/business/vehicleType/getAllType',  loadMore: true, method: 'post', params: {vehicleTypeId: '', "order": "", "orderField": "", "pageNumber": 1, "pageSize": 20}, props:{ label: 'name', value:'vehicleTypeId'}, placeholder: '请选择车辆类型' },
        { key: 'operState', label: '车辆营运状态',col:12,type:'select', placeholder: '请选择车辆营运状态', filter: 'vehicleOperatorState' },
        { key: 'operatorId', label: '运营商',col:12, type:'select', remote: true, url: '/business/operatorEntity/listAssociateOperator', method: 'get', params: {}, props:{ label: 'name', value:'id'}, placeholder: '请选择运营商', disabled: true },
        { key: 'vehicleOperateTypeId', label: '车辆营运类型', type:'select', col:12, remote: true, url: '/system/vehicleOperateType/getListByName', method: 'get', params: {}, props:{ label: 'typeName', value:'typeId'}, placeholder: '请选择车辆营运类型', disabled: true },
        { key: 'accessCode', label: '接入码',col:12, placeholder: '请选择接入码' },
        { key: 'protocol', label: '转发协议',col:12, type:'select', filter: 'protocolType' },
        { key: 'tagNameList', label: '车辆标签',col:24, type:'select', remote: true, url: '/business/vehicle/getTagsByKeyword', method: 'post', params: {}, defaultFirstOption: true, allowCreate: true, multiple: true, collapseTags: false  },
    ],
    // 车辆信息 - 车辆视频信息
    dvrInfoDtoList: [
        { key: 'terminalClassify', label: '设备分类',col:12, type:'select',filter: 'terminalClassify', placeholder: '请选择设备分类', relyOnData: [{key: 'deviceTypeCode', value: 'terminalClassify'}, {key: 'terminalModel', value: 'terminalClassify'}],change:(val)=>{
                state.dvrInfoDtoList[1].disabled = val === ''
                state.dvrInfoDtoList[2].disabled = true
            } },
        { key: 'deviceTypeCode', label: '设备厂商',col:12, type:'select', placeholder: '请选择设备厂商', remote: true, url: '/business/terminalType/getTerminalTypeSelect', method: 'get', params: { terminalClassify: '' }, props:{ label: 'manufacturer', value:'manufacturer'}, relyOnData: [ {key: 'terminalModel', value: 'manufacturer'}], disabled: true,change:(val)=>{
                state.dvrInfoDtoList[2].disabled = val === ''
            } },
        { key: 'terminalModel', label: '设备型号',col:12, type:'select', placeholder: '请选择设备型号', remote: true, url: '/business/terminalType/getTerminalTypeSelect', method: 'get', params: {terminalClassify: '', manufacturer: ''}, props:{ label: 'name', value:'terminalTypeId'}, disabled: true },
        { key: 'videoCommunicationId', label: '设备ID',col:12,filter: 'contactRelation', placeholder: '请输入设备ID' },
        { key: 'deviceChannelCount', label: '摄像头数量',col:12, type:'select', placeholder: '请选择摄像头数量', children:  [{ label: 1, value: 1 }, { label: 2, value: 2 }, { label: 3, value: 3 }, { label: 4, value: 4 }, { label: 5, value: 5 }, { label: 6, value: 6 }, { label: 7, value: 7 }, { label: 8, value: 8 }] },
    ],
    // 车辆信息 - 车辆视频类型
    videoDtoList: [
        { key: 'id', label: '视频类型',col:12, type:'select', placeholder: '请选择视频类型', remote: true, url: '/business/videoConfigEntity/getList', method: 'post', props:{ label: 'name', value:'id'}  },
        // { key: 'protocol', label: '是否维保',col:12, type:'select',filter: 'contactRelation', placeholder: '请选择关系' },
    ],
    // 补充
    extDtoList: [
        { key: 'isShuttleBus', label: '是否接驳车',col:24, type:'select', placeholder: '请选择是否接驳车', children: [{label: '是', value: true},{label: '否', value: false}] },
        { key: 'shuttleBusDate', label: '接驳证有效期',col:24, type: 'date', placeholder: '请选择接驳证有效期' },
        { key: 'imeiNum', label: '唯一识别标识',col:24, placeholder: '请输入唯一识别标识' },
        { key: 'macAddress', label: 'MAC地址',col:24, placeholder: '请输入唯一识别标识' },
        { key: 'remark', label: '车辆备注',col:24, placeholder: '请输入车辆备注', props: {type: 'textarea'} },
    ],
    // 从业人员
    driverList: [],
    // 登记证
    rcDtoLists: [
        { key: 'rcFrontImageUrl', label: '登记证',col:24, slot: true },
        { key: 'id', label: '编号',col:12, placeholder: '请输入姓名' },
        { key: 'rcOwner', label: '所有人',col:12, placeholder: '请输入签发机关' },
        { key: 'rcIdentityCategory', label: '身份证明',col:12 },
        { key: 'rcIdentityNumber', label: '身份证明号码',col:12 },
        { key: 'rcAuthority', label: '登记机关',col:12 },
        { key: 'rcRegisterDate', label: '登记日期', type: 'date', col:12, data: {valueFormat: 'YYYY-MM-DD'} },
        { key: 'rcRegisterCode', label: '登记编号',col:12, disabled: true },
        { key: 'rcVehicleType', label: '车辆类型',col:12 },
        { key: 'rcVehicleBrand', label: '车辆品牌',col:12 },
        { key: 'rcVehicleModelNumber', label: '车辆型号',col:12 },
        { key: 'rcVehicleBodyColor', label: '车身颜色',col:12 },
        { key: 'rcVehicleIdentityNumber', label: '车架号',col:12 },
        { key: 'rcVehiclePlace', label: '国产/进口',col:12, children: [{label: '国产', value: '国产'}, {label: '进口', value: '进口'}] },
        { key: 'rcEngineNumber', label: '发动机号',col:12 },
        { key: 'rcEngineModel', label: '发动机型号',col:12 },
        { key: 'rcFuelType', label: '燃油种类',col:12 },
        { key: 'rcPower', label: '排量/功率',col:12 },
        { key: 'rcManufacturer', label: '制造商',col:12 },
        { key: 'rcSteering', label: '转向形式',col:12 },
        { key: 'rcWheelBase', label: '轮距',col:12 },
        { key: 'rcWheelNumber', label: '轮胎数',col:12 },
        { key: 'rcWheelSize', label: '轮胎规格',col:12 },
        { key: 'rcSpringPlate', label: '钢板弹簧片数',col:12 },
        { key: 'rcAxisBase', label: '轴距',col:12 },
        { key: 'rcAxisNumber', label: '轴数',col:12 },
        { key: 'rcOutsideSize', label: '外廊尺寸',col:12 },
        { key: 'rcInsideSize', label: '贷箱内部尺寸',col:12 },
        { key: 'rcTotalMass', label: '总质量',col:12 },
        { key: 'rcLoadMass', label: '核定载质量',col:12 },
        { key: 'rcCarryPassengers', label: '核定载客',col:12 },
        { key: 'rcTractiveTonnage', label: '准牵引总质量',col:12 },
        { key: 'rcCabPassengers', label: '驾驶室载客',col:12 },
        { key: 'rcUseNature', label: '使用性质',col:12 },
        { key: 'rcGetWay', label: '车辆获得方式',col:12 },
        { key: 'rcProductionDate', label: '车辆出厂日期',col:12, type: 'date', data: {valueFormat: 'YYYY-MM-DD'} },
        { key: 'rcIssueDate', label: '发证日期',col:12, type: 'date', data: {valueFormat: 'YYYY-MM-DD'} },
    ],
    // 行驶证
    vcDtoLists: [
        { key: 'vcFrontImageUrl', label: '行驶证正面',col:12, slot: true },
        { key: 'vcBackImageUrl', label: '行驶证反面',col:12, slot: true },
        { key: 'vcPlateNumber', label: '车牌号',col:12, placeholder: '请输入车牌号', disabled: true },
        { key: 'vcType', label: '车辆类型',col:12, placeholder: '请输入车辆类型' },
        { key: 'vcOwner', label: '所有人',col:12, placeholder: '请输入所有人' },
        { key: 'vcAddress', label: '住址',col:12, placeholder: '请输入住址' },
        { key: 'vcUseNature', label: '使用性质',col:12, placeholder: '请输入使用性质' },
        { key: 'vcBrand', label: '品牌型号',col:12, placeholder: '请输入品牌型号' },
        { key: 'vcIdentityNumber', label: '车辆识别代号',col:12, placeholder: '请输入车辆识别代号' },
        { key: 'vcEngineNumber', label: '发动机号码',col:12, placeholder: '请输入发动机号码' },
        { key: 'vcRegistrationDate', label: '注册日期',col:12, placeholder: '请选择注册日期', type: 'date', data: {valueFormat: 'YYYY-MM-DD'}  },
        { key: 'vcIssueDate', label: '发证日期',col:12, placeholder: '请选择发证日期', type: 'date', data: {valueFormat: 'YYYY-MM-DD'}  },
        { key: 'vcArchiveCode', label: '档案编号',col:12, placeholder: '请输入档案编号' },
        { key: 'vcCarryPassengers', label: '核定载人数',col:12, placeholder: '请输入核定载人数' },
        { key: 'vcTotalMass', label: '总质量',col:12, placeholder: '请输入总质量' },
        { key: 'vcCurbWeight', label: '整备质量',col:12, placeholder: '请输入整备质量' },
        { key: 'vcLoadMass', label: '核定载质量',col:12, placeholder: '请输入核定载质量' },
        { key: 'vcOutsideSize', label: '外廓尺寸',col:12, placeholder: '请输入外廓尺寸' },
        { key: 'vcTractiveTonnage', label: '准牵引总质量',col:12, placeholder: '请输入准牵引总质量' },
        { key: 'vcExpireDate', label: '验证有效期',col:12, placeholder: '请选择验证有效期', type: 'date', data: {valueFormat: 'YYYY-MM-DD'}  },
    ],
    // 运输证
    tcDtoLists: [
        { key: 'tcFrontImageUrl', label: '运输证正面',col:12, slot: true },
        { key: 'tcBackImageUrl', label: '运输证反面',col:12, slot: true },
        { key: 'tcOwner', label: '业户名称',col:12, placeholder: '请输入业户名称' },
        { key: 'tcPlateNumber', label: '车牌号码',col:12, placeholder: '请输入车牌号码', disabled: true },
        { key: 'tcType', label: '车辆类型',col:12, placeholder: '请输入车辆类型' },
        { key: 'tcSize', label: '车辆尺寸',col:12, placeholder: '请输入车辆尺寸' },
        { key: 'tcTonnage', label: '吨（坐）位',col:12, placeholder: '请输入吨（坐）位' },
        { key: 'tcTransportCode', label: '运输证号',col:12, placeholder: '请输入运输证号' },
        { key: 'tcAuthority', label: '核发机关',col:12, placeholder: '请输入核发机关' },
        { key: 'tcAnnualDate', label: '年审日期',col:12, placeholder: '请选择年审日期', type: 'date', data: {valueFormat: 'YYYY-MM-DD'} },
        { key: 'tcIssueDate', label: '发证日期',col:12, placeholder: '请选择发证日期', type: 'date', data: {valueFormat: 'YYYY-MM-DD'} },
    ],
    // 保险信息
    insurance:{
        url: '/business/vehicleInsuranceInfo/page',
        params: { vehicleCode: ''},
        columns: [
            { prop: 'insuranceSubTypeName', label: '保险类型' },
            { prop: 'insuranceCompanyName', label: '承保公司' },
            { prop: 'startDate', label: '开始时间' },
            { prop: 'endDate', label: '结束时间' },
            { prop: 'amountPurchase', label: '购买金额' },
        ],
    },
    // 变更记录
    alteration:{
        columns: [
            { prop: 'onTime', label: '时间' },
            { prop: 'operator', label: '操作人' },
            { prop: 'changeType', label: '变更类型', filter: 'vehicleLogChangeType' },
            { prop: 'afterChange', label: '变更前' },
            { prop: 'beforeChange', label: '变更后' },
        ],
    },
})

const setFormData = (obj) => {
    state.formData = proxy.$_.cloneDeep(editData)
    if(obj){
        getDetail({vehicleId: obj.vehicleId}).then(res=>{
            showStatus = true
            let data = {...state.formData, ...res}
            // 后台数据会返回null，前端会报错
            if(!data.billDto) data.billDto = proxy.$_.cloneDeep(state.formData.billDto)
            if(!data.driverList) data.driverList = proxy.$_.cloneDeep(state.formData.driverList)
            if(!data.dvrInfoDto) data.dvrInfoDto = proxy.$_.cloneDeep(state.formData.dvrInfoDto)
            if(!data.extDto) data.extDto = proxy.$_.cloneDeep(state.formData.extDto)
            if(!data.rcDto) data.rcDto = proxy.$_.cloneDeep(state.formData.rcDto)
            if(!data.tcDto) data.tcDto = proxy.$_.cloneDeep(state.formData.tcDto)
            if(!data.vcDto) data.vcDto = proxy.$_.cloneDeep(state.formData.vcDto)
            if(!data.vehicleDto) data.vehicleDto = proxy.$_.cloneDeep(state.formData.vehicleDto)
            if(!data.videoDto) data.videoDto = proxy.$_.cloneDeep(state.formData.videoDto)
            // 基本信息设备接口参数初始赋值
            state.dvrInfoDtoList[1].params = {terminalClassify: data.dvrInfoDto[0].terminalClassify}
            state.dvrInfoDtoList[2].params = {terminalClassify: data.dvrInfoDto[0].terminalClassify, manufacturer: data.dvrInfoDto[0].deviceTypeCode}
            state.vehicleDtoList[4].params.vehicleTypeId = data.vehicleDto.vehicleTypeId
            if(data.dvrInfoDto[0].terminalClassify){
                state.dvrInfoDtoList[1].disabled = false
            }
            if(data.dvrInfoDto[0].deviceTypeCode){
                state.dvrInfoDtoList[2].disabled = false
            }
            // 车牌号赋值
            data.rcDto.rcRegisterCode = data.vehicleDto.plateNum
            data.vcDto.vcPlateNumber = data.vehicleDto.plateNum
            data.tcDto.tcPlateNumber = data.vehicleDto.plateNum
            // 保险信息赋值
            state.insurance.params.vehicleCode  = data.vehicleDto.vehicleCode
            state.formData = proxy.$_.cloneDeep(data)
            drawerFlag = true
            setDisabled(true)
        }).catch(()=>{
            console.log('失败');
        })
    }else {
        state.activeName = 'vehicleDto'
        showStatus = false
        state.formData = proxy.$_.cloneDeep(state.formData)
        drawerFlag = true
        setDisabled(false)
    }
}

const setDisabled = (status)=>{
    state.vehicleDtoList[0].disabled = status
    state.vehicleDtoList[1].disabled = status
    state.vehicleDtoList[2].disabled = status
    state.vehicleDtoList[6].disabled = status
    state.vehicleDtoList[7].disabled = status
}

const tagsChange = (e)=>{
    let val = e.target.innerHTML.replace(/<.*?>/g,"")
    console.log(state.formData.vehicleDto.tagNameList);
    state.formData.vehicleDto.tagNameList.push(val)
    e.target.innerHTML = ''
}

const handleClose = ()=>{
    // state.formData = proxy.$_.cloneDeep(editData)
    drawerFlag = false
}

let eimts = defineEmits(['getTable'])
const save = (str) => {
    state.formData.updateType = str
    if(str == 'vehicleDto'){
        vehicleDtoRef.submitForm(false).then((form) => {
            saveData()
            eimts('getTable')
        })
    } else {
        saveData()
    }
}

const saveData = ()=>{
    state.loading = true
    addOrUpdate(state.formData).then(() => {
        state.loading = false
        ElMessage.success('修改成功！')
        drawerFlag = false
        eimts('getTable')
    }).catch(() => {
        state.loading = false
    })
}

const handleClick = (val)=>{

}

defineExpose({ ...toRefs(state), setFormData })
</script>

<style scoped lang="scss">
    .input_tag {
        &:focus { outline:none; }
    }
</style>
