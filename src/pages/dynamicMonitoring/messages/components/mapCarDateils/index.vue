<template>
    <div>
        <div class="absolute" :style="`top:10px; left: 50%; transform: translateX(calc(-50% + 170px));`">
            <transition name="fade-transform" mode="out-in" appear>
                <div v-if="carFlag" class="carDateils overflow relative">
                    <div style="height: 318px;overflow: hidden">
                        <el-tabs v-model="activeName"  class="demo-tabs" @tab-click="handleClick">
                            <el-tab-pane label="实时信息" name="first" lazy>
                                <tw-form-item :lists="mainData.lists" :row="mainData.formData"></tw-form-item>
                            </el-tab-pane>
                            <el-tab-pane label="车辆信息" name="second" lazy>
                                <tw-form-item :lists="mainData.carLists" :row="mainData.formData"></tw-form-item>
                                <el-button v-if="$store.getters.permissions?.['operation-clgl-cljbxx']" class="fr" type="primary" text @click="viewCar">查看详情</el-button>
                            </el-tab-pane>
                            <el-tab-pane label="人员信息" name="third" lazy>
                                <!--                        <tw-form-item :lists="mainData.userLists" :row="mainData.formData"></tw-form-item>-->
                                <tw-table
                                    ref="userTableRef"
                                    url="/business/driver/page"
                                    size="small"
                                    :tableParams="{vehicleCode: mainData.formData.vehicleCode}"
                                    :tableBtns="mainData.userHeadBtns"
                                    :botHeight="600"
                                    class="pt0"
                                    :columns="mainData.userColumns"
                                    :isTableHeader="false"
                                    :showPagination="false">
                                </tw-table>
                            </el-tab-pane>
                            <el-tab-pane label="保险信息" name="fourth" lazy>
                                <tw-table
                                    ref="insuranceTableRef"
                                    id="insurance_table_map_content"
                                    url="/business/vehicleInsuranceInfo/page"
                                    size="small"
                                    :tableParams="{vehicleCode: mainData.formData.vehicleCode}"
                                    :botHeight="600"
                                    class="pt0"
                                    :tableBtns="mainData.insuranceBtns"
                                    :columns="mainData.insuranceColumns"
                                    :isTableHeader="false"
                                    :showPagination="false">
                                </tw-table>
<!--                                <el-button class="fr" type="primary" text @click="viewInsurance">查看详情</el-button>-->
                            </el-tab-pane>
                            <el-tab-pane label="路线信息" name="five" lazy>
                                <tw-table
                                    ref="routeTableRef"
                                    :url="`/business/route/getRouteListByVehicleId/${mainData.formData.vehicleId}`"
                                    id="route_table_map_content"
                                    method="get"
                                    size="small"
                                    :botHeight="600"
                                    class="pt0"
                                    :columns="mainData.routeColumns"
                                    :isTableHeader="false"
                                    :showPagination="false">
                                </tw-table>
                            </el-tab-pane>
                            <el-tab-pane label="进出区域" name="six" lazy>
                                <tw-table
                                    ref="alarmAreaTableRef"
                                    :url="`/business/alarmArea/getAlarmAreaById/${mainData.formData.vehicleId}`"
                                    id="alarm_area_table_map_content"
                                    method="get"
                                    size="small"
                                    :botHeight="600"
                                    class="pt0"
                                    :columns="mainData.alarmAreaColumns"
                                    :isTableHeader="false"
                                    :showPagination="false">
                                </tw-table>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <el-icon class="positionTr pointer" @click="close" style="top: 14px; right: 14px"><Close/></el-icon>
                
                    <!--  底部菜单  -->
                    <div class="positionBl w">
                        <el-button-group class="tw_clr">
                            <el-tooltip
                                v-for="(item, i) in mainData.btns" :key="i"
                                :content="item.name"
                                effect="light"
                                placement="top-start"
                            >
                                <el-button size="large" style="flex: 1;" @click="tapClick(item.click)">
                                    <svg-icon :icon-class="item.icon"></svg-icon>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip
                                content="取消关注"
                                effect="light"
                                placement="top-start"
                            >
                                <el-button v-show="mainData.formData.focusId" size="large" style="flex: 1; border-right: none" @click="tapClick('quxiaoguanzhu')">
                                    <svg-icon icon-class="quxiaoguanzhu"></svg-icon>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip
                                content="关注"
                                effect="light"
                                placement="top-start"
                            >
                                <el-button v-show="!mainData.formData.focusId" size="large" style="flex: 1; border-right: none" @click="tapClick('guanzhu')">
                                    <svg-icon icon-class="guanzhu"></svg-icon>
                                </el-button>
                            </el-tooltip>
                        </el-button-group>
                    </div>
                </div>
            </transition>
    
        </div>
        
    </div>
    
</template>

<script setup lang="tsx">
let { lists/*, top, left*/ } = defineProps({
    lists: { type: Array, default: ()=> []},
    // top: Number,
    // left: Number
})
const router = useRouter();
let activeName = $ref('first')
let carFlag = $ref(false)
let userTableRef = $ref(null)
let insuranceTableRef = $ref(null)
let routeTableRef = $ref(null)
let alarmAreaTableRef = $ref(null)
let mainData = reactive({
    formData: {},
    lists: [
        { key: 'plateNum', label: '车牌号码：'},
        { key: 'runningSpeed', label: '车辆速度：'},
        { key: 'vehicleOperateTypeName', label: '营运类型：'},
        { key: 'directionCN', label: '行驶方向：'},
        // { key: 'vehicleStatusDesc', label: '车辆状态：'},
        { key: 'alarmInfo', label: '报警状态：'},
        { key: 'gpsTime', label: 'GPS时间：'},
        { key: 'companyName', label: '企业名称：', col: 24},
        { key: 'postionDetail', label: 'GPS位置：', col: 24},
    ],
    carLists: [
        { key: 'simNum', label: 'SIM卡号：'},
        { key: 'plateNum', label: '车辆编号：' },
        { key: 'terminalTypeName', label: '设备编号：'},
        { key: 'operatorName', label: '运营商：'},
        { key: 'vehicleStatusDesc', label: '车辆状态：', col: 24},
    ],
    userLists: [
        { key: 'simNum', label: '人员姓名：'},
        { key: 'plateNum', label: '性别：' },
        { key: 'terminalTypeName', label: '联系电话：'},
        { key: 'operatorName', label: '岗位：'},
        { key: 'operatorName', label: '驾驶证号：'},
        { key: 'operatorName', label: '资格证号：'},
        { key: 'vehicleStatusDesc', label: '所属企业：', col: 24},
    ],
    userHeadBtns: {
        prop: "btns",formatter: () => proxy.$store.getters.permissions?.['operation-clgl-sjgl'], label: "操作", fixed: "right", width: 40, btns: [
            {
                icon: 'xiangqing', name: '详情', click: (row) => {
                    router.push({path: '/operation/cars/practitioner', query:{vehicleCode:mainData.formData.vehicleCode,plateNum: mainData.formData.plateNum, name: row.driverName}})
                    // userRef.setFormData(row)
                }
            }
        ]
    },
    userColumns: [
        { prop: 'roleName', label: '岗位', width: 100},
        { prop: 'driverName', label: '姓名', width: 227 },
        { prop: 'mobilePhone', label: '手机号', width: 227},
    ],
    insuranceColumns: [
        { prop: "insuranceTypeName", label: "保险类型", width: 207 },
        { prop: "insuranceCompanyName", label: "保险公司", width: 207 },
        { prop: "endDate", label: "有效期", width: 140 },
    ],
    insuranceBtns: {
        prop: "btns",formatter: () => proxy.$store.getters.permissions?.['operation-clgj-clbx'], label: "操作", fixed: "right", width: 40, btns: [
            {
                icon: 'xiangqing', name: '详情', click: (row) => {
                    router.push({path: '/operation/cars/insurance', query:{vehicleCode:mainData.formData.vehicleCode,plateNum: mainData.formData.plateNum}})
                }
            }
        ]
    },
    routeColumns: [
        { prop: "name", label: "线路名称" },
        { prop: "companyName", label: "所属企业" },
        { prop: "roteTypeStr", label: "路线类型" },
    ],
    alarmAreaColumns: [
        { prop: "name", label: "区域名称" },
        { prop: "alarmTypeCode", label: "报警类型", filter: 'alarmAreaTypeCode' },
        { prop: "alarmLevel", label: "风险区域", filter: 'alarmAreaTypes' },
    ],
    btns: [
        { name: '查看视频', icon: 'chakanshipin', click: 'sendVideo'},
        { name: '发送语音', icon: 'fasongyuyin', click: 'sendVoice'},
        { name: '发送拍照', icon: 'fasongzhaopian', click: 'sendPhoto'},
        { name: '轨迹回放', icon: 'guijihuifang', click: 'guijihuifang'},
        // { name: '照片查询', icon: 'zhaopianchaxun', click: 'photoQuery'},
    ]
})

// 查看车辆详情
const viewCar = () => {
    console.log(mainData.formData);
    // carRef.setFormData(mainData.formData)
    router.push({path: '/operation/cars/car', query:{vehicleCode:mainData.formData.vehicleCode,plateNum: mainData.formData.plateNum}})
}

const handleClick = (tab, event: Event) => {
    setTimeout(()=>{
        if(tab.props.name == 'third'){
            userTableRef.getTable()
        }
        if(tab.props.name == 'fourth'){
            insuranceTableRef.getTable()
        }
        if(tab.props.name == 'five'){
            routeTableRef.getTable()
        }
        if(tab.props.name == 'six'){
            alarmAreaTableRef.getTable()
        }
    }, 500)
}

const close = ()=>{
    carFlag = false
}

const viewData = (obj)=>{
    mainData.formData = obj
    activeName = 'first'
    carFlag = true
}

let emits = defineEmits(['tapClick'])
const tapClick = (key)=>{
    emits('tapClick', key, [mainData.formData], 'mapClick')
}

defineExpose({viewData, close})
</script>

<style scoped lang="scss">
    .carDateils {
        width: 646px;
        height: 360px;
        border-radius: 10px;
        box-shadow: 0 5px 12px 4px rgba(0,0,0,0.09), 0 3px 6px 0 rgba(0,0,0,0.12), 0 1px 2px -2px rgba(0,0,0,0.16);
        background: var(--el-bg-color);
        :deep(.el-tabs__nav-scroll ) { padding: 0 20px}
        :deep(.el-table) {
            th:last-child {
                border-top-right-radius: 10px;
            }
        }
    }
</style>
